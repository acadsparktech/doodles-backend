import config from '@config/index';
import { AdminUser, JWTDecoder, ModifiedMiddleware } from '@interface/index';
import { Admin } from '@models/index';
import isEmpty from 'is-empty';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authMiddleware: ModifiedMiddleware = async (req, res, next) => {
  try {
    let authToken = req.headers['authorization'];
    if (!authToken) {
      return res.status(401).json({ success: false, message: 'Unauthorized', state: 'UNAUTHORIZED' });
    }

    if (!authToken.startsWith('Bearer')) {
      return res.status(401).json({ success: false, message: 'Invalid authorization', state: 'UNAUTHORIZED' });
    }

    authToken = authToken.split(' ')[1].trim();
    
    let decodedJwt:JWTDecoder = jwt.verify(authToken, config.JWT_SECRET, { algorithms: ['HS256'] }) as unknown as JWTDecoder;
    let user = (await Admin.findById(decodedJwt.id).lean()) as AdminUser;

    if (user.status == 'locked') {
      return res.status(403).json({ success: false, message: 'Your account has been locked', state: 'UNAUTHORIZED' });
    }
    req.user = user;
    if (isEmpty(req.user)) {
      return res.status(403).json({ success: false, message: 'No Administrator found' });
    }

    return next();
  } catch (error) {
    console.log('authMiddleware', error);
    return res.status(401).json({ success: false, state: 'UNAUTHORIZED', message: 'Please login to continue' });
  }
};

export default authMiddleware;

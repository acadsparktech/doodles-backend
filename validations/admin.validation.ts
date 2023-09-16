import { MiddlewareFunction } from '@interface/index';
import isEmpty from 'is-empty';

export const signin: MiddlewareFunction = (req, res, next) => {
  try {
    let { email, password }: { email: string; password: string } = req.body;
    let errors: any = {};

    if (isEmpty(email.trim())) errors.email = 'Email cannot be empty';
    if (isEmpty(password.trim())) errors.password = 'Password cannot be empty';

    if (!isEmpty(errors)) {
      return res.status(400).json({ success: false, errors, message: 'Invalid signin parameters' });
    } else {
      return next();
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

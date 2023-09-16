import express from 'express';
import * as adminCtrl from '@controllers/admin.controller';
import * as adminValid from '@validations/admin.validation';
import { ModifiedMiddleware } from '@interface/index';
import authMiddleware from '@middlewares/authMiddleware';

const router = express.Router();

router.route('/signin').post(adminValid.signin, adminCtrl.signin as ModifiedMiddleware);
router.route('/userinfo').get(authMiddleware ,adminCtrl.getUserInfo as ModifiedMiddleware);

export default router;

import express from 'express';
import * as adminCtrl from '@controllers/admin.controller';
import { ModifiedMiddleware } from '@interface/index';

const router = express.Router();

router.route('/signin').post(adminCtrl.signin as unknown as ModifiedMiddleware);

export default router;

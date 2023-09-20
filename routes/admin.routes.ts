import express from 'express';
import { ModifiedMiddleware } from '@interface/index';

// Middlewares
import authMiddleware from '@middlewares/authMiddleware';

// Validations
import * as adminValid from '@validations/admin.validation';
import * as studentValid from '@validations/student.validation';

// Controllers
import * as adminCtrl from '@controllers/admin.controller';
import * as studentCtrl from '@controllers/student.controller';

const router = express.Router();

// Auth Routes
router.route('/signin').post(adminValid.signin, adminCtrl.signin as ModifiedMiddleware);
router.route('/userinfo').get(authMiddleware, adminCtrl.getUserInfo as ModifiedMiddleware);

// Student Routes
router.route('/students').post(authMiddleware, studentValid.addStudent, studentCtrl.addStudent as ModifiedMiddleware);

export default router;

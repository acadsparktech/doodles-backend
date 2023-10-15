import express from 'express';
import { ModifiedMiddleware } from '@interface/index';

// Middlewares
import authMiddleware from '@middlewares/authMiddleware';

// Validations
import * as adminValid from '@validations/admin.validation';
import * as studentValid from '@validations/student.validation';
import * as classValid from '@validations/classroom.validation';
import * as staffValid from '@validations/staff.validation';

// Controllers
import * as adminCtrl from '@controllers/admin.controller';
import * as studentCtrl from '@controllers/student.controller';
import * as classCtrl from '@controllers/classroom.controller';
import * as staffCtrl from '@controllers/staff.controller';

const router = express.Router();

// Auth Routes
router.route('/signin').post(adminValid.signin, adminCtrl.signin as ModifiedMiddleware);
router.route('/userinfo').get(authMiddleware, adminCtrl.getUserInfo as ModifiedMiddleware);

// Class Routes
router.route('/classroom').post(authMiddleware, classValid.addClassroom, classCtrl.addClassroom as ModifiedMiddleware);

// Staff Routes
router.route('/staff').post(authMiddleware, staffValid.addStaff, staffCtrl.addStaff as ModifiedMiddleware);

// Student Routes
router.route('/students').post(authMiddleware, studentValid.addStudent, studentCtrl.addStudent as ModifiedMiddleware);

export default router;

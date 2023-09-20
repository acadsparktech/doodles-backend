"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Middlewares
const authMiddleware_1 = __importDefault(require("@middlewares/authMiddleware"));
// Validations
const adminValid = __importStar(require("@validations/admin.validation"));
const studentValid = __importStar(require("@validations/student.validation"));
// Controllers
const adminCtrl = __importStar(require("@controllers/admin.controller"));
const studentCtrl = __importStar(require("@controllers/student.controller"));
const router = express_1.default.Router();
// Auth Routes
router.route('/signin').post(adminValid.signin, adminCtrl.signin);
router.route('/userinfo').get(authMiddleware_1.default, adminCtrl.getUserInfo);
// Student Routes
router.route('/students').post(authMiddleware_1.default, studentValid.addStudent, studentCtrl.addStudent);
exports.default = router;

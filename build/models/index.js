"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.Staff = exports.Classroom = exports.Admin = void 0;
const admin_1 = __importDefault(require("./admin"));
exports.Admin = admin_1.default;
const classroom_1 = __importDefault(require("./classroom"));
exports.Classroom = classroom_1.default;
const staffs_1 = __importDefault(require("./staffs"));
exports.Staff = staffs_1.default;
const student_1 = __importDefault(require("./student"));
exports.Student = student_1.default;

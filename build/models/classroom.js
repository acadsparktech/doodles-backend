"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClassroomSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    gradeType: {
        type: String,
        required: true,
        enum: ['kindergarten', 'primary', 'secondary', 'senior', 'supersenior'],
    },
    section: {
        type: String,
        default: '',
    },
    incharge: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['normal', 'special', 'yoga', 'fitness', 'sports', 'science', 'swimming', 'musical', 'other'],
    },
    supervisor: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    occupancy: {
        type: Number,
        default: 0,
    },
    maleStudents: {
        type: Number,
        default: 0,
    },
    femaleStudents: {
        type: Number,
        default: 0,
    },
    students: {
        type: [mongoose_1.default.Types.ObjectId],
        default: [],
    },
    representative: {
        type: mongoose_1.default.Types.ObjectId,
        default: null,
    },
}, {
    timestamps: true,
});
const ClassRoom = mongoose_1.default.model('classroom', ClassroomSchema, 'classroom');
exports.default = ClassRoom;

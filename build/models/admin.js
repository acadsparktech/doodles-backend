"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'subadmin'],
    },
    restriction: {
        type: Array,
        default: [],
    },
    mailToken: {
        type: String,
        default: '',
    },
    mailOtp: {
        type: String,
        default: '',
    },
    otpTime: {
        type: Date,
        default: Date.now(),
    },
    csrfToken: {
        type: String,
        default: '',
    },
    csrfSecret: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'locked'],
    },
}, {
    timestamps: true,
});
const Admin = mongoose_1.default.model('admin', AdminSchema, 'admin');
exports.default = Admin;

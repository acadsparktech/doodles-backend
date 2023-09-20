"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StaffSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    staffId: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
    },
    secondaryEmail: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
    },
    messageOtp: {
        type: String,
        default: '',
    },
    messageOtpExpiration: {
        type: Date,
        default: Date.now(),
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        default: ['teacher', 'office', 'management', 'principal', 'admin', 'correspondent'],
    },
    bloodGroup: {
        type: String,
        default: '',
        enum: ['', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    },
    qualification: {
        type: String,
        default: '',
    },
    areaOfExpertise: {
        type: String,
        default: '',
    },
    experience: {
        type: Number,
        default: 0,
    },
    salary: {
        type: String,
        default: '',
    },
    rating: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        requiredd: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    phoneNumber1: {
        type: String,
        required: true,
    },
    phoneNumber2: {
        type: String,
        default: '',
    },
    martialStatus: {
        type: String,
        default: '',
        enum: ['married', 'single', 'widowed', 'divorced'],
    },
}, {
    timestamps: true,
});
const Staff = mongoose_1.default.model('staff', StaffSchema, 'staff');
exports.default = Staff;

import { BLOOD_GROUP, MARTIAL_STATUS, STAFF_TYPE } from '@constants/arrays';
import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema(
  {
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
      required: true,
      enum: STAFF_TYPE,
    },
    bloodGroup: {
      type: String,
      default: '',
      enum: BLOOD_GROUP,
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
      enum: MARTIAL_STATUS,
    },
    isSupervisor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Staff = mongoose.model('staff', StaffSchema, 'staff');

export default Staff;

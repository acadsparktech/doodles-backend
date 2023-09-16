import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

const Admin = mongoose.model('admin', AdminSchema, 'admin');

export default Admin;

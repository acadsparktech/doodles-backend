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
    mailToken: {
      type: String,
      default: '',
    },
    mailOtp: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('admin', AdminSchema, 'admin');

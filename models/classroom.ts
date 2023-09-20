import mongoose from 'mongoose';

const ClassroomSchema = new mongoose.Schema(
  {
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
      type: mongoose.Types.ObjectId,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['normal', 'special', 'yoga', 'fitness', 'sports', 'science', 'swimming', 'musical', 'other'],
    },
    supervisor: {
      type: mongoose.Types.ObjectId,
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
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    representative: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const ClassRoom = mongoose.model('classroom', ClassroomSchema, 'classroom');

export default ClassRoom;

import { CLASS_CATEGORY, GRADE_TYPE } from '@constants/arrays';
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
      enum: GRADE_TYPE,
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
      enum: CLASS_CATEGORY,
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

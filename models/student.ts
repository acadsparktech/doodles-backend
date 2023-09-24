import { BLOOD_GROUP, GENDERS, PARENTING_TYPE, PHONE_TYPE } from '@constants/arrays';
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: '',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
      enum: GENDERS,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    profile: {
      type: String,
      default: '',
    },
    examNumber: {
      type: String,
      default: '',
    },
    emisNumber: {
      type: String,
      default: '',
    },
    parentingType: {
      type: String,
      required: true,
      enum: PARENTING_TYPE,
    },
    fatherName: {
      type: String,
      default: '',
    },
    motherName: {
      type: String,
      default: '',
    },
    guradianName: {
      type: String,
      default: '',
    },
    orphanageName: {
      type: String,
      default: '',
    },
    phoneNumber1: {
      phone: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: PHONE_TYPE,
      },
    },
    phoneNumber2: {
      phone: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: '',
        enum: PHONE_TYPE,
      },
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      default: 'india',
    },
    bloodGroup: {
      type: String,
      default: '',
      enum: BLOOD_GROUP,
    },
    totalFee: {
      type: Number,
      default: 0,
    },
    feeRemaining: {
      type: Number,
      default: 0,
    },
    consessionPercent: {
      type: Number,
      default: 0,
    },
    academicYear: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    classroomId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    otherClasses: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    section: {
      type: String,
      require: true,
    },
    group: {
      type: String,
      default: '',
    },
    transportMode: {
      type: String,
      default: '',
      enum: ['', 'parental', 'third-party-transport', 'private', 'self-vehicle', 'school-transport', 'govt-transport'],
    },
    transportNumber: {
      type: String,
      default: '',
    },
    schoolTransportId: {
      type: String,
      default: '',
    },
    messageOtp: {
      type: String,
      default: '',
    },
    messageOtpExpiration: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      default: 'new',
      enum: ['new', 'pending', 'active', 'hold', 'blocked'],
    },
    isTCSubmitted: {
      type: Boolean,
      default: false,
    },
    isMarkSheetSubmitted: {
      type: Boolean,
      default: false,
    },
    aadharNumber: {
      type: String,
      default: '',
    },
    isAadharSubmitted: {
      type: Boolean,
      default: false,
    },
    isBirthCertSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model('student', StudentSchema, 'student');

export default Student;

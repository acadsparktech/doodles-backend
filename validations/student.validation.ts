import { BLOOD_GROUP, GENDERS, PARENTING_TYPE, PHONE_TYPE } from '@constants/arrays';
import { ADDRESS, ALL_CAPS, EMAIL, ISALNUM, ISALNUMHYP, NUMBER, PASSWORD, PHONE_NUM, ZIPCODE } from '@constants/regex';
import { MiddlewareFunction } from '@interface/index';
import { addressSuperRefinements } from '@lib/superRefinements';
import { enumErrorMap } from '@lib/zodErrorMaps';
import isEmpty from 'is-empty';
import * as zod from 'zod';

export const addStudent: MiddlewareFunction = async (req, res, next) => {
  try {
    let studentValidationSchema = zod.object({
      rollNumber: zod.string().min(3).regex(ISALNUMHYP, 'Roll number can contain only A-Z & numbers characters with - or _'),
      password: zod.string().min(3).max(10),
      confirmPassword: zod.string().min(3).max(10),
      email: zod.string().email('Invalid email'),
      firstName: zod.string().min(2).max(200).regex(ISALNUM, 'Firstname contains invalid characters'),
      lastName: zod.string().min(2).max(200).regex(ISALNUM, 'Lastname contains invalid characters'),
      gender: zod.enum(GENDERS, { errorMap: enumErrorMap }),
      dateOfBirth: zod.date({ invalid_type_error: 'Date is of invalid type', coerce: true }),
      examNumber: zod
        .string()
        .refine((val) => val.length == 0 || ISALNUMHYP.test(val), 'Exam number contains invalid characters, should be all caps'),
      emisNumber: zod
        .string()
        .refine((val) => val.length == 0 || ISALNUMHYP.test(val), 'Emis number contains invalid characters, should be all caps'),
      parentingType: zod.enum(PARENTING_TYPE, { errorMap: enumErrorMap }),
      fatherName: zod.string().refine((val) => val.length == 0 || ISALNUM.test(val), 'Father name contains invalid characters'),
      motherName: zod.string().refine((val) => val.length == 0 || ISALNUM.test(val), 'Mother name contains invalid characters'),
      guardianName: zod.string().refine((val) => val.length == 0 || ISALNUM.test(val), 'Guardian name contains invalid characters'),
      orphanageName: zod.string().refine((val) => val.length == 0 || ISALNUM.test(val), 'Orphanage name contains invalid characters'),
      phoneNumber1: zod.string().regex(PHONE_NUM, 'Invalid phone number'),
      phoneType1: zod.enum(PHONE_TYPE, { errorMap: enumErrorMap }),
      phoneNumber2: zod.string().refine((val: any) => val.length == 0 || PHONE_NUM.test(val), 'Invalid phonenumber'),
      phoneType2: zod.string().refine((val: any) => val.length == 0 || PHONE_TYPE.includes(val), 'Invalid phone type'),
      address: zod.string().superRefine(addressSuperRefinements),
      city: zod.string().min(2).max(100).regex(ADDRESS, 'City contains invalid characters'),
      state: zod.string().min(2).max(100).regex(ISALNUM, 'State contains invalid characters'),
      nationality: zod.string().min(3).max(100).regex(ISALNUM, 'Nationality contains invalid characters'),
      pincode: zod.string().regex(ZIPCODE, 'Pincode contains invalid characters'),
      bloodGroup: zod.enum(BLOOD_GROUP, { errorMap: enumErrorMap }),
      totalFee: zod.string().refine((val) => val.length == 0 || zod.number({ coerce: true }).safeParse(val).success, 'Invalid fee amount'),
      concessionPercent: zod
        .string()
        .refine(
          (val) => val.length == 0 || zod.number({ coerce: true }).min(0, 'Concession percentage ').safeParse(val).success,
          'Invalid concession percentage',
        ),
      academicYear: zod.string().regex(ISALNUMHYP, 'Invalid Academic year'),
      class: zod.number({ coerce: true }).min(1).max(12),
      section: zod.string().regex(ALL_CAPS, 'Section should be all caps'),
      group: zod.string().refine((val: any) => val.length == 0 || ISALNUM.test(val), 'Group contains invalid characters'),
    });

    let parseResult = await studentValidationSchema.safeParseAsync(req.body);

    if (parseResult.success) {
      return next();
    } else {
      return res
        .status(400)
        .json({ success: false, errors: parseResult.error.errors, fieldErrors: parseResult.error.flatten().fieldErrors });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

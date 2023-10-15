import { BLOOD_GROUP, MARTIAL_STATUS, STAFF_TYPE } from '@constants/arrays';
import { ADDRESS, ISALNUM, PASSWORD, PHONE_NUM, ZIPCODE } from '@constants/regex';
import { MiddlewareFunction } from '@interface/index';
import { addressSuperRefinements } from '@lib/superRefinements';
import { enumErrorMap } from '@lib/zodErrorMaps';
import * as zod from 'zod';

export const addStaff: MiddlewareFunction = async (req, res, next) => {
  try {
    let addStaffSchema = zod.object({
      firstName: zod.string().min(4).max(35).regex(ISALNUM, 'Firstname contains invalid characters'),
      lastName: zod.string().min(4).max(35).regex(ISALNUM, 'Lastname contains invalid characters'),
      dateOfBirth: zod.date({ invalid_type_error: 'Date is of invalid type', coerce: true }),
      staffId: zod.string(),
      email: zod.string().email('Invalid email'),
      secondaryEmail: zod.string().refine((val) => val.length == 0 || zod.string().email().safeParse(val).success, 'Invalid email'),
      password: zod
        .string()
        .min(8)
        .max(32)
        .regex(PASSWORD, 'Invalid password')
        .refine((val: any) => val.password !== val.confirmPassword, 'Password and confirm password should match'),
      confirmPassword: zod
        .string()
        .refine((val: any) => val.password !== val.confirmPassword, 'Password and confirm password should match'),
      dateOfJoining: zod.date({ invalid_type_error: 'Date is of invalid type', coerce: true }),
      type: zod.enum(STAFF_TYPE, { errorMap: enumErrorMap }),
      bloodGroup: zod.enum(BLOOD_GROUP, { errorMap: enumErrorMap }),
      qualification: zod.string().min(0).max(50),
      areaOfExpertise: zod.string().min(0).max(80),
      experience: zod.number(),
      salary: zod.string(),
      address: zod.string().superRefine(addressSuperRefinements),
      city: zod.string().min(2).max(100).regex(ADDRESS, 'City contains invalid characters'),
      pincode: zod.string().regex(ZIPCODE, 'Pincode contains invalid characters'),
      phoneNumber1: zod.string().min(4).regex(PHONE_NUM, 'Phonenumber contains invalid characters'),
      phoneNumber2: zod.string().refine((val: any) => val.length == 0 || PHONE_NUM.test(val), 'Invalid phonenumber'),
      martialStatus: zod.enum(MARTIAL_STATUS, { errorMap: enumErrorMap }),
      isSupervisor: zod.boolean(),
    });

    let parseResult = await addStaffSchema.safeParseAsync(req.body);

    if (parseResult.success) {
      return next();
    } else {
      return res
        .status(400)
        .json({ success: false, errors: parseResult.error.errors, fieldErrors: parseResult.error.flatten().fieldErrors });
    }
  } catch (error) {
    let err: zod.ZodError = error as any;
    return res
      .status(500)
      .json({ success: false, errors: err.errors, fieldErrors: err.flatten().fieldErrors, formErrors: err.flatten().formErrors });
  }
};

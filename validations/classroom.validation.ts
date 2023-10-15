import { CLASS_CATEGORY, GRADE_TYPE } from '@constants/arrays';
import { MiddlewareFunction } from '@interface/index';
import { enumErrorMap } from '@lib/zodErrorMaps';

import * as zod from 'zod';

export const addClassroom: MiddlewareFunction = async (req, res, next) => {
  try {
    let addClassroomSchema = zod.object({
      name: zod.string().min(2).max(15),
      grade: zod.string().min(1).max(10),
      gradeType: zod.enum(GRADE_TYPE, { errorMap: enumErrorMap }),
      section: zod.string(),
      incharge: zod.string().length(24, { message: 'Select one of the teachers from the list' }),
      category: zod.enum(CLASS_CATEGORY, { errorMap: enumErrorMap }),
      supervisor: zod.string().length(24, { message: 'Select one of the supervisor from the list' }),
    });

    let parseResult = await addClassroomSchema.safeParseAsync(req.body);

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

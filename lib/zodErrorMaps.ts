import * as zod from 'zod';

export const enumErrorMap: zod.ZodErrorMap = (issue, ctx) => {
  if (issue.code == zod.ZodIssueCode.invalid_enum_value) {
    return { message: 'Please select an appropriate value from the given list' };
  }
  return { message: ctx.defaultError };
};

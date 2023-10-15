import { ADDRESS } from '@constants/regex';
import * as zod from 'zod';

export const addressSuperRefinements: zod.SuperRefinement<string> = (val, ctx) => {
  if (val.length > 0 && val.length < 4) {
    ctx.addIssue({
      code: zod.ZodIssueCode.too_small,
      minimum: 4,
      type: 'string',
      inclusive: true,
      message: 'Address is too small',
    });
  }
  if (val.length > 255) {
    ctx.addIssue({
      code: zod.ZodIssueCode.too_big,
      maximum: 255,
      type: 'string',
      inclusive: true,
      message: 'Address is too big',
    });
  }
  if (val.length >= 4 && !ADDRESS.test(val)) {
    ctx.addIssue({
      code: zod.ZodIssueCode.custom,
      message: 'Address contains invalid characters',
    });
  }
};

export const citySuperRefinements: zod.SuperRefinement<string> = (val, ctx) => {
  if (val.length > 0 && val.length < 4) {
    ctx.addIssue({
      code: zod.ZodIssueCode.too_small,
      minimum: 2,
      type: 'string',
      inclusive: true,
      message: 'City is too small',
    });
  }
  if (val.length > 255) {
    ctx.addIssue({
      code: zod.ZodIssueCode.too_big,
      maximum: 100,
      type: 'string',
      inclusive: true,
      message: 'City is too big',
    });
  }
  if (val.length >= 4 && !ADDRESS.test(val)) {
    ctx.addIssue({
      code: zod.ZodIssueCode.custom,
      message: 'City contains invalid characters',
    });
  }
};

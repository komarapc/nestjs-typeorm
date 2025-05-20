import {
  onlyLettersAndNumbers,
  onlyLettersAndSpace,
} from '@/common/utils/regex';

import { z } from 'zod';

const provinceSchema = z.object({
  code: z
    .string()
    .nonempty()
    .min(1, 'Province code is required')
    .regex(
      onlyLettersAndNumbers,
      'Province code must contain only letters and numbers',
    ),
  name: z
    .string()
    .nonempty()
    .min(1, 'Province name is required')
    .regex(
      onlyLettersAndSpace,
      'Province name must contain only letters and spaces',
    ),
});
const provinceQuerySchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

type ProvinceSchema = z.infer<typeof provinceSchema>;
type ProvinceQuerySchema = z.infer<typeof provinceQuerySchema>;
export { provinceQuerySchema, provinceSchema };
export type { ProvinceSchema, ProvinceQuerySchema };

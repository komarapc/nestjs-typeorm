import { regexName, regexRegular } from '@/common/utils/regex';

import { z } from 'zod';

const regencySchema = z.object({
  province_code: z
    .string()
    .nonempty()
    .regex(regexRegular, 'Only letters, numbers  and . are allowed'),
  code: z
    .string()
    .nonempty()
    .regex(regexRegular, 'Only letters, numbers and . are allowed'),
  name: z
    .string()
    .nonempty()
    .regex(regexName, 'Only letters, numbers and space are allowed'),
});
const regencyQuerySchema = z.object({
  province_code: z.string().optional(),
  code: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

type RegencySchema = z.infer<typeof regencySchema>;
type RegencyQuerySchema = z.infer<typeof regencyQuerySchema>;
export { regencyQuerySchema, regencySchema };
export type { RegencySchema, RegencyQuerySchema };

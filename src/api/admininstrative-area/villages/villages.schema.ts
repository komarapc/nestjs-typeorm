import { z } from 'zod';

const villagesSchema = z.object({
  subdistrict_code: z
    .string()
    .nonempty()
    .regex(/^[a-zA-Z0-9.]+$/, 'Only letters, numbers and . are allowed'),
  code: z
    .string()
    .nonempty()
    .regex(/^[a-zA-Z0-9.]+$/, 'Only letters, numbers and . are allowed'),
  name: z
    .string()
    .nonempty()
    .regex(/^[a-zA-Z0-9.\s]+$/, 'Only letters, numbers and space are allowed'),
});

const villagesQuerySchema = z.object({
  subdistrict_code: z.string().optional(),
  code: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});
type VillagesSchema = z.infer<typeof villagesSchema>;
type VillagesQuerySchema = z.infer<typeof villagesQuerySchema>;
export { villagesQuerySchema, villagesSchema };
export type { VillagesSchema, VillagesQuerySchema };

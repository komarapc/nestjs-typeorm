import { z } from 'zod';

const subdistrictSchema = z.object({
  regency_code: z
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

const subdistrictQuerySchema = z.object({
  regency_code: z.string().optional(),
  code: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});
type SubdistrictSchema = z.infer<typeof subdistrictSchema>;
type SubdistrictQuerySchema = z.infer<typeof subdistrictQuerySchema>;
export { subdistrictQuerySchema, subdistrictSchema };
export type { SubdistrictSchema, SubdistrictQuerySchema };

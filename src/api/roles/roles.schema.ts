import { safeInputTextRegex } from '@/utils/lib';
import { z } from 'zod';

const rolesSchema = z.object({
  code: z
    .string()
    .min(3)
    .max(10)
    .regex(safeInputTextRegex, { message: 'Code contains invalid characters' }),
  name: z.string().min(2).regex(safeInputTextRegex, {
    message: 'Name contains invalid characters',
  }),
});
const rolesQuerySchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});
type RolesQuerySchema = z.infer<typeof rolesQuerySchema>;
type RolesSchema = z.infer<typeof rolesSchema>;
export { rolesSchema, rolesQuerySchema };
export type { RolesSchema, RolesQuerySchema };

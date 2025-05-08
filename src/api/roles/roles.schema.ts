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

type RolesSchema = z.infer<typeof rolesSchema>;
export { rolesSchema };
export type { RolesSchema };

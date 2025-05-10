import { z } from 'zod';

const hasRoleSchema = z.object({
  role_id: z.string().uuid(),
  user_id: z.string().uuid(),
});
const hasRoleQuerySchema = z.object({
  user_id: z.string().uuid(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

type HasRoleSchema = z.infer<typeof hasRoleSchema>;
type HasRoleQuerySchema = z.infer<typeof hasRoleQuerySchema>;
export { hasRoleSchema, hasRoleQuerySchema };
export type { HasRoleSchema, HasRoleQuerySchema };

import { z } from 'zod';

const permissionsCreateSchema = z.object({
  role_id: z.string().uuid(),
  resource_id: z.string().uuid(),
  action: z
    .enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'ALL'])
    .array()
    .min(1),
});
const permissionsQuerySchema = z.object({
  role_id: z.string().uuid(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});
type PermissionsQuerySchema = z.infer<typeof permissionsQuerySchema>;
type PermissionsCreateSchema = z.infer<typeof permissionsCreateSchema>;
export { permissionsCreateSchema, permissionsQuerySchema };
export type { PermissionsCreateSchema, PermissionsQuerySchema };

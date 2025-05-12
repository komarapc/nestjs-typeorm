import { z } from 'zod';

const permissionsCreateSchema = z.object({
  role_id: z.string().uuid(),
  resource_id: z.string().uuid(),
  action: z
    .enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'ALL'])
    .array()
    .min(1),
});
type PermissionsCreateSchema = z.infer<typeof permissionsCreateSchema>;
export { permissionsCreateSchema };
export type { PermissionsCreateSchema };

import { z } from 'zod';

const localAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const localAuthSchemaWithRole = z.object({
  user_id: z.string().uuid(),
  role_id: z.string().uuid(),
});
type LocalAuthSchema = z.infer<typeof localAuthSchema>;
type LocalAuthSchemaWithRole = z.infer<typeof localAuthSchemaWithRole>;
export { localAuthSchema, localAuthSchemaWithRole };
export type { LocalAuthSchema, LocalAuthSchemaWithRole };

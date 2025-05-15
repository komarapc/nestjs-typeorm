import { z } from 'zod';

const localAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type LocalAuthSchema = z.infer<typeof localAuthSchema>;
export { localAuthSchema };
export type { LocalAuthSchema };

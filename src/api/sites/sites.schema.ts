import { z } from 'zod';

const sitesSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});
const sitesQuerySchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

type SitesSchema = z.infer<typeof sitesSchema>;
type SitesQuerySchema = z.infer<typeof sitesQuerySchema>;
export { sitesSchema, sitesQuerySchema };
export type { SitesSchema, SitesQuerySchema };

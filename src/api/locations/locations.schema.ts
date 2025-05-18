import { z } from 'zod';

const locationsSchema = z.object({
  site_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
});
const locationQuerySchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});
type LocationsSchema = z.infer<typeof locationsSchema>;
type LocationQuerySchema = z.infer<typeof locationQuerySchema>;
export { locationsSchema, locationQuerySchema };
export type { LocationsSchema, LocationQuerySchema };

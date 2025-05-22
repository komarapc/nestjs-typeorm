import { z } from 'zod';

const unitItemSchema = z.object({
  name: z.string().nonempty(),
  abbreviation: z.string().nonempty(),
});
const unitItemQuerySchema = z.object({
  name: z.string().optional(),
  abbreviation: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});
type UnitItemSchema = z.infer<typeof unitItemSchema>;
type UnitItemQuerySchema = z.infer<typeof unitItemQuerySchema>;
export { unitItemSchema, unitItemQuerySchema };
export type { UnitItemSchema, UnitItemQuerySchema };

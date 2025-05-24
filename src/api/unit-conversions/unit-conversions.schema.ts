import { z } from 'zod';

export const unitConversionsSchema = z.object({
  from_unit_id: z.string().uuid(),
  to_unit_id: z.string().uuid(),
  conversion_factor: z.number(),
});
export const unitConversionQuerySchema = z.object({
  from_unit_id: z.string().uuid().optional(),
  to_unit_id: z.string().uuid().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});
type UnitConversionsSchema = z.infer<typeof unitConversionsSchema>;
type UnitConversionQuerySchema = z.infer<typeof unitConversionQuerySchema>;
export type { UnitConversionsSchema, UnitConversionQuerySchema };

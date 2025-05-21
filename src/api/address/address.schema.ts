import { z } from 'zod';

const addressSchema = z.object({
  ref_id: z.string().uuid(),
  province_id: z.string().uuid(),
  regency_id: z.string().uuid(),
  subdistrict_id: z.string().uuid(),
  village_id: z.string().uuid(),
  text_address: z.string().optional(),
});
const addressQuerySchema = z.object({
  ref_id: z.string().uuid(),
});
type AddressSchema = z.infer<typeof addressSchema>;
type AddressQuerySchema = z.infer<typeof addressQuerySchema>;
export { addressSchema, addressQuerySchema };
export type { AddressSchema, AddressQuerySchema };

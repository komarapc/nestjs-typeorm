import { z } from 'zod';

const sitesSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  address: z
    .object({
      provinceId: z.string().min(1, { message: 'Province ID is required' }),
      regencyId: z.string().min(1, { message: 'Regency ID is required' }),
      subdistrictId: z
        .string()
        .min(1, { message: 'Subdistrict ID is required' }),
      villageId: z.string().min(1, { message: 'Village ID is required' }),
      textAddress: z.string().optional(),
    })
    .optional(),
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

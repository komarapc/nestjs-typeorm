import { safeInputTextRegex } from '@/common/utils/lib';
import { z } from 'zod';

const sitesSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .regex(safeInputTextRegex, {
      message: 'Name must be alphanumeric',
    }),
});

type SitesSchema = z.infer<typeof sitesSchema>;

export { sitesSchema };
export type { SitesSchema };

import { safeInputTextRegex } from '@/common/utils/lib';
import { z } from 'zod';

const regexUrl = /^\/[^\s]*$/i;

const resourcesCreateSchema = z.object({
  name: z
    .string()
    .min(1)
    .regex(safeInputTextRegex, { message: 'Name contains invalid characters' }),
  path: z
    .string()
    .min(1)
    .regex(regexUrl, { message: 'Path must be a valid URL' }),
});
const resourcesBulkCreateSchema = z.object({
  items: z.array(resourcesCreateSchema).nonempty(),
});
const resourceQuerySchema = z.object({
  name: z.string().optional(),
  path: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

type ResourcesCreateSchema = z.infer<typeof resourcesCreateSchema>;
type ResourcesBulkCreateSchema = z.infer<typeof resourcesBulkCreateSchema>;
type ResourcesQuerySchema = z.infer<typeof resourceQuerySchema>;

export {
  resourcesCreateSchema,
  resourcesBulkCreateSchema,
  resourceQuerySchema,
};
export type {
  ResourcesCreateSchema,
  ResourcesBulkCreateSchema,
  ResourcesQuerySchema,
};

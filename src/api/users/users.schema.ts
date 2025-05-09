import { safeInputTextRegex } from '../../common/utils/lib';
import { z } from 'zod';

const userCreateSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .regex(safeInputTextRegex, {
        message: 'Name contains invalid characters',
      }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    passwordConfirmation: z
      .string()
      .min(8, { message: 'Password confirmation is required' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

const userQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});
const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
});

const userUpdatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    passwordConfirmation: z
      .string()
      .min(8, { message: 'Password confirmation is required' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

type UserCreateSchema = z.infer<typeof userCreateSchema>;
type UserQuerySchema = z.infer<typeof userQuerySchema>;
type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
type UserUpdatePasswordSchema = z.infer<typeof userUpdatePasswordSchema>;
export {
  userCreateSchema,
  userQuerySchema,
  userUpdatePasswordSchema,
  userUpdateSchema,
};
export type {
  UserCreateSchema,
  UserQuerySchema,
  UserUpdateSchema,
  UserUpdatePasswordSchema,
};

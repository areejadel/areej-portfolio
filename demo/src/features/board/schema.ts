import { z } from 'zod';
import { PRIORITIES } from './types';

/**
 * Validation schema for the "add task" form.
 * Error messages are i18n keys resolved in the form component.
 */
export const newTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'form.errors.titleMin' })
    .max(80, { message: 'form.errors.titleMax' }),
  priority: z.enum(PRIORITIES),
});

export type NewTaskInput = z.infer<typeof newTaskSchema>;

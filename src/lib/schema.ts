import { z } from 'zod';

export const editModuleFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string({ message: 'Description is required' }).min(1, {
    message: 'Description is required',
  }),
  targetTemperature: z.coerce
    .number()
    .min(0, {
      message: 'Target temperature must be greater than or equal to 0',
    })
    .max(40, {
      message: 'Target temperature must be less than or equal to 40',
    }),
});

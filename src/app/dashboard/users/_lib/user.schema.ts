import { formConstants } from 'src/constants/form-constants';
import { z } from 'zod';
export const userValidationSchema = (isUpdated: boolean) => {
  return z.object({
    first_name: z.string().min(1, formConstants.required),
    email: z.string().email(formConstants.invalidEmail),
    role: z.string().min(1, formConstants.required),
    password: z.string().min(1, formConstants.required),
    confirm_password: isUpdated ? z.string() : z.string().min(1, formConstants.required),
  });
};

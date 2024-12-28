import { z } from 'zod';

export const propertyValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z
    .number({ invalid_type_error: 'Price is required' })
    .nonnegative('Price must be a positive number'),
  description: z.string(),
  property_details: z.object({
    area_size: z
      .number({ invalid_type_error: 'Area size must be a number' })
      .min(0, 'Size cannot be negative'),
  }),
  location: z.object({
    street: z.string({ required_error: 'Street is required' }).min(1, 'Street is required'),
    city: z.string({ required_error: 'City is required' }).min(1, 'City is required'),
  }),
  contact_info: z.object({
    email: z.string().min(1, 'Email is required'),
  }),
});

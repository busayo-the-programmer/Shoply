// validation/createProductSchema.js
import { z } from 'zod'

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name is too long'),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description is too long'),

  price: z
    .string()
    .min(1, 'Price is required')
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, 'Enter a valid price'),

  originalPrice: z
    .string()
    .optional()
    .refine((v) => !v || (!isNaN(Number(v)) && Number(v) > 0), 'Enter a valid original price'),

  category: z.enum(
    ['electronics', 'fashion', 'beauty', 'home_garden', 'sports', 'food_beverage', 'books', 'toys', 'health', 'other'],
    { required_error: 'Please select a category' }
  ),

  stock: z
    .string()
    .min(1, 'Stock quantity is required')
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, 'Enter a valid stock number'),

  image: z
    .string()
    .url('Enter a valid image URL')
    .optional()
    .or(z.literal('')),
})
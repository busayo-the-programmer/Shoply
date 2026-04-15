// validations/registerSchema.js
import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long"),

    email: z
      .string()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number"),

    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
  

  export const loginSchema = z.object({
    email: z
      .string()
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters") 
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
  })  

export const vendorApplicationSchema = z.object({

  // ── Personal Info ──────────────────────────────
  fullName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long'),

  // ── Business Info ──────────────────────────────
  businessName: z
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name is too long'),

  businessType: z.enum(
    ['sole_proprietor', 'partnership', 'llc', 'corporation', 'other'],
    { required_error: 'Please select a business type' }
  ),

  businessEmail: z
    .string()
    .min(1, 'Business email is required')
    .email('Please enter a valid business email'),

  // ── Store Info ─────────────────────────────────
  storeName: z
    .string()
    .min(2, 'Store name must be at least 2 characters')
    .max(60, 'Store name must be under 60 characters'),

  productCategory: z.enum(
    [
      'electronics',
      'fashion',
      'beauty',
      'home_garden',
      'sports',
      'food_beverage',
      'books',
      'toys',
      'health',
      'other',
    ],
    { required_error: 'Please select a product category' }
  ),

  expectedMonthlyRevenue: z.enum(
    ['under_1k', '1k_5k', '5k_20k', '20k_50k', 'above_50k'],
    { required_error: 'Please select an expected revenue range' }
  ),

  // ── Location ───────────────────────────────────
  country: z
    .string()
    .min(2, 'Country is required'),

  state: z
    .string()
    .min(2, 'State / province is required'),

  address: z
    .string()
    .min(5, 'Please enter a valid address')
    .max(200, 'Address is too long'),

  // ── Agreement ──────────────────────────────────
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),

  agreeToVendorPolicy: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the vendor policy' }),
  }),

})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
.refine((data) => data.email !== data.businessEmail || true, {
  // optional: warn if personal & business email are the same
  // remove this refine if you don't need it
  message: 'Consider using a separate business email',
  path: ['businessEmail'],
})
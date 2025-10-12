import { z } from 'zod';

// Shared validators
export const emailValidator = z.string().email({ message: "Invalid email address" });
export const passwordValidator = z.string().min(8, { message: "Password must be at least 8 characters" });

export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
  rememberMe: z.boolean().optional(),
});



export const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: emailValidator,
  password: passwordValidator,
  password_confirmation: passwordValidator,
  terms: z.literal<boolean>(true, { message: "You must agree to the Terms of Service and Privacy Policy" }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

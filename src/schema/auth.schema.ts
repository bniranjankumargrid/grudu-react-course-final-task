import { z } from "zod";

export const baseAuthSchema = z.object({
  userName: z.string()
    .min(1, "Username is required")
    .max(50, "Username must be at most 50 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(256, "Password must be at most 256 characters"),
});

export const signupSchema = baseAuthSchema.extend({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  fullName: z.string()
    .min(1, "Full name is required")
    .max(512, "Full name must be at most 512 characters"),
});

export type BaseAuthInput = z.infer<typeof baseAuthSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
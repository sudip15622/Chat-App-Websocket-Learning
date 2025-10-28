import { Gender } from "generated/prisma/enums";
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your full name!")
    .max(100, "Full name cannot exceed 100 characters!")
    .trim(),
    
  email: z
    .string()
    .min(1, "Email is required!")
    .email("Please enter a valid email address!")
    .max(255, "Email cannot exceed 255 characters!")
    .toLowerCase()
    .trim(),
    
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long!")
    .max(128, "Password cannot exceed 128 characters!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    ),
    
  gender: z.enum(Gender, "Please select a valid gender (MALE, FEMALE, or OTHER)!"),
  
  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters!")
    .trim()
    .optional(),
    
  avatar: z
    .string()
    .url("Please provide a valid avatar URL!")
    .max(255, "Avatar URL cannot exceed 255 characters!")
    .optional()
    .default("default_user.png"),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

// Optional: Create a schema for password confirmation
// export const CreateUserWithConfirmationSchema = CreateUserSchema.extend({
//   confirmPassword: z.string()
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match!",
//   path: ["confirmPassword"],
// });

// export type CreateUserWithConfirmationDto = z.infer<typeof CreateUserWithConfirmationSchema>;
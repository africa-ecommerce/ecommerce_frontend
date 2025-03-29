
import * as z from "zod";



// Define LoginSchema similar to RegisterSchema
export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string()
    // Trim to remove leading/trailing whitespace
    .trim()
    // Ensure non-empty after trimming
    .min(2, { message: "Full name must be at least 2 characters long" })
    // Maximum length to prevent extremely long names
    .max(50, { message: "Full name cannot exceed 50 characters" })
    // Regex to validate name format
    .regex(/^[A-Za-z\s'-]+$/, { 
      message: "Full name can only contain letters, spaces, hyphens, and apostrophes" 
    })
    // Custom refinement for more complex validation
    .refine(
      (name) => {
        // Split the name and check for multiple words
        const parts = name.split(/\s+/);
        return parts.length >= 2;
      }, 
      { message: "Please provide both first and last name" }
    ),
  // phone: z.string().optional(),
  policy: z.boolean()
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});






// export const SettingsSchema = z
//   .object({
//     name: z.optional(z.string()),
//     isTwoFactorEnabled: z.optional(z.boolean()),
//     role: z.enum([UserRole.ADMIN, UserRole.USER]),
//     email: z.optional(z.string().email()),
//     password: z.optional(z.string().min(6)),
//     newPassword: z.optional(z.string().min(6)),
//   })
//   .refine(
//     (data) => {
//       if (data.password && !data.newPassword) {
//         return false;
//       }

//       return true;
//     },
//     {
//       message: "New password is required",
//       path: ["newPassword"],
//     }
//   )
//   .refine(
//     (data) => {
//       if (data.newPassword && !data.password) {
//         return false;
//       }

//       return true;
//     },
//     {
//       message: "Password is required",
//       path: ["password"],
//     }
//   );



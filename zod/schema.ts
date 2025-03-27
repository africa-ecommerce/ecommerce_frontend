
import * as z from "zod";



// Define LoginSchema similar to RegisterSchema
export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 6 characters required",
  }),
  fullname: z.string().min(1, {
    message: "Name is required",
  }),
  phone: z.string().optional(),
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



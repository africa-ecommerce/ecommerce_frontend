
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
 
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const userTypeSchema = z.object({
  userType: z.enum(["SUPPLIER", "PLUG"]),
});

export const plugInfoSchema = z.object({
  niches: z.array(z.string()).optional(), // Make it optional
  generalMerchant: z.boolean().optional(),
  otherNiche: z.string().optional(),
}).refine(
  (data) => data.generalMerchant || (data.niches && data.niches.length > 0), 
  { message: "Select at least one niche or choose to be a general merchant", path: ["niches"] }
).refine(
  (data) => !(data.niches?.includes("other") && !data.otherNiche?.trim()), 
  { message: "Please specify your niche", path: ["otherNiche"] }
);



// Use a custom refinement to handle both File objects and strings
// const fileSchema = z.custom<File>()
//   .refine(
//     (file) => {
//       // Skip validation if no file (optional)
//       if (!file) return true;
      
//       // If it's already a File object, check size and type
//       if (file instanceof File) {
//         const validTypes = ["image/jpeg", "image/png", "image/svg+xml"];
//         const maxSize = 5 * 1024 * 1024; // 5MB
        
//         return validTypes.includes(file.type) && file.size <= maxSize;
//       }
      
//       return false;
//     },
//     {
//       message: "Logo must be a JPEG, PNG, or SVG file less than 5MB",
//     }
//   )
//   .optional();

export const profileSchema = z.object({
  avatar: z.string().optional(),
  businessName: z.string().min(2, {
    message: "Please provide your business name",
  }),
  phone: z
    .string()
    .refine(
      (val) => {
        // If empty string or undefined, it's valid (optional)
        if (!val) return true;

        // Otherwise validate as Nigerian phone number
        return /^(\+?234|0)[\d]{10}$/.test(val);
      },
      {
        message: "Please enter a valid Nigerian phone number",
      }
    )
    .refine(
      (val) => {
        // Skip validation if empty
        if (!val) return true;

        // Check length requirements when value exists
        return val.length >= 11 && val.length <= 15;
      },
      {
        message: "Phone number must be between 11 and 15 digits",
      }
    )
    .transform((val) => {
      // Return as is if empty/undefined
      if (!val) return val;

      // Normalize phone number to standard format
      if (val.startsWith("0")) {
        return `+234${val.slice(1)}`;
      }
      if (val.startsWith("234")) {
        return `+${val}`;
      }
      return val;
    })
    .optional(),
  aboutBusiness: z.string().optional(),
  state: z.enum(
    [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
      "FCT",
    ],
    {
      message: "Please select a valid state",
    }
  ),
});


export const supplierInfoSchema = z.object({
  businessType: z
    .enum(["Warehouse", "Wholesaler", "Importer", "Local Store"], {
      invalid_type_error: "Business type must be a valid option",
    }).optional()
    .describe("The type of business the supplier operates"),

  // Pickup location is required
  pickupLocation: z
    .string()
    .min(1, "Pickup location is required")
    .max(200, "Pickup location cannot exceed 200 characters")
    .describe("The address where retailers can pick up products"),

  // Business name is required
  businessName: z
    .string()
    .min(1, "Business name is required")
    .max(100, "Business name cannot exceed 100 characters")
    .describe("The name of your business"),

  // Avatar/logo is optional
  avatar: z
    .instanceof(File)
    .optional()
    .describe("The business logo image file"),
});


// const variationSchema = z.object({
//   id: z.string(),
//   size: z.string().optional(),
//   color: z.string().optional(),
//   stock: z.number().min(0, "Stock cannot be negative"),
//   price: z.number().optional(),
// });

// // Define your dimension schema
// const dimensionSchema = z
//   .object({
//     length: z.string().optional(),
//     width: z.string().optional(),
//     height: z.string().optional(),
//   })
  
// // Main product schema
// export const productFormSchema = z
//   .object({
//     name: z.string().min(1).max(100),
//     category: z.string().min(1),
//     description: z.string().max(1000).optional(),
//     price: z
//       .string()
//       .min(1, "Price is required")
//       .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
//     weight: z.string().optional(),
//     dimensions: dimensionSchema.optional(),
//     hasVariations: z.boolean(),
//     variations: z.array(variationSchema),
//     images: z.array(z.instanceof(File)),
//     imageUrls: z.array(z.string()),
//     tags: z.array(z.string().max(20)),
//   })
//   .refine(
//     (data) => {
//       if (data.hasVariations) {
//         return (
//           data.variations.length > 0 &&
//           data.variations.every(
//             (v) =>
//               v.size && v.color && typeof v.stock === "number" && v.stock >= 0
//           )
//         );
//       }
//       return true;
//     },
//     {
//       message: "Please add at least one complete variation",
//       path: ["variations"],
//     }
//   );

// // Export the type that exactly matches the schema
// export type ProductFormData = z.infer<typeof productFormSchema>;


const variationSchema = z.object({
  id: z.string(),
  size: z.string().optional(),
  color: z.string().optional(),
  stock: z.number().min(1, "Stock cannot be negative"),
  price: z.string().min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  weight: z.string().optional(),
  dimensions: z.object({
    length: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(), 
  }).optional(),
});

// Define your dimension schema
const dimensionSchema = z
  .object({
    length: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
  })
  .optional();

// Main product schema
export const productFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    category: z.string().min(1, "Category is required"),
    description: z.string().max(1000).optional(),
    price: z
      .string()
      .min(1, "Price is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    stock: z.number().min(0, "Stock cannot be negative").optional(),
    colour: z.string().optional(),
    weight: z.string().optional(),
    dimensions: dimensionSchema,
    hasVariations: z.boolean(),
    variations: z.array(variationSchema),
    images: z.array(z.instanceof(File)),
    imageUrls: z.array(z.string()),
    
  })
  .refine(
    (data) => {
      if (data.hasVariations) {
        return (
          data.variations.length > 0 &&
          data.variations.every(
            (v) =>  v.price && typeof v.stock === "number" && v.stock >= 1
          )
        );
      } else {
        // For single product, stock is required
        return typeof data.stock === "number" && data.stock >= 1;
      }
    },
    {
      message: "Please complete all required fields",
      path: ["variations"],
    }
  );

// Export the type that exactly matches the schema
export type ProductFormData = z.infer<typeof productFormSchema>;
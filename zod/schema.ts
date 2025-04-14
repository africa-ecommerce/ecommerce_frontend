
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



// In your schema file
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
export const productSchema = z.object({
  // Required fields
  productName: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" })
    .max(100, { message: "Product name cannot exceed 100 characters" }),
  
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description cannot exceed 1000 characters" }),
  
  price: z
    .union([
      z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
        message: "Price must be a positive number"
      }),
      z.number().min(0, { message: "Price must be a positive number" })
    ])
    .transform(val => typeof val === "string" ? parseFloat(val) : val),
  
  quantity: z
    .union([
      z.string().refine(val => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
        message: "Quantity must be a positive integer"
      }),
      z.number().int().min(0, { message: "Quantity must be a positive integer" })
    ])
    .transform(val => typeof val === "string" ? parseInt(val) : val),
  
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Please select a category" }),
  
  shippingRegions: z
    .string({ required_error: "Shipping region is required" })
    .min(1, { message: "Please select a shipping region" }),
  
  // Optional fields with validation
  images: z
    .array(z.string().url({ message: "Invalid image URL" }))
    .min(1, { message: "At least one product image is required" })
    .optional(),

  // For bulk upload (optional)
  bulkFile: z.any().optional(),
});

export const supplierInfoSchema = z.object({
  // Business type is required - must be one of the specified options
  businessType: z
    .enum(["Warehouse", "Wholesaler", "Importer", "Local Store"], {
      required_error: "Please select a business type",
      invalid_type_error: "Business type must be a valid option",
    })
    .describe("The type of business the supplier operates"),
});



const variationSchema = z.object({
  id: z.string(),
  size: z.string().optional(),
  color: z.string().optional(),
  stock: z.number().min(0, "Stock cannot be negative"),
  price: z.number().optional(),
});

// Define your dimension schema
const dimensionSchema = z
  .object({
    length: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
  })
  
// Main product schema
export const productFormSchema = z
  .object({
    name: z.string().min(1).max(100),
    category: z.string().min(1),
    description: z.string().max(1000).optional(),
    price: z
      .string()
      .min(1, "Price is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    weight: z.string().optional(),
    dimensions: dimensionSchema.optional(),
    hasVariations: z.boolean(),
    variations: z.array(variationSchema),
    images: z.array(z.instanceof(File)),
    imageUrls: z.array(z.string()),
    tags: z.array(z.string().max(20)),
  })
  .refine(
    (data) => {
      if (data.hasVariations) {
        return (
          data.variations.length > 0 &&
          data.variations.every(
            (v) =>
              v.size && v.color && typeof v.stock === "number" && v.stock >= 0
          )
        );
      }
      return true;
    },
    {
      message: "Please add at least one complete variation",
      path: ["variations"],
    }
  );

// Export the type that exactly matches the schema
export type ProductFormData = z.infer<typeof productFormSchema>;
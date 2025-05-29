
import { getLgasForState, getStatesAsStrings } from "@/lib/utils";
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

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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





export const profileSchema = z.object({
 
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






export const supplierAddressSchema = z.object({
  streetAddress: z
    .string()
    .min(1, "Street address is required")
    .max(200, "Street address must not exceed 200 characters"),

  directions: z
    .string()
    .max(500, "Directions must not exceed 500 characters")
    .optional()
    .or(z.literal("")),

  state: z
    .string()
    .min(1, "State is required")
    .refine((state) => {
      const states = getStatesAsStrings();
      return states.some((s) => s.toLowerCase() === state.toLowerCase());
    }, "Please select a valid state"),

  lga: z.string().min(1, "Local Government Area is required"),
}).refine(
  (data) => {
    // Only validate LGA if both state and lga are provided
    if (!data.state || !data.lga) return true;

    try {
      const lgas = getLgasForState(data.state);
      return lgas.some((lga: string) => lga.toLowerCase() === data.lga.toLowerCase());
    } catch {
      return false;
    }
  },
  {
    message: "Please select a valid Local Government Area for the selected state",
    path: ["lga"],
  }
);


export const supplierInfoSchema = z.object({
  businessType: z
    .enum(["Warehouse", "Wholesaler", "Importer", "Local Store"], {
      invalid_type_error: "Business type must be a valid option",
    }).optional()
    .describe("The type of business the supplier operates"),

  

  // Business name is required
  businessName: z
    .string()
    .min(1, "Business name is required")
    .max(100, "Business name cannot exceed 100 characters")
    .describe("The name of your business"),

    phone: z
    .string().min(1, "Phone number is required")
    .refine(
      (val) => {
        
        

        // Otherwise validate as Nigerian phone number
        return /^(\+?234|0)[\d]{10}$/.test(val);
      },
      {
        message: "Please enter a valid Nigerian phone number",
      }
    )
    .refine(
      (val) => {
       

        // Check length requirements when value exists
        return val.length >= 11 && val.length <= 15;
      },
      {
        message: "Phone number must be between 11 and 15 digits",
      }
    )
    .transform((val) => {
      
    

      // Normalize phone number to standard format
      if (val.startsWith("0")) {
        return `+234${val.slice(1)}`;
      }
      if (val.startsWith("234")) {
        return `+${val}`;
      }
      return val;
    }),

  // Avatar/logo is optional
  avatar: z
    .instanceof(File)
    .optional()
    .describe("The business logo image file"),
});



const variationSchema = z.object({
  id: z.string(),
  size: z.string().optional(),
  color: z.string().optional(),
  stock: z.number().or(z.string()).optional(),
})

// Main product schema with improved validation
export const productFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    category: z.string().min(1, "Category is required"),
    description: z.string().max(1000).optional(),
    size: z.string().optional(),
    price: z.number().min(1, "Price is required"),
    stock: z.number().optional(),
    color: z.string().optional(),
    hasVariations: z.boolean(),
    variations: z.array(variationSchema),
    images: z.array(z.instanceof(File)),
    imageUrls: z.array(z.string()),
  })

  export const updateProductFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    category: z.string().min(1, "Category is required"),
    description: z.string().max(1000).optional(),
    size: z.string().optional(),
    price: z.number().min(1, "Price is required"),
    stock: z.number().optional(),
    color: z.string().optional(),
    hasVariations: z.boolean(),
    variations: z.array(variationSchema),
    images: z.array(z.instanceof(File)).optional(),
    imageUrls: z.array(z.string()).optional(),
  })

  export type UpdateFormData = z.infer<typeof updateProductFormSchema>
 

// Export the type that exactly matches the schema
export type ProductFormData = z.infer<typeof productFormSchema>

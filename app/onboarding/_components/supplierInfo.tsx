// "use client";
// import { useEffect, useState, useRef } from "react";
// import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useFormResolver } from "@/hooks/useFormResolver";
// import { supplierInfoSchema } from "@/zod/schema";
// import { FormData } from "../page";
// import { useRouter } from "next/navigation";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import Image from "next/image";
// import { errorToast } from "@/components/ui/use-toast-advanced";

// export type BusinessType =
//   | "Warehouse"
//   | "Wholesaler"
//   | "Importer"
//   | "Local Store";

// const businessTypeOptions = [
//   {
//     value: "Warehouse",
//     label: "Warehouse",
//   },
//   {
//     value: "Wholesaler",
//     label: "Wholesaler",
//   },
//   {
//     value: "Importer",
//     label: "Importer",
//   },
//   {
//     value: "Local Store",
//     label: "Local Store",
//   },
// ];

// // Description mapping - separate from selection options
// const businessTypeDescriptions = {
//   Warehouse: "I operate a warehouse with inventory",
//   Wholesaler: "I sell products in bulk to retailers",
//   Importer: "I import products from other countries",
//   "Local Store": "I have a physical retail location",
// };

// interface SupplierInfoProps {
//   onNext: () => void;
//   onPrev: () => void;
//   update: (p: FormData) => void;
//   initialData?: {
//     businessType?: BusinessType;
//     businessName?: string;
//     avatar?: File;
//   };
// }

// export default function SupplierInfo({
//   onNext,
//   onPrev,
//   update,
//   initialData,
// }: SupplierInfoProps) {
//   const router = useRouter();
//   const [isSuccess, setIsSuccess] = useState(false);
//   // Track selected business type for description display
//   const [currentBusinessType, setCurrentBusinessType] =
//     useState<BusinessType | null>(initialData?.businessType || null);

//   // Logo upload state
//   const [logoUrl, setLogoUrl] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const logoInputRef = useRef<HTMLInputElement>(null);
//   const logoDropAreaRef = useRef<HTMLDivElement>(null);

//   const {
//     form,
//     form: {
//       control,
//       setValue,
//       submit: next,
//     },
//   } = useFormResolver(
//     (data) => {
//       update({ supplierInfo: data });
//       onNext();
//       return Promise.resolve(true);
//     },
//     supplierInfoSchema

  
//   );

//   useEffect(() => {
//     // Set initial values if provided
//     if (initialData?.businessType) {
//       setValue("businessType", initialData.businessType);
//       setCurrentBusinessType(initialData.businessType);
//     } else {
//       // Explicitly set it as undefined when not provided
//       setValue("businessType", undefined);
//     }

   

//     // Initialize business name to empty string to ensure it's controlled from the start
//     setValue("businessName", initialData?.businessName || "");

//     // Initialize avatar if provided
//     if (initialData?.avatar && initialData.avatar instanceof File) {
//       setValue("avatar", initialData.avatar);
//       setLogoUrl(URL.createObjectURL(initialData.avatar));
//     }
//   }, [initialData, setValue]);

//   // Handle drag and drop for logo
//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (logoDropAreaRef.current) {
//       logoDropAreaRef.current.classList.add("border-primary");
//     }
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (logoDropAreaRef.current) {
//       logoDropAreaRef.current.classList.remove("border-primary");
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (logoDropAreaRef.current) {
//       logoDropAreaRef.current.classList.remove("border-primary");
//     }

//     if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
//       handleLogoFile(e.dataTransfer.files[0]);
//     }
//   };

//   const handleLogoFile = (file: File) => {
//     if (file.size > 5 * 1024 * 1024) {
//       errorToast("Logo size must be less than 5MB");
//       return;
//     }

//     // Check file type
//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/svg+xml",
//       "image/webp",
//     ];
//     if (!allowedTypes.includes(file.type)) {
//       errorToast("Only JPEG, PNG, WEBP and SVG formats are allowed");
//       return;
//     }

//     // Create object URL for preview
//     const objectUrl = URL.createObjectURL(file);
//     setLogoUrl(objectUrl);
//     setValue("avatar", file);

//     setUploading(true);
//     setTimeout(() => {
//       setUploading(false);
//     }, 1000);
//   };

//   const handleLogoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleLogoFile(e.target.files[0]);
//     }
//   };

//   const triggerLogoInput = () => {
//     logoInputRef.current?.click();
//   };

//   const removeLogo = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (logoUrl) {
//       URL.revokeObjectURL(logoUrl);
//     }
//     setLogoUrl(null);
//     setValue("avatar", undefined);
//     if (logoInputRef.current) {
//       logoInputRef.current.value = "";
//     }
//   };



//   return (
//     <div className="w-full max-w-md mx-auto">
//       <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
//         Business Information
//       </h1>
//       <p className="mb-8 text-center text-gray-600">
//         Please provide your business details to help us customize your
//         experience.
//       </p>

//       <Card className="p-6">
//         <Form {...form}>
//           <form className="space-y-6">
//             {/* Logo Upload */}
//             <FormField
//               control={control}
//               name="avatar"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">
//                     Brand Logo<span className="text-gray-500"> (Optional)</span>
//                   </FormLabel>
//                   <FormControl>
//                     <div
//                       ref={logoDropAreaRef}
//                       onDragOver={handleDragOver}
//                       onDragLeave={handleDragLeave}
//                       onDrop={handleDrop}
//                       className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 p-6 transition-colors hover:border-primary hover:bg-muted/50"
//                       onClick={triggerLogoInput}
//                     >
//                       <input
//                         ref={logoInputRef}
//                         type="file"
//                         id="avatar"
//                         className="hidden"
//                         accept="image/jpeg,image/png,image/svg+xml,image/webp"
//                         onChange={handleLogoInputChange}
//                       />

//                       {logoUrl ? (
//                         <div className="relative flex flex-col items-center">
//                           <div className="relative h-40 w-40 overflow-hidden rounded-lg">
//                             <Image
//                               src={logoUrl}
//                               alt="Brand Logo Preview"
//                               className="object-contain"
//                               fill
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={removeLogo}
//                             className="mt-4 flex items-center gap-1 rounded-lg bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground"
//                           >
//                             Remove Logo
//                           </button>
//                         </div>
//                       ) : (
//                         <>
//                           <div className="rounded-full bg-primary/10 p-3 text-primary">
//                             <Upload className="h-6 w-6" />
//                           </div>
//                           <div className="mt-3 text-center">
//                             <p className="font-medium">
//                               Drag & drop your logo here
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                               or click to browse files
//                             </p>
//                             <p className="mt-1 text-xs text-muted-foreground">
//                               JPEG, PNG, SVG, WEBP (max 5MB)
//                             </p>
//                           </div>
//                           <Button
//                             variant="outline"
//                             size="lg"
//                             className="mt-4"
//                             type="button"
//                           >
//                             Select Logo
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Business Name */}
//             <FormField
//               control={control}
//               name="businessName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">Business Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter your business name"
//                       {...field}
//                       value={field.value || ""} // Ensure the value is never undefined
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Phone Field - Fixed from businessType to phone */}
//             <FormField
//               control={control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">Phone number</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter your phone number"
//                       {...field}
//                       value={field.value || ""} // Ensure the value is never undefined
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Business Type */}
//             <FormField
//               control={control}
//               name="businessType"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">
//                     Business Type{" "}
//                     <span className="text-gray-500">(Optional)</span>
//                   </FormLabel>
//                   <FormControl>
//                     <Select
//                       onValueChange={(value) => {
//                         field.onChange(value);
//                         setCurrentBusinessType(value as BusinessType);
//                       }}
//                       value={field.value || ""}
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select your business type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {businessTypeOptions.map((option) => (
//                           <SelectItem
//                             key={option.value}
//                             value={option.value}
//                             className="focus:bg-orange-500 focus:text-white hover:bg-orange-500 hover:text-white"
//                           >
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   {currentBusinessType && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       {businessTypeDescriptions[currentBusinessType]}
//                     </p>
//                   )}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

          

//             <div className="mt-6 flex justify-between">
//               <Button
//                 type="button"
//                 onClick={onPrev}
//                 variant="outline"
//                 className="px-6"
//                 disabled={ uploading}
//               >
//                 <ArrowLeft className="mr-2 h-5 w-5" /> Back
//               </Button>
//               <Button
              
//                 disabled={ uploading}
//                 className="bg-orange-500 hover:bg-orange-600 px-6"
//                 onClick={next}
//               >
//                 Continue <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </Card>
//     </div>
//   );
// }





"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFormResolver } from "@/hooks/useFormResolver";
import { supplierInfoSchema } from "@/zod/schema";
import { FormData } from "../page";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { errorToast } from "@/components/ui/use-toast-advanced";

export type BusinessType =
  | "Warehouse"
  | "Wholesaler"
  | "Importer"
  | "Local Store";

const businessTypeOptions = [
  {
    value: "Warehouse",
    label: "Warehouse",
  },
  {
    value: "Wholesaler",
    label: "Wholesaler",
  },
  {
    value: "Importer",
    label: "Importer",
  },
  {
    value: "Local Store",
    label: "Local Store",
  },
];

// Description mapping - separate from selection options
const businessTypeDescriptions = {
  Warehouse: "I operate a warehouse with inventory",
  Wholesaler: "I sell products in bulk to retailers",
  Importer: "I import products from other countries",
  "Local Store": "I have a physical retail location",
};

interface BusinessNameValidation {
  isChecking: boolean;
  isAvailable: boolean | null;
  message: string;
}

interface SupplierInfoProps {
  onNext: () => void;
  onPrev: () => void;
  update: (p: FormData) => void;
  initialData?: {
    businessType?: BusinessType;
    businessName?: string;
    avatar?: File;
  };
}

export default function SupplierInfo({
  onNext,
  onPrev,
  update,
  initialData,
}: SupplierInfoProps) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  // Track selected business type for description display
  const [currentBusinessType, setCurrentBusinessType] =
    useState<BusinessType | null>(initialData?.businessType || null);

  // Logo upload state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const logoDropAreaRef = useRef<HTMLDivElement>(null);

  // Business name validation state
  const [businessNameValidation, setBusinessNameValidation] =
    useState<BusinessNameValidation>({
      isChecking: false,
      isAvailable: null,
      message: "",
    });

 const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
 
  const {
    form,
    form: { control, setValue, submit: next, watch },
  } = useFormResolver((data) => {
    // Check if business name is available before proceeding
    if (businessNameValidation.isAvailable === false) {
      errorToast("Please choose an available business name before continuing");
      return Promise.reject("Business name not available");
    }

    update({ supplierInfo: data });
    onNext();
    return Promise.resolve(true);
  }, supplierInfoSchema);

  // Watch business name field for changes
  const watchedBusinessName = watch("businessName");

  // Debounced business name validation function
  const validateBusinessName = useCallback(async (businessName: string) => {
    if (!businessName || businessName.trim().length < 2) {
      setBusinessNameValidation({
        isChecking: false,
        isAvailable: null,
        message: "",
      });
      return;
    }

    setBusinessNameValidation((prev) => ({
      ...prev,
      isChecking: true,
      message: "Checking availability...",
    }));

    try {
      const response = await fetch("/api/onboarding/supplier/businessName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: businessName.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBusinessNameValidation({
          isChecking: false,
          isAvailable: data.available,
          message: data.available
            ? "✓ Great! This business name is available."
            : "✗ This business name is already taken. Please try another one.",
        });
      } else {
        setBusinessNameValidation({
          isChecking: false,
          isAvailable: null,
          message: "Unable to check availability. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error checking business name:", error);
      setBusinessNameValidation({
        isChecking: false,
        isAvailable: null,
        message: "Unable to check availability. Please try again.",
      });
    }
  }, []);

  // Effect to handle debounced business name validation
  useEffect(() => {
    if (watchedBusinessName) {
      // Clear existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set new timeout for debounced validation
      debounceTimeoutRef.current = setTimeout(() => {
        validateBusinessName(watchedBusinessName);
      }, 800); // 800ms delay
    }

    // Cleanup timeout on component unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [watchedBusinessName, validateBusinessName]);

  useEffect(() => {
    // Set initial values if provided
    if (initialData?.businessType) {
      setValue("businessType", initialData.businessType);
      setCurrentBusinessType(initialData.businessType);
    } else {
      // Explicitly set it as undefined when not provided
      setValue("businessType", undefined);
    }

    // Initialize business name to empty string to ensure it's controlled from the start
    setValue("businessName", initialData?.businessName || "");

    // Initialize avatar if provided
    if (initialData?.avatar && initialData.avatar instanceof File) {
      setValue("avatar", initialData.avatar);
      setLogoUrl(URL.createObjectURL(initialData.avatar));
    }
  }, [initialData, setValue]);

  // Handle drag and drop for logo
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (logoDropAreaRef.current) {
      logoDropAreaRef.current.classList.add("border-primary");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (logoDropAreaRef.current) {
      logoDropAreaRef.current.classList.remove("border-primary");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (logoDropAreaRef.current) {
      logoDropAreaRef.current.classList.remove("border-primary");
    }

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handleLogoFile(e.dataTransfer.files[0]);
    }
  };

  const handleLogoFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      errorToast("Logo size must be less than 5MB");
      return;
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      errorToast("Only JPEG, PNG, WEBP and SVG formats are allowed");
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setLogoUrl(objectUrl);
    setValue("avatar", file);

    setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 1000);
  };

  const handleLogoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleLogoFile(e.target.files[0]);
    }
  };

  const triggerLogoInput = () => {
    logoInputRef.current?.click();
  };

  const removeLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (logoUrl) {
      URL.revokeObjectURL(logoUrl);
    }
    setLogoUrl(null);
    setValue("avatar", undefined);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  // Check if form can continue
  const canContinue = () => {
    return (
      !businessNameValidation.isChecking &&
      (businessNameValidation.isAvailable === true || !watchedBusinessName) &&
      !uploading
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
        Business Information
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Please provide your business details to help us customize your
        experience.
      </p>

      <Card className="p-6">
        <Form {...form}>
          <form className="space-y-6">
            {/* Logo Upload */}
            <FormField
              control={control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Brand Logo<span className="text-gray-500"> (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <div
                      ref={logoDropAreaRef}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 p-6 transition-colors hover:border-primary hover:bg-muted/50"
                      onClick={triggerLogoInput}
                    >
                      <input
                        ref={logoInputRef}
                        type="file"
                        id="avatar"
                        className="hidden"
                        accept="image/jpeg,image/png,image/svg+xml,image/webp"
                        onChange={handleLogoInputChange}
                      />

                      {logoUrl ? (
                        <div className="relative flex flex-col items-center">
                          <div className="relative h-40 w-40 overflow-hidden rounded-lg">
                            <Image
                              src={logoUrl}
                              alt="Brand Logo Preview"
                              className="object-contain"
                              fill
                            />
                          </div>
                          <button
                            type="button"
                            onClick={removeLogo}
                            className="mt-4 flex items-center gap-1 rounded-lg bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground"
                          >
                            Remove Logo
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <Upload className="h-6 w-6" />
                          </div>
                          <div className="mt-3 text-center">
                            <p className="font-medium">
                              Drag & drop your logo here
                            </p>
                            <p className="text-sm text-muted-foreground">
                              or click to browse files
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              JPEG, PNG, SVG, WEBP (max 5MB)
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="lg"
                            className="mt-4"
                            type="button"
                          >
                            Select Logo
                          </Button>
                        </>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Name with Validation */}
            <FormField
              control={control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Business Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your business name"
                        {...field}
                        value={field.value || ""} // Ensure the value is never undefined
                        className={`pr-10 ${
                          businessNameValidation.isAvailable === false
                            ? "border-red-500 focus:border-red-500"
                            : businessNameValidation.isAvailable === true
                            ? "border-green-500 focus:border-green-500"
                            : ""
                        }`}
                      />
                      {/* Validation Icons */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {businessNameValidation.isChecking && (
                          <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                        )}
                        {!businessNameValidation.isChecking &&
                          businessNameValidation.isAvailable === true && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        {!businessNameValidation.isChecking &&
                          businessNameValidation.isAvailable === false && (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                      </div>
                    </div>
                  </FormControl>

                  {/* Validation Message */}
                  {businessNameValidation.message && (
                    <p
                      className={`text-sm flex items-center gap-1 ${
                        businessNameValidation.isAvailable === false
                          ? "text-red-600"
                          : businessNameValidation.isAvailable === true
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {businessNameValidation.message}
                    </p>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field - Fixed from businessType to phone */}
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      {...field}
                      value={field.value || ""} // Ensure the value is never undefined
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Type */}
            <FormField
              control={control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Business Type{" "}
                    <span className="text-gray-500">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setCurrentBusinessType(value as BusinessType);
                      }}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypeOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="focus:bg-orange-500 focus:text-white hover:bg-orange-500 hover:text-white"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {currentBusinessType && (
                    <p className="text-xs text-gray-500 mt-1">
                      {businessTypeDescriptions[currentBusinessType]}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                onClick={onPrev}
                variant="outline"
                className="px-6"
                disabled={uploading}
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
              </Button>
              <Button
                disabled={!canContinue()}
                className={`px-6 ${
                  canContinue()
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={next}
              >
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}



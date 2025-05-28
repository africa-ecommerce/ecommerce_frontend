// "use client";
// import { useEffect, useState, useRef } from "react";
// import { ArrowLeft, MapPin, Upload } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useFormResolver } from "@/hooks/useFormResolver";
// import { supplierInfoSchema } from "@/zod/schema";
// import { FormData } from "../page";
// import { useRouter } from "next/navigation";
// import SupplierSuccess from "./supplier-success";
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
//   onSubmit: (data: FormData) => Promise<any>;
//   onPrev: () => void;
//   formData: FormData;
//   initialData?: {
//     businessType?: BusinessType;
//     pickupLocation?: string;
//     businessName?: string;
//     avatar?: File;
//   };
// }

// export default function SupplierInfo({
//   onSubmit,
//   onPrev,
//   formData,
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
//       handleSubmit,
//       formState: { isSubmitting },
//     },
//   } = useFormResolver(
//     async (data) => {
//       try {
//         // Merge existing formData with new supplier info
//         const result = await onSubmit({
//           ...formData,
//           supplierInfo: data,
//         } as FormData);

//         // Return the result to indicate success/failure
//         return result;
//       } catch (error) {
//         console.error("Form submission error:", error);
//         throw error; // Re-throw to ensure form state updates correctly
//       }
//     },
//     supplierInfoSchema,
//     () => setIsSuccess(true)
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

//     // Initialize pickup location to empty string instead of undefined
//     setValue("pickupLocation", initialData?.pickupLocation || "");

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
//     const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
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

//   if (isSuccess) {
//     return <SupplierSuccess />;
//   }

//   const onFormSubmit = handleSubmit((data) => {
//     return onSubmit({
//       ...formData,
//       supplierInfo: data,
//     } as FormData)
//       .then((result) => {
//         // Only set success if result is not null
//         if (result !== null) {
//           setIsSuccess(true);
//         }
//         return result;
//       })
//       .catch((error) => {
//         console.error("Form submission error:", error);
//         throw error;
//       });
//   });

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
//           <form onSubmit={onFormSubmit} className="space-y-6">
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

//             {/* Pickup Location */}
//             <FormField
//               control={control}
//               name="pickupLocation"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">
//                     Pickup Location <span className="text-red-500">*</span>
//                   </FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Input
//                         placeholder="Enter your pickup address"
//                         className="pl-10"
//                         {...field}
//                         value={field.value || ""}
//                       />
//                       <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                     </div>
//                   </FormControl>
//                   <p className="text-xs text-gray-500 mt-1">
//                     This is where your products would be picked up
//                   </p>
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
//                 disabled={isSubmitting || uploading}
//               >
//                 <ArrowLeft className="mr-2 h-5 w-5" /> Back
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isSubmitting || uploading}
//                 className="bg-orange-500 hover:bg-orange-600 px-6"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </Card>
//     </div>
//   );
// }





"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Loader2, MapPin, Upload  } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFormResolver } from "@/hooks/useFormResolver";
import { useDebounce } from "@/hooks/use-debounce";
import { supplierInfoSchema } from "@/zod/schema";
import { FormData } from "../page";
import { useRouter } from "next/navigation";
import SupplierSuccess from "./supplier-success";
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

// Location suggestion interface
interface LocationSuggestion {
  address: string;
  description?: string;
  // Add other properties based on your API response
}

interface SupplierInfoProps {
  onSubmit: (data: FormData) => Promise<any>;
  onPrev: () => void;
  formData: FormData;
  initialData?: {
    businessType?: BusinessType;
    pickupLocation?: string;
    businessName?: string;
    avatar?: File;
  };
}

export default function SupplierInfo({
  onSubmit,
  onPrev,
  formData,
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

  // Location autocomplete state
  const [locationInput, setLocationInput] = useState(
    initialData?.pickupLocation || ""
  );
  const [locationSuggestions, setLocationSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Debounce the location input
  const debouncedLocationInput = useDebounce(locationInput, 300);

  const {
    form,
    form: {
      control,
      setValue,
      handleSubmit,
      formState: { isSubmitting },
    },
  } = useFormResolver(
    async (data) => {
      try {
        // Merge existing formData with new supplier info
        const result = await onSubmit({
          ...formData,
          supplierInfo: data,
        } as FormData);

        // Return the result to indicate success/failure
        return result;
      } catch (error) {
        console.error("Form submission error:", error);
        throw error; // Re-throw to ensure form state updates correctly
      }
    },
    supplierInfoSchema,
    () => setIsSuccess(true)
  );

  useEffect(() => {
    // Set initial values if provided
    if (initialData?.businessType) {
      setValue("businessType", initialData.businessType);
      setCurrentBusinessType(initialData.businessType);
    } else {
      // Explicitly set it as undefined when not provided
      setValue("businessType", undefined);
    }

    // Initialize pickup location to empty string instead of undefined
    setValue("pickupLocation", initialData?.pickupLocation || "");

    // Initialize business name to empty string to ensure it's controlled from the start
    setValue("businessName", initialData?.businessName || "");

    // Initialize avatar if provided
    if (initialData?.avatar && initialData.avatar instanceof File) {
      setValue("avatar", initialData.avatar);
      setLogoUrl(URL.createObjectURL(initialData.avatar));
    }
  }, [initialData, setValue]);

  // Fetch location suggestions when debounced input changes
  useEffect(() => {
    const fetchLocationSuggestions = async () => {
      if (!debouncedLocationInput.trim() || debouncedLocationInput.length < 3) {
        setLocationSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const response = await fetch(
          `/api/location?address=${encodeURIComponent(debouncedLocationInput)}`
        );
        if (response.ok) {
          const suggestions = await response.json();
          setLocationSuggestions(suggestions?.data.description || []);
          setShowSuggestions(true);
          setSelectedSuggestionIndex(-1);
        } else {
          setLocationSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setLocationSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetchLocationSuggestions();
  }, [debouncedLocationInput]);

  // Handle location input change
  const handleLocationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setLocationInput(value);
    setValue("pickupLocation", value);
    setSelectedSuggestionIndex(-1);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
    setLocationInput(suggestion.address);
    setValue("pickupLocation", suggestion.address);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  // Handle keyboard navigation for suggestions
  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || locationSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < locationSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (
          selectedSuggestionIndex >= 0 &&
          selectedSuggestionIndex < locationSuggestions.length
        ) {
          handleSuggestionSelect(locationSuggestions[selectedSuggestionIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  if (isSuccess) {
    return <SupplierSuccess />;
  }

  const onFormSubmit = handleSubmit((data) => {
    return onSubmit({
      ...formData,
      supplierInfo: data,
    } as FormData)
      .then((result) => {
        // Only set success if result is not null
        if (result !== null) {
          setIsSuccess(true);
        }
        return result;
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        throw error;
      });
  });

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
          <form onSubmit={onFormSubmit} className="space-y-6">
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

            {/* Business Name */}
            <FormField
              control={control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Business Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your business name"
                      {...field}
                      value={field.value || ""} // Ensure the value is never undefined
                    />
                  </FormControl>
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

            {/* Pickup Location with Autocomplete */}
            <FormField
              control={control}
              name="pickupLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Pickup Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="relative">
                        <Input
                          ref={locationInputRef}
                          placeholder="Enter your pickup address"
                          className="pl-10 pr-8"
                          value={locationInput}
                          onChange={handleLocationInputChange}
                          onKeyDown={handleLocationKeyDown}
                          onFocus={() => {
                            if (locationSuggestions.length > 0) {
                              setShowSuggestions(true);
                            }
                          }}
                          autoComplete="off"
                        />
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        {loadingSuggestions && (
                          <Loader2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 animate-spin" />
                        )}
                      </div>

                      {/* Suggestions Dropdown */}
                      {showSuggestions && locationSuggestions.length > 0 && (
                        <div
                          ref={suggestionsRef}
                          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
                        >
                          {locationSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 ${
                                selectedSuggestionIndex === index
                                  ? "bg-orange-50 border-orange-200"
                                  : ""
                              }`}
                              onClick={() => handleSuggestionSelect(suggestion)}
                              onMouseEnter={() =>
                                setSelectedSuggestionIndex(index)
                              }
                            >
                              <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {suggestion.address}
                                  </p>
                                  {suggestion.description && (
                                    <p className="text-xs text-gray-500 truncate">
                                      {suggestion.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">
                    This is where your products would be picked up
                  </p>
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
                disabled={isSubmitting || uploading}
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || uploading}
                className="bg-orange-500 hover:bg-orange-600 px-6"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
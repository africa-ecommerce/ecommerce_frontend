

// "use client";

// import { ArrowLeft } from "lucide-react";
// import { useFormResolver } from "@/hooks/useFormResolver";
// import { profileSchema } from "@/zod/schema";
// import { FormData } from "../page";

// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";
// import { Controller } from "react-hook-form";
// import PlugSuccess from "./plug-success";
// import { useState } from "react";

// interface ProfileProps {
//   onSubmit: (data: FormData) => Promise<any>;
//   onPrev: () => void;
//   formData: FormData; // Add this line to receive existing form data
// }
// export default function ProfileStep({
//   onSubmit,
//   onPrev,
//   formData, // Add this parameter
// }: ProfileProps) {
//   const [isSuccess, setIsSuccess] = useState(false);
  

//   const {
//     form: { register, submit, control, errors, isSubmitting },
//   } = useFormResolver(
//     async (data) => {
//       // Merge existing formData with new supplier info
//       const result = await onSubmit({
//         ...formData,
//         profile: data,
//       } as FormData);
//       return result;
//     },
//     profileSchema,
//     () => setIsSuccess(true)
//   );

//    if (isSuccess) {
//     return <PlugSuccess />;
//   }


//   return (
//     <>
//       <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
//         Create Your Profile
//       </h1>
//       <p className="mb-8 text-center text-gray-600">
//         Tell us about yourself and your business to personalize your experience.
//       </p>

//       <Card className="p-6 mb-8">
//         <form onSubmit={submit} method={"POST"}>
//           <div className="space-y-6">
//             {/* Business Name */}
//             <div className="space-y-2">
//               <Label htmlFor="businessName">Business Name</Label>
//               <Input
//                 id="businessName"
//                 placeholder="Enter your business name"
//                 {...register("businessName")}
//               />
//               {errors.businessName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.businessName.message}
//                 </p>
//               )}
//             </div>

//             {/* Phone Number */}
//             <div className="space-y-2">
//               <Label htmlFor="phone">
//                 Phone Number<span className="text-gray-500"> (Optional)</span>
//               </Label>
//               <Input
//                 id="phone"
//                 placeholder="Enter your phone number"
//                 {...register("phone")}
//               />
//              {errors.phone && (
//                 <p className="text-red-500 text-sm">
//                   {errors.phone.message}
//                 </p>
//               )}
              
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="state">State</Label>
//               <Controller
//                 name="state"
//                 control={control}
//                 render={({ field }) => (
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <SelectTrigger id="state">
//                       <SelectValue placeholder="Select your state" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {[
//                         "Abia",
//                         "Adamawa",
//                         "Akwa Ibom",
//                         "Anambra",
//                         "Bauchi",
//                         "Bayelsa",
//                         "Benue",
//                         "Borno",
//                         "Cross River",
//                         "Delta",
//                         "Ebonyi",
//                         "Edo",
//                         "Ekiti",
//                         "Enugu",
//                         "Gombe",
//                         "Imo",
//                         "Jigawa",
//                         "Kaduna",
//                         "Kano",
//                         "Katsina",
//                         "Kebbi",
//                         "Kogi",
//                         "Kwara",
//                         "Lagos",
//                         "Nasarawa",
//                         "Niger",
//                         "Ogun",
//                         "Ondo",
//                         "Osun",
//                         "Oyo",
//                         "Plateau",
//                         "Rivers",
//                         "Sokoto",
//                         "Taraba",
//                         "Yobe",
//                         "Zamfara",
//                         "FCT",
//                       ].map((state) => (
//                         <SelectItem key={state} value={state}>
//                           {state}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//               {errors.state && (
//                 <p className="text-red-500 text-sm">{errors.state.message}</p>
//               )}
//             </div>

//             {/* About Business */}
//             <div className="space-y-2">
//               <Label htmlFor="bio">
//                 About Your Business
//                 <span className="text-gray-500"> (Optional)</span>
//               </Label>
//               <Textarea
//                 id="bio"
//                 placeholder="Tell us about your business and goals"
//                 rows={3}
//                 {...register("aboutBusiness")}
//               />
              
//             </div>
//           </div>
//         </form>
//       </Card>

//       <div className="flex justify-between">
//         <Button variant="outline" className="px-6" onClick={onPrev}>
//           <ArrowLeft className="mr-2 h-5 w-5" /> Back
//         </Button>
//         <Button
//           onClick={submit}
//           disabled={ isSubmitting}
//           className="bg-orange-500 hover:bg-orange-600 px-6"
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </Button>
//       </div>
//     </>
//   );
// }



"use client";

import { ArrowLeft, Upload } from "lucide-react";
import { useFormResolver } from "@/hooks/useFormResolver";
import { profileSchema } from "@/zod/schema";
import { FormData } from "../page";
import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller } from "react-hook-form";
import PlugSuccess from "./plug-success";
import Image from "next/image";
import { errorToast } from "@/components/ui/use-toast-advanced";

interface ProfileProps {
  onSubmit: (data: FormData) => Promise<any>;
  onPrev: () => void;
  formData: FormData; // Add this line to receive existing form data
  initialData?: {
    businessName?: string;
    phone?: string;
    state?: string;
    aboutBusiness?: string;
    professionalPhoto?: File;
  };
}

export default function ProfileStep({
  onSubmit,
  onPrev,
  formData, // Add this parameter
  initialData,
}: ProfileProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  // Professional photo upload state
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const photoDropAreaRef = useRef<HTMLDivElement>(null);

  const {
    form,
    form: { register, submit, control, errors, isSubmitting, setValue },
  } = useFormResolver(
    async (data) => {
      // Merge existing formData with new supplier info
      const result = await onSubmit({
        ...formData,
        profile: data,
      } as FormData);
      return result;
    },
    profileSchema,
    () => setIsSuccess(true)
  );

  useEffect(() => {
    // Set initial values if provided
    if (initialData?.businessName) {
      setValue("businessName", initialData.businessName);
    }
    if (initialData?.phone) {
      setValue("phone", initialData.phone);
    }
    if (initialData?.state) {
      setValue("state", initialData.state);
    }
    if (initialData?.aboutBusiness) {
      setValue("aboutBusiness", initialData.aboutBusiness);
    }

    // Initialize professional photo if provided
    if (
      initialData?.professionalPhoto &&
      initialData.professionalPhoto instanceof File
    ) {
      setValue("professionalPhoto", initialData.professionalPhoto);
      setPhotoUrl(URL.createObjectURL(initialData.professionalPhoto));
    }
  }, [initialData, setValue]);

  // Handle drag and drop for professional photo
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (photoDropAreaRef.current) {
      photoDropAreaRef.current.classList.add("border-primary");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (photoDropAreaRef.current) {
      photoDropAreaRef.current.classList.remove("border-primary");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (photoDropAreaRef.current) {
      photoDropAreaRef.current.classList.remove("border-primary");
    }

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handlePhotoFile(e.dataTransfer.files[0]);
    }
  };

  const handlePhotoFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      errorToast("Photo size must be less than 5MB");
      return;
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      errorToast("Only JPEG, PNG, and WEBP formats are allowed");
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setPhotoUrl(objectUrl);
    setValue("professionalPhoto", file);

    setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 1000);
  };

  const handlePhotoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handlePhotoFile(e.target.files[0]);
    }
  };

  const triggerPhotoInput = () => {
    photoInputRef.current?.click();
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoUrl) {
      URL.revokeObjectURL(photoUrl);
    }
    setPhotoUrl(null);
    setValue("professionalPhoto", undefined);
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  if (isSuccess) {
    return <PlugSuccess />;
  }

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
        Create Your Profile
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Tell us about yourself and your business to personalize your experience.
      </p>

      <Card className="p-6 mb-8">
        <Form {...form}>
          <form onSubmit={submit} method={"POST"}>
            <div className="space-y-6">
              {/* Professional Photo Upload */}
              <FormField
                control={control}
                name="professionalPhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Professional Photo
                    </FormLabel>
                    <FormControl>
                      <div
                        ref={photoDropAreaRef}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className="flex cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/30 w-40 h-40 mx-auto transition-colors hover:border-primary hover:bg-muted/50"
                        onClick={triggerPhotoInput}
                      >
                        <input
                          ref={photoInputRef}
                          type="file"
                          id="professionalPhoto"
                          className="hidden"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoInputChange}
                        />

                        {photoUrl ? (
                          <div className="relative flex flex-col items-center w-full h-full">
                            <div className="relative w-full h-full overflow-hidden rounded-full">
                              <Image
                                src={photoUrl}
                                alt="Professional Photo Preview"
                                className="object-cover"
                                fill
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="rounded-full bg-primary/10 p-2 text-primary">
                              <Upload className="h-5 w-5" />
                            </div>
                            <div className="mt-2 text-center">
                              <p className="text-sm font-medium">
                                Upload Photo
                              </p>
                              <p className="text-xs text-muted-foreground">
                                JPEG, PNG, WEBP
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    {photoUrl && (
                      <div className="flex justify-center mt-2">
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="flex items-center gap-1 rounded-lg bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground"
                        >
                          Remove Photo
                        </button>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  {...register("businessName")}
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm">
                    {errors.businessName.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number<span className="text-gray-500"> (Optional)</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
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
                        ].map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>

              {/* About Business */}
              <div className="space-y-2">
                <Label htmlFor="bio">
                  About Your Business
                  <span className="text-gray-500"> (Optional)</span>
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your business and goals"
                  rows={3}
                  {...register("aboutBusiness")}
                />
              </div>
            </div>
          </form>
        </Form>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" className="px-6" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button
          onClick={submit}
          disabled={uploading || isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 px-6"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </>
  );
}
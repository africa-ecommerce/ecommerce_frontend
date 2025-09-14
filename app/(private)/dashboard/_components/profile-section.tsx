// "use client";

// import { useState, useEffect } from "react";
// import {
//   ChevronLeft,
//   Camera,
//   Phone,
//   MapPin,
//   User,
//   Eye,
//   EyeOff,
//   Loader2,
//   Check,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Controller } from "react-hook-form";
// import { useFormResolver } from "@/hooks/useFormResolver";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useUser } from "@/app/_components/provider/UserContext";
// import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
// import { mutate } from "swr";
// import {
//   passwordSchema,
//   updateProfileSchema,
//   updateSupplierSchema,
// } from "@/zod/schema";
// import NaijaStates from "naija-state-local-government";
// import { getLgasForState } from "@/lib/utils";

// // Schemas
// const NIGERIAN_STATES = [
//   "Abia",
//   "Adamawa",
//   "Akwa Ibom",
//   "Anambra",
//   "Bauchi",
//   "Bayelsa",
//   "Benue",
//   "Borno",
//   "Cross River",
//   "Delta",
//   "Ebonyi",
//   "Edo",
//   "Ekiti",
//   "Enugu",
//   "Gombe",
//   "Imo",
//   "Jigawa",
//   "Kaduna",
//   "Kano",
//   "Katsina",
//   "Kebbi",
//   "Kogi",
//   "Kwara",
//   "Lagos",
//   "Nasarawa",
//   "Niger",
//   "Ogun",
//   "Ondo",
//   "Osun",
//   "Oyo",
//   "Plateau",
//   "Rivers",
//   "Sokoto",
//   "Taraba",
//   "Yobe",
//   "Zamfara",
//   "FCT",
// ];

// interface ProfileSectionProps {
//   onBack: () => void;
//   userType: "PLUG" | "SUPPLIER";
// }

// const checkPasswordRequirements = (password: string) => {
//   return {
//     minLength: password.length >= 8,
//     hasUppercase: /[A-Z]/.test(password),
//     hasLowercase: /[a-z]/.test(password),
//     hasNumber: /\d/.test(password),
//     hasSpecialChar: /[@$!%*?&]/.test(password),
//   };
// };

// export function ProfileSection({ onBack, userType }: ProfileSectionProps) {
//   const {
//     userData: { user },
//   } = useUser();
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [newPasswordValue, setNewPasswordValue] = useState("");
//   const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
//   const [showPasswordRequirements, setShowPasswordRequirements] =
//     useState(false);

//   // State management for supplier address
//   const [selectedState, setSelectedState] = useState<string>("");
//   const [availableLgas, setAvailableLgas] = useState<string[]>([]);
//   const [states, setStates] = useState<string[]>([]);

//   // Get user data based on user type
//   const userData = userType === "PLUG" ? user?.plug : user?.supplier;

//   // Initialize states on component mount
//   useEffect(() => {
//     try {
//       const statesData = NaijaStates.states();

//       // Handle different possible structures for states
//       if (Array.isArray(statesData)) {
//         const stateNames = statesData
//           .map((state: any) => {
//             return typeof state === "string"
//               ? state
//               : state.state || state.name;
//           })
//           .filter(Boolean);
//         setStates(stateNames);
//       }
//     } catch (error) {
//       console.error("Error fetching states:", error);
//       setStates([]);
//     }
//   }, []);

//   // Prepare initial form values with empty defaults to prevent uncontrolled->controlled transition
//   const getInitialProfileValues = () => {
//     if (userType === "PLUG") {
//       return {
//         businessName: userData?.businessName || "",
//         phone: userData?.phone || "",
//         state: userData?.state || "",
//       };
//     } else {
//       // For supplier, extract pickup location data
//       const pickupLocation = userData?.pickupLocation;
//       return {
//         businessName: userData?.businessName || "",
//         phone: userData?.phone || "",
//         supplierAddress: {
//           streetAddress: pickupLocation?.streetAddress || "",
//           directions: pickupLocation?.directions || "",
//           state: pickupLocation?.state || "",
//           lga: pickupLocation?.lga || "",
//         },
//       };
//     }
//   };

//   // Update profile function
//   const updateProfile = async (data: any) => {
//     const formData = new FormData();

//     // Handle avatar file for both user types
//     if (avatarFile) {
//       formData.append("avatar", avatarFile);
//     }

//     // For supplier, send the supplierAddress fields individually
//     if (userType === "SUPPLIER") {
//       formData.append("businessName", data.businessName);
//       formData.append("phone", data.phone);

//       // Append supplierAddress fields individually
//       formData.append(
//         "supplierAddress.streetAddress",
//         data.supplierAddress.streetAddress || ""
//       );
//       formData.append(
//         "supplierAddress.directions",
//         data.supplierAddress.directions || ""
//       );
//       formData.append(
//         "supplierAddress.state",
//         data.supplierAddress.state || ""
//       );
//       formData.append("supplierAddress.lga", data.supplierAddress.lga || "");
//     } else {
//       // For PLUG users
//       formData.append("businessName", data.businessName || "");
//       formData.append("phone", data.phone || "");
//       formData.append("state", data.state || "");
//     }

//     try {
//       const response = await fetch("/api/auth/update-profile", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         errorToast(result.error);
//         return null;
//       }

//       successToast(result.message);

//       // Refresh user data after update
//       await mutate("/api/auth/current-user");

//       // Reset the form with the new values to ensure the updated data is displayed
//       profileForm.reset(data);

//       return result;
//     } catch (error) {
//       errorToast("Something went wrong");
//       return null;
//     }
//   };

//   // Update password function
//   const updatePassword = async (data: any) => {
//     try {
//       const response = await fetch("/api/auth/update-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         console.error(result.error);
//         errorToast(result.error || "Failed to update password");
//         return null;
//       }

//       successToast(result.message || "Password updated successfully");
//       passwordForm.reset();
//       return result;
//     } catch (error) {
//       errorToast("Something went wrong");
//       return null;
//     }
//   };

//   // Profile form
//   const profileFormSchema =
//     userType === "SUPPLIER" ? updateSupplierSchema : updateProfileSchema;
//   const { form: profileForm } = useFormResolver(
//     updateProfile,
//     profileFormSchema,
//     undefined,
//     getInitialProfileValues()
//   );

//   // Password form
//   const { form: passwordForm } = useFormResolver(
//     updatePassword,
//     passwordSchema,
//     undefined,
//     {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     }
//   );

//   // Watch state changes to update LGAs for supplier
//   const watchedState = profileForm.watch("supplierAddress.state");

//   useEffect(() => {
//     if (
//       userType === "SUPPLIER" &&
//       watchedState &&
//       watchedState !== selectedState
//     ) {
//       setSelectedState(watchedState);
//       const lgas = getLgasForState(watchedState);
//       setAvailableLgas(lgas);
//       // Reset LGA selection when state changes
//       profileForm.setValue("supplierAddress.lga", "");
//     }
//   }, [watchedState, selectedState, userType, profileForm]);

//   // Initialize form with existing data if available
//   useEffect(() => {
//     if (userData && userType === "SUPPLIER") {
//       const pickupLocation = userData.pickupLocation;
//       if (pickupLocation?.state) {
//         setSelectedState(pickupLocation.state);
//         const lgas = getLgasForState(pickupLocation.state);
//         setAvailableLgas(lgas);
//       }
//     }
//   }, [userData, userType]);

//   // Handle avatar change
//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setAvatarFile(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setAvatarPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Set initial avatar preview if available
//   useEffect(() => {
//     if (userData?.avatar) {
//       setAvatarPreview(userData.avatar);
//     }
//   }, [userData]);

//   // Update form values when userData changes
//   useEffect(() => {
//     if (userData) {
//       const initialValues = getInitialProfileValues();
//       profileForm.reset(initialValues);
//     }
//   }, [userData]);

//   return (
//     <div className="animate-fade-in">
//       <div className="flex items-center gap-2 mb-6">
//         <Button variant="ghost" size="icon" onClick={onBack}>
//           <ChevronLeft className="h-5 w-5" />
//         </Button>
//         <h1 className="text-2xl font-bold">Profile Management</h1>
//       </div>

//       <Tabs defaultValue="profile" className="w-full">
//         <TabsList className="grid w-full grid-cols-2 mb-4">
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//           <TabsTrigger value="security">Security</TabsTrigger>
//         </TabsList>

//         <TabsContent value="profile" className="space-y-4">
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-base">Profile Information</CardTitle>
//               <CardDescription className="text-sm">
//                 Manage your personal information
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Form {...profileForm}>
//                 <form onSubmit={profileForm.submit} className="space-y-6">
//                   <div className="flex flex-col items-center mb-6">
//                     <div className="relative mb-4">
//                       <Avatar className="h-24 w-24 border-4 border-background">
//                         <AvatarImage
//                           src={
//                             avatarPreview ||
//                             "/placeholder.svg?height=96&width=96"
//                           }
//                           alt="User"
//                         />
//                         <AvatarFallback className="text-2xl">
//                           {userData?.businessName?.slice(0, 2).toUpperCase() ||
//                             "BZ"}
//                         </AvatarFallback>
//                       </Avatar>
//                       <label htmlFor="avatar-upload">
//                         <Button
//                           size="icon"
//                           variant="secondary"
//                           className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
//                           type="button"
//                           onClick={() =>
//                             document.getElementById("avatar-upload")?.click()
//                           }
//                         >
//                           <Camera className="h-4 w-4" />
//                         </Button>
//                         <input
//                           id="avatar-upload"
//                           type="file"
//                           accept="image/*"
//                           className="hidden"
//                           onChange={handleAvatarChange}
//                         />
//                       </label>
//                     </div>
//                   </div>

//                   <FormField
//                     control={profileForm.control}
//                     name="businessName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Business Name</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={profileForm.control}
//                     name="phone"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Phone Number</FormLabel>
//                         <FormControl>
//                           <Input {...field} placeholder="+2348012345678" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   {userType === "PLUG" ? (
//                     <FormField
//                       control={profileForm.control}
//                       name="state"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>State</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             value={field.value || ""}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select your state" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {NIGERIAN_STATES.map((state) => (
//                                 <SelectItem key={state} value={state}>
//                                   {state}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   ) : (
//                     // Supplier Address Fields
//                     <div className="space-y-6">
//                       <div className="border-t pt-3">
//                         {/* Street Address */}
//                         <FormField
//                           control={profileForm.control}
//                           name="supplierAddress.streetAddress"
//                           render={({ field }) => (
//                             <FormItem className="mb-4">
//                               <FormLabel>
//                                 Street Address{" "}
//                                 <span className="text-red-500">*</span>
//                               </FormLabel>
//                               <FormControl>
//                                 <Textarea
//                                   {...field}
//                                   rows={3}
//                                   placeholder="Enter your full street address including house number, street name, and area"
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />

//                         {/* Directions */}
//                         <FormField
//                           control={profileForm.control}
//                           name="supplierAddress.directions"
//                           render={({ field }) => (
//                             <FormItem className="mb-4">
//                               <FormLabel>
//                                 Directions{" "}
//                                 <span className="text-gray-500">
//                                   (Optional)
//                                 </span>
//                               </FormLabel>
//                               <FormControl>
//                                 <Textarea
//                                   {...field}
//                                   rows={3}
//                                   placeholder="Additional directions to help locate your address (e.g., landmarks, building descriptions)"
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />

//                         {/* State Selection */}
//                         <FormField
//                           control={profileForm.control}
//                           name="supplierAddress.state"
//                           render={({ field }) => (
//                             <FormItem className="mb-4">
//                               <FormLabel>
//                                 State <span className="text-red-500">*</span>
//                               </FormLabel>
//                               <Select
//                                 onValueChange={field.onChange}
//                                 value={field.value || ""}
//                               >
//                                 <FormControl>
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select a state" />
//                                   </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                   {states.map((state) => (
//                                     <SelectItem key={state} value={state}>
//                                       {state}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />

//                         {/* LGA Selection */}
//                         <FormField
//                           control={profileForm.control}
//                           name="supplierAddress.lga"
//                           render={({ field }) => (
//                             <FormItem className="mb-4">
//                               <FormLabel>
//                                 Local Government Area{" "}
//                                 <span className="text-red-500">*</span>
//                               </FormLabel>
//                               <Select
//                                 onValueChange={field.onChange}
//                                 value={field.value || ""}
//                                 disabled={
//                                   !selectedState || availableLgas.length === 0
//                                 }
//                               >
//                                 <FormControl>
//                                   <SelectTrigger>
//                                     <SelectValue
//                                       placeholder={
//                                         selectedState
//                                           ? "Select a Local Government Area"
//                                           : "Please select a state first"
//                                       }
//                                     />
//                                   </SelectTrigger>
//                                 </FormControl>
//                                 <SelectContent>
//                                   {availableLgas.map((lga) => (
//                                     <SelectItem key={lga} value={lga}>
//                                       {lga}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>
//                   )}

//                   <Button
//                     type="submit"
//                     className="w-full"
//                     disabled={profileForm.isSubmitting}
//                   >
//                     {profileForm.isSubmitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </Button>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="security" className="space-y-4">
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-base">Password</CardTitle>
//               <CardDescription className="text-sm">
//                 Change your password
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Form {...passwordForm}>
//                 <form onSubmit={passwordForm.submit} className="space-y-4">
//                   <FormField
//                     control={passwordForm.control}
//                     name="currentPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Current Password</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Input
//                               {...field}
//                               type={showCurrentPassword ? "text" : "password"}
//                               placeholder="******"
//                             />
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="icon"
//                               className="absolute right-0 top-0 h-full"
//                               onClick={() =>
//                                 setShowCurrentPassword(!showCurrentPassword)
//                               }
//                             >
//                               {showCurrentPassword ? (
//                                 <EyeOff className="h-4 w-4" />
//                               ) : (
//                                 <Eye className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={passwordForm.control}
//                     name="newPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>New Password</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Input
//                               {...field}
//                               type={showNewPassword ? "text" : "password"}
//                               placeholder="******"
//                               onChange={(e) => {
//                                 field.onChange(e);
//                                 setNewPasswordValue(e.target.value);
//                               }}
//                               onFocus={() => setShowPasswordRequirements(true)}
//                               onBlur={() => setShowPasswordRequirements(false)}
//                             />
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="icon"
//                               className="absolute right-0 top-0 h-full"
//                               onClick={() =>
//                                 setShowNewPassword(!showNewPassword)
//                               }
//                             >
//                               {showNewPassword ? (
//                                 <EyeOff className="h-4 w-4" />
//                               ) : (
//                                 <Eye className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </div>
//                         </FormControl>

//                         {/* Password Requirements */}
//                         {(showPasswordRequirements || newPasswordValue) && (
//                           <div className="mt-2 p-3 bg-muted/50 rounded-md text-xs">
//                             <p className="font-medium mb-2">
//                               Password must contain:
//                             </p>
//                             <div className="space-y-1">
//                               {Object.entries(
//                                 checkPasswordRequirements(newPasswordValue)
//                               ).map(([key, met]) => {
//                                 const labels = {
//                                   minLength: "At least 8 characters",
//                                   hasUppercase: "One uppercase letter",
//                                   hasLowercase: "One lowercase letter",
//                                   hasNumber: "One number",
//                                   hasSpecialChar:
//                                     "One special character (@$!%*?&)",
//                                 };

//                                 return (
//                                   <div
//                                     key={key}
//                                     className="flex items-center gap-2"
//                                   >
//                                     {met ? (
//                                       <Check className="h-3 w-3 text-green-500" />
//                                     ) : (
//                                       <X className="h-3 w-3 text-red-500" />
//                                     )}
//                                     <span
//                                       className={
//                                         met ? "text-green-700" : "text-red-700"
//                                       }
//                                     >
//                                       {labels[key as keyof typeof labels]}
//                                     </span>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         )}

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={passwordForm.control}
//                     name="confirmPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Confirm New Password</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Input
//                               {...field}
//                               type={showConfirmPassword ? "text" : "password"}
//                               placeholder="******"
//                               onChange={(e) => {
//                                 field.onChange(e);
//                                 setConfirmPasswordValue(e.target.value);
//                               }}
//                             />
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="icon"
//                               className="absolute right-0 top-0 h-full"
//                               onClick={() =>
//                                 setShowConfirmPassword(!showConfirmPassword)
//                               }
//                             >
//                               {showConfirmPassword ? (
//                                 <EyeOff className="h-4 w-4" />
//                               ) : (
//                                 <Eye className="h-4 w-4" />
//                               )}
//                             </Button>
//                           </div>
//                         </FormControl>

//                         {/* Password Match Indicator */}
//                         {confirmPasswordValue && (
//                           <div className="mt-2 flex items-center gap-2 text-xs">
//                             {newPasswordValue === confirmPasswordValue ? (
//                               <>
//                                 <Check className="h-3 w-3 text-green-500" />
//                                 <span className="text-green-700">
//                                   Passwords match
//                                 </span>
//                               </>
//                             ) : (
//                               <>
//                                 <X className="h-3 w-3 text-red-500" />
//                                 <span className="text-red-700">
//                                   Passwords do not match
//                                 </span>
//                               </>
//                             )}
//                           </div>
//                         )}

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     type="submit"
//                     className="w-full"
//                     disabled={passwordForm.isSubmitting}
//                   >
//                     {passwordForm.isSubmitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Updating Password...
//                       </>
//                     ) : (
//                       "Change Password"
//                     )}
//                   </Button>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }








"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  Camera,
  Phone,
  MapPin,
  User,
  Eye,
  EyeOff,
  Loader2,
  Check,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import { useFormResolver } from "@/hooks/useFormResolver";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@/app/_components/provider/UserContext";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { mutate } from "swr";
import {
  passwordSchema,
  updateProfileSchema,
  updateSupplierSchema,
} from "@/zod/schema";
import NaijaStates from "naija-state-local-government";
import { getLgasForState } from "@/lib/utils";

// Schemas
const NIGERIAN_STATES = [
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
];

interface BusinessNameValidation {
  isChecking: boolean;
  isAvailable: boolean | null;
  message: string;
}

interface ProfileSectionProps {
  onBack: () => void;
  userType: "PLUG" | "SUPPLIER";
}

const checkPasswordRequirements = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password),
  };
};

export function ProfileSection({ onBack, userType }: ProfileSectionProps) {
  const {
    userData: { user },
  } = useUser();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  // State management for supplier address
  const [selectedState, setSelectedState] = useState<string>("");
  const [availableLgas, setAvailableLgas] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  // Business name validation state
  const [businessNameValidation, setBusinessNameValidation] =
    useState<BusinessNameValidation>({
      isChecking: false,
      isAvailable: null,
      message: "",
    });

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get user data based on user type
  const userData = userType === "PLUG" ? user?.plug : user?.supplier;

  // Initialize states on component mount
  useEffect(() => {
    try {
      const statesData = NaijaStates.states();

      // Handle different possible structures for states
      if (Array.isArray(statesData)) {
        const stateNames = statesData
          .map((state: any) => {
            return typeof state === "string"
              ? state
              : state.state || state.name;
          })
          .filter(Boolean);
        setStates(stateNames);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setStates([]);
    }
  }, []);

  // Prepare initial form values with empty defaults to prevent uncontrolled->controlled transition
  const getInitialProfileValues = () => {
    if (userType === "PLUG") {
      return {
        businessName: userData?.businessName || "",
        phone: userData?.phone || "",
        state: userData?.state || "",
      };
    } else {
      // For supplier, extract pickup location data
      const pickupLocation = userData?.pickupLocation;
      return {
        businessName: userData?.businessName || "",
        phone: userData?.phone || "",
        supplierAddress: {
          streetAddress: pickupLocation?.streetAddress || "",
          directions: pickupLocation?.directions || "",
          state: pickupLocation?.state || "",
          lga: pickupLocation?.lga || "",
        },
      };
    }
  };

  // Debounced business name validation function
  const validateBusinessName = useCallback(
    async (businessName: string, currentBusinessName: string) => {
      // Skip validation if it's the same as the current business name
      if (businessName === currentBusinessName) {
        setBusinessNameValidation({
          isChecking: false,
          isAvailable: true,
          message: "",
        });
        return;
      }

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
        const endpoint =
          userType === "PLUG"
            ? "/api/onboarding/plug/businessName"
            : "/api/onboarding/supplier/businessName";

        const response = await fetch(endpoint, {
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
              ? "✓ This business name is available."
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
    },
    [userType]
  );

  // Update profile function
  const updateProfile = async (data: any) => {
    // Check if business name is available before updating (only if changed)
    if (
      businessNameValidation.isAvailable === false &&
      data.businessName !== userData?.businessName
    ) {
      errorToast("Please choose an available business name before saving");
      return null;
    }

    const formData = new FormData();

    // Handle avatar file for both user types
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    // For supplier, send the supplierAddress fields individually
    if (userType === "SUPPLIER") {
      formData.append("businessName", data.businessName);
      formData.append("phone", data.phone);

      // Append supplierAddress fields individually
      formData.append(
        "supplierAddress.streetAddress",
        data.supplierAddress.streetAddress || ""
      );
      formData.append(
        "supplierAddress.directions",
        data.supplierAddress.directions || ""
      );
      formData.append(
        "supplierAddress.state",
        data.supplierAddress.state || ""
      );
      formData.append("supplierAddress.lga", data.supplierAddress.lga || "");
    } else {
      // For PLUG users
      formData.append("businessName", data.businessName || "");
      formData.append("phone", data.phone || "");
      formData.append("state", data.state || "");
    }

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        errorToast(result.error);
        return null;
      }

      successToast(result.message);

      // Refresh user data after update
      await mutate("/api/auth/current-user");

      // Reset the form with the new values to ensure the updated data is displayed
      profileForm.reset(data);

      return result;
    } catch (error) {
      errorToast("Something went wrong");
      return null;
    }
  };

  // Update password function
  const updatePassword = async (data: any) => {
    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        errorToast(result.error || "Failed to update password");
        return null;
      }

      successToast(result.message || "Password updated successfully");
      passwordForm.reset();
      return result;
    } catch (error) {
      errorToast("Something went wrong");
      return null;
    }
  };

  // Profile form
  const profileFormSchema =
    userType === "SUPPLIER" ? updateSupplierSchema : updateProfileSchema;
  const { form: profileForm } = useFormResolver(
    updateProfile,
    profileFormSchema,
    undefined,
    getInitialProfileValues()
  );

  // Password form
  const { form: passwordForm } = useFormResolver(
    updatePassword,
    passwordSchema,
    undefined,
    {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  );

  // Watch business name field for changes
  const watchedBusinessName = profileForm.watch("businessName");

  // Effect to handle debounced business name validation
  useEffect(() => {
    if (watchedBusinessName && userData?.businessName !== undefined) {
      // Clear existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set new timeout for debounced validation
      debounceTimeoutRef.current = setTimeout(() => {
        validateBusinessName(watchedBusinessName, userData?.businessName || "");
      }, 800); // 800ms delay
    }

    // Cleanup timeout on component unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [watchedBusinessName, userData?.businessName, validateBusinessName]);

  // Watch state changes to update LGAs for supplier
  const watchedState = profileForm.watch("supplierAddress.state");

  useEffect(() => {
    if (
      userType === "SUPPLIER" &&
      watchedState &&
      watchedState !== selectedState
    ) {
      setSelectedState(watchedState);
      const lgas = getLgasForState(watchedState);
      setAvailableLgas(lgas);
      // Reset LGA selection when state changes
      profileForm.setValue("supplierAddress.lga", "");
    }
  }, [watchedState, selectedState, userType, profileForm]);

  // Initialize form with existing data if available
  useEffect(() => {
    if (userData && userType === "SUPPLIER") {
      const pickupLocation = userData.pickupLocation;
      if (pickupLocation?.state) {
        setSelectedState(pickupLocation.state);
        const lgas = getLgasForState(pickupLocation.state);
        setAvailableLgas(lgas);
      }
    }
  }, [userData, userType]);

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Set initial avatar preview if available
  useEffect(() => {
    if (userData?.avatar) {
      setAvatarPreview(userData.avatar);
    }
  }, [userData]);

  // Update form values when userData changes
  useEffect(() => {
    if (userData) {
      const initialValues = getInitialProfileValues();
      profileForm.reset(initialValues);
    }
  }, [userData]);

  // Check if form can be saved
  const canSave = () => {
    return (
      !businessNameValidation.isChecking &&
      (businessNameValidation.isAvailable !== false ||
        watchedBusinessName === userData?.businessName) &&
      !profileForm.isSubmitting
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Profile Management</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription className="text-sm">
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.submit} className="space-y-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24 border-4 border-background">
                        <AvatarImage
                          src={
                            avatarPreview ||
                            "/placeholder.svg?height=96&width=96"
                          }
                          alt="User"
                        />
                        <AvatarFallback className="text-2xl">
                          {userData?.businessName?.slice(0, 2).toUpperCase() ||
                            "BZ"}
                        </AvatarFallback>
                      </Avatar>
                      <label htmlFor="avatar-upload">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                          type="button"
                          onClick={() =>
                            document.getElementById("avatar-upload")?.click()
                          }
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </div>
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              className={`pr-10 ${
                                businessNameValidation.isAvailable === false &&
                                field.value !== userData?.businessName
                                  ? "border-red-500 focus:border-red-500"
                                  : businessNameValidation.isAvailable ===
                                      true &&
                                    field.value !== userData?.businessName
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
                                businessNameValidation.isAvailable === true &&
                                field.value !== userData?.businessName && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                              {!businessNameValidation.isChecking &&
                                businessNameValidation.isAvailable === false &&
                                field.value !== userData?.businessName && (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                            </div>
                          </div>
                        </FormControl>

                        {/* Validation Message */}
                        {businessNameValidation.message &&
                          field.value !== userData?.businessName && (
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

                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+2348012345678" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {userType === "PLUG" ? (
                    <FormField
                      control={profileForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {NIGERIAN_STATES.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    // Supplier Address Fields
                    <div className="space-y-6">
                      <div className="border-t pt-3">
                        {/* Street Address */}
                        <FormField
                          control={profileForm.control}
                          name="supplierAddress.streetAddress"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>
                                Street Address{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={3}
                                  placeholder="Enter your full street address including house number, street name, and area"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Directions */}
                        <FormField
                          control={profileForm.control}
                          name="supplierAddress.directions"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>
                                Directions{" "}
                                <span className="text-gray-500">
                                  (Optional)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={3}
                                  placeholder="Additional directions to help locate your address (e.g., landmarks, building descriptions)"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* State Selection */}
                        <FormField
                          control={profileForm.control}
                          name="supplierAddress.state"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>
                                State <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {states.map((state) => (
                                    <SelectItem key={state} value={state}>
                                      {state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* LGA Selection */}
                        <FormField
                          control={profileForm.control}
                          name="supplierAddress.lga"
                          render={({ field }) => (
                            <FormItem className="mb-4">
                              <FormLabel>
                                Local Government Area{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                disabled={
                                  !selectedState || availableLgas.length === 0
                                }
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={
                                        selectedState
                                          ? "Select a Local Government Area"
                                          : "Please select a state first"
                                      }
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableLgas.map((lga) => (
                                    <SelectItem key={lga} value={lga}>
                                      {lga}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className={`w-full ${
                      canSave() ? "" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!canSave()}
                  >
                    {profileForm.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Password</CardTitle>
              <CardDescription className="text-sm">
                Change your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.submit} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="******"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showNewPassword ? "text" : "password"}
                              placeholder="******"
                              onChange={(e) => {
                                field.onChange(e);
                                setNewPasswordValue(e.target.value);
                              }}
                              onFocus={() => setShowPasswordRequirements(true)}
                              onBlur={() => setShowPasswordRequirements(false)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>

                        {/* Password Requirements */}
                        {(showPasswordRequirements || newPasswordValue) && (
                          <div className="mt-2 p-3 bg-muted/50 rounded-md text-xs">
                            <p className="font-medium mb-2">
                              Password must contain:
                            </p>
                            <div className="space-y-1">
                              {Object.entries(
                                checkPasswordRequirements(newPasswordValue)
                              ).map(([key, met]) => {
                                const labels = {
                                  minLength: "At least 8 characters",
                                  hasUppercase: "One uppercase letter",
                                  hasLowercase: "One lowercase letter",
                                  hasNumber: "One number",
                                  hasSpecialChar:
                                    "One special character (@$!%*?&)",
                                };

                                return (
                                  <div
                                    key={key}
                                    className="flex items-center gap-2"
                                  >
                                    {met ? (
                                      <Check className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <X className="h-3 w-3 text-red-500" />
                                    )}
                                    <span
                                      className={
                                        met ? "text-green-700" : "text-red-700"
                                      }
                                    >
                                      {labels[key as keyof typeof labels]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="******"
                              onChange={(e) => {
                                field.onChange(e);
                                setConfirmPasswordValue(e.target.value);
                              }}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>

                        {/* Password Match Indicator */}
                        {confirmPasswordValue && (
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            {newPasswordValue === confirmPasswordValue ? (
                              <>
                                <Check className="h-3 w-3 text-green-500" />
                                <span className="text-green-700">
                                  Passwords match
                                </span>
                              </>
                            ) : (
                              <>
                                <X className="h-3 w-3 text-red-500" />
                                <span className="text-red-700">
                                  Passwords do not match
                                </span>
                              </>
                            )}
                          </div>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={passwordForm.isSubmitting}
                  >
                    {passwordForm.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating Password...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
"use client";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { motion } from "framer-motion";
import UserType from "./_components/user-type";
import {
  userTypeSchema,
  plugInfoSchema,
  profileSchema,
  supplierInfoSchema,
} from "@/zod/schema";
import { z } from "zod";
import PlugInfo from "./_components/plug-info";
import ProfileStep from "./_components/profile-step";
import SupplierInfo from "./_components/supplierInfo";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";

// Extract the actual type from the schema
type UserTypeValue = z.infer<typeof userTypeSchema>["userType"];

export type PlugData = {
  userType?: UserTypeValue;
  plugInfo?: z.infer<typeof plugInfoSchema>;
  profile?: z.infer<typeof profileSchema>;
};

export type SupplierData = {
  userType?: UserTypeValue;
  supplierInfo?: z.infer<typeof supplierInfoSchema>;
};

export type FormData = PlugData | SupplierData;

const Page = () => {
  // Define separate steps for each user type
  const plugSteps = ["User Type", "Plug Info", "Profile"];
  const supplierSteps = ["User Type", "Supplier Info"];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [direction, setDirection] = useState(1);

  // Get the appropriate step array based on user type
  const getSteps = () => {
    if (formData.userType === "PLUG") {
      return plugSteps;
    } else if (formData.userType === "SUPPLIER") {
      return supplierSteps;
    } else {
      // Default to plug steps before selection
      return plugSteps;
    }
  };

  const totalSteps = formData.userType ? getSteps().length : 3;

  const handleNext = () => {
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleSubmitSupplier = async (data: FormData): Promise<any> => {
    // Check if data is SupplierData type before accessing supplierInfo
    if ("supplierInfo" in data) {
      console.log("submitted supplier data", data);
      try {
        // Create a FormData object to properly handle file uploads
        const formData = new FormData();

        // Handle the avatar file if it exists
        if (data.supplierInfo?.avatar instanceof File) {
          formData.append("avatar", data.supplierInfo.avatar);
        }

        // Extract the avatar from supplierInfo to avoid stringification issues
        const { avatar, ...supplierInfoWithoutAvatar } =
          data.supplierInfo || {};

        // Create a clean data object with userType at the top level,
        // just like in handleSubmitPlug
        const processedData = {
          userType: data.userType,
          supplierInfo: supplierInfoWithoutAvatar,
        };

        // Append the JSON data as a string
        formData.append("userData", JSON.stringify(processedData));

        // Send the FormData to the server
        const response = await fetch("/api/onboarding", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const result = await response.json();
        if (!response.ok) {
          errorToast(result.error);
          return null; // Return null to indicate failure
        }

        successToast(result.message);
        return result; // Return the result to be passed to onSuccess
      } catch (error) {
        console.error(error);
        errorToast("Something went wrong");
        return null; // Return null to indicate failure
      }
    } else {
      errorToast("Invalid supplier data");
      return null;
    }
  };

  const handleSubmitPlug = async (data: FormData): Promise<any> => {
    const formData = new FormData();

    // Check if data is PlugData type before accessing plugInfo
    if ("plugInfo" in data && "profile" in data) {
      const plugData = data.plugInfo || {};
      const profileData = data.profile;

      // Pre-process data before sending to backend
      let processedNiches: string[] = [];

      // If generalMerchant is chosen, niches should be empty
      if (plugData.generalMerchant) {
        processedNiches = [];
      }
      // If not generalMerchant, handle niches and otherNiche
      else {
        // Start with selected niches but filter out "other"
        // Use type assertion to make TypeScript understand niches is a string array
        processedNiches = ((plugData.niches || []) as string[]).filter(
          (niche) => niche !== "other"
        );

        // If otherNiche is provided and not empty, add its value to niches array
        if (plugData.otherNiche?.trim()) {
          processedNiches.push(plugData.otherNiche.trim());
        }
      }

      if (!profileData) return;
      const processedData = {
        userType: data.userType,
        niches: processedNiches,
        generalMerchant: Boolean(plugData.generalMerchant),
        // Include profile data explicitly
        profile: {
          businessName: profileData.businessName,
          phone: profileData.phone,
          state: profileData.state,
          aboutBusiness: profileData.aboutBusiness,
        },
      };

      // Send optimized data to backend
      formData.append("userData", JSON.stringify(processedData));
      try {
        const response = await fetch("/api/onboarding", {
          method: "POST",
           credentials: "include",
          body: formData,
        });

        const result = await response.json();
        if (!response.ok) {
          errorToast(result.error);
          return null; // Return null to indicate failure
        }

        successToast(result.message);
        return result; // Return the result to be passed to onSuccess
      } catch (error) {
        console.error(error);
        errorToast("Something went wrong");
        return null; // Return null to indicate failure
      }
    } else {
      errorToast("Invalid form data");
      return null;
    }
  };

  // Replace your existing form submission with this

  const handlePrev = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (newData: Partial<FormData>) => {
    // If userType is changing, reset the form data
    if ("userType" in newData && newData.userType !== formData.userType) {
      // Reset form data but keep the new user type
      setFormData({ userType: newData.userType } as FormData);
    } else {
      // Normal update without changing user type
      setFormData((prev) => ({ ...prev, ...newData }));
    }
  };

  // Render the appropriate component based on user type and current step
  const renderStep = () => {
    // First step is always UserType
    if (step === 1) {
      return (
        <UserType
          onNext={handleNext}
          update={updateFormData}
          initialData={
            formData.userType ? { userType: formData.userType } : undefined
          }
        />
      );
    }

    // Narrow the type explicitly
    if (formData.userType === "PLUG") {
      const plugData = formData as PlugData; // Explicitly tell TypeScript this is PlugData

      switch (step) {
        case 2:
          return (
            <PlugInfo
              onNext={handleNext}
              onPrev={handlePrev}
              update={updateFormData}
              initialData={plugData.plugInfo} // Now it's safe to access plugInfo
            />
          );
        case 3:
          return (
            <ProfileStep
              onSubmit={handleSubmitPlug}
              onPrev={handlePrev}
              formData={formData} // Pass the current formData to the component
            />
          );
        default:
          return null;
      }
    }

    if (formData.userType === "SUPPLIER") {
      const supplierData = formData as SupplierData; // Explicitly tell TypeScript this is SupplierData

      switch (step) {
        case 2:
          return (
            <SupplierInfo
              onSubmit={handleSubmitSupplier}
              onPrev={handlePrev}
              formData={formData} // Pass the current formData
              initialData={supplierData.supplierInfo}
            />
          );

        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400" />
      <div className="w-full max-w-xl px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <Progress
            value={(step / totalSteps) * 100}
            className="h-2 bg-gray-100 mb-8"
          />
        </div>
        <motion.div
          key={step}
          initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </div>
    </div>
  );
};

export default Page;



"use client";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { motion } from "framer-motion";
import UserType from "./_components/user-type";
import { userTypeSchema, plugInfoSchema, profileSchema, supplierInfoSchema, productSchema } from "@/zod/schema";
import { z } from "zod";
import PlugInfo from "./_components/plug-info";
import ProfileStep from "./_components/profile-step";
import SupplierInfo from "./_components/supplierInfo";
import ProductStep from "./_components/product-step";

// Extract the actual type from the schema
type UserTypeValue = z.infer<typeof userTypeSchema>["userType"];

type UserTypeData = {
  userType?: UserTypeValue;
};

type PlugData = UserTypeData & {
  plugInfo?: z.infer<typeof plugInfoSchema>;
  profile?: z.infer<typeof profileSchema>;
  
};

type SupplierData = UserTypeData & {
  supplierInfo?: z.infer<typeof supplierInfoSchema>;
  productStep?: z.infer<typeof productSchema>;
 
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
    if (formData.userType === "plug") {
      return plugSteps;
    } else if (formData.userType === "supplier") {
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

  const handlePrev = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Render the appropriate component based on user type and current step
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
  if (formData.userType === "plug") {
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
            onNext={handleNext}
            onPrev={handlePrev}
            update={updateFormData}
            initialData={plugData.profile}
          />
        );
      default:
        return null;
    }
  }

  if (formData.userType === "supplier") {
    const supplierData = formData as SupplierData; // Explicitly tell TypeScript this is SupplierData
    
    switch(step) {
      case 2:
        return (
          <SupplierInfo
            onNext={handleNext}
            onPrev={handlePrev}
            update={updateFormData}
            initialData={supplierData.supplierInfo} // Now it's safe to access plugInfo
          />
        );
      // case 3:
      //   return (
      //     <ProductStep
      //       onNext={handleNext}
      //       onPrev={handlePrev}
      //       update={updateFormData}
      //       initialData={supplierData.productStep}
      //     />
      //   );
      default:
        return null;
    }


}
  return null;

}

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400" />
      <div className="w-full max-w-md px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {/* <span className="text-sm font-medium text-gray-500">
               ({step} of {totalSteps})
            </span> */}
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
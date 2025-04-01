import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Warehouse,
  Store,
  Ship,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useFormResolver } from "@/hooks/useFormResolver";
import { supplierInfoSchema } from "@/zod/schema";

export type BusinessType =
  | "Warehouse"
  | "Wholesaler"
  | "Importer"
  | "Local Store";

interface SupplierInfoProps {
  onNext: () => void;
  onPrev: () => void;
  update: (data: any) => void;
  initialData?: { businessType?: BusinessType };
}

export default function SupplierInfo({
  onNext,
  onPrev,
  update,
  initialData,
}: SupplierInfoProps) {
  // Add local state to ensure UI updates properly
  const [selectedType, setSelectedType] = useState<BusinessType | undefined>(
    initialData?.businessType
  );

  const {
    form: { setValue, submit, watch, getValues },
  } = useFormResolver((data) => {
    update(data);
    onNext();
    return Promise.resolve(true);
  }, supplierInfoSchema);

  // Watch the form value
  const businessType = watch("businessType");

  // Initialize form from initialData
  useEffect(() => {
    if (initialData?.businessType) {
      setValue("businessType", initialData.businessType);
      setSelectedType(initialData.businessType);
    }
  }, [initialData, setValue]);

  // Keep local state in sync with form state
  useEffect(() => {
    if (businessType && businessType !== selectedType) {
      setSelectedType(businessType);
    }
  }, [businessType, selectedType]);

  // Handle card selection
  const handleSelect = (type: BusinessType) => {
    setValue("businessType", type);
    setSelectedType(type);
  };

  // Debugging - log values to see what's happening
  console.log("Initial Data:", initialData);
  console.log("Selected Type:", selectedType);
  console.log("Form Business Type:", businessType);

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
        What type of business do you have?
      </h1>
      <p className="mb-8 text-center text-gray-600">
        This helps us customize your experience and verification process.
      </p>

      <div className="space-y-4">
        {[
          {
            label: "Warehouse" as BusinessType,
            icon: Warehouse,
            description: "I operate a warehouse with inventory",
          },
          {
            label: "Wholesaler" as BusinessType,
            icon: Building2,
            description: "I sell products in bulk to retailers",
          },
          {
            label: "Importer" as BusinessType,
            icon: Ship,
            description: "I import products from other countries",
          },
          {
            label: "Local Store" as BusinessType,
            icon: Store,
            description: "I have a physical retail location",
          },
        ].map(({ label, icon: Icon, description }) => (
          <Card
            key={label}
            className={`p-6 border-2 hover:border-orange-500 cursor-pointer transition-all ${
              selectedType === label ? "border-orange-500" : "border-gray-200"
            }`}
            onClick={() => handleSelect(label)}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
                <Icon className="h-7 w-7 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{label}</h3>
                <p className="text-gray-500">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={onPrev} variant="outline" className="px-6">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button
          onClick={submit}
          disabled={!selectedType}
          className="bg-orange-500 hover:bg-orange-600 px-6"
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </>
  );
}

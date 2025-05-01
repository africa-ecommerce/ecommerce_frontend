"use client";
import {
  ArrowRight,
  ArrowLeft,
  Shirt,
  Smartphone,
  Sparkles,
 
  ShoppingCart,
} from "lucide-react";
import { useFormResolver } from "@/hooks/useFormResolver";
import { plugInfoSchema } from "@/zod/schema";
import { FormData } from "../page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { PRODUCT_CATEGORIES } from "@/app/constant";

// Define a type for the product categories
type ProductCategory = "all" | "electronics" | "fashion" | "beauty_skincare";

// Map icons and descriptions to each category
const NICHE_CONFIG: Record<
  ProductCategory,
  {
    icon: React.FC<any>;
    description: string;
  }
> = {
  all: {
    icon: ShoppingCart,
    description: "Wide range of products",
  },
  electronics: {
    icon: Smartphone,
    description: "Gadgets & devices",
  },
  fashion: {
    icon: Shirt,
    description: "Clothing & accessories",
  },
  beauty_skincare: {
    icon: Sparkles,
    description: "Cosmetics & wellness",
  },
};

interface PlugTypeProps {
  onNext: () => void;
  update: (p: FormData) => void;
  onPrev: () => void;
  initialData?: Partial<{
    niches: string[];
    generalMerchant: boolean;
    otherNiche: string;
  }>;
}

export default function PlugInfo({
  onNext,
  update,
  onPrev,
  initialData,
}: PlugTypeProps) {
  const {
    form: { register, submit, watch, setValue, control, errors },
  } = useFormResolver((data) => {
    update({ plugInfo: data });
    onNext();
    return Promise.resolve(true);
  }, plugInfoSchema);

  // Extract categories excluding the "all" option which will be handled by generalMerchant
  const niches = PRODUCT_CATEGORIES.filter(
    (category) => category.value !== "all"
  ).map((category) => ({
    id: category.value,
    icon: NICHE_CONFIG[category.value as ProductCategory].icon,
    label: category.label,
    description: NICHE_CONFIG[category.value as ProductCategory].description,
  }));

  const currentNiches = watch("niches") || [];
  const generalMerchant = watch("generalMerchant");
  const otherNiche = watch("otherNiche");

  const isValid =
    generalMerchant || // If General Merchant is selected
    (currentNiches.length > 0 &&
      (!currentNiches.includes("other") ||
        (currentNiches.includes("other") && otherNiche?.trim())));

  // Set initial data if available
  useEffect(() => {
    if (initialData) {
      if (initialData.niches) setValue("niches", initialData.niches);
      if (initialData.generalMerchant !== undefined)
        setValue("generalMerchant", initialData.generalMerchant);
      if (initialData.otherNiche)
        setValue("otherNiche", initialData.otherNiche);
    }
  }, [initialData, setValue]);

  // Toggle niche selection
  const toggleNiche = (nicheId: string) => {
    const isSelected = currentNiches.includes(nicheId);
    const updatedNiches = isSelected
      ? currentNiches.filter((id) => id !== nicheId)
      : [...currentNiches, nicheId];

    setValue("niches", updatedNiches);
  };

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
        Select Your Niche
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Choose a niche to help us recommend the best products for your business.
      </p>

      <Card className="p-6 mb-8">
        <form onSubmit={submit}>
          <div className="space-y-6">
            {/* General Merchant Checkbox */}
            <div className="flex items-center space-x-2 mb-4">
              <Controller
                name="generalMerchant"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="general"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="general" className="font-medium">
                I want to be a General Merchant
              </Label>
            </div>
            {errors.generalMerchant && (
              <p className="text-red-500 text-sm">
                {errors.generalMerchant.message}
              </p>
            )}

            <p className="text-sm text-gray-500 mb-6">
              Or select specific niches below (you can select multiple):
            </p>

            {/* Niches Selection with fixed size cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {niches.map((niche) => {
                const isSelected = currentNiches.includes(niche.id);

                return (
                  <div
                    key={niche.id}
                    onClick={() => toggleNiche(niche.id)}
                    className={`p-4 border-2 rounded-md hover:border-orange-500 cursor-pointer transition-all h-32 w-full ${
                      isSelected ? "border-orange-500" : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2 h-full justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                        <niche.icon className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <span className="font-medium text-sm">
                          {niche.label}
                        </span>
                        <p className="text-xs text-gray-500">
                          {niche.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.niches && (
              <p className="text-red-500 text-sm">{errors.niches.message}</p>
            )}

            {/* Other Niche Input */}
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="other"
                  checked={currentNiches.includes("other")}
                  onCheckedChange={(checked) => {
                    const updatedNiches = checked
                      ? [...currentNiches, "other"]
                      : currentNiches.filter((n) => n !== "other");
                    setValue("niches", updatedNiches);
                  }}
                />
                <Label htmlFor="other" className="font-medium">
                  Other (please specify)
                </Label>
              </div>
              {currentNiches.includes("other") && (
                <>
                  <Input
                    type="text"
                    placeholder="Enter your niche"
                    className="mt-2"
                    {...register("otherNiche")}
                  />
                  {errors.otherNiche && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.otherNiche.message}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </form>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" className="px-6" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={submit}
          disabled={!isValid} // Disable button when criteria are not met
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </>
  );
} 


import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useFormResolver } from "@/hooks/useFormResolver";
import { plugInfoSchema } from "@/zod/schema";
import { FormData } from "../page";
import { PRODUCT_CATEGORIES } from "@/app/constant";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const currentNiches = watch("niches") || [];
  const generalMerchant = watch("generalMerchant");
  const otherNiche = watch("otherNiche");

  const isValid =
    generalMerchant ||
    (currentNiches.length > 0 &&
      (!currentNiches.includes("other") || otherNiche?.trim()));

  useEffect(() => {
    if (initialData) {
      if (initialData.niches) setValue("niches", initialData.niches);
      if (initialData.generalMerchant !== undefined)
        setValue("generalMerchant", initialData.generalMerchant);
      if (initialData.otherNiche)
        setValue("otherNiche", initialData.otherNiche);
    }
  }, [initialData, setValue]);

  const toggleNiche = (id: string) => {
    const updated = currentNiches.includes(id)
      ? currentNiches.filter((n) => n !== id)
      : [...currentNiches, id];
    setValue("niches", updated);
  };

  const selectedLabels = PRODUCT_CATEGORIES.filter((cat) =>
    currentNiches.includes(cat.value)
  ).map((cat) => cat.label);

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
            {/* General Merchant */}
            <div className="flex items-center space-x-2">
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
              <Label htmlFor="general">I want to be a General Merchant</Label>
            </div>
            {errors.generalMerchant && (
              <p className="text-sm text-red-500">
                {errors.generalMerchant.message}
              </p>
            )}

            {/* Niche Dropdown */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Or select specific niches
              </Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    type="button"
                  >
                    {selectedLabels.length > 0
                      ? selectedLabels.join(", ")
                      : "Select niche(s)"}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-4 max-h-60 overflow-y-auto">
                  <div className="space-y-2">
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <div
                        key={cat.value}
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => toggleNiche(cat.value)}
                      >
                        <Checkbox
                          id={cat.value}
                          checked={currentNiches.includes(cat.value)}
                          onCheckedChange={() => toggleNiche(cat.value)}
                        />
                        <Label htmlFor={cat.value}>{cat.label}</Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              {errors.niches && (
                <p className="text-sm text-red-500">{errors.niches.message}</p>
              )}
            </div>

            {/* Other Niche */}
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="other"
                  checked={currentNiches.includes("other")}
                  onCheckedChange={(checked) => {
                    const updated = checked
                      ? [...currentNiches, "other"]
                      : currentNiches.filter((n) => n !== "other");
                    setValue("niches", updated);
                  }}
                />
                <Label htmlFor="other">Other (please specify)</Label>
              </div>
              {currentNiches.includes("other") && (
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Enter your niche"
                    {...register("otherNiche")}
                  />
                  {errors.otherNiche && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.otherNiche.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
          onClick={submit}
          disabled={!isValid}
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </>
  );
}




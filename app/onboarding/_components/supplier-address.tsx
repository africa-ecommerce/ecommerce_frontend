import { useFormResolver } from "@/hooks/useFormResolver";
import React, { useState, useEffect } from "react";
import NaijaStates from "naija-state-local-government";
import SupplierSuccess from "./supplier-success";
import { supplierAddressSchema } from "@/zod/schema";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormData as CustomFormData } from "../page";
import { ArrowLeft } from "lucide-react";
import { getLgasForState } from "@/lib/utils";






interface SupplierAddressProps {
  onSubmit: (data: CustomFormData) => Promise<any>;
  onPrev: () => void;
  formData: CustomFormData;
}

const SupplierAddress = ({
  onSubmit,
  onPrev,
  formData,
}: SupplierAddressProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [availableLgas, setAvailableLgas] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

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


  const {
    form: {
      register,
      handleSubmit,
      control,
      errors,
      isSubmitting,
      watch,
      setValue,
    },
  } = useFormResolver(
    async (data) => {
      const result = await onSubmit({
        ...formData,
        supplierAddress: data,
      } as CustomFormData);
      return result;
    },
    supplierAddressSchema,
    () => setIsSuccess(true)
  );

  // Watch state changes to update LGAs
  const watchedState = watch("state");

  useEffect(() => {
    if (watchedState && watchedState !== selectedState) {
      setSelectedState(watchedState);
      const lgas = getLgasForState(watchedState);
      setAvailableLgas(lgas);
      // Reset LGA selection when state changes
      setValue("lga", "");
    }
  }, [watchedState, selectedState, setValue]);

  // Initialize form with existing data if available
  useEffect(() => {
    if ("supplierAddress" in formData && formData.supplierAddress) {
      setValue("streetAddress", formData.supplierAddress.streetAddress || "");
      setValue("directions", formData.supplierAddress.directions || "");
      setValue("state", formData.supplierAddress.state || "");
      setValue("lga", formData.supplierAddress.lga || "");

      if (formData.supplierAddress.state) {
        setSelectedState(formData.supplierAddress.state);
        const lgas = getLgasForState(formData.supplierAddress.state);
        setAvailableLgas(lgas);
      }
    }
  }, [formData, setValue]);

  if (isSuccess) {
    return <SupplierSuccess />;
  }

  const onFormSubmit = handleSubmit((data) => {
    return onSubmit({
      ...formData,
      supplierAddress: data,
    } as CustomFormData)
      .then((result) => {
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pickup Address Information
        </h2>
        <p className="text-gray-600">
          Please provide your pickup address details for order collection.
        </p>
      </div>

      <form onSubmit={onFormSubmit} className="space-y-6">
        {/* Street Address */}
        <div className="space-y-2">
          <Label htmlFor="streetAddress">
            Street Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="streetAddress"
            {...register("streetAddress")}
            rows={3}
            className={`${errors.streetAddress ? "border-red-500" : ""}`}
            placeholder="Enter your full street address including house number, street name, and area"
          />
          {errors.streetAddress && (
            <p className="mt-1 text-sm text-red-600">
              {errors.streetAddress.message}
            </p>
          )}
        </div>

        {/* Directions (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="directions">
            Directions <span className="text-gray-500">(Optional)</span>
          </Label>
          <Textarea
            id="directions"
            {...register("directions")}
            rows={3}
            className={`${errors.directions ? "border-red-500" : ""}`}
            placeholder="Additional directions to help locate your address (e.g., landmarks, building descriptions)"
          />
          {errors.directions && (
            <p className="mt-1 text-sm text-red-600">
              {errors.directions.message}
            </p>
          )}
        </div>

        {/* State Selection */}
        <div className="space-y-2">
          <Label htmlFor="state">
            State <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">
              {errors.state.message}
            </p>
          )}
        </div>

        {/* LGA Selection */}
        <div className="space-y-2">
          <Label htmlFor="lga">
            Local Government Area <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="lga"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!selectedState || availableLgas.length === 0}
              >
                <SelectTrigger id="lga">
                  <SelectValue
                    placeholder={
                      selectedState
                        ? "Select a Local Government Area"
                        : "Please select a state first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableLgas.map((lga) => (
                    <SelectItem key={lga} value={lga}>
                      {lga}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.lga && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lga.message}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex-1"
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SupplierAddress;
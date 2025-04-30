

"use client";

import { ArrowLeft } from "lucide-react";
import { useFormResolver } from "@/hooks/useFormResolver";
import { profileSchema } from "@/zod/schema";
import { FormData } from "../page";

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
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import PlugSuccess from "./plug-success";
import { useState } from "react";

interface ProfileProps {
  onSubmit: (data: FormData) => Promise<any>;
  onPrev: () => void;
  formData: FormData; // Add this line to receive existing form data
}
export default function ProfileStep({
  onSubmit,
  onPrev,
  formData, // Add this parameter
}: ProfileProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  

  const {
    form: { register, submit, control, errors, isSubmitting },
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
        <form onSubmit={submit} method={"POST"}>
          <div className="space-y-6">
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
                <p className="text-red-500 text-sm">
                  {errors.phone.message}
                </p>
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
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" className="px-6" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        <Button
          onClick={submit}
          disabled={ isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 px-6"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </>
  );
}
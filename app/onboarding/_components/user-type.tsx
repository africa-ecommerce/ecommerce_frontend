"use client";

import Link from "next/link";
import { ArrowRight, Package, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useFormResolver } from "@/hooks/useFormResolver";
import { userTypeSchema } from "@/zod/schema";
import { FormData } from "../page";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserTypeModal } from "./user-type-modal";

interface UserTypeProps {
  onNext: () => void;
  update: (p: FormData) => void;
  initialData?: { userType?: string };
}

export default function UserType({
  onNext,
  update,
  initialData,
}: UserTypeProps) {
  const {
    form: { setValue, submit, watch },
  } = useFormResolver((data) => {
    update(data);
    onNext();
    return Promise.resolve(true);
  }, userTypeSchema);

  const userType = watch("userType");

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Set initial data if available
  useEffect(() => {
    if (initialData?.userType) {
      setValue("userType", initialData.userType as "SUPPLIER" | "PLUG");
    }
  }, [initialData, setValue]);

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900">
        How will you use Pluggn?
      </h1>
      <p className="mb-2 text-center text-orange-500 font-medium">
        Choose your role
      </p>
      <p className="mb-8 text-center text-gray-600">
        We'll customize your experience based on how you plan to use the
        platform.
      </p>

      <div className="space-y-4">
        <Card
          className={`p-6 border-2 hover:border-orange-500 cursor-pointer transition-all ${
            userType === "SUPPLIER" ? "border-orange-500" : ""
          }`}
          onClick={() => {
            setValue("userType", "SUPPLIER");
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
            <Truck className="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Supplier</h3>
            <p className="text-gray-500 text-sm">
              I want to sell my products on the platform and have different people selling my products
              which helps expand my market reach.
            </p>
          </div>
        </Card>

        <Card
          className={`p-6 border-2 hover:border-orange-500 cursor-pointer transition-all ${
            userType === "PLUG" ? "border-orange-500" : ""
          }`}
          onClick={() => {
            setValue("userType", "PLUG");
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
            <Package className="h-7 w-7 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Plug</h3>
            <p className="text-gray-500 text-sm">
              I want to build my business by reselling products from suppliers
              without maintaining inventory.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p
          className="text-sm text-gray-500 mb-4 cursor-pointer hover:text-orange-500 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Not sure which option is right for you?{" "}
          <span className="underline">Learn more about user types</span>
        </p>

        <Button
          onClick={submit}
          disabled={!userType}
          className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <UserTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

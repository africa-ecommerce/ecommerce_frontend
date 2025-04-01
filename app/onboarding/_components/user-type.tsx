


import Link from "next/link";
import { ArrowRight, ShoppingBag, Store } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useFormResolver } from "@/hooks/useFormResolver";
import { userTypeSchema } from "@/zod/schema";
import { FormData } from "../page";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface UserTypeProps {
  onNext: () => void;
  update: (p: FormData) => void;
  initialData?: { userType?: string };
}

export default function UserType({ onNext, update, initialData }: UserTypeProps) {
  const {
    form: { setValue, submit, watch, errors },
  } = useFormResolver(
    (data) => {
      update(data);
      onNext();
      return Promise.resolve(true);
    },
    userTypeSchema
  );

  const userType = watch("userType");

  // Set initial data if available
  useEffect(() => {
    if (initialData?.userType) {
      setValue("userType", initialData.userType  as "supplier" | "plug");
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
            userType === "supplier" ? "border-orange-500" : ""
          }`}
          onClick={() => {
            setValue("userType", "supplier");
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
            <Store className="h-7 w-7 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Supplier</h3>
            <p className="text-gray-500">
              I want to sell my products on the platform
            </p>
          </div>
        </Card>

        <Card
          className={`p-6 border-2 hover:border-orange-500 cursor-pointer transition-all ${
            userType === "plug" ? "border-orange-500" : ""
          }`}
          onClick={() => {
            setValue("userType", "plug");
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
            <ShoppingBag className="h-7 w-7 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Plug</h3>
            <p className="text-gray-500">
              I want to build my business by selling products from suppliers
            </p>
          </div>
        </Card>
      </div>


      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Not sure which option is right for you?{" "}
          <Link
            href="/help/user-types"
            className="text-orange-500 hover:underline"
          >
            Learn more about user types
          </Link>
        </p>

        <Button
          onClick={submit}
          disabled={!userType}
          className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </>
  );
}

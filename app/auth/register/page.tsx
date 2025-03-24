"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterSchema } from "@/zod/schema";
import { useRegister } from "@/hooks/authManagement/useRegister";
import { useRouter } from "next/navigation";
import * as z from "zod";

type RegisterInput = z.infer<typeof RegisterSchema>;

const registerUser = async (data: RegisterInput) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("buyer");
  const [policyChecked, setPolicyChecked] = useState(false);

  const {
    form: { register, setValue, submit, errors, isSubmitting },
  } = useRegister(registerUser, RegisterSchema, (data) =>
    router.push("/login")
  );

  useEffect(() => {
    setValue("policy", policyChecked);
  }, [policyChecked, setValue]);

  // Fixed handleSubmit function with correct type
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(e);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                A
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Create your AfriConnect account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Join thousands of African businesses and shoppers
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            <Tabs
              defaultValue="buyer"
              onValueChange={setAccountType}
              className="w-full mb-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buyer">I'm a Buyer</TabsTrigger>
                <TabsTrigger value="seller">I'm a Seller</TabsTrigger>
              </TabsList>
              <TabsContent value="buyer">
                <p className="text-sm text-muted-foreground mt-2">
                  Create an account to shop from thousands of African
                  businesses.
                </p>
              </TabsContent>
              <TabsContent value="seller">
                <p className="text-sm text-muted-foreground mt-2">
                  Create an account to start selling your products online.
                </p>
              </TabsContent>
            </Tabs>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium leading-6"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <Input
                    id="fullName"
                    {...register("fullname")}
                    className="block w-full"
                  />
                  {errors.fullname && (
                    <p className="text-xs text-red-500">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    {...register("email")}
                    className="block w-full"
                    placeholder="johndoe@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6"
                >
                  Phone Number
                  <span className="text-xs text-gray-500">(Optional)</span>
                </label>
                <div className="mt-1">
                  <Input
                    id="phone"
                    {...register("phone")}
                    className="block w-full"
                    placeholder="+234"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="block w-full pr-10"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  onClick={() => {
                    setPolicyChecked(true);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-muted-foreground"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary hover:text-primary/90"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:text-primary/90"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!policyChecked || isSubmitting}
                >
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <div className="mr-2 h-5 w-5 relative">
                    <Image
                      src="/placeholder.svg?height=20&width=20&text=G"
                      alt="Google"
                      width={20}
                      height={20}
                    />
                  </div>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <div className="mr-2 h-5 w-5 relative">
                    <Image
                      src="/placeholder.svg?height=20&width=20&text=W"
                      alt="WhatsApp"
                      width={20}
                      height={20}
                    />
                  </div>
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:text-primary/90"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

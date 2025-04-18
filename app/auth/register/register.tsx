"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { RegisterSchema } from "@/zod/schema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useFormResolver } from "@/hooks/useFormResolver";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";


// OAuth Login Handler
export const handleOAuthLogin = (provider: "google") => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const nestedCallback = urlParams.get("callbackUrl") || "/dashboard";

    const finalCallback = encodeURIComponent(nestedCallback);
    const redirectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${provider}?callbackUrl=${finalCallback}`;
    window.location.href = redirectUrl;
  } catch (error) {
    console.error(`${provider} login error:`, error);
  }
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  type RegisterInput = z.infer<typeof RegisterSchema>;

  const registerUser = async (data: RegisterInput) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        console.log("failed")
        errorToast(result.error || "Registration failed");
        return null; // Return null to indicate failure
      }
      console.log("success")
      successToast(result.message);
      return result; // Return the result to be passed to onSuccess
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
      return null; // Return null to indicate failure
    }
  };

  const {
    form: { register, setValue, submit, errors, isSubmitting },
  } = useFormResolver(registerUser, RegisterSchema, (data) => {
    console.log("Registration data:", data);
    // Redirect to verification page after successful registration
    router.push("/auth/resend-email-verification");
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(e);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Create your Pluggn account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Join thousands of businesses
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            <form className="space-y-6" onSubmit={handleSubmit} method={"POST"}>
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
                    {...register("name")}
                    className="block w-full"
                    placeholder="john doe"
                  />
                  {errors.name && (
                    <p className="text-xs mt-1 text-red-500">
                      {errors.name.message}
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
                    <p className="text-xs mt-1 text-red-500">
                      {errors.email.message}
                    </p>
                  )}
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
                    placeholder="******"
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
                  <p className="text-xs mt-1 text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
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

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthLogin("google")}
                >
                  <div className="mr-2 h-5 w-5 relative">
                    <Image
                      src="/google.svg"
                      alt="Google"
                      width={26}
                      height={26}
                    />
                  </div>
                  Google
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

          <div className="mt-8 text-center text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:text-primary/90">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:text-primary/90">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
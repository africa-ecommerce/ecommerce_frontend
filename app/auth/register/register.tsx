"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Clock, RefreshCw } from "lucide-react";
import { RegisterSchema } from "@/zod/schema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRegister } from "@/hooks/authManagement/useRegister";
import { useRouter } from "next/navigation";
import { ResendVerificationEmail } from "../resendEmailVerification";

// OAuth Login Handler
export const handleOAuthLogin =  (provider: "google" | "facebook") => {
  try {
   const urlParams = new URLSearchParams(window.location.search);
   const nestedCallback = urlParams.get("callbackUrl") || "/dashboard";

   const finalCallback = encodeURIComponent(nestedCallback);
    const redirectUrl = `api/auth/${provider}?callbackUrl=${finalCallback}`;
    window.location.href = redirectUrl

    } catch (error) {
    console.error(`${provider} login error:`, error);
    // You might want to add a toast or error notification here
  }
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // const [policyChecked, setPolicyChecked] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  type RegisterInput = z.infer<typeof RegisterSchema>;

  const registerUser = async (data: RegisterInput) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }
  };

  const {
    form: { register, setValue, submit, errors, isSubmitting },
  } = useRegister(registerUser, RegisterSchema, (data) => {
    console.log("Registration data:", data); // Log the entire data object
    setRegisteredEmail(data.email);
    setRegistrationComplete(true);
  });

  // useEffect(() => {
  //   setValue("policy", policyChecked);
  // }, [policyChecked, setValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(e);
  };

  // Registration initial view
  if (!registrationComplete) {
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

                {/* <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    checked={policyChecked}
                    onChange={() => setPolicyChecked(!policyChecked)}
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
                </div> */}

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
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
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleOAuthLogin("facebook")}
                  >
                    <div className="mr-2 h-5 w-5 relative">
                      <Image
                        src="/whatsapp.svg"
                        alt="WhatsApp"
                        width={26}
                        height={26}
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

             <div className="mt-8 text-center text-xs text-muted-foreground">
                        By signing in, you agree to our{" "}
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

  // Verification email sent view
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="bg-card p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
            <p className="text-muted-foreground">
              We've sent a verification email to{" "}
              <span className="font-bold">
                {registeredEmail || "No Email Found"}
              </span>
              . Please check your inbox and click the verification link to
              activate your account.
            </p>
          </div>

          <ResendVerificationEmail email={registeredEmail} />

          <div className="mt-6 text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <Link
              href="/support"
              className="text-primary hover:text-primary/90"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { RefreshCw, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormResolver } from "@/hooks/useFormResolver";
import { ForgotPasswordSchema } from "@/zod/schema";
import { successToast, errorToast } from "@/components/ui/use-toast-advanced";

type VerificationEmailInput = z.infer<typeof ForgotPasswordSchema>;

const resendVerificationEmail = async (data: VerificationEmailInput) => {
  try {
    const response = await fetch("/api/auth/resend-verification-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      errorToast(
        result.error || "Failed to resend email verification. Please try again."
      );
      return null;
    }

    successToast(result.message);
    return result;
  } catch (error) {
    console.error(error);
    errorToast("Something went wrong");
    return null;
  }
};

export default function ResendVerification() {
  const router = useRouter();
  const [cooldownTime, setCooldownTime] = useState(0);

  const {
    form: { register, submit, errors, isSubmitting },
  } = useFormResolver(resendVerificationEmail, ForgotPasswordSchema);

  // Handle the countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldownTime]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await submit(e);
    
    // If email was sent successfully, start the cooldown
    if (result) {
      setCooldownTime(120); // 2 minutes in seconds
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            We've sent a verification email to your inbox. Please check and
            click the verification link to activate your account.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            <h3 className="text-lg font-medium mb-4 text-center">
              Didn't receive the email?
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Enter your email below to resend the verification link
            </p>

            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
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
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting || cooldownTime > 0}
                >
                  {cooldownTime > 0 ? (
                    <>
                      <Clock className="h-4 w-4" />
                      Resend in {cooldownTime}s
                    </>
                  ) : (
                    <>
                      <RefreshCw
                        className={`h-4 w-4 ${
                          isSubmitting ? "animate-spin" : ""
                        }`}
                      />
                      {isSubmitting
                        ? "Sending..."
                        : "Resend Verification Email"}
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already verified your email?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:text-primary/90"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Need help?{" "}
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
    </div>
  );
}
"use client";

import type React from "react";
import Link from "next/link";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormResolver } from "@/hooks/useFormResolver";
import { ForgotPasswordSchema } from "@/zod/schema";
import { successToast, errorToast } from "@/components/ui/use-toast-advanced";




type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;


const requestPasswordReset = async (data: ForgotPasswordInput) => {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      errorToast(
        result.error || "Failed to send reset link. Please try again."
      );
      return null;
    }

    successToast(result.message);
    return result; // Return the parsed result instead of parsing the body again
  } catch (error) {
    console.error(error);
    errorToast("Something went wrong");
    return null;
  }
};

export default function ForgotPassword() {

  const {
    form: { register, submit, errors, isSubmitting },
  } = useFormResolver(requestPasswordReset, ForgotPasswordSchema);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(e);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            <form className="space-y-6" onSubmit={handleSubmit} method={"POST"}>
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
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
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
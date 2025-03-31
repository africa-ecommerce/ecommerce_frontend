"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormResolver } from "@/hooks/useFormResolver";
import { ResetPasswordSchema } from "@/zod/schema";
import { successToast, errorToast } from "@/components/ui/use-toast-advanced";


// Define the Zod schema for password reset


type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

const resetPassword = async (data: ResetPasswordInput) => {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      errorToast(result.error || "Password reset failed. Please try again.");
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

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    form: { register, submit, errors, isSubmitting, setValue },
  } = useFormResolver(
    resetPassword, 
    ResetPasswordSchema, 
    () => router.push("/auth/login?resetSuccess=true")
  );

  // Set token from URL
 useEffect(() => {
    setValue("token", token);
  }, [token, setValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(e);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Create new password
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter a new secure password for your account
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            {!token ? (
              <div className="text-center py-4">
                <p className="text-red-500 mb-4">
                  Invalid or expired reset link
                </p>
                <Button
                  onClick={() => router.push("/auth/forgot-password")}
                  className="w-full"
                >
                  Request a new reset link
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} method={"POST"}>
                <input type="hidden" {...register("token")} />

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6"
                  >
                    New Password
                  </label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("newPassword")}
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
                  {errors.newPassword && (
                    <p className="text-xs mt-1 text-red-500">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      className="block w-full pr-10"
                      placeholder="******"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs mt-1 text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </Button>
                </div>
              </form>
            )}

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
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormResolver } from "@/hooks/useFormResolver";
import { ResetPasswordSchema } from "@/zod/schema";
import { successToast, errorToast } from "@/components/ui/use-toast-advanced";

type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

const resetPassword = async (data: ResetPasswordInput) => {
  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include"
    });

    const result = await response.json();

    if (!response.ok) {
      errorToast(result.error || "Password reset failed. Please try again.");
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

// Password requirements checker
const checkPasswordRequirements = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password),
  };
};

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [showRequirements, setShowRequirements] = useState(false);

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordValue(value);
    setValue("newPassword", value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPasswordValue(value);
    setValue("confirmPassword", value);
  };

  const requirements = checkPasswordRequirements(passwordValue);
  const passwordsMatch = passwordValue === confirmPasswordValue && confirmPasswordValue !== "";

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
                      onChange={handlePasswordChange}
                      onFocus={() => setShowRequirements(true)}
                      onBlur={() => setShowRequirements(false)}
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
                  
                  {/* Password Requirements */}
                  {(showRequirements || passwordValue) && (
                    <div className="mt-2 p-3 bg-muted/50 rounded-md text-xs">
                      <p className="font-medium mb-2">Password must contain:</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {requirements.minLength ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-500" />
                          )}
                          <span className={requirements.minLength ? "text-green-700" : "text-red-700"}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {requirements.hasUppercase ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-500" />
                          )}
                          <span className={requirements.hasUppercase ? "text-green-700" : "text-red-700"}>
                            One uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {requirements.hasLowercase ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-500" />
                          )}
                          <span className={requirements.hasLowercase ? "text-green-700" : "text-red-700"}>
                            One lowercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {requirements.hasNumber ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-500" />
                          )}
                          <span className={requirements.hasNumber ? "text-green-700" : "text-red-700"}>
                            One number
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {requirements.hasSpecialChar ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-500" />
                          )}
                          <span className={requirements.hasSpecialChar ? "text-green-700" : "text-red-700"}>
                            One special character (@$!%*?&)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                      onChange={handleConfirmPasswordChange}
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
                  
                  {/* Password Match Indicator */}
                  {confirmPasswordValue && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      {passwordsMatch ? (
                        <>
                          <Check className="h-3 w-3 text-green-500" />
                          <span className="text-green-700">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <X className="h-3 w-3 text-red-500" />
                          <span className="text-red-700">Passwords do not match</span>
                        </>
                      )}
                    </div>
                  )}
                  
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
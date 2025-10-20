



"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useFormResolver } from "@/hooks/useFormResolver";
import { LoginSchema } from "@/zod/schema";
import { handleOAuthLogin } from "../register/register";
import { successToast, errorToast } from "@/components/ui/use-toast-advanced";
import { isValidCallbackUrl } from "@/lib/utils";

type LoginInput = z.infer<typeof LoginSchema>;

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // Handle redirect with page reload when redirectPath is set
  useEffect(() => {
    if (redirectPath) {
      // Using window.location.href ensures a full page reload
      window.location.replace(redirectPath);
    }
  }, [redirectPath]);

  const loginUser = async (data: LoginInput) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        const status = response.status;
        if (status === 403) {
          successToast(result.message);
          return { ...result, redirectUrl: "/auth/resend-email-verification" };
        }

        errorToast(
          result.error || "Login failed. Please check your credentials."
        );
        return null;
      }

      successToast(result.message);

      let redirectUrl = "/marketplace";
      if (
        callbackUrl &&
        typeof callbackUrl === "string" &&
        isValidCallbackUrl(callbackUrl)
      ) {
        redirectUrl = decodeURIComponent(callbackUrl);
      }

      return { ...result, redirectUrl };
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
      return null;
    }
  };

  const {
    form: { register, submit, errors, isSubmitting },
  } = useFormResolver(loginUser, LoginSchema, (data) => {
    // Instead of router.push, set the redirectPath state
    if (data && data.redirectUrl) {
      setRedirectPath(data.redirectUrl);
    }
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
            Sign in to your Pluggn account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Access your business dashboard
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="/auth/forgot-password"
                      className="font-medium text-primary hover:text-primary/90"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
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
                  {isSubmitting ? "Signing in..." : "Sign in"}
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
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary hover:text-primary/90"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:text-primary/90">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/90"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'
import { redirect, useSearchParams } from "next/navigation";
import type { VerificationStatus } from "./types";
import { VerifyEmailClient } from "./emailVerification";
import { verifyEmail } from "@/app/actions/auth";

// Server action to verify the email token
async function verifyEmailToken(token: string, source: string): Promise<VerificationStatus> {
  try {
   
     const response = await verifyEmail(token, source)
    if (!response.ok) {
      return {
        status: "error",
        code: "token_expired",
        message: "Your verification link is invalid or has expired.",
        details:
          "The verification token is not recognized. Please use the latest email verification link or request a new one.",
      };
    }

    return {
      status: "success",
      code: "verified",
      message: "Email verified successfully.",
      details: "Your email address has been verified. You can now access all features of your account.",
    };
  } catch (error) {
    console.error("Error verifying email token:", error);
    return {
      status: "error",
      code: "server_error",
      message: "A server error occurred.",
      details: "We encountered an issue while verifying your email. Please try again later.",
    };
  }
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token?: string; source?: string };
}) {
  const { token, source } = searchParams;

  if (!token || !source) {
    redirect("/auth/login?error=missing_token");
  }

  // Verify the token
  const result = await verifyEmailToken(token, source);

  return <VerifyEmailClient result={result} />;
}

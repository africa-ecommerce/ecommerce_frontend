import { redirect } from "next/navigation";
import type { VerificationStatus } from "./types";
import { VerifyEmailClient } from "./emailVerification";

// Server action to verify the email token
async function verifyEmailToken(token: string, callbackUrl: string): Promise<VerificationStatus> {
  try {
    const apiUrl = `${process.env.BACKEND_URL}/auth/verify-email`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, callbackUrl }),
    });

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
  searchParams: { token?: string; callbackUrl?: string };
}) {
  const { token, callbackUrl } = searchParams;

  if (!token || !callbackUrl) {
    redirect("/auth/login?error=missing_token");
  }

  // Verify the token
  const result = await verifyEmailToken(token, callbackUrl);

  return <VerifyEmailClient result={result} />;
}

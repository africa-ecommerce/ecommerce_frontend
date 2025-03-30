// pages/auth/verify-email/actions.ts
"use server"

import type { VerificationStatus } from "./types"

export async function verifyEmailToken(token: string, callbackUrl: string): Promise<VerificationStatus> {
  try {
    const apiUrl = `${process.env.BACKEND_URL}/auth/verify-email`

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, callbackUrl }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        status: "error",
        code: "token_expired",
        message: "Your verification link is invalid or has expired.",
        details:
          "The verification token is not recognized. Please use the latest email verification link or request a new one.",
        redirectUrl: ""
      }
    }

    return {
      status: "success",
      code: "verified",
      message: "Email verified successfully.",
      details: "Your email address has been verified. You can now access all features of your account.",
      redirectUrl: data.redirectUrl || ""
    }
  } catch (error) {
    console.error(error)
    return {
      status: "error",
      code: "server_error",
      message: "A server error occurred.",
      details: "We encountered an issue while verifying your email. Please try again later.",
      redirectUrl: ""
    }
  }
}
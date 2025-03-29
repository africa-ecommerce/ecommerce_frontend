"use server"

import { RegisterSchema } from "@/zod/schema";
import * as z from "zod";

type RegisterInput = z.infer<typeof RegisterSchema>;

export const registerUser = async (data: RegisterInput) => {
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
};


export const verifyEmail = async(token: string, source: string) => {
     const apiUrl = "/api/auth/verify-email";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, source }),
    });

    return response.json();
}


export const resendVerificationEmail = async (email: string) => {
  try {
    const response = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to resend verification email");
    }

    return { success: true };
  } catch (error) {
    console.error("Resend verification error:", error);
    throw error; // Re-throw to handle in UI
  }
};





// OAuth Login Handler
export const handleOAuthLogin = async (provider: "google" | "facebook") => {
  try {
    const response = await fetch(`/api/auth/${provider}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`
      );
    }

    const data = await response.json();

    // Redirect to OAuth provider's authorization page
    if (data.authorizationUrl) {
      window.location.href = data.authorizationUrl;
    }
  } catch (error) {
    console.error(`${provider} login error:`, error);
    // You might want to add a toast or error notification here
  }
};
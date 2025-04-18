// pages/auth/verify-email/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { VerificationStatus } from "./types"
import { verifyEmailToken } from "./actions"
import { VerifyEmailContent } from "./emailVerification"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  
  const [result, setResult] = useState<VerificationStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      if (!token ) {
        // Handle missing parameters
        setResult({
          status: "error",
          code: "missing_token",
          message: "Missing verification parameters",
          details: "The verification link is incomplete. Please use the complete link from your email.",
         
        })
        setIsLoading(false)
        return
      }

      try {
        // Call the server action to verify the token
        const verificationResult = await verifyEmailToken(token)
        setResult(verificationResult)
      } catch (error) {
        setResult({
          status: "error",
          code: "server_error",
          message: "A server error occurred.",
          details: "We encountered an issue while verifying your email. Please try again later.",
          
        })
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [token])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your email...</p>
        </div>
      </div>
    )
  }

  return <VerifyEmailContent result={result!} />
}
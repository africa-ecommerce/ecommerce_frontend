"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function MinioStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("/api/sites/check-minio")
        const data = await response.json()

        if (data.success) {
          setStatus("connected")
        } else {
          setStatus("error")
          setError(
            typeof data.error === "object" ? "Failed to connect to MinIO" : data.error || "Failed to connect to MinIO",
          )
        }
      } catch (err) {
        setStatus("error")
        setError("Network error when checking MinIO connection")
      }
    }

    checkConnection()
  }, [])

  if (status === "loading") {
    return (
      <Alert className="border-blue-500 bg-blue-50">
        <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
        <AlertTitle>Checking MinIO connection...</AlertTitle>
        <AlertDescription>Verifying connection to MinIO Play storage.</AlertDescription>
      </Alert>
    )
  }

  if (status === "error") {
    return (
      <Alert className="border-red-500 bg-red-50">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <AlertTitle>MinIO Connection Error</AlertTitle>
        <AlertDescription>{error || "Unable to connect to MinIO storage. Publishing may not work."}</AlertDescription>
      </Alert>
    )
  }

  // return (
  //   <Alert className="border-green-500 bg-green-50">
  //     <CheckCircle className="h-5 w-5 text-green-500" />
  //     <AlertTitle>MinIO Connected</AlertTitle>
  //     <AlertDescription>
  //       Successfully connected to MinIO Play storage (simulated). Publishing is available.
  //     </AlertDescription>
  //   </Alert>
  // )
}

export type VerificationStatus = {
  status: "success" | "error" | "pending"
  code: string
  message: string
  details: string
  redirectUrl: string
}


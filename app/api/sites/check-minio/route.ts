import { checkMinioConnection } from "@/app/actions/minio"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if MinIO connection is working
    // This now uses our browser-compatible mock implementation
    const result = await checkMinioConnection()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error checking MinIO connection:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

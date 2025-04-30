import { NextResponse } from "next/server"
import { generateAndDeploySite } from "@/lib/site-generator"
import { checkMinioConnection } from "@/app/actions/minio"

export async function POST(request: Request) {
  try {
    // Check if MinIO connection is working
    const connectionCheck = await checkMinioConnection()
    if (!connectionCheck.success) {
      return NextResponse.json(
        {
          error: "Failed to connect to MinIO storage",
          details:
            typeof connectionCheck.error === "object"
              ? JSON.stringify(connectionCheck.error)
              : String(connectionCheck.error),
        },
        { status: 500 },
      )
    }

    // Parse the request body
    const config = await request.json()

    // Validate the configuration
    if (!config.templateId) {
      return NextResponse.json({ error: "Template ID is required" }, { status: 400 })
    }

    // Add user and site IDs if not provided
    if (!config.userId) {
      config.userId = "demo-user"
    }

    if (!config.siteId) {
      config.siteId = `site-${Date.now()}`
    }

    // Generate and deploy the site
    const result = await generateAndDeploySite(config)

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Failed to generate and deploy site",
          details: typeof result.error === "object" ? JSON.stringify(result.error) : String(result.error),
        },
        { status: 500 },
      )
    }

    // Return the result
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in publish API:", error)
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

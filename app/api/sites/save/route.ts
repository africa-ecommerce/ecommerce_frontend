import { NextResponse } from "next/server"

// In a real app, this would use a database
// For this demo, we'll use a simple in-memory store
const siteConfigurations: Record<string, any> = {}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const config = await request.json()

    // Validate the configuration
    if (!config.templateId) {
      return NextResponse.json({ error: "Template ID is required" }, { status: 400 })
    }

    // Generate IDs if not provided
    const userId = config.userId || "demo-user"
    const siteId = config.siteId || `site-${Date.now()}`

    // Update the configuration with the IDs
    const updatedConfig = {
      ...config,
      userId,
      siteId,
      updatedAt: new Date().toISOString(),
    }

    // Save the configuration
    const key = `${userId}:${siteId}`
    siteConfigurations[key] = updatedConfig

    // In a real app, this would be saved to a database
    console.log(`Saved configuration for ${key}`)

    // Return the updated configuration
    return NextResponse.json({
      success: true,
      config: updatedConfig,
    })
  } catch (error) {
    console.error("Error in save API:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    // Get the URL parameters
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId") || "demo-user"
    const siteId = url.searchParams.get("siteId")

    if (siteId) {
      // Get a specific configuration
      const key = `${userId}:${siteId}`
      const config = siteConfigurations[key]

      if (!config) {
        return NextResponse.json({ error: "Configuration not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, config })
    } else {
      // Get all configurations for the user
      const userConfigs = Object.entries(siteConfigurations)
        .filter(([key]) => key.startsWith(`${userId}:`))
        .map(([_, config]) => config)

      return NextResponse.json({ success: true, configs: userConfigs })
    }
  } catch (error) {
    console.error("Error in get configurations API:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

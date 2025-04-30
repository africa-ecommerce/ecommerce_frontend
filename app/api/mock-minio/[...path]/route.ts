import { getFromMinio } from "@/app/actions/minio"
import { NextResponse } from "next/server"

// This route handler simulates serving files from MinIO
export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  try {
    // Reconstruct the file path from the URL segments
    const filePath = params.path.join("/")

    // Get the file from our mock MinIO storage
    const result = await getFromMinio(filePath)

    if (!result.success) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Return the file with the appropriate content type
    return new NextResponse(result.content, {
      headers: {
        "Content-Type": result.contentType,
      },
    })
  } catch (error) {
    console.error("Error serving mock MinIO file:", error)
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 })
  }
}

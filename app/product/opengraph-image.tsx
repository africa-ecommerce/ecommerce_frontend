
import { ImageResponse } from "next/og";
import { getProductServer } from "@/lib/products";

export const runtime = "edge";

// Image metadata
export const alt = "Product image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// This generates the OG image at build time for static products
// or at request time for dynamic products
export default async function Image({ params }: { params: { id: string } }) {
  try {
    const product = await getProductServer(params.id);

    if (!product) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              background: "white",
            }}
          >
            Product not found
          </div>
        ),
        { ...size }
      );
    }

    // Redirect to the API route that handles the OG image generation
    // This allows us to keep the OG image generation logic in one place
    return new Response(null, {
      status: 307, // Temporary redirect
      headers: {
        Location: `/api/og/${params.id}.png`,
      },
    });
  } catch (error) {
    console.error("Error in opengraph-image.tsx:", error);
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            background: "white",
          }}
        >
          Error generating image
        </div>
      ),
      { ...size }
    );
  }
}

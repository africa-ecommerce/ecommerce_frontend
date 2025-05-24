import React from "react";
import { SingleProduct } from "./productCart";
import { Metadata, Viewport } from "next";
import { getProductServer } from "@/lib/products";

// Define types for search params
type SearchParams = {
  pid?: string;
  ref?: string;
  platform?: string;
};

// Add a separate generateViewport export function
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  // Get the product ID and referral ID from search params
  const productId = searchParams.pid;
  const plugId = searchParams.ref; // ref is our plugId

  // If no product ID is provided, return default metadata
  if (!productId) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    };
  }

  try {
    // Use the server version with both productId and plugId
    const product = await getProductServer(productId, plugId);

    console.log("pageProduct", product?.data);

    if (!product?.data) {
      return {
        title: "Product Not Found",
      };
    }

    // Create absolute URLs for the Open Graph images
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    if (!baseUrl) {
      console.warn(
        "NEXT_PUBLIC_BASE_URL is not defined. OG images will not work correctly."
      );
    }

    // Create tracking URL for sharing that includes all parameters
    let trackingUrl = `${baseUrl}/product?pid=${productId}`;

    // Add referral info if available
    if (plugId) {
      trackingUrl += `&ref=${plugId}`;
    }

    // Add platform info if available
    if (searchParams.platform) {
      trackingUrl += `&platform=${searchParams.platform}`;
    }

    // This is critical for WhatsApp to display large cards
    const ogImageUrl = `${baseUrl}/api/og/${productId}/${plugId}`;

    const twitterImageUrl = `${baseUrl}/api/twitter-image?pid=${productId}${
      plugId ? `&ref=${plugId}` : ""
    }`;

    return {
      title: product?.data?.name,
      description: product?.data?.description,
      openGraph: {
        title: product?.data?.name,
        description: product?.data?.description,
        type: "website",
        // Use the tracking URL that includes referral info
        url: trackingUrl,
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Your Store",
        // Only specify a single image with exact dimensions
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: product?.data?.name,
            type: "image/png", // Explicitly define image type
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product?.data?.name,
        description: product?.data?.description,
        site: "@yoursitename", // Replace with your Twitter handle if available
        creator: "@yoursitename", // Replace with your Twitter handle if available
        images: [
          {
            url: twitterImageUrl,
            alt: product?.data?.name,
          },
        ],
      },
      // These specific meta tags are crucial for WhatsApp
      alternates: {
        // Use the tracking URL here too
        canonical: trackingUrl,
      },
      other: {
        // WhatsApp specific tags
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:type": "image/png",
        "og:price:amount": product?.data?.price?.toString() || "",
        // Force WhatsApp to cache and refresh the image
        "og:image:url": ogImageUrl,
        "og:image": ogImageUrl,
      },
      // Removed viewport configuration from here
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Details",
      description: "View product details",
    };
  }
}

// Pass the search params to the SingleProductCart component
const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div>
      <SingleProduct
        productId={searchParams.pid}
        referralId={searchParams.ref}
        platform={searchParams.platform}
      />
    </div>
  );
};

export default Page;

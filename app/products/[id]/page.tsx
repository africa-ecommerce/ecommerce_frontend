

// // File: app/products/[id]/page.tsx (Server Component)
// import type { Metadata } from "next";
// import { getProductServer } from "@/lib/products"; // Import the server-side version
// import ClientProductPage from "./client-product-page";

// // Generate metadata for the page (remains server-side)
// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }): Promise<Metadata> {
//   try {
//     // Use the server version that forwards cookies
//     const product = await getProductServer(params.id);
    
//     if (!product) {
//       return {
//         title: "Product Not Found",
//       };
//     }

//     console.log("ppproduct", product);
    
//     // Create absolute URLs for the Open Graph images
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//     const ogImageUrl = `${baseUrl}/api/og/${params.id}.png`;

//     console.log("ogImageUrl", ogImageUrl);
    
//     return {
//       title: product.name,
//       description: product.description,
//       openGraph: {
//         title: product.name,
//         description: product.description,
//         images: [
//           {
//             url: ogImageUrl,
//             width: 1200,
//             height: 630,
//             alt: product.name,
//           },
//         ],
//         type: "website",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: product.name,
//         description: product.description,
//         images: [ogImageUrl],
//       },
//     };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {
//       title: "Product Details",
//       description: "View product details",
//     };
//   }
// }

// // Main page component (server component that renders the client component)
// export default function ProductPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   return <ClientProductPage productId={params.id} />;
// }

// File: app/products/[id]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import { getProductServer } from "@/lib/products";
import ClientProductPage from "./client-product-page";

// Generate metadata for the page (remains server-side)
export async function generateMetadata({ 
  params, 
  searchParams,
}: { 
  params: { id: string }; 
  searchParams: { [key: string]: string | string[] | undefined }; 
}, parent: ResolvingMetadata): Promise<Metadata> {
  try {
    // Use the server version that forwards cookies
    const product = await getProductServer(params.id);

    if (!product) {
      return {
        title: "Product Not Found",
      };
    }

    // Create absolute URLs for the Open Graph images
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    if (!baseUrl) {
      console.warn("NEXT_PUBLIC_BASE_URL is not defined. OG images will not work correctly.");
    }
    
    // This is critical for WhatsApp to display large cards
    const ogImageUrl = `${baseUrl}/api/og/${params.id}.png`;
    
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        type: "website",
        // WhatsApp requires these specific properties
        url: `${baseUrl}/products/${params.id}`,
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Your Store",
        locale: "en_US",
        // Only specify a single image with exact dimensions
        images: [{
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
          type: "image/png", // Explicitly define image type
        }]
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description,
        site: "@yoursitename", // Replace with your Twitter handle if available
        creator: "@yoursitename", // Replace with your Twitter handle if available
        images: [{
          url: ogImageUrl,
          alt: product.name,
        }]
      },
      // These specific meta tags are crucial for WhatsApp
      alternates: {
        canonical: `${baseUrl}/products/${params.id}`,
      },
      other: {
        // WhatsApp specific tags
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:type": "image/png",
        // Product specific tags that help WhatsApp identify this as a product
        "og:price:amount": product.price?.toString() || "",
        "og:price:currency": "USD",
        // Force WhatsApp to cache and refresh the image
        "og:image:url": ogImageUrl,
        "og:image": ogImageUrl,
      },
      // Viewport configurations 
      viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Details",
      description: "View product details",
    };
  }
}

// Main page component (server component that renders the client component)
export default function ProductPage({ 
  params,
}: { 
  params: { id: string }; 
}) {
  return <ClientProductPage productId={params.id} />;
}
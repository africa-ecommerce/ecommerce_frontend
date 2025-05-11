

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


// File: app/products/[id]/page.tsx (Server Component)
import type { Metadata } from "next";
import { getProductServer } from "@/lib/products"; // Import the server-side version
import ClientProductPage from "./client-product-page";

// Generate metadata for the page (remains server-side)
export async function generateMetadata({ 
  params, 
  searchParams,
}: { 
  params: { id: string }; 
  searchParams: { [key: string]: string | string[] | undefined }; 
}): Promise<Metadata> {
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
    
    // WhatsApp needs specific dimensions to display large cards
    const imageWidth = 1200;
    const imageHeight = 630;

    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        // Explicitly set these values for WhatsApp
        type: "website",
        // A single image with exact dimensions for WhatsApp
        images: [
          {
            url: ogImageUrl,
            width: 1200, // Must be exact
            height: 630, // Must be exact
            alt: product.name,
          },
        ],
        // Ensure WhatsApp sees the site as a product
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Your Store",
      },
      // Twitter card is used by some other platforms like Discord
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description,
        images: [ogImageUrl],
      },
      // These exact tags are crucial for WhatsApp large cards
      other: {
        // WhatsApp and Facebook require these specific tags
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:type": "image/png",
        // This forces WhatsApp to see this as a product
        "og:type": "product.item",
        "og:image:url": ogImageUrl,
        // Apple-specific tags to ensure proper display on iOS
        "twitter:card": "summary_large_image",
        "twitter:image": ogImageUrl,
        // Force WhatsApp to use the large card format
        // Critical - some platforms (including WhatsApp) need this
        "og:url": `${baseUrl}/products/${params.id}`,
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
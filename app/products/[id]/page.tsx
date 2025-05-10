

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
      console.warn(
        "NEXT_PUBLIC_BASE_URL is not defined. OG images will not work correctly."
      );
    }

    const ogImageUrl = `${baseUrl}/api/og/${params.id}.png`;

    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        // Optimized for WhatsApp large preview cards
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        type: "website",
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
      // Add additional tags for WhatsApp & other platforms
      other: {
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:type": "image/png",
        // Force WhatsApp to reevaluate the image when using "Share" button
        "og:image:url": `${ogImageUrl}?v=${new Date().getTime()}`,
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
export default function ProductPage({ params }: { params: { id: string } }) {
  return <ClientProductPage productId={params.id} />;
}
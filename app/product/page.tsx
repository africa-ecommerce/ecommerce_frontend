



// import React from "react";
// import {SingleProductCart} from "./productCart";
// import { Metadata } from "next";
// import { getProductServer } from "@/lib/products";

// // Define types for search params
// type SearchParams = {
//   pid?: string;
//   ref?: string;
//   platform?: string;
// };

// export async function generateMetadata({
//   searchParams,
// }: {
//   searchParams: SearchParams;
// }): Promise<Metadata> {
//   // Get the product ID from search params - updated to use pid
//   const productId = searchParams.pid;

//   // If no product ID is provided, return default metadata
//   if (!productId) {
//     return {
//       title: "Product Not Found",
//       description: "The requested product could not be found",
//     };
//   }

//   try {
//     // Use the server version that forwards cookies - updated to use productId from query
//     const product = await getProductServer(productId);

//     if (!product) {
//       return {
//         title: "Product Not Found",
//       };
//     }

//     // Create absolute URLs for the Open Graph images
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
//     if (!baseUrl) {
//       console.warn(
//         "NEXT_PUBLIC_BASE_URL is not defined. OG images will not work correctly."
//       );
//     }

//     // Create tracking URL for sharing that includes all parameters
//     let trackingUrl = `${baseUrl}/product?pid=${productId}`;

//     // Add referral info if available
//     if (searchParams.ref) {
//       trackingUrl += `&ref=${searchParams.ref}`;
//     }

//     // Add platform info if available
//     if (searchParams.platform) {
//       trackingUrl += `&platform=${searchParams.platform}`;
//     }

//     // This is critical for WhatsApp to display large cards
//     // Updated to use productId from query
//     const ogImageUrl = `${baseUrl}/api/og/${productId}.png`;

//     // Track this view server-side if needed
//     // if (searchParams.ref || searchParams.platform) {
//     //   await trackProductView(
//     //     productId,
//     //     searchParams.ref,
//     //     searchParams.platform
//     //   ).catch((err) => console.error("Error tracking view:", err));
//     // }

//     return {
//       title: product.name,
//       description: product.description,
//       openGraph: {
//         title: product.name,
//         description: product.description,
//         type: "website",
//         // Use the tracking URL that includes referral info
//         url: trackingUrl,
//         siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Your Store",
//         // Only specify a single image with exact dimensions
//         images: [
//           {
//             url: ogImageUrl,
//             width: 1200,
//             height: 630,
//             alt: product.name,
//             type: "image/png", // Explicitly define image type
//           },
//         ],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: product.name,
//         description: product.description,
//         site: "@yoursitename", // Replace with your Twitter handle if available
//         creator: "@yoursitename", // Replace with your Twitter handle if available
//         images: [
//           {
//             url: ogImageUrl,
//             alt: product.name,
//           },
//         ],
//       },
//       // These specific meta tags are crucial for WhatsApp
//       alternates: {
//         // Use the tracking URL here too
//         canonical: trackingUrl,
//       },
//       other: {
//         // WhatsApp specific tags
//         "og:image:width": "1200",
//         "og:image:height": "630",
//         "og:image:type": "image/png",
//         // Product specific tags that help WhatsApp identify this as a product
//         "og:price:amount": product.price?.toString() || "",
//         // Force WhatsApp to cache and refresh the image
//         "og:image:url": ogImageUrl,
//         "og:image": ogImageUrl,
//       },
//       // Viewport configurations
//       viewport: {
//         width: "device-width",
//         initialScale: 1,
//         maximumScale: 1,
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

// // Server-side tracking function
// // async function trackProductView(
// //   productId: string,
// //   referralId?: string,
// //   platform?: string
// // ) {
// //   try {
// //     // You can implement your tracking logic here
// //     // This could log to your database or call an analytics service

// //     // Example implementation:
// //     const response = await fetch(
// //       `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/track`,
// //       {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           event: "product_view",
// //           productId,
// //           referralId,
// //           platform,
// //           timestamp: new Date().toISOString(),
// //         }),
// //       }
// //     );

// //     return response.ok;
// //   } catch (error) {
// //     console.error("Error tracking product view:", error);
// //     return false;
// //   }
// // }

// // Pass the search params to the SingleProductCart component
// const Page = ({ searchParams }: { searchParams: SearchParams }) => {
//   return (
//     <div>
//       <SingleProductCart
//         productId={searchParams.pid}
//         referralId={searchParams.ref}
//         platform={searchParams.platform}
//       />
//     </div>
//   );
// };

// export default Page;


import React from "react";
import { SingleProductCart } from "./productCart";
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

    console.log("pageProduct", product.data);

    if (!product.data) {
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
    const ogImageUrl = `${baseUrl}/api/og/${productId}.png`;
    // if (plugId) {
    //   ogImageUrl += `?ref=${plugId}`;

    //   if (searchParams.platform) {
    //     ogImageUrl += `&platform=${searchParams.platform}`;
    //   }
    // } else if (searchParams.platform) {
    //   ogImageUrl += `?platform=${searchParams.platform}`;
    // }

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
            url: ogImageUrl,
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
        // Product specific tags that help WhatsApp identify this as a product
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
      <SingleProductCart
        productId={searchParams.pid}
        referralId={searchParams.ref}
        platform={searchParams.platform}
      />
    </div>
  );
};

export default Page;
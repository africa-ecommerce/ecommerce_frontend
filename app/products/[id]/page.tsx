// import type { Metadata } from "next";
// import { getProduct } from "@/lib/products";
// import ProductDetails from "./product-details";

// // Generate metadata for the page
// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }): Promise<Metadata> {
//   const product = await getProduct(params.id);

//   console.log("ppproduct", product);

//   if (!product) {
//     return {
//       title: "Product Not Found",
//     };
//   }

//   // Create absolute URLs for the Open Graph images
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//   const ogImageUrl = `${baseUrl}/api/og/${params.id}.png`;

//   console.log("ogImageUrl", ogImageUrl);
//   console.log("baseUrl", baseUrl);

//   return {
//     title: product.name,
//     description: product.description,
//     openGraph: {
//       title: product.name,
//       description: product.description,
//       images: [
//         {
//           url: ogImageUrl,
//           width: 1200,
//           height: 630,
//           alt: product.name,
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: product.name,
//       description: product.description,
//       images: [ogImageUrl],
//     },
//   };
// }

// export default async function ProductPage({
//   params,
// }: {
//   params: { id: string };
// }) {

//   console.log("params", params.id)
//   const product = await getProduct(params.id);


//   console.log("product", product);

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return <ProductDetails product={product} />;
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

    console.log("ppproduct", product);
    
    // Create absolute URLs for the Open Graph images
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const ogImageUrl = `${baseUrl}/api/og/${params.id}.png`;

    console.log("ogImageUrl", ogImageUrl);
    
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description,
        images: [ogImageUrl],
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
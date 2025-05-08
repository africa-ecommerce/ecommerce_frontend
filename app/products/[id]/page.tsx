// import { Metadata } from "next";
// import {
//   generateOpenGraphMetadata,
//   generateProductJsonLd,
// } from "@/lib/openGraph";
// import { notFound } from "next/navigation";
// import ShareButton from "./ShareButton";

// interface ProductPageProps {
//   params: {
//     id: string;
//   };
// }

// // Define dynamic metadata for this page
// export async function generateMetadata({
//   params,
// }: ProductPageProps): Promise<Metadata> {
//   const product = await getProductById();

//   if (!product) {
//     return {
//       title: "Product Not Found",
//     };
//   }

//   const ogMetadata = generateOpenGraphMetadata(product);

//   return {
//     title: product.name,
//     description: ogMetadata["description"],
//     openGraph: {
//       title: product.name,
//       description: ogMetadata["og:description"],
//       url: `/products/${product.name}`,
//       images: [
//         {
//           url: ogMetadata["og:image"],
//           width: 1200,
//           height: 630,
//           alt: `Image of ${product.name}`,
//         },
//       ],
//       type: "product",
//       siteName: process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: product.name,
//       description: ogMetadata["twitter:description"],
//       images: [ogMetadata["twitter:image"]],
//       site: `@${process.env.NEXT_PUBLIC_TWITTER_HANDLE || "yourbrand"}`,
//     },
//     other: {
//       "product:price:amount": product.price.toString(),
//       "product:price:currency": product.currency || "USD",
//       "product:availability": "in stock",
//     },
//     // Use alternates if you have multiple languages or regions
//     alternates: {
//       canonical: `/products/${product.name}`,
//     },
//   };
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const product = await getProductById();

//   if (!product) {
//     notFound();
//   }

//   // Generate JSON-LD for structured data
//   const jsonLd = generateProductJsonLd(product);

//   return (
//     <div className="product-page">
//       {/* Inject JSON-LD script */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: jsonLd }}
//       />

//       <div className="product-header">
//         <h1>{product.name}</h1>
//         <div className="product-rating">
//           {product.rating && <span>★ {product.rating}</span>}
//         </div>
//       </div>

//       <div className="product-image-container">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="product-image"
//         />
//       </div>

//       <div className="product-details">
//         <div className="product-price">
//           {new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: product.currency || "USD",
//           }).format(product.price)}
//           {product.duration && (
//             <span className="duration"> / {product.duration}</span>
//           )}
//         </div>

//         {product.location && (
//           <div className="product-location">{product.location}</div>
//         )}

//         {product.features && product.features.length > 0 && (
//           <div className="product-features">
//             <h2>Features</h2>
//             <ul>
//               {product.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Share Button Component */}
//       <ShareButton product={product} />
//     </div>
//   );
// }

// // Mock function - replace with your actual data fetching logic
// async function getProductById() {
//   // In production, fetch this from your database or API
//   return {
//     // id,
//     name: "Beautiful Apartment in Central Location",
//     price: 149.99,
//     currency: "USD",
//     duration: "night",
//     location: "Downtown District",
//     imageUrl:
//       "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
//     features: ["1 bedroom", "1 bed", "2 baths"],
//     rating: 4.79,
//     description:
//       "A stunning apartment located in the heart of the city with modern amenities, great views, and convenient access to restaurants and attractions.",
//   };
// }


import { Metadata } from "next";
import {
  generateOpenGraphMetadata,
  generateProductJsonLd,
} from "@/lib/openGraph";
import { notFound } from "next/navigation";
import ShareButton from "./ShareButton";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Define dynamic metadata for this page
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductById();

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const ogMetadata = generateOpenGraphMetadata(product);

  return {
    title: product.name,
    description: ogMetadata["description"],
    openGraph: {
      title: product.name,
      description: ogMetadata["og:description"],
      url: `/products/${encodeURIComponent(product.name)}`,
      images: [
        {
          url: ogMetadata["og:image"],
          width: 1200,
          height: 630,
          alt: `Image of ${product.name}`,
        },
      ],
      // Changed from "product" to "website" which is an allowed value
      type: "website",
      siteName: process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: ogMetadata["twitter:description"],
      images: [ogMetadata["twitter:image"]],
      site: `@${process.env.NEXT_PUBLIC_TWITTER_HANDLE || "yourbrand"}`,
    },
    // Move product-specific metadata to the "other" property
    other: {
      "product:price:amount": product.price.toString(),
      "product:price:currency": product.currency || "USD",
      "product:availability": "in stock",
      "og:type": "product", // Adding the product type here instead
    },
    // Use alternates if you have multiple languages or regions
    alternates: {
      canonical: `/products/${encodeURIComponent(product.name)}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById();

  if (!product) {
    notFound();
  }

  // Generate JSON-LD for structured data
  const jsonLd = generateProductJsonLd(product);

  return (
    <div className="product-page">
      {/* Inject JSON-LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="product-header">
        <h1>{product.name}</h1>
        <div className="product-rating">
          {product.rating && <span>★ {product.rating}</span>}
        </div>
      </div>

      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-details">
        <div className="product-price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: product.currency || "USD",
          }).format(product.price)}
          {product.duration && (
            <span className="duration"> / {product.duration}</span>
          )}
        </div>

        {product.location && (
          <div className="product-location">{product.location}</div>
        )}

        {product.features && product.features.length > 0 && (
          <div className="product-features">
            <h2>Features</h2>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Share Button Component */}
      <ShareButton product={product} />
    </div>
  );
}

// Mock function - replace with your actual data fetching logic
async function getProductById() {
  // In production, fetch this from your database or API
  return {
    // id,
    name: "Beautiful Apartment in Central Location",
    price: 149.99,
    currency: "USD",
    duration: "night",
    location: "Downtown District",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    features: ["1 bedroom", "1 bed", "2 baths"],
    rating: 4.79,
    description:
      "A stunning apartment located in the heart of the city with modern amenities, great views, and convenient access to restaurants and attractions.",
  };
}
// import { createHash } from "crypto";

// type SocialPlatform =
//   | "twitter"
//   | "facebook"
//   | "instagram"
//   | "whatsapp"
//   | "default";

// interface Product {
// //   id: string;
//   name: string;
//   price: number;
//   currency?: string;
//   imageUrl: string;
//   description?: string;
//   location?: string;
//   features?: string[];
//   rating?: number;
//   duration?: string;
// }

// interface OpenGraphOptions {
//   product: Product;
//   version?: string | number;
//   platform?: SocialPlatform;
// }

// /**
//  * Generates a content-based version hash for a product
//  * This updates when critical product data changes
//  */
// export function generateContentVersion(product: Product): string {
//   return createHash("md5")
//     .update(
//       JSON.stringify({
//         name: product.name,
//         price: product.price,
//         imageUrl: product.imageUrl,
//         features: product.features,
//         rating: product.rating,
//         // Add other fields that would trigger an image update when changed
//       })
//     )
//     .digest("hex")
//     .slice(0, 8);
// }

// /**
//  * Generates a signed Open Graph image URL for a product
//  */
// export function generateOpenGraphImageUrl({
//   product,
//   version,
//   platform = "default",
// }: OpenGraphOptions): string {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

//   // If version is not provided, generate it based on content
//   const contentVersion = version || generateContentVersion(product);

//   // Create a slug-friendly product name for the URL
//   const productSlug = encodeURIComponent(product.name);

//   // Create a secure signature to prevent URL manipulation
//   const signature = createHash("sha256")
//     .update(
//       `${productSlug}-${contentVersion}-${
//         process.env.OG_SECRET_KEY || "default-secret"
//       }`
//     )
//     .digest("hex")
//     .slice(0, 12);

//   // Build the URL with the signature and platform info - using correct route pattern
//   return `${baseUrl}/api/og/${productSlug}?signature=${signature}&v=${contentVersion}&platform=${platform}`;
// }


// /**
//  * Generates comprehensive Open Graph metadata for different platforms
//  */
// export function generateOpenGraphMetadata(
//   product: Product
// ): Record<string, string> {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
//   const productUrl = `${baseUrl}/products/${encodeURIComponent(product.name)}`;
//   const contentVersion = generateContentVersion(product);

//   // Generate platform-specific image URLs
//   const defaultOgImage = generateOpenGraphImageUrl({
//     product,
//     version: contentVersion,
//     platform: "default",
//   });

//   const twitterOgImage = generateOpenGraphImageUrl({
//     product,
//     version: contentVersion,
//     platform: "twitter",
//   });

//   const whatsappOgImage = generateOpenGraphImageUrl({
//     product,
//     version: contentVersion,
//     platform: "whatsapp",
//   });

//   const facebookOgImage = generateOpenGraphImageUrl({
//     product,
//     version: contentVersion,
//     platform: "facebook",
//   });

//   // Format product description
//   const description =
//     product.description ||
//     `${product.name} - ${product.features?.join(", ") || ""} ${
//       product.location ? `in ${product.location}` : ""
//     }`.trim();

//   const shortDescription =
//     description.length > 160
//       ? `${description.substring(0, 157)}...`
//       : description;

//   return {
//     // Basic meta tags
//     title: product.name,
//     description: shortDescription,

//     // Common Open Graph tags
//     "og:title": product.name,
//     "og:description": shortDescription,
//     "og:url": productUrl,
//     "og:image": defaultOgImage,
//     "og:image:width": "1200",
//     "og:image:height": "630",
//     "og:image:alt": `Image of ${product.name}`,
//     "og:type": "product",
//     "og:site_name": process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",

//     // Facebook-specific tags
//     "og:image:url": facebookOgImage,

//     // Twitter-specific tags
//     "twitter:card": "summary_large_image",
//     "twitter:site": `@${process.env.NEXT_PUBLIC_TWITTER_HANDLE || "yourbrand"}`,
//     "twitter:title": product.name,
//     "twitter:description": shortDescription,
//     "twitter:image": twitterOgImage,

//     // WhatsApp preview enhancement
//     "og:image:secure_url": whatsappOgImage,

//     // Product-specific tags
//     "product:price:amount": product.price.toString(),
//     "product:price:currency": product.currency || "USD",
//     "product:availability": "in stock",

//     // Additional structured data (JSON-LD will be added separately)
//     "product:brand": process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
//   };
// }

// /**
//  * Generates JSON-LD structured data for the product
//  */
// export function generateProductJsonLd(product: Product): string {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";
//   const productUrl = `${baseUrl}/products/${encodeURIComponent(product.name)}`;
//   const imageUrl = product.imageUrl;

//   const jsonLd = {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     name: product.name,
//     image: imageUrl,
//     description:
//       product.description ||
//       `${product.name} - ${product.features?.join(", ") || ""}`.trim(),
//     sku: product.name,
//     mpn: product.name,
//     brand: {
//       "@type": "Brand",
//       name: process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
//     },
//     offers: {
//       "@type": "Offer",
//       url: productUrl,
//       priceCurrency: product.currency || "USD",
//       price: product.price,
//       availability: "https://schema.org/InStock",
//       seller: {
//         "@type": "Organization",
//         name: process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
//       },
//     },
//   };

//   // Add review if rating is available
//   if (product.rating) {
//     Object.assign(jsonLd, {
//       aggregateRating: {
//         "@type": "AggregateRating",
//         ratingValue: product.rating,
//         bestRating: "5",
//         worstRating: "1",
//         ratingCount: "1", // Replace with actual review count
//       },
//     });
//   }

//   return JSON.stringify(jsonLd);
// }






import { createHash } from "crypto";

type SocialPlatform =
  | "twitter"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "default";

interface Product {
  name: string;
  price: number;
  currency?: string;
  imageUrl: string;
  description?: string;
  location?: string;
  features?: string[];
  rating?: number;
  duration?: string;
}

interface OpenGraphOptions {
  product: Product;
  version?: string | number;
  platform?: SocialPlatform;
}

/**
 * Generates a content-based version hash for a product
 * This updates when critical product data changes
 */
export function generateContentVersion(product: Product): string {
  try {
    return createHash("md5")
      .update(
        JSON.stringify({
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          features: product.features,
          rating: product.rating,
        })
      )
      .digest("hex")
      .slice(0, 8);
  } catch (error) {
    console.error("Error generating content version:", error);
    return "default";
  }
}

/**
 * Generates a signed Open Graph image URL for a product
 */
export function generateOpenGraphImageUrl({
  product,
  version,
  platform = "default",
}: OpenGraphOptions): string {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "https://yourdomain.com");

    // If version is not provided, generate it based on content
    const contentVersion = version || generateContentVersion(product);

    // Create a secure signature
    let signature;
    try {
      signature = createHash("sha256")
        .update(
          `${contentVersion}-${
            process.env.OG_SECRET_KEY || "default-secret"
          }`
        )
        .digest("hex")
        .slice(0, 12);
    } catch (error) {
      console.error("Error creating signature:", error);
      signature = "fallback";
    }

    // Properly format the product name for the URL
    const encodedProductName = encodeURIComponent(product.name);

    // Build the URL with the signature and platform info
    
    return `${baseUrl}/api/og/${encodedProductName}?signature=${signature}&v=${contentVersion}&platform=${platform}`;
  } catch (error) {
    console.error("Error generating OG image URL:", error);
    return "";
  }
}

/**
 * Generates comprehensive Open Graph metadata for different platforms
 */
export function generateOpenGraphMetadata(
  product: Product
): Record<string, string> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://yourdomain.com");

  const productUrlPath = product.name.replace(/\s+/g, "-").toLowerCase();
  const productUrl = `${baseUrl}/products/${encodeURIComponent(
    productUrlPath
  )}`;
  const contentVersion = generateContentVersion(product);

  // Generate platform-specific image URLs
  const defaultOgImage = generateOpenGraphImageUrl({
    product,
    version: contentVersion,
    platform: "default",
  });

  const twitterOgImage = generateOpenGraphImageUrl({
    product,
    version: contentVersion,
    platform: "twitter",
  });

  const whatsappOgImage = generateOpenGraphImageUrl({
    product,
    version: contentVersion,
    platform: "whatsapp",
  });

  const facebookOgImage = generateOpenGraphImageUrl({
    product,
    version: contentVersion,
    platform: "facebook",
  });

  // Format product description
  const description =
    product.description ||
    `${product.name} - ${product.features?.join(", ") || ""} ${
      product.location ? `in ${product.location}` : ""
    }`.trim();

  const shortDescription =
    description.length > 160
      ? `${description.substring(0, 157)}...`
      : description;

  return {
    // Basic meta tags
    title: product.name,
    description: shortDescription,

    // Common Open Graph tags
    "og:title": product.name,
    "og:description": shortDescription,
    "og:url": productUrl,
    // "og:image": defaultOgImage,
    "og:image": whatsappOgImage,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": `Image of ${product.name}`,
    "og:type": "product",
    "og:site_name": process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",

    // Facebook-specific tags
    "og:image:url": facebookOgImage,

    // Twitter-specific tags
    "twitter:card": "summary_large_image",
    "twitter:site": `@${process.env.NEXT_PUBLIC_TWITTER_HANDLE || "yourbrand"}`,
    "twitter:title": product.name,
    "twitter:description": shortDescription,
    "twitter:image": twitterOgImage,

    // WhatsApp preview enhancement
    "og:image:secure_url": whatsappOgImage,

    // Product-specific tags
    "product:price:amount": product.price.toString(),
    "product:price:currency": product.currency || "USD",
    "product:availability": "in stock",

    // Additional structured data (JSON-LD will be added separately)
    "product:brand": process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
  };
}

/**
 * Generates JSON-LD structured data for the product
 */
export function generateProductJsonLd(product: Product): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://yourdomain.com");

  const productUrlPath = product.name.replace(/\s+/g, "-").toLowerCase();
  const productUrl = `${baseUrl}/products/${encodeURIComponent(
    productUrlPath
  )}`;
  const imageUrl = product.imageUrl;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: imageUrl,
    description:
      product.description ||
      `${product.name} - ${product.features?.join(", ") || ""}`.trim(),
    sku: product.name.replace(/\s+/g, "-").toLowerCase(),
    mpn: product.name.replace(/\s+/g, "-").toLowerCase(),
    brand: {
      "@type": "Brand",
      name: process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.currency || "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: process.env.NEXT_PUBLIC_BRAND_NAME || "Your Brand",
      },
    },
  };

  // Add review if rating is available
  if (product.rating) {
    Object.assign(jsonLd, {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        bestRating: "5",
        worstRating: "1",
        ratingCount: "1", // Replace with actual review count
      },
    });
  }

  return JSON.stringify(jsonLd);
}

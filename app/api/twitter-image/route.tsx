// // app/api/twitter-image/route.tsx
// import { ImageResponse } from "next/og";
// import { getProductServer } from "@/lib/products";
// import { NextRequest } from "next/server";

// // Image metadata
// export const size = {
//   width: 1200,
//   height: 630,
// };
// export const contentType = "image/png";

// // This ensures the image is regenerated when needed
// export const revalidate = 3600; // Revalidate every hour

// // Add runtime configuration for edge
// export const runtime = "edge";

// export async function GET(request: NextRequest) {
//   try {
//     // Get URL parameters from the request
//     const url = new URL(request.url);
//     const productId = url.searchParams.get("pid");
//     const plugId = url.searchParams.get("ref");
//     const platform = url.searchParams.get("platform");

//     // If no product ID is provided, return a default image
//     if (!productId) {
//       return new ImageResponse(
//         (
//           <div
//             style={{
//               display: "flex",
//               fontSize: 48,
//               background: "white",
//               width: "100%",
//               height: "100%",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             Product ID not specified
//           </div>
//         ),
//         { ...size }
//       );
//     }

//     // Fetch product data with both productId and plugId
//     const product = await getProductServer(productId, plugId || undefined);

//     if (!product?.data) {
//       return new ImageResponse(
//         (
//           <div
//             style={{
//               display: "flex",
//               fontSize: 48,
//               background: "white",
//               width: "100%",
//               height: "100%",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             Product not found
//           </div>
//         ),
//         { ...size }
//       );
//     }

//     // Format price
//     const formattedPrice = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(product?.data?.price || 0);

//     // Determine template based on platform
//     const isInstagram = platform === "instagram";

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "white",
//             position: "relative",
//           }}
//         >
//           {/* Background gradient */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background:
//                 "linear-gradient(to bottom right, rgba(249, 250, 251, 1), rgba(243, 244, 246, 0.5))",
//               zIndex: 0,
//             }}
//           />

//           {/* Main content container */}
//           <div
//             style={{
//               display: "flex",
//               width: "100%",
//               height: "100%",
//               padding: isInstagram ? 40 : 50,
//               flexDirection: isInstagram ? "column" : "row", // Column layout for Instagram
//               alignItems: "center",
//               justifyContent: isInstagram ? "center" : "flex-start",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             {/* Product image with shadow and border */}
//             <div
//               style={{
//                 display: "flex",
//                 width: isInstagram ? "60%" : "40%",
//                 height: isInstagram ? "50%" : "70%",
//                 borderRadius: 16,
//                 overflow: "hidden",
//                 margin: isInstagram ? "0 0 30px 0" : "0 40px 0 0", // Different margin for different layouts
//                 position: "relative",
//                 boxShadow:
//                   "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//                 border: "1px solid rgba(229, 231, 235, 1)",
//               }}
//             >
//               <img
//                 src={product?.data?.images[0] || "/api/placeholder/400/400"}
//                 alt={product?.data?.name || "Product"}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />

//               {/* Price tag overlay */}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   backgroundColor: "rgba(79, 70, 229, 0.9)", // Indigo color
//                   color: "white",
//                   padding: "8px 16px",
//                   borderTopRightRadius: 12,
//                   fontSize: 28,
//                   fontWeight: 700,
//                 }}
//               >
//                 {formattedPrice}
//               </div>
//             </div>

//             {/* Product details */}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 width: isInstagram ? "90%" : "60%",
//                 height: isInstagram ? "auto" : "100%",
//                 justifyContent: "center",
//                 alignItems: isInstagram ? "center" : "flex-start", // Center align for Instagram
//                 textAlign: isInstagram ? "center" : "left", // Center text for Instagram
//               }}
//             >
//               {/* Product name */}
//               <h1
//                 style={{
//                   fontSize: isInstagram ? 36 : 44,
//                   fontWeight: 700,
//                   color: "#111827",
//                   margin: 0,
//                   marginBottom: 16,
//                   lineHeight: 1.2,
//                 }}
//               >
//                 {product?.data?.name || "Product"}
//               </h1>

//               {/* Product description - truncated if needed */}
//               {product?.data?.description && (
//                 <p
//                   style={{
//                     fontSize: isInstagram ? 20 : 24,
//                     color: "#4B5563",
//                     margin: 0,
//                     marginBottom: 24,
//                     lineHeight: 1.5,
//                   }}
//                 >
//                   {product?.data?.description?.length > 100
//                     ? `${product?.data?.description?.substring(0, 97)}...`
//                     : product?.data?.description}
//                 </p>
//               )}

//               {/* CTA button */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "#4F46E5",
//                   color: "white",
//                   padding: "12px 24px",
//                   borderRadius: 8,
//                   fontWeight: "bold",
//                   fontSize: 24,
//                   width: "fit-content",
//                 }}
//               >
//                 View Product
//               </div>
//             </div>
//           </div>

//           {/* Footer with branding and referral info */}
//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "16px 50px",
//               backgroundColor: "rgba(255, 255, 255, 0.9)",
//               borderTop: "1px solid #E5E7EB",
//               zIndex: 2,
//             }}
//           >
//             {/* Logo placeholder */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             >
//               <div
//                 style={{
//                   width: 24,
//                   height: 24,
//                   borderRadius: "50%",
//                   backgroundColor: "#4F46E5", // Indigo color
//                 }}
//               />
//               <p
//                 style={{
//                   fontSize: 20,
//                   fontWeight: 600,
//                   color: "#111827",
//                   margin: 0,
//                 }}
//               >
//                 {process.env.NEXT_PUBLIC_SITE_NAME || "yourstore.com"}
//               </p>
//             </div>

//             {/* Referral info if available */}
//             {plugId && (
//               <p
//                 style={{
//                   fontSize: 18,
//                   color: "#6B7280",
//                   margin: 0,
//                 }}
//               >
//                 Shared by: {plugId}
//               </p>
//             )}
//           </div>
//         </div>
//       ),
//       {
//         ...size,
//       }
//     );
//   } catch (error) {
//     console.error("Error generating Twitter image:", error);
//     return new ImageResponse(
//       (
//         <div
//           style={{
//             display: "flex",
//             fontSize: 48,
//             background: "white",
//             width: "100%",
//             height: "100%",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           Error generating image
//         </div>
//       ),
//       { ...size }
//     );
//   }
// }



// app/api/twitter-image/route.tsx
import { ImageResponse } from "next/og";
import { getProductServer } from "@/lib/products";
import { NextRequest } from "next/server";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// This ensures the image is regenerated when needed
export const revalidate = 3600; // Revalidate every hour

// Add runtime configuration for edge
export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    // Get URL parameters from the request
    const url = new URL(request.url);
    const productId = url.searchParams.get("pid");
    const plugId = url.searchParams.get("ref");
    const platform = url.searchParams.get("platform");

    // If no product ID is provided, return a default image
    if (!productId) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              fontSize: 48,
              background: "white",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Product ID not specified
          </div>
        ),
        { ...size }
      );
    }

    // Fetch product data with both productId and plugId
    const product = await getProductServer(productId, plugId || undefined);

    if (!product?.data) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              fontSize: 48,
              background: "white",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Product not found
          </div>
        ),
        { ...size }
      );
    }

    // Format price
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product?.data?.price || 0);

    // Determine template based on platform
    const isInstagram = platform === "instagram";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom right, rgba(249, 250, 251, 1), rgba(243, 244, 246, 0.5))",
              zIndex: 0,
            }}
          />

          {/* Main content container */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              padding: isInstagram ? 40 : 50,
              flexDirection: isInstagram ? "column" : "row", // Column layout for Instagram
              alignItems: "center",
              justifyContent: isInstagram ? "center" : "flex-start",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Product image with shadow and border */}
            <div
              style={{
                display: "flex",
                width: isInstagram ? "60%" : "40%",
                height: isInstagram ? "50%" : "70%",
                borderRadius: 16,
                overflow: "hidden",
                margin: isInstagram ? "0 0 30px 0" : "0 40px 0 0", // Different margin for different layouts
                position: "relative",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(229, 231, 235, 1)",
              }}
            >
              <img
                src={product?.data?.images[0] || "/api/placeholder/400/400"}
                alt={product?.data?.name || "Product"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Price tag overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "rgba(79, 70, 229, 0.9)", // Indigo color
                  color: "white",
                  padding: "8px 16px",
                  borderTopRightRadius: 12,
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                {formattedPrice}
              </div>
            </div>

            {/* Product details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: isInstagram ? "90%" : "60%",
                height: isInstagram ? "auto" : "100%",
                justifyContent: "center",
                alignItems: isInstagram ? "center" : "flex-start", // Center align for Instagram
                textAlign: isInstagram ? "center" : "left", // Center text for Instagram
              }}
            >
              {/* Product name */}
              <h1
                style={{
                  fontSize: isInstagram ? 36 : 44,
                  fontWeight: 700,
                  color: "#111827",
                  margin: 0,
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                {product?.data?.name || "Product"}
              </h1>

              {/* Product description - truncated if needed */}
              {product?.data?.description && (
                <p
                  style={{
                    fontSize: isInstagram ? 20 : 24,
                    color: "#4B5563",
                    margin: 0,
                    marginBottom: 24,
                    lineHeight: 1.5,
                  }}
                >
                  {product?.data?.description?.length > 100
                    ? `${product?.data?.description?.substring(0, 97)}...`
                    : product?.data?.description}
                </p>
              )}

              {/* CTA button - FIXED: Removed "fit-content" width */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#4F46E5",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontWeight: "bold",
                  fontSize: 24,
                  // Removed the problematic "width: fit-content" line
                }}
              >
                View Product
              </div>
            </div>
          </div>

          {/* Footer with branding and referral info */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 50px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderTop: "1px solid #E5E7EB",
              zIndex: 2,
            }}
          >
            {/* Logo placeholder */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#4F46E5", // Indigo color
                }}
              />
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#111827",
                  margin: 0,
                }}
              >
                {process.env.NEXT_PUBLIC_SITE_NAME || "yourstore.com"}
              </p>
            </div>

            {/* Referral info if available */}
            {plugId && (
              <p
                style={{
                  fontSize: 18,
                  color: "#6B7280",
                  margin: 0,
                }}
              >
                Shared by: {plugId}
              </p>
            )}
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error("Error generating Twitter image:", error);
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Error generating image
        </div>
      ),
      { ...size }
    );
  }
}

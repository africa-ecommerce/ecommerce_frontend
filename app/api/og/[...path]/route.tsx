import { ImageResponse } from "next/og";
import { getProductServer } from "@/lib/products";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Extract the product ID by removing any file extension
    const fullPath = params.path.join('/');
    const productId = fullPath.split('.')[0];

    console.log("params", productId);
     
    const product = await getProductServer(productId);

    console.log("getProductServer", product);

    if (!product) {
      return new Response("Product not found", { status: 400 });
    }

    // Format price
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product.price);

    // Truncate description if needed
    const description =
      product.description.length > 100
        ? `${product.description.substring(0, 97)}...`
        : product.description;

    // Format rating if available
    const ratingDisplay = product.rating ? `★${product.rating}` : null;

    const Resp = new ImageResponse(
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
          {/* Background gradient for visual appeal */}
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
              padding: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Product image with shadow and border */}
            <div
              style={{
                display: "flex",
                width: "50%",
                height: "75%",
                borderRadius: 16,
                overflow: "hidden",
                marginRight: 40,
                position: "relative",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(229, 231, 235, 1)",
              }}
            >
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
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
                  backgroundColor: "rgba(255, 90, 95, 0.9)", // Airbnb-like color
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
                width: "50%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              {/* Product name */}
              <h1
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  color: "#111827",
                  margin: 0,
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                {product.name}
              </h1>

              {/* Rating and features row */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 24,
                  fontSize: 24,
                  color: "#4B5563",
                }}
              >
                {ratingDisplay && (
                  <div
                    style={{
                      marginRight: 16,
                      display: "flex",
                      alignItems: "center",
                      color: "#FF5A5F", // Airbnb-like color
                      fontWeight: 600,
                    }}
                  >
                    {ratingDisplay}
                  </div>
                )}

                {product.features &&
                  product.features.slice(0, 3).map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        marginRight: i < product.features!.length - 1 ? 16 : 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {feature}
                      {i < product.features!.length - 1 && (
                        <div
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: "#9CA3AF",
                            marginLeft: 16,
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>

              {/* Product description */}
              <p
                style={{
                  fontSize: 24,
                  color: "#4B5563",
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: "100%",
                }}
              >
                {description}
              </p>
            </div>
          </div>

          {/* Footer with branding */}
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
            {/* Logo placeholder - replace with your actual logo */}
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
                  backgroundColor: "#FF5A5F", // Airbnb-like color
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

            {/* Call to action */}
            <p
              style={{
                fontSize: 18,
                color: "#6B7280",
                margin: 0,
              }}
            >
              View this listing →
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
    console.log("Resp", Resp);
    return Resp;
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}



// import { ImageResponse } from "next/og";
// import { getProductServer } from "@/lib/products";
// import type { NextRequest } from "next/server";

// export const runtime = "edge";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { path: string[] } }
// ) {
//   try {
//     // Extract the product ID by removing any file extension
//     const fullPath = params.path.join("/");
//     const productId = fullPath.split(".")[0];

//     console.log("params", productId);

//     const product = await getProductServer(productId);

//     console.log("getProductServer", product);

//     if (!product) {
//       return new Response("Product not found", { status: 400 });
//     }

//     // Format price
//     const formattedPrice = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(product.price);

//     // Truncate description if needed
//     const description =
//       product.description && product.description.length > 100
//         ? `${product.description.substring(0, 97)}...`
//         : product.description || "No description available";

//     // Format rating if available
//     const ratingDisplay = product.rating ? `★${product.rating}` : null;

//     const Resp = new ImageResponse(
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
//           {/* Background gradient for visual appeal */}
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
//               padding: 50,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             {/* Product image with shadow and border */}
//             <div
//               style={{
//                 display: "flex",
//                 width: "50%",
//                 height: "75%",
//                 borderRadius: 16,
//                 overflow: "hidden",
//                 marginRight: 40,
//                 position: "relative",
//                 boxShadow:
//                   "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//                 border: "1px solid rgba(229, 231, 235, 1)",
//                 backgroundColor: "#f3f4f6", // Light gray background as fallback
//               }}
//             >
//               {/* Use a placeholder div instead of an img tag */}
//               <div
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: 24,
//                   color: "#9ca3af",
//                   background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>') center / 100px no-repeat, #f3f4f6`,
//                 }}
//               >
//                 {/* Image representation instead of actual image */}
//               </div>

//               {/* Price tag overlay */}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   backgroundColor: "rgba(255, 90, 95, 0.9)", // Airbnb-like color
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
//                 width: "50%",
//                 height: "100%",
//                 justifyContent: "center",
//               }}
//             >
//               {/* Product name */}
//               <h1
//                 style={{
//                   fontSize: 44,
//                   fontWeight: 700,
//                   color: "#111827",
//                   margin: 0,
//                   marginBottom: 16,
//                   lineHeight: 1.2,
//                 }}
//               >
//                 {product.name}
//               </h1>

//               {/* Rating and features row */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginBottom: 24,
//                   fontSize: 24,
//                   color: "#4B5563",
//                 }}
//               >
//                 {ratingDisplay && (
//                   <div
//                     style={{
//                       marginRight: 16,
//                       display: "flex",
//                       alignItems: "center",
//                       color: "#FF5A5F", // Airbnb-like color
//                       fontWeight: 600,
//                     }}
//                   >
//                     {ratingDisplay}
//                   </div>
//                 )}

//                 {product.features &&
//                   product.features.slice(0, 3).map((feature, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         marginRight: i < product.features!.length - 1 ? 16 : 0,
//                         display: "flex",
//                         alignItems: "center",
//                       }}
//                     >
//                       {feature}
//                       {i < product.features!.length - 1 && (
//                         <div
//                           style={{
//                             width: 4,
//                             height: 4,
//                             borderRadius: "50%",
//                             backgroundColor: "#9CA3AF",
//                             marginLeft: 16,
//                           }}
//                         />
//                       )}
//                     </div>
//                   ))}
//               </div>

//               {/* Product description */}
//               <p
//                 style={{
//                   fontSize: 24,
//                   color: "#4B5563",
//                   margin: 0,
//                   lineHeight: 1.5,
//                   maxWidth: "100%",
//                 }}
//               >
//                 {description}
//               </p>

//               {/* Supplier info if available */}
//               {product.supplier && (
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginTop: 24,
//                     fontSize: 18,
//                     color: "#6B7280",
//                   }}
//                 >
//                   <p style={{ margin: 0 }}>
//                     Sold by: <strong>{product.supplier.businessName}</strong>
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Footer with branding */}
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
//             {/* Logo placeholder - replace with your actual logo */}
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
//                   backgroundColor: "#FF5A5F", // Airbnb-like color
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

//             {/* Call to action */}
//             <p
//               style={{
//                 fontSize: 18,
//                 color: "#6B7280",
//                 margin: 0,
//               }}
//             >
//               View this listing →
//             </p>
//           </div>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 630,
//       }
//     );
//     console.log("Resp", Resp);
//     return Resp;
//   } catch (error) {
//     console.error("Error generating OG image:", error);
//     return new Response("Error generating image", { status: 500 });
//   }
// }
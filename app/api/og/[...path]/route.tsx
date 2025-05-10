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
//     const fullPath = params.path.join('/');
//     const productId = fullPath.split('.')[0];

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
//       product.description.length > 100
//         ? `${product.description.substring(0, 97)}...`
//         : product.description;

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
//               }}
//             >
//               <img
//                 src={product.images[0] || "/placeholder.svg"}
//                 alt={product.name}
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


// import { ImageResponse } from "next/og";
// import { getProductServer } from "@/lib/products";
// import type { NextRequest } from "next/server";

// export const runtime = "edge";

// // Define product category color schemes
// const categoryColors = {
//   electronics: {
//     primary: "#0062FF",
//     secondary: "#00C2FF",
//     accent: "#FF9500",
//     background: "linear-gradient(135deg, #001E63 0%, #0046B8 100%)",
//   },
//   clothing: {
//     primary: "#FF3366",
//     secondary: "#FF9EBC",
//     accent: "#7928CA",
//     background: "linear-gradient(135deg, #2D0A31 0%, #5B0F48 100%)",
//   },
//   home: {
//     primary: "#00B67A",
//     secondary: "#80E9C5",
//     accent: "#FF6B35",
//     background: "linear-gradient(135deg, #073B3A 0%, #0A6158 100%)",
//   },
//   food: {
//     primary: "#FF4B4B",
//     secondary: "#FFCB47",
//     accent: "#6F4E37",
//     background: "linear-gradient(135deg, #4A0100 0%, #870D0D 100%)",
//   },
//   beauty: {
//     primary: "#F076D4",
//     secondary: "#FFAAD8",
//     accent: "#FFC247",
//     background: "linear-gradient(135deg, #2C0036 0%, #5C0068 100%)",
//   },
//   default: {
//     primary: "#3B82F6",
//     secondary: "#93C5FD",
//     accent: "#F59E0B",
//     background: "linear-gradient(135deg, #082952 0%, #1E4784 100%)",
//   },
// };

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { path: string[] } }
// ) {
//   try {
//     // Extract the product ID by removing any file extension
//     const fullPath = params.path.join('/');
//     const productId = fullPath.split('.')[0];
    
//     // Get referrer to optimize image for specific platform
//     const referrer = request.headers.get("referer") || "";
//     const platform = getReferrerPlatform(referrer);
    
//     const product = await getProductServer(productId);

//     if (!product) {
//       return new Response("Product not found", { status: 400 });
//     }

//     // Determine product category for styling
//     const category = product.category?.toLowerCase() || "default";
//     const colors = categoryColors[category] || categoryColors.default;

//     // Format price with currency symbol
//     const formattedPrice = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       maximumFractionDigits: 0,
//     }).format(product.price);

//     // Format rating and determine star color based on score
//     let ratingColor = "#FFD700"; // Default gold
//     if (product.rating) {
//       if (product.rating >= 4.8) ratingColor = "#00C853"; // Exceptional rating
//       else if (product.rating < 3.5) ratingColor = "#FF5252"; // Lower rating
//     }

//     // Truncate and optimize product description
//     const description = optimizeDescription(product.description, platform);
    
//     // Create pattern for background texture
//     const patternSize = 20;
//     const patternOpacity = 0.07;
    
//     // Determine if it's a featured or sale product
//     const isFeatured = product.featured || false;
//     const isOnSale = product.salePrice && product.salePrice < product.price;
    
//     // Calculate discount percentage if on sale
//     const discountPercentage = isOnSale 
//       ? Math.round(((product.price - product.salePrice) / product.price) * 100)
//       : 0;
    
//     // Determine the ideal product image
//     const productImage = selectBestProductImage(product.images);
    
//     // Generate brand name
//     const brandName = process.env.NEXT_PUBLIC_SITE_NAME || "YourBrand";

//     // Define specific dimensions optimized for WhatsApp preview
// const imageWidth = 1200;
// const imageHeight = 630;

// // WhatsApp shows square-ish previews, so we need to optimize the center portion
// // The critical area is roughly a 400x400px square in the center of the image
// // This means we need to position the most important content in that area

// const Resp = new ImageResponse(
//       (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             width: "100%",
//             height: "100%",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           {/* Dynamic Background with Pattern */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: colors.background,
//               zIndex: 0,
//             }}
//           />
          
//           {/* Geometric Pattern Overlay */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,${patternOpacity}) 2px, transparent 0), 
//                                radial-gradient(circle at ${patternSize/2}px ${patternSize/2}px, rgba(255,255,255,${patternOpacity}) 2px, transparent 0)`,
//               backgroundSize: `${patternSize}px ${patternSize}px`,
//               zIndex: 0,
//             }}
//           />
          
//           {/* Dramatic Light Effect */}
//           <div
//             style={{
//               position: "absolute",
//               top: "-30%",
//               right: "-20%",
//               width: "80%",
//               height: "80%",
//               background: `radial-gradient(ellipse at center, ${colors.secondary}30 0%, transparent 70%)`,
//               // transform: "rotate(-15deg)",
//               zIndex: 0,
//               opacity: 0.8,
//             }}
//           />

//           {/* WhatsApp-optimized Content Layout */}
//           <div
//             style={{
//               display: "flex",
//               width: "100%",
//               height: "100%",
//               padding: platform === "whatsapp" ? "20px 30px" : "40px 50px",
//               flexDirection: platform === "whatsapp" ? "column" : "row",
//               alignItems: "center",
//               justifyContent: "center", // Center everything for WhatsApp
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             {/* Product Image with WhatsApp-optimized Styling */}
//             <div
//               style={{
//                 display: "flex",
//                 width: platform === "whatsapp" ? "85%" : "48%",
//                 height: platform === "whatsapp" ? "52%" : "80%",
//                 position: "relative",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 // Center this element in WhatsApp's preview window (400x400 center area)
//                 marginTop: platform === "whatsapp" ? "0" : "initial",
//               }}
//             >
//               {/* Image Frame with 3D Effect */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "5%",
//                   left: "5%",
//                   width: "90%",
//                   height: "90%",
//                   backgroundColor: "rgba(255,255,255,0.04)",
//                   borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
//                   // transform: "rotate(-5deg)",
//                   filter: "blur(8px)",
//                   zIndex: 0,
//                 }}
//               />
              
//               {/* Product Image */}
//               <div
//                 style={{
//                   position: "relative",
//                   width: "100%",
//                   height: "90%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   zIndex: 1,
//                 }}
//               >
//                 <img
//                   src={productImage || "/placeholder.svg"}
//                   alt={product.name}
//                   style={{
//                     maxWidth: "100%",
//                     maxHeight: "100%",
//                     objectFit: "contain",
//                     filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.3))",
//                     // transform: "perspective(800px) rotateY(-5deg)",
//                   }}
//                 />
                
//                 {/* WhatsApp-optimized Price Tag - Extra Large */}
//                 {isOnSale ? (
//                   <div
//                     style={{
//                       position: "absolute",
//                       bottom: platform === "whatsapp" ? "5%" : "8%",
//                       left: "0",
//                       backgroundColor: "#FF3B30",
//                       borderRadius: "4px 12px 12px 4px",
//                       padding: platform === "whatsapp" ? "14px 20px 14px 16px" : "12px 24px 12px 16px",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "flex-start",
//                       boxShadow: "0 10px 25px -5px rgba(255, 59, 48, 0.5)",
//                       zIndex: 2,
//                       // Add an outer glow for WhatsApp visibility
//                       border: platform === "whatsapp" ? "2px solid rgba(255,255,255,0.3)" : "none",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: platform === "whatsapp" ? 20 : 18,
//                         color: "rgba(255,255,255,0.8)",
//                         textDecoration: "line-through",
//                         fontWeight: 500,
//                       }}
//                     >
//                       {formattedPrice}
//                     </div>
//                     <div
//                       style={{
//                         fontSize: platform === "whatsapp" ? 36 : 32,
//                         color: "white",
//                         fontWeight: 800,
//                         display: "flex",
//                         alignItems: "center",
//                       }}
//                     >
//                       {new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         maximumFractionDigits: 0,
//                       }).format(product.salePrice || 0)}
//                       <span
//                         style={{
//                           marginLeft: "10px",
//                           fontSize: platform === "whatsapp" ? 24 : 22,
//                           backgroundColor: "white",
//                           color: "#FF3B30",
//                           padding: "2px 8px",
//                           borderRadius: "4px",
//                           fontWeight: 700,
//                         }}
//                       >
//                         {discountPercentage}% OFF
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div
//                     style={{
//                       position: "absolute",
//                       bottom: platform === "whatsapp" ? "5%" : "8%",
//                       left: "0",
//                       background: platform === "whatsapp" 
//                         ? `linear-gradient(135deg, #FF3B30 0%, #FF8856 100%)`
//                         : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//                       borderRadius: "4px 12px 12px 4px",
//                       padding: platform === "whatsapp" ? "14px 20px" : "10px 24px",
//                       color: "white",
//                       fontSize: platform === "whatsapp" ? 38 : 32,
//                       fontWeight: 800,
//                       boxShadow: platform === "whatsapp"
//                         ? "0 8px 20px -4px rgba(255, 59, 48, 0.6)"
//                         : `0 10px 25px -5px ${colors.primary}80`,
//                       zIndex: 2,
//                       // Add an outer glow for WhatsApp visibility
//                       border: platform === "whatsapp" ? "2px solid rgba(255,255,255,0.3)" : "none",
//                     }}
//                   >
//                     {formattedPrice}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Product Details - WhatsApp Optimized */}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 width: platform === "whatsapp" ? "90%" : "48%",
//                 height: platform === "whatsapp" ? "42%" : "80%",
//                 justifyContent: "flex-start",
//                 position: "relative",
//                 zIndex: 1,
//                 // For WhatsApp, we want minimal top margin so text stays in preview
//                 marginTop: platform === "whatsapp" ? "0" : "initial",
//                 // Keep all the critical content in the visible center area
//                 overflow: "hidden",
//               }}
//             >
//               {/* Featured/New Badge if applicable */}
//               {isFeatured && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "-20px",
//                     right: "10px",
//                     background: `linear-gradient(135deg, #FFD700 0%, #FFA500 100%)`,
//                     padding: "6px 16px",
//                     borderRadius: "20px",
//                     color: "#000",
//                     fontWeight: 700,
//                     fontSize: 18,
//                     boxShadow: "0 8px 16px -4px rgba(255, 215, 0, 0.5)",
//                     // transform: "rotate(5deg)",
//                   }}
//                 >
//                   FEATURED
//                 </div>
//               )}
              
//               {/* Category Label - Hidden on WhatsApp to save space */}
//               {platform !== "whatsapp" && (
//                 <div
//                   style={{
//                     color: colors.secondary,
//                     fontSize: 20,
//                     fontWeight: 600,
//                     textTransform: "uppercase",
//                     letterSpacing: "0.05em",
//                     marginBottom: 16,
//                   }}
//                 >
//                   {product.category || "Product"}
//                 </div>
//               )}
              
//               {/* Product Name with WhatsApp-optimized Sizing */}
//               <h1
//                 style={{
//                   fontSize: platform === "whatsapp" 
//                     ? (product.name.length > 20 ? 36 : 42) 
//                     : (product.name.length > 30 ? 42 : 52),
//                   fontWeight: 800,
//                   color: "white",
//                   margin: 0,
//                   marginBottom: platform === "whatsapp" ? 10 : 20,
//                   lineHeight: 1.1,
//                   textShadow: "0 2px 10px rgba(0,0,0,0.2)",
//                   backgroundImage: `linear-gradient(135deg, #fff 0%, ${colors.secondary} 100%)`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   // For WhatsApp, we want to ensure the name is fully visible
//                   display: "-webkit-box",
//                   WebkitLineClamp: platform === "whatsapp" ? 2 : 3,
//                   WebkitBoxOrient: "vertical",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 {platform === "whatsapp" && product.name.length > 40
//                   ? product.name.substring(0, 40) + "..."
//                   : product.name}
//               </h1>

//               {/* Rating - More Prominent for WhatsApp */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginBottom: platform === "whatsapp" ? 10 : 20,
//                   gap: 16,
//                 }}
//               >
//                 {product.rating && (
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       padding: platform === "whatsapp" ? "4px 10px" : "6px 12px",
//                       backgroundColor: platform === "whatsapp" 
//                         ? `${ratingColor}30` 
//                         : "rgba(0,0,0,0.2)",
//                       borderRadius: 8,
//                       color: ratingColor,
//                       fontWeight: 700,
//                       fontSize: platform === "whatsapp" ? 20 : 22,
//                       border: platform === "whatsapp" 
//                         ? `2px solid ${ratingColor}` 
//                         : "none",
//                     }}
//                   >
//                     ★ {product.rating.toFixed(1)}
//                   </div>
//                 )}
                
//                 {/* Reviews count - hide on WhatsApp to save space */}
//                 {product.reviewCount && platform !== "whatsapp" && (
//                   <div
//                     style={{
//                       color: "rgba(255,255,255,0.7)",
//                       fontSize: 18,
//                     }}
//                   >
//                     {product.reviewCount} reviews
//                   </div>
//                 )}
//               </div>

//               {/* Product Description - Very Short for WhatsApp */}
//               {(platform !== "whatsapp" || description.length < 30) && (
//                 <p
//                   style={{
//                     fontSize: platform === "whatsapp" ? 18 : 22,
//                     color: "rgba(255,255,255,0.9)",
//                     margin: 0,
//                     marginBottom: platform === "whatsapp" ? 10 : 24,
//                     lineHeight: 1.5,
//                     maxWidth: "100%",
//                     // For WhatsApp, limit to 1 line
//                     display: "-webkit-box",
//                     WebkitLineClamp: platform === "whatsapp" ? 1 : 3,
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   {platform === "whatsapp" && description.length > 60
//                     ? description.substring(0, 60) + "..."
//                     : description}
//                 </p>
//               )}
              
//               {/* Key Features - Limited or Hidden on WhatsApp */}
//               {product.features && product.features.length > 0 && platform !== "whatsapp" && (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 12,
//                   }}
//                 >
//                   {product.features.slice(0, platform === "whatsapp" ? 1 : 3).map((feature, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 10,
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 10,
//                           height: 10,
//                           borderRadius: "50%",
//                           backgroundColor: colors.accent,
//                         }}
//                       />
//                       <div
//                         style={{
//                           color: "rgba(255,255,255,0.9)",
//                           fontSize: platform === "whatsapp" ? 16 : 18,
//                           fontWeight: 500,
//                         }}
//                       >
//                         {feature}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
              
//               {/* Super-visible WhatsApp CTA Button */}
//               <div
//                 style={{
//                   marginTop: platform === "whatsapp" ? 14 : 30,
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <div
//                   style={{
//                     background: platform === "whatsapp"
//                       ? `linear-gradient(135deg, #FF3B30 0%, #FF8856 100%)`
//                       : `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent}DD 100%)`,
//                     borderRadius: 8,
//                     padding: platform === "whatsapp" ? "10px 24px" : "12px 32px",
//                     color: "white",
//                     fontSize: platform === "whatsapp" ? 18 : 20,
//                     fontWeight: 700,
//                     boxShadow: platform === "whatsapp"
//                       ? "0 8px 16px -4px rgba(255, 59, 48, 0.6)"
//                       : `0 10px 20px -5px ${colors.accent}80`,
//                     border: platform === "whatsapp" ? "2px solid rgba(255,255,255,0.3)" : "none",
//                   }}
//                 >
//                   {platform === "whatsapp" ? "Tap to View" : "View Details"}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: 24,
//                     color: "white",
//                     marginLeft: 16,
//                     fontWeight: 500,
//                     opacity: 0.8,
//                   }}
//                 >
//                   →
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Branding Footer - Smaller on WhatsApp */}
//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               display: platform === "whatsapp" ? "none" : "flex", // Hide on WhatsApp to make room for product details
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "16px 50px",
//               backgroundColor: "rgba(0,0,0,0.2)",
//               backdropFilter: "blur(10px)",
//               borderTop: "1px solid rgba(255,255,255,0.1)",
//               zIndex: 2,
//             }}
//           >
//             {/* Logo and Brand Name */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//               }}
//             >
//               <div
//                 style={{
//                   width: 28,
//                   height: 28,
//                   borderRadius: isCircleLogo(brandName) ? "50%" : "6px",
//                   background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: 16,
//                   fontWeight: 700,
//                   color: "white",
//                 }}
//               >
//                 {brandName.charAt(0).toUpperCase()}
//               </div>
//               <p
//                 style={{
//                   fontSize: 20,
//                   fontWeight: 600,
//                   color: "white",
//                   margin: 0,
//                 }}
//               >
//                 {brandName}
//               </p>
//             </div>

//             {/* Dramatic Call to Action */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 6,
//               }}
//             >
//               <p
//                 style={{
//                   fontSize: 18,
//                   color: "rgba(255,255,255,0.85)",
//                   margin: 0,
//                   fontWeight: 500,
//                 }}
//               >
//                 {generateCallToAction(platform, product)}
//               </p>
//             </div>
//           </div>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 630,
//       }
//     );
//     return Resp;
//   } catch (error) {
//     console.error("Error generating OG image:", error);
//     return new Response("Error generating image", { status: 500 });
//   }
// }

// // Helper Functions

// function getReferrerPlatform(referrer: string): string {
//   referrer = referrer.toLowerCase();
//   if (referrer.includes("whatsapp")) return "whatsapp";
//   if (referrer.includes("twitter") || referrer.includes("x.com")) return "twitter";
//   if (referrer.includes("instagram")) return "instagram";
//   if (referrer.includes("facebook")) return "facebook";
  
//   // Default to WhatsApp optimization since that's our priority
//   return "whatsapp";
// }

// function optimizeDescription(description: string, platform: string): string {
//   // Significantly shorter for WhatsApp to allow for larger visuals
//   const maxLength = platform === "whatsapp" ? 60 : 100;
  
//   if (description.length <= maxLength) return description;
  
//   // Find a good breakpoint (end of sentence or comma)
//   const truncated = description.substring(0, maxLength);
//   const lastPeriod = truncated.lastIndexOf(".");
//   const lastComma = truncated.lastIndexOf(",");
  
//   const breakPoint = lastPeriod > 0 ? lastPeriod + 1 : 
//                      lastComma > 0 ? lastComma + 1 : maxLength;
                     
//   return `${description.substring(0, breakPoint).trim()}...`;
// }

// function selectBestProductImage(images: string[]): string {
//   if (!images || images.length === 0) return "/placeholder.svg";
  
//   // Logic to select best image (prefer transparent or white background images)
//   // For now just return the first image
//   return images[0];
// }

// function isCircleLogo(brandName: string): boolean {
//   // Determine if logo should be circular or square based on brand name
//   // This is just a simple algorithm based on name length
//   return brandName.length % 2 === 0;
// }

// function generateCallToAction(platform: string, product: any): string {
//   const ctas = [
//     "View this product →",
//     "Discover more →",
//     "Shop now →",
//     "See details →",
//   ];
  
//   // Base CTA on platform and product
//   if (platform === "whatsapp") return "Tap to view →";
//   if (product.salePrice) return "Shop the sale →";
//   if (product.featured) return "See featured item →";
  
//   // Otherwise return random CTA from list
//   return ctas[Math.floor(Math.random() * ctas.length)];
// }


import { ImageResponse } from "next/og";
import { getProductServer } from "@/lib/products";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Maximum size and quality settings for WhatsApp
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // Set CORS headers to allow WhatsApp web crawler to access this image
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "content-type": "image/png",
    "cache-control": "public, max-age=31536000, immutable",
  };
  try {
    // Extract the product ID by removing any file extension
    const fullPath = params.path.join("/");
    const productId = fullPath.split(".")[0];

    const product = await getProductServer(productId);

    if (!product) {
      return new Response("Product not found", { status: 404 });
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

    // Using 1200x630 dimensions which are optimal for WhatsApp
    // WhatsApp prefers 1.91:1 aspect ratio (close to 1200x630)
    // Set proper dimensions and options for WhatsApp
    // WhatsApp prefers 1.91:1 ratio (exactly 1200x630)
    const imageResponse = new ImageResponse(
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
                src={"/placeholder-logo.png"}
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
                      {i < Math.min(2, product.features!.length - 1) && (
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
        // Enhanced quality for WhatsApp preview
        quality: 100,
        // Pass through our headers
        headers,
      }
    );

    return imageResponse;
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}
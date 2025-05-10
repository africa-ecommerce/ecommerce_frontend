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




import { ImageResponse } from "next/og"
import { getProductServer } from "@/lib/products"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    // Extract the product ID by removing any file extension
    const fullPath = params.path.join("/")
    const productId = fullPath.split(".")[0]

    const product = await getProductServer(productId)

    if (!product) {
      return new Response("Product not found", { status: 400 })
    }

    // Determine product category for styling
    const category = product.category || "default"

    // Format price
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(product.price)

    // Truncate description if needed
    const description =
      product.description.length > 100 ? `${product.description.substring(0, 97)}...` : product.description

    // Format rating if available
    const ratingDisplay = product.rating ? `★${product.rating}` : null

    // Define category-specific styling
    const categoryStyles = {
      luxury: {
        bgGradient: "linear-gradient(135deg, #2D3436 0%, #000000 100%)",
        accentColor: "#D4AF37", // Gold
        textColor: "#FFFFFF",
        secondaryColor: "#9370DB", // Purple
      },
      tech: {
        bgGradient: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
        accentColor: "#00F2FE", // Electric blue
        textColor: "#FFFFFF",
        secondaryColor: "#4776E6",
      },
      food: {
        bgGradient: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
        accentColor: "#FFD700", // Gold
        textColor: "#FFFFFF",
        secondaryColor: "#FF8C00", // Dark orange
      },
      fashion: {
        bgGradient: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
        accentColor: "#FFFFFF",
        textColor: "#FFFFFF",
        secondaryColor: "#E100FF",
      },
      default: {
        bgGradient: "linear-gradient(135deg, #F6F9FC 0%, #EDF2F7 100%)",
        accentColor: "#FF5A5F", // Airbnb-like color
        textColor: "#1A202C",
        secondaryColor: "#3182CE",
      },
    }

    // Select style based on category
    const style = categoryStyles[category as keyof typeof categoryStyles] || categoryStyles.default

    // Generate a unique visual pattern based on product ID
    // This creates a subtle background pattern that's unique to each product
    const patternSeed = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const patternRotation = patternSeed % 360
    const patternOpacity = 0.03 + (patternSeed % 7) / 100

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: style.bgGradient,
          position: "relative",
          fontFamily: "Inter, sans-serif",
          color: style.textColor,
        }}
      >
        {/* Unique background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `repeating-linear-gradient(${patternRotation}deg, ${style.accentColor} 0px, transparent 2px, transparent 10px)`,
            opacity: patternOpacity,
            zIndex: 0,
          }}
        />

        {/* Golden ratio overlay for visual balance */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "61.8%", // Golden ratio
            width: "1px",
            height: "100%",
            background: `${style.accentColor}20`,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "61.8%", // Golden ratio
            width: "100%",
            height: "1px",
            background: `${style.accentColor}20`,
            zIndex: 0,
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "50px 60px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Product image with dramatic styling */}
          <div
            style={{
              display: "flex",
              width: "45%",
              height: "75%",
              borderRadius: 24,
              overflow: "hidden",
              marginRight: 50,
              position: "relative",
              boxShadow: `0 25px 50px -12px ${style.accentColor}40`,
              transform: "perspective(1000px) rotateY(-5deg)",
              border: `1px solid ${style.accentColor}30`,
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

            {/* Dramatic lighting effect overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 75% 25%, transparent 0%, ${style.accentColor}10 100%)`,
                zIndex: 2,
              }}
            />

            {/* Price tag with visual appeal */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: style.accentColor,
                color: category === "default" ? "white" : style.textColor,
                padding: "12px 24px",
                borderTopRightRadius: 16,
                fontSize: 32,
                fontWeight: 800,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                zIndex: 3,
              }}
            >
              {formattedPrice}
            </div>

            {/* Urgency indicator (if product is limited) */}
            {product.stock && product.stock < 10 && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  backgroundColor: "#FF3B30",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 700,
                  zIndex: 3,
                }}
              >
                Only {product.stock} left
              </div>
            )}
          </div>

          {/* Product details with enhanced typography */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "55%",
              height: "100%",
              justifyContent: "center",
            }}
          >
            {/* Product name with dramatic styling */}
            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: style.textColor,
                margin: 0,
                marginBottom: 16,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textShadow: category !== "default" ? `0 2px 10px ${style.accentColor}40` : "none",
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
                color: `${style.textColor}90`,
              }}
            >
              {ratingDisplay && (
                <div
                  style={{
                    marginRight: 20,
                    display: "flex",
                    alignItems: "center",
                    color: style.accentColor,
                    fontWeight: 700,
                    fontSize: 28,
                  }}
                >
                  {ratingDisplay}
                </div>
              )}

              {product.features &&
                product.features.slice(0, 2).map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      marginRight: i < Math.min(product.features!.length, 2) - 1 ? 16 : 0,
                      display: "flex",
                      alignItems: "center",
                      background: `${style.accentColor}20`,
                      padding: "4px 12px",
                      borderRadius: 12,
                    }}
                  >
                    {feature}
                  </div>
                ))}
            </div>

            {/* Product description with enhanced styling */}
            <p
              style={{
                fontSize: 26,
                color: `${style.textColor}90`,
                margin: 0,
                lineHeight: 1.5,
                maxWidth: "100%",
                position: "relative",
                paddingLeft: 16,
                borderLeft: `4px solid ${style.accentColor}50`,
              }}
            >
              {description}
            </p>

            {/* Visual CTA element */}
            <div
              style={{
                marginTop: 32,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: style.accentColor,
                  color: category === "default" ? "white" : style.textColor,
                  padding: "12px 24px",
                  borderRadius: 12,
                  fontSize: 24,
                  fontWeight: 700,
                  boxShadow: `0 10px 15px -3px ${style.accentColor}40`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Shop Now
                <div
                  style={{
                    marginLeft: 8,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: category === "default" ? "white" : style.textColor,
                    color: style.accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  →
                </div>
              </div>

              {/* Social proof indicator */}
              {product.purchases && product.purchases > 0 && (
                <div
                  style={{
                    marginLeft: 16,
                    fontSize: 18,
                    color: `${style.textColor}80`,
                  }}
                >
                  {product.purchases}+ people purchased
                </div>
              )}
            </div>
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
            padding: "16px 60px",
            background:
              category === "default"
                ? "rgba(255, 255, 255, 0.9)"
                : `linear-gradient(90deg, ${style.accentColor}10, ${style.secondaryColor}20)`,
            borderTop: `1px solid ${style.accentColor}20`,
            zIndex: 2,
          }}
        >
          {/* Logo and brand name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: style.accentColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              S
            </div>
            <p
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: style.textColor,
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
              color: `${style.textColor}80`,
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            View this product
            <span
              style={{
                marginLeft: 4,
                fontSize: 20,
              }}
            >
              →
            </span>
          </p>
        </div>

        {/* WhatsApp-optimized focal area indicator (invisible in production) */}
        {/* {process.env.NODE_ENV === "development" && ( */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 400,
              height: 400,
              transform: "translate(-50%, -50%)",
              border: "2px dashed rgba(255, 0, 0, 0.3)",
              borderRadius: 8,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
        {/* )} */}
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)
    return new Response("Error generating image", { status: 500 })
  }
}


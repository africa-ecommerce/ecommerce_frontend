// import { ImageResponse } from 'next/og';
// import { NextRequest } from 'next/server';
// import { createHash } from 'crypto';

// // Define font loading
// const interRegular = fetch(new URL('../../../../public/fonts/Inter-Regular.ttf', import.meta.url)).then(
//   (res) => res.arrayBuffer()
// );
// const interBold = fetch(new URL('../../../../public/fonts/Inter-Bold.ttf', import.meta.url)).then(
//   (res) => res.arrayBuffer()
// );

// // This sets the size of the generated image
// export const runtime = 'edge';
// export const contentType = 'image/png';
// export const size = {
//   width: 1200,
//   height: 630,
// };

// // Cache header configuration
// export async function headers() {
//   return {
//     'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
//   };
// }

// export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
//   const { productId } = params;
//   const searchParams = request.nextUrl.searchParams;
  
//   // Get query parameters
//   const signature = searchParams.get('signature');
//   const version = searchParams.get('v') || '1';
//   const platform = searchParams.get('platform') || 'default';
  
//   try {
//     // Fetch product data from your database or API
//     const product = await getProductById(productId);
    
//     if (!product) {
//       return new Response('Product not found', { status: 404 });
//     }
    
//     // Validate signature to prevent URL manipulation if signature is provided
//     if (signature) {
//       const expectedSignature = createHash('sha256')
//         .update(`${productId}-${version}-${process.env.OG_SECRET_KEY}`)
//         .digest('hex')
//         .slice(0, 12);
      
//       if (signature !== expectedSignature) {
//         return new Response('Invalid signature', { status: 401 });
//       }
//     }
    
//     // Load fonts
//     const [interRegularData, interBoldData] = await Promise.all([
//       interRegular,
//       interBold,
//     ]);
    
//     // Format the price for display
//     const formattedPrice = new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: product.currency || 'USD',
//     }).format(product.price);
    
//     // Customize layout based on platform
//     const isPlatformTwitter = platform === 'twitter';
//     const isPlatformWhatsapp = platform === 'whatsapp';
    
//     // Generate image response
//     return new ImageResponse(
//       (
//         <div
//           style={{
//             display: 'flex',
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'white',
//             position: 'relative',
//             fontFamily: 'Inter',
//           }}
//         >
//           {/* Main product image */}
//           <div
//             style={{
//               width: isPlatformTwitter ? '60%' : '65%',
//               height: '100%',
//               display: 'flex',
//               position: 'relative',
//             }}
//           >
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//               }}
//             />
//           </div>
          
//           {/* Product information */}
//           <div
//             style={{
//               width: isPlatformTwitter ? '40%' : '35%',
//               display: 'flex',
//               flexDirection: 'column',
//               padding: isPlatformWhatsapp ? '30px' : '40px',
//               justifyContent: 'space-between',
//               backgroundColor: '#ffffff',
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: isPlatformWhatsapp ? 22 : 28,
//                   fontWeight: 'bold',
//                   marginBottom: 12,
//                   color: '#222222',
//                   lineHeight: 1.3,
//                 }}
//               >
//                 {product.name.length > 55 ? product.name.substring(0, 52) + '...' : product.name}
//               </div>
              
//               <div
//                 style={{
//                   fontSize: isPlatformWhatsapp ? 20 : 24,
//                   marginTop: 8,
//                   marginBottom: 24,
//                   color: '#222222',
//                   display: 'flex',
//                   alignItems: 'center',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {formattedPrice}
//                 {product.duration && (
//                   <span style={{ color: '#717171', fontSize: isPlatformWhatsapp ? 16 : 20, fontWeight: 'normal' }}>
//                     &nbsp;· {product.duration}
//                   </span>
//                 )}
//               </div>
              
//               <div
//                 style={{
//                   fontSize: isPlatformWhatsapp ? 16 : 18,
//                   color: '#717171',
//                   marginBottom: 16,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '4px',
//                 }}
//               >
//                 <div style={{ width: 16, height: 16, backgroundColor: '#FF385C', borderRadius: '50%' }} />
//                 {product.location}
//               </div>
              
//               {product.features && (
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '8px',
//                     marginTop: 20,
//                   }}
//                 >
//                   {product.features.slice(0, 3).map((feature: string, i: number) => (
//                     <div
//                       key={i}
//                       style={{
//                         fontSize: isPlatformWhatsapp ? 14 : 16,
//                         color: '#717171',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                       }}
//                     >
//                       <div style={{ width: 6, height: 6, backgroundColor: '#717171', borderRadius: '50%' }} />
//                       {feature}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
            
//             {/* From your brand */}
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 marginTop: 'auto',
//               }}
//             >
//               <img
//                 src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`}
//                 width={24}
//                 height={24}
//                 alt="Brand logo"
//               />
//               <span
//                 style={{
//                   fontSize: 14,
//                   color: '#717171',
//                 }}
//               >
//                 From {process.env.NEXT_PUBLIC_BRAND_NAME || 'yourbrand.com'}
//               </span>
//             </div>
//           </div>
          
//           {/* Optional: Rating badge */}
//           {product.rating && (
//             <div
//               style={{
//                 position: 'absolute',
//                 bottom: 24,
//                 left: 24,
//                 backgroundColor: 'rgba(0,0,0,0.6)',
//                 color: 'white',
//                 padding: '8px 12px',
//                 borderRadius: 8,
//                 fontSize: 16,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px',
//               }}
//             >
//               ★ {product.rating}
//             </div>
//           )}
//         </div>
//       ),
//       {
//         ...size,
//         fonts: [
//           {
//             name: 'Inter',
//             data: interRegularData,
//             weight: 400,
//             style: 'normal',
//           },
//           {
//             name: 'Inter',
//             data: interBoldData,
//             weight: 700,
//             style: 'normal',
//           },
//         ],
//       }
//     );
//   } catch (error) {
//     console.error('Error generating OG image:', error);
//     return new Response('Failed to generate image', { status: 500 });
//   }
// }

// // Mock function - replace with your actual data fetching logic
// async function getProductById(id: string) {
//   // In production, fetch this from your database or API
//   return {
//     id,
//     name: 'Beautiful Apartment in Central Location',
//     price: 149.99,
//     currency: 'USD',
//     duration: 'night',
//     location: 'Downtown District',
//     imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
//     features: ['1 bedroom', '1 bed', '2 baths'],
//     rating: 4.79,
//   };
// }


// import { ImageResponse } from "next/og";
// import { NextRequest } from "next/server";

// // Define font loading
// const interRegular = fetch(
//   new URL("../../../../public/fonts/Inter-Regular.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());
// const interBold = fetch(
//   new URL("../../../../public/fonts/Inter-Bold.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

// // This sets the size of the generated image
// export const runtime = "edge";
// export const contentType = "image/png";
// export const size = {
//   width: 1200,
//   height: 630,
// };

// // Cache header configuration
// export async function headers() {
//   return {
//     "Cache-Control":
//       "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
//   };
// }

// // Helper function to create hash using Web Crypto API instead of Node.js crypto
// async function createSHA256Hash(text: string): Promise<string> {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(text);
//   const hashBuffer = await crypto.subtle.digest("SHA-256", data);

//   // Convert the ArrayBuffer to hex string
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
//   return hashHex.slice(0, 12);
// }

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { productId: string } }
// ) {
//   const { productId } = params;
//   const searchParams = request.nextUrl.searchParams;


//    // Log the request details for debugging
//     console.log("OG Image Request:", {
//       productId,
//       searchParams: Object.fromEntries(searchParams.entries()),
//     });

//   // Get query parameters
//   const signature = searchParams.get("signature");
//   const version = searchParams.get("v") || "1";
//   const platform = searchParams.get("platform") || "default";


 

//   try {
//     // Fetch product data from your database or API
//     const product = await getProductById();

//     console.log("product", product)

//     if (!product) {
//       return new Response("Product not found", { status: 404 });
//     }

//     // Validate signature to prevent URL manipulation if signature is provided
//     if (signature) {
//       const expectedSignature = await createSHA256Hash(
//         `${productId}-${version}-${process.env.OG_SECRET_KEY}`
//       );

//       if (signature !== expectedSignature) {
//         return new Response("Invalid signature", { status: 401 });
//       }
//     }

//     // Load fonts
//     const [interRegularData, interBoldData] = await Promise.all([
//       interRegular,
//       interBold,
//     ]);

//     // Format the price for display
//     const formattedPrice = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: product.currency || "USD",
//     }).format(product.price);

//     // Customize layout based on platform
//     const isPlatformTwitter = platform === "twitter";
//     const isPlatformWhatsapp = platform === "whatsapp";

//     // Generate image response
//     return new ImageResponse(
//       (
//         <div
//           style={{
//             display: "flex",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "white",
//             position: "relative",
//             fontFamily: "Inter",
//           }}
//         >
//           {/* Main product image */}
//           <div
//             style={{
//               width: isPlatformTwitter ? "60%" : "65%",
//               height: "100%",
//               display: "flex",
//               position: "relative",
//             }}
//           >
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </div>

//           {/* Product information */}
//           <div
//             style={{
//               width: isPlatformTwitter ? "40%" : "35%",
//               display: "flex",
//               flexDirection: "column",
//               padding: isPlatformWhatsapp ? "30px" : "40px",
//               justifyContent: "space-between",
//               backgroundColor: "#ffffff",
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: isPlatformWhatsapp ? 22 : 28,
//                   fontWeight: "bold",
//                   marginBottom: 12,
//                   color: "#222222",
//                   lineHeight: 1.3,
//                 }}
//               >
//                 {product.name.length > 55
//                   ? product.name.substring(0, 52) + "..."
//                   : product.name}
//               </div>

//               <div
//                 style={{
//                   fontSize: isPlatformWhatsapp ? 20 : 24,
//                   marginTop: 8,
//                   marginBottom: 24,
//                   color: "#222222",
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {formattedPrice}
//                 {product.duration && (
//                   <span
//                     style={{
//                       color: "#717171",
//                       fontSize: isPlatformWhatsapp ? 16 : 20,
//                       fontWeight: "normal",
//                     }}
//                   >
//                     &nbsp;· {product.duration}
//                   </span>
//                 )}
//               </div>

//               <div
//                 style={{
//                   fontSize: isPlatformWhatsapp ? 16 : 18,
//                   color: "#717171",
//                   marginBottom: 16,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "4px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 16,
//                     height: 16,
//                     backgroundColor: "#FF385C",
//                     borderRadius: "50%",
//                   }}
//                 />
//                 {product.location}
//               </div>

//               {product.features && (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "8px",
//                     marginTop: 20,
//                   }}
//                 >
//                   {product.features
//                     .slice(0, 3)
//                     .map((feature: string, i: number) => (
//                       <div
//                         key={i}
//                         style={{
//                           fontSize: isPlatformWhatsapp ? 14 : 16,
//                           color: "#717171",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "8px",
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: 6,
//                             height: 6,
//                             backgroundColor: "#717171",
//                             borderRadius: "50%",
//                           }}
//                         />
//                         {feature}
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>

//             {/* From your brand */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 marginTop: "auto",
//               }}
//             >
//               <img
//                 src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`}
//                 width={24}
//                 height={24}
//                 alt="Brand logo"
//               />
//               <span
//                 style={{
//                   fontSize: 14,
//                   color: "#717171",
//                 }}
//               >
//                 From {process.env.NEXT_PUBLIC_BRAND_NAME || "yourbrand.com"}
//               </span>
//             </div>
//           </div>

//           {/* Optional: Rating badge */}
//           {product.rating && (
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 24,
//                 left: 24,
//                 backgroundColor: "rgba(0,0,0,0.6)",
//                 color: "white",
//                 padding: "8px 12px",
//                 borderRadius: 8,
//                 fontSize: 16,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",
//               }}
//             >
//               ★ {product.rating}
//             </div>
//           )}
//         </div>
//       ),
//       {
//         ...size,
//         fonts: [
//           {
//             name: "Inter",
//             data: interRegularData,
//             weight: 400,
//             style: "normal",
//           },
//           {
//             name: "Inter",
//             data: interBoldData,
//             weight: 700,
//             style: "normal",
//           },
//         ],
//       }
//     );
//   } catch (error) {
//     console.error("Error generating OG image:", error);
//     return new Response("Failed to generate image", { status: 500 });
//   }
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
//   };
// }




import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// Define font loading
const interRegular = fetch(
  new URL("../../../../public/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const interBold = fetch(
  new URL("../../../../public/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

// This sets the size of the generated image
export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

// Cache header configuration
export async function headers() {
  return {
    "Cache-Control":
      "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
  };
}

// Helper function to create hash using Web Crypto API instead of Node.js crypto
async function createSHA256Hash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.slice(0, 12);
}

export async function GET(
  request: NextRequest,
  // { params }: { params: { productId: string } }
) {
  // const { productId } = params;
  const searchParams = request.nextUrl.searchParams;

  // Get query parameters
  const signature = searchParams.get("signature");
  const version = searchParams.get("v") || "1";
  const platform = searchParams.get("platform") || "default";

  // console.log("OG Request:", { productId, signature, version, platform });

  try {
    // Fetch product data from your database or API
    // Make sure productId is URL decoded if necessary
    // const decodedProductId = decodeURIComponent(productId);
    // console.log("Looking up product:", decodedProductId);

    const product = await getProductById();

    if (!product) {
      // console.log("Product not found:", decodedProductId);
      return new Response("Product not found", { status: 404 });
    }

    console.log("Product found:", product.name);

    // Validate signature to prevent URL manipulation if signature is provided
    if (signature) {
      const expectedSignature = await createSHA256Hash(
        `${version}-${
          process.env.OG_SECRET_KEY || "default-secret"
        }`
      );

      // if (signature !== expectedSignature) {
      //   console.log("Invalid signature:", {
      //     provided: signature,
      //     expected: expectedSignature,
      //   });
      //   return new Response("Invalid signature", { status: 401 });
      // }
    }

    // Load fonts
    const [interRegularData, interBoldData] = await Promise.all([
      interRegular,
      interBold,
    ]);

    // Format the price for display
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: product.currency || "USD",
    }).format(product.price);

    // Customize layout based on platform
    const isPlatformTwitter = platform === "twitter";
    const isPlatformWhatsapp = platform === "whatsapp";

    // Generate image response
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            position: "relative",
            fontFamily: "Inter",
          }}
        >
          {/* Main product image */}
          <div
            style={{
              width: isPlatformTwitter ? "60%" : "65%",
              height: "100%",
              display: "flex",
              position: "relative",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Product information */}
          <div
            style={{
              width: isPlatformTwitter ? "40%" : "35%",
              display: "flex",
              flexDirection: "column",
              padding: isPlatformWhatsapp ? "30px" : "40px",
              justifyContent: "space-between",
              backgroundColor: "#ffffff",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: isPlatformWhatsapp ? 22 : 28,
                  fontWeight: "bold",
                  marginBottom: 12,
                  color: "#222222",
                  lineHeight: 1.3,
                }}
              >
                {product.name.length > 55
                  ? product.name.substring(0, 52) + "..."
                  : product.name}
              </div>

              <div
                style={{
                  fontSize: isPlatformWhatsapp ? 20 : 24,
                  marginTop: 8,
                  marginBottom: 24,
                  color: "#222222",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {formattedPrice}
                {product.duration && (
                  <span
                    style={{
                      color: "#717171",
                      fontSize: isPlatformWhatsapp ? 16 : 20,
                      fontWeight: "normal",
                    }}
                  >
                    &nbsp;· {product.duration}
                  </span>
                )}
              </div>

              <div
                style={{
                  fontSize: isPlatformWhatsapp ? 16 : 18,
                  color: "#717171",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: "#FF385C",
                    borderRadius: "50%",
                  }}
                />
                {product.location}
              </div>

              {product.features && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginTop: 20,
                  }}
                >
                  {product.features
                    .slice(0, 3)
                    .map((feature: string, i: number) => (
                      <div
                        key={i}
                        style={{
                          fontSize: isPlatformWhatsapp ? 14 : 16,
                          color: "#717171",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            backgroundColor: "#717171",
                            borderRadius: "50%",
                          }}
                        />
                        {feature}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* From your brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "auto",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "#FF385C",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: "#717171",
                }}
              >
                From {process.env.NEXT_PUBLIC_BRAND_NAME || "yourbrand.com"}
              </span>
            </div>
          </div>

          {/* Optional: Rating badge */}
          {product.rating && (
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ★ {product.rating}
            </div>
          )}
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Inter",
            data: interRegularData,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: interBoldData,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response(`Failed to generate image: ${error}`, { status: 500 });
  }
}

// Get product by ID (name in this case)
async function getProductById() {
  // In production, fetch this from your database or API
  // Assuming product ID is the name for now
  // if (
  //   productId === "Beautiful Apartment in Central Location" ||
  //   productId.toLowerCase() === "beautiful-apartment-in-central-location"
  // ) {
    return {
      name: "Beautiful Apartment in Central Location",
      price: 149.99,
      currency: "USD",
      duration: "night",
      location: "Downtown District",
      imageUrl:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      features: ["1 bedroom", "1 bed", "2 baths"],
      rating: 4.79,
    };
  }

//    null;
// }return
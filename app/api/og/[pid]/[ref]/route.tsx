

// // File: app/api/og/[pid]/[ref].png/route.tsx
// import { ImageResponse } from 'next/og'
// import { getProductServer } from '@/lib/products'
 
// export const runtime = 'edge'
 
// export async function GET(
//   request: Request,
//   { params }: { params: { pid: string, ref: string } }
// ) {
//   try {
//     const productId = params.pid
//     const ref = params.ref // Get ref directly from path params
    
//     // Parse the URL to check for additional tracking parameters
//     const url = new URL(request.url)
//     const platform = url.searchParams.get('platform')
    
//     // Handle special case for "null" or "undefined" strings that might be in the path
//     const actualRef = (ref === 'null' || ref === 'undefined') ? undefined : ref
    
//     // Fetch the product data with both productId and plugId (ref)
//     // Use actualRef to handle the case where ref is "null" or "undefined"
//     const product = await getProductServer(productId, actualRef)

//     console.log("ogProduct", product)
    
//     if (!product?.data) {
//       return new Response('Product not found', { status: 404 })
//     }
    
//     // You can use different templates based on platform
//     const template = platform === 'instagram' ? 'instagram' : 'default'
    
//     return new ImageResponse(
//       (
//         <div
//           style={{
//             display: 'flex',
//             height: '100%',
//             width: '100%',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'column',
//             backgroundImage: 'linear-gradient(to bottom right, #FFFFFF, #F3F4F6)',
//             fontSize: 32,
//             fontWeight: 600,
//           }}
//         >
//           {/* Product image */}
//           <div style={{ 
//             display: 'flex',  // Added explicit display: flex
//             justifyContent: 'center',
//             marginBottom: 40, 
//             borderRadius: 16, 
//             overflow: 'hidden', 
//             boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
//           }}>
//             <img
//               width="400"
//               height="400"
//               src={product?.data?.images?.[0] || 'https://via.placeholder.com/400'}
//               style={{ objectFit: 'cover' }}
//               alt={product?.data?.name || 'Product image'}
//             />
//           </div>
          
//           {/* Product details container */}
//           <div style={{ 
//             display: 'flex', 
//             flexDirection: 'column', 
//             alignItems: 'center',
//             padding: '0 48px',
//             textAlign: 'center',
//           }}>
//             {/* Product name */}
//             <h1 style={{ 
//               display: 'flex',  // Added explicit display: flex
//               fontSize: 48, 
//               margin: '0 0 16px 0', 
//               color: '#111827' 
//             }}>
//               {product?.data?.name || 'Product'}
//             </h1>
            
//             {/* Price */}
//             <p style={{ 
//               display: 'flex',  // Added explicit display: flex
//               fontSize: 36, 
//               margin: '0 0 24px 0', 
//               color: '#1F2937' 
//             }}>
//               ${product?.data?.price?.toFixed(2) || '0.00'}
//             </p>
            
//             {/* CTA */}
//             <div style={{
//               display: 'flex',  // Added explicit display: flex
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: '#4F46E5',
//               color: 'white',
//               padding: '12px 24px',
//               borderRadius: 8,
//               fontWeight: 'bold',
//             }}>
//               Click to Buy Now
//             </div>
            
//             {/* Referral info if available */}
//             {actualRef && (
//               <div style={{ 
//                 display: 'flex',  // Added explicit display: flex
//                 justifyContent: 'center',
//                 marginTop: 32,
//                 fontSize: 24,
//                 color: '#6B7280',
//               }}>
//                 Shared by: {actualRef}
//               </div>
//             )}
//           </div>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 630,
//       },
//     )
//   } catch (error) {
//     console.error('Error generating OG image:', error)
//     return new Response('Error generating image', { status: 500 })
//   }
// }




// // File: app/api/og/[pid]/[ref].png/route.tsx
// import { ImageResponse } from 'next/og'
// import { getProductServer } from '@/lib/products'
 
// export const runtime = 'edge'
 
// export async function GET(
//   request: Request,
//   { params }: { params: { pid: string, ref: string } }
// ) {
//   try {
//     const productId = params.pid
//     const ref = params.ref
//     const url = new URL(request.url)
//     const platform = url.searchParams.get('platform')
    
//     const actualRef = (ref === 'null' || ref === 'undefined') ? undefined : ref
//     const product = await getProductServer(productId, actualRef)

//     if (!product?.data) {
//       return new Response('Product not found', { status: 404 })
//     }
    
//     return new ImageResponse(
//       (
//         <div
//           style={{
//             display: 'flex',
//             height: '100%',
//             width: '100%',
//             position: 'relative',
//             background: 'linear-gradient(135deg, #D4A574 0%, #C49B6A 100%)',
//             fontFamily: 'system-ui, -apple-system, sans-serif',
//           }}
//         >
//           {/* Main brand header */}
//           <div style={{
//             position: 'absolute',
//             top: 60,
//             left: 60,
//             right: 60,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'flex-start',
//           }}>
//             <div style={{ display: 'flex' }}>
//               <h1 style={{
//                 fontSize: 120,
//                 fontWeight: 700,
//                 color: '#F5F5DC',
//                 margin: 0,
//                 letterSpacing: '0.05em',
//                 textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
//               }}>
//                 INSPIRE
//               </h1>
//             </div>
//             <div style={{ display: 'flex' }}>
//               <p style={{
//                 fontSize: 28,
//                 color: '#F5F5DC',
//                 margin: 0,
//                 opacity: 0.9,
//                 letterSpacing: '0.2em',
//                 marginTop: -10,
//               }}>
//                 BY PLUGGN
//               </p>
//             </div>
//           </div>

//           {/* NEW badge */}
//           <div style={{
//             position: 'absolute',
//             top: 280,
//             left: 60,
//             background: '#FFD700',
//             color: '#000',
//             padding: '8px 20px',
//             fontSize: 32,
//             fontWeight: 700,
//             borderRadius: 4,
//             display: 'flex',
//           }}>
//             NEW
//           </div>

//           {/* Product images layout */}
//           <div style={{
//             position: 'absolute',
//             top: 200,
//             right: 80,
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 20,
//           }}>
//             {/* Main product image */}
//             <div style={{
//               display: 'flex',
//               borderRadius: 12,
//               overflow: 'hidden',
//               boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
//             }}>
//               <img
//                 width="300"
//                 height="200"
//                 src={product?.data?.images?.[0] || 'https://via.placeholder.com/300x200'}
//                 style={{ objectFit: 'cover' }}
//                 alt={product?.data?.name || 'Product'}
//               />
//             </div>

//             {/* Secondary product images */}
//             <div style={{
//               display: 'flex',
//               gap: 15,
//             }}>
//               <div style={{
//                 borderRadius: 8,
//                 overflow: 'hidden',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//                 display: 'flex',
//               }}>
//                 <img
//                   width="120"
//                   height="120"
//                   src={product?.data?.images?.[1] || product?.data?.images?.[0] || 'https://via.placeholder.com/120'}
//                   style={{ objectFit: 'cover' }}
//                   alt="Product detail"
//                 />
//               </div>
//               <div style={{
//                 borderRadius: 8,
//                 overflow: 'hidden',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//                 display: 'flex',
//               }}>
//                 <img
//                   width="120"
//                   height="120"
//                   src={product?.data?.images?.[2] || product?.data?.images?.[0] || 'https://via.placeholder.com/120'}
//                   style={{ objectFit: 'cover' }}
//                   alt="Product detail"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Large overlay text */}
//           <div style={{
//             position: 'absolute',
//             bottom: 200,
//             left: 60,
//             display: 'flex',
//             flexDirection: 'column',
//           }}>
//             <div style={{ display: 'flex' }}>
//               <h2 style={{
//                 fontSize: 96,
//                 fontWeight: 800,
//                 color: '#FFFFFF',
//                 margin: 0,
//                 lineHeight: 0.9,
//                 textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
//               }}>
//                 STYLE
//               </h2>
//             </div>
//             <div style={{ display: 'flex' }}>
//               <h2 style={{
//                 fontSize: 96,
//                 fontWeight: 800,
//                 color: '#FFFFFF',
//                 margin: 0,
//                 lineHeight: 0.9,
//                 textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
//               }}>
//                 THAT
//               </h2>
//             </div>
//             <div style={{ display: 'flex' }}>
//               <h2 style={{
//                 fontSize: 96,
//                 fontWeight: 800,
//                 color: '#FFFFFF',
//                 margin: 0,
//                 lineHeight: 0.9,
//                 textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
//               }}>
//                 STANDS
//               </h2>
//             </div>
//             <div style={{ display: 'flex' }}>
//               <h2 style={{
//                 fontSize: 96,
//                 fontWeight: 800,
//                 color: '#F5F5DC',
//                 margin: 0,
//                 lineHeight: 0.9,
//                 textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
//                 opacity: 0.8,
//               }}>
//                 OUT
//               </h2>
//             </div>
//           </div>

//           {/* Star rating */}
//           <div style={{
//             position: 'absolute',
//             bottom: 150,
//             left: 60,
//             display: 'flex',
//             gap: 8,
//             alignItems: 'center',
//           }}>
//             <div style={{ fontSize: 32, color: '#FFD700', display: 'flex' }}>⭐</div>
//             <div style={{ fontSize: 32, color: '#FFD700', display: 'flex' }}>⭐</div>
//             <div style={{ fontSize: 32, color: '#FFD700', display: 'flex' }}>⭐</div>
//             <div style={{ fontSize: 32, color: '#FFD700', display: 'flex' }}>⭐</div>
//             <div style={{ fontSize: 32, color: '#FFD700', display: 'flex' }}>⭐</div>
//           </div>

//           {/* User profile circle */}
//           {actualRef && (
//             <div style={{
//               position: 'absolute',
//               bottom: 100,
//               right: 80,
//               display: 'flex',
//               alignItems: 'center',
//               gap: 20,
//             }}>
//               <div style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: '50%',
//                 background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: 32,
//                 fontWeight: 700,
//                 color: 'white',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//               }}>
//                 {actualRef.charAt(0).toUpperCase()}
//               </div>
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}>
//                 <div style={{ display: 'flex' }}>
//                   <p style={{
//                     fontSize: 28,
//                     fontWeight: 600,
//                     color: '#FFFFFF',
//                     margin: 0,
//                   }}>
//                     {actualRef}
//                   </p>
//                 </div>
//                 <div style={{ display: 'flex' }}>
//                   <p style={{
//                     fontSize: 20,
//                     color: '#F5F5DC',
//                     margin: 0,
//                     opacity: 0.8,
//                   }}>
//                     Curator
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Price tag */}
//           <div style={{
//             position: 'absolute',
//             top: 350,
//             left: 60,
//             background: 'rgba(255,255,255,0.95)',
//             color: '#333',
//             padding: '12px 24px',
//             borderRadius: 8,
//             fontSize: 32,
//             fontWeight: 700,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//             display: 'flex',
//           }}>
//             ${product?.data?.price?.toFixed(2) || '0.00'}
//           </div>

//           {/* Version info */}
//           <div style={{
//             position: 'absolute',
//             bottom: 40,
//             right: 80,
//             fontSize: 24,
//             color: '#F5F5DC',
//             opacity: 0.7,
//             letterSpacing: '0.1em',
//             display: 'flex',
//           }}>
//             VERSION 1.0
//           </div>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 630,
//       },
//     )
//   } catch (error) {
//     console.error('Error generating OG image:', error)
//     return new Response('Error generating image', { status: 500 })
//   }
// }






















import { createMagazineStyleCard } from "@/lib/canvas-actions";
import { getProductServer } from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { pid: string; ref: string } }
) {
  const { pid, ref } = params;

  const actualRef = ref === "null" || ref === "undefined" ? undefined : ref;
  const product = await getProductServer(pid, actualRef);

  if (!product?.data) {
    return new NextResponse("Product not found", { status: 404 });
  }

  // const result = await createMagazineStyleCard({
  //   imageUrl: product.data.images?.[0] || "https://via.placeholder.com/400",
  //   productName: product.data.name || "Product",
  //   price: product.data.price || 0,
  //   ref: actualRef,
  //   template: "inspire",
  //   removeBackground: false,
  //   // backgroundOptions: {
  //   //   targetColor: [255, 255, 255],
  //   //   tolerance: 40,
  //   //   // newBackground: "transparent",
  //   // },
  //   dimensions: { width: 1200, height: 630 },
  // });

  const result = await createMagazineStyleCard({
    primaryImageUrl:
      product.data.images?.[0] || "https://via.placeholder.com/400",
    secondaryImageUrl:
      product.data.images?.[0] || "https://via.placeholder.com/400",
    productName: "MAINSTREAM SNEAKER",
    productPrice: product.data.price || 0,
    creatorName: "Chinwe O.",
    dimensions: { width: 1200, height: 1200 },
  });

  if (!result.success || !result.processedImage) {
    return new NextResponse("Failed to generate image", { status: 500 });
  }

  return new NextResponse(result.processedImage, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}

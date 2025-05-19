

// File: app/api/og/[pid]/[ref].png/route.tsx
import { ImageResponse } from 'next/og'
import { getProductServer } from '@/lib/products'
 
export const runtime = 'edge'
 
export async function GET(
  request: Request,
  { params }: { params: { pid: string, ref: string } }
) {
  try {
    const productId = params.pid
    const ref = params.ref // Get ref directly from path params
    
    // Parse the URL to check for additional tracking parameters
    const url = new URL(request.url)
    const platform = url.searchParams.get('platform')
    
    // Handle special case for "null" or "undefined" strings that might be in the path
    const actualRef = (ref === 'null' || ref === 'undefined') ? undefined : ref
    
    // Fetch the product data with both productId and plugId (ref)
    // Use actualRef to handle the case where ref is "null" or "undefined"
    const product = await getProductServer(productId, actualRef)

    console.log("ogProduct", product)
    
    if (!product?.data) {
      return new Response('Product not found', { status: 404 })
    }
    
    // You can use different templates based on platform
    const template = platform === 'instagram' ? 'instagram' : 'default'
    
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(to bottom right, #FFFFFF, #F3F4F6)',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          {/* Product image */}
          <div style={{ 
            display: 'flex',  // Added explicit display: flex
            justifyContent: 'center',
            marginBottom: 40, 
            borderRadius: 16, 
            overflow: 'hidden', 
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
          }}>
            <img
              width="400"
              height="400"
              src={product?.data?.images?.[0] || 'https://via.placeholder.com/400'}
              style={{ objectFit: 'cover' }}
              alt={product?.data?.name || 'Product image'}
            />
          </div>
          
          {/* Product details container */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            padding: '0 48px',
            textAlign: 'center',
          }}>
            {/* Product name */}
            <h1 style={{ 
              display: 'flex',  // Added explicit display: flex
              fontSize: 48, 
              margin: '0 0 16px 0', 
              color: '#111827' 
            }}>
              {product?.data?.name || 'Product'}
            </h1>
            
            {/* Price */}
            <p style={{ 
              display: 'flex',  // Added explicit display: flex
              fontSize: 36, 
              margin: '0 0 24px 0', 
              color: '#1F2937' 
            }}>
              ${product?.data?.price?.toFixed(2) || '0.00'}
            </p>
            
            {/* CTA */}
            <div style={{
              display: 'flex',  // Added explicit display: flex
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4F46E5',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 8,
              fontWeight: 'bold',
            }}>
              Click to Buy Now
            </div>
            
            {/* Referral info if available */}
            {actualRef && (
              <div style={{ 
                display: 'flex',  // Added explicit display: flex
                justifyContent: 'center',
                marginTop: 32,
                fontSize: 24,
                color: '#6B7280',
              }}>
                Shared by: {actualRef}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}
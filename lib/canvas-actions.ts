// // File: lib/canvas-actions.ts
// 'use server'

// import { createCanvas, loadImage } from 'canvas'

// export interface ProcessImageOptions {
//   imageUrl: string
//   productName: string
//   price: number
//   ref?: string
//   template?: 'inspire' | 'minimal' | 'dark' | 'vibrant'
//   width?: number
//   height?: number
//   customColors?: {
//     background?: string
//     primaryText?: string
//     secondaryText?: string
//     accentColor?: string
//   }
// }

// export async function processProductImage(options: ProcessImageOptions) {
//   try {
//     const {
//       imageUrl,
//       productName,
//       price,
//       ref,
//       template = 'inspire',
//       width = 400,
//       height = 400,
//       customColors
//     } = options

//     const canvas = createCanvas(width, height)
//     const ctx = canvas.getContext('2d')

//     // Enable high-quality rendering
//     ctx.imageSmoothingEnabled = true
//     ctx.imageSmoothingQuality = 'high'
//     ctx.textBaseline = 'top'

//     // Load and draw the base image
//     const image = await loadImage(imageUrl)
//     ctx.drawImage(image, 0, 0, width, height)

//     // Apply template-specific styling
//     switch (template) {
//       case 'inspire':
//         await applyInspireTemplate(ctx, width, height, { productName, price, ref, customColors })
//         break
//       case 'minimal':
//         await applyMinimalTemplate(ctx, width, height, { productName, price, ref, customColors })
//         break
//       case 'dark':
//         await applyDarkTemplate(ctx, width, height, { productName, price, ref, customColors })
//         break
//       default:
//         await applyInspireTemplate(ctx, width, height, { productName, price, ref, customColors })
//     }

//     // Convert to base64
//     const processedImage = canvas.toDataURL('image/png', 0.9)

//     return {
//       success: true,
//       processedImage,
//       template,
//       dimensions: { width, height }
//     }

//   } catch (error) {
//     console.error('Canvas processing error:', error)
//     return {
//       success: false,
//       error: 'Canvas processing failed',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     }
//   }
// }

// // Template functions
// async function applyInspireTemplate(
//   ctx: CanvasRenderingContext2D, 
//   width: number, 
//   height: number, 
//   data: { productName: string; price: number; ref?: string; customColors?: any }
// ) {
//   const { productName, price, ref, customColors } = data
  
//   const colors = {
//     background: '#C8956D',
//     primaryText: '#F5E6D3',
//     secondaryText: '#2D3748',
//     accent: '#4A5568',
//     ...customColors
//   }

//   // Gradient overlay
//   const gradient = ctx.createLinearGradient(0, height * 0.7, 0, height)
//   gradient.addColorStop(0, 'rgba(0,0,0,0)')
//   gradient.addColorStop(1, 'rgba(0,0,0,0.8)')
//   ctx.fillStyle = gradient
//   ctx.fillRect(0, height * 0.7, width, height * 0.3)

//   // Product name
//   ctx.fillStyle = colors.primaryText
//   ctx.font = 'bold 18px Inter'
//   ctx.fillText(productName.substring(0, 20), 10, height - 70)

//   // Price
//   ctx.font = '16px Arial'
//   ctx.fillText(`$${price.toFixed(2)}`, 10, height - 45)

//   // Referral info
//   if (ref) {
//     ctx.font = '12px Arial'
//     ctx.fillText(`Shared by: ${ref}`, 10, height - 20)
//   }
// }

// async function applyMinimalTemplate(
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number,
//   data: { productName: string; price: number; ref?: string; customColors?: any }
// ) {
//   const { productName, price, ref } = data

//   // Minimal white overlay
//   ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
//   ctx.fillRect(0, height - 80, width, 80)

//   // Clean typography
//   ctx.fillStyle = '#1A202C'
//   ctx.font = 'bold 16px Arial'
//   ctx.fillText(productName, 15, height - 60)

//   ctx.font = '14px Arial'
//   ctx.fillText(`$${price.toFixed(2)}`, 15, height - 40)

//   if (ref) {
//     ctx.fillStyle = '#4299E1'
//     ctx.font = '12px Arial'
//     ctx.fillText(`By ${ref}`, 15, height - 20)
//   }
// }

// async function applyDarkTemplate(
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number,
//   data: { productName: string; price: number; ref?: string; customColors?: any }
// ) {
//   const { productName, price, ref } = data

//   // Dark overlay
//   ctx.fillStyle = 'rgba(26, 32, 44, 0.9)'
//   ctx.fillRect(0, height - 100, width, 100)

//   // Light text
//   ctx.fillStyle = '#F7FAFC'
//   ctx.font = 'bold 18px Arial'
//   ctx.fillText(productName, 15, height - 75)

//   ctx.font = '16px Arial'
//   ctx.fillText(`$${price.toFixed(2)}`, 15, height - 50)

//   if (ref) {
//     ctx.fillStyle = '#63B3ED'
//     ctx.font = '12px Arial'
//     ctx.fillText(`Recommended by ${ref}`, 15, height - 25)
//   }
// }

// // Background removal server action
// export async function removeImageBackground(options: {
//   imageUrl: string
//   method?: 'color' | 'edges' | 'ai'
//   targetColor?: [number, number, number]
//   tolerance?: number
//   newBackground?: string
//   width?: number
//   height?: number
// }) {
//   try {
//     const {
//       imageUrl,
//       method = 'color',
//       targetColor = [255, 255, 255],
//       tolerance = 30,
//       newBackground = 'transparent',
//       width = 400,
//       height = 400
//     } = options

//     const canvas = createCanvas(width, height)
//     const ctx = canvas.getContext('2d')

//     // Load original image
//     const img = await loadImage(imageUrl)
//     ctx.drawImage(img, 0, 0, width, height)

//     if (method === 'color') {
//       // Get image data for pixel manipulation
//       const imageData = ctx.getImageData(0, 0, width, height)
//       const data = imageData.data

//       // Remove background by color
//       for (let i = 0; i < data.length; i += 4) {
//         const r = data[i]
//         const g = data[i + 1]
//         const b = data[i + 2]

//         // Calculate color difference
//         const diff = Math.sqrt(
//           Math.pow(r - targetColor[0], 2) +
//           Math.pow(g - targetColor[1], 2) +
//           Math.pow(b - targetColor[2], 2)
//         )

//         // Make similar colors transparent
//         if (diff < tolerance) {
//           data[i + 3] = 0 // Set alpha to 0
//         }
//       }

//       // Clear canvas and add new background if specified
//       ctx.clearRect(0, 0, width, height)
      
//       if (newBackground !== 'transparent') {
//         ctx.fillStyle = newBackground
//         ctx.fillRect(0, 0, width, height)
//       }

//       // Put processed image back
//       ctx.putImageData(imageData, 0, 0)
//     }

//     const processedImage = canvas.toDataURL('image/png', 0.9)

//     return {
//       success: true,
//       processedImage,
//       method,
//       dimensions: { width, height }
//     }

//   } catch (error) {
//     console.error('Background removal error:', error)
//     return {
//       success: false,
//       error: 'Background removal failed',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     }
//   }
// }

// // Combined action for complete image processing
// export async function createProductCard(options: {
//   imageUrl: string
//   productName: string
//   price: number
//   ref?: string
//   template?: 'inspire' | 'minimal' | 'dark'
//   removeBackground?: boolean
//   backgroundOptions?: {
//     targetColor?: [number, number, number]
//     tolerance?: number
//     newBackground?: string
//   }
//   dimensions?: { width: number; height: number }
// }) {
//   try {
//     let imageUrl = options.imageUrl

//     // First, remove background if requested
//     if (options.removeBackground) {
//       const bgRemovalResult = await removeImageBackground({
//         imageUrl: options.imageUrl,
//         ...options.backgroundOptions,
//         width: options.dimensions?.width || 400,
//         height: options.dimensions?.height || 400
//       })

//       if (bgRemovalResult.success) {
//         imageUrl = bgRemovalResult.processedImage
//       }
//     }

//     // Then apply template styling
//     const result = await processProductImage({
//       ...options,
//       imageUrl
//     })

//     return result

//   } catch (error) {
//     console.error('Product card creation error:', error)
//     return {
//       success: false,
//       error: 'Product card creation failed',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     }
//   }
// }






// File: lib/canvas-actions.ts
'use server'

import { createCanvas, loadImage, CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from 'canvas'
import { registerFont } from "canvas";
import path from "path";

// Register the Inter font from the public directory
registerFont(path.join(process.cwd(), "public", "font", "Inter-Regular.ttf"), {
  family: "Inter",
  weight: 'normal'
});


registerFont(path.join(process.cwd(), "public", "font", "Inter-Bold.ttf"), {
  family: "Inter",
  weight: 'bold'
});

export interface ProcessImageOptions {
  imageUrl: string
  productName: string
  price: number
  ref?: string
  template?: 'inspire' | 'minimal' | 'dark' | 'vibrant'
  width?: number
  height?: number
  customColors?: {
    background?: string
    primaryText?: string
    secondaryText?: string
    accentColor?: string
  }
}

export async function processProductImage(options: ProcessImageOptions) {
  try {
    const {
      imageUrl,
      productName,
      price,
      ref,
      template = 'inspire',
      width = 400,
      height = 400,
      customColors
    } = options

    const canvas = createCanvas(width, height)
    // Use NodeCanvasRenderingContext2D from 'canvas' package
    const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D

    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.textBaseline = 'top'

    // Load and draw the base image
    const image = await loadImage(imageUrl)
    ctx.drawImage(image, 0, 0, width, height)

    // Apply template-specific styling
    switch (template) {
      case 'inspire':
        await applyInspireTemplate(ctx, width, height, { productName, price, ref, customColors })
        break
      case 'minimal':
        await applyMinimalTemplate(ctx, width, height, { productName, price, ref, customColors })
        break
      case 'dark':
        await applyDarkTemplate(ctx, width, height, { productName, price, ref, customColors })
        break
      default:
        await applyInspireTemplate(ctx, width, height, { productName, price, ref, customColors })
    }

    // Convert to base64 PNG (default)
    const processedImageBuffer = canvas.toBuffer("image/png");

    return {
      success: true,
      processedImage: processedImageBuffer,
      template,
      dimensions: { width, height },
    };

  } catch (error) {
    console.error('Canvas processing error:', error)
    return {
      success: false,
      error: 'Canvas processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Template functions
async function applyInspireTemplate(
  ctx: NodeCanvasRenderingContext2D, 
  width: number, 
  height: number, 
  data: { productName: string; price: number; ref?: string; customColors?: any }
) {
  const { productName, price, ref, customColors } = data
  
  const colors = {
    background: '#C8956D',
    primaryText: '#F5E6D3',
    secondaryText: '#2D3748',
    accent: '#4A5568',
    ...customColors
  }

  // Gradient overlay
  const gradient = ctx.createLinearGradient(0, height * 0.7, 0, height)
  gradient.addColorStop(0, 'rgba(0,0,0,0)')
  gradient.addColorStop(1, 'rgba(0,0,0,0.8)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, height * 0.7, width, height * 0.3)

  // Product name
  ctx.fillStyle = colors.primaryText
  ctx.font = 'bold 18px Inter'
  ctx.fillText(productName.substring(0, 20), 10, height - 70)

  // Price
  ctx.font = '16px Inter'
  ctx.fillText(`$${price.toFixed(2)}`, 10, height - 45)

  // Referral info
  if (ref) {
    ctx.font = '12px Inter'
    ctx.fillText(`Shared by: ${ref}`, 10, height - 20)
  }
}

async function applyMinimalTemplate(
  ctx: NodeCanvasRenderingContext2D,
  width: number,
  height: number,
  data: { productName: string; price: number; ref?: string; customColors?: any }
) {
  const { productName, price, ref } = data

  // Minimal white overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.fillRect(0, height - 80, width, 80)

  // Clean typography
  ctx.fillStyle = '#1A202C'
  ctx.font = 'bold 16px Inter'
  ctx.fillText(productName, 15, height - 60)

  ctx.font = '14px Inter'
  ctx.fillText(`$${price.toFixed(2)}`, 15, height - 40)

  if (ref) {
    ctx.fillStyle = '#4299E1'
    ctx.font = '12px Inter'
    ctx.fillText(`By ${ref}`, 15, height - 20)
  }
}

async function applyDarkTemplate(
  ctx: NodeCanvasRenderingContext2D,
  width: number,
  height: number,
  data: { productName: string; price: number; ref?: string; customColors?: any }
) {
  const { productName, price, ref } = data

  // Dark overlay
  ctx.fillStyle = 'rgba(26, 32, 44, 0.9)'
  ctx.fillRect(0, height - 100, width, 100)

  // Light text
  ctx.fillStyle = '#F7FAFC'
  ctx.font = 'bold 18px Inter'
  ctx.fillText(productName, 15, height - 75)

  ctx.font = '16px Inter'
  ctx.fillText(`$${price.toFixed(2)}`, 15, height - 50)

  if (ref) {
    ctx.fillStyle = '#63B3ED'
    ctx.font = '12px Inter'
    ctx.fillText(`Recommended by ${ref}`, 15, height - 25)
  }
}

// Background removal server action
export async function removeImageBackground(options: {
  imageUrl: string
  method?: 'color' | 'edges' | 'ai'
  targetColor?: [number, number, number]
  tolerance?: number
  newBackground?: string
  width?: number
  height?: number
}) {
  try {
    const {
      imageUrl,
      method = 'color',
      targetColor = [255, 255, 255],
      tolerance = 30,
      newBackground = 'transparent',
      width = 400,
      height = 400
    } = options

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D

    // Load original image
    const img = await loadImage(imageUrl)
    ctx.drawImage(img, 0, 0, width, height)

    if (method === 'color') {
      // Get image data for pixel manipulation
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      // Remove background by color
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Calculate color difference
        const diff = Math.sqrt(
          Math.pow(r - targetColor[0], 2) +
          Math.pow(g - targetColor[1], 2) +
          Math.pow(b - targetColor[2], 2)
        )

        // Make similar colors transparent
        if (diff < tolerance) {
          data[i + 3] = 0 // Set alpha to 0
        }
      }

      // Clear canvas and add new background if specified
      ctx.clearRect(0, 0, width, height)
      
      if (newBackground !== 'transparent') {
        ctx.fillStyle = newBackground
        ctx.fillRect(0, 0, width, height)
      }

      // Put processed image back
      ctx.putImageData(imageData, 0, 0)
    }

    const processedImageBuffer = canvas.toBuffer('image/png')

    return {
      success: true,
      processedImage: processedImageBuffer,
      method,
      dimensions: { width, height },
    };

  } catch (error) {
    console.error('Background removal error:', error)
    return {
      success: false,
      error: 'Background removal failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Combined action for complete image processing
export async function createProductCard(options: {
  imageUrl: any
  productName: string
  price: number
  ref?: string
  template?: 'inspire' | 'minimal' | 'dark'
  removeBackground?: boolean
  backgroundOptions?: {
    targetColor?: [number, number, number]
    tolerance?: number
    newBackground?: string
  }
  dimensions?: { width: number; height: number }
}) {
  try {
    let imageUrl = options.imageUrl

    // First, remove background if requested
    if (options.removeBackground) {
      const bgRemovalResult = await removeImageBackground({
        imageUrl: options.imageUrl,
        ...options.backgroundOptions,
        width: options.dimensions?.width || 400,
        height: options.dimensions?.height || 400
      })

      if (bgRemovalResult.success && bgRemovalResult.processedImage) {
        imageUrl = bgRemovalResult.processedImage
      }
    }

    // Then apply template styling
    const result = await processProductImage({
      ...options,
      imageUrl
    })

    return result

  } catch (error) {
    console.error('Product card creation error:', error)
    return {
      success: false,
      error: 'Product card creation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

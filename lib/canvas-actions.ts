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



registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Regular.ttf"), {
  family: "Inter",
  weight: 'normal'

});


registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Regular.ttf"), {
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

// // Template functions
// async function applyInspireTemplate(
//   ctx: NodeCanvasRenderingContext2D, 
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
//   ctx.font = '16px Inter'
//   ctx.fillText(`$${price.toFixed(2)}`, 10, height - 45)

//   // Referral info
//   if (ref) {
//     ctx.font = '12px Inter'
//     ctx.fillText(`Shared by: ${ref}`, 10, height - 20)
//   }
// }

// async function applyMinimalTemplate(
//   ctx: NodeCanvasRenderingContext2D,
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
//   ctx.font = 'bold 16px Inter'
//   ctx.fillText(productName, 15, height - 60)

//   ctx.font = '14px Inter'
//   ctx.fillText(`$${price.toFixed(2)}`, 15, height - 40)

//   if (ref) {
//     ctx.fillStyle = '#4299E1'
//     ctx.font = '12px Inter'
//     ctx.fillText(`By ${ref}`, 15, height - 20)
//   }
// }

// async function applyDarkTemplate(
//   ctx: NodeCanvasRenderingContext2D,
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
//   ctx.font = 'bold 18px Inter'
//   ctx.fillText(productName, 15, height - 75)

//   ctx.font = '16px Inter'
//   ctx.fillText(`$${price.toFixed(2)}`, 15, height - 50)

//   if (ref) {
//     ctx.fillStyle = '#63B3ED'
//     ctx.font = '12px Inter'
//     ctx.fillText(`Recommended by ${ref}`, 15, height - 25)
//   }
// }




// async function applyInspireTemplate(
//   ctx: NodeCanvasRenderingContext2D,
//   width: number,
//   height: number,
//   data: { productName: string; price: number; ref?: string; customColors?: any }
// ) {
//   const { productName, price, ref, customColors } = data;

//   // Premium color palette - warm, sophisticated
//   const colors = {
//     background: customColors?.background || "#D4B896", // Warm beige
//     primaryText: customColors?.primaryText || "#FFFFFF",
//     secondaryText: customColors?.secondaryText || "#2D3748",
//     accent: customColors?.accentColor || "#C8956D",
//     overlay: "rgba(0,0,0,0.4)",
//   };

//   // Fill background with specified color
//   ctx.fillStyle = colors.background;
//   ctx.fillRect(0, 0, width, height);

//   // Create sophisticated gradient overlay for text readability
//   const gradientHeight = height * 0.45;
//   const gradient = ctx.createLinearGradient(
//     0,
//     height - gradientHeight,
//     0,
//     height
//   );
//   gradient.addColorStop(0, "rgba(0,0,0,0)");
//   gradient.addColorStop(0.3, "rgba(0,0,0,0.2)");
//   gradient.addColorStop(1, colors.overlay);

//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, height - gradientHeight, width, gradientHeight);

//   // Main brand text (large, impactful)
//   ctx.fillStyle = colors.primaryText;
//   ctx.font = `bold ${Math.floor(width * 0.12)}px Inter`;
//   ctx.textAlign = "left";

//   // Split long product names intelligently
//   const maxCharsPerLine = 20;
//   const lines =
//     productName.length > maxCharsPerLine
//       ? [
//           productName.substring(0, maxCharsPerLine),
//           productName.substring(maxCharsPerLine, 40),
//         ]
//       : [productName];

//   lines.forEach((line, index) => {
//     ctx.fillText(
//       line,
//       width * 0.05,
//       height - gradientHeight * 0.8 + index * width * 0.08
//     );
//   });

//   // Premium price styling
//   ctx.font = `${Math.floor(width * 0.08)}px Inter`;
//   ctx.fillStyle = colors.primaryText;
//   ctx.fillText(
//     `$${price.toFixed(2)}`,
//     width * 0.05,
//     height - gradientHeight * 0.4
//   );

//   // "NEW" badge if applicable
//   if (Math.random() > 0.5) {
//     // You can make this conditional based on your logic
//     ctx.fillStyle = "#FFD700";
//     ctx.fillRect(width * 0.05, width * 0.05, width * 0.15, width * 0.08);
//     ctx.fillStyle = "#000000";
//     ctx.font = `bold ${Math.floor(width * 0.04)}px Inter`;
//     ctx.textAlign = "center";
//     ctx.fillText("NEW", width * 0.125, width * 0.065);
//     ctx.textAlign = "left";
//   }

//   // Referral attribution (elegant positioning)
//   if (ref) {
//     ctx.fillStyle = colors.primaryText;
//     ctx.font = `${Math.floor(width * 0.035)}px Inter`;
//     ctx.fillText(
//       `Shared by ${ref}`,
//       width * 0.05,
//       height - gradientHeight * 0.15
//     );
//   }

//   // Add subtle brand watermark
//   ctx.fillStyle = "rgba(255,255,255,0.3)";
//   ctx.font = `${Math.floor(width * 0.03)}px Inter`;
//   ctx.textAlign = "right";
//   ctx.fillText("BY PLUGGN", width * 0.95, height * 0.1);

//   // Version indicator
//   ctx.fillText("VERSION 1.0", width * 0.95, height * 0.95);
// }

// async function applyMinimalTemplate(
//   ctx: NodeCanvasRenderingContext2D,
//   width: number,
//   height: number,
//   data: { productName: string; price: number; ref?: string; customColors?: any }
// ) {
//   const { productName, price, ref, customColors } = data;

//   // Clean, modern color palette
//   const colors = {
//     background: customColors?.background || "#F7FAFC",
//     primaryText: "#1A202C",
//     secondaryText: "#4A5568",
//     accent: customColors?.accentColor || "#4299E1",
//     overlay: "rgba(255,255,255,0.95)",
//   };

//   // Fill background
//   ctx.fillStyle = colors.background;
//   ctx.fillRect(0, 0, width, height);

//   // Clean bottom panel for text
//   const panelHeight = height * 0.25;
//   ctx.fillStyle = colors.overlay;
//   ctx.fillRect(0, height - panelHeight, width, panelHeight);

//   // Subtle shadow for depth
//   const shadowGradient = ctx.createLinearGradient(
//     0,
//     height - panelHeight - 10,
//     0,
//     height - panelHeight
//   );
//   shadowGradient.addColorStop(0, "rgba(0,0,0,0)");
//   shadowGradient.addColorStop(1, "rgba(0,0,0,0.1)");
//   ctx.fillStyle = shadowGradient;
//   ctx.fillRect(0, height - panelHeight - 10, width, 10);

//   // Product name - clean typography
//   ctx.fillStyle = colors.primaryText;
//   ctx.font = `bold ${Math.floor(width * 0.055)}px Inter`;
//   ctx.textAlign = "left";

//   const maxWidth = width * 0.9;
//   let fontSize = Math.floor(width * 0.055);
//   ctx.font = `bold ${fontSize}px Inter`;

//   while (ctx.measureText(productName).width > maxWidth && fontSize > 12) {
//     fontSize -= 2;
//     ctx.font = `bold ${fontSize}px Inter`;
//   }

//   ctx.fillText(
//     productName,
//     width * 0.05,
//     height - panelHeight + panelHeight * 0.25
//   );

//   // Price with emphasis
//   ctx.font = `${Math.floor(width * 0.045)}px Inter`;
//   ctx.fillStyle = colors.primaryText;
//   ctx.fillText(
//     `$${price.toFixed(2)}`,
//     width * 0.05,
//     height - panelHeight + panelHeight * 0.55
//   );

//   // Referral with accent color
//   if (ref) {
//     ctx.fillStyle = colors.accent;
//     ctx.font = `${Math.floor(width * 0.035)}px Inter`;
//     ctx.fillText(
//       `By ${ref}`,
//       width * 0.05,
//       height - panelHeight + panelHeight * 0.8
//     );
//   }

//   // Minimal brand mark
//   ctx.fillStyle = "rgba(0,0,0,0.2)";
//   ctx.font = `${Math.floor(width * 0.025)}px Inter`;
//   ctx.textAlign = "right";
//   ctx.fillText("PLUGGN", width * 0.95, height * 0.95);
// }

// async function applyDarkTemplate(
//   ctx: NodeCanvasRenderingContext2D,
//   width: number,
//   height: number,
//   data: { productName: string; price: number; ref?: string; customColors?: any }
// ) {
//   const { productName, price, ref, customColors } = data;

//   // Bold, dramatic color palette
//   const colors = {
//     background: customColors?.background || "#1A202C",
//     primaryText: "#F7FAFC",
//     secondaryText: "#CBD5E0",
//     accent: customColors?.accentColor || "#63B3ED",
//     overlay: "rgba(26, 32, 44, 0.9)",
//   };

//   // Fill background
//   ctx.fillStyle = colors.background;
//   ctx.fillRect(0, 0, width, height);

//   // Dramatic bottom overlay
//   const overlayHeight = height * 0.4;
//   const darkGradient = ctx.createLinearGradient(
//     0,
//     height - overlayHeight,
//     0,
//     height
//   );
//   darkGradient.addColorStop(0, "rgba(26, 32, 44, 0)");
//   darkGradient.addColorStop(0.5, "rgba(26, 32, 44, 0.7)");
//   darkGradient.addColorStop(1, colors.overlay);

//   ctx.fillStyle = darkGradient;
//   ctx.fillRect(0, height - overlayHeight, width, overlayHeight);

//   // Bold product name
//   ctx.fillStyle = colors.primaryText;
//   ctx.font = `bold ${Math.floor(width * 0.065)}px Inter`;
//   ctx.textAlign = "left";

//   // Handle long product names
//   const words = productName.split(" ");
//   let line1 = "",
//     line2 = "";
//   let currentLine = 1;

//   for (const word of words) {
//     const testLine = line1 + (line1 ? " " : "") + word;
//     if (ctx.measureText(testLine).width > width * 0.9 && line1) {
//       line2 = (line2 ? line2 + " " : "") + word;
//     } else {
//       line1 = testLine;
//     }
//   }

//   ctx.fillText(line1, width * 0.05, height - overlayHeight * 0.75);
//   if (line2) {
//     ctx.fillText(line2, width * 0.05, height - overlayHeight * 0.6);
//   }

//   // Prominent price
//   ctx.font = `bold ${Math.floor(width * 0.055)}px Inter`;
//   ctx.fillStyle = colors.primaryText;
//   ctx.fillText(
//     `$${price.toFixed(2)}`,
//     width * 0.05,
//     height - overlayHeight * 0.4
//   );

//   // Referral with accent
//   if (ref) {
//     ctx.fillStyle = colors.accent;
//     ctx.font = `${Math.floor(width * 0.04)}px Inter`;
//     ctx.fillText(
//       `Recommended by ${ref}`,
//       width * 0.05,
//       height - overlayHeight * 0.2
//     );
//   }

//   // Premium brand mark
//   ctx.fillStyle = "rgba(99, 179, 237, 0.6)";
//   ctx.font = `${Math.floor(width * 0.03)}px Inter`;
//   ctx.textAlign = "right";
//   ctx.fillText("PLUGGN PREMIUM", width * 0.95, height * 0.1);
// }



function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

async function applyInspireTemplate(
  ctx: NodeCanvasRenderingContext2D, 
  width: number, 
  height: number, 
  data: { productName: string; price: number; ref?: string; customColors?: any }
) {
  const { productName, price, ref, customColors } = data
  
  // Premium color palette - warm, sophisticated
  const colors = {
    background: customColors?.background || '#D4B896',
    primaryText: customColors?.primaryText || '#FFFFFF',
    secondaryText: customColors?.secondaryText || '#2D3748',
    accent: customColors?.accentColor || '#C8956D',
    overlay: 'rgba(0,0,0,0.4)'
  }

  // Apply background as a subtle overlay instead of covering the image
  ctx.fillStyle = hexToRgba(colors.background, 0.25) // 25% opacity overlay
  ctx.fillRect(0, 0, width, height)

  // Create sophisticated gradient overlay for text readability
  const gradientHeight = height * 0.45
  const gradient = ctx.createLinearGradient(0, height - gradientHeight, 0, height)
  gradient.addColorStop(0, 'rgba(0,0,0,0)')
  gradient.addColorStop(0.3, 'rgba(0,0,0,0.2)')
  gradient.addColorStop(1, colors.overlay)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, height - gradientHeight, width, gradientHeight)

  // Main brand text (large, impactful)
  ctx.fillStyle = colors.primaryText
  ctx.font = `bold ${Math.floor(width * 0.12)}px Inter`
  ctx.textAlign = 'left'
  
  // Split long product names intelligently
  const maxCharsPerLine = 20
  const lines = productName.length > maxCharsPerLine 
    ? [productName.substring(0, maxCharsPerLine), productName.substring(maxCharsPerLine, 40)]
    : [productName]
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width * 0.05, height - (gradientHeight * 0.8) + (index * width * 0.08))
  })

  // Premium price styling
  ctx.font = `${Math.floor(width * 0.08)}px Inter`
  ctx.fillStyle = colors.primaryText
  ctx.fillText(`$${price.toFixed(2)}`, width * 0.05, height - (gradientHeight * 0.4))

  // "NEW" badge if applicable
  if (Math.random() > 0.5) { // You can make this conditional based on your logic
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(width * 0.05, width * 0.05, width * 0.15, width * 0.08)
    ctx.fillStyle = '#000000'
    ctx.font = `bold ${Math.floor(width * 0.04)}px Inter`
    ctx.textAlign = 'center'
    ctx.fillText('NEW', width * 0.125, width * 0.065)
    ctx.textAlign = 'left'
  }

  // Referral attribution (elegant positioning)
  if (ref) {
    ctx.fillStyle = colors.primaryText
    ctx.font = `${Math.floor(width * 0.035)}px Inter`
    ctx.fillText(`Shared by kemi`, width * 0.05, height - (gradientHeight * 0.15))
  }

  // Add subtle brand watermark
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.font = `${Math.floor(width * 0.03)}px Inter`
  ctx.textAlign = 'right'
  ctx.fillText('BY PLUGGN', width * 0.95, height * 0.1)
  
  // Version indicator
  ctx.fillText('VERSION 1.0', width * 0.95, height * 0.95)
}

async function applyMinimalTemplate(
  ctx: NodeCanvasRenderingContext2D,
  width: number,
  height: number,
  data: { productName: string; price: number; ref?: string; customColors?: any }
) {
  const { productName, price, ref, customColors } = data

  // Clean, modern color palette
  const colors = {
    background: customColors?.background || '#F7FAFC',
    primaryText: '#1A202C',
    secondaryText: '#4A5568',
    accent: customColors?.accentColor || '#4299E1',
    overlay: 'rgba(255,255,255,0.95)'
  }

  // Apply subtle background tint instead of solid fill
  ctx.fillStyle = hexToRgba(colors.background, 0.2) // 20% opacity overlay
  ctx.fillRect(0, 0, width, height)

  // Clean bottom panel for text
  const panelHeight = height * 0.25
  ctx.fillStyle = colors.overlay
  ctx.fillRect(0, height - panelHeight, width, panelHeight)

  // Subtle shadow for depth
  const shadowGradient = ctx.createLinearGradient(0, height - panelHeight - 10, 0, height - panelHeight)
  shadowGradient.addColorStop(0, 'rgba(0,0,0,0)')
  shadowGradient.addColorStop(1, 'rgba(0,0,0,0.1)')
  ctx.fillStyle = shadowGradient
  ctx.fillRect(0, height - panelHeight - 10, width, 10)

  // Product name - clean typography
  ctx.fillStyle = colors.primaryText
  ctx.font = `bold ${Math.floor(width * 0.055)}px Inter`
  ctx.textAlign = 'left'
  
  const maxWidth = width * 0.9
  let fontSize = Math.floor(width * 0.055)
  ctx.font = `bold ${fontSize}px Inter`
  
  while (ctx.measureText(productName).width > maxWidth && fontSize > 12) {
    fontSize -= 2
    ctx.font = `bold ${fontSize}px Inter`
  }
  
  ctx.fillText(productName, width * 0.05, height - panelHeight + (panelHeight * 0.25))

  // Price with emphasis
  ctx.font = `${Math.floor(width * 0.045)}px Inter`
  ctx.fillStyle = colors.primaryText
  ctx.fillText(`$${price.toFixed(2)}`, width * 0.05, height - panelHeight + (panelHeight * 0.55))

  // Referral with accent color
  if (ref) {
    ctx.fillStyle = colors.accent
    ctx.font = `${Math.floor(width * 0.035)}px Inter`
    ctx.fillText(`By kemi`, width * 0.05, height - panelHeight + (panelHeight * 0.8))
  }

  // Minimal brand mark
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  ctx.font = `${Math.floor(width * 0.025)}px Inter`
  ctx.textAlign = 'right'
  ctx.fillText('PLUGGN', width * 0.95, height * 0.95)
}

async function applyDarkTemplate(
  ctx: NodeCanvasRenderingContext2D,
  width: number,
  height: number,
  data: { productName: string; price: number; ref?: string; customColors?: any }
) {
  const { productName, price, ref, customColors } = data

  // Bold, dramatic color palette
  const colors = {
    background: customColors?.background || '#1A202C',
    primaryText: '#F7FAFC',
    secondaryText: '#CBD5E0',
    accent: customColors?.accentColor || '#63B3ED',
    overlay: 'rgba(26, 32, 44, 0.9)'
  }

  // Apply background as overlay to maintain image visibility
  ctx.fillStyle = hexToRgba(colors.background, 0.3) // 30% opacity overlay
  ctx.fillRect(0, 0, width, height)

  // Dramatic bottom overlay
  const overlayHeight = height * 0.4
  const darkGradient = ctx.createLinearGradient(0, height - overlayHeight, 0, height)
  darkGradient.addColorStop(0, 'rgba(26, 32, 44, 0)')
  darkGradient.addColorStop(0.5, 'rgba(26, 32, 44, 0.7)')
  darkGradient.addColorStop(1, colors.overlay)
  
  ctx.fillStyle = darkGradient
  ctx.fillRect(0, height - overlayHeight, width, overlayHeight)

  // Bold product name
  ctx.fillStyle = colors.primaryText
  ctx.font = `bold ${Math.floor(width * 0.065)}px Inter`
  ctx.textAlign = 'left'
  
  // Handle long product names
  const words = productName.split(' ')
  let line1 = '', line2 = ''
  let currentLine = 1
  
  for (const word of words) {
    const testLine = line1 + (line1 ? ' ' : '') + word
    if (ctx.measureText(testLine).width > width * 0.9 && line1) {
      line2 = (line2 ? line2 + ' ' : '') + word
    } else {
      line1 = testLine
    }
  }
  
  ctx.fillText(line1, width * 0.05, height - (overlayHeight * 0.75))
  if (line2) {
    ctx.fillText(line2, width * 0.05, height - (overlayHeight * 0.6))
  }

  // Prominent price
  ctx.font = `bold ${Math.floor(width * 0.055)}px Inter`
  ctx.fillStyle = colors.primaryText
  ctx.fillText(`$${price.toFixed(2)}`, width * 0.05, height - (overlayHeight * 0.4))

  // Referral with accent
  if (ref) {
    ctx.fillStyle = colors.accent
    ctx.font = `${Math.floor(width * 0.04)}px Inter`
    ctx.fillText(`Recommended by kemi`, width * 0.05, height - (overlayHeight * 0.2))
  }

  // Premium brand mark
  ctx.fillStyle = 'rgba(99, 179, 237, 0.6)'
  ctx.font = `${Math.floor(width * 0.03)}px Inter`
  ctx.textAlign = 'right'
  ctx.fillText('PLUGGN PREMIUM', width * 0.95, height * 0.1)
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
      newBackground = 'red',
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

// // Combined action for complete image processing
// export async function createProductCard(options: {
//   imageUrl: any
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

//       if (bgRemovalResult.success && bgRemovalResult.processedImage) {
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



// export async function createMagazineStyleCard(options: {
//   imageUrl: any
//   productName: string
//   price: number
//   ref?: string
//   template?: 'inspire' | 'minimal' | 'dark'
//   backgroundColor?: string
//   removeBackground?: boolean
//   backgroundOptions?: {
//     targetColor?: [number, number, number]
//     tolerance?: number
//   }
//   dimensions?: { width: number; height: number }
//   customColors?: {
//     background?: string
//     primaryText?: string
//     secondaryText?: string
//     accentColor?: string
//   }
// }) {
//   try {
//     const {
//       imageUrl,
//       productName,
//       price,
//       ref,
//       template = 'inspire',
//       backgroundColor = '#D4B896',
//       removeBackground = false,
//       dimensions = { width: 400, height: 400 },
//       customColors
//     } = options

//     const { width, height } = dimensions
//     const canvas = createCanvas(width, height)
//     const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D

//     // Enable premium rendering quality
//     ctx.imageSmoothingEnabled = true
//     ctx.imageSmoothingQuality = 'high'
//     ctx.textBaseline = 'top'

//     // Handle background color override
//     if (backgroundColor) {
//       if (!customColors) options.customColors = {}
//       options.customColors!.background = backgroundColor
//     }

//     // Load and process the product image
//     let processedImageUrl = imageUrl

//     if (removeBackground) {
//       const bgRemovalResult = await removeImageBackground({
//         imageUrl,
//         method: 'color',
//         targetColor: [255, 255, 255],
//         tolerance: 30,
//         newBackground: backgroundColor || '#FFFFFF',
//         width,
//         height
//       })

//       if (bgRemovalResult.success) {
//         processedImageUrl = bgRemovalResult.processedImage
//       }
//     }

//     // Load and draw the base image
//     const image = await loadImage(processedImageUrl)
    
//     // Calculate optimal image positioning (maintain aspect ratio)
//     const imageAspect = image.width / image.height
//     const canvasAspect = width / height
    
//     let drawWidth, drawHeight, drawX, drawY
    
//     if (imageAspect > canvasAspect) {
//       // Image is wider than canvas
//       drawHeight = height
//       drawWidth = height * imageAspect
//       drawX = (width - drawWidth) / 2
//       drawY = 0
//     } else {
//       // Image is taller than canvas
//       drawWidth = width
//       drawHeight = width / imageAspect
//       drawX = 0
//       drawY = (height - drawHeight) / 2
//     }
    
//     ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)

//     // Apply the selected template with enhanced styling
//     const templateData = {
//       productName,
//       price,
//       ref,
//       customColors: options.customColors
//     }

//     switch (template) {
//       case 'inspire':
//         await applyInspireTemplate(ctx, width, height, templateData)
//         break
//       case 'minimal':
//         await applyMinimalTemplate(ctx, width, height, templateData)
//         break
//       case 'dark':
//         await applyDarkTemplate(ctx, width, height, templateData)
//         break
//       default:
//         await applyInspireTemplate(ctx, width, height, templateData)
//     }

//     const processedImageBuffer = canvas.toBuffer('image/png')

//     return {
//       success: true,
//       processedImage: processedImageBuffer,
//       template,
//       dimensions: { width, height },
//       quality: 'magazine-premium'
//     }

//   } catch (error) {
//     console.error('Magazine-style card creation error:', error)
//     return {
//       success: false,
//       error: 'Magazine-style card creation failed',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     }
//   }
// }



export async function createMagazineStyleCard(options: {
  imageUrl: any
  productName: string
  price: number
  ref?: string
  template?: 'inspire' | 'minimal' | 'dark'
  backgroundColor?: string
  removeBackground?: boolean
  backgroundOptions?: {
    targetColor?: [number, number, number]
    tolerance?: number
  }
  dimensions?: { width: number; height: number }
  customColors?: {
    background?: string
    primaryText?: string
    secondaryText?: string
    accentColor?: string
  }
}) {
  try {
    const {
      imageUrl,
      productName,
      price,
      ref,
      template = 'inspire',
      backgroundColor,
      removeBackground = false,
      dimensions = { width: 400, height: 400 },
      customColors
    } = options

    const { width, height } = dimensions
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D

    // Enable premium rendering quality
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.textBaseline = 'top'

    // STEP 1: Fill canvas with background color if specified
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)
    }

    // STEP 2: Handle background removal if requested
    let processedImageUrl = imageUrl

    if (removeBackground) {
      const bgRemovalResult = await removeImageBackground({
        imageUrl,
        method: 'color',
        targetColor: [255, 255, 255],
        tolerance: 30,
        newBackground: backgroundColor || 'transparent',
        width,
        height
      })

      if (bgRemovalResult.success) {
        processedImageUrl = bgRemovalResult.processedImage
      }
    }

    // STEP 3: Load and draw the product image
    const image = await loadImage(processedImageUrl)
    
    // Calculate optimal image positioning (maintain aspect ratio)
    const imageAspect = image.width / image.height
    const canvasAspect = width / height
    
    let drawWidth, drawHeight, drawX, drawY
    
    if (imageAspect > canvasAspect) {
      // Image is wider than canvas
      drawHeight = height
      drawWidth = height * imageAspect
      drawX = (width - drawWidth) / 2
      drawY = 0
    } else {
      // Image is taller than canvas
      drawWidth = width
      drawHeight = width / imageAspect
      drawX = 0
      drawY = (height - drawHeight) / 2
    }
    
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)

    // STEP 4: Apply template styling OVER the image
    const templateData = {
      productName,
      price,
      ref,
      customColors: {
        ...customColors,
        background: backgroundColor || customColors?.background
      }
    }

    switch (template) {
      case 'inspire':
        await applyInspireTemplate(ctx, width, height, templateData)
        break
      case 'minimal':
        await applyMinimalTemplate(ctx, width, height, templateData)
        break
      case 'dark':
        await applyDarkTemplate(ctx, width, height, templateData)
        break
      default:
        await applyInspireTemplate(ctx, width, height, templateData)
    }

    const processedImageBuffer = canvas.toBuffer('image/png')

    return {
      success: true,
      processedImage: processedImageBuffer,
      template,
      dimensions: { width, height },
      quality: 'magazine-premium'
    }

  } catch (error) {
    console.error('Magazine-style card creation error:', error)
    return {
      success: false,
      error: 'Magazine-style card creation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

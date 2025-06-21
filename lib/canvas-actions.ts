// // // // File: lib/canvas-actions.ts
// // // 'use server'

// // // import { createCanvas, loadImage } from 'canvas'

// // // export interface ProcessImageOptions {
// // //   imageUrl: string
// // //   productName: string
// // //   price: number
// // //   ref?: string
// // //   template?: 'inspire' | 'minimal' | 'dark' | 'vibrant'
// // //   width?: number
// // //   height?: number
// // //   customColors?: {
// // //     background?: string
// // //     primaryText?: string
// // //     secondaryText?: string
// // //     accentColor?: string
// // //   }
// // // }

// // // export async function processProductImage(options: ProcessImageOptions) {
// // //   try {
// // //     const {
// // //       imageUrl,
// // //       productName,
// // //       price,
// // //       ref,
// // //       template = 'inspire',
// // //       width = 400,
// // //       height = 400,
// // //       customColors
// // //     } = options

// // //     const canvas = createCanvas(width, height)
// // //     const ctx = canvas.getContext('2d')

// // //     // Enable high-quality rendering
// // //     ctx.imageSmoothingEnabled = true
// // //     ctx.imageSmoothingQuality = 'high'
// // //     ctx.textBaseline = 'top'

// // //     // Load and draw the base image
// // //     const image = await loadImage(imageUrl)
// // //     ctx.drawImage(image, 0, 0, width, height)

// // //     // Apply template-specific styling
// // //     switch (template) {
// // //       case 'inspire':
// // //         await applyInspireTemplate(ctx, width, height, { productName, price, ref, customColors })
// // //         break
// // //       case 'minimal':
// // //         await applyMinimalTemplate(ctx, width, height, { productName, price, ref, customColors })
// // //         break
// // //       case 'dark':
// // //         await applyDarkTemplate(ctx, width, height, { productName, price, ref, customColors })
// // //         break
// // //       default:
// // //         await applyInspireTemplate(ctx, width, height, { productName, price, ref, customColors })
// // //     }

// // //     // Convert to base64
// // //     const processedImage = canvas.toDataURL('image/png', 0.9)

// // //     return {
// // //       success: true,
// // //       processedImage,
// // //       template,
// // //       dimensions: { width, height }
// // //     }

// // //   } catch (error) {
// // //     console.error('Canvas processing error:', error)
// // //     return {
// // //       success: false,
// // //       error: 'Canvas processing failed',
// // //       details: error instanceof Error ? error.message : 'Unknown error'
// // //     }
// // //   }
// // // }

// // // // Template functions
// // // async function applyInspireTemplate(
// // //   ctx: CanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref, customColors } = data

// // //   const colors = {
// // //     background: '#C8956D',
// // //     primaryText: '#F5E6D3',
// // //     secondaryText: '#2D3748',
// // //     accent: '#4A5568',
// // //     ...customColors
// // //   }

// // //   // Gradient overlay
// // //   const gradient = ctx.createLinearGradient(0, height * 0.7, 0, height)
// // //   gradient.addColorStop(0, 'rgba(0,0,0,0)')
// // //   gradient.addColorStop(1, 'rgba(0,0,0,0.8)')
// // //   ctx.fillStyle = gradient
// // //   ctx.fillRect(0, height * 0.7, width, height * 0.3)

// // //   // Product name
// // //   ctx.fillStyle = colors.primaryText
// // //   ctx.font = 'bold 18px Inter'
// // //   ctx.fillText(productName.substring(0, 20), 10, height - 70)

// // //   // Price
// // //   ctx.font = '16px Arial'
// // //   ctx.fillText(`$${price.toFixed(2)}`, 10, height - 45)

// // //   // Referral info
// // //   if (ref) {
// // //     ctx.font = '12px Arial'
// // //     ctx.fillText(`Shared by: ${ref}`, 10, height - 20)
// // //   }
// // // }

// // // async function applyMinimalTemplate(
// // //   ctx: CanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref } = data

// // //   // Minimal white overlay
// // //   ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
// // //   ctx.fillRect(0, height - 80, width, 80)

// // //   // Clean typography
// // //   ctx.fillStyle = '#1A202C'
// // //   ctx.font = 'bold 16px Arial'
// // //   ctx.fillText(productName, 15, height - 60)

// // //   ctx.font = '14px Arial'
// // //   ctx.fillText(`$${price.toFixed(2)}`, 15, height - 40)

// // //   if (ref) {
// // //     ctx.fillStyle = '#4299E1'
// // //     ctx.font = '12px Arial'
// // //     ctx.fillText(`By ${ref}`, 15, height - 20)
// // //   }
// // // }

// // // async function applyDarkTemplate(
// // //   ctx: CanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref } = data

// // //   // Dark overlay
// // //   ctx.fillStyle = 'rgba(26, 32, 44, 0.9)'
// // //   ctx.fillRect(0, height - 100, width, 100)

// // //   // Light text
// // //   ctx.fillStyle = '#F7FAFC'
// // //   ctx.font = 'bold 18px Arial'
// // //   ctx.fillText(productName, 15, height - 75)

// // //   ctx.font = '16px Arial'
// // //   ctx.fillText(`$${price.toFixed(2)}`, 15, height - 50)

// // //   if (ref) {
// // //     ctx.fillStyle = '#63B3ED'
// // //     ctx.font = '12px Arial'
// // //     ctx.fillText(`Recommended by ${ref}`, 15, height - 25)
// // //   }
// // // }

// // // // Background removal server action
// // // export async function removeImageBackground(options: {
// // //   imageUrl: string
// // //   method?: 'color' | 'edges' | 'ai'
// // //   targetColor?: [number, number, number]
// // //   tolerance?: number
// // //   newBackground?: string
// // //   width?: number
// // //   height?: number
// // // }) {
// // //   try {
// // //     const {
// // //       imageUrl,
// // //       method = 'color',
// // //       targetColor = [255, 255, 255],
// // //       tolerance = 30,
// // //       newBackground = 'transparent',
// // //       width = 400,
// // //       height = 400
// // //     } = options

// // //     const canvas = createCanvas(width, height)
// // //     const ctx = canvas.getContext('2d')

// // //     // Load original image
// // //     const img = await loadImage(imageUrl)
// // //     ctx.drawImage(img, 0, 0, width, height)

// // //     if (method === 'color') {
// // //       // Get image data for pixel manipulation
// // //       const imageData = ctx.getImageData(0, 0, width, height)
// // //       const data = imageData.data

// // //       // Remove background by color
// // //       for (let i = 0; i < data.length; i += 4) {
// // //         const r = data[i]
// // //         const g = data[i + 1]
// // //         const b = data[i + 2]

// // //         // Calculate color difference
// // //         const diff = Math.sqrt(
// // //           Math.pow(r - targetColor[0], 2) +
// // //           Math.pow(g - targetColor[1], 2) +
// // //           Math.pow(b - targetColor[2], 2)
// // //         )

// // //         // Make similar colors transparent
// // //         if (diff < tolerance) {
// // //           data[i + 3] = 0 // Set alpha to 0
// // //         }
// // //       }

// // //       // Clear canvas and add new background if specified
// // //       ctx.clearRect(0, 0, width, height)

// // //       if (newBackground !== 'transparent') {
// // //         ctx.fillStyle = newBackground
// // //         ctx.fillRect(0, 0, width, height)
// // //       }

// // //       // Put processed image back
// // //       ctx.putImageData(imageData, 0, 0)
// // //     }

// // //     const processedImage = canvas.toDataURL('image/png', 0.9)

// // //     return {
// // //       success: true,
// // //       processedImage,
// // //       method,
// // //       dimensions: { width, height }
// // //     }

// // //   } catch (error) {
// // //     console.error('Background removal error:', error)
// // //     return {
// // //       success: false,
// // //       error: 'Background removal failed',
// // //       details: error instanceof Error ? error.message : 'Unknown error'
// // //     }
// // //   }
// // // }

// // // // Combined action for complete image processing
// // // export async function createProductCard(options: {
// // //   imageUrl: string
// // //   productName: string
// // //   price: number
// // //   ref?: string
// // //   template?: 'inspire' | 'minimal' | 'dark'
// // //   removeBackground?: boolean
// // //   backgroundOptions?: {
// // //     targetColor?: [number, number, number]
// // //     tolerance?: number
// // //     newBackground?: string
// // //   }
// // //   dimensions?: { width: number; height: number }
// // // }) {
// // //   try {
// // //     let imageUrl = options.imageUrl

// // //     // First, remove background if requested
// // //     if (options.removeBackground) {
// // //       const bgRemovalResult = await removeImageBackground({
// // //         imageUrl: options.imageUrl,
// // //         ...options.backgroundOptions,
// // //         width: options.dimensions?.width || 400,
// // //         height: options.dimensions?.height || 400
// // //       })

// // //       if (bgRemovalResult.success) {
// // //         imageUrl = bgRemovalResult.processedImage
// // //       }
// // //     }

// // //     // Then apply template styling
// // //     const result = await processProductImage({
// // //       ...options,
// // //       imageUrl
// // //     })

// // //     return result

// // //   } catch (error) {
// // //     console.error('Product card creation error:', error)
// // //     return {
// // //       success: false,
// // //       error: 'Product card creation failed',
// // //       details: error instanceof Error ? error.message : 'Unknown error'
// // //     }
// // //   }
// // // }

// // // File: lib/canvas-actions.ts
// // 'use server'

// // import { createCanvas, loadImage, CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from 'canvas'
// // import { registerFont } from "canvas";
// // import path from "path";

// // registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Regular.ttf"), {
// //   family: "Inter",
// //   weight: 'normal'

// // });

// // registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Regular.ttf"), {
// //   family: "Inter",
// //   weight: 'bold'
// // });

// // export interface ProcessImageOptions {
// //   imageUrl: string
// //   productName: string
// //   price: number
// //   ref?: string
// //   template?: 'inspire' | 'minimal' | 'dark' | 'vibrant'
// //   width?: number
// //   height?: number
// //   customColors?: {
// //     background?: string
// //     primaryText?: string
// //     secondaryText?: string
// //     accentColor?: string
// //   }
// // }

// // export async function processProductImage(options: ProcessImageOptions) {
// //   try {
// //     const {
// //       imageUrl,
// //       productName,
// //       price,
// //       ref,
// //       template = 'inspire',
// //       width = 400,
// //       height = 400,
// //       customColors
// //     } = options

// //     const canvas = createCanvas(width, height)
// //     // Use NodeCanvasRenderingContext2D from 'canvas' package
// //     const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D

// //     // Enable high-quality rendering
// //     ctx.imageSmoothingEnabled = true
// //     ctx.imageSmoothingQuality = 'high'
// //     ctx.textBaseline = 'top'

// //     // Load and draw the base image
// //     const image = await loadImage(imageUrl)
// //     ctx.drawImage(image, 0, 0, width, height)

// //     // Apply template-specific styling
// //     switch (template) {
// //       case 'inspire':
// //         await applyInspireTemplate(ctx, width, height, { productName, price, ref, customColors })
// //         break
// //       case 'minimal':
// //         await applyMinimalTemplate(ctx, width, height, { productName, price, ref, customColors })
// //         break
// //       case 'dark':
// //         await applyDarkTemplate(ctx, width, height, { productName, price, ref, customColors })
// //         break
// //       default:
// //         await applyInspireTemplate(ctx, width, height, { productName, price, ref, customColors })
// //     }

// //     // Convert to base64 PNG (default)
// //     const processedImageBuffer = canvas.toBuffer("image/png");

// //     return {
// //       success: true,
// //       processedImage: processedImageBuffer,
// //       template,
// //       dimensions: { width, height },
// //     };

// //   } catch (error) {
// //     console.error('Canvas processing error:', error)
// //     return {
// //       success: false,
// //       error: 'Canvas processing failed',
// //       details: error instanceof Error ? error.message : 'Unknown error'
// //     }
// //   }
// // }

// // // // Template functions
// // // async function applyInspireTemplate(
// // //   ctx: NodeCanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref, customColors } = data

// // //   const colors = {
// // //     background: '#C8956D',
// // //     primaryText: '#F5E6D3',
// // //     secondaryText: '#2D3748',
// // //     accent: '#4A5568',
// // //     ...customColors
// // //   }

// // //   // Gradient overlay
// // //   const gradient = ctx.createLinearGradient(0, height * 0.7, 0, height)
// // //   gradient.addColorStop(0, 'rgba(0,0,0,0)')
// // //   gradient.addColorStop(1, 'rgba(0,0,0,0.8)')
// // //   ctx.fillStyle = gradient
// // //   ctx.fillRect(0, height * 0.7, width, height * 0.3)

// // //   // Product name
// // //   ctx.fillStyle = colors.primaryText
// // //   ctx.font = 'bold 18px Inter'
// // //   ctx.fillText(productName.substring(0, 20), 10, height - 70)

// // //   // Price
// // //   ctx.font = '16px Inter'
// // //   ctx.fillText(`$${price.toFixed(2)}`, 10, height - 45)

// // //   // Referral info
// // //   if (ref) {
// // //     ctx.font = '12px Inter'
// // //     ctx.fillText(`Shared by: ${ref}`, 10, height - 20)
// // //   }
// // // }

// // // async function applyMinimalTemplate(
// // //   ctx: NodeCanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref } = data

// // //   // Minimal white overlay
// // //   ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
// // //   ctx.fillRect(0, height - 80, width, 80)

// // //   // Clean typography
// // //   ctx.fillStyle = '#1A202C'
// // //   ctx.font = 'bold 16px Inter'
// // //   ctx.fillText(productName, 15, height - 60)

// // //   ctx.font = '14px Inter'
// // //   ctx.fillText(`$${price.toFixed(2)}`, 15, height - 40)

// // //   if (ref) {
// // //     ctx.fillStyle = '#4299E1'
// // //     ctx.font = '12px Inter'
// // //     ctx.fillText(`By ${ref}`, 15, height - 20)
// // //   }
// // // }

// // // async function applyDarkTemplate(
// // //   ctx: NodeCanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref } = data

// // //   // Dark overlay
// // //   ctx.fillStyle = 'rgba(26, 32, 44, 0.9)'
// // //   ctx.fillRect(0, height - 100, width, 100)

// // //   // Light text
// // //   ctx.fillStyle = '#F7FAFC'
// // //   ctx.font = 'bold 18px Inter'
// // //   ctx.fillText(productName, 15, height - 75)

// // //   ctx.font = '16px Inter'
// // //   ctx.fillText(`$${price.toFixed(2)}`, 15, height - 50)

// // //   if (ref) {
// // //     ctx.fillStyle = '#63B3ED'
// // //     ctx.font = '12px Inter'
// // //     ctx.fillText(`Recommended by ${ref}`, 15, height - 25)
// // //   }
// // // }

// // // async function applyInspireTemplate(
// // //   ctx: NodeCanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref, customColors } = data;

// // //   // Premium color palette - warm, sophisticated
// // //   const colors = {
// // //     background: customColors?.background || "#D4B896", // Warm beige
// // //     primaryText: customColors?.primaryText || "#FFFFFF",
// // //     secondaryText: customColors?.secondaryText || "#2D3748",
// // //     accent: customColors?.accentColor || "#C8956D",
// // //     overlay: "rgba(0,0,0,0.4)",
// // //   };

// // //   // Fill background with specified color
// // //   ctx.fillStyle = colors.background;
// // //   ctx.fillRect(0, 0, width, height);

// // //   // Create sophisticated gradient overlay for text readability
// // //   const gradientHeight = height * 0.45;
// // //   const gradient = ctx.createLinearGradient(
// // //     0,
// // //     height - gradientHeight,
// // //     0,
// // //     height
// // //   );
// // //   gradient.addColorStop(0, "rgba(0,0,0,0)");
// // //   gradient.addColorStop(0.3, "rgba(0,0,0,0.2)");
// // //   gradient.addColorStop(1, colors.overlay);

// // //   ctx.fillStyle = gradient;
// // //   ctx.fillRect(0, height - gradientHeight, width, gradientHeight);

// // //   // Main brand text (large, impactful)
// // //   ctx.fillStyle = colors.primaryText;
// // //   ctx.font = `bold ${Math.floor(width * 0.12)}px Inter`;
// // //   ctx.textAlign = "left";

// // //   // Split long product names intelligently
// // //   const maxCharsPerLine = 20;
// // //   const lines =
// // //     productName.length > maxCharsPerLine
// // //       ? [
// // //           productName.substring(0, maxCharsPerLine),
// // //           productName.substring(maxCharsPerLine, 40),
// // //         ]
// // //       : [productName];

// // //   lines.forEach((line, index) => {
// // //     ctx.fillText(
// // //       line,
// // //       width * 0.05,
// // //       height - gradientHeight * 0.8 + index * width * 0.08
// // //     );
// // //   });

// // //   // Premium price styling
// // //   ctx.font = `${Math.floor(width * 0.08)}px Inter`;
// // //   ctx.fillStyle = colors.primaryText;
// // //   ctx.fillText(
// // //     `$${price.toFixed(2)}`,
// // //     width * 0.05,
// // //     height - gradientHeight * 0.4
// // //   );

// // //   // "NEW" badge if applicable
// // //   if (Math.random() > 0.5) {
// // //     // You can make this conditional based on your logic
// // //     ctx.fillStyle = "#FFD700";
// // //     ctx.fillRect(width * 0.05, width * 0.05, width * 0.15, width * 0.08);
// // //     ctx.fillStyle = "#000000";
// // //     ctx.font = `bold ${Math.floor(width * 0.04)}px Inter`;
// // //     ctx.textAlign = "center";
// // //     ctx.fillText("NEW", width * 0.125, width * 0.065);
// // //     ctx.textAlign = "left";
// // //   }

// // //   // Referral attribution (elegant positioning)
// // //   if (ref) {
// // //     ctx.fillStyle = colors.primaryText;
// // //     ctx.font = `${Math.floor(width * 0.035)}px Inter`;
// // //     ctx.fillText(
// // //       `Shared by ${ref}`,
// // //       width * 0.05,
// // //       height - gradientHeight * 0.15
// // //     );
// // //   }

// // //   // Add subtle brand watermark
// // //   ctx.fillStyle = "rgba(255,255,255,0.3)";
// // //   ctx.font = `${Math.floor(width * 0.03)}px Inter`;
// // //   ctx.textAlign = "right";
// // //   ctx.fillText("BY PLUGGN", width * 0.95, height * 0.1);

// // //   // Version indicator
// // //   ctx.fillText("VERSION 1.0", width * 0.95, height * 0.95);
// // // }

// // // async function applyMinimalTemplate(
// // //   ctx: NodeCanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref, customColors } = data;

// // //   // Clean, modern color palette
// // //   const colors = {
// // //     background: customColors?.background || "#F7FAFC",
// // //     primaryText: "#1A202C",
// // //     secondaryText: "#4A5568",
// // //     accent: customColors?.accentColor || "#4299E1",
// // //     overlay: "rgba(255,255,255,0.95)",
// // //   };

// // //   // Fill background
// // //   ctx.fillStyle = colors.background;
// // //   ctx.fillRect(0, 0, width, height);

// // //   // Clean bottom panel for text
// // //   const panelHeight = height * 0.25;
// // //   ctx.fillStyle = colors.overlay;
// // //   ctx.fillRect(0, height - panelHeight, width, panelHeight);

// // //   // Subtle shadow for depth
// // //   const shadowGradient = ctx.createLinearGradient(
// // //     0,
// // //     height - panelHeight - 10,
// // //     0,
// // //     height - panelHeight
// // //   );
// // //   shadowGradient.addColorStop(0, "rgba(0,0,0,0)");
// // //   shadowGradient.addColorStop(1, "rgba(0,0,0,0.1)");
// // //   ctx.fillStyle = shadowGradient;
// // //   ctx.fillRect(0, height - panelHeight - 10, width, 10);

// // //   // Product name - clean typography
// // //   ctx.fillStyle = colors.primaryText;
// // //   ctx.font = `bold ${Math.floor(width * 0.055)}px Inter`;
// // //   ctx.textAlign = "left";

// // //   const maxWidth = width * 0.9;
// // //   let fontSize = Math.floor(width * 0.055);
// // //   ctx.font = `bold ${fontSize}px Inter`;

// // //   while (ctx.measureText(productName).width > maxWidth && fontSize > 12) {
// // //     fontSize -= 2;
// // //     ctx.font = `bold ${fontSize}px Inter`;
// // //   }

// // //   ctx.fillText(
// // //     productName,
// // //     width * 0.05,
// // //     height - panelHeight + panelHeight * 0.25
// // //   );

// // //   // Price with emphasis
// // //   ctx.font = `${Math.floor(width * 0.045)}px Inter`;
// // //   ctx.fillStyle = colors.primaryText;
// // //   ctx.fillText(
// // //     `$${price.toFixed(2)}`,
// // //     width * 0.05,
// // //     height - panelHeight + panelHeight * 0.55
// // //   );

// // //   // Referral with accent color
// // //   if (ref) {
// // //     ctx.fillStyle = colors.accent;
// // //     ctx.font = `${Math.floor(width * 0.035)}px Inter`;
// // //     ctx.fillText(
// // //       `By ${ref}`,
// // //       width * 0.05,
// // //       height - panelHeight + panelHeight * 0.8
// // //     );
// // //   }

// // //   // Minimal brand mark
// // //   ctx.fillStyle = "rgba(0,0,0,0.2)";
// // //   ctx.font = `${Math.floor(width * 0.025)}px Inter`;
// // //   ctx.textAlign = "right";
// // //   ctx.fillText("PLUGGN", width * 0.95, height * 0.95);
// // // }

// // // async function applyDarkTemplate(
// // //   ctx: NodeCanvasRenderingContext2D,
// // //   width: number,
// // //   height: number,
// // //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // // ) {
// // //   const { productName, price, ref, customColors } = data;

// // //   // Bold, dramatic color palette
// // //   const colors = {
// // //     background: customColors?.background || "#1A202C",
// // //     primaryText: "#F7FAFC",
// // //     secondaryText: "#CBD5E0",
// // //     accent: customColors?.accentColor || "#63B3ED",
// // //     overlay: "rgba(26, 32, 44, 0.9)",
// // //   };

// // //   // Fill background
// // //   ctx.fillStyle = colors.background;
// // //   ctx.fillRect(0, 0, width, height);

// // //   // Dramatic bottom overlay
// // //   const overlayHeight = height * 0.4;
// // //   const darkGradient = ctx.createLinearGradient(
// // //     0,
// // //     height - overlayHeight,
// // //     0,
// // //     height
// // //   );
// // //   darkGradient.addColorStop(0, "rgba(26, 32, 44, 0)");
// // //   darkGradient.addColorStop(0.5, "rgba(26, 32, 44, 0.7)");
// // //   darkGradient.addColorStop(1, colors.overlay);

// // //   ctx.fillStyle = darkGradient;
// // //   ctx.fillRect(0, height - overlayHeight, width, overlayHeight);

// // //   // Bold product name
// // //   ctx.fillStyle = colors.primaryText;
// // //   ctx.font = `bold ${Math.floor(width * 0.065)}px Inter`;
// // //   ctx.textAlign = "left";

// // //   // Handle long product names
// // //   const words = productName.split(" ");
// // //   let line1 = "",
// // //     line2 = "";
// // //   let currentLine = 1;

// // //   for (const word of words) {
// // //     const testLine = line1 + (line1 ? " " : "") + word;
// // //     if (ctx.measureText(testLine).width > width * 0.9 && line1) {
// // //       line2 = (line2 ? line2 + " " : "") + word;
// // //     } else {
// // //       line1 = testLine;
// // //     }
// // //   }

// // //   ctx.fillText(line1, width * 0.05, height - overlayHeight * 0.75);
// // //   if (line2) {
// // //     ctx.fillText(line2, width * 0.05, height - overlayHeight * 0.6);
// // //   }

// // //   // Prominent price
// // //   ctx.font = `bold ${Math.floor(width * 0.055)}px Inter`;
// // //   ctx.fillStyle = colors.primaryText;
// // //   ctx.fillText(
// // //     `$${price.toFixed(2)}`,
// // //     width * 0.05,
// // //     height - overlayHeight * 0.4
// // //   );

// // //   // Referral with accent
// // //   if (ref) {
// // //     ctx.fillStyle = colors.accent;
// // //     ctx.font = `${Math.floor(width * 0.04)}px Inter`;
// // //     ctx.fillText(
// // //       `Recommended by ${ref}`,
// // //       width * 0.05,
// // //       height - overlayHeight * 0.2
// // //     );
// // //   }

// // //   // Premium brand mark
// // //   ctx.fillStyle = "rgba(99, 179, 237, 0.6)";
// // //   ctx.font = `${Math.floor(width * 0.03)}px Inter`;
// // //   ctx.textAlign = "right";
// // //   ctx.fillText("PLUGGN PREMIUM", width * 0.95, height * 0.1);
// // // }

// // function hexToRgba(hex: string, alpha: number): string {
// //   const r = parseInt(hex.slice(1, 3), 16)
// //   const g = parseInt(hex.slice(3, 5), 16)
// //   const b = parseInt(hex.slice(5, 7), 16)
// //   return `rgba(${r}, ${g}, ${b}, ${alpha})`
// // }

// // async function applyInspireTemplate(
// //   ctx: NodeCanvasRenderingContext2D,
// //   width: number,
// //   height: number,
// //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // ) {
// //   const { productName, price, ref, customColors } = data

// //   // Premium color palette - warm, sophisticated
// //   const colors = {
// //     background: customColors?.background || '#D4B896',
// //     primaryText: customColors?.primaryText || '#FFFFFF',
// //     secondaryText: customColors?.secondaryText || '#2D3748',
// //     accent: customColors?.accentColor || '#C8956D',
// //     overlay: 'rgba(0,0,0,0.4)'
// //   }

// //   // Apply background as a subtle overlay instead of covering the image
// //   ctx.fillStyle = hexToRgba(colors.background, 0.25) // 25% opacity overlay
// //   ctx.fillRect(0, 0, width, height)

// //   // Create sophisticated gradient overlay for text readability
// //   const gradientHeight = height * 0.45
// //   const gradient = ctx.createLinearGradient(0, height - gradientHeight, 0, height)
// //   gradient.addColorStop(0, 'rgba(0,0,0,0)')
// //   gradient.addColorStop(0.3, 'rgba(0,0,0,0.2)')
// //   gradient.addColorStop(1, colors.overlay)

// //   ctx.fillStyle = gradient
// //   ctx.fillRect(0, height - gradientHeight, width, gradientHeight)

// //   // Main brand text (large, impactful)
// //   ctx.fillStyle = colors.primaryText
// //   ctx.font = `bold ${Math.floor(width * 0.12)}px Inter`
// //   ctx.textAlign = 'left'

// //   // Split long product names intelligently
// //   const maxCharsPerLine = 20
// //   const lines = productName.length > maxCharsPerLine
// //     ? [productName.substring(0, maxCharsPerLine), productName.substring(maxCharsPerLine, 40)]
// //     : [productName]

// //   lines.forEach((line, index) => {
// //     ctx.fillText(line, width * 0.05, height - (gradientHeight * 0.8) + (index * width * 0.08))
// //   })

// //   // Premium price styling
// //   ctx.font = `${Math.floor(width * 0.08)}px Inter`
// //   ctx.fillStyle = colors.primaryText
// //   ctx.fillText(`$${price.toFixed(2)}`, width * 0.05, height - (gradientHeight * 0.4))

// //   // "NEW" badge if applicable
// //   if (Math.random() > 0.5) { // You can make this conditional based on your logic
// //     ctx.fillStyle = '#FFD700'
// //     ctx.fillRect(width * 0.05, width * 0.05, width * 0.15, width * 0.08)
// //     ctx.fillStyle = '#000000'
// //     ctx.font = `bold ${Math.floor(width * 0.04)}px Inter`
// //     ctx.textAlign = 'center'
// //     ctx.fillText('NEW', width * 0.125, width * 0.065)
// //     ctx.textAlign = 'left'
// //   }

// //   // Referral attribution (elegant positioning)
// //   if (ref) {
// //     ctx.fillStyle = colors.primaryText
// //     ctx.font = `${Math.floor(width * 0.035)}px Inter`
// //     ctx.fillText(`Shared by kemi`, width * 0.05, height - (gradientHeight * 0.15))
// //   }

// //   // Add subtle brand watermark
// //   ctx.fillStyle = 'rgba(255,255,255,0.3)'
// //   ctx.font = `${Math.floor(width * 0.03)}px Inter`
// //   ctx.textAlign = 'right'
// //   ctx.fillText('BY PLUGGN', width * 0.95, height * 0.1)

// //   // Version indicator
// //   ctx.fillText('VERSION 1.0', width * 0.95, height * 0.95)
// // }

// // async function applyMinimalTemplate(
// //   ctx: NodeCanvasRenderingContext2D,
// //   width: number,
// //   height: number,
// //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // ) {
// //   const { productName, price, ref, customColors } = data

// //   // Clean, modern color palette
// //   const colors = {
// //     background: customColors?.background || '#F7FAFC',
// //     primaryText: '#1A202C',
// //     secondaryText: '#4A5568',
// //     accent: customColors?.accentColor || '#4299E1',
// //     overlay: 'rgba(255,255,255,0.95)'
// //   }

// //   // Apply subtle background tint instead of solid fill
// //   ctx.fillStyle = hexToRgba(colors.background, 0.2) // 20% opacity overlay
// //   ctx.fillRect(0, 0, width, height)

// //   // Clean bottom panel for text
// //   const panelHeight = height * 0.25
// //   ctx.fillStyle = colors.overlay
// //   ctx.fillRect(0, height - panelHeight, width, panelHeight)

// //   // Subtle shadow for depth
// //   const shadowGradient = ctx.createLinearGradient(0, height - panelHeight - 10, 0, height - panelHeight)
// //   shadowGradient.addColorStop(0, 'rgba(0,0,0,0)')
// //   shadowGradient.addColorStop(1, 'rgba(0,0,0,0.1)')
// //   ctx.fillStyle = shadowGradient
// //   ctx.fillRect(0, height - panelHeight - 10, width, 10)

// //   // Product name - clean typography
// //   ctx.fillStyle = colors.primaryText
// //   ctx.font = `bold ${Math.floor(width * 0.055)}px Inter`
// //   ctx.textAlign = 'left'

// //   const maxWidth = width * 0.9
// //   let fontSize = Math.floor(width * 0.055)
// //   ctx.font = `bold ${fontSize}px Inter`

// //   while (ctx.measureText(productName).width > maxWidth && fontSize > 12) {
// //     fontSize -= 2
// //     ctx.font = `bold ${fontSize}px Inter`
// //   }

// //   ctx.fillText(productName, width * 0.05, height - panelHeight + (panelHeight * 0.25))

// //   // Price with emphasis
// //   ctx.font = `${Math.floor(width * 0.045)}px Inter`
// //   ctx.fillStyle = colors.primaryText
// //   ctx.fillText(`$${price.toFixed(2)}`, width * 0.05, height - panelHeight + (panelHeight * 0.55))

// //   // Referral with accent color
// //   if (ref) {
// //     ctx.fillStyle = colors.accent
// //     ctx.font = `${Math.floor(width * 0.035)}px Inter`
// //     ctx.fillText(`By kemi`, width * 0.05, height - panelHeight + (panelHeight * 0.8))
// //   }

// //   // Minimal brand mark
// //   ctx.fillStyle = 'rgba(0,0,0,0.2)'
// //   ctx.font = `${Math.floor(width * 0.025)}px Inter`
// //   ctx.textAlign = 'right'
// //   ctx.fillText('PLUGGN', width * 0.95, height * 0.95)
// // }

// // async function applyDarkTemplate(
// //   ctx: NodeCanvasRenderingContext2D,
// //   width: number,
// //   height: number,
// //   data: { productName: string; price: number; ref?: string; customColors?: any }
// // ) {
// //   const { productName, price, ref, customColors } = data

// //   // Bold, dramatic color palette
// //   const colors = {
// //     background: customColors?.background || '#1A202C',
// //     primaryText: '#F7FAFC',
// //     secondaryText: '#CBD5E0',
// //     accent: customColors?.accentColor || '#63B3ED',
// //     overlay: 'rgba(26, 32, 44, 0.9)'
// //   }

// //   // Apply background as overlay to maintain image visibility
// //   ctx.fillStyle = hexToRgba(colors.background, 0.3) // 30% opacity overlay
// //   ctx.fillRect(0, 0, width, height)

// //   // Dramatic bottom overlay
// //   const overlayHeight = height * 0.4
// //   const darkGradient = ctx.createLinearGradient(0, height - overlayHeight, 0, height)
// //   darkGradient.addColorStop(0, 'rgba(26, 32, 44, 0)')
// //   darkGradient.addColorStop(0.5, 'rgba(26, 32, 44, 0.7)')
// //   darkGradient.addColorStop(1, colors.overlay)

// //   ctx.fillStyle = darkGradient
// //   ctx.fillRect(0, height - overlayHeight, width, overlayHeight)

// //   // Bold product name
// //   ctx.fillStyle = colors.primaryText
// //   ctx.font = `bold ${Math.floor(width * 0.065)}px Inter`
// //   ctx.textAlign = 'left'

// //   // Handle long product names
// //   const words = productName.split(' ')
// //   let line1 = '', line2 = ''
// //   let currentLine = 1

// //   for (const word of words) {
// //     const testLine = line1 + (line1 ? ' ' : '') + word
// //     if (ctx.measureText(testLine).width > width * 0.9 && line1) {
// //       line2 = (line2 ? line2 + ' ' : '') + word
// //     } else {
// //       line1 = testLine
// //     }
// //   }

// //   ctx.fillText(line1, width * 0.05, height - (overlayHeight * 0.75))
// //   if (line2) {
// //     ctx.fillText(line2, width * 0.05, height - (overlayHeight * 0.6))
// //   }

// //   // Prominent price
// //   ctx.font = `bold ${Math.floor(width * 0.055)}px Inter`
// //   ctx.fillStyle = colors.primaryText
// //   ctx.fillText(`$${price.toFixed(2)}`, width * 0.05, height - (overlayHeight * 0.4))

// //   // Referral with accent
// //   if (ref) {
// //     ctx.fillStyle = colors.accent
// //     ctx.font = `${Math.floor(width * 0.04)}px Inter`
// //     ctx.fillText(`Recommended by kemi`, width * 0.05, height - (overlayHeight * 0.2))
// //   }

// //   // Premium brand mark
// //   ctx.fillStyle = 'rgba(99, 179, 237, 0.6)'
// //   ctx.font = `${Math.floor(width * 0.03)}px Inter`
// //   ctx.textAlign = 'right'
// //   ctx.fillText('PLUGGN PREMIUM', width * 0.95, height * 0.1)
// // }
// // // Background removal server action
// // export async function removeImageBackground(options: {
// //   imageUrl: string
// //   method?: 'color' | 'edges' | 'ai'
// //   targetColor?: [number, number, number]
// //   tolerance?: number
// //   newBackground?: string
// //   width?: number
// //   height?: number
// // }) {
// //   try {
// //     const {
// //       imageUrl,
// //       method = 'color',
// //       targetColor = [255, 255, 255],
// //       tolerance = 30,
// //       newBackground = 'red',
// //       width = 400,
// //       height = 400
// //     } = options

// //     const canvas = createCanvas(width, height)
// //     const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D

// //     // Load original image
// //     const img = await loadImage(imageUrl)
// //     ctx.drawImage(img, 0, 0, width, height)

// //     if (method === 'color') {
// //       // Get image data for pixel manipulation
// //       const imageData = ctx.getImageData(0, 0, width, height)
// //       const data = imageData.data

// //       // Remove background by color
// //       for (let i = 0; i < data.length; i += 4) {
// //         const r = data[i]
// //         const g = data[i + 1]
// //         const b = data[i + 2]

// //         // Calculate color difference
// //         const diff = Math.sqrt(
// //           Math.pow(r - targetColor[0], 2) +
// //           Math.pow(g - targetColor[1], 2) +
// //           Math.pow(b - targetColor[2], 2)
// //         )

// //         // Make similar colors transparent
// //         if (diff < tolerance) {
// //           data[i + 3] = 0 // Set alpha to 0
// //         }
// //       }

// //       // Clear canvas and add new background if specified
// //       ctx.clearRect(0, 0, width, height)

// //       if (newBackground !== 'transparent') {
// //         ctx.fillStyle = newBackground
// //         ctx.fillRect(0, 0, width, height)
// //       }

// //       // Put processed image back
// //       ctx.putImageData(imageData, 0, 0)
// //     }

// //     const processedImageBuffer = canvas.toBuffer('image/png')

// //     return {
// //       success: true,
// //       processedImage: processedImageBuffer,
// //       method,
// //       dimensions: { width, height },
// //     };

// //   } catch (error) {
// //     console.error('Background removal error:', error)
// //     return {
// //       success: false,
// //       error: 'Background removal failed',
// //       details: error instanceof Error ? error.message : 'Unknown error'
// //     }
// //   }
// // }

// // // // Combined action for complete image processing
// // // export async function createProductCard(options: {
// // //   imageUrl: any
// // //   productName: string
// // //   price: number
// // //   ref?: string
// // //   template?: 'inspire' | 'minimal' | 'dark'
// // //   removeBackground?: boolean
// // //   backgroundOptions?: {
// // //     targetColor?: [number, number, number]
// // //     tolerance?: number
// // //     newBackground?: string
// // //   }
// // //   dimensions?: { width: number; height: number }
// // // }) {
// // //   try {
// // //     let imageUrl = options.imageUrl

// // //     // First, remove background if requested
// // //     if (options.removeBackground) {
// // //       const bgRemovalResult = await removeImageBackground({
// // //         imageUrl: options.imageUrl,
// // //         ...options.backgroundOptions,
// // //         width: options.dimensions?.width || 400,
// // //         height: options.dimensions?.height || 400
// // //       })

// // //       if (bgRemovalResult.success && bgRemovalResult.processedImage) {
// // //         imageUrl = bgRemovalResult.processedImage
// // //       }
// // //     }

// // //     // Then apply template styling
// // //     const result = await processProductImage({
// // //       ...options,
// // //       imageUrl
// // //     })

// // //     return result

// // //   } catch (error) {
// // //     console.error('Product card creation error:', error)
// // //     return {
// // //       success: false,
// // //       error: 'Product card creation failed',
// // //       details: error instanceof Error ? error.message : 'Unknown error'
// // //     }
// // //   }
// // // }

// // // export async function createMagazineStyleCard(options: {
// // //   imageUrl: any
// // //   productName: string
// // //   price: number
// // //   ref?: string
// // //   template?: 'inspire' | 'minimal' | 'dark'
// // //   backgroundColor?: string
// // //   removeBackground?: boolean
// // //   backgroundOptions?: {
// // //     targetColor?: [number, number, number]
// // //     tolerance?: number
// // //   }
// // //   dimensions?: { width: number; height: number }
// // //   customColors?: {
// // //     background?: string
// // //     primaryText?: string
// // //     secondaryText?: string
// // //     accentColor?: string
// // //   }
// // // }) {
// // //   try {
// // //     const {
// // //       imageUrl,
// // //       productName,
// // //       price,
// // //       ref,
// // //       template = 'inspire',
// // //       backgroundColor = '#D4B896',
// // //       removeBackground = false,
// // //       dimensions = { width: 400, height: 400 },
// // //       customColors
// // //     } = options

// // //     const { width, height } = dimensions
// // //     const canvas = createCanvas(width, height)
// // //     const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D

// // //     // Enable premium rendering quality
// // //     ctx.imageSmoothingEnabled = true
// // //     ctx.imageSmoothingQuality = 'high'
// // //     ctx.textBaseline = 'top'

// // //     // Handle background color override
// // //     if (backgroundColor) {
// // //       if (!customColors) options.customColors = {}
// // //       options.customColors!.background = backgroundColor
// // //     }

// // //     // Load and process the product image
// // //     let processedImageUrl = imageUrl

// // //     if (removeBackground) {
// // //       const bgRemovalResult = await removeImageBackground({
// // //         imageUrl,
// // //         method: 'color',
// // //         targetColor: [255, 255, 255],
// // //         tolerance: 30,
// // //         newBackground: backgroundColor || '#FFFFFF',
// // //         width,
// // //         height
// // //       })

// // //       if (bgRemovalResult.success) {
// // //         processedImageUrl = bgRemovalResult.processedImage
// // //       }
// // //     }

// // //     // Load and draw the base image
// // //     const image = await loadImage(processedImageUrl)

// // //     // Calculate optimal image positioning (maintain aspect ratio)
// // //     const imageAspect = image.width / image.height
// // //     const canvasAspect = width / height

// // //     let drawWidth, drawHeight, drawX, drawY

// // //     if (imageAspect > canvasAspect) {
// // //       // Image is wider than canvas
// // //       drawHeight = height
// // //       drawWidth = height * imageAspect
// // //       drawX = (width - drawWidth) / 2
// // //       drawY = 0
// // //     } else {
// // //       // Image is taller than canvas
// // //       drawWidth = width
// // //       drawHeight = width / imageAspect
// // //       drawX = 0
// // //       drawY = (height - drawHeight) / 2
// // //     }

// // //     ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)

// // //     // Apply the selected template with enhanced styling
// // //     const templateData = {
// // //       productName,
// // //       price,
// // //       ref,
// // //       customColors: options.customColors
// // //     }

// // //     switch (template) {
// // //       case 'inspire':
// // //         await applyInspireTemplate(ctx, width, height, templateData)
// // //         break
// // //       case 'minimal':
// // //         await applyMinimalTemplate(ctx, width, height, templateData)
// // //         break
// // //       case 'dark':
// // //         await applyDarkTemplate(ctx, width, height, templateData)
// // //         break
// // //       default:
// // //         await applyInspireTemplate(ctx, width, height, templateData)
// // //     }

// // //     const processedImageBuffer = canvas.toBuffer('image/png')

// // //     return {
// // //       success: true,
// // //       processedImage: processedImageBuffer,
// // //       template,
// // //       dimensions: { width, height },
// // //       quality: 'magazine-premium'
// // //     }

// // //   } catch (error) {
// // //     console.error('Magazine-style card creation error:', error)
// // //     return {
// // //       success: false,
// // //       error: 'Magazine-style card creation failed',
// // //       details: error instanceof Error ? error.message : 'Unknown error'
// // //     }
// // //   }
// // // }

// // export async function createMagazineStyleCard(options: {
// //   imageUrl: any
// //   productName: string
// //   price: number
// //   ref?: string
// //   template?: 'inspire' | 'minimal' | 'dark'
// //   backgroundColor?: string
// //   removeBackground?: boolean
// //   backgroundOptions?: {
// //     targetColor?: [number, number, number]
// //     tolerance?: number
// //   }
// //   dimensions?: { width: number; height: number }
// //   customColors?: {
// //     background?: string
// //     primaryText?: string
// //     secondaryText?: string
// //     accentColor?: string
// //   }
// // }) {
// //   try {
// //     const {
// //       imageUrl,
// //       productName,
// //       price,
// //       ref,
// //       template = 'inspire',
// //       backgroundColor,
// //       removeBackground = false,
// //       dimensions = { width: 400, height: 400 },
// //       customColors
// //     } = options

// //     const { width, height } = dimensions
// //     const canvas = createCanvas(width, height)
// //     const ctx = canvas.getContext('2d') as unknown as NodeCanvasRenderingContext2D

// //     // Enable premium rendering quality
// //     ctx.imageSmoothingEnabled = true
// //     ctx.imageSmoothingQuality = 'high'
// //     ctx.textBaseline = 'top'

// //     // STEP 1: Fill canvas with background color if specified
// //     if (backgroundColor) {
// //       ctx.fillStyle = backgroundColor
// //       ctx.fillRect(0, 0, width, height)
// //     }

// //     // STEP 2: Handle background removal if requested
// //     let processedImageUrl = imageUrl

// //     if (removeBackground) {
// //       const bgRemovalResult = await removeImageBackground({
// //         imageUrl,
// //         method: 'color',
// //         targetColor: [255, 255, 255],
// //         tolerance: 30,
// //         newBackground: backgroundColor || 'transparent',
// //         width,
// //         height
// //       })

// //       if (bgRemovalResult.success) {
// //         processedImageUrl = bgRemovalResult.processedImage
// //       }
// //     }

// //     // STEP 3: Load and draw the product image
// //     const image = await loadImage(processedImageUrl)

// //     // Calculate optimal image positioning (maintain aspect ratio)
// //     const imageAspect = image.width / image.height
// //     const canvasAspect = width / height

// //     let drawWidth, drawHeight, drawX, drawY

// //     if (imageAspect > canvasAspect) {
// //       // Image is wider than canvas
// //       drawHeight = height
// //       drawWidth = height * imageAspect
// //       drawX = (width - drawWidth) / 2
// //       drawY = 0
// //     } else {
// //       // Image is taller than canvas
// //       drawWidth = width
// //       drawHeight = width / imageAspect
// //       drawX = 0
// //       drawY = (height - drawHeight) / 2
// //     }

// //     ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)

// //     // STEP 4: Apply template styling OVER the image
// //     const templateData = {
// //       productName,
// //       price,
// //       ref,
// //       customColors: {
// //         ...customColors,
// //         background: backgroundColor || customColors?.background
// //       }
// //     }

// //     switch (template) {
// //       case 'inspire':
// //         await applyInspireTemplate(ctx, width, height, templateData)
// //         break
// //       case 'minimal':
// //         await applyMinimalTemplate(ctx, width, height, templateData)
// //         break
// //       case 'dark':
// //         await applyDarkTemplate(ctx, width, height, templateData)
// //         break
// //       default:
// //         await applyInspireTemplate(ctx, width, height, templateData)
// //     }

// //     const processedImageBuffer = canvas.toBuffer('image/png')

// //     return {
// //       success: true,
// //       processedImage: processedImageBuffer,
// //       template,
// //       dimensions: { width, height },
// //       quality: 'magazine-premium'
// //     }

// //   } catch (error) {
// //     console.error('Magazine-style card creation error:', error)
// //     return {
// //       success: false,
// //       error: 'Magazine-style card creation failed',
// //       details: error instanceof Error ? error.message : 'Unknown error'
// //     }
// //   }
// // }

// import { createCanvas, loadImage, CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from 'canvas'
// import { registerFont } from "canvas";
// import path from "path";

// // Register Inter font
// registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Regular.ttf"), {
//   family: "Inter",
//   weight: 'normal'
// });

// registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Bold.ttf"), {
//   family: "Inter",
//   weight: 'bold'
// });

// export async function createMagazineStyleCard({
//   primaryImageUrl,
//   secondaryImageUrl,
//   productName,
//   productPrice,
//   name
// }: any) {
//   // Canvas dimensions
//   const width = 800;
//   const height = 1200;

//   // Create canvas
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext('2d');

//   try {
//     // Load images
//     const [primaryImage, secondaryImage] = await Promise.all([
//       loadImage(primaryImageUrl),
//       loadImage(secondaryImageUrl)
//     ]);

//     // Fill background with dark marble-like color
//     const gradient = ctx.createLinearGradient(0, 0, width, height);
//     gradient.addColorStop(0, '#1a1a1a');
//     gradient.addColorStop(0.5, '#2d2d2d');
//     gradient.addColorStop(1, '#1a1a1a');
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, width, height);

//     // Add marble texture overlay
//     ctx.globalAlpha = 0.3;
//     ctx.fillStyle = '#000000';

//     // Create marble-like patterns
//     for (let i = 0; i < 50; i++) {
//       ctx.beginPath();
//       ctx.moveTo(Math.random() * width, Math.random() * height);
//       ctx.lineTo(Math.random() * width, Math.random() * height);
//       ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
//       ctx.lineWidth = Math.random() * 2;
//       ctx.stroke();
//     }

//     ctx.globalAlpha = 1;

//     // Draw primary image (sneaker) - positioned in center-right
//     const imgScale = Math.min(400 / primaryImage.width, 300 / primaryImage.height);
//     const imgWidth = primaryImage.width * imgScale;
//     const imgHeight = primaryImage.height * imgScale;
//     const imgX = width - imgWidth - 50;
//     const imgY = (height - imgHeight) / 2;

//     ctx.drawImage(primaryImage, imgX, imgY, imgWidth, imgHeight);

//     // Add subtle shadow behind the sneaker
//     ctx.globalAlpha = 0.3;
//     ctx.fillStyle = '#000000';
//     ctx.fillRect(imgX + 10, imgY + 10, imgWidth, imgHeight);
//     ctx.globalAlpha = 1;

//     // Draw "INSPIRE" text (large, top)
//     ctx.font = 'bold 72px Inter';
//     ctx.fillStyle = '#D4AF37'; // Golden color
//     ctx.textAlign = 'left';
//     ctx.fillText('INSPIRE', 50, 120);

//     // Draw "BY PLUGGN" text (smaller, right aligned)
//     ctx.font = '24px Inter';
//     ctx.fillStyle = '#D4AF37';
//     ctx.textAlign = 'right';
//     ctx.fillText('BY PLUGGN', width - 50, 150);

//     // Draw "NEW" badge
//     ctx.fillStyle = '#D4AF37';
//     ctx.fillRect(50, 160, 80, 35);
//     ctx.font = 'bold 18px Inter';
//     ctx.fillStyle = '#000000';
//     ctx.textAlign = 'center';
//     ctx.fillText('NEW', 90, 182);

//     // Draw "ELEVAT YOUR LOOK" text (left side, outlined)
//     ctx.font = 'bold 64px Inter';
//     ctx.textAlign = 'left';

//     // Create outlined text effect
//     const elevateTexts = ['ELEVAT', 'YOUR', 'LOOK'];
//     let yOffset = 580;

//     elevateTexts.forEach((text, index) => {
//       // Text outline
//       ctx.strokeStyle = '#D4AF37';
//       ctx.lineWidth = 3;
//       ctx.strokeText(text, 50, yOffset + (index * 80));

//       // Text fill (semi-transparent)
//       ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
//       ctx.fillText(text, 50, yOffset + (index * 80));
//     });

//     // Draw product name
//     ctx.font = 'bold 28px Inter';
//     ctx.fillStyle = '#D4AF37';
//     ctx.textAlign = 'left';
//     ctx.fillText(productName.toUpperCase(), 50, 880);

//     // Draw product price
//     ctx.font = '24px Inter';
//     ctx.fillStyle = '#FFFFFF';
//     ctx.fillText(`₦${productPrice.toLocaleString()}`, 50, 920);

//     // Draw secondary image (profile picture) - circular
//     const profileSize = 80;
//     const profileX = width - 130;
//     const profileY = height - 180;

//     // Create circular clipping path
//     ctx.save();
//     ctx.beginPath();
//     ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2);
//     ctx.clip();

//     // Draw secondary image
//     ctx.drawImage(
//       secondaryImage,
//       profileX - profileSize / 2,
//       profileY - profileSize / 2,
//       profileSize,
//       profileSize
//     );
//     ctx.restore();

//     // Add border around profile image
//     ctx.beginPath();
//     ctx.arc(profileX, profileY, profileSize / 2 + 2, 0, Math.PI * 2);
//     ctx.strokeStyle = '#D4AF37';
//     ctx.lineWidth = 2;
//     ctx.stroke();

//     // Draw name under profile image
//     ctx.font = '18px Inter';
//     ctx.fillStyle = '#FFFFFF';
//     ctx.textAlign = 'center';
//     ctx.fillText(name, profileX, profileY + profileSize / 2 + 25);

//     // Draw "VERSION 1.0" text
//     ctx.font = '14px Inter';
//     ctx.fillStyle = '#888888';
//     ctx.fillText('VERSION 1.0', profileX, height - 50);

//     // Add some decorative elements
//     ctx.strokeStyle = '#D4AF37';
//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     ctx.moveTo(50, 240);
//     ctx.lineTo(200, 240);
//     ctx.stroke();

//     // Add subtle grid pattern overlay
//     ctx.globalAlpha = 0.05;
//     ctx.strokeStyle = '#FFFFFF';
//     ctx.lineWidth = 1;

//     // Vertical lines
//     for (let x = 0; x < width; x += 40) {
//       ctx.beginPath();
//       ctx.moveTo(x, 0);
//       ctx.lineTo(x, height);
//       ctx.stroke();
//     }

//     // Horizontal lines
//     for (let y = 0; y < height; y += 40) {
//       ctx.beginPath();
//       ctx.moveTo(0, y);
//       ctx.lineTo(width, y);
//       ctx.stroke();
//     }

//     ctx.globalAlpha = 1;

//     // Return processed image buffer
//     const processedImageBuffer = canvas.toBuffer('image/png');

//     return {
//             success: true,
//             processedImage: processedImageBuffer,

//           }

//   } catch (error) {
//     console.error('Error creating magazine style card:', error);
//     throw error;
//   }
// }






// import {
//   createCanvas,
//   loadImage,
//   CanvasRenderingContext2D as NodeCanvasRenderingContext2D,
// } from "canvas";
// import { registerFont } from "canvas";
// import path from "path";

// // Register Inter font
// registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Regular.ttf"), {
//   family: "Inter",
//   weight: "normal",
// });

// registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Bold.ttf"), {
//   family: "Inter",
//   weight: "bold",
// });

// export async function createMagazineStyleCard({
//   primaryImageUrl,
//   secondaryImageUrl,
//   productName,
//   productPrice,
//   name,
//   dimensions = { width: 1200, height: 630 },
// }: any) {
//   // Canvas dimensions
//   const width = dimensions.width;
//   const height = dimensions.height;

//   // Create canvas
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");

//   try {
//     // Load images
//     const [primaryImage, secondaryImage] = await Promise.all([
//       loadImage(primaryImageUrl),
//       loadImage(secondaryImageUrl),
//     ]);

//     // Draw primary image as full background
//     // Scale to cover entire canvas while maintaining aspect ratio
//     const scaleX = width / primaryImage.width;
//     const scaleY = height / primaryImage.height;
//     const scale = Math.max(scaleX, scaleY); // Use max to cover entire canvas

//     const scaledWidth = primaryImage.width * scale;
//     const scaledHeight = primaryImage.height * scale;

//     // Center the image
//     const offsetX = (width - scaledWidth) / 2;
//     const offsetY = (height - scaledHeight) / 2;

//     ctx.drawImage(primaryImage, offsetX, offsetY, scaledWidth, scaledHeight);

//     // Add golden overlay with opacity to match the text color
//     ctx.fillStyle = "rgba(212, 175, 55, 0.3)"; // Golden overlay with 30% opacity
//     ctx.fillRect(0, 0, width, height);

//     // Draw "INSPIRE" text (large, top) - scaled for OG dimensions
//     const titleFontSize = Math.min(height * 0.15, 90); // Responsive font size
//     ctx.font = `bold ${titleFontSize}px Inter`;
//     ctx.fillStyle = "#D4AF37"; // Golden color
//     ctx.textAlign = "left";
//     ctx.fillText("INSPIRE", 50, titleFontSize + 20);

//     // Draw "BY PLUGGN" text (smaller, right aligned)
//     const subtitleFontSize = Math.min(height * 0.04, 24);
//     ctx.font = `${subtitleFontSize}px Inter`;
//     ctx.fillStyle = "#D4AF37";
//     ctx.textAlign = "right";
//     ctx.fillText("BY PLUGGN", width - 60, titleFontSize + 40);

//     // Draw "NEW" badge - scaled
//     const badgeWidth = 80;
//     const badgeHeight = 30;
//     ctx.fillStyle = "#D4AF37";
//     ctx.fillRect(50, titleFontSize + 50, badgeWidth, badgeHeight);
//     ctx.font = `bold ${Math.min(height * 0.03, 16)}px Inter`;
//     ctx.fillStyle = "#000000";
//     ctx.textAlign = "center";
//     ctx.fillText("NEW", 50 + badgeWidth / 2, titleFontSize + 70);

//     // Draw "ELEVAT YOUR LOOK" text (left side, outlined) - positioned for OG layout
//     const elevateFontSize = Math.min(height * 0.12, 54); // Responsive font size
//     ctx.font = `bold ${elevateFontSize}px Inter`;
//     ctx.textAlign = "left";

//     // Create outlined text effect
//     const elevateTexts = ["ELEVAT", "YOUR", "LOOK"];
//     let yOffset = height * 0.45; // Start at 45% of height

//     elevateTexts.forEach((text, index) => {
//       // Text outline
//       ctx.strokeStyle = "#D4AF37";
//       ctx.lineWidth = 2;
//       ctx.strokeText(text, 50, yOffset + index * elevateFontSize * 1.1);

//       // Text fill (semi-transparent)
//       ctx.fillStyle = "rgba(212, 175, 55, 0.1)";
//       ctx.fillText(text, 50, yOffset + index * elevateFontSize * 1.1);
//     });

//     // Draw product name - positioned at bottom
//     const productNameY = height - 120;
//     ctx.font = `bold ${Math.min(height * 0.045, 24)}px Inter`;
//     ctx.fillStyle = "#D4AF37";
//     ctx.textAlign = "left";
//     ctx.fillText(productName.toUpperCase(), 50, productNameY);

//     // Draw product price
//     ctx.font = `${Math.min(height * 0.035, 20)}px Inter`;
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillText(`₦${productPrice.toLocaleString()}`, 50, productNameY + 30);

//     // Draw secondary image (profile picture) - circular, positioned for OG layout
//     const profileSize = Math.min(height * 0.12, 60); // Responsive profile size
//     const profileX = width - 80;
//     const profileY = height - 80;

//     // Create circular clipping path
//     ctx.save();
//     ctx.beginPath();
//     ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2);
//     ctx.clip();

//     // Draw secondary image
//     ctx.drawImage(
//       secondaryImage,
//       profileX - profileSize / 2,
//       profileY - profileSize / 2,
//       profileSize,
//       profileSize
//     );
//     ctx.restore();

//     // Add border around profile image
//     ctx.beginPath();
//     ctx.arc(profileX, profileY, profileSize / 2 + 2, 0, Math.PI * 2);
//     ctx.strokeStyle = "#D4AF37";
//     ctx.lineWidth = 2;
//     ctx.stroke();

//     // Draw name under profile image
//     ctx.font = `${Math.min(height * 0.025, 14)}px Inter`;
//     ctx.fillStyle = "#FFFFFF";
//     ctx.textAlign = "center";
//     ctx.fillText(name, profileX, profileY + profileSize / 2 + 20);

//     // Draw "VERSION 1.0" text
//     ctx.font = `${Math.min(height * 0.02, 12)}px Inter`;
//     ctx.fillStyle = "#888888";
//     ctx.fillText("VERSION 1.0", profileX, height - 20);

//     // Add some decorative elements
//     ctx.strokeStyle = "#D4AF37";
//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     ctx.moveTo(50, titleFontSize + 100);
//     ctx.lineTo(200, titleFontSize + 100);
//     ctx.stroke();

//     // Remove grid pattern overlay since we have the product image as background

//     // Return processed image buffer
//     const processedImageBuffer = canvas.toBuffer("image/png");
//     return {
//       success: true,
//       processedImage: processedImageBuffer,
//     };
//   } catch (error) {
//     console.error("Error creating magazine style card:", error);
//     throw error;
//   }
// }





import {
  createCanvas,
  loadImage,
  CanvasRenderingContext2D as NodeCanvasRenderingContext2D,
} from "canvas";
import { registerFont } from "canvas";
import path from "path";

// Register Inter font
registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Regular.ttf"), {
  family: "Inter",
  weight: "normal",
});

registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Bold.ttf"), {
  family: "Inter",
  weight: "bold",
});

registerFont(path.join(process.cwd(), "lib/assets/fonts/Inter-Medium.ttf"), {
  family: "Inter",
  weight: "500",
});

export async function createMagazineStyleCard({
  primaryImageUrl,
  secondaryImageUrl,
  productName,
  productPrice,
  name,
  dimensions = { width: 1200, height: 630 },
}: any) {
  // Use 2x scale for high DPI rendering
  const scale = 2;
  const width = dimensions.width;
  const height = dimensions.height;

  // Create high-resolution canvas
  const canvas = createCanvas(width * scale, height * scale);
  const ctx = canvas.getContext("2d");

  // Scale context for high DPI
  ctx.scale(scale, scale);

  // Enable high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.quality = "best";
  ctx.patternQuality = "best";
  ctx.textDrawingMode = "path";

  try {
    // Load images
    const [primaryImage, secondaryImage] = await Promise.all([
      loadImage(primaryImageUrl),
      loadImage(secondaryImageUrl),
    ]);

    // Calculate optimal image placement to avoid cropping
    const imageAspectRatio = primaryImage.width / primaryImage.height;
    const canvasAspectRatio = width / height;

    let imageWidth, imageHeight, imageX, imageY;

    if (imageAspectRatio > canvasAspectRatio) {
      // Image is wider - fit to height
      imageHeight = height * 0.85; // Leave space for text overlay
      imageWidth = imageHeight * imageAspectRatio;
      imageX = (width - imageWidth) / 2;
      imageY = height * 0.075; // Top margin
    } else {
      // Image is taller - fit to width
      imageWidth = width * 0.75; // Leave space for side content
      imageHeight = imageWidth / imageAspectRatio;
      imageX = width * 0.25; // Left margin for text
      imageY = (height - imageHeight) / 2;
    }

    // Create gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#1a1a1a");
    bgGradient.addColorStop(0.5, "#2d2d2d");
    bgGradient.addColorStop(1, "#1a1a1a");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle texture overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
    for (let i = 0; i < width; i += 4) {
      for (let j = 0; j < height; j += 4) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }

    // Draw primary image with rounded corners and shadow
    ctx.save();

    // Add drop shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 8;

    // Create rounded rectangle path for modern browsers/Node canvas
    const cornerRadius = 15;
    const roundRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    roundRect(imageX, imageY, imageWidth, imageHeight, cornerRadius);
    ctx.clip();

    // Draw the primary image
    ctx.drawImage(primaryImage, imageX, imageY, imageWidth, imageHeight);
    ctx.restore();

    // Add subtle golden overlay frame
    ctx.save();
    roundRect(imageX, imageY, imageWidth, imageHeight, cornerRadius);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Enhanced typography with better spacing and hierarchy
    // Draw "INSPIRE" text with enhanced styling
    const titleFontSize = Math.min(height * 0.12, 75);
    ctx.font = `900 ${titleFontSize}px Inter`; // Extra bold

    // Create text gradient
    const titleGradient = ctx.createLinearGradient(50, 0, 350, 0);
    titleGradient.addColorStop(0, "#FFD700");
    titleGradient.addColorStop(0.5, "#D4AF37");
    titleGradient.addColorStop(1, "#B8860B");

    ctx.fillStyle = titleGradient;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // Add text shadow for depth
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    ctx.fillText("INSPIRE", 50, 40);

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw "BY PLUGGN" text with enhanced styling
    const subtitleFontSize = Math.min(height * 0.035, 22);
    ctx.font = `500 ${subtitleFontSize}px Inter`;
    ctx.fillStyle = "#C0C0C0";
    ctx.textAlign = "right";
    ctx.fillText("BY PLUGGN", width - 50, 50);

    // Enhanced "NEW" badge with gradient and shadow
    const badgeWidth = 90;
    const badgeHeight = 35;
    const badgeX = 50;
    const badgeY = titleFontSize + 60;

    // Badge shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Badge gradient
    const badgeGradient = ctx.createLinearGradient(
      badgeX,
      badgeY,
      badgeX,
      badgeY + badgeHeight
    );
    badgeGradient.addColorStop(0, "#FFD700");
    badgeGradient.addColorStop(1, "#D4AF37");

    ctx.fillStyle = badgeGradient;
    roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 8);
    ctx.fill();

    // Badge border
    ctx.strokeStyle = "#B8860B";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Badge text
    ctx.font = `bold ${Math.min(height * 0.025, 16)}px Inter`;
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("NEW", badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);

    // Enhanced "ELEVATE YOUR LOOK" text with better positioning
    const elevateFontSize = Math.min(height * 0.08, 48);
    ctx.font = `900 ${elevateFontSize}px Inter`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const elevateTexts = ["ELEVATE", "YOUR", "LOOK"];
    let yOffset = height * 0.35;

    elevateTexts.forEach((text, index) => {
      const textY = yOffset + index * elevateFontSize * 1.2;

      // Outline effect
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 3;
      ctx.strokeText(text, 50, textY);

      // Main text with gradient
      const textGradient = ctx.createLinearGradient(
        50,
        textY,
        50 + ctx.measureText(text).width,
        textY
      );
      textGradient.addColorStop(0, "rgba(212, 175, 55, 0.3)");
      textGradient.addColorStop(1, "rgba(212, 175, 55, 0.1)");

      ctx.fillStyle = textGradient;
      ctx.fillText(text, 50, textY);
    });

    // Enhanced product information section
    const productSectionY = height - 140;

    // Product name with better typography
    ctx.font = `bold ${Math.min(height * 0.04, 26)}px Inter`;
    const productGradient = ctx.createLinearGradient(
      0,
      productSectionY,
      200,
      productSectionY
    );
    productGradient.addColorStop(0, "#FFD700");
    productGradient.addColorStop(1, "#D4AF37");
    ctx.fillStyle = productGradient;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(productName.toUpperCase(), 50, productSectionY);

    // Product price with currency styling
    const priceY = productSectionY + 35;
    ctx.font = `600 ${Math.min(height * 0.032, 18)}px Inter`;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`₦${productPrice.toLocaleString()}`, 50, priceY);

    // Price underline
    const priceWidth = ctx.measureText(
      `₦${productPrice.toLocaleString()}`
    ).width;
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, priceY + 25);
    ctx.lineTo(50 + priceWidth, priceY + 25);
    ctx.stroke();

    // Enhanced profile section
    const profileSize = Math.min(height * 0.1, 65);
    const profileX = width - 90;
    const profileY = height - 90;

    // Profile shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Create circular clipping path for profile
    ctx.save();
    ctx.beginPath();
    ctx.arc(profileX, profileY, profileSize / 2, 0, Math.PI * 2);
    ctx.clip();

    // Draw secondary image
    ctx.drawImage(
      secondaryImage,
      profileX - profileSize / 2,
      profileY - profileSize / 2,
      profileSize,
      profileSize
    );
    ctx.restore();

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Enhanced profile border with gradient
    const profileBorderGradient = ctx.createRadialGradient(
      profileX,
      profileY,
      profileSize / 2 - 2,
      profileX,
      profileY,
      profileSize / 2 + 4
    );
    profileBorderGradient.addColorStop(0, "#FFD700");
    profileBorderGradient.addColorStop(1, "#D4AF37");

    ctx.beginPath();
    ctx.arc(profileX, profileY, profileSize / 2 + 3, 0, Math.PI * 2);
    ctx.strokeStyle = profileBorderGradient;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Enhanced name styling
    ctx.font = `500 ${Math.min(height * 0.022, 14)}px Inter`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(name, profileX, profileY + profileSize / 2 + 15);

    // Version text with better styling
    ctx.font = `400 ${Math.min(height * 0.018, 11)}px Inter`;
    ctx.fillStyle = "#999999";
    ctx.fillText("VERSION 1.0", profileX, height - 25);

    // Enhanced decorative elements
    const decorativeGradient = ctx.createLinearGradient(
      50,
      titleFontSize + 120,
      250,
      titleFontSize + 120
    );
    decorativeGradient.addColorStop(0, "#FFD700");
    decorativeGradient.addColorStop(0.5, "#D4AF37");
    decorativeGradient.addColorStop(1, "rgba(212, 175, 55, 0.2)");

    ctx.strokeStyle = decorativeGradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, titleFontSize + 120);
    ctx.lineTo(250, titleFontSize + 120);
    ctx.stroke();

    // Add small decorative dots
    ctx.fillStyle = "#D4AF37";
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(260 + i * 15, titleFontSize + 120, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Return high-quality processed image buffer
    const processedImageBuffer = canvas.toBuffer("image/png", {
      compressionLevel: 3, // Lower compression for better quality
      resolution: 300, // High DPI
    });

    return {
      success: true,
      processedImage: processedImageBuffer,
    };
  } catch (error) {
    console.error("Error creating magazine style card:", error);
    throw error;
  }
}
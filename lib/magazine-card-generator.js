






"use client"

// Enhanced resource manager with quality tracking
class ResourceManager {
  constructor() {
    this.resources = new Set();
    this.isDisposed = false;
  }

  track(resource) {
    if (!this.isDisposed) {
      this.resources.add(resource);
    }
    return resource;
  }

  dispose() {
    if (this.isDisposed) return;
    
    for (const resource of this.resources) {
      try {
        if (resource.dispose) {
          resource.dispose();
        }
        if (resource instanceof HTMLCanvasElement || resource instanceof CanvasRenderingContext2D) {
          // Clear canvas resources
          if (resource.canvas) {
            const ctx = resource;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          } else {
            const canvas = resource;
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
        if (resource instanceof Image) {
          resource.src = '';
          resource.onload = null;
          resource.onerror = null;
        }
      } catch (error) {
        console.warn("Error disposing resource:", error);
      }
    }
    this.resources.clear();
    this.isDisposed = true;
  }
}

export async function createLuxuryMagazineCard({
  imageUrl,
  productName,
  price,
  sellerName,
  sellerImage, // Changed from sellerInitials to sellerImage
  tagline = "TIMELESS ELEGANCE",
  brandName, // Added brandName prop
  dimensions = { width: 520, height: 755 },
  // Customization options - you can adjust these values
  customization = {
    // Card positioning (0-1 scale)
    headerSpacing: 0.03, // Reduce to move image up, increase to move down
    imageStartY: 0.11,   // Reduce to move image up, increase to move down
    imageHeight: 0.50,   // Reduce to make image smaller, increase to make larger
    
    // Text and element sizes (multipliers)
    titleFontSize: 1.2,    // Reduce to make title smaller
    priceFontSize: 1.5,    // Reduce to make price smaller
    taglineFontSize: 1,  // Reduce to make tagline smaller
    logoSize: 0.17,        // Reduce to make logo smaller
    
    // Background colors (you can modify these)
    cardColors: {
      primary: '#faead7',     // Main card background (more brown)
      secondary: '#f5f0e9',   // Secondary gradient color
      tertiary: '#f2eddd',    // Tertiary gradient color
      accent: '#ede7d6'       // Accent color
    }
  }
}) {
  const { width, height } = dimensions;
  const resourceManager = new ResourceManager();
  
  // Smarter device detection that preserves quality
  const getDeviceCapabilities = () => {
    const ram = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android.*tablet/i.test(navigator.userAgent);
    
    if (ram >= 8 && cores >= 8) {
      return { tier: 'high', maxDimension: 2500, pixelRatio: 2.0 };
    } else if (ram >= 4 && cores >= 4 && !isMobile) {
      return { tier: 'medium', maxDimension: 2000, pixelRatio: 1.8 };
    } else if (isTablet || (ram >= 3 && cores >= 4)) {
      return { tier: 'mobile-high', maxDimension: 1600, pixelRatio: 1.5 };
    } else {
      return { tier: 'mobile-low', maxDimension: 1200, pixelRatio: 1.2 };
    }
  };

  const deviceCaps = getDeviceCapabilities();
  
  // Quality-focused scaling with reasonable limits
  const targetDimension = Math.max(width, height);
  const upscaleFactor = Math.min(3.0, deviceCaps.maxDimension / targetDimension);
  const finalWidth = Math.min(width * upscaleFactor, deviceCaps.maxDimension);
  const finalHeight = Math.min(height * upscaleFactor, deviceCaps.maxDimension);


  let canvas, ctx, productImage, sellerImageElement;

  try {
    // High-quality canvas setup
    canvas = resourceManager.track(document.createElement("canvas"));
    canvas.width = finalWidth;
    canvas.height = finalHeight;
    
    ctx = resourceManager.track(canvas.getContext("2d", { 
      alpha: true,
      desynchronized: true,
      colorSpace: "srgb",
      willReadFrequently: false
    }));
    
    // High-quality rendering settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.textRenderingOptimization = 'optimizeQuality';
    ctx.fontKerning = 'normal';

    // Create background with complex gradient and pattern
    await renderLuxuryBackground(ctx, { finalWidth, finalHeight, deviceCaps, resourceManager, customization });

    // Load and render product image with high quality
    productImage = await loadHighQualityImage(imageUrl, deviceCaps);
    resourceManager.track(productImage);

    // Load seller image
    sellerImageElement = await loadHighQualityImage(sellerImage, deviceCaps);
    resourceManager.track(sellerImageElement);

    // Render the magazine card structure
    await renderMagazineCard(ctx, {
      finalWidth,
      finalHeight,
      productImage,
      sellerImageElement,
      productName,
      price,
      sellerName,
      tagline,
      brandName,
      deviceCaps,
      resourceManager,
      customization
    });

    // High-quality output
    return new Promise((resolve, reject) => {
      // Use PNG for maximum quality on higher-end devices
      const useHighQuality = deviceCaps.tier === 'high' || deviceCaps.tier === 'medium';
      const format = useHighQuality ? "image/png" : "image/jpeg";
      const quality = useHighQuality ? 1.0 : 0.95;
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve({ 
            processedImage: url, 
            quality: deviceCaps.tier,
            dimensions: { width: Math.round(finalWidth), height: Math.round(finalHeight) }
          });
        } else {
          reject(new Error("Failed to create high-quality blob"));
        }
      }, format, quality);
    });

  } catch (error) {
    console.error("Error creating luxury magazine card:", error);
    throw error;
  } finally {
    // Clean shutdown
    await new Promise(resolve => setTimeout(resolve, 100)); // Allow render to complete
    
    resourceManager.dispose();
    
    // Clear references
    canvas = ctx = productImage = sellerImageElement = null;
    
    // Delayed garbage collection
    if (typeof window !== 'undefined' && window.gc) {
      setTimeout(() => window.gc(), 200);
    }
  }
}

// High-quality image loading
async function loadHighQualityImage(imageUrl, deviceCaps) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    const timeout = setTimeout(() => {
      reject(new Error("High-quality image load timeout"));
    }, 15000);

    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("Failed to load high-quality image"));
    };
    
    img.src = imageUrl;
  });
}

// Render luxury background with more brown tones
async function renderLuxuryBackground(ctx, { finalWidth, finalHeight, deviceCaps, resourceManager, customization }) {
  // Create background canvas for complex layering
  const bgCanvas = resourceManager.track(document.createElement("canvas"));
  bgCanvas.width = finalWidth;
  bgCanvas.height = finalHeight;
  const bgCtx = resourceManager.track(bgCanvas.getContext("2d"));
  
  // More brown gradient background using customization colors
  const { cardColors } = customization;
  const gradient = bgCtx.createLinearGradient(0, 0, finalWidth, finalHeight);
  gradient.addColorStop(0, cardColors.primary);
  gradient.addColorStop(0.25, cardColors.secondary);
  gradient.addColorStop(0.5, cardColors.primary);
  gradient.addColorStop(0.75, cardColors.tertiary);
  gradient.addColorStop(1, cardColors.accent);
  
  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, finalWidth, finalHeight);
  
  // Add subtle pattern overlay
  if (deviceCaps.tier !== 'mobile-low') {
    await renderSubtlePattern(bgCtx, { finalWidth, finalHeight });
  }
  
  // Transfer to main canvas
  ctx.drawImage(bgCanvas, 0, 0);
}

// Render subtle background pattern
async function renderSubtlePattern(ctx, { finalWidth, finalHeight }) {
  const patternSize = 100;
  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = patternSize;
  patternCanvas.height = patternSize;
  const patternCtx = patternCanvas.getContext("2d");
  
  // Create subtle dot pattern with brown tones
  patternCtx.fillStyle = 'rgba(139, 115, 85, 0.04)';
  const positions = [
    [11, 18, 7], [59, 43, 7], [16, 36, 3], [79, 67, 3],
    [34, 90, 3], [90, 14, 3], [12, 86, 4], [40, 21, 4],
    [63, 10, 5], [57, 70, 4], [86, 92, 5], [32, 63, 5],
    [89, 50, 5], [80, 29, 2], [60, 91, 2], [35, 41, 2]
  ];
  
  positions.forEach(([x, y, r]) => {
    patternCtx.beginPath();
    patternCtx.arc(x, y, r, 0, 2 * Math.PI);
    patternCtx.fill();
  });
  
  const pattern = ctx.createPattern(patternCanvas, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, finalWidth, finalHeight);
}

// Main magazine card rendering
async function renderMagazineCard(ctx, {
  finalWidth,
  finalHeight,
  productImage,
  sellerImageElement,
  productName,
  price,
  sellerName,
  tagline,
  brandName,
  deviceCaps,
  resourceManager,
  customization
}) {
  // Calculate responsive dimensions
  const cardWidth = finalWidth;
  const cardHeight = finalHeight;
  const cardX = 0;
  const cardY = 0;
  
  // Render card background with gradient and shadow
  await renderCardBackground(ctx, { cardX, cardY, cardWidth, cardHeight, finalWidth, finalHeight, customization });
  
  // Render header section
  await renderHeader(ctx, { cardX, cardY, cardWidth, cardHeight, finalWidth, finalHeight, deviceCaps, customization });
  
  // Render product image (now larger and starts from header space)
  await renderProductImage(ctx, { 
    cardX, cardY, cardWidth, cardHeight, 
    productImage, finalWidth, finalHeight, deviceCaps, customization 
  });
  
  // Render product details
  await renderProductDetails(ctx, {
    cardX, cardY, cardWidth, cardHeight,
    productName, price, tagline,
    finalWidth, finalHeight, deviceCaps, customization
  });
  
  // Render seller section with round image
  await renderSellerSection(ctx, {
    cardX, cardY, cardWidth, cardHeight,
    sellerName, sellerImageElement, brandName,
    finalWidth, finalHeight, deviceCaps
  });
}

// Render card background with more brown luxury styling
async function renderCardBackground(ctx, { cardX, cardY, cardWidth, cardHeight, finalWidth, finalHeight, customization }) {
  // Create complex shadow
  ctx.shadowColor = 'rgba(101, 67, 33, 0.18)'; // More brown shadow
  ctx.shadowBlur = Math.max(8, finalWidth / 100);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.max(4, finalWidth / 200);
  
  // Main card gradient with brown tones
  const { cardColors } = customization;
  const cardGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight);
  cardGradient.addColorStop(0, cardColors.primary);
  cardGradient.addColorStop(0.5, cardColors.secondary);
  cardGradient.addColorStop(1, cardColors.tertiary);
  
  ctx.fillStyle = cardGradient;
  ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  
  // Add subtle border
  ctx.strokeStyle = 'rgba(101, 67, 33, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);
  
  // Add border accent
  const accentGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight);
  accentGradient.addColorStop(0, 'rgba(184, 134, 11, 0.1)');
  accentGradient.addColorStop(0.25, 'transparent');
  accentGradient.addColorStop(0.75, 'transparent');
  accentGradient.addColorStop(1, 'rgba(184, 134, 11, 0.1)');
  
  ctx.strokeStyle = accentGradient;
  ctx.lineWidth = 2;
  ctx.strokeRect(cardX + 1, cardY + 1, cardWidth - 2, cardHeight - 2);
}

// Render header with category badge and your logo
async function renderHeader(ctx, { cardX, cardY, cardWidth, cardHeight, finalWidth, finalHeight, deviceCaps, customization }) {
  const headerY = cardY + cardHeight * customization.headerSpacing;
  const padding = cardWidth * 0.05;
  
  // Category badge
  const badgeX = cardX + padding;
  const badgeY = headerY;
  const badgeWidth = cardWidth * 0.15;
  const badgeHeight = cardHeight * 0.04;
  
  // Badge background
  const badgeGradient = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeHeight);
  badgeGradient.addColorStop(0, 'rgba(184, 134, 11, 0.14)');
  badgeGradient.addColorStop(1, 'rgba(184, 134, 11, 0.1)');
  
  ctx.fillStyle = badgeGradient;
  ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
  
  // Badge border
  ctx.strokeStyle = 'rgba(184, 134, 11, 0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(badgeX, badgeY, badgeWidth, badgeHeight);
  
  // Badge text
  const baseFontSize = Math.max(12, finalWidth / 50);
  ctx.font = `500 ${baseFontSize * 1.2}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#8B7355';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '0.2em';
  ctx.fillText('INSPIRE', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);
  

  const centerY = badgeY + badgeHeight / 2;

// Load and render your logo
try {
  const logoImage = await loadHighQualityImage('/pluggn_logo.png', deviceCaps);
  const logoSize = cardWidth * customization.logoSize;
  const logoX = cardX + cardWidth - padding - logoSize;
  const logoY = centerY - logoSize / 2; // Center the logo vertically
  
  // Draw your logo
  ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
  } catch (error) {
    console.warn('Could not load logo, using fallback');
    // Fallback to text logo if image fails
    const logoSize = cardWidth * customization.logoSize;
    const logoX = cardX + cardWidth - padding - logoSize;
    const logoY = headerY;
    
    // Logo background
    const logoGradient = ctx.createLinearGradient(logoX, logoY, logoX, logoY + logoSize);
    logoGradient.addColorStop(0, '#1a1a1a');
    logoGradient.addColorStop(1, '#2a2a2a');
    
    ctx.fillStyle = logoGradient;
    ctx.fillRect(logoX, logoY, logoSize, logoSize);
    
    // Logo text
    ctx.font = `bold ${baseFontSize * 0.9}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('P', logoX + logoSize / 2, logoY + logoSize / 2);
  }
}

// Render product image with frame (now larger)
async function renderProductImage(ctx, { 
  cardX, cardY, cardWidth, cardHeight, 
  productImage, finalWidth, finalHeight, deviceCaps, customization 
}) {
  const imageY = cardY + cardHeight * customization.imageStartY;
  const padding = cardWidth * 0.05;
  const imageWidth = cardWidth - (padding * 2);
  const imageHeight = cardHeight * customization.imageHeight; // Now customizable and larger
  const imageX = cardX + padding;
  
  // Image frame background
  ctx.fillStyle = '#fefcf9';
  ctx.fillRect(imageX - 2, imageY - 2, imageWidth + 4, imageHeight + 4);
  
  // Image shadow
  ctx.shadowColor = 'rgba(101, 67, 33, 0.14)';
  ctx.shadowBlur = Math.max(6, finalWidth / 150);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.max(2, finalWidth / 300);
  
  // Image frame
  ctx.strokeStyle = 'rgba(101, 67, 33, 0.18)';
  ctx.lineWidth = 1;
  ctx.strokeRect(imageX, imageY, imageWidth, imageHeight);
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  
  // Clip for image
  ctx.save();
  ctx.beginPath();
  ctx.rect(imageX, imageY, imageWidth, imageHeight);
  ctx.clip();
  
  // Draw product image with high quality
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Calculate image scaling to fill frame while maintaining aspect ratio
  const imgAspect = productImage.naturalWidth / productImage.naturalHeight;
  const frameAspect = imageWidth / imageHeight;
  
  let drawWidth, drawHeight, drawX, drawY;
  
  if (imgAspect > frameAspect) {
    // Image is wider than frame
    drawHeight = imageHeight;
    drawWidth = drawHeight * imgAspect;
    drawX = imageX - (drawWidth - imageWidth) / 2;
    drawY = imageY;
  } else {
    // Image is taller than frame
    drawWidth = imageWidth;
    drawHeight = drawWidth / imgAspect;
    drawX = imageX;
    drawY = imageY - (drawHeight - imageHeight) / 2;
  }
  
  ctx.drawImage(productImage, drawX, drawY, drawWidth, drawHeight);
  ctx.restore();
}

// Render product details with customizable typography
async function renderProductDetails(ctx, {
  cardX, cardY, cardWidth, cardHeight,
  productName, price, tagline,
  finalWidth, finalHeight, deviceCaps, customization
}) {
  const detailsY = cardY + cardHeight * (customization.imageStartY + customization.imageHeight + 0.03);
  const padding = cardWidth * 0.05;
  const baseFontSize = Math.max(14, finalWidth / 40);
  
  // Product name
  ctx.font = `300 ${baseFontSize * customization.titleFontSize}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#2c2c2c';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0.02em';
  ctx.fillText(productName, cardX + padding, detailsY);
  
  // Tagline
  ctx.font = `300 ${baseFontSize * customization.taglineFontSize}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#6b5b47';
  ctx.letterSpacing = '0.05em';
  ctx.fillText(tagline, cardX + padding, detailsY + baseFontSize * 2);
  
  // Price with underline
  const priceY = detailsY + baseFontSize * 3.5;
  ctx.font = `300 ${baseFontSize * customization.priceFontSize}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#2c2c2c';
  ctx.letterSpacing = '0.01em';
  ctx.fillText(price, cardX + padding, priceY);
  
  // Price underline
  const priceWidth = ctx.measureText(price).width;
  ctx.strokeStyle = 'rgba(184, 134, 11, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cardX + padding, priceY + baseFontSize * 1.8);
  ctx.lineTo(cardX + padding + priceWidth, priceY + baseFontSize * 1.8);
  ctx.stroke();
}

// Render seller section with round avatar image
async function renderSellerSection(ctx, {
  cardX, cardY, cardWidth, cardHeight,
  sellerName, sellerImageElement, brandName,
  finalWidth, finalHeight, deviceCaps
}) {
  const sellerY = cardY + cardHeight * 0.78;
  const padding = cardWidth * 0.05;
  const baseFontSize = Math.max(12, finalWidth / 45);
  
  // Seller container
  const containerX = cardX + padding;
  const containerY = sellerY;
  const containerWidth = cardWidth - (padding * 2);
  const containerHeight = cardHeight * 0.145; // Increase from 0.12 to 0.16 or higher  
  // Container background with gradient and shadow
  ctx.shadowColor = 'rgba(101, 67, 33, 0.12)';
  ctx.shadowBlur = Math.max(4, finalWidth / 200);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.max(2, finalWidth / 400);
  
  const containerGradient = ctx.createLinearGradient(containerX, containerY, containerX, containerY + containerHeight);
  containerGradient.addColorStop(0, '#fefcf9');
  containerGradient.addColorStop(1, '#fdfbf7');
  
  ctx.fillStyle = containerGradient;
  ctx.fillRect(containerX, containerY, containerWidth, containerHeight);
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  
  // Container border
  ctx.strokeStyle = 'rgba(101, 67, 33, 0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(containerX, containerY, containerWidth, containerHeight);
  
  // Round avatar
  const avatarSize = containerHeight * 0.7;
  const avatarX = containerX + containerHeight * 0.15;
  const avatarY = containerY + (containerHeight - avatarSize) / 2;
  const avatarCenterX = avatarX + avatarSize / 2;
  const avatarCenterY = avatarY + avatarSize / 2;
  const avatarRadius = avatarSize / 2;
  
  // Avatar shadow
  ctx.shadowColor = 'rgba(101, 67, 33, 0.2)';
  ctx.shadowBlur = Math.max(3, finalWidth / 300);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.max(1, finalWidth / 600);
  
  // Draw circular clipping path for avatar
  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, 2 * Math.PI);
  ctx.clip();
  
  // Draw seller image
  ctx.drawImage(sellerImageElement, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  
  // Avatar border
  ctx.strokeStyle = 'rgba(101, 67, 33, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Seller info
  const infoX = avatarX + avatarSize + containerHeight * 0.2;
  const infoY = avatarY + avatarSize * 0.3;
  
  // Seller name
  ctx.font = `500 ${baseFontSize * 1.2}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#2c2c2c';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0.03em';
  ctx.fillText(sellerName, infoX, infoY);
  
  // Curated by brand text
  ctx.font = `300 ${baseFontSize * 1.1}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#8b7355';
  ctx.letterSpacing = '0.05em';
  ctx.fillText(`Curated by ${brandName}`, infoX, infoY + baseFontSize * 1.2);
}
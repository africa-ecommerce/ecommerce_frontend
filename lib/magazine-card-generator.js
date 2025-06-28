// // Enhanced rendering for final card layout refinement

// "use client"
// import * as THREE from "three";

// export async function createEnhancedMagazineCard({
//   primaryImageUrl,
//   secondaryImageUrl,
//   productName,
//   productPrice,
//   creatorName,
//   dimensions,
// }) {
//   const { width, height } = dimensions;

//   // Scene setup
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
//   camera.position.set(0, 0, 5);

//   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//   renderer.setSize(width, height);
//   const canvas = renderer.domElement;

//   // Lighting
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
//   const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
//   directionalLight.position.set(5, 5, 10);
//   scene.add(ambientLight, directionalLight);

//   // Load texture
//   const loader = new THREE.TextureLoader();
//   const texture = await new Promise((resolve) => {
//     loader.load(primaryImageUrl, resolve);
//   });

//   // Magazine Plane (slightly reduced scale for more white space)
//   const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.1);
//   const materials = [
//     new THREE.MeshBasicMaterial({ color: 0xffffff }),
//     new THREE.MeshBasicMaterial({ color: 0xffffff }),
//     new THREE.MeshBasicMaterial({ color: 0xffffff }),
//     new THREE.MeshBasicMaterial({ color: 0xffffff }),
//     new THREE.MeshBasicMaterial({ map: texture }),
//     new THREE.MeshBasicMaterial({ color: 0xf0f0f0 }),
//   ];
//   const magazine = new THREE.Mesh(geometry, materials);
//   magazine.rotation.x = -0.15;
//   magazine.rotation.y = 0.25;
//   scene.add(magazine);

//   renderer.render(scene, camera);

//   const overlayCanvas = document.createElement("canvas");
//   overlayCanvas.width = width;
//   overlayCanvas.height = height;
//   const ctx = overlayCanvas.getContext("2d");


//   ctx.drawImage(renderer.domElement, 0, 0);

//   // INSPIRE
//   ctx.fillStyle = "#523a1e";
//   ctx.font = "bold 112px Georgia, serif";
//   ctx.fillText("INSPIRE", 60, 140);

//   // By PLUGGN - Bigger and bolder
//   ctx.font = "italic bold 32px serif";
//   ctx.fillStyle = "#222";
//   ctx.fillText("By PLUGGN", width - 280, 140);

//   // NEW Badge - slightly larger
//   ctx.fillStyle = "#000";
//   ctx.fillRect(60, 160, 90, 50);
//   ctx.fillStyle = "#fff";
//   ctx.font = "bold 22px sans-serif";
//   ctx.fillText("NEW", 85, 193);

//   // ELEVATE YOUR LOOK - Bigger
//   ctx.fillStyle = "#000";
//   ctx.font = "bold 50px sans-serif";
//   ctx.fillText("ELEVATE", 60, 260);
//   ctx.fillText("YOUR LOOK", 60, 320);

//   // Product Name - Bigger and bolder
//   ctx.font = "bold 32px sans-serif";
//   ctx.fillStyle = "#6d4b28";
//   ctx.fillText(productName.toUpperCase(), 60, 370);

//   // Price box (under product name)
//   ctx.font = "bold 30px sans-serif";
//   ctx.fillStyle = "#000";
  
//   ctx.fillText(`₦${productPrice.toLocaleString()}`, 70, 425);

  
//   ctx.font = "bold 28px sans-serif";
//   ctx.fillText(`CLICK TO BUY`, 70, height - 68);

//   // Circular inset image
//   const insetImg = await new Promise((resolve) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.src = secondaryImageUrl;
//   });
//   const cx = width - 220,
//     cy = height - 190,
//     radius = 100;
//   ctx.save();
//   ctx.beginPath();
//   ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
//   ctx.closePath();
//   ctx.clip();
//   ctx.drawImage(insetImg, cx - radius, cy - radius, radius * 2, radius * 2);
//   ctx.restore();
//   ctx.strokeStyle = "#000";
//   ctx.beginPath();
//   ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
//   ctx.stroke();

//   // Creator & version - Bigger & bolder
//   ctx.font = "bold 26px sans-serif";
//   ctx.fillStyle = "#000";
//   ctx.fillText(creatorName, cx - 80, height - 50);

//   return new Promise((resolve) => {
//     overlayCanvas.toBlob((blob) => {
//       const url = URL.createObjectURL(blob);
//       resolve({ processedImage: url });
//     });
//   });
// }


















// "use client"
// import * as THREE from "three";

// // Enhanced resource manager with quality tracking
// class ResourceManager {
//   constructor() {
//     this.resources = new Set();
//     this.isDisposed = false;
//   }

//   track(resource) {
//     if (!this.isDisposed) {
//       this.resources.add(resource);
//     }
//     return resource;
//   }

//   dispose() {
//     if (this.isDisposed) return;
    
//     for (const resource of this.resources) {
//       try {
//         if (resource.dispose) {
//           resource.dispose();
//         }
//       } catch (error) {
//         console.warn("Error disposing resource:", error);
//       }
//     }
//     this.resources.clear();
//     this.isDisposed = true;
//   }
// }

// export async function createEnhancedMagazineCard({
//   primaryImageUrl,
//   secondaryImageUrl,
//   productName,
//   productPrice,
//   creatorName,
//   dimensions,
// }) {
//   const { width, height } = dimensions;
//   const resourceManager = new ResourceManager();
  
//   // Smarter device detection that preserves quality
//   const getDeviceCapabilities = () => {
//     const ram = navigator.deviceMemory || 4;
//     const cores = navigator.hardwareConcurrency || 4;
//     const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//     const isTablet = /iPad|Android.*tablet/i.test(navigator.userAgent);
    
//     if (ram >= 8 && cores >= 8) {
//       return { tier: 'high', maxDimension: 2500, textureSize: 2048, pixelRatio: 2.0 };
//     } else if (ram >= 4 && cores >= 4 && !isMobile) {
//       return { tier: 'medium', maxDimension: 2000, textureSize: 1536, pixelRatio: 1.8 };
//     } else if (isTablet || (ram >= 3 && cores >= 4)) {
//       return { tier: 'mobile-high', maxDimension: 1600, textureSize: 1024, pixelRatio: 1.5 };
//     } else {
//       return { tier: 'mobile-low', maxDimension: 1200, textureSize: 768, pixelRatio: 1.2 };
//     }
//   };

//   const deviceCaps = getDeviceCapabilities();
  
//   // Quality-focused scaling with reasonable limits
//   const targetDimension = Math.max(width, height);
//   const upscaleFactor = Math.min(3.0, deviceCaps.maxDimension / targetDimension);
//   const finalWidth = Math.min(width * upscaleFactor, deviceCaps.maxDimension);
//   const finalHeight = Math.min(height * upscaleFactor, deviceCaps.maxDimension);

//   console.log(`Device tier: ${deviceCaps.tier}, Final dimensions: ${Math.round(finalWidth)}x${Math.round(finalHeight)}`);

//   let scene, camera, renderer, geometry, materials, magazine, texture, overlayCanvas, ctx;

//   try {
//     // High-quality scene setup
//     scene = resourceManager.track(new THREE.Scene());
//     camera = new THREE.PerspectiveCamera(45, finalWidth / finalHeight, 0.1, 100);
//     camera.position.set(0, 0, 6);

//     // Quality-focused renderer settings
//     renderer = resourceManager.track(new THREE.WebGLRenderer({ 
//       antialias: true, // Always enable for quality
//       alpha: true,
//       preserveDrawingBuffer: true,
//       powerPreference: deviceCaps.tier === 'mobile-low' ? "default" : "high-performance",
//       failIfMajorPerformanceCaveat: false // Allow rendering even on lower-end devices
//     }));
    
//     renderer.setSize(finalWidth, finalHeight);
//     // Quality-focused pixel ratio
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio * deviceCaps.pixelRatio, 3.0));
    
//     // High-quality rendering settings
//     renderer.shadowMap.enabled = false; // Keep disabled for performance
//     renderer.outputColorSpace = THREE.SRGBColorSpace;
//     renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     renderer.toneMappingExposure = 1.0;

//     // Enhanced lighting for better quality
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
//     directionalLight.position.set(5, 5, 10);
    
//     // Add rim light for more dimension
//     const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
//     rimLight.position.set(-5, 0, 5);
    
//     scene.add(ambientLight, directionalLight, rimLight);

//     // High-quality texture loading
//     texture = await loadHighQualityTexture(primaryImageUrl, deviceCaps);
//     resourceManager.track(texture);

//     // Detailed geometry
//     geometry = resourceManager.track(new THREE.BoxGeometry(2.5, 3.5, 0.08));
    
//     // High-quality materials
//     const sideMaterial = resourceManager.track(new THREE.MeshStandardMaterial({ 
//       color: 0xffffff,
//       roughness: 0.8,
//       metalness: 0.1
//     }));
    
//     const frontMaterial = resourceManager.track(new THREE.MeshStandardMaterial({ 
//       map: texture,
//       roughness: 0.6,
//       metalness: 0.2,
//       transparent: false
//     }));
    
//     const backMaterial = resourceManager.track(new THREE.MeshStandardMaterial({ 
//       color: 0xf0f0f0,
//       roughness: 0.9,
//       metalness: 0.0
//     }));

//     materials = [
//       sideMaterial, sideMaterial, sideMaterial, sideMaterial,
//       frontMaterial, backMaterial
//     ];

//     magazine = new THREE.Mesh(geometry, materials);
//     magazine.castShadow = false;
//     magazine.receiveShadow = false;
//     magazine.rotation.x = -0.12;
//     magazine.rotation.y = 0.2;
//     scene.add(magazine);

//     // High-quality render with progressive timeout
//     const maxRenderTime = deviceCaps.tier === 'mobile-low' ? 8000 : 15000;
//     const renderPromise = new Promise((resolve, reject) => {
//       const timeout = setTimeout(() => {
//         reject(new Error("Render timeout - try reducing image size"));
//       }, maxRenderTime);

//       try {
//         renderer.render(scene, camera);
//         clearTimeout(timeout);
//         resolve();
//       } catch (error) {
//         clearTimeout(timeout);
//         reject(error);
//       }
//     });

//     await renderPromise;

//     // High-quality canvas setup
//     overlayCanvas = document.createElement("canvas");
//     overlayCanvas.width = finalWidth;
//     overlayCanvas.height = finalHeight;
//     ctx = overlayCanvas.getContext("2d", { 
//       alpha: true,
//       desynchronized: true,
//       colorSpace: "srgb"
//     });
    
//     // High-quality image smoothing
//     ctx.imageSmoothingEnabled = true;
//     ctx.imageSmoothingQuality = 'high';
    
//     // Clear with white background
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, finalWidth, finalHeight);
    
//     // Draw the 3D scene
//     ctx.drawImage(renderer.domElement, 0, 0);

//     // Add high-quality text overlay
//     await addHighQualityTextOverlay(ctx, {
//       finalWidth,
//       finalHeight,
//       productName,
//       productPrice,
//       creatorName,
//       secondaryImageUrl,
//       deviceTier: deviceCaps.tier
//     });

//     // High-quality output
//     return new Promise((resolve, reject) => {
//       // Use PNG for maximum quality on higher-end devices
//       const useHighQuality = deviceCaps.tier === 'high' || deviceCaps.tier === 'medium';
//       const format = useHighQuality ? "image/png" : "image/jpeg";
//       const quality = useHighQuality ? 1.0 : 0.95;
      
//       overlayCanvas.toBlob((blob) => {
//         if (blob) {
//           const url = URL.createObjectURL(blob);
//           resolve({ 
//             processedImage: url, 
//             quality: deviceCaps.tier,
//             dimensions: { width: Math.round(finalWidth), height: Math.round(finalHeight) }
//           });
//         } else {
//           reject(new Error("Failed to create high-quality blob"));
//         }
//       }, format, quality);
//     });

//   } catch (error) {
//     console.error("Error creating magazine card:", error);
//     throw error;
//   } finally {
//     // Clean shutdown
//     await new Promise(resolve => setTimeout(resolve, 100)); // Allow render to complete
    
//     resourceManager.dispose();
    
//     if (renderer) {
//       try {
//         renderer.dispose();
//         renderer.forceContextLoss();
//         const canvas = renderer.domElement;
//         if (canvas?.parentNode) {
//           canvas.parentNode.removeChild(canvas);
//         }
//       } catch (e) {
//         console.warn("Renderer cleanup error:", e);
//       }
//     }
    
//     if (scene) {
//       scene.clear();
//     }

//     // Clear references
//     scene = camera = renderer = geometry = materials = magazine = texture = null;
//     overlayCanvas = ctx = null;
    
//     // Delayed garbage collection
//     if (typeof window !== 'undefined' && window.gc) {
//       setTimeout(() => window.gc(), 200);
//     }
//   }
// }

// // High-quality texture loading with progressive sizing
// async function loadHighQualityTexture(imageUrl, deviceCaps) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
    
//     const timeout = setTimeout(() => {
//       reject(new Error("High-quality image load timeout"));
//     }, 15000);

//     img.onload = () => {
//       clearTimeout(timeout);
//       try {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
        
//         let { naturalWidth: w, naturalHeight: h } = img;
//         const maxSize = deviceCaps.textureSize;
        
//         // Intelligent resizing that preserves quality
//         if (w > maxSize || h > maxSize) {
//           const scale = Math.min(maxSize / w, maxSize / h);
//           w = Math.floor(w * scale);
//           h = Math.floor(h * scale);
//         }
        
//         canvas.width = w;
//         canvas.height = h;
        
//         // Maximum quality image rendering
//         ctx.imageSmoothingEnabled = true;
//         ctx.imageSmoothingQuality = 'high';
//         ctx.drawImage(img, 0, 0, w, h);
        
//         const loader = new THREE.TextureLoader();
//         const texture = loader.load(canvas.toDataURL('image/png')); // PNG for max quality
        
//         // High-quality texture settings
//         texture.generateMipmaps = true;
//         texture.minFilter = THREE.LinearMipmapLinearFilter;
//         texture.magFilter = THREE.LinearFilter;
//         texture.flipY = false;
//         texture.format = THREE.RGBAFormat;
//         texture.type = THREE.UnsignedByteType;
//         texture.colorSpace = THREE.SRGBColorSpace;
        
//         resolve(texture);
//       } catch (error) {
//         reject(error);
//       }
//     };
    
//     img.onerror = () => {
//       clearTimeout(timeout);
//       reject(new Error("Failed to load high-quality image"));
//     };
    
//     img.src = imageUrl;
//   });
// }

// // High-quality text rendering
// async function addHighQualityTextOverlay(ctx, { 
//   finalWidth, 
//   finalHeight, 
//   productName, 
//   productPrice, 
//   creatorName, 
//   secondaryImageUrl,
//   deviceTier 
// }) {
//   const baseFontSize = Math.max(12, finalWidth / 25);
  
//   // High-quality fonts with fallbacks
//   const fonts = {
//     title: `bold ${baseFontSize * 3.5}px "Georgia", "Times New Roman", serif`,
//     subtitle: `italic bold ${baseFontSize}px "Georgia", "Times New Roman", serif`,
//     body: `bold ${baseFontSize * 1.6}px "Helvetica Neue", "Arial", sans-serif`,
//     product: `bold ${baseFontSize * 1.1}px "Helvetica Neue", "Arial", sans-serif`,
//     price: `bold ${baseFontSize}px "Helvetica Neue", "Arial", sans-serif`,
//     small: `bold ${baseFontSize * 0.7}px "Helvetica Neue", "Arial", sans-serif`,
//     cta: `bold ${baseFontSize * 0.9}px "Helvetica Neue", "Arial", sans-serif`
//   };

//   // Enable high-quality text rendering
//   ctx.textRenderingOptimization = 'optimizeQuality';
//   ctx.fontKerning = 'normal';

//   // Main title with shadow for depth
//   ctx.fillStyle = "#523a1e";
//   ctx.font = fonts.title;
//   ctx.textBaseline = "top";
  
//   // Add subtle text shadow
//   ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
//   ctx.shadowBlur = 2;
//   ctx.shadowOffsetX = 1;
//   ctx.shadowOffsetY = 1;
//   ctx.fillText("INSPIRE", finalWidth * 0.06, finalHeight * 0.08);
//   ctx.shadowColor = 'transparent';

//   // Subtitle
//   ctx.font = fonts.subtitle;
//   ctx.fillStyle = "#222";
//   ctx.textAlign = "right";
//   ctx.fillText("By PLUGGN", finalWidth * 0.94, finalHeight * 0.08);
//   ctx.textAlign = "left";

//   // High-quality NEW badge with gradient
//   const badgeX = finalWidth * 0.06;
//   const badgeY = finalHeight * 0.11;
//   const badgeW = finalWidth * 0.08;
//   const badgeH = finalHeight * 0.035;
  
//   // Gradient background
//   const gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeH);
//   gradient.addColorStop(0, '#333');
//   gradient.addColorStop(1, '#000');
//   ctx.fillStyle = gradient;
//   ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
  
//   ctx.fillStyle = "#fff";
//   ctx.font = fonts.small;
//   ctx.textAlign = "center";
//   ctx.fillText("NEW", badgeX + badgeW/2, badgeY + badgeH * 0.3);
//   ctx.textAlign = "left";

//   // Main text with enhanced styling
//   ctx.fillStyle = "#000";
//   ctx.font = fonts.body;
//   ctx.fillText("ELEVATE", finalWidth * 0.06, finalHeight * 0.18);
//   ctx.fillText("YOUR LOOK", finalWidth * 0.06, finalHeight * 0.22);

//   // Product name with better truncation
//   ctx.font = fonts.product;
//   ctx.fillStyle = "#6d4b28";
//   const maxNameLength = deviceTier === 'mobile-low' ? 16 : 20;
//   const truncatedName = productName.length > maxNameLength ? 
//     productName.substring(0, maxNameLength) + "..." : productName;
//   ctx.fillText(truncatedName.toUpperCase(), finalWidth * 0.06, finalHeight * 0.27);

//   // Price with better formatting
//   ctx.font = fonts.price;
//   ctx.fillStyle = "#000";
//   ctx.fillText(`₦${productPrice.toLocaleString()}`, finalWidth * 0.07, finalHeight * 0.31);

//   // Call to action
//   ctx.font = fonts.cta;
//   ctx.fillText("CLICK TO BUY", finalWidth * 0.07, finalHeight * 0.88);

//   // High-quality circular inset image
//   try {
//     const timeoutDuration = deviceTier === 'mobile-low' ? 3000 : 5000;
//     const insetImg = await Promise.race([
//       loadSecondaryImageHQ(secondaryImageUrl),
//       new Promise((_, reject) => setTimeout(() => reject(new Error("Secondary image timeout")), timeoutDuration))
//     ]);

//     if (insetImg) {
//       const cx = finalWidth * 0.85;
//       const cy = finalHeight * 0.82;
//       const radius = finalWidth * 0.08;
      
//       // High-quality circular clipping
//       ctx.save();
//       ctx.beginPath();
//       ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
//       ctx.closePath();
//       ctx.clip();
      
//       // Enable high-quality image rendering
//       ctx.imageSmoothingEnabled = true;
//       ctx.imageSmoothingQuality = 'high';
//       ctx.drawImage(insetImg, cx - radius, cy - radius, radius * 2, radius * 2);
//       ctx.restore();
      
//       // High-quality border
//       ctx.strokeStyle = "#000";
//       ctx.lineWidth = 2;
//       ctx.beginPath();
//       ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
//       ctx.stroke();

//       // Creator name with better positioning
//       ctx.font = fonts.small;
//       ctx.fillStyle = "#000";
//       ctx.textAlign = "center";
//       ctx.fillText(creatorName, cx, finalHeight * 0.95);
//     }
//   } catch (error) {
//     console.warn("Failed to load secondary image:", error);
//   }
// }

// // High-quality secondary image loading
// function loadSecondaryImageHQ(imageUrl) {
//   return new Promise((resolve, reject) => {
//     if (!imageUrl) {
//       resolve(null);
//       return;
//     }
    
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.onerror = () => resolve(null);
//     img.src = imageUrl;
//   });
// }


















































// "use client"

// // Enhanced resource manager with quality tracking
// class ResourceManager {
//   constructor() {
//     this.resources = new Set();
//     this.isDisposed = false;
//   }

//   track(resource) {
//     if (!this.isDisposed) {
//       this.resources.add(resource);
//     }
//     return resource;
//   }

//   dispose() {
//     if (this.isDisposed) return;
    
//     for (const resource of this.resources) {
//       try {
//         if (resource.dispose) {
//           resource.dispose();
//         }
//         if (resource instanceof HTMLCanvasElement || resource instanceof CanvasRenderingContext2D) {
//           // Clear canvas resources
//           if (resource.canvas) {
//             const ctx = resource;
//             ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//           } else {
//             const canvas = resource;
//             const ctx = canvas.getContext('2d');
//             if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
//           }
//         }
//         if (resource instanceof Image) {
//           resource.src = '';
//           resource.onload = null;
//           resource.onerror = null;
//         }
//       } catch (error) {
//         console.warn("Error disposing resource:", error);
//       }
//     }
//     this.resources.clear();
//     this.isDisposed = true;
//   }
// }

// export async function createLuxuryMagazineCard({
//   imageUrl = "https://salescabal.s3.eu-west-3.amazonaws.com/stores/187287/products/e36c2c3d0765ad0f77127d2b9552c3794a1b37e9.jpeg",
//   productName = "LUXURY ESSENCE",
//   price = "₦299,000",
//   sellerName = "SOPHIA CHEN",
//   sellerInitials = "SC",
//   tagline = "TIMELESS ELEGANCE",
//   dimensions = { width: 560, height: 750 }
// }) {
//   const { width, height } = dimensions;
//   const resourceManager = new ResourceManager();
  
//   // Smarter device detection that preserves quality
//   const getDeviceCapabilities = () => {
//     const ram = navigator.deviceMemory || 4;
//     const cores = navigator.hardwareConcurrency || 4;
//     const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//     const isTablet = /iPad|Android.*tablet/i.test(navigator.userAgent);
    
//     if (ram >= 8 && cores >= 8) {
//       return { tier: 'high', maxDimension: 2500, pixelRatio: 2.0 };
//     } else if (ram >= 4 && cores >= 4 && !isMobile) {
//       return { tier: 'medium', maxDimension: 2000, pixelRatio: 1.8 };
//     } else if (isTablet || (ram >= 3 && cores >= 4)) {
//       return { tier: 'mobile-high', maxDimension: 1600, pixelRatio: 1.5 };
//     } else {
//       return { tier: 'mobile-low', maxDimension: 1200, pixelRatio: 1.2 };
//     }
//   };

//   const deviceCaps = getDeviceCapabilities();
  
//   // Quality-focused scaling with reasonable limits
//   const targetDimension = Math.max(width, height);
//   const upscaleFactor = Math.min(3.0, deviceCaps.maxDimension / targetDimension);
//   const finalWidth = Math.min(width * upscaleFactor, deviceCaps.maxDimension);
//   const finalHeight = Math.min(height * upscaleFactor, deviceCaps.maxDimension);

//   console.log(`Device tier: ${deviceCaps.tier}, Final dimensions: ${Math.round(finalWidth)}x${Math.round(finalHeight)}`);

//   let canvas, ctx, productImage, backgroundCanvas, backgroundCtx;

//   try {
//     // High-quality canvas setup
//     canvas = resourceManager.track(document.createElement("canvas"));
//     canvas.width = finalWidth;
//     canvas.height = finalHeight;
    
//     ctx = resourceManager.track(canvas.getContext("2d", { 
//       alpha: true,
//       desynchronized: true,
//       colorSpace: "srgb",
//       willReadFrequently: false
//     }));
    
//     // High-quality rendering settings
//     ctx.imageSmoothingEnabled = true;
//     ctx.imageSmoothingQuality = 'high';
//     ctx.textRenderingOptimization = 'optimizeQuality';
//     ctx.fontKerning = 'normal';

//     // Create background with complex gradient and pattern
//     await renderLuxuryBackground(ctx, { finalWidth, finalHeight, deviceCaps, resourceManager });

//     // Load and render product image with high quality
//     productImage = await loadHighQualityImage(imageUrl, deviceCaps);
//     resourceManager.track(productImage);

//     // Render the magazine card structure
//     await renderMagazineCard(ctx, {
//       finalWidth,
//       finalHeight,
//       productImage,
//       productName,
//       price,
//       sellerName,
//       sellerInitials,
//       tagline,
//       deviceCaps,
//       resourceManager
//     });

//     // High-quality output
//     return new Promise((resolve, reject) => {
//       // Use PNG for maximum quality on higher-end devices
//       const useHighQuality = deviceCaps.tier === 'high' || deviceCaps.tier === 'medium';
//       const format = useHighQuality ? "image/png" : "image/jpeg";
//       const quality = useHighQuality ? 1.0 : 0.95;
      
//       canvas.toBlob((blob) => {
//         if (blob) {
//           const url = URL.createObjectURL(blob);
//           resolve({ 
//             processedImage: url, 
//             quality: deviceCaps.tier,
//             dimensions: { width: Math.round(finalWidth), height: Math.round(finalHeight) }
//           });
//         } else {
//           reject(new Error("Failed to create high-quality blob"));
//         }
//       }, format, quality);
//     });

//   } catch (error) {
//     console.error("Error creating luxury magazine card:", error);
//     throw error;
//   } finally {
//     // Clean shutdown
//     await new Promise(resolve => setTimeout(resolve, 100)); // Allow render to complete
    
//     resourceManager.dispose();
    
//     // Clear references
//     canvas = ctx = productImage = backgroundCanvas = backgroundCtx = null;
    
//     // Delayed garbage collection
//     if (typeof window !== 'undefined' && window.gc) {
//       setTimeout(() => window.gc(), 200);
//     }
//   }
// }

// // High-quality image loading
// async function loadHighQualityImage(imageUrl, deviceCaps) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
    
//     const timeout = setTimeout(() => {
//       reject(new Error("High-quality image load timeout"));
//     }, 15000);

//     img.onload = () => {
//       clearTimeout(timeout);
//       resolve(img);
//     };
    
//     img.onerror = () => {
//       clearTimeout(timeout);
//       reject(new Error("Failed to load high-quality image"));
//     };
    
//     img.src = imageUrl;
//   });
// }

// // Render luxury background with complex gradients and patterns
// async function renderLuxuryBackground(ctx, { finalWidth, finalHeight, deviceCaps, resourceManager }) {
//   // Create background canvas for complex layering
//   const bgCanvas = resourceManager.track(document.createElement("canvas"));
//   bgCanvas.width = finalWidth;
//   bgCanvas.height = finalHeight;
//   const bgCtx = resourceManager.track(bgCanvas.getContext("2d"));
  
//   // High-quality gradient background
//   const gradient = bgCtx.createLinearGradient(0, 0, finalWidth, finalHeight);
//   gradient.addColorStop(0, '#faf8f5');
//   gradient.addColorStop(0.25, '#f5f2ed');
//   gradient.addColorStop(0.5, '#f8f5f0');
//   gradient.addColorStop(0.75, '#f3f0eb');
//   gradient.addColorStop(1, '#faf7f2');
  
//   bgCtx.fillStyle = gradient;
//   bgCtx.fillRect(0, 0, finalWidth, finalHeight);
  
//   // Add subtle pattern overlay
//   if (deviceCaps.tier !== 'mobile-low') {
//     await renderSubtlePattern(bgCtx, { finalWidth, finalHeight });
//   }
  
//   // Transfer to main canvas
//   ctx.drawImage(bgCanvas, 0, 0);
// }

// // Render subtle background pattern
// async function renderSubtlePattern(ctx, { finalWidth, finalHeight }) {
//   const patternSize = 100;
//   const patternCanvas = document.createElement("canvas");
//   patternCanvas.width = patternSize;
//   patternCanvas.height = patternSize;
//   const patternCtx = patternCanvas.getContext("2d");
  
//   // Create subtle dot pattern
//   patternCtx.fillStyle = 'rgba(232, 227, 219, 0.03)';
//   const positions = [
//     [11, 18, 7], [59, 43, 7], [16, 36, 3], [79, 67, 3],
//     [34, 90, 3], [90, 14, 3], [12, 86, 4], [40, 21, 4],
//     [63, 10, 5], [57, 70, 4], [86, 92, 5], [32, 63, 5],
//     [89, 50, 5], [80, 29, 2], [60, 91, 2], [35, 41, 2]
//   ];
  
//   positions.forEach(([x, y, r]) => {
//     patternCtx.beginPath();
//     patternCtx.arc(x, y, r, 0, 2 * Math.PI);
//     patternCtx.fill();
//   });
  
//   const pattern = ctx.createPattern(patternCanvas, 'repeat');
//   ctx.fillStyle = pattern;
//   ctx.fillRect(0, 0, finalWidth, finalHeight);
// }

// // Main magazine card rendering
// async function renderMagazineCard(ctx, {
//   finalWidth,
//   finalHeight,
//   productImage,
//   productName,
//   price,
//   sellerName,
//   sellerInitials,
//   tagline,
//   deviceCaps,
//   resourceManager
// }) {
//   // Calculate responsive dimensions
//   const cardWidth = finalWidth;
//   const cardHeight = finalHeight;
//   const cardX = 0;
//   const cardY = 0;
  
//   // Render card background with gradient and shadow
//   await renderCardBackground(ctx, { cardX, cardY, cardWidth, cardHeight, finalWidth, finalHeight });
  
//   // Render header section
//   await renderHeader(ctx, { cardX, cardY, cardWidth, cardHeight, finalWidth, finalHeight, deviceCaps });
  
//   // Render product image
//   await renderProductImage(ctx, { 
//     cardX, cardY, cardWidth, cardHeight, 
//     productImage, finalWidth, finalHeight, deviceCaps 
//   });
  
//   // Render product details
//   await renderProductDetails(ctx, {
//     cardX, cardY, cardWidth, cardHeight,
//     productName, price, tagline,
//     finalWidth, finalHeight, deviceCaps
//   });
  
//   // Render seller section
//   await renderSellerSection(ctx, {
//     cardX, cardY, cardWidth, cardHeight,
//     sellerName, sellerInitials,
//     finalWidth, finalHeight, deviceCaps
//   });
// }

// // Render card background with luxury styling
// async function renderCardBackground(ctx, { cardX, cardY, cardWidth, cardHeight, finalWidth, finalHeight }) {
//   // Create complex shadow
//   ctx.shadowColor = 'rgba(139, 115, 85, 0.16)';
//   ctx.shadowBlur = Math.max(8, finalWidth / 100);
//   ctx.shadowOffsetX = 0;
//   ctx.shadowOffsetY = Math.max(4, finalWidth / 200);
  
//   // Main card gradient
//   const cardGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight);
//   cardGradient.addColorStop(0, '#fefcf9');
//   cardGradient.addColorStop(0.5, '#fdfbf7');
//   cardGradient.addColorStop(1, '#fcfaf6');
  
//   ctx.fillStyle = cardGradient;
//   ctx.fillRect(cardX, cardY, cardWidth, cardHeight);
  
//   // Reset shadow
//   ctx.shadowColor = 'transparent';
  
//   // Add subtle border
//   ctx.strokeStyle = 'rgba(139, 115, 85, 0.1)';
//   ctx.lineWidth = 1;
//   ctx.strokeRect(cardX, cardY, cardWidth, cardHeight);
  
//   // Add border accent
//   const accentGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight);
//   accentGradient.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
//   accentGradient.addColorStop(0.25, 'transparent');
//   accentGradient.addColorStop(0.75, 'transparent');
//   accentGradient.addColorStop(1, 'rgba(212, 175, 55, 0.08)');
  
//   ctx.strokeStyle = accentGradient;
//   ctx.lineWidth = 2;
//   ctx.strokeRect(cardX + 1, cardY + 1, cardWidth - 2, cardHeight - 2);
// }

// // Render header with category badge and logo
// async function renderHeader(ctx, { cardX, cardY, cardWidth, cardHeight, finalWidth, finalHeight, deviceCaps }) {
//   const headerY = cardY + cardHeight * 0.08;
//   const padding = cardWidth * 0.05;
  
//   // Category badge
//   const badgeX = cardX + padding;
//   const badgeY = headerY;
//   const badgeWidth = cardWidth * 0.15;
//   const badgeHeight = cardHeight * 0.04;
  
//   // Badge background
//   const badgeGradient = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeHeight);
//   badgeGradient.addColorStop(0, 'rgba(212, 175, 55, 0.12)');
//   badgeGradient.addColorStop(1, 'rgba(212, 175, 55, 0.08)');
  
//   ctx.fillStyle = badgeGradient;
//   ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
  
//   // Badge border
//   ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
//   ctx.lineWidth = 1;
//   ctx.strokeRect(badgeX, badgeY, badgeWidth, badgeHeight);
  
//   // Badge text
//   const baseFontSize = Math.max(12, finalWidth / 50);
//   ctx.font = `500 ${baseFontSize * 1.1}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
//   ctx.fillStyle = '#8B7355';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.letterSpacing = '0.2em';
//   ctx.fillText('INSPIRE', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);
  
//   // Pluggn logo
//   const logoSize = cardWidth * 0.06;
//   const logoX = cardX + cardWidth - padding - logoSize;
//   const logoY = headerY;
  
//   // Logo background
//   const logoGradient = ctx.createLinearGradient(logoX, logoY, logoX, logoY + logoSize);
//   logoGradient.addColorStop(0, '#1a1a1a');
//   logoGradient.addColorStop(1, '#2a2a2a');
  
//   ctx.fillStyle = logoGradient;
//   ctx.fillRect(logoX, logoY, logoSize, logoSize);
  
//   // Logo text
//   ctx.font = `bold ${baseFontSize * 0.9}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
//   ctx.fillStyle = '#ffffff';
//   ctx.textAlign = 'center';
//   ctx.fillText('P', logoX + logoSize / 2, logoY + logoSize / 2);
// }

// // Render product image with frame
// async function renderProductImage(ctx, { 
//   cardX, cardY, cardWidth, cardHeight, 
//   productImage, finalWidth, finalHeight, deviceCaps 
// }) {
//   const imageY = cardY + cardHeight * 0.18;
//   const padding = cardWidth * 0.05;
//   const imageWidth = cardWidth - (padding * 2);
//   const imageHeight = imageWidth * 0.75; // 4:3 aspect ratio
//   const imageX = cardX + padding;
  
//   // Image frame background
//   ctx.fillStyle = '#fefcf9';
//   ctx.fillRect(imageX - 2, imageY - 2, imageWidth + 4, imageHeight + 4);
  
//   // Image shadow
//   ctx.shadowColor = 'rgba(139, 115, 85, 0.12)';
//   ctx.shadowBlur = Math.max(6, finalWidth / 150);
//   ctx.shadowOffsetX = 0;
//   ctx.shadowOffsetY = Math.max(2, finalWidth / 300);
  
//   // Image frame
//   ctx.strokeStyle = 'rgba(139, 115, 85, 0.15)';
//   ctx.lineWidth = 1;
//   ctx.strokeRect(imageX, imageY, imageWidth, imageHeight);
  
//   // Reset shadow
//   ctx.shadowColor = 'transparent';
  
//   // Clip for image
//   ctx.save();
//   ctx.beginPath();
//   ctx.rect(imageX, imageY, imageWidth, imageHeight);
//   ctx.clip();
  
//   // Draw product image with high quality
//   ctx.imageSmoothingEnabled = true;
//   ctx.imageSmoothingQuality = 'high';
  
//   // Calculate image scaling to fill frame while maintaining aspect ratio
//   const imgAspect = productImage.naturalWidth / productImage.naturalHeight;
//   const frameAspect = imageWidth / imageHeight;
  
//   let drawWidth, drawHeight, drawX, drawY;
  
//   if (imgAspect > frameAspect) {
//     // Image is wider than frame
//     drawHeight = imageHeight;
//     drawWidth = drawHeight * imgAspect;
//     drawX = imageX - (drawWidth - imageWidth) / 2;
//     drawY = imageY;
//   } else {
//     // Image is taller than frame
//     drawWidth = imageWidth;
//     drawHeight = drawWidth / imgAspect;
//     drawX = imageX;
//     drawY = imageY - (drawHeight - imageHeight) / 2;
//   }
  
//   ctx.drawImage(productImage, drawX, drawY, drawWidth, drawHeight);
//   ctx.restore();
// }

// // Render product details with luxury typography
// async function renderProductDetails(ctx, {
//   cardX, cardY, cardWidth, cardHeight,
//   productName, price, tagline,
//   finalWidth, finalHeight, deviceCaps
// }) {
//   const detailsY = cardY + cardHeight *  0.69;
//   const padding = cardWidth * 0.05;
//   const baseFontSize = Math.max(14, finalWidth / 40);
  
//   // Product name
//   ctx.font = `300 ${baseFontSize * 1.4}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
//   ctx.fillStyle = '#2c2c2c';
//   ctx.textAlign = 'left';
//   ctx.textBaseline = 'top';
//   ctx.letterSpacing = '0.02em';
//   ctx.fillText(productName, cardX + padding, detailsY);
  
//   // Tagline
//   ctx.font = `300 ${baseFontSize * 0.9}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
//   ctx.fillStyle = '#6b5b47';
//   ctx.letterSpacing = '0.05em';
//   ctx.fillText(tagline, cardX + padding, detailsY + baseFontSize * 2);
  
//   // Price with underline
//   const priceY = detailsY + baseFontSize * 3.5;
//   ctx.font = `300 ${baseFontSize * 1.6}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
//   ctx.fillStyle = '#2c2c2c';
//   ctx.letterSpacing = '0.01em';
//   ctx.fillText(price, cardX + padding, priceY);
  
//   // Price underline
//   const priceWidth = ctx.measureText(price).width;
//   ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
//   ctx.lineWidth = 1;
//   ctx.beginPath();
//   ctx.moveTo(cardX + padding, priceY + baseFontSize * 1.8);
//   ctx.lineTo(cardX + padding + priceWidth, priceY + baseFontSize * 1.8);
//   ctx.stroke();
// }

// // Render seller section with avatar and details
// async function renderSellerSection(ctx, {
//   cardX, cardY, cardWidth, cardHeight,
//   sellerName, sellerInitials,
//   finalWidth, finalHeight, deviceCaps
// }) {
//   const sellerY = cardY + cardHeight * 0.83;
//   const padding = cardWidth * 0.05;
//   const baseFontSize = Math.max(12, finalWidth / 45);
  
//   // Seller container
//   const containerX = cardX + padding;
//   const containerY = sellerY;
//   const containerWidth = cardWidth - (padding * 2);
//   const containerHeight = cardHeight * 0.12;
  
//   // Container background with gradient and shadow
//   ctx.shadowColor = 'rgba(139, 115, 85, 0.1)';
//   ctx.shadowBlur = Math.max(4, finalWidth / 200);
//   ctx.shadowOffsetX = 0;
//   ctx.shadowOffsetY = Math.max(2, finalWidth / 400);
  
//   const containerGradient = ctx.createLinearGradient(containerX, containerY, containerX, containerY + containerHeight);
//   containerGradient.addColorStop(0, '#fefcf9');
//   containerGradient.addColorStop(1, '#fdfbf7');
  
//   ctx.fillStyle = containerGradient;
//   ctx.fillRect(containerX, containerY, containerWidth, containerHeight);
  
//   // Reset shadow
//   ctx.shadowColor = 'transparent';
  
//   // Container border
//   ctx.strokeStyle = 'rgba(139, 115, 85, 0.12)';
//   ctx.lineWidth = 1;
//   ctx.strokeRect(containerX, containerY, containerWidth, containerHeight);
  
//   // Avatar
//   const avatarSize = containerHeight * 0.7;
//   const avatarX = containerX + containerHeight * 0.15;
//   const avatarY = containerY + (containerHeight - avatarSize) / 2;
  
//   // Avatar background with gradient
//   const avatarGradient = ctx.createLinearGradient(avatarX, avatarY, avatarX, avatarY + avatarSize);
//   avatarGradient.addColorStop(0, '#10b981');
//   avatarGradient.addColorStop(1, '#059669');
  
//   ctx.fillStyle = avatarGradient;
//   ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
  
//   // Avatar shadow
//   ctx.shadowColor = 'rgba(16, 185, 129, 0.25)';
//   ctx.shadowBlur = Math.max(3, finalWidth / 300);
//   ctx.shadowOffsetX = 0;
//   ctx.shadowOffsetY = Math.max(1, finalWidth / 600);
//   ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
//   ctx.shadowColor = 'transparent';
  
//   // Avatar text
//   ctx.font = `500 ${baseFontSize * 1.1}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
//   ctx.fillStyle = '#ffffff';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.letterSpacing = '0.05em';
//   ctx.fillText(sellerInitials, avatarX + avatarSize / 2, avatarY + avatarSize / 2);
  
//   // Seller info
//   const infoX = avatarX + avatarSize + containerHeight * 0.2;
//   const infoY = avatarY + avatarSize * 0.3;
  
//   // Seller name
//   ctx.font = `500 ${baseFontSize * 1}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
//   ctx.fillStyle = '#2c2c2c';
//   ctx.textAlign = 'left';
//   ctx.textBaseline = 'top';
//   ctx.letterSpacing = '0.03em';
//   ctx.fillText(sellerName, infoX, infoY);
  
//   // Curated by text
//   ctx.font = `300 ${baseFontSize * 0.9}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
//   ctx.fillStyle = '#8b7355';
//   ctx.letterSpacing = '0.05em';
//   ctx.fillText('Curated by Pluggn', infoX, infoY + baseFontSize * 1.2);
// }









































































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
  imageUrl = "https://salescabal.s3.eu-west-3.amazonaws.com/stores/187287/products/e36c2c3d0765ad0f77127d2b9552c3794a1b37e9.jpeg",
  productName = "LUXURY ESSENCE",
  price = "₦299,000",
  sellerName = "SOPHIA CHEN",
  sellerImage = "/placeholder.svg", // Changed from sellerInitials to sellerImage
  tagline = "TIMELESS ELEGANCE",
  brandName = "pluggn", // Added brandName prop
  dimensions = { width: 530, height: 800 },
  // Customization options - you can adjust these values
  customization = {
    // Card positioning (0-1 scale)
    headerSpacing: 0.04, // Reduce to move image up, increase to move down
    imageStartY: 0.11,   // Reduce to move image up, increase to move down
    imageHeight: 0.55,   // Reduce to make image smaller, increase to make larger
    
    // Text and element sizes (multipliers)
    titleFontSize: 1.4,    // Reduce to make title smaller
    priceFontSize: 1.6,    // Reduce to make price smaller
    taglineFontSize: 0.9,  // Reduce to make tagline smaller
    logoSize: 0.18,        // Reduce to make logo smaller
    
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

  console.log(`Device tier: ${deviceCaps.tier}, Final dimensions: ${Math.round(finalWidth)}x${Math.round(finalHeight)}`);

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
  ctx.font = `500 ${baseFontSize * 1.5}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#8B7355';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '0.2em';
  ctx.fillText('INSPIRE', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);
  
  // Load and render your logo
  // try {
  //   const logoImage = await loadHighQualityImage('/pluggn_logo.png', deviceCaps);
  //   const logoSize = cardWidth * customization.logoSize;
  //   const logoX = cardX + cardWidth - padding - logoSize;
  //   const logoY = headerY;
    
  //   // Draw your logo
  //   ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
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
  const sellerY = cardY + cardHeight * 0.86;
  const padding = cardWidth * 0.05;
  const baseFontSize = Math.max(12, finalWidth / 45);
  
  // Seller container
  const containerX = cardX + padding;
  const containerY = sellerY;
  const containerWidth = cardWidth - (padding * 2);
  const containerHeight = cardHeight * 0.12;
  
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
  ctx.font = `500 ${baseFontSize * 0.9}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#2c2c2c';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0.03em';
  ctx.fillText(sellerName, infoX, infoY);
  
  // Curated by brand text
  ctx.font = `300 ${baseFontSize * 0.8}px "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = '#8b7355';
  ctx.letterSpacing = '0.05em';
  ctx.fillText(`Curated by ${brandName}`, infoX, infoY + baseFontSize * 1.2);
}
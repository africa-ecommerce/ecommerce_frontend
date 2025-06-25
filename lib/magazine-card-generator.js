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


















"use client"
import * as THREE from "three";

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
      } catch (error) {
        console.warn("Error disposing resource:", error);
      }
    }
    this.resources.clear();
    this.isDisposed = true;
  }
}

export async function createEnhancedMagazineCard({
  primaryImageUrl,
  secondaryImageUrl,
  productName,
  productPrice,
  creatorName,
  dimensions,
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
      return { tier: 'high', maxDimension: 2500, textureSize: 2048, pixelRatio: 2.0 };
    } else if (ram >= 4 && cores >= 4 && !isMobile) {
      return { tier: 'medium', maxDimension: 2000, textureSize: 1536, pixelRatio: 1.8 };
    } else if (isTablet || (ram >= 3 && cores >= 4)) {
      return { tier: 'mobile-high', maxDimension: 1600, textureSize: 1024, pixelRatio: 1.5 };
    } else {
      return { tier: 'mobile-low', maxDimension: 1200, textureSize: 768, pixelRatio: 1.2 };
    }
  };

  const deviceCaps = getDeviceCapabilities();
  
  // Quality-focused scaling with reasonable limits
  const targetDimension = Math.max(width, height);
  const upscaleFactor = Math.min(3.0, deviceCaps.maxDimension / targetDimension);
  const finalWidth = Math.min(width * upscaleFactor, deviceCaps.maxDimension);
  const finalHeight = Math.min(height * upscaleFactor, deviceCaps.maxDimension);

  console.log(`Device tier: ${deviceCaps.tier}, Final dimensions: ${Math.round(finalWidth)}x${Math.round(finalHeight)}`);

  let scene, camera, renderer, geometry, materials, magazine, texture, overlayCanvas, ctx;

  try {
    // High-quality scene setup
    scene = resourceManager.track(new THREE.Scene());
    camera = new THREE.PerspectiveCamera(45, finalWidth / finalHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Quality-focused renderer settings
    renderer = resourceManager.track(new THREE.WebGLRenderer({ 
      antialias: true, // Always enable for quality
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: deviceCaps.tier === 'mobile-low' ? "default" : "high-performance",
      failIfMajorPerformanceCaveat: false // Allow rendering even on lower-end devices
    }));
    
    renderer.setSize(finalWidth, finalHeight);
    // Quality-focused pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * deviceCaps.pixelRatio, 3.0));
    
    // High-quality rendering settings
    renderer.shadowMap.enabled = false; // Keep disabled for performance
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Enhanced lighting for better quality
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 10);
    
    // Add rim light for more dimension
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(-5, 0, 5);
    
    scene.add(ambientLight, directionalLight, rimLight);

    // High-quality texture loading
    texture = await loadHighQualityTexture(primaryImageUrl, deviceCaps);
    resourceManager.track(texture);

    // Detailed geometry
    geometry = resourceManager.track(new THREE.BoxGeometry(2.5, 3.5, 0.08));
    
    // High-quality materials
    const sideMaterial = resourceManager.track(new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.8,
      metalness: 0.1
    }));
    
    const frontMaterial = resourceManager.track(new THREE.MeshStandardMaterial({ 
      map: texture,
      roughness: 0.6,
      metalness: 0.2,
      transparent: false
    }));
    
    const backMaterial = resourceManager.track(new THREE.MeshStandardMaterial({ 
      color: 0xf0f0f0,
      roughness: 0.9,
      metalness: 0.0
    }));

    materials = [
      sideMaterial, sideMaterial, sideMaterial, sideMaterial,
      frontMaterial, backMaterial
    ];

    magazine = new THREE.Mesh(geometry, materials);
    magazine.castShadow = false;
    magazine.receiveShadow = false;
    magazine.rotation.x = -0.12;
    magazine.rotation.y = 0.2;
    scene.add(magazine);

    // High-quality render with progressive timeout
    const maxRenderTime = deviceCaps.tier === 'mobile-low' ? 8000 : 15000;
    const renderPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Render timeout - try reducing image size"));
      }, maxRenderTime);

      try {
        renderer.render(scene, camera);
        clearTimeout(timeout);
        resolve();
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });

    await renderPromise;

    // High-quality canvas setup
    overlayCanvas = document.createElement("canvas");
    overlayCanvas.width = finalWidth;
    overlayCanvas.height = finalHeight;
    ctx = overlayCanvas.getContext("2d", { 
      alpha: true,
      desynchronized: true,
      colorSpace: "srgb"
    });
    
    // High-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Clear with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, finalWidth, finalHeight);
    
    // Draw the 3D scene
    ctx.drawImage(renderer.domElement, 0, 0);

    // Add high-quality text overlay
    await addHighQualityTextOverlay(ctx, {
      finalWidth,
      finalHeight,
      productName,
      productPrice,
      creatorName,
      secondaryImageUrl,
      deviceTier: deviceCaps.tier
    });

    // High-quality output
    return new Promise((resolve, reject) => {
      // Use PNG for maximum quality on higher-end devices
      const useHighQuality = deviceCaps.tier === 'high' || deviceCaps.tier === 'medium';
      const format = useHighQuality ? "image/png" : "image/jpeg";
      const quality = useHighQuality ? 1.0 : 0.95;
      
      overlayCanvas.toBlob((blob) => {
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
    console.error("Error creating magazine card:", error);
    throw error;
  } finally {
    // Clean shutdown
    await new Promise(resolve => setTimeout(resolve, 100)); // Allow render to complete
    
    resourceManager.dispose();
    
    if (renderer) {
      try {
        renderer.dispose();
        renderer.forceContextLoss();
        const canvas = renderer.domElement;
        if (canvas?.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      } catch (e) {
        console.warn("Renderer cleanup error:", e);
      }
    }
    
    if (scene) {
      scene.clear();
    }

    // Clear references
    scene = camera = renderer = geometry = materials = magazine = texture = null;
    overlayCanvas = ctx = null;
    
    // Delayed garbage collection
    if (typeof window !== 'undefined' && window.gc) {
      setTimeout(() => window.gc(), 200);
    }
  }
}

// High-quality texture loading with progressive sizing
async function loadHighQualityTexture(imageUrl, deviceCaps) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    const timeout = setTimeout(() => {
      reject(new Error("High-quality image load timeout"));
    }, 15000);

    img.onload = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let { naturalWidth: w, naturalHeight: h } = img;
        const maxSize = deviceCaps.textureSize;
        
        // Intelligent resizing that preserves quality
        if (w > maxSize || h > maxSize) {
          const scale = Math.min(maxSize / w, maxSize / h);
          w = Math.floor(w * scale);
          h = Math.floor(h * scale);
        }
        
        canvas.width = w;
        canvas.height = h;
        
        // Maximum quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        
        const loader = new THREE.TextureLoader();
        const texture = loader.load(canvas.toDataURL('image/png')); // PNG for max quality
        
        // High-quality texture settings
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.flipY = false;
        texture.format = THREE.RGBAFormat;
        texture.type = THREE.UnsignedByteType;
        texture.colorSpace = THREE.SRGBColorSpace;
        
        resolve(texture);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("Failed to load high-quality image"));
    };
    
    img.src = imageUrl;
  });
}

// High-quality text rendering
async function addHighQualityTextOverlay(ctx, { 
  finalWidth, 
  finalHeight, 
  productName, 
  productPrice, 
  creatorName, 
  secondaryImageUrl,
  deviceTier 
}) {
  const baseFontSize = Math.max(12, finalWidth / 25);
  
  // High-quality fonts with fallbacks
  const fonts = {
    title: `bold ${baseFontSize * 3.5}px "Georgia", "Times New Roman", serif`,
    subtitle: `italic bold ${baseFontSize}px "Georgia", "Times New Roman", serif`,
    body: `bold ${baseFontSize * 1.6}px "Helvetica Neue", "Arial", sans-serif`,
    product: `bold ${baseFontSize * 1.1}px "Helvetica Neue", "Arial", sans-serif`,
    price: `bold ${baseFontSize}px "Helvetica Neue", "Arial", sans-serif`,
    small: `bold ${baseFontSize * 0.7}px "Helvetica Neue", "Arial", sans-serif`,
    cta: `bold ${baseFontSize * 0.9}px "Helvetica Neue", "Arial", sans-serif`
  };

  // Enable high-quality text rendering
  ctx.textRenderingOptimization = 'optimizeQuality';
  ctx.fontKerning = 'normal';

  // Main title with shadow for depth
  ctx.fillStyle = "#523a1e";
  ctx.font = fonts.title;
  ctx.textBaseline = "top";
  
  // Add subtle text shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.fillText("INSPIRE", finalWidth * 0.06, finalHeight * 0.08);
  ctx.shadowColor = 'transparent';

  // Subtitle
  ctx.font = fonts.subtitle;
  ctx.fillStyle = "#222";
  ctx.textAlign = "right";
  ctx.fillText("By PLUGGN", finalWidth * 0.94, finalHeight * 0.08);
  ctx.textAlign = "left";

  // High-quality NEW badge with gradient
  const badgeX = finalWidth * 0.06;
  const badgeY = finalHeight * 0.11;
  const badgeW = finalWidth * 0.08;
  const badgeH = finalHeight * 0.035;
  
  // Gradient background
  const gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeH);
  gradient.addColorStop(0, '#333');
  gradient.addColorStop(1, '#000');
  ctx.fillStyle = gradient;
  ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
  
  ctx.fillStyle = "#fff";
  ctx.font = fonts.small;
  ctx.textAlign = "center";
  ctx.fillText("NEW", badgeX + badgeW/2, badgeY + badgeH * 0.3);
  ctx.textAlign = "left";

  // Main text with enhanced styling
  ctx.fillStyle = "#000";
  ctx.font = fonts.body;
  ctx.fillText("ELEVATE", finalWidth * 0.06, finalHeight * 0.18);
  ctx.fillText("YOUR LOOK", finalWidth * 0.06, finalHeight * 0.22);

  // Product name with better truncation
  ctx.font = fonts.product;
  ctx.fillStyle = "#6d4b28";
  const maxNameLength = deviceTier === 'mobile-low' ? 16 : 20;
  const truncatedName = productName.length > maxNameLength ? 
    productName.substring(0, maxNameLength) + "..." : productName;
  ctx.fillText(truncatedName.toUpperCase(), finalWidth * 0.06, finalHeight * 0.27);

  // Price with better formatting
  ctx.font = fonts.price;
  ctx.fillStyle = "#000";
  ctx.fillText(`₦${productPrice.toLocaleString()}`, finalWidth * 0.07, finalHeight * 0.31);

  // Call to action
  ctx.font = fonts.cta;
  ctx.fillText("CLICK TO BUY", finalWidth * 0.07, finalHeight * 0.88);

  // High-quality circular inset image
  try {
    const timeoutDuration = deviceTier === 'mobile-low' ? 3000 : 5000;
    const insetImg = await Promise.race([
      loadSecondaryImageHQ(secondaryImageUrl),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Secondary image timeout")), timeoutDuration))
    ]);

    if (insetImg) {
      const cx = finalWidth * 0.85;
      const cy = finalHeight * 0.82;
      const radius = finalWidth * 0.08;
      
      // High-quality circular clipping
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
      
      // Enable high-quality image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(insetImg, cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.restore();
      
      // High-quality border
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.stroke();

      // Creator name with better positioning
      ctx.font = fonts.small;
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(creatorName, cx, finalHeight * 0.95);
    }
  } catch (error) {
    console.warn("Failed to load secondary image:", error);
  }
}

// High-quality secondary image loading
function loadSecondaryImageHQ(imageUrl) {
  return new Promise((resolve, reject) => {
    if (!imageUrl) {
      resolve(null);
      return;
    }
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = imageUrl;
  });
}
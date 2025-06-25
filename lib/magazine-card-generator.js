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

export async function createEnhancedMagazineCard({
  primaryImageUrl,
  secondaryImageUrl,
  productName,
  productPrice,
  creatorName,
  dimensions,
}) {
  const { width, height } = dimensions;
  
  // Smart upscaling - high quality but safe limits
  // const upscaleFactor = Math.min(3.0, Math.max(2.0, 2000 / Math.max(width, height)));

  // Add this at the top of the function for adaptive quality
const isLowEndDevice = () => {
  const ram = navigator.deviceMemory || 4; // GB
  const cores = navigator.hardwareConcurrency || 4;
  return ram < 4 || cores < 4;
};

const upscaleFactor = isLowEndDevice() 
  ? Math.min(2.0, Math.max(1.5, 1500 / Math.max(width, height)))
  : Math.min(3.0, Math.max(2.0, 2000 / Math.max(width, height)));
  const finalWidth = Math.min(width * upscaleFactor, 3000);
  const finalHeight = Math.min(height * upscaleFactor, 3000);

  let scene, camera, renderer, geometry, materials, magazine, texture, overlayCanvas, ctx;

  try {
    // Scene setup with more conservative settings
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, finalWidth / finalHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Create renderer with high quality but stable settings
    renderer = new THREE.WebGLRenderer({ 
      antialias: true, // Re-enable for quality
      alpha: true, 
      preserveDrawingBuffer: true,
      powerPreference: "high-performance", // Use high performance for quality
      failIfMajorPerformanceCaveat: false
    });
    
    renderer.setSize(finalWidth, finalHeight);
    // Higher pixel ratio for quality but capped for stability
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * 1.5, 2.5));
    
    // Disable shadows to improve performance
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Simplified lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 10);
    // Remove shadow casting to improve performance
    directionalLight.castShadow = false;
    
    scene.add(ambientLight, directionalLight);

    // Load texture with error handling and size optimization
    const loader = new THREE.TextureLoader();
    texture = await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Create canvas to resize image if too large
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Limit texture size but keep it high quality
        const maxSize = 2048; // Increased for better quality
        let { naturalWidth: w, naturalHeight: h } = img;
        
        if (w > maxSize || h > maxSize) {
          const scale = Math.min(maxSize / w, maxSize / h);
          w *= scale;
          h *= scale;
        }
        
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        
        loader.load(canvas.toDataURL(), resolve, undefined, reject);
      };
      img.onerror = reject;
      img.src = primaryImageUrl;
    });

    // Optimize texture settings for quality
    texture.generateMipmaps = true; // Re-enable for better quality
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    texture.flipY = false;

    // Create magazine geometry with reduced complexity
    geometry = new THREE.BoxGeometry(2.5, 3.5, 0.08);
    
    // Use higher quality materials with optimized settings
    materials = [
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0.1 }), // sides
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ 
        map: texture,
        roughness: 0.6,
        metalness: 0.2,
        transparent: false
      }), // front - high quality
      new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.9, metalness: 0.0 }), // back
    ];

    magazine = new THREE.Mesh(geometry, materials);
    magazine.castShadow = false;
    magazine.receiveShadow = false;
    magazine.rotation.x = -0.12;
    magazine.rotation.y = 0.2;
    scene.add(magazine);

    // Force a single render
    renderer.render(scene, camera);

    // Create overlay canvas for text
    overlayCanvas = document.createElement("canvas");
    overlayCanvas.width = finalWidth;
    overlayCanvas.height = finalHeight;
    ctx = overlayCanvas.getContext("2d");
    
    // Draw the 3D scene
    ctx.drawImage(renderer.domElement, 0, 0);

    // Add text overlay with optimized font rendering
    const baseFontSize = Math.max(12, finalWidth / 25);
    
    // Main title
    ctx.fillStyle = "#523a1e";
    ctx.font = `bold ${baseFontSize * 3.5}px Georgia, serif`;
    ctx.textBaseline = "top";
    ctx.fillText("INSPIRE", finalWidth * 0.06, finalHeight * 0.08);

    // Subtitle
    ctx.font = `italic bold ${baseFontSize}px serif`;
    ctx.fillStyle = "#222";
    ctx.textAlign = "right";
    ctx.fillText("By PLUGGN", finalWidth * 0.94, finalHeight * 0.08);
    ctx.textAlign = "left";

    // NEW badge
    const badgeX = finalWidth * 0.06;
    const badgeY = finalHeight * 0.11;
    const badgeW = finalWidth * 0.08;
    const badgeH = finalHeight * 0.035;
    
    ctx.fillStyle = "#000";
    ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${baseFontSize * 0.7}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("NEW", badgeX + badgeW/2, badgeY + badgeH * 0.3);
    ctx.textAlign = "left";

    // Main text
    ctx.fillStyle = "#000";
    ctx.font = `bold ${baseFontSize * 1.6}px sans-serif`;
    ctx.fillText("ELEVATE", finalWidth * 0.06, finalHeight * 0.18);
    ctx.fillText("YOUR LOOK", finalWidth * 0.06, finalHeight * 0.22);

    // Product name
    ctx.font = `bold ${baseFontSize * 1.1}px sans-serif`;
    ctx.fillStyle = "#6d4b28";
    const truncatedName = productName.length > 20 ? 
      productName.substring(0, 20) + "..." : productName;
    ctx.fillText(truncatedName.toUpperCase(), finalWidth * 0.06, finalHeight * 0.27);

    // Price
    ctx.font = `bold ${baseFontSize}px sans-serif`;
    ctx.fillStyle = "#000";
    ctx.fillText(`₦${productPrice.toLocaleString()}`, finalWidth * 0.07, finalHeight * 0.31);

    // Call to action
    ctx.font = `bold ${baseFontSize * 0.9}px sans-serif`;
    ctx.fillText("CLICK TO BUY", finalWidth * 0.07, finalHeight * 0.88);

    // Load and draw circular inset image
    try {
      const insetImg = await new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null); // Don't fail if secondary image fails
        img.src = secondaryImageUrl;
      });

      if (insetImg) {
        const cx = finalWidth * 0.85;
        const cy = finalHeight * 0.82;
        const radius = finalWidth * 0.08;
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(insetImg, cx - radius, cy - radius, radius * 2, radius * 2);
        ctx.restore();
        
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Creator name
        ctx.font = `bold ${baseFontSize * 0.8}px sans-serif`;
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(creatorName, cx, finalHeight * 0.95);
      }
    } catch (error) {
      console.warn("Failed to load secondary image:", error);
    }

    // Convert to blob
    return new Promise((resolve, reject) => {
      overlayCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve({ processedImage: url });
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, "image/png", 1.0); // Back to PNG with maximum quality
    });

  } catch (error) {
    console.error("Error creating magazine card:", error);
    throw error;
  } finally {
    // Critical: Clean up all resources
    try {
      if (texture) {
        texture.dispose();
      }
      if (geometry) {
        geometry.dispose();
      }
      if (materials) {
        materials.forEach(material => {
          if (material.map) material.map.dispose();
          material.dispose();
        });
      }
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        const canvas = renderer.domElement;
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
      if (scene) {
        scene.clear();
      }
      
      // Force garbage collection if available
      if (window.gc) {
        window.gc();
      }
    } catch (cleanupError) {
      console.warn("Cleanup error:", cleanupError);
    }
  }
}
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






"use client";
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
  const pixelRatio = window.devicePixelRatio || 2; // HiDPI
  const upscaleFactor = 2;

  const finalWidth = width * upscaleFactor;
  const finalHeight = height * upscaleFactor;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, finalWidth / finalHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(finalWidth, finalHeight);
  renderer.setPixelRatio(pixelRatio);
  const canvas = renderer.domElement;

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 10);
  scene.add(ambientLight, directionalLight);

  const loader = new THREE.TextureLoader();
  const texture = await new Promise((resolve) => {
    loader.load(primaryImageUrl, (tex) => {
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      resolve(tex);
    });
  });

  const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.1);
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ map: texture }),
    new THREE.MeshBasicMaterial({ color: 0xf0f0f0 }),
  ];
  const magazine = new THREE.Mesh(geometry, materials);
  magazine.rotation.x = -0.15;
  magazine.rotation.y = 0.25;
  scene.add(magazine);

  renderer.render(scene, camera);

  const overlayCanvas = document.createElement("canvas");
  overlayCanvas.width = finalWidth;
  overlayCanvas.height = finalHeight;
  const ctx = overlayCanvas.getContext("2d");
  ctx.drawImage(renderer.domElement, 0, 0);

  // Styles (scale everything for upscaleFactor)
  ctx.scale(upscaleFactor, upscaleFactor);
  ctx.fillStyle = "#523a1e";
  ctx.font = "bold 56px Georgia";
  ctx.fillText("INSPIRE", 30, 70);

  ctx.font = "italic bold 16px serif";
  ctx.fillStyle = "#222";
  ctx.fillText("By PLUGGN", width - 140, 70);

  ctx.fillStyle = "#000";
  ctx.fillRect(30, 80, 45, 25);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText("NEW", 43, 97);

  ctx.fillStyle = "#000";
  ctx.font = "bold 25px sans-serif";
  ctx.fillText("ELEVATE", 30, 130);
  ctx.fillText("YOUR LOOK", 30, 165);

  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#6d4b28";
  ctx.fillText(productName.toUpperCase(), 30, 190);

  ctx.font = "bold 15px sans-serif";
  ctx.fillStyle = "#000";
  ctx.fillText(`₦${productPrice.toLocaleString()}`, 35, 220);
  ctx.font = "bold 14px sans-serif";
  ctx.fillText(`CLICK TO BUY`, 35, height - 34);

  const insetImg = await new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.src = secondaryImageUrl;
  });

  const cx = width - 110, cy = height - 95, radius = 50;
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

  ctx.font = "bold 13px sans-serif";
  ctx.fillStyle = "#000";
  ctx.fillText(creatorName, cx - 40, height - 25);

  return new Promise((resolve) => {
    overlayCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      resolve({ processedImage: url });
    }, "image/png", 1.0); // PNG = max quality
  });
}




// "use client";

// import type React from "react";
// import { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import {
//   MapPin,
//   Package,
//   Home,
//   Warehouse,
//   Plus,
//   Minus,
//   Maximize2,
//   Navigation,
//   Info,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface OrderData {
//   orderId: string;
//   status: string;
//   currentLocation: {
//     lat: number;
//     lng: number;
//     address: string;
//     timestamp: string;
//   };
//   origin: {
//     lat: number;
//     lng: number;
//     address: string;
//     name: string;
//   };
//   destination: {
//     lat: number;
//     lng: number;
//     address: string;
//     recipientName: string;
//   };
//   estimatedDelivery: string;
// }

// interface MapPoint {
//   lat: number;
//   lng: number;
//   type: "origin" | "current" | "destination";
//   label: string;
//   address: string;
//   details?: string;
// }

// // Sample order data for demo
// const sampleOrderData: OrderData = {
//   orderId: "ORD-2025-001",
//   status: "In Transit",
//   currentLocation: {
//     lat: 6.618,
//     lng: 3.3209,
//     address: "Adealu Street, Agege, Lagos",
//     timestamp: "2025-07-02T14:30:00Z",
//   },
//   origin: {
//     lat: 6.59692,
//     lng: 3.35148,
//     address: "7 Seidu Ajibowu St, Ikeja, Lagos",
//     name: "Ikeja Distribution Center",
//   },
//   destination: {
//     lat: 6.53441083361186,
//     lng: 3.36070682748603,
//     address: "7a, Taiwo Ajala Street, Ifako-Ijaiye, Lagos",
//     recipientName: "Paul",
//   },
//   estimatedDelivery: "2025-07-03T18:00:00Z",
// };

// export default function OrderTrackingMap({
//   orderData = sampleOrderData,
// }: {
//   orderData?: OrderData;
// }) {
//   const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
//   const [zoom, setZoom] = useState(6);
//   const [center, setCenter] = useState({ lat: 6.6, lng: 3.35 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastTouch, setLastTouch] = useState<{ x: number; y: number } | null>(
//     null
//   );
//   const [mapStyle, setMapStyle] = useState<"roadmap" | "satellite">("roadmap");
//   const [showControls, setShowControls] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const mapRef = useRef<HTMLDivElement>(null);
//   const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
//     null
//   );
//   const lastPinchDistance = useRef<number | null>(null);
//   const animationFrameRef = useRef<number | null>(null);

//   const mapPoints: MapPoint[] = [
//     {
//       lat: orderData.origin.lat,
//       lng: orderData.origin.lng,
//       type: "origin",
//       label: "Origin",
//       address: orderData.origin.name,
//       details: orderData.origin.address,
//     },
//     {
//       lat: orderData.currentLocation.lat,
//       lng: orderData.currentLocation.lng,
//       type: "current",
//       label: "Current Location",
//       address: orderData.currentLocation.address,
//       details: `Status: ${orderData.status} • ${new Date(
//         orderData.currentLocation.timestamp
//       ).toLocaleString()}`,
//     },
//     {
//       lat: orderData.destination.lat,
//       lng: orderData.destination.lng,
//       type: "destination",
//       label: "Destination",
//       address: orderData.destination.recipientName,
//       details: `${orderData.destination.address} • ETA: ${new Date(
//         orderData.estimatedDelivery
//       ).toLocaleString()}`,
//     },
//   ];

//   // Enhanced initial positioning with better bounds calculation
//   useEffect(() => {
//     const lats = mapPoints.map((p) => p.lat);
//     const lngs = mapPoints.map((p) => p.lng);
//     const minLat = Math.min(...lats);
//     const maxLat = Math.max(...lats);
//     const minLng = Math.min(...lngs);
//     const maxLng = Math.max(...lngs);

//     const centerLat = (minLat + maxLat) / 2;
//     const centerLng = (minLng + maxLng) / 2;

//     // Add padding to the bounds
//     const latPadding = (maxLat - minLat) * 0.3;
//     const lngPadding = (maxLng - minLng) * 0.3;

//     const paddedLatDiff = maxLat - minLat + latPadding;
//     const paddedLngDiff = maxLng - minLng + lngPadding;

//     const maxDiff = Math.max(paddedLatDiff, paddedLngDiff);

//     let newZoom = 13;
//     if (maxDiff > 30) newZoom = 5;
//     else if (maxDiff > 20) newZoom = 7;
//     else if (maxDiff > 10) newZoom = 8;
//     else if (maxDiff > 5) newZoom = 9;
//     else if (maxDiff > 2) newZoom = 10;
//     else if (maxDiff > 1) newZoom = 11;
//     else if (maxDiff > 0.5) newZoom = 12;
//     else if (maxDiff > 0.2) newZoom = 13;

//     setCenter({ lat: centerLat, lng: centerLng });
//     setZoom(newZoom);
//   }, [orderData]);

//   // Improved coordinate conversion with better precision
//   const latLngToPixel = useCallback(
//     (lat: number, lng: number) => {
//       const mapWidth = mapRef.current?.clientWidth || 800;
//       const mapHeight = mapRef.current?.clientHeight || 400;
//       const scale = Math.pow(2, zoom);
//       const worldWidth = 256 * scale;

//       // More accurate Mercator projection
//       const latRad = (lat * Math.PI) / 180;
//       const pixelX = ((lng + 180) / 360) * worldWidth;
//       const pixelY =
//         ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) /
//           2) *
//         worldWidth;

//       // Center offset calculation
//       const centerLatRad = (center.lat * Math.PI) / 180;
//       const centerPixelX = ((center.lng + 180) / 360) * worldWidth;
//       const centerPixelY =
//         ((1 -
//           Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) /
//             Math.PI) /
//           2) *
//         worldWidth;

//       return {
//         x: pixelX - centerPixelX + mapWidth / 2,
//         y: pixelY - centerPixelY + mapHeight / 2,
//       };
//     },
//     [zoom, center]
//   );

//   const pixelToLatLng = useCallback(
//     (x: number, y: number) => {
//       const mapWidth = mapRef.current?.clientWidth || 800;
//       const mapHeight = mapRef.current?.clientHeight || 400;
//       const scale = Math.pow(2, zoom);
//       const worldWidth = 256 * scale;

//       const centerLatRad = (center.lat * Math.PI) / 180;
//       const centerPixelX = ((center.lng + 180) / 360) * worldWidth;
//       const centerPixelY =
//         ((1 -
//           Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) /
//             Math.PI) /
//           2) *
//         worldWidth;

//       const worldX = x - mapWidth / 2 + centerPixelX;
//       const worldY = y - mapHeight / 2 + centerPixelY;

//       const lng = (worldX / worldWidth) * 360 - 180;
//       const lat =
//         Math.atan(Math.sinh(Math.PI * (1 - (2 * worldY) / worldWidth))) *
//         (180 / Math.PI);

//       return { lat, lng };
//     },
//     [zoom, center]
//   );

//   // Enhanced touch handling with momentum and inertia
//   const handleTouchStart = (e: React.TouchEvent) => {
//     e.preventDefault();
//     const touch = e.touches[0];
//     if (e.touches.length === 1) {
//       setIsDragging(true);
//       setLastTouch({ x: touch.clientX, y: touch.clientY });
//       touchStartRef.current = {
//         x: touch.clientX,
//         y: touch.clientY,
//         time: Date.now(),
//       };
//     } else if (e.touches.length === 2) {
//       // Handle pinch for zoom
//       const touch1 = e.touches[0];
//       const touch2 = e.touches[1];
//       const distance = Math.sqrt(
//         Math.pow(touch2.clientX - touch1.clientX, 2) +
//           Math.pow(touch2.clientY - touch1.clientY, 2)
//       );
//       lastPinchDistance.current = distance;
//       setIsDragging(false);
//     }
//   };

//   const handleTouchMove = useCallback(
//     (e: React.TouchEvent) => {
//       e.preventDefault();
//       if (e.touches.length === 1 && isDragging && lastTouch) {
//         const touch = e.touches[0];
//         const deltaX = touch.clientX - lastTouch.x;
//         const deltaY = touch.clientY - lastTouch.y;

//         // Increase threshold for better performance
//         if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
//           const currentLatLng = pixelToLatLng(400, 200);
//           const newLatLng = pixelToLatLng(400 - deltaX, 200 - deltaY);

//           setCenter((prev) => ({
//             lat: Math.max(
//               -85,
//               Math.min(85, prev.lat + (newLatLng.lat - currentLatLng.lat))
//             ),
//             lng:
//               ((prev.lng + (newLatLng.lng - currentLatLng.lng) + 540) % 360) -
//               180,
//           }));

//           setLastTouch({ x: touch.clientX, y: touch.clientY });
//         }
//       } else if (e.touches.length === 2 && lastPinchDistance.current !== null) {
//         // Handle pinch zoom with throttling
//         const touch1 = e.touches[0];
//         const touch2 = e.touches[1];
//         const distance = Math.sqrt(
//           Math.pow(touch2.clientX - touch1.clientX, 2) +
//             Math.pow(touch2.clientY - touch1.clientY, 2)
//         );

//         const scale = distance / lastPinchDistance.current;
//         const zoomDelta = Math.log2(scale);

//         // Increase threshold for zoom to reduce lag
//         if (Math.abs(zoomDelta) > 0.2) {
//           setZoom((prev) => Math.max(1, Math.min(20, prev + zoomDelta)));
//           lastPinchDistance.current = distance;
//         }
//       }
//     },
//     [isDragging, lastTouch, pixelToLatLng]
//   );

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (e.touches.length === 0) {
//       setIsDragging(false);
//       setLastTouch(null);
//       lastPinchDistance.current = null;

//       // Add momentum/inertia effect
//       if (touchStartRef.current) {
//         const touchEnd = {
//           x: e.changedTouches[0]?.clientX || 0,
//           y: e.changedTouches[0]?.clientY || 0,
//           time: Date.now(),
//         };
//         const timeDiff = touchEnd.time - touchStartRef.current.time;
//         const deltaX = touchEnd.x - touchStartRef.current.x;
//         const deltaY = touchEnd.y - touchStartRef.current.y;

//         if (
//           timeDiff < 300 &&
//           (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50)
//         ) {
//           // Apply momentum
//           const velocityX = deltaX / timeDiff;
//           const velocityY = deltaY / timeDiff;
//           applyMomentum(velocityX, velocityY);
//         }

//         touchStartRef.current = null;
//       }
//     }
//   };

//   const applyMomentum = (velocityX: number, velocityY: number) => {
//     if (isAnimating) return;

//     setIsAnimating(true);
//     const friction = 0.95;
//     let currentVelocityX = velocityX * 2;
//     let currentVelocityY = velocityY * 2;

//     const animate = () => {
//       if (
//         Math.abs(currentVelocityX) < 0.1 &&
//         Math.abs(currentVelocityY) < 0.1
//       ) {
//         setIsAnimating(false);
//         return;
//       }

//       const currentLatLng = pixelToLatLng(400, 200);
//       const newLatLng = pixelToLatLng(
//         400 - currentVelocityX,
//         200 - currentVelocityY
//       );

//       setCenter((prev) => ({
//         lat: Math.max(
//           -85,
//           Math.min(85, prev.lat + (newLatLng.lat - currentLatLng.lat))
//         ),
//         lng:
//           ((prev.lng + (newLatLng.lng - currentLatLng.lng) + 540) % 360) - 180,
//       }));

//       currentVelocityX *= friction;
//       currentVelocityY *= friction;

//       animationFrameRef.current = requestAnimationFrame(animate);
//     };

//     animate();
//   };

//   // Mouse event handlers with improved responsiveness
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (e.button !== 0) return; // Only left mouse button
//     setIsDragging(true);
//     setLastTouch({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseMove = useCallback(
//     (e: React.MouseEvent) => {
//       if (!isDragging || !lastTouch) return;

//       const deltaX = e.clientX - lastTouch.x;
//       const deltaY = e.clientY - lastTouch.y;

//       // Increase threshold for better performance
//       if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
//         const currentLatLng = pixelToLatLng(400, 200);
//         const newLatLng = pixelToLatLng(400 - deltaX, 200 - deltaY);

//         setCenter((prev) => ({
//           lat: Math.max(
//             -85,
//             Math.min(85, prev.lat + (newLatLng.lat - currentLatLng.lat))
//           ),
//           lng:
//             ((prev.lng + (newLatLng.lng - currentLatLng.lng) + 540) % 360) -
//             180,
//         }));

//         setLastTouch({ x: e.clientX, y: e.clientY });
//       }
//     },
//     [isDragging, lastTouch, pixelToLatLng]
//   );

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     setLastTouch(null);
//   };

//   // Enhanced zoom functions with smooth transitions
//   const smoothZoom = (targetZoom: number, duration = 300) => {
//     const startZoom = zoom;
//     const startTime = Date.now();

//     const animate = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

//       const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;
//       setZoom(currentZoom);

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     animate();
//   };

//   const zoomIn = () => smoothZoom(Math.min(zoom + 1, 18));
//   const zoomOut = () => smoothZoom(Math.max(zoom - 1, 1));

//   // Enhanced wheel zoom
//   const handleWheel = (e: React.WheelEvent) => {
//     e.preventDefault();
//     const delta = e.deltaY > 0 ? -0.5 : 0.5;
//     setZoom((prev) => Math.max(1, Math.min(18, prev + delta)));
//   };

//   // Improved fit bounds with animation
//   const fitBounds = () => {
//     const lats = mapPoints.map((p) => p.lat);
//     const lngs = mapPoints.map((p) => p.lng);
//     const minLat = Math.min(...lats);
//     const maxLat = Math.max(...lats);
//     const minLng = Math.min(...lngs);
//     const maxLng = Math.max(...lngs);

//     const centerLat = (minLat + maxLat) / 2;
//     const centerLng = (minLng + maxLng) / 2;

//     const latPadding = (maxLat - minLat) * 0.3;
//     const lngPadding = (maxLng - minLng) * 0.3;

//     const paddedLatDiff = maxLat - minLat + latPadding;
//     const paddedLngDiff = maxLng - minLng + lngPadding;

//     const maxDiff = Math.max(paddedLatDiff, paddedLngDiff);

//     let newZoom = 13;
//     if (maxDiff > 30) newZoom = 5;
//     else if (maxDiff > 20) newZoom = 7;
//     else if (maxDiff > 10) newZoom = 8;
//     else if (maxDiff > 5) newZoom = 9;
//     else if (maxDiff > 2) newZoom = 10;
//     else if (maxDiff > 1) newZoom = 11;
//     else if (maxDiff > 0.5) newZoom = 12;

//     // Animate to new position
//     setCenter({ lat: centerLat, lng: centerLng });
//     smoothZoom(newZoom);
//   };

//   // Auto-hide controls on mobile
//   useEffect(() => {
//     let timeout: NodeJS.Timeout;
//     const resetTimeout = () => {
//       setShowControls(true);
//       clearTimeout(timeout);
//       timeout = setTimeout(() => setShowControls(false), 3000);
//     };

//     const isMobile = window.innerWidth < 768;
//     if (isMobile) {
//       resetTimeout();
//       const handleInteraction = () => resetTimeout();

//       window.addEventListener("touchstart", handleInteraction);
//       window.addEventListener("touchmove", handleInteraction);

//       return () => {
//         clearTimeout(timeout);
//         window.removeEventListener("touchstart", handleInteraction);
//         window.removeEventListener("touchmove", handleInteraction);
//       };
//     }
//   }, []);

//   const getMarkerColor = (type: string) => {
//     switch (type) {
//       case "origin":
//         return "#22c55e";
//       case "current":
//         return "#3b82f6";
//       case "destination":
//         return "#ef4444";
//       default:
//         return "#6b7280";
//     }
//   };

//   const getMarkerIcon = (type: string) => {
//     switch (type) {
//       case "origin":
//         return <Warehouse className="h-5 w-5 text-white" />;
//       case "current":
//         return <Package className="h-5 w-5 text-white" />;
//       case "destination":
//         return <Home className="h-5 w-5 text-white" />;
//       default:
//         return <MapPin className="h-5 w-5 text-white" />;
//     }
//   };

//   const getTileUrl = (x: number, y: number, z: number) => {
//     if (mapStyle === "satellite") {
//       return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
//     }
//     return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
//   };

//   const getTilesInView = useCallback(() => {
//     const mapWidth = mapRef.current?.clientWidth || 800;
//     const mapHeight = mapRef.current?.clientHeight || 400;
//     const tileSize = 256;
//     const scale = Math.pow(2, zoom);
//     const worldWidth = tileSize * scale;

//     const centerLatRad = (center.lat * Math.PI) / 180;
//     const centerPixelX = ((center.lng + 180) / 360) * worldWidth;
//     const centerPixelY =
//       ((1 -
//         Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) /
//           Math.PI) /
//         2) *
//       worldWidth;

//     const startX = Math.floor((centerPixelX - mapWidth / 2) / tileSize) - 1;
//     const endX = Math.ceil((centerPixelX + mapWidth / 2) / tileSize) + 1;
//     const startY = Math.floor((centerPixelY - mapHeight / 2) / tileSize) - 1;
//     const endY = Math.ceil((centerPixelY + mapHeight / 2) / tileSize) + 1;

//     const tiles = [];
//     const maxTiles = Math.pow(2, Math.floor(zoom));

//     // Limit number of tiles for performance
//     const maxTileCount = 25; // Reduce from potentially hundreds to 25
//     let tileCount = 0;

//     for (let x = startX; x <= endX && tileCount < maxTileCount; x++) {
//       for (let y = startY; y <= endY && tileCount < maxTileCount; y++) {
//         const tileX = ((x % maxTiles) + maxTiles) % maxTiles;
//         if (y >= 0 && y < maxTiles) {
//           const pixelX = x * tileSize - centerPixelX + mapWidth / 2;
//           const pixelY = y * tileSize - centerPixelY + mapHeight / 2;

//           tiles.push({
//             x: tileX,
//             y,
//             z: Math.floor(zoom),
//             pixelX,
//             pixelY,
//             url: getTileUrl(tileX, y, Math.floor(zoom)),
//           });
//           tileCount++;
//         }
//       }
//     }

//     return tiles;
//   }, [zoom, center]);

 
//   const memoizedMarkers = useMemo(() => {
//     return mapPoints
//       .map((point, index) => {
//         const pixel = latLngToPixel(point.lat, point.lng);
//         const mapWidth = mapRef.current?.clientWidth || 800;
//         const mapHeight = mapRef.current?.clientHeight || 400;

//         if (
//           pixel.x < -100 ||
//           pixel.x > mapWidth + 100 ||
//           pixel.y < -100 ||
//           pixel.y > mapHeight + 100
//         ) {
//           return null;
//         }

//         return { point, pixel, index };
//       })
//       .filter(Boolean);
//   }, [latLngToPixel, mapPoints]);

//   const tiles = getTilesInView();

//   return (
//     <div className="relative w-full h-[65vh] md:h-96 bg-gray-100 rounded-lg overflow-hidden border shadow-lg">
//       {/* Map Container */}
//       <div
//         ref={mapRef}
//         className={`absolute inset-0 select-none ${
//           isDragging ? "cursor-grabbing" : "cursor-grab"
//         } touch-none`}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//         onWheel={handleWheel}
//         style={{ touchAction: "none" }}
//       >
//         {/* Map Tiles */}
//         <div className="absolute inset-0">
//           {tiles.map((tile, index) => (
//             <img
//               key={`${tile.x}-${tile.y}-${tile.z}-${index}`}
//               src={tile.url || "/placeholder.svg"}
//               alt=""
//               className="absolute w-64 h-64 select-none pointer-events-none"
//               style={{
//                 left: tile.pixelX,
//                 top: tile.pixelY,
//                 imageRendering: zoom > 12 ? "pixelated" : "auto",
//                 transition: isAnimating ? "none" : "transform 0.1s ease-out",
//                 willChange: isDragging ? "transform" : "auto", // Optimize for transforms
//                 backfaceVisibility: "hidden", // Force hardware acceleration
//                 transform: "translateZ(0)", // Force GPU layer
//               }}
//               draggable={false}
//               onError={(e) => {
//                 if (mapStyle === "satellite") {
//                   e.currentTarget.src = `https://tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`;
//                 }
//               }}
//             />
//           ))}
//         </div>

//         {/* Route Lines */}
//         <svg className="absolute inset-0 w-full h-full pointer-events-none">
//           <defs>
//             <filter id="glow">
//               <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//               <feMerge>
//                 <feMergeNode in="coloredBlur" />
//                 <feMergeNode in="SourceGraphic" />
//               </feMerge>
//             </filter>
//             <filter id="shadow">
//               <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
//             </filter>
//           </defs>
//           {/* Completed route */}
//           {(() => {
//             const originPixel = latLngToPixel(
//               orderData.origin.lat,
//               orderData.origin.lng
//             );
//             const currentPixel = latLngToPixel(
//               orderData.currentLocation.lat,
//               orderData.currentLocation.lng
//             );
//             return (
//               <line
//                 x1={originPixel.x}
//                 y1={originPixel.y}
//                 x2={currentPixel.x}
//                 y2={currentPixel.y}
//                 stroke="#22c55e"
//                 strokeWidth="5"
//                 filter="url(#glow)"
//                 opacity="0.9"
//                 strokeLinecap="round"
//               />
//             );
//           })()}
//           {/* Remaining route */}
//           {(() => {
//             const currentPixel = latLngToPixel(
//               orderData.currentLocation.lat,
//               orderData.currentLocation.lng
//             );
//             const destPixel = latLngToPixel(
//               orderData.destination.lat,
//               orderData.destination.lng
//             );
//             return (
//               <line
//                 x1={currentPixel.x}
//                 y1={currentPixel.y}
//                 x2={destPixel.x}
//                 y2={destPixel.y}
//                 stroke="#94a3b8"
//                 strokeWidth="5"
//                 strokeDasharray="12,8"
//                 filter="url(#glow)"
//                 opacity="0.7"
//                 strokeLinecap="round"
//               />
//             );
//           })()}
//         </svg>

//         {/* Map Markers */}
//         {memoizedMarkers.map((markerData) => {
//           if (!markerData) return null;
//           const { point, pixel, index } = markerData;
//           return (
//             <div
//               key={index}
//               className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 hover:scale-110 z-10"
//               style={{
//                 left: pixel.x,
//                 top: pixel.y,
//                 filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedPoint(
//                   selectedPoint?.type === point.type ? null : point
//                 );
//               }}
//               onTouchEnd={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 setSelectedPoint(
//                   selectedPoint?.type === point.type ? null : point
//                 );
//               }}
//             >
//               {/* Marker */}
//               <div className="relative">
//                 <div
//                   className="w-12 h-12 md:w-10 md:h-10 rounded-full border-3 border-white shadow-xl flex items-center justify-center relative z-10 transition-all duration-200"
//                   style={{ backgroundColor: getMarkerColor(point.type) }}
//                 >
//                   {getMarkerIcon(point.type)}
//                 </div>
//                 {/* Marker Pin */}
//                 <div
//                   className="absolute top-10 md:top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-6 border-transparent"
//                   style={{ borderTopColor: getMarkerColor(point.type) }}
//                 />
//                 {/* Enhanced pulse animation for current location */}
//                 {point.type === "current" && (
//                   <>
//                     <div
//                       className="absolute inset-0 rounded-full animate-ping opacity-75"
//                       style={{ backgroundColor: getMarkerColor(point.type) }}
//                     />
//                     <div
//                       className="absolute inset-2 rounded-full animate-ping opacity-50"
//                       style={{ backgroundColor: getMarkerColor(point.type) }}
//                     />
//                   </>
//                 )}
//               </div>
//             </div>
//           );
//         })}

//         {/* Enhanced Info Popup */}
//         {selectedPoint &&
//           (() => {
//             const pixel = latLngToPixel(selectedPoint.lat, selectedPoint.lng);
//             const mapWidth = mapRef.current?.clientWidth || 800;
//             const mapHeight = mapRef.current?.clientHeight || 400;

//             // Smart positioning to keep popup in view
//             const popupWidth = 320;
//             const popupHeight = 140;
//             let left = pixel.x;
//             let top = pixel.y - popupHeight - 20;

//             // Adjust horizontal position
//             if (left + popupWidth / 2 > mapWidth - 20) {
//               left = mapWidth - popupWidth / 2 - 20;
//             } else if (left - popupWidth / 2 < 20) {
//               left = popupWidth / 2 + 20;
//             }

//             // Adjust vertical position
//             if (top < 20) {
//               top = pixel.y + 40;
//             }

//             return (
//               <div
//                 className="absolute z-30 bg-white rounded-xl shadow-2xl border p-4 transform -translate-x-1/2 backdrop-blur-sm bg-white/95"
//                 style={{
//                   left: left,
//                   top: top,
//                   width: "320px",
//                   maxWidth: "90vw",
//                 }}
//               >
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="sm:w-6 sm:h-6 w-4 h-4 rounded-full flex items-center justify-center"
//                       style={{
//                         backgroundColor: getMarkerColor(selectedPoint.type),
//                       }}
//                     >
//                       <div className="w-3 h-3 bg-white rounded-full"></div>
//                     </div>
//                     <h3 className="font-bold text-sm md:text-base text-gray-900">
//                       {selectedPoint.label}
//                     </h3>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-xs md:text-sm font-semibold text-gray-800">
//                       {selectedPoint.address}
//                     </p>
//                     {selectedPoint.details && (
//                       <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
//                         {selectedPoint.details}
//                       </p>
//                     )}
//                     <div className="text-[10px] md:text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
//                       {selectedPoint.lat.toFixed(4)},{" "}
//                       {selectedPoint.lng.toFixed(4)}
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-colors duration-200"
//                   onClick={() => setSelectedPoint(null)}
//                   onTouchEnd={(e) => {
//                     e.preventDefault();
//                     setSelectedPoint(null);
//                   }}
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//                 {/* Popup arrow */}
//                 <div
//                   className="absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"
//                   style={{
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     bottom: top < pixel.y ? "auto" : "-4px",
//                     top: top < pixel.y ? "-4px" : "auto",
//                     borderTopColor: top < pixel.y ? "transparent" : "white",
//                     borderBottomColor: top < pixel.y ? "white" : "transparent",
//                     borderBottomWidth: top < pixel.y ? "4px" : "0",
//                   }}
//                 />
//               </div>
//             );
//           })()}
//       </div>

//       {/* Enhanced Controls with auto-hide on mobile */}
//       <div
//         className={`absolute top-4 right-4 flex flex-col sm:gap-3 gap-6 transition-all duration-300 ${
//           showControls
//             ? "opacity-100 translate-x-0"
//             : "opacity-0 translate-x-4 pointer-events-none"
//         } md:opacity-100 md:translate-x-0 md:pointer-events-auto`}
//       >
//         {/* Zoom Controls */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-12 h-12 p-0 rounded-none border-b  transition-colors duration-200"
//             onClick={zoomIn}
//             disabled={zoom >= 18}
//           >
//             <Plus className="h-5 w-5" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-12 h-12 p-0 rounded-none  transition-colors duration-200"
//             onClick={zoomOut}
//             disabled={zoom <= 1}
//           >
//             <Minus className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* Fit Bounds Button */}
//         <Button
//           variant="outline"
//           size="sm"
//           className="bg-white/90 backdrop-blur-sm  transition-all duration-200 w-12 h-12 p-0 rounded-xl shadow-lg"
//           onClick={fitBounds}
//           title="Fit all locations"
//         >
//           <Maximize2 className="h-5 w-5" />
//         </Button>

//         <Button
//           variant="outline"
//           size="sm"
//           className="bg-white/90 backdrop-blur-sm  transition-all duration-200 w-12 h-12 p-0 rounded-xl shadow-lg"
//           onClick={() => {
//             setCenter({
//               lat: orderData.currentLocation.lat,
//               lng: orderData.currentLocation.lng,
//             });
//             // Use a more reasonable zoom level based on current zoom to avoid lag
//             const targetZoom = zoom < 11 ? Math.min(zoom + 3, 13) : 15;
//             smoothZoom(targetZoom);
//           }}
//           title="Center on current location"
//         >
//           <Navigation className="h-5 w-5 text-green-600" />
//         </Button>
//       </div>

//       {/* Map Style Toggle */}
//       <div
//         className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
//           showControls
//             ? "opacity-100 translate-x-0"
//             : "opacity-0 -translate-x-4 pointer-events-none"
//         } md:opacity-100 md:translate-x-0 md:pointer-events-auto`}
//       >
//         <Button
//           variant={mapStyle === "roadmap" ? "default" : "ghost"}
//           size="sm"
//           className="rounded-none border-r text-sm px-4 py-2 transition-colors duration-200"
//           onClick={() => setMapStyle("roadmap")}
//         >
//           Map
//         </Button>
//         <Button
//           variant={mapStyle === "satellite" ? "default" : "ghost"}
//           size="sm"
//           className="rounded-none text-sm px-4 py-2 transition-colors duration-200"
//           onClick={() => setMapStyle("satellite")}
//         >
//           Satellite
//         </Button>
//       </div>

//       {/* Legend */}
//       <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-2 max-w-xs">
//         <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//           <Info className="h-4 w-4" />
//           Legend
//         </h4>
//         <div className="space-y-2">
//           <div className="flex items-center gap-3">
//             <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
//               <Warehouse className="h-2 w-2 text-white" />
//             </div>
//             <span className="md:text-xs text-[10px] text-gray-700">Origin</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
//               <Package className="h-2 w-2 text-white" />
//             </div>
//             <span className="md:text-xs text-[10px] text-gray-700">
//               Current Location
//             </span>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
//               <Home className="h-2 w-2 text-white" />
//             </div>
//             <span className="md:text-xs text-[10px] text-gray-700">
//               Destination
//             </span>
//           </div>
//           <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
//             <div className="w-4 h-1 bg-green-500 rounded"></div>
//             <span className="md:text-xs text-[10px] text-gray-700">
//               Completed Route
//             </span>
//           </div>
//           <div className="flex items-center gap-3">
//             <div
//               className="w-4 h-1 bg-gray-400 rounded"
//               style={{
//                 backgroundImage:
//                   "repeating-linear-gradient(90deg, #94a3b8 0, #94a3b8 8px, transparent 8px, transparent 16px)",
//               }}
//             ></div>
//             <span className="md:text-xs text-[10px] text-gray-700">
//               Remaining Route
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Attribution */}
//       <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
//         {mapStyle === "satellite"
//           ? "© Esri, DigitalGlobe"
//           : "© OpenStreetMap contributors"}
//       </div>

//       {/* Mobile Interaction Hints */}
//       <div className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
//         {!isDragging && zoom < 3 && (
//           <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm text-center animate-fade-in-out">
//             <div>Pinch to zoom • Drag to pan</div>
//             <div className="text-xs opacity-75">Tap markers for details</div>
//           </div>
//         )}
//       </div>

//       {/* Performance Indicator */}
//       {isAnimating && (
//         <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//       )}
//     </div>
//   );
// }




// OrderTrackingMap.tsx
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

interface LatLngInfo {
  lat: number;
  lng: number;
  address: string;
  name?: string;
  recipientName?: string;
  timestamp?: string;
}

interface OrderData {
  orderId: string;
  status: string;
  currentLocation: LatLngInfo;
  origin: LatLngInfo;
  destination: LatLngInfo;
  estimatedDelivery: string;
}

const sampleOrderData: OrderData = {
  orderId: "ORD-2025-001",
  status: "In Transit",
  currentLocation: {
    lat: 6.618,
    lng: 3.3209,
    address: "Adealu Street, Agege, Lagos",
    timestamp: "2025-07-02T14:30:00Z",
  },
  origin: {
    lat: 6.59692,
    lng: 3.35148,
    address: "7 Seidu Ajibowu St, Ikeja, Lagos",
    name: "Ikeja Distribution Center",
  },
  destination: {
    lat: 6.53441083361186,
    lng: 3.36070682748603,
    address: "7a, Taiwo Ajala Street, Ifako-Ijaiye, Lagos",
    recipientName: "Paul",
  },
  estimatedDelivery: "2025-07-03T18:00:00Z",
};

const FitBounds = ({ bounds }: { bounds: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [map, bounds]);
  return null;
};

// Icon loaders
const loadIcon = (name: string) =>
  L.icon({
    iconUrl: `/icons/${name}.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

export default function OrderTrackingMap({
  orderData = sampleOrderData,
}: {
  orderData?: OrderData;
}) {
  const { origin, currentLocation, destination } = orderData;

  const bounds: [number, number][] = [
    [origin.lat, origin.lng],
    [currentLocation.lat, currentLocation.lng],
    [destination.lat, destination.lng],
  ];

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[currentLocation.lat, currentLocation.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds bounds={bounds} />

        {/* Origin Marker */}
        <Marker
          position={[origin.lat, origin.lng]}
          icon={loadIcon("origin")}
        >
          <Popup>
            <strong>Origin:</strong> {origin.name} <br />
            {origin.address}
          </Popup>
        </Marker>

        {/* Current Location Marker */}
        <Marker
          position={[currentLocation.lat, currentLocation.lng]}
          icon={loadIcon("current")}
        >
          <Popup>
            <strong>Current Location</strong> <br />
            {currentLocation.address} <br />
            <small>Last seen: {currentLocation.timestamp}</small>
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker
          position={[destination.lat, destination.lng]}
          icon={loadIcon("destination")}
        >
          <Popup>
            <strong>Destination:</strong> {destination.recipientName} <br />
            {destination.address}
          </Popup>
        </Marker>

        {/* Completed Route: origin → current */}
        <Polyline
          positions={[
            [origin.lat, origin.lng],
            [currentLocation.lat, currentLocation.lng],
          ]}
          pathOptions={{ color: "green", weight: 4 }}
        />

        {/* Remaining Route: current → destination (dotted line) */}
        <Polyline
          positions={[
            [currentLocation.lat, currentLocation.lng],
            [destination.lat, destination.lng],
          ]}
          pathOptions={{
            color: "red",
            dashArray: "8, 8",
            weight: 3,
          }}
        />
      </MapContainer>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontSize: "14px",
        }}
      >
        <strong>Legend:</strong>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <div>
            <img src="/icons/origin.png" width="20" />
            <div>Origin</div>
          </div>
          <div>
            <img src="/icons/current.png" width="20" />
            <div>Current</div>
          </div>
          <div>
            <img src="/icons/destination.png" width="20" />
            <div>Destination</div>
          </div>
        </div>
      </div>
    </div>
  );
}

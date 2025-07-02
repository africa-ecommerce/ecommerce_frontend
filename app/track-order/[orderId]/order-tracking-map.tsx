// "use client";

// import type React from "react";

// import { useState, useRef, useEffect, useCallback } from "react";
// import {
//   MapPin,
//   Package,
//   Home,
//   Warehouse,
//   Plus,
//   Minus,
//   Maximize2,
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

// interface OrderTrackingMapProps {
//   orderData: OrderData;
// }

// interface MapPoint {
//   lat: number;
//   lng: number;
//   type: "origin" | "current" | "destination";
//   label: string;
//   address: string;
//   details?: string;
// }

// export default function OrderTrackingMap({ orderData }: OrderTrackingMapProps) {
//   const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
//   const [zoom, setZoom] = useState(6);
//   const [center, setCenter] = useState({ lat: 39.8283, lng: -98.5795 }); // Center of US
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [mapStyle, setMapStyle] = useState<"roadmap" | "satellite">("roadmap");
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapContainerRef = useRef<HTMLDivElement>(null);

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
//       details: `Status: ${orderData.status}`,
//     },
//     {
//       lat: orderData.destination.lat,
//       lng: orderData.destination.lng,
//       type: "destination",
//       label: "Destination",
//       address: orderData.destination.recipientName,
//       details: orderData.destination.address,
//     },
//   ];

//   // Calculate initial center and zoom to fit all points
//   useEffect(() => {
//     const lats = mapPoints.map((p) => p.lat);
//     const lngs = mapPoints.map((p) => p.lng);

//     const minLat = Math.min(...lats);
//     const maxLat = Math.max(...lats);
//     const minLng = Math.min(...lngs);
//     const maxLng = Math.max(...lngs);

//     const centerLat = (minLat + maxLat) / 2;
//     const centerLng = (minLng + maxLng) / 2;

//     setCenter({ lat: centerLat, lng: centerLng });

//     // Calculate appropriate zoom level
//     const latDiff = maxLat - minLat;
//     const lngDiff = maxLng - minLng;
//     const maxDiff = Math.max(latDiff, lngDiff);

//     let newZoom = 10;
//     if (maxDiff > 20) newZoom = 4;
//     else if (maxDiff > 10) newZoom = 5;
//     else if (maxDiff > 5) newZoom = 6;
//     else if (maxDiff > 2) newZoom = 7;
//     else if (maxDiff > 1) newZoom = 8;
//     else if (maxDiff > 0.5) newZoom = 9;

//     setZoom(newZoom);
//   }, [orderData]);

//   // Convert lat/lng to pixel coordinates
//   const latLngToPixel = useCallback(
//     (lat: number, lng: number) => {
//       const mapWidth = 800;
//       const mapHeight = 400;

//       // Mercator projection
//       const scale = Math.pow(2, zoom);
//       const worldWidth = 256 * scale;
//       const worldHeight = 256 * scale;

//       const pixelX = (lng + 180) * (worldWidth / 360);
//       const pixelY =
//         ((1 -
//           Math.log(
//             Math.tan((lat * Math.PI) / 180) +
//               1 / Math.cos((lat * Math.PI) / 180)
//           ) /
//             Math.PI) /
//           2) *
//         worldHeight;

//       // Offset by center
//       const centerPixelX = (center.lng + 180) * (worldWidth / 360);
//       const centerPixelY =
//         ((1 -
//           Math.log(
//             Math.tan((center.lat * Math.PI) / 180) +
//               1 / Math.cos((center.lat * Math.PI) / 180)
//           ) /
//             Math.PI) /
//           2) *
//         worldHeight;

//       return {
//         x: pixelX - centerPixelX + mapWidth / 2,
//         y: pixelY - centerPixelY + mapHeight / 2,
//       };
//     },
//     [zoom, center]
//   );

//   // Convert pixel coordinates to lat/lng
//   const pixelToLatLng = useCallback(
//     (x: number, y: number) => {
//       const mapWidth = 800;
//       const mapHeight = 400;

//       const scale = Math.pow(2, zoom);
//       const worldWidth = 256 * scale;
//       const worldHeight = 256 * scale;

//       const centerPixelX = (center.lng + 180) * (worldWidth / 360);
//       const centerPixelY =
//         ((1 -
//           Math.log(
//             Math.tan((center.lat * Math.PI) / 180) +
//               1 / Math.cos((center.lat * Math.PI) / 180)
//           ) /
//             Math.PI) /
//           2) *
//         worldHeight;

//       const pixelX = x - mapWidth / 2 + centerPixelX;
//       const pixelY = y - mapHeight / 2 + centerPixelY;

//       const lng = (pixelX / worldWidth) * 360 - 180;
//       const lat =
//         (Math.atan(Math.sinh(Math.PI * (1 - (2 * pixelY) / worldHeight))) *
//           180) /
//         Math.PI;

//       return { lat, lng };
//     },
//     [zoom, center]
//   );

//   // Handle mouse events for panning
//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     setDragStart({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;

//     const deltaX = e.clientX - dragStart.x;
//     const deltaY = e.clientY - dragStart.y;

//     const startLatLng = pixelToLatLng(400, 200);
//     const endLatLng = pixelToLatLng(400 - deltaX, 200 - deltaY);

//     setCenter({
//       lat: center.lat + (endLatLng.lat - startLatLng.lat),
//       lng: center.lng + (endLatLng.lng - startLatLng.lng),
//     });

//     setDragStart({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Zoom functions
//   const zoomIn = () => setZoom(Math.min(zoom + 1, 18));
//   const zoomOut = () => setZoom(Math.max(zoom - 1, 2));

//   // Fit bounds to show all markers
//   const fitBounds = () => {
//     const lats = mapPoints.map((p) => p.lat);
//     const lngs = mapPoints.map((p) => p.lng);

//     const minLat = Math.min(...lats);
//     const maxLat = Math.max(...lats);
//     const minLng = Math.min(...lngs);
//     const maxLng = Math.max(...lngs);

//     const centerLat = (minLat + maxLat) / 2;
//     const centerLng = (minLng + maxLng) / 2;

//     setCenter({ lat: centerLat, lng: centerLng });

//     const latDiff = maxLat - minLat;
//     const lngDiff = maxLng - minLng;
//     const maxDiff = Math.max(latDiff, lngDiff);

//     let newZoom = 10;
//     if (maxDiff > 20) newZoom = 4;
//     else if (maxDiff > 10) newZoom = 5;
//     else if (maxDiff > 5) newZoom = 6;
//     else if (maxDiff > 2) newZoom = 7;
//     else if (maxDiff > 1) newZoom = 8;
//     else if (maxDiff > 0.5) newZoom = 9;

//     setZoom(newZoom);
//   };

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
//         return <Warehouse className="h-4 w-4 text-white" />;
//       case "current":
//         return <Package className="h-4 w-4 text-white" />;
//       case "destination":
//         return <Home className="h-4 w-4 text-white" />;
//       default:
//         return <MapPin className="h-4 w-4 text-white" />;
//     }
//   };

//   // Generate tile URLs for map tiles
//   const getTileUrl = (x: number, y: number, z: number) => {
//     if (mapStyle === "satellite") {
//       return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
//     }
//     return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
//   };

//   // Calculate which tiles to show
//   const getTilesInView = () => {
//     const tileSize = 256;
//     const scale = Math.pow(2, zoom);
//     const worldWidth = tileSize * scale;

//     const centerPixelX = (center.lng + 180) * (worldWidth / 360);
//     const centerPixelY =
//       ((1 -
//         Math.log(
//           Math.tan((center.lat * Math.PI) / 180) +
//             1 / Math.cos((center.lat * Math.PI) / 180)
//         ) /
//           Math.PI) /
//         2) *
//       worldWidth;

//     const mapWidth = 800;
//     const mapHeight = 400;

//     const startX = Math.floor((centerPixelX - mapWidth / 2) / tileSize);
//     const endX = Math.ceil((centerPixelX + mapWidth / 2) / tileSize);
//     const startY = Math.floor((centerPixelY - mapHeight / 2) / tileSize);
//     const endY = Math.ceil((centerPixelY + mapHeight / 2) / tileSize);

//     const tiles = [];
//     for (let x = startX; x < endX; x++) {
//       for (let y = startY; y < endY; y++) {
//         if (x >= 0 && y >= 0 && x < scale && y < scale) {
//           const pixelX = x * tileSize - centerPixelX + mapWidth / 2;
//           const pixelY = y * tileSize - centerPixelY + mapHeight / 2;

//           tiles.push({
//             x,
//             y,
//             z: zoom,
//             pixelX,
//             pixelY,
//             url: getTileUrl(x, y, zoom),
//           });
//         }
//       }
//     }

//     return tiles;
//   };

//   const tiles = getTilesInView();

//   return (
//     <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border">
//       {/* Map Container */}
//       <div
//         ref={mapContainerRef}
//         className={`absolute inset-0 ${
//           isDragging ? "cursor-grabbing" : "cursor-grab"
//         }`}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       >
//         {/* Map Tiles */}
//         <div className="absolute inset-0">
//           {tiles.map((tile, index) => (
//             <img
//               key={`${tile.x}-${tile.y}-${tile.z}`}
//               src={tile.url || "/placeholder.svg"}
//               alt=""
//               className="absolute w-64 h-64 select-none"
//               style={{
//                 left: tile.pixelX,
//                 top: tile.pixelY,
//                 imageRendering: zoom > 12 ? "pixelated" : "auto",
//               }}
//               draggable={false}
//               onError={(e) => {
//                 // Fallback to OpenStreetMap if satellite fails
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

//             if (
//               originPixel.x >= -50 &&
//               originPixel.x <= 850 &&
//               originPixel.y >= -50 &&
//               originPixel.y <= 450 &&
//               currentPixel.x >= -50 &&
//               currentPixel.x <= 850 &&
//               currentPixel.y >= -50 &&
//               currentPixel.y <= 450
//             ) {
//               return (
//                 <line
//                   x1={originPixel.x}
//                   y1={originPixel.y}
//                   x2={currentPixel.x}
//                   y2={currentPixel.y}
//                   stroke="#22c55e"
//                   strokeWidth="4"
//                   filter="url(#glow)"
//                   opacity="0.8"
//                 />
//               );
//             }
//             return null;
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

//             if (
//               currentPixel.x >= -50 &&
//               currentPixel.x <= 850 &&
//               currentPixel.y >= -50 &&
//               currentPixel.y <= 450 &&
//               destPixel.x >= -50 &&
//               destPixel.x <= 850 &&
//               destPixel.y >= -50 &&
//               destPixel.y <= 450
//             ) {
//               return (
//                 <line
//                   x1={currentPixel.x}
//                   y1={currentPixel.y}
//                   x2={destPixel.x}
//                   y2={destPixel.y}
//                   stroke="#94a3b8"
//                   strokeWidth="4"
//                   strokeDasharray="10,5"
//                   filter="url(#glow)"
//                   opacity="0.6"
//                 />
//               );
//             }
//             return null;
//           })()}
//         </svg>

//         {/* Map Markers */}
//         {mapPoints.map((point, index) => {
//           const pixel = latLngToPixel(point.lat, point.lng);

//           // Only render markers that are visible
//           if (
//             pixel.x < -50 ||
//             pixel.x > 850 ||
//             pixel.y < -50 ||
//             pixel.y > 450
//           ) {
//             return null;
//           }

//           return (
//             <div
//               key={index}
//               className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 hover:scale-110 z-10"
//               style={{ left: pixel.x, top: pixel.y }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedPoint(
//                   selectedPoint?.type === point.type ? null : point
//                 );
//               }}
//             >
//               {/* Marker Shadow */}
//               <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black/20 rounded-full blur-sm" />

//               {/* Marker */}
//               <div className="relative">
//                 <div
//                   className="w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center relative z-10"
//                   style={{ backgroundColor: getMarkerColor(point.type) }}
//                 >
//                   {getMarkerIcon(point.type)}
//                 </div>

//                 {/* Marker Pin */}
//                 <div
//                   className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent"
//                   style={{ borderTopColor: getMarkerColor(point.type) }}
//                 />

//                 {/* Pulse animation for current location */}
//                 {point.type === "current" && (
//                   <div
//                     className="absolute inset-0 rounded-full animate-ping opacity-75"
//                     style={{ backgroundColor: getMarkerColor(point.type) }}
//                   />
//                 )}
//               </div>
//             </div>
//           );
//         })}

//         {/* Info Popup */}
//         {selectedPoint &&
//           (() => {
//             const pixel = latLngToPixel(selectedPoint.lat, selectedPoint.lng);
//             return (
//               <div
//                 className="absolute z-20 bg-white rounded-lg shadow-xl border p-4 min-w-64 transform -translate-x-1/2"
//                 style={{
//                   left: Math.max(150, Math.min(pixel.x, 650)),
//                   top: Math.max(10, pixel.y - 140),
//                   maxWidth: "300px",
//                 }}
//               >
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <div
//                       className="w-4 h-4 rounded-full"
//                       style={{
//                         backgroundColor: getMarkerColor(selectedPoint.type),
//                       }}
//                     />
//                     <h3 className="font-semibold text-sm">
//                       {selectedPoint.label}
//                     </h3>
//                   </div>
//                   <p className="text-sm font-medium">{selectedPoint.address}</p>
//                   {selectedPoint.details && (
//                     <p className="text-xs text-gray-600">
//                       {selectedPoint.details}
//                     </p>
//                   )}
//                   <div className="text-xs text-gray-500">
//                     {selectedPoint.lat.toFixed(4)},{" "}
//                     {selectedPoint.lng.toFixed(4)}
//                   </div>
//                 </div>

//                 <button
//                   className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xs"
//                   onClick={() => setSelectedPoint(null)}
//                 >
//                   ×
//                 </button>
//               </div>
//             );
//           })()}
//       </div>

//       {/* Map Controls */}
//       <div className="absolute top-4 right-4 flex flex-col gap-2">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-10 h-10 p-0 rounded-none border-b"
//             onClick={zoomIn}
//             disabled={zoom >= 18}
//           >
//             <Plus className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="w-10 h-10 p-0 rounded-none"
//             onClick={zoomOut}
//             disabled={zoom <= 2}
//           >
//             <Minus className="h-4 w-4" />
//           </Button>
//         </div>

//         <Button
//           variant="outline"
//           size="sm"
//           className="bg-white"
//           onClick={fitBounds}
//         >
//           <Maximize2 className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Map Style Toggle */}
//       <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden">
//         <Button
//           variant={mapStyle === "roadmap" ? "default" : "ghost"}
//           size="sm"
//           className="rounded-none border-r text-xs px-3"
//           onClick={() => setMapStyle("roadmap")}
//         >
//           Map
//         </Button>
//         <Button
//           variant={mapStyle === "satellite" ? "default" : "ghost"}
//           size="sm"
//           className="rounded-none text-xs px-3"
//           onClick={() => setMapStyle("satellite")}
//         >
//           Satellite
//         </Button>
//       </div>

//       {/* Zoom Level Indicator */}
//       <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600">
//         Zoom: {zoom}
//       </div>

//       {/* Attribution */}
//       <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
//         {mapStyle === "satellite" ? "© Esri" : "© OpenStreetMap"}
//       </div>
//     </div>
//   );
// }






// "use client";

// import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
//     lat: 40.7128,
//     lng: -74.0060,
//     address: "New York, NY",
//     timestamp: "2025-07-02T14:30:00Z"
//   },
//   origin: {
//     lat: 41.8781,
//     lng: -87.6298,
//     address: "123 Warehouse St, Chicago, IL 60601",
//     name: "Chicago Distribution Center"
//   },
//   destination: {
//     lat: 42.3601,
//     lng: -71.0589,
//     address: "456 Main St, Boston, MA 02101",
//     recipientName: "John Smith"
//   },
//   estimatedDelivery: "2025-07-03T18:00:00Z"
// };

// export default function OrderTrackingMap({ orderData = sampleOrderData }: { orderData?: OrderData }) {
//   const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
//   const [zoom, setZoom] = useState(6);
//   const [center, setCenter] = useState({ lat: 41.5, lng: -81.5 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastTouch, setLastTouch] = useState<{ x: number; y: number } | null>(null);
//   const [mapStyle, setMapStyle] = useState<"roadmap" | "satellite">("roadmap");
//   const [showControls, setShowControls] = useState(true);
//   const [isAnimating, setIsAnimating] = useState(false);
  
//   const mapRef = useRef<HTMLDivElement>(null);
//   const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
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
//       details: `Status: ${orderData.status} • ${new Date(orderData.currentLocation.timestamp).toLocaleString()}`,
//     },
//     {
//       lat: orderData.destination.lat,
//       lng: orderData.destination.lng,
//       type: "destination",
//       label: "Destination",
//       address: orderData.destination.recipientName,
//       details: `${orderData.destination.address} • ETA: ${new Date(orderData.estimatedDelivery).toLocaleString()}`,
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

//     const paddedLatDiff = (maxLat - minLat) + latPadding;
//     const paddedLngDiff = (maxLng - minLng) + lngPadding;
//     const maxDiff = Math.max(paddedLatDiff, paddedLngDiff);

//     let newZoom = 10;
//     if (maxDiff > 30) newZoom = 3;
//     else if (maxDiff > 20) newZoom = 4;
//     else if (maxDiff > 10) newZoom = 5;
//     else if (maxDiff > 5) newZoom = 6;
//     else if (maxDiff > 2) newZoom = 7;
//     else if (maxDiff > 1) newZoom = 8;
//     else if (maxDiff > 0.5) newZoom = 9;
//     else if (maxDiff > 0.2) newZoom = 10;

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
//       const pixelY = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * worldWidth;

//       // Center offset calculation
//       const centerLatRad = (center.lat * Math.PI) / 180;
//       const centerPixelX = ((center.lng + 180) / 360) * worldWidth;
//       const centerPixelY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * worldWidth;

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
//       const centerPixelY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * worldWidth;

//       const worldX = x - mapWidth / 2 + centerPixelX;
//       const worldY = y - mapHeight / 2 + centerPixelY;

//       const lng = (worldX / worldWidth) * 360 - 180;
//       const lat = Math.atan(Math.sinh(Math.PI * (1 - (2 * worldY) / worldWidth))) * (180 / Math.PI);

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
//       touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
//     } else if (e.touches.length === 2) {
//       // Handle pinch for zoom
//       const touch1 = e.touches[0];
//       const touch2 = e.touches[1];
//       const distance = Math.sqrt(
//         Math.pow(touch2.clientX - touch1.clientX, 2) + 
//         Math.pow(touch2.clientY - touch1.clientY, 2)
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
//         const touchEnd = { x: e.changedTouches[0]?.clientX || 0, y: e.changedTouches[0]?.clientY || 0, time: Date.now() };
//         const timeDiff = touchEnd.time - touchStartRef.current.time;
//         const deltaX = touchEnd.x - touchStartRef.current.x;
//         const deltaY = touchEnd.y - touchStartRef.current.y;
        
//         if (timeDiff < 300 && (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50)) {
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
//       if (Math.abs(currentVelocityX) < 0.1 && Math.abs(currentVelocityY) < 0.1) {
//         setIsAnimating(false);
//         return;
//       }

//       const currentLatLng = pixelToLatLng(400, 200);
//       const newLatLng = pixelToLatLng(400 - currentVelocityX, 200 - currentVelocityY);

//       setCenter(prev => ({
//         lat: Math.max(-85, Math.min(85, prev.lat + (newLatLng.lat - currentLatLng.lat))),
//         lng: ((prev.lng + (newLatLng.lng - currentLatLng.lng)) + 540) % 360 - 180,
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
//   const smoothZoom = (targetZoom: number, duration: number = 300) => {
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
//     setZoom(prev => Math.max(1, Math.min(18, prev + delta)));
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
//     const paddedLatDiff = (maxLat - minLat) + latPadding;
//     const paddedLngDiff = (maxLng - minLng) + lngPadding;
//     const maxDiff = Math.max(paddedLatDiff, paddedLngDiff);

//     let newZoom = 10;
//     if (maxDiff > 30) newZoom = 3;
//     else if (maxDiff > 20) newZoom = 4;
//     else if (maxDiff > 10) newZoom = 5;
//     else if (maxDiff > 5) newZoom = 6;
//     else if (maxDiff > 2) newZoom = 7;
//     else if (maxDiff > 1) newZoom = 8;
//     else if (maxDiff > 0.5) newZoom = 9;

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
      
//       window.addEventListener('touchstart', handleInteraction);
//       window.addEventListener('touchmove', handleInteraction);
      
//       return () => {
//         clearTimeout(timeout);
//         window.removeEventListener('touchstart', handleInteraction);
//         window.removeEventListener('touchmove', handleInteraction);
//       };
//     }
//   }, []);

//   const getMarkerColor = (type: string) => {
//     switch (type) {
//       case "origin": return "#22c55e";
//       case "current": return "#3b82f6";
//       case "destination": return "#ef4444";
//       default: return "#6b7280";
//     }
//   };

//   const getMarkerIcon = (type: string) => {
//     switch (type) {
//       case "origin": return <Warehouse className="h-5 w-5 text-white" />;
//       case "current": return <Package className="h-5 w-5 text-white" />;
//       case "destination": return <Home className="h-5 w-5 text-white" />;
//       default: return <MapPin className="h-5 w-5 text-white" />;
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
//         let tileX = ((x % maxTiles) + maxTiles) % maxTiles;
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
//   }, [mapPoints, latLngToPixel]);

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
//               src={tile.url}
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





"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  MapPin,
  Package,
  Home,
  Warehouse,
  Plus,
  Minus,
  Maximize2,
  Navigation,
  Info,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderData {
  orderId: string;
  status: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
    timestamp: string;
  };
  origin: {
    lat: number;
    lng: number;
    address: string;
    name: string;
  };
  destination: {
    lat: number;
    lng: number;
    address: string;
    recipientName: string;
  };
  estimatedDelivery: string;
}

interface MapPoint {
  lat: number;
  lng: number;
  type: "origin" | "current" | "destination";
  label: string;
  address: string;
  details?: string;
}

// Sample order data for demo
const sampleOrderData: OrderData = {
  orderId: "ORD-2025-001",
  status: "In Transit",
  currentLocation: {
    lat: 40.7128,
    lng: -74.0060,
    address: "New York, NY",
    timestamp: "2025-07-02T14:30:00Z"
  },
  origin: {
    lat: 41.8781,
    lng: -87.6298,
    address: "123 Warehouse St, Chicago, IL 60601",
    name: "Chicago Distribution Center"
  },
  destination: {
    lat: 42.3601,
    lng: -71.0589,
    address: "456 Main St, Boston, MA 02101",
    recipientName: "John Smith"
  },
  estimatedDelivery: "2025-07-03T18:00:00Z"
};

export default function OrderTrackingMap({ orderData = sampleOrderData }: { orderData?: OrderData }) {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState({ lat: 41.5, lng: -81.5 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouch, setLastTouch] = useState<{ x: number; y: number } | null>(null);
  const [mapStyle, setMapStyle] = useState<"roadmap" | "satellite">("roadmap");
  const [showControls, setShowControls] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastPinchDistance = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const mapPoints: MapPoint[] = [
    {
      lat: orderData.origin.lat,
      lng: orderData.origin.lng,
      type: "origin",
      label: "Origin",
      address: orderData.origin.name,
      details: orderData.origin.address,
    },
    {
      lat: orderData.currentLocation.lat,
      lng: orderData.currentLocation.lng,
      type: "current",
      label: "Current Location",
      address: orderData.currentLocation.address,
      details: `Status: ${orderData.status} • ${new Date(orderData.currentLocation.timestamp).toLocaleString()}`,
    },
    {
      lat: orderData.destination.lat,
      lng: orderData.destination.lng,
      type: "destination",
      label: "Destination",
      address: orderData.destination.recipientName,
      details: `${orderData.destination.address} • ETA: ${new Date(orderData.estimatedDelivery).toLocaleString()}`,
    },
  ];

  // Enhanced bounds calculation utility
  const calculateOptimalBounds = useCallback((points: MapPoint[], containerWidth?: number, containerHeight?: number) => {
    if (points.length === 0) return { center: { lat: 0, lng: 0 }, zoom: 1 };

    const lats = points.map(p => p.lat);
    const lngs = points.map(p => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Calculate center
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // Calculate bounds dimensions
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;

    // Handle edge cases where all points are very close or identical
    const minLatDiff = 0.001; // ~100m
    const minLngDiff = 0.001;
    
    const adjustedLatDiff = Math.max(latDiff, minLatDiff);
    const adjustedLngDiff = Math.max(lngDiff, minLngDiff);

    // Get container dimensions
    const mapWidth = containerWidth || mapRef.current?.clientWidth || 800;
    const mapHeight = containerHeight || mapRef.current?.clientHeight || 400;

    // Calculate padding based on container size (responsive padding)
    const basePadding = Math.min(mapWidth, mapHeight) * 0.15; // 15% of smaller dimension
    const minPadding = 50; // Minimum padding in pixels
    const maxPadding = 150; // Maximum padding in pixels
    const padding = Math.max(minPadding, Math.min(maxPadding, basePadding));

    // Convert padding from pixels to degrees (approximate)
    const latPaddingDegrees = (padding / mapHeight) * adjustedLatDiff * 2;
    const lngPaddingDegrees = (padding / mapWidth) * adjustedLngDiff * 2;

    // Calculate padded bounds
    const paddedLatDiff = adjustedLatDiff + latPaddingDegrees;
    const paddedLngDiff = adjustedLngDiff + lngPaddingDegrees;

    // Enhanced zoom calculation using Web Mercator projection
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 18;

    function latRad(lat: number) {
      const sin = Math.sin(lat * Math.PI / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function getZoomFromBounds(latDiff: number, lngDiff: number, mapWidth: number, mapHeight: number) {
      const ne = { lat: centerLat + latDiff / 2, lng: centerLng + lngDiff / 2 };
      const sw = { lat: centerLat - latDiff / 2, lng: centerLng - lngDiff / 2 };

      const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;
      const lngDiff360 = ne.lng - sw.lng;
      const lngFraction = ((lngDiff360 < 0) ? (lngDiff360 + 360) : lngDiff360) / 360;

      const latZoom = Math.floor(Math.log(mapHeight / WORLD_DIM.height / latFraction) / Math.LN2);
      const lngZoom = Math.floor(Math.log(mapWidth / WORLD_DIM.width / lngFraction) / Math.LN2);

      return Math.min(latZoom, lngZoom, ZOOM_MAX);
    }

    let calculatedZoom = getZoomFromBounds(paddedLatDiff, paddedLngDiff, mapWidth, mapHeight);
    
    // Apply constraints and adjustments
    calculatedZoom = Math.max(2, Math.min(16, calculatedZoom)); // Reasonable zoom range

    // Special handling for very close points
    if (latDiff < 0.01 && lngDiff < 0.01) {
      calculatedZoom = Math.min(calculatedZoom, 14); // Limit max zoom for very close points
    }

    // Adjust for mobile devices (smaller screens need less zoom)
    if (mapWidth < 768) {
      calculatedZoom = Math.max(2, calculatedZoom - 1);
    }

    return {
      center: { lat: centerLat, lng: centerLng },
      zoom: calculatedZoom
    };
  }, []);

  // Enhanced initial positioning
  useEffect(() => {
    const updateBounds = () => {
      setTimeout(() => {
        const bounds = calculateOptimalBounds(mapPoints);
        setCenter(bounds.center);
        setZoom(bounds.zoom);
      }, 100); // Small delay to ensure container dimensions are available
    };

    updateBounds();

    // Handle window resize
    const handleResize = () => {
      updateBounds();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [orderData, calculateOptimalBounds, mapPoints]);

  // Coordinate conversion functions
  const latLngToPixel = useCallback(
    (lat: number, lng: number) => {
      const mapWidth = mapRef.current?.clientWidth || 800;
      const mapHeight = mapRef.current?.clientHeight || 400;

      const scale = Math.pow(2, zoom);
      const worldWidth = 256 * scale;

      const latRad = (lat * Math.PI) / 180;
      const pixelX = ((lng + 180) / 360) * worldWidth;
      const pixelY = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * worldWidth;

      const centerLatRad = (center.lat * Math.PI) / 180;
      const centerPixelX = ((center.lng + 180) / 360) * worldWidth;
      const centerPixelY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * worldWidth;

      return {
        x: pixelX - centerPixelX + mapWidth / 2,
        y: pixelY - centerPixelY + mapHeight / 2,
      };
    },
    [zoom, center]
  );

  const pixelToLatLng = useCallback(
    (x: number, y: number) => {
      const mapWidth = mapRef.current?.clientWidth || 800;
      const mapHeight = mapRef.current?.clientHeight || 400;

      const scale = Math.pow(2, zoom);
      const worldWidth = 256 * scale;

      const centerLatRad = (center.lat * Math.PI) / 180;
      const centerPixelX = ((center.lng + 180) / 360) * worldWidth;
      const centerPixelY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * worldWidth;

      const worldX = x - mapWidth / 2 + centerPixelX;
      const worldY = y - mapHeight / 2 + centerPixelY;

      const lng = (worldX / worldWidth) * 360 - 180;
      const lat = Math.atan(Math.sinh(Math.PI * (1 - (2 * worldY) / worldWidth))) * (180 / Math.PI);

      return { lat, lng };
    },
    [zoom, center]
  );

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastTouch({ x: touch.clientX, y: touch.clientY });
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      lastPinchDistance.current = distance;
      setIsDragging(false);
    }
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();

      if (e.touches.length === 1 && isDragging && lastTouch) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastTouch.x;
        const deltaY = touch.clientY - lastTouch.y;

        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
          const currentLatLng = pixelToLatLng(400, 200);
          const newLatLng = pixelToLatLng(400 - deltaX, 200 - deltaY);

          setCenter((prev) => ({
            lat: Math.max(-85, Math.min(85, prev.lat + (newLatLng.lat - currentLatLng.lat))),
            lng: ((prev.lng + (newLatLng.lng - currentLatLng.lng) + 540) % 360) - 180,
          }));

          setLastTouch({ x: touch.clientX, y: touch.clientY });
        }
      } else if (e.touches.length === 2 && lastPinchDistance.current !== null) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        const scale = distance / lastPinchDistance.current;
        const zoomDelta = Math.log2(scale);

        if (Math.abs(zoomDelta) > 0.15) {
          setZoom((prev) => Math.max(1, Math.min(18, prev + zoomDelta)));
          lastPinchDistance.current = distance;
        }
      }
    },
    [isDragging, lastTouch, pixelToLatLng]
  );

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsDragging(false);
      setLastTouch(null);
      lastPinchDistance.current = null;
      
      if (touchStartRef.current) {
        const touchEnd = { x: e.changedTouches[0]?.clientX || 0, y: e.changedTouches[0]?.clientY || 0, time: Date.now() };
        const timeDiff = touchEnd.time - touchStartRef.current.time;
        const deltaX = touchEnd.x - touchStartRef.current.x;
        const deltaY = touchEnd.y - touchStartRef.current.y;
        
        if (timeDiff < 300 && (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50)) {
          const velocityX = deltaX / timeDiff;
          const velocityY = deltaY / timeDiff;
          applyMomentum(velocityX, velocityY);
        }
        
        touchStartRef.current = null;
      }
    }
  };

  const applyMomentum = (velocityX: number, velocityY: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const friction = 0.95;
    let currentVelocityX = velocityX * 2;
    let currentVelocityY = velocityY * 2;

    const animate = () => {
      if (Math.abs(currentVelocityX) < 0.1 && Math.abs(currentVelocityY) < 0.1) {
        setIsAnimating(false);
        return;
      }

      const currentLatLng = pixelToLatLng(400, 200);
      const newLatLng = pixelToLatLng(400 - currentVelocityX, 200 - currentVelocityY);

      setCenter(prev => ({
        lat: Math.max(-85, Math.min(85, prev.lat + (newLatLng.lat - currentLatLng.lat))),
        lng: ((prev.lng + (newLatLng.lng - currentLatLng.lng)) + 540) % 360 - 180,
      }));

      currentVelocityX *= friction;
      currentVelocityY *= friction;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setLastTouch({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !lastTouch) return;

      const deltaX = e.clientX - lastTouch.x;
      const deltaY = e.clientY - lastTouch.y;

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        const currentLatLng = pixelToLatLng(400, 200);
        const newLatLng = pixelToLatLng(400 - deltaX, 200 - deltaY);

        setCenter((prev) => ({
          lat: Math.max(-85, Math.min(85, prev.lat + (newLatLng.lat - currentLatLng.lat))),
          lng: ((prev.lng + (newLatLng.lng - currentLatLng.lng) + 540) % 360) - 180,
        }));

        setLastTouch({ x: e.clientX, y: e.clientY });
      }
    },
    [isDragging, lastTouch, pixelToLatLng]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastTouch(null);
  };

  // Enhanced zoom functions with animation
  const smoothZoom = (targetZoom: number, duration: number = 200) => {
    const startZoom = zoom;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 2); // Ease out quad
      
      const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;
      setZoom(currentZoom);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  };

  const zoomIn = () => smoothZoom(Math.min(zoom + 1.5, 18));
  const zoomOut = () => smoothZoom(Math.max(zoom - 1.5, 1));

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.5 : 0.5;
    setZoom(prev => Math.max(1, Math.min(18, prev + delta)));
  };

  // Enhanced fit bounds function
  const fitBounds = useCallback(() => {
    const mapWidth = mapRef.current?.clientWidth || 800;
    const mapHeight = mapRef.current?.clientHeight || 400;
    
    const bounds = calculateOptimalBounds(mapPoints, mapWidth, mapHeight);
    
    // Animate to new position
    const startCenter = center;
    const startZoom = zoom;
    const startTime = Date.now();
    const duration = 800;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      // Interpolate center
      const currentCenter = {
        lat: startCenter.lat + (bounds.center.lat - startCenter.lat) * easeProgress,
        lng: startCenter.lng + (bounds.center.lng - startCenter.lng) * easeProgress,
      };
      
      // Interpolate zoom
      const currentZoom = startZoom + (bounds.zoom - startZoom) * easeProgress;
      
      setCenter(currentCenter);
      setZoom(currentZoom);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [mapPoints, calculateOptimalBounds, center, zoom]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetTimeout = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 4000);
    };

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      resetTimeout();
      const handleInteraction = () => resetTimeout();
      
      window.addEventListener('touchstart', handleInteraction);
      window.addEventListener('touchmove', handleInteraction);
      
      return () => {
        clearTimeout(timeout);
        window.removeEventListener('touchstart', handleInteraction);
        window.removeEventListener('touchmove', handleInteraction);
      };
    }
  }, []);

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "origin": return "#22c55e";
      case "current": return "#3b82f6";
      case "destination": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "origin": return <Warehouse className="h-5 w-5 text-white" />;
      case "current": return <Package className="h-5 w-5 text-white" />;
      case "destination": return <Home className="h-5 w-5 text-white" />;
      default: return <MapPin className="h-5 w-5 text-white" />;
    }
  };

  const getTileUrl = (x: number, y: number, z: number) => {
    if (mapStyle === "satellite") {
      return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
    }
    return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  };

  const getTilesInView = useCallback(() => {
    const mapWidth = mapRef.current?.clientWidth || 800;
    const mapHeight = mapRef.current?.clientHeight || 400;
    const tileSize = 256;
    const scale = Math.pow(2, zoom);
    const worldWidth = tileSize * scale;

    const centerLatRad = (center.lat * Math.PI) / 180;
    const centerPixelX = ((center.lng + 180) / 360) * worldWidth;
    const centerPixelY = ((1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2) * worldWidth;

    const startX = Math.floor((centerPixelX - mapWidth / 2) / tileSize) - 1;
    const endX = Math.ceil((centerPixelX + mapWidth / 2) / tileSize) + 1;
    const startY = Math.floor((centerPixelY - mapHeight / 2) / tileSize) - 1;
    const endY = Math.ceil((centerPixelY + mapHeight / 2) / tileSize) + 1;

    const tiles = [];
    const maxTiles = Math.pow(2, Math.floor(zoom));
    const maxTileCount = 30;
    let tileCount = 0;

    for (let x = startX; x <= endX && tileCount < maxTileCount; x++) {
      for (let y = startY; y <= endY && tileCount < maxTileCount; y++) {
        let tileX = ((x % maxTiles) + maxTiles) % maxTiles;
        if (y >= 0 && y < maxTiles) {
          const pixelX = x * tileSize - centerPixelX + mapWidth / 2;
          const pixelY = y * tileSize - centerPixelY + mapHeight / 2;

          tiles.push({
            x: tileX,
            y,
            z: Math.floor(zoom),
            pixelX,
            pixelY,
            url: getTileUrl(tileX, y, Math.floor(zoom)),
          });
          tileCount++;
        }
      }
    }

    return tiles;
  }, [zoom, center, mapStyle]);

  const memoizedMarkers = useMemo(() => {
    return mapPoints
      .map((point, index) => {
        const pixel = latLngToPixel(point.lat, point.lng);
        const mapWidth = mapRef.current?.clientWidth || 800;
        const mapHeight = mapRef.current?.clientHeight || 400;

        if (pixel.x < -100 || pixel.x > mapWidth + 100 || pixel.y < -100 || pixel.y > mapHeight + 100) {
          return null;
        }

        return { point, pixel, index };
      })
      .filter(Boolean);
  }, [mapPoints, latLngToPixel]);

  const tiles = getTilesInView();

  return (
    <div className="relative w-full h-[65vh] md:h-96 bg-gray-100 rounded-lg overflow-hidden border shadow-lg">
      {/* Map Container */}
      <div
        ref={mapRef}
        className={`absolute inset-0 select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"} touch-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        style={{ touchAction: "none" }}
      >
        {/* Map Tiles */}
        <div className="absolute inset-0">
          {tiles.map((tile, index) => (
            <img
              key={`${tile.x}-${tile.y}-${tile.z}-${index}`}
              src={tile.url}
              alt=""
              className="absolute w-64 h-64 select-none pointer-events-none"
              style={{
                left: tile.pixelX,
                top: tile.pixelY,
                imageRendering: zoom > 12 ? "pixelated" : "auto",
                transition: isAnimating ? "none" : "transform 0.1s ease-out",
                willChange: isDragging ? "transform" : "auto",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
              draggable={false}
              onError={(e) => {
                if (mapStyle === "satellite") {
                  e.currentTarget.src = `https://tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`;
                }
              }}
            />
          ))}
        </div>

        {/* Route Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Completed route */}
          {(() => {
            const originPixel = latLngToPixel(orderData.origin.lat, orderData.origin.lng);
            const currentPixel = latLngToPixel(orderData.currentLocation.lat, orderData.currentLocation.lng);

            return (
              <line
                x1={originPixel.x}
                y1={originPixel.y}
                x2={currentPixel.x}
                y2={currentPixel.y}
                stroke="#22c55e"
                strokeWidth="5"
                filter="url(#glow)"
                opacity="0.9"
                strokeLinecap="round"
              />
            );
          })()}

          {/* Remaining route */}
          {(() => {
            const currentPixel = latLngToPixel(orderData.currentLocation.lat, orderData.currentLocation.lng);
            const destPixel = latLngToPixel(orderData.destination.lat, orderData.destination.lng);

            return (
              <line
                x1={currentPixel.x}
                y1={currentPixel.y}
                x2={destPixel.x}
                y2={destPixel.y}
                stroke="#94a3b8"
                strokeWidth="5"
                strokeDasharray="12,8"
                filter="url(#glow)"
                opacity="0.7"
                strokeLinecap="round"
              />
            );
          })()}
        </svg>

        {/* Map Markers */}
        {memoizedMarkers.map((markerData) => {
          if (!markerData) return null;
          const { point, pixel, index } = markerData;

          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 hover:scale-110 z-10"
              style={{
                left: pixel.x,
                top: pixel.y,
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPoint(selectedPoint?.type === point.type ? null : point);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedPoint(
                  selectedPoint?.type === point.type ? null : point
                );
              }}
            >
              {/* Marker */}
              <div className="relative">
                <div
                  className="w-12 h-12 md:w-10 md:h-10 rounded-full border-3 border-white shadow-xl flex items-center justify-center relative z-10 transition-all duration-200"
                  style={{ backgroundColor: getMarkerColor(point.type) }}
                >
                  {getMarkerIcon(point.type)}
                </div>

                {/* Marker Pin */}
                <div
                  className="absolute top-10 md:top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-6 border-transparent"
                  style={{ borderTopColor: getMarkerColor(point.type) }}
                />

                {/* Enhanced pulse animation for current location */}
                {point.type === "current" && (
                  <>
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: getMarkerColor(point.type) }}
                    />
                    <div
                      className="absolute inset-2 rounded-full animate-pulse opacity-50"
                      style={{ backgroundColor: getMarkerColor(point.type) }}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* Enhanced Info Popup */}
        {selectedPoint &&
          (() => {
            const pixel = latLngToPixel(selectedPoint.lat, selectedPoint.lng);
            const mapWidth = mapRef.current?.clientWidth || 800;
            const mapHeight = mapRef.current?.clientHeight || 400;

            // Smart positioning to keep popup in view
            const popupWidth = 320;
            const popupHeight = 140;
            let left = pixel.x;
            let top = pixel.y - popupHeight - 20;

            // Adjust horizontal position
            if (left + popupWidth / 2 > mapWidth - 20) {
              left = mapWidth - popupWidth / 2 - 20;
            } else if (left - popupWidth / 2 < 20) {
              left = popupWidth / 2 + 20;
            }

            // Adjust vertical position
            if (top < 20) {
              top = pixel.y + 40;
            }

            return (
              <div
                className="absolute z-30 bg-white rounded-xl shadow-2xl border p-4 transform -translate-x-1/2 backdrop-blur-sm bg-white/95"
                style={{
                  left: left,
                  top: top,
                  width: "320px",
                  maxWidth: "90vw",
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="sm:w-6 sm:h-6 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: getMarkerColor(selectedPoint.type),
                      }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-gray-900">
                      {selectedPoint.label}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm font-semibold text-gray-800">
                      {selectedPoint.address}
                    </p>
                    {selectedPoint.details && (
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {selectedPoint.details}
                      </p>
                    )}
                    <div className="text-[10px] md:text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                      {selectedPoint.lat.toFixed(4)},{" "}
                      {selectedPoint.lng.toFixed(4)}
                    </div>
                  </div>
                </div>

                <button
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-colors duration-200"
                  onClick={() => setSelectedPoint(null)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setSelectedPoint(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Popup arrow */}
                <div
                  className="absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: top < pixel.y ? "auto" : "-4px",
                    top: top < pixel.y ? "-4px" : "auto",
                    borderTopColor: top < pixel.y ? "transparent" : "white",
                    borderBottomColor: top < pixel.y ? "white" : "transparent",
                    borderBottomWidth: top < pixel.y ? "4px" : "0",
                  }}
                />
              </div>
            );
          })()}
      </div>

      {/* Enhanced Controls with auto-hide on mobile */}
      <div
        className={`absolute top-4 right-4 flex flex-col sm:gap-3 gap-6 transition-all duration-300 ${
          showControls
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        } md:opacity-100 md:translate-x-0 md:pointer-events-auto`}
      >
        {/* Zoom Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className="w-12 h-12 p-0 rounded-none border-b  transition-colors duration-200"
            onClick={zoomIn}
            disabled={zoom >= 18}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-12 h-12 p-0 rounded-none  transition-colors duration-200"
            onClick={zoomOut}
            disabled={zoom <= 1}
          >
            <Minus className="h-5 w-5" />
          </Button>
        </div>

        {/* Fit Bounds Button */}
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm  transition-all duration-200 w-12 h-12 p-0 rounded-xl shadow-lg"
          onClick={fitBounds}
          title="Fit all locations"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>

      

        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm  transition-all duration-200 w-12 h-12 p-0 rounded-xl shadow-lg"
          onClick={() => {
            setCenter({
              lat: orderData.currentLocation.lat,
              lng: orderData.currentLocation.lng,
            });
            // Use a more reasonable zoom level based on current zoom to avoid lag
            const targetZoom = zoom < 8 ? Math.min(zoom + 3, 10) : 12;
            smoothZoom(targetZoom);
          }}
          title="Center on current location"
        >
          <Navigation className="h-5 w-5 text-green-600" />
        </Button>
      </div>

      {/* Map Style Toggle */}
      <div
        className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
          showControls
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none"
        } md:opacity-100 md:translate-x-0 md:pointer-events-auto`}
      >
        <Button
          variant={mapStyle === "roadmap" ? "default" : "ghost"}
          size="sm"
          className="rounded-none border-r text-sm px-4 py-2 transition-colors duration-200"
          onClick={() => setMapStyle("roadmap")}
        >
          Map
        </Button>
        <Button
          variant={mapStyle === "satellite" ? "default" : "ghost"}
          size="sm"
          className="rounded-none text-sm px-4 py-2 transition-colors duration-200"
          onClick={() => setMapStyle("satellite")}
        >
          Satellite
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-2 max-w-xs">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Legend
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Warehouse className="h-2 w-2 text-white" />
            </div>
            <span className="md:text-xs text-[10px] text-gray-700">Origin</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Package className="h-2 w-2 text-white" />
            </div>
            <span className="md:text-xs text-[10px] text-gray-700">
              Current Location
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <Home className="h-2 w-2 text-white" />
            </div>
            <span className="md:text-xs text-[10px] text-gray-700">
              Destination
            </span>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
            <div className="w-4 h-1 bg-green-500 rounded"></div>
            <span className="md:text-xs text-[10px] text-gray-700">
              Completed Route
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-1 bg-gray-400 rounded"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #94a3b8 0, #94a3b8 8px, transparent 8px, transparent 16px)",
              }}
            ></div>
            <span className="md:text-xs text-[10px] text-gray-700">
              Remaining Route
            </span>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
        {mapStyle === "satellite"
          ? "© Esri, DigitalGlobe"
          : "© OpenStreetMap contributors"}
      </div>

      {/* Mobile Interaction Hints */}
      <div className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {!isDragging && zoom < 3 && (
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm text-center animate-fade-in-out">
            <div>Pinch to zoom • Drag to pan</div>
            <div className="text-xs opacity-75">Tap markers for details</div>
          </div>
        )}
      </div>

      {/* Performance Indicator */}
      {isAnimating && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}
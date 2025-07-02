"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MapPin,
  Package,
  Home,
  Warehouse,
  Plus,
  Minus,
  Maximize2,
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

interface OrderTrackingMapProps {
  orderData: OrderData;
}

interface MapPoint {
  lat: number;
  lng: number;
  type: "origin" | "current" | "destination";
  label: string;
  address: string;
  details?: string;
}

export default function OrderTrackingMap({ orderData }: OrderTrackingMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState({ lat: 39.8283, lng: -98.5795 }); // Center of US
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapStyle, setMapStyle] = useState<"roadmap" | "satellite">("roadmap");
  const mapRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
      details: `Status: ${orderData.status}`,
    },
    {
      lat: orderData.destination.lat,
      lng: orderData.destination.lng,
      type: "destination",
      label: "Destination",
      address: orderData.destination.recipientName,
      details: orderData.destination.address,
    },
  ];

  // Calculate initial center and zoom to fit all points
  useEffect(() => {
    const lats = mapPoints.map((p) => p.lat);
    const lngs = mapPoints.map((p) => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    setCenter({ lat: centerLat, lng: centerLng });

    // Calculate appropriate zoom level
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);

    let newZoom = 10;
    if (maxDiff > 20) newZoom = 4;
    else if (maxDiff > 10) newZoom = 5;
    else if (maxDiff > 5) newZoom = 6;
    else if (maxDiff > 2) newZoom = 7;
    else if (maxDiff > 1) newZoom = 8;
    else if (maxDiff > 0.5) newZoom = 9;

    setZoom(newZoom);
  }, [orderData]);

  // Convert lat/lng to pixel coordinates
  const latLngToPixel = useCallback(
    (lat: number, lng: number) => {
      const mapWidth = 800;
      const mapHeight = 400;

      // Mercator projection
      const scale = Math.pow(2, zoom);
      const worldWidth = 256 * scale;
      const worldHeight = 256 * scale;

      const pixelX = (lng + 180) * (worldWidth / 360);
      const pixelY =
        ((1 -
          Math.log(
            Math.tan((lat * Math.PI) / 180) +
              1 / Math.cos((lat * Math.PI) / 180)
          ) /
            Math.PI) /
          2) *
        worldHeight;

      // Offset by center
      const centerPixelX = (center.lng + 180) * (worldWidth / 360);
      const centerPixelY =
        ((1 -
          Math.log(
            Math.tan((center.lat * Math.PI) / 180) +
              1 / Math.cos((center.lat * Math.PI) / 180)
          ) /
            Math.PI) /
          2) *
        worldHeight;

      return {
        x: pixelX - centerPixelX + mapWidth / 2,
        y: pixelY - centerPixelY + mapHeight / 2,
      };
    },
    [zoom, center]
  );

  // Convert pixel coordinates to lat/lng
  const pixelToLatLng = useCallback(
    (x: number, y: number) => {
      const mapWidth = 800;
      const mapHeight = 400;

      const scale = Math.pow(2, zoom);
      const worldWidth = 256 * scale;
      const worldHeight = 256 * scale;

      const centerPixelX = (center.lng + 180) * (worldWidth / 360);
      const centerPixelY =
        ((1 -
          Math.log(
            Math.tan((center.lat * Math.PI) / 180) +
              1 / Math.cos((center.lat * Math.PI) / 180)
          ) /
            Math.PI) /
          2) *
        worldHeight;

      const pixelX = x - mapWidth / 2 + centerPixelX;
      const pixelY = y - mapHeight / 2 + centerPixelY;

      const lng = (pixelX / worldWidth) * 360 - 180;
      const lat =
        (Math.atan(Math.sinh(Math.PI * (1 - (2 * pixelY) / worldHeight))) *
          180) /
        Math.PI;

      return { lat, lng };
    },
    [zoom, center]
  );

  // Handle mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    const startLatLng = pixelToLatLng(400, 200);
    const endLatLng = pixelToLatLng(400 - deltaX, 200 - deltaY);

    setCenter({
      lat: center.lat + (endLatLng.lat - startLatLng.lat),
      lng: center.lng + (endLatLng.lng - startLatLng.lng),
    });

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom functions
  const zoomIn = () => setZoom(Math.min(zoom + 1, 18));
  const zoomOut = () => setZoom(Math.max(zoom - 1, 2));

  // Fit bounds to show all markers
  const fitBounds = () => {
    const lats = mapPoints.map((p) => p.lat);
    const lngs = mapPoints.map((p) => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    setCenter({ lat: centerLat, lng: centerLng });

    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);

    let newZoom = 10;
    if (maxDiff > 20) newZoom = 4;
    else if (maxDiff > 10) newZoom = 5;
    else if (maxDiff > 5) newZoom = 6;
    else if (maxDiff > 2) newZoom = 7;
    else if (maxDiff > 1) newZoom = 8;
    else if (maxDiff > 0.5) newZoom = 9;

    setZoom(newZoom);
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "origin":
        return "#22c55e";
      case "current":
        return "#3b82f6";
      case "destination":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "origin":
        return <Warehouse className="h-4 w-4 text-white" />;
      case "current":
        return <Package className="h-4 w-4 text-white" />;
      case "destination":
        return <Home className="h-4 w-4 text-white" />;
      default:
        return <MapPin className="h-4 w-4 text-white" />;
    }
  };

  // Generate tile URLs for map tiles
  const getTileUrl = (x: number, y: number, z: number) => {
    if (mapStyle === "satellite") {
      return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
    }
    return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  };

  // Calculate which tiles to show
  const getTilesInView = () => {
    const tileSize = 256;
    const scale = Math.pow(2, zoom);
    const worldWidth = tileSize * scale;

    const centerPixelX = (center.lng + 180) * (worldWidth / 360);
    const centerPixelY =
      ((1 -
        Math.log(
          Math.tan((center.lat * Math.PI) / 180) +
            1 / Math.cos((center.lat * Math.PI) / 180)
        ) /
          Math.PI) /
        2) *
      worldWidth;

    const mapWidth = 800;
    const mapHeight = 400;

    const startX = Math.floor((centerPixelX - mapWidth / 2) / tileSize);
    const endX = Math.ceil((centerPixelX + mapWidth / 2) / tileSize);
    const startY = Math.floor((centerPixelY - mapHeight / 2) / tileSize);
    const endY = Math.ceil((centerPixelY + mapHeight / 2) / tileSize);

    const tiles = [];
    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        if (x >= 0 && y >= 0 && x < scale && y < scale) {
          const pixelX = x * tileSize - centerPixelX + mapWidth / 2;
          const pixelY = y * tileSize - centerPixelY + mapHeight / 2;

          tiles.push({
            x,
            y,
            z: zoom,
            pixelX,
            pixelY,
            url: getTileUrl(x, y, zoom),
          });
        }
      }
    }

    return tiles;
  };

  const tiles = getTilesInView();

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border">
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className={`absolute inset-0 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Map Tiles */}
        <div className="absolute inset-0">
          {tiles.map((tile, index) => (
            <img
              key={`${tile.x}-${tile.y}-${tile.z}`}
              src={tile.url || "/placeholder.svg"}
              alt=""
              className="absolute w-64 h-64 select-none"
              style={{
                left: tile.pixelX,
                top: tile.pixelY,
                imageRendering: zoom > 12 ? "pixelated" : "auto",
              }}
              draggable={false}
              onError={(e) => {
                // Fallback to OpenStreetMap if satellite fails
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
            const originPixel = latLngToPixel(
              orderData.origin.lat,
              orderData.origin.lng
            );
            const currentPixel = latLngToPixel(
              orderData.currentLocation.lat,
              orderData.currentLocation.lng
            );

            if (
              originPixel.x >= -50 &&
              originPixel.x <= 850 &&
              originPixel.y >= -50 &&
              originPixel.y <= 450 &&
              currentPixel.x >= -50 &&
              currentPixel.x <= 850 &&
              currentPixel.y >= -50 &&
              currentPixel.y <= 450
            ) {
              return (
                <line
                  x1={originPixel.x}
                  y1={originPixel.y}
                  x2={currentPixel.x}
                  y2={currentPixel.y}
                  stroke="#22c55e"
                  strokeWidth="4"
                  filter="url(#glow)"
                  opacity="0.8"
                />
              );
            }
            return null;
          })()}

          {/* Remaining route */}
          {(() => {
            const currentPixel = latLngToPixel(
              orderData.currentLocation.lat,
              orderData.currentLocation.lng
            );
            const destPixel = latLngToPixel(
              orderData.destination.lat,
              orderData.destination.lng
            );

            if (
              currentPixel.x >= -50 &&
              currentPixel.x <= 850 &&
              currentPixel.y >= -50 &&
              currentPixel.y <= 450 &&
              destPixel.x >= -50 &&
              destPixel.x <= 850 &&
              destPixel.y >= -50 &&
              destPixel.y <= 450
            ) {
              return (
                <line
                  x1={currentPixel.x}
                  y1={currentPixel.y}
                  x2={destPixel.x}
                  y2={destPixel.y}
                  stroke="#94a3b8"
                  strokeWidth="4"
                  strokeDasharray="10,5"
                  filter="url(#glow)"
                  opacity="0.6"
                />
              );
            }
            return null;
          })()}
        </svg>

        {/* Map Markers */}
        {mapPoints.map((point, index) => {
          const pixel = latLngToPixel(point.lat, point.lng);

          // Only render markers that are visible
          if (
            pixel.x < -50 ||
            pixel.x > 850 ||
            pixel.y < -50 ||
            pixel.y > 450
          ) {
            return null;
          }

          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 hover:scale-110 z-10"
              style={{ left: pixel.x, top: pixel.y }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPoint(
                  selectedPoint?.type === point.type ? null : point
                );
              }}
            >
              {/* Marker Shadow */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black/20 rounded-full blur-sm" />

              {/* Marker */}
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center relative z-10"
                  style={{ backgroundColor: getMarkerColor(point.type) }}
                >
                  {getMarkerIcon(point.type)}
                </div>

                {/* Marker Pin */}
                <div
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent"
                  style={{ borderTopColor: getMarkerColor(point.type) }}
                />

                {/* Pulse animation for current location */}
                {point.type === "current" && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: getMarkerColor(point.type) }}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Info Popup */}
        {selectedPoint &&
          (() => {
            const pixel = latLngToPixel(selectedPoint.lat, selectedPoint.lng);
            return (
              <div
                className="absolute z-20 bg-white rounded-lg shadow-xl border p-4 min-w-64 transform -translate-x-1/2"
                style={{
                  left: Math.max(150, Math.min(pixel.x, 650)),
                  top: Math.max(10, pixel.y - 140),
                  maxWidth: "300px",
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: getMarkerColor(selectedPoint.type),
                      }}
                    />
                    <h3 className="font-semibold text-sm">
                      {selectedPoint.label}
                    </h3>
                  </div>
                  <p className="text-sm font-medium">{selectedPoint.address}</p>
                  {selectedPoint.details && (
                    <p className="text-xs text-gray-600">
                      {selectedPoint.details}
                    </p>
                  )}
                  <div className="text-xs text-gray-500">
                    {selectedPoint.lat.toFixed(4)},{" "}
                    {selectedPoint.lng.toFixed(4)}
                  </div>
                </div>

                <button
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xs"
                  onClick={() => setSelectedPoint(null)}
                >
                  ×
                </button>
              </div>
            );
          })()}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 rounded-none border-b"
            onClick={zoomIn}
            disabled={zoom >= 18}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 rounded-none"
            onClick={zoomOut}
            disabled={zoom <= 2}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="bg-white"
          onClick={fitBounds}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Style Toggle */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <Button
          variant={mapStyle === "roadmap" ? "default" : "ghost"}
          size="sm"
          className="rounded-none border-r text-xs px-3"
          onClick={() => setMapStyle("roadmap")}
        >
          Map
        </Button>
        <Button
          variant={mapStyle === "satellite" ? "default" : "ghost"}
          size="sm"
          className="rounded-none text-xs px-3"
          onClick={() => setMapStyle("satellite")}
        >
          Satellite
        </Button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600">
        Zoom: {zoom}
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        {mapStyle === "satellite" ? "© Esri" : "© OpenStreetMap"}
      </div>
    </div>
  );
}

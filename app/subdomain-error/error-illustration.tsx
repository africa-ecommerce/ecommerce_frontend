// // "use client";

// // import { useEffect, useRef } from "react";

// // export function ErrorIllustration() {
// //   const canvasRef = useRef<HTMLCanvasElement>(null);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     // Set canvas dimensions
// //     const setCanvasDimensions = () => {
// //       const dpr = window.devicePixelRatio || 1;
// //       const rect = canvas.getBoundingClientRect();

// //       canvas.width = rect.width * dpr;
// //       canvas.height = rect.height * dpr;

// //       ctx.scale(dpr, dpr);

// //       // Reset canvas styles
// //       canvas.style.width = `${rect.width}px`;
// //       canvas.style.height = `${rect.height}px`;
// //     };

// //     setCanvasDimensions();
// //     window.addEventListener("resize", setCanvasDimensions);

// //     // Animation variables
// //     let animationFrameId: number;
// //     const stars: Star[] = [];
// //     const numStars = 100;
// //     const centerX = canvas.width / 2;
// //     const centerY = canvas.height / 2;

// //     // Create stars
// //     for (let i = 0; i < numStars; i++) {
// //       stars.push({
// //         x: Math.random() * canvas.width,
// //         y: Math.random() * canvas.height,
// //         size: Math.random() * 2 + 1,
// //         speed: Math.random() * 0.5 + 0.1,
// //       });
// //     }

// //     // Create planet
// //     const planet = {
// //       x: centerX,
// //       y: centerY + 50,
// //       radius: Math.min(canvas.width, canvas.height) * 0.15,
// //       rotation: 0,
// //     };

// //     // Create satellite
// //     const satellite = {
// //       distance: planet.radius * 2,
// //       angle: 0,
// //       size: planet.radius * 0.2,
// //       speed: 0.005,
// //     };

// //     // Animation loop
// //     const render = () => {
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);

// //       // Draw stars
// //       ctx.fillStyle = "#ffffff";
// //       stars.forEach((star) => {
// //         ctx.beginPath();
// //         ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
// //         ctx.fill();

// //         // Move stars
// //         star.y += star.speed;
// //         if (star.y > canvas.height) {
// //           star.y = 0;
// //           star.x = Math.random() * canvas.width;
// //         }
// //       });

// //       // Draw planet
// //       const gradient = ctx.createRadialGradient(
// //         planet.x,
// //         planet.y,
// //         0,
// //         planet.x,
// //         planet.y,
// //         planet.radius
// //       );
// //       gradient.addColorStop(0, "#9333ea"); // Purple core
// //       gradient.addColorStop(0.7, "#7e22ce");
// //       gradient.addColorStop(1, "#6b21a8");

// //       ctx.beginPath();
// //       ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
// //       ctx.fillStyle = gradient;
// //       ctx.fill();

// //       // Draw planet ring
// //       ctx.beginPath();
// //       ctx.ellipse(
// //         planet.x,
// //         planet.y,
// //         planet.radius * 1.5,
// //         planet.radius * 0.3,
// //         planet.rotation,
// //         0,
// //         Math.PI * 2
// //       );
// //       ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
// //       ctx.lineWidth = 4;
// //       ctx.stroke();

// //       // Draw satellite
// //       const satX = planet.x + Math.cos(satellite.angle) * satellite.distance;
// //       const satY = planet.y + Math.sin(satellite.angle) * satellite.distance;

// //       ctx.beginPath();
// //       ctx.arc(satX, satY, satellite.size, 0, Math.PI * 2);
// //       ctx.fillStyle = "#e9d5ff";
// //       ctx.fill();

// //       // Draw satellite trail
// //       ctx.beginPath();
// //       ctx.ellipse(
// //         planet.x,
// //         planet.y,
// //         satellite.distance,
// //         satellite.distance * 0.3,
// //         0,
// //         0,
// //         Math.PI * 2
// //       );
// //       ctx.strokeStyle = "rgba(233, 213, 255, 0.2)";
// //       ctx.lineWidth = 1;
// //       ctx.stroke();

// //       // Update satellite position
// //       satellite.angle += satellite.speed;

// //       // Continue animation
// //       animationFrameId = requestAnimationFrame(render);
// //     };

// //     render();

// //     return () => {
// //       window.removeEventListener("resize", setCanvasDimensions);
// //       cancelAnimationFrame(animationFrameId);
// //     };
// //   }, []);

// //   return (
// //     <div className="w-full aspect-[16/9] max-h-[400px]">
// //       <canvas
// //         ref={canvasRef}
// //         className="w-full h-full"
// //         aria-label="404 error illustration showing a purple planet with a satellite"
// //       />
// //     </div>
// //   );
// // }

// // interface Star {
// //   x: number;
// //   y: number;
// //   size: number;
// //   speed: number;
// // }



// "use client";

// import { useEffect, useRef, useCallback } from "react";

// interface Star {
//   x: number;
//   y: number;
//   size: number;
//   speed: number;
// }

// interface Planet {
//   x: number;
//   y: number;
//   radius: number;
//   rotation: number;
// }

// interface Satellite {
//   distance: number;
//   angle: number;
//   size: number;
//   speed: number;
// }

// export function ErrorIllustration() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animationFrameId = useRef<number>();
//   const starsRef = useRef<Star[]>([]);
//   const planetRef = useRef<Planet>();
//   const satelliteRef = useRef<Satellite>();

//   const initializeScene = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
//     const rect = canvas.getBoundingClientRect();
//     const canvasWidth = rect.width;
//     const canvasHeight = rect.height;
    
//     // Clear existing stars
//     starsRef.current = [];
    
//     // Calculate responsive values
//     const numStars = Math.max(50, Math.min(150, Math.floor(canvasWidth * canvasHeight / 3000)));
//     const centerX = canvasWidth / 2;
//     const centerY = canvasHeight / 2;
//     const minDimension = Math.min(canvasWidth, canvasHeight);
    
//     // Create stars with responsive positioning
//     for (let i = 0; i < numStars; i++) {
//       starsRef.current.push({
//         x: Math.random() * canvasWidth,
//         y: Math.random() * canvasHeight,
//         size: Math.random() * 1.5 + 0.8,
//         speed: Math.random() * 0.3 + 0.1,
//       });
//     }

//     // Create planet with responsive sizing
//     planetRef.current = {
//       x: centerX,
//       y: centerY + (canvasHeight * 0.05), // Slight offset from center
//       radius: Math.max(30, minDimension * 0.12), // Responsive radius with minimum
//       rotation: 0,
//     };

//     // Create satellite with responsive sizing
//     satelliteRef.current = {
//       distance: planetRef.current.radius * 2.2,
//       angle: 0,
//       size: Math.max(8, planetRef.current.radius * 0.18),
//       speed: 0.008,
//     };
//   }, []);

//   const setCanvasDimensions = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
//     const dpr = window.devicePixelRatio || 1;
//     const rect = canvas.getBoundingClientRect();

//     // Set actual canvas size in memory
//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;

//     // Scale the drawing context so everything draws at the correct size
//     ctx.scale(dpr, dpr);

//     // Set the display size
//     canvas.style.width = `${rect.width}px`;
//     canvas.style.height = `${rect.height}px`;

//     // Reinitialize scene with new dimensions
//     initializeScene(canvas, ctx);
//   }, [initializeScene]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Initial setup
//     setCanvasDimensions(canvas, ctx);

//     // Resize handler
//     const handleResize = () => {
//       setCanvasDimensions(canvas, ctx);
//     };

//     window.addEventListener("resize", handleResize);

//     // Animation loop
//     const render = () => {
//       const rect = canvas.getBoundingClientRect();
//       const canvasWidth = rect.width;
//       const canvasHeight = rect.height;
      
//       ctx.clearRect(0, 0, canvasWidth, canvasHeight);

//       const stars = starsRef.current;
//       const planet = planetRef.current;
//       const satellite = satelliteRef.current;

//       if (!planet || !satellite) return;

//       // Draw stars
//       ctx.fillStyle = "#ffffff";
//       stars.forEach((star) => {
//         ctx.globalAlpha = 0.6 + Math.sin(Date.now() * 0.001 + star.x) * 0.4;
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
//         ctx.fill();

//         // Move stars
//         star.y += star.speed;
//         if (star.y > canvasHeight + star.size) {
//           star.y = -star.size;
//           star.x = Math.random() * canvasWidth;
//         }
//       });

//       ctx.globalAlpha = 1;

//       // Draw satellite trail first (behind planet)
//       ctx.beginPath();
//       ctx.ellipse(
//         planet.x,
//         planet.y,
//         satellite.distance,
//         satellite.distance * 0.25,
//         0,
//         0,
//         Math.PI * 2
//       );
//       ctx.strokeStyle = "rgba(233, 213, 255, 0.15)";
//       ctx.lineWidth = 2;
//       ctx.stroke();

//       // Draw planet with responsive gradient
//       const gradient = ctx.createRadialGradient(
//         planet.x - planet.radius * 0.3,
//         planet.y - planet.radius * 0.3,
//         0,
//         planet.x,
//         planet.y,
//         planet.radius
//       );
//       gradient.addColorStop(0, "#a855f7"); // Purple core
//       gradient.addColorStop(0.6, "#8b5cf6");
//       gradient.addColorStop(1, "#7c3aed");

//       ctx.beginPath();
//       ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
//       ctx.fillStyle = gradient;
//       ctx.fill();

//       // Add planet glow
//       const glowGradient = ctx.createRadialGradient(
//         planet.x,
//         planet.y,
//         planet.radius,
//         planet.x,
//         planet.y,
//         planet.radius * 1.4
//       );
//       glowGradient.addColorStop(0, "rgba(168, 85, 247, 0.3)");
//       glowGradient.addColorStop(1, "rgba(168, 85, 247, 0)");

//       ctx.beginPath();
//       ctx.arc(planet.x, planet.y, planet.radius * 1.4, 0, Math.PI * 2);
//       ctx.fillStyle = glowGradient;
//       ctx.fill();

//       // Draw planet ring
//       ctx.beginPath();
//       ctx.ellipse(
//         planet.x,
//         planet.y,
//         planet.radius * 1.6,
//         planet.radius * 0.25,
//         planet.rotation,
//         0,
//         Math.PI * 2
//       );
//       ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
//       ctx.lineWidth = Math.max(2, planet.radius * 0.05);
//       ctx.stroke();

//       // Draw satellite
//       const satX = planet.x + Math.cos(satellite.angle) * satellite.distance;
//       const satY = planet.y + Math.sin(satellite.angle) * satellite.distance * 0.25;

//       // Satellite glow
//       const satGlowGradient = ctx.createRadialGradient(
//         satX,
//         satY,
//         0,
//         satX,
//         satY,
//         satellite.size * 2
//       );
//       satGlowGradient.addColorStop(0, "rgba(233, 213, 255, 0.8)");
//       satGlowGradient.addColorStop(1, "rgba(233, 213, 255, 0)");

//       ctx.beginPath();
//       ctx.arc(satX, satY, satellite.size * 2, 0, Math.PI * 2);
//       ctx.fillStyle = satGlowGradient;
//       ctx.fill();

//       // Satellite body
//       ctx.beginPath();
//       ctx.arc(satX, satY, satellite.size, 0, Math.PI * 2);
//       ctx.fillStyle = "#f3e8ff";
//       ctx.fill();

//       // Satellite highlight
//       ctx.beginPath();
//       ctx.arc(satX - satellite.size * 0.3, satY - satellite.size * 0.3, satellite.size * 0.4, 0, Math.PI * 2);
//       ctx.fillStyle = "#ffffff";
//       ctx.globalAlpha = 0.7;
//       ctx.fill();
//       ctx.globalAlpha = 1;

//       // Update satellite position
//       satellite.angle += satellite.speed;
//       planet.rotation += 0.002;

//       // Continue animation
//       animationFrameId.current = requestAnimationFrame(render);
//     };

//     render();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//     };
//   }, [setCanvasDimensions, initializeScene]);

//   return (
//     <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] relative">
//       <canvas
//         ref={canvasRef}
//         className="w-full h-full rounded-lg"
//         aria-label="404 error illustration showing a purple planet with orbiting satellite"
//       />
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  rotation: number;
}

interface Satellite {
  distance: number;
  angle: number;
  size: number;
  speed: number;
}

export function ErrorIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const planetRef = useRef<Planet>();
  const satelliteRef = useRef<Satellite>();

  const initializeScene = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const rect = canvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      // Clear existing stars
      starsRef.current = [];

      // Calculate responsive values
      const numStars = Math.max(
        30,
        Math.min(120, Math.floor((canvasWidth * canvasHeight) / 4000))
      );
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const minDimension = Math.min(canvasWidth, canvasHeight);

      // Create stars with responsive positioning
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          size: Math.random() * 1.2 + 0.6,
          speed: Math.random() * 0.25 + 0.08,
        });
      }

      // Create planet with better mobile sizing - ensure it fits with satellite orbit
      const maxPlanetRadius = Math.min(
        (minDimension * 0.35) / 3, // Divide by 3 to account for satellite orbit (planet + 2*orbit distance)
        minDimension * 0.08 // Maximum planet size relative to canvas
      );
      const planetRadius = Math.max(20, maxPlanetRadius);

      planetRef.current = {
        x: centerX,
        y: centerY,
        radius: planetRadius,
        rotation: 0,
      };

      // Create satellite with safe distance that won't overflow
      const maxSatelliteDistance = Math.min(
        canvasWidth / 2 - 15, // 15px margin from edge
        canvasHeight / 2 - 15,
        planetRadius * 2.5 // Reasonable orbit size
      );

      satelliteRef.current = {
        distance: Math.max(planetRadius * 1.8, maxSatelliteDistance),
        angle: 0,
        size: Math.max(6, planetRadius * 0.15),
        speed: 0.01,
      };
    },
    []
  );

  const setCanvasDimensions = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // Set actual canvas size in memory
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the drawing context so everything draws at the correct size
      ctx.scale(dpr, dpr);

      // Set the display size
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Reinitialize scene with new dimensions
      initializeScene(canvas, ctx);
    },
    [initializeScene]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initial setup
    setCanvasDimensions(canvas, ctx);

    // Resize handler with debouncing for better performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions(canvas, ctx);
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const stars = starsRef.current;
      const planet = planetRef.current;
      const satellite = satelliteRef.current;

      if (!planet || !satellite) return;

      // Draw stars with better mobile performance
      ctx.fillStyle = "#ffffff";
      stars.forEach((star) => {
        const twinkle =
          0.4 + Math.sin(Date.now() * 0.002 + star.x * 0.01) * 0.3;
        ctx.globalAlpha = Math.max(0.2, twinkle);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move stars
        star.y += star.speed;
        if (star.y > canvasHeight + star.size) {
          star.y = -star.size;
          star.x = Math.random() * canvasWidth;
        }
      });

      ctx.globalAlpha = 1;

      // Calculate satellite position with elliptical orbit
      const satX = planet.x + Math.cos(satellite.angle) * satellite.distance;
      const satY =
        planet.y + Math.sin(satellite.angle) * satellite.distance * 0.3; // Flattened orbit

      // Draw satellite trail (behind planet) - only if there's enough space
      if (satellite.distance > planet.radius * 1.5) {
        ctx.beginPath();
        ctx.ellipse(
          planet.x,
          planet.y,
          satellite.distance,
          satellite.distance * 0.3,
          0,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = "rgba(233, 213, 255, 0.12)";
        ctx.lineWidth = Math.max(1, planet.radius * 0.03);
        ctx.stroke();
      }

      // Draw planet with responsive gradient
      const gradient = ctx.createRadialGradient(
        planet.x - planet.radius * 0.25,
        planet.y - planet.radius * 0.25,
        0,
        planet.x,
        planet.y,
        planet.radius
      );
      gradient.addColorStop(0, "#a855f7");
      gradient.addColorStop(0.6, "#8b5cf6");
      gradient.addColorStop(1, "#7c3aed");

      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add subtle planet glow (reduced for mobile performance)
      const glowGradient = ctx.createRadialGradient(
        planet.x,
        planet.y,
        planet.radius * 0.9,
        planet.x,
        planet.y,
        planet.radius * 1.3
      );
      glowGradient.addColorStop(0, "rgba(168, 85, 247, 0.25)");
      glowGradient.addColorStop(1, "rgba(168, 85, 247, 0)");

      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.radius * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Draw planet ring (only if planet is large enough)
      if (planet.radius > 25) {
        ctx.beginPath();
        ctx.ellipse(
          planet.x,
          planet.y,
          planet.radius * 1.5,
          planet.radius * 0.2,
          planet.rotation,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = Math.max(1.5, planet.radius * 0.04);
        ctx.stroke();
      }

      // Draw satellite only if it's within canvas bounds (with small margin)
      const margin = 10;
      if (
        satX >= margin &&
        satX <= canvasWidth - margin &&
        satY >= margin &&
        satY <= canvasHeight - margin
      ) {
        // Satellite glow
        const satGlowGradient = ctx.createRadialGradient(
          satX,
          satY,
          0,
          satX,
          satY,
          satellite.size * 1.8
        );
        satGlowGradient.addColorStop(0, "rgba(233, 213, 255, 0.7)");
        satGlowGradient.addColorStop(1, "rgba(233, 213, 255, 0)");

        ctx.beginPath();
        ctx.arc(satX, satY, satellite.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = satGlowGradient;
        ctx.fill();

        // Satellite body
        ctx.beginPath();
        ctx.arc(satX, satY, satellite.size, 0, Math.PI * 2);
        ctx.fillStyle = "#f3e8ff";
        ctx.fill();

        // Satellite highlight
        ctx.beginPath();
        ctx.arc(
          satX - satellite.size * 0.25,
          satY - satellite.size * 0.25,
          satellite.size * 0.35,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Update animations with consistent timing
      satellite.angle += satellite.speed;
      planet.rotation += 0.003;

      // Continue animation
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [setCanvasDimensions, initializeScene]);

  return (
    <div className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg bg-gradient-to-br from-slate-900/20 to-purple-900/20"
        aria-label="404 error illustration showing a purple planet with orbiting satellite"
      />
    </div>
  );
}

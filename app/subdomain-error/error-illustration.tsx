"use client";

import { useEffect, useRef } from "react";

export function ErrorIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      // Reset canvas styles
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Animation variables
    let animationFrameId: number;
    const stars: Star[] = [];
    const numStars = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    // Create planet
    const planet = {
      x: centerX,
      y: centerY + 50,
      radius: Math.min(canvas.width, canvas.height) * 0.15,
      rotation: 0,
    };

    // Create satellite
    const satellite = {
      distance: planet.radius * 2,
      angle: 0,
      size: planet.radius * 0.2,
      speed: 0.005,
    };

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = "#ffffff";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move stars
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw planet
      const gradient = ctx.createRadialGradient(
        planet.x,
        planet.y,
        0,
        planet.x,
        planet.y,
        planet.radius
      );
      gradient.addColorStop(0, "#9333ea"); // Purple core
      gradient.addColorStop(0.7, "#7e22ce");
      gradient.addColorStop(1, "#6b21a8");

      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw planet ring
      ctx.beginPath();
      ctx.ellipse(
        planet.x,
        planet.y,
        planet.radius * 1.5,
        planet.radius * 0.3,
        planet.rotation,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw satellite
      const satX = planet.x + Math.cos(satellite.angle) * satellite.distance;
      const satY = planet.y + Math.sin(satellite.angle) * satellite.distance;

      ctx.beginPath();
      ctx.arc(satX, satY, satellite.size, 0, Math.PI * 2);
      ctx.fillStyle = "#e9d5ff";
      ctx.fill();

      // Draw satellite trail
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
      ctx.strokeStyle = "rgba(233, 213, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Update satellite position
      satellite.angle += satellite.speed;

      // Continue animation
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full aspect-[16/9] max-h-[400px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="404 error illustration showing a purple planet with a satellite"
      />
    </div>
  );
}

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
}

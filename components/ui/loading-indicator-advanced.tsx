"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type LoadingIndicatorProps = {
  className?: string;
  color?: string;
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
  type?: "spinner" | "dots" | "pulse" | "pattern" | "bar";
  showText?: boolean;
  text?: string;
};

export function LoadingIndicatorAdvanced({
  className,
  color = "primary",
  size = "medium",
  fullScreen = false,
  type = "pattern",
  showText = false,
  text = "Loading...",
}: LoadingIndicatorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Set size values based on the size prop
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  // Set color classes based on the color prop
  const colorClasses = {
    primary: "text-primary",
    accent: "text-accent",
    white: "text-white",
  };

  // Monitor route changes to show/hide the loading indicator
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 300); // Small delay to ensure smooth transition
    };

    // Add event listeners for route change start and complete
    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleComplete);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleComplete);
    };
  }, [pathname, searchParams]);

  if (!isLoading && !fullScreen) return null;

  // Render different loader types
  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return (
          <div
            className={cn(
              "animate-spin rounded-full border-4 border-t-transparent",
              sizeClasses[size],
              colorClasses[color as keyof typeof colorClasses] || "text-primary"
            )}
          />
        );

      case "dots":
        return (
          <div className="flex space-x-1">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={cn(
                  "rounded-full animate-bounce",
                  dot === 1
                    ? "animate-delay-0"
                    : dot === 2
                    ? "animate-delay-150"
                    : "animate-delay-300",
                  size === "small"
                    ? "w-2 h-2"
                    : size === "medium"
                    ? "w-3 h-3"
                    : "w-4 h-4",
                  colorClasses[color as keyof typeof colorClasses] ||
                    "bg-primary"
                )}
                style={{
                  animationDelay: `${(dot - 1) * 0.15}s`,
                }}
              />
            ))}
          </div>
        );

      case "pulse":
        return (
          <div
            className={cn(
              "rounded-full animate-pulse",
              sizeClasses[size],
              colorClasses[color as keyof typeof colorClasses] ||
                "bg-primary/60"
            )}
          />
        );

      case "bar":
        return (
          <div className="w-full max-w-xs h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-loading-bar-advanced" />
          </div>
        );

      case "pattern":
        // African-inspired pattern loader
        return (
          <div
            className={cn(
              "relative",
              size === "small"
                ? "w-8 h-8"
                : size === "medium"
                ? "w-12 h-12"
                : "w-16 h-16"
            )}
          >
            <div className="absolute inset-0 animate-spin-slow">
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  colorClasses[color as keyof typeof colorClasses] ||
                    "text-primary"
                )}
              >
                <path
                  fill="currentColor"
                  d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,55 L30,65 L35,45 L20,30 L40,30 Z"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,55 L30,65 L35,45 L20,30 L40,30 Z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 animate-spin-slow-reverse">
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-70"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="10 5"
                />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
            </div>
          </div>
        );

      default:
        return (
          <div
            className={cn(
              "animate-spin rounded-full border-4 border-t-transparent",
              sizeClasses[size],
              colorClasses[color as keyof typeof colorClasses] ||
                "border-primary"
            )}
          />
        );
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullScreen
          ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          : "",
        className
      )}
    >
      {renderLoader()}

      {showText && (
        <div className="text-sm font-medium animate-pulse">{text}</div>
      )}
    </div>
  );
}

// Global loading indicator that can be used across the app
export function GlobalLoadingIndicatorAdvanced() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 300);
    };

    // Listen for route changes
    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleComplete);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleComplete);
    };
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background overflow-hidden">
      <div className="h-full bg-primary animate-loading-bar-advanced" />
    </div>
  );
}

// Component that can be used to wrap content that's loading
export function LoadingContentAdvanced({
  isLoading,
  children,
  fallback,
  className,
  type = "pattern",
  size = "medium",
  color = "primary",
  showText = false,
  text = "Loading...",
}: {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  type?: "spinner" | "dots" | "pulse" | "pattern" | "bar";
  size?: "small" | "medium" | "large";
  color?: string;
  showText?: boolean;
  text?: string;
}) {
  if (!isLoading) return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <LoadingIndicatorAdvanced
        type={type}
        size={size}
        color={color}
        showText={showText}
        text={text}
      />
    </div>
  );
}

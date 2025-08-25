"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface SwipeGuideProps {
  context: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  onDismiss?: () => void;
  relative?: boolean; // New prop to control positioning type
}

interface SwipeGuideData {
  lastDismissed: string;
  nextAppearance: string;
  dismissCount: number;
  context: string;
}

export function SwipeGuide({
  context,
  position = "bottom-right",
  onDismiss,
  relative = false, // Default to fixed positioning (current behavior)
}: SwipeGuideProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check if device is mobile
  const detectMobileDevice = (): boolean => {
    return window.innerWidth < 768;
  };

  // Check user's motion preferences
  const checkMotionPreference = (): boolean => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  // Get storage key for context
  const getStorageKey = (ctx: string): string => `swipeGuide_${ctx}`;

  // Check if guide should display
  const checkShouldDisplay = (ctx: string): boolean => {
    try {
      const stored = localStorage.getItem(getStorageKey(ctx));
      if (!stored) return true;

      const data: SwipeGuideData = JSON.parse(stored);
      const now = new Date();
      const nextAppearance = new Date(data.nextAppearance);

      return now >= nextAppearance;
    } catch {
      return true; // Show if there's any error reading storage
    }
  };

  // Calculate next appearance time based on dismiss count
  const calculateNextAppearance = (dismissCount: number): Date => {
    const now = new Date();
    const daysToAdd = dismissCount >= 5 ? 7 : 3; // 7 days after 5 dismissals, otherwise 3 days
    return new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  };

  // Handle guide dismissal
  const dismissGuide = (ctx: string) => {
    try {
      const stored = localStorage.getItem(getStorageKey(ctx));
      let dismissCount = 0;

      if (stored) {
        const data: SwipeGuideData = JSON.parse(stored);
        dismissCount = data.dismissCount + 1;
      }

      const guideData: SwipeGuideData = {
        lastDismissed: new Date().toISOString(),
        nextAppearance: calculateNextAppearance(dismissCount).toISOString(),
        dismissCount,
        context: ctx,
      };

      localStorage.setItem(getStorageKey(ctx), JSON.stringify(guideData));
      setIsVisible(false);
      onDismiss?.();
    } catch {
      // Graceful fallback if localStorage is unavailable
      setIsVisible(false);
      onDismiss?.();
    }
  };

  // Clean up old entries (older than 30 days)
  const cleanupOldEntries = () => {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("swipeGuide_")) {
          const stored = localStorage.getItem(key);
          if (stored) {
            const data: SwipeGuideData = JSON.parse(stored);
            const lastDismissed = new Date(data.lastDismissed);
            if (lastDismissed < thirtyDaysAgo) {
              localStorage.removeItem(key);
            }
          }
        }
      }
    } catch {
      // Ignore cleanup errors
    }
  };

  // Handle successful swipe interaction (auto-dismiss)
  const handleSwipeSuccess = () => {
    dismissGuide(context);
  };

  // Position classes - Updated to handle both fixed and absolute positioning
  const getPositionClasses = () => {
    const positionType = relative ? "absolute" : "fixed";

    switch (position) {
      case "bottom-left":
        return `${positionType} bottom-4 left-4`;
      case "top-right":
        return `${positionType} top-4 right-4`;
      case "top-left":
        return `${positionType} top-4 left-4`;
      default:
        return `${positionType} bottom-4 right-4`;
    }
  };

  useEffect(() => {
    const mobile = detectMobileDevice();
    const reducedMotion = checkMotionPreference();

    setIsMobile(mobile);
    setPrefersReducedMotion(reducedMotion);

    if (mobile && checkShouldDisplay(context)) {
      setIsVisible(true);
      cleanupOldEntries();
    }

    // Handle resize
    const handleResize = () => {
      const newIsMobile = detectMobileDevice();
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [context]);

  // Auto-hide after 3 animation cycles
  useEffect(() => {
    if (isVisible && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        setAnimationCycle((prev) => prev + 1);
      }, 3000); // 2s animation + 1s pause

      if (animationCycle >= 6) {
        setIsVisible(false);
      }

      return () => clearTimeout(timer);
    }

    
  }, [isVisible, animationCycle, prefersReducedMotion]);

  // Don't render if not mobile or not visible
  if (!isMobile || !isVisible) return null;

  return (
    <div
      className={`${getPositionClasses()} z-50 pointer-events-auto`}
      role="img"
      aria-hidden="true"
    >
      {/* Guide Container - Enhanced Glassmorphism */}
      <div
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        onClick={() => dismissGuide(context)}
      >
        {/* Dismiss Button - Enhanced with glassmorphism */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dismissGuide(context);
          }}
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
          aria-label="Dismiss swipe guide"
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        {/* Guide Content */}
        <div className="flex items-center space-x-3">
          <span
            className="text-sm font-semibold tracking-wide"
            style={{
              color: "#374151",
              textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
            }}
          >
            Swipe left to see more
          </span>

          {/* Animated Hand */}
          <div className="relative w-12 h-8 overflow-hidden">
            <div
              className={`absolute inset-0 ${
                prefersReducedMotion ? "" : "animate-swipe-guide"
              }`}
            >
              {/* Hand SVG - Enhanced with better contrast */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#374151"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pointer-icon lucide-pointer"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))",
                }}
              >
                <path d="M22 14a8 8 0 0 1-8 8" />
                <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
                <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
                <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for easy integration
export function useSwipeGuide(context: string) {
  const handleSwipeSuccess = () => {
    // This can be called when user successfully performs a swipe
    try {
      const stored = localStorage.getItem(`swipeGuide_${context}`);
      let dismissCount = 0;

      if (stored) {
        const data: SwipeGuideData = JSON.parse(stored);
        dismissCount = data.dismissCount + 1;
      }

      const guideData: SwipeGuideData = {
        lastDismissed: new Date().toISOString(),
        nextAppearance: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
        dismissCount,
        context,
      };

      localStorage.setItem(`swipeGuide_${context}`, JSON.stringify(guideData));
    } catch {
      // Ignore errors
    }
  };

  return { handleSwipeSuccess };
}

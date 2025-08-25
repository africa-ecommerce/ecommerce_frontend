"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface SwipeGuideProps {
  context: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  onDismiss?: () => void
  relative?: boolean // New prop to control positioning type
}

interface SwipeGuideData {
  lastDismissed: string
  nextAppearance: string
  dismissCount: number
  context: string
}

export function SwipeGuide({ 
  context, 
  position = "bottom-right", 
  onDismiss,
  relative = false // Default to fixed positioning (current behavior)
}: SwipeGuideProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [animationCycle, setAnimationCycle] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check if device is mobile
  const detectMobileDevice = (): boolean => {
    return window.innerWidth < 768
  }

  // Check user's motion preferences
  const checkMotionPreference = (): boolean => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }

  // Get storage key for context
  const getStorageKey = (ctx: string): string => `swipeGuide_${ctx}`

  // Check if guide should display
  const checkShouldDisplay = (ctx: string): boolean => {
    try {
      const stored = localStorage.getItem(getStorageKey(ctx))
      if (!stored) return true

      const data: SwipeGuideData = JSON.parse(stored)
      const now = new Date()
      const nextAppearance = new Date(data.nextAppearance)

      return now >= nextAppearance
    } catch {
      return true // Show if there's any error reading storage
    }
  }

  // Calculate next appearance time based on dismiss count
  const calculateNextAppearance = (dismissCount: number): Date => {
    const now = new Date()
    const daysToAdd = dismissCount >= 5 ? 7 : 3 // 7 days after 5 dismissals, otherwise 3 days
    return new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
  }

  // Handle guide dismissal
  const dismissGuide = (ctx: string) => {
    try {
      const stored = localStorage.getItem(getStorageKey(ctx))
      let dismissCount = 0

      if (stored) {
        const data: SwipeGuideData = JSON.parse(stored)
        dismissCount = data.dismissCount + 1
      }

      const guideData: SwipeGuideData = {
        lastDismissed: new Date().toISOString(),
        nextAppearance: calculateNextAppearance(dismissCount).toISOString(),
        dismissCount,
        context: ctx,
      }

      localStorage.setItem(getStorageKey(ctx), JSON.stringify(guideData))
      setIsVisible(false)
      onDismiss?.()
    } catch {
      // Graceful fallback if localStorage is unavailable
      setIsVisible(false)
      onDismiss?.()
    }
  }

  // Clean up old entries (older than 30 days)
  const cleanupOldEntries = () => {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("swipeGuide_")) {
          const stored = localStorage.getItem(key)
          if (stored) {
            const data: SwipeGuideData = JSON.parse(stored)
            const lastDismissed = new Date(data.lastDismissed)
            if (lastDismissed < thirtyDaysAgo) {
              localStorage.removeItem(key)
            }
          }
        }
      }
    } catch {
      // Ignore cleanup errors
    }
  }

  // Handle successful swipe interaction (auto-dismiss)
  const handleSwipeSuccess = () => {
    dismissGuide(context)
  }

  // Position classes - Updated to handle both fixed and absolute positioning
  const getPositionClasses = () => {
    const positionType = relative ? "absolute" : "fixed"
    
    switch (position) {
      case "bottom-left":
        return `${positionType} bottom-4 left-4`
      case "top-right":
        return `${positionType} top-4 right-4`
      case "top-left":
        return `${positionType} top-4 left-4`
      default:
        return `${positionType} bottom-4 right-4`
    }
  }

  useEffect(() => {
    const mobile = detectMobileDevice()
    const reducedMotion = checkMotionPreference()

    setIsMobile(mobile)
    setPrefersReducedMotion(reducedMotion)

    if (mobile && checkShouldDisplay(context)) {
      setIsVisible(true)
      cleanupOldEntries()
    }

    // Handle resize
    const handleResize = () => {
      const newIsMobile = detectMobileDevice()
      setIsMobile(newIsMobile)
      if (!newIsMobile) {
        setIsVisible(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [context])

  // Auto-hide after 3 animation cycles
  useEffect(() => {
    if (isVisible && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        setAnimationCycle((prev) => prev + 1)
      }, 3000) // 2s animation + 1s pause

      if (animationCycle >= 3) {
        setIsVisible(false)
      }

      return () => clearTimeout(timer)
    }
  }, [isVisible, animationCycle, prefersReducedMotion])

  // Don't render if not mobile or not visible
  if (!isMobile || !isVisible) return null

  return (
    <div className={`${getPositionClasses()} z-50 pointer-events-auto`} role="img" aria-hidden="true">
      {/* Guide Container */}
      <div
        className="relative bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-lg"
        onClick={() => dismissGuide(context)}
      >
        {/* Dismiss Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            dismissGuide(context)
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Dismiss swipe guide"
        >
          <X size={12} />
        </button>

        {/* Guide Content */}
        <div className="flex items-center space-x-2 text-white text-sm">
          <span>Swipe to see more</span>

          {/* Animated Hand */}
          <div className="relative w-12 h-8 overflow-hidden">
            <div className={`absolute inset-0 ${prefersReducedMotion ? "" : "animate-swipe-guide"}`}>
              {/* Hand SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white opacity-70">
                <path
                  d="M13 2C13 1.45 12.55 1 12 1S11 1.45 11 2V8.5L9.5 7C8.67 6.17 7.33 6.17 6.5 7S5.83 8.67 6.5 9.5L11 14V22H13V14L17.5 9.5C18.33 8.67 18.33 7.33 17.5 6.5S16.17 5.83 15.5 6.5L13 9V2Z"
                  fill="currentColor"
                />
                {/* Touch indicator */}
                <circle
                  cx="12"
                  cy="8"
                  r="2"
                  fill="currentColor"
                  className={`${prefersReducedMotion ? "opacity-50" : "animate-pulse"}`}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for easy integration
export function useSwipeGuide(context: string) {
  const handleSwipeSuccess = () => {
    // This can be called when user successfully performs a swipe
    try {
      const stored = localStorage.getItem(`swipeGuide_${context}`)
      let dismissCount = 0

      if (stored) {
        const data: SwipeGuideData = JSON.parse(stored)
        dismissCount = data.dismissCount + 1
      }

      const guideData: SwipeGuideData = {
        lastDismissed: new Date().toISOString(),
        nextAppearance: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        dismissCount,
        context,
      }

      localStorage.setItem(`swipeGuide_${context}`, JSON.stringify(guideData))
    } catch {
      // Ignore errors
    }
  }

  return { handleSwipeSuccess }
}
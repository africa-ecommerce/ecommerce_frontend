"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Smartphone, Download, Share, Plus } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showIOSModal, setShowIOSModal] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    // Device detection
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    const isAndroidDevice = /android/.test(userAgent)
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true

    setIsIOS(isIOSDevice)
    setIsAndroid(isAndroidDevice)
    setIsStandalone(isInStandaloneMode)

    // Don't show if already installed
    if (isInStandaloneMode) return

    // Check if user has dismissed recently
    const lastDismissed = localStorage.getItem("pwa-dismissed")
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

    if (lastDismissed && Number.parseInt(lastDismissed) > sevenDaysAgo) {
      return
    }

    // Handle beforeinstallprompt for Android
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Handle scroll detection
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Show banner after delay or scroll
    const timer = setTimeout(() => {
      if ((isIOSDevice || deferredPrompt) && !isInStandaloneMode) {
        setShowBanner(true)
      }
    }, 3000)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [deferredPrompt])

  // Show banner when scrolled (if not already shown)
  useEffect(() => {
    if (hasScrolled && !showBanner && !isStandalone && (isIOS || deferredPrompt)) {
      const lastDismissed = localStorage.getItem("pwa-dismissed")
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

      if (!lastDismissed || Number.parseInt(lastDismissed) < sevenDaysAgo) {
        setShowBanner(true)
      }
    }
  }, [hasScrolled, showBanner, isStandalone, isIOS, deferredPrompt])

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true)
      return
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === "accepted") {
          console.log("PWA installed successfully")
        }

        setDeferredPrompt(null)
        setShowBanner(false)
      } catch (error) {
        console.error("Error installing PWA:", error)
      }
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    setShowIOSModal(false)
    localStorage.setItem("pwa-dismissed", Date.now().toString())
  }

  if (isStandalone || (!isIOS && !deferredPrompt)) {
    return null
  }

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#FF7A21] to-[#ff8c42] text-white shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {isIOS ? "Add Pluggn to Home Screen" : "Install Pluggn App"}
                  </h3>
                  <p className="text-xs text-white/90">
                    {isIOS
                      ? "Get the best experience • App Store version coming soon!"
                      : "Quick access • Play Store version coming soon!"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="bg-white text-[#FF7A21] hover:bg-white/90 font-semibold text-xs px-4"
                >
                  {isIOS ? "How to Add" : "Install"}
                </Button>
                <button
                  onClick={handleDismiss}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* iOS Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Add Pluggn to Home Screen</h3>
              <p className="text-gray-600 text-sm">Get quick access and the best mobile experience</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Share className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">1. Tap the Share button</p>
                  <p className="text-xs text-gray-600">Look for the share icon in your browser</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Plus className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">2. Select "Add to Home Screen"</p>
                  <p className="text-xs text-gray-600">Scroll down in the share menu to find this option</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#FF7A21]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Download className="h-4 w-4 text-[#FF7A21]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">3. Tap "Add" to confirm</p>
                  <p className="text-xs text-gray-600">Pluggn will appear on your home screen</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-700 text-center">
                <span className="font-semibold">Coming Soon:</span> Native iOS app in the App Store with enhanced
                features and notifications!
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleDismiss} variant="outline" className="flex-1 bg-transparent">
                Maybe Later
              </Button>
              <Button onClick={handleDismiss} className="flex-1 bg-[#FF7A21] hover:bg-[#ff8c42]">
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

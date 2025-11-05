"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Shield, Truck, RotateCcw, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductData {
  payOnDelivery?: boolean
  returnPolicy?: boolean
  refundPolicy?: boolean
  returnWindow?: number
  returnShippingFee?: "BUYER" | "SUPPLIER" | "SHARED"
  supplierShare?: number
  returnPolicyTerms?: string
}

interface BuyerGuardWidgetProps {
  productData: ProductData
}

export function BuyerGuardWidget({ productData }: BuyerGuardWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasSeen, setHasSeen] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Hydration safety and session storage check
  useEffect(() => {
    setIsMounted(true)
    const hasSeenGuard = sessionStorage.getItem("buyerGuardSeen")
    if (!hasSeenGuard) {
      setHasSeen(false)
      sessionStorage.setItem("buyerGuardSeen", "true")
    }
  }, [])

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  // Close modal on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  if (!isMounted) return null

  // Generate fee message based on return shipping fee
  const getFeeMessage = () => {
    if (!productData.returnShippingFee) return ""

    switch (productData.returnShippingFee) {
      case "BUYER":
        return "the return shipping fee is covered by you."
      case "SUPPLIER":
        return "the return shipping fee is covered by the product seller."
      case "SHARED":
        return `the product seller covers ${productData.supplierShare ?? "a portion"}% of the return shipping fee.`
      default:
        return ""
    }
  }

  // Generate policy sections based on product data
  const getPolicySections = () => {
    const sections = []

    // Pay on Delivery section
    if (productData.payOnDelivery) {
      sections.push({
        icon: Truck,
        title: "Pay on Delivery",
        content:
          "Pay on delivery is available, but you'll pay the delivery charge and a non-refundable commitment fee to prove your interest in this product when you checkout.",
      })
    }

    // Return Policy sections
    if (productData.returnPolicy && !productData.refundPolicy) {
      sections.push({
        icon: RotateCcw,
        title: "Return Policy",
        content: `No cash refund, but return is accepted within ${
          productData.returnWindow || "a few"
        } day(s) from purchase if it meets our return policy, and ${getFeeMessage()}`,
      })
    } else if (productData.returnPolicy && productData.refundPolicy) {
      sections.push({
        icon: CheckCircle2,
        title: "Returns & Refunds",
        content: `Returns and refunds are accepted within ${
          productData.returnWindow || "a few"
        } day(s) of delivery, provided the item meets our return policy and ${getFeeMessage()}`,
      })
    }

    // No returns/refunds
    if (!productData.returnPolicy && !productData.refundPolicy) {
      sections.push({
        icon: AlertTriangle,
        title: "No Returns or Refunds",
        content: "All sales are final — no returns or refunds accepted.",
      })
    }

    return sections
  }

  const sections = getPolicySections()

  // Only render if there are policies to display
  if (sections.length === 0) return null

  return (
    <>
      {/* Fixed Badge Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-4 md:bottom-20 md:right-4 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group ${
          !hasSeen ? "animate-pulse" : ""
        }`}
        aria-label="Open Buyer Guard protection information"
        title="Learn about buyer protection"
      >
        <Shield className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
        <span className="text-xs md:text-sm font-semibold hidden sm:inline">Buyer Guard</span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Modal */}
      {isOpen && (
        <dialog
          open
          className="fixed bottom-0 right-0 md:bottom-auto md:right-4 md:top-1/2 md:transform md:-translate-y-1/2 w-full md:w-96 md:max-w-sm max-h-[90vh] md:max-h-[600px] bg-background rounded-t-2xl md:rounded-2xl shadow-2xl z-50 p-0 overflow-hidden animate-in slide-in-from-bottom md:slide-in-from-right duration-300"
          aria-labelledby="buyer-guard-title"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-slate-950 border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 id="buyer-guard-title" className="text-lg font-bold">
                Buyer Guard
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto px-6 py-4 pb-6 space-y-4">
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <IconComponent className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{section.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                </div>
              )
            })}

            {/* Detailed Terms Section */}
            {productData.returnPolicyTerms && (
              <div className="mt-6 pt-4 border-t border-border">
                <CollapsibleTerms terms={productData.returnPolicyTerms} />
              </div>
            )}
          </div>

          {/* Footer */}
         
        </dialog>
      )}
    </>
  )
}

// Collapsible Terms Component
function CollapsibleTerms({ terms }: { terms: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const truncatedTerms = terms.length > 1500 ? terms.substring(0, 1500) + "..." : terms

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-3 hover:bg-muted/50 rounded-lg transition-colors"
        aria-expanded={isExpanded}
      >
        <span className="font-medium text-sm">Return Policy Terms</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-2 p-3 bg-muted/20 rounded-lg border border-border">
          <div className="max-h-64 overflow-y-auto text-xs text-muted-foreground leading-relaxed break-words whitespace-pre-wrap">
            {truncatedTerms}
          </div>
        </div>
      )}
    </div>
  )
}

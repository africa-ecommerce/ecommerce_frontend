"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function InteractiveDemo() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Order Received",
      description: "Customer places order on your store",
      details: "Order ID: #12345 | Amount: $45.99 | Destination: Accra, Ghana",
      icon: "📦",
    },
    {
      title: "Policy Applied",
      description: "Buyer Guard policy is automatically applied",
      details: "Pay-on-delivery enabled | 7-day return window | Buyer protected",
      icon: "✓",
    },
    {
      title: "Slot Pooling",
      description: "Order is grouped with other shipments to same area",
      details: "Joined existing slot with 12 other orders | Cost per unit: $2.50",
      icon: "📍",
    },
    {
      title: "Carrier Selected",
      description: "Optimal carrier is automatically selected",
      details: "GIG Logistics selected (lowest cost) | Pickup scheduled for tomorrow",
      icon: "🚚",
    },
    {
      title: "In Transit",
      description: "Shipment is picked up and in delivery",
      details: "Current status: Out for delivery | Estimated arrival: 2 hours | Tracking: #GIG-98765",
      icon: "📍",
    },
    {
      title: "Delivered",
      description: "Order successfully delivered",
      details: "Delivered at 2:45 PM | Payment distributed | Settled to your account",
      icon: "✓",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg border border-orange-100 overflow-hidden">
        {/* Steps Progress */}
        <div className="p-8 bg-gradient-to-r from-orange-50 to-white">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    i <= step ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-orange-500 transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step Content */}
          <div className="mb-6">
            <div className="text-4xl mb-3">{steps[step].icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{steps[step].title}</h3>
            <p className="text-gray-600 mb-4">{steps[step].description}</p>
            <div className="bg-white rounded p-4 border border-orange-100">
              <p className="text-sm font-mono text-gray-700">{steps[step].details}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 disabled:opacity-50"
            >
              Previous
            </Button>
            <Button
              onClick={() => setStep((step + 1) % steps.length)}
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600"
            >
              {step === steps.length - 1 ? "Restart" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Step Indicator */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Step {step + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  )
}

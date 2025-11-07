"use client";

import { Truck, BarChart3 } from "lucide-react";

export default function ArchitectureDiagram() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white border border-orange-100 rounded-lg p-8 hover:border-orange-300 hover:shadow-lg transition-all">
        {/* Top Layer - Commerce Channels */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg px-6 py-4 border border-orange-200">
            <h3 className="font-bold text-gray-900 mb-2">Commerce Channels</h3>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-700">
              <span className="bg-white px-2 py-1 rounded">
                Social Commerce
              </span>
              <span className="bg-white px-2 py-1 rounded">Shopify</span>
              <span className="bg-white px-2 py-1 rounded">WhatsApp</span>
              <span className="bg-white px-2 py-1 rounded">Custom API</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-8">
          <div className="w-0.5 h-8 bg-gradient-to-b from-orange-300 to-orange-500" />
        </div>

        {/* Middle Layer - Pluggn Core */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-8 mb-8 hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">
            Pluggn Coordination Engine
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            {[
              {
                title: "Policy Engine",
                desc: "Execute business rules automatically",
              },
              {
                title: "Slot Pooling Logic",
                desc: "Consolidate shipments intelligently",
              },
              {
                title: "Buyer Guard Layer",
                desc: "Display & enforce protections",
              },
              {
                title: "Manifest Generator",
                desc: "Create optimized pickup lists",
              },
              {
                title: "API Abstraction",
                desc: "Unified logistics interface",
              },
              {
                title: "Analytics Engine",
                desc: "Real-time insights & tracking",
              },
            ].map((component, i) => (
              <div
                key={i}
                className="border border-orange-500/30 rounded p-4 bg-gray-800/50 hover:border-orange-400 transition-colors"
              >
                <h4 className="font-bold mb-2 text-orange-400">
                  {component.title}
                </h4>
                <p className="text-gray-400 text-xs">{component.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-8">
          <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500 to-orange-300" />
        </div>

        {/* Bottom Layer - Logistics & Outputs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg p-6 border border-orange-200 hover:border-orange-400 transition-colors">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-600" />
              Logistics Network
            </h3>
            <div className="space-y-3 text-sm">
              {["GIG Logistics", "Kwik Delivery", "Sendbox", "DHL & More"].map(
                (carrier) => (
                  <div
                    key={carrier}
                    className="flex items-center gap-2 text-gray-700 bg-white rounded px-3 py-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    {carrier}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg p-6 border border-orange-200 hover:border-orange-400 transition-colors">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              Merchant Dashboard
            </h3>
            <div className="space-y-3 text-sm">
              {[
                "Order tracking",
                "Analytics & insights",
                "Return management",
                "Settlement data",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-gray-700 bg-white rounded px-3 py-2"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-600" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

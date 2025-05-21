"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Package, Truck } from "lucide-react";

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserTypeModal({ isOpen, onClose }: UserTypeModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full max-w-xl bg-white rounded-t-xl p-6 transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">User Types</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">Supplier</h3>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <Truck className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <div>
                <p className="text-gray-700 mb-2">
                  As a <span className="font-medium">Supplier</span>, you can:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                  <li>List your products on the Pluggn marketplace</li>
                  <li>
                    Connect with plugs who will promote and sell your items
                  </li>
                  <li>Manage inventory and fulfill orders</li>
                  <li>
                    Expand your market reach without additional marketing costs
                  </li>
                  <li>Focus on product development while plugs handle sales</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">Plug</h3>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                  <Package className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <div>
                <p className="text-gray-700 mb-2">
                  As a <span className="font-medium">Plug</span>, you can:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                  <li>
                    Build your online business without inventory investment
                  </li>
                  <li>Select products from suppliers to promote and sell</li>
                  <li>Set your own prices and profit margins</li>
                  <li>Focus on marketing and customer acquisition</li>
                  <li>Earn commission on every sale you generate</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Not sure which to choose?</span> You
              can always change your user type later in your account settings.
            </p>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Got it
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Package, Truck } from "lucide-react";

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserTypeModal({ isOpen, onClose }: UserTypeModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
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
        className={`w-full max-w-xl bg-white rounded-t-xl transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } max-h-[85vh] flex flex-col`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Choose Your Path</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div 
          ref={contentRef}
          className="overflow-y-auto p-6 space-y-8"
        >
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-orange-500 flex items-center">
              <Truck className="h-5 w-5 mr-2" /> Supplier
            </h3>
            <div className="bg-orange-50 p-5 rounded-lg space-y-4">
              <p className="text-gray-800 font-medium">As a Supplier, you must:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Create and maintain your product inventory on the platform</li>
                <li>Set wholesale prices and available stock quantities</li>
                <li>Fulfill all orders promptly when received from Pluggn</li>
                <li>Maintain accurate product descriptions and images</li>
                <li>Handle product returns according to your stated policies</li>
              </ul>
              
              <div className="pt-2">
                <p className="text-gray-800 font-medium">As a Supplier, you can:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Scale your business without additional marketing costs</li>
                  <li>Have multiple Plugs selling your products simultaneously across different markets</li>
                  <li>Focus on product development while Plugs handle customer acquisition</li>
                  <li>Set your own wholesale pricing strategy</li>
                  <li>Access detailed analytics on which products are most popular</li>
                  <li>Expand your market reach through our network of motivated Plugs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-orange-500 flex items-center">
              <Package className="h-5 w-5 mr-2" /> Plug
            </h3>
            <div className="bg-orange-50 p-5 rounded-lg space-y-4">
              <p className="text-gray-800 font-medium">As a Plug, you must:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Market and promote products to your audience effectively</li>
                <li>Handle all customer service inquiries for your sales</li>
                <li>Process orders through your personalized Pluggn store</li>
                <li>Set retail prices that allow for profit while remaining competitive</li>
                <li>Communicate clearly with customers about shipping times</li>
              </ul>
              
              <div className="pt-2">
                <p className="text-gray-800 font-medium">As a Plug, you can:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Start an online business with zero inventory investment</li>
                  <li>Select from thousands of products to sell from our supplier network</li>
                  <li>Set your own retail prices and control your profit margins</li>
                  <li>Focus exclusively on marketing and growing your customer base</li>
                  <li>Create multiple storefronts targeting different niches</li>
                  <li>Generate passive income through your digital storefront</li>
                  <li>Build your brand without worrying about product fulfillment</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-5 rounded-lg">
            <p className="text-gray-800">
              <span className="font-semibold">Which is right for you?</span>
            </p>
            <p className="text-gray-700 mt-2">
              • Choose <span className="font-medium">Supplier</span> if you create products or have inventory to sell and want others to market and sell your items.
            </p>
            <p className="text-gray-700 mt-2">
              • Choose <span className="font-medium">Plug</span> if you want to earn by selling products without handling inventory or manufacturing.
            </p>
            <p className="text-sm text-gray-600 mt-4 italic">
              You can always change your user type later through your account settings.
            </p>
          </div>
        </div>

        <div className="p-6 border-t">
          <Button
            onClick={onClose}
            className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-medium"
          >
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );
}
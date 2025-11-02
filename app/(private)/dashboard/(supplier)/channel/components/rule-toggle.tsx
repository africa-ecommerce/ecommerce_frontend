"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface RuleToggleProps {
  name: string;
  description: string;
  type?: "switch" | "return" | "refund";
  enabled?: boolean;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
  
  // Return policy specific props
  returnWindow?: number;
  returnPolicyTerms?: string;
  returnShippingFee?: string;
  supplierShare?: number;
  onReturnWindowChange?: (value: number | null) => void;
  onReturnTermsChange?: (value: string) => void;
  onReturnShippingChange?: (value: string) => void;
  onSupplierShareChange?: (value: number | null) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export default function RuleToggle({
  name,
  description,
  type = "switch",
  enabled = false,
  onToggle,
  disabled = false,
  returnWindow,
  returnPolicyTerms = "",
  returnShippingFee = "BUYER",
  supplierShare,
  onReturnWindowChange,
  onReturnTermsChange,
  onReturnShippingChange,
  onSupplierShareChange,
  onValidationChange,
}: RuleToggleProps) {
  
  const [returnWindowError, setReturnWindowError] = useState(false);
  const [supplierShareError, setSupplierShareError] = useState(false);

  // Validate and notify parent of validation state
  useEffect(() => {
    if (enabled && type === "return") {
      const isReturnWindowValid = returnWindow !== null && returnWindow !== undefined && returnWindow >= 1;
      const isSupplierShareValid = returnShippingFee.toLowerCase() !== "shared" || 
        (supplierShare !== null && supplierShare !== undefined && supplierShare >= 1 && supplierShare <= 100);
      
      const isValid = isReturnWindowValid && isSupplierShareValid;
      onValidationChange?.(isValid);
      
      setReturnWindowError(!isReturnWindowValid);
      setSupplierShareError(returnShippingFee.toLowerCase() === "shared" && !isSupplierShareValid);
    } else {
      onValidationChange?.(true);
      setReturnWindowError(false);
      setSupplierShareError(false);
    }
  }, [enabled, type, returnWindow, supplierShare, returnShippingFee, onValidationChange]);

  const handleReturnWindowChange = (value: string) => {
    if (value === "") {
      onReturnWindowChange?.(null);
    } else {
      const num = Number(value);
      if (!isNaN(num)) {
        onReturnWindowChange?.(num);
      }
    }
  };

  const handleSupplierShareChange = (value: string) => {
    if (value === "") {
      onSupplierShareChange?.(null);
    } else {
      const num = Number(value);
      if (!isNaN(num)) {
        onSupplierShareChange?.(num);
      }
    }
  };

  return (
    <Card
      className={`p-4 border transition-colors duration-200 ${
        disabled
          ? "border-neutral-200 opacity-60 cursor-not-allowed"
          : "border-neutral-200 hover:border-orange-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-neutral-800">{name}</h4>
            <Switch
              checked={enabled}
              disabled={disabled}
              onCheckedChange={(checked) => onToggle?.(checked)}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      </div>

      {enabled && !disabled && type === "return" && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
          {/* RETURN WINDOW */}
          <div>
            <Label
              htmlFor="return-window"
              className="text-sm text-neutral-700"
            >
              Return window (days) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="return-window"
              type="number"
              min={1}
              value={returnWindow ?? ""}
              onChange={(e) => handleReturnWindowChange(e.target.value)}
              placeholder="Enter number of days"
              className={`mt-2 border ${
                returnWindowError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
              }`}
            />
            {returnWindowError && (
              <p className="text-xs text-red-500 mt-1">
                Return window must be at least 1 day
              </p>
            )}
          </div>

          {/* RETURN TERMS */}
          <div>
            <Label
              htmlFor="return-policy"
              className="text-sm text-neutral-700"
            >
              Return policy terms
            </Label>
            <Textarea
              id="return-policy"
              placeholder="Example: Returns are accepted only for damaged or incorrect items. Products must remain unused, in original packaging."
              rows={3}
              value={returnPolicyTerms}
              onChange={(e) => onReturnTermsChange?.(e.target.value)}
              className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
            />
          </div>

          {/* RETURN SHIPPING FEE */}
          <div>
            <Label className="text-sm text-neutral-700">
              Who pays return shipping?
            </Label>
            <Select
              value={returnShippingFee.toLowerCase()}
              onValueChange={(val) => {
                onReturnShippingChange?.(val.toUpperCase());
              }}
            >
              <SelectTrigger className="mt-2 w-full border-neutral-300">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="supplier">You</SelectItem>
                <SelectItem value="shared">Shared</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SHARED PERCENTAGE */}
          {returnShippingFee.toLowerCase() === "shared" && (
            <div>
              <Label
                htmlFor="shared-percentage"
                className="text-sm text-neutral-700"
              >
                Your share of return cost (%) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="shared-percentage"
                type="number"
                min={1}
                max={100}
                value={supplierShare ?? ""}
                onChange={(e) => handleSupplierShareChange(e.target.value)}
                placeholder="Enter percentage (1-100)"
                className={`mt-2 border ${
                  supplierShareError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
                }`}
              />
              {supplierShareError && (
                <p className="text-xs text-red-500 mt-1">
                  Percentage must be between 1 and 100
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
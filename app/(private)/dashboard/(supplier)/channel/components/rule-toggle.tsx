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
  type?: "switch" | "percentage" | "fulfilment" | "refund" | "return";
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
  defaultEnabled?: boolean;
  defaultValues?: any;
}

export default function RuleToggle({
  name,
  description,
  type = "switch",
  onToggle,
  disabled = false,
  defaultEnabled = false,
  defaultValues = {},
}: RuleToggleProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [returnCostType, setReturnCostType] = useState(defaultValues.returnShippingFee?.toLowerCase() || "buyer");
  const [returnWindow, setReturnWindow] = useState(defaultValues.returnWindow || 7);
  const [sharedPercentage, setSharedPercentage] = useState(defaultValues.supplierShare || 50);
  const [returnPolicyTerms, setReturnPolicyTerms] = useState(defaultValues.returnPolicyTerms || "");
      // Error states for red borders
  const [returnWindowError, setReturnWindowError] = useState(false);
  const [sharedError, setSharedError] = useState(false);

  // update toggle
  useEffect(() => {
    if (onToggle) onToggle(enabled);
  }, [enabled]);
  
  useEffect(() => {
    setEnabled(defaultEnabled);
  }, [defaultEnabled]);




  // Validation handlers
  const validateReturnWindow = (val: number) => {
    const valid = val >= 1;
    setReturnWindowError(!valid);
    setReturnWindow(valid ? val : 1);
  };

  const validateShared = (val: number) => {
    const valid = val >= 1 && val <= 100;
    setSharedError(!valid);
    setSharedPercentage(valid ? val : 50);
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
              onCheckedChange={setEnabled}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      </div>

      {/* CONDITIONAL SECTIONS */}
      {enabled && !disabled && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
          {type === "return" && (
            <div className="space-y-3">
              {/* RETURN WINDOW */}
              <div>
                <Label
                  htmlFor="refund-window"
                  className="text-sm text-neutral-700"
                >
                  Return window (days)
                </Label>
                <Input
                  id="refund-window"
                  type="number"
                  required
                  min={1}
                  value={returnWindow}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    validateReturnWindow(val);
                  }}
                  onBlur={() => setReturnWindowError(returnWindow < 1)}
                  className={`mt-2 border ${
                    returnWindowError
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
                  }`}
                />
                {returnWindowError && (
                  <p className="text-xs text-red-500 mt-1">
                    Return window must be at least 1 day.
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
                  placeholder="Example: Returns are accepted only for damaged or incorrect items. Products must remain unused, in original packaging, and returned within 7 days."
                  rows={3}
                  value={returnPolicyTerms}
                  onChange={(e) => setReturnPolicyTerms(e.target.value)}
                  className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                />
              </div>

              {/* RETURN COST TYPE */}
              <div>
                <Label className="text-sm text-neutral-700">
                  Who pays return shipping?
                </Label>
                <Select
                  value={returnCostType}
                  onValueChange={(val) => {
                    setReturnCostType(val);
                    if (val !== "shared") setSharedError(false);
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
              {returnCostType === "shared" && (
                <div>
                  <Label
                    htmlFor="shared-percentage"
                    className="text-sm text-neutral-700"
                  >
                    Your share of return cost (%)
                  </Label>
                  <Input
                    id="shared-percentage"
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={sharedPercentage}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      validateShared(val);
                    }}
                    onBlur={() =>
                      setSharedError(
                        sharedPercentage < 1 || sharedPercentage > 100
                      )
                    }
                    className={`mt-2 border ${
                      sharedError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
                    }`}
                  />
                  {sharedError && (
                    <p className="text-xs text-red-500 mt-1">
                      Percentage must be between 1 and 100.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* REFUND POLICY */}
          {type === "refund" && <div className="space-y-3"></div>}
        </div>
      )}
    </Card>
  );
}

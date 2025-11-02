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
  onToggle?: (value: boolean, extras?: any) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  defaultValues?: {
    returnWindow?: number;
    returnPolicyTerms?: string;
    returnShippingFee?: string;
    supplierShare?: number;
  };
}

export default function RuleToggle({
  name,
  description,
  type = "switch",
  onToggle,
  disabled = false,
  defaultChecked = false,
  defaultValues = {},
}: RuleToggleProps) {
  const [enabled, setEnabled] = useState(defaultChecked);
  const [returnCostType, setReturnCostType] = useState(
    defaultValues.returnShippingFee?.toLowerCase() || "buyer"
  );
  const [returnWindow, setReturnWindow] = useState(
    defaultValues.returnWindow ?? 7
  );
  const [returnTerms, setReturnTerms] = useState(
    defaultValues.returnPolicyTerms ?? ""
  );
  const [sharedPercentage, setSharedPercentage] = useState(
    defaultValues.supplierShare ?? 50
  );

  // validation
  const [returnWindowError, setReturnWindowError] = useState(false);
  const [sharedError, setSharedError] = useState(false);

  // Sync default data on mount
  useEffect(() => {
    setEnabled(defaultChecked);
    if (defaultValues) {
      setReturnCostType(
        defaultValues.returnShippingFee?.toLowerCase() || "buyer"
      );
      setReturnWindow(defaultValues.returnWindow ?? 7);
      setReturnTerms(defaultValues.returnPolicyTerms ?? "");
      setSharedPercentage(defaultValues.supplierShare ?? 50);
    }
  }, [defaultChecked, defaultValues]);

  // Notify parent when toggle or nested data changes
  useEffect(() => {
    if (onToggle) {
      onToggle(enabled, {
        returnWindow,
        returnPolicyTerms: returnTerms,
        returnShippingFee: returnCostType.toUpperCase(),
        supplierShare: sharedPercentage,
      });
    }
  }, [
    enabled,
    returnWindow,
    returnTerms,
    returnCostType,
    sharedPercentage,
    onToggle,
  ]);

  // Reset if disabled
  useEffect(() => {
    if (disabled && enabled) setEnabled(false);
  }, [disabled]);

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

      {enabled && !disabled && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
          {type === "return" && (
            <div className="space-y-3">
              <div>
                <Label
                  htmlFor="return-window"
                  className="text-sm text-neutral-700"
                >
                  Return window (days)
                </Label>
                <Input
                  id="return-window"
                  type="number"
                  min={1}
                  value={returnWindow}
                  onChange={(e) => validateReturnWindow(Number(e.target.value))}
                  className={`mt-2 border ${
                    returnWindowError
                      ? "border-red-500"
                      : "border-neutral-300 focus:border-orange-500"
                  }`}
                />
              </div>

              <div>
                <Label
                  htmlFor="return-terms"
                  className="text-sm text-neutral-700"
                >
                  Return policy terms
                </Label>
                <Textarea
                  id="return-terms"
                  placeholder="Describe your return policy"
                  rows={3}
                  value={returnTerms}
                  onChange={(e) => setReturnTerms(e.target.value)}
                  className="mt-2 border-neutral-300 focus:border-orange-500"
                />
              </div>

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
                    min={1}
                    max={100}
                    value={sharedPercentage}
                    onChange={(e) => validateShared(Number(e.target.value))}
                    className={`mt-2 border ${
                      sharedError
                        ? "border-red-500"
                        : "border-neutral-300 focus:border-orange-500"
                    }`}
                  />
                </div>
              )}
            </div>
          )}

          {type === "refund" && (
            <div className="space-y-3">
              <Label
                htmlFor="refund-terms"
                className="text-sm text-neutral-700"
              >
                Refund policy terms
              </Label>
              <Textarea
                id="refund-terms"
                placeholder="Explain when refunds are processed"
                rows={3}
                className="mt-2 border-neutral-300 focus:border-orange-500"
              />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

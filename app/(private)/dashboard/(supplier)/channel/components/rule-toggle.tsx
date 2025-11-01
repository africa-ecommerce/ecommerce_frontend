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
}

export default function RuleToggle({
  name,
  description,
  type = "switch",
  onToggle,
  disabled = false,
}: RuleToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [returnCostType, setReturnCostType] = useState<string>("buyer");

  // Notify parent whenever toggle changes
  useEffect(() => {
    if (onToggle) onToggle(enabled);
  }, [enabled]);

  // If disabled externally, turn it off
  useEffect(() => {
    if (disabled && enabled) setEnabled(false);
  }, [disabled]);

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
                  placeholder="e.g., 7"
                  className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
                  min="1"
                  defaultValue={7}
                />
              </div>
              <div>
                <Label
                  htmlFor="return-policy"
                  className="text-sm text-neutral-700"
                >
                  Return policy terms
                </Label>
                <Textarea
                  id="return-policy"
                  placeholder="Example: Returns are accepted only for damaged or incorrect items. Products must remain unused, in original packaging, and returned within 7 days. Buyer is responsible for return shipping cost unless otherwise agreed."
                  rows={3}
                  className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                />
              </div>

              <div>
                <Label className="text-sm text-neutral-700">
                  Who pays return shipping?
                </Label>
                <Select
                  value={returnCostType}
                  onValueChange={setReturnCostType}
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
                    placeholder="e.g., 50"
                    className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Refund Policy */}
          {type === "refund" && (
            <div className="space-y-3">
              
              <div>
                <Label
                  htmlFor="refund-terms"
                  className="text-sm text-neutral-700"
                >
                  Refund policy terms
                </Label>
                <Textarea
                  id="refund-terms"
                  placeholder="Example: Refunds of cash if the product is defective, missing parts, or not as described. Buyers must provide proof before a refund can be approved."
                  rows={3}
                  className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                />
              </div>
            </div>
          )}

         
          
        </div>
      )}
    </Card>
  );
}

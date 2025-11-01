"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface RuleToggleProps {
  name: string;
  description: string;
  type?:
    | "switch"
    | "percentage"
    | "fulfilment"
    | "refund"
    | "return"
    
}

export default function RuleToggle({
  name,
  description,
  type = "switch",
}: RuleToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [returnCostType, setReturnCostType] = useState<string>("buyer");

  return (
    <Card className="p-4 border border-neutral-200 hover:border-orange-300 transition-colors duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-neutral-800">{name}</h4>
            <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      </div>

      {/* CONDITIONAL SECTIONS */}
      {enabled && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">

          {/* Percentage for Partial Payment */}
          {type === "percentage" && (
            <div>
              <Label htmlFor="partial-payment" className="text-sm text-neutral-700">
                Partial payment percentage (%)
              </Label>
              <Input
                id="partial-payment"
                type="number"
                placeholder="e.g., 30"
                className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          )}

          {/* Fulfilment Rules */}
          {type === "fulfilment" && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="fulfilment-time" className="text-sm text-neutral-700">
                  Fulfilment time (hours or days)
                </Label>
                <Input
                  id="fulfilment-time"
                  type="text"
                  placeholder="e.g., 2 days"
                  className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <Label htmlFor="operating-days" className="text-sm text-neutral-700">
                  Operating days
                </Label>
                <Select>
                  <SelectTrigger className="mt-2 w-full border-neutral-300">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekdays">Weekdays only</SelectItem>
                    <SelectItem value="weekends">Weekends included</SelectItem>
                    <SelectItem value="custom">Custom days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Refund Policy */}
          {type === "refund" && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="refund-window" className="text-sm text-neutral-700">
                  Refund window (days)
                </Label>
                <Input
                  id="refund-window"
                  type="number"
                  placeholder="e.g., 7"
                  className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <Label htmlFor="refund-terms" className="text-sm text-neutral-700">
                  Refund policy terms
                </Label>
                <Textarea
                  id="refund-terms"
                  placeholder="Describe your refund conditions..."
                  rows={3}
                  className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Return Policy */}
          {type === "return" && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="return-policy" className="text-sm text-neutral-700">
                  Return policy terms
                </Label>
                <Textarea
                  id="return-policy"
                  placeholder="Describe your return policy..."
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
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {returnCostType === "shared" && (
                <div>
                  <Label htmlFor="shared-percentage" className="text-sm text-neutral-700">
                    Supplier's share of return cost (%)
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

          {/* Packaging Preference */}
          
        </div>
      )}
    </Card>
  );
}

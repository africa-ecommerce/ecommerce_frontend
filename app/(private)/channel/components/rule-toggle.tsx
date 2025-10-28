"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface RuleToggleProps {
  name: string;
  description: string;
  hasRefundOptions?: boolean;
  hasDeliveryInput?: boolean;
  hasMinOrderInput?: boolean;
}

export default function RuleToggle({
  name,
  description,
  hasRefundOptions,
  hasDeliveryInput,
  hasMinOrderInput,
}: RuleToggleProps) {
  const [enabled, setEnabled] = useState(false);

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

      {/* Refund options */}
      {hasRefundOptions && enabled && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-2">
            <Label htmlFor="refund-window" className="text-sm text-neutral-700">
              Refund window (in days)
            </Label>
            <Input
              id="refund-window"
              type="number"
              placeholder="e.g., 7"
              className="border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="refund-terms" className="text-sm text-neutral-700">
              Custom refund terms
            </Label>
            <Textarea
              id="refund-terms"
              placeholder="Describe your refund policy..."
              rows={3}
              className="border-neutral-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
            />
          </div>
        </div>
      )}

      {/* Delivery duration input */}
      {hasDeliveryInput && enabled && (
        <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
          <Label htmlFor="delivery-days" className="text-sm text-neutral-700">
            Estimated delivery days
          </Label>
          <Input
            id="delivery-days"
            type="number"
            placeholder="e.g., 3-5"
            className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      )}

      {/* Minimum order quantity input */}
      {hasMinOrderInput && enabled && (
        <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
          <Label htmlFor="min-order" className="text-sm text-neutral-700">
            Minimum quantity
          </Label>
          <Input
            id="min-order"
            type="number"
            placeholder="e.g., 10"
            className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      )}
    </Card>
  );
}

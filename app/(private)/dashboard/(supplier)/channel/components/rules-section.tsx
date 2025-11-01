"use client";
import { useState } from "react";
import RuleToggle from "./rule-toggle";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function RulesSection() {
  const [returnEnabled, setReturnEnabled] = useState(false);
  const [fulfilmentTime, setFulfilmentTime] = useState<string>("same-day"); // ✅ default to same-day

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
      <h3 className="text-lg font-semibold text-neutral-800">
        Rules & Policies
      </h3>

      <div className="space-y-3">
        {/* PAYMENT & FULFILMENT */}
        <RuleToggle
          name="Pay on Delivery (COD)"
          description="Allow your channel buyers or customers to pay for items only when they receive them at delivery."
          type="switch"
        />

        {/* FULFILMENT TIME */}
        <Card className="p-4 border transition-colors duration-200 border-neutral-200 hover:border-orange-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <h4 className="font-medium text-neutral-800">Fulfilment Time</h4>
              <p className="text-sm text-neutral-500">
                Define how long it takes you to prepare or dispatch an order
                after it has been placed.
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-3">
            <div>
              <Label
                htmlFor="fulfilment-time"
                className="text-sm text-neutral-700"
              >
                Select fulfilment time
              </Label>
              <Select value={fulfilmentTime} onValueChange={setFulfilmentTime}>
                <SelectTrigger className="mt-2 w-full border-neutral-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same-day">Same day</SelectItem>
                  <SelectItem value="next-day">Next day</SelectItem>
                  <SelectItem value="2-days">2 days</SelectItem>
                  <SelectItem value="3-days-plus">3 days +</SelectItem>
                  <SelectItem value="weekend-saturday">
                    Weekend (Saturday)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* RETURN POLICY */}
        <RuleToggle
          name="Return Policy"
          description="Explain your return process and who covers the return shipping cost (you, the buyer, or shared)."
          type="return"
          onToggle={setReturnEnabled}
        />

        {/* REFUND POLICY */}
        <RuleToggle
          name="Refund Policy"
          description="Define if buyers are eligible for refunds."
          type="refund"
          disabled={!returnEnabled}
        />
      </div>
    </section>
  );
}

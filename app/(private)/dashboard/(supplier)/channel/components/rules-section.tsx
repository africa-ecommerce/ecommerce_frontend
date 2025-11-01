"use client";
import { useState } from "react";
import RuleToggle from "./rule-toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function RulesSection() {
  const [refundEnabled, setRefundEnabled] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const selectedText =
    selectedDays.length === 0
      ? "Select operating days"
      : selectedDays.length === 7
      ? "All days"
      : selectedDays.join(", ");

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

        <Card className="p-4 border transition-colors duration-200 border-neutral-200 hover:border-orange-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <h4 className="font-medium text-neutral-800">Fulfilment Time</h4>
              <p className="text-sm text-neutral-500">
                Define how long it takes you to prepare or dispatch an order
                after it has been placed, and select which days of the week you
                operate.
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-3">
            <div>
              <Label
                htmlFor="fulfilment-time"
                className="text-sm text-neutral-700"
              >
                Fulfilment time (hours or days from when the order was placed)
              </Label>
              <Input
                id="fulfilment-time"
                type="text"
                placeholder="e.g., 2 days"
                className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-neutral-700">Operating days</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between border-neutral-300 text-sm"
                  >
                    {selectedText}
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-3 space-y-2">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="flex items-center space-x-2 cursor-pointer rounded-md hover:bg-neutral-100 px-2 py-1"
                      onClick={() => toggleDay(day)}
                    >
                      <Checkbox
                        id={day}
                        checked={selectedDays.includes(day)}
                        onCheckedChange={() => toggleDay(day)}
                      />
                      <Label htmlFor={day} className="text-sm cursor-pointer">
                        {day}
                      </Label>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>

        {/* REFUND & RETURN POLICY */}
        <RuleToggle
          name="Refund Policy"
          description="Define if buyers are eligible for refunds and within how many days after product delivery they can request one."
          type="refund"
          onToggle={setRefundEnabled}
        />

        <RuleToggle
          name="Return Policy"
          description="Explain your return process and who covers the return shipping cost (you, the buyer, or shared)."
          type="return"
          disabled={!refundEnabled}
        />

        {/* PACKAGE PREFERENCE — add later if needed */}
      </div>
    </section>
  );
}

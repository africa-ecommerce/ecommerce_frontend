"use client";
import { useState } from "react";
import RuleToggle from "./rule-toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
      ? "Select days"
      : selectedDays.length === 7
      ? "All days"
      : selectedDays.join(", ");

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
      <h3 className="text-xl font-semibold text-neutral-800">
        Rules & Policies
      </h3>

      <div className="space-y-3">
        {/* PAYMENT & FULFILMENT */}
        <RuleToggle
          name="Pay on Delivery (COD)"
          description="Allow buyers to pay when items are delivered."
          type="switch"
        />

        <Card className="p-4 border transition-colors duration-200 border-neutral-200 hover:border-orange-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-neutral-800">
                  Fulfilment Time
                </h4>
              </div>
              <p className="text-sm text-neutral-500">
                Set your estimated fulfilment duration and operating days.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <Label
                htmlFor="fulfilment-time"
                className="text-sm text-neutral-700"
              >
                Fulfilment time (hours or days)
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
                      className="flex items-center space-x-2"
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
          description="Set refund window and terms"
          type="refund"
          onToggle={setRefundEnabled}
        />

        <RuleToggle
          name="Return Policy"
          description="Define how returns are handled"
          type="return"
          disabled={!refundEnabled}
        />

        {/* PACKAGE PREFERENCE */}
      </div>
    </section>
  );
}

"use client";
import RuleToggle from "./rule-toggle";

export default function RulesSection() {
  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
      <h3 className="text-xl font-semibold text-neutral-800">Rules & Policies</h3>

      <div className="space-y-3">

        {/* PAYMENT & FULFILMENT */}
        <RuleToggle
          name="Pay on Delivery (COD)"
          description="Allow buyers to pay when items are delivered."
          type="switch"
        />

        <RuleToggle
          name="Partial Payment"
          description="Require a percentage of payment upfront before fulfilment."
          type="percentage"
        />

        <RuleToggle
          name="Fulfilment Time"
          description="Set your estimated fulfilment duration and operating days."
          type="fulfilment"
        />

        {/* REFUND & RETURN POLICY */}
        <RuleToggle
          name="Refund Policy"
          description="Set your refund window and policy details."
          type="refund"
        />

        <RuleToggle
          name="Return Policy"
          description="Define how returns are handled and who pays return shipping."
          type="return"
        />

        {/* PACKAGE PREFERENCE */}
       
      </div>
    </section>
  );
}

"use client"
import RuleToggle from "./rule-toggle"

export default function RulesSection() {
  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
      <h3 className="text-xl font-semibold text-neutral-800">Rules & Policies</h3>

      <div className="space-y-3">
        <RuleToggle name="Pay on Delivery" description="Allow buyers to pay when items are delivered." />

        <RuleToggle name="Refund Policy" description="Set your refund terms and conditions." hasRefundOptions />

        <RuleToggle name="No Refunds" description="No refunds will be offered for any purchases." />

        <RuleToggle name="Delivery Duration" description="Set estimated delivery timeframe." hasDeliveryInput />

        <RuleToggle
          name="Minimum Order Quantity"
          description="Set the minimum quantity buyers must order."
          hasMinOrderInput
        />
      </div>
    </section>
  )
}

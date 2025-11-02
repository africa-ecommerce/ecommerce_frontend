"use client";
import RuleToggle from "./rule-toggle";


interface RulesSectionProps {
  onChange?: (data: any) => void;
  onValidationChange?: (isValid: boolean) => void; // ✅ added
  defaultData?: {
    payOnDelivery?: boolean;
    returnPolicy?: boolean;
    returnWindow?: number;
    returnPolicyTerms?: string;
    refundPolicy?: boolean;
    returnShippingFee?: string;
    supplierShare?: number;
  };
}

export default function RulesSection({
  onChange,
  onValidationChange,
  defaultData = {
    payOnDelivery: false,
    returnPolicy: false,
    returnWindow: 7,
    returnPolicyTerms: "",
    refundPolicy: false,
    returnShippingFee: "BUYER",
    supplierShare: 50,
  },
}: RulesSectionProps) {
  const handleChange = (key: string, value: any) => {
    const updated = { ...defaultData, [key]: value };
    onChange?.(updated);
  };

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800">
        Rules & Policies
      </h3>

      <div className="space-y-3">
        <RuleToggle
          name="Pay on Delivery (COD)"
          description="Allow buyers to pay upon delivery."
          type="switch"
          enabled={defaultData.payOnDelivery ?? true}
          onToggle={(val) => handleChange("payOnDelivery", val)}
        />

       

        <RuleToggle
          name="Return Policy"
          description="Explain your return process."
          type="return"
          enabled={defaultData.returnPolicy ?? false}
          returnWindow={defaultData.returnWindow}
          returnPolicyTerms={defaultData.returnPolicyTerms || ""}
          returnShippingFee={defaultData.returnShippingFee || "BUYER"}
          supplierShare={defaultData.supplierShare}
          onToggle={(val) => handleChange("returnPolicy", val)}
          onReturnWindowChange={(val) => handleChange("returnWindow", val)}
          onReturnTermsChange={(val) => handleChange("returnPolicyTerms", val)}
          onReturnShippingChange={(val) =>
            handleChange("returnShippingFee", val)
          }
          onSupplierShareChange={(val) => handleChange("supplierShare", val)}
          onValidationChange={onValidationChange} // ✅ forward validation
        />

        <RuleToggle
          name="Refund"
          description="Enable refunds for returned items."
          type="refund"
          enabled={defaultData.refundPolicy ?? false}
          onToggle={(val) => handleChange("refundPolicy", val)}
          disabled={!defaultData.returnPolicy}
        />
      </div>
    </section>
  );
}

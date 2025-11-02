"use client";
import { useEffect, useState } from "react";
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

interface RulesSectionProps {
  onChange?: (data: any) => void;
  defaultData: any;
}

export default function RulesSection({
  onChange,
  defaultData,
}: RulesSectionProps) {
  const [payOnDelivery, setPayOnDelivery] = useState(
    defaultData?.payOnDelivery ?? true
  );
  const [fulfillmentTime, setFulfillmentTime] = useState(
    defaultData?.fulfillmentTime ?? "SAME_DAY"
  );
  const [returnPolicy, setReturnPolicy] = useState(
    defaultData?.returnPolicy ?? false
  );
  const [refundPolicy, setRefundPolicy] = useState(
    defaultData?.refundPolicy ?? false
  );
  const [returnWindow, setReturnWindow] = useState(
    defaultData?.returnWindow ?? 7
  );
  const [returnPolicyTerms, setReturnPolicyTerms] = useState(
    defaultData?.returnPolicyTerms ?? ""
  );
  const [returnShippingFee, setReturnShippingFee] = useState(
    defaultData?.returnShippingFee ?? "BUYER"
  );
  const [supplierShare, setSupplierShare] = useState(
    defaultData?.supplierShare ?? 50
  );

  // Sync parent
  useEffect(() => {
    onChange?.({
      payOnDelivery,
      fulfillmentTime,
      returnPolicy,
      returnWindow,
      returnPolicyTerms,
      refundPolicy,
      returnShippingFee,
      supplierShare,
    });
  }, [
    payOnDelivery,
    fulfillmentTime,
    returnPolicy,
    returnWindow,
    returnPolicyTerms,
    refundPolicy,
    returnShippingFee,
    supplierShare,
    onChange,
  ]);

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
          onToggle={(val) => setPayOnDelivery(val)}
          defaultChecked={payOnDelivery}
        />

        <Card className="p-4 border border-neutral-200 hover:border-orange-300">
          <Label className="text-sm text-neutral-700">Fulfilment Time</Label>
          <Select
            value={fulfillmentTime}
            onValueChange={(val) => setFulfillmentTime(val.toUpperCase())}
          >
            <SelectTrigger className="mt-2 w-full border-neutral-300">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SAME_DAY">Same day</SelectItem>
              <SelectItem value="NEXT_DAY">Next day</SelectItem>
              <SelectItem value="TWO_DAYS">2 days</SelectItem>
              <SelectItem value="THREE_PLUS_DAYS">3 days +</SelectItem>
              <SelectItem value="WEEKEND">Weekend</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <RuleToggle
          name="Return Policy"
          description="Explain your return process."
          type="return"
          onToggle={(val, extras) => {
            setReturnPolicy(val);
            if (extras) {
              setReturnWindow(extras.returnWindow);
              setReturnPolicyTerms(extras.returnPolicyTerms);
              setReturnShippingFee(extras.returnShippingFee);
              setSupplierShare(extras.supplierShare);
            }
          }}
          defaultChecked={returnPolicy}
          defaultValues={{
            returnWindow,
            returnPolicyTerms,
            returnShippingFee,
            supplierShare,
          }}
        />

        <RuleToggle
          name="Refund Policy"
          description="Enable refunds for returned items."
          type="refund"
          onToggle={(val) => setRefundPolicy(val)}
          defaultChecked={refundPolicy}
          disabled={!returnPolicy}
        />
      </div>
    </section>
  );
}

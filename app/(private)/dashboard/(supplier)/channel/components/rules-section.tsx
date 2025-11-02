// "use client";
// import { useEffect, useState } from "react";
// import RuleToggle from "./rule-toggle";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// interface RulesSectionProps {
//   onChange?: (data: any) => void;
//   defaultData: any
// }

// export default function RulesSection({ onChange, defaultData }: RulesSectionProps) {
//   const [payOnDelivery, setPayOnDelivery] = useState(true);
//   const [fulfillmentTime, setFulfillmentTime] = useState("SAME_DAY");
//   const [returnPolicy, setReturnPolicy] = useState(false);
//   const [returnWindow, setReturnWindow] = useState(7);
//   const [returnPolicyTerms, setReturnPolicyTerms] = useState("");
//   const [refundPolicy, setRefundPolicy] = useState(false);
//   const [returnShippingFee, setReturnShippingFee] = useState("BUYER");
//   const [supplierShare, setSupplierShare] = useState(50);

//   useEffect(() => {
//     onChange?.({
//       payOnDelivery,
//       fulfillmentTime,
//       returnPolicy,
//       returnWindow,
//       returnPolicyTerms,
//       refundPolicy,
//       returnShippingFee,
//       supplierShare,
//     });
//   }, [
//     payOnDelivery,
//     fulfillmentTime,
//     returnPolicy,
//     returnWindow,
//     returnPolicyTerms,
//     refundPolicy,
//     returnShippingFee,
//     supplierShare,
//   ]);

//   return (
//     <section className="space-y-4">
//       <h3 className="text-lg font-semibold text-neutral-800">
//         Rules & Policies
//       </h3>

//       <div className="space-y-3">
//         <RuleToggle
//           name="Pay on Delivery (COD)"
//           description="Allow buyers to pay upon delivery."
//           type="switch"
//           onToggle={setPayOnDelivery}
//         />

//         {/* Fulfillment Time */}
//         <Card className="p-4 border border-neutral-200 hover:border-orange-300">
//           <Label className="text-sm text-neutral-700">Fulfilment Time</Label>
//           <Select
//             value={fulfillmentTime}
//             onValueChange={(val) => setFulfillmentTime(val.toUpperCase())}
//           >
//             <SelectTrigger className="mt-2 w-full border-neutral-300">
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="SAME_DAY">Same day</SelectItem>
//               <SelectItem value="NEXT_DAY">Next day</SelectItem>
//               <SelectItem value="TWO_DAYS">2 days</SelectItem>
//               <SelectItem value="THREE_PLUS_DAYS">3 days +</SelectItem>
//               <SelectItem value="WEEKEND">Weekend</SelectItem>
//             </SelectContent>
//           </Select>
//         </Card>

//         <RuleToggle
//           name="Return Policy"
//           description="Explain your return process."
//           type="return"
//           onToggle={setReturnPolicy}
//         />

//         <RuleToggle
//           name="Refund Policy"
//           description="Enable refunds for returned items."
//           type="refund"
//           onToggle={setRefundPolicy}
//           disabled={!returnPolicy}
//         />
//       </div>
//     </section>
//   );
// }



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
  defaultData?: Record<string, any> | null;
}

export default function RulesSection({
  onChange,
  defaultData = {},
}: RulesSectionProps) {
  // ✅ Safe defaults in case defaultData is empty or undefined
  const safeData = {
    payOnDelivery: !!defaultData?.payOnDelivery,
    fulfillmentTime: defaultData?.fulfillmentTime ?? "SAME_DAY",
    returnPolicy: !!defaultData?.returnPolicy,
    returnWindow: Number(defaultData?.returnWindow ?? 7),
    returnPolicyTerms: defaultData?.returnPolicyTerms ?? "",
    refundPolicy: !!defaultData?.refundPolicy,
    returnShippingFee: defaultData?.returnShippingFee ?? "BUYER",
    supplierShare: Number(defaultData?.supplierShare ?? 50),
  };

  // ✅ Local states with safe initialization
  const [payOnDelivery, setPayOnDelivery] = useState(safeData.payOnDelivery);
  const [fulfillmentTime, setFulfillmentTime] = useState(
    safeData.fulfillmentTime
  );
  const [returnPolicy, setReturnPolicy] = useState(safeData.returnPolicy);
  const [returnWindow, setReturnWindow] = useState(safeData.returnWindow);
  const [returnPolicyTerms, setReturnPolicyTerms] = useState(
    safeData.returnPolicyTerms
  );
  const [refundPolicy, setRefundPolicy] = useState(safeData.refundPolicy);
  const [returnShippingFee, setReturnShippingFee] = useState(
    safeData.returnShippingFee
  );
  const [supplierShare, setSupplierShare] = useState(safeData.supplierShare);

  // ✅ Sync updates when defaultData changes dynamically
  useEffect(() => {
    if (!defaultData) return; // ignore null
    setPayOnDelivery(!!defaultData.payOnDelivery);
    setFulfillmentTime(defaultData.fulfillmentTime ?? "SAME_DAY");
    setReturnPolicy(!!defaultData.returnPolicy);
    setReturnWindow(Number(defaultData.returnWindow ?? 7));
    setReturnPolicyTerms(defaultData.returnPolicyTerms ?? "");
    setRefundPolicy(!!defaultData.refundPolicy);
    setReturnShippingFee(defaultData.returnShippingFee ?? "BUYER");
    setSupplierShare(Number(defaultData.supplierShare ?? 50));
  }, [defaultData]);

  // ✅ Emit upward changes
  useEffect(() => {
    if (!onChange) return;
    onChange({
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

  // ✅ Safe rendering — never crashes even if RuleToggle or props break
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
          onToggle={(val) => setPayOnDelivery(Boolean(val))}
          defaultChecked={Boolean(payOnDelivery)}
        />

        <Card className="p-4 border border-neutral-200 hover:border-orange-300">
          <Label className="text-sm text-neutral-700">Fulfilment Time</Label>
          <Select
            value={fulfillmentTime}
            onValueChange={(val) =>
              setFulfillmentTime(val?.toUpperCase() || "SAME_DAY")
            }
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
          onToggle={(val) => setReturnPolicy(Boolean(val))}
          defaultChecked={Boolean(returnPolicy)}
          defaultWindow={Number(returnWindow)}
          defaultTerms={String(returnPolicyTerms)}
          defaultReturnCost={String(returnShippingFee)}
          defaultSupplierShare={Number(supplierShare)}
        />

        <RuleToggle
          name="Refund Policy"
          description="Enable refunds for returned items."
          type="refund"
          onToggle={(val) => setRefundPolicy(Boolean(val))}
          defaultChecked={Boolean(refundPolicy)}
          disabled={!returnPolicy}
        />
      </div>
    </section>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// interface RuleToggleProps {
//   name: string;
//   description: string;
//   type?: "switch" | "percentage" | "fulfilment" | "refund" | "return";
//   onToggle?: (value: boolean) => void;
//   disabled?: boolean;
// }

// export default function RuleToggle({
//   name,
//   description,
//   type = "switch",
//   onToggle,
//   disabled = false,
// }: RuleToggleProps) {
//   const [enabled, setEnabled] = useState(false);
//   const [returnCostType, setReturnCostType] = useState<string>("buyer");
//   const [returnWindow, setReturnWindow] = useState<number>(7);
//   const [sharedPercentage, setSharedPercentage] = useState<number>(50);

//   // Error states for red borders
//   const [returnWindowError, setReturnWindowError] = useState(false);
//   const [sharedError, setSharedError] = useState(false);

//   // Notify parent whenever toggle changes
//   useEffect(() => {
//     if (onToggle) onToggle(enabled);
//   }, [enabled]);

//   // Reset if disabled externally
//   useEffect(() => {
//     if (disabled && enabled) setEnabled(false);
//   }, [disabled]);

//   // Validation handlers
//   const validateReturnWindow = (val: number) => {
//     const valid = val >= 1;
//     setReturnWindowError(!valid);
//     setReturnWindow(valid ? val : 1);
//   };

//   const validateShared = (val: number) => {
//     const valid = val >= 1 && val <= 100;
//     setSharedError(!valid);
//     setSharedPercentage(valid ? val : 50);
//   };

//   return (
//     <Card
//       className={`p-4 border transition-colors duration-200 ${
//         disabled
//           ? "border-neutral-200 opacity-60 cursor-not-allowed"
//           : "border-neutral-200 hover:border-orange-300"
//       }`}
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex-1 space-y-1">
//           <div className="flex items-center justify-between">
//             <h4 className="font-medium text-neutral-800">{name}</h4>
//             <Switch
//               checked={enabled}
//               disabled={disabled}
//               onCheckedChange={setEnabled}
//               className="data-[state=checked]:bg-orange-500"
//             />
//           </div>
//           <p className="text-sm text-neutral-500">{description}</p>
//         </div>
//       </div>

//       {/* CONDITIONAL SECTIONS */}
//       {enabled && !disabled && (
//         <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
//           {type === "return" && (
//             <div className="space-y-3">
//               {/* RETURN WINDOW */}
//               <div>
//                 <Label
//                   htmlFor="refund-window"
//                   className="text-sm text-neutral-700"
//                 >
//                   Return window (days)
//                 </Label>
//                 <Input
//                   id="refund-window"
//                   type="number"
//                   required
//                   min={1}
//                   value={returnWindow}
//                   onChange={(e) => {
//                     const val = Number(e.target.value);
//                     validateReturnWindow(val);
//                   }}
//                   onBlur={() => setReturnWindowError(returnWindow < 1)}
//                   className={`mt-2 border ${
//                     returnWindowError
//                       ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                       : "border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
//                   }`}
//                 />
//                 {returnWindowError && (
//                   <p className="text-xs text-red-500 mt-1">
//                     Return window must be at least 1 day.
//                   </p>
//                 )}
//               </div>

//               {/* RETURN TERMS */}
//               <div>
//                 <Label
//                   htmlFor="return-policy"
//                   className="text-sm text-neutral-700"
//                 >
//                   Return policy terms
//                 </Label>
//                 <Textarea
//                   id="return-policy"
//                   placeholder="Example: Returns are accepted only for damaged or incorrect items. Products must remain unused, in original packaging, and returned within 7 days."
//                   rows={3}
//                   className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
//                 />
//               </div>

//               {/* RETURN COST TYPE */}
//               <div>
//                 <Label className="text-sm text-neutral-700">
//                   Who pays return shipping?
//                 </Label>
//                 <Select
//                   value={returnCostType}
//                   onValueChange={(val) => {
//                     setReturnCostType(val);
//                     if (val !== "shared") setSharedError(false);
//                   }}
//                 >
//                   <SelectTrigger className="mt-2 w-full border-neutral-300">
//                     <SelectValue placeholder="Select" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="buyer">Buyer</SelectItem>
//                     <SelectItem value="supplier">You</SelectItem>
//                     <SelectItem value="shared">Shared</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* SHARED PERCENTAGE */}
//               {returnCostType === "shared" && (
//                 <div>
//                   <Label
//                     htmlFor="shared-percentage"
//                     className="text-sm text-neutral-700"
//                   >
//                     Your share of return cost (%)
//                   </Label>
//                   <Input
//                     id="shared-percentage"
//                     type="number"
//                     required
//                     min={1}
//                     max={100}
//                     value={sharedPercentage}
//                     onChange={(e) => {
//                       const val = Number(e.target.value);
//                       validateShared(val);
//                     }}
//                     onBlur={() =>
//                       setSharedError(
//                         sharedPercentage < 1 || sharedPercentage > 100
//                       )
//                     }
//                     className={`mt-2 border ${
//                       sharedError
//                         ? "border-red-500 focus:border-red-500 focus:ring-red-500"
//                         : "border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
//                     }`}
//                   />
//                   {sharedError && (
//                     <p className="text-xs text-red-500 mt-1">
//                       Percentage must be between 1 and 100.
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* REFUND POLICY */}
//           {type === "refund" && (
//             <div className="space-y-3">
//               <Label
//                 htmlFor="refund-terms"
//                 className="text-sm text-neutral-700"
//               >
//                 Refund policy terms
//               </Label>
//               <Textarea
//                 id="refund-terms"
//                 placeholder="Explain when and how refunds are processed for eligible orders."
//                 rows={3}
//                 className="mt-2 border-neutral-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </Card>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface RuleToggleProps {
  name: string;
  description: string;
  type?: "switch" | "percentage" | "fulfilment" | "refund" | "return";
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
  defaultWindow?: number;
  defaultTerms?: string;
  defaultReturnCost?: string;
  defaultSupplierShare?: number;
}

export default function RuleToggle({
  name,
  description,
  type = "switch",
  onToggle,
  disabled = false,
  defaultChecked = false,
  defaultWindow = 7,
  defaultTerms = "",
  defaultReturnCost = "BUYER",
  defaultSupplierShare = 50,
}: RuleToggleProps) {
  const [enabled, setEnabled] = useState(defaultChecked);
  const [returnCostType, setReturnCostType] = useState(defaultReturnCost.toLowerCase());
  const [returnWindow, setReturnWindow] = useState(defaultWindow);
  const [sharedPercentage, setSharedPercentage] = useState(defaultSupplierShare);
  const [returnTerms, setReturnTerms] = useState(defaultTerms);

  const [returnWindowError, setReturnWindowError] = useState(false);
  const [sharedError, setSharedError] = useState(false);

  useEffect(() => {
    setEnabled(defaultChecked);
    setReturnCostType(defaultReturnCost.toLowerCase());
    setReturnWindow(defaultWindow);
    setSharedPercentage(defaultSupplierShare);
    setReturnTerms(defaultTerms);
  }, [defaultChecked, defaultWindow, defaultTerms, defaultReturnCost, defaultSupplierShare]);

  useEffect(() => {
    onToggle?.(enabled);
  }, [enabled]);

  const validateReturnWindow = (val: number) => {
    const valid = val >= 1;
    setReturnWindowError(!valid);
    setReturnWindow(valid ? val : 1);
  };

  const validateShared = (val: number) => {
    const valid = val >= 1 && val <= 100;
    setSharedError(!valid);
    setSharedPercentage(valid ? val : 50);
  };

  return (
    <Card
      className={`p-4 border transition-colors duration-200 ${
        disabled
          ? "border-neutral-200 opacity-60 cursor-not-allowed"
          : "border-neutral-200 hover:border-orange-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-neutral-800">{name}</h4>
            <Switch
              checked={enabled}
              disabled={disabled}
              onCheckedChange={setEnabled}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      </div>

      {enabled && !disabled && (
        <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
          {type === "return" && (
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-neutral-700">
                  Return window (days)
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={returnWindow}
                  onChange={(e) => validateReturnWindow(Number(e.target.value))}
                  className={`mt-2 border ${
                    returnWindowError
                      ? "border-red-500 focus:border-red-500"
                      : "border-neutral-300 focus:border-orange-500"
                  }`}
                />
              </div>

              <div>
                <Label className="text-sm text-neutral-700">
                  Return policy terms
                </Label>
                <Textarea
                  value={returnTerms}
                  onChange={(e) => setReturnTerms(e.target.value)}
                  rows={3}
                  className="mt-2 border-neutral-300 focus:border-orange-500"
                />
              </div>

              <div>
                <Label className="text-sm text-neutral-700">
                  Who pays return shipping?
                </Label>
                <Select
                  value={returnCostType}
                  onValueChange={(val) => setReturnCostType(val)}
                >
                  <SelectTrigger className="mt-2 w-full border-neutral-300">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="supplier">You</SelectItem>
                    <SelectItem value="shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {returnCostType === "shared" && (
                <div>
                  <Label className="text-sm text-neutral-700">
                    Your share of return cost (%)
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={sharedPercentage}
                    onChange={(e) => validateShared(Number(e.target.value))}
                    className={`mt-2 border ${
                      sharedError
                        ? "border-red-500 focus:border-red-500"
                        : "border-neutral-300 focus:border-orange-500"
                    }`}
                  />
                </div>
              )}
            </div>
          )}

          {type === "refund" && (
            <div>
              <Label className="text-sm text-neutral-700">
                Refund policy terms
              </Label>
              <Textarea
                placeholder="Explain when and how refunds are processed for eligible orders."
                rows={3}
                className="mt-2 border-neutral-300 focus:border-orange-500"
              />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { successToast, errorToast } from "@/components/ui/use-toast-advanced";
import RulesSection from "@/app/(private)/dashboard/(supplier)/channel/components/rules-section";

interface StoreSettingsModalProps {
  open: boolean;
  close: () => void;
  defaultData?: any;
  onUpdated?: () => void;
}



export default function StoreSettingsModal({
  open,
  close,
  defaultData,
  onUpdated,
}: StoreSettingsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState<any>({});
  const [isRulesValid, setIsRulesValid] = useState(true); // ✅ track validation

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (defaultData) {
      setRules({
        payOnDelivery: defaultData.payOnDelivery ?? false,
        returnPolicy: defaultData.returnPolicy ?? false,
        returnWindow: defaultData.returnWindow,
        returnPolicyTerms: defaultData.returnPolicyTerms,
        refundPolicy: defaultData.refundPolicy ?? false,
        returnShippingFee: defaultData.returnShippingFee ?? "BUYER",
        supplierShare: defaultData.supplierShare,
      });

      
    }
  }, [defaultData]);

  const handleRulesChange = (data: any) => setRules(data);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        payOnDelivery: !!rules.payOnDelivery,
        returnPolicy: !!rules.returnPolicy,
        returnWindow: rules.returnWindow,
        returnPolicyTerms: rules.returnPolicyTerms,
        refundPolicy: !!rules.refundPolicy,
        returnShippingFee: (rules.returnShippingFee || "BUYER").toUpperCase(),
        supplierShare:
          rules.returnShippingFee === "SHARED" ? rules.supplierShare : 0,
        
      };

      const res = await fetch("/api/site/policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to set policy");

      onUpdated?.();
      successToast(
        `${
          defaultData
            ? "Policy updated successfully"
            : "Policy set successfully"
        }`
      );
      close();
    } catch (err) {
      console.error(err);
      errorToast("Something went wrong. Try again");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const isDisabled =
    loading ||
    !isRulesValid || // ✅ block when invalid
    (rules.returnPolicy &&
      (!rules.returnWindow ||
        (rules.returnShippingFee === "SHARED" && !rules.supplierShare)));

  return (
    <AnimatePresence>
    {open ? (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-2xl w-full max-w-lg h-[75vh] md:h-[80vh] flex flex-col shadow-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4 }}
        >
          {/* HEADER */}
          <div className="sticky top-0 z-10 bg-white px-5 py-4 border-b flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-neutral-800">
                {defaultData ? "Update your policy" : "Set your policy"}
              </h2>
              <button
                onClick={close}
                className="p-1 rounded-full hover:bg-neutral-100 transition"
              >
                <X className="h-5 w-5 text-neutral-600" />
              </button>
            </div>
            <p className="text-[10px] text-neutral-500 pl-[2px]">
              Pluggn helps enforce your policies.
            </p>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
            <RulesSection
              onChange={handleRulesChange}
              defaultData={rules}
              onValidationChange={setIsRulesValid}
            />
          </div>

          {/* FOOTER BUTTON */}
          <div className="sticky bottom-0 bg-white px-5 py-4 border-t">
            <Button
              onClick={handleSubmit}
              disabled={isDisabled}
              className={`w-full font-medium text-white ${
                isDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading
                ? defaultData
                  ? "Updating..."
                  : "Setting..."
                : defaultData
                ? "Update policy"
                : "Set policy"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
  )
}

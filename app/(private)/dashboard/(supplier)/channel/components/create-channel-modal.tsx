"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RulesSection from "./rules-section";
import SocialsSection from "./socials-section";
import { useState } from "react";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";

interface CreateChannelModalProps {
  open: boolean;
  close: () => void;
}

export default function CreateChannelModal({
  open,
  close,
}: CreateChannelModalProps) {
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState<any>({});
  const [socials, setSocials] = useState<any>({});

  // Called by RulesSection when user updates values
  const handleRulesChange = (data: any) => {
    setRules(data);
  };

  // Called by SocialsSection when user updates socials
  const handleSocialsChange = (data: any) => {
    setSocials(data);
  };

  const handleCreateChannel = async () => {
    try {
      setLoading(true);

      const payload = {
        payOnDelivery: rules.payOnDelivery ?? true,
        fulfillmentTime: rules.fulfillmentTime?.toUpperCase() ?? "SAME_DAY",
        returnPolicy: !!rules.returnPolicy,
        returnWindow: rules.returnWindow ?? 7,
        returnPolicyTerms:
          rules.returnPolicyTerms ||
          "Item must be unused and in original packaging.",
        refundPolicy: !!rules.refundPolicy,
        returnShippingFee: (rules.returnShippingFee || "BUYER").toUpperCase(),
        supplierShare:
          rules.returnShippingFee === "SHARED" ? rules.supplierShare ?? 50 : 0,
        phone: socials.phone || "",
        whatsapp: socials.whatsapp || "",
        telegram: socials.telegram || "",
        instagram: socials.instagram || "",
      };

      const res = await fetch("/api/channel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create channel");
      }

      // success
      successToast("Channel createds successfully.")
      close();
    } catch (err) {
      console.error(err);
      errorToast("Error creating channel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
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
                  Create your channel
                </h2>
                <button
                  onClick={close}
                  className="p-1 rounded-full hover:bg-neutral-100 transition"
                >
                  <X className="h-5 w-5 text-neutral-600" />
                </button>
              </div>
              <p className="text-[10px] text-neutral-500 pl-[2px]">
                Pluggn helps enforce your rules and policies.
              </p>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              <RulesSection onChange={handleRulesChange} />
              <SocialsSection onChange={handleSocialsChange} />
            </div>

            {/* FOOTER BUTTON */}
            <div className="sticky bottom-0 z-10 bg-white px-5 py-4 border-t">
              <Button
                onClick={handleCreateChannel}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
              >
                {loading ? "Creating..." : "Create Channel"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RulesSection from "./rules-section";
import SocialsSection from "./socials-section";

interface CreateChannelModalProps {
  open: boolean;
  close: () => void;
}

export default function CreateChannelModal({
  open,
  close,
}: CreateChannelModalProps) {
  return (
    // ✅ You need this return!
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-2xl w-full max-w-lg h-[90vh] flex flex-col shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              {/* HEADER */}
              <div className="sticky top-0 z-10 bg-white px-5 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-800">
                  Create your channel
                </h2>
                <button
                  onClick={close}
                  className="p-1 rounded-full hover:bg-neutral-100 transition"
                >
                  <X className="h-5 w-5 text-neutral-600" />
                </button>
              </div>

              {/* SCROLLABLE CONTENT */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                <RulesSection />
                <SocialsSection />
              </div>

              {/* FOOTER BUTTON */}
              <div className="sticky bottom-0 z-10 bg-white px-5 py-4 border-t">
                <Button
                  onClick={() => alert("Channel created!")}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
                >
                  Create Channel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

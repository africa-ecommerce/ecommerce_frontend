// "use client";

// import { Button } from "@/components/ui/button";
// import ChannelHeader from "./channel-header";
// import { ArrowRight } from "lucide-react";
// import { useState } from "react";
// import useSWR from "swr";
// import CreateChannelModal from "./create-channel-modal";

// // SWR fetcher
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function ChannelView() {
//   const [showModal, setShowModal] = useState(false);

//   const { data, error, isLoading, mutate } = useSWR("/api/channel", fetcher);

//   const onOpen = () => setShowModal(true);
//   const onClose = () => setShowModal(false);

//   const channelData = data?.data || null;

//   console.log("channelData", channelData)

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Sticky Header */}
//       <header className="sticky top-0 z-20 bg-white border-b border-neutral-100">
//         <ChannelHeader channelId={channelData?.channelId}/>
//       </header>

//       {/* Centered Content */}
//       <main className="flex-1 flex items-center justify-center px-4">
//         <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700">
//           {isLoading ? (
//             <p className="text-neutral-500 text-sm animate-pulse">Loading channel data...</p>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 leading-snug">
//                   {channelData ? "Update your channel" : "Let's create your channel"}
//                 </h1>
//                 <p className="text-base md:text-lg text-neutral-600">
//                   {channelData
//                     ? "Edit your rules, policies, or contact information."
//                     : "Connect, manage, and grow your supplier community."}
//                 </p>
//               </div>

//               <Button
//                 onClick={onOpen}
//                 size="sm"
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
//               >
//                 {channelData ? "Update Channel" : "Create Channel"}
//                 <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </>
//           )}
//         </div>
//       </main>

//       {/* Modal */}
//       <CreateChannelModal
//         open={showModal}
//         close={onClose}
//         defaultData={channelData}
//         onUpdated={mutate} // revalidate SWR data when channel is updated
//       />
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import ChannelHeader from "./channel-header";
import {
  ArrowRight,
  Instagram,
  Phone,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import CreateChannelModal from "./create-channel-modal";
import { Card } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ChannelView() {
  const [showModal, setShowModal] = useState(false);
  const { data, error, isLoading, mutate } = useSWR("/api/channel", fetcher);

  const channelData = data?.data || null;

  const onOpen = () => setShowModal(true);
  const onClose = () => setShowModal(false);

  // helpers to build social links (handles either raw handles/numbers or full urls)
  const buildInstagramUrl = (handle: string) =>
    handle?.startsWith("http")
      ? handle
      : `https://instagram.com/${handle.replace(/^@/, "")}`;
  const buildTelegramUrl = (handle: string) =>
    handle?.startsWith("http")
      ? handle
      : `https://t.me/${handle.replace(/^@/, "")}`;
  const buildWhatsAppUrl = (value: string) => {
    if (!value) return null;
    // if includes http use as is
    if (value.startsWith("http")) return value;
    // if starts with + or digit, strip non-numeric chars for wa.me
    const digits = value.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : null;
  };

  // Render social items (always included in UI, but only shown if present)
  const SocialRow = ({
    icon,
    label,
    href,
    display,
  }: {
    icon: React.ReactNode;
    label: string;
    href?: string | null;
    display?: string | null;
  }) => {
    if (!display) return null;
    return (
      <div className="flex items-center gap-3">
        <div className="flex-none">{icon}</div>
        <div className="text-sm">
          <div className="text-neutral-600 font-medium">{label}</div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-500 underline block truncate"
            >
              {display}
            </a>
          ) : (
            // clickable phone handled separately below
            <div className="font-semibold text-blue-500 underline">{display}</div>
          )}
        </div>
      </div>
    );
  };

  // Policy badge
  const ActiveBadge = ({ active }: { active: boolean }) => (
    <span
      className={`ml-2 inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full ${
        active
          ? "bg-green-100 text-green-800"
          : "bg-neutral-100 text-neutral-600"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );

  // Commitment fee constant (as requested)
  const COMMITMENT_FEE = 500;

  // Policy render block (deep explanations)
  const PoliciesBlock = () => {
    if (!channelData) return null;

    const {
      payOnDelivery,
      returnPolicy,
      refundPolicy,
      returnPolicyTerms,
      returnWindow,
      returnShippingFee,
      supplierShare,
    } = channelData;

    // Pay on Delivery deep explanation
    const payOnDeliveryExplanation = [
      `Pay on Delivery option allows buyers to choose to pay when the item is handed to them at delivery. 
      This is an optional payment method and does not force all buyers to pay on delivery.`,
      `When Pay on Delivery is configured for this channel, the buyer will still pay certain amounts at checkout immediately:`,
      `• Delivery charge — the cost for the courier to deliver the order.`,
      `• Commitment fee — a non-refundable fee of ₦${COMMITMENT_FEE.toLocaleString()} collected at checkout to secure the buyer's intent. This small fee helps reduce no-shows and covers handling/processing. The buyer may still defer the main item price to pay on delivery if they selected that option.`,
      
    ].join(" ");

    // Return / Refund combinations
    let returnRefundExplanation = "";
    if (returnPolicy && refundPolicy) {
      returnRefundExplanation = [
        `Return & Refund both enabled — buyers are allowed to return items and receive a cash refund (or exchange) provided they satisfy the return terms and return window.`,
        `The return window here is ${returnWindow} day${
          returnWindow > 1 ? "s" : ""
        }. During this period, buyers can initiate returns subject to the specific conditions listed below in "Your return policy terms."`,
        `Returned items that meet the policy can either be refunded to the original payment method or exchanged for another available item (depending on your store settings).`,
      ].join(" ");
    } else if (returnPolicy && !refundPolicy) {
      returnRefundExplanation = [
        `Return enabled but Refund disabled — buyers may return items within the return window but will not receive a cash refund. Instead, returns are processed as exchanges or store credit (depending on your implementation).`,
        `This setup is commonly used when you want to allow exchanges for size/variant issues but prevent cash refunds.`,
      ].join(" ");
    } else if (!returnPolicy) {
      returnRefundExplanation = [
        `Returns are disabled — this channel does not accept returns. All sales are final unless otherwise stated.`,
      ].join(" ");
    }

    // Return shipping fee explanation
    let returnShippingExplanation = "";
    if (returnPolicy) {
      if (returnShippingFee === "BUYER") {
        returnShippingExplanation = `Return shipping paid by buyer — the buyer covers the full cost of sending the item back.`;
      } else if (returnShippingFee === "SUPPLIER") {
        returnShippingExplanation = `Return shipping paid by supplier — you (the supplier) cover the return postage/collection cost.`;
      } else if (returnShippingFee === "SHARED") {
        const pct = Number(supplierShare) || 0;
        returnShippingExplanation = `Return shipping fee is shared — you cover ${pct}% of the return shipping cost and the buyer covers the remainder.`;
      } else {
        returnShippingExplanation = `Return shipping cost responsibility is not set explicitly; check your channel settings.`;
      }
    }

    return (
      <Card className="p-4 border border-neutral-200 bg-white/50 backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-neutral-800">
            Policies & Commitments
          </h2>
        </div>

        <div className="mt-3 space-y-4 text-left">
          <div>
            <div className="flex items-center">
              <div className="text-sm font-medium text-neutral-700">
                Pay on Delivery
              </div>
              <ActiveBadge active={!!payOnDelivery} />
            </div>
            <p className="mt-2 text-sm font-semibold text-neutral-800 leading-relaxed">
              {payOnDeliveryExplanation}
            </p>
          </div>

          <div>
            <div className="flex items-center">
              <div className="text-sm font-medium text-neutral-700">
                Return & Refund
              </div>
              <ActiveBadge active={!!returnPolicy && !!refundPolicy} />
            </div>
            <p className="mt-2 text-sm font-semibold text-neutral-800 leading-relaxed">
              {returnRefundExplanation}
            </p>
          </div>
          {returnPolicy && supplierShare > 0 && (
            <div>
              <div className="flex items-center">
                <div className="text-sm font-medium text-neutral-700">
                  Return shipping responsibility
                </div>
              </div>
              <p className="mt-2 text-sm font-semibold text-neutral-800 leading-relaxed">
                {returnShippingExplanation}
              </p>
            </div>
          )}

          {/* Return policy terms shown in a textarea-style box */}
          {returnPolicy && (
             <div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-neutral-700">
                Your return policy terms
              </div>
              <div className="text-xs text-neutral-500">Shown as entered</div>
            </div>
            <div className="mt-2">
              <div
                className="w-full min-h-[84px] p-3 border rounded-md bg-neutral-50 text-sm font-medium text-neutral-800 whitespace-pre-wrap"
                aria-readonly
              >
                {returnPolicyTerms || "No return policy terms provided."}
              </div>
            </div>
            <div className="mt-2 text-xs text-neutral-500">
              Note: return eligibility depends on the terms above and the return
              window.
            </div>
          </div>
          )}
         
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-neutral-100">
        <ChannelHeader channelId={channelData?.channelId} />
      </header>

      {/* Main content. Add top padding so header won't overlap the title */}
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
        <div className="w-full max-w-md lg:max-w-lg text-center space-y-8 animate-in fade-in duration-700">
          {isLoading ? (
            <p className="text-neutral-500 text-sm animate-pulse">
              Loading channel data...
            </p>
          ) : (
            <>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 leading-snug">
                  {channelData
                    ? ""
                    : "Let's create your channel"}
                </h1>
                <p className="text-base md:text-lg text-neutral-600">
                  {channelData
                    ? "Below is a full, easy-to-read summary of your channel's contacts, socials and active policies. Each section shows whether the option is active and explains how it works."
                    : "Connect, manage, and grow your supplier community."}
                </p>
              </div>

              <Button
                onClick={onOpen}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                {channelData ? "Update Channel" : "Create Channel"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Show detailed info if channelData exists */}
              {channelData && (
                <div className="mt-8 text-left space-y-6">
                  {/* Socials at top */}
                  

                  {/* Policies */}
                  <PoliciesBlock />

                  <Card className="p-4 border border-neutral-200 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold text-neutral-800">
                        Socials
                      </h2>
                      <div className="text-sm text-neutral-500">
                        Contact & join links
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Phone: clickable tel: */}
                      {channelData.phone && (
                        <div className="flex items-center gap-3">
                          <div className="flex-none">
                            <Phone className="w-5 h-5 text-orange-500" />
                          </div>
                          <div className="text-sm">
                            <div className="text-neutral-600 font-medium">
                              Call us at
                            </div>
                            <a
                              href={`tel:${channelData.phone}`}
                              className="font-semibold text-blue-500 underline block"
                            >
                              {channelData.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Instagram */}
                      <SocialRow
                        icon={<Instagram className="w-5 h-5" />}
                        label="Follow us at"
                        href={
                          channelData.instagram
                            ? buildInstagramUrl(channelData.instagram)
                            : null
                        }
                        display={channelData.instagram}
                      />

                      {/* WhatsApp */}
                      <SocialRow
                        icon={<MessageCircle className="w-5 h-5" />}
                        label="Join our WhatsApp community"
                        href={
                          channelData.whatsapp
                            ? buildWhatsAppUrl(channelData.whatsapp)
                            : null
                        }
                        display={channelData.whatsapp}
                      />

                      {/* Telegram */}
                      <SocialRow
                        icon={<Send className="w-5 h-5" />}
                        label="Join our Telegram group"
                        href={
                          channelData.telegram
                            ? buildTelegramUrl(channelData.telegram)
                            : null
                        }
                        display={channelData.telegram}
                      />
                    </div>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modal */}
      <CreateChannelModal
        open={showModal}
        close={onClose}
        defaultData={channelData}
        onUpdated={mutate}
      />
    </div>
  );
}

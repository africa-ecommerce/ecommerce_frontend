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
  Send,
  MessageCircle,
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

  const renderSocials = () => {
    const socials = [];

    if (channelData?.phone)
      socials.push({
        icon: <Phone className="w-5 h-5 text-orange-500" />,
        label: "Call us at",
        value: channelData.phone,
      });

    if (channelData?.instagram)
      socials.push({
        icon: <Instagram className="w-5 h-5 text-pink-500" />,
        label: "Follow us at",
        value: channelData.instagram,
      });

    if (channelData?.whatsapp)
      socials.push({
        icon: <MessageCircle className="w-5 h-5 text-green-500" />,
        label: "Join our WhatsApp community",
        value: channelData.whatsapp,
      });

    if (channelData?.telegram)
      socials.push({
        icon: <Send className="w-5 h-5 text-sky-500" />,
        label: "Join our Telegram group",
        value: channelData.telegram,
      });

    return socials.length ? (
      <Card className="p-4 border border-neutral-200 bg-white/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">Socials</h2>
        <div className="space-y-2">
          {socials.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              {s.icon}
              <p className="text-sm font-medium text-neutral-700">
                {s.label}:{" "}
                <span className="font-semibold text-neutral-900">
                  {s.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </Card>
    ) : null;
  };

  const renderPolicies = () => {
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

    let policyTexts: string[] = [];

    // Pay on delivery explanation
    if (payOnDelivery) {
      policyTexts.push(
        `Pay on Delivery is turned on — buyers can pay only when their order arrives. 
        A commitment fee of ₦500 is charged at checkout and is non-refundable. 
        This covers minor delivery or processing costs and ensures the buyer’s commitment.`
      );
    }

    // Return/Refund explanation
    if (returnPolicy && refundPolicy) {
      policyTexts.push(
        `Return & Refund policy is active — buyers can return or exchange items within ${returnWindow} day${
          returnWindow > 1 ? "s" : ""
        }, as long as they meet your return terms. 
        Returned goods may be refunded in cash or exchanged for another item as specified.`
      );
    } else if (returnPolicy && !refundPolicy) {
      policyTexts.push(
        `Return only policy is active — buyers can exchange returned goods for another item within ${returnWindow} day${
          returnWindow > 1 ? "s" : ""
        }, but no cash refunds will be issued.`
      );
    } else if (!returnPolicy) {
      policyTexts.push(`No returns or refunds — all sales are final.`);
    }

    // Return shipping fee explanation
    if (returnPolicy) {
      if (returnShippingFee === "BUYER")
        policyTexts.push(`Buyers bear the cost of return shipping.`);
      else if (returnShippingFee === "SUPPLIER")
        policyTexts.push(`You cover the return shipping cost.`);
      else if (returnShippingFee === "SHARED")
        policyTexts.push(
          `Return shipping cost is shared — you cover ${supplierShare}% of the shipping fee.`
        );
    }

    // Return policy terms
    if (returnPolicyTerms)
      policyTexts.push(`Return Terms: ${returnPolicyTerms}`);

    return (
      <Card className="p-4 border border-neutral-200 bg-white/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">
          Policies & Commitments
        </h2>
        <div className="space-y-3">
          {policyTexts.map((text, i) => (
            <p
              key={i}
              className="text-sm font-medium text-neutral-700 leading-relaxed"
            >
              {text}
            </p>
          ))}
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

      {/* Center Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 space-y-8">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in duration-700">
          {isLoading ? (
            <p className="text-neutral-500 text-sm animate-pulse">
              Loading channel data...
            </p>
          ) : (
            <>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 leading-snug">
                  {channelData
                    ? "Your Channel Overview"
                    : "Let's create your channel"}
                </h1>
                <p className="text-base md:text-lg text-neutral-600">
                  {channelData
                    ? "Here’s a summary of your channel setup and active policies."
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
                <div className="space-y-6 text-left mt-8">
                  {renderSocials()}
                  {renderPolicies()}
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


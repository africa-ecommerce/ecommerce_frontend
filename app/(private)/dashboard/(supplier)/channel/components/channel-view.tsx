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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChannelHeader from "./channel-header";
import CreateChannelModal from "./create-channel-modal";
import useSWR from "swr";
import {
  ArrowRight,
  Instagram,
  MessageCircle,
  Phone,
  Send,
  Trash2,
} from "lucide-react";
import { successToast, errorToast } from "@/components/ui/use-toast-advanced";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ChannelView() {
  const [showModal, setShowModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // 👈 for delete confirm modal
  const [deleting, setDeleting] = useState(false);
  const { data, isLoading, mutate } = useSWR("/api/channel", fetcher);

  const channelData = data?.data || null;

  const onOpen = () => setShowModal(true);
  const onClose = () => setShowModal(false);

  // 👇 handle confirmed delete
  const handleDeleteConfirmed = async () => {
    try {
      setDeleting(true);
      const res = await fetch("/api/channel", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete channel");
      successToast("Channel deleted successfully");
      await mutate();
      setConfirmOpen(false);
    } catch (err) {
      errorToast("Failed to delete channel");
    } finally {
      setDeleting(false);
    }
  };

  // --- Helper social builders ---
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
    if (value.startsWith("http")) return value;
    const digits = value.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : null;
  };

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
            <div className="font-semibold text-blue-500 underline">
              {display}
            </div>
          )}
        </div>
      </div>
    );
  };

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

  const COMMITMENT_FEE = 500;

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

    // simplified text for brevity
    const payOnDeliveryExplanation = `Buyers can pay when item is delivered. ₦${COMMITMENT_FEE} commitment fee applies.`;

    const returnRefundExplanation = returnPolicy
      ? refundPolicy
        ? `Returns and refunds allowed within ${returnWindow} day${
            returnWindow > 1 ? "s" : ""
          }.`
        : `Only returns allowed (no cash refund).`
      : `Returns disabled. All sales are final.`;

    let returnShippingExplanation = "";
    if (returnPolicy) {
      if (returnShippingFee === "BUYER") {
        returnShippingExplanation = `Buyer covers return shipping cost.`;
      } else if (returnShippingFee === "SUPPLIER") {
        returnShippingExplanation = `Supplier covers return shipping cost.`;
      } else if (returnShippingFee === "SHARED") {
        returnShippingExplanation = `Return shipping shared: you cover ${supplierShare}% of cost.`;
      }
    }

    return (
      <Card className="p-4 border border-neutral-200 bg-white/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">
          Policies & Commitments
        </h2>

        <div className="space-y-3 text-sm text-neutral-700 font-medium">
          <div>
            <div className="flex items-center">
              <div>Pay on Delivery</div>
              <ActiveBadge active={!!payOnDelivery} />
            </div>
            <p className="mt-1 text-neutral-800">{payOnDeliveryExplanation}</p>
          </div>

          <div>
            <div className="flex items-center">
              <div>Return & Refund</div>
              <ActiveBadge active={!!returnPolicy && !!refundPolicy} />
            </div>
            <p className="mt-1 text-neutral-800">{returnRefundExplanation}</p>
          </div>

          {returnShippingExplanation && (
            <p className="text-neutral-800">{returnShippingExplanation}</p>
          )}

          {returnPolicy && (
            <div className="mt-3">
              <div className="text-sm font-semibold text-neutral-700 mb-1">
                Return policy terms
              </div>
              <div className="border rounded-md p-3 bg-neutral-50 whitespace-pre-wrap text-neutral-800">
                {returnPolicyTerms || "No return policy terms provided."}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-neutral-100">
        <ChannelHeader channelId={channelData?.channelId} />
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
        <div className="w-full max-w-md lg:max-w-lg text-center space-y-8">
          {isLoading ? (
            <p className="text-neutral-500 text-sm animate-pulse">
              Loading channel data...
            </p>
          ) : (
            <>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 leading-snug">
                  {channelData ? "" : "Let's create your channel"}
                </h1>
                <p className="text-base md:text-lg text-neutral-600">
                  {channelData
                    ? "Below is a full summary of your channel's contacts, socials, and active policies."
                    : "Connect, manage, and grow your supplier community."}
                </p>
              </div>

              {/* Action Buttons */}
              {channelData ? (
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={onOpen}
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-3  rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  >
                    Update Channel
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    onClick={() => setConfirmOpen(true)}
                    size="sm"
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onOpen}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  Create Channel
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}

              {/* Channel details */}
              {channelData && (
                <div className="mt-8 text-left space-y-6">
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
                      {channelData.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-orange-500" />
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

      {/* Create/Update Modal */}
      <CreateChannelModal
        open={showModal}
        close={onClose}
        defaultData={channelData}
        onUpdated={mutate}
      />

      {/* Confirm Delete Modal */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Channel</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this channel? This action cannot
              be undone and will remove all channel settings permanently.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirmed}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

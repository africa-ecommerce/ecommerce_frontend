"use client";

import { Button } from "@/components/ui/button";
import ChannelHeader from "./channel-header";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import CreateChannelModal from "./create-channel-modal";

// SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ChannelView() {
  const [showModal, setShowModal] = useState(false);

  const { data, error, isLoading, mutate } = useSWR("/api/channel", fetcher);

  const onOpen = () => setShowModal(true);
  const onClose = () => setShowModal(false);

  const channelData = data?.data || null;

  console.log("channelData", channelData)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-neutral-100">
        <ChannelHeader />
      </header>

      {/* Centered Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700">
          {isLoading ? (
            <p className="text-neutral-500 text-sm animate-pulse">Loading channel data...</p>
          ) : (
            <>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 leading-snug">
                  {channelData ? "Update your channel" : "Let's create your channel"}
                </h1>
                <p className="text-base md:text-lg text-neutral-600">
                  {channelData
                    ? "Edit your rules, policies, or contact information."
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
            </>
          )}
        </div>
      </main>

      {/* Modal */}
      <CreateChannelModal
        open={showModal}
        close={onClose}
        defaultData={channelData}
        onUpdated={mutate} // revalidate SWR data when channel is updated
      />
    </div>
  );
}

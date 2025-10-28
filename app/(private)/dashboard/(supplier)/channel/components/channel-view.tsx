"use client";
import { Button } from "@/components/ui/button";
import ChannelHeader from "./channel-header";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import CreateChannelModal from "./create-channel-modal";

export default function ChannelView() {
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  const onCreateChannel = () => setShowCreateChannel(true);
  const onCloseChannel = () => setShowCreateChannel(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-neutral-100">
        <ChannelHeader />
      </header>

      {/* Centered Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 leading-snug">
              Let's create your distribution channel
            </h1>
            <p className="text-base md:text-lg text-neutral-600">
              Connect, manage, and grow your supplier community.
            </p>
          </div>

          <Button
            onClick={onCreateChannel}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            Create Channel
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </main>

      <CreateChannelModal open={showCreateChannel} close={onCloseChannel} />
    </div>
  );
}

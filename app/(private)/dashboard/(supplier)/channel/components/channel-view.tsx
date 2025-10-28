"use client";
import { Button } from "@/components/ui/button";
import ChannelHeader from "./channel-header";
import RulesSection from "./rules-section";
import SocialsSection from "./socials-section";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import CreateChannelModal from "./create-channel-modal";




export default function ChannelView() {
const [showCreateChannel, setShowCreateChannel] = useState(false);

const onCreateChannel = () => {
  setShowCreateChannel(true);
}

const onCloseChannel = () => {
  setShowCreateChannel(false);
}


  return (
    <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ChannelHeader />

      <div className="flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-neutral-800 text-balance">
              Let's create your distribution channel
            </h1>
            <p className="text-lg text-neutral-600 text-pretty">
              Connect, manage, and grow your supplier community.
            </p>
          </div>

          <Button
            onClick={onCreateChannel}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            Create Channel
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <CreateChannelModal open={showCreateChannel} close={onCloseChannel} />
    </div>
  );
}

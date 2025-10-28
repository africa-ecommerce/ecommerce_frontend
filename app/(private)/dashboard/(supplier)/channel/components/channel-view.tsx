"use client";
import ChannelHeader from "./channel-header";
import RulesSection from "./rules-section";
import SocialsSection from "./socials-section";




export default function ChannelView() {
  return (
    <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ChannelHeader />

      <div className="max-w-3xl mx-auto px-4 pt-24 pb-12 space-y-6">
        <RulesSection />
        <SocialsSection />
      </div>
    </div>
  );
}

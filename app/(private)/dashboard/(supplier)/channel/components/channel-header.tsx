"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store } from "lucide-react";

export default function ChannelHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 shadow-sm z-50 animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-orange-500">
          <AvatarImage src="/supplier-logo.jpg" alt="Supplier" />
          <AvatarFallback className="bg-orange-100 text-orange-600">
            <Store className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-neutral-800">
            My Supplier Channel
          </h2>
          <p className="text-xs text-neutral-500">Distribution Channel</p>
        </div>
      </div>
    </header>
  );
}

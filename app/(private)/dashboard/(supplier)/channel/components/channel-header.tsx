"use client";

import { useUser } from "@/app/_components/provider/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json())


export default function ChannelHeader() {
  const {
    userData: { user },
  } = useUser();

    const { data: subscriber } = useSWR("/api/subscribe/supplier", fetcher)
  


  // Format subscriber count for readability (e.g. 1.2K)
  const formatSubscribers = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 shadow-sm z-50 animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-orange-500">
          <AvatarImage src={`${user?.supplier?.avatar}`} alt="Supplier" />
          <AvatarFallback className="bg-orange-100 text-orange-600">
            {user?.supplier?.businessName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h2 className="font-semibold text-neutral-800 capitalize">
            {user?.supplier?.businessName}
          </h2>
          <p className="text-xs text-neutral-500">
            {formatSubscribers(subscriber.data.length)} subscribers
          </p>
        </div>
      </div>
    </header>
  );
}

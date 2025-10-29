"use client";

import { useUser } from "@/app/_components/provider/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link as LinkIcon } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ChannelHeader() {
  const {
    userData: { user },
  } = useUser();

  const { data: subscriber, isLoading } = useSWR(
    "/api/subscribe/supplier",
    fetcher
  );

  // Get subscriber count safely (default to 0)
  const subscriberCount = subscriber?.data?.length ?? 0;

  // Format subscriber count for readability
  const formatSubscribers = (num: number) => {
    if (!num) return "0";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  // Singular/plural label
  const subscriberLabel = subscriberCount === 1 ? "subscriber" : "subscribers";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 shadow-sm z-50 animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: Avatar + info */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar className="h-10 w-10 border-2 border-orange-500">
              <AvatarImage src={user?.supplier?.avatar} alt="Supplier" />
              <AvatarFallback className="bg-orange-100 text-orange-600">
                {user?.supplier?.businessName?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex flex-col">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-24 mb-1 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </>
            ) : (
              <>
                <h2 className="font-bold text-sm text-neutral-800 capitalize">
                  {user?.supplier?.businessName}
                </h2>
                <p className="text-xs text-neutral-500 font-semibold">
                  Channel
                </p>
                <p className="text-[10px] text-neutral-500">
                  {formatSubscribers(subscriberCount)} {subscriberLabel}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right side: Link icon */}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Share channel link"
        >
          <LinkIcon className="h-5 w-5 text-neutral-600" />
        </button>
      </div>
    </header>
  );
}

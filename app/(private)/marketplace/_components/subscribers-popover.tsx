

"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useSWR, { mutate as globalMutate } from "swr"
import { Users, Search, X, UserPlus, UserMinus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type UserType = "SUPPLIER" | "PLUG"

interface PlugOrSupplier {
  id: string
  businessName: string
  avatar?: string | null
}

interface SearchResult {
  supplierId: string
  businessName: string
  isSubscribed: boolean
  avatar?: string | null
}

interface SubscribersPopoverProps {
  userType: UserType
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const capitalizeBusiness = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ")

export function SubscribersPopover({ userType }: SubscribersPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [loadingSubscriptions, setLoadingSubscriptions] = useState<Set<string>>(new Set())
  const searchTimer = useRef<number | null>(null)

  const plugKey = "/api/subscribe/plug"
  const supplierKey = "/api/subscribe/supplier"
  const searchKey = (q: string) => `/api/subscribe/search?businessName=${encodeURIComponent(q)}`

  const { data: plugRaw } = useSWR(userType === "SUPPLIER" ? supplierKey : plugKey, fetcher)
  const { data: mySubscriptionsRaw } = useSWR(userType === "PLUG" ? plugKey : null, fetcher)
  
  // Only search if query length > 1
  const shouldSearch = searchQuery.trim().length > 1
  const { data: searchRaw, error: searchError } = useSWR(
    shouldSearch ? searchKey(searchQuery) : null, 
    fetcher, 
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const plugs: PlugOrSupplier[] = useMemo(
    () =>
      plugRaw?.data?.map((p: any) => ({
        id: String(p.id),
        businessName: String(p.businessName ?? ""),
        avatar: p.avatar ?? null,
      })) ?? [],
    [plugRaw],
  )

  const mySubscriptions: PlugOrSupplier[] = useMemo(
    () =>
      mySubscriptionsRaw?.data?.map((p: any) => ({
        id: String(p.id),
        businessName: String(p.businessName ?? ""),
        avatar: p.avatar ?? null,
      })) ?? [],
    [mySubscriptionsRaw],
  )

  const searchResults: SearchResult[] = useMemo(
    () =>
      searchRaw?.data?.map((r: any) => ({
        supplierId: String(r.supplierId ?? r.id ?? ""),
        businessName: String(r.businessName ?? ""),
        isSubscribed: Boolean(r.isSubscribed),
        avatar: r.avatar ?? null,
      })) ?? [],
    [searchRaw],
  )

  // count is derived instead of passed in
  const subscriberCount = userType === "SUPPLIER" ? plugs.length : mySubscriptions.length
  const displayCount = subscriberCount > 999 ? "999+" : String(subscriberCount)

  const optimisticToggle = useCallback(
    async (supplierId: string, subscribe: boolean) => {
      const url = `/api/subscribe/${encodeURIComponent(supplierId)}`
      const method = subscribe ? "POST" : "DELETE"

      // Add to loading state
      setLoadingSubscriptions(prev => new Set([...prev, supplierId]))

      const sKey = searchKey(searchQuery)
      
      // Update search results optimistically
      if (shouldSearch) {
        globalMutate(
          sKey,
          (current: any) => {
            if (!current?.data) return current
            return {
              ...current,
              data: current.data.map((item: any) =>
                String(item.supplierId ?? item.id) === supplierId ? { ...item, isSubscribed: subscribe } : item,
              ),
            }
          },
          false,
        )
      }

      try {
        const response = await fetch(url, { method })
        if (response.ok) {
          // Revalidate all relevant data after successful request
          if (shouldSearch) globalMutate(sKey)
          if (userType === "PLUG") globalMutate(plugKey)
          globalMutate(supplierKey)
        } else {
          throw new Error('Request failed')
        }
      } catch (err) {
        // Revert optimistic updates on error
        if (shouldSearch) globalMutate(sKey)
        if (userType === "PLUG") globalMutate(plugKey)
        globalMutate(supplierKey)
      } finally {
        // Remove from loading state
        setLoadingSubscriptions(prev => {
          const newSet = new Set(prev)
          newSet.delete(supplierId)
          return newSet
        })
      }
    },
    [userType, searchQuery, shouldSearch],
  )

  useEffect(() => {
    if (searchTimer.current) window.clearTimeout(searchTimer.current)
    searchTimer.current = window.setTimeout(() => {}, 300)
    return () => {
      if (searchTimer.current) window.clearTimeout(searchTimer.current)
    }
  }, [searchQuery])

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  const currentDisplay = userType === "PLUG" ? mySubscriptions : plugs

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 px-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          {subscriberCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-5 min-w-5 px-1 text-xs font-medium bg-primary text-primary-foreground"
            >
              {displayCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

    

<PopoverContent className="w-96 p-0 shadow-lg border-0 bg-popover/95 backdrop-blur-sm" align="end" sideOffset={8}>
  <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-primary/10 flex items-start justify-between">
    <div>
      <h3 className="font-semibold text-sm">
        {userType === "SUPPLIER" ? "Your Subscribers" : "Your Subscriptions"}
      </h3>
      <p className="text-xs text-muted-foreground mt-1">
        {userType === "SUPPLIER"
          ? `${subscriberCount} people following your products`
          : `Following ${subscriberCount} suppliers`}
      </p>
    </div>
    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
      <X className="h-4 w-4" />
    </Button>
  </div>

  {/* Changed from overflow-hidden to overflow-y-auto */}
  <div className="max-h-[560px] overflow-y-auto">
    {/* Current subscriptions/subscribers section */}
    <div className="p-4">
      <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
        {userType === "SUPPLIER" ? "Recent Subscribers" : "Currently Following"}
      </h4>
      {currentDisplay.length > 0 ? (
        // Removed ScrollArea wrapper and using direct div
        <div className="max-h-36 overflow-y-auto">
          <div className="space-y-2">
            {currentDisplay.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg">
                <Avatar className="h-9 w-9">
                  {item.avatar ? <AvatarImage src={item.avatar} /> : <AvatarFallback>{getInitials(item.businessName)}</AvatarFallback>}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-medium text-sm"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {capitalizeBusiness(item.businessName)}
                  </p>
                </div>
                {userType === "PLUG" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => optimisticToggle(item.id, false)}
                    disabled={loadingSubscriptions.has(item.id)}
                  >
                    {loadingSubscriptions.has(item.id) ? (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <UserMinus className="h-3 w-3 mr-1" />
                    )}
                    Unsubscribe
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground py-2">
          No {userType === "SUPPLIER" ? "subscribers yet." : "subscriptions yet."}
        </div>
      )}
    </div>

    {/* Search section - only for PLUG users */}
    {userType === "PLUG" && (
      <>
        <Separator />
        <div className="p-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            Discover Suppliers
          </h4>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
              className="pl-9 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Only show search results section if there's a valid search query */}
          {shouldSearch && (
            <div className="max-h-44 overflow-y-auto">
              {searchError ? (
                <div className="text-xs text-destructive py-2">Search failed</div>
              ) : searchResults.length === 0 ? (
                <div className="text-xs text-muted-foreground py-2">No suppliers found.</div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((supplier) => (
                    <div key={supplier.supplierId} className="flex items-center gap-3 p-2 rounded-lg">
                      <Avatar className="h-9 w-9">
                        {supplier.avatar ? (
                          <AvatarImage src={supplier.avatar} />
                        ) : (
                          <AvatarFallback>{getInitials(supplier.businessName)}</AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-medium text-sm"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {capitalizeBusiness(supplier.businessName)}
                        </p>
                      </div>
                      <Button
                        variant={supplier.isSubscribed ? "outline" : "default"}
                        size="sm"
                        className="h-8 px-2 text-xs font-medium"
                        onClick={() => optimisticToggle(supplier.supplierId, !supplier.isSubscribed)}
                        disabled={loadingSubscriptions.has(supplier.supplierId)}
                      >
                        {loadingSubscriptions.has(supplier.supplierId) ? (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        ) : supplier.isSubscribed ? (
                          <>
                            <UserMinus className="h-3 w-3 mr-1" />
                            Unsubscribe
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-3 w-3 mr-1" />
                            Subscribe
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Show instruction text when search query is too short */}
          {searchQuery.trim().length > 0 && searchQuery.trim().length <= 1 && (
            <div className="text-xs text-muted-foreground py-2">
              Type at least 2 characters to search...
            </div>
          )}
        </div>
      </>
    )}
  </div>
</PopoverContent>


    </Popover>
  )
}
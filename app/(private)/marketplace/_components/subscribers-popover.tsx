// "use client"

// import { useState } from "react"
// import { Users, Search, X, UserPlus, UserMinus } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Separator } from "@/components/ui/separator"
// import { cn } from "@/lib/utils"

// interface Subscriber {
//   id: string
//   name: string
//   profileImage?: string
//   brandLogo?: string
//   userType: "SUPPLIER" | "PLUG"
//   isSubscribed?: boolean
// }

// interface SubscribersPopoverProps {
//   userType: "SUPPLIER" | "PLUG"
//   subscriberCount: number
//   subscriptions?: Subscriber[]
//   onSubscribe?: (userId: string) => void
//   onUnsubscribe?: (userId: string) => void
// }

// // Mock data for demonstration
// const mockSuppliers: Subscriber[] = [
//   {
//     id: "1",
//     name: "TechGear Solutions",
//     brandLogo: "/placeholder.svg?height=40&width=40",
//     userType: "SUPPLIER",
//     isSubscribed: true,
//   },
//   {
//     id: "2",
//     name: "Fashion Forward",
//     brandLogo: "/placeholder.svg?height=40&width=40",
//     userType: "SUPPLIER",
//     isSubscribed: false,
//   },
//   {
//     id: "3",
//     name: "Home Essentials Co",
//     userType: "SUPPLIER",
//     isSubscribed: true,
//   },
//   {
//     id: "4",
//     name: "Sports & Fitness Hub",
//     brandLogo: "/placeholder.svg?height=40&width=40",
//     userType: "SUPPLIER",
//     isSubscribed: false,
//   },
//   {
//     id: "5",
//     name: "Beauty & Wellness",
//     userType: "SUPPLIER",
//     isSubscribed: true,
//   },
// ]

// const mockSubscribers: Subscriber[] = [
//   {
//     id: "1",
//     name: "John Smith",
//     profileImage: "/placeholder.svg?height=40&width=40",
//     userType: "PLUG",
//   },
//   {
//     id: "2",
//     name: "Sarah Johnson",
//     userType: "PLUG",
//   },
//   {
//     id: "3",
//     name: "Mike Chen",
//     profileImage: "/placeholder.svg?height=40&width=40",
//     userType: "PLUG",
//   },
// ]

// export function SubscribersPopover({
//   userType,
//   subscriberCount,
//   subscriptions,
//   onSubscribe,
//   onUnsubscribe,
// }: SubscribersPopoverProps) {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isOpen, setIsOpen] = useState(false)
//   const [suppliers, setSuppliers] = useState(mockSuppliers)

//   const displayCount = subscriberCount > 999 ? "999+" : subscriberCount.toString()

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   const handleSubscriptionToggle = (supplier: Subscriber) => {
//     if (supplier.isSubscribed) {
//       onUnsubscribe?.(supplier.id)
//     } else {
//       onSubscribe?.(supplier.id)
//     }

//     // Update local state for demo
//     setSuppliers((prev) => prev.map((s) => (s.id === supplier.id ? { ...s, isSubscribed: !s.isSubscribed } : s)))
//   }

//   const filteredSuppliers = suppliers.filter((supplier) =>
//     supplier.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const currentSubscriptions = userType === "PLUG" ? suppliers.filter((s) => s.isSubscribed) : mockSubscribers

//   return (
//     <Popover open={isOpen} onOpenChange={setIsOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="ghost" size="sm" className="relative h-9 px-2">
//           <div className="flex items-center gap-2">
//             <div className="relative">
//               <Users className="h-5 w-5 text-muted-foreground" />
//               {subscriberCount > 0 && (
//                 <Badge
//                   variant="secondary"
//                   className="absolute -top-2 -right-2 h-5 min-w-5 px-1 text-xs font-medium bg-primary text-primary-foreground"
//                 >
//                   {displayCount}
//                 </Badge>
//               )}
//             </div>
//           </div>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-0 shadow-lg border-0 bg-popover/95 backdrop-blur-sm" align="end" sideOffset={8}>
//         <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-sm">
//                 {userType === "SUPPLIER" ? "Your Subscribers" : "Your Subscriptions"}
//               </h3>
//               <p className="text-xs text-muted-foreground mt-1">
//                 {userType === "SUPPLIER"
//                   ? `${subscriberCount} people following your products`
//                   : `Following ${subscriberCount} suppliers`}
//               </p>
//             </div>
//             <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         <div className="max-h-96 overflow-hidden">
//           {/* Current Subscriptions/Subscribers */}
//           <div className="p-4">
//             <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
//               {userType === "SUPPLIER" ? "Recent Subscribers" : "Currently Following"}
//             </h4>
//             <ScrollArea className="h-32">
//               <div className="space-y-2">
//                 {currentSubscriptions.slice(0, 3).map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-3 p-2 rounded-lg transition-colors"
//                   >
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage src={item.profileImage || item.brandLogo} />
//                       <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-primary/10">
//                         {getInitials(item.name)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate">{item.name}</p>
                     
//                     </div>
//                     {userType === "PLUG" && (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="h-7 px-2 text-xs bg-transparent"
//                         onClick={() => handleSubscriptionToggle(item)}
//                       >
//                         <UserMinus className="h-3 w-3 mr-1" />
//                         Unsubscribe
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </div>

//           {/* Search and Discovery for Plugs */}
//           {userType === "PLUG" && (
//             <>
//               <Separator />
//               <div className="p-4">
//                 <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
//                   Discover Suppliers
//                 </h4>
//                 <div className="relative mb-3">
//                   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                   <Input
//                     placeholder="Search suppliers..."
//                     className="pl-9 h-8 text-sm"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//                 <ScrollArea className="h-40">
//                   <div className="space-y-2">
//                     {filteredSuppliers.map((supplier) => (
//                       <div
//                         key={supplier.id}
//                         className="flex items-center gap-3 p-2 rounded-lg transition-colors"
//                       >
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage src={supplier.brandLogo || "/placeholder.svg"} />
//                           <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-primary/10">
//                             {getInitials(supplier.name)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-xs md:text-sm font-medium truncate">{supplier.name}</p>
//                         </div>
//                         <Button
//                           variant={supplier.isSubscribed ? "outline" : "default"}
//                           size="sm"
//                           className={cn(
//                             "h-7 px-2 text-xs transition-all",
//                             supplier.isSubscribed
//                               ? "hover:bg-destructive hover:text-destructive-foreground"
//                               : "bg-primary hover:bg-primary/90",
//                           )}
//                           onClick={() => handleSubscriptionToggle(supplier)}
//                         >
//                           {supplier.isSubscribed ? (
//                             <>
//                               <UserMinus className="h-3 w-3 mr-1" />
//                               Unsubscribe
//                             </>
//                           ) : (
//                             <>
//                               <UserPlus className="h-3 w-3 mr-1" />
//                               Subscribe
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </ScrollArea>
//               </div>
//             </>
//           )}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }




"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useSWR, { mutate as globalMutate } from "swr"
import { Users, Search, X, UserPlus, UserMinus } from "lucide-react"
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
  const searchTimer = useRef<number | null>(null)

  const plugKey = "/api/subscribe/plug"
  const supplierKey = "/api/subscribe/supplier"
  const searchKey = (q: string) => `/api/subscribe/search?businessName=${encodeURIComponent(q)}`

  const { data: plugRaw } = useSWR(userType === "SUPPLIER" ? supplierKey : plugKey, fetcher)
  const { data: mySubscriptionsRaw } = useSWR(userType === "PLUG" ? plugKey : null, fetcher)
  const { data: searchRaw, error: searchError } = useSWR(searchKey(searchQuery), fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

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

      const sKey = searchKey(searchQuery)
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

      if (userType === "PLUG") {
        globalMutate(
          plugKey,
          (current: any) => {
            if (!current?.data) return current
            if (subscribe) {
              return {
                ...current,
                data: [...current.data, { id: supplierId, businessName: supplierId, avatar: null }],
              }
            }
            return { ...current, data: current.data.filter((d: any) => String(d.id) !== supplierId) }
          },
          false,
        )
      }

      try {
        await fetch(url, { method })
        globalMutate(sKey)
        if (userType === "PLUG") globalMutate(plugKey)
        globalMutate(supplierKey)
      } catch (err) {
        globalMutate(sKey)
        globalMutate(plugKey)
        globalMutate(supplierKey)
      }
    },
    [userType, searchQuery],
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

        <div className="max-h-[560px] overflow-hidden">
          <div className="p-4">
            <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              {userType === "SUPPLIER" ? "Recent Subscribers" : "Currently Following"}
            </h4>
            <ScrollArea className="h-36">
              <div className="space-y-2">
                {currentDisplay.length ? (
                  currentDisplay.slice(0, 6).map((item) => (
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
                        >
                          <UserMinus className="h-3 w-3 mr-1" />
                          Unsubscribe
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground">
                    No {userType === "SUPPLIER" ? "subscribers yet." : "subscriptions yet."}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {userType === "PLUG" && (
            <>
              <Separator />
              <div className="p-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Discover Suppliers</h4>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search suppliers..."
                    className="pl-9 h-9 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="h-44 overflow-auto space-y-2">
                  {searchError && <div className="text-xs text-destructive">Search failed</div>}
                  {!searchResults.length && !searchError ? (
                    <div className="text-xs text-muted-foreground p-3">No suppliers found.</div>
                  ) : (
                    searchResults.map((supplier) => (
                      <div key={supplier.supplierId} className="flex items-center gap-3 p-2 rounded-lg">
                        <Avatar className="h-9 w-9">
                          {supplier.avatar ? <AvatarImage src={supplier.avatar} /> : <AvatarFallback>{getInitials(supplier.businessName)}</AvatarFallback>}
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
                          className="h-9 px-3 text-sm font-medium"
                          onClick={() => optimisticToggle(supplier.supplierId, !supplier.isSubscribed)}
                        >
                          {supplier.isSubscribed ? (
                            <>
                              <UserMinus className="h-4 w-4 mr-2" />
                              Unsubscribe
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Subscribe
                            </>
                          )}
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

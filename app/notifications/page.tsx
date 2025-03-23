"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, ShoppingBag, Tag, CreditCard, Truck, MessageCircle, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "order",
    title: "Order Delivered",
    message: "Your order #3210 has been delivered successfully.",
    time: "2 hours ago",
    read: false,
    link: "/order/3210",
  },
  {
    id: 2,
    type: "promotion",
    title: "Flash Sale: 30% Off",
    message: "Don't miss our 24-hour flash sale on all traditional clothing!",
    time: "5 hours ago",
    read: true,
    link: "/marketplace?category=Fashion",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Successful",
    message: "Your payment of ₦16,500 for order #3210 was successful.",
    time: "1 day ago",
    read: true,
    link: "/order/3210",
  },
  {
    id: 4,
    type: "shipping",
    title: "Order Shipped",
    message: "Your order #3209 has been shipped via DHL Express.",
    time: "2 days ago",
    read: true,
    link: "/order/3209",
  },
  {
    id: 5,
    type: "message",
    title: "New Message from Seller",
    message: "Adire Textiles: Thank you for your order! Please let us know if you have any questions.",
    time: "3 days ago",
    read: true,
    link: "/messages/adire-textiles",
  },
  {
    id: 6,
    type: "order",
    title: "Order Confirmed",
    message: "Your order #3204 has been confirmed and is being processed.",
    time: "1 week ago",
    read: true,
    link: "/order/3204",
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsList, setNotificationsList] = useState(notifications)

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotificationsList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Clear all notifications
  const clearAll = () => {
    setNotificationsList([])
  }

  // Filter notifications based on active tab
  const filteredNotifications = notificationsList.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-primary" />
      case "promotion":
        return <Tag className="h-5 w-5 text-purple-500" />
      case "payment":
        return <CreditCard className="h-5 w-5 text-green-500" />
      case "shipping":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "message":
        return <MessageCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  // Count unread notifications
  const unreadCount = notificationsList.filter((notification) => !notification.read).length

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <Link href="/profile" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Notifications</h1>
        {unreadCount > 0 && <Badge className="ml-2 bg-primary">{unreadCount}</Badge>}
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && <Badge className="ml-2 bg-primary">{unreadCount}</Badge>}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/notifications/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center justify-between mb-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/notifications/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="order">Orders</TabsTrigger>
            <TabsTrigger value="promotion">Promos</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredNotifications.length === 0 ? (
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === "all"
                      ? "You don't have any notifications yet."
                      : activeTab === "unread"
                        ? "You don't have any unread notifications."
                        : `You don't have any ${activeTab} notifications.`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <Link key={notification.id} href={notification.link} onClick={() => markAsRead(notification.id)}>
                    <Card
                      className={`border-none shadow-sm hover:shadow-md transition-shadow ${!notification.read ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
                    >
                      <CardContent className="p-4 flex">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-4 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { ChevronLeft, Camera, Mail, Phone, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfileSectionProps {
  onBack: () => void
  userType: "PLUG" | "SUPPLIER"
}

export function ProfileSection({ onBack, userType }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Profile Management</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription className="text-sm">Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              {userType === "SUPPLIER" && (
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
              </div>
              )}

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Business Name</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>

                 
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">{userType ==="SUPPLIER" ? "Pickup Location" : "Address"}</Label>
                    <Input id="address" defaultValue="123 Main St, Anytown, USA" />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 py-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Business Name</p>
                      <p>John Doe</p>
                    </div>
                  </div>

                  <Separator />

                  
                 

                  <div className="flex items-center gap-3 py-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3 py-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p>123 Main St, Anytown, USA</p>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Password</CardTitle>
              <CardDescription className="text-sm">Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Button className="w-full">Change Password</Button>
            </CardContent>
          </Card>

         
        </TabsContent>
      </Tabs>
    </div>
  )
}

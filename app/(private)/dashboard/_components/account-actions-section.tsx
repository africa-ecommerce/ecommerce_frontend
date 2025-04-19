"use client"

import { useState } from "react"
import { ChevronLeft, LogOut, AlertTriangle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AccountActionsSectionProps {
  onBack: () => void
}

export function AccountActionsSection({ onBack }: AccountActionsSectionProps) {
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false)

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Account Actions</h1>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sign Out</CardTitle>
            <CardDescription>Sign out from your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You will be signed out from this device. You can sign back in at any time.
            </p>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">For security reasons, we recommend signing out when using shared devices.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Session Management</CardTitle>
            <CardDescription>Manage your active sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Current Device</p>
                  <p className="text-xs text-muted-foreground">iPhone • New York, USA</p>
                </div>
                <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Active</div>
              </div>

              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Chrome on Windows</p>
                  <p className="text-xs text-muted-foreground">New York, USA • Last active: 2 days ago</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Sign Out
                </Button>
              </div>

              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">Safari on MacOS</p>
                  <p className="text-xs text-muted-foreground">Boston, USA • Last active: 5 days ago</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Sign Out
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full text-destructive">
              Sign Out All Other Devices
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Deactivate Account</CardTitle>
            <CardDescription>Temporarily deactivate your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Account Deactivation</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Deactivating your account will temporarily disable your profile and services. You can reactivate at
                    any time by signing in.
                  </p>
                </div>
              </div>
            </div>

            {showDeactivateConfirm ? (
              <div className="space-y-4 animate-fade-in">
                <p className="text-sm font-medium">Please confirm your password to deactivate your account:</p>

                <div className="grid gap-2">
                  <Label htmlFor="deactivatePassword">Password</Label>
                  <Input id="deactivatePassword" type="password" />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowDeactivateConfirm(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Confirm Deactivation
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full text-amber-600"
                onClick={() => setShowDeactivateConfirm(true)}
              >
                Deactivate Account
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader className="pb-2">
            <CardTitle className="text-destructive">Delete Account</CardTitle>
            <CardDescription>Permanently delete your account and data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-800">Warning: This action cannot be undone</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Deleting your account will permanently remove all your data, including profile information,
                    transaction history, and settings. This action cannot be reversed.
                  </p>
                </div>
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-2 py-4">
                  <Label htmlFor="deleteConfirm">Type "DELETE" to confirm</Label>
                  <Input id="deleteConfirm" placeholder="DELETE" />

                  <Label htmlFor="deletePassword" className="mt-2">
                    Enter your password
                  </Label>
                  <Input id="deletePassword" type="password" />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

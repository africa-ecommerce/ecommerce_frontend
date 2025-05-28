"use client"

import { ChevronLeft, Moon, Sun, Lock, Eye, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AppSettingsSectionProps {
  onBack: () => void
}

export function AppSettingsSection({ onBack }: AppSettingsSectionProps) {

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Application Settings</h1>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the application theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 
                   
                  `}
                  onClick={() =>{}}
                >
                  <div className="h-20 w-full bg-white border rounded-md flex items-center justify-center">
                    <Sun className="h-8 w-8 text-amber-500" />
                  </div>
                  <p className="font-medium">Light</p>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 
                   
                `}
                  onClick={() => {}}
                >
                  <div className="h-20 w-full bg-gray-900 border rounded-md flex items-center justify-center">
                    <Moon className="h-8 w-8 text-gray-100" />
                  </div>
                  <p className="font-medium">Dark</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Theme</p>
                  <p className="text-sm text-muted-foreground">Use your device's theme settings</p>
                </div>
                <Switch id="system-theme" />
              </div>

              <Separator />

              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize your display preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compact Mode</p>
                  <p className="text-sm text-muted-foreground">Reduce spacing between elements</p>
                </div>
                <Switch id="compact-mode" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Currency Symbol</p>
                  <p className="text-sm text-muted-foreground">Display currency symbols with amounts</p>
                </div>
                <Switch id="currency-symbol" defaultChecked />
              </div>

              <Separator />

              <div className="grid gap-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <Lock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Activity Status</p>
                    <p className="text-sm text-muted-foreground">Show when you're active</p>
                  </div>
                </div>
                <Switch id="activity-status" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Data Collection</p>
                    <p className="text-sm text-muted-foreground">Allow anonymous usage data collection</p>
                  </div>
                </div>
                <Switch id="data-collection" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Personalized Ads</p>
                    <p className="text-sm text-muted-foreground">Show personalized advertisements</p>
                  </div>
                </div>
                <Switch id="personalized-ads" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Biometric Authentication</p>
                    <p className="text-sm text-muted-foreground">Use fingerprint or face ID</p>
                  </div>
                </div>
                <Switch id="biometric-auth" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage your data and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <Eye className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Balance Visibility</p>
                    <p className="text-sm text-muted-foreground">Show account balance</p>
                  </div>
                </div>
                <Switch id="balance-visibility" defaultChecked />
              </div>

              <Separator />

              <Button variant="outline" className="w-full">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full text-destructive">
                Clear Browsing Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Accessibility Options</CardTitle>
              <CardDescription>Customize accessibility settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Screen Reader Support</p>
                  <p className="text-sm text-muted-foreground">Optimize for screen readers</p>
                </div>
                <Switch id="screen-reader" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reduce Motion</p>
                  <p className="text-sm text-muted-foreground">Minimize animations</p>
                </div>
                <Switch id="reduce-motion" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">High Contrast</p>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch id="high-contrast" />
              </div>

              <Separator />

              <div className="grid gap-2">
                <Label htmlFor="fontSize">Text Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="Select text size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="xlarge">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Device Settings</CardTitle>
              <CardDescription>Manage device-specific settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <Smartphone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Haptic Feedback</p>
                    <p className="text-sm text-muted-foreground">Enable vibration feedback</p>
                  </div>
                </div>
                <Switch id="haptic-feedback" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8" />
                  <div>
                    <p className="font-medium">Sound Effects</p>
                    <p className="text-sm text-muted-foreground">Play sounds for actions</p>
                  </div>
                </div>
                <Switch id="sound-effects" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

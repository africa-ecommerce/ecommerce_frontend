"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] = useState("buyer")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log("Register with:", { fullName, email, phone, password, accountType })
  }

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: "" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    const strengthText = ["Weak", "Fair", "Good", "Strong"]

    return {
      strength,
      text: strengthText[strength - 1] || "",
    }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                A
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">
            Create your AfriConnect account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Join thousands of African businesses and shoppers
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            <Tabs defaultValue="buyer" onValueChange={setAccountType} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buyer">I'm a Buyer</TabsTrigger>
                <TabsTrigger value="seller">I'm a Seller</TabsTrigger>
              </TabsList>
              <TabsContent value="buyer">
                <p className="text-sm text-muted-foreground mt-2">
                  Create an account to shop from thousands of African businesses.
                </p>
              </TabsContent>
              <TabsContent value="seller">
                <p className="text-sm text-muted-foreground mt-2">
                  Create an account to start selling your products online.
                </p>
              </TabsContent>
            </Tabs>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium leading-6">
                  Full Name
                </label>
                <div className="mt-2">
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                  Email Address
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6">
                  Phone Number
                </label>
                <div className="mt-2">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full"
                    placeholder="+234"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Password
                </label>
                <div className="mt-2 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs">Password strength: {passwordStrength.text}</div>
                      <div className="text-xs">{password.length}/8+ chars</div>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.strength === 1
                            ? "bg-red-500 w-1/4"
                            : passwordStrength.strength === 2
                              ? "bg-yellow-500 w-2/4"
                              : passwordStrength.strength === 3
                                ? "bg-green-500 w-3/4"
                                : passwordStrength.strength === 4
                                  ? "bg-green-600 w-full"
                                  : ""
                        }`}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center text-xs">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${/[A-Z]/.test(password) ? "bg-green-500 text-white" : "bg-muted"}`}
                        >
                          {/[A-Z]/.test(password) && <Check className="h-3 w-3" />}
                        </div>
                        <span>Capital letter</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${/[0-9]/.test(password) ? "bg-green-500 text-white" : "bg-muted"}`}
                        >
                          {/[0-9]/.test(password) && <Check className="h-3 w-3" />}
                        </div>
                        <span>Number</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${password.length >= 8 ? "bg-green-500 text-white" : "bg-muted"}`}
                        >
                          {password.length >= 8 && <Check className="h-3 w-3" />}
                        </div>
                        <span>8+ characters</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${/[^A-Za-z0-9]/.test(password) ? "bg-green-500 text-white" : "bg-muted"}`}
                        >
                          {/[^A-Za-z0-9]/.test(password) && <Check className="h-3 w-3" />}
                        </div>
                        <span>Special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:text-primary/90">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:text-primary/90">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <div className="mr-2 h-5 w-5 relative">
                    <Image src="/placeholder.svg?height=20&width=20&text=G" alt="Google" width={20} height={20} />
                  </div>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <div className="mr-2 h-5 w-5 relative">
                    <Image src="/placeholder.svg?height=20&width=20&text=W" alt="WhatsApp" width={20} height={20} />
                  </div>
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:text-primary/90">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


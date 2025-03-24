"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"



 




export default function LoginPage() {


  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login with:", email, password)
  }

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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">Welcome back to AfriConnect</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to continue your shopping experience</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card px-6 py-8 shadow sm:rounded-lg sm:px-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                  Email or Phone Number
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href="/auth/forgot-password" className="font-medium text-primary hover:text-primary/90">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
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
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Sign in
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
              Don't have an account?{" "}
              <Link href="/auth/register" className="font-medium text-primary hover:text-primary/90">
                Sign up
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


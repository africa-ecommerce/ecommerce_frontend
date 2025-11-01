"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, MessageCircle, Send, Instagram } from "lucide-react"

interface SocialLink {
  id: string
  icon: React.ReactNode
  label: string
  placeholder: string
}

const socialLinks: SocialLink[] = [
  {
    id: "phone",
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    placeholder: "+1 (555) 000-0000",
  },
  {
    id: "whatsapp",
    icon: <MessageCircle className="h-5 w-5" />,
    label: "WhatsApp",
    placeholder: "WhatsApp group link",
  },
  {
    id: "telegram",
    icon: <Send className="h-5 w-5" />,
    label: "Telegram",
    placeholder: "Telegram channel link",
  },
  {
    id: "instagram",
    icon: <Instagram className="h-5 w-5" />,
    label: "Instagram",
    placeholder: "@yourbusiness",
  },
]

export default function SocialsSection() {
  const [activeInputs, setActiveInputs] = useState<Set<string>>(new Set())

  const toggleInput = (id: string) => {
    setActiveInputs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
      <h3 className="text-lg font-semibold text-neutral-800">Socials & Contact</h3>

      <Card className="p-4 border border-neutral-200">
        <div className="space-y-3">
          {socialLinks.map((social) => {
            const isActive = activeInputs.has(social.id)

            return (
              <div key={social.id} className="flex items-center gap-3">
                <Button
                  onClick={() => toggleInput(social.id)}
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:text-white shadow-md"
                      : "text-neutral-600 hover:text-orange-500 hover:border-orange-300"
                  }`}
                >
                  {social.icon}
                  <span className="text-sm">{social.label}</span>
                </Button>

                {isActive && (
                  <Input
                    placeholder={social.placeholder}
                    className="flex-1 border-neutral-300 focus:border-orange-500 focus:ring-orange-500 animate-in slide-in-from-left-2 duration-300"
                  />
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </section>
  )
}

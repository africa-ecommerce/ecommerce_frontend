"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, MessageCircle, Send, Instagram } from "lucide-react";

interface SocialLink {
  id: string;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
}

const socialLinks: SocialLink[] = [
  {
    id: "phone",
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    placeholder: "(+234) 123 456 7890",
  },
  {
    id: "whatsapp",
    icon: <MessageCircle className="h-5 w-5" />,
    label: "WhatsApp",
    placeholder: "WhatsApp group or business link",
  },
  {
    id: "telegram",
    icon: <Send className="h-5 w-5" />,
    label: "Telegram",
    placeholder: "Telegram channel or group link",
  },
  {
    id: "instagram",
    icon: <Instagram className="h-5 w-5" />,
    label: "Instagram",
    placeholder: "@yourbusiness",
  },
];

export default function SocialsSection() {
  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
      <h3 className="text-lg font-semibold text-neutral-800">
        Socials & Contact
      </h3>

      <Card className="p-4 border border-neutral-200">
        <div className="space-y-4">
          {socialLinks.map((social) => (
            <div
              key={social.id}
              className="flex items-center gap-3 animate-in slide-in-from-left-2 duration-300"
            >
              <div className="flex items-center gap-2 min-w-[120px] text-neutral-700 font-medium">
                {social.icon}
                <span className="text-sm">{social.label}</span>
              </div>
              <Input
                placeholder={social.placeholder}
                className="flex-1 border-neutral-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

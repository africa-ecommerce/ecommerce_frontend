"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, MessageCircle, Send, Instagram } from "lucide-react";

interface SocialsSectionProps {
  onChange?: (data: any) => void;
  defaultData?: {
    phone?: string;
    whatsapp?: string;
    telegram?: string;
    instagram?: string;
  };
}

export default function SocialsSection({
  onChange,
  defaultData,
}: SocialsSectionProps) {
  const [socials, setSocials] = useState({
    phone: "",
    whatsapp: "",
    telegram: "",
    instagram: "",
  });

  // 🔹 Prepopulate when defaultData is available or changes
  useEffect(() => {
    if (defaultData) {
      setSocials((prev) => ({
        ...prev,
        ...defaultData,
      }));
    }
  }, [defaultData]);

  // 🔹 Notify parent whenever socials change
  useEffect(() => {
    onChange?.(socials);
  }, [socials, onChange]);

  const handleChange = (key: string, value: string) => {
    setSocials((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800">
        Socials & Contact
      </h3>

      <Card className="p-4 border border-neutral-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-neutral-700" />
            <Input
              placeholder="+2348100000000"
              value={socials.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-neutral-700" />
            <Input
              placeholder="wa.me/yourchannel"
              value={socials.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Send className="h-5 w-5 text-neutral-700" />
            <Input
              placeholder="@telegramchannel"
              value={socials.telegram}
              onChange={(e) => handleChange("telegram", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="h-5 w-5 text-neutral-700" />
            <Input
              placeholder="@instagramhandle"
              value={socials.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
            />
          </div>
        </div>
      </Card>
    </section>
  );
}

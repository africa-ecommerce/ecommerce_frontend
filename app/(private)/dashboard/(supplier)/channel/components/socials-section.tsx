"use client";
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
  defaultData = { phone: "", whatsapp: "", telegram: "", instagram: "" },
}: SocialsSectionProps) {
  const handleChange = (key: string, value: string) => {
    onChange?.({ ...defaultData, [key]: value });
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
              value={defaultData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-neutral-700" />
            <Input
              placeholder="https://wa.me/2348100000000"
              value={defaultData.whatsapp || ""}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Send className="h-5 w-5 text-neutral-700" />
            <Input
              placeholder="https://t.me/yourchannel"
              value={defaultData.telegram || ""}
              onChange={(e) => handleChange("telegram", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Instagram className="h-5 w-5 text-neutral-700" />
            <Input
              placeholder="https://instagram.com/yourhandle"
              value={defaultData.instagram || ""}
              onChange={(e) => handleChange("instagram", e.target.value)}
            />
          </div>
        </div>
      </Card>
    </section>
  );
}

"use client";
import ChannelView from "./components/channel-view";
export default function Page() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {" "}
      {/* WhatsApp-style soft doodle background */}{" "}
      <div className="absolute inset-0 opacity-[0.045] pointer-events-none">
        {" "}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {" "}
          <defs>
            {" "}
            <pattern
              id="doodles"
              x="0"
              y="0"
              width="180"
              height="180"
              patternUnits="userSpaceOnUse"
            >
              {" "}
              {/* Chat bubble */}{" "}
              <path
                d="M50 80 Q50 50 80 50 L120 50 Q150 50 150 80 L150 120 Q150 150 120 150 L90 150 L70 170 L70 150 Q50 150 50 120 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              {/* Star */}{" "}
              <path
                d="M250 60 L260 85 L287 89 L268 107 L273 134 L250 121 L227 134 L232 107 L213 89 L240 85 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              {/* Heart */}{" "}
              <path
                d="M340 90 Q340 70 355 70 Q370 70 370 90 Q370 70 385 70 Q400 70 400 90 Q400 120 370 140 Q340 120 340 90 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              {/* Circle with dots */}{" "}
              <circle
                cx="80"
                cy="250"
                r="28"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
              />{" "}
              <circle cx="70" cy="245" r="3" fill="#f79034" />{" "}
              <circle cx="80" cy="250" r="3" fill="#f79034" />{" "}
              <circle cx="90" cy="255" r="3" fill="#f79034" />{" "}
              {/* Lightning bolt */}{" "}
              <path
                d="M230 220 L220 250 L235 250 L225 280 L245 245 L230 245 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              {/* Wavy line */}{" "}
              <path
                d="M320 230 Q330 220 340 230 T360 230 T380 230"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
              />{" "}
              {/* Plus signs */}{" "}
              <path
                d="M60 360 L60 380 M50 370 L70 370"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
              />{" "}
              <path
                d="M280 340 L280 360 M270 350 L290 350"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
              />{" "}

               {/* Triangle */}
              <path
                d="M20 20 L35 40 L5 40 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Paper plane */}
              <path
                d="M110 30 L170 50 L110 70 L120 50 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </pattern>{" "}
          </defs>{" "}
          <rect width="100%" height="100%" fill="url(#doodles)" />{" "}
        </svg>{" "}
      </div>{" "}
      {/* Content */}{" "}
      <div className="relative z-10">
        {" "}
        <ChannelView />{" "}
      </div>{" "}
    </div>
  );
}

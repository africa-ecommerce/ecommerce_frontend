"use client";

import ChannelView from "./components/channel-view";

export default function Page() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* WhatsApp-style doodle background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="doodles"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              {/* Chat bubble */}
              <path
                d="M25 55 Q25 35 45 35 L75 35 Q95 35 95 55 L95 80 Q95 100 75 100 L55 100 L45 110 L45 100 Q25 100 25 80 Z"
                fill="none"
                stroke="rgb(249 115 22)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Star */}
              <path
                d="M20 20 L24 32 L36 33 L27 41 L30 53 L20 46 L10 53 L13 41 L4 33 L16 32 Z"
                fill="none"
                stroke="rgb(249 115 22)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Heart */}
              <path
                d="M75 20 Q75 15 80 15 Q85 15 85 20 Q85 15 90 15 Q95 15 95 20 Q95 30 85 38 Q75 30 75 20 Z"
                fill="none"
                stroke="rgb(249 115 22)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Small Circle */}
              <circle
                cx="30"
                cy="90"
                r="10"
                fill="none"
                stroke="rgb(249 115 22)"
                strokeWidth="2"
              />

              {/* Zigzag */}
              <path
                d="M55 15 L60 20 L65 15 L70 20 L75 15"
                fill="none"
                stroke="rgb(249 115 22)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Plus */}
              <path
                d="M95 85 L95 95 M90 90 L100 90"
                stroke="rgb(249 115 22)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Wave line */}
              <path
                d="M10 70 Q15 65 20 70 T30 70 T40 70"
                fill="none"
                stroke="rgb(249 115 22)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Triangle */}
              <path
                d="M60 60 L70 75 L50 75 Z"
                fill="none"
                stroke="rgb(249 115 22)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#doodles)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ChannelView />
      </div>
    </div>
  );
}

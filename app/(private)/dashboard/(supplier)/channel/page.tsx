"use client";

import ChannelView from "./components/channel-view";

export default function Page() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced WhatsApp-style doodle background */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="doodles"
              x="0"
              y="0"
              width="180"
              height="180"
              patternUnits="userSpaceOnUse"
            >
              {/* 1. Chat bubble */}
              <path
                d="M40 60 Q40 40 60 40 L100 40 Q120 40 120 60 L120 90 Q120 110 100 110 L80 110 L65 125 L65 110 Q40 110 40 90 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 2. Star */}
              <path
                d="M130 40 L136 56 L154 58 L141 70 L145 86 L130 78 L115 86 L119 70 L106 58 L124 56 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 3. Heart */}
              <path
                d="M60 140 Q60 120 75 120 Q85 120 90 130 Q95 120 105 120 Q120 120 120 140 Q120 155 90 175 Q60 155 60 140 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 4. Circle with dots */}
              <circle
                cx="140"
                cy="120"
                r="18"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.6"
              />
              <circle cx="130" cy="115" r="2.5" fill="#f79034" />
              <circle cx="140" cy="120" r="2.5" fill="#f79034" />
              <circle cx="150" cy="125" r="2.5" fill="#f79034" />

              {/* 5. Lightning bolt */}
              <path
                d="M30 150 L24 170 L38 170 L28 190 L45 165 L32 165 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 6. Wavy line */}
              <path
                d="M100 160 Q110 150 120 160 T140 160 T160 160"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* 7. Plus sign */}
              <path
                d="M70 20 L70 34 M63 27 L77 27"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* 8. Smile */}
              <path
                d="M150 160 Q155 170 165 160"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="147" cy="155" r="1.5" fill="#f79034" />
              <circle cx="168" cy="155" r="1.5" fill="#f79034" />

              {/* 9. Triangle */}
              <path
                d="M20 20 L35 40 L5 40 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 10. Paper plane */}
              <path
                d="M110 30 L170 50 L110 70 L120 50 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </pattern>
          </defs>

          {/* Create random rotation pattern layers for variation */}
          <g transform="rotate(0)">
            <rect width="100%" height="100%" fill="url(#doodles)" />
          </g>
          <g transform="rotate(10)">
            <rect
              width="100%"
              height="100%"
              fill="url(#doodles)"
              opacity="0.3"
            />
          </g>
          <g transform="rotate(-10)">
            <rect
              width="100%"
              height="100%"
              fill="url(#doodles)"
              opacity="0.2"
            />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ChannelView />
      </div>
    </div>
  );
}

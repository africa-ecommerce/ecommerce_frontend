"use client";
import ChannelView from "./components/channel-view";
export default function Page() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {" "}
      {/* WhatsApp-style soft doodle background */}{" "}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
        {" "}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {" "}
          <defs>
            {" "}
            <pattern
              id="doodles"
              x="0"
              y="0"
              width="400"
              height="400"
              patternUnits="userSpaceOnUse"
            >
              {/* Chat bubble */}
              <path
                d="M50 80 Q50 50 80 50 L120 50 Q150 50 150 80 L150 120 Q150 150 120 150 L90 150 L70 170 L70 150 Q50 150 50 120 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Star - MOVED */}
              <path
                d="M180 60 L190 85 L217 89 L198 107 L203 134 L180 121 L157 134 L162 107 L143 89 L170 85 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

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

              {/* Circle with dots - MOVED */}
              <circle
                cx="80"
                cy="180"
                r="28"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
              />
              <circle cx="70" cy="175" r="3" fill="#f79034" />
              <circle cx="80" cy="180" r="3" fill="#f79034" />
              <circle cx="90" cy="185" r="3" fill="#f79034" />

              {/* Lightning bolt - MOVED */}
              <path
                d="M200 150 L190 180 L205 180 L195 210 L215 175 L200 175 Z"
                fill="none"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Plus signs - MOVED */}
              <path
                d="M30 200 L30 220 M20 210 L40 210"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M220 30 L220 50 M210 40 L230 40"
                stroke="#f79034"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </pattern>
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

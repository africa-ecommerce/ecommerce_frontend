// "use client";

// import { useEffect, useState } from "react";

// export function DiscoveryLoading() {
//   const [pulsePhase, setPulsePhase] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPulsePhase((prev) => (prev + 1) % 3);
//     }, 800);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="h-screen w-full bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 flex items-center justify-center overflow-hidden">
//       {/* Animated background blobs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-700" />
//       </div>

//       {/* Main loading content */}
//       <div className="relative z-10 flex flex-col items-center gap-8 px-6">
//         {/* Stacked card skeletons with shimmer effect */}
//         <div className="relative w-[340px] h-[480px] md:w-[380px] md:h-[520px]">
//           {/* Back card */}
//           <div
//             className="absolute inset-0 bg-white/40 rounded-3xl shadow-lg transform rotate-[-4deg] scale-95"
//             style={{
//               animation: "float 3s ease-in-out infinite",
//               animationDelay: "0.4s",
//             }}
//           />

//           {/* Middle card */}
//           <div
//             className="absolute inset-0 bg-white/60 rounded-3xl shadow-xl transform rotate-[2deg] scale-[0.97]"
//             style={{
//               animation: "float 3s ease-in-out infinite",
//               animationDelay: "0.2s",
//             }}
//           />

//           {/* Front card with shimmer */}
//           <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
//             {/* Shimmer effect */}
//             <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />

//             {/* Card content skeleton */}
//             <div className="p-6 h-full flex flex-col">
//               {/* Category badge skeleton */}
//               <div className="w-20 h-6 bg-orange-200 rounded-full animate-pulse" />

//               {/* Image skeleton */}
//               <div className="flex-1 my-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl animate-pulse flex items-center justify-center">
//                 {/* Animated shopping bag icon */}
//                 <div className="relative">
//                   <svg
//                     className="w-24 h-24 text-orange-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     style={{
//                       animation: "bounce 2s ease-in-out infinite",
//                     }}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                     />
//                   </svg>
//                   {/* Pulsing dots around icon */}
//                   <div
//                     className={`absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full transition-opacity duration-300 ${
//                       pulsePhase === 0 ? "opacity-100" : "opacity-0"
//                     }`}
//                   />
//                   <div
//                     className={`absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full transition-opacity duration-300 ${
//                       pulsePhase === 1 ? "opacity-100" : "opacity-0"
//                     }`}
//                   />
//                   <div
//                     className={`absolute top-1/2 -right-4 w-3 h-3 bg-orange-400 rounded-full transition-opacity duration-300 ${
//                       pulsePhase === 2 ? "opacity-100" : "opacity-0"
//                     }`}
//                   />
//                 </div>
//               </div>

//               {/* Title skeleton */}
//               <div className="space-y-3">
//                 <div className="w-3/4 h-6 bg-orange-200 rounded-lg animate-pulse" />
//                 <div className="w-1/2 h-6 bg-orange-200 rounded-lg animate-pulse delay-100" />
//               </div>

//               {/* Price skeleton */}
//               <div className="mt-4 flex items-center justify-between">
//                 <div className="w-24 h-8 bg-orange-200 rounded-lg animate-pulse delay-200" />
//                 <div className="w-16 h-6 bg-orange-200 rounded-full animate-pulse delay-300" />
//               </div>
//             </div>
//           </div>

//           {/* Action buttons skeleton */}
//           <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6">
//             <div className="w-14 h-14 bg-white rounded-full shadow-lg animate-pulse" />
//             <div className="w-14 h-14 bg-white rounded-full shadow-lg animate-pulse delay-100" />
//             <div className="w-14 h-14 bg-white rounded-full shadow-lg animate-pulse delay-200" />
//           </div>
//         </div>

//         {/* Loading text */}
//         <div className="mt-24 text-center">
//           <p className="text-white text-lg font-medium animate-pulse">
//             Finding amazing products for you
//             <span className="inline-flex ml-1">
//               <span className="animate-bounce delay-0">.</span>
//               <span className="animate-bounce delay-100">.</span>
//               <span className="animate-bounce delay-200">.</span>
//             </span>
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes shimmer {
//           100% {
//             transform: translateX(100%);
//           }
//         }
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(var(--rotate, 0deg))
//               scale(var(--scale, 1));
//           }
//           50% {
//             transform: translateY(-20px) rotate(var(--rotate, 0deg))
//               scale(var(--scale, 1));
//           }
//         }
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
//         .delay-100 {
//           animation-delay: 0.1s;
//         }
//         .delay-200 {
//           animation-delay: 0.2s;
//         }
//         .delay-300 {
//           animation-delay: 0.3s;
//         }
//         .delay-700 {
//           animation-delay: 0.7s;
//         }
//       `}</style>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";

export function DiscoveryLoading() {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[100vh] w-full bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20vh] left-[20vw] w-[25vmin] h-[25vmin] bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[15vh] right-[15vw] w-[40vmin] h-[40vmin] bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center gap-[5vh] px-6">
        {/* Card stack container */}
        <div className="relative w-[min(85vw,380px)] h-[min(70vh,520px)]">
          {/* Back card */}
          <div
            className="absolute inset-0 bg-white/40 rounded-3xl shadow-lg transform rotate-[-4deg] scale-95"
            style={{
              animation: "float 3s ease-in-out infinite",
              animationDelay: "0.4s",
            }}
          />

          {/* Middle card */}
          <div
            className="absolute inset-0 bg-white/60 rounded-3xl shadow-xl transform rotate-[2deg] scale-[0.97]"
            style={{
              animation: "float 3s ease-in-out infinite",
              animationDelay: "0.2s",
            }}
          />

          {/* Front card */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="p-[3vmin] h-full flex flex-col">
              {/* Category badge */}
              <div className="w-[20%] h-[3vmin] bg-orange-200 rounded-full animate-pulse" />

              {/* Image area */}
              <div className="flex-1 my-[3vmin] bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl animate-pulse flex items-center justify-center">
                <div className="relative">
                  <svg
                    className="w-[20vmin] h-[20vmin] text-orange-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      animation: "bounce 2s ease-in-out infinite",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>

                  {/* Pulsing dots */}
                  <div
                    className={`absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full transition-opacity duration-300 ${
                      pulsePhase === 0 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full transition-opacity duration-300 ${
                      pulsePhase === 1 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute top-1/2 -right-4 w-3 h-3 bg-orange-400 rounded-full transition-opacity duration-300 ${
                      pulsePhase === 2 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-[1vmin]">
                <div className="w-3/4 h-[2vmin] bg-orange-200 rounded-lg animate-pulse" />
                <div className="w-1/2 h-[2vmin] bg-orange-200 rounded-lg animate-pulse delay-100" />
              </div>

              {/* Price section */}
              <div className="mt-[2vmin] flex items-center justify-between">
                <div className="w-[25%] h-[2.5vmin] bg-orange-200 rounded-lg animate-pulse delay-200" />
                <div className="w-[15%] h-[2vmin] bg-orange-200 rounded-full animate-pulse delay-300" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="absolute -bottom-[12vh] left-1/2 -translate-x-1/2 flex items-center gap-[3vmin]">
            <div className="w-[10vmin] h-[10vmin] bg-white rounded-full shadow-lg animate-pulse" />
            <div className="w-[10vmin] h-[10vmin] bg-white rounded-full shadow-lg animate-pulse delay-100" />
            <div className="w-[10vmin] h-[10vmin] bg-white rounded-full shadow-lg animate-pulse delay-200" />
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-[10vh] text-center">
          <p className="text-white text-lg font-medium animate-pulse">
            Finding amazing products for you
            <span className="inline-flex ml-1">
              <span className="animate-bounce delay-0">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}



import Image from "next/image";
import Link from "next/link";

export default function SubdomainErrorPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Background decoration - optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-6 w-20 h-20 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-indigo-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-pink-200/25 rounded-full blur-lg"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-3 py-4 sm:px-4 sm:py-6 lg:py-12 ">
        <div className="w-full max-w-4xl mx-auto">
          {/* Illustration container with controlled sizing for large screens */}
          <div className="w-full max-w-xs mx-auto mb-4 sm:max-w-sm sm:mb-6 md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="relative w-full aspect-square max-h-80 sm:max-h-96 md:max-h-120 lg:max-h-150 xl:max-h-180">
              <Image
                src="/World-rafiki.svg"
                alt="Subdomain Not Found Illustration"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 400px, 440px"
                priority
              />
            </div>
          </div>

          {/* Content section */}
          <div className="text-center space-y-2 sm:space-y-3 px-3 sm:px-2">
            {/* Error code badge */}
            <div className="inline-flex items-center px-2.5 py-1 sm:px-3 rounded-full bg-purple-100 text-purple-700 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              404 Error
            </div>

            {/* Main heading with optimized mobile typography */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              <span className="block mb-1">Oops!</span>
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Subdomain Not Found
              </span>
            </h1>

            {/* Description with better mobile spacing */}
            <div className="max-w-sm mx-auto space-y-2 sm:max-w-lg sm:space-y-3 lg:max-w-2xl">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-1 sm:px-2">
                The subdomain you're trying to access either doesn't exist, has
                been removed, or is temporarily unavailable.
              </p>
            </div>

            {/* Action buttons with improved mobile layout */}
            {/* <div className="flex flex-col gap-3 justify-center items-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-3 sm:px-2 sm:flex-row sm:gap-4">
              <Link
                href="https://pluggn.vercel.app"
                className="w-full max-w-xs sm:w-auto sm:min-w-[180px] inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:transform-none"
              >
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go to Homepage
              </Link>

              <Link
                href="https://pluggn.vercel.app/help"
                className="w-full max-w-xs sm:w-auto sm:min-w-[180px] inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 bg-white text-purple-600 text-sm sm:text-base font-semibold rounded-lg border border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow hover:shadow-md active:bg-purple-50"
              >
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Contact Support
              </Link>
            </div> */}

            {/* Helpful suggestions with mobile-first design */}
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm max-w-xs mx-auto sm:max-w-sm md:max-w-lg">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                What you can try:
              </h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-0.5 flex-shrink-0 text-sm">
                    •
                  </span>
                  <span className="leading-relaxed">
                    Check if you typed the subdomain correctly
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-0.5 flex-shrink-0 text-sm">
                    •
                  </span>
                  <span className="leading-relaxed">
                    Try refreshing the page or clearing your browser cache
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-0.5 flex-shrink-0 text-sm">
                    •
                  </span>
                  <span className="leading-relaxed">
                    Contact the subdomain owner if you believe this is an error
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced footer with mobile optimization */}
      <footer className="relative z-10 py-3 sm:py-4 md:py-6 lg:py-8 px-3 sm:px-4 text-center border-t border-white/20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-sm">
          <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4 sm:flex-row">
            <Link
              href="https://pluggn.vercel.app"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium text-xs sm:text-sm active:text-purple-700"
            >
              Home
            </Link>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <Link
              href="https://pluggn.vercel.app/help"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium text-xs sm:text-sm active:text-purple-700"
            >
              Contact Support
            </Link>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            © {currentYear} Pluggn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
// // // import Link from "next/link";
// // // import { ErrorIllustration } from "./error-illustration";

// // // export default function SubdomainErrorPage() {
// // //   return (
// // //     <div className="min-h-screen flex flex-col">
// // //       <main className="flex-1 flex flex-col items-center justify-center p-4">
// // //         <div className="w-full max-w-3xl">
// // //           <ErrorIllustration />

// // //           <div className="mt-8 text-center">
// // //             <h1 className="text-4xl font-bold text-gray-800">Oops! This subdomain isn't available</h1>
// // //             <p className="mt-2 text-xl text-gray-600">
// // //             The subdomain you're trying to access either doesn't exist, has been removed, or is temporarily unavailable.
// // //             </p>
// // //           </div>

         
// // //         </div>
// // //       </main>

// // //       <footer className="py-6 px-4 text-center text-sm text-gray-500">
// // //         <div className="flex justify-center items-center gap-6 mb-4">
// // //           <Link
// // //             href="https://pluggn.vercel.app"
// // //             className="hover:text-purple-600 transition-colors"
// // //           >
// // //             Home
// // //           </Link>
// // //           <Link
// // //             href="https://pluggn.vercel.app/help"
// // //             className="hover:text-purple-600 transition-colors"
// // //           >
// // //             Contact Support
// // //           </Link>
          
// // //         </div>
// // //         <p>© {new Date().getFullYear()} Pluggn</p>
// // //       </footer>
// // //     </div>
// // //   );
// // // }




// // import Link from "next/link";
// // import { ErrorIllustration } from "./error-illustration";

// // export default function SubdomainErrorPage() {
// //   return (
// //     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
// //       {/* Background decoration */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
// //         <div className="absolute bottom-32 right-16 w-48 h-48 bg-indigo-200/20 rounded-full blur-2xl"></div>
// //         <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200/25 rounded-full blur-lg"></div>
// //       </div>

// //       <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-8 sm:py-12 lg:py-16">
// //         <div className="w-full max-w-4xl mx-auto">
// //           {/* Illustration container with better responsive sizing */}
// //           <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12">
// //             <ErrorIllustration />
// //           </div>

// //           {/* Content section */}
// //           <div className="text-center space-y-4 sm:space-y-6">
// //             {/* Error code badge */}
// //             <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-2">
// //               404 Error
// //             </div>

// //             {/* Main heading with responsive typography */}
// //             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
// //               <span className="block">Oops!</span>
// //               <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
// //                 Subdomain Not Found
// //               </span>
// //             </h1>

// //             {/* Description with better spacing and readability */}
// //             <div className="max-w-2xl mx-auto space-y-3">
// //               <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
// //                 The subdomain you're trying to access either doesn't exist, has been removed, or is temporarily unavailable.
// //               </p>
// //               <p className="text-sm sm:text-base text-gray-500">
// //                 Don't worry though, we're here to help you get back on track!
// //               </p>
// //             </div>

// //             {/* Action buttons */}
// //             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
// //               <Link
// //                 href="https://pluggn.vercel.app"
// //                 className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
// //               >
// //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
// //                 </svg>
// //                 Go to Homepage
// //               </Link>
              
// //               <Link
// //                 href="https://pluggn.vercel.app/help"
// //                 className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg border border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow hover:shadow-md"
// //               >
// //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                 </svg>
// //                 Contact Support
// //               </Link>
// //             </div>

// //             {/* Helpful suggestions */}
// //             <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm max-w-xl mx-auto">
// //               <h3 className="text-lg font-semibold text-gray-800 mb-3">What you can try:</h3>
// //               <ul className="text-sm text-gray-600 space-y-2 text-left">
// //                 <li className="flex items-start">
// //                   <span className="text-purple-500 mr-2 mt-0.5">•</span>
// //                   Check if you typed the subdomain correctly
// //                 </li>
// //                 <li className="flex items-start">
// //                   <span className="text-purple-500 mr-2 mt-0.5">•</span>
// //                   Try refreshing the page or clearing your browser cache
// //                 </li>
// //                 <li className="flex items-start">
// //                   <span className="text-purple-500 mr-2 mt-0.5">•</span>
// //                   Contact the subdomain owner if you believe this is an error
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       </main>

// //       {/* Enhanced footer */}
// //       <footer className="relative z-10 py-6 sm:py-8 px-4 text-center border-t border-white/20 bg-white/40 backdrop-blur-sm">
// //         <div className="max-w-4xl mx-auto">
// //           <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-4">
// //             <Link
// //               href="https://pluggn.vercel.app"
// //               className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
// //             >
// //               Home
// //             </Link>
// //             <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
// //             <Link
// //               href="https://pluggn.vercel.app/help"
// //               className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
// //             >
// //               Contact Support
// //             </Link>
// //             <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
           
// //           </div>
// //           <p className="text-sm text-gray-500">
// //             © {new Date().getFullYear()} Pluggn. All rights reserved.
// //           </p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }



// import Link from "next/link";
// import { ErrorIllustration } from "./error-illustration";

// export default function SubdomainErrorPage() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
//         <div className="absolute bottom-32 right-16 w-48 h-48 bg-indigo-200/20 rounded-full blur-2xl"></div>
//         <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200/25 rounded-full blur-lg"></div>
//       </div>

//       <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-8 sm:py-12 lg:py-16">
//         <div className="w-full max-w-4xl mx-auto">
//           {/* Illustration container with better responsive sizing */}
//           <div className="w-full max-w-3xl mx-auto mb-8 sm:mb-12">
//             <ErrorIllustration />
//           </div>

//           {/* Content section */}
//           <div className="text-center space-y-4 sm:space-y-6">
//             {/* Error code badge */}
//             <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-2">
//               404 Error
//             </div>

//             {/* Main heading with responsive typography */}
//             <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
//               <span className="block">Oops!</span>
//               <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 Subdomain Not Found
//               </span>
//             </h1>

//             {/* Description with better spacing and readability */}
//             <div className="max-w-2xl mx-auto space-y-3">
//               <p className="text-base md:text-lg text-gray-600 leading-relaxed">
//                 The subdomain you're trying to access either doesn't exist, has been removed, or is temporarily unavailable.
//               </p>
//               <p className="text-sm sm:text-base text-gray-500">
//                 Don't worry though, we're here to help you get back on track!
//               </p>
//             </div>

//             {/* Action buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
//               <Link
//                 href="https://pluggn.vercel.app"
//                 className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                 </svg>
//                 Go to Homepage
//               </Link>
              
//               <Link
//                 href="https://pluggn.vercel.app/help"
//                 className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg border border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow hover:shadow-md"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Contact Support
//               </Link>
//             </div>

//             {/* Helpful suggestions */}
//             <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm max-w-xl mx-auto">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">What you can try:</h3>
//               <ul className="text-sm text-gray-600 space-y-2 text-left">
//                 <li className="flex items-start">
//                   <span className="text-purple-500 mr-2 mt-0.5">•</span>
//                   Check if you typed the subdomain correctly
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-purple-500 mr-2 mt-0.5">•</span>
//                   Try refreshing the page or clearing your browser cache
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-purple-500 mr-2 mt-0.5">•</span>
//                   Contact the subdomain owner if you believe this is an error
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Enhanced footer */}
//       <footer className="relative z-10 py-6 sm:py-8 px-4 text-center border-t border-white/20 bg-white/40 backdrop-blur-sm">
//         <div className="max-w-4xl mx-auto text-sm">
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-4">
//             <Link
//               href="https://pluggn.vercel.app"
//               className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
//             >
//               Home
//             </Link>
//             <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
//             <Link
//               href="https://pluggn.vercel.app/help"
//               className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
//             >
//               Contact Support
//             </Link>
//             <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
          
//           </div>
//           <p className="text-xs text-gray-500">
//             © {new Date().getFullYear()} Pluggn. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }




import Link from "next/link";
import { ErrorIllustration } from "./error-illustration";

export default function SubdomainErrorPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-36 h-36 sm:w-48 sm:h-48 bg-indigo-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 sm:w-24 sm:h-24 bg-pink-200/25 rounded-full blur-lg"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-6 sm:py-8 lg:py-12">
        <div className="w-full max-w-4xl mx-auto">
          {/* Illustration container with better responsive sizing and safe margins */}
          <div className="w-full max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4 sm:px-0">
            <ErrorIllustration />
          </div>

          {/* Content section */}
          <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 px-2">
            {/* Error code badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-2">
              404 Error
            </div>

            {/* Main heading with responsive typography */}
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              <span className="block">Oops!</span>
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Subdomain Not Found
              </span>
            </h1>

            {/* Description with better spacing and readability */}
            <div className="max-w-xl lg:max-w-2xl mx-auto space-y-2 sm:space-y-3">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2">
                The subdomain you're trying to access either doesn't exist, has been removed, or is temporarily unavailable.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 px-2">
                Don't worry though, we're here to help you get back on track!
              </p>
            </div>

            {/* Action buttons with better mobile layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8 md:mt-10 px-2">
              <Link
                href="https://pluggn.vercel.app"
                className="w-full sm:w-auto min-w-[180px] inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Homepage
              </Link>
              
              <Link
                href="https://pluggn.vercel.app/help"
                className="w-full sm:w-auto min-w-[180px] inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-purple-600 text-sm sm:text-base font-semibold rounded-lg border border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Contact Support
              </Link>
            </div>

            {/* Helpful suggestions */}
            <div className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm max-w-sm sm:max-w-xl mx-auto">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What you can try:</h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 sm:space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                  <span>Check if you typed the subdomain correctly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                  <span>Try refreshing the page or clearing your browser cache</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                  <span>Contact the subdomain owner if you believe this is an error</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced footer */}
      <footer className="relative z-10 py-4 sm:py-6 md:py-8 px-4 text-center border-t border-white/20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-sm">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-8 mb-3 sm:mb-4">
            <Link
              href="https://pluggn.vercel.app"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
            >
              Home
            </Link>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <Link
              href="https://pluggn.vercel.app/help"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
            >
              Contact Support
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            © {currentYear} Pluggn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
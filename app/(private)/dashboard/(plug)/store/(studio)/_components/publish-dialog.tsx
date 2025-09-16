// "use client";

// import { useState, useEffect, useRef } from "react";
// import useSWR from "swr";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Loader2,
//   CheckCircle,
//   AlertCircle,
//   ExternalLink,
//   Copy,
//   Share2,
//   Globe,
//   XCircle,
// } from "lucide-react";
// import { Alert } from "@/components/ui/alert";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDebounce } from "@/hooks/use-debounce";
// import { truncateText } from "@/lib/utils";

// interface PublishDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: (subdomain: string) => void;
//   isPublishing: boolean;
//   publishResult: any;
//   subdomain: string;
//   onSubdomainChange: (name: string) => void;
//   isEditing: boolean;
// }

// const fetcher = async (url: string) => {
//   const urlObj = new URL(url, window.location.origin);
//   const subdomain = urlObj.searchParams.get("subdomain");

//   const res = await fetch("/api/site/check-subdomain", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify({ subdomain }),
//   });

//   return res.json();
// };

// export default function PublishDialog({
//   isOpen,
//   onClose,
//   onConfirm,
//   isPublishing,
//   publishResult,
//   subdomain,
//   onSubdomainChange,
//   isEditing,
// }: PublishDialogProps) {
//   const [currentView, setCurrentView] = useState("initial");
//   const [publishProgress, setPublishProgress] = useState(0);
//   const [copied, setCopied] = useState(false);
//   const [inputError, setInputError] = useState("");
//   const [isValidFormat, setIsValidFormat] = useState(false);
//   const [isTouched, setIsTouched] = useState(false);
//   const [nameAvailable, setNameAvailable] = useState<boolean | null>(null);

//   const originalSubdomainRef = useRef(subdomain);
//   const initialized = useRef(false);
//   const MIN_SUBDOMAIN_LENGTH = 3;
//   const debouncedSubdomain = useDebounce(subdomain, 500);
//   const skipValidationForOriginal = useRef(isEditing);


//     const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const getDisplayUrl = (url: string) => {
//     return url || `https://${subdomain}.pluggn.store`;
//   };

//   const validateSubdomainFormat = (name: string) => {
//     if (!name.trim()) return { isValid: false, error: "Subdomain is required" };
//     if (name.length < MIN_SUBDOMAIN_LENGTH)
//       return {
//         isValid: false,
//         error: `Subdomain must be at least ${MIN_SUBDOMAIN_LENGTH} characters`,
//       };
//     if (!/^[a-z0-9-]+$/i.test(name))
//       return {
//         isValid: false,
//         error: "Only letters, numbers, and hyphens are allowed",
//       };
//     return { isValid: true };
//   };

//   const isOriginalSubdomain = (name: string) =>
//     isEditing && name.toLowerCase() === originalSubdomainRef.current.toLowerCase();

  
//   // Validation effect
//   useEffect(() => {
//     if (debouncedSubdomain) {
//       const { isValid, error } = validateSubdomainFormat(debouncedSubdomain);
//       setIsValidFormat(isValid);
//       setInputError(error || "");
//       setNameAvailable(isValid ? null : false);
//     } else {
//       setIsValidFormat(false);
//       setInputError("");
//       setNameAvailable(null);
//     }
//   }, [debouncedSubdomain]);

//   // SWR subdomain check
//   const { data, error, isValidating } = useSWR(
//     isOpen &&
//     debouncedSubdomain &&
//       isValidFormat &&
//       !isOriginalSubdomain(debouncedSubdomain)
//       ? `/api/site/check-subdomain?subdomain=${encodeURIComponent(
//           debouncedSubdomain
//         )}`
//       : null,
//     fetcher
//   );


//   // Handle subdomain availability
//   useEffect(() => {
//     if (!debouncedSubdomain) return;

//     if (isOriginalSubdomain(debouncedSubdomain)) {
//       setNameAvailable(true);
//       setInputError("");
//       return;
//     }

//     if (data) {
//       setNameAvailable(data.available);
//       if(!data.available){
//         setInputError("This subdomain is already taken")
//       }
      
//     }

//     if (error) {
//       console.error("Error checking subdomain:", error);
//       setInputError("Couldn't verify subdomain availability");
//       setNameAvailable(false);
//     }
//   }, [data, error, debouncedSubdomain]);

//   // Initialize original subdomain
//   useEffect(() => {
//     if (isOpen && isEditing && !initialized.current) {
//       originalSubdomainRef.current = subdomain;
//       initialized.current = true;
//       if (isOriginalSubdomain(subdomain)) {
//         setNameAvailable(true);
//         setInputError("");
//       }
//     }

//     if (!isOpen) {
//       initialized.current = false;
//       originalSubdomainRef.current = "";
//     }
//   }, [isOpen, isEditing]);


  

//   // View state management
//   useEffect(() => {
//     if (!isOpen) return;

//     if (isPublishing) {
//       setCurrentView("publishing");
//     } else if (publishResult?.success) {
//       setCurrentView("success");
//     } else if (publishResult?.error) {
//       setCurrentView("error");
//     } else {
//       setCurrentView("initial");
//     }
//   }, [isOpen, isPublishing, publishResult]);

//   // Publishing progress
//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (isPublishing) {
//       setPublishProgress(0);
//       interval = setInterval(() => {
//         setPublishProgress((prev) => Math.min(prev + Math.random() * 15, 95));
//       }, 500);
//     }

//     return () => interval && clearInterval(interval);
//   }, [isPublishing]);

//   const handleClose = () => {
//     setCurrentView("initial");
//     onClose();
//   };

//   const handleSubmit = async () => {
//     const { isValid } = validateSubdomainFormat(subdomain);
//     if (!isValid) return;

//     if (isOriginalSubdomain(subdomain)) {
//       onConfirm(subdomain);
//       return;
//     }

//     try {
//       const response = await fetch("/api/site/check-subdomain", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ subdomain }),
//         credentials: "include"
//       });
//       const data = await response.json();


//       if (data.available) {
//         onConfirm(subdomain);
//       } else {
//         setInputError("This subdomain is already taken");
//       }
//     } catch (err) {
//       setInputError("Couldn't verify subdomain availability");
//     }
//   };



//   const handleSubdomainChange = (value: string) => {
//   // Allow typing but immediately validate format
//   onSubdomainChange(value);

//   setIsTouched(true);



//   // Check if this is the original subdomain when in edit mode
//   if (isOriginalSubdomain(value)) {
//     skipValidationForOriginal.current = true;
//     setNameAvailable(true);
   
//     setInputError("");
//     return; // Exit early since we don't need further validation
//   } else {
//     skipValidationForOriginal.current = false;
//   }

//   // Reset availability status while typing
//   setNameAvailable(null);
  
//   // We'll only clear errors if we're not immediately going to set a new one
//   // Validate format as user types, but don't block typing
//   if (value.trim() === "") {
//     setInputError(""); // Clear error for empty input
//   } else {
//     const isValid = /^[a-z0-9-]+$/i.test(value);
//     if (!isValid) {
//       setInputError("Only letters, numbers, and hyphens are allowed");
//     } else if (value.length < MIN_SUBDOMAIN_LENGTH) {
//       setInputError(`Subdomain must be at least ${MIN_SUBDOMAIN_LENGTH} characters`);
//     } else {
//       setInputError(""); // Clear error when input is valid
//     }
//   }
// };

 

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-md md:max-w-lg p-0 overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50">
//         <DialogHeader className="p-4 sm:p-6 pb-2">
//           <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
//             {currentView === "success"
//               ? "Your Site Is Live!"
//               : currentView === "error"
//               ? "Publishing Failed"
//               : isEditing
//               ? "Update Your Website"
//               : "Publish Your Website"}
//           </DialogTitle>
//         </DialogHeader>

//         <div className="p-4 sm:p-6 pt-2">
//           <AnimatePresence mode="wait">
//             {/* Publishing in progress view */}
//             {currentView === "publishing" && (
//               <motion.div
//                 key="publishing"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="space-y-4 sm:space-y-6"
//               >
//                 <div className="text-center py-4 sm:py-6">
//                   <div className="mb-6 sm:mb-8 relative">
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span className="text-lg font-semibold">
//                         {Math.round(publishProgress)}%
//                       </span>
//                     </div>
//                     <svg
//                       className="w-24 h-24 sm:w-32 sm:h-32 mx-auto"
//                       viewBox="0 0 100 100"
//                     >
//                       <circle
//                         cx="50"
//                         cy="50"
//                         r="40"
//                         stroke="#e2e8f0"
//                         strokeWidth="8"
//                         fill="none"
//                       />
//                       <circle
//                         cx="50"
//                         cy="50"
//                         r="40"
//                         stroke="url(#gradient)"
//                         strokeWidth="8"
//                         fill="none"
//                         strokeLinecap="round"
//                         strokeDasharray={`${publishProgress * 2.51} 251`}
//                         transform="rotate(-90 50 50)"
//                       />
//                       <defs>
//                         <linearGradient
//                           id="gradient"
//                           x1="0%"
//                           y1="0%"
//                           x2="100%"
//                           y2="0%"
//                         >
//                           <stop offset="0%" stopColor="#3b82f6" />
//                           <stop offset="100%" stopColor="#8b5cf6" />
//                         </linearGradient>
//                       </defs>
//                     </svg>
//                   </div>
//                   <h3 className="text-lg sm:text-xl font-medium mb-2">
//                     {isEditing
//                       ? "Updating your site..."
//                       : "Publishing your site..."}
//                   </h3>
//                   <p className="text-slate-500 text-sm sm:text-base px-2">
//                     We're {isEditing ? "updating" : "preparing"}{" "}
//                     <span className="font-medium break-all">
//                       https://{subdomain}.pluggn.store
//                     </span>{" "}
//                     {isEditing
//                       ? "with your latest changes."
//                       : "and making it accessible to the world."}
//                   </p>
//                 </div>

//                 <div className="space-y-3 pt-2">
//                   <div className="flex items-center">
//                     <CheckCircle
//                       className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 ${
//                         publishProgress > 30
//                           ? "text-green-500"
//                           : "text-slate-300"
//                       }`}
//                     />
//                     <span
//                       className={`text-xs sm:text-sm ${
//                         publishProgress > 30
//                           ? "text-slate-700"
//                           : "text-slate-400"
//                       }`}
//                     >
//                       {isEditing
//                         ? "Preparing your changes"
//                         : "Registering your domain"}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle
//                       className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 ${
//                         publishProgress > 60
//                           ? "text-green-500"
//                           : "text-slate-300"
//                       }`}
//                     />
//                     <span
//                       className={`text-xs sm:text-sm ${
//                         publishProgress > 60
//                           ? "text-slate-700"
//                           : "text-slate-400"
//                       }`}
//                     >
//                       Optimizing your content
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle
//                       className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 ${
//                         publishProgress > 85
//                           ? "text-green-500"
//                           : "text-slate-300"
//                       }`}
//                     />
//                     <span
//                       className={`text-xs sm:text-sm ${
//                         publishProgress > 85
//                           ? "text-slate-700"
//                           : "text-slate-400"
//                       }`}
//                     >
//                       {isEditing
//                         ? "Deploying your updates"
//                         : "Configuring SSL certificates"}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Success view */}
//             {currentView === "success" && (
//               <motion.div
//                 key="success"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="space-y-4 sm:space-y-6"
//               >
//                 <div className="text-center py-2 sm:py-4">
//                   <div className="inline-flex p-3 sm:p-4 rounded-full bg-green-50 mb-3 sm:mb-4">
//                     <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-500" />
//                   </div>
//                   <h3 className="text-lg sm:text-xl font-medium mb-2">
//                     Website Published Successfully!
//                   </h3>
//                   <p className="text-slate-500 text-sm sm:text-base">
//                     Your website is now live and ready to be shared with the
//                     world.
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-slate-50 p-3 sm:p-4 border border-slate-100">
//                   <div className="flex items-center justify-between mb-2">
//                     <h4 className="font-medium text-slate-700 text-sm sm:text-base">
//                       Your website address
//                     </h4>
//                     <div className="flex gap-1 sm:gap-2 flex-shrink-0">
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         className="h-7 sm:h-8 px-1 sm:px-2"
//                         onClick={() =>
//                           copyToClipboard(getDisplayUrl(publishResult.siteUrl))
//                         }
//                       >
//                         {copied ? (
//                           <span className="text-green-600 text-xs flex items-center">
//                             <CheckCircle className="h-3 w-3 mr-1" /> Copied
//                           </span>
//                         ) : (
//                           <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
//                         )}
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         className="h-7 sm:h-8 px-1 sm:px-2"
//                         onClick={() => {
//                           try {
//                             navigator.share({
//                               title: "Check out my new website!",
//                               url: getDisplayUrl(publishResult.result.siteUrl),
//                             });
//                           } catch (err) {
//                             copyToClipboard(
//                               getDisplayUrl(publishResult.result.siteUrl)
//                             );
//                           }
//                         }}
//                       >
//                         <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 overflow-hidden rounded-md border bg-white p-2">
//                     <div className="bg-slate-100 rounded-full p-1.5 flex-shrink-0">
//                       <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600" />
//                     </div>
//                     <code className="text-xs sm:text-sm font-medium text-slate-700 flex-1 min-w-0 break-all">
//                       {getDisplayUrl(truncateText(publishResult.siteUrl, 10))}
//                     </code>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 flex-wrap">
//                   <Button
//                     className="flex-1 min-w-0 text-xs sm:text-sm h-9 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                     onClick={(e) => {
//                       window.open(
//                         getDisplayUrl(publishResult.siteUrl),
//                         "_blank"
//                       );
//                     }}
//                   >
//                     <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
//                     Visit Site
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="flex-1 min-w-0 text-xs sm:text-sm h-9 sm:h-10"
//                     onClick={handleClose}
//                   >
//                     Back to Editor
//                   </Button>
//                 </div>
//               </motion.div>
//             )}

//             {/* Error view */}
//             {currentView === "error" && (
//               <motion.div
//                 key="error"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="space-y-4 sm:space-y-6"
//               >
//                 <div className="text-center py-2 sm:py-4">
//                   <div className="inline-flex p-3 sm:p-4 rounded-full bg-red-50 mb-3 sm:mb-4">
//                     <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 text-red-500" />
//                   </div>
//                   <h3 className="text-lg sm:text-xl font-medium mb-2">
//                     {isEditing ? "Update Failed" : "Publishing Failed"}
//                   </h3>
//                   <p className="text-slate-500 text-sm sm:text-base">
//                     We encountered an issue while{" "}
//                     {isEditing ? "updating" : "publishing"} your website.
//                   </p>
//                 </div>

//                 <Alert className="bg-red-50 border-red-100 text-red-800">
//                   <p className="text-xs sm:text-sm">
//                     Don't worry! Your work is saved and you can try{" "}
//                     {isEditing ? "updating" : "publishing"} again.
//                   </p>
//                 </Alert>

//                 <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
//                   <Button
//                     onClick={handleSubmit}
//                     className="flex-1 text-xs sm:text-sm h-9 sm:h-10 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
//                   >
//                     Try Again
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="flex-1 text-xs sm:text-sm h-9 sm:h-10"
//                     onClick={handleClose}
//                   >
//                     Back to Editor
//                   </Button>
//                 </div>
//               </motion.div>
//             )}

//             {/* Initial confirmation view */}
//             {currentView === "initial" && (
//               <motion.div
//                 key="initial"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="space-y-4 sm:space-y-6"
//               >
//                 <div className="relative py-6 sm:py-10 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
//                   <div className="relative z-10">
//                     <h3 className="text-lg sm:text-xl font-medium text-center mb-2">
//                       {isEditing ? "Your Site Domain" : "Choose Your Domain"}
//                     </h3>
//                     <p className="text-slate-600 text-center text-xs sm:text-sm max-w-md mx-auto">
//                       {isEditing
//                         ? "You can keep your current domain or choose a new unique name for your site."
//                         : "Select a unique name for your website. This will be your personalized web address where customers can find you."}
//                     </p>
//                   </div>

//                   {/* Abstract background shapes */}
//                   <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-100 rounded-full opacity-60 translate-x-1/2 -translate-y-1/2" />
//                   <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-indigo-100 rounded-full opacity-60 -translate-x-1/3 translate-y-1/3" />
//                 </div>

//                 <div className="space-y-3 sm:space-y-4">
//                   <div>
//                     <label
//                       htmlFor="subdomain"
//                       className="text-xs sm:text-sm font-medium text-slate-700 mb-1 block"
//                     >
//                       {isEditing ? "Your Domain" : "Your Custom Domain"}
//                     </label>

//                     <div className="relative mt-1">
//                       <div className="flex min-w-0">
//                         <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs sm:text-sm flex-shrink-0">
//                           https://
//                         </span>
//                         <div className="relative flex-1 min-w-0">
//                           <input
//                             type="text"
//                             id="subdomain"
//                             className={`flex-1 min-w-0 block w-full px-2 sm:px-3 py-1.5 sm:py-2 border ${
//                               inputError
//                                 ? "border-red-300"
//                                 : nameAvailable === true
//                                 ? "border-green-300"
//                                 : "border-slate-300" 
//                             } ${
//                               inputError
//                                 ? "focus:border-red-500"
//                                 : nameAvailable === true
//                                 ? "focus:border-green-500"
//                                 : "focus:border-blue-500"
//                             } rounded-none text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 ${
//                               inputError
//                                 ? "focus:ring-red-500"
//                                 : nameAvailable === true
//                                 ? "focus:ring-green-500"
//                                 : "focus:ring-blue-500"
//                             } text-xs sm:text-sm`}
//                             placeholder="your-subdomain"
//                             value={subdomain}
//                             onChange={(e) =>
//                               handleSubdomainChange(e.target.value)
//                             }
//                           />
//                           {isValidating && (
//                             <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                               <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
//                             </div>
//                           )}
//                           {!isValidating &&
//                             nameAvailable === true &&
//                             subdomain.trim() !== "" && (
//                               <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                               </div>
//                             )}
//                           {!isValidating &&
//                             nameAvailable === false &&
//                             subdomain.trim() !== "" && (
//                               <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                                 <XCircle className="h-4 w-4 text-red-500" />
//                               </div>
//                             )}
//                         </div>
//                         <span className="inline-flex items-center px-2 sm:px-3 rounded-r-md border border-l-0 border-slate-300 bg-slate-50 text-slate-500 text-xs sm:text-sm flex-shrink-0">
//                           .pluggn.store
//                         </span>
//                       </div>
//                       {inputError && (
//                         <p className="mt-1 text-xs sm:text-sm text-red-600 break-words">
//                           {inputError}
//                         </p>
//                       )}
//                       {!inputError &&
//                       isEditing &&
//                         nameAvailable === true &&
//                         isTouched &&
//                         subdomain.trim() !== "" && (
//                           <p className="mt-1 text-xs sm:text-sm text-green-600 break-words">
//                             { subdomain.toLowerCase() === originalSubdomainRef.current.toLowerCase()
//                               ? "This is your current domain and is available to use."
//                               : "Great! This domain is available."}
//                           </p>
//                         )}
                        
//                         {isEditing && !isTouched && (
//                        <p className="mt-1 text-xs sm:text-sm text-green-600 break-words">
//                         This is your current domain and is available to use.
//                        </p>)
//                         }

//                       {!inputError &&
//                         !isEditing &&
//                         nameAvailable === true &&
//                         subdomain.trim() !== "" && (
//                           <p className="mt-1 text-xs sm:text-sm text-green-600 break-words">
//                             Great! This domain is available.
//                           </p>
//                         )}
//                     </div>
//                     <p className="mt-1.5 text-xs text-slate-500">
//                       {isEditing
//                         ? "You can keep your current domain or choose a new one with letters, numbers, and hyphens"
//                         : "Choose a unique name using only letters, numbers, and hyphens."}
//                     </p>
//                   </div>

//                   <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
//                     <div className="flex items-center">
//                       <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
//                       <p className="text-xs sm:text-sm text-slate-600">
//                         Free SSL certificate for secure browsing
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
//                       <p className="text-xs sm:text-sm text-slate-600">
//                         Optimized for all devices and screen sizes
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
//                       <p className="text-xs sm:text-sm text-slate-600">
//                         Easy sharing on social media
//                       </p>
//                     </div>
//                   </div>
//                 </div>

                

//                 <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
//                   <Button
//                     variant="outline"
//                     className="flex-1 text-xs sm:text-sm h-9 sm:h-10"
//                     onClick={handleClose}
//                   >
//                     {isEditing ? "Cancel" : "Not Now"}
//                   </Button>
//                   <Button
//                     onClick={handleSubmit}
//                     className="flex-1 text-xs sm:text-sm h-9 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                     disabled={
//                       !subdomain.trim() ||
//                       (nameAvailable !== true &&
//                         !isOriginalSubdomain(subdomain)) ||
//                       isValidating ||
//                       !!inputError
//                     }
//                   >
//                     {isValidating ? (
//                       <span className="flex items-center">
//                         <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
//                         Checking...
//                       </span>
//                     ) : isEditing ? (
//                       "Update Site"
//                     ) : (
//                       "Publish Now"
//                     )}
//                   </Button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }















"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  Share2,
  Globe,
} from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { truncateText } from "@/lib/utils";

interface PublishDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // No subdomain parameter needed
  isPublishing: boolean;
  publishResult: any;
  isEditing: boolean;
  // Remove subdomain-related props since we're not taking input
}

export default function PublishDialog({
  isOpen,
  onClose,
  onConfirm,
  isPublishing,
  publishResult,
  isEditing,
}: PublishDialogProps) {
  const [currentView, setCurrentView] = useState("initial");
  const [publishProgress, setPublishProgress] = useState(0);
  const [copied, setCopied] = useState(false);


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getDisplayUrl = (url: string) => {
    return url; // Fallback for display
  };

  // View state management
  useEffect(() => {
    if (!isOpen) return;

    if (isPublishing) {
      setCurrentView("publishing");
    } else if (publishResult?.success) {
      setCurrentView("success");
    } else if (publishResult?.error) {
      setCurrentView("error");
    } else {
      setCurrentView("initial");
    }
  }, [isOpen, isPublishing, publishResult]);

  // Publishing progress
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPublishing) {
      setPublishProgress(0);
      interval = setInterval(() => {
        setPublishProgress((prev) => Math.min(prev + Math.random() * 15, 95));
      }, 500);
    }

    return () => interval && clearInterval(interval);
  }, [isPublishing]);

  const handleClose = () => {
    setCurrentView("initial");
    onClose();
  };

  const handleSubmit = () => {
    onConfirm(); // Simply call onConfirm without subdomain validation
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg p-0 overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50">
        <DialogHeader className="p-4 sm:p-6 pb-2">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            {currentView === "success"
              ? "Your Site Is Live!"
              : currentView === "error"
              ? "Publishing Failed"
              : isEditing
              ? "Update Your Website"
              : "Publish Your Website"}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 sm:p-6 pt-2">
          <AnimatePresence mode="wait">
            {/* Publishing in progress view */}
            {currentView === "publishing" && (
              <motion.div
                key="publishing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="text-center py-4 sm:py-6">
                  <div className="mb-6 sm:mb-8 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold">
                        {Math.round(publishProgress)}%
                      </span>
                    </div>
                    <svg
                      className="w-24 h-24 sm:w-32 sm:h-32 mx-auto"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${publishProgress * 2.51} 251`}
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">
                    {isEditing
                      ? "Updating your site..."
                      : "Publishing your site..."}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base px-2">
                    We're {isEditing ? "updating" : "preparing"} your website
                    {isEditing
                      ? " with your latest changes."
                      : " and making it accessible to the world."}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center">
                    <CheckCircle
                      className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 ${
                        publishProgress > 30
                          ? "text-green-500"
                          : "text-slate-300"
                      }`}
                    />
                    <span
                      className={`text-xs sm:text-sm ${
                        publishProgress > 30
                          ? "text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      {isEditing
                        ? "Preparing your changes"
                        : "Setting up your web address"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle
                      className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 ${
                        publishProgress > 60
                          ? "text-green-500"
                          : "text-slate-300"
                      }`}
                    />
                    <span
                      className={`text-xs sm:text-sm ${
                        publishProgress > 60
                          ? "text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      Optimizing your content
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle
                      className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 ${
                        publishProgress > 85
                          ? "text-green-500"
                          : "text-slate-300"
                      }`}
                    />
                    <span
                      className={`text-xs sm:text-sm ${
                        publishProgress > 85
                          ? "text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      {isEditing
                        ? "Deploying your updates"
                        : "Configuring SSL certificates"}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success view */}
            {currentView === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="text-center py-2 sm:py-4">
                  <div className="inline-flex p-3 sm:p-4 rounded-full bg-green-50 mb-3 sm:mb-4">
                    <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">
                    Website Published Successfully!
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base">
                    Your website is now live and ready to be shared with the
                    world.
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3 sm:p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-700 text-sm sm:text-base">
                      Your website address
                    </h4>
                    <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 sm:h-8 px-1 sm:px-2"
                        onClick={() =>
                          copyToClipboard(getDisplayUrl(publishResult?.result.siteUrl))
                        }
                      >
                        {copied ? (
                          <span className="text-green-600 text-xs flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Copied
                          </span>
                        ) : (
                          <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 sm:h-8 px-1 sm:px-2"
                        onClick={() => {
                          try {
                            navigator.share({
                              title: "Check out my new website!",
                              url: getDisplayUrl(publishResult?.result.siteUrl),
                            });
                          } catch (err) {
                            copyToClipboard(
                              getDisplayUrl(publishResult?.result.siteUrl)
                            );
                          }
                        }}
                      >
                        <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 overflow-hidden rounded-md border bg-white p-2">
                    <div className="bg-slate-100 rounded-full p-1.5 flex-shrink-0">
                      <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600" />
                    </div>
                    <code className="text-xs sm:text-sm font-medium text-slate-700 flex-1 min-w-0 break-all">
                      {getDisplayUrl(publishResult?.result.siteUrl && truncateText(publishResult.result.siteUrl, 10))}
                    </code>
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 flex-wrap">
                  <Button
                    className="flex-1 min-w-0 text-xs sm:text-sm h-9 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={(e) => {
                      window.open(
                        getDisplayUrl(publishResult?.result.siteUrl),
                        "_blank"
                      );
                    }}
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                    Visit Site
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 min-w-0 text-xs sm:text-sm h-9 sm:h-10"
                    onClick={handleClose}
                  >
                    Back to Editor
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Error view */}
            {currentView === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="text-center py-2 sm:py-4">
                  <div className="inline-flex p-3 sm:p-4 rounded-full bg-red-50 mb-3 sm:mb-4">
                    <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 text-red-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">
                    {isEditing ? "Update Failed" : "Publishing Failed"}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base">
                    We encountered an issue while{" "}
                    {isEditing ? "updating" : "publishing"} your website.
                  </p>
                </div>

                <Alert className="bg-red-50 border-red-100 text-red-800">
                  <p className="text-xs sm:text-sm">
                    Don't worry! Your work is saved and you can try{" "}
                    {isEditing ? "updating" : "publishing"} again.
                  </p>
                </Alert>

                <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 text-xs sm:text-sm h-9 sm:h-10 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-xs sm:text-sm h-9 sm:h-10"
                    onClick={handleClose}
                  >
                    Back to Editor
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Initial confirmation view - simplified without input */}
            {currentView === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="relative py-6 sm:py-10 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-medium text-center mb-2">
                      {isEditing ? "Update Your Site" : "Ready to Go Live?"}
                    </h3>
                    <p className="text-slate-600 text-center text-xs sm:text-sm max-w-md mx-auto">
                      {isEditing
                        ? "Your latest changes will be deployed to your live website immediately."
                        : "Your website will be published and made accessible to everyone on the internet."}
                    </p>
                  </div>

                  {/* Abstract background shapes */}
                  <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-100 rounded-full opacity-60 translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-indigo-100 rounded-full opacity-60 -translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-slate-600">
                        {isEditing ? "Instant deployment of your changes" : "Professional web address setup"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-slate-600">
                        Free SSL certificate for secure browsing
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-slate-600">
                        Optimized for all devices and screen sizes
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-slate-600">
                        Easy sharing on social media
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <Button
                    variant="outline"
                    className="flex-1 text-xs sm:text-sm h-9 sm:h-10"
                    onClick={handleClose}
                  >
                    {isEditing ? "Cancel" : "Not Now"}
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 text-xs sm:text-sm h-9 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isEditing ? "Update Site" : "Publish Now"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
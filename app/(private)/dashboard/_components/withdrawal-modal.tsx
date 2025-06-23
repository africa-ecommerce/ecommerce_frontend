


// "use client";

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Search,
//   ArrowLeft,
//   Check,
//   AlertCircle,
//   Loader2,
//   Building2,
//   CreditCard,
//   CheckCircle2,
//   Wallet,
//   Lock,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// interface Bank {
//   id: number;
//   name: string;
//   code: string;
//   slug: string;
//   active: boolean;
// }

// interface AccountDetails {
//   account_name: string;
//   account_number: string;
//   bank_id: number;
// }

// type ModalStep =
//   | "banks"
//   | "account"
//   | "confirm"
//   | "password"
//   | "success"
//   | "error"
//   | "insufficient_funds";

// interface WithdrawalModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   unlockedPayment: number;
// }

// export default function WithdrawalModal({
//   isOpen,
//   onClose,
//   unlockedPayment,
// }: WithdrawalModalProps) {
//   const [currentStep, setCurrentStep] = useState<ModalStep>("banks");
//   const [banks, setBanks] = useState<Bank[]>([]);
//   const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
//   const [accountNumber, setAccountNumber] = useState("");
//   const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
//     null
//   );
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [loadingText, setLoadingText] = useState("");

//   // Check if user has sufficient funds when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       if (unlockedPayment <= 0) {
//         setCurrentStep("insufficient_funds");
//       } else {
//         setCurrentStep("banks");
//         if (banks.length === 0) {
//           fetchBanks();
//         }
//       }
//     }
//   }, [isOpen, unlockedPayment, banks.length]);

//   // Filter banks based on search
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredBanks(banks);
//     } else {
//       const filtered = banks.filter((bank) =>
//         bank.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBanks(filtered);
//     }
//   }, [searchTerm, banks]);

//   const fetchBanks = async () => {
//     setIsLoading(true);
//     setLoadingText("Loading banks...");
//     setError("");

//     try {
//       const response = await fetch("https://api.paystack.co/bank");
//       const data = await response.json();

//       if (data.status && data.data) {
//         const activeBanks = data.data.filter((bank: Bank) => bank.active);
//         setBanks(activeBanks);
//         setFilteredBanks(activeBanks);
//       } else {
//         throw new Error("Failed to fetch banks");
//       }
//     } catch (err) {
//       setError("Failed to load banks. Please try again.");
//       console.error("Error fetching banks:", err);
//     } finally {
//       setIsLoading(false);
//       setLoadingText("");
//     }
//   };

//   const resolveAccount = async () => {
//     if (!selectedBank || !accountNumber.trim()) return;

//     setIsLoading(true);
//     setLoadingText("Verifying account...");
//     setError("");

//     try {
//       const response = await fetch("/api/payment/resolve-account", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           account_number: accountNumber,
//           bank_code: selectedBank.code,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.account_name) {
//         setAccountDetails({
//           account_name: data.account_name,
//           account_number: accountNumber,
//           bank_id: data.bank_id || selectedBank.id,
//         });
//         setCurrentStep("confirm");
//       } else {
//         throw new Error(data.message || "Failed to verify account");
//       }
//     } catch (err: any) {
//       setError(
//         err.message || "Failed to verify account. Please check your details."
//       );
//     } finally {
//       setIsLoading(false);
//       setLoadingText("");
//     }
//   };

//   const processWithdrawal = async () => {
//     if (!accountDetails || !password.trim()) return;

//     setIsLoading(true);
//     setLoadingText("Processing withdrawal...");
//     setError("");

//     try {
//       const response = await fetch("/api/payment/withdraw", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           account_name: accountDetails.account_name,
//           account_number: accountDetails.account_number,
//           bank_id: accountDetails.bank_id,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setCurrentStep("success");
//       } else {
//         throw new Error(data.message || "Withdrawal failed");
//       }
//     } catch (err: any) {
//       setError(err.message || "Withdrawal failed. Please try again.");
//       setCurrentStep("error");
//     } finally {
//       setIsLoading(false);
//       setLoadingText("");
//     }
//   };

//   const resetModal = () => {
//     setCurrentStep(unlockedPayment <= 0 ? "insufficient_funds" : "banks");
//     setSelectedBank(null);
//     setAccountNumber("");
//     setAccountDetails(null);
//     setPassword("");
//     setShowPassword(false);
//     setSearchTerm("");
//     setError("");
//     setIsLoading(false);
//     setLoadingText("");
//   };

//   const handleClose = () => {
//     resetModal();
//     onClose();
//   };

//   const handleBankSelect = (bank: Bank) => {
//     setSelectedBank(bank);
//     setCurrentStep("account");
//   };

//   const handleBack = () => {
//     setError("");
//     if (currentStep === "account") {
//       setCurrentStep("banks");
//       setSelectedBank(null);
//       setAccountNumber("");
//     } else if (currentStep === "confirm") {
//       setCurrentStep("account");
//       setAccountDetails(null);
//     } else if (currentStep === "password") {
//       setCurrentStep("confirm");
//       setPassword("");
//     } else if (currentStep === "error") {
//       setCurrentStep("password");
//     }
//   };

//   const getStepTitle = () => {
//     switch (currentStep) {
//       case "banks":
//         return "Select Your Bank";
//       case "account":
//         return "Enter Account Details";
//       case "confirm":
//         return "Confirm Withdrawal";
//       case "password":
//         return "Enter Password";
//       case "success":
//         return "Withdrawal Successful";
//       case "error":
//         return "Withdrawal Failed";
//       case "insufficient_funds":
//         return "Insufficient Balance";
//       default:
//         return "Withdraw Funds";
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const renderInsufficientFunds = () => (
//     <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4">
//       <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center animate-scale-in">
//         <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
//       </div>

//       <div className="space-y-2">
//         <h3 className="text-base sm:text-lg font-semibold text-orange-700">
//           Insufficient Balance
//         </h3>
//         <p className="text-xs sm:text-sm text-muted-foreground px-2">
//           You don't have enough funds available for withdrawal at the moment.
//         </p>
//       </div>

//       <div className="p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
//         <div className="space-y-2 text-xs sm:text-sm">
//           <div className="flex justify-between gap-2">
//             <span className="text-muted-foreground flex-shrink-0">
//               Available Balance:
//             </span>
//             <span className="font-bold text-orange-700">
//               {formatCurrency(Math.max(0, unlockedPayment))}
//             </span>
//           </div>
//           <div className="text-center pt-2 border-t border-orange-200">
//             <p className="text-xs text-muted-foreground">
//               Please ensure you have sufficient funds before attempting a
//               withdrawal
//             </p>
//           </div>
//         </div>
//       </div>

//       <Button onClick={handleClose} className="w-full h-10 sm:h-11" size="lg">
//         <span className="text-sm">Understood</span>
//       </Button>
//     </div>
//   );

//   const renderBanksList = () => (
//     <div className="space-y-3 sm:space-y-4">
//       <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
//         <div className="flex justify-between items-center text-xs sm:text-sm">
//           <span className="text-muted-foreground">
//             Available for withdrawal:
//           </span>
//           <span className="font-bold text-green-700">
//             {formatCurrency(unlockedPayment)}
//           </span>
//         </div>
//       </div>

//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//         <Input
//           placeholder="Search for your bank..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-10 h-10 sm:h-11"
//         />
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center py-6 sm:py-8">
//           <div className="text-center space-y-3">
//             <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mx-auto text-primary" />
//             <p className="text-xs sm:text-sm text-muted-foreground">
//               {loadingText}
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="max-h-[200px] sm:max-h-[250px] overflow-y-auto space-y-2 no-scrollbar">
//           {filteredBanks.map((bank) => (
//             <button
//               key={bank.id}
//               onClick={() => handleBankSelect(bank)}
//               className="w-full p-3 sm:p-4 text-left border rounded-lg hover:bg-accent hover:border-primary transition-all duration-200 group active:scale-[0.98]"
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
//                   <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-xs sm:text-sm truncate">
//                     {bank.name}
//                   </p>
//                   <p className="text-[10px] sm:text-xs text-muted-foreground">
//                     Code: {bank.code}
//                   </p>
//                 </div>
//               </div>
//             </button>
//           ))}

//           {filteredBanks.length === 0 && !isLoading && (
//             <div className="text-center py-6 sm:py-8">
//               <Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3" />
//               <p className="text-sm sm:text-base text-muted-foreground">
//                 No banks found
//               </p>
//               <p className="text-xs sm:text-sm text-muted-foreground">
//                 Try adjusting your search
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const renderAccountForm = () => (
//     <div className="space-y-4 sm:space-y-6">
//       <div className="p-3 sm:p-4 bg-accent/50 rounded-lg border">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
//             <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
//           </div>
//           <div className="min-w-0 flex-1">
//             <p className="font-medium text-xs sm:text-sm truncate">
//               {selectedBank?.name}
//             </p>
//             <p className="text-[10px] sm:text-xs text-muted-foreground">
//               Code: {selectedBank?.code}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="account-number" className="text-sm">
//           Account Number
//         </Label>
//         <Input
//           id="account-number"
//           placeholder="Enter your account number"
//           value={accountNumber}
//           onChange={(e) =>
//             setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
//           }
//           maxLength={10}
//           className="text-center text-base sm:text-lg tracking-wider h-11 sm:h-12"
//           inputMode="numeric"
//           pattern="[0-9]*"
//         />
//         <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
//           Enter your 10-digit account number
//         </p>
//       </div>

//       <Button
//         onClick={resolveAccount}
//         disabled={accountNumber.length !== 10 || isLoading}
//         className="w-full h-10 sm:h-11"
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             <span className="text-sm">{loadingText}</span>
//           </>
//         ) : (
//           <span className="text-sm">Verify Account</span>
//         )}
//       </Button>
//     </div>
//   );

//   const renderConfirmation = () => (
//     <div className="space-y-4 sm:space-y-6">
//       <div className="p-3 sm:p-4 bg-accent/50 rounded-lg border space-y-3">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
//             <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="font-medium text-xs sm:text-sm">Account Verified</p>
//             <p className="text-[10px] sm:text-xs text-muted-foreground">
//               Ready for withdrawal
//             </p>
//           </div>
//           <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
//         </div>

//         <div className="space-y-2 pt-2 border-t">
//           <div className="flex justify-between text-xs sm:text-sm gap-2">
//             <span className="text-muted-foreground flex-shrink-0">
//               Account Name:
//             </span>
//             <span className="font-medium text-right truncate">
//               {accountDetails?.account_name}
//             </span>
//           </div>
//           <div className="flex justify-between text-xs sm:text-sm gap-2">
//             <span className="text-muted-foreground flex-shrink-0">
//               Account Number:
//             </span>
//             <span className="font-mono">{accountDetails?.account_number}</span>
//           </div>
//           <div className="flex justify-between text-xs sm:text-sm gap-2">
//             <span className="text-muted-foreground flex-shrink-0">Bank:</span>
//             <span className="font-medium text-right truncate">
//               {selectedBank?.name}
//             </span>
//           </div>
//           <div className="flex justify-between text-xs sm:text-sm gap-2 pt-2 border-t font-bold">
//             <span className="text-muted-foreground flex-shrink-0">
//               Withdrawal Amount:
//             </span>
//             <span className="text-green-700">
//               {formatCurrency(unlockedPayment)}
//             </span>
//           </div>
//         </div>
//       </div>

//       <Button
//         onClick={() => setCurrentStep("password")}
//         className="w-full h-11 sm:h-12"
//         size="lg"
//       >
//         <span className="text-sm">Continue to Password</span>
//       </Button>
//     </div>
//   );

//   const renderPasswordForm = () => (
//     <div className="space-y-4 sm:space-y-6">
//       <div className="text-center space-y-2">
//         <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
//           <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
//         </div>
//         <p className="text-xs sm:text-sm text-muted-foreground">
//           Enter your password to authorize this withdrawal
//         </p>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="password" className="text-sm">
//           Password
//         </Label>
//         <div className="relative">
//           <Input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="pr-10 h-11 sm:h-12"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="h-4 w-4" />
//             ) : (
//               <Eye className="h-4 w-4" />
//             )}
//           </button>
//         </div>
//         <p className="text-[10px] sm:text-xs text-muted-foreground">
//           This helps secure your withdrawal request
//         </p>
//       </div>

//       <Button
//         onClick={processWithdrawal}
//         disabled={!password.trim() || isLoading}
//         className="w-full h-11 sm:h-12"
//         size="lg"
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             <span className="text-sm">{loadingText}</span>
//           </>
//         ) : (
//           <span className="text-sm">Confirm Withdrawal</span>
//         )}
//       </Button>
//     </div>
//   );

//   const renderSuccess = () => (
//     <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4">
//       <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
//         <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
//       </div>

//       <div className="space-y-2">
//         <h3 className="text-base sm:text-lg font-semibold text-green-700">
//           Withdrawal Successful!
//         </h3>
//         <p className="text-xs sm:text-sm text-muted-foreground px-2">
//           Your withdrawal request has been processed successfully.
//         </p>
//       </div>

//       <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
//         <div className="space-y-2 text-xs sm:text-sm">
//           <div className="flex justify-between gap-2">
//             <span className="text-muted-foreground flex-shrink-0">
//               Account:
//             </span>
//             <span className="font-medium text-right truncate">
//               {accountDetails?.account_name}
//             </span>
//           </div>
//           <div className="flex justify-between gap-2">
//             <span className="text-muted-foreground flex-shrink-0">Bank:</span>
//             <span className="font-medium text-right truncate">
//               {selectedBank?.name}
//             </span>
//           </div>
//           <div className="flex justify-between gap-2 pt-2 border-t border-green-200 font-bold">
//             <span className="text-muted-foreground flex-shrink-0">Amount:</span>
//             <span className="text-green-700">
//               {formatCurrency(unlockedPayment)}
//             </span>
//           </div>
//         </div>
//       </div>

//       <Button onClick={handleClose} className="w-full h-10 sm:h-11" size="lg">
//         <span className="text-sm">Done</span>
//       </Button>
//     </div>
//   );

//   const renderError = () => (
//     <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4">
//       <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center animate-scale-in">
//         <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
//       </div>

//       <div className="space-y-2">
//         <h3 className="text-base sm:text-lg font-semibold text-red-700">
//           Withdrawal Failed
//         </h3>
//         <p className="text-xs sm:text-sm text-muted-foreground px-2">
//           We couldn't process your withdrawal request.
//         </p>
//       </div>

//       <div className="space-y-3 sm:space-y-4">
//         <Button
//           onClick={handleBack}
//           variant="outline"
//           className="w-full h-10 sm:h-11"
//         >
//           <span className="text-sm">Try Again</span>
//         </Button>
//         <Button onClick={handleClose} className="w-full h-10 sm:h-11">
//           <span className="text-sm">Close</span>
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent
//         className="
//         w-[calc(100vw-2rem)] max-w-[420px] 
//         mx-auto my-0
//         h-auto max-h-[90vh] min-h-[400px]
//         p-0
//         fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
//         flex flex-col
//         overflow-hidden
//         rounded-lg sm:rounded-xl
//         shadow-2xl
//         border
//         bg-background
//       "
//       >
//         <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b flex-shrink-0">
//           <div className="flex items-center space-x-3">
//             {(currentStep === "account" ||
//               currentStep === "confirm" ||
//               currentStep === "password" ||
//               currentStep === "error") && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleBack}
//                 className="p-1 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
//               >
//                 <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
//               </Button>
//             )}
//             <DialogTitle className="text-sm sm:text-lg font-semibold truncate">
//               {getStepTitle()}
//             </DialogTitle>
//           </div>

//           {/* Progress indicator */}
//           {currentStep !== "success" &&
//             currentStep !== "error" &&
//             currentStep !== "insufficient_funds" && (
//               <div className="flex space-x-2 mt-3">
//                 <div
//                   className={`h-1 flex-1 rounded-full transition-colors ${
//                     currentStep === "banks" ? "bg-primary" : "bg-primary/30"
//                   }`}
//                 />
//                 <div
//                   className={`h-1 flex-1 rounded-full transition-colors ${
//                     currentStep === "account" ? "bg-primary" : "bg-primary/30"
//                   }`}
//                 />
//                 <div
//                   className={`h-1 flex-1 rounded-full transition-colors ${
//                     currentStep === "confirm" ? "bg-primary" : "bg-primary/30"
//                   }`}
//                 />
//                 <div
//                   className={`h-1 flex-1 rounded-full transition-colors ${
//                     currentStep === "password" ? "bg-primary" : "bg-primary/30"
//                   }`}
//                 />
//               </div>
//             )}
//         </DialogHeader>

//         <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 min-h-0">
//           {error && (
//             <Alert className="mb-4 animate-slide-up">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription className="text-xs sm:text-sm">
//                 {error}
//               </AlertDescription>
//             </Alert>
//           )}

//           <div className="animate-fade-in">
//             {currentStep === "insufficient_funds" && renderInsufficientFunds()}
//             {currentStep === "banks" && renderBanksList()}
//             {currentStep === "account" && renderAccountForm()}
//             {currentStep === "confirm" && renderConfirmation()}
//             {currentStep === "password" && renderPasswordForm()}
//             {currentStep === "success" && renderSuccess()}
//             {currentStep === "error" && renderError()}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }




















"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  ArrowLeft,
  Check,
  AlertCircle,
  Loader2,
  Building2,
  CreditCard,
  CheckCircle2,
  Wallet,
  Lock,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Bank {
  id: number;
  name: string;
  code: string;
  slug: string;
  active: boolean;
}

interface AccountDetails {
  account_name: string;
  account_number: string;
  bank_id: number;
}

type ModalStep =
  | "banks"
  | "account"
  | "confirm"
  | "code"
  | "success"
  | "error"
  | "insufficient_funds";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedPayment: number;
}

export default function WithdrawalModal({
  isOpen,
  onClose,
  unlockedPayment,
}: WithdrawalModalProps) {
  const [currentStep, setCurrentStep] = useState<ModalStep>("banks");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null
  );
  const [withdrawalCode, setWithdrawalCode] = useState("");
  const [isResendingCode, setIsResendingCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState("");

  // Check if user has sufficient funds when modal opens
  useEffect(() => {
    if (isOpen) {
      if (unlockedPayment <= 0) {
        setCurrentStep("insufficient_funds");
      } else {
        setCurrentStep("banks");
        if (banks.length === 0) {
          fetchBanks();
        }
      }
    }
  }, [isOpen, unlockedPayment, banks.length]);

  // Filter banks based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBanks(banks);
    } else {
      const filtered = banks.filter((bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  }, [searchTerm, banks]);

  const fetchBanks = async () => {
    setIsLoading(true);
    setLoadingText("Loading banks...");
    setError("");

    try {
      const response = await fetch("https://api.paystack.co/bank");
      const data = await response.json();

      if (data.status && data.data) {
        const activeBanks = data.data.filter((bank: Bank) => bank.active);
        setBanks(activeBanks);
        setFilteredBanks(activeBanks);
      } else {
        throw new Error("Failed to fetch banks");
      }
    } catch (err) {
      setError("Failed to load banks. Please try again.");
      console.error("Error fetching banks:", err);
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  const resolveAccount = async () => {
    if (!selectedBank || !accountNumber.trim()) return;

    setIsLoading(true);
    setLoadingText("Verifying account...");
    setError("");

    try {
      const response = await fetch("/api/payments/resolve-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_number: accountNumber,
          bank_code: selectedBank.code,
        }),
      });

      const data = await response.json();
      console.log("resolveData", data)

      if (response.ok && data.accountName) {
        setAccountDetails({
          account_name: data.accountName,
          account_number: accountNumber,
          bank_id: data.bankId || selectedBank.id,
        });
        setCurrentStep("confirm");
      } else {
        throw new Error(data.message || "Unable to resolve account. Please check your details.");
      }
    } catch (err: any) {
      setError(
        err.message 
      );
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };



  const resendWithdrawalCode = async () => {
    setIsResendingCode(true);
    setError("");

    try {
      const response = await fetch("/api/payment/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_name: accountDetails?.account_name,
          account_number: accountDetails?.account_number,
          bank_id: accountDetails?.bank_id,
          resend: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend withdrawal code");
      }
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please try again.");
    } finally {
      setIsResendingCode(false);
    }
  };

  const processWithdrawal = async () => {
    if (
      !accountDetails ||
      !withdrawalCode.trim() ||
      withdrawalCode.length !== 6
    )
      return;

    setIsLoading(true);
    setLoadingText("Processing withdrawal...");
    setError("");

    try {
      const response = await fetch("/api/payments/plug/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_name: accountDetails.account_name,
          account_number: accountDetails.account_number,
          bank_id: accountDetails.bank_id,
         token: withdrawalCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentStep("success");
      } else {
        throw new Error(data.message || "Withdrawal failed");
      }
    } catch (err: any) {
      setError(err.message || "Withdrawal failed. Please try again.");
      setCurrentStep("error");
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  const resetModal = () => {
    setCurrentStep(unlockedPayment <= 0 ? "insufficient_funds" : "banks");
    setSelectedBank(null);
    setAccountNumber("");
    setAccountDetails(null);
    setWithdrawalCode("");
    setSearchTerm("");
    setError("");
    setIsLoading(false);
    setLoadingText("");
    setIsResendingCode(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setCurrentStep("account");
  };

  const handleBack = () => {
    setError("");
    if (currentStep === "account") {
      setCurrentStep("banks");
      setSelectedBank(null);
      setAccountNumber("");
    } else if (currentStep === "confirm") {
      setCurrentStep("account");
      setAccountDetails(null);
    } else if (currentStep === "code") {
      setCurrentStep("confirm");
      setWithdrawalCode("");
    } else if (currentStep === "error") {
      setCurrentStep("code");
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "banks":
        return "Select Your Bank";
      case "account":
        return "Enter Account Details";
      case "confirm":
        return "Confirm Withdrawal";
      case "code":
        return "Enter Withdrawal Code";
      case "success":
        return "Withdrawal Successful";
      case "error":
        return "Withdrawal Failed";
      case "insufficient_funds":
        return "Insufficient Balance";
      default:
        return "Withdraw Funds";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const renderInsufficientFunds = () => (
    <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4">
      <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center animate-scale-in">
        <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-orange-700">
          Insufficient Balance
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          You don't have enough funds available for withdrawal at the moment.
        </p>
      </div>

      <div className="p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">
              Available Balance:
            </span>
            <span className="font-bold text-orange-700">
              {formatCurrency(Math.max(0, unlockedPayment))}
            </span>
          </div>
          <div className="text-center pt-2 border-t border-orange-200">
            <p className="text-xs text-muted-foreground">
              Please ensure you have sufficient funds before attempting a
              withdrawal
            </p>
          </div>
        </div>
      </div>

      <Button onClick={handleClose} className="w-full h-10 sm:h-11" size="lg">
        <span className="text-sm">Understood</span>
      </Button>
    </div>
  );

  const renderBanksList = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-muted-foreground">
            Available for withdrawal:
          </span>
          <span className="font-bold text-green-700">
            {formatCurrency(unlockedPayment)}
          </span>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for your bank..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-10 sm:h-11"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6 sm:py-8">
          <div className="text-center space-y-3">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mx-auto text-primary" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              {loadingText}
            </p>
          </div>
        </div>
      ) : (
        <div className="max-h-[200px] sm:max-h-[250px] overflow-y-auto space-y-2 no-scrollbar">
          {filteredBanks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => handleBankSelect(bank)}
              className="w-full p-3 sm:p-4 text-left border rounded-lg hover:bg-accent hover:border-primary transition-all duration-200 group active:scale-[0.98]"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">
                    {bank.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Code: {bank.code}
                  </p>
                </div>
              </div>
            </button>
          ))}

          {filteredBanks.length === 0 && !isLoading && (
            <div className="text-center py-6 sm:py-8">
              <Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm sm:text-base text-muted-foreground">
                No banks found
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Try adjusting your search
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderAccountForm = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="p-3 sm:p-4 bg-accent/50 rounded-lg border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
            <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-xs sm:text-sm truncate">
              {selectedBank?.name}
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Code: {selectedBank?.code}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-number" className="text-sm">
          Account Number
        </Label>
        <Input
          id="account-number"
          placeholder="Enter your account number"
          value={accountNumber}
          onChange={(e) =>
            setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          maxLength={10}
          className="text-center text-base sm:text-lg tracking-wider h-11 sm:h-12"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
          Enter your 10-digit account number
        </p>
      </div>

      <Button
        onClick={resolveAccount}
        disabled={accountNumber.length !== 10 || isLoading}
        className="w-full h-10 sm:h-11"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="text-sm">{loadingText}</span>
          </>
        ) : (
          <span className="text-sm">Verify Account</span>
        )}
      </Button>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="p-3 sm:p-4 bg-accent/50 rounded-lg border space-y-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
            <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-xs sm:text-sm">Account Verified</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Ready for withdrawal
            </p>
          </div>
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
        </div>

        <div className="space-y-2 pt-2 border-t">
          <div className="flex justify-between text-xs sm:text-sm gap-2">
            <span className="text-muted-foreground flex-shrink-0">
              Account Name:
            </span>
            <span className="font-medium text-right truncate">
              {accountDetails?.account_name}
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm gap-2">
            <span className="text-muted-foreground flex-shrink-0">
              Account Number:
            </span>
            <span className="font-mono">{accountDetails?.account_number}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm gap-2">
            <span className="text-muted-foreground flex-shrink-0">Bank:</span>
            <span className="font-medium text-right truncate">
              {selectedBank?.name}
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm gap-2 pt-2 border-t font-bold">
            <span className="text-muted-foreground flex-shrink-0">
              Withdrawal Amount:
            </span>
            <span className="text-green-700">
              {formatCurrency(unlockedPayment)}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => { setCurrentStep("code")}}
       
        className="w-full h-11 sm:h-12"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="text-sm">{loadingText}</span>
          </>
        ) : (
          <span className="text-sm">Continue</span>
        )}
      </Button>
    </div>
  );

  const renderCodeForm = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          A 6-digit withdrawal code has been sent to your email
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="withdrawal-code" className="text-sm">
          Withdrawal Code
        </Label>
        <Input
          id="withdrawal-code"
          type="text"
          placeholder="000000"
          value={withdrawalCode}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
            setWithdrawalCode(value);
          }}
          maxLength={6}
          className="text-center text-xl sm:text-2xl tracking-[0.5em] h-12 sm:h-14 font-mono"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <Button
          onClick={processWithdrawal}
          disabled={withdrawalCode.length !== 6 || isLoading}
          className="w-full h-11 sm:h-12"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="text-sm">{loadingText}</span>
            </>
          ) : (
            <span className="text-sm">Confirm Withdrawal</span>
          )}
        </Button>

        <Button
          onClick={resendWithdrawalCode}
          disabled={isResendingCode}
          variant="outline"
          className="w-full h-10 sm:h-11"
        >
          {isResendingCode ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              <span className="text-xs">Resending...</span>
            </>
          ) : (
            <span className="text-xs">Didn't receive code? Resend</span>
          )}
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4">
      <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
        <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-green-700">
          Withdrawal Successful!
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          Your withdrawal request has been processed successfully.
        </p>
      </div>

      <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">
              Account:
            </span>
            <span className="font-medium text-right truncate">
              {accountDetails?.account_name}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground flex-shrink-0">Bank:</span>
            <span className="font-medium text-right truncate">
              {selectedBank?.name}
            </span>
          </div>
          <div className="flex justify-between gap-2 pt-2 border-t border-green-200 font-bold">
            <span className="text-muted-foreground flex-shrink-0">Amount:</span>
            <span className="text-green-700">
              {formatCurrency(unlockedPayment)}
            </span>
          </div>
        </div>
      </div>

      <Button onClick={handleClose} className="w-full h-10 sm:h-11" size="lg">
        <span className="text-sm">Done</span>
      </Button>
    </div>
  );

  const renderError = () => (
    <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4">
      <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center animate-scale-in">
        <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-red-700">
          Withdrawal Failed
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          We couldn't process your withdrawal request.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <Button
          onClick={handleBack}
          variant="outline"
          className="w-full h-10 sm:h-11"
        >
          <span className="text-sm">Try Again</span>
        </Button>
        <Button onClick={handleClose} className="w-full h-10 sm:h-11">
          <span className="text-sm">Close</span>
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="
        w-[calc(100vw-2rem)] max-w-[420px] 
        mx-auto my-0
        h-auto max-h-[90vh] min-h-[400px]
        p-0
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        flex flex-col
        overflow-hidden
        rounded-lg sm:rounded-xl
        shadow-2xl
        border
        bg-background
      "
      >
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b flex-shrink-0">
          <div className="flex items-center space-x-3">
            {(currentStep === "account" ||
              currentStep === "confirm" ||
              currentStep === "code" ||
              currentStep === "error") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-1 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
            <DialogTitle className="text-sm sm:text-lg font-semibold truncate">
              {getStepTitle()}
            </DialogTitle>
          </div>

          {/* Progress indicator */}
          {currentStep !== "success" &&
            currentStep !== "error" &&
            currentStep !== "insufficient_funds" && (
              <div className="flex space-x-2 mt-3">
                <div
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    currentStep === "banks" ? "bg-primary" : "bg-primary/30"
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    currentStep === "account" ? "bg-primary" : "bg-primary/30"
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    currentStep === "confirm" ? "bg-primary" : "bg-primary/30"
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    currentStep === "code" ? "bg-primary" : "bg-primary/30"
                  }`}
                />
              </div>
            )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 min-h-0">
          {error && (
            <Alert className="mb-4 animate-slide-up border-red-500">
              <AlertCircle className="h-4 w-4 border-red-500" />
              <AlertDescription className="text-xs sm:text-sm text-red-500">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="animate-fade-in">
            {currentStep === "insufficient_funds" && renderInsufficientFunds()}
            {currentStep === "banks" && renderBanksList()}
            {currentStep === "account" && renderAccountForm()}
            {currentStep === "confirm" && renderConfirmation()}
            {currentStep === "code" && renderCodeForm()}
            {currentStep === "success" && renderSuccess()}
            {currentStep === "error" && renderError()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

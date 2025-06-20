"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
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

type ModalStep = "banks" | "account" | "confirm" | "success" | "error";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// SWR fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch");
  }

  if (url.includes("paystack.co/bank")) {
    if (data.status && data.data) {
      return data.data.filter((bank: Bank) => bank.active);
    }
    throw new Error("Failed to fetch banks");
  }

  return data;
};

// SWR configuration
const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  refreshInterval: 0,
  dedupingInterval: 300000, // 5 minutes
  errorRetryCount: 3,
  errorRetryInterval: 1000,
  shouldRetryOnError: (error: any) => {
    return error.status !== 404 && error.status !== 403;
  },
  onError: (error: any) => {
    console.error("SWR Error:", error);
  },
};

export default function WithdrawalModal({
  isOpen,
  onClose,
}: WithdrawalModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<ModalStep>("banks");
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState("");

  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch banks using SWR - only when mounted and modal is open
  const {
    data: banks = [],
    error: banksError,
    isLoading: isBanksLoading,
    mutate: mutateBanks,
  } = useSWR(
    mounted && isOpen ? "https://api.paystack.co/bank" : null,
    fetcher,
    swrOptions
  );

  // Filter banks based on search
  useEffect(() => {
    if (!mounted || !banks.length) {
      setFilteredBanks([]);
      return;
    }

    if (searchTerm.trim() === "") {
      setFilteredBanks(banks);
    } else {
      const filtered = banks.filter((bank: Bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  }, [searchTerm, banks, mounted]);

  const resolveAccount = async () => {
    if (!selectedBank || !accountNumber.trim()) return;

    setIsProcessing(true);
    setLoadingText("Verifying account...");
    setError("");

    try {
      const response = await fetch("/api/payment/resolve-account", {
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

      if (response.ok && data.account_name) {
        setAccountDetails({
          account_name: data.account_name,
          account_number: accountNumber,
          bank_id: data.bank_id || selectedBank.id,
        });
        setCurrentStep("confirm");
      } else {
        throw new Error(data.message || "Failed to verify account");
      }
    } catch (err: any) {
      setError(
        err.message || "Failed to verify account. Please check your details."
      );
    } finally {
      setIsProcessing(false);
      setLoadingText("");
    }
  };

  const processWithdrawal = async () => {
    if (!accountDetails) return;

    setIsProcessing(true);
    setLoadingText("Processing withdrawal...");
    setError("");

    try {
      const response = await fetch("/api/payment/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_name: accountDetails.account_name,
          account_number: accountDetails.account_number,
          bank_id: accountDetails.bank_id,
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
      setIsProcessing(false);
      setLoadingText("");
    }
  };

  const resetModal = () => {
    setCurrentStep("banks");
    setSelectedBank(null);
    setAccountNumber("");
    setAccountDetails(null);
    setSearchTerm("");
    setError("");
    setIsProcessing(false);
    setLoadingText("");
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
    } else if (currentStep === "error") {
      setCurrentStep("confirm");
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
      case "success":
        return "Withdrawal Successful";
      case "error":
        return "Withdrawal Failed";
      default:
        return "Withdraw Funds";
    }
  };

  const retryFetchBanks = () => {
    mutateBanks();
  };

  const renderBanksList = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for your bank..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-10 sm:h-11"
        />
      </div>

      {isBanksLoading ? (
        <div className="flex items-center justify-center py-6 sm:py-8">
          <div className="text-center space-y-3">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mx-auto text-primary" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              Loading banks...
            </p>
          </div>
        </div>
      ) : banksError ? (
        <div className="text-center py-6 sm:py-8 space-y-4">
          <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-muted-foreground">
              Failed to load banks
            </p>
            <Button
              onClick={retryFetchBanks}
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm"
            >
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-h-64 sm:max-h-80 overflow-y-auto space-y-2 no-scrollbar">
          {filteredBanks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => handleBankSelect(bank)}
              className="w-full p-3 sm:p-4 text-left border rounded-lg hover:bg-accent hover:border-primary transition-all duration-200 group touch-manipulation"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs sm:text-sm truncate">
                    {bank.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Code: {bank.code}
                  </p>
                </div>
              </div>
            </button>
          ))}

          {filteredBanks.length === 0 && !isBanksLoading && (
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
            <p className="text-xs text-muted-foreground">
              Code: {selectedBank?.code}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-number" className="text-sm sm:text-base">
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
        />
        <p className="text-xs text-muted-foreground text-center">
          Enter your 10-digit account number
        </p>
      </div>

      <Button
        onClick={resolveAccount}
        disabled={accountNumber.length !== 10 || isProcessing}
        className="w-full h-10 sm:h-11 text-sm sm:text-base"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          "Verify Account"
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
            <p className="text-xs text-muted-foreground">
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
        </div>
      </div>

      <Button
        onClick={processWithdrawal}
        disabled={isProcessing}
        className="w-full h-10 sm:h-12 text-sm sm:text-base"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          "Withdraw Funds"
        )}
      </Button>
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
        </div>
      </div>

      <Button
        onClick={handleClose}
        className="w-full h-10 sm:h-12 text-sm sm:text-base"
        size="lg"
      >
        Done
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
          className="w-full h-10 sm:h-11 text-sm sm:text-base"
        >
          Try Again
        </Button>
        <Button
          onClick={handleClose}
          className="w-full h-10 sm:h-11 text-sm sm:text-base"
        >
          Close
        </Button>
      </div>
    </div>
  );

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="
        fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
        w-[calc(100vw-2rem)] max-w-md
        max-h-[calc(100vh-2rem)] 
        mx-4 my-4 
        overflow-hidden
        sm:w-full sm:mx-0 sm:my-0
        rounded-lg
      "
      >
        <DialogHeader className="space-y-2 sm:space-y-3 px-1">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {(currentStep === "account" ||
              currentStep === "confirm" ||
              currentStep === "error") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-1 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 touch-manipulation"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
            <DialogTitle className="text-base sm:text-lg font-semibold truncate">
              {getStepTitle()}
            </DialogTitle>
          </div>

          {/* Progress indicator */}
          {currentStep !== "success" && currentStep !== "error" && (
            <div className="flex space-x-1 sm:space-x-2">
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
            </div>
          )}
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[60vh] no-scrollbar px-1">
          {error && (
            <Alert className="mb-3 sm:mb-4 animate-slide-up">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs sm:text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="animate-fade-in">
            {currentStep === "banks" && renderBanksList()}
            {currentStep === "account" && renderAccountForm()}
            {currentStep === "confirm" && renderConfirmation()}
            {currentStep === "success" && renderSuccess()}
            {currentStep === "error" && renderError()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
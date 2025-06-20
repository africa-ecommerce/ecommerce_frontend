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

export default function WithdrawalModal({
  isOpen,
  onClose,
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState("");

  // Fetch banks on modal open
  useEffect(() => {
    if (isOpen && banks.length === 0) {
      fetchBanks();
    }
  }, [isOpen, banks.length]);

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
      setIsLoading(false);
      setLoadingText("");
    }
  };

  const processWithdrawal = async () => {
    if (!accountDetails) return;

    setIsLoading(true);
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
      setIsLoading(false);
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
    setIsLoading(false);
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

  const renderBanksList = () => (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for your bank..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">{loadingText}</p>
          </div>
        </div>
      ) : (
        <div className="max-h-80 overflow-y-auto space-y-2 no-scrollbar">
          {filteredBanks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => handleBankSelect(bank)}
              className="w-full p-3 text-left border rounded-lg hover:bg-accent hover:border-primary transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{bank.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Code: {bank.code}
                  </p>
                </div>
              </div>
            </button>
          ))}

          {filteredBanks.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No banks found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderAccountForm = () => (
    <div className="space-y-6">
      <div className="p-4 bg-accent/50 rounded-lg border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{selectedBank?.name}</p>
            <p className="text-xs text-muted-foreground">
              Code: {selectedBank?.code}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-number">Account Number</Label>
        <Input
          id="account-number"
          placeholder="Enter your account number"
          value={accountNumber}
          onChange={(e) =>
            setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          maxLength={10}
          className="text-center text-lg tracking-wider"
        />
        <p className="text-xs text-muted-foreground text-center">
          Enter your 10-digit account number
        </p>
      </div>

      <Button
        onClick={resolveAccount}
        disabled={accountNumber.length !== 10 || isLoading}
        className="w-full"
      >
        {isLoading ? (
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
    <div className="space-y-6">
      <div className="p-4 bg-accent/50 rounded-lg border space-y-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CreditCard className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">Account Verified</p>
            <p className="text-xs text-muted-foreground">
              Ready for withdrawal
            </p>
          </div>
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>

        <div className="space-y-2 pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Account Name:</span>
            <span className="font-medium">{accountDetails?.account_name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Account Number:</span>
            <span className="font-mono">{accountDetails?.account_number}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Bank:</span>
            <span className="font-medium">{selectedBank?.name}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={processWithdrawal}
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
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
    <div className="text-center space-y-6 py-4">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
        <Check className="h-8 w-8 text-green-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-green-700">
          Withdrawal Successful!
        </h3>
        <p className="text-muted-foreground">
          Your withdrawal request has been processed successfully.
        </p>
      </div>

      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account:</span>
            <span className="font-medium">{accountDetails?.account_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bank:</span>
            <span className="font-medium">{selectedBank?.name}</span>
          </div>
        </div>
      </div>

      <Button onClick={handleClose} className="w-full" size="lg">
        Done
      </Button>
    </div>
  );

  const renderError = () => (
    <div className="text-center space-y-6 py-4">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-scale-in">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-red-700">
          Withdrawal Failed
        </h3>
        <p className="text-muted-foreground">
          We couldn't process your withdrawal request.
        </p>
      </div>

      <div className="space-y-4">
        <Button onClick={handleBack} variant="outline" className="w-full">
          Try Again
        </Button>
        <Button onClick={handleClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            {(currentStep === "account" ||
              currentStep === "confirm" ||
              currentStep === "error") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-1 h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className="text-lg font-semibold">
              {getStepTitle()}
            </DialogTitle>
          </div>

          {/* Progress indicator */}
          {currentStep !== "success" && currentStep !== "error" && (
            <div className="flex space-x-2">
              <div
                className={`h-1 flex-1 rounded-full ${
                  currentStep === "banks" ? "bg-primary" : "bg-primary/30"
                }`}
              />
              <div
                className={`h-1 flex-1 rounded-full ${
                  currentStep === "account" ? "bg-primary" : "bg-primary/30"
                }`}
              />
              <div
                className={`h-1 flex-1 rounded-full ${
                  currentStep === "confirm" ? "bg-primary" : "bg-primary/30"
                }`}
              />
            </div>
          )}
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] no-scrollbar">
          {error && (
            <Alert className="mb-4 animate-slide-up">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
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

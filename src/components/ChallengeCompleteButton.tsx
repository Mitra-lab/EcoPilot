import React from "react";
import { VerificationStatus } from "@/lib/constants";

interface ChallengeCompleteButtonProps {
  status: VerificationStatus | "not_started";
  onClick: () => void;
  isLoading?: boolean;
}

export function ChallengeCompleteButton({
  status,
  onClick,
  isLoading = false,
}: ChallengeCompleteButtonProps) {
  if (status === VerificationStatus.VERIFIED) {
    return (
      <span className="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
        ✓ Self Verified
      </span>
    );
  }

  if (status === VerificationStatus.PENDING) {
    return (
      <span className="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-sm">
        Pending Verification
      </span>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--primary))] disabled:opacity-50 transition-all"
    >
      {isLoading ? "Submitting..." : "Submit Verification"}
    </button>
  );
}

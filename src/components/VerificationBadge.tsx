import React from "react";
import { VerificationStatus } from "@/lib/constants";

interface VerificationBadgeProps {
  status: VerificationStatus | "not_started";
}

export function VerificationBadge({ status }: VerificationBadgeProps) {
  const config = {
    not_started: {
      label: "Not Started",
      styles: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    },
    [VerificationStatus.PENDING]: {
      label: "Pending Verification",
      styles: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    },
    [VerificationStatus.VERIFIED]: {
      label: "Self Verified",
      styles: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    },
    [VerificationStatus.LIKELY_VERIFIED]: {
      label: "Likely Verified",
      styles: "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400 border-teal-200 dark:border-teal-800",
    },
    [VerificationStatus.NEEDS_MORE_EVIDENCE]: {
      label: "Needs Evidence",
      styles: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    },
    [VerificationStatus.FAILED]: {
      label: "Failed",
      styles: "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    },
  }[status] || { label: "Unknown", styles: "bg-gray-100 text-gray-700 border-gray-200" };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${config.styles}`}>
      {config.label}
    </span>
  );
}

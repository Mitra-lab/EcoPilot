import React from "react";

interface ImpactBadgeProps {
  level: "High" | "Medium" | "Low";
}

export function ImpactBadge({ level }: ImpactBadgeProps) {
  const styles = {
    High: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  }[level];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${styles}`}>
      {level} Impact
    </span>
  );
}

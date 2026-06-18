import React from "react";

interface ChallengeProgressProps {
  completedCount: number;
  totalCount: number;
  pointsEarned: number;
}

export function ChallengeProgress({
  completedCount,
  totalCount,
  pointsEarned,
}: ChallengeProgressProps) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex-1 space-y-2">
        <div className="flex justify-between text-sm font-semibold">
          <span className="text-[hsl(var(--foreground))]">Weekly Habits Complete</span>
          <span className="text-[hsl(var(--primary))]">{completedCount} of {totalCount} ({percentage}%)</span>
        </div>
        <div className="w-full bg-[hsl(var(--muted))] h-3 rounded-full overflow-hidden">
          <div
            className="bg-[hsl(var(--primary))] h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="border-t md:border-t-0 md:border-l border-[hsl(var(--border))] pt-4 md:pt-0 md:pl-6 flex flex-col items-start md:items-end justify-center min-w-[150px]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          Points Earned This Week
        </span>
        <span className="text-3xl font-extrabold text-[hsl(var(--foreground))] mt-1">
          ✨ {pointsEarned} <span className="text-sm font-semibold text-[hsl(var(--muted-foreground))]">pts</span>
        </span>
      </div>
    </div>
  );
}

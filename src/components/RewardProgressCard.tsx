import React from "react";
import { TierInfo } from "@/services/rewards";

interface RewardProgressCardProps {
  points: number;
  tierInfo: TierInfo;
}

export function RewardProgressCard({ points, tierInfo }: RewardProgressCardProps) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider block">
          Current Standing
        </span>
        <div className="mt-2 flex items-baseline justify-between">
          <h3 className="text-2xl font-black text-[hsl(var(--foreground))]">{tierInfo.currentTier}</h3>
          <span className="text-sm font-semibold text-[hsl(var(--primary))]">✨ {points} points</span>
        </div>

        {tierInfo.nextTier ? (
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
            You need <span className="font-bold text-[hsl(var(--foreground))]">{tierInfo.pointsNeeded}</span> more points to reach <span className="font-bold text-[hsl(var(--primary))]">{tierInfo.nextTier}</span>.
          </p>
        ) : (
          <p className="text-xs text-[hsl(var(--primary))] mt-2 font-bold">
            🏆 Highest standing achieved! Planet Guardian status active.
          </p>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-xs font-bold text-[hsl(var(--muted-foreground))]">
          <span>{tierInfo.currentTier}</span>
          <span>{tierInfo.nextTier || "Max Tier"}</span>
        </div>
        <div className="w-full bg-[hsl(var(--muted))] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[hsl(var(--primary))] h-full rounded-full transition-all duration-500"
            style={{ width: `${tierInfo.progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

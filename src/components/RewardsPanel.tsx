"use client";

import React, { useEffect } from "react";
import { RewardsService, Achievement } from "@/services/rewards";
import { VerificationRecord } from "@/services/verification";
import { RewardProgressCard } from "./RewardProgressCard";
import { AchievementGrid } from "./AchievementGrid";

interface RewardsPanelProps {
  points: number;
  verifications: VerificationRecord[];
  grade: string;
}

export function RewardsPanel({ points, verifications, grade }: RewardsPanelProps) {
  const tierInfo = RewardsService.getTierProgress(points);
  const achievements = RewardsService.checkAchievements(points, verifications, grade);

  useEffect(() => {
    RewardsService.syncSavedAchievements(achievements);
  }, [points, verifications, grade]);

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-8 space-y-8">
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-3xl">🏅</span>
        <div>
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Rewards & Achievements</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Earn badges and climb tiers by taking verified sustainability actions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RewardProgressCard points={points} tierInfo={tierInfo} />
        </div>
        <div className="lg:col-span-2">
          <AchievementGrid achievements={achievements} />
        </div>
      </div>
    </div>
  );
}

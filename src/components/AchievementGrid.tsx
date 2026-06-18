import React from "react";
import { Achievement } from "@/services/rewards";
import { AchievementBadge } from "./AchievementBadge";

interface AchievementGridProps {
  achievements: Achievement[];
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Badges & Achievements</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}

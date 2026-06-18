import React from "react";
import { Achievement } from "@/services/rewards";

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <div className={`p-4 border rounded-xl bg-[hsl(var(--card))] shadow-sm flex items-center space-x-3 transition-all ${
      achievement.unlocked
        ? "border-[hsl(var(--primary))]/30 opacity-100"
        : "border-[hsl(var(--border))] opacity-50 grayscale"
    }`}>
      <div className="text-3xl p-2 bg-[hsl(var(--muted))] rounded-lg">
        {achievement.badgeEmoji}
      </div>
      <div>
        <h4 className="text-sm font-bold text-[hsl(var(--foreground))]">
          {achievement.title}
        </h4>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
          {achievement.description}
        </p>
        <span className={`inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider ${
          achievement.unlocked ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"
        }`}>
          {achievement.unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>
    </div>
  );
}

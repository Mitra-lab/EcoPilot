import React from "react";
import { UserChallenge } from "@/services/challenge";
import { ChallengeCompleteButton } from "./ChallengeCompleteButton";
import { ImpactBadge } from "./ImpactBadge";
import { VerificationStatus } from "@/lib/constants";

interface ChallengeCardProps {
  challenge: UserChallenge;
  onComplete: (id: string) => void;
  isLoading?: boolean;
}

export function ChallengeCard({
  challenge,
  onComplete,
  isLoading = false,
}: ChallengeCardProps) {
  const difficultyStyle = {
    easy: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    hard: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  }[challenge.difficulty] || "bg-gray-500/10 text-gray-600 border-gray-500/20";

  const isCompleted = challenge.status === VerificationStatus.VERIFIED;

  return (
    <div className={`p-6 border border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--card))] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[hsl(var(--primary))]/30 transition-all ${
      isCompleted ? "opacity-75" : ""
    }`}>
      <div className="space-y-3 max-w-xl">
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          <h4 className={`text-lg font-bold text-[hsl(var(--foreground))] ${
            isCompleted ? "line-through text-[hsl(var(--muted-foreground))]" : ""
          }`}>
            {challenge.title}
          </h4>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20">
            ✨ {challenge.greenPoints} pts
          </span>
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          {challenge.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <ImpactBadge level={challenge.impactLevel} />
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${difficultyStyle}`}>
            {challenge.difficulty} Difficulty
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
            🍃 -{challenge.impactScore} kg CO₂
          </span>
        </div>
      </div>
      <ChallengeCompleteButton
        status={challenge.status}
        onClick={() => onComplete(challenge.id)}
        isLoading={isLoading}
      />
    </div>
  );
}

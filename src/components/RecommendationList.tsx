import React from "react";
import { Recommendation } from "@/services/ai";
import { ImpactBadge } from "./ImpactBadge";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => {
        const difficultyStyle = {
          Easy: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
          Medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
          Hard: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        }[rec.difficulty] || "bg-gray-500/10 text-gray-600 border-gray-500/20";

        return (
          <div
            key={index}
            className="p-5 border border-[hsl(var(--border))] rounded-xl bg-[hsl(var(--card))] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[hsl(var(--primary))]/30 transition-colors"
          >
            <div className="space-y-2 max-w-xl">
              <h4 className="text-base font-semibold text-[hsl(var(--foreground))] leading-snug">
                {rec.action}
              </h4>
              <div className="flex flex-wrap gap-2">
                <ImpactBadge level={rec.impact} />
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${difficultyStyle}`}>
                  {rec.difficulty} Difficulty
                </span>
              </div>
            </div>
            <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-[hsl(var(--border))] flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Reduction Potential
              </span>
              <span className="text-lg font-bold text-[hsl(var(--primary))] mt-0.5">
                -{rec.potentialReduction}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";

interface MetricCardsProps {
  carbonScore: number;
  rating: string;
  points?: number;
  streak?: number;
}

export function MetricCards({
  carbonScore,
  rating,
  points = 120,
  streak = 0,
}: MetricCardsProps) {
  const ratingColors = {
    "A+": "text-emerald-500 border-emerald-500/20 bg-emerald-500/5",
    "A": "text-green-500 border-green-500/20 bg-green-500/5",
    "B": "text-teal-500 border-teal-500/20 bg-teal-500/5",
    "C": "text-amber-500 border-amber-500/20 bg-amber-500/5",
    "D": "text-rose-500 border-rose-500/20 bg-rose-500/5",
  }[rating] || "text-[hsl(var(--foreground))]";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Carbon Footprint Score */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm">
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider block">
          Carbon footprint
        </span>
        <div className="flex items-baseline mt-2 gap-1">
          <span className="text-3xl font-extrabold text-[hsl(var(--foreground))]">{carbonScore}</span>
          <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">tons/yr</span>
        </div>
      </div>

      {/* Sustainability Rating */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm">
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider block">
          Sustainability Grade
        </span>
        <div className={`mt-2 inline-flex items-center justify-center font-black rounded-lg text-3xl ${ratingColors}`}>
          {rating}
        </div>
      </div>

      {/* Sustainability Streak */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm">
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider block">
          Habit Streak
        </span>
        <div className="flex items-baseline mt-2 gap-1">
          <span className="text-3xl font-extrabold text-[hsl(var(--foreground))]">🔥 {streak}</span>
          <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{streak === 1 ? "day" : "days"}</span>
        </div>
      </div>

      {/* Green Points */}
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 shadow-sm">
        <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider block">
          Green Points
        </span>
        <div className="flex items-baseline mt-2 gap-1">
          <span className="text-3xl font-extrabold text-[hsl(var(--foreground))]">✨ {points}</span>
          <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">pts</span>
        </div>
      </div>
    </div>
  );
}

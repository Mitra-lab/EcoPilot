import React from "react";

interface SustainabilityRatingProps {
  rating: "A+" | "A" | "B" | "C" | "D";
}

export function SustainabilityRating({ rating }: SustainabilityRatingProps) {
  const ratingDetails = {
    "A+": {
      title: "Climate Hero status",
      description: "Exceptional! Your carbon output is at a minimal level, showing great care and sustainable choices. Keep it up!",
      badge: "🥇",
    },
    "A": {
      title: "Green Leader",
      description: "Fantastic score! You live significantly more sustainably than the average person. Aim for A+ by tuning small habits.",
      badge: "🥈",
    },
    "B": {
      title: "Active Conserver",
      description: "Good job! You are doing well, but there is clear potential to reduce further. Check out electricity or commuting options.",
      badge: "🥉",
    },
    "C": {
      title: "Modest Footprint",
      description: "Your carbon output is moderate. Sustainable alternatives (like a balanced diet or walking more) will yield fast improvements.",
      badge: "🌱",
    },
    "D": {
      title: "High Environmental Impact",
      description: "Your current score is high. Focus on high-return targets: reducing single-occupancy vehicle trips and optimized energy use.",
      badge: "⚠️",
    },
  }[rating];

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-8 flex items-start space-x-4">
      <div className="text-4xl">{ratingDetails.badge}</div>
      <div>
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">
          {ratingDetails.title} (Rating: {rating})
        </h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">
          {ratingDetails.description}
        </p>
      </div>
    </div>
  );
}

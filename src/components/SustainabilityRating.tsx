import React from "react";

interface SustainabilityRatingProps {
  rating: "A+" | "A" | "B" | "C" | "D";
}

export function SustainabilityRating({ rating }: SustainabilityRatingProps) {
  const ratingDetails = {
    "A+": {
      title: "Exceptional sustainability",
      description: "Excellent! Your carbon footprint is outstandingly low. You are leading the way in environmental stewardship.",
      badge: "🥇",
    },
    "A": {
      title: "Strong sustainability",
      description: "Fantastic score! You live significantly more sustainably than the average person. Small tweaks can push you to A+.",
      badge: "🥈",
    },
    "B": {
      title: "Good but improvable",
      description: "You have a solid foundation, but there are clear opportunities to optimize your home energy use or travel habits.",
      badge: "🥉",
    },
    "C": {
      title: "Significant improvement opportunities",
      description: "Your carbon footprint is moderate. Adopting habits like walking or introducing meat-free days will yield fast improvements.",
      badge: "🌱",
    },
    "D": {
      title: "High environmental impact",
      description: "Your footprint is high. Focus on major targets like reducing car travel and optimizing home cooling/heating systems.",
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

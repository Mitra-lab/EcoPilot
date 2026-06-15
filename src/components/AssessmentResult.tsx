import React from "react";
import { DietPreference, VehicleType } from "@/lib/constants";
import { AssessmentFormInput } from "@/lib/validations";

interface AssessmentResultProps {
  score: number;
  input: AssessmentFormInput;
  onReset: () => void;
}

export function AssessmentResult({ score, input, onReset }: AssessmentResultProps) {
  // Compute individual emissions estimates for visual breakdown in kg CO2
  const dietEmissions = {
    [DietPreference.VEGAN]: 1500,
    [DietPreference.VEGETARIAN]: 1700,
    [DietPreference.PESCATARIAN]: 2000,
    [DietPreference.BALANCED]: 2500,
    [DietPreference.MEAT_LOVER]: 3300,
  }[input.dietPreference];

  const travelFactor = {
    [VehicleType.NONE]: 0,
    [VehicleType.ELECTRIC]: 0.05,
    [VehicleType.HYBRID]: 0.1,
    [VehicleType.GASOLINE_SMALL]: 0.17,
    [VehicleType.GASOLINE_LARGE]: 0.27,
    [VehicleType.DIESEL]: 0.22,
  }[input.vehicleType];

  const travelEmissions = Math.round(input.weeklyTravelDistance * 52 * travelFactor);
  const electricityEmissions = Math.round((input.monthlyElectricityBill * 1.5 * 12 * 0.4) / input.familySize);
  const totalKg = dietEmissions + travelEmissions + electricityEmissions;

  // Identify highest impact category
  const categories = [
    { name: "Diet Choice", value: dietEmissions, color: "bg-emerald-500" },
    { name: "Transportation", value: travelEmissions, color: "bg-blue-500" },
    { name: "Home Energy Use", value: electricityEmissions, color: "bg-amber-500" },
  ];

  const sortedCategories = [...categories].sort((a, b) => b.value - a.value);
  const highestImpact = sortedCategories[0];

  // Simple, elegant rating/summary text based on score
  let rating = "Good";
  let ratingColor = "text-emerald-600 dark:text-emerald-400";
  let summaryText = "Your carbon footprint is lower than the global average. Excellent job building sustainable habits!";

  if (score > 6) {
    rating = "High";
    ratingColor = "text-rose-600 dark:text-rose-400";
    summaryText = "Your carbon footprint is quite high. Focusing on transportation and home energy choices could make a huge difference.";
  } else if (score > 3) {
    rating = "Moderate";
    ratingColor = "text-amber-600 dark:text-amber-400";
    summaryText = "Your footprint is near average. There are simple, clear adjustments you can implement to achieve lower emissions.";
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center py-6 border-b border-[hsl(var(--border))]">
        <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          Your Personal Carbon Score
        </p>
        <div className="mt-2 text-6xl font-extrabold text-[hsl(var(--foreground))] tracking-tight">
          {score} <span className="text-2xl font-semibold text-[hsl(var(--muted-foreground))]">tons CO₂/yr</span>
        </div>
        <p className="mt-3 text-sm font-medium">
          Rating: <span className={`font-bold ${ratingColor}`}>{rating}</span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">Sustainability Summary</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          {summaryText}
        </p>
      </div>

      {/* Breakdown Visualizer */}
      <div>
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Emissions Breakdown</h3>
        <div className="space-y-4">
          {categories.map((category) => {
            const percentage = totalKg > 0 ? Math.round((category.value / totalKg) * 100) : 0;
            return (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[hsl(var(--foreground))]">{category.name}</span>
                  <span className="text-[hsl(var(--muted-foreground))]">
                    {Math.round(category.value / 1000 * 100) / 100} tons ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-[hsl(var(--muted))] h-3 rounded-full overflow-hidden">
                  <div
                    className={`${category.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[hsl(var(--muted))] rounded-lg p-4 border border-[hsl(var(--border))]">
        <p className="text-xs text-[hsl(var(--muted-foreground))] font-medium uppercase tracking-wider mb-1">
          Primary Action Target
        </p>
        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
          Your highest emission source is <span className="text-[hsl(var(--primary))] font-bold">{highestImpact.name}</span>. 
          Focusing your initial habits here will produce the highest environmental return.
        </p>
      </div>

      <button
        onClick={onReset}
        className="w-full py-3 px-4 border border-[hsl(var(--border))] rounded-md text-sm font-semibold hover:bg-[hsl(var(--muted))] transition-colors"
      >
        Retake Assessment
      </button>
    </div>
  );
}

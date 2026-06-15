import React from "react";
import { DietPreference, VehicleType } from "@/lib/constants";
import { AssessmentFormInput } from "@/lib/validations";

interface ImpactSummaryCardProps {
  input: AssessmentFormInput;
}

export function ImpactSummaryCard({ input }: ImpactSummaryCardProps) {
  const recommendations: string[] = [];

  if (input.vehicleType !== VehicleType.NONE && input.weeklyTravelDistance > 100) {
    recommendations.push(
      "Transit Shift: Try replacing 1-2 driving days per week with public transportation or walking to significantly reduce travel emissions."
    );
  }

  if (input.dietPreference === DietPreference.MEAT_LOVER || input.dietPreference === DietPreference.BALANCED) {
    recommendations.push(
      "Diet Modification: Adopting a 'Meatless Monday' or pescatarian options twice weekly can reduce food carbon contributions by up to 20%."
    );
  }

  if (input.monthlyElectricityBill > 150) {
    recommendations.push(
      "Energy Conservation: Setting air conditioners 1 degree higher or switching unused appliances off at the socket saves substantial monthly grid power."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Continuous Improvement: Look into community cleanups, solar panel installations, or composting organic waste to reduce methane."
    );
  }

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Recommended Next Steps</h3>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start space-x-3 text-sm text-[hsl(var(--muted-foreground))]">
            <span className="text-[hsl(var(--primary))] font-bold text-base mt-0.5">•</span>
            <span className="leading-relaxed">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

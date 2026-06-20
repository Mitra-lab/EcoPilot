import { DietPreference, VehicleType } from "@/lib/constants";

/**
 * Generates a structured prompt for the Gemini sustainability coach.
 */
export function buildCoachPrompt(
  carbonScore: number,
  dietEmissions: number,
  travelEmissions: number,
  electricityEmissions: number,
  grade: string,
  dietPreference?: DietPreference,
  vehicleType?: VehicleType,
  weeklyTravelDistance?: number,
  monthlyElectricityBill?: number,
  familySize?: number
): string {
  return `You are an AI Sustainability Coach for EcoPilot. Generate 3 highly personalized, actionable recommendations for a user with the following profile:
- Carbon Score: ${carbonScore} tons CO₂/yr (Sustainability Grade: ${grade})
- Diet Emissions: ${dietEmissions} kg CO₂/yr (Preference: ${dietPreference || "balanced"})
- Travel Emissions: ${travelEmissions} kg CO₂/yr (Vehicle: ${vehicleType || "none"}, Weekly distance: ${weeklyTravelDistance || 0} km)
- Electricity Emissions: ${electricityEmissions} kg CO₂/yr (Monthly bill: ${monthlyElectricityBill || 0}, Family size: ${familySize || 1})

Format your response as a valid JSON array of exactly 3 objects. Do not include markdown code fence formatting.
Example format:
[
  {
    "action": "Recommendation action text",
    "impact": "High",
    "difficulty": "Easy",
    "potentialReduction": "Estimated kg reduction (e.g., 250 kg CO₂/yr)"
  }
]

Ensure impact values are limited to "High", "Medium", or "Low". Difficulty values must be "Easy", "Medium", or "Hard".
Provide context-specific advice based on their highest emission category. If the user is Vegan, do NOT recommend reducing meat consumption or Meat-Free Mondays. If they have No Vehicle, do NOT recommend reducing driving or checking tire pressures. If they have Low Electricity usage, recommend maintaining habits and monitoring consumption.`;
}

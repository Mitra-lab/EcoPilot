import { DietPreference, VehicleType } from "@/lib/constants";
import { AssessmentFormInput } from "@/lib/validations";

export interface DashboardChartData {
  name: string;
  value: number;
  color: string;
}

export class DashboardService {
  /**
   * Translates carbon score into letter grades (A+, A, B, C, D)
   */
  static getSustainabilityRating(score: number): "A+" | "A" | "B" | "C" | "D" {
    if (score <= 1.5) return "A+";
    if (score <= 3.0) return "A";
    if (score <= 5.0) return "B";
    if (score <= 8.0) return "C";
    return "D";
  }

  /**
   * Transforms assessment details into categorized chart items.
   */
  static generateChartData(input: AssessmentFormInput): DashboardChartData[] {
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

    return [
      { name: "Diet", value: Math.round((dietEmissions / 1000) * 100) / 100, color: "#10b981" },
      { name: "Transport", value: Math.round((travelEmissions / 1000) * 100) / 100, color: "#3b82f6" },
      { name: "Electricity", value: Math.round((electricityEmissions / 1000) * 100) / 100, color: "#f59e0b" },
    ];
  }
}

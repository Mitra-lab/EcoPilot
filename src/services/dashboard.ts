import { AssessmentFormInput } from "@/lib/validations";
import { CarbonService } from "./carbon";

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
    if (score <= 2.0) return "A+";
    if (score <= 3.5) return "A";
    if (score <= 5.5) return "B";
    if (score <= 8.5) return "C";
    return "D";
  }

  /**
   * Transforms assessment details into categorized chart items.
   */
  static generateChartData(input: AssessmentFormInput): DashboardChartData[] {
    const dietEmissions = CarbonService.getDietEmissions(input.dietPreference);
    const travelEmissions = CarbonService.getTransportEmissions(input.vehicleType, input.weeklyTravelDistance);
    const electricityEmissions = CarbonService.getElectricityEmissions(input.monthlyElectricityBill, input.familySize);

    return [
      { name: "Diet", value: Math.round((dietEmissions / 1000) * 100) / 100, color: "#10b981" },
      { name: "Transport", value: Math.round((travelEmissions / 1000) * 100) / 100, color: "#3b82f6" },
      { name: "Electricity", value: Math.round((electricityEmissions / 1000) * 100) / 100, color: "#f59e0b" },
    ];
  }
}

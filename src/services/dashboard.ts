import { AssessmentFormInput } from "@/lib/validations";
import { CHART_COLORS } from "@/lib/constants";
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
   * Calculates MVP habit streak based on verification history.
   * If user has verified at least one challenge, streak is 1, else 0.
   */
  static calculateHabitStreak(verificationCount: number): number {
    return verificationCount > 0 ? 1 : 0;
  }

  /**
   * Transforms assessment details into categorized chart items.
   */
  static generateChartData(input: AssessmentFormInput): DashboardChartData[] {
    const dietEmissions = CarbonService.getDietEmissions(input.dietPreference);
    const travelEmissions = CarbonService.getTransportEmissions(input.vehicleType, input.weeklyTravelDistance);
    const electricityEmissions = CarbonService.getElectricityEmissions(input.monthlyElectricityBill, input.familySize);

    return [
      { name: "Diet", value: Math.round((dietEmissions / 1000) * 100) / 100, color: CHART_COLORS.diet },
      { name: "Transport", value: Math.round((travelEmissions / 1000) * 100) / 100, color: CHART_COLORS.transport },
      { name: "Electricity", value: Math.round((electricityEmissions / 1000) * 100) / 100, color: CHART_COLORS.electricity },
    ];
  }
}

import { DietPreference, VehicleType } from "@/lib/constants";
import { UserChallenge } from "./challenge-types";
import { getElectricityChallenges } from "./electricity-challenges";
import { getTransportChallenges } from "./transport-challenges";
import { getDietChallenges } from "./diet-challenges";

export class ChallengeService {
  /**
   * Identifies the highest carbon emission category of the user.
   */
  static getHighestImpactCategory(
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number
  ): "Diet" | "Transport" | "Electricity" {
    const maxVal = Math.max(dietEmissions, travelEmissions, electricityEmissions);
    if (maxVal === electricityEmissions) return "Electricity";
    if (maxVal === travelEmissions) return "Transport";
    return "Diet";
  }

  /**
   * Generates weekly challenges targeting the user's highest emission source,
   * fully personalized to their profile attributes.
   */
  static generateChallenges(
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number,
    dietPreference?: DietPreference,
    vehicleType?: VehicleType,
    weeklyTravelDistance?: number,
    monthlyElectricityBill?: number,
    familySize?: number
  ): UserChallenge[] {
    const highestCategory = this.getHighestImpactCategory(
      dietEmissions,
      travelEmissions,
      electricityEmissions
    );

    if (highestCategory === "Electricity") {
      return getElectricityChallenges(electricityEmissions, monthlyElectricityBill, familySize);
    }

    if (highestCategory === "Transport") {
      return getTransportChallenges(vehicleType, weeklyTravelDistance);
    }

    return getDietChallenges(dietPreference);
  }
}

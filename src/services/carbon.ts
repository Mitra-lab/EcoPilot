import { DietPreference, VehicleType } from "@/lib/constants";
import { AssessmentFormInput } from "@/lib/validations";

/**
 * Service for calculating carbon emissions based on user habits.
 * Values estimated in annual kg CO2.
 */
export class CarbonService {
  /**
   * Calculates carbon footprint estimate from form inputs.
   */
  static calculateScore(input: AssessmentFormInput): number {
    let score = 0;

    // 1. Diet emissions (base kg CO2 / year)
    switch (input.dietPreference) {
      case DietPreference.VEGAN:
        score += 1500;
        break;
      case DietPreference.VEGETARIAN:
        score += 1700;
        break;
      case DietPreference.PESCATARIAN:
        score += 2000;
        break;
      case DietPreference.BALANCED:
        score += 2500;
        break;
      case DietPreference.MEAT_LOVER:
        score += 3300;
        break;
    }

    // 2. Transport emissions
    let emissionFactor = 0; // kg CO2 per km
    switch (input.vehicleType) {
      case VehicleType.NONE:
        emissionFactor = 0;
        break;
      case VehicleType.ELECTRIC:
        emissionFactor = 0.05;
        break;
      case VehicleType.HYBRID:
        emissionFactor = 0.1;
        break;
      case VehicleType.GASOLINE_SMALL:
        emissionFactor = 0.17;
        break;
      case VehicleType.GASOLINE_LARGE:
        emissionFactor = 0.27;
        break;
      case VehicleType.DIESEL:
        emissionFactor = 0.22;
        break;
    }
    // Multiply weekly distance by 52 weeks and the vehicle emission factor
    score += input.weeklyTravelDistance * 52 * emissionFactor;

    // 3. Electricity emissions (simplified: electricity bill division by family size)
    // Assume average cost per kWh and regional intensity factor
    const estimatedKwh = input.monthlyElectricityBill * 1.5; // conversion factor
    score += (estimatedKwh * 12 * 0.4) / input.familySize; // 0.4 kg CO2 per kWh

    // Return final footprint in tons of CO2 (rounded to 2 decimal places)
    return Math.round((score / 1000) * 100) / 100;
  }
}

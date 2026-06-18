import { DietPreference, VehicleType } from "@/lib/constants";
import { AssessmentFormInput } from "@/lib/validations";

/**
 * Service for calculating carbon emissions based on user habits.
 * Values estimated in annual kg CO2.
 */
export class CarbonService {
  /**
   * Calculates annual diet emissions (kg CO2)
   */
  static getDietEmissions(diet: DietPreference): number {
    switch (diet) {
      case DietPreference.VEGAN:
        return 1500;
      case DietPreference.VEGETARIAN:
        return 1700;
      case DietPreference.PESCATARIAN:
        return 2000;
      case DietPreference.BALANCED:
        return 2500;
      case DietPreference.MEAT_LOVER:
        return 3300;
      default:
        return 2500;
    }
  }

  /**
   * Calculates annual transportation emissions (kg CO2)
   */
  static getTransportEmissions(vehicleType: VehicleType, weeklyDistance: number): number {
    let emissionFactor = 0; // kg CO2 per km
    switch (vehicleType) {
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
    return Math.round(weeklyDistance * 52 * emissionFactor);
  }

  /**
   * Calculates annual per-capita electricity emissions (kg CO2)
   */
  static getElectricityEmissions(monthlyBill: number, familySize: number): number {
    // Standard utility rate (~$0.15/kWh) yields approx 6.67 kWh per unit.
    // Using 6.0 as a conservative, realistic factor.
    const estimatedKwh = monthlyBill * 6.0;
    return Math.round((estimatedKwh * 12 * 0.4) / familySize); // 0.4 kg CO2 per kWh intensity
  }

  /**
   * Calculates carbon footprint estimate from form inputs.
   */
  static calculateScore(input: AssessmentFormInput): number {
    const diet = CarbonService.getDietEmissions(input.dietPreference);
    const transport = CarbonService.getTransportEmissions(input.vehicleType, input.weeklyTravelDistance);
    const electricity = CarbonService.getElectricityEmissions(input.monthlyElectricityBill, input.familySize);

    // Return final footprint in tons of CO2 (rounded to 2 decimal places)
    return Math.round(((diet + transport + electricity) / 1000) * 100) / 100;
  }
}

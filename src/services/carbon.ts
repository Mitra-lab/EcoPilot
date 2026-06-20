import { DietPreference, VehicleType } from "@/lib/constants";
import { AssessmentFormInput } from "@/lib/validations";
import {
  DIET_EMISSIONS_MAP,
  VEHICLE_EMISSIONS_FACTOR_MAP,
  ELECTRICITY_BILL_KWH_FACTOR,
  ELECTRICITY_CO2_INTENSITY_KG_PER_KWH,
  MONTHS_PER_YEAR,
} from "@/constants/emissions";

/**
 * Service for calculating carbon emissions based on user habits.
 * Values estimated in annual kg CO2.
 */
export class CarbonService {
  /**
   * Calculates annual diet emissions (kg CO2)
   * @param diet User's diet preference selection
   * @returns Estimated annual kg CO2
   */
  static getDietEmissions(diet: DietPreference): number {
    return DIET_EMISSIONS_MAP[diet] || DIET_EMISSIONS_MAP[DietPreference.BALANCED];
  }

  /**
   * Calculates annual transportation emissions (kg CO2)
   * @param vehicleType User's vehicle engine classification
   * @param weeklyDistance Estimated weekly travel distance in kilometers
   * @returns Estimated annual kg CO2
   */
  static getTransportEmissions(vehicleType: VehicleType, weeklyDistance: number): number {
    const emissionFactor = VEHICLE_EMISSIONS_FACTOR_MAP[vehicleType] !== undefined
      ? VEHICLE_EMISSIONS_FACTOR_MAP[vehicleType]
      : 0;
    return Math.round(weeklyDistance * 52 * emissionFactor);
  }

  /**
   * Calculates annual per-capita electricity emissions (kg CO2)
   * @param monthlyBill Estimated monthly electricity cost
   * @param familySize Total household members
   * @returns Estimated annual kg CO2 per capita
   */
  static getElectricityEmissions(monthlyBill: number, familySize: number): number {
    const estimatedKwh = monthlyBill * ELECTRICITY_BILL_KWH_FACTOR;
    const co2Intensity = ELECTRICITY_CO2_INTENSITY_KG_PER_KWH;
    return Math.round((estimatedKwh * MONTHS_PER_YEAR * co2Intensity) / familySize);
  }

  /**
   * Calculates carbon footprint estimate from form inputs.
   * @param input Validated user assessment factors
   * @returns Footprint score in tons of CO2 per year rounded to 2 decimal places
   */
  static calculateScore(input: AssessmentFormInput): number {
    const diet = CarbonService.getDietEmissions(input.dietPreference);
    const transport = CarbonService.getTransportEmissions(input.vehicleType, input.weeklyTravelDistance);
    const electricity = CarbonService.getElectricityEmissions(input.monthlyElectricityBill, input.familySize);

    // Return final footprint in tons of CO2 (rounded to 2 decimal places)
    return Math.round(((diet + transport + electricity) / 1000) * 100) / 100;
  }
}

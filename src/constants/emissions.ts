import { DietPreference, VehicleType } from "@/lib/constants";

/**
 * Standard carbon emission values (kg CO2 per year) for diet preferences.
 */
export const DIET_EMISSIONS_MAP: Record<DietPreference, number> = {
  [DietPreference.VEGAN]: 1500,
  [DietPreference.VEGETARIAN]: 1700,
  [DietPreference.PESCATARIAN]: 2000,
  [DietPreference.BALANCED]: 2500,
  [DietPreference.MEAT_LOVER]: 3300,
};

/**
 * Carbon emission factors (kg CO2 per km) for vehicle types.
 */
export const VEHICLE_EMISSIONS_FACTOR_MAP: Record<VehicleType, number> = {
  [VehicleType.NONE]: 0,
  [VehicleType.ELECTRIC]: 0.05,
  [VehicleType.HYBRID]: 0.1,
  [VehicleType.GASOLINE_SMALL]: 0.17,
  [VehicleType.GASOLINE_LARGE]: 0.27,
  [VehicleType.DIESEL]: 0.22,
};

/**
 * Base utility factors for electricity calculations.
 */
export const ELECTRICITY_BILL_KWH_FACTOR = 6.0;
export const ELECTRICITY_CO2_INTENSITY_KG_PER_KWH = 0.4;
export const MONTHS_PER_YEAR = 12;

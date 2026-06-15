import { CarbonService } from "../src/services/carbon";
import { DietPreference, VehicleType } from "../src/lib/constants";

describe("CarbonService", () => {
  it("should calculate correct carbon score for vegetarian with hybrid vehicle", () => {
    const input = {
      familySize: 2,
      monthlyElectricityBill: 100,
      vehicleType: VehicleType.HYBRID,
      weeklyTravelDistance: 150,
      dietPreference: DietPreference.VEGETARIAN,
    };

    const score = CarbonService.calculateScore(input);
    
    // Diet: 1700 kg CO2
    // Transport: 150 * 52 * 0.1 = 780 kg CO2
    // Electricity: (100 * 1.5 * 12 * 0.4) / 2 = 360 kg CO2
    // Total = 1700 + 780 + 360 = 2840 kg CO2 = 2.84 tons
    expect(score).toBe(2.84);
  });

  it("should calculate correct carbon score for vegan with no vehicle", () => {
    const input = {
      familySize: 1,
      monthlyElectricityBill: 50,
      vehicleType: VehicleType.NONE,
      weeklyTravelDistance: 0,
      dietPreference: DietPreference.VEGAN,
    };

    const score = CarbonService.calculateScore(input);

    // Diet: 1500 kg CO2
    // Transport: 0
    // Electricity: (50 * 1.5 * 12 * 0.4) / 1 = 360 kg CO2
    // Total = 1500 + 0 + 360 = 1860 kg CO2 = 1.86 tons
    expect(score).toBe(1.86);
  });
});

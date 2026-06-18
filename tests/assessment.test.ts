import { assessmentSchema } from "../src/lib/validations";
import { DietPreference, VehicleType } from "../src/lib/constants";
import { CarbonService } from "../src/services/carbon";

describe("Assessment Module Tests", () => {
  describe("Zod Validation Schemas", () => {
    it("should validate a correct assessment form payload", () => {
      const validPayload = {
        familySize: 3,
        monthlyElectricityBill: 120,
        vehicleType: VehicleType.ELECTRIC,
        weeklyTravelDistance: 250,
        dietPreference: DietPreference.VEGAN,
      };

      const result = assessmentSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it("should fail validation on empty or partial object submission", () => {
      const result = assessmentSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it("should fail validation if family size is less than 1 (invalid value)", () => {
      const invalidPayload = {
        familySize: 0,
        monthlyElectricityBill: 80,
        vehicleType: VehicleType.NONE,
        weeklyTravelDistance: 0,
        dietPreference: DietPreference.BALANCED,
      };

      const result = assessmentSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some(e => e.path.includes("familySize"))).toBe(true);
      }
    });

    it("should fail validation if travel distance is negative (invalid value)", () => {
      const invalidPayload = {
        familySize: 1,
        monthlyElectricityBill: 80,
        vehicleType: VehicleType.NONE,
        weeklyTravelDistance: -5,
        dietPreference: DietPreference.BALANCED,
      };

      const result = assessmentSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some(e => e.path.includes("weeklyTravelDistance"))).toBe(true);
      }
    });

    it("should fail validation if electricity bill is negative (invalid value)", () => {
      const invalidPayload = {
        familySize: 1,
        monthlyElectricityBill: -100,
        vehicleType: VehicleType.NONE,
        weeklyTravelDistance: 100,
        dietPreference: DietPreference.BALANCED,
      };

      const result = assessmentSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors.some(e => e.path.includes("monthlyElectricityBill"))).toBe(true);
      }
    });
  });

  describe("Carbon Scoring Edge Cases", () => {
    it("should return zero travel carbon emissions if vehicle type is NONE and distance is large (no vehicle case)", () => {
      const input = {
        familySize: 1,
        monthlyElectricityBill: 0,
        vehicleType: VehicleType.NONE,
        weeklyTravelDistance: 1000,
        dietPreference: DietPreference.VEGAN,
      };

      const score = CarbonService.calculateScore(input);
      // Diet: 1.5 tons CO2 (1500 kg)
      // Transport: 0 tons CO2
      // Electricity: 0 tons CO2
      expect(score).toBe(1.5);
    });

    it("should handle large gasoline vehicles with high travel distances correctly", () => {
      const input = {
        familySize: 1,
        monthlyElectricityBill: 0,
        vehicleType: VehicleType.GASOLINE_LARGE,
        weeklyTravelDistance: 500,
        dietPreference: DietPreference.MEAT_LOVER,
      };

      const score = CarbonService.calculateScore(input);
      // Diet: 3.3 tons (3300 kg)
      // Transport: 500 * 52 * 0.27 = 7020 kg = 7.02 tons
      // Electricity: 0
      // Total = 10.32 tons
      expect(score).toBe(10.32);
    });

    it("should scale down electricity carbon footprint per capita for large family size", () => {
      const smallFamilyInput = {
        familySize: 1,
        monthlyElectricityBill: 300,
        vehicleType: VehicleType.NONE,
        weeklyTravelDistance: 0,
        dietPreference: DietPreference.VEGAN,
      };

      const largeFamilyInput = {
        familySize: 10,
        monthlyElectricityBill: 300,
        vehicleType: VehicleType.NONE,
        weeklyTravelDistance: 0,
        dietPreference: DietPreference.VEGAN,
      };

      const smallFamilyScore = CarbonService.calculateScore(smallFamilyInput);
      const largeFamilyScore = CarbonService.calculateScore(largeFamilyInput);

      // Small family electricity: (300 * 6.0 * 12 * 0.4) / 1 = 8640 kg = 8.64 tons
      // Large family electricity: (300 * 6.0 * 12 * 0.4) / 10 = 864 kg = 0.864 tons (rounds to 0.86)
      expect(largeFamilyScore).toBeLessThan(smallFamilyScore);
      expect(smallFamilyScore).toBe(10.14); // 1.5 diet + 8.64 energy
      expect(largeFamilyScore).toBe(2.36); // 1.5 diet + 0.86 energy
    });

    it("should calculate correctly for high electricity usage (boundary values)", () => {
      const input = {
        familySize: 2,
        monthlyElectricityBill: 2000, // Very high bill
        vehicleType: VehicleType.NONE,
        weeklyTravelDistance: 0,
        dietPreference: DietPreference.VEGAN,
      };

      const score = CarbonService.calculateScore(input);
      // Diet: 1500 kg
      // Energy: (2000 * 6.0 * 12 * 0.4) / 2 = 28800 kg = 28.8 tons
      // Total: 30.3 tons
      expect(score).toBe(30.3);
    });

    // Realism Sprint Test Additions:
    it("should evaluate balanced lifestyle correctly", () => {
      const input = {
        familySize: 4,
        monthlyElectricityBill: 150,
        vehicleType: VehicleType.HYBRID,
        weeklyTravelDistance: 120,
        dietPreference: DietPreference.BALANCED,
      };
      const score = CarbonService.calculateScore(input);
      // Diet: 2500 kg
      // Transport: 120 * 52 * 0.1 = 624 kg
      // Electricity: (150 * 6.0 * 12 * 0.4) / 4 = 1080 kg
      // Total: 4204 kg = 4.2 tons
      expect(score).toBe(4.2);
    });

    it("should evaluate heavy commuter correctly", () => {
      const input = {
        familySize: 2,
        monthlyElectricityBill: 100,
        vehicleType: VehicleType.DIESEL,
        weeklyTravelDistance: 500, // high commuter
        dietPreference: DietPreference.BALANCED,
      };
      const score = CarbonService.calculateScore(input);
      // Diet: 2500 kg
      // Transport: 500 * 52 * 0.22 = 5720 kg
      // Electricity: (100 * 6 * 12 * 0.4) / 2 = 1440 kg
      // Total: 2500 + 5720 + 1440 = 9660 kg = 9.66 tons
      expect(score).toBe(9.66);
    });

    it("should evaluate vegetarian household correctly", () => {
      const input = {
        familySize: 3,
        monthlyElectricityBill: 180,
        vehicleType: VehicleType.ELECTRIC,
        weeklyTravelDistance: 100,
        dietPreference: DietPreference.VEGETARIAN,
      };
      const score = CarbonService.calculateScore(input);
      // Diet: 1700 kg
      // Transport: 100 * 52 * 0.05 = 260 kg
      // Electricity: (180 * 6 * 12 * 0.4) / 3 = 1728 kg
      // Total: 1700 + 260 + 1728 = 3688 kg = 3.69 tons
      expect(score).toBe(3.69);
    });
  });
});

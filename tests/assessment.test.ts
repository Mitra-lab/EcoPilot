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

      // Small family electricity: (300 * 1.5 * 12 * 0.4) / 1 = 2160 kg = 2.16 tons
      // Large family electricity: (300 * 1.5 * 12 * 0.4) / 10 = 216 kg = 0.216 tons
      expect(largeFamilyScore).toBeLessThan(smallFamilyScore);
      expect(smallFamilyScore).toBe(3.66); // 1.5 diet + 2.16 energy
      expect(largeFamilyScore).toBe(1.72); // 1.5 diet + 0.22 energy
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
      // Energy: (2000 * 1.5 * 12 * 0.4) / 2 = 7200 kg = 7.2 tons
      // Total: 8.7 tons
      expect(score).toBe(8.7);
    });
  });
});

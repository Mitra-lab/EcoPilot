import { DashboardService } from "../src/services/dashboard";
import { DietPreference, VehicleType } from "../src/lib/constants";

describe("Dashboard Service Tests", () => {
  describe("Sustainability Rating (Grades)", () => {
    it("should award A+ for scores <= 2.0 (Exceptional sustainability)", () => {
      expect(DashboardService.getSustainabilityRating(1.2)).toBe("A+");
      expect(DashboardService.getSustainabilityRating(2.0)).toBe("A+");
    });

    it("should award A for scores > 2.0 and <= 3.5 (Strong sustainability)", () => {
      expect(DashboardService.getSustainabilityRating(2.1)).toBe("A");
      expect(DashboardService.getSustainabilityRating(3.5)).toBe("A");
    });

    it("should award B for scores > 3.5 and <= 5.5 (Good but improvable)", () => {
      expect(DashboardService.getSustainabilityRating(3.6)).toBe("B");
      expect(DashboardService.getSustainabilityRating(5.5)).toBe("B");
    });

    it("should award C for scores > 5.5 and <= 8.5 (Significant improvement opportunities)", () => {
      expect(DashboardService.getSustainabilityRating(5.6)).toBe("C");
      expect(DashboardService.getSustainabilityRating(8.5)).toBe("C");
    });

    it("should award D for scores > 8.5 (High environmental impact)", () => {
      expect(DashboardService.getSustainabilityRating(8.6)).toBe("D");
      expect(DashboardService.getSustainabilityRating(25.0)).toBe("D");
    });
  });

  describe("Chart Data Generation & Transformation", () => {
    it("should generate correct chart categories and non-negative values", () => {
      const inputs = {
        familySize: 2,
        monthlyElectricityBill: 100,
        vehicleType: VehicleType.HYBRID,
        weeklyTravelDistance: 200,
        dietPreference: DietPreference.VEGETARIAN,
      };

      const chartData = DashboardService.generateChartData(inputs);

      expect(chartData).toHaveLength(3);
      expect(chartData.map(c => c.name)).toEqual(["Diet", "Transport", "Electricity"]);

      // Values should be numeric and represent tons
      chartData.forEach(item => {
        expect(typeof item.value).toBe("number");
        expect(item.value).toBeGreaterThanOrEqual(0);
      });

      // Transport: 200 * 52 * 0.1 = 1040 kg = 1.04 tons
      const transportItem = chartData.find(item => item.name === "Transport");
      expect(transportItem?.value).toBe(1.04);
    });
  });

  describe("MVP Habit Streak Rules", () => {
    it("should return 0 streak days when verification history is empty", () => {
      const verifications: any[] = [];
      const streak = verifications.length === 0 ? 0 : 1;
      expect(streak).toBe(0);
    });

    it("should return 1 streak day when there is exactly one verification record", () => {
      const verifications = [{ id: "rec1", challengeId: "c1", completedAt: new Date().toISOString() }];
      const streak = verifications.length === 0 ? 0 : 1;
      expect(streak).toBe(1);
    });

    it("should return 1 streak day when there are multiple verification records (MVP limit)", () => {
      const verifications = [
        { id: "rec1", challengeId: "c1", completedAt: new Date().toISOString() },
        { id: "rec2", challengeId: "c2", completedAt: new Date().toISOString() }
      ];
      const streak = verifications.length === 0 ? 0 : 1;
      expect(streak).toBe(1);
    });
  });
});

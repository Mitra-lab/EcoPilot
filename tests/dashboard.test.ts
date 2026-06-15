import { DashboardService } from "../src/services/dashboard";
import { DietPreference, VehicleType } from "../src/lib/constants";

describe("Dashboard Service Tests", () => {
  describe("Sustainability Rating (Grades)", () => {
    it("should award A+ for scores <= 1.5", () => {
      expect(DashboardService.getSustainabilityRating(0.8)).toBe("A+");
      expect(DashboardService.getSustainabilityRating(1.5)).toBe("A+");
    });

    it("should award A for scores > 1.5 and <= 3.0", () => {
      expect(DashboardService.getSustainabilityRating(1.6)).toBe("A");
      expect(DashboardService.getSustainabilityRating(3.0)).toBe("A");
    });

    it("should award B for scores > 3.0 and <= 5.0", () => {
      expect(DashboardService.getSustainabilityRating(3.1)).toBe("B");
      expect(DashboardService.getSustainabilityRating(5.0)).toBe("B");
    });

    it("should award C for scores > 5.0 and <= 8.0", () => {
      expect(DashboardService.getSustainabilityRating(5.1)).toBe("C");
      expect(DashboardService.getSustainabilityRating(8.0)).toBe("C");
    });

    it("should award D for scores > 8.0", () => {
      expect(DashboardService.getSustainabilityRating(8.1)).toBe("D");
      expect(DashboardService.getSustainabilityRating(20.0)).toBe("D");
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
});

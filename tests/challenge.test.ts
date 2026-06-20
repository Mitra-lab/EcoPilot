import { ChallengeService } from "../src/services/challenge";
import { DietPreference, VehicleType } from "../src/lib/constants";

describe("ChallengeService Unit Tests", () => {
  describe("Highest Impact Category Mapping", () => {
    it("should classify diet as highest impact correctly", () => {
      const highest = ChallengeService.getHighestImpactCategory(3000, 1000, 1500);
      expect(highest).toBe("Diet");
    });

    it("should classify transport as highest impact correctly", () => {
      const highest = ChallengeService.getHighestImpactCategory(2000, 4000, 1500);
      expect(highest).toBe("Transport");
    });

    it("should classify electricity as highest impact correctly", () => {
      const highest = ChallengeService.getHighestImpactCategory(1500, 1000, 2500);
      expect(highest).toBe("Electricity");
    });
  });

  describe("Personalized Challenge Generation", () => {
    it("should generate Vegan diet challenges and NOT Meat-Free Monday", () => {
      const chs = ChallengeService.generateChallenges(3000, 1000, 1000, DietPreference.VEGAN);
      expect(chs[0].title).toBe("Organic Composter");
      chs.forEach(c => {
        expect(c.title).not.toContain("Meat-Free");
        expect(c.title).not.toContain("meat-free");
      });
    });

    it("should generate Vegetarian diet challenges", () => {
      const chs = ChallengeService.generateChallenges(3000, 1000, 1000, DietPreference.VEGETARIAN);
      expect(chs[0].title).toBe("Dairy Reduction Challenge");
    });

    it("should generate Balanced diet challenges", () => {
      const chs = ChallengeService.generateChallenges(3000, 1000, 1000, DietPreference.BALANCED);
      expect(chs[0].title).toBe("Meat-Free Monday");
    });

    it("should generate Meat Lover diet challenges", () => {
      const chs = ChallengeService.generateChallenges(3000, 1000, 1000, DietPreference.MEAT_LOVER);
      expect(chs[0].title).toBe("Red Meat Substitute");
    });

    it("should generate No Vehicle transit challenges and NOT recommend reducing driving", () => {
      const chs = ChallengeService.generateChallenges(1000, 3000, 1000, undefined, VehicleType.NONE);
      expect(chs[0].title).toBe("Walking Goal Target");
      chs.forEach(c => {
        expect(c.description).not.toContain("driving");
        expect(c.description).not.toContain("carpool");
      });
    });

    it("should generate Hybrid transit challenges", () => {
      const chs = ChallengeService.generateChallenges(1000, 3000, 1000, undefined, VehicleType.HYBRID, 100);
      expect(chs[0].title).toBe("Carpool Coalition");
    });

    it("should generate Gasoline transit challenges", () => {
      const chs = ChallengeService.generateChallenges(1000, 3000, 1000, undefined, VehicleType.GASOLINE_SMALL, 100);
      expect(chs[0].title).toBe("Walk Over Wheels");
    });

    it("should generate Low Electricity challenges", () => {
      const chs = ChallengeService.generateChallenges(100, 100, 800, undefined, undefined, undefined, 10, 1);
      expect(chs[0].title).toBe("Habit Maintainer");
    });

    it("should generate High Electricity challenges", () => {
      const chs = ChallengeService.generateChallenges(1000, 1000, 3000, undefined, undefined, undefined, 200, 1);
      expect(chs[0].title).toBe("AC Runtime Optimizer");
    });
  });
});

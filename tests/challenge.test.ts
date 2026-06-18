import { ChallengeService } from "../src/services/challenge";

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

  describe("Challenge Generation", () => {
    it("should generate diet challenges if diet is highest", () => {
      const challenges = ChallengeService.generateChallenges(3000, 1000, 1500);
      expect(challenges).toHaveLength(3);
      expect(challenges[0].id).toContain("diet-ch");
      expect(challenges[0].title).toBe("Meat-Free Monday");
    });

    it("should generate transport challenges if transport is highest", () => {
      const challenges = ChallengeService.generateChallenges(1000, 4000, 1500);
      expect(challenges).toHaveLength(3);
      expect(challenges[0].id).toContain("trans-ch");
      expect(challenges[0].title).toBe("Active Commuter");
    });

    it("should generate electricity challenges if electricity is highest", () => {
      const challenges = ChallengeService.generateChallenges(1000, 1000, 3000);
      expect(challenges).toHaveLength(3);
      expect(challenges[0].id).toContain("elec-ch");
      expect(challenges[0].title).toBe("Climate Thermostat Optimizer");
    });
  });

  describe("Point and Impact Allocations", () => {
    it("should allocate correct point and impact values for generated challenges", () => {
      const challenges = ChallengeService.generateChallenges(1000, 1000, 3000);
      
      // Target elec-ch-1 points: 75, impactScore: 40
      const ch1 = challenges.find(c => c.id === "elec-ch-1");
      expect(ch1?.greenPoints).toBe(75);
      expect(ch1?.impactScore).toBe(40);

      // Verify completion defaults to false
      challenges.forEach(ch => {
        expect(ch.completed).toBe(false);
      });
    });
  });
});

import { RewardsService, AchievementId } from "../src/services/rewards";
import { VerificationStatus } from "../src/lib/constants";

describe("RewardsService Unit Tests", () => {
  describe("Tier Transitions", () => {
    it("should classify tiers correctly based on points", () => {
      expect(RewardsService.getTier(50)).toBe("Eco Starter");
      expect(RewardsService.getTier(100)).toBe("Eco Starter");
      expect(RewardsService.getTier(150)).toBe("Green Explorer");
      expect(RewardsService.getTier(250)).toBe("Green Explorer");
      expect(RewardsService.getTier(300)).toBe("Eco Champion");
      expect(RewardsService.getTier(500)).toBe("Eco Champion");
      expect(RewardsService.getTier(600)).toBe("Planet Guardian");
    });

    it("should calculate correct progress percentage and needed offset for Next Tiers", () => {
      // Eco Starter case: points = 40. Target = 101. Progress = 40/101 = 40%
      const progress1 = RewardsService.getTierProgress(40);
      expect(progress1.currentTier).toBe("Eco Starter");
      expect(progress1.nextTier).toBe("Green Explorer");
      expect(progress1.pointsNeeded).toBe(61);
      expect(progress1.progressPercentage).toBe(40);

      // Green Explorer case: points = 160. range = 150. pointsInTier = 60. Progress = 60/150 = 40%
      const progress2 = RewardsService.getTierProgress(160);
      expect(progress2.currentTier).toBe("Green Explorer");
      expect(progress2.nextTier).toBe("Eco Champion");
      expect(progress2.pointsNeeded).toBe(91);
      expect(progress2.progressPercentage).toBe(40);

      // Planet Guardian max tier case
      const progress3 = RewardsService.getTierProgress(600);
      expect(progress3.currentTier).toBe("Planet Guardian");
      expect(progress3.nextTier).toBeNull();
      expect(progress3.pointsNeeded).toBe(0);
      expect(progress3.progressPercentage).toBe(100);
    });
  });

  describe("Badge Unlocking Rules", () => {
    it("should unlock FIRST_VERIFIED_ACTION badge when total completed is >= 1", () => {
      const mockVerifications = [
        {
          id: "ver-1",
          challengeId: "ch-1",
          challengeTitle: "Test",
          notes: "More than twenty characters verification text.",
          status: VerificationStatus.VERIFIED,
          pointsAwarded: 20,
          createdAt: new Date().toISOString(),
        },
      ];
      const badges = RewardsService.checkAchievements(20, mockVerifications, "B");
      const firstBadge = badges.find(b => b.id === AchievementId.FIRST_VERIFIED_ACTION);
      expect(firstBadge?.unlocked).toBe(true);

      const threeBadge = badges.find(b => b.id === AchievementId.THREE_CHALLENGES_COMPLETED);
      expect(threeBadge?.unlocked).toBe(false);
    });

    it("should unlock GRADE_A and GRADE_A_PLUS appropriately", () => {
      const badgesA = RewardsService.checkAchievements(120, [], "A");
      expect(badgesA.find(b => b.id === AchievementId.GRADE_A)?.unlocked).toBe(true);
      expect(badgesA.find(b => b.id === AchievementId.GRADE_A_PLUS)?.unlocked).toBe(false);

      const badgesAPlus = RewardsService.checkAchievements(120, [], "A+");
      expect(badgesAPlus.find(b => b.id === AchievementId.GRADE_A_PLUS)?.unlocked).toBe(true);
    });
  });
});

import { VerificationRecord } from "./verification";

export enum AchievementId {
  FIRST_VERIFIED_ACTION = "first_verified_action",
  THREE_CHALLENGES_COMPLETED = "three_challenges_completed",
  HUNDRED_POINTS_EARNED = "hundred_points_earned",
  GRADE_A = "grade_a",
  GRADE_A_PLUS = "grade_a_plus",
}

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  badgeEmoji: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface TierInfo {
  currentTier: string;
  nextTier: string | null;
  pointsNeeded: number;
  progressPercentage: number;
}

export class RewardsService {
  /**
   * Translates point score into tier names
   */
  static getTier(points: number): string {
    if (points <= 100) return "Eco Starter";
    if (points <= 250) return "Green Explorer";
    if (points <= 500) return "Eco Champion";
    return "Planet Guardian";
  }

  /**
   * Calculates points progress toward the next tier
   */
  static getTierProgress(points: number): TierInfo {
    const tier = this.getTier(points);

    if (tier === "Eco Starter") {
      const needed = 101 - points;
      const progress = Math.min(Math.round((points / 101) * 100), 100);
      return { currentTier: tier, nextTier: "Green Explorer", pointsNeeded: needed, progressPercentage: progress };
    }
    if (tier === "Green Explorer") {
      const range = 250 - 100;
      const pointsInTier = points - 100;
      const needed = 251 - points;
      const progress = Math.min(Math.round((pointsInTier / range) * 100), 100);
      return { currentTier: tier, nextTier: "Eco Champion", pointsNeeded: needed, progressPercentage: progress };
    }
    if (tier === "Eco Champion") {
      const range = 500 - 250;
      const pointsInTier = points - 250;
      const needed = 501 - points;
      const progress = Math.min(Math.round((pointsInTier / range) * 100), 100);
      return { currentTier: tier, nextTier: "Planet Guardian", pointsNeeded: needed, progressPercentage: progress };
    }

    // Planet Guardian
    return { currentTier: tier, nextTier: null, pointsNeeded: 0, progressPercentage: 100 };
  }

  /**
   * Evaluates and returns unlocked achievement badges
   */
  static checkAchievements(
    points: number,
    completedVerifications: VerificationRecord[],
    sustainabilityGrade: string
  ): Achievement[] {
    const totalCompleted = completedVerifications.length;

    const achievementsList: Achievement[] = [
      {
        id: AchievementId.FIRST_VERIFIED_ACTION,
        title: "First Steps",
        description: "Submit your first verified sustainability challenge.",
        badgeEmoji: "🌱",
        unlocked: totalCompleted >= 1,
      },
      {
        id: AchievementId.THREE_CHALLENGES_COMPLETED,
        title: "Eco Habit Builder",
        description: "Verify and complete at least 3 sustainability challenges.",
        badgeEmoji: "⚡",
        unlocked: totalCompleted >= 3,
      },
      {
        id: AchievementId.HUNDRED_POINTS_EARNED,
        title: "Century Saver",
        description: "Accumulate at least 100 Green Points.",
        badgeEmoji: "⭐",
        unlocked: points >= 100,
      },
      {
        id: AchievementId.GRADE_A,
        title: "Green Leader",
        description: "Reach Sustainability Grade A.",
        badgeEmoji: "🟢",
        unlocked: sustainabilityGrade === "A" || sustainabilityGrade === "A+",
      },
      {
        id: AchievementId.GRADE_A_PLUS,
        title: "Planet Guardian",
        description: "Reach Sustainability Grade A+.",
        badgeEmoji: "👑",
        unlocked: sustainabilityGrade === "A+",
      },
    ];

    return achievementsList;
  }

  /**
   * Saves unlocked achievements to local storage history list.
   */
  static syncSavedAchievements(achievements: Achievement[]): void {
    if (typeof window === "undefined") return;
    const unlockedIds = achievements.filter((a) => a.unlocked).map((a) => a.id);
    localStorage.setItem("ecopilot_unlocked_achievements", JSON.stringify(unlockedIds));
  }
}

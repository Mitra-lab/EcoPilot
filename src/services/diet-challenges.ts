import { ChallengeDifficulty, VerificationLevel, DietPreference } from "@/lib/constants";
import { UserChallenge } from "./challenge-types";

/**
 * Returns personalized diet challenges based on dietary preference.
 */
export function getDietChallenges(dietPreference?: DietPreference): UserChallenge[] {
  if (dietPreference === DietPreference.VEGAN) {
    return [
      {
        id: "diet-ch-4",
        title: "Organic Composter",
        description: "Compost food waste and organic scraps for 7 consecutive days.",
        difficulty: ChallengeDifficulty.MEDIUM,
        impactLevel: "High",
        impactScore: 30,
        greenPoints: 70,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "diet-ch-5",
        title: "Local Farmer Sourcing",
        description:
          "Buy local, seasonal produce this week from nearby agricultural hubs to cut food miles.",
        difficulty: ChallengeDifficulty.EASY,
        impactLevel: "Low",
        impactScore: 10,
        greenPoints: 20,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "diet-ch-6",
        title: "Zero Packaged Foods",
        description:
          "Reduce packaged and processed food purchases by opting for bulk fresh ingredients.",
        difficulty: ChallengeDifficulty.EASY,
        impactLevel: "Medium",
        impactScore: 15,
        greenPoints: 30,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
    ];
  }

  if (dietPreference === DietPreference.VEGETARIAN) {
    return [
      {
        id: "diet-ch-7",
        title: "Dairy Reduction Challenge",
        description:
          "Reduce dairy usage by substituting dairy milk or butter with plant alternatives.",
        difficulty: ChallengeDifficulty.MEDIUM,
        impactLevel: "High",
        impactScore: 35,
        greenPoints: 70,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "diet-ch-8",
        title: "Seasonal Produce Challenge",
        description:
          "Opt for seasonal fruits and vegetables to reduce global shipping emissions.",
        difficulty: ChallengeDifficulty.EASY,
        impactLevel: "Low",
        impactScore: 10,
        greenPoints: 20,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "diet-ch-9",
        title: "Food Waste Reduction",
        description:
          "Minimize household food waste by maintaining custom grocery list boundaries.",
        difficulty: ChallengeDifficulty.EASY,
        impactLevel: "Medium",
        impactScore: 15,
        greenPoints: 30,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
    ];
  }

  if (dietPreference === DietPreference.BALANCED) {
    return [
      {
        id: "diet-ch-1",
        title: "Meat-Free Monday",
        description: "Consume entirely vegetarian or vegan meals for one full day.",
        difficulty: ChallengeDifficulty.EASY,
        impactLevel: "Medium",
        impactScore: 15,
        greenPoints: 30,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "diet-ch-2",
        title: "Meal Prep Zero-Waste",
        description:
          "Plan all weekly groceries and ensure zero food waste by storing leftovers correctly.",
        difficulty: ChallengeDifficulty.EASY,
        impactLevel: "Low",
        impactScore: 5,
        greenPoints: 15,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "diet-ch-3",
        title: "Plant-Powered Lunches",
        description: "Enjoy fully plant-based (vegan) lunches for 3 consecutive days.",
        difficulty: ChallengeDifficulty.MEDIUM,
        impactLevel: "High",
        impactScore: 35,
        greenPoints: 70,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
    ];
  }

  // Default: Meat Lover case
  return [
    {
      id: "diet-ch-10",
      title: "Red Meat Substitute",
      description:
        "Replace at least 2 red-meat meals this week with chicken, fish, or plant items.",
      difficulty: ChallengeDifficulty.MEDIUM,
      impactLevel: "High",
      impactScore: 40,
      greenPoints: 75,
      verificationLevel: VerificationLevel.SELF_VERIFIED,
      completed: false,
      status: "not_started",
      createdAt: new Date().toISOString(),
    },
    {
      id: "diet-ch-11",
      title: "Vegetarian Dinner Try",
      description: "Cook and eat one fully vegetarian dinner meal.",
      difficulty: ChallengeDifficulty.EASY,
      impactLevel: "Low",
      impactScore: 10,
      greenPoints: 20,
      verificationLevel: VerificationLevel.SELF_VERIFIED,
      completed: false,
      status: "not_started",
      createdAt: new Date().toISOString(),
    },
    {
      id: "diet-ch-12",
      title: "Meat Consumption Audit",
      description: "Track and document your meat consumption reduction over the week.",
      difficulty: ChallengeDifficulty.EASY,
      impactLevel: "Medium",
      impactScore: 15,
      greenPoints: 30,
      verificationLevel: VerificationLevel.SELF_VERIFIED,
      completed: false,
      status: "not_started",
      createdAt: new Date().toISOString(),
    },
  ];
}

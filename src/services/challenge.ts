import { ChallengeDifficulty, VerificationLevel, VerificationStatus } from "@/lib/constants";
import { Challenge } from "@/types";

export interface UserChallenge extends Challenge {
  completed: boolean;
  impactLevel: "Low" | "Medium" | "High";
  status: VerificationStatus | "not_started";
}

export class ChallengeService {
  /**
   * Identifies the highest carbon category of the user.
   */
  static getHighestImpactCategory(
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number
  ): "Diet" | "Transport" | "Electricity" {
    const maxVal = Math.max(dietEmissions, travelEmissions, electricityEmissions);
    if (maxVal === electricityEmissions) return "Electricity";
    if (maxVal === travelEmissions) return "Transport";
    return "Diet";
  }

  /**
   * Generates weekly challenges targeting the user's highest emission source.
   */
  static generateChallenges(
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number
  ): UserChallenge[] {
    const highestCategory = this.getHighestImpactCategory(dietEmissions, travelEmissions, electricityEmissions);

    if (highestCategory === "Electricity") {
      return [
        {
          id: "elec-ch-1",
          title: "Climate Thermostat Optimizer",
          description: "Keep your air conditioner set to 25°C (78°F) or warmer for the next 3 days.",
          difficulty: ChallengeDifficulty.MEDIUM,
          impactLevel: "High",
          impactScore: 40, // kg CO2
          greenPoints: 75,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "elec-ch-2",
          title: "Phantom Power Hunt",
          description: "Find and unplug at least 5 standby devices (chargers, televisions, gaming consoles) when not in use.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Low",
          impactScore: 8,
          greenPoints: 20,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "elec-ch-3",
          title: "Cold Water Wash",
          description: "Wash all laundry loads using cold water settings this week.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Medium",
          impactScore: 12,
          greenPoints: 30,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    if (highestCategory === "Transport") {
      return [
        {
          id: "trans-ch-1",
          title: "Active Commuter",
          description: "Walk, jog, or cycle for all short trips under 2 km this week instead of driving.",
          difficulty: ChallengeDifficulty.MEDIUM,
          impactLevel: "High",
          impactScore: 45,
          greenPoints: 80,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "trans-ch-2",
          title: "Transit Day Champion",
          description: "Replace at least one full day of driving commutes with public bus or train transits.",
          difficulty: ChallengeDifficulty.MEDIUM,
          impactLevel: "High",
          impactScore: 50,
          greenPoints: 90,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "trans-ch-3",
          title: "Carpool Coalition",
          description: "Organize or participate in a carpool ride share with a colleague or friend for one commute.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Medium",
          impactScore: 20,
          greenPoints: 40,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    // Default: Diet highest
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
        description: "Plan all weekly groceries and ensure zero food waste by storing leftovers correctly.",
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
}

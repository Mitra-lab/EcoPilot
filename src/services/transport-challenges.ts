import { ChallengeDifficulty, VerificationLevel, VehicleType } from "@/lib/constants";
import { UserChallenge } from "./challenge-types";

/**
 * Returns personalized transport challenges based on vehicle type and travel distance.
 */
export function getTransportChallenges(
  vehicleType?: VehicleType,
  weeklyTravelDistance?: number
): UserChallenge[] {
  if (vehicleType === VehicleType.NONE || (weeklyTravelDistance || 0) <= 0) {
    return [
      {
        id: "trans-ch-4",
        title: "Walking Goal Target",
        description:
          "Maintain active walking goals by targeting at least 8,000 steps daily.",
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
        id: "trans-ch-5",
        title: "Bike Commute Challenge",
        description:
          "Use a bicycle or active walking options for mid-range local commutes this week.",
        difficulty: ChallengeDifficulty.MEDIUM,
        impactLevel: "Medium",
        impactScore: 25,
        greenPoints: 50,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "trans-ch-6",
        title: "Sustainable Commuter Streak",
        description:
          "Commit to active walking and public transit targets for 5 consecutive days.",
        difficulty: ChallengeDifficulty.MEDIUM,
        impactLevel: "High",
        impactScore: 50,
        greenPoints: 80,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
    ];
  }

  if (vehicleType === VehicleType.HYBRID || vehicleType === VehicleType.ELECTRIC) {
    return [
      {
        id: "trans-ch-7",
        title: "Carpool Coalition",
        description:
          "Carpool twice this week with co-workers or neighbors to optimize per-car loads.",
        difficulty: ChallengeDifficulty.MEDIUM,
        impactLevel: "High",
        impactScore: 35,
        greenPoints: 60,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "trans-ch-8",
        title: "Route Optimizer",
        description:
          "Optimize driving routes to combine multiple errands into one trip and reduce mileage.",
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
        id: "trans-ch-9",
        title: "Trip Reduction Challenge",
        description:
          "Reduce unnecessary vehicle trips by walking or cycling for local errands.",
        difficulty: ChallengeDifficulty.MEDIUM,
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

  // Default: Gasoline / Diesel vehicles
  return [
    {
      id: "trans-ch-1",
      title: "Walk Over Wheels",
      description: "Replace at least one driving trip under 2 km with walking.",
      difficulty: ChallengeDifficulty.EASY,
      impactLevel: "Low",
      impactScore: 15,
      greenPoints: 30,
      verificationLevel: VerificationLevel.SELF_VERIFIED,
      completed: false,
      status: "not_started",
      createdAt: new Date().toISOString(),
    },
    {
      id: "trans-ch-2",
      title: "Transit Day Champion",
      description:
        "Use public transportation (bus/train) instead of driving for one full day.",
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
      id: "trans-ch-3",
      title: "Driving Reduction Challenge",
      description:
        "Reduce weekly vehicle mileage and driving by 10% through consolidated routes.",
      difficulty: ChallengeDifficulty.MEDIUM,
      impactLevel: "High",
      impactScore: 40,
      greenPoints: 75,
      verificationLevel: VerificationLevel.SELF_VERIFIED,
      completed: false,
      status: "not_started",
      createdAt: new Date().toISOString(),
    },
  ];
}

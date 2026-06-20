import { ChallengeDifficulty, VerificationLevel } from "@/lib/constants";
import { UserChallenge } from "./challenge-types";

/**
 * Returns personalized electricity challenges based on per-capita usage level.
 */
export function getElectricityChallenges(
  electricityEmissions: number,
  monthlyElectricityBill?: number,
  familySize?: number
): UserChallenge[] {
  const perCapitaElectricity =
    familySize && familySize > 0
      ? (monthlyElectricityBill || 0) / familySize
      : (monthlyElectricityBill || 0);
  const isHighUsage = perCapitaElectricity > 50 || electricityEmissions > 1200;

  if (isHighUsage) {
    return [
      {
        id: "elec-ch-1",
        title: "AC Runtime Optimizer",
        description:
          "Reduce AC runtime by 2 hours daily or keep AC at 25°C for the next 3 days.",
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
        id: "elec-ch-2",
        title: "Power-Down Challenge",
        description:
          "Unplug standby devices and turn off all idle appliances when not in use.",
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
        title: "Appliance Efficiency Run",
        description:
          "Use appliances only on off-peak energy periods to minimize peak power draw.",
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

  return [
    {
      id: "elec-ch-4",
      title: "Habit Maintainer",
      description:
        "Maintain your efficient low-energy habits and monitor household electricity meter readings.",
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
      id: "elec-ch-5",
      title: "Appliance Monitor",
      description:
        "Track energy consumption of active household appliances using a smart plug.",
      difficulty: ChallengeDifficulty.EASY,
      impactLevel: "Low",
      impactScore: 6,
      greenPoints: 20,
      verificationLevel: VerificationLevel.SELF_VERIFIED,
      completed: false,
      status: "not_started",
      createdAt: new Date().toISOString(),
    },
    {
      id: "elec-ch-6",
      title: "Phantom Power Auditor",
      description:
        "Conduct a standby phantom energy audit and document power settings.",
      difficulty: ChallengeDifficulty.MEDIUM,
      impactLevel: "Medium",
      impactScore: 10,
      greenPoints: 30,
      verificationLevel: VerificationLevel.SELF_VERIFIED,
      completed: false,
      status: "not_started",
      createdAt: new Date().toISOString(),
    },
  ];
}

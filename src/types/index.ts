import {
  DietPreference,
  VehicleType,
  ChallengeDifficulty,
  VerificationLevel,
  VerificationStatus,
  BadgeType,
} from "@/lib/constants";

export interface User {
  id: string;
  email: string;
  fullName?: string;
  createdAt: string;
}

export interface Assessment {
  id: string;
  userId: string;
  familySize: number;
  monthlyElectricityBill: number; // in local currency / units
  vehicleType: VehicleType;
  weeklyTravelDistance: number; // in km
  dietPreference: DietPreference;
  carbonScore: number; // calculated annual tons of CO2
  summary: string;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  impactScore: number; // estimated carbon reduction impact (e.g. kg CO2 saved)
  greenPoints: number; // reward points
  verificationLevel: VerificationLevel;
  createdAt: string;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  userId: string;
  evidenceText?: string;
  evidenceFileUrl?: string;
  verificationStatus: VerificationStatus;
  aiFeedback?: string;
  verifiedAt?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  userId: string;
  totalPoints: number;
  badges: BadgeType[];
  streakDays: number;
  lastCompletedDate?: string;
  updatedAt: string;
}

export interface DashboardMetrics {
  carbonScore: number;
  greenPoints: number;
  challengesCompletedCount: number;
  streakDays: number;
  badges: BadgeType[];
  estimatedImpactReduction: number; // in kg CO2
}

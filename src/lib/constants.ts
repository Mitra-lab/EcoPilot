/**
 * EcoPilot Application Constants & Enums
 */

export enum DietPreference {
  VEGAN = "vegan",
  VEGETARIAN = "vegetarian",
  PESCATARIAN = "pescatarian",
  MEAT_LOVER = "meat_lover",
  BALANCED = "balanced",
}

export enum VehicleType {
  NONE = "none",
  ELECTRIC = "electric",
  HYBRID = "hybrid",
  GASOLINE_SMALL = "gasoline_small",
  GASOLINE_LARGE = "gasoline_large",
  DIESEL = "diesel",
}

export enum ChallengeDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum VerificationLevel {
  SELF_VERIFIED = "self_verified",
  AI_VERIFIED = "ai_verified",
  EVIDENCE_VERIFIED = "evidence_verified",
}

export enum VerificationStatus {
  VERIFIED = "verified",
  LIKELY_VERIFIED = "likely_verified",
  NEEDS_MORE_EVIDENCE = "needs_more_evidence",
  PENDING = "pending",
  FAILED = "failed",
}

export enum BadgeType {
  GREEN_STARTER = "green_starter",
  ECO_EXPLORER = "eco_explorer",
  CARBON_CHAMPION = "carbon_champion",
  CLIMATE_HERO = "climate_hero",
}

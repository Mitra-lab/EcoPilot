/**
 * EcoPilot Application Constants & Enums
 *
 * Central location for all enumerations, domain constants, and configuration
 * thresholds used across services and components. Import from here rather
 * than duplicating literal values in individual modules.
 */

/** Annual diet emission values (kg CO₂/yr) keyed by preference. */
export const DIET_EMISSIONS_KG: Record<string, number> = {
  vegan: 1500,
  vegetarian: 1700,
  pescatarian: 2000,
  balanced: 2500,
  meat_lover: 3300,
};

/** Emission factor (kg CO₂/km) for each vehicle type. */
export const VEHICLE_EMISSION_FACTORS: Record<string, number> = {
  none: 0,
  electric: 0.05,
  hybrid: 0.1,
  gasoline_small: 0.17,
  gasoline_large: 0.27,
  diesel: 0.22,
};

/** Per-capita monthly electricity bill threshold (currency units) above which usage is considered high. */
export const HIGH_ELECTRICITY_BILL_THRESHOLD = 50;

/** Annual electricity emissions (kg CO₂/yr) threshold above which usage is considered high. */
export const HIGH_ELECTRICITY_EMISSIONS_THRESHOLD = 1200;

/** Gemini API request timeout in milliseconds. */
export const GEMINI_TIMEOUT_MS = 8000;

/** Carbon chart brand colors for Diet, Transport, and Electricity categories. */
export const CHART_COLORS = {
  diet: "#10b981",
  transport: "#3b82f6",
  electricity: "#f59e0b",
} as const;

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

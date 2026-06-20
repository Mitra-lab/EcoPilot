/**
 * Shared types for the AI recommendation system.
 */
export interface Recommendation {
  action: string;
  impact: "High" | "Medium" | "Low";
  difficulty: "Easy" | "Medium" | "Hard";
  potentialReduction: string;
}

/** Raw parsed item shape from Gemini JSON response. */
export interface RawRecommendationItem {
  action?: unknown;
  impact?: unknown;
  difficulty?: unknown;
  potentialReduction?: unknown;
}

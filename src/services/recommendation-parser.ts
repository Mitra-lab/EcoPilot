import { Recommendation, RawRecommendationItem } from "./recommendation-types";

/**
 * Parses and validates the Gemini model string response into typed Recommendation objects.
 * Strips any markdown code fence formatting before parsing.
 */
export function parseRecommendationsResponse(text: string): Recommendation[] {
  const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const parsed: unknown = JSON.parse(cleanedText);

  if (!Array.isArray(parsed)) {
    throw new Error("Invalid response format: Expected JSON Array");
  }

  return parsed.map((item: RawRecommendationItem) => {
    if (!item.action || !item.impact || !item.difficulty || !item.potentialReduction) {
      throw new Error("Missing required recommendation fields");
    }
    return {
      action: String(item.action),
      impact: (["High", "Medium", "Low"] as const).includes(item.impact as "High" | "Medium" | "Low")
        ? (item.impact as Recommendation["impact"])
        : "Medium",
      difficulty: (["Easy", "Medium", "Hard"] as const).includes(item.difficulty as "Easy" | "Medium" | "Hard")
        ? (item.difficulty as Recommendation["difficulty"])
        : "Medium",
      potentialReduction: String(item.potentialReduction),
    };
  });
}

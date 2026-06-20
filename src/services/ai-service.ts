import { ai, DEFAULT_MODEL } from "@/lib/gemini";
import { DietPreference, VehicleType, GEMINI_TIMEOUT_MS } from "@/lib/constants";
import { Recommendation } from "./recommendation-types";
import { buildCoachPrompt } from "./prompt-builder";
import { parseRecommendationsResponse } from "./recommendation-parser";
import { getFallbackRecommendations } from "./fallback-engine";

export class AIService {
  /**
   * Generates structured prompt for Gemini coach recommendations.
   * Delegates to prompt-builder module.
   */
  static generateCoachPrompt(
    carbonScore: number,
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number,
    grade: string,
    dietPreference?: DietPreference,
    vehicleType?: VehicleType,
    weeklyTravelDistance?: number,
    monthlyElectricityBill?: number,
    familySize?: number
  ): string {
    return buildCoachPrompt(
      carbonScore,
      dietEmissions,
      travelEmissions,
      electricityEmissions,
      grade,
      dietPreference,
      vehicleType,
      weeklyTravelDistance,
      monthlyElectricityBill,
      familySize
    );
  }

  /**
   * Parses the Gemini model string response safely.
   * Delegates to recommendation-parser module.
   */
  static parseRecommendationsResponse(text: string): Recommendation[] {
    return parseRecommendationsResponse(text);
  }

  /**
   * Dynamic fallback recommendations when Gemini is offline.
   * Delegates to fallback-engine module.
   */
  static getFallbackRecommendations(
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number,
    dietPreference?: DietPreference,
    vehicleType?: VehicleType,
    weeklyTravelDistance?: number,
    monthlyElectricityBill?: number,
    familySize?: number
  ): Recommendation[] {
    return getFallbackRecommendations(
      dietEmissions,
      travelEmissions,
      electricityEmissions,
      dietPreference,
      vehicleType,
      weeklyTravelDistance,
      monthlyElectricityBill,
      familySize
    );
  }

  /**
   * Generates recommendations based on carbon score and inputs.
   * Uses Gemini when available; falls back to local recommendation engine on failure.
   */
  static async generateRecommendations(
    carbonScore: number,
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number,
    grade: string,
    dietPreference?: DietPreference,
    vehicleType?: VehicleType,
    weeklyTravelDistance?: number,
    monthlyElectricityBill?: number,
    familySize?: number
  ): Promise<Recommendation[]> {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === "") {
      console.info("Gemini API key not configured. Using local recommendation engine.");
      return getFallbackRecommendations(
        dietEmissions,
        travelEmissions,
        electricityEmissions,
        dietPreference,
        vehicleType,
        weeklyTravelDistance,
        monthlyElectricityBill,
        familySize
      );
    }

    const prompt = buildCoachPrompt(
      carbonScore,
      dietEmissions,
      travelEmissions,
      electricityEmissions,
      grade,
      dietPreference,
      vehicleType,
      weeklyTravelDistance,
      monthlyElectricityBill,
      familySize
    );

    try {
      const model = ai.getGenerativeModel({ model: DEFAULT_MODEL });

      const generatePromise = model.generateContent(prompt);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API request timed out")), GEMINI_TIMEOUT_MS)
      );

      const result = await Promise.race([generatePromise, timeoutPromise]);
      const responseText = result.response.text();
      return parseRecommendationsResponse(responseText);
    } catch (error) {
      console.warn(
        "AI recommendations model generation failed. Activating local fallback engine.",
        error
      );
      return getFallbackRecommendations(
        dietEmissions,
        travelEmissions,
        electricityEmissions,
        dietPreference,
        vehicleType,
        weeklyTravelDistance,
        monthlyElectricityBill,
        familySize
      );
    }
  }

  /**
   * Evaluates evidence text and/or file for challenge verification.
   * @throws Not yet implemented — reserved for future Gemini verification integration.
   */
  static async verifySubmission(
    _challengeDescription: string,
    _evidenceText?: string,
    _evidenceFileUrl?: string
  ): Promise<{ status: string; feedback: string }> {
    throw new Error("Method not implemented.");
  }
}

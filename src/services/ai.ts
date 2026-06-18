import { ai, DEFAULT_MODEL } from "@/lib/gemini";

export interface Recommendation {
  action: string;
  impact: "High" | "Medium" | "Low";
  difficulty: "Easy" | "Medium" | "Hard";
  potentialReduction: string;
}

export class AIService {
  /**
   * Generates structured prompt for Gemini coach recommendations
   */
  static generateCoachPrompt(
    carbonScore: number,
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number,
    grade: string
  ): string {
    return `You are an AI Sustainability Coach for EcoPilot. Generate 3 highly personalized, actionable recommendations for a user with the following profile:
- Carbon Score: ${carbonScore} tons CO₂/yr (Sustainability Grade: ${grade})
- Diet Emissions: ${dietEmissions} kg CO₂/yr
- Travel Emissions: ${travelEmissions} kg CO₂/yr
- Electricity Emissions: ${electricityEmissions} kg CO₂/yr

Format your response as a valid JSON array of exactly 3 objects. Do not include markdown code fence formatting.
Example format:
[
  {
    "action": "Recommendation action text",
    "impact": "High",
    "difficulty": "Easy",
    "potentialReduction": "Estimated kg reduction (e.g., 250 kg CO₂/yr)"
  }
]

Ensure impact values are limited to "High", "Medium", or "Low". Difficulty values must be "Easy", "Medium", or "Hard".
Provide context-specific advice based on their highest emission category.`;
  }

  /**
   * Parses the Gemini model string response safely.
   */
  static parseRecommendationsResponse(text: string): Recommendation[] {
    // Strip possible code fence syntax
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanedText);
    
    if (!Array.isArray(parsed)) {
      throw new Error("Invalid response format: Expected JSON Array");
    }

    return parsed.map((item: any) => {
      if (!item.action || !item.impact || !item.difficulty || !item.potentialReduction) {
        throw new Error("Missing required recommendation fields");
      }
      return {
        action: String(item.action),
        impact: ["High", "Medium", "Low"].includes(item.impact) ? item.impact : "Medium",
        difficulty: ["Easy", "Medium", "Hard"].includes(item.difficulty) ? item.difficulty : "Medium",
        potentialReduction: String(item.potentialReduction),
      };
    });
  }

  /**
   * Dynamic fallback recommendations when Gemini is offline.
   */
  static getFallbackRecommendations(
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number
  ): Recommendation[] {
    // Identify highest emissions category
    const maxVal = Math.max(dietEmissions, travelEmissions, electricityEmissions);

    if (maxVal === electricityEmissions) {
      return [
        {
          action: "Adjust AC/Heating thermostat by 1°C to reduce grid load.",
          impact: "Medium",
          difficulty: "Easy",
          potentialReduction: "250 kg CO₂/yr",
        },
        {
          action: "Transition home light fixtures to high-efficiency LED bulbs.",
          impact: "High",
          difficulty: "Medium",
          potentialReduction: "450 kg CO₂/yr",
        },
        {
          action: "Configure standby power settings and unplug idle electronics.",
          impact: "Low",
          difficulty: "Easy",
          potentialReduction: "80 kg CO₂/yr",
        },
      ];
    }

    if (maxVal === travelEmissions) {
      return [
        {
          action: "Adopt public transit or carpooling for weekly commutes.",
          impact: "High",
          difficulty: "Medium",
          potentialReduction: "800 kg CO₂/yr",
        },
        {
          action: "Plan and combine multi-stop utility trips to minimize mileage.",
          impact: "Medium",
          difficulty: "Easy",
          potentialReduction: "300 kg CO₂/yr",
        },
        {
          action: "Perform monthly tire inflation checks to optimize fuel efficiency.",
          impact: "Low",
          difficulty: "Easy",
          potentialReduction: "120 kg CO₂/yr",
        },
      ];
    }

    // Default: Diet emissions highest
    return [
      {
        action: "Incorporate at least two dedicated meat-free days into your week.",
        impact: "Medium",
        difficulty: "Easy",
        potentialReduction: "400 kg CO₂/yr",
      },
      {
        action: "Reduce household food waste by using grocery lists and batch cooking.",
        impact: "Low",
        difficulty: "Easy",
        potentialReduction: "150 kg CO₂/yr",
      },
      {
        action: "Shift dinner meals toward plant-based recipes and seasonal vegetables.",
        impact: "High",
        difficulty: "Medium",
        potentialReduction: "900 kg CO₂/yr",
      },
    ];
  }

  /**
   * Generates recommendations based on carbon score and inputs.
   */
  static async generateRecommendations(
    carbonScore: number,
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number,
    grade: string
  ): Promise<Recommendation[]> {
    const prompt = this.generateCoachPrompt(
      carbonScore,
      dietEmissions,
      travelEmissions,
      electricityEmissions,
      grade
    );

    try {
      // Implement fetch timeout handling
      const model = ai.getGenerativeModel({ model: DEFAULT_MODEL });
      
      const generatePromise = model.generateContent(prompt);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API request timed out")), 8000)
      );

      const result = await Promise.race([generatePromise, timeoutPromise]);
      const responseText = result.response.text();
      return this.parseRecommendationsResponse(responseText);
    } catch (error) {
      console.warn("AI recommendations model generation failed. Activating local fallback engine.", error);
      return this.getFallbackRecommendations(dietEmissions, travelEmissions, electricityEmissions);
    }
  }

  /**
   * Evaluates evidence text and/or file for challenge verification.
   */
  static async verifySubmission(
    challengeDescription: string,
    evidenceText?: string,
    evidenceFileUrl?: string
  ): Promise<{ status: string; feedback: string }> {
    // Placeholder signature: Implementation of Gemini prompt to happen in a future sprint
    throw new Error("Method not implemented.");
  }
}

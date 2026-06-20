import { ai, DEFAULT_MODEL } from "@/lib/gemini";
import { DietPreference, VehicleType } from "@/lib/constants";

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
    grade: string,
    dietPreference?: DietPreference,
    vehicleType?: VehicleType,
    weeklyTravelDistance?: number,
    monthlyElectricityBill?: number,
    familySize?: number
  ): string {
    return `You are an AI Sustainability Coach for EcoPilot. Generate 3 highly personalized, actionable recommendations for a user with the following profile:
- Carbon Score: ${carbonScore} tons CO₂/yr (Sustainability Grade: ${grade})
- Diet Emissions: ${dietEmissions} kg CO₂/yr (Preference: ${dietPreference || "balanced"})
- Travel Emissions: ${travelEmissions} kg CO₂/yr (Vehicle: ${vehicleType || "none"}, Weekly distance: ${weeklyTravelDistance || 0} km)
- Electricity Emissions: ${electricityEmissions} kg CO₂/yr (Monthly bill: ${monthlyElectricityBill || 0}, Family size: ${familySize || 1})

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
Provide context-specific advice based on their highest emission category. If the user is Vegan, do NOT recommend reducing meat consumption or Meat-Free Mondays. If they have No Vehicle, do NOT recommend reducing driving or checking tire pressures. If they have Low Electricity usage, recommend maintaining habits and monitoring consumption.`;
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
    electricityEmissions: number,
    dietPreference?: DietPreference,
    vehicleType?: VehicleType,
    weeklyTravelDistance?: number,
    monthlyElectricityBill?: number,
    familySize?: number
  ): Recommendation[] {
    // Identify highest emissions category
    const maxVal = Math.max(dietEmissions, travelEmissions, electricityEmissions);

    // 1. Electricity Logic
    if (maxVal === electricityEmissions) {
      const perCapitaElectricity = familySize && familySize > 0 ? (monthlyElectricityBill || 0) / familySize : (monthlyElectricityBill || 0);
      const isHighUsage = perCapitaElectricity > 50 || electricityEmissions > 1200;

      if (isHighUsage) {
        return [
          {
            action: "Optimize cooling systems by keeping AC units at an efficient 25°C threshold.",
            impact: "High",
            difficulty: "Easy",
            potentialReduction: "380 kg CO₂/yr",
          },
          {
            action: "Identify and replace energy-intensive old appliances with energy-star certified ones.",
            impact: "High",
            difficulty: "Hard",
            potentialReduction: "500 kg CO₂/yr",
          },
          {
            action: "Audit standby energy drains by utilizing smart power strips for work-from-home setups.",
            impact: "Medium",
            difficulty: "Easy",
            potentialReduction: "150 kg CO₂/yr",
          },
        ];
      } else {
        return [
          {
            action: "Maintain your low-energy household habits and monitor weekly meter readings.",
            impact: "Low",
            difficulty: "Easy",
            potentialReduction: "40 kg CO₂/yr",
          },
          {
            action: "Verify that all phantom loads are eliminated using smart home energy plugs.",
            impact: "Low",
            difficulty: "Easy",
            potentialReduction: "60 kg CO₂/yr",
          },
          {
            action: "Consider sharing your low-consumption strategies with neighbors to drive community reductions.",
            impact: "Medium",
            difficulty: "Medium",
            potentialReduction: "100 kg CO₂/yr",
          },
        ];
      }
    }

    // 2. Travel Logic
    if (maxVal === travelEmissions) {
      if (vehicleType === VehicleType.NONE || (weeklyTravelDistance || 0) <= 0) {
        return [
          {
            action: "Maintain your sustainable vehicle-free lifestyle and prioritize active walking targets.",
            impact: "Medium",
            difficulty: "Easy",
            potentialReduction: "100 kg CO₂/yr",
          },
          {
            action: "Adopt cycling or micro-mobility options for mid-range commutes under 5 km.",
            impact: "High",
            difficulty: "Medium",
            potentialReduction: "250 kg CO₂/yr",
          },
          {
            action: "Opt for electrified train services over short-haul regional flights where possible.",
            impact: "High",
            difficulty: "Medium",
            potentialReduction: "600 kg CO₂/yr",
          },
        ];
      }

      if (vehicleType === VehicleType.HYBRID || vehicleType === VehicleType.ELECTRIC) {
        return [
          {
            action: "Configure hybrid/EV drive modes and coordinate combined multi-stop routes.",
            impact: "Medium",
            difficulty: "Easy",
            potentialReduction: "180 kg CO₂/yr",
          },
          {
            action: "Participate in local carpooling groups to optimize per-seat commuter loads.",
            impact: "Medium",
            difficulty: "Easy",
            potentialReduction: "220 kg CO₂/yr",
          },
          {
            action: "Charge EV units exclusively during off-peak hours using green utility pricing.",
            impact: "High",
            difficulty: "Medium",
            potentialReduction: "400 kg CO₂/yr",
          },
        ];
      }

      // Default Gasoline/Diesel case
      return [
        {
          action: "Shift weekly commutes from solo gasoline driving to public train and bus networks.",
          impact: "High",
          difficulty: "Medium",
          potentialReduction: "850 kg CO₂/yr",
        },
        {
          action: "Coordinate weekly office commutes via ride-shares or community carpooling.",
          impact: "Medium",
          difficulty: "Easy",
          potentialReduction: "320 kg CO₂/yr",
        },
        {
          action: "Combine scattered weekly errands into one single driving loop to minimize cold starts.",
          impact: "Low",
          difficulty: "Easy",
          potentialReduction: "110 kg CO₂/yr",
        },
      ];
    }

    // 3. Diet Logic (Default / DietEmissions is highest)
    if (dietPreference === DietPreference.VEGAN) {
      return [
        {
          action: "Minimize local food waste by strictly maintaining meal planning templates.",
          impact: "Medium",
          difficulty: "Easy",
          potentialReduction: "140 kg CO₂/yr",
        },
        {
          action: "Prioritize seasonal, locally-grown agricultural items to cut transport emissions.",
          impact: "Medium",
          difficulty: "Medium",
          potentialReduction: "180 kg CO₂/yr",
        },
        {
          action: "Kickstart a backyard or municipal composting loop for organic food scraps.",
          impact: "High",
          difficulty: "Medium",
          potentialReduction: "300 kg CO₂/yr",
        },
      ];
    }

    if (dietPreference === DietPreference.VEGETARIAN) {
      return [
        {
          action: "Reduce dairy impact by substituting plant-based milks and cheeses.",
          impact: "High",
          difficulty: "Medium",
          potentialReduction: "350 kg CO₂/yr",
        },
        {
          action: "Food waste reduction using planned weekly shopping limits.",
          impact: "Medium",
          difficulty: "Easy",
          potentialReduction: "150 kg CO₂/yr",
        },
        {
          action: "Local sourcing via Community Supported Agriculture to reduce transport miles.",
          impact: "Medium",
          difficulty: "Easy",
          potentialReduction: "190 kg CO₂/yr",
        },
      ];
    }

    if (dietPreference === DietPreference.BALANCED) {
      return [
        {
          action: "Meat-Free Monday planning to introduce plant-based lunch and dinner alternatives.",
          impact: "High",
          difficulty: "Easy",
          potentialReduction: "450 kg CO₂/yr",
        },
        {
          action: "Food waste reduction by audits of domestic leftovers.",
          impact: "Medium",
          difficulty: "Easy",
          potentialReduction: "120 kg CO₂/yr",
        },
        {
          action: "Increase plant-based meals by swapping animal proteins for lentils or beans.",
          impact: "High",
          difficulty: "Medium",
          potentialReduction: "500 kg CO₂/yr",
        },
      ];
    }

    // Default: Meat Lover case
    return [
      {
        action: "Reduce red meat portions in favor of poultry, fish, or vegetable proteins.",
        impact: "High",
        difficulty: "Medium",
        potentialReduction: "750 kg CO₂/yr",
      },
      {
        action: "Replace meals with plant-based options once or twice every week.",
        impact: "High",
        difficulty: "Easy",
        potentialReduction: "350 kg CO₂/yr",
      },
      {
        action: "Meat reduction strategies including portion-control sizing for dinner recipes.",
        impact: "Medium",
        difficulty: "Easy",
        potentialReduction: "250 kg CO₂/yr",
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
    grade: string,
    dietPreference?: DietPreference,
    vehicleType?: VehicleType,
    weeklyTravelDistance?: number,
    monthlyElectricityBill?: number,
    familySize?: number
  ): Promise<Recommendation[]> {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === "") {
      console.info("Gemini API key not configured. Using local recommendation engine.");
      return this.getFallbackRecommendations(
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

    const prompt = this.generateCoachPrompt(
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
      return this.getFallbackRecommendations(
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
   */
  static async verifySubmission(
    challengeDescription: string,
    evidenceText?: string,
    evidenceFileUrl?: string
  ): Promise<{ status: string; feedback: string }> {
    throw new Error("Method not implemented.");
  }
}

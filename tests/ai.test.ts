import { AIService } from "../src/services/ai";
import { DietPreference, VehicleType } from "../src/lib/constants";

describe("AIService Unit Tests", () => {
  describe("Prompt Generation", () => {
    it("should generate a structured prompt containing the user metrics", () => {
      const prompt = AIService.generateCoachPrompt(4.5, 2500, 1040, 1440, "B");
      expect(prompt).toContain("Carbon Score: 4.5");
      expect(prompt).toContain("Diet Emissions: 2500");
      expect(prompt).toContain("Travel Emissions: 1040");
      expect(prompt).toContain("Electricity Emissions: 1440");
      expect(prompt).toContain("Grade: B");
      expect(prompt).toContain("JSON array");
    });
  });

  describe("Response Parsing", () => {
    it("should correctly parse a valid JSON recommendations array", () => {
      const rawText = `
      [
        {
          "action": "Use energy-efficient LEDs",
          "impact": "Medium",
          "difficulty": "Easy",
          "potentialReduction": "200 kg CO2"
        },
        {
          "action": "Incorporate vegan days",
          "impact": "High",
          "difficulty": "Medium",
          "potentialReduction": "400 kg CO2"
        }
      ]
      `;
      const parsed = AIService.parseRecommendationsResponse(rawText);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].action).toBe("Use energy-efficient LEDs");
      expect(parsed[0].impact).toBe("Medium");
      expect(parsed[0].difficulty).toBe("Easy");
      expect(parsed[0].potentialReduction).toBe("200 kg CO2");
    });

    it("should strip markdown code fences and parse successfully", () => {
      const rawText = `
      \`\`\`json
      [
        {
          "action": "Switch to solar panels",
          "impact": "High",
          "difficulty": "Hard",
          "potentialReduction": "1200 kg CO2"
        }
      ]
      \`\`\`
      `;
      const parsed = AIService.parseRecommendationsResponse(rawText);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].action).toBe("Switch to solar panels");
      expect(parsed[0].impact).toBe("High");
    });

    it("should reject invalid JSON arrays or missing fields", () => {
      expect(() => {
        AIService.parseRecommendationsResponse("invalid json");
      }).toThrow();

      expect(() => {
        AIService.parseRecommendationsResponse(JSON.stringify([{ action: "Test" }]));
      }).toThrow();
    });
  });

  describe("Local Fallback Engine Personalization", () => {
    it("should generate Vegan-specific advice and NOT recommend Meat-Free Mondays or reducing meat", () => {
      const recs = AIService.getFallbackRecommendations(3000, 1000, 1000, DietPreference.VEGAN);
      expect(recs[0].action).toContain("Minimize local food waste");
      recs.forEach(r => {
        expect(r.action).not.toContain("meat-free");
        expect(r.action).not.toContain("Meat-Free");
        expect(r.action).not.toContain("Reduce red meat");
      });
    });

    it("should generate Vegetarian-specific dairy and local sourcing advice", () => {
      const recs = AIService.getFallbackRecommendations(3000, 1000, 1000, DietPreference.VEGETARIAN);
      expect(recs[0].action).toContain("dairy");
      expect(recs[1].action).toContain("Food waste");
    });

    it("should generate Balanced diet recommendations including Meat-Free Mondays", () => {
      const recs = AIService.getFallbackRecommendations(3000, 1000, 1000, DietPreference.BALANCED);
      expect(recs[0].action).toContain("Meat-Free Monday");
    });

    it("should generate Meat Lover recommendations focusing on red meat reduction", () => {
      const recs = AIService.getFallbackRecommendations(3000, 1000, 1000, DietPreference.MEAT_LOVER);
      expect(recs[0].action).toContain("red meat");
    });

    it("should generate No Vehicle recommendations and NOT recommend reducing driving", () => {
      const recs = AIService.getFallbackRecommendations(1000, 3000, 1000, undefined, VehicleType.NONE);
      expect(recs[0].action).toContain("vehicle-free");
      recs.forEach(r => {
        expect(r.action).not.toContain("driving frequency");
        expect(r.action).not.toContain("driving loop");
      });
    });

    it("should generate Gasoline Vehicle recommendations for public transport and carpooling", () => {
      const recs = AIService.getFallbackRecommendations(1000, 3000, 1000, undefined, VehicleType.GASOLINE_LARGE, 100);
      expect(recs[0].action).toContain("Shift weekly commutes");
    });

    it("should generate High Electricity recommendations for AC and appliance optimization", () => {
      const recs = AIService.getFallbackRecommendations(1000, 1000, 3000, undefined, undefined, undefined, 200, 1);
      expect(recs[0].action).toContain("cooling systems");
    });

    it("should generate Low Electricity recommendations for maintaining habits and monitoring consumption", () => {
      const recs = AIService.getFallbackRecommendations(100, 100, 800, undefined, undefined, undefined, 10, 1);
      expect(recs[0].action).toContain("low-energy");
    });
  });

  describe("Gemini Key Configured States", () => {
    let originalEnvKey: string | undefined;

    beforeAll(() => {
      originalEnvKey = process.env.GEMINI_API_KEY;
    });

    afterAll(() => {
      process.env.GEMINI_API_KEY = originalEnvKey;
    });

    it("should execute fallback path directly and return recommendations when key is missing/undefined", async () => {
      delete process.env.GEMINI_API_KEY;
      const recs = await AIService.generateRecommendations(4.5, 3000, 1000, 1000, "B");
      expect(recs).toBeDefined();
      expect(recs.length).toBe(3);
    });

    it("should execute fallback path directly when key is empty string", async () => {
      process.env.GEMINI_API_KEY = " ";
      const recs = await AIService.generateRecommendations(4.5, 3000, 1000, 1000, "B");
      expect(recs).toBeDefined();
      expect(recs.length).toBe(3);
    });

    it("should try calling Gemini when key is present", async () => {
      process.env.GEMINI_API_KEY = "dummy-key";
      
      const spyWarn = jest.spyOn(console, "warn").mockImplementation(() => {});
      const recs = await AIService.generateRecommendations(4.5, 3000, 1000, 1000, "B");
      expect(recs).toBeDefined();
      expect(recs.length).toBe(3);
      spyWarn.mockRestore();
    });
  });
});

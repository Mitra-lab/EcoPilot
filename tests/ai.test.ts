import { AIService } from "../src/services/ai";

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

  describe("Local Fallback Engine", () => {
    it("should return electricity fallbacks when electricity emissions are highest", () => {
      const fallbacks = AIService.getFallbackRecommendations(1500, 1000, 3000);
      expect(fallbacks[0].action).toContain("thermostat");
    });

    it("should return travel fallbacks when travel emissions are highest", () => {
      const fallbacks = AIService.getFallbackRecommendations(1500, 4000, 1000);
      expect(fallbacks[0].action).toContain("transit");
    });

    it("should return diet fallbacks when diet emissions are highest", () => {
      const fallbacks = AIService.getFallbackRecommendations(3000, 1000, 1000);
      expect(fallbacks[0].action).toContain("meat-free");
    });
  });
});

import { ChallengeDifficulty, VerificationLevel, VerificationStatus, DietPreference, VehicleType } from "@/lib/constants";
import { Challenge } from "@/types";

export interface UserChallenge extends Challenge {
  completed: boolean;
  impactLevel: "Low" | "Medium" | "High";
  status: VerificationStatus | "not_started";
}

export class ChallengeService {
  /**
   * Identifies the highest carbon category of the user.
   */
  static getHighestImpactCategory(
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number
  ): "Diet" | "Transport" | "Electricity" {
    const maxVal = Math.max(dietEmissions, travelEmissions, electricityEmissions);
    if (maxVal === electricityEmissions) return "Electricity";
    if (maxVal === travelEmissions) return "Transport";
    return "Diet";
  }

  /**
   * Generates weekly challenges targeting the user's highest emission source,
   * fully personalized to their profile attributes.
   */
  static generateChallenges(
    dietEmissions: number,
    travelEmissions: number,
    electricityEmissions: number,
    dietPreference?: DietPreference,
    vehicleType?: VehicleType,
    weeklyTravelDistance?: number,
    monthlyElectricityBill?: number,
    familySize?: number
  ): UserChallenge[] {
    const highestCategory = this.getHighestImpactCategory(dietEmissions, travelEmissions, electricityEmissions);

    if (highestCategory === "Electricity") {
      const perCapitaElectricity = familySize && familySize > 0 ? (monthlyElectricityBill || 0) / familySize : (monthlyElectricityBill || 0);
      const isHighUsage = perCapitaElectricity > 50 || electricityEmissions > 1200;

      if (isHighUsage) {
        return [
          {
            id: "elec-ch-1",
            title: "AC Runtime Optimizer",
            description: "Reduce AC runtime by 2 hours daily or keep AC at 25°C for the next 3 days.",
            difficulty: ChallengeDifficulty.MEDIUM,
            impactLevel: "High",
            impactScore: 40,
            greenPoints: 75,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
          {
            id: "elec-ch-2",
            title: "Power-Down Challenge",
            description: "Unplug standby devices and turn off all idle appliances when not in use.",
            difficulty: ChallengeDifficulty.EASY,
            impactLevel: "Low",
            impactScore: 8,
            greenPoints: 20,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
          {
            id: "elec-ch-3",
            title: "Appliance Efficiency Run",
            description: "Use appliances only on off-peak energy periods to minimize peak power draw.",
            difficulty: ChallengeDifficulty.EASY,
            impactLevel: "Medium",
            impactScore: 12,
            greenPoints: 30,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
        ];
      } else {
        return [
          {
            id: "elec-ch-4",
            title: "Habit Maintainer",
            description: "Maintain your efficient low-energy habits and monitor household electricity meter readings.",
            difficulty: ChallengeDifficulty.EASY,
            impactLevel: "Low",
            impactScore: 5,
            greenPoints: 15,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
          {
            id: "elec-ch-5",
            title: "Appliance Monitor",
            description: "Track energy consumption of active household appliances using a smart plug.",
            difficulty: ChallengeDifficulty.EASY,
            impactLevel: "Low",
            impactScore: 6,
            greenPoints: 20,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
          {
            id: "elec-ch-6",
            title: "Phantom Power Auditor",
            description: "Conduct a standby phantom energy audit and document power settings.",
            difficulty: ChallengeDifficulty.MEDIUM,
            impactLevel: "Medium",
            impactScore: 10,
            greenPoints: 30,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
        ];
      }
    }

    if (highestCategory === "Transport") {
      if (vehicleType === VehicleType.NONE || (weeklyTravelDistance || 0) <= 0) {
        return [
          {
            id: "trans-ch-4",
            title: "Walking Goal Target",
            description: "Maintain active walking goals by targeting at least 8,000 steps daily.",
            difficulty: ChallengeDifficulty.EASY,
            impactLevel: "Low",
            impactScore: 10,
            greenPoints: 20,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
          {
            id: "trans-ch-5",
            title: "Bike Commute Challenge",
            description: "Use a bicycle or active walking options for mid-range local commutes this week.",
            difficulty: ChallengeDifficulty.MEDIUM,
            impactLevel: "Medium",
            impactScore: 25,
            greenPoints: 50,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
          {
            id: "trans-ch-6",
            title: "Sustainable Commuter Streak",
            description: "Commit to active walking and public transit targets for 5 consecutive days.",
            difficulty: ChallengeDifficulty.MEDIUM,
            impactLevel: "High",
            impactScore: 50,
            greenPoints: 80,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
        ];
      }

      if (vehicleType === VehicleType.HYBRID || vehicleType === VehicleType.ELECTRIC) {
        return [
          {
            id: "trans-ch-7",
            title: "Carpool Coalition",
            description: "Carpool twice this week with co-workers or neighbors to optimize per-car loads.",
            difficulty: ChallengeDifficulty.MEDIUM,
            impactLevel: "High",
            impactScore: 35,
            greenPoints: 60,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
          {
            id: "trans-ch-8",
            title: "Route Optimizer",
            description: "Optimize driving routes to combine multiple errands into one trip and reduce mileage.",
            difficulty: ChallengeDifficulty.EASY,
            impactLevel: "Low",
            impactScore: 10,
            greenPoints: 20,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
          {
            id: "trans-ch-9",
            title: "Trip Reduction Challenge",
            description: "Reduce unnecessary vehicle trips by walking or cycling for local errands.",
            difficulty: ChallengeDifficulty.MEDIUM,
            impactLevel: "Medium",
            impactScore: 20,
            greenPoints: 40,
            verificationLevel: VerificationLevel.SELF_VERIFIED,
            completed: false,
            status: "not_started",
            createdAt: new Date().toISOString(),
          },
        ];
      }

      // Default Gasoline/Diesel Case
      return [
        {
          id: "trans-ch-1",
          title: "Walk Over Wheels",
          description: "Replace at least one driving trip under 2 km with walking.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Low",
          impactScore: 15,
          greenPoints: 30,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "trans-ch-2",
          title: "Transit Day Champion",
          description: "Use public transportation (bus/train) instead of driving for one full day.",
          difficulty: ChallengeDifficulty.MEDIUM,
          impactLevel: "High",
          impactScore: 45,
          greenPoints: 80,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "trans-ch-3",
          title: "Driving Reduction Challenge",
          description: "Reduce weekly vehicle mileage and driving by 10% through consolidated routes.",
          difficulty: ChallengeDifficulty.MEDIUM,
          impactLevel: "High",
          impactScore: 40,
          greenPoints: 75,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    // Default: Diet category is highest
    if (dietPreference === DietPreference.VEGAN) {
      return [
        {
          id: "diet-ch-4",
          title: "Organic Composter",
          description: "Compost food waste and organic scraps for 7 consecutive days.",
          difficulty: ChallengeDifficulty.MEDIUM,
          impactLevel: "High",
          impactScore: 30,
          greenPoints: 70,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "diet-ch-5",
          title: "Local Farmer Sourcing",
          description: "Buy local, seasonal produce this week from nearby agricultural hubs to cut food miles.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Low",
          impactScore: 10,
          greenPoints: 20,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "diet-ch-6",
          title: "Zero Packaged Foods",
          description: "Reduce packaged and processed food purchases by opting for bulk fresh ingredients.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Medium",
          impactScore: 15,
          greenPoints: 30,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    if (dietPreference === DietPreference.VEGETARIAN) {
      return [
        {
          id: "diet-ch-7",
          title: "Dairy Reduction Challenge",
          description: "Reduce dairy usage by substituting dairy milk or butter with plant alternatives.",
          difficulty: ChallengeDifficulty.MEDIUM,
          impactLevel: "High",
          impactScore: 35,
          greenPoints: 70,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "diet-ch-8",
          title: "Seasonal Produce Challenge",
          description: "Opt for seasonal fruits and vegetables to reduce global shipping emissions.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Low",
          impactScore: 10,
          greenPoints: 20,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "diet-ch-9",
          title: "Food Waste Reduction",
          description: "Minimize household food waste by maintaining custom grocery list boundaries.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Medium",
          impactScore: 15,
          greenPoints: 30,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    if (dietPreference === DietPreference.BALANCED) {
      return [
        {
          id: "diet-ch-1",
          title: "Meat-Free Monday",
          description: "Consume entirely vegetarian or vegan meals for one full day.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Medium",
          impactScore: 15,
          greenPoints: 30,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "diet-ch-2",
          title: "Meal Prep Zero-Waste",
          description: "Plan all weekly groceries and ensure zero food waste by storing leftovers correctly.",
          difficulty: ChallengeDifficulty.EASY,
          impactLevel: "Low",
          impactScore: 5,
          greenPoints: 15,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
        {
          id: "diet-ch-3",
          title: "Plant-Powered Lunches",
          description: "Enjoy fully plant-based (vegan) lunches for 3 consecutive days.",
          difficulty: ChallengeDifficulty.MEDIUM,
          impactLevel: "High",
          impactScore: 35,
          greenPoints: 70,
          verificationLevel: VerificationLevel.SELF_VERIFIED,
          completed: false,
          status: "not_started",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    // Default: Meat Lover case
    return [
      {
        id: "diet-ch-10",
        title: "Red Meat Substitute",
        description: "Replace at least 2 red-meat meals this week with chicken, fish, or plant items.",
        difficulty: ChallengeDifficulty.MEDIUM,
        impactLevel: "High",
        impactScore: 40,
        greenPoints: 75,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "diet-ch-11",
        title: "Vegetarian Dinner Try",
        description: "Cook and eat one fully vegetarian dinner meal.",
        difficulty: ChallengeDifficulty.EASY,
        impactLevel: "Low",
        impactScore: 10,
        greenPoints: 20,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
      {
        id: "diet-ch-12",
        title: "Meat Consumption Audit",
        description: "Track and document your meat consumption reduction over the week.",
        difficulty: ChallengeDifficulty.EASY,
        impactLevel: "Medium",
        impactScore: 15,
        greenPoints: 30,
        verificationLevel: VerificationLevel.SELF_VERIFIED,
        completed: false,
        status: "not_started",
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

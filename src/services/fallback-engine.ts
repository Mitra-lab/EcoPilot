import { DietPreference, VehicleType, HIGH_ELECTRICITY_BILL_THRESHOLD, HIGH_ELECTRICITY_EMISSIONS_THRESHOLD } from "@/lib/constants";
import { Recommendation } from "./recommendation-types";

/**
 * Returns locally-computed recommendations when Gemini is unavailable.
 * Branches on the user's highest emission category and profile details.
 */
export function getFallbackRecommendations(
  dietEmissions: number,
  travelEmissions: number,
  electricityEmissions: number,
  dietPreference?: DietPreference,
  vehicleType?: VehicleType,
  weeklyTravelDistance?: number,
  monthlyElectricityBill?: number,
  familySize?: number
): Recommendation[] {
  const maxVal = Math.max(dietEmissions, travelEmissions, electricityEmissions);

  // --- Electricity ---
  if (maxVal === electricityEmissions) {
    const perCapitaElectricity =
      familySize && familySize > 0
        ? (monthlyElectricityBill || 0) / familySize
        : (monthlyElectricityBill || 0);
    const isHighUsage = perCapitaElectricity > HIGH_ELECTRICITY_BILL_THRESHOLD || electricityEmissions > HIGH_ELECTRICITY_EMISSIONS_THRESHOLD;

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
    }

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
        action:
          "Consider sharing your low-consumption strategies with neighbors to drive community reductions.",
        impact: "Medium",
        difficulty: "Medium",
        potentialReduction: "100 kg CO₂/yr",
      },
    ];
  }

  // --- Transport ---
  if (maxVal === travelEmissions) {
    if (vehicleType === VehicleType.NONE || (weeklyTravelDistance || 0) <= 0) {
      return [
        {
          action:
            "Maintain your sustainable vehicle-free lifestyle and prioritize active walking targets.",
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
          action:
            "Opt for electrified train services over short-haul regional flights where possible.",
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

    // Default: Gasoline / Diesel
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
        action:
          "Combine scattered weekly errands into one single driving loop to minimize cold starts.",
        impact: "Low",
        difficulty: "Easy",
        potentialReduction: "110 kg CO₂/yr",
      },
    ];
  }

  // --- Diet ---
  if (dietPreference === DietPreference.VEGAN) {
    return [
      {
        action: "Minimize local food waste by strictly maintaining meal planning templates.",
        impact: "Medium",
        difficulty: "Easy",
        potentialReduction: "140 kg CO₂/yr",
      },
      {
        action:
          "Prioritize seasonal, locally-grown agricultural items to cut transport emissions.",
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
        action:
          "Local sourcing via Community Supported Agriculture to reduce transport miles.",
        impact: "Medium",
        difficulty: "Easy",
        potentialReduction: "190 kg CO₂/yr",
      },
    ];
  }

  if (dietPreference === DietPreference.BALANCED) {
    return [
      {
        action:
          "Meat-Free Monday planning to introduce plant-based lunch and dinner alternatives.",
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

  // Default: Meat Lover
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
      action:
        "Meat reduction strategies including portion-control sizing for dinner recipes.",
      impact: "Medium",
      difficulty: "Easy",
      potentialReduction: "250 kg CO₂/yr",
    },
  ];
}

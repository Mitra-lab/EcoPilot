import { NextResponse } from "next/server";
import { coachRequestSchema } from "@/lib/validations";
import { AIService } from "@/services/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = coachRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: result.error.errors },
        { status: 400 }
      );
    }

    const {
      carbonScore,
      dietEmissions,
      travelEmissions,
      electricityEmissions,
      grade,
      dietPreference,
      vehicleType,
      weeklyTravelDistance,
      monthlyElectricityBill,
      familySize,
    } = result.data;

    const recommendations = await AIService.generateRecommendations(
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

    return NextResponse.json({ recommendations });
  } catch (error: unknown) {
    console.error("AI Coach route handler error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations due to an internal server error" },
      { status: 500 }
    );
  }
}

"use client";

import React, { useEffect, useState } from "react";
import { Recommendation } from "@/services/ai";
import { CarbonService } from "@/services/carbon";
import { RecommendationList } from "./RecommendationList";
import { AssessmentFormInput } from "@/lib/validations";

interface AICoachCardProps {
  score: number;
  grade: string;
  input: AssessmentFormInput;
}

export function AICoachCard({ score, grade, input }: AICoachCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const fetchRecommendations = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Calculate emissions breakdown using CarbonService (single source of truth)
      const diet = CarbonService.getDietEmissions(input.dietPreference);
      const travel = CarbonService.getTransportEmissions(input.vehicleType, input.weeklyTravelDistance);
      const electricity = CarbonService.getElectricityEmissions(input.monthlyElectricityBill, input.familySize);

      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carbonScore: score,
          dietEmissions: diet,
          travelEmissions: travel,
          electricityEmissions: electricity,
          grade,
          dietPreference: input.dietPreference,
          vehicleType: input.vehicleType,
          weeklyTravelDistance: input.weeklyTravelDistance,
          monthlyElectricityBill: input.monthlyElectricityBill,
          familySize: input.familySize,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve recommendation guides");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err: unknown) {
      setError("Failed to fetch recommendation guides. Please check your network and retry.");
    } finally {
      setLoading(false);
    }
  }, [score, grade, input]);

  useEffect(() => {
    // Intentionally call fetchRecommendations when component mounts or parameters change
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">🤖</span>
        <div>
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">AI Sustainability Coach</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Personalized guidance driven by Gemini AI
          </p>
        </div>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-5 border border-[hsl(var(--border))] rounded-xl animate-pulse space-y-3">
              <div className="h-4 bg-[hsl(var(--muted))] rounded w-3/4" />
              <div className="flex space-x-2">
                <div className="h-4 bg-[hsl(var(--muted))] rounded w-16" />
                <div className="h-4 bg-[hsl(var(--muted))] rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-[hsl(var(--destructive))]/15 border border-[hsl(var(--destructive))]/30 text-[hsl(var(--destructive))] rounded-lg text-sm flex flex-col items-center">
          <p>{error}</p>
          <button
            onClick={fetchRecommendations}
            className="mt-3 px-4 py-1.5 bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] font-semibold rounded text-xs hover:bg-[hsl(var(--destructive))]/90 transition-colors"
          >
            Retry Fetching
          </button>
        </div>
      )}

      {!loading && !error && (
        <RecommendationList recommendations={recommendations} />
      )}
    </div>
  );
}

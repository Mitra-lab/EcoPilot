"use client";

import React, { useEffect, useState } from "react";
import { Recommendation } from "@/services/ai";
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
      // Calculate breakdown to pass to API
      const diet = {
        vegan: 1500,
        vegetarian: 1700,
        pescatarian: 2000,
        balanced: 2500,
        meat_lover: 3300,
      }[input.dietPreference] || 2500;

      const travelFactor = {
        none: 0,
        electric: 0.05,
        hybrid: 0.1,
        gasoline_small: 0.17,
        gasoline_large: 0.27,
        diesel: 0.22,
      }[input.vehicleType] || 0;

      const travel = Math.round(input.weeklyTravelDistance * 52 * travelFactor);
      const electricity = Math.round((input.monthlyElectricityBill * 6.0 * 12 * 0.4) / input.familySize);

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

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentCard } from "@/components/AssessmentCard";
import { AssessmentForm } from "@/components/AssessmentForm";
import { AssessmentResult } from "@/components/AssessmentResult";
import { CarbonService } from "@/services/carbon";
import { AssessmentFormInput } from "@/lib/validations";

export default function AssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    score: number;
    input: AssessmentFormInput;
  } | null>(null);

  const handleFormSubmit = async (data: AssessmentFormInput) => {
    setLoading(true);
    setError(null);
    try {
      // Artificially wait briefly to show loading transition state (wow factor UX)
      await new Promise((resolve) => setTimeout(resolve, 800));

      const carbonScore = CarbonService.calculateScore(data);

      // Save to localStorage for the Dashboard page to read
      localStorage.setItem(
        "ecopilot_assessment",
        JSON.stringify({ score: carbonScore, input: data })
      );

      setResult({
        score: carbonScore,
        input: data,
      });

      // Brief delay then redirect to Dashboard for smooth transition
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred while calculating your score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
          Carbon Footprint Assessment
        </h1>
        <p className="mt-3 text-lg text-[hsl(var(--muted-foreground))]">
          Calculate your annual carbon impact and learn how you can start making immediate improvements.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-[hsl(var(--destructive))]/15 border border-[hsl(var(--destructive))]/30 text-[hsl(var(--destructive))] rounded-lg text-sm">
            {error}
          </div>
        )}

        {!result ? (
          <AssessmentCard
            title="Tell us about your lifestyle"
            description="Provide simple estimates about your household and travel behavior to calculate your score."
          >
            <AssessmentForm onSubmit={handleFormSubmit} isLoading={loading} />
          </AssessmentCard>
        ) : (
          <AssessmentCard
            title="Your Assessment Result"
            description="Here is your current environmental impact snapshot. Redirecting to your dashboard..."
          >
            <div className="mb-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse text-center">
              ✓ Score saved! Launching dashboard analytics...
            </div>
            <AssessmentResult
              score={result.score}
              input={result.input}
              onReset={handleReset}
            />
          </AssessmentCard>
        )}
      </div>
    </div>
  );
}

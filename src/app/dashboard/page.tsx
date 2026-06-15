"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/DashboardHeader";
import { MetricCards } from "@/components/MetricCards";
import { CarbonBreakdownChart } from "@/components/CarbonBreakdownChart";
import { SustainabilityRating } from "@/components/SustainabilityRating";
import { ImpactSummaryCard } from "@/components/ImpactSummaryCard";
import { DashboardService, DashboardChartData } from "@/services/dashboard";
import { AssessmentFormInput } from "@/lib/validations";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assessmentData, setAssessmentData] = useState<{
    score: number;
    input: AssessmentFormInput;
  } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ecopilot_assessment");
      if (stored) {
        setAssessmentData(JSON.parse(stored));
      }
    } catch (err) {
      setError("Failed to parse carbon assessment data. Please take the assessment again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleResetAssessment = () => {
    router.push("/assessment");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <svg className="animate-spin h-10 w-10 text-[hsl(var(--primary))]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-sm font-semibold text-[hsl(var(--muted-foreground))]">Loading analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl text-center shadow-sm">
        <div className="text-3xl mb-3">⚠️</div>
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Analytics Error</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">{error}</p>
        <button
          onClick={handleResetAssessment}
          className="mt-6 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold rounded-md shadow hover:bg-[hsl(var(--primary))]/90 transition-colors"
        >
          Retake Assessment
        </button>
      </div>
    );
  }

  if (!assessmentData) {
    return (
      <div className="max-w-lg mx-auto mt-20 p-8 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl text-center shadow-sm animate-fade-in">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">No Footprint Data Yet</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-3 leading-relaxed">
          Before accessing the carbon tracking analytics, you must complete your initial carbon assessment. It only takes a minute!
        </p>
        <button
          onClick={handleResetAssessment}
          className="mt-6 w-full py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold rounded-md shadow hover:bg-[hsl(var(--primary))]/90 transition-colors"
        >
          Start Carbon Assessment
        </button>
      </div>
    );
  }

  const { score, input } = assessmentData;
  const rating = DashboardService.getSustainabilityRating(score);
  const chartData = DashboardService.generateChartData(input);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <DashboardHeader onResetAssessment={handleResetAssessment} />
      <MetricCards carbonScore={score} rating={rating} />
      <SustainabilityRating rating={rating} />
      <CarbonBreakdownChart data={chartData} />
      <ImpactSummaryCard input={input} />
    </div>
  );
}

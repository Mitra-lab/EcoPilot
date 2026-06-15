import React from "react";

interface DashboardHeaderProps {
  userName?: string;
  onResetAssessment: () => void;
}

export function DashboardHeader({ userName = "Eco Explorer", onResetAssessment }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[hsl(var(--border))] pb-6 mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
          Welcome back, {userName}!
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
          Track, evaluate, and minimize your daily carbon impact.
        </p>
      </div>
      <button
        onClick={onResetAssessment}
        className="px-4 py-2 text-sm font-semibold rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] transition-colors self-start md:self-auto"
      >
        Update Assessment
      </button>
    </div>
  );
}

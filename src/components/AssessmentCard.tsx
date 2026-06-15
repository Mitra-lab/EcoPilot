import React from "react";

interface AssessmentCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function AssessmentCard({
  title,
  description,
  children,
  className = "",
}: AssessmentCardProps) {
  return (
    <div className={`bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm overflow-hidden p-6 md:p-8 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">{title}</h2>
        {description && (
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

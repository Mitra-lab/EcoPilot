import React from "react";
import { VerificationRecord } from "@/services/verification";
import { VerificationBadge } from "./VerificationBadge";

interface VerificationHistoryProps {
  history: VerificationRecord[];
}

export function VerificationHistory({ history }: VerificationHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Recent Verified Actions</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))] text-center py-4">
          No verified actions yet. Complete a weekly challenge and submit verification to build your history!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm mb-8">
      <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-4">Recent Verified Actions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] text-xs uppercase font-bold">
              <th className="pb-3 font-semibold">Challenge</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {history.map((record) => (
              <tr key={record.id} className="hover:bg-[hsl(var(--muted))]/30 transition-colors">
                <td className="py-3.5 font-medium text-[hsl(var(--foreground))]">{record.challengeTitle}</td>
                <td className="py-3.5 text-[hsl(var(--muted-foreground))]">
                  {new Date(record.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3.5">
                  <VerificationBadge status={record.status} />
                </td>
                <td className="py-3.5 text-right font-bold text-emerald-600 dark:text-emerald-400">
                  +{record.pointsAwarded} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

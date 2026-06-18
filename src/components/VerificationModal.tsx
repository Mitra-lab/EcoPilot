"use client";

import React, { useState } from "react";
import { verificationNotesSchema } from "@/lib/validations";

interface VerificationModalProps {
  challengeTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (notes: string) => void;
}

export function VerificationModal({
  challengeTitle,
  isOpen,
  onClose,
  onSubmit,
}: VerificationModalProps) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = verificationNotesSchema.safeParse({
      challengeName: challengeTitle,
      notes,
    });

    if (!validation.success) {
      const fieldError = validation.error.errors[0]?.message || "Invalid input";
      setError(fieldError);
      return;
    }

    onSubmit(notes);
    setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-6 border-b border-[hsl(var(--border))] flex justify-between items-center bg-[hsl(var(--card))]">
          <div>
            <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Submit Verification</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Provide proof of completion</p>
          </div>
          <button
            onClick={onClose}
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-1">
              Challenge Name
            </label>
            <div className="px-4 py-2 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-lg text-sm font-semibold text-[hsl(var(--foreground))]">
              {challengeTitle}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2">
              Verification Notes *
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Explain how you completed this challenge. (Minimum 20 characters)"
              className={`w-full px-4 py-3 border rounded-lg bg-[hsl(var(--card))] text-[hsl(var(--foreground))] text-sm placeholder-[hsl(var(--muted-foreground))]/60 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] ${
                error ? "border-[hsl(var(--destructive))]" : "border-[hsl(var(--border))]"
              }`}
            />
            <div className="flex justify-between mt-1.5 text-xs text-[hsl(var(--muted-foreground))]">
              <span>{notes.length} / 500 characters</span>
              <span>Min 20 characters</span>
            </div>
            {error && (
              <p className="text-xs text-[hsl(var(--destructive))] mt-2 font-medium">
                ⚠️ {error}
              </p>
            )}
          </div>

          <div className="flex space-x-3 pt-4 border-t border-[hsl(var(--border))]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 border border-[hsl(var(--border))] rounded-lg text-sm font-semibold text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold rounded-lg text-sm hover:bg-[hsl(var(--primary))]/90 shadow-sm transition-colors"
            >
              Verify Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

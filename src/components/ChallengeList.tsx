"use client";

import React, { useEffect, useState } from "react";
import { ChallengeService, UserChallenge } from "@/services/challenge";
import { VerificationService, VerificationRecord } from "@/services/verification";
import { VerificationModal } from "./VerificationModal";
import { ChallengeCard } from "./ChallengeCard";
import { ChallengeProgress } from "./ChallengeProgress";
import { AssessmentFormInput } from "@/lib/validations";
import { VerificationStatus } from "@/lib/constants";

interface ChallengeListProps {
  score: number;
  input: AssessmentFormInput;
  onPointsUpdate?: () => void;
  onVerificationUpdate?: () => void;
}

export function ChallengeList({
  score,
  input,
  onPointsUpdate,
  onVerificationUpdate,
}: ChallengeListProps) {
  const [challenges, setChallenges] = useState<UserChallenge[]>([]);
  const [points, setPoints] = useState(0);
  const [loadingChallengeId, setLoadingChallengeId] = useState<string | null>(null);

  // Modal State
  const [activeChallenge, setActiveChallenge] = useState<UserChallenge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute category emissions for generator
  const diet = React.useMemo(() => {
    return {
      vegan: 1500,
      vegetarian: 1700,
      pescatarian: 2000,
      balanced: 2500,
      meat_lover: 3300,
    }[input.dietPreference] || 2500;
  }, [input.dietPreference]);

  const travel = React.useMemo(() => {
    const travelFactor = {
      none: 0,
      electric: 0.05,
      hybrid: 0.1,
      gasoline_small: 0.17,
      gasoline_large: 0.27,
      diesel: 0.22,
    }[input.vehicleType] || 0;
    return Math.round(input.weeklyTravelDistance * 52 * travelFactor);
  }, [input.vehicleType, input.weeklyTravelDistance]);

  const electricity = React.useMemo(() => {
    return Math.round((input.monthlyElectricityBill * 6.0 * 12 * 0.4) / input.familySize);
  }, [input.monthlyElectricityBill, input.familySize]);

  const calculatePoints = React.useCallback((items: UserChallenge[]) => {
    const total = items.reduce((acc, curr) => (curr.status === VerificationStatus.VERIFIED ? acc + curr.greenPoints : acc), 0);
    setPoints(total);
  }, []);

  useEffect(() => {
    // Attempt to load weekly challenges status from local storage
    const stored = localStorage.getItem("ecopilot_weekly_challenges");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sync completion from verification status if status is verified
          const synced: UserChallenge[] = parsed.map((ch: UserChallenge) => {
            if (ch.status === undefined) {
              return {
                ...ch,
                status: ch.completed ? VerificationStatus.VERIFIED : "not_started",
              };
            }
            return ch;
          });
          setChallenges(synced);
          calculatePoints(synced);
          return;
        }
      } catch (e) {
        console.error("Failed to parse stored challenges. Re-generating...");
      }
    }

    // Generate new targeted challenges based on emissions breakdown
    const generated = ChallengeService.generateChallenges(
      diet,
      travel,
      electricity,
      input.dietPreference,
      input.vehicleType,
      input.weeklyTravelDistance,
      input.monthlyElectricityBill,
      input.familySize
    );
    setChallenges(generated);
    localStorage.setItem("ecopilot_weekly_challenges", JSON.stringify(generated));
    calculatePoints(generated);
  }, [diet, travel, electricity, calculatePoints, input.dietPreference, input.vehicleType, input.weeklyTravelDistance, input.monthlyElectricityBill, input.familySize]);

  const handleOpenVerification = (id: string) => {
    const target = challenges.find((c) => c.id === id);
    if (target) {
      setActiveChallenge(target);
      setIsModalOpen(true);
    }
  };

  const handleVerifySubmission = async (notes: string) => {
    if (!activeChallenge) return;
    const challengeId = activeChallenge.id;
    setIsModalOpen(false);
    setLoadingChallengeId(challengeId);

    try {
      // Artifically delay for 400ms to show verification transitions (MVP UX)
      await new Promise((resolve) => setTimeout(resolve, 400));

      // 1. Create the verification log
      const record = VerificationService.createVerificationRecord(
        challengeId,
        activeChallenge.title,
        notes,
        activeChallenge.greenPoints
      );

      // 2. Persist verification history
      VerificationService.saveRecord(record);

      // 3. Transition challenge status to verified
      const updated = challenges.map((ch) =>
        ch.id === challengeId
          ? { ...ch, completed: true, status: VerificationStatus.VERIFIED }
          : ch
      );

      setChallenges(updated);
      localStorage.setItem("ecopilot_weekly_challenges", JSON.stringify(updated));
      calculatePoints(updated);

      // 4. Update points database (localStorage)
      const storedAssessment = localStorage.getItem("ecopilot_assessment");
      if (storedAssessment) {
        const parsed = JSON.parse(storedAssessment);
        const challengePoints = updated.reduce(
          (acc, curr) => (curr.status === VerificationStatus.VERIFIED ? acc + curr.greenPoints : acc),
          0
        );
        localStorage.setItem(
          "ecopilot_assessment",
          JSON.stringify({
            ...parsed,
            points: challengePoints + 120, // 120 base points
          })
        );
      }

      // Notify parent callbacks to trigger UI refresh
      if (onPointsUpdate) onPointsUpdate();
      if (onVerificationUpdate) onVerificationUpdate();
    } catch (e) {
      console.error("Verification failed", e);
    } finally {
      setLoadingChallengeId(null);
      setActiveChallenge(null);
    }
  };

  const completedCount = challenges.filter((c) => c.status === VerificationStatus.VERIFIED).length;

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center space-x-3 mt-8 mb-4">
        <span className="text-3xl">🎯</span>
        <div>
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">Weekly Habits Action Plan</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Take verified action to reduce your largest emission source
          </p>
        </div>
      </div>

      <ChallengeProgress
        completedCount={completedCount}
        totalCount={challenges.length}
        pointsEarned={points}
      />

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onComplete={handleOpenVerification}
            isLoading={loadingChallengeId === challenge.id}
          />
        ))}
      </div>

      {activeChallenge && (
        <VerificationModal
          challengeTitle={activeChallenge.title}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setActiveChallenge(null);
          }}
          onSubmit={handleVerifySubmission}
        />
      )}
    </div>
  );
}

import { VerificationStatus } from "@/lib/constants";
import { verificationNotesSchema, VerificationNotesInput } from "@/lib/validations";

export interface VerificationRecord {
  id: string;
  challengeId: string;
  challengeTitle: string;
  notes: string;
  status: VerificationStatus;
  pointsAwarded: number;
  createdAt: string;
}

export class VerificationService {
  /**
   * Validates verification notes payload using Zod.
   * @param input Data properties including challenge name and notes description
   * @returns Boolean indicating safe parsing success
   */
  static validateNotes(input: VerificationNotesInput): boolean {
    const parsed = verificationNotesSchema.safeParse(input);
    return parsed.success;
  }

  /**
   * Generates a new verification record and manages state transitions.
   * @param challengeId Target challenge identity key
   * @param challengeTitle Challenge name string
   * @param notes Textual completion notes entered by the user
   * @param points Reward value coordinates
   * @returns Generated and verified verification record
   */
  static createVerificationRecord(
    challengeId: string,
    challengeTitle: string,
    notes: string,
    points: number
  ): VerificationRecord {
    // Validate inputs
    const isValid = this.validateNotes({ challengeName: challengeTitle, notes });
    if (!isValid) {
      throw new Error("Invalid verification notes. Must be between 20 and 500 characters.");
    }

    return {
      id: `ver-${Math.random().toString(36).substr(2, 9)}`,
      challengeId,
      challengeTitle,
      notes,
      status: VerificationStatus.VERIFIED, // transitions straight to verified for MVP self-verification
      pointsAwarded: points,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Retrieves verification history from local storage.
   * @returns List of all verified submissions
   */
  static getHistory(): VerificationRecord[] {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("ecopilot_verification_history");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse verification history", e);
      return [];
    }
  }

  /**
   * Saves verification record and updates local storage history list.
   * @param record New verified log event
   * @returns Updated list of history records
   */
  static saveRecord(record: VerificationRecord): VerificationRecord[] {
    if (typeof window === "undefined") return [];
    const history = this.getHistory();
    const updated = [record, ...history];
    localStorage.setItem("ecopilot_verification_history", JSON.stringify(updated));
    return updated;
  }

  /**
   * Backfills legacy verification history from completed challenges.
   */
  static syncLegacyVerifications(): void {
    if (typeof window === "undefined") return;
    try {
      const storedChallenges = localStorage.getItem("ecopilot_weekly_challenges");
      if (!storedChallenges) return;
      const challenges = JSON.parse(storedChallenges);
      const history = this.getHistory();

      let updated = false;
      challenges.forEach((ch: any) => {
        const isVerified = ch.status === "verified" || ch.completed === true;
        if (isVerified) {
          const hasRecord = history.some((r: VerificationRecord) => r.challengeId === ch.id);
          if (!hasRecord) {
            const legacyRecord: VerificationRecord = {
              id: `ver-legacy-${ch.id}`,
              challengeId: ch.id,
              challengeTitle: ch.title,
              notes: "Legacy self-verified completion backfilled during system migration.",
              status: VerificationStatus.VERIFIED,
              pointsAwarded: ch.greenPoints,
              createdAt: ch.createdAt || new Date().toISOString(),
            };
            history.push(legacyRecord);
            updated = true;
          }
        }
      });

      if (updated) {
        localStorage.setItem("ecopilot_verification_history", JSON.stringify(history));
      }
    } catch (e) {
      console.error("Failed to sync legacy verifications", e);
    }
  }
}

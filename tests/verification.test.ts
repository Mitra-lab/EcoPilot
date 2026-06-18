import { VerificationService } from "../src/services/verification";
import { VerificationStatus } from "../src/lib/constants";

describe("VerificationService Unit Tests", () => {
  describe("Verification Notes Validation", () => {
    it("should accept valid verification notes (between 20 and 500 characters)", () => {
      const validNotes = "I completed a vegetarian lunch on Monday and avoided meat for the entire day.";
      const result = VerificationService.validateNotes({
        challengeName: "Meat-Free Monday",
        notes: validNotes,
      });
      expect(result).toBe(true);
    });

    it("should reject notes that are too short (< 20 characters)", () => {
      const shortNotes = "Ate salad.";
      const result = VerificationService.validateNotes({
        challengeName: "Meat-Free Monday",
        notes: shortNotes,
      });
      expect(result).toBe(false);
    });

    it("should reject notes that are too long (> 500 characters)", () => {
      const longNotes = "a".repeat(501);
      const result = VerificationService.validateNotes({
        challengeName: "Meat-Free Monday",
        notes: longNotes,
      });
      expect(result).toBe(false);
    });
  });

  describe("Verification Record and Status Transition", () => {
    it("should generate record with VERIFIED status and correct fields", () => {
      const notes = "I unplugged my gaming console, TV, and phone chargers this morning.";
      const record = VerificationService.createVerificationRecord(
        "elec-ch-2",
        "Phantom Power Hunt",
        notes,
        20
      );

      expect(record.challengeId).toBe("elec-ch-2");
      expect(record.challengeTitle).toBe("Phantom Power Hunt");
      expect(record.notes).toBe(notes);
      expect(record.status).toBe(VerificationStatus.VERIFIED);
      expect(record.pointsAwarded).toBe(20);
      expect(record.id).toContain("ver-");
      expect(record.createdAt).toBeDefined();
    });

    it("should throw an error when generating a record with invalid notes", () => {
      expect(() => {
        VerificationService.createVerificationRecord(
          "elec-ch-2",
          "Phantom Power Hunt",
          "Too short",
          20
        );
      }).toThrow();
    });
  });

  describe("Verification History Generation & Storage Simulation", () => {
    beforeEach(() => {
      // Mock localStorage
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    });

    it("should persist and retrieve records successfully from localStorage simulation", () => {
      const record = {
        id: "ver-12345",
        challengeId: "elec-ch-2",
        challengeTitle: "Phantom Power Hunt",
        notes: "Unplugged my standby devices for the entire day.",
        status: VerificationStatus.VERIFIED,
        pointsAwarded: 20,
        createdAt: new Date().toISOString(),
      };

      const updatedHistory = VerificationService.saveRecord(record);
      expect(updatedHistory).toHaveLength(1);
      expect(updatedHistory[0].id).toBe("ver-12345");

      const retrievedHistory = VerificationService.getHistory();
      expect(retrievedHistory).toHaveLength(1);
      expect(retrievedHistory[0].notes).toBe(record.notes);
    });

    it("should backfill legacy completions in syncLegacyVerifications", () => {
      // Setup legacy weekly challenges in localStorage
      const legacyChallenges = [
        {
          id: "diet-ch-1",
          title: "Meat-Free Monday",
          description: "Meat free",
          difficulty: "easy",
          impactScore: 15,
          greenPoints: 30,
          completed: true,
        },
      ];
      localStorage.setItem("ecopilot_weekly_challenges", JSON.stringify(legacyChallenges));
      localStorage.setItem("ecopilot_verification_history", JSON.stringify([]));

      VerificationService.syncLegacyVerifications();

      const history = VerificationService.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].challengeId).toBe("diet-ch-1");
      expect(history[0].notes).toContain("Legacy");
    });
  });
});

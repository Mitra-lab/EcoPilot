import { VerificationStatus } from "@/lib/constants";
import { Challenge } from "@/types";

/**
 * Extends the base Challenge type with runtime UI state fields.
 */
export interface UserChallenge extends Challenge {
  completed: boolean;
  impactLevel: "Low" | "Medium" | "High";
  status: VerificationStatus | "not_started";
}

/**
 * @module challenge
 * Barrel re-export for backward-compatible challenge service imports.
 * Implementation is split across focused modules:
 *   - challenge-types.ts       — UserChallenge interface
 *   - challenge-service.ts     — ChallengeService orchestrator
 *   - diet-challenges.ts       — Diet category challenge definitions
 *   - transport-challenges.ts  — Transport category challenge definitions
 *   - electricity-challenges.ts — Electricity category challenge definitions
 */
export type { UserChallenge } from "./challenge-types";
export { ChallengeService } from "./challenge-service";

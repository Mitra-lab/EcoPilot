/**
 * @module services
 * Public barrel export for all EcoPilot business logic services.
 * Consumers should import from "@/services" rather than individual modules.
 */
export { CarbonService } from "./carbon";
export { DashboardService } from "./dashboard";
export type { DashboardChartData } from "./dashboard";
export { ChallengeService } from "./challenge";
export type { UserChallenge } from "./challenge";
export { RewardsService } from "./rewards";
export type { Achievement, TierInfo, AchievementId } from "./rewards";
export { VerificationService } from "./verification";
export type { VerificationRecord } from "./verification";
export { AIService } from "./ai";
export type { Recommendation } from "./ai";

/**
 * @module ai
 * Barrel re-export for backward-compatible AI service imports.
 * Implementation is split across focused modules:
 *   - recommendation-types.ts    — Recommendation interface + RawRecommendationItem
 *   - prompt-builder.ts          — Gemini prompt construction
 *   - recommendation-parser.ts   — JSON response parsing
 *   - fallback-engine.ts         — Local rule-based fallback engine
 *   - ai-service.ts              — AIService orchestrator class
 */
export type { Recommendation } from "./recommendation-types";
export { AIService } from "./ai-service";

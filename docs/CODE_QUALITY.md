# EcoPilot Code Quality Report

EcoPilot is engineered with a focus on code quality, maintainability, type safety, and runtime resilience. This report outlines the architecture and patterns that make the codebase stable, readable, and production-ready.

## Architecture Principles

EcoPilot is structured around four core architectural tenets:

1. **Separation of Concerns**: UI presentation is decoupled from computational logic. Core calculation mechanics, gamification logic, and scoring models reside in standalone services, keeping React views lightweight and focused on layout and user interactions.
2. **Service-Oriented Business Logic**: Key workflows (carbon calculations, rewards, challenge assignment, and completion validation) are implemented as isolated service classes. Each module has a single responsibility and is independently testable.
3. **Single Source of Truth**: Business constants (emission thresholds, diet values, vehicle factors, chart colors, timeouts) live exclusively in `src/lib/constants.ts`. No magic numbers are repeated across modules.
4. **Strict Type-Safety**: The platform runs on TypeScript strict mode with zero `any` usage — every parameter, return type, and catch clause is explicitly typed.

## Project Structure

```text
src/
├── app/          # Next.js App Router (Pages, Layouts, and API Route Handlers)
├── components/   # Presentational UI Components (Charts, Forms, Modals)
├── services/     # Business logic modules (Carbon, Challenges, Rewards, AI)
│   ├── index.ts             — Public barrel export
│   ├── carbon.ts            — Carbon footprint scoring
│   ├── dashboard.ts         — Sustainability rating and chart data
│   ├── rewards.ts           — Points, tiers, and achievement badges
│   ├── verification.ts      — Challenge verification and history
│   ├── challenge.ts         — Barrel re-export (backward compatible)
│   ├── challenge-service.ts — Challenge generation orchestrator
│   ├── challenge-types.ts   — UserChallenge interface
│   ├── diet-challenges.ts   — Diet category challenge definitions
│   ├── transport-challenges.ts   — Transport category challenge definitions
│   ├── electricity-challenges.ts — Electricity category challenge definitions
│   ├── ai.ts               — Barrel re-export (backward compatible)
│   ├── ai-service.ts       — AIService orchestrator
│   ├── prompt-builder.ts   — Gemini prompt construction
│   ├── recommendation-parser.ts — JSON response parsing
│   ├── fallback-engine.ts  — Local rule-based recommendation engine
│   └── recommendation-types.ts  — Recommendation type definitions
├── lib/          # Central utility configurations (Gemini, Supabase, Validation Schemas, Constants)
├── types/        # Shared TypeScript interfaces and domain schemas
└── hooks/        # Reusable React hooks wrapping system events and state
tests/            # Unit & Integration test suite executed via Jest
```

### Why Each Folder Exists

- **app**: Handles path routing, server-side entry points, and API endpoints. Keeps all Next.js-specific concerns isolated.
- **components**: Isolated, reusable UI presentations that accept typed props. No business logic resides here — only rendering.
- **services**: Pure TypeScript modules executing business calculations with zero React dependency. Each service file has a single responsibility.
- **lib**: Standard configurations (e.g., Zod schemas, client setups, application-wide constants).
- **types**: Consolidates interface definitions for domain entities to avoid duplicate declarations.

## Type Safety Strategy

The project enforces strict compilation across all files:

- **Zero `any` Usage**: Every parameter, return type, class property, and catch clause is explicitly typed. `catch (err: unknown)` is used throughout.
- **Explicit Interfaces**: All domain entities (User, Assessment, Challenge, VerificationRecord, Recommendation) are strongly typed.
- **Raw Payload Types**: `RawRecommendationItem` interface is used to type unvalidated external API responses before they are narrowed.
- **Discriminated Unions**: Status fields use `VerificationStatus | "not_started"` union types rather than raw strings.
- **No Implicit Returns**: All service methods have explicit return type annotations.

## Validation Strategy

To prevent corrupted local states and validate serverless parameters, EcoPilot integrates **Zod**:

- **Form Validations**: User assessment selections (family size, transit mileage, engine type) are validated before calculations execute.
- **API Request Validations**: Server route payloads are strictly parsed via `coachRequestSchema`, rejecting malformed queries before execution.
- **Text Length Audits**: Verification logs require a minimum of 20 and maximum of 500 characters, validated via schema.
- **File Upload Restrictions**: File metadata (type, size ≤5 MB) is validated at upload time.

## DRY (Don't Repeat Yourself) Enforcement

Emission lookup tables previously duplicated across `AICoachCard`, `ChallengeList`, and service modules have been consolidated:

- **Diet emissions** → `CarbonService.getDietEmissions(preference)`
- **Transport emissions** → `CarbonService.getTransportEmissions(vehicleType, distance)`
- **Electricity emissions** → `CarbonService.getElectricityEmissions(bill, familySize)`
- **Chart colors** → `CHART_COLORS` constant object
- **Electricity thresholds** → `HIGH_ELECTRICITY_BILL_THRESHOLD` and `HIGH_ELECTRICITY_EMISSIONS_THRESHOLD`
- **API timeout** → `GEMINI_TIMEOUT_MS`

## Error Handling Strategy

EcoPilot guarantees graceful degradation:

- **User-Friendly Messaging**: Catch blocks map low-level operational failures to clear, actionable warning notifications.
- **Typed Error Handling**: All catch clauses use `catch (err: unknown)` to avoid silent type coercion.
- **Fallback Rule Heuristics**: If the external Gemini API is unconfigured or rate-limited, the application fails over to the local `fallback-engine.ts` heuristic module instantly.
- **Graceful UI Degradation**: Layout panels display clean formatted fallbacks without crashing parent pages.

## AI Reliability Strategy

EcoPilot implements a fail-safe AI hierarchy via `ai-service.ts`:

1. **Check Availability**: Validates whether a valid `GEMINI_API_KEY` is configured.
2. **Deterministic Fallback**: If unconfigured, the `fallback-engine.ts` local engine generates profile-tailored guidelines instantly with zero external dependency.
3. **Timeout Protection**: Gemini requests race against a `GEMINI_TIMEOUT_MS` deadline, falling back gracefully on timeout.
4. **Response Validation**: `recommendation-parser.ts` validates and narrows all Gemini JSON responses before use.

## Component Quality

- **AssessmentForm**: Refactored to extract reusable `FormField` and `FormSelect` sub-components, eliminating structural duplication across the 5 input fields.
- **ChallengeList**: Emission calculations delegated to `CarbonService` — no inline lookup tables.
- **AICoachCard**: Emission calculations delegated to `CarbonService` — no inline lookup tables.
- **CarbonBreakdownChart**: Recharts tooltip props typed via `RechartsPayloadEntry` interface.

## Testing Strategy

EcoPilot maintains regression protection through an automated test suite:

- **Unit Testing**: Isolated tests target carbon scoring, point allocations, and badge unlocking.
- **Service Integration Testing**: Validates that challenge selections align correctly with assessment profiles and that the AI fallback engine produces correct output.
- **Metrics**: **64 Automated Tests Passing** across 8 test suites (all suites passing successfully on Jest). Core workflows are verified, validating calculations and state transitions.

## Security Considerations

Security practices implemented:

- **Zod Input Sanitization**: Prevents XSS and injection vectors via strict input schema boundaries.
- **Key Isolation**: Server-side keys (`GEMINI_API_KEY`) reside exclusively in server environments and are never bundled in client assets.
- **Payload Limits**: Verification submissions capped at 500 characters, mitigating request bloat.
- **No Client-Side AI Calls**: All Gemini interactions are server-side via the `/api/coach` route handler.

## Maintainability Principles

- **Single Responsibility Modules**: Each service file does one thing. `prompt-builder.ts` builds prompts. `fallback-engine.ts` returns fallbacks. No module exceeds 160 lines.
- **Barrel Re-Exports**: `src/services/index.ts` provides a clean public API surface for all business logic.
- **Backward Compatibility**: Original `ai.ts` and `challenge.ts` are barrel re-exports — zero import path breakage across the application.
- **Named Constants**: Magic numbers and strings are centralized in `src/lib/constants.ts` with JSDoc explanations.
- **Documentation-First**: Documentation is maintained alongside code to reflect current implementations.

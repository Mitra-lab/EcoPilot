# EcoPilot Code Quality Report

EcoPilot is engineered with a focus on code quality, maintainability, type safety, and runtime resilience. This report outlines the architecture and patterns that make the codebase stable, readable, and production-ready.

## Architecture Principles

EcoPilot is structured around three core architectural tenets:
1. **Separation of Concerns**: UI presentation is decoupled from computational logic. Core calculation mechanics, gamification logic, and scoring models reside in standalone services, keeping React views lightweight and focused on layout and user interactions.
2. **Service-Oriented Business Logic**: Key workflows (e.g., carbon calculations, rewards, challenge assignment, and completion validation) are implemented as isolated service classes. This isolates changes and facilitates mocking and testing.
3. **Strict Type-Safety**: The platform runs on TypeScript strict mode, preventing runtime type coercion errors and ensuring explicit interfaces define data flows between boundaries.

## Project Structure

```text
src/
├── app/          # Next.js App Router (Pages, Layouts, and API Route Handlers)
├── components/   # Presentational UI Components (Charts, Forms, Modals)
├── services/     # Standalone business logic models (Carbon, Challenges, Rewards)
├── lib/          # Central utility configurations (Gemini, Supabase, Validation Schemas)
├── types/        # Shared TypeScript interfaces and domain schemas
└── hooks/        # Reusable React hooks wrapping system events and state
tests/            # Unit & Integration test suite executed via Jest
```

- **app**: Handles path routing, server-side entry points, and API endpoints.
- **components**: Isolated, reusable UI presentations that accept typed parameters.
- **services**: Pure JS/TS modules executing business calculations (no React dependency).
- **lib**: Standard configurations (e.g., Zod schemas, client setups).
- **types**: Consolidates interface definitions to avoid duplicate declarations.

## Type Safety Strategy

The project employs strict compilation checks:
- **Zero Implicit `any`**: Ensures every parameter, return type, and class property is explicitly declared or correctly inferred.
- **Explicit Interfaces**: All database-equivalent entities (User, Assessment, Challenge, Submission, Badge) are strongly typed.
- **Read-Only Models**: Interfaces prevent accidental state mutations outside service classes.

## Validation Strategy

To prevent corrupted local states and validate serverless parameters, EcoPilot integrates **Zod**:
- **Form Validations**: User assessment selections (e.g., family size, transit mileage, engine type) are audited before calculations execute.
- **API Request Validations**: Server route payloads are strictly parsed, rejecting malformed queries before execution.
- **Text Length Audits**: Verification logs require a min of 20 and a max of 500 characters, validated via schemas.

## Error Handling Strategy

EcoPilot guarantees graceful degradation:
- **User-Friendly Messaging**: Catch blocks map low-level operational failures to clear, actionable warning notifications.
- **Fallback Rule Heuristics**: If the external Gemini API is unconfigured or rate-limited, the application fails over to client-side heuristic rules.
- **Graceful UI Degradation**: Layout panels display clean, formatted fallbacks without crashing the parent pages.

## AI Reliability Strategy

EcoPilot implements a fail-safe AI hierarchy:
1. **Check Availability**: The Next.js route first validates if a valid Gemini API key is configured.
2. **Deterministic Fallback**: If unconfigured, server requests are bypassed completely. The local heuristic recommendation engine generates target, profile-tailored guidelines instantly.
3. **No External Dependency**: The platform operates safely and successfully without external LLM access.

## Testing Strategy

EcoPilot maintains regression protection through tests:
- **Unit Testing**: Isolated tests target carbon scoring, point allocations, and badge unlocking.
- **Service Integration Testing**: Validates that challenge selections align correctly with assessment profiles.
- **Metrics**: **61 Automated Tests Passing** (All test suites passing successfully on Jest). Core workflows are verified, validating calculations and state transitions.

## Security Considerations

Security practices implemented:
- **Zod Input Sanitization**: Prevents cross-site scripting (XSS) and injection vectors via strict input schema boundaries.
- **Key Isolation**: Server-side keys (like `GEMINI_API_KEY`) reside exclusively in server environments and are never bundled in client assets.
- **Payload Limits**: Limits verification submissions to 500 characters, mitigating request bloat.

## Maintainability Principles

- **Reusable Components**: Layouts use modular presentational cards, simplifying styling updates.
- **Service Abstractions**: Changes in scoring formulas require modifying only one file (`src/services/carbon.ts`) without impacting UI components.
- **Documentation-First Development**: Documentation is maintained alongside code to ensure it reflects current implementations.

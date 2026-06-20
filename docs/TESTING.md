# Testing Strategy

## Testing Frameworks

### Unit and Integration Testing
- **Framework**: Jest with SWC compiler transformation (`jest.config.js`).
- **Target**: Pure helper functions, math logic (`src/services/carbon.ts`), AI prompt logic and parsers (`src/services/ai.ts`), challenge generation (`src/services/challenge.ts`), rating calculations (`src/services/dashboard.ts`), validator schemas (`src/lib/validations.ts`), verification flows (`src/services/verification.ts`), and rewards tier structures (`src/services/rewards.ts`).

### UI Component Testing
- **Framework**: React Testing Library with `@testing-library/react` and `jest-environment-jsdom`.
- **Target**: Assessment forms, dashboard metrics layout.

### End-to-End (E2E) Testing
- **Framework**: Playwright (`playwright.config.ts`).
- **Target**: User onboarding, full carbon score calculations, challenge submissions.

---

## Test Execution

### Run Unit/Integration Tests
```bash
npm run test
```

### Run Playwright E2E Tests
```bash
npm run test:e2e
```

---

## Core Test Cases

### Assessment Scoring & Validation
- ✓ Valid carbon calculations for combinations of travel distances, diets, and energy bills (`tests/carbon.test.ts`).
- ✓ Null / negative bounds handler behavior and edge case inputs (`tests/assessment.test.ts`).
- ✓ Zod schema rejection on missing inputs or empty submissions (`tests/assessment.test.ts`).
- ✓ Realism Sprint Scenarios: Balanced lifestyle, Heavy commuter, Vegetarian household, High electricity usage, and Large family per-capita scaling (`tests/assessment.test.ts`).

### Dashboard Metrics & Conversions
- ✓ Letter grade allocation based on carbon score levels (`tests/dashboard.test.ts`).
- ✓ Data conversions from form payloads into categorized chart segments (`tests/dashboard.test.ts`).

### AI Coach Recommendations
- ✓ Prompt generation validation with formatted carbon data parameters (`tests/ai.test.ts`).
- ✓ Recommendation parse validation (JSON parsing, code-fence striping, field verification) (`tests/ai.test.ts`).
- ✓ Local fallback recommendation engine matching highest emission source category (`tests/ai.test.ts`).
- ✓ Personalized profile verification validation (Vegan, Vegetarian, Balanced, Meat Lover, No Vehicle, Hybrid, Gasoline, Low/High electricity profiles generating customized advice with no contradictory guidelines) (`tests/ai.test.ts`).

### Weekly Habits & Challenges
- ✓ Category matching verification ensuring user's highest emission source is correctly identified (`tests/challenge.test.ts`).
- ✓ Dynamic targeted challenge list generation corresponding to impact classification (`tests/challenge.test.ts`).
- ✓ Personalized profile verification validation (Vegan, Vegetarian, Balanced, Meat Lover, No Vehicle, Hybrid, Gasoline, Low/High electricity profiles generating customized challenges with no contradictory guidelines) (`tests/challenge.test.ts`).

### Verification & Action Audit
- ✓ Verification notes text validations (min 20, max 500 characters) via Zod (`tests/verification.test.ts`).
- ✓ Self-verified status mappings and creation parameters (`tests/verification.test.ts`).
- ✓ Local storage persistence and retrieval log simulation (`tests/verification.test.ts`).

### Rewards & Achievement Standings
- ✓ Tier names transition triggers based on points bounds (`tests/rewards.test.ts`).
- ✓ Progress calculation to the next standing levels and target offsets (`tests/rewards.test.ts`).
- ✓ Badge unlocking triggers for first verified action, 3 challenges, 100 green points, and grades (`tests/rewards.test.ts`).

### Form Validations
- ✓ File metadata size and file format checker bounds.

---

## Final Test Suite Summary

The test suite consists of 8 separate test suites covering 61 individual unit/integration scenarios. All tests run cleanly.

### Test Suites Result
```text
PASS tests/rewards.test.ts
PASS tests/challenge.test.ts
PASS tests/dashboard.test.ts
PASS tests/verification.test.ts
PASS tests/ai.test.ts
PASS tests/carbon.test.ts
PASS tests/assessment.test.ts
PASS tests/landing.test.tsx

Test Suites: 8 passed, 8 total
Tests:       61 passed, 61 total
```


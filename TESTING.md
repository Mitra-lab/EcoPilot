# Testing Strategy

## Testing Frameworks

### Unit and Integration Testing
- **Framework**: Jest with SWC compiler transformation (`jest.config.js`).
- **Target**: Pure helper functions, math logic (`src/services/carbon.ts`), rating calculations (`src/services/dashboard.ts`), and validator schemas (`src/lib/validations.ts`).

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

### Dashboard Metrics & Conversions
- ✓ Letter grade allocation based on carbon score levels (`tests/dashboard.test.ts`).
- ✓ Data conversions from form payloads into categorized chart segments (`tests/dashboard.test.ts`).

### Form Validations
- ✓ File metadata size and file format checker bounds.

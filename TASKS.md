# EcoPilot Tasks Tracker

## Project Foundation Setup
* [x] Review project documentation and requirements
* [x] Create project directory structure (app, components, services, lib, types, hooks, tests)
* [x] Recommend project dependencies
* [x] Generate initial development plan
* [x] Initialize and configure package.json and config files (tsconfig.json, tailwind.config.js, eslint, prettier)
* [x] Configure testing environment (Jest, React Testing Library, Playwright)
* [x] Create environment variable and client configuration templates (Supabase, Gemini AI)
* [x] Implement application constants, enums, and domain model interfaces
* [x] Implement input validation schemas (Zod schemas for assessment, submissions, metadata)
* [x] Implement carbon calculation service logic and run initial unit tests

## Phase 1 MVP Implementation Plan
All tasks follow the MVP First Policy workflow:
`Assessment → Dashboard → AI Recommendations → Challenges → Verification → Rewards`

### 1. Carbon Assessment
* [x] Design assessment form UI (family size, electricity bill, vehicle type, travel distance, diet)
* [x] Implement assessment state management and page logic (`src/app/assessment/`)
* [x] Create reusable UI layout components: `AssessmentCard`, `AssessmentForm`, `AssessmentResult`
* [x] Add loading states, error states, and strict TypeScript types
* [x] Verify assessment functionality and perform boundary/error test validations
* [x] Review and refine carbon scoring weights (diet, transport, utility scaling) for realism and trust

### 2. Dashboard
* [x] Build Dashboard presentation shell (`src/app/dashboard/`)
* [x] Integrate data visualizations (Recharts) for carbon score and trends
* [x] Add streak indicators, green points display, and rating blocks
* [x] Integrate mock or real data from Supabase DB/Services (localStorage integration completed for MVP experience)
* [x] Implement reusable layout components: `DashboardHeader`, `MetricCards`, `CarbonBreakdownChart`, `SustainabilityRating`, `ImpactSummaryCard`
* [x] Calibrate Sustainability Grade ranges and descriptions to align with realistic footprint distributions

### 3. AI Recommendations (Coach)
* [x] Design AI recommendation layout in coach panel
* [x] Implement Gemini AI prompt orchestrator (`src/services/ai.ts`) with failure/timeout handling
* [x] Add recommendations generator API endpoint (`src/app/api/coach/route.ts`)
* [x] Implement local fallback recommendation engine when Gemini API is offline/unavailable
* [x] Create reusable UI layout components: `AICoachCard`, `RecommendationList`, `ImpactBadge`
* [x] Add loading states, error states, and retry fetching triggers

### 4. Challenges
* [x] Define weekly challenges list catalog targeting largest emissions category (`src/services/challenge.ts`)
* [x] Develop challenges view layout on Dashboard page
* [x] Build individual challenge selection and progress tracking
* [x] Implement reusable UI components: `ChallengeCard`, `ChallengeList`, `ChallengeProgress`, `ChallengeCompleteButton`
* [x] Build self-verification completion mechanism storing results in `localStorage`

### 5. Verification
* [x] Build verification service at `src/services/verification.ts` supporting validations and log tracking
* [x] Create reusable verification UI components: `VerificationModal`, `VerificationBadge`, `VerificationHistory`
* [x] Connect verification submissions to dashboard points allocation updates
* [x] Persist verification logs history under `localStorage` to survive page refreshes
* [ ] Integrate Supabase Storage client helper for file uploads
* [ ] Build Gemini AI verification evaluator service (text/image analysis)
* [ ] Implement verification security controls (max 5MB, format check, sanitization)

### 6. Rewards
* [x] Implement tier checking and points progress indicators in `src/services/rewards.ts`
* [x] Define rules for unlocking achievement badges (First Verified, 3 Challenges, 100 points, A, A+)
* [x] Create reusable UI components: `RewardsPanel`, `RewardProgressCard`, `AchievementGrid`, `AchievementBadge`
* [x] Mount RewardsPanel on Dashboard page to display real-time tier updates and badge locks
* [x] Persist unlocked badges state in `localStorage` to survive refreshes

---

## Documentation Tasks
* [x] Document API routes and directories in ARCHITECTURE.md
* [x] Document security controls and validations in SECURITY.md
* [x] Document testing configurations and test suites in TESTING.md
* [x] Document challenge weekly activity and rewards standing workflow flows in WORKFLOW.md
* [ ] Add setup and run scripts guidance to README.md

---

## Security Tasks
* [ ] Configure Supabase Authentication (Email/Password & OAuth)
* [ ] Set up PostgreSQL Row Level Security (RLS) policies
* [x] Implement Zod validators for all API endpoints and forms
* [ ] Apply rate limiting middleware on AI and upload endpoints
* [ ] Conduct sanitization/isolation audits for AI prompts

---

## Testing Tasks
* [x] Set up Jest testing framework configuration
* [x] Write unit tests for carbon calculators and score generators
* [x] Write unit tests for Gemini parser functions and Zod validations
* [x] Set up Playwright for E2E testing
* [x] Write unit tests for weekly challenge logic and category mapping
* [x] Write unit tests for weekly rating calibration range transitions
* [x] Write unit tests for verification notes validation, transitions, and history logging
* [x] Write unit tests for rewards progress and badge unlocks
* [ ] Implement E2E tests for Assessment-to-Dashboard flows

---

## Deployment Tasks
* [ ] Configure production environments in Vercel
* [ ] Set up Supabase production database instance
* [ ] Define and secure production environment secrets (Gemini API Key, Supabase Auth Keys)

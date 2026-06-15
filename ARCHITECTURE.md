# EcoPilot Architecture

## Overview

EcoPilot follows a modern serverless architecture built on Next.js 15, Supabase, and Gemini AI.

## Project Structure

```text
src/
├── app/          # Next.js App Router (Pages & APIs)
│   ├── assessment/ # Carbon footprint assessment wizard UI page
│   ├── dashboard/  # Main carbon tracking analytics dashboard
│   ├── globals.css # Global styles and Tailwind setups
│   └── layout.tsx  # Application layout shell
├── components/   # UI Presentation Components
│   ├── AssessmentCard.tsx   # Elegant card component wrapper
│   ├── AssessmentForm.tsx   # Interactive validation form for carbon inputs
│   ├── AssessmentResult.tsx # Interactive presentation of calculation breakdown
│   ├── DashboardHeader.tsx  # Header banner showing user profile overview
│   ├── MetricCards.tsx      # Multi-metric display cards for scores, grades, points
│   ├── CarbonBreakdownChart.tsx # Proportional data visualizer utilizing Recharts
│   ├── SustainabilityRating.tsx # Performance grading panel mapping ratings
│   └── ImpactSummaryCard.tsx    # Suggestions card for high return modifications
├── hooks/        # React Hooks (e.g. useAuth)
├── lib/          # Utilities & Configs (supabase, gemini, constants, validations)
├── services/     # Core Business Logic (carbon, ai, dashboard)
└── types/        # Shared TypeScript Types
tests/            # Test Suites
```

## Components

### Frontend

Responsibilities:
- User authentication state management
- Carbon Assessment wizard
- User Action Dashboard
- Weekly Challenges dashboard

Technology:
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- shadcn/ui
- Recharts (Interactive charting)

---

### Backend / Services

Responsibilities:
- Carbon emission computations (`src/services/carbon.ts`)
- Dashboard conversions and rating grades (`src/services/dashboard.ts`)
- Schema and form validations (`src/lib/validations.ts`)
- Client configurations (`src/lib/supabase.ts`, `src/lib/gemini.ts`)
- AI recommendations and challenge verification (`src/services/ai.ts`)

Technology:
- Next.js Route Handlers (Serverless APIs)

---

### Database & Storage

Supabase PostgreSQL & Storage:
- Tables: Users, Assessments, Challenges, Submissions, Rewards
- Storage Buckets: Evidence uploads

---

### AI Layer

Gemini 2.5 Flash:
- Evaluates carbon assessments to produce guidance.
- Evaluates evidence uploads (text/image) to verify challenge completions.

---

## Data Flow

Refer docs/diagrams/architecture.md

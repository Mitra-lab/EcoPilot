# EcoPilot — Final Submission Report

## Executive Summary

EcoPilot is a sustainability behavior-change platform designed to bridge the awareness-to-action gap. Built with Next.js 15, TypeScript, and Tailwind CSS, the platform enables users to calculate their per-capita environmental footprint, receive personalized action recommendations, adopt weekly habit challenges, and verify their completions in a gamified environment. By focusing on accountability and continuous habit loops, EcoPilot transitions sustainability from a simple one-time calculator into a lifetime habit-formation system.

## Problem

Traditional carbon footprint calculators stop at awareness. They present users with complex annual emissions graphs and raw numbers (tons of CO₂/year) but fail to provide actionable direction, clear motivation, or verification-backed accountability. Consequently, users leaving these platforms feel overwhelmed yet lack the structured habits or follow-through necessary to lower their environmental footprint.

## Solution

EcoPilot solves this by implementing an end-to-end behavior-change framework:
1. **Interactive Assessment**: Easily captures user factors to estimate household and per-capita footprints.
2. **Personalized Insights**: Delivers target action guidelines structured around a user's exact lifestyle profile.
3. **Personalized Challenges**: Dynamically assigns weekly challenges targeting the user's highest footprint categories.
4. **Accountability Loops**: Enforces completion descriptions (minimum 20 characters) and logs them in local history to promote reflective verification.
5. **Gamification & Rewards**: Motivates sustained improvement through Green Points, progression tiers (Eco Starter to Planet Guardian), and unlocking badges.

## Why It Matters

Numbers alone do not change lifestyle patterns. EcoPilot is built specifically around the psychology of habit formation. By connecting footprint calculations to daily, achievable habits and securing those habits through a validation check, EcoPilot helps users take incremental, cumulative actions that translate to real-life carbon reductions.

## Product Vision

Awareness alone does not create environmental impact. Real change happens when people actively transition from passive understanding to consistent behavioral improvement. The vision for EcoPilot is to make sustainable living accessible, actionable, and trackable. By providing personalized guidance, encouraging active commitment, and maintaining a transparent accountability loop, EcoPilot transforms environmental consciousness into verified, daily habits that scale from individual actions to community-wide impact.

## Architecture Overview

EcoPilot is built on a clean, decoupled architecture:
- **Presentation Layer**: Built with Next.js 15, TypeScript, and Tailwind CSS. Kept thin and presentation-focused, utilizing local state persistence.
- **Business Logic Layer**: Decoupled under `src/services/` (`carbon.ts`, `rewards.ts`, `challenge.ts`, `verification.ts`), ensuring high testability.
- **State & Persistence**: Simulated databases built on browser `localStorage` ensuring zero cold starts, offline readiness, and immediate execution.

## Personalized Insights

EcoPilot employs a hybrid recommendation architecture:
- **Local Recommendation Engine**: A rule-based client heuristic engine that matches user assessment inputs to custom guidance cards completely offline without requiring any API keys.
- **Optional Gemini 3.5 Flash Integration**: Serverless Route Handlers that augment local cards with generative AI details when a `GEMINI_API_KEY` is present. If unconfigured, the app falls back instantly to the local recommendation engine without initiating network calls, ensuring 0% latency overhead and zero network failures.

## Sustainability Impact Model

Unlike one-time calculators, EcoPilot utilizes a continuous improvement cycle:

```text
Understand Impact (Assessment)
↓
Identify Highest Emission Source (Data Analytics)
↓
Receive Personalized Insights
↓
Complete Sustainability Challenges (Action)
↓
Submit Verification Notes (Accountability)
↓
Earn Points & Badges (Motivation)
↓
Build Long-Term Habits (Sustained Lifestyle Change)
```

## Technical Highlights

- **Next.js 15 & App Router**: Fast, optimized serverless environment.
- **TypeScript Strict Mode**: Strongly typed structures ensuring zero implicit `any` usage.
- **Zod Validation**: Robust input parsing for forms and API routes.
- **61 Automated Tests Passing**: Comprehensive Jest unit/integration suite covering scoring, rewards, challenges, and validations.
- **Vercel Deploy Ready**: Optimized production builds compile with 0 warnings.

## Deployment

🔗 Live Application: [https://eco-pilot-snowy.vercel.app](https://eco-pilot-snowy.vercel.app)
🔗 GitHub Repository: [https://github.com/Mitra-lab/EcoPilot](https://github.com/Mitra-lab/EcoPilot)

## Documentation

- [README.md](./README.md) — Comprehensive landing page and usage instructions.
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System layout, ADRs, reliability, and security schemas.
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Environment variables setup and Vercel guidelines.
- [ROADMAP.md](./ROADMAP.md) — Future releases, including cloud integration.
- [SECURITY.md](./SECURITY.md) — Secret management and Zod validators.
- [TESTING.md](./TESTING.md) — Verification summaries and test execution commands.

## Key Differentiators

- **Action-Oriented focus** instead of abstract numbers.
- **Hybrid intelligence** combining deterministic local heuristics with optional LLM integration.
- **Structured verification** detailing textual evidence logs to prevent "cheap clicks".
- **Zero cold-starts** with serverless routes and localStorage persistence.

## Future Vision

- **Phase 2 (Cloud Persistence)**: Introduce Supabase client syncing and RLS security.
- **Phase 3 (AI Verification)**: Deploy Gemini Vision audits to verify user evidence uploads.
- **Phase 4 (Community Teams)**: Group challenges and collaborative carbon offset leaderboards.

## Submission Readiness

EcoPilot is fully verified, production-ready, and deployed:
- **Active Deployment**: Checked and smoke-tested on Vercel.
- **TypeScript strict compatibility**: 100% type safety checked.
- **61/61 Jest Tests Passing**: Verified green.
- **No dependencies on unconfigured variables**: Application runs reliably on the fallback engine without Gemini API configuration.

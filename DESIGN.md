# EcoPilot

## Tagline

AI-powered sustainability guidance for everyday actions.

---

# 1. Executive Summary

EcoPilot is an AI-powered Carbon Footprint Awareness Platform designed to help individuals understand, track, verify, and reduce their environmental impact through personalized recommendations, challenge-based habit formation, AI-assisted verification, and measurable progress tracking.

Unlike traditional carbon footprint calculators that stop after displaying a footprint estimate, EcoPilot focuses on helping users take practical actions and build sustainable habits over time.

The platform transforms sustainability from a one-time calculation into a continuous improvement journey.

---

# 2. Problem Statement

Most existing carbon footprint platforms focus primarily on awareness.

Typical user journey:

1. Enter information
2. Receive carbon footprint estimate
3. View recommendations
4. Leave the platform

Problems:

* One-time engagement
* Generic recommendations
* No accountability
* No habit formation
* No verification
* No progress tracking

As a result, users understand their footprint but rarely take meaningful action to reduce it.

---

# 3. Proposed Solution

EcoPilot helps users:

* Understand environmental impact
* Receive personalized guidance
* Take measurable actions
* Verify completed actions
* Earn sustainability rewards
* Track long-term improvement

Core philosophy:

Awareness → Action → Verification → Improvement

---

# 4. Project Goals

## Primary Goal

Help users reduce their environmental impact through simple and achievable actions.

## Secondary Goals

* Increase sustainability awareness
* Encourage habit formation
* Create accountability
* Make sustainability engaging
* Provide measurable progress

---

# 5. Target Users

## Primary Users

Individuals who want to live more sustainably.

Examples:

* Students
* Working professionals
* Families
* Environment-conscious citizens

## Secondary Users

Families tracking sustainability together.

## Future Users

* Communities
* Apartment complexes
* Schools
* Small organizations

---

# 6. Unique Value Proposition

Most tools answer:

"What is my carbon footprint?"

EcoPilot answers:

"What should I do next?"

Unique differentiators:

* Personalized AI recommendations
* Challenge-based engagement
* AI-assisted verification
* Green Points system
* Progress tracking
* Sustainability coaching

---

# 7. User Personas

## Persona 1

Name: Priya

Age: 28

Profession: Software Engineer

Goal:

Reduce electricity consumption and build sustainable habits.

---

## Persona 2

Name: Rahul

Age: 35

Profession: Marketing Manager

Goal:

Understand how transportation choices affect environmental impact.

---

## Persona 3

Name: Family Household

Goal:

Work together to improve sustainability habits.

---

# 8. Core Features

## Feature 1: Carbon Assessment

Purpose:

Understand current environmental impact.

Input:

* Family Size
* Monthly Electricity Bill
* Vehicle Type
* Weekly Travel Distance
* Diet Preference

Output:

* Carbon Score
* Sustainability Summary
* Major Impact Areas

---

## Feature 2: AI Sustainability Coach

Purpose:

Generate personalized action plans.

Examples:

* Reduce AC usage by 1 hour
* Use public transport twice weekly
* Replace disposable bottles

Output:

* Recommended actions
* Difficulty level
* Potential impact

Powered by Gemini AI.

---

## Feature 3: Weekly Challenges

Purpose:

Convert recommendations into actions.

Examples:

* Walk 2 km
* Use reusable bottle
* Avoid single-use plastics
* Turn off unused appliances

Attributes:

* Difficulty
* Impact Score
* Green Points

---

## Feature 4: AI-Assisted Verification

Purpose:

Introduce accountability.

Challenge completion requires evidence.

Supported Evidence:

* Text explanation
* Image upload

Verification Levels:

### Self Verified

User confirmation only.

### AI Verified

Evidence reviewed by AI.

### Evidence Verified

Supported by stronger proof.

Possible Results:

* Verified
* Likely Verified
* Needs More Evidence

---

## Feature 5: Green Points System

Purpose:

Reward sustainable behavior.

Example:

Reusable Bottle → +10

Walk 2km → +20

Public Transport → +25

Reduced Energy Usage → +50

---

## Feature 6: Dashboard

Purpose:

Track progress.

Displays:

* Carbon Score
* Green Points
* Challenges Completed
* Sustainability Streak
* Achievement Badges
* Estimated Impact Reduction

---

# 9. Optional Features

These may be implemented if time permits.

## Electricity Bill Upload

Upload:

* PDF
* JPG
* PNG

AI extracts:

* Units Consumed
* Cost
* Billing Period

Benefits:

* Faster onboarding
* Better recommendations

---

## Family Mode

Family members can:

* Join household
* Share progress
* Complete challenges together

---

## Monthly Reports

Generate sustainability summaries.

---

# 10. User Flow

## First-Time User

Landing Page

↓

Register/Login

↓

Complete Carbon Assessment

↓

Generate Carbon Score

↓

Receive AI Recommendations

↓

Dashboard

---

## Daily User Flow

Login

↓

View Challenges

↓

Complete Activity

↓

Submit Evidence

↓

AI Verification

↓

Earn Green Points

↓

Dashboard Updated

---

# 11. Gamification Strategy

## Green Points

Reward sustainable behavior.

## Streaks

Daily and weekly consistency tracking.

## Achievement Badges

Examples:

* Green Starter
* Eco Explorer
* Carbon Champion
* Climate Hero

## Progress Indicators

Show visible improvements over time.

---

# 12. AI Features

## AI Sustainability Coach

Generates:

* Recommendations
* Weekly plans
* Action priorities

---

## AI Verification

Evaluates challenge completion evidence.

---

## Bill Analysis

Extracts data from uploaded utility bills.

---

# 13. Technical Design

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts

---

## Backend

* Next.js Route Handlers

---

## Database

* Supabase PostgreSQL

---

## Storage

* Supabase Storage

---

## AI

* Gemini 2.5 Flash

---

## Deployment

* Vercel

---

# 14. Database Entities

## Users

Stores:

* Name
* Email
* Authentication

---

## Assessments

Stores:

* Carbon inputs
* Carbon score
* Assessment history

---

## Challenges

Stores:

* Challenge catalog
* Points
* Impact values

---

## Challenge Submissions

Stores:

* Evidence
* Verification results

---

## Rewards

Stores:

* Green points
* Badges
* Achievements

---

# 15. Security Requirements

## Authentication

Supabase Auth

## Authorization

Row-Level Security

## Validation

Zod validation

## File Upload Controls

Allowed:

* PDF
* JPG
* PNG

Maximum Size:

5 MB

## Secret Management

Environment Variables

## AI Safety

Prompt isolation and sanitization

---

# 16. Non-Functional Requirements

## Performance

Fast page loads

Optimized API calls

Lazy-loaded components

---

## Reliability

Stable deployment

Graceful error handling

Fallback responses

---

## Accessibility

Keyboard navigation

Responsive design

Contrast compliance

---

## Maintainability

Modular architecture

Reusable components

Strong typing

Documentation-first approach

---

# 17. Success Metrics

Successful Assessment Completion

User Receives Recommendations

Challenge Completion

Points Earned

Dashboard Updated

Positive User Experience

---

# 18. Future Roadmap

## Phase 2

* Family Accounts
* Bill Analysis
* Monthly Reports

## Phase 3

* Community Challenges
* Sustainability Leaderboards
* Shared Goals

## Phase 4

* Travel Tracking
* Utility Integrations
* Verified Carbon Savings
* Sustainability Marketplace

---

# 19. Hackathon Alignment

EcoPilot directly addresses:

"Design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights."

The platform focuses on actionable sustainability improvements, accountability, measurable impact, and long-term behavior change rather than one-time calculations.

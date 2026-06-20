# EcoPilot Documentation Index

This document lists and defines the purpose of all core documentation files for the EcoPilot sustainability behavior-change platform. 

Reviewers and developers can navigate the repository using the map below.

## Documentation Index Map

| Document Title | Location | Purpose |
| --- | --- | --- |
| **README.md** | [README.md](../README.md) | Central landing page, quick evaluation guides, quality metrics, local setup, and technology overview. |
| **FINAL_SUBMISSION_REPORT.md** | [FINAL_SUBMISSION_REPORT.md](./FINAL_SUBMISSION_REPORT.md) | High-level summary of problem, solution, architecture, technical highlights, and deployment. |
| **ARCHITECTURE.md** | [ARCHITECTURE.md](./ARCHITECTURE.md) | System design details, Architectural Decision Records (ADRs), client-side persistence, and scalability plans. |
| **CODE_QUALITY.md** | [CODE_QUALITY.md](./CODE_QUALITY.md) | Code quality outlines, type-safety, validation models, Jest testing plans, and error management strategies. |
| **ACCESSIBILITY.md** | [ACCESSIBILITY.md](./ACCESSIBILITY.md) | Accessibility reports detailing semantic HTML, keyboard operability, WCAG contrast levels, and mobile grids. |
| **SECURITY.md** | [SECURITY.md](./SECURITY.md) | Outlines security controls, input schema validations (Zod), payload safety boundaries, and credential isolation. |
| **TESTING.md** | [TESTING.md](./TESTING.md) | Detail list of Jest unit/integration test cases, E2E targets, execution scripts, and execution outputs. |
| **DESIGN.md** | [DESIGN.md](./DESIGN.md) | Core UI design choices, color palettes, visual guidelines, user flows, and success metrics. |
| **WORKFLOW.md** | [WORKFLOW.md](./WORKFLOW.md) | User workflows and challenge verification pipelines. |
| **ROADMAP.md** | [ROADMAP.md](./ROADMAP.md) | Future releases mapping database integration, image uploads verification, and community offset metrics. |
| **DEPLOYMENT.md** | [DEPLOYMENT.md](./DEPLOYMENT.md) | Production setup, hosting config parameters, environment keys, and Vercel hosting guidelines. |
| **PRODUCTION_CHECKLIST.md** | [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) | Release checks, smoke testing steps, and deployment diagnostics. |
| **QUALITY_REPORT.md** | [QUALITY_REPORT.md](./QUALITY_REPORT.md) | High-level engineering analysis report evaluating code strengths and code quality risk. |
| **REPOSITORY_AUDIT_REPORT.md** | [REPOSITORY_AUDIT_REPORT.md](./REPOSITORY_AUDIT_REPORT.md) | Repository QA checks on relative paths, image assets, terminology, and final readiness scores. |

---

## Technical Stack Overview
- **Core Platform**: Next.js 15 (App Router), TypeScript (Strict Mode), Tailwind CSS.
- **AI Layers**: Local Recommendation Engine + Optional Gemini 3.5 Flash Integration.
- **Testing Engine**: Jest Unit/Integration (61 tests green).
- **Validation Schema**: Zod Schema Parsing.

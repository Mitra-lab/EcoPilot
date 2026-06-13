# EcoPilot Architecture

## Overview

EcoPilot follows a modern serverless architecture.

## Components

### Frontend

Responsibilities:

- User authentication
- Assessment forms
- Dashboard
- Challenge tracking

Technology:

- Next.js
- Tailwind

---

### Backend

Responsibilities:

- API endpoints
- Carbon calculations
- Challenge management
- AI orchestration

Technology:

- Route Handlers

---

### Database

Supabase PostgreSQL

Stores:

- Users
- Assessments
- Challenges
- Rewards
- Verifications

---

### Storage

Supabase Storage

Stores:

- Uploaded images
- Challenge evidence

---

### AI Layer

Gemini 2.5 Flash

Responsibilities:

- Recommendations
- Verification
- Bill analysis

---

## Data Flow

Refer docs/diagrams/architecture.md

---

## Scalability Considerations

- Stateless APIs
- Managed database
- Serverless deployment
- Cached AI responses

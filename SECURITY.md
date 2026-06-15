# Security Controls

## Authentication

Supabase Authentication
- Configured at the client initialization boundary (`src/lib/supabase.ts`).
- Supported methods: Email/Password, Google OAuth.

---

## Authorization

Row Level Security (RLS)
- Applied at the Supabase database level.
- Users can query and modify only their own data.

---

## Input Validation

Zod schema enforcement is applied on all boundary entries (`src/lib/validations.ts`):
- **Carbon Assessment Form**: Ensures integer family counts and positive utility bills.
- **Challenge Submissions**: Enforces structured text and URLs.
- **File Upload Metadata**: Enforces size, MIME-types, and headers.

---

## File Upload Security

Supabase Storage bucket policy restrictions:
- Max size: 5 MB (`fileUploadMetadataSchema` enforcement).
- Allowed MIME types: `image/jpeg`, `image/png`, `application/pdf`.

---

## API Security

- Server-side execution of all Gemini AI pipelines.
- API keys stored in environment variables (`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) and never exposed to the client.

---

## Rate Limiting

Applied on API boundaries:
- AI coach and recommendation routes.
- Challenge submission endpoints.

---

## Prompt Injection Protection

- Prompts isolated using structured schemas.
- Inputs sanitized before injection into the LLM context.

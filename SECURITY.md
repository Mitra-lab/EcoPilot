# Security Controls

## Authentication

Supabase Authentication

Supported:

- Email/Password
- Google OAuth

---

## Authorization

Row Level Security (RLS)

Users can access only their own records.

---

## Input Validation

Zod validation on:

- Forms
- API requests
- Upload metadata

---

## File Upload Security

Allowed:

- jpg
- jpeg
- png
- pdf

Maximum:

- 5 MB

---

## API Security

- Server-side Gemini access
- Environment variables
- No exposed secrets

---

## Rate Limiting

Applied on:

- AI endpoints
- Upload endpoints

---

## Prompt Injection Protection

All AI prompts include:

- Instruction isolation
- Context sanitization

---

## OWASP Considerations

Mitigations:

- XSS
- Injection
- Broken Authentication
- Sensitive Data Exposure

---

## Future Security Enhancements

- Audit logs
- Admin controls
- Content moderation

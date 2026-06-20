# EcoPilot Production Deployment Checklist

This checklist outlines the steps required to deploy EcoPilot safely and repeatably to production.

---

## 📋 Pre-Deployment Checks

Before pushing the release to production, ensure the following validations pass:

- [ ] **Lint and Type Verification**:
  Ensure TypeScript compiles with zero errors:
  ```bash
  npx tsc --noEmit
  ```
- [ ] **Unit and Integration Tests**:
  Ensure the entire test suite passes:
  ```bash
  npm run test
  ```
- [ ] **Production Build Check**:
  Run the local production compile target to confirm Next.js compiles correctly:
  ```bash
  npm run build
  ```
- [ ] **Environment Variable Mapping**:
  Ensure that all environment keys are configured in Vercel settings:
  - `GEMINI_API_KEY`: Generative AI access token.
  - `NEXT_PUBLIC_SUPABASE_URL`: (Optional) Database URL connection.
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Optional) Database anonymous token.

---

## 🚀 Post-Deployment Smoke Tests

Once the deployment completes on Vercel, execute these smoke tests:

- [ ] **Landing Page Render**:
  Verify the landing page opens on the production URL. Ensure the CTA links to `/assessment` are functional.
- [ ] **Carbon Assessment Flow**:
  Complete the carbon assessment wizard, submit, and confirm it redirects to the `/dashboard` page.
- [ ] **Local Storage Persistence**:
  Refresh the dashboard and check that all points, scores, and calculated categories are preserved.
- [ ] **AI Coach recommendations failover**:
  Navigate to the AI Coach section. Verify recommendations load. (If `GEMINI_API_KEY` is not present, confirm the local fallback engine renders personalized cards).
- [ ] **Challenge Selection and Verification**:
  Click on a weekly challenge card, submit a verification log (minimum 20 characters), and verify points update immediately.

---

## 🔄 Rollback Guidance

In the event of a critical failure:

1. **Vercel Instant Rollback**:
   - Go to the Vercel Dashboard, select the **EcoPilot** project.
   - Navigate to the **Deployments** tab.
   - Locate the last stable deployment.
   - Click the three dots (...) and select **Rollback**.
2. **Git Rollback**:
   - Revert the problematic merge request or commit on the `main` branch.
   - Push to GitHub to trigger the automatic Vercel rebuild.

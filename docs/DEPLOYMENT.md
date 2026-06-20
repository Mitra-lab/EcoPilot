# EcoPilot Deployment Guidelines

This document details how to configure, build, and deploy the EcoPilot application in both local development and production environments.

## Environment Variables

EcoPilot requires several environment variables for full AI-powered features and database integrations. Create a `.env.local` file in the root directory:

```env
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Database Configuration (Optional for client-side offline MVP mode)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

> [!IMPORTANT]
> If `GEMINI_API_KEY` is omitted, the application automatically switches to a robust local rule-based fallback recommendation engine.

---

## Local Setup & Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run Code Quality Verifications**:
   * TypeScript compiler check:
     ```bash
     npx tsc --noEmit
     ```
   * Execute Unit/Integration Tests:
     ```bash
     npm run test
     ```

---

## Production Deployment to Vercel

1. **Vercel CLI (Optional)**:
   You can deploy directly using Vercel CLI:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Vercel Web Dashboard (Recommended)**:
   * Push your repository to GitHub, GitLab, or Bitbucket.
   * Go to the [Vercel Dashboard](https://vercel.com) and click **Add New** > **Project**.
   * Import the EcoPilot repository.
   * Under **Environment Variables**, add the environment keys described in the [Environment Variables](#environment-variables) section.
   * Click **Deploy**. Vercel will automatically compile the Next.js production build.

3. **Build Target Check**:
   Ensure that the Framework Preset is set to **Next.js**. The default install, build, and output directory settings will work out-of-the-box.

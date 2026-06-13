---
name: project-instant-lead-response
description: Context for the Real Estate Instant Lead Response System demo project
metadata:
  type: project
---

This is a production-style AI automation demo called "Instant Lead Response System for Real Estate."

**Why:** Demonstrates how real estate businesses can reduce lead loss with instant AI-powered responses.

**Stack:**
- Frontend: Next.js (App Router) + Tailwind CSS v4 + Framer Motion + Geist font
- Backend Automation: n8n (webhook → Google Sheets → OpenAI → Gmail)
- Design System: Rifat Design System v1.0 — Dark Luxury SaaS, accent #00E5FF, radius 24px

**Key files:**
- `app/page.tsx` — main page assembling all sections
- `app/api/submit-lead/route.ts` — POST endpoint forwarding to n8n webhook
- `components/LeadForm.tsx` — main inquiry form + HowItWorks + AutomationFlow panels
- `components/SuccessState.tsx` — success screen with AI score display + follow-up timeline
- `components/HeroSection.tsx` — headline, stats, badge
- `n8n-workflow/instant-lead-response.json` — main n8n workflow (import to n8n)
- `n8n-workflow/follow-up-sequence.json` — Day 2/5/7 follow-up workflow
- `.env.local` — set N8N_WEBHOOK_URL to activate the automation

**How to apply:** When continuing work on this project, use the design system variables defined in globals.css (--accent, --surface, --border, --radius etc.) and Framer Motion for all animations.

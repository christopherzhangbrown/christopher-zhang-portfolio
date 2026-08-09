# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** recruiters and hiring managers screening for general software engineering internships — specifically the **Summer 2027 internship cycle**. They arrive from a resume, a LinkedIn profile, or an application, usually skimming under time pressure alongside many other candidates.

**Also confirmed:**
- **Founders and small teams** hiring directly, often skimming on a referral before deciding whether to start a conversation.
- **Network and referral contacts** — peers, professors, alumni, and warm contacts who pass the link along. The link has to make someone else's introduction easy on Christopher's behalf.

The site is not currently optimized for AI/ML-specialist recruiters as a distinct audience, even though the work is AI-heavy.

## Product Purpose

A personal portfolio for Christopher Zhang that presents his engineering work, experience, and background in one place, and links out to his resume, GitHub, LinkedIn, and email.

**Success is recall, not conversion.** The confirmed win is that a visitor leaves with a distinct impression of who Christopher is, so the name lands later when it reappears in a pile of applicants. Contacting him, downloading the resume, and reading a case study are all supported and valuable, but none of them is the metric the site is being judged on. Work that trades memorability for conversion mechanics is working against the brief.

## Positioning

**Ships real AI systems** — not demos or notebooks. Production pipelines, platforms, and agents that people actually use. This is the one thing a visitor should remember, and it is backed by real work rather than asserted: the Scout Motors self-service developer platform and Kubernetes monitoring service, the AI Swim Start Coach computer-vision pipeline, and the AI Job Hunting Agent.

The secondary, undeclared advantage is that the AI work is paired with a Business Economics degree and real deployment/infrastructure surface (AWS, Kubernetes, Terraform, Argo CD) — unusual at the undergraduate internship level.

## Operating Context

- Visitors arrive predominantly from an application, LinkedIn, or a forwarded link, and often on the first pass spend well under a minute.
- Mobile visits are expected — recruiters and forwarded links open on phones.
- The site is the richer front door to a resume PDF that is also circulating independently. The two must not contradict each other.
- Recruiting season timing matters: the site must be credible during fall/winter Summer 2027 recruiting.

## Capabilities and Constraints

**Current surfaces:**
- `/` — single-page scroll: Hero → Education → Skills (Stack) → Experience → Projects → Contact, with hash-synced navigation via IntersectionObserver.
- `/projects/[id]` — five case-study pages (slugs `01`–`05`), each with problem, contributions, architecture, stack, and an image gallery.
- `/projects` — index route.

**Technical:** Next.js 15.2.8 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion, shadcn/ui + Radix primitives, `react-icons`, `three` (installed), Vercel hosting with Vercel Analytics. Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (mono), via `next/font/google`. Deployed at `https://christopher-zhang-portfolio.vercel.app`.

**Terminology used on the site:** sections are numbered (`001 — Education` … `005 — Contact`); the accent color token is named `signal`; hairline borders are the primary structural device.

**Undecided / open:**
- No custom domain — the Vercel subdomain is the canonical URL for now.
- Only one project (AI Job Hunting Agent) has a live demo link; no case study currently links a public repo. Whether more repos get linked is undecided.
- `public/profilepic.jpg` exists (2.9 MB) but is unused. Whether a photo of Christopher belongs on the site is undecided.
- Two resume PDFs sit in `public/`; `ChristopherZhangResume.pdf` is the one linked. The second is an unlinked duplicate.

## Brand Commitments

- Name: **Christopher Zhang**. No logo, wordmark, or brand system beyond the site itself.
- Contact identities are fixed: `christopher_zhang@brown.edu`, `github.com/christopher895`, `linkedin.com/in/christopher-zhang1`.
- The Brown varsity student-athlete identity **stays, as a secondary signal** — it belongs in education/context as credibility, but should not lead the hero or shape the visual story. Do not remove it; do not promote it.

## Evidence on Hand

**Real and verifiable — must be preserved:**
- **Scout Motors**, AI Engineer Intern, Charlotte NC, May 2026 — Present. AI security assistant (Copilot Studio, Jira) with a **projected $800K annual support-cost reduction**; a self-service developer platform reducing application onboarding **from 7 steps to 1 across 4 standardized service templates**; platform backend on AWS Lambda, Amazon Bedrock, and Terraform; an MCP server and Go Kubernetes monitoring service using client-go informers ingesting cluster state into PostgreSQL.
- **Mandy**, Software Engineer Intern, Remote, June 2025 — August 2025. AI room-redesign platform on Next.js, TypeScript, Clerk, IMGBB, Vercel, with an Amazon furniture recommendation pipeline.
- **Brown University**, Sc.B. Computer Science & A.B. Business Economics, expected May 2028, GPA 3.93/4.00, varsity student-athlete.
- **Five projects** with written case studies and real product screenshots in `public/`: AI Swim Start Coach (`/AIStart`), AI Job Hunting Agent (`/AI-Job-Agent`, live demo on Railway), Dating Profile Analyzer (`/DatingProfile`), TripPlanner (`/TravelPlanner`), Vision Transformer Evaluation Framework (`/DLFinal`, poster).
- **Resume PDF:** `public/ChristopherZhangResume.pdf`.

**Absences that must not be filled by invention:**
- No testimonials, references, quotes, endorsements, or named recommenders exist.
- No user counts, traffic numbers, revenue, funding, or adoption metrics exist for any project.
- No press, awards, publications, or company logos-as-clients exist.
- No further detail about Scout Motors internal work is available beyond what is already written — no additional architecture specifics, internal screenshots, or system names.

## Product Principles

1. **The resume is the source of truth.** Nothing appears on the site that isn't backed by the resume or a real project. No invented testimonials, users, outcomes, or affiliations — including as placeholder content.
2. **Metrics stay verbatim.** The $800K projected reduction and the 7-steps-to-1 onboarding claim are real, specific, and load-bearing. Never reword, round, re-scope, or embellish a number.
3. **Memorability over conversion.** The site is judged on whether the name is remembered. Distinctness earns its keep here in a way it wouldn't on a lead-gen page.
4. **Depth is the proof.** The claim is "ships real AI systems," so the evidence of engineering rigor — pipelines, failure handling, infrastructure — is the substance, not decoration around a list of tools.
5. **Skimmable in under a minute, rewarding for five.** The primary visitor is fast and the referral visitor is slower. Both readings have to work.

## Accessibility & Inclusion

No product-specific standard has been established. Baseline web accessibility applies: `prefers-reduced-motion` is already honored in the project grid tilt interaction and should be honored anywhere motion is added, given how motion-heavy the site is.

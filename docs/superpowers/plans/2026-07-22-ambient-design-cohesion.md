# Ambient Background & Section Cohesion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every page share one continuous ambient background layer and remove the opaque section fills that currently break that continuity, while reworking Stack into a row-list layout that keeps tech icons.

**Architecture:** Port the `AmbientBackground` component (a fixed, low-z-index decorative layer: conic gradient spin, noise, animated SVG lines, floating dots) from `nextjs-updates/` and mount it on all three top-level pages. Simplify `Hero` since its own background texture is now redundant with the ambient layer. Fix `Stack`, `Projects`, and `Contact`, which currently paint solid `bg-background` on rows/tiles as a hack to fake hairline dividers — replace that with `border-b border-hairline` / transparent-background dividers (as `Education` and `Experience` already do) so the ambient layer shows through everywhere.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4 (`@theme inline` tokens in `app/globals.css`), Framer Motion, `react-icons/si`.

## Global Constraints

- This repo has no automated test suite (`package.json` has no `test` script). Verification is manual: keep `pnpm dev` running in the background for the whole session and visually check `http://localhost:3000` after each task; the final task runs `pnpm build` as a type-check/production-build sanity check.
- Preserve all existing content/copy exactly (project data, experience bullets, coursework, contact links) — only backgrounds, borders, and the two explicitly-scoped layout changes (Hero, Stack) are in play.
- Don't touch `components/footer.tsx`, `components/sidebar.tsx`, `components/education.tsx`, or `components/experience.tsx` — they don't have the opaque-fill problem and aren't part of this change.
- Keep the current JS `useState`-based hover-highlight on tag pills and the hover image preview in `components/projects.tsx` — do not simplify these to CSS-only hover.
- `nextjs-updates/` stays in the repo untouched as a reference; nothing in this plan deletes it or imports from it at runtime (every port copies content into the real `app/`/`components/` files).

---

### Task 0: Start the dev server for the session

**Files:** none

- [ ] **Step 1: Start the dev server in the background**

Run: `pnpm dev` (background/long-running — leave it running for the rest of this plan)
Expected: Terminal prints `Ready` and a `http://localhost:3000` URL with no errors.

- [ ] **Step 2: Load the homepage once to confirm baseline**

Open `http://localhost:3000` in a browser and confirm the current (pre-change) site loads with no console errors. This is the baseline every later task's visual check is compared against.

---

### Task 1: Add the new keyframes to globals.css

**Files:**
- Modify: `app/globals.css:1-3`

**Interfaces:**
- Produces: CSS animation names `spin-slow`, `dash-flow`, `float-a`, `float-b`, `float-c`, `bob`, `label-glow` — consumed by Task 2 (`AmbientBackground`), Task 7 (`Section`), and Task 8 (`Stack`, optional).

- [ ] **Step 1: Insert the keyframes block after the two `@import` lines**

In `app/globals.css`, the file currently starts with:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
```

Change it to:

```css
@import "tailwindcss";
@import "tw-animate-css";

@keyframes spin-slow { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes dash-flow { to { stroke-dashoffset: -200; } }
@keyframes float-a { 0%,100% { transform: translate(0,0); opacity:0.6; } 50% { transform: translate(18px,-24px); opacity:1; } }
@keyframes float-b { 0%,100% { transform: translate(0,0); opacity:0.5; } 50% { transform: translate(-22px,18px); opacity:0.9; } }
@keyframes float-c { 0%,100% { transform: translate(0,0); opacity:0.3; } 50% { transform: translate(14px,20px); opacity:0.7; } }
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes label-glow { 0%,100% { opacity:0.55; } 50% { opacity:1; } }

@theme inline {
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: build completes with no CSS/type errors (these are additive keyframes; nothing references them yet, so visual output is unchanged).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add ambient background keyframes to globals.css"
```

---

### Task 2: Create the AmbientBackground component

**Files:**
- Create: `components/AmbientBackground.tsx`

**Interfaces:**
- Produces: `export function AmbientBackground(): JSX.Element` — a fixed, full-viewport, `pointer-events-none`, `z-0` decorative layer with no props. Consumed by Task 3, 4, 5.
- Consumes: keyframes from Task 1 (`spin-slow`, `dash-flow`, `float-a/b/c`), `--signal` CSS variable (already defined in `app/globals.css`), and the `.noise` utility class (already defined in `app/globals.css`).

- [ ] **Step 1: Create the file**

```tsx
"use client"

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <div
        className="absolute left-1/2 top-1/2 h-[1600px] w-[1600px] -translate-x-1/2 -translate-y-1/2 opacity-35 animate-[spin-slow_90s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, color-mix(in oklch, var(--signal) 12%, transparent), transparent 20%, transparent 55%, oklch(0.55 0.12 260 / 0.14), transparent 80%)",
        }}
      />
      <div className="noise absolute -inset-[10%] opacity-40" />

      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1600 4000">
        <line x1="120" y1="200" x2="420" y2="520" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_6s_linear_infinite]" />
        <line x1="420" y1="520" x2="300" y2="900" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_8s_linear_infinite]" />
        <line x1="1200" y1="1400" x2="1450" y2="1750" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_7s_linear_infinite]" />
        <line x1="1450" y1="1750" x2="1150" y2="2100" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_9s_linear_infinite]" />
        <line x1="200" y1="2600" x2="500" y2="2950" stroke="var(--signal)" strokeWidth="1" strokeDasharray="6 10" className="animate-[dash-flow_6.5s_linear_infinite]" />
        <line x1="1300" y1="3300" x2="1000" y2="3650" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 12" className="animate-[dash-flow_7.5s_linear_infinite]" />
        {[[120, 200], [420, 520], [1200, 1400], [1450, 1750], [200, 2600], [500, 2950], [1300, 3300]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="var(--signal)" />
        ))}
        {[[300, 900], [1150, 2100], [1000, 3650]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="currentColor" opacity="0.5" />
        ))}
      </svg>

      {[
        { top: "8%", left: "12%", size: 6, delay: "0s", dur: "9s", anim: "float-a" },
        { top: "22%", left: "78%", size: 4, delay: "0s", dur: "12s", anim: "float-b" },
        { top: "48%", left: "35%", size: 5, delay: "0s", dur: "14s", anim: "float-c" },
        { top: "65%", left: "88%", size: 5, delay: "2s", dur: "11s", anim: "float-a" },
        { top: "80%", left: "18%", size: 4, delay: "1s", dur: "10s", anim: "float-b" },
        { top: "130%", left: "22%", size: 5, delay: "1.5s", dur: "10s", anim: "float-c" },
        { top: "180%", left: "70%", size: 4, delay: "0.8s", dur: "12s", anim: "float-a" },
        { top: "230%", left: "40%", size: 6, delay: "2.4s", dur: "11s", anim: "float-b" },
      ].map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-signal"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 12px var(--signal)",
            animation: `${d.anim} ${d.dur} ease-in-out infinite ${d.delay}`,
          }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: build completes with no errors. The component isn't imported anywhere yet, so this only checks it compiles standalone.

- [ ] **Step 3: Commit**

```bash
git add components/AmbientBackground.tsx
git commit -m "feat: add AmbientBackground component"
```

---

### Task 3: Mount AmbientBackground on the homepage

**Files:**
- Modify: `app/page.tsx:1-11` (imports), `app/page.tsx:68-70` (return block)

**Interfaces:**
- Consumes: `AmbientBackground` from Task 2.

- [ ] **Step 1: Add the import**

In `app/page.tsx`, change:

```tsx
import { Contact } from "@/components/contact"
```

to:

```tsx
import { Contact } from "@/components/contact"
import { AmbientBackground } from "@/components/AmbientBackground"
```

- [ ] **Step 2: Render it before `<main>`**

Change:

```tsx
  return (
    <>
      <main className="relative z-10 text-foreground">
```

to:

```tsx
  return (
    <>
      <AmbientBackground />
      <main className="relative z-10 text-foreground">
```

- [ ] **Step 3: Verify**

Open `http://localhost:3000` in the browser. Expected: the slow-spinning glow, faint noise, diagonal telemetry lines, and floating dots are now visible behind Hero and scroll continuously behind Education/Stack/Experience/Projects/Contact (Stack/Projects/Contact will still show a visible seam until Tasks 8–10 — that's expected at this point).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: mount AmbientBackground on the homepage"
```

---

### Task 4: Mount AmbientBackground on the /projects listing page

**Files:**
- Modify: `app/projects/page.tsx`

**Interfaces:**
- Consumes: `AmbientBackground` from Task 2.

- [ ] **Step 1: Add the import and render it**

Replace the full contents of `app/projects/page.tsx`:

```tsx
"use client"

import { Sidebar } from "@/components/sidebar"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { AmbientBackground } from "@/components/AmbientBackground"

export default function ProjectsPage() {
  return (
    <>
      <AmbientBackground />
      <Sidebar />
      <main className="relative z-10 text-foreground">
        <div className="pt-20">
          <Projects />
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000/projects` in the browser. Expected: same ambient layer visible behind the project rows as on the homepage, no layout shift, Sidebar/Footer unchanged.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: mount AmbientBackground on the /projects listing page"
```

---

### Task 5: Mount AmbientBackground on the project case-study page and fix its background tokens

**Files:**
- Modify: `app/projects/[id]/page.tsx:1-3` (imports), `app/projects/[id]/page.tsx:127-128` (root wrapper)

**Interfaces:**
- Consumes: `AmbientBackground` from Task 2.

- [ ] **Step 1: Add the import**

Change:

```tsx
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Github, X } from "lucide-react"
```

to:

```tsx
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Github, X } from "lucide-react"
import { AmbientBackground } from "@/components/AmbientBackground"
```

- [ ] **Step 2: Swap the hardcoded background and mount the ambient layer**

Change:

```tsx
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
```

to:

```tsx
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientBackground />
      <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
```

- [ ] **Step 3: Verify**

Open `http://localhost:3000/projects/01` (or any valid id from `projectData`, e.g. `05`, `06`, `07`) in the browser. Expected: no black background flash — the page now uses the same dark `--background` token as the rest of the site, with the ambient layer visible behind the case-study card.

- [ ] **Step 4: Commit**

```bash
git add "app/projects/[id]/page.tsx"
git commit -m "feat: mount AmbientBackground on case-study pages, fix background tokens"
```

---

### Task 6: Simplify Hero to defer background texture to AmbientBackground

**Files:**
- Modify: `components/hero.tsx:14-20`

**Interfaces:**
- No interface changes — `Hero` keeps its existing `export function Hero()` signature with no props.

- [ ] **Step 1: Remove the inline texture layers and section border, add the bottom fade**

Change:

```tsx
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden border-b border-hairline" id="home">
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-lab opacity-[0.35]" />
        <div className="absolute inset-0 noise opacity-40" />
        <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-signal/10 blur-[120px]" />
        <TelemetrySVG />
      </motion.div>
```

to:

```tsx
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden" id="home">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-background to-transparent" />
      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-signal/10 blur-[120px]" />
        <TelemetrySVG />
      </motion.div>
```

- [ ] **Step 2: Verify**

Reload `http://localhost:3000`. Expected: Hero no longer has its own grid/noise texture or a hard border at its bottom edge — it now shows the ambient layer through it, with a soft fade into the Education section below instead of a hard line.

- [ ] **Step 3: Commit**

```bash
git add components/hero.tsx
git commit -m "refactor: simplify Hero background now that AmbientBackground provides site-wide texture"
```

---

### Task 7: Add the label-glow animation to Section's index label

**Files:**
- Modify: `components/Section.tsx:29`

**Interfaces:**
- No interface changes — `Section` keeps its existing props (`id`, `index`, `title`, `subtitle`, `children`).

- [ ] **Step 1: Add the animation class**

Change:

```tsx
                className="label !text-signal"
```

to:

```tsx
                className="label !text-signal animate-[label-glow_3s_ease-in-out_infinite]"
```

- [ ] **Step 2: Verify**

Reload `http://localhost:3000` and scroll to any section (e.g. Education's `001 — Education` label). Expected: the index label now pulses gently between ~55% and 100% opacity on a 3s loop.

- [ ] **Step 3: Commit**

```bash
git add components/Section.tsx
git commit -m "feat: add pulsing glow animation to section index labels"
```

---

### Task 8: Rework Stack to a row-list layout that keeps icons

**Files:**
- Modify: `components/stack.tsx:97-160` (the `Stack` component body — types, icon components, and `groups` data above it are unchanged)

**Interfaces:**
- No external interface changes — `Stack` keeps its existing `export function Stack()` signature with no props.
- Produces: rows using `border-b border-hairline` (transparent background) instead of the previous card-grid tiles, matching the divider pattern `Experience`/`Projects` use — no more opaque `bg-background` per skill tile.

- [ ] **Step 1: Replace the `Stack` component's render body**

Change the `export function Stack()` block from:

```tsx
export function Stack() {
  return (
    <Section
      id="stack"
      index="002 — Skills"
      title="Skills."
      subtitle="Programming languages, frameworks, data stores, and delivery tooling I use to build and ship."
    >
      <div className="space-y-px bg-hairline">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: gi * 0.06 }}
            className="grid grid-cols-12 gap-6 bg-background px-2 py-8"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="label">/{String(gi + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 font-display text-xl tracking-tight md:text-2xl">{g.title}</h3>
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))]">
                {g.items.map((t) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.99 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative overflow-hidden rounded-xl border border-hairline bg-background p-4 shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow duration-300 hover:bg-surface hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle at top left, ${t.bg}, transparent 70%)` }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex min-h-20 items-center gap-3">
                      <motion.span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-hairline bg-background/90"
                        style={{ backgroundColor: t.bg }}
                        whileHover={{ rotate: -6, scale: 1.08 }}
                        transition={{ duration: 0.25 }}
                      >
                        <t.Icon className="h-5 w-5" style={{ color: t.color }} />
                      </motion.span>
                      <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-0.5">
                        <div className="font-mono text-sm leading-tight">{t.name}</div>
                        {t.detail ? <div className="mt-1 font-mono text-[11px] leading-tight text-muted-foreground">{t.detail}</div> : null}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
```

to:

```tsx
export function Stack() {
  return (
    <Section
      id="stack"
      index="002 — Skills"
      title="Skills."
      subtitle="Programming languages, frameworks, data stores, and delivery tooling I use to build and ship."
    >
      <div>
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: gi * 0.06 }}
            className="grid grid-cols-12 gap-6 border-b border-hairline px-2 py-8"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="label">/{String(gi + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 font-display text-xl tracking-tight md:text-2xl">{g.title}</h3>
            </div>
            <div className="col-span-12 md:col-span-9 flex flex-wrap gap-x-9 gap-y-7">
              {g.items.map((t) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 4, filter: "brightness(1.15)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2.5"
                >
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-hairline"
                    style={{ backgroundColor: t.bg }}
                  >
                    <t.Icon className="h-4 w-4" style={{ color: t.color }} />
                  </span>
                  <div className="min-w-0" style={{ color: t.color }}>
                    <div className="font-mono text-sm text-foreground">{t.name}</div>
                    {t.detail && <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{t.detail}</div>}
                    <div className="mt-1 h-px w-full opacity-55" style={{ background: "currentColor" }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Verify**

Reload `http://localhost:3000#stack`. Expected: Skills now render as rows (one per category, divider line at the bottom of each), each skill shown as a small icon badge + name + optional detail + thin underline, no card borders, no opaque tile background — the ambient layer is visible behind the whole section now. Hovering a skill nudges it right slightly and brightens it.

- [ ] **Step 3: Commit**

```bash
git add components/stack.tsx
git commit -m "refactor: rework Stack to row-list layout, drop opaque tile backgrounds"
```

---

### Task 9: Fix Projects to stop blocking the ambient layer

**Files:**
- Modify: `components/projects.tsx:56` (container), `components/projects.tsx:78-79` (`ProjectRow` className)

**Interfaces:**
- No interface changes — `Projects` and `ProjectRow` keep their existing signatures. Tag hover state (`useState<number | null>`) and the image hover preview are unchanged.

- [ ] **Step 1: Remove the container's gap-trick background**

Change:

```tsx
      <div className="space-y-px bg-hairline">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
```

to:

```tsx
      <div>
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
```

- [ ] **Step 2: Replace the row's opaque background with a border + transparent hover**

Change:

```tsx
      className="group relative grid w-full grid-cols-12 items-center gap-6 bg-background px-2 py-8 text-left transition-colors hover:bg-surface"
```

to:

```tsx
      className="group relative grid w-full grid-cols-12 items-center gap-6 border-b border-hairline bg-transparent px-2 py-8 text-left transition-colors hover:bg-foreground/[0.04]"
```

- [ ] **Step 3: Verify**

Reload `http://localhost:3000#projects`. Expected: project rows now have a divider line instead of a solid fill, the ambient layer shows through, and hovering a row still gives a subtle highlight (now translucent instead of a solid surface swap) without breaking the tag hover-highlight or the image preview on hover.

- [ ] **Step 4: Commit**

```bash
git add components/projects.tsx
git commit -m "fix: stop Projects rows from blocking the ambient background layer"
```

---

### Task 10: Fix Contact to stop blocking the ambient layer

**Files:**
- Modify: `components/contact.tsx:74-79` (resume card), `components/contact.tsx:93-104` (profile grid + links)

**Interfaces:**
- No interface changes — `Contact` keeps its existing `export function Contact()` signature with no props. Copy-to-clipboard behavior is unchanged.

- [ ] **Step 1: Remove the opaque background from the resume card**

Change:

```tsx
            <a
              href="/SWEResumeChristopherZhang.pdf"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between border border-hairline bg-background p-4 hover:border-signal transition-colors"
            >
```

to:

```tsx
            <a
              href="/SWEResumeChristopherZhang.pdf"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between border border-hairline p-4 hover:border-signal transition-colors"
            >
```

- [ ] **Step 2: Replace the profile grid's gap-trick with border dividers**

Change:

```tsx
        <div className="mt-12">
          <div className="grid gap-px bg-hairline md:grid-cols-3">
            {profiles.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col justify-between bg-background p-8 hover:bg-surface transition-colors"
              >
```

to:

```tsx
        <div className="mt-12">
          <div className="grid divide-y divide-hairline border-y border-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
            {profiles.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col justify-between p-8 hover:bg-foreground/[0.04] transition-colors"
              >
```

- [ ] **Step 3: Verify**

Reload `http://localhost:3000#contact`. Expected: the resume card and the three profile links (GitHub/LinkedIn/Email) no longer show a solid fill — dividers between them are now a hairline border, and the ambient layer is visible through the whole Contact section, matching the rest of the page.

- [ ] **Step 4: Commit**

```bash
git add components/contact.tsx
git commit -m "fix: stop Contact from blocking the ambient background layer"
```

---

### Task 11: Full-site visual QA and production build check

**Files:** none (verification only)

- [ ] **Step 1: Scroll the full homepage**

At `http://localhost:3000`, scroll from Hero through Contact/Footer in one continuous pass. Expected: the ambient background (spin glow, noise, telemetry lines, floating dots) is visible and unbroken behind every section — no visible seams or flat solid-color bands at Stack, Projects, or Contact.

- [ ] **Step 2: Check the /projects listing and a case-study page**

Visit `http://localhost:3000/projects` and `http://localhost:3000/projects/01`. Expected: both show the same ambient layer, the case-study page has no black-background flash, and both pages' content is still fully readable (foreground/background contrast preserved).

- [ ] **Step 3: Run a production build**

Run: `pnpm build`
Expected: build completes successfully with no type errors, e.g. ending in `✓ Compiled successfully`.

- [ ] **Step 4: Commit (only if Step 3 required fixes)**

If Step 3 needed any fixes, stage and commit them:

```bash
git add -A
git commit -m "fix: resolve build issues from ambient design cohesion pass"
```

If no fixes were needed, there is nothing to commit for this task.

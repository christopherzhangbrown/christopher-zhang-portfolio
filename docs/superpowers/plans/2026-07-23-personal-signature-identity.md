# Personal-Signature Identity Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fictional "instrument panel" copy (footer, case-study header, experience index, hero label) with a personal-signature register, and add three motion touches (scroll progress rail, mouse-reactive ambient background, project-row hover tilt) that reinforce a "crafted by hand" feel without narrative roleplay.

**Architecture:** Four small, independent copy edits in existing components, plus one new globally-mounted component (`ScrollProgress`, following the existing `CursorTrail` pattern already in `app/layout.tsx`) and two additive motion changes to existing components (`AmbientBackground`, `components/projects.tsx`). No new dependencies — everything uses `framer-motion`, already installed and already used throughout the codebase.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion.

## Global Constraints

- This repo has no automated test suite (`package.json` has no `test` script). Verification is manual: keep `pnpm dev` running for the whole session, visually check `http://localhost:3000` after each task, and the final task runs `pnpm build` as a type-check/production-build sanity check.
- Package manager is `pnpm` (`pnpm-lock.yaml` present) — use `pnpm`, not `npm`, in all commands.
- Custom cursor is **already shipped** on `main` as `components/CursorTrail.tsx`, already mounted in `app/layout.tsx`. Do not create a new cursor component or modify `CursorTrail.tsx` — it's out of scope for this plan.
- Do not touch the SVG "flight path" line/dot motif in `Hero`'s `TelemetrySVG` or the `<svg>` block inside `AmbientBackground` — visual texture, not narrative copy, stays as-is per the approved spec.
- Do not change `Location` / `Status` in the Hero side panel, the `Available` nav badge, or section index labels (`001 — Education`, etc.) — these are genuine personal-status conventions, not fictional-system framing, and were explicitly kept in the spec.
- Full design rationale: `docs/superpowers/specs/2026-07-23-personal-signature-identity-design.md`.

---

### Task 0: Start the dev server for the session

**Files:** none

- [ ] **Step 1: Start the dev server in the background**

Run: `pnpm dev` (background/long-running — leave it running for the rest of this plan)
Expected: terminal prints `Ready` and a `http://localhost:3000` URL with no errors.

- [ ] **Step 2: Load the homepage once to confirm baseline**

Open `http://localhost:3000` in a browser and confirm the current site loads with no console errors. This is the baseline every later task's visual check is compared against.

---

### Task 1: Case-study header copy

**Files:**
- Modify: `app/projects/[id]/page.tsx:139`

**Interfaces:** none — plain JSX text change, no props/signatures affected.

- [ ] **Step 1: Drop the `CASE_STUDY` narrative tag, match the site's `.label` convention**

Change:

```tsx
            <div className="font-mono text-xs tracking-widest text-muted-foreground">CASE_STUDY / {project.title.toUpperCase()}</div>
```

to:

```tsx
            <div className="label">Case study / {project.title}</div>
```

(`.label` in `app/globals.css` already applies `font-family: mono`, `font-size: 0.7rem`, `letter-spacing: 0.18em`, `text-transform: uppercase`, and the muted-foreground color — so dropping the manual `.toUpperCase()` call is correct, the CSS class now handles casing, matching every other label on the site.)

- [ ] **Step 2: Verify**

Open `http://localhost:3000/projects/01` (or `05`, `06`, `07`). Expected: the header above the case-study image now reads "CASE STUDY / AI SWIM START ANALYZER" (rendered uppercase via CSS from "Case study / AI Swim Start Analyzer" in the source), same visual weight/position as before, just without the underscore.

- [ ] **Step 3: Commit**

```bash
git add "app/projects/[id]/page.tsx"
git commit -m "style: drop CASE_STUDY narrative tag, use site's label convention"
```

---

### Task 2: Experience index rename

**Files:**
- Modify: `components/experience.tsx:57`

**Interfaces:** none — plain JSX text change.

- [ ] **Step 1: Match the `/01` indexing convention already used in Stack and Projects**

Change:

```tsx
              <div className="text-signal">LOG_{String(i + 1).padStart(2, "0")}</div>
```

to:

```tsx
              <div className="text-signal">/{String(i + 1).padStart(2, "0")}</div>
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000#experience`. Expected: each entry's index now reads `/01`, `/02` (still in the signal accent color) instead of `LOG_01`, `LOG_02` — matching the `/01` style already used in the Stack and Projects sections.

- [ ] **Step 3: Commit**

```bash
git add components/experience.tsx
git commit -m "style: match experience index to /01 convention used in Stack and Projects"
```

---

### Task 3: Hero side-panel label rename

**Files:**
- Modify: `components/hero.tsx:27`

**Interfaces:** none — plain JSX text change.

- [ ] **Step 1: Drop the case-file framing**

Change:

```tsx
            <div className="label mb-2">Subject</div>
```

to:

```tsx
            <div className="label mb-2">Role</div>
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000`. Expected: the first item in Hero's left-column panel now reads "ROLE" (rendered uppercase via `.label`) above "AI Engineer", instead of "SUBJECT". `Location` and `Status` below it are unchanged.

- [ ] **Step 3: Commit**

```bash
git add components/hero.tsx
git commit -m "style: rename hero panel label Subject to Role"
```

---

### Task 4: Footer terminal-typing effect

**Files:**
- Modify: `app/globals.css:9` (add a `blink` keyframe next to the existing keyframes)
- Modify: `components/footer.tsx` (replace the static status line with a typed terminal prompt)

**Interfaces:**
- Produces: CSS animation name `blink`, used only by this task's own component.
- No external interface changes — `Footer` keeps its existing `export function Footer()` signature with no props.

- [ ] **Step 1: Add the `blink` keyframe**

In `app/globals.css`, change:

```css
@keyframes label-glow { 0%,100% { opacity:0.55; } 50% { opacity:1; } }

@theme inline {
```

to:

```css
@keyframes label-glow { 0%,100% { opacity:0.55; } 50% { opacity:1; } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

@theme inline {
```

- [ ] **Step 2: Replace Footer's static line with a self-typing terminal prompt**

Replace the full contents of `components/footer.tsx`:

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const PROMPT = "christopher@zhang:~$ still building"

function TerminalLine() {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (!inView || chars >= PROMPT.length) return
    const timer = setTimeout(() => setChars((c) => c + 1), 35)
    return () => clearTimeout(timer)
  }, [inView, chars])

  return (
    <span ref={ref}>
      {PROMPT.slice(0, chars)}
      <span className="ml-0.5 inline-block w-[0.5em] animate-[blink_1s_step-end_infinite]">_</span>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          <TerminalLine />
        </div>
        <div>© 2026 Christopher Zhang.</div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Verify**

Reload `http://localhost:3000`, scroll down to the footer. Expected: the line types itself out character by character ("christopher@zhang:~$ still building"), with a blinking `_` cursor after it. Scroll away and back — it should not retype (plays once, per `useInView({ once: true })`). No console errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/footer.tsx
git commit -m "feat: replace footer status line with self-typing terminal prompt"
```

---

### Task 5: Scroll progress rail

**Files:**
- Create: `components/ScrollProgress.tsx`
- Modify: `app/layout.tsx:5` (import), `app/layout.tsx:38` (mount alongside `CursorTrail`)

**Interfaces:**
- Produces: `export function ScrollProgress(): JSX.Element` — a fixed-position, full-width, zero-props component. Consumed by `app/layout.tsx` only.

- [ ] **Step 1: Create the component**

```tsx
"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-signal"
      style={{ scaleX }}
    />
  )
}
```

(`z-[60]` sits above `Nav` (`z-10`) and `Sidebar`'s drawer/hamburger (`z-50`), but below `CursorTrail`'s dot/ring (`z-[9999]`/`z-[9998]`), so the cursor always stays on top.)

- [ ] **Step 2: Mount it in the root layout, next to `CursorTrail`**

In `app/layout.tsx`, change the import block:

```tsx
import { CursorTrail } from "@/components/CursorTrail"
import "./globals.css"
```

to:

```tsx
import { CursorTrail } from "@/components/CursorTrail"
import { ScrollProgress } from "@/components/ScrollProgress"
import "./globals.css"
```

and change the body:

```tsx
        <CursorTrail />
        {children}
        <Analytics />
```

to:

```tsx
        <CursorTrail />
        <ScrollProgress />
        {children}
        <Analytics />
```

- [ ] **Step 3: Verify**

Reload `http://localhost:3000` and scroll down. Expected: a thin amber (`--signal`) line at the very top of the viewport grows from 0 to full width as you scroll from top to bottom of the page. Check `http://localhost:3000/projects` and a `/projects/[id]` page too — the rail should appear on every route since it's mounted in the root layout.

- [ ] **Step 4: Commit**

```bash
git add components/ScrollProgress.tsx app/layout.tsx
git commit -m "feat: add scroll progress rail"
```

---

### Task 6: Mouse-reactive ambient background

**Files:**
- Modify: `components/AmbientBackground.tsx` (full file)

**Interfaces:**
- No external interface changes — `AmbientBackground` keeps its existing `export function AmbientBackground()` signature with no props.

- [ ] **Step 1: Wrap the conic-gradient halo and floating dots in a pointer-driven parallax layer**

Replace the full contents of `components/AmbientBackground.tsx`:

```tsx
"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function AmbientBackground() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 40, damping: 20 })
  const springY = useSpring(pointerY, { stiffness: 40, damping: 20 })
  const x = useTransform(springX, [-1, 1], [-16, 16])
  const y = useTransform(springY, [-1, 1], [-16, 16])

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [pointerX, pointerY])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <motion.div style={{ x, y }}>
        <div
          className="absolute left-1/2 top-1/2 h-[1600px] w-[1600px] -translate-x-1/2 -translate-y-1/2 opacity-35 animate-[spin-slow_90s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, color-mix(in oklch, var(--signal) 12%, transparent), transparent 20%, transparent 55%, oklch(0.55 0.12 260 / 0.14), transparent 80%)",
          }}
        />
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
      </motion.div>

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
    </div>
  )
}
```

(Only the conic-gradient halo and the floating dots move — the noise texture and SVG line motif stay fixed, per the spec's "Out of scope" note that the SVG line motif itself doesn't change.)

- [ ] **Step 2: Verify**

Reload `http://localhost:3000` and move the mouse around the viewport. Expected: the glow halo and floating amber dots drift a few pixels in the direction of the cursor with a slight lag (spring damping), while the noise texture and diagonal SVG lines stay still. Motion should be subtle — no jitter, no sudden jumps. Check this on `/projects` and a `/projects/[id]` page too, since `AmbientBackground` is mounted on all three.

- [ ] **Step 3: Commit**

```bash
git add components/AmbientBackground.tsx
git commit -m "feat: add mouse-reactive parallax to ambient background"
```

---

### Task 7: Project row hover tilt

**Files:**
- Modify: `components/projects.tsx:1-7` (imports), `components/projects.tsx:65-108` (`ProjectRow`)

**Interfaces:**
- No external interface changes — `ProjectRow`'s internal-only usage inside `Projects` is unchanged; `Projects` keeps its existing `export function Projects()` signature.

- [ ] **Step 1: Add the motion-value imports**

Change:

```tsx
import { motion } from "framer-motion"
```

to:

```tsx
import { motion, useMotionValue, useSpring } from "framer-motion"
```

- [ ] **Step 2: Add tilt tracking to `ProjectRow` and wire it into the hover preview**

Change the `ProjectRow` function from:

```tsx
function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const [hover, setHover] = useState(false)
  const [hoveredTag, setHoveredTag] = useState<number | null>(null)
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.push(`/projects/${project.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative grid w-full grid-cols-12 items-center gap-6 border-b border-hairline bg-transparent px-2 py-8 text-left transition-colors hover:bg-foreground/[0.04]"
    >
```

to:

```tsx
function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const [hover, setHover] = useState(false)
  const [hoveredTag, setHoveredTag] = useState<number | null>(null)
  const router = useRouter()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const handlePreviewMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 14)
    rotateX.set(py * -14)
  }

  return (
    <motion.button
      onClick={() => router.push(`/projects/${project.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        resetTilt()
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative grid w-full grid-cols-12 items-center gap-6 border-b border-hairline bg-transparent px-2 py-8 text-left transition-colors hover:bg-foreground/[0.04]"
    >
```

(This file already has a `hoveredTag` state and per-tag hover styling above the current `ProjectRow` signature shown in earlier reads — the plan's diff here only touches the destructured hooks and handlers at the top of `ProjectRow` and the JSX block below; the tag-hover JSX in the middle of the component is untouched by this task.)

Then change the hover-preview block near the bottom of `ProjectRow` from:

```tsx
      {hover && (
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="pointer-events-none absolute right-20 top-1/2 hidden h-40 w-64 -translate-y-1/2 overflow-hidden border border-hairline lg:block">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
        </motion.div>
      )}
```

to:

```tsx
      {hover && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseMove={handlePreviewMove}
          onMouseLeave={resetTilt}
          style={{ perspective: 800 }}
          className="absolute right-20 top-1/2 hidden h-40 w-64 -translate-y-1/2 overflow-hidden border border-hairline lg:block"
        >
          <motion.img
            src={project.image}
            alt=""
            style={{ rotateX: springRotateX, rotateY: springRotateY }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      )}
```

(Note: `pointer-events-none` is removed from the preview wrapper — it needs to receive `onMouseMove` for the tilt to track the cursor. It's a DOM descendant of the `motion.button`, so hovering it does not trigger the button's `onMouseLeave` — the preview only disappears when the cursor actually leaves the whole row.)

The tag pills between the title and blurb/tags columns (CSS-only hover color, no JS state) are untouched by this task — only the hooks/handlers at the top of `ProjectRow` and the hover-preview block at the bottom change.

- [ ] **Step 3: Verify**

Reload `http://localhost:3000#projects` on a desktop-width viewport (the preview only shows at `lg:` and up). Hover a project row and move the mouse across the floating preview image on the right. Expected: the image tilts subtly in 3D following the cursor position, and resets to flat when the mouse leaves the preview or the row. Row navigation (click to open the case study) and the existing tag hover-highlight still work.

- [ ] **Step 4: Commit**

```bash
git add components/projects.tsx
git commit -m "feat: add cursor-tracked tilt to project row hover preview"
```

---

### Task 8: Full-site visual QA and production build check

**Files:** none (verification only)

- [ ] **Step 1: Scroll the full homepage**

At `http://localhost:3000`, scroll from Hero through Contact/Footer. Expected: scroll rail fills top-to-bottom, ambient background parallaxes gently with mouse movement, footer types itself out once reached, Hero panel reads "Role" not "Subject", no console errors.

- [ ] **Step 2: Check /projects and a case-study page**

Visit `http://localhost:3000/projects` (hover a row to check the tilt effect and confirm the scroll rail/parallax are present there too) and `http://localhost:3000/projects/01` (confirm the header reads "CASE STUDY / AI SWIM START ANALYZER" and the scroll rail/parallax are present).

- [ ] **Step 3: Confirm nothing regressed from the already-shipped CursorTrail**

Move the mouse around any page. Expected: the existing dot + trailing ring cursor still works exactly as before — this plan didn't touch `components/CursorTrail.tsx`.

- [ ] **Step 4: Run a production build**

Run: `pnpm build`
Expected: build completes successfully with no type errors, ending in `✓ Compiled successfully`.

- [ ] **Step 5: Commit (only if Step 4 required fixes)**

If Step 4 needed any fixes, stage and commit them:

```bash
git add -A
git commit -m "fix: resolve build issues from personal-signature identity pass"
```

If no fixes were needed, there is nothing to commit for this task.

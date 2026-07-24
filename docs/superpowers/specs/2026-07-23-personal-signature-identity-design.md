# Personal-signature identity pass (de-telemetry copy + motion additions)

## Context

The site's visual system (mono labels, hairline borders, `--signal` amber
accent, 12-col technical grid) is strong and stays as-is. Layered on top of
it, though, several pieces of copy adopt a fictional "instrument panel /
mission control" narrative — `AX / LAB — All systems nominal` in the footer,
`CASE_STUDY / [TITLE]` on case-study pages, `LOG_01` / `LOG_02` labeling work
history like flight-recorder entries, and `Subject` labeling the site owner
like a case file in the hero panel. This reads as roleplay ("you are looking
at a machine's internal log") rather than as a real person's site.

Goal: keep the tech-heavy visual language, but replace the fictional-system
copy with a "personal signature / hacker" register — terse and technical,
but unmistakably a real engineer's site, not a prop. Alongside the copy
fixes, add a small set of motion/interaction effects that reinforce that
same "crafted by hand" feeling without leaning on narrative.

Not every technical-sounding element needs to change — `Location` / `Status`
in the hero panel and the `Available` nav badge are genuine personal-status
conventions (comparable to a Slack or GitHub status), not fictional-system
narration, and stay untouched. Section indices (`001 — Education`, etc.) read
as a numbered technical document/TOC, not a system log, and also stay.

## Decisions

**Copy:**

- Footer (`components/footer.tsx`): `AX / LAB — All systems nominal` →
  `christopher@zhang:~$ still building`, self-typed character-by-character
  with a blinking cursor when scrolled into view (plays once). This is the
  one piece of pure narrative flavor text on the site, so it gets the
  strongest treatment — a real terminal prompt, not a fictional ops line.
- Case-study header (`app/projects/[id]/page.tsx`): `CASE_STUDY / [TITLE]` →
  `Case study / [Title]`, switched onto the site's existing `.label` utility
  class (plain words, CSS handles uppercase + letter-spacing) instead of a
  bespoke `SCREAMING_SNAKE_CASE` string — matches every other label on the
  site (`Coursework`, `Direct line`, `Resume`, etc.).
- Experience entries (`components/experience.tsx`): `LOG_01` / `LOG_02` →
  `/01` / `/02`. This was an actual inconsistency, not just tone — Stack and
  Projects already index as `/01`, `/02`; Experience was the only section
  using a `LOG_` prefix. Keeps the existing `text-signal` color emphasis on
  the index, just changes the string.
- Hero side panel (`components/hero.tsx`): `Subject` → `Role`. `Location`
  and `Status` are unchanged.

**Motion/interaction additions:**

- **Scroll progress rail** — thin `--signal`-colored bar, fixed to the top
  of the viewport, width driven by `useScroll`/`useTransform` (framer-motion
  is already a dependency, `hero.tsx` already imports `useScroll`). Mounted
  once in `app/layout.tsx` so it's present on every route, not duplicated
  per page.
- **Mouse-reactive ambient background** — `components/AmbientBackground.tsx`
  gets a subtle pointer-driven parallax offset on the floating dots and
  conic-gradient halo, using `useMotionValue` + `useSpring` so it damps
  smoothly instead of tracking the cursor 1:1.
- **Custom cursor** — new `components/CustomCursor.tsx`: a small dot with a
  lagging outer ring (not a crosshair/reticle — that reads as
  targeting/military, ruled out earlier in discussion). Mounted globally in
  `app/layout.tsx`. Disabled on touch/coarse-pointer devices via a
  `(pointer: fine)` media query check, so it never interferes with mobile.
- **Project row hover tilt** — `components/projects.tsx`: the existing
  hover-preview image (currently a static scale/opacity fade) gets a subtle
  cursor-tracked tilt (`rotateX`/`rotateY` via motion values) while hovered.

**Explicitly out of scope for this pass:**

- **Three.js hero centerpiece** — parked. Biggest lift of everything
  discussed (real engineering time, `three` is an installed but currently
  unused dependency), and not required for the tone shift — the existing
  flat SVG hero lines already carry the "technical" visual weight cheaply.
- **Instrument-style ticking number counters** — dropped. Same instinct as
  the metrics block already pulled out of case studies (see
  `app/projects/[id]/page.tsx`'s `{/* Metrics section removed per request */}`
  comment) — not introducing a stats-flex pattern that was already rejected
  once, and there aren't real numbers on the site worth counting up to.
- **Boot-sequence loading animation** — moot. It would have filled the
  dead time from the old `setTimeout(1500)` content gate in `app/page.tsx`,
  which was already removed as one of the "breaks" fixed earlier in this
  branch. There's no dead time left to fill.

## Changes by file

- **`app/globals.css`** — add a `blink` keyframe for the terminal cursor in
  the footer typing effect (simple opacity toggle, matches the existing
  keyframe style already in this file).
- **`components/footer.tsx`** — replace the static status line with a
  small typing-effect implementation (reveal the string on an interval,
  triggered by `whileInView`/`useInView` so it only plays once, on view).
- **`app/projects/[id]/page.tsx`** — case-study header copy + class change
  (both the found-project header and any shared header markup).
- **`components/experience.tsx`** — index string change (`LOG_XX` → `/XX`).
- **`components/hero.tsx`** — `Subject` → `Role` label text.
- **`app/layout.tsx`** — mount new `<ScrollProgress />` and `<CustomCursor />`
  components (both client components) alongside existing children.
- **`components/ScrollProgress.tsx`** (new) — the scroll-tracked top bar.
- **`components/CustomCursor.tsx`** (new) — the dot+ring cursor, gated to
  fine-pointer devices only.
- **`components/AmbientBackground.tsx`** — add pointer-driven parallax to
  the existing floating dots / conic gradient; no changes to the SVG line
  motif itself.
- **`components/projects.tsx`** — add tilt tracking to the existing hover
  preview `motion.div` in `ProjectRow`.

## Out of scope

- No changes to the SVG "flight path" line/dot motif in `Hero`'s
  `TelemetrySVG` or `AmbientBackground`'s SVG lines — these are visual
  texture, not narrative copy, and stay as-is.
- No changes to `Location` / `Status` in the hero panel, or the `Available`
  nav badge — legitimate personal-status conventions, not fictional-system
  framing.
- No changes to section index labels (`001 — Education`, etc.).
- Three.js, ticking counters, and boot sequence — see Decisions above.

## Testing

- `npm run build` / `npx tsc --noEmit` — no type errors from the new
  components or props.
- `npm run dev`, manually verify on homepage, `/projects`, and a
  `/projects/[id]` case study:
  - Scroll rail fills 0→100% width while scrolling, visible on all three
    routes.
  - Ambient background dots/halo shift subtly with mouse movement, no jitter
    or lag spikes.
  - Custom cursor (dot + trailing ring) tracks the pointer smoothly on
    desktop; confirm it does not render under touch/coarse-pointer
    emulation.
  - Footer line types itself out once scrolled into view; does not replay
    on every re-render/scroll past.
  - Project row hover preview tilts subtly following cursor position inside
    the image, resets cleanly on mouse-leave.
  - Updated copy renders correctly: "Case study / [Title]" on case pages,
    "/01" "/02" on Experience entries, "Role" in the Hero side panel.

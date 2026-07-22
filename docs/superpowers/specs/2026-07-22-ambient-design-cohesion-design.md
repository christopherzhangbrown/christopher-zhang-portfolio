# Ambient background & design cohesion update

## Context

`nextjs-updates/` (untracked, dropped into the repo alongside the live `app/`
and `components/` trees) contains a v0-generated iteration of this portfolio's
"lab notebook" design language — same color tokens, fonts, hairline borders,
and `label`/`signal` conventions already live on the site today. It is not a
new visual identity; it's a refinement layer on top of the existing one.

Diffing `nextjs-updates/` against the live site surfaces four real additions:

1. A new `AmbientBackground` component: a fixed, full-viewport layer behind
   all page content with a slow-spinning conic gradient, a noise texture, an
   animated SVG of diagonal "telemetry" lines and dots, and small floating
   glow dots — currently wired into `nextjs-updates/app/page.tsx` only.
2. A simplified `Hero`: the `grid-lab`/`noise` texture and `border-b` that
   Hero currently paints on itself are removed (that texture now lives in the
   global ambient layer instead of being duplicated), and a bottom
   fade-to-background gradient is added so Hero blends into the section below
   it.
3. A pulsing `label-glow` animation on `Section`'s index label (e.g.
   `001 — Education`).
4. A reworked `Stack` section: row-list layout (matching `Experience` /
   `Projects`) instead of bordered card tiles.

Separately, inspecting the live site's own components turned up the actual
cause of the "sections don't feel like one cohesive surface" complaint:
`Stack`, `Projects`, and `Contact` paint an opaque `bg-background` on every
row/tile as a trick to fake hairline dividers (a `bg-hairline` gap + solid
`bg-background` content), while `Education` and `Experience` do not. Once
`AmbientBackground` sits behind everything at low z-index, those opaque
fills block it from showing through in Stack/Projects/Contact while
Hero/Education/Experience stay transparent — producing a visible seam
between sections. `nextjs-updates/components/projects.tsx` already fixes
this for Projects (switches to `border-b border-hairline` + `bg-transparent`
rows); the same pattern needs to extend to Stack and Contact for full
cohesion, which nextjs-updates does not cover.

## Decisions

- **Stack section (hybrid):** adopt the row-list layout from
  `nextjs-updates/components/stack.tsx` (one row per category, `border-b
  border-hairline` divider, transparent background, no card border) but keep
  each skill's icon (not a plain color dot) next to the name and underline.
  Rationale: icons are more scannable for a skills section than color alone,
  but the row layout brings Stack in line with Experience/Projects and drops
  the opaque background fill that was blocking the ambient layer.
- **Ambient background scope:** mount `AmbientBackground` on every page —
  homepage (`app/page.tsx`), `/projects` listing
  (`app/projects/page.tsx`), and the case-study page
  (`app/projects/[id]/page.tsx`) — not just the homepage as in
  nextjs-updates. The case-study page currently hardcodes
  `bg-black text-white` instead of the shared design tokens; this will be
  swapped to `bg-background text-foreground` so it matches the rest of the
  site instead of clashing with the ambient layer.
- **Projects tag interactivity:** keep the current JS `useState`-based
  hover-highlight on tag pills and the hover image preview. nextjs-updates
  simplifies these to CSS-only hover, but that's not part of the cohesion or
  ambient-background goal, and the current interaction is preferable to
  losing it for no reason.
- **Footer / Sidebar:** left untouched. Neither paints an opaque background
  today, so there's no cohesion issue, and nextjs-updates doesn't touch them.

## Changes by file

- **`app/globals.css`** — add the keyframes nextjs-updates introduces
  (`spin-slow`, `dash-flow`, `float-a`, `float-b`, `float-c`, `bob`,
  `label-glow`). Purely additive; no existing rules change.
- **`components/AmbientBackground.tsx`** (new) — port directly from
  `nextjs-updates/components/AmbientBackground.tsx`.
- **`app/page.tsx`** — import and render `<AmbientBackground />` before
  `<main>`, matching nextjs-updates.
- **`app/projects/page.tsx`** — import and render `<AmbientBackground />`
  alongside the existing `<Sidebar />`/`<Footer />`.
- **`app/projects/[id]/page.tsx`** — import and render
  `<AmbientBackground />`; replace the hardcoded `bg-black text-white`
  wrapper with `bg-background text-foreground`.
- **`components/hero.tsx`** — remove the inline `grid-lab`/`noise` layer and
  the section-level `border-b border-hairline`; add the bottom
  fade-to-background gradient div, per nextjs-updates.
- **`components/Section.tsx`** — add the `label-glow` animation class to the
  index label.
- **`components/stack.tsx`** — replace the card-grid tile layout with a
  row-list layout (`border-b border-hairline`, transparent background) per
  category, keeping each skill's icon, name, optional detail line, and
  underline; keep the existing hover lift/brightness motion.
- **`components/projects.tsx`** — replace the `bg-hairline`/`bg-background`
  gap-trick container/rows with `border-b border-hairline` + `bg-transparent`
  rows, matching nextjs-updates. No change to tag interactivity or hover
  image preview logic.
- **`components/contact.tsx`** — replace the opaque `bg-background` on the
  resume card and the `bg-hairline`/`bg-background` gap-trick on the profile
  link grid with transparent/bordered treatment so this section stops
  blocking the ambient layer.

## Out of scope

- `nextjs-updates/` folder itself is not deleted or referenced at runtime;
  it's a design reference only. (Leaving the cleanup decision — delete vs.
  keep as reference — to a follow-up, not part of this change.)
- No changes to `Footer`, `Sidebar`, `Education`, `Experience`, or the
  `Contact` tag/copy interactions beyond the background-fill fix above.
- No dependency or routing changes.

## Testing

- `pnpm dev` and manually verify: ambient background visible and continuous
  behind Hero, Education, Stack, Experience, Projects, Contact, Footer with
  no visible seams; Stack rows show icons in the new layout; `/projects` and
  a `/projects/[id]` case-study page both show the ambient layer and use the
  shared background token (no black flash).
- `pnpm build` to confirm no type errors from the new component/props.

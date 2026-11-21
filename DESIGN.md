---
name: Christopher Zhang Portfolio
description: A dark, hairline-ruled page that leads with the person and the shipped work.
colors:
  instrument-amber: "oklch(0.82 0.17 78)"
  ink: "oklch(0.13 0.005 250)"
  bone: "oklch(0.97 0.005 250)"
  surface: "oklch(0.165 0.006 250)"
  surface-2: "oklch(0.21 0.006 250)"
  hairline: "oklch(0.36 0.008 250)"
  hairline-strong: "oklch(0.49 0.01 250)"
  muted: "oklch(0.62 0.01 250)"
  destructive: "oklch(0.6 0.22 25)"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8.5vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
    fontFeature: "\"ss01\", \"cv11\""
  lead:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.18em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  none: "0"
  base: "0.25rem"
  chip: "0.375rem"
  full: "9999px"
spacing:
  gutter: "1.5rem"
  page-x: "1.5rem"
  page-x-md: "2.5rem"
  row-y: "2.5rem"
  header-mb: "4rem"
  section-y: "6rem"
  section-y-md: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.instrument-amber}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem"
  button-ghost-hover:
    textColor: "{colors.instrument-amber}"
  icon-square:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    height: "2.75rem"
    width: "2.75rem"
  icon-square-hover:
    textColor: "{colors.instrument-amber}"
  eyebrow:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
  tag-hover:
    textColor: "{colors.instrument-amber}"
  row:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "2.5rem 0"
  row-hover:
    backgroundColor: "{colors.surface}"
---

# Design System: Christopher Zhang Portfolio

## Overview

**Creative North Star: "The Night Terminal"**

This is a developer's desk after hours, not a costume of one. The room is dark and one amber indicator is lit: the status dot next to what Christopher is looking for. The page leads with the person and the work, his photo beside his name and real product frames in every project row, and lets the evidence carry the technical identity instead of terminal props. Monospace is kept for what it is good at, metadata, tags, dates and labels, and never used as decoration.

The structure is drawn entirely with 1px rules. There are no cards, no shadows, no raised panels: content sits directly on the ground plane and is divided by hairlines, the way a schematic divides regions. There is no ambient background, no custom cursor and no looping decoration. An earlier version had a drifting node field, a conic sweep, a mix-blend cursor, numbered section labels and a typed terminal footer; they were removed in November 2026 because together they read as a template rather than as this person.

The type does the reporting in three voices, and they never trade jobs. Space Grotesk states things at enormous scale with tight negative tracking. Inter explains them in comfortable, unhurried paragraphs. JetBrains Mono annotates, indexes, and labels — and it is the only voice permitted to shout in uppercase. Motion is the last layer of the metaphor: nothing pops or bounces, everything *arrives* — a short rise from below with an expo-out curve, staggered ~80ms down a list, once, never again.

This world is explicitly not a light editorial page and explicitly not a generic dark SaaS template. Both were rejected. The absence of rounded cards, soft shadows, and gradient CTAs is not an oversight; it is the identity.

**Key Characteristics:**
- Near-black ground (`oklch(0.13 0.005 250)`) with a single warm amber accent and nothing else chromatic in the content layer
- Structure from hairline rules and a 12-column grid, never from cards or shadows
- Square corners by default; radius exists only for dots and one 28px icon chip
- Monospace uppercase labels for metadata and field names only, never as eyebrows above headings
- Real imagery first: a photo of Christopher in the hero and a product frame in every project row
- Motion that arrives once and settles; nothing loops

## Colors

A near-monochrome blue-black system with exactly one warm accent — the palette of a dark room with one instrument lit.

### Primary
- **Instrument Amber** (`oklch(0.82 0.17 78)`, token `--signal`): the only saturated color on the page. It marks what is live or actionable and nothing else: the static status dot, the 24px dash that precedes every bullet, the live-product badge, the hover state of every border, icon and project title, the 2px scroll-progress bar, the focus ring, the text-selection background, and the primary button's hover fill.
The system previously carried a second, dimmer gold (`#d7b04c`) hardcoded as the hover color of monospace tag lists. It has been removed: tag hover now uses Instrument Amber like every other interactive state, so the palette has exactly one accent and one source of truth.

### Secondary
- **Drift Violet** (`oklch(0.55 0.12 260 / 0.14)`): retired with the ambient background and removed from the palette.

### Neutral
- **Ink** (`oklch(0.13 0.005 250)`): the ground. Page background, and the text color on solid amber or bone surfaces. Faintly blue, never pure black.
- **Bone** (`oklch(0.97 0.005 250)`): primary text, and the fill of the primary button at rest. Faintly blue-white, never pure white.
- **Surface** (`oklch(0.165 0.006 250)`): the row-hover wash (applied at 50% opacity) and the backing for image containers. One step off the ground — barely perceptible, deliberately.
- **Surface 2** (`oklch(0.21 0.006 250)`): muted and secondary component fills inherited by the shadcn/Radix primitives.
- **Hairline** (`oklch(0.36 0.008 250)`): structural rules — every divider, section boundary, and decorative frame. Raised from an original `0.28` (1.38:1 against the ground) to reach 1.85:1, so the page keeps a visible skeleton at low vision without becoming a boxed layout.
- **Hairline Strong** (`oklch(0.49 0.01 250)`): the border of anything interactive — ghost buttons, icon squares, the nav pills, the email panel, inputs. Measured at **3.22:1** against the ground, clearing WCAG 1.4.11's 3:1 requirement for UI component boundaries.
- **Muted** (`oklch(0.62 0.01 250)`): secondary text — labels, metadata, subtitles, tag lists, body copy inside case studies.

Long-form body copy inside list rows uses `color-mix(in srgb, var(--foreground) 82%, white)` rather than the muted token: slightly lifted off pure foreground, but far brighter than Muted, so multi-line prose stays comfortably readable.

### Named Rules

**The One Signal Rule.** Instrument Amber means *live or actionable* — a status, an index, an interactive state, a focus ring. It is never decoration, never a fill for a large area, and never used to differentiate two things that are both static. Its scarcity is what makes the status dot read as a signal instead of a bullet.

**No Violet.** Drift Violet is retired. Any violet on the page is a bug.

**The Monochrome Content Rule.** Outside the accent, the content layer is one hue family (blue-black, ~250°). Third-party brand colors are permitted in exactly one place — the technology icons in the Skills section, where the real logo color is the information.

## Typography

**Display Font:** Space Grotesk (with `ui-sans-serif`, `system-ui`, `sans-serif`)
**Body Font:** Inter (with `ui-sans-serif`, `system-ui`, `sans-serif`), with `ss01` and `cv11` OpenType features enabled globally
**Label/Mono Font:** JetBrains Mono (with `ui-monospace`, `monospace`)

**Character:** Space Grotesk's slightly mechanical geometry, set enormous and tracked tight (-0.05em), gives the system its confidence — headlines feel machined rather than written. Inter recedes and does the reading work. JetBrains Mono carries every piece of metadata, which is what makes the whole thing read as an instrument rather than a magazine.

### Hierarchy

- **Display** (400, `14vw` mobile / `8.5vw` desktop, line-height 0.88, tracking -0.05em): the name in the hero, and nothing else. Set in two stacked blocks that rise into place one after the other. At this size the 0.88 line-height is what makes the two words read as a single mark.
- **Headline** (400, `3rem` / `4.5rem` at md, tracking -0.05em): section titles — "Academic background.", "Work experience.", "Projects.", "Let's connect." Always terminated with a period; the full stop is part of the voice.
- **Title** (400, `1.5rem` / up to `2.25rem` at md, tracking -0.025em): row subjects — a school, a company, a project name, a profile name.
- **Lead** (400, `1.125rem` / `1.25rem` at md, line-height 1.625): the hero's introductory paragraph and section subtitles, held to `max-w-2xl` (42rem).
- **Body** (400, `1rem`, line-height 1.625): bullets and case-study prose, held to a 9-of-12 column measure.
- **Label** (400, `0.7rem`, tracking 0.18em, uppercase, Muted): the annotation system — section indices (`001 — EDUCATION`), field names (`ROLE`, `LOCATION`, `STATUS`, `Problem`, `Contributions`), and metadata lines. Applied via the `.label` utility.
- **Mono** (400, `0.75rem`–`0.875rem`, tracking 0.1em when uppercase): interactive monospace — nav links, button text, tag lists, dates, locations, architecture lines, the footer terminal.

All `h1`–`h6` inherit Space Grotesk with -0.025em tracking from the base layer, so semantic headings are on-brand before any class is applied.

### Named Rules

**The Three-Voice Rule.** Space Grotesk states, Inter explains, JetBrains Mono annotates. A voice never takes another's job: no monospace paragraphs, no display-face metadata, no Inter labels.

**The Uppercase-Is-Mono Rule.** Uppercase belongs to JetBrains Mono only, always with generous tracking (0.18em for labels, 0.1em for buttons and nav). Display and body type are never set in all caps.

**The Full-Stop Rule.** Section titles end in a period. It is a small thing and it is load-bearing: it makes the headings read as declarations rather than navigation.

## Layout

A 12-column grid inside an `80rem` (max-w-7xl) container, gutters of `1.5rem`, page padding `1.5rem` rising to `2.5rem` at md. The grid is the skeleton of every region — sections, rows, and case-study fields all use it, which is why the page feels ruled even where no rule is drawn.

**The dominant split is 3 / 9.** Section headers leave the left three columns empty and set the title and subtitle in the right nine; case-study fields put a monospace field name (`Problem`, `Architecture`, `Stack`) on the left and content on the right. The hero uses the left three columns for the photo and metadata. Variants: Experience runs 2 / 10 (dates and location left, body right), and project rows run 5 / 7 (image left, title, blurb and tags right).

**Vertical rhythm.** Sections are `6rem` tall in padding, `8rem` at md. Section headers clear `4rem` before content. List rows are `2.5rem` top and bottom (`2rem` for denser project and skill rows). The hero is `min-h-screen` with `5rem`/`8rem` of top padding and `8rem` of bottom.

**Rows, not cards.** Repeating content is a vertical stack of grid rows separated by `divide-y divide-hairline` and bounded top and bottom by `border-y border-hairline`. Rows wash to `Surface` at 50% opacity on hover. No row is ever boxed.

**Responsive behavior.** `md` (768px) is effectively the only breakpoint: below it every 12-column child spans all 12 and the layout becomes a single column. Below md the nav collapses to the name plus a menu button, the hero photo shrinks to a 96px portrait above the name, and the metadata moves below the hero image.

**Layering.** Content sits at `z-10`, the nav at `z-50`, the scroll-progress bar at `z-60`. There is no background plane.

### Named Rules

**The Label Rail Rule.** Field groups (case-study fields, hero metadata) put a monospace field name in the left columns and the content on the right. Section headers do not get a label: the heading carries its own weight.

**The Hairline Rule.** Structure is expressed with 1px `Hairline` rules and grid alignment — never with a filled card, an outlined box with radius, or a shadow. If a region needs separation, rule it.

**No Numbering.** Sections and rows are not numbered. The `001 —` section labels and `/01` row indices were removed because the order carries no information the reader needs.

## Elevation & Depth

**This system has no shadows in the content layer, and that is a hard invariant.** Content is perfectly flat: every button, row, container, and image sits directly on the ground plane, separated only by 1px rules. There is no hover lift, no drop shadow, no raised card.

Depth comes from **tonal shift** only: hover states move a row or panel from transparent to `Surface` at 50%, roughly a 3.5% lightness step. There are no glows, blooms, scrims or background fields.

The one blur in the system is functional: the scrolled nav uses a 12px backdrop blur so content passing under it stays legible.

### Shadow Vocabulary

- None. The content layer has no box-shadow.

### Named Rules

**The Flat-Content Rule.** Nothing casts a shadow or glows. A `box-shadow`, glow or blurred color blob anywhere is a violation of the world.

## Shapes

**Square by default.** The form language is rectangular and unsoftened: buttons, icon squares, bordered containers, image frames, and the case-study panel all have `0` radius. A `--radius` token of `0.25rem` is declared and inherited by the shadcn/Radix primitives, but the hand-built surface does not use it.

Radius appears in exactly two roles. **Circles** (`9999px`) for the static amber status dot (6px). **The chip** (`0.375rem`) for the 28px technology icon tiles in Skills, the only softened rectangle in the system, justified because it holds a foreign brand logo rather than site content.

Borders are always 1px and always `Hairline`. The base layer sets `border-color` globally to the hairline token, so any bordered element is on-brand by default. Recurring silhouettes: the **44px icon square** (bordered, centered glyph), the **40px arrow affordance** on project rows, the **36px close square** on case studies, and the **24px × 2px amber dash** that precedes every bullet in place of a disc marker.

### Named Rules

**The Square-By-Default Rule.** Radius is reserved for the status dot and the single 28px logo chip. Any other rounded corner is off-system.

**The Amber Dash Rule.** List items are marked with a `1.5rem × 0.125rem` Instrument Amber rule, not a bullet character, a checkmark, or an icon. Monospace tag lists are the exception: they use interpuncts (`•`) as separators between items.

## Components

### Buttons

- **Shape:** Perfectly square (`0` radius), monospace uppercase text with `0.1em` tracking.
- **Primary:** `Bone` fill, `Ink` text, `1rem 1.5rem` padding. On hover the fill becomes Instrument Amber (`background-color` transition only — the button never moves). Trailing `ArrowUpRight` icon translates 4px right and 4px up on hover.
- **Ghost:** transparent fill with a 1px `Hairline` border and `Bone` text, same padding and type. On hover the border becomes `Bone` (in the hero) or Instrument Amber with matching amber text (everywhere else).
- **Icon square:** 44px × 44px, 1px `Hairline` border, centered 16px glyph, no fill. Border and glyph both go amber on hover. Used for the social row and, at 36px, for the case-study close control.
- **Focus:** all interactive elements inherit the global `:focus-visible` treatment — a 2px Instrument Amber outline at 3px offset with a 2px radius.
- **Transitions:** `transition-colors` at the default 150ms. Buttons change color, not position or elevation.

### Chips / Tags

- **Style:** no background, no border, no radius. Monospace at `0.875rem` in `Muted`, laid out in a wrapping flex row with `1.5rem` column gaps and `0.5rem` row gaps.
- **Separator:** a `•` interpunct injected via `::before` with `0.5rem` right margin, suppressed on the first item.
- **State:** hovering an item turns both the text and its interpunct to Instrument Amber. Cursor stays `default` — these are labels, not controls, and the hover is handled in CSS with no React state behind it.

### Cards / Containers

The system has no card component. Two bordered containers exist:

- **Case-study panel:** `max-w-5xl`, 1px `Hairline` border, `Ink` fill, `0` radius. Composed of a hairline-ruled header bar (label left, close square right), a 16:9 cover image with a bottom rule, and a `1.5rem`/`2.5rem` padded body.
- **Image frame:** 1px `Hairline` border over a `Surface` fill, `0` radius, no padding, image `object-contain`.

Both are flat. Internal padding steps: `1.5rem` mobile, `2.5rem` at md.

### Navigation

- **Style:** fixed full-width bar, transparent with a transparent bottom border at rest. Past 24px of scroll it transitions over 300ms to `Ink` at 80% opacity with a `12px` backdrop blur and a `Hairline` bottom border, while its vertical padding tightens from `1.5rem` to `1rem`. A spacer div matching the measured nav height keeps content from jumping.
- **Brand:** `Christopher Zhang` in Space Grotesk at `1rem`. No dot, no monospace.
- **Links:** `.label` styling (0.7rem mono, uppercase, 0.18em tracking, `Muted`), hovering to `Bone`. Desktop only.
- **CTA:** a ghost pill reading `Available` with a static 6px amber dot, bordering and coloring to amber on hover.
- **Mobile:** the link row is replaced by a menu button that opens a ruled list of the same links.

### Signature Components

**The Hero.** The left rail holds a 4:5 portrait of Christopher in a hairline frame, then three metadata pairs (Studying, Based in, Looking for). The right nine columns hold the name, a positioning paragraph built from verified facts, the actions, and nothing else. Product images start in the Projects section, which leads with DiveVolt.

**The Scroll Progress Bar.** A 2px Instrument Amber rule pinned to the top of the viewport at `z-60`, scaling from the left edge on a spring (stiffness 300, damping 40).

**The Footer.** One quiet line: the copyright year (computed, not hard-coded) and plain text links to email, GitHub and LinkedIn.

**The Row.** The system's primary content unit: a 12-column grid row bounded by `divide-y divide-hairline`, carrying a display-face subject, amber-dashed bullets and a monospace tag list. Project rows lead with a 16:10 product image in a hairline frame. Experience and Education rows wash to `Surface`/50 on hover.

### Motion

The vocabulary is narrow and consistent.

- **Arrival:** `opacity: 0 → 1` with `y: 12–30px → 0`, 0.45–0.7s, staggered by `index × 0.06–0.1s`, triggered by `whileInView` with `once: true` and a `-50px` to `-100px` root margin. Everything below the fold enters this way.
- **The hero is CSS, not JS.** Framer Motion bakes `opacity: 0` into the SSR markup, so a JS failure would have left the page's most important content permanently invisible. The hero's entrance is the `.rise` keyframe (`opacity` + `translateY(var(--rise))`, expo-out, `animation-fill-mode: both`), sequenced by inline `animation-delay`. Name blocks rise from `--rise: 80px` over 0.9s, staggered 0.1s; supporting content follows on a 0.1–0.85s ladder. A `<noscript>` rule forces the below-fold arrivals visible for the same reason.
- **Parallax:** none.
- **State:** `transition-colors` at 150ms for hover; 300ms for the nav's scrolled transition. Icons translate 2–4px; nothing scales or lifts.
- **Loops:** none. Nothing on the page animates continuously.
- **Reduced motion:** a global CSS override collapses animation and transition durations to 0.01ms and restores `scroll-behavior: auto` (covers `.rise`). `<MotionConfig reducedMotion="user">` in `app/layout.tsx` handles the Framer Motion arrivals.

## Do's and Don'ts

### Do:
- **Do** build structure from 1px `Hairline` rules and the 12-column grid. Rule a region; never box it.
- **Do** put real imagery (product frames, the portrait) ahead of decoration. If a region feels empty, show the work.
- **Don't** number sections or rows, and don't put a label above a heading.
- **Do** keep Instrument Amber scarce and meaningful: status, index, interactive state, focus. Nothing else.
- **Do** end section titles with a period.
- **Do** mark list items with the `1.5rem × 0.125rem` amber dash rather than a bullet glyph or icon.
- **Do** enter new content with the standard arrival (`y: 20 → 0`, opacity `0 → 1`, ~0.6s, `once: true`, ~80ms stagger).
- **Do** keep sections flat against the ground; no scrims or background effects.
- **Do** guard any new motion behind `useReducedMotion()` or the global reduced-motion override, and any pointer-dependent effect behind a coarse-pointer check.

### Don't:
- **Don't** add a `box-shadow`, glow or blurred color blob anywhere.
- **Don't** introduce rounded corners. Radius belongs to circles and the 28px logo chip only.
- **Don't** introduce a new hue. The content layer is blue-black plus Instrument Amber; the only exception is real brand color on technology logos in Skills.
- **Don't** reintroduce a second gold. `#d7b04c` was removed from the system; Instrument Amber is the only accent.
- **Don't** put a bare `border-hairline` on anything interactive — controls take `border-hairline-strong`, which is the border that clears 3:1.
- **Don't** gate the visibility of real content on JS. Framer Motion writes `opacity: 0` into the SSR markup; anything above the fold, and anything whose absence would read as broken, animates in CSS instead.
- **Don't** set display or body type in uppercase. Uppercase is monospace-only, always with ≥0.1em tracking.
- **Don't** use monospace for paragraphs or Inter for labels — the three voices don't trade jobs.
- **Don't** animate position or scale on hover for content elements. Color changes and 2–4px icon nudges are the vocabulary; rows and buttons hold still.
- **Don't** loop an animation, add a custom cursor, a particle or node field, or a typed terminal line. These were removed for reading as generated.
- **Don't** drift toward a light editorial page or a generic dark SaaS template (rounded cards, soft shadows, gradient CTA buttons). Both were explicitly rejected.

# Case Study Hero Redesign

**Date:** 2026-04-05
**Status:** Approved

---

## Context

All three case study pages (Teams for Education, Agents in Windows, Windows Recall) currently have different hero layouts:
- Teams and Recall: 2-column (text left, image right)
- Agents: centered text, wide image below

The goal is a single, consistent centered hero layout across all project pages — matching the provided screenshot. The hero should feel high-quality, scalable, and easy to extend when new project images are dropped in.

---

## Design

### Visual structure (bottom → top)

| Layer | Element | Notes |
|-------|---------|-------|
| 1 | Hero section background | `radial-gradient(49.77% 45.01% at 57.6% 43.06%, #1C1C21 0%, #0B0B0D 100%)` + `border-radius: 14px` |
| 2 | `grid-bg-neon.svg` | `position: absolute`, `object-fit: cover`, `opacity: 10%`, CSS `mask-image` fade |
| 3 | Bottom fade | `bg-gradient-to-t from-[#0B0B0D] to-transparent`, ~h-40, blends into spec panel |
| 4 | Content (z-10) | Centered: image → label → title → tags |

### Grid SVG mask fade

The grid fades at the top (before the nav, ~80px) and bottom (before the viewport ends, ~160px):

```css
mask-image: linear-gradient(
  to bottom,
  transparent 0px,
  black 80px,
  black calc(100% - 160px),
  transparent 100%
);
-webkit-mask-image: /* same */;
```

### Content layout (centered)

```
[hero image]           max-w-[640px], w-full, mx-auto
                       h-auto, rounded-2xl, drop-shadow
                       omitted when no heroImage provided

[PRODUCT NAME]         text-sm, tracking-[0.15em], uppercase, text-accent, mb-3
[Title]                font-heading, 3xl→4xl→5xl, font-bold, text-balance, max-w-2xl, mx-auto
[tag pills]            flex-wrap, justify-center, gap-2, mt-5
```

Gap between image and text: `mb-10 md:mb-12`

### Hero section sizing

- `min-h-[85vh]`
- `flex flex-col items-center justify-center`
- `overflow-hidden`
- `pt-24 pb-16` (accounts for sticky nav above)

---

## Component API

**New file:** `components/case-study-hero.tsx`

```tsx
interface CaseStudyHeroProps {
  heroImage?: string        // optional — slot omitted when absent
  heroImageAlt?: string
  productName: string
  title: string
  tags?: string[]
}
```

Used in each page as:
```tsx
const hero = (
  <CaseStudyHero
    heroImage="/images/projects/Teams hero kids.png"
    heroImageAlt="..."
    productName="Teams for Education"
    title="Modernizing Online Classes For An Authentic Virtual Experience"
    tags={["UX Strategy", "Microsoft Teams Enterprise", "Senior Designer", "2020"]}
  />
)
```

---

## Files to change

| File | Change |
|------|--------|
| `components/case-study-hero.tsx` | **Create** — new shared component |
| `app/teams-for-education/page.tsx` | Replace `teamsHero` JSX with `<CaseStudyHero>` |
| `app/agents-in-windows/page.tsx` | Replace `agentsHero` JSX with `<CaseStudyHero>` (no image yet) |
| `app/recall/page.tsx` | Replace `recallHero` JSX with `<CaseStudyHero>` (no image yet) |

No changes to `components/case-study-layout.tsx`.

---

## Assets

| Asset | Status |
|-------|--------|
| `public/grid-bg-neon.svg` | Ready |
| `public/images/projects/Teams hero kids.png` | Ready |
| Agents hero image | To be provided |
| Recall hero image | To be provided |

---

## Verification

1. `pnpm dev` — visit `/teams-for-education`, `/agents-in-windows`, `/recall`
2. Check all three pages render the centered layout
3. Verify grid SVG fades correctly at top (near nav) and bottom
4. Verify radial gradient background is visible
5. Resize viewport: image and text should scale fluidly
6. Verify spec panel below hero blends cleanly into bottom fade

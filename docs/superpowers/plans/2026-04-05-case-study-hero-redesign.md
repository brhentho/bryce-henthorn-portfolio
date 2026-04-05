# Case Study Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all three per-page custom hero sections with a single shared `CaseStudyHero` component that renders a centered layout: grid SVG background with mask fades, radial gradient hero background, floating centered hero image above centered title/tags.

**Architecture:** Create `components/case-study-hero.tsx` as a standalone presentational component. Each project page replaces its inline `heroContent` JSX with `<CaseStudyHero .../>`. No changes to `case-study-layout.tsx` — it already accepts a `heroContent` prop.

**Tech Stack:** Next.js 14, React, Tailwind CSS, `next/image`, TypeScript

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `components/case-study-hero.tsx` | Shared hero: grid bg + radial gradient + centered image + text |
| Modify | `app/teams-for-education/page.tsx` | Replace `teamsHero` JSX, import `CaseStudyHero` |
| Modify | `app/agents-in-windows/page.tsx` | Replace `agentsHero` JSX, import `CaseStudyHero` |
| Modify | `app/recall/page.tsx` | Replace `recallHero` JSX, import `CaseStudyHero` |

---

## Task 1: Create `CaseStudyHero` component

**Files:**
- Create: `components/case-study-hero.tsx`

- [ ] **Step 1: Create the component file**

Create `components/case-study-hero.tsx` with this exact content:

```tsx
import Image from "next/image"
import { Container } from "@/components/container"
import { AnimateIn } from "@/components/animate-in"

interface CaseStudyHeroProps {
  heroImage?: string
  heroImageAlt?: string
  productName: string
  title: string
  tags?: string[]
}

export function CaseStudyHero({
  heroImage,
  heroImageAlt,
  productName,
  title,
  tags,
}: CaseStudyHeroProps) {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(49.77% 45.01% at 57.6% 43.06%, #1C1C21 0%, #0B0B0D 100%)",
        borderRadius: "14px",
      }}
    >
      {/* Grid SVG — full-bleed, 10% opacity, mask-faded at top and bottom */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/grid-bg-neon.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          opacity: 0.1,
          maskImage:
            "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 160px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0px, black 80px, black calc(100% - 160px), transparent 100%)",
        }}
      />

      {/* Bottom fade — blends into spec panel */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Centered content */}
      <Container className="relative z-10 pt-24 pb-16 flex flex-col items-center text-center">
        {/* Hero image — omitted when not provided */}
        {heroImage && (
          <AnimateIn delay={0.05} className="w-full max-w-[640px] mb-10 md:mb-12">
            <Image
              src={heroImage}
              alt={heroImageAlt ?? ""}
              width={1280}
              height={720}
              className="w-full h-auto rounded-2xl"
              style={{
                filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.6))",
              }}
              sizes="(max-width: 768px) 100vw, 640px"
              priority
            />
          </AnimateIn>
        )}

        {/* Product name */}
        <AnimateIn delay={heroImage ? 0.1 : 0.05}>
          <p className="text-sm font-sans font-medium text-accent tracking-[0.15em] uppercase mb-3">
            {productName}
          </p>
        </AnimateIn>

        {/* Title */}
        <AnimateIn delay={heroImage ? 0.15 : 0.1}>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground text-balance max-w-2xl mx-auto">
            {title}
          </h1>
        </AnimateIn>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <AnimateIn delay={heroImage ? 0.2 : 0.15}>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-sans font-medium text-foreground-tertiary bg-surface-raised px-3 py-1.5 rounded-lg border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimateIn>
        )}
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Verify the file exists**

```bash
ls components/case-study-hero.tsx
```

Expected: file path printed, no error.

- [ ] **Step 3: Commit**

```bash
git add components/case-study-hero.tsx
git commit -m "feat: add shared CaseStudyHero component with grid bg and centered layout"
```

---

## Task 2: Update Teams for Education page

**Files:**
- Modify: `app/teams-for-education/page.tsx`

The current `teamsHero` is a 2-column inline section (lines 41–109). Replace it with `CaseStudyHero`.

- [ ] **Step 1: Add the import at the top of the file**

In `app/teams-for-education/page.tsx`, the imports block currently ends with:
```tsx
import { TeacherReactionsPanel } from "@/components/teacher-reactions-panel"
```

Add after it:
```tsx
import { CaseStudyHero } from "@/components/case-study-hero"
```

- [ ] **Step 2: Replace the `teamsHero` constant**

Find and delete the entire `teamsHero` constant (the `const teamsHero = (...)` block, lines 41–109).

Replace it with:
```tsx
const teamsHero = (
  <CaseStudyHero
    heroImage="/images/projects/Teams hero kids.png"
    heroImageAlt="Students in virtual Teams classrooms with persistent table groups"
    productName="Teams for Education"
    title="Modernizing Online Classes For An Authentic Virtual Experience"
    tags={["UX Strategy", "Microsoft Teams Enterprise", "Senior Designer", "2020"]}
  />
)
```

- [ ] **Step 3: Verify the dev server renders correctly**

```bash
pnpm dev
```

Open `http://localhost:3000/teams-for-education`. Confirm:
- Centered layout (not 2-column)
- Teams hero kids image floats above the title
- Neon grid visible at ~10% opacity behind image
- Grid fades near the top nav and near the bottom of the hero
- Radial gradient background visible
- Bottom of hero blends into spec panel below

- [ ] **Step 4: Commit**

```bash
git add app/teams-for-education/page.tsx
git commit -m "feat: use CaseStudyHero on Teams for Education page"
```

---

## Task 3: Update Agents in Windows page

**Files:**
- Modify: `app/agents-in-windows/page.tsx`

The current `agentsHero` is a centered inline section (lines 38–103). Replace it.

- [ ] **Step 1: Add the import**

In `app/agents-in-windows/page.tsx`, the imports block currently ends with:
```tsx
import { AgentCapabilityViz } from "@/components/agent-capability-viz"
```

Add after it:
```tsx
import { CaseStudyHero } from "@/components/case-study-hero"
```

- [ ] **Step 2: Replace the `agentsHero` constant**

Find and delete the entire `agentsHero` constant (the `const agentsHero = (...)` block, lines 38–103).

Replace it with:
```tsx
const agentsHero = (
  <CaseStudyHero
    productName="Agents in Windows"
    title="Making AI agents visible and interruptible in Windows"
    tags={["OS shell", "Systems thinking", "Ambient AI", "Senior Designer", "2025"]}
  />
)
```

Note: no `heroImage` yet — image slot is omitted until asset is provided.

- [ ] **Step 3: Verify the dev server renders correctly**

Open `http://localhost:3000/agents-in-windows`. Confirm:
- Centered layout: product label → title → tags
- No image slot (none provided)
- Grid, gradient, and bottom fade all render correctly

- [ ] **Step 4: Commit**

```bash
git add app/agents-in-windows/page.tsx
git commit -m "feat: use CaseStudyHero on Agents in Windows page"
```

---

## Task 4: Update Windows Recall page

**Files:**
- Modify: `app/recall/page.tsx`

The current `recallHero` is a 2-column inline section (lines 36–116). Replace it.

- [ ] **Step 1: Add the import**

In `app/recall/page.tsx`, the imports block currently ends with:
```tsx
import { FigurePanel, DiagramPlaceholder } from "@/components/figure-panel"
```

Add after it:
```tsx
import { CaseStudyHero } from "@/components/case-study-hero"
```

- [ ] **Step 2: Replace the `recallHero` constant**

Find and delete the entire `recallHero` constant (the `const recallHero = (...)` block, lines 36–116).

Replace it with:
```tsx
const recallHero = (
  <CaseStudyHero
    productName="Windows Recall"
    title="Search by memory, not by filename"
    tags={["Trust + privacy", "Systems thinking", "Windows", "Senior Designer", "2024"]}
  />
)
```

Note: no `heroImage` yet — image slot is omitted until asset is provided.

- [ ] **Step 3: Verify the dev server renders correctly**

Open `http://localhost:3000/recall`. Confirm:
- Centered layout: product label → title → tags
- No image slot (none provided)
- Grid, gradient, and bottom fade all render correctly
- All three pages now look visually consistent

- [ ] **Step 4: Commit**

```bash
git add app/recall/page.tsx
git commit -m "feat: use CaseStudyHero on Windows Recall page"
```

---

## Task 5: Final cross-page check

- [ ] **Step 1: Visit all three hero pages and confirm visual consistency**

With `pnpm dev` running, check:
- `http://localhost:3000/teams-for-education` — image + centered text
- `http://localhost:3000/agents-in-windows` — no image, centered text only
- `http://localhost:3000/recall` — no image, centered text only

All three should share the same background gradient, grid fade pattern, bottom fade, and text layout.

- [ ] **Step 2: Check responsiveness**

Resize to mobile width (375px). Confirm:
- Image scales down fluidly on Teams page
- Text remains centered and readable at all breakpoints
- Tags wrap correctly on small screens

- [ ] **Step 3: Verify no TypeScript errors**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Clean up unused imports**

In `app/teams-for-education/page.tsx`, the old `teamsHero` used `AnimateIn` only inside the inline hero JSX. Verify whether `AnimateIn` is still used elsewhere in the file. If not, remove its import:
```tsx
// Remove this line if AnimateIn no longer appears in the file body:
import { AnimateIn } from "@/components/animate-in"
```

Same check for `app/agents-in-windows/page.tsx` and `app/recall/page.tsx` — the old inline heroes imported `Image` and used `AnimateIn`. Check if these are still needed in the rest of each file.

- [ ] **Step 5: Final commit**

```bash
git add app/teams-for-education/page.tsx app/agents-in-windows/page.tsx app/recall/page.tsx
git commit -m "chore: remove unused imports after hero refactor"
```

(Skip this commit if no imports were removed.)

# Hero Intro Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current right-side-only dot cluster intro with a full-viewport canvas animation (scatter → grid → wipe reveal → stable cursor-repel grid).

**Architecture:** Two new canvas components handle the job: `HeroIntroOverlay` (fixed full-screen, plays once, self-destructs) and `HeroGrid` (absolute inside hero section, permanent, cursor-reactive). `Hero` orchestrates timing via an `introComplete` flag. The Nav is covered by the overlay during the intro and naturally revealed by the wipe.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, plain Canvas API, `requestAnimationFrame`.

---

## Shared Constants (reference in every task)

```typescript
// Use these everywhere — never hardcode
const GRID_SPACING = 40   // px between dot centers
const GRID_OFFSET  = 20   // px from edges (GRID_SPACING / 2)
const DOT_RADIUS   = 1.5  // px
const DOT_COLOR    = "rgba(240, 240, 243, "  // append opacity + ")"
const REPEL_RADIUS = 80   // px — cursor affects dots within this distance
const REPEL_MAX_PX = 12   // px — maximum displacement per dot
```

---

## Task 1 — Create `HeroIntroOverlay`

**Files:**
- Create: `components/hero-intro-overlay.tsx`

### What it does

A `position: fixed, inset: 0, z-index: 100` overlay (above Nav's z-50) with a `<canvas>` that fills the viewport. It runs through four internal phases automatically and calls `onComplete` after the wipe.

| Phase | Trigger | Duration |
|-------|---------|---------|
| `scatter` | mount | 400 ms (dots visible at random positions) |
| `form` | 400 ms | 1 500 ms — dots lerp from scatter → grid targets |
| `wipe` | 1 900 ms | 400 ms — CSS clip-path: inset(0→100% from top) |
| `done` | 2 300 ms | calls `onComplete`, unmounts |

### Implementation

```tsx
"use client"

import { useEffect, useRef, useState } from "react"

const GRID_SPACING = 40
const GRID_OFFSET  = 20
const DOT_RADIUS   = 1.5
const INTRO_DOT_COUNT = 150   // subset of grid dots that animate in
const FORM_DURATION   = 1500  // ms
const SCATTER_DELAY   = 400   // ms before form starts
const WIPE_DURATION   = 400   // ms
const WIPE_DELAY      = 1900  // ms (SCATTER_DELAY + FORM_DURATION)

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function buildGridPositions(w: number, h: number) {
  const pts: { x: number; y: number }[] = []
  const cols = Math.ceil(w / GRID_SPACING) + 1
  const rows = Math.ceil(h / GRID_SPACING) + 1
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      pts.push({ x: GRID_OFFSET + c * GRID_SPACING, y: GRID_OFFSET + r * GRID_SPACING })
  return pts
}

interface HeroIntroOverlayProps {
  onComplete: () => void
}

export function HeroIntroOverlay({ onComplete }: HeroIntroOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [clipProgress, setClipProgress] = useState(0) // 0→1 during wipe phase
  const [phase, setPhase] = useState<"scatter" | "form" | "wipe" | "done">("scatter")

  // Canvas animation (scatter → form)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const w = window.innerWidth
    const h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext("2d")!
    ctx.scale(dpr, dpr)

    // Build grid targets and pick a random subset
    const allGrid = buildGridPositions(w, h)
    const shuffled = [...allGrid].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, INTRO_DOT_COUNT)

    // Each dot has a scatter position and a grid target
    const dots = selected.map(target => ({
      startX: Math.random() * w,
      startY: Math.random() * h,
      targetX: target.x,
      targetY: target.y,
      delay: Math.random() * 200, // stagger 0-200ms
    }))

    let formStartTime: number | null = null
    let rafId: number

    function draw(ts: number) {
      ctx.clearRect(0, 0, w, h)

      if (formStartTime === null) {
        // scatter phase — draw at start positions
        dots.forEach(d => {
          ctx.beginPath()
          ctx.arc(d.startX, d.startY, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(240,240,243,0.35)"
          ctx.fill()
        })
      } else {
        // form phase — lerp toward targets
        dots.forEach(d => {
          const elapsed = Math.max(0, ts - formStartTime! - d.delay)
          const t = Math.min(elapsed / FORM_DURATION, 1)
          const e = easeInOutCubic(t)
          const x = d.startX + (d.targetX - d.startX) * e
          const y = d.startY + (d.targetY - d.startY) * e
          const opacity = 0.35 + e * 0.35  // 0.35 → 0.7
          ctx.beginPath()
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(240,240,243,${opacity})`
          ctx.fill()
        })
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    const t1 = setTimeout(() => { formStartTime = performance.now(); setPhase("form") }, SCATTER_DELAY)
    const t2 = setTimeout(() => { setPhase("wipe") }, WIPE_DELAY)
    const t3 = setTimeout(() => { setPhase("done"); onComplete() }, WIPE_DELAY + WIPE_DURATION + 50)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  // Animate clip progress during wipe phase
  useEffect(() => {
    if (phase !== "wipe") return
    const start = performance.now()
    let rafId: number

    function step(ts: number) {
      const t = Math.min((ts - start) / WIPE_DURATION, 1)
      setClipProgress(easeInOutCubic(t))
      if (t < 1) rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [phase])

  if (phase === "done") return null

  // clip-path: inset(X 0 0 0) — X goes from 0% to 100%
  // As X increases, the overlay is clipped FROM THE TOP, revealing nav first
  const clipTop = `${clipProgress * 100}%`

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#0B0B0D",
        clipPath: `inset(${clipTop} 0 0 0)`,
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  )
}
```

### Step 1: Write the file

Paste the code above into `components/hero-intro-overlay.tsx`.

### Step 2: Quick smoke test

Temporarily import and render `<HeroIntroOverlay onComplete={() => {}} />` at the top of `app/page.tsx` (above `<PageTransition>`). Run `pnpm dev`. You should see:
- Black full-screen overlay with ~150 dots scattered randomly
- After ~400ms dots start converging to a grid
- After ~1900ms the overlay wipes away from top to bottom
- Page content appears underneath

Remove the temporary import after verifying.

### Step 3: Commit

```bash
git add components/hero-intro-overlay.tsx
git commit -m "feat: add HeroIntroOverlay canvas intro animation"
```

---

## Task 2 — Create `HeroGrid`

**Files:**
- Create: `components/hero-grid.tsx`

### What it does

A canvas element, `position: absolute, inset: 0` inside the hero `<section>`. Draws the full dot grid and runs a `requestAnimationFrame` loop that displaces dots near the cursor. Fades in via CSS transition.

### Implementation

```tsx
"use client"

import { useEffect, useRef } from "react"

const GRID_SPACING = 40
const GRID_OFFSET  = 20
const DOT_RADIUS   = 1.5
const REPEL_RADIUS = 80
const REPEL_MAX_PX = 12
const BASE_OPACITY = 0.12
const REPEL_OPACITY_BOOST = 0.22

function buildGridDots(w: number, h: number) {
  const dots: {
    baseX: number; baseY: number
    x: number; y: number
    opacity: number
  }[] = []
  const cols = Math.ceil(w / GRID_SPACING) + 1
  const rows = Math.ceil(h / GRID_SPACING) + 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const bx = GRID_OFFSET + c * GRID_SPACING
      const by = GRID_OFFSET + r * GRID_SPACING
      dots.push({ baseX: bx, baseY: by, x: bx, y: by, opacity: BASE_OPACITY })
    }
  }
  return dots
}

interface HeroGridProps {
  visible: boolean  // triggers CSS fade-in
}

export function HeroGrid({ visible }: HeroGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas  = canvasRef.current
    if (!wrapper || !canvas) return

    const rect = wrapper.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext("2d")!
    ctx.scale(dpr, dpr)

    const dots = buildGridDots(w, h)
    let mouseX = -999
    let mouseY = -999
    let rafId: number

    function draw() {
      ctx.clearRect(0, 0, w, h)
      const SPRING = 0.12

      dots.forEach(d => {
        const dx = mouseX - d.baseX
        const dy = mouseY - d.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetX = d.baseX
        let targetY = d.baseY
        let targetOpacity = BASE_OPACITY

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = 1 - dist / REPEL_RADIUS
          const angle = Math.atan2(dy, dx)
          targetX = d.baseX - Math.cos(angle) * force * REPEL_MAX_PX
          targetY = d.baseY - Math.sin(angle) * force * REPEL_MAX_PX
          targetOpacity = BASE_OPACITY + force * REPEL_OPACITY_BOOST
        }

        // Spring toward target
        d.x += (targetX - d.x) * SPRING
        d.y += (targetY - d.y) * SPRING
        d.opacity += (targetOpacity - d.opacity) * SPRING

        ctx.beginPath()
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240,240,243,${d.opacity.toFixed(3)})`
        ctx.fill()
      })

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    function onMouseMove(e: MouseEvent) {
      const r = wrapper!.getBoundingClientRect()
      mouseX = e.clientX - r.left
      mouseY = e.clientY - r.top
    }

    function onMouseLeave() {
      mouseX = -999
      mouseY = -999
    }

    wrapper.addEventListener("mousemove", onMouseMove)
    wrapper.addEventListener("mouseleave", onMouseLeave)

    // Handle resize
    function onResize() {
      const r = wrapper!.getBoundingClientRect()
      const nw = r.width
      const nh = r.height
      canvas.width  = nw * dpr
      canvas.height = nh * dpr
      ctx.scale(dpr, dpr)
      dots.length = 0
      dots.push(...buildGridDots(nw, nh))
    }

    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      wrapper.removeEventListener("mousemove", onMouseMove)
      wrapper.removeEventListener("mouseleave", onMouseLeave)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  )
}
```

### Step 1: Write the file

Paste into `components/hero-grid.tsx`.

### Step 2: Smoke test HeroGrid alone

Temporarily render `<HeroGrid visible={true} />` inside the hero section (set `position: relative` on the section temporarily). Run `pnpm dev`. You should see:
- A full dot grid across the hero section at low opacity (0.12)
- Moving the cursor over the hero causes nearby dots to push away and brighten
- Dots spring back smoothly after cursor leaves

### Step 3: Commit

```bash
git add components/hero-grid.tsx
git commit -m "feat: add HeroGrid canvas with cursor repel"
```

---

## Task 3 — Update `Hero` to orchestrate both components

**Files:**
- Modify: `components/hero.tsx`

### What it does

- Renders `<HeroIntroOverlay>` until it calls `onComplete`
- Passes `visible={introComplete}` to `<HeroGrid>` to trigger fade-in
- Delays text fade-in by 300ms after `introComplete` (so grid fades in first)

### Updated `hero.tsx`

```tsx
"use client"

import { useEffect, useState } from "react"
import { Container } from "@/components/container"
import { HeroIntroOverlay } from "@/components/hero-intro-overlay"
import { HeroGrid } from "@/components/hero-grid"

export function Hero() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showText, setShowText] = useState(false)
  const [skipIntro, setSkipIntro] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setSkipIntro(true)
      setIntroComplete(true)
      setShowText(true)
    }
  }, [])

  function handleIntroComplete() {
    setIntroComplete(true)
    setTimeout(() => setShowText(true), 300)
  }

  const baseTransition = "opacity 0.7s cubic-bezier(0.25,0.1,0.25,1), transform 0.7s cubic-bezier(0.25,0.1,0.25,1)"

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-screen intro overlay — plays once, self-destructs */}
      {!skipIntro && <HeroIntroOverlay onComplete={handleIntroComplete} />}

      {/* Stable interactive dot grid (canvas) */}
      <HeroGrid visible={introComplete} />

      <Container className="relative z-10 py-32 md:py-0">
        <div className="max-w-2xl md:py-8 lg:py-12">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-[-0.02em] text-foreground">
            <span
              className="block"
              style={{
                opacity: showText ? 1 : 0,
                transform: showText ? "translateY(0)" : "translateY(10px)",
                transition: baseTransition,
              }}
            >
              Product
            </span>
            <span
              className="block mt-1"
              style={{
                opacity: showText ? 1 : 0,
                transform: showText ? "translateY(0)" : "translateY(10px)",
                transition: baseTransition,
                transitionDelay: showText ? "0.1s" : "0s",
              }}
            >
              Maker.
            </span>
          </h1>

          <div
            style={{
              opacity: showText ? 1 : 0,
              transform: showText ? "translateY(0)" : "translateY(10px)",
              transition: baseTransition,
              transitionDelay: showText ? "0.12s" : "0s",
            }}
          >
            <p className="mt-8 md:mt-10 text-base md:text-lg text-foreground-secondary leading-relaxed font-sans max-w-md">
              Designing human-AI systems at enterprise scale in Windows
            </p>
          </div>

          <div
            style={{
              opacity: showText ? 1 : 0,
              transform: showText ? "translateY(0)" : "translateY(10px)",
              transition: baseTransition,
              transitionDelay: showText ? "0.24s" : "0s",
            }}
          >
            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-sans font-medium px-6 py-3 rounded-[var(--radius-button)] border border-foreground/20 text-foreground hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-h-[44px] hover:scale-[1.03] active:scale-[0.98]"
              >
                View Work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </a>
              <a
                href="mailto:bhenthorn2757@gmail.com"
                className="inline-flex items-center text-sm font-sans font-medium px-6 py-3 rounded-[var(--radius-button)] border border-border text-foreground-secondary hover:border-border-hover hover:text-foreground transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-h-[44px] hover:scale-[1.03] active:scale-[0.98]"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

### Step 1: Replace `components/hero.tsx` with the code above

### Step 2: Run dev and verify the full sequence

```bash
pnpm dev
```

Open `http://localhost:3000`. Verify:
1. Black overlay with scattered dots appears (0-400ms)
2. Dots converge to grid positions (400-1900ms)
3. Overlay wipes away top-to-bottom; nav is revealed first (1900-2300ms)
4. Canvas dot grid fades in over the hero (2300-2600ms)
5. "Product Maker." text fades in (2600ms+)
6. Moving cursor over hero section pushes dots away and brightens them
7. Moving cursor away causes dots to spring back

### Step 3: Commit

```bash
git add components/hero.tsx
git commit -m "feat: wire HeroIntroOverlay and HeroGrid into Hero"
```

---

## Task 4 — Delete old `HeroIntroAnimation`

**Files:**
- Delete: `components/hero-intro-animation.tsx`

This file is no longer imported by anything after Task 3. Delete it to avoid dead code.

### Step 1: Verify nothing imports it

```bash
grep -r "hero-intro-animation" --include="*.tsx" --include="*.ts" .
```

Expected: no results.

### Step 2: Delete the file

```bash
rm components/hero-intro-animation.tsx
```

### Step 3: Commit

```bash
git add -u components/hero-intro-animation.tsx
git commit -m "chore: remove replaced HeroIntroAnimation component"
```

---

## Task 5 — Clean up CSS

**Files:**
- Modify: `app/globals.css`

Remove the `sweep-line` keyframes and class that belonged to the old component:

```css
/* DELETE these lines: */
@keyframes sweep-line {
  from { top: 10%; }
  to { top: 90%; }
}
.animate-sweep-line {
  animation: sweep-line 0.3s linear forwards;
}
```

### Step 1: Delete the sweep-line CSS from `app/globals.css`

Also delete the comment above it: `/* Sweep line animation for hero intro */`

### Step 2: Verify build has no warnings

```bash
pnpm build
```

Expected: clean build, no unused CSS warnings.

### Step 3: Commit

```bash
git add app/globals.css
git commit -m "chore: remove unused sweep-line animation CSS"
```

---

## Visual QA Checklist

Run through this after all tasks are complete:

- [ ] Intro plays on fresh page load (hard refresh `Ctrl+Shift+R`)
- [ ] Dots scatter → converge → wipe plays smoothly without jank
- [ ] Nav bar is revealed first (top of wipe), then hero content
- [ ] Dot grid fades in seamlessly after overlay exits
- [ ] Cursor repel: dots near cursor push away smoothly
- [ ] Cursor repel: dots spring back when cursor leaves
- [ ] Cursor repel: only active in hero section, not below it
- [ ] `prefers-reduced-motion`: overlay never renders, content appears immediately
- [ ] No flash of unstyled content on initial load
- [ ] Looks correct on mobile (canvas resizes correctly, no repel on touch)
- [ ] `pnpm build` passes with no type errors

---

## Timing Summary

```
0ms        mount: overlay appears, dots scattered
400ms      dots start converging to grid
1900ms     wipe begins (top → bottom)
2300ms     wipe complete, overlay unmounts, HeroGrid fade-in starts
2600ms     hero text starts fading in
∞          cursor repel active in hero section
```

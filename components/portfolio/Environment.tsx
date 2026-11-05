"use client"

import { useLayoutEffect, useRef, type ReactNode } from "react"
import { BLACK, WHITE, bandProgress, mixAtmosphere, parseHex, resolveGround, toHex, type Atmosphere, type RGB } from "@/lib/portfolio/environment"
import { useReducedMotion } from "../explore/useReducedMotion"

type Anchor = { el: HTMLElement; key: string; top: number; start: number; end: number }

/**
 * One fixed page backdrop. Chapters are transparent anchors that declare a tone with
 * `data-env`; the backdrop interpolates (OKLab) from tone to tone as each anchor's untransformed
 * top crosses its band (`data-env-start` → `data-env-end`, viewport fractions). The result is a pure
 * function of scroll position, so hash jumps, Back/Forward and reverse scrolling resolve instantly.
 *
 * Diagnostics: the root carries `data-ground` (dark | light), `data-crossing` while text is in its
 * contrast-safe state, and `--environment-background` — the exact color painting `[data-environment]`.
 */
export function Environment({ className, initial = "ink", children }: { className: string; initial?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    let anchors: Anchor[] = []
    let frame = 0
    const tones = new Map<string, Atmosphere>()
    let lightText: RGB = WHITE, darkText: RGB = BLACK

    const readTokens = () => {
      tones.clear()
      const styles = getComputedStyle(root)
      const token = (name: string) => styles.getPropertyValue(name).trim()
      lightText = token("--fn-white") ? parseHex(token("--fn-white")) : WHITE
      darkText = token("--fn-black") ? parseHex(token("--fn-black")) : BLACK
      for (const key of new Set([initial, ...anchors.map(anchor => anchor.key)])) {
        const base = token(`--env-${key}`)
        if (!base) { console.warn(`Environment tone --env-${key} is not defined`); continue }
        tones.set(key, {
          base: parseHex(base),
          glow: parseHex(token(`--env-${key}-glow`) || base),
          strength: Number(token(`--env-${key}-glow-strength`) || 0),
          x: Number(token(`--env-${key}-glow-x`) || 50),
          y: Number(token(`--env-${key}-glow-y`) || 0),
        })
      }
    }

    const paint = () => {
      frame = 0
      const start = tones.get(initial)
      if (!start) return
      const vh = window.innerHeight || 1
      let state = start
      for (const anchor of anchors) {
        const tone = tones.get(anchor.key)
        if (!tone) continue
        let progress = bandProgress((anchor.top - window.scrollY) / vh, anchor.start, anchor.end)
        if (reduce) progress = progress >= .5 ? 1 : 0
        if (progress > 0) state = mixAtmosphere(state, tone, progress)
      }
      const ground = resolveGround(state.base, lightText, darkText)
      const [r, g, b] = state.glow.map(Math.round)
      root.style.setProperty("--environment-background", toHex(state.base))
      root.style.setProperty("--environment-foreground", toHex(ground.fg))
      root.style.setProperty("--environment-glow", `rgb(${r} ${g} ${b} / ${(state.strength * ground.glowFactor).toFixed(3)})`)
      root.style.setProperty("--environment-glow-x", `${state.x.toFixed(2)}%`)
      root.style.setProperty("--environment-glow-y", `${state.y.toFixed(2)}%`)
      if (root.dataset.ground !== ground.ground) root.dataset.ground = ground.ground
      root.toggleAttribute("data-crossing", ground.crossing)
    }

    const measure = () => {
      anchors = [...root.querySelectorAll<HTMLElement>("[data-env]")].map(el => ({
        el,
        key: el.dataset.env ?? initial,
        top: el.getBoundingClientRect().top + window.scrollY,
        start: Number(el.dataset.envStart ?? 1),
        end: Number(el.dataset.envEnd ?? .4),
      }))
      readTokens()
      paint()
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint) }
    const remeasure = () => { cancelAnimationFrame(frame); frame = 0; measure() }

    measure()
    const observer = new ResizeObserver(remeasure)
    observer.observe(root)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", remeasure)
    window.addEventListener("load", remeasure)
    window.addEventListener("pageshow", remeasure)
    document.fonts?.ready.then(remeasure).catch(() => {})
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", remeasure)
      window.removeEventListener("load", remeasure)
      window.removeEventListener("pageshow", remeasure)
    }
  }, [initial, reduce])

  return <div ref={ref} className={`fn-environment ${className}`} data-ground="dark">
    <div className="fn-backdrop" data-environment aria-hidden="true" />
    {children}
  </div>
}

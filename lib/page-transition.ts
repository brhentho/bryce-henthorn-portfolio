"use client"

/**
 * Sequential page-to-page transition coordinator.
 *
 * Drives a 4-step sequence so the route change is fully hidden behind a
 * solid ink overlay — no scroll motion or snapshot crossfade ever visible:
 *
 *   1. fading-in:   overlay opacity 0 → 1                     (FADE_MS)
 *   2. holding:     overlay at opacity 1; route push + scrollTo(0,0)
 *   3. fading-out:  overlay opacity 1 → 0                     (FADE_MS)
 *   4. idle:        overlay unmounted; page animations run normally
 *
 * Total wall-clock: ~2 × FADE_MS + a brief commit window.
 */

export type TransitionState = "idle" | "fading-in" | "holding" | "fading-out"

export const FADE_MS = 280
const COMMIT_HOLD_MS = 120 // give Next a beat to mount the new route at scroll-top

let current: TransitionState = "idle"
const listeners = new Set<(state: TransitionState) => void>()

function emit(next: TransitionState) {
  current = next
  for (const fn of listeners) fn(next)
}

export function subscribe(fn: (state: TransitionState) => void): () => void {
  listeners.add(fn)
  fn(current)
  return () => {
    listeners.delete(fn)
  }
}

export function getTransitionState(): TransitionState {
  return current
}

let inFlight = false

/**
 * Run the sequence. `navigate` is the actual route push (caller wires the
 * Next router so this module stays framework-agnostic).
 */
export async function transitionTo(navigate: () => void): Promise<void> {
  if (inFlight) return
  if (typeof window === "undefined") {
    navigate()
    return
  }

  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReduced) {
    navigate()
    window.scrollTo(0, 0)
    return
  }

  inFlight = true
  try {
    // 1. Fade ink in.
    emit("fading-in")
    await wait(FADE_MS)

    // 2. Hold at full ink while the route changes underneath.
    emit("holding")
    navigate()
    window.scrollTo(0, 0)
    await wait(COMMIT_HOLD_MS)

    // 3. Fade ink out — the freshly committed page is revealed at top
    //    and its own scroll-reveal / HeroIntro animations fire naturally.
    emit("fading-out")
    await wait(FADE_MS)
  } finally {
    emit("idle")
    inFlight = false
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

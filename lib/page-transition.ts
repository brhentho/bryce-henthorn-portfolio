"use client"

/**
 * Sequential page-to-page transition coordinator.
 *
 * Drives a 4-step editorial wipe so the route change is fully hidden behind
 * an ink field — no scroll motion or intermediate page frame is visible:
 *
 *   1. fading-in:   ink wipes left → right over the current page
 *   2. holding:     route commits behind the fully covered viewport
 *   3. fading-out:  ink continues right, exposing the ready destination
 *   4. idle:        overlay resets off-screen
 */

export type TransitionState = "idle" | "fading-in" | "holding" | "fading-out"
export type TransitionListener = (
  state: TransitionState,
  destination: string | null,
) => void

/**
 * The hold is long enough for the status typography and the destination route
 * to settle. The reveal never starts until Next has committed the new page.
 */
export const WIPE_IN_MS = 360
export const WIPE_OUT_MS = 420
const MIN_HOLD_MS = 520
const COMMIT_TIMEOUT_MS = 2000

let current: TransitionState = "idle"
let currentDestination: string | null = null
const listeners = new Set<TransitionListener>()

function emit(next: TransitionState) {
  current = next
  if (typeof document !== "undefined") {
    if (next === "idle") {
      delete document.documentElement.dataset.routeTransition
    } else {
      document.documentElement.dataset.routeTransition = next
    }
  }
  for (const fn of listeners) fn(next, currentDestination)
}

export function subscribe(fn: TransitionListener): () => void {
  listeners.add(fn)
  fn(current, currentDestination)
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
export async function transitionTo(
  navigate: () => void,
  destination?: string,
): Promise<void> {
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
    // `behavior: "instant"` overrides `html { scroll-behavior: smooth }`
    // in globals.css — without it the scroll-to-top animates smoothly
    // and the tail of that animation is still running when the ink
    // overlay fades out, producing a visible scroll jump.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    return
  }

  currentDestination = destination ?? null
  inFlight = true
  try {
    // 1. Cover the current page with a left-to-right ink wipe.
    emit("fading-in")
    await wait(WIPE_IN_MS)

    // 2. Hold at full ink until the destination has actually committed.
    emit("holding")
    const previousLocation =
      window.location.pathname + window.location.search + window.location.hash
    navigate()
    // `behavior: "instant"` overrides `html { scroll-behavior: smooth }`
    // in globals.css — without it the scroll-to-top animates smoothly
    // and the tail of that animation is still running when the ink
    // overlay fades out, producing a visible scroll jump.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    await Promise.all([
      waitForDestinationCommit(previousLocation),
      wait(MIN_HOLD_MS),
    ])

    // 3. Continue the wipe off the right edge. Hero text is held at its
    //    initial frame until this phase begins, so the destination resolves
    //    as it is exposed rather than flashing before its intro.
    emit("fading-out")
    await wait(WIPE_OUT_MS)
  } finally {
    emit("idle")
    currentDestination = null
    inFlight = false
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function waitForDestinationCommit(previousLocation: string): Promise<void> {
  return new Promise((resolve) => {
    const deadline = performance.now() + COMMIT_TIMEOUT_MS

    const check = () => {
      const currentLocation =
        window.location.pathname + window.location.search + window.location.hash
      const destinationReady =
        currentLocation !== previousLocation && document.querySelector("main")

      if (destinationReady || performance.now() >= deadline) {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        return
      }

      requestAnimationFrame(check)
    }

    requestAnimationFrame(check)
  })
}

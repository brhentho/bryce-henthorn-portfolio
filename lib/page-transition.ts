"use client"

/**
 * Sequential page-to-page transition coordinator.
 *
 * Drives a complementary data-flow handoff so the route change is fully
 * hidden behind ink — no scroll motion or intermediate page frame is visible:
 *
 *   1. exiting: hero words resolve backward while the page fades to ink
 *   2. waiting: route commits behind the fully covered viewport
 *   3. idle: the ink shield is removed and the destination intro starts
 */

export type TransitionState = "idle" | "exiting" | "waiting"
export type TransitionListener = (state: TransitionState) => void

const EXIT_TIMEOUT_MS = 1000
const EXIT_DURATION_MS = 500
const HERO_EXIT_DURATION_MS = 300
const HERO_EXIT_EASING = "cubic-bezier(0.7, 0, 0.84, 0)"
const HERO_HIDDEN_CLIP = "inset(-0.18em 100% -0.24em 0)"
const COMMIT_TIMEOUT_MS = 2000

let current: TransitionState = "idle"
const listeners = new Set<TransitionListener>()
let routeMountVersion = 0
let lastMountedPathname: string | null = null

function emit(next: TransitionState) {
  current = next
  if (typeof document !== "undefined") {
    if (next === "idle") {
      delete document.documentElement.dataset.routeTransition
    } else {
      document.documentElement.dataset.routeTransition = next
    }
  }
  for (const fn of listeners) fn(next)
}

export function subscribe(fn: TransitionListener): () => void {
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

export function notifyRouteMounted(pathname: string) {
  lastMountedPathname = pathname
  routeMountVersion += 1
}

/**
 * Run the sequence. `navigate` is the actual route push (caller wires the
 * Next router so this module stays framework-agnostic).
 */
export async function transitionTo(
  navigate: () => void,
  destinationPathname?: string,
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

  inFlight = true
  let exitAnimations: Animation[] = []
  try {
    // 1. Reverse the current HeroIntro and fade the document into ink.
    emit("exiting")
    exitAnimations = startHeroExitAnimations()
    await waitForExitAnimations(exitAnimations)

    // 2. Hold at full ink until the pathname-keyed route boundary mounts.
    emit("waiting")
    const previousLocation =
      window.location.pathname + window.location.search + window.location.hash
    const previousMountVersion = routeMountVersion
    navigate()
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    await waitForDestinationMount(
      previousLocation,
      previousMountVersion,
      destinationPathname,
    )
  } finally {
    // Removing the shield and releasing the paused destination HeroIntro happen
    // in the same style update, preserving every frame of the existing intro.
    for (const animation of exitAnimations) animation.cancel()
    emit("idle")
    inFlight = false
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function startHeroExitAnimations(): Animation[] {
  const elements = document.querySelectorAll<HTMLElement>(
    ".hero-intro-word, .hero-intro-eyebrow-text",
  )

  return Array.from(elements, (element) => {
    const computed = getComputedStyle(element)
    const delay = Number.parseFloat(
      computed.getPropertyValue("--hero-exit-delay"),
    )

    return element.animate(
      [
        {
          opacity: computed.opacity,
          clipPath: computed.clipPath,
        },
        {
          opacity: 0.35,
          clipPath: HERO_HIDDEN_CLIP,
        },
      ],
      {
        duration: HERO_EXIT_DURATION_MS,
        delay: Number.isFinite(delay) ? delay : 0,
        easing: HERO_EXIT_EASING,
        fill: "forwards",
      },
    )
  })
}

async function waitForExitAnimations(animations: Animation[]): Promise<void> {
  await Promise.race([
    Promise.all([
      Promise.allSettled(animations.map((animation) => animation.finished)),
      wait(EXIT_DURATION_MS),
    ]),
    wait(EXIT_TIMEOUT_MS),
  ])
}

function waitForDestinationMount(
  previousLocation: string,
  previousMountVersion: number,
  destinationPathname?: string,
): Promise<void> {
  return new Promise((resolve) => {
    const deadline = performance.now() + COMMIT_TIMEOUT_MS

    const check = () => {
      const currentLocation =
        window.location.pathname + window.location.search + window.location.hash
      const destinationReady =
        currentLocation !== previousLocation &&
        routeMountVersion > previousMountVersion &&
        (!destinationPathname || lastMountedPathname === destinationPathname)

      if (destinationReady || performance.now() >= deadline) {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        return
      }

      requestAnimationFrame(check)
    }

    requestAnimationFrame(check)
  })
}

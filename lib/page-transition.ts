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

export type TransitionState = "idle" | "exiting" | "waiting" | "revealing"
export type TransitionListener = (state: TransitionState) => void

const EXIT_TIMEOUT_MS = 1000
const EXIT_DURATION_MS = 500
const HERO_EXIT_DURATION_MS = 300
// Exit reverses the HeroIntro reveal, so it shares the same clip window and
// the --ease-in-expo curve defined in globals.css.
const HERO_EXIT_EASING_FALLBACK = "cubic-bezier(0.7, 0, 0.84, 0)"
const HERO_HIDDEN_CLIP_FALLBACK = "inset(-0.5em 100% -0.5em -0.25em)"
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

  const root = getComputedStyle(document.documentElement)
  const easing =
    root.getPropertyValue("--ease-in-expo").trim() || HERO_EXIT_EASING_FALLBACK
  const hiddenClip =
    root.getPropertyValue("--hero-clip-hidden").trim() || HERO_HIDDEN_CLIP_FALLBACK

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
          clipPath: hiddenClip,
        },
      ],
      {
        duration: HERO_EXIT_DURATION_MS,
        delay: Number.isFinite(delay) ? delay : 0,
        easing,
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

let portfolioNavigation: AbortController | null = null

/** Public routes share the existing shield, but use a directional editorial wipe. */
export async function transitionPortfolioTo(navigate: () => void, destination: URL, animated = true): Promise<void> {
  portfolioNavigation?.abort()
  const controller = new AbortController()
  portfolioNavigation = controller
  const { signal } = controller
  const html = document.documentElement
  if (html.dataset.routeStyle === "portfolio") {
    emit("idle")
    delete html.dataset.routeStyle
  }
  const panel = document.querySelector<HTMLElement>(".route-transition")
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
  const root = getComputedStyle(html)
  const milliseconds = (token: string) => {
    const value = root.getPropertyValue(token).trim()
    return parseFloat(value) * (value.endsWith("ms") ? 1 : 1000)
  }
  const animations: Animation[] = []
  const shield = animated && !reduced.matches && Boolean(panel)
  const previousVersion = routeMountVersion
  const finishMotion = () => {
    if (reduced.matches) for (const animation of animations) {
      if (animation.playState === "running" || animation.playState === "paused") animation.finish()
    }
  }
  const cancel = () => { for (const animation of animations) animation.cancel() }
  const historyChanged = () => controller.abort()
  signal.addEventListener("abort", cancel, { once: true })
  window.addEventListener("popstate", historyChanged)
  reduced.addEventListener("change", finishMotion)
  window.dispatchEvent(new CustomEvent("portfolio-navigation-status", { detail: "" }))

  async function wipe(from: number, to: number) {
    if (!panel || reduced.matches) return
    const animation = panel.animate(
      [{ transform: `translateX(${from}%)` }, { transform: `translateX(${to}%)` }],
      { duration: milliseconds("--duration-route"), easing: root.getPropertyValue("--ease-in-out-sine").trim(), fill: "forwards" },
    )
    animations.push(animation)
    await animation.finished
  }

  try {
    inFlight = true
    if (shield) {
      html.dataset.routeStyle = "portfolio"
      emit("exiting")
      const words = Array.from(document.querySelectorAll<HTMLElement>(".portfolio main h1 .hero-intro-word"))
        .filter(word => { const rect = word.getBoundingClientRect(); return rect.bottom > 0 && rect.top < innerHeight })
      words.forEach((word, index) => {
        animations.push(word.animate(
          [{ opacity: 1, clipPath: root.getPropertyValue("--hero-clip-shown") }, { opacity: .35, clipPath: root.getPropertyValue("--hero-clip-hidden") }],
          { duration: milliseconds("--duration-normal-ui"), delay: (words.length - index - 1) * milliseconds("--stagger-word"),
            easing: root.getPropertyValue("--ease-in-expo").trim(), fill: "forwards" },
        ))
      })
      await wipe(-100, 0)
      if (signal.aborted) return
      emit("waiting")
    }
    if (signal.aborted) return
    navigate()
    await new Promise<void>((resolve, reject) => {
      const deadline = performance.now() + 10000
      function check() {
        if (signal.aborted) return reject(new DOMException("Navigation interrupted", "AbortError"))
        const header = document.querySelector<HTMLElement>(".portfolio [data-portfolio-route]")
        if (routeMountVersion > previousVersion && lastMountedPathname === destination.pathname &&
          header?.dataset.portfolioRoute === destination.pathname) {
          requestAnimationFrame(() => resolve())
        } else if (performance.now() > deadline) {
          reject(new Error(`Destination did not finish mounting: ${destination.pathname}`))
        } else requestAnimationFrame(check)
      }
      check()
    })
    if (signal.aborted) return
    const hashTarget = destination.hash ? document.getElementById(decodeURIComponent(destination.hash.slice(1))) : null
    if (destination.hash && !hashTarget) console.warn(`Portfolio anchor not found: ${destination.hash}`)
    if (hashTarget) hashTarget.scrollIntoView({ behavior: "instant", block: "start" })
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    if (shield && !reduced.matches) {
      emit("revealing")
      await wipe(0, 100)
    }
    if (signal.aborted) return
    const target = hashTarget ?? document.querySelector<HTMLElement>(".portfolio main h1")
    if (target) {
      const hadTabIndex = target.hasAttribute("tabindex")
      if (!hadTabIndex) target.tabIndex = -1
      target.focus({ preventScroll: true })
      if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true })
    }
  } catch (error) {
    if (!(error instanceof DOMException && error.name === "AbortError")) {
      console.warn("Portfolio navigation could not finish.", error)
      window.dispatchEvent(new CustomEvent("portfolio-navigation-status", {
        detail: "This page is taking longer to open. You can try the link again.",
      }))
    }
  } finally {
    signal.removeEventListener("abort", cancel)
    window.removeEventListener("popstate", historyChanged)
    reduced.removeEventListener("change", finishMotion)
    if (portfolioNavigation === controller) {
      emit("idle")
      delete html.dataset.routeStyle
      portfolioNavigation = null
      inFlight = false
    }
    cancel()
  }
}

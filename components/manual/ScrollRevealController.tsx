"use client"

import { useEffect } from "react"

/**
 * Mounted once per page (inside ManualShell). Watches every `[data-reveal]`
 * element and flips `data-revealed="true"` on first viewport entry, then
 * unobserves. CSS in recall.css handles the actual animation.
 *
 * SSR-safe by design: server renders elements with `data-reveal` and no
 * `data-revealed`, which CSS treats as the hidden initial state. No flash.
 */
export function ScrollRevealController() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Fallback: mark everything revealed immediately.
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.setAttribute("data-revealed", "true"))
      return
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed='true'])"),
    )
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0 },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return null
}

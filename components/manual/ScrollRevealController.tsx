"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const SELECTOR = "[data-reveal]:not([data-revealed='true'])"

/**
 * Mounted once per page (inside ManualShell). Watches every `[data-reveal]`
 * element and flips `data-revealed="true"` on first viewport entry, then
 * unobserves. CSS in recall.css handles the actual animation.
 *
 * SSR-safe by design: server renders elements with `data-reveal` and no
 * `data-revealed`, which CSS treats as the hidden initial state. No flash.
 *
 * The initial query is not enough on its own — anything rendered after mount
 * (client-only subtrees, a soft route change that reuses this controller)
 * would never be observed and would stay stuck at `opacity: 0`. So the scan
 * re-runs on `pathname` and a MutationObserver picks up nodes added later.
 */
export function ScrollRevealController() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Fallback: mark everything revealed immediately.
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.setAttribute("data-revealed", "true"))
      return
    }

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

    // Observing an already-observed element is a no-op, so rescanning the
    // whole document on every mutation batch is safe (and cheaper than
    // tracking membership ourselves).
    const scan = () => {
      document
        .querySelectorAll<HTMLElement>(SELECTOR)
        .forEach((el) => {
          el.setAttribute("data-reveal-pending", "true")
          observer.observe(el)
        })
    }
    scan()

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        if (record.addedNodes.length > 0) {
          scan()
          return
        }
      }
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [pathname])

  return null
}

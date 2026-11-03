"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const SELECTOR = "[data-reveal]:not([data-revealed='true'])"

/**
 * Mounted once per page (inside ManualShell). Watches every `[data-reveal]`
 * element and flips `data-revealed="true"` on first viewport entry, then
 * unobserves. CSS in recall.css handles the actual animation.
 *
 * Content remains visible before observation so an interrupted observer
 * cannot leave a section hidden.
 *
 * The scan re-runs on `pathname` and a MutationObserver picks up nodes added
 * after mount, including client-only subtrees.
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

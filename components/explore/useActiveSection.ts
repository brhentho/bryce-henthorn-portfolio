"use client"

import { useEffect, useState } from "react"

/**
 * Tracks which of the given element ids is currently the reading position:
 * the last section whose top has crossed `line` (fraction of viewport height).
 */
export function useActiveSection(ids: readonly string[], line = 0.4) {
  const [active, setActive] = useState<string>(ids[0] ?? "")

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const y = window.innerHeight * line
      let current = ids[0] ?? ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= y) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids, line])

  return active
}

/** Scroll to an in-page target; instant under reduced motion. Updates the hash without a jump. */
export function goToSection(id: string, offset = 0) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" })
  history.replaceState(null, "", `#${id}`)
}

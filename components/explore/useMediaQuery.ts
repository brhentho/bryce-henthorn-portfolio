"use client"

import { useSyncExternalStore } from "react"

/** SSR-safe media query; returns `fallback` on the server and first hydration pass. */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", notify)
      return () => mql.removeEventListener("change", notify)
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  )
}

"use client"

import { useMediaQuery } from "./useMediaQuery"

/** Hydration-safe reduced-motion flag; framer's useReducedMotion reads the client value on the first pass. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}

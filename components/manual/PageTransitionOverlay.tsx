"use client"

import { useEffect, useState } from "react"
import {
  FADE_MS,
  subscribe,
  type TransitionState,
} from "@/lib/page-transition"

/**
 * Full-screen ink overlay driven by the `transitionTo` coordinator.
 * Mounted once at the root layout level so a single instance covers
 * every route. Pointer events block only while a transition is in
 * flight to prevent double-clicks.
 */
export function PageTransitionOverlay() {
  const [state, setState] = useState<TransitionState>("idle")

  useEffect(() => subscribe(setState), [])

  const visible = state !== "idle"
  const opaque = state === "fading-in" || state === "holding"

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0"
      style={{
        zIndex: 9999,
        background: "var(--bg, #06060A)",
        opacity: opaque ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: `opacity ${FADE_MS}ms linear`,
      }}
    />
  )
}

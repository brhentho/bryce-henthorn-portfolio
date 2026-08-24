"use client"

import { useEffect, useState } from "react"
import {
  subscribe,
  type TransitionState,
} from "@/lib/page-transition"

/**
 * Full-screen ink shield driven by the route coordinator. It carries no
 * destination UI: the outgoing HeroIntro provides the exit and the existing
 * destination HeroIntro provides the entrance.
 */
export function PageTransitionOverlay() {
  const [state, setState] = useState<TransitionState>("idle")

  useEffect(
    () =>
      subscribe((nextState) => {
        setState(nextState)
      }),
    [],
  )

  const visible = state !== "idle"
  return (
    <div
      aria-hidden="true"
      className="route-transition fixed inset-0"
      data-state={state}
      style={{
        zIndex: 9999,
        background: "var(--bg, #0B0B0C)",
        pointerEvents: visible ? "auto" : "none",
      }}
    />
  )
}

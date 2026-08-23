"use client"

import { useEffect, useState } from "react"
import {
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
  const [destination, setDestination] = useState<string | null>(null)

  useEffect(
    () =>
      subscribe((nextState, nextDestination) => {
        setState(nextState)
        setDestination(nextDestination)
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
    >
      <div className="route-transition-chrome">
        <span>DOCUMENT INDEX</span>
        <span className="route-transition-status">
          <span>INDEXING</span>
          <span>MATCHED</span>
          <span>READY</span>
        </span>
      </div>
      <p className="route-transition-title">{destination}</p>
      <div className="route-transition-footer">
        <span>BRYCE HENTHORN</span>
        <span>HUMAN–AI SYSTEMS</span>
      </div>
    </div>
  )
}

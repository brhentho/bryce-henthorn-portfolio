"use client"

import { useEffect, useRef, type ReactNode, type PointerEvent } from "react"
import { ContinuityLink } from "../ContinuityLink"
import { useReducedMotion } from "../useReducedMotion"

// Conic edge, speckled mask and inner sheen adapted from the supplied Hyperiux Shiny Button.
export function ShinyLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const frame = useRef(0)
  useEffect(() => () => cancelAnimationFrame(frame.current), [])
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || event.pointerType === "touch") return
    const link = event.currentTarget
    const rect = link.getBoundingClientRect()
    const x = event.clientX - rect.left, y = event.clientY - rect.top
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      link.style.setProperty("--shine-angle", `${Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180 / Math.PI + 90}deg`)
      link.style.setProperty("--shine-x", `${x}px`)
      link.style.setProperty("--shine-y", `${y}px`)
    })
  }
  return <ContinuityLink href={href} pointerOnly className={`fn-shiny ${className}`} onPointerMove={move}
    onPointerLeave={event => { cancelAnimationFrame(frame.current); event.currentTarget.style.removeProperty("--shine-angle") }}>
    <span className="fn-shiny-label">{children}</span><span className="fn-shiny-arrow" aria-hidden="true">↗</span>
  </ContinuityLink>
}

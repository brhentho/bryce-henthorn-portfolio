"use client"

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react"
import { useReducedMotion } from "../explore/useReducedMotion"
import { PortfolioLink } from "./PortfolioLink"

export function ProjectImageLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const frame = useRef(0)
  const reduce = useReducedMotion()
  function reset() {
    cancelAnimationFrame(frame.current)
    ref.current?.style.removeProperty("--image-x")
    ref.current?.style.removeProperty("--image-y")
  }
  useEffect(() => { if (reduce) reset(); return reset }, [reduce])
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (reduce || event.pointerType === "touch" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const box = event.currentTarget.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1))
    const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1))
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--image-x", String(x))
      ref.current?.style.setProperty("--image-y", String(-y))
    })
  }
  return <PortfolioLink ref={ref} href={href} aria-label={label} className="pf-project-link"
    onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
    <div className="pf-image-interaction">{children}</div>
  </PortfolioLink>
}

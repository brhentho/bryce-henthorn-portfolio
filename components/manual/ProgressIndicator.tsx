"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

/**
 * Tracks scroll position relative to elements with `data-section` inside the
 * `.manual` wrapper. Renders "§ NN / TT" in the top-right on desktop only.
 * Hidden from screen readers — purely decorative orientation chrome.
 */
export function ProgressIndicator({ className }: Props) {
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    )
    setTotal(sections.length)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
        if (visible[0]) {
          const idx = sections.indexOf(visible[0].target as HTMLElement)
          if (idx >= 0) setCurrent(idx + 1)
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  if (total === 0) return null

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed top-6 right-6 z-30",
        "hidden lg:block",
        "t-mono-caption text-[color:var(--text-tertiary)]",
        "pointer-events-none select-none",
        className,
      )}
    >
      § <span className="text-[color:var(--accent-trace)]">{pad(current)}</span> / {pad(total)}
    </div>
  )
}

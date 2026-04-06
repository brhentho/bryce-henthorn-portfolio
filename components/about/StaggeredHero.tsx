"use client"

import { useEffect, useState, useRef } from "react"
import { useReducedMotion } from "@/components/motion/useReducedMotion"

interface StaggeredHeroProps {
  lines: { text: string; accent?: boolean }[]
}

export function StaggeredHero({ lines }: StaggeredHeroProps) {
  const reduced = useReducedMotion()
  const [visibleCount, setVisibleCount] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Trigger on scroll into view
  useEffect(() => {
    if (reduced) {
      setVisibleCount(lines.length)
      return
    }

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced, lines.length])

  // Stagger each line 200ms apart
  useEffect(() => {
    if (!triggered || reduced) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= lines.length) clearInterval(interval)
    }, 200)
    return () => clearInterval(interval)
  }, [triggered, reduced, lines.length])

  return (
    <div ref={containerRef}>
      <h1 className="font-heading text-2xl md:text-3xl lg:text-[2.5rem] font-semibold leading-[1.4] tracking-tight text-foreground">
        {lines.map((line, i) => (
          <span
            key={i}
            className="block"
            style={{
              opacity: i < visibleCount ? 1 : 0,
              transform: i < visibleCount ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth)",
            }}
          >
            {line.accent ? (
              <span className="text-accent">{line.text}</span>
            ) : (
              line.text
            )}
          </span>
        ))}
      </h1>
    </div>
  )
}

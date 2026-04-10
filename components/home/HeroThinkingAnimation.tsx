"use client"

import { useEffect, useState, useRef } from "react"
import AnimCanvas from "@/components/motion/AnimCanvas"
import { useReducedMotion } from "@/components/motion/useReducedMotion"

const HERO_CYCLE = [
  { id: "intake", label: "generating", period: 3000 },
  { id: "process", label: "thinking", period: 2800 },
  { id: "synthesize", label: "planning", period: 2400 },
  { id: "output", label: "synthesizing", period: 1600 },
] as const

const COLOR = "#5B9BF5"
const CYCLE_DURATION = 3200 // ms per state before transitioning

export function HeroThinkingAnimation() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [fadingOut, setFadingOut] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fade in after 200ms delay
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Cycle through states
  useEffect(() => {
    if (reduced) return

    intervalRef.current = setInterval(() => {
      setFadingOut(true)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % HERO_CYCLE.length)
        setFadingOut(false)
      }, 300)
    }, CYCLE_DURATION)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [reduced])

  const current = HERO_CYCLE[activeIndex]

  if (reduced) {
    return (
      <div
        className="flex items-center justify-center gap-3 mt-6"
        style={{
          opacity: visible ? 0.6 : 0,
          transition: `opacity var(--duration-normal) var(--ease-smooth)`,
        }}
      >
        <span
          className="text-xs tracking-[0.12em] uppercase"
          style={{ fontFamily: "monospace", color: COLOR }}
        >
          thinking...
        </span>
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-center gap-3 mt-6"
      style={{
        opacity: visible ? 0.6 : 0,
        transition: `opacity var(--duration-slow) var(--ease-smooth)`,
      }}
    >
      <AnimCanvas
        id={current.id}
        color={COLOR}
        period={current.period}
        renderPx={20}
        mode="squares"
      />
      <span
        className="text-xs tracking-[0.12em] uppercase"
        style={{
          fontFamily: "monospace",
          color: COLOR,
          opacity: fadingOut ? 0 : 1,
          transition: "opacity 300ms var(--ease-smooth)",
        }}
      >
        {current.label}...
      </span>
    </div>
  )
}

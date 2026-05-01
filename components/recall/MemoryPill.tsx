"use client"

import { useReducedMotion } from "@/components/motion/useReducedMotion"

const ICONS: Record<string, string> = {
  calendar: "📅",
  gmail: "✉️",
  tag: "🏷️",
  location: "📍",
  avatar: "👤",
}

interface MemoryPillProps {
  icon: string
  label: string
  x: string
  y: string
  /** Stagger index for breathe animation offset */
  index: number
}

export function MemoryPill({ icon, label, x, y, index }: MemoryPillProps) {
  const reduced = useReducedMotion()
  const breatheDuration = 6 + (index % 3) * 1 // 6-8s staggered
  const breatheDelay = index * 0.7

  return (
    <div
      className="absolute px-3 py-1.5 rounded-[22px] flex items-center gap-1.5 whitespace-nowrap pointer-events-none"
      style={{
        left: x,
        top: y,
        backdropFilter: "blur(5.5px)",
        WebkitBackdropFilter: "blur(5.5px)",
        background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.2)",
        animation: reduced
          ? "none"
          : `pill-breathe ${breatheDuration}s var(--ease-smooth) infinite`,
        animationDelay: `${breatheDelay}s`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="text-sm" aria-hidden="true">
        {ICONS[icon] ?? "🏷️"}
      </span>
      <span
        className="text-[11px] text-white/80"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        {label}
      </span>
    </div>
  )
}

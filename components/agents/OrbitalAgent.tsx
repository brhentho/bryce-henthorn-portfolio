"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

const TAU = Math.PI * 2

interface OrbitalAgentProps {
  name: string
  icon: string
  glow: string
  size: number
  orbit: { rx: number; ry: number; speed: number; phase: number }
  tasks: string[]
  frozen?: boolean
}

export function OrbitalAgent({
  name,
  icon,
  glow,
  size,
  orbit,
  tasks,
  frozen = false,
}: OrbitalAgentProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [taskIndex, setTaskIndex] = useState(0)
  const [taskFading, setTaskFading] = useState(false)
  const animRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  // Orbital animation
  useEffect(() => {
    if (frozen) {
      // Static position at phase
      const angle = orbit.phase * TAU
      setPos({
        x: Math.cos(angle) * orbit.rx,
        y: Math.sin(angle) * orbit.ry * 0.6,
      })
      return
    }

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) / 1000
      const angle = (elapsed / orbit.speed) * TAU + orbit.phase * TAU
      setPos({
        x: Math.cos(angle) * orbit.rx,
        y: Math.sin(angle) * orbit.ry * 0.6,
      })
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [orbit, frozen])

  // Cycle tasks every 8-12s
  useEffect(() => {
    if (frozen || tasks.length <= 1) return

    const cycle = () => {
      setTaskFading(true)
      setTimeout(() => {
        setTaskIndex((prev) => (prev + 1) % tasks.length)
        setTaskFading(false)
      }, 300)
    }

    const delay = 8000 + Math.random() * 4000
    const interval = setInterval(cycle, delay)
    return () => clearInterval(interval)
  }, [frozen, tasks.length])

  // Z-ordering: items higher on screen (negative y) appear behind
  const zIndex = Math.round(pos.y + 500)

  return (
    <div
      className="absolute flex flex-col items-center gap-1.5 pointer-events-none"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        zIndex,
        willChange: frozen ? "auto" : "transform",
      }}
    >
      {/* Icon with glow */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          boxShadow: `0 0 ${size * 0.6}px ${glow}, 0 0 ${size * 0.2}px ${glow}`,
        }}
      >
        <Image
          src={icon}
          alt={name}
          width={size}
          height={size}
          className="rounded-full object-contain"
        />
      </div>

      {/* Task pill */}
      <div
        className="px-2.5 py-1 rounded-full whitespace-nowrap"
        style={{
          backdropFilter: "blur(5.5px)",
          WebkitBackdropFilter: "blur(5.5px)",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <span
          className="text-[11px] text-white/80"
          style={{
            fontFamily: "monospace",
            opacity: taskFading ? 0 : 1,
            transition: "opacity 300ms var(--ease-smooth)",
          }}
        >
          {tasks[taskIndex]}
        </span>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useReducedMotion } from "@/components/motion/useReducedMotion"

/* ─── Pill sizes from Figma ─── */
type PillSize = "sm" | "md" | "lg"

const SIZE_MAP: Record<PillSize, { icon: number; text: string; px: number; py: number; gap: number; radius: number; border: number; blur: number; opacity: number }> = {
  sm:  { icon: 16, text: "13px",  px: 12,  py: 8,   gap: 5,  radius: 10,  border: 1,    blur: 16, opacity: 1 },
  md:  { icon: 20, text: "15px",  px: 14,  py: 10,  gap: 6,  radius: 12,  border: 1,    blur: 20, opacity: 1 },
  lg:  { icon: 22, text: "17px",  px: 16,  py: 11,  gap: 7,  radius: 13,  border: 1.2,  blur: 24, opacity: 1 },
}

/* ─── The 6 Figma pills + extras for variety ─── */
interface PillData {
  icon: string
  label: string
  size: PillSize
  /** Starting Y as fraction of container (0–1) */
  y: number
  /** Starting X offset fraction (0–1) */
  xStart: number
  /** Drift speed in px/s */
  speed: number
  /** Override opacity (e.g. 0.6 for the Copilot pill) */
  pillOpacity?: number
}

const PILLS: PillData[] = [
  // The 6 from Figma
  { icon: "/assets/agents/pill-github.svg",    label: "Implement accordian",    size: "lg", y: 0.10, xStart: 0.30, speed: 14, },
  { icon: "/assets/agents/pill-jira.png",      label: "Respond to ticket #412", size: "sm", y: 0.22, xStart: 0.65, speed: 18, },
  { icon: "/assets/agents/pill-agents.svg",    label: "New client outreach",    size: "sm", y: 0.34, xStart: 0.02, speed: 16, },
  { icon: "/assets/agents/pill-planet-c1.svg", label: "Design trends 2026",    size: "sm", y: 0.52, xStart: 0.55, speed: 20, },
  { icon: "/assets/agents/pill-finance.svg",   label: "Create spreadsheet",    size: "md", y: 0.62, xStart: 0.10, speed: 12, },
  { icon: "/assets/agents/copilot-1.svg",      label: "Rewrite file intro",    size: "lg", y: 0.76, xStart: 0.60, speed: 10, pillOpacity: 0.6, },
  // Additional pills for density
  { icon: "/assets/agents/dataline-1.svg",     label: "Processing telemetry",  size: "sm", y: 0.88, xStart: 0.35, speed: 17, },
  { icon: "/assets/agents/agents-icon.svg",    label: "Orchestrating workflow", size: "md", y: 0.04, xStart: 0.80, speed: 13, },
]

/* ─── Frosted glass radial gradient background (from Figma) ─── */
function pillBg(w: number, h: number) {
  return `url("data:image/svg+xml;utf8,<svg viewBox='0 0 ${w} ${h}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.8'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-${w / 10} -${h / 10} -${h / 14} -${w / 30} ${w} ${h})'><stop stop-color='rgba(255,255,255,0.4)' offset='0'/><stop stop-color='rgba(255,255,255,0.05)' offset='1'/></radialGradient></defs></svg>")`
}

function DriftPill({ pill, containerWidth }: { pill: PillData; containerWidth: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const animRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const reduced = useReducedMotion()

  const s = SIZE_MAP[pill.size]
  const estimatedWidth = s.icon + s.px * 2 + s.gap + pill.label.length * (parseInt(s.text) * 0.55)
  const totalTravel = containerWidth + estimatedWidth + 100

  useEffect(() => {
    if (reduced || !containerWidth) return

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = (ts - startRef.current) / 1000
      const startOffset = pill.xStart * containerWidth
      const x = ((startOffset + elapsed * pill.speed) % totalTravel) - estimatedWidth - 50
      if (ref.current) {
        ref.current.style.transform = `translateX(${x}px)`
      }
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [reduced, containerWidth, pill, estimatedWidth, totalTravel])

  const staticX = reduced ? pill.xStart * (containerWidth || 800) : 0

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        top: `${pill.y * 100}%`,
        left: 0,
        transform: reduced ? `translateX(${staticX}px)` : undefined,
        willChange: reduced ? "auto" : "transform",
        opacity: pill.pillOpacity ?? s.opacity,
      }}
    >
      <div
        className="flex items-center overflow-hidden whitespace-nowrap"
        style={{
          backdropFilter: `blur(${s.blur}px)`,
          WebkitBackdropFilter: `blur(${s.blur}px)`,
          border: `${s.border}px solid rgba(255,255,255,0.12)`,
          borderRadius: s.radius,
          padding: `${s.py}px ${s.px}px`,
          gap: s.gap,
          backgroundImage: pillBg(300, s.py * 2 + parseInt(s.text)),
          backgroundSize: "100% 100%",
        }}
      >
        <Image
          src={pill.icon}
          alt=""
          width={s.icon}
          height={s.icon}
          className="shrink-0 object-contain"
          style={{ width: s.icon, height: s.icon }}
        />
        <span
          className="font-heading font-light text-white whitespace-nowrap"
          style={{
            fontSize: s.text,
            lineHeight: 0.87,
            letterSpacing: `-${parseFloat(s.text) * 0.02}px`,
          }}
        >
          {pill.label}
        </span>
      </div>
    </div>
  )
}

export function AgentsDriftOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden hidden md:block">
      {/* Drifting pills */}
      {width > 0 &&
        PILLS.map((pill, i) => (
          <DriftPill key={i} pill={pill} containerWidth={width} />
        ))}

      {/* Gradient mask behind title text — fades pills behind heading */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          style={{
            width: "65%",
            height: "40%",
            background:
              "radial-gradient(ellipse at center, rgba(11,11,13,0.95) 0%, rgba(11,11,13,0.7) 45%, transparent 72%)",
          }}
        />
      </div>
    </div>
  )
}

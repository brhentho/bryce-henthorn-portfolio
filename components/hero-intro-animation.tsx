"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"

// --- DOT GRID CONFIGURATION ---
const COLS = 6
const ROWS = 5
const TOTAL = COLS * ROWS // 30 dots

// Generate initial scattered positions (center-biased)
function generateScattered(): { x: number; y: number }[] {
  const dots: { x: number; y: number }[] = []
  for (let i = 0; i < TOTAL; i++) {
    dots.push({
      x: 30 + Math.random() * 40, // 30%–70% horizontal
      y: 25 + Math.random() * 50, // 25%–75% vertical
    })
  }
  return dots
}

// Generate final structured grid positions
function generateGrid(): { x: number; y: number }[] {
  const dots: { x: number; y: number }[] = []
  const startX = 20
  const startY = 30
  const spacingX = 8
  const spacingY = 8
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      dots.push({
        x: startX + c * spacingX,
        y: startY + r * spacingY,
      })
    }
  }
  return dots
}

const scatteredPositions = generateScattered()
const gridPositions = generateGrid()

// --- MAIN COMPONENT ---
export function HeroIntroAnimation() {
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<"scatter" | "form" | "sweep" | "reveal" | "live">("scatter")
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -1, y: -1 })
  const rafRef = useRef<number>(0)
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])

  // Phase sequencing
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("live")
      return
    }

    // Start forming immediately
    const t1 = setTimeout(() => setPhase("form"), 50)
    // Sweep starts at 900ms
    const t2 = setTimeout(() => setPhase("sweep"), 900)
    // Text reveal at 1200ms
    const t3 = setTimeout(() => setPhase("reveal"), 1200)
    // Live mode at 1800ms
    const t4 = setTimeout(() => setPhase("live"), 1800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [prefersReducedMotion])

  // Cursor tracking for live mode
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    }
  }, [])

  // Live dot cursor reactivity via rAF (no state, direct DOM)
  useEffect(() => {
    if (phase !== "live" || prefersReducedMotion) return

    const el = containerRef.current
    if (!el) return
    el.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < TOTAL; i++) {
        const dot = dotsRef.current[i]
        if (!dot) continue
        const gp = gridPositions[i]
        let dx = 0
        let dy = 0
        let scale = 1

        if (mx >= 0 && my >= 0) {
          const distX = gp.x - mx
          const distY = gp.y - my
          const dist = Math.sqrt(distX * distX + distY * distY)
          const radius = 18
          if (dist < radius) {
            const force = (1 - dist / radius) * 2.5
            dx = (distX / (dist || 1)) * force
            dy = (distY / (dist || 1)) * force
            scale = 1 + (1 - dist / radius) * 0.08
          }
        }

        dot.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [phase, prefersReducedMotion, handleMouseMove])

  // Reset cursor when it leaves
  useEffect(() => {
    if (phase !== "live") return
    const el = containerRef.current
    if (!el) return
    const handleLeave = () => {
      mouseRef.current = { x: -1, y: -1 }
    }
    el.addEventListener("mouseleave", handleLeave)
    return () => el.removeEventListener("mouseleave", handleLeave)
  }, [phase])

  if (prefersReducedMotion) return null

  const isForming = phase === "form" || phase === "sweep" || phase === "reveal" || phase === "live"

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ pointerEvents: phase === "live" ? "auto" : "none" }}
      aria-hidden="true"
    >
      {/* Calibration sweep line */}
      {(phase === "sweep" || phase === "reveal") && (
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(237,239,242,0.05) 15%, rgba(237,239,242,0.12) 50%, rgba(237,239,242,0.05) 85%, transparent 100%)",
          }}
          initial={{ top: "15%" }}
          animate={{ top: "85%" }}
          transition={{ duration: 0.7, ease: "linear" }}
        />
      )}

      {/* Grid brightness ramp during sweep */}
      {phase === "sweep" && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.03, 0] }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ background: "rgba(255,255,255,1)" }}
        />
      )}

      {/* Dot system */}
      {Array.from({ length: TOTAL }).map((_, i) => {
        const sp = scatteredPositions[i]
        const gp = gridPositions[i]

        return (
          <motion.div
            key={i}
            ref={(el) => { dotsRef.current[i] = el }}
            className="absolute w-[2px] h-[2px] rounded-full bg-foreground"
            initial={{
              left: `${sp.x}%`,
              top: `${sp.y}%`,
              opacity: 0.25,
              scale: 1,
            }}
            animate={
              isForming
                ? {
                    left: `${gp.x}%`,
                    top: `${gp.y}%`,
                    opacity: phase === "live" ? 0.18 : 0.25,
                    scale: 1,
                  }
                : {
                    opacity: 0.25,
                  }
            }
            transition={{
              left: { duration: 1.0, delay: i * 0.015, ease: [0.42, 0, 0.58, 1] },
              top: { duration: 1.0, delay: i * 0.015, ease: [0.42, 0, 0.58, 1] },
              opacity: { duration: 0.4, delay: isForming ? i * 0.015 : 0 },
              scale: { duration: 0.3 },
            }}
            style={{ willChange: "transform" }}
          />
        )
      })}
    </div>
  )
}

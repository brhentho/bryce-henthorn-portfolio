"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

// --- DOT GRID CONFIGURATION ---
const COLS = 7
const ROWS = 5
const TOTAL = COLS * ROWS // 35 dots

// Generate initial scattered positions (within the right-side container)
function generateScattered(): { x: number; y: number }[] {
  const dots: { x: number; y: number }[] = []
  for (let i = 0; i < TOTAL; i++) {
    dots.push({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    })
  }
  return dots
}

// Generate final structured grid positions (centered in container)
function generateGrid(): { x: number; y: number }[] {
  const dots: { x: number; y: number }[] = []
  const spacingX = 12
  const spacingY = 14
  const totalW = (COLS - 1) * spacingX
  const totalH = (ROWS - 1) * spacingY
  const startX = (100 - totalW) / 2
  const startY = (100 - totalH) / 2
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

export function HeroIntroAnimation() {
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<"scatter" | "form" | "sweep" | "stable">("scatter")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("stable")
      return
    }

    const t1 = setTimeout(() => setPhase("form"), 400)
    const t2 = setTimeout(() => setPhase("sweep"), 1400)
    const t3 = setTimeout(() => setPhase("stable"), 1700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    // Render static grid instantly
    return (
      <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="relative w-full h-[60%]">
          {gridPositions.map((gp, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-foreground"
              style={{ left: `${gp.x}%`, top: `${gp.y}%`, opacity: 0.7 }}
            />
          ))}
        </div>
      </div>
    )
  }

  const isForming = phase !== "scatter"

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:flex items-center justify-center pointer-events-none z-[1]"
      aria-hidden="true"
    >
      <div className="relative w-full h-[60%]">
        {/* Calibration sweep line */}
        {phase === "sweep" && (
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(240,240,243,0.06) 20%, rgba(240,240,243,0.14) 50%, rgba(240,240,243,0.06) 80%, transparent 100%)",
            }}
            initial={{ top: "10%" }}
            animate={{ top: "90%" }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        )}

        {/* Dot system */}
        {Array.from({ length: TOTAL }).map((_, i) => {
          const sp = scatteredPositions[i]
          const gp = gridPositions[i]

          return (
            <motion.div
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-foreground"
              initial={{
                left: `${sp.x}%`,
                top: `${sp.y}%`,
                opacity: 0.4,
                scale: 1,
              }}
              animate={
                isForming
                  ? {
                      left: `${gp.x}%`,
                      top: `${gp.y}%`,
                      opacity: 0.7,
                      scale: 1,
                    }
                  : {
                      opacity: 0.4,
                    }
              }
              transition={{
                left: { duration: 1.0, delay: i * 0.012, ease: [0.42, 0, 0.58, 1] },
                top: { duration: 1.0, delay: i * 0.012, ease: [0.42, 0, 0.58, 1] },
                opacity: { duration: 0.5, delay: isForming ? 0.8 + i * 0.008 : 0 },
                scale: { duration: 0.3 },
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

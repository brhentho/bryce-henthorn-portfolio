"use client"

import { useEffect, useState, useRef } from "react"

// --- FULL-HERO GRID CONFIGURATION ---
const GRID_SPACING = 40 // px between dots
const DOT_SIZE = 3 // px

// Animated cluster (the original right-side dots that form)
const CLUSTER_COLS = 7
const CLUSTER_ROWS = 5
const CLUSTER_TOTAL = CLUSTER_COLS * CLUSTER_ROWS

// Deterministic pseudo-random using a seed so server & client produce identical values
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateScattered(): { x: number; y: number }[] {
  const rand = seededRandom(42)
  const dots: { x: number; y: number }[] = []
  for (let i = 0; i < CLUSTER_TOTAL; i++) {
    dots.push({
      x: 10 + rand() * 80,
      y: 10 + rand() * 80,
    })
  }
  return dots
}

function generateClusterGrid(): { x: number; y: number }[] {
  const dots: { x: number; y: number }[] = []
  const spacingX = 12
  const spacingY = 14
  const totalW = (CLUSTER_COLS - 1) * spacingX
  const totalH = (CLUSTER_ROWS - 1) * spacingY
  const startX = (100 - totalW) / 2
  const startY = (100 - totalH) / 2
  for (let r = 0; r < CLUSTER_ROWS; r++) {
    for (let c = 0; c < CLUSTER_COLS; c++) {
      dots.push({
        x: startX + c * spacingX,
        y: startY + r * spacingY,
      })
    }
  }
  return dots
}

const scatteredPositions = generateScattered()
const clusterGridPositions = generateClusterGrid()

export function HeroIntroAnimation() {
  const [phase, setPhase] = useState<"initial" | "scatter" | "form" | "sweep" | "stable">("initial")
  const sweepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setPhase("stable")
      return
    }

    // Start from scatter on mount
    setPhase("scatter")
    const t1 = setTimeout(() => setPhase("form"), 400)
    const t2 = setTimeout(() => setPhase("sweep"), 1400)
    const t3 = setTimeout(() => setPhase("stable"), 1700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const isForming = phase === "form" || phase === "sweep" || phase === "stable"

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {/* Full-hero static dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(240,240,243,0.12) ${DOT_SIZE / 2}px, transparent ${DOT_SIZE / 2}px)`,
          backgroundSize: `${GRID_SPACING}px ${GRID_SPACING}px`,
          backgroundPosition: `${GRID_SPACING / 2}px ${GRID_SPACING / 2}px`,
        }}
      />

      {/* Animated cluster in the right portion */}
      <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-[60%]">
          {/* Calibration sweep line */}
          {phase === "sweep" && (
            <div
              ref={sweepRef}
              className="absolute left-0 right-0 h-[1px] animate-sweep-line"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(240,240,243,0.06) 20%, rgba(240,240,243,0.14) 50%, rgba(240,240,243,0.06) 80%, transparent 100%)",
              }}
            />
          )}

          {/* All dots - always rendered as plain divs for consistent hydration */}
          {scatteredPositions.map((sp, i) => {
            const gp = clusterGridPositions[i]
            // On server & initial mount, show at scattered positions
            // After mount, CSS transitions handle the animation
            const targetX = isForming ? gp.x : sp.x
            const targetY = isForming ? gp.y : sp.y
            const targetOpacity = isForming ? 0.7 : 0.4

            return (
              <div
                key={i}
                className="absolute rounded-full bg-foreground pointer-events-none"
                style={{
                  width: `${DOT_SIZE}px`,
                  height: `${DOT_SIZE}px`,
                  left: phase === "initial" ? `${sp.x}%` : `${targetX}%`,
                  top: phase === "initial" ? `${sp.y}%` : `${targetY}%`,
                  opacity: phase === "initial" ? 0.4 : targetOpacity,
                  transition: phase !== "initial" && phase !== "scatter"
                    ? `left 1s cubic-bezier(0.42,0,0.58,1) ${i * 0.012}s, top 1s cubic-bezier(0.42,0,0.58,1) ${i * 0.012}s, opacity 0.5s ease ${isForming ? 0.8 + i * 0.008 : 0}s`
                    : "none",
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

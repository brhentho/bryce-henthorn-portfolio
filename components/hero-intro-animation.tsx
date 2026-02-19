"use client"

import { useEffect, useState, useMemo } from "react"

// --- FULL-HERO GRID CONFIGURATION ---
const GRID_SPACING = 40 // px between dots
const DOT_SIZE = 3 // px

// Animated cluster (the original right-side dots that form)
const CLUSTER_COLS = 7
const CLUSTER_ROWS = 5
const CLUSTER_TOTAL = CLUSTER_COLS * CLUSTER_ROWS

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

const clusterGridPositions = generateClusterGrid()

export function HeroIntroAnimation() {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<"scatter" | "form" | "sweep" | "stable">("scatter")
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  // Generate scattered positions only on client after mount to avoid hydration mismatch
  const scatteredPositions = useMemo(() => {
    if (!mounted) return []
    const dots: { x: number; y: number }[] = []
    for (let i = 0; i < CLUSTER_TOTAL; i++) {
      dots.push({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
      })
    }
    return dots
  }, [mounted])

  useEffect(() => {
    setMounted(true)

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
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
  }, [])

  // Mouse-reactive parallax — activates once dots have settled
  useEffect(() => {
    if (phase !== "stable") return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const normX = (e.clientX - cx) / cx // -1 to 1
      const normY = (e.clientY - cy) / cy // -1 to 1
      setMouseOffset({ x: normX * 8, y: normY * 6 })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [phase])

  // Use grid positions for all non-scatter phases
  const useGridPosition = phase !== "scatter"
  // Only apply the slow staggered forming transition during form/sweep
  const isAnimating = phase === "form" || phase === "sweep"

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {/* Full-hero static dot grid -- pure CSS, identical on server & client */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(240,240,243,0.12) ${DOT_SIZE / 2}px, transparent ${DOT_SIZE / 2}px)`,
          backgroundSize: `${GRID_SPACING}px ${GRID_SPACING}px`,
          backgroundPosition: `${GRID_SPACING / 2}px ${GRID_SPACING / 2}px`,
        }}
      />

      {/* Animated cluster -- rendered ONLY after mount to avoid any hydration mismatch */}
      {mounted && scatteredPositions.length > 0 && (
        <div
          className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:flex items-center justify-center pointer-events-none"
          style={{
            transform: phase === "stable" ? `translate(${mouseOffset.x}px, ${mouseOffset.y}px)` : "none",
            transition: phase === "stable" ? "transform 0.12s ease-out" : "none",
          }}
        >
          <div className="relative w-full h-[60%]">
            {/* Calibration sweep line */}
            {phase === "sweep" && (
              <div
                className="absolute left-0 right-0 h-[1px] animate-sweep-line"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(240,240,243,0.06) 20%, rgba(240,240,243,0.14) 50%, rgba(240,240,243,0.06) 80%, transparent 100%)",
                }}
              />
            )}

            {/* All dots -- plain divs with CSS transitions, no Framer Motion */}
            {scatteredPositions.map((sp, i) => {
              const gp = clusterGridPositions[i]
              const targetX = useGridPosition ? gp.x : sp.x
              const targetY = useGridPosition ? gp.y : sp.y
              const targetOpacity = useGridPosition ? 0.7 : 0.4

              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-foreground pointer-events-none"
                  style={{
                    width: `${DOT_SIZE}px`,
                    height: `${DOT_SIZE}px`,
                    left: `${targetX}%`,
                    top: `${targetY}%`,
                    opacity: targetOpacity,
                    transition: isAnimating
                      ? `left 1s cubic-bezier(0.42,0,0.58,1) ${i * 0.012}s, top 1s cubic-bezier(0.42,0,0.58,1) ${i * 0.012}s, opacity 0.5s ease ${0.8 + i * 0.008}s`
                      : "none",
                  }}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

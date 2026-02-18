"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

// --- FULL-HERO GRID CONFIGURATION ---
const GRID_SPACING = 40 // px between dots
const DOT_SIZE = 3 // px

// Animated cluster (the original right-side dots that form)
const CLUSTER_COLS = 7
const CLUSTER_ROWS = 5
const CLUSTER_TOTAL = CLUSTER_COLS * CLUSTER_ROWS

function generateScattered(): { x: number; y: number }[] {
  const dots: { x: number; y: number }[] = []
  for (let i = 0; i < CLUSTER_TOTAL; i++) {
    dots.push({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
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
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<"scatter" | "form" | "sweep" | "stable">("scatter")

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

  const isForming = phase !== "scatter"

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
          {phase === "sweep" && !prefersReducedMotion && (
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

          {/* Animated dots */}
          {!prefersReducedMotion ? (
            Array.from({ length: CLUSTER_TOTAL }).map((_, i) => {
              const sp = scatteredPositions[i]
              const gp = clusterGridPositions[i]

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-foreground pointer-events-none"
                  style={{ width: DOT_SIZE, height: DOT_SIZE }}
                  initial={{
                    left: `${sp.x}%`,
                    top: `${sp.y}%`,
                    opacity: 0.4,
                  }}
                  animate={
                    isForming
                      ? {
                          left: `${gp.x}%`,
                          top: `${gp.y}%`,
                          opacity: 0.7,
                        }
                      : { opacity: 0.4 }
                  }
                  transition={{
                    left: { duration: 1.0, delay: i * 0.012, ease: [0.42, 0, 0.58, 1] },
                    top: { duration: 1.0, delay: i * 0.012, ease: [0.42, 0, 0.58, 1] },
                    opacity: { duration: 0.5, delay: isForming ? 0.8 + i * 0.008 : 0 },
                  }}
                />
              )
            })
          ) : (
            clusterGridPositions.map((gp, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-foreground"
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  left: `${gp.x}%`,
                  top: `${gp.y}%`,
                  opacity: 0.7,
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

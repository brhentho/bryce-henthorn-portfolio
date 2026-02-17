"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

export function HeroIntroAnimation() {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [phase, setPhase] = useState<"idle" | "scan" | "dots" | "done">("idle")
  const prefersReducedMotion = useReducedMotion()
  const hasRun = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion || hasRun.current) return
    if (typeof window === "undefined") return

    const seen = sessionStorage.getItem("bh_intro_seen")
    if (seen === "true") return

    hasRun.current = true
    setShouldAnimate(true)
    setPhase("scan")

    const scanTimer = setTimeout(() => setPhase("dots"), 600)
    const doneTimer = setTimeout(() => {
      setPhase("done")
      sessionStorage.setItem("bh_intro_seen", "true")
    }, 1200)

    return () => {
      clearTimeout(scanTimer)
      clearTimeout(doneTimer)
    }
  }, [prefersReducedMotion])

  if (!shouldAnimate || prefersReducedMotion) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(237,239,242,0.06) 20%, rgba(237,239,242,0.1) 50%, rgba(237,239,242,0.06) 80%, transparent 100%)",
        }}
        initial={{ top: "0%" }}
        animate={
          phase === "scan" || phase === "dots" || phase === "done"
            ? { top: "100%" }
            : { top: "0%" }
        }
        transition={{ duration: 0.6, ease: "linear" }}
      />

      {/* Dot constellation */}
      <DotConstellation phase={phase} />
    </div>
  )
}

const dotPositions = [
  { x: "15%", y: "30%" },
  { x: "25%", y: "22%" },
  { x: "35%", y: "45%" },
  { x: "18%", y: "55%" },
  { x: "42%", y: "35%" },
  { x: "30%", y: "65%" },
  { x: "48%", y: "50%" },
  { x: "22%", y: "42%" },
  { x: "38%", y: "28%" },
  { x: "12%", y: "48%" },
  { x: "45%", y: "62%" },
  { x: "28%", y: "38%" },
]

const dotTargets = [
  { x: "16%", y: "32%" },
  { x: "24%", y: "24%" },
  { x: "34%", y: "44%" },
  { x: "19%", y: "54%" },
  { x: "41%", y: "36%" },
  { x: "29%", y: "64%" },
  { x: "47%", y: "48%" },
  { x: "23%", y: "40%" },
  { x: "37%", y: "30%" },
  { x: "13%", y: "46%" },
  { x: "44%", y: "60%" },
  { x: "27%", y: "36%" },
]

function DotConstellation({ phase }: { phase: string }) {
  return (
    <>
      {dotPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-foreground"
          style={{ left: pos.x, top: pos.y }}
          initial={{ opacity: 0 }}
          animate={
            phase === "dots"
              ? {
                  opacity: [0, 0.2, 0.2],
                  left: dotTargets[i].x,
                  top: dotTargets[i].y,
                }
              : phase === "done"
                ? { opacity: 0 }
                : { opacity: 0 }
          }
          transition={{
            duration: phase === "done" ? 0.3 : 0.5,
            delay: phase === "dots" ? i * 0.03 : 0,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  )
}

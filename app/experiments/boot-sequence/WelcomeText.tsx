"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
  text: string
  /** ms — when the text begins fading in */
  fadeInAt: number
  /** ms — fade-in duration */
  fadeInDuration: number
  /** ms — when the CRT collapse begins */
  fadeOutAt: number
  /** ms — total collapse duration */
  fadeOutDuration: number
}

// Soft cinematic curve — long settle, almost no overshoot.
const EASE_CINEMA: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function WelcomeText({
  text,
  fadeInAt,
  fadeInDuration,
  fadeOutAt,
  fadeOutDuration,
}: Props) {
  const [show, setShow] = useState(false)
  const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    const inTimer = window.setTimeout(() => setShow(true), fadeInAt)
    const outTimer = window.setTimeout(() => setCollapse(true), fadeOutAt)
    return () => {
      window.clearTimeout(inTimer)
      window.clearTimeout(outTimer)
    }
  }, [fadeInAt, fadeOutAt])

  // CRT-style collapse: scaleY squashes to a horizontal line, the line
  // holds briefly, then scaleX shrinks it to a dot while opacity fades.
  // Keyframes interpret `times` as ratios of the total duration.
  const collapseAnimate = {
    opacity: [1, 1, 1, 0],
    scaleY: [1, 0.02, 0.02, 0],
    scaleX: [1, 1, 1, 0],
  }
  const collapseTransition = {
    duration: fadeOutDuration / 1000,
    times: [0, 0.4, 0.7, 1],
    ease: "linear" as const,
  }

  // Fade-in: subtle scale settle from 1.04 → 1.
  const enterAnimate = {
    opacity: show ? 1 : 0,
    scaleY: show ? 1 : 1.04,
    scaleX: show ? 1 : 1.04,
  }
  const enterTransition = {
    duration: fadeInDuration / 1000,
    ease: EASE_CINEMA,
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scaleY: 1.04, scaleX: 1.04 }}
      animate={collapse ? collapseAnimate : enterAnimate}
      transition={collapse ? collapseTransition : enterTransition}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 65,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(72px, 9vw, 120px)",
        letterSpacing: "0.02em",
        color: "#FFFFFF",
        fontWeight: 500,
        lineHeight: 1,
        // Center origin so top + bottom converge to the middle line.
        transformOrigin: "50% 50%",
      }}
    >
      {text}
    </motion.div>
  )
}

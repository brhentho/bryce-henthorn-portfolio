"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { AuditTrail } from "./AuditTrail"
import { WelcomeText } from "./WelcomeText"

const STORAGE_KEY = "boot-sequence-played"

const AUDIT_LINES = [
  "INITIALIZING REASONING...",
  "MAPPING USER INTENT...",
  "RESOLVING AMBIGUITY...",
  "SYNTHESIZING UI...",
]

// Phase timing (ms) — ~7.0s total. Boot lines stay snappy (700ms each).
// Welcome and the homepage reveal get the extra second so the cinematic
// moments have room to breathe.
const AUDIT_PER_LINE = 700                                    // each line cycle
const AUDIT_END = AUDIT_LINES.length * AUDIT_PER_LINE         // 2800 — last line settled
const AUDIT_FADE_AFTER_LAST = 150                             // breathing gap before fade
const AUDIT_FADE_DURATION = 300
const AUDIT_FADE_END =
  AUDIT_END + AUDIT_FADE_AFTER_LAST + AUDIT_FADE_DURATION     // 3250

const WELCOME_FADE_IN_AT = AUDIT_FADE_END                     // 3250
const WELCOME_FADE_IN_DURATION = 1000                         // cinematic fade-in
const WELCOME_HOLD = 1000                                     // 1s settled hold
const WELCOME_FADE_OUT_AT =
  WELCOME_FADE_IN_AT + WELCOME_FADE_IN_DURATION + WELCOME_HOLD // 5250
const WELCOME_FADE_OUT_DURATION = 300                         // fast CRT collapse
const WELCOME_END = WELCOME_FADE_OUT_AT + WELCOME_FADE_OUT_DURATION // 5550

const BLACK_HOLD = 400
const BACKDROP_FADE_AT = WELCOME_END + BLACK_HOLD             // 5950
const BACKDROP_FADE_DURATION = 1050                           // slow homepage reveal
const EXIT_END = BACKDROP_FADE_AT + BACKDROP_FADE_DURATION    // 7000

const EASE_CALM: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Props = {
  /** When true, ignore the sessionStorage gate (sandbox replay). */
  force?: boolean
  onComplete?: () => void
}

export function BootSequence({ force = false, onComplete }: Props) {
  const reduceMotion = useReducedMotion()
  const [shouldRender, setShouldRender] = useState<boolean | null>(null)
  const [hidden, setHidden] = useState(false)

  // sessionStorage gate runs client-only.
  useEffect(() => {
    if (force) {
      setShouldRender(true)
      return
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setShouldRender(false)
        onComplete?.()
        return
      }
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // sessionStorage may throw in privacy mode — fall through and play.
    }
    setShouldRender(true)
  }, [force, onComplete])

  // Schedule the unmount + onComplete fire.
  useEffect(() => {
    if (shouldRender !== true) return
    const total = reduceMotion ? 800 : EXIT_END
    const timer = window.setTimeout(() => {
      setHidden(true)
      onComplete?.()
    }, total + 50)
    return () => window.clearTimeout(timer)
  }, [shouldRender, reduceMotion, onComplete])

  if (shouldRender !== true || hidden) return null

  if (reduceMotion) {
    return (
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: EASE_CALM }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 55,
          pointerEvents: "none",
          backgroundColor: "#000000",
        }}
      />
    )
  }

  return (
    <>
      {/* Backdrop — covers homepage during phases 1–3, then fades to reveal */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          delay: BACKDROP_FADE_AT / 1000,
          duration: BACKDROP_FADE_DURATION / 1000,
          ease: EASE_CALM,
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 55,
          pointerEvents: "none",
          backgroundColor: "#000000",
        }}
      />

      <AuditTrail
        lines={AUDIT_LINES}
        startDelay={0}
        perLineDuration={AUDIT_PER_LINE}
        fadeOutAt={AUDIT_END + AUDIT_FADE_AFTER_LAST}
        fadeOutDuration={AUDIT_FADE_DURATION}
      />

      <WelcomeText
        text="Welcome"
        fadeInAt={WELCOME_FADE_IN_AT}
        fadeInDuration={WELCOME_FADE_IN_DURATION}
        fadeOutAt={WELCOME_FADE_OUT_AT}
        fadeOutDuration={WELCOME_FADE_OUT_DURATION}
      />
    </>
  )
}

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
  lines: string[]
  /** ms — when the first line appears */
  startDelay: number
  /** ms — interval between line index changes */
  perLineDuration: number
  /** ms — when the whole component begins fading out */
  fadeOutAt: number
  /** ms — duration of the final fade-out */
  fadeOutDuration: number
}

const EASE_CALM: [number, number, number, number] = [0.16, 1, 0.3, 1]
const TRANSITION_DURATION = 0.15 // seconds — slide-up exit
const TYPE_PER_CHAR = 20         // ms — typewriter cadence

// Center-stage rolling text. New lines type in at center, hold briefly,
// then slide up + clip when the next line begins. After the last line
// settles, the whole component fades.
export function AuditTrail({
  lines,
  startDelay,
  perLineDuration,
  fadeOutAt,
  fadeOutDuration,
}: Props) {
  const [activeLine, setActiveLine] = useState<number>(-1)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timers: number[] = []
    lines.forEach((_, i) => {
      timers.push(
        window.setTimeout(
          () => setActiveLine(i),
          startDelay + i * perLineDuration,
        ),
      )
    })
    timers.push(window.setTimeout(() => setFadeOut(true), fadeOutAt))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [lines, startDelay, perLineDuration, fadeOutAt])

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{
        duration: fadeOutDuration / 1000,
        ease: EASE_CALM,
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 65,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
      }}
    >
      {/* Clip mask — fixed-width, fixed-height window. Width is locked
          so short and long lines anchor to the same left edge — no
          horizontal jumping between lines. Height crops the slide-up
          exit. */}
      <div
        style={{
          position: "relative",
          width: "40ch",
          height: "1.4em",
          overflow: "hidden",
          fontSize: 22,
          letterSpacing: "0.06em",
          color: "rgba(255,255,255,0.62)",
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {activeLine >= 0 && !fadeOut && (
            <motion.div
              key={activeLine}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                duration: TRANSITION_DURATION,
                ease: EASE_CALM,
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.6em",
                whiteSpace: "nowrap",
              }}
            >
              <TypewriterLine text={lines[activeLine]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Renders `> {text}` with characters typed in one at a time, with a
// blinking caret that disappears once typing completes.
function TypewriterLine({ text }: { text: string }) {
  const [revealedChars, setRevealedChars] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    for (let i = 0; i < text.length; i++) {
      timers.push(
        window.setTimeout(
          () => setRevealedChars((c) => Math.max(c, i + 1)),
          i * TYPE_PER_CHAR,
        ),
      )
    }
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [text])

  const allRevealed = revealedChars >= text.length

  return (
    <>
      <span style={{ color: "rgba(255,255,255,0.4)" }}>{">"}</span>
      <span>
        {text.slice(0, revealedChars)}
        <BlinkingCaret visible={!allRevealed} />
      </span>
    </>
  )
}

function BlinkingCaret({ visible }: { visible: boolean }) {
  return (
    <motion.span
      animate={visible ? { opacity: [1, 1, 0, 0] } : { opacity: 0 }}
      transition={
        visible
          ? {
              duration: 0.6,
              times: [0, 0.5, 0.5, 1],
              repeat: Infinity,
              ease: "linear",
            }
          : { duration: 0 }
      }
      style={{
        display: "inline-block",
        width: "0.5em",
        marginLeft: "0.05em",
        background: "currentColor",
        height: "1em",
        verticalAlign: "text-bottom",
        visibility: visible ? "visible" : "hidden",
      }}
    />
  )
}

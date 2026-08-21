"use client"

import { motion } from "framer-motion"
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
  placement?: "center" | "lower-left"
}

const TYPE_PER_CHAR = 20 // ms — typewriter cadence

// Rolling status text. Each line types in, swaps cleanly to the next,
// then the whole component fades after the final line settles.
export function AuditTrail({
  lines,
  startDelay,
  perLineDuration,
  fadeOutAt,
  fadeOutDuration,
  placement = "center",
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
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 65,
        pointerEvents: "none",
        display: "flex",
        alignItems: placement === "lower-left" ? "flex-end" : "center",
        justifyContent: placement === "lower-left" ? "flex-start" : "center",
        padding:
          placement === "lower-left"
            ? "0 clamp(24px, 5vw, 80px) 32px"
            : undefined,
        fontFamily: "var(--font-mono)",
        opacity: fadeOut ? 0 : 1,
        transition: `opacity ${fadeOutDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      {/* Status plate — fixed-width, fixed-height window. Width is locked
          so short and long lines anchor to the same left edge — no
          horizontal jumping between lines. Width caps at the viewport
          (with 16px breathing margin on each side) so the mask doesn't
          shrink-flex on narrow screens, which would left-anchor the
          lines visually. Font also scales down on narrow viewports so
          long lines like "INITIALIZING REASONING..." don't crowd the
          right edge. */}
      <div
        style={{
          position: "relative",
          width: "min(40ch, calc(100vw - 32px))",
          height: placement === "lower-left" ? "calc(1.4em + 20px)" : "1.4em",
          overflow: "hidden",
          fontSize: "clamp(16px, 4.5vw, 22px)",
          letterSpacing: "0.06em",
          color: "rgba(255,255,255,0.62)",
          fontWeight: 500,
          lineHeight: 1.4,
          background:
            placement === "lower-left" ? "rgba(15,15,16,0.92)" : undefined,
          border:
            placement === "lower-left"
              ? "1px solid rgba(63,63,66,0.8)"
              : undefined,
        }}
      >
        {activeLine >= 0 && !fadeOut && (
          <div
            key={activeLine}
            style={{
              position: "absolute",
              inset: placement === "lower-left" ? "10px 12px" : 0,
              display: "flex",
              alignItems: "center",
              gap: "0.6em",
              whiteSpace: "nowrap",
            }}
          >
            <TypewriterLine text={lines[activeLine]} />
          </div>
        )}
      </div>
    </div>
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

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface EmojiReactionProps {
  emoji: string
  /** Position offset from the avatar center */
  x: number
  y: number
  onComplete: () => void
}

export function EmojiReaction({ emoji, x, y, onComplete }: EmojiReactionProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter")

  useEffect(() => {
    // Enter → hold after spring animation
    const holdTimer = setTimeout(() => setPhase("hold"), 350)
    // Hold → exit
    const exitTimer = setTimeout(() => setPhase("exit"), 1850)
    // Remove after exit animation
    const removeTimer = setTimeout(onComplete, 2350)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [onComplete])

  const scale = phase === "enter" ? "scale(1.1)" : phase === "hold" ? "scale(1)" : "scale(0.8)"
  const opacity = phase === "exit" ? 0 : 1

  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: x,
        top: y - 28,
        transform: `translate(-50%, -100%) ${scale}`,
        opacity,
        transition:
          phase === "enter"
            ? "transform 350ms var(--ease-spring), opacity 200ms var(--ease-smooth)"
            : "transform 500ms var(--ease-smooth), opacity 500ms var(--ease-smooth)",
      }}
    >
      <Image
        src={emoji}
        alt=""
        width={28}
        height={28}
        className="drop-shadow-md"
      />
    </div>
  )
}

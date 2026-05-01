"use client"

import { useEffect, useState, useRef } from "react"

const MESSAGES = [
  "Should I proceed?",
  "Draft ready for review",
  "Waiting on approval",
  "Task complete \u2014 3 files updated",
  "Need clarification on scope",
]

interface ChatBubbleProps {
  /** Pixel offset from center where the bubble should appear */
  position: { x: number; y: number }
  onDismiss: () => void
}

export function ChatBubble({ position, onDismiss }: ChatBubbleProps) {
  const [visible, setVisible] = useState(false)
  const [message] = useState(
    () => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
  )
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Slide in
    requestAnimationFrame(() => setVisible(true))

    // Hold 3s, then fade out
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 500)
    }, 3000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [onDismiss])

  return (
    <div
      className="absolute pointer-events-none z-[1000]"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        transform: `translateX(-50%) translateY(${visible ? "-100%" : "-80%"})`,
        opacity: visible ? 1 : 0,
        transition: "all 500ms var(--ease-decel)",
      }}
    >
      <div
        className="relative px-3 py-2 rounded-lg text-[12px] text-[#1C1C21] whitespace-nowrap"
        style={{
          background: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {message}
        {/* Tail */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full"
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "6px solid white",
          }}
        />
      </div>
    </div>
  )
}

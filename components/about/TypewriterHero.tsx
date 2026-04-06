"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useReducedMotion } from "@/components/motion/useReducedMotion"

interface TypewriterHeroProps {
  lines: { text: string; accent?: boolean }[]
}

export function TypewriterHero({ lines }: TypewriterHeroProps) {
  const reduced = useReducedMotion()
  const [charCount, setCharCount] = useState(0)
  const [complete, setComplete] = useState(false)
  const [started, setStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Full text as a single string with line breaks
  const fullText = lines.map((l) => l.text).join("\n")
  const totalChars = fullText.length

  // Build a map of character index → which line it belongs to
  const charToLine = useRef<number[]>([])
  useEffect(() => {
    const map: number[] = []
    let idx = 0
    for (let l = 0; l < lines.length; l++) {
      for (let c = 0; c < lines[l].text.length; c++) {
        map[idx++] = l
      }
      if (l < lines.length - 1) map[idx++] = l // newline char
    }
    charToLine.current = map
  }, [lines])

  // Intersection observer to trigger once
  useEffect(() => {
    if (reduced) {
      setStarted(true)
      setCharCount(totalChars)
      setComplete(true)
      return
    }

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced, totalChars])

  // Type characters with variable speed
  const typeNext = useCallback(() => {
    setCharCount((prev) => {
      const next = prev + 1
      if (next >= totalChars) {
        setComplete(true)
        return totalChars
      }

      const char = fullText[next]
      let delay = 30
      if (char === ",") delay = 200
      else if (char === ".") delay = 400
      else if (char === "\n") delay = 100

      timerRef.current = setTimeout(typeNext, delay)
      return next
    })
  }, [fullText, totalChars])

  useEffect(() => {
    if (!started || reduced) return
    timerRef.current = setTimeout(typeNext, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [started, reduced, typeNext])

  // Render the revealed text with proper line/accent handling
  const revealed = fullText.slice(0, charCount)
  const revealedLines = revealed.split("\n")

  return (
    <div ref={containerRef}>
      <h1 className="font-heading text-2xl md:text-3xl lg:text-[2.5rem] font-bold leading-[1.4] tracking-tight text-foreground">
        {lines.map((line, lineIdx) => {
          const lineText = revealedLines[lineIdx] ?? ""
          const isCurrentLine = lineIdx === revealedLines.length - 1
          const showCursor = isCurrentLine && !complete && started && !reduced

          const content = (
            <span key={lineIdx}>
              {line.accent ? (
                <span className="text-accent">{lineText}</span>
              ) : (
                lineText
              )}
              {showCursor && (
                <span
                  className="inline-block w-[2px] h-[1em] align-middle ml-[1px]"
                  style={{
                    backgroundColor: "#5B9BF5",
                    animation: complete
                      ? "none"
                      : "cursor-blink 1.06s step-end infinite",
                    opacity: complete ? 0 : 1,
                    transition: "opacity 1s var(--ease-smooth)",
                  }}
                />
              )}
              {lineIdx < lines.length - 1 && <br />}
            </span>
          )

          return content
        })}
        {/* Cursor after completion — fade out */}
        {complete && !reduced && (
          <span
            className="inline-block w-[2px] h-[1em] align-middle ml-[1px]"
            style={{
              backgroundColor: "#5B9BF5",
              animation: "cursor-blink 1.06s step-end infinite",
              opacity: 0,
              transition: "opacity 1s var(--ease-smooth)",
            }}
          />
        )}
      </h1>

    </div>
  )
}

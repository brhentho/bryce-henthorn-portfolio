"use client"

import type { CSSProperties, ReactNode } from "react"

type Line = {
  text: string
  className?: string
  style?: CSSProperties
  as?: "h1" | "p" | "h2"
}

type Props = {
  eyebrow?: string
  eyebrowClassName?: string
  eyebrowStyle?: CSSProperties
  lines: Line[]
  /** Initial pause before the eyebrow starts typing, in ms. */
  startDelay?: number
  /** ms per character on the eyebrow. */
  charStep?: number
  /** ms per word on the body lines. */
  wordStep?: number
  /** ms gap between the eyebrow finishing and the lines starting. */
  eyebrowGap?: number
  /** Optional className applied to a wrapping div around the body lines. */
  linesWrapperClassName?: string
  /** Optional appended slot rendered after the animated lines settle. */
  trailing?: ReactNode
}

/**
 * Operator-manual hero intro: monospace eyebrow types in char-by-char with a
 * blinking caret, then each line reveals word-by-word with a fade-up-blur.
 */
export function HeroIntro({
  eyebrow,
  eyebrowClassName = "t-mono-label",
  eyebrowStyle,
  lines,
  startDelay = 80,
  charStep = 26,
  wordStep = 32,
  eyebrowGap = 220,
  linesWrapperClassName,
}: Props) {
  const eyebrowDuration = eyebrow ? eyebrow.length * charStep : 0
  const linesStart = startDelay + eyebrowDuration + eyebrowGap

  let runningWord = 0
  const renderedLines = lines.map((line, idx) => {
    const Tag = line.as ?? (idx === 0 ? "h1" : "p")
    const parts = line.text.split(/(\s+)/)
    return (
      <Tag key={idx} className={line.className} style={line.style}>
        {parts.map((part, i) => {
          if (/^\s+$/.test(part)) return part
          const delay = linesStart + runningWord * wordStep
          runningWord += 1
          return (
            <span
              key={i}
              className="hero-intro-word"
              style={{ animationDelay: `${delay}ms` }}
            >
              {part}
            </span>
          )
        })}
      </Tag>
    )
  })

  const totalLinesDuration = runningWord * wordStep + 600
  const caretLifetime = eyebrowDuration + eyebrowGap + totalLinesDuration
  const blinkCount = Math.max(2, Math.ceil(caretLifetime / 720))

  return (
    <>
      {eyebrow && (
        <p
          className={`hero-intro-eyebrow ${eyebrowClassName}`}
          style={eyebrowStyle}
        >
          {[...eyebrow].map((ch, i) => (
            <span
              key={i}
              className="hero-intro-char"
              style={{ animationDelay: `${startDelay + i * charStep}ms` }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
          <span
            className="hero-intro-caret"
            aria-hidden="true"
            style={{
              animationDelay: `${startDelay}ms`,
              animationIterationCount: blinkCount,
            }}
          />
        </p>
      )}
      {linesWrapperClassName ? (
        <div className={linesWrapperClassName}>{renderedLines}</div>
      ) : (
        renderedLines
      )}
    </>
  )
}

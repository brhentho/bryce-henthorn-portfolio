"use client"

import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Line = {
  text: string
  className?: string
  style?: CSSProperties
  as?: "h1" | "p" | "h2"
  emphasizeWords?: string[]
  emphasisClassName?: string
}

type Props = {
  eyebrow?: string
  eyebrowClassName?: string
  eyebrowStyle?: CSSProperties
  lines: Line[]
  /** Initial pause before the text starts resolving, in ms. */
  startDelay?: number
  /** ms per word on the body lines. */
  wordStep?: number
  /** Optional className applied to a wrapping div around the body lines. */
  linesWrapperClassName?: string
  /** Optional appended slot rendered after the animated lines settle. */
  trailing?: ReactNode
  /**
   * If true, render the eyebrow + lines statically.
   */
  static?: boolean
}

type HeroMotionStyle = CSSProperties & {
  "--hero-enter-delay": string
  "--hero-exit-delay": string
}

const normalizeEmphasisWord = (word: string) =>
  word.toLocaleLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")

/**
 * Editorial hero intro: stable language resolves word-by-word from left to
 * right. No random glyphs, typewriter simulation, or cursor theater.
 *
 * Pass `static` to render plain markup without the resolve animation.
 */
export function HeroIntro({
  eyebrow,
  eyebrowClassName = "t-mono-label",
  eyebrowStyle,
  lines,
  startDelay = 80,
  wordStep = 32,
  linesWrapperClassName,
  static: isStatic = false,
}: Props) {
  const renderStaticText = (line: Line) => {
    if (!line.emphasizeWords?.length) return line.text

    const emphasized = new Set(
      line.emphasizeWords.map(normalizeEmphasisWord),
    )

    return line.text.split(/(\s+)/).map((part, index) => {
      if (/^\s+$/.test(part)) return part
      const className = emphasized.has(normalizeEmphasisWord(part))
        ? line.emphasisClassName
        : undefined

      return className ? (
        <span key={index} className={className}>
          {part}
        </span>
      ) : (
        part
      )
    })
  }

  if (isStatic) {
    const renderedLines = lines.map((line, idx) => {
      const Tag = line.as ?? (idx === 0 ? "h1" : "p")
      const balance = Tag === "h1" || Tag === "h2" ? "text-balance" : ""
      return (
        <Tag key={idx} className={cn(balance, line.className)} style={line.style}>
          {renderStaticText(line)}
        </Tag>
      )
    })
    return (
      <>
        {eyebrow && (
          <p className={eyebrowClassName} style={eyebrowStyle}>
            {eyebrow}
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

  const linesStart = startDelay + (eyebrow ? 220 : 0)
  const wordCount = lines.reduce(
    (count, line) =>
      count + line.text.split(/(\s+)/).filter((part) => !/^\s+$/.test(part)).length,
    0,
  )

  let runningWord = 0
  const renderedLines = lines.map((line, idx) => {
    const Tag = line.as ?? (idx === 0 ? "h1" : "p")
    const balance = Tag === "h1" || Tag === "h2" ? "text-balance" : ""
    const parts = line.text.split(/(\s+)/)
    const emphasized = new Set(
      line.emphasizeWords?.map(normalizeEmphasisWord) ?? [],
    )
    return (
      <Tag key={idx} className={cn(balance, line.className)} style={line.style}>
        {parts.map((part, i) => {
          if (/^\s+$/.test(part)) return part
          const wordIndex = runningWord
          const enterDelay = linesStart + wordIndex * wordStep
          const exitDelay = (wordCount - wordIndex - 1) * 10
          runningWord += 1
          return (
            <span
              key={i}
              className={cn(
                "hero-intro-word",
                emphasized.has(normalizeEmphasisWord(part)) &&
                  line.emphasisClassName,
              )}
              style={
                {
                  "--hero-enter-delay": `${enterDelay}ms`,
                  "--hero-exit-delay": `${exitDelay}ms`,
                } as HeroMotionStyle
              }
            >
              {part}
            </span>
          )
        })}
      </Tag>
    )
  })

  return (
    <>
      {eyebrow && (
        <p
          className={`hero-intro-eyebrow ${eyebrowClassName}`}
          style={eyebrowStyle}
        >
          <span
            className="hero-intro-eyebrow-text"
            style={
              {
                "--hero-enter-delay": `${startDelay}ms`,
                "--hero-exit-delay": `${wordCount * 10}ms`,
              } as HeroMotionStyle
            }
          >
            {eyebrow}
          </span>
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

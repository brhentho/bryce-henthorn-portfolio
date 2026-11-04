"use client"

import { useEffect, useState, type CSSProperties, type ElementType } from "react"

/**
 * Stable title words resolving left-to-right behind the shared hero clip.
 * Delay derives from `--stagger-word`; duration and easing come from the
 * production `.hero-intro-word` rule. Never scrambles glyphs.
 */
export function XrTitle({ text, as: Tag = "h1", className, id }: {
  text: string
  as?: ElementType
  className?: string
  id?: string
}) {
  const words = text.split(" ")
  return (
    <Tag className={className} id={id}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="hero-intro-word xr-word" style={{ "--xr-word": i } as CSSProperties}>{word}</span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  )
}

/** Reads a motion token from `:root` so WAAPI/framer use the same values as CSS. */
export function motionToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function motionMs(name: string) {
  const raw = motionToken(name)
  const value = parseFloat(raw)
  if (Number.isNaN(value)) return 0
  return raw.endsWith("ms") ? value : value * 1000
}

export function useMotionSeconds(name: string) {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => { setSeconds(motionMs(name) / 1000) }, [name])
  return seconds
}

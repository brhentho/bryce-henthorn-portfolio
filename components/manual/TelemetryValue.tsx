"use client"

import { useEffect, useRef, useState } from "react"

const NUMERIC_RE = /^([0-9]+(?:\.[0-9]+)?)(.*)$/

function parseTarget(
  input: string,
): { num: number; suffix: string; decimals: number } | null {
  const m = NUMERIC_RE.exec(input.trim())
  if (!m) return null
  const num = parseFloat(m[1])
  if (Number.isNaN(num)) return null
  const decimals = m[1].includes(".") ? m[1].split(".")[1].length : 0
  return { num, suffix: m[2], decimals }
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

type Props = {
  target: string
  duration?: number
}

/**
 * Renders a numeric Telemetry value that ticks up from 0 → target on first
 * viewport entry. SSR renders the parsed target so first paint is correct;
 * on client mount, IntersectionObserver triggers a 1200ms ease-out count-up.
 *
 * Non-numeric targets ("Q", "[TK]") render statically with no animation.
 * Honors prefers-reduced-motion.
 */
export function TelemetryValue({ target, duration = 1200 }: Props) {
  const parsed = parseTarget(target)
  const [display, setDisplay] = useState<string>(target)
  const ref = useRef<HTMLSpanElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!parsed || !ref.current) return
    if (animatedRef.current) return

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Skip animation; keep target value as-rendered.
      return
    }

    const node = ref.current
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          observer.unobserve(node)

          const startTime = performance.now()
          let raf = 0
          const tick = (now: number) => {
            const elapsed = now - startTime
            const t = Math.min(1, elapsed / duration)
            const eased = easeOut(t)
            const current = parsed.num * eased
            setDisplay(current.toFixed(parsed.decimals) + parsed.suffix)
            if (t < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [parsed, duration])

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  )
}

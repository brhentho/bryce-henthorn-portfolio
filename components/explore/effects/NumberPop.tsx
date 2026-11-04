"use client"

import { useEffect, useRef } from "react"
import { useEnhanced } from "../Treatment"
import { sharedDigitPrefix } from "@/lib/explore/response-tokens"

// Adapted from transitions.dev Number pop-in; license in vendor/transitions-LICENSE.txt.
export function NumberPop({ value, label }: { value: string; label?: string }) {
  const previous = useRef("")
  const enhanced = useEnhanced()
  const unchanged = sharedDigitPrefix(previous.current, value)
  useEffect(() => { previous.current = value }, [value])
  if (!enhanced) return <>{value}</>
  return (
    <span className="t-digit-group">
      <span className="sr-only">{label ?? value}</span>
      <span aria-hidden="true">
        {Array.from(value).map((digit, index) => (
          <span key={`${index}-${digit}`} className="t-digit" data-same={index < unchanged || undefined}
            style={{ animationDelay: `calc(${Math.min(index, 2)} * var(--stagger-word))` }}>{digit}</span>
        ))}
      </span>
    </span>
  )
}

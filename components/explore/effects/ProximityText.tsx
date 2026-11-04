"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "../useReducedMotion"

export function ProximityText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const root = ref.current
    if (!root || reduce) return
    let frame = 0
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-glyph]"))
    const reset = () => {
      cancelAnimationFrame(frame)
      letters.forEach(letter => { letter.style.fontVariationSettings = "'wght' 500"; letter.style.width = "" })
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const bounds = letters.map(letter => letter.getBoundingClientRect())
        bounds.forEach((rect, index) => {
          const distance = Math.hypot(event.clientX - rect.x - rect.width / 2, event.clientY - rect.y - rect.height / 2)
          const strength = Math.max(0, 1 - distance / 140)
          letters[index].style.width = `${rect.width}px`
          letters[index].style.fontVariationSettings = `'wght' ${500 + Math.round(strength * 200)}`
        })
      })
    }
    root.addEventListener("pointermove", move)
    root.addEventListener("pointerleave", reset)
    window.addEventListener("resize", reset)
    return () => { reset(); root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", reset); window.removeEventListener("resize", reset) }
  }, [text, reduce])
  return <span ref={ref} className="xp-proximity">
    <span className="sr-only">{text}</span>
    {text.split(" ").map((word, index) => <span key={index} aria-hidden="true" className="xp-proximity-word">
      {Array.from(word).map((letter, i) => <span data-glyph key={i}>{letter}</span>)}{index < text.split(" ").length - 1 ? "\u00a0" : ""}
    </span>)}
  </span>
}

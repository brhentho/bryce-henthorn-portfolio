"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/components/motion/useReducedMotion"

const DOT_SPACING = 40
const DOT_SIZE = 2.5
const BASE_OPACITY = 0.12
const PULSE_PEAK_OPACITY = 0.45
const PULSE_DURATION = 4000 // ms per pulse cycle
const PULSE_RING_WIDTH = 180 // px width of the pulse ring

export function PulseGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 2
    let w = 0
    let h = 0
    let cx = 0
    let cy = 0
    let maxDist = 0

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      w = rect?.width ?? window.innerWidth
      h = rect?.height ?? window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = w / 2
      cy = h / 2
      maxDist = Math.sqrt(cx * cx + cy * cy)
    }

    resize()
    window.addEventListener("resize", resize)

    if (reduced) {
      // Static grid, no pulse
      ctx.clearRect(0, 0, w, h)
      for (let x = DOT_SPACING / 2; x < w; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < h; y += DOT_SPACING) {
          ctx.fillStyle = `rgba(240, 240, 243, ${BASE_OPACITY})`
          ctx.beginPath()
          ctx.arc(x, y, DOT_SIZE / 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      return () => window.removeEventListener("resize", resize)
    }

    const startTime = performance.now()

    const draw = (ts: number) => {
      const elapsed = ts - startTime
      const t = (elapsed % PULSE_DURATION) / PULSE_DURATION

      // Pulse ring contracts from maxDist to 0
      const pulseRadius = maxDist * (1 - t)

      ctx.clearRect(0, 0, w, h)

      for (let x = DOT_SPACING / 2; x < w; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < h; y += DOT_SPACING) {
          const dx = x - cx
          const dy = y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Distance from dot to pulse ring
          const ringDist = Math.abs(dist - pulseRadius)
          const inRing = ringDist < PULSE_RING_WIDTH / 2

          // Fade ring out as it approaches center to avoid bright flash
          const ringStrength = Math.min(1, pulseRadius / (maxDist * 0.15))

          let opacity = BASE_OPACITY
          if (inRing) {
            const ringFactor = 1 - ringDist / (PULSE_RING_WIDTH / 2)
            opacity = BASE_OPACITY + (PULSE_PEAK_OPACITY - BASE_OPACITY) * ringFactor * ringStrength
          }

          ctx.fillStyle = `rgba(240, 240, 243, ${opacity})`
          ctx.beginPath()
          ctx.arc(x, y, DOT_SIZE / 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

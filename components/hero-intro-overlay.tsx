"use client"

import { useEffect, useRef, useState } from "react"

const GRID_SPACING = 40
const GRID_OFFSET  = 20
const DOT_RADIUS   = 1.5
const INTRO_DOT_COUNT = 150
const FORM_DURATION   = 1500
const SCATTER_DELAY   = 400
const WIPE_DURATION   = 400
const WIPE_DELAY      = SCATTER_DELAY + FORM_DURATION

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function buildGridPositions(w: number, h: number) {
  const pts: { x: number; y: number }[] = []
  const cols = Math.ceil(w / GRID_SPACING) + 1
  const rows = Math.ceil(h / GRID_SPACING) + 1
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      pts.push({ x: GRID_OFFSET + c * GRID_SPACING, y: GRID_OFFSET + r * GRID_SPACING })
  return pts
}

interface HeroIntroOverlayProps {
  onComplete: () => void
}

export function HeroIntroOverlay({ onComplete }: HeroIntroOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [clipProgress, setClipProgress] = useState(0)
  const [phase, setPhase] = useState<"scatter" | "form" | "wipe" | "done">("scatter")

  // Fix 1: Use a ref to decouple onComplete from the effect's dependency array
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  // Canvas animation (scatter → form)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const w = window.innerWidth
    const h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = w * dpr
    canvas.height = h * dpr
    canvas.style.width  = w + 'px'
    canvas.style.height = h + 'px'

    // Fix 2: Non-null assertion replaced with early return guard
    const ctxOrNull = canvas.getContext("2d")
    if (!ctxOrNull) return
    const ctx: CanvasRenderingContext2D = ctxOrNull
    ctx.scale(dpr, dpr)

    const allGrid = buildGridPositions(w, h)
    const shuffled = [...allGrid].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, INTRO_DOT_COUNT)

    const dots = selected.map(target => ({
      startX: Math.random() * w,
      startY: Math.random() * h,
      targetX: target.x,
      targetY: target.y,
      delay: Math.random() * 200,
    }))

    let formStartTime: number | null = null
    // Fix 3: Initialize rafId to 0
    let rafId: number = 0
    // Fix 4: Track whether the animation is complete to stop the rAF loop
    let animationComplete = false

    function draw(ts: number) {
      if (animationComplete) return
      ctx.clearRect(0, 0, w, h)

      if (formStartTime === null) {
        dots.forEach(d => {
          ctx.beginPath()
          ctx.arc(d.startX, d.startY, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(240,240,243,0.35)"
          ctx.fill()
        })
      } else {
        dots.forEach(d => {
          const elapsed = Math.max(0, ts - formStartTime! - d.delay)
          const t = Math.min(elapsed / FORM_DURATION, 1)
          const e = easeInOutCubic(t)
          const x = d.startX + (d.targetX - d.startX) * e
          const y = d.startY + (d.targetY - d.startY) * e
          const opacity = 0.35 + e * 0.35
          ctx.beginPath()
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(240,240,243,${opacity})`
          ctx.fill()
        })

        // Fix 4: Stop rescheduling once all dots have finished animating
        const elapsed = ts - formStartTime! - 200  // account for max stagger delay
        if (elapsed > FORM_DURATION) {
          animationComplete = true
          return
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    const t1 = setTimeout(() => { formStartTime = performance.now(); setPhase("form") }, SCATTER_DELAY)
    const t2 = setTimeout(() => { setPhase("wipe") }, WIPE_DELAY)
    // Fix 1: Use onCompleteRef.current instead of onComplete directly
    const t3 = setTimeout(() => { setPhase("done"); onCompleteRef.current() }, WIPE_DELAY + WIPE_DURATION + 50)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  // Fix 1: Dependency array is now [] — onComplete is accessed via ref
  }, [])

  // Animate clip progress during wipe phase
  useEffect(() => {
    if (phase !== "wipe") return
    const start = performance.now()
    // Fix 3: Initialize rafId to 0
    let rafId: number = 0

    function step(ts: number) {
      const t = Math.min((ts - start) / WIPE_DURATION, 1)
      setClipProgress(easeInOutCubic(t))
      if (t < 1) rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [phase])

  if (phase === "done") return null

  const clipTop = `${clipProgress * 100}%`

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#0B0B0D",
        clipPath: `inset(${clipTop} 0 0 0)`,
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  )
}

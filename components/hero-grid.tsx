"use client"

import { useEffect, useRef } from "react"

const GRID_SPACING = 40
const GRID_OFFSET  = 20
const DOT_RADIUS   = 1.5
const REPEL_RADIUS = 80
const REPEL_MAX_PX = 12
const BASE_OPACITY = 0.12
const REPEL_OPACITY_BOOST = 0.22
const SPRING = 0.12

interface Dot {
  baseX: number
  baseY: number
  x: number
  y: number
  opacity: number
}

function buildGridDots(w: number, h: number): Dot[] {
  const dots: Dot[] = []
  const cols = Math.ceil(w / GRID_SPACING) + 1
  const rows = Math.ceil(h / GRID_SPACING) + 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const bx = GRID_OFFSET + c * GRID_SPACING
      const by = GRID_OFFSET + r * GRID_SPACING
      dots.push({ baseX: bx, baseY: by, x: bx, y: by, opacity: BASE_OPACITY })
    }
  }
  return dots
}

interface HeroGridProps {
  visible: boolean  // when true, CSS opacity transitions to 1
}

export function HeroGrid({ visible }: HeroGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas  = canvasRef.current
    if (!wrapper || !canvas) return

    // Fix 3: dpr is read inside initCanvas so resize recaptures current ratio
    function initCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = wrapper!.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      // Fix 4: guard against zero-dimension canvas
      if (w === 0 || h === 0) return null
      canvas!.width  = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width  = w + 'px'
      canvas!.style.height = h + 'px'
      const ctx = canvas!.getContext("2d")
      if (!ctx) return null
      ctx.scale(dpr, dpr)
      return { ctx, w, h }
    }

    const init = initCanvas()
    if (!init) return

    let { ctx, w, h } = init
    let dots = buildGridDots(w, h)
    let mouseX = -999
    let mouseY = -999
    let rafId: number = 0

    // Fix 2: use globalAlpha instead of rgba string, and squared-distance check
    function draw() {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "rgb(240,240,243)"  // set once outside the loop

      const repelRadiusSq = REPEL_RADIUS * REPEL_RADIUS

      for (const d of dots) {
        const dx = mouseX - d.baseX
        const dy = mouseY - d.baseY
        const distSq = dx * dx + dy * dy

        let targetX = d.baseX
        let targetY = d.baseY
        let targetOpacity = BASE_OPACITY

        if (distSq < repelRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq)  // only sqrt when within range
          const force = 1 - dist / REPEL_RADIUS
          const angle = Math.atan2(dy, dx)
          targetX = d.baseX - Math.cos(angle) * force * REPEL_MAX_PX
          targetY = d.baseY - Math.sin(angle) * force * REPEL_MAX_PX
          targetOpacity = BASE_OPACITY + force * REPEL_OPACITY_BOOST
        }

        d.x += (targetX - d.x) * SPRING
        d.y += (targetY - d.y) * SPRING
        d.opacity += (targetOpacity - d.opacity) * SPRING

        ctx.globalAlpha = d.opacity  // use globalAlpha instead of rgba string
        ctx.beginPath()
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1  // reset after loop

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    // Fix 1: cache bounding rect; use window-level mousemove with bounds check
    let cachedRect = wrapper.getBoundingClientRect()

    function onMouseMove(e: MouseEvent) {
      const x = e.clientX - cachedRect.left
      const y = e.clientY - cachedRect.top
      if (x >= 0 && x <= cachedRect.width && y >= 0 && y <= cachedRect.height) {
        mouseX = x
        mouseY = y
      } else {
        mouseX = -999
        mouseY = -999
      }
    }

    // Fix 1 + Fix 3: onResize updates cachedRect and re-reads dpr via initCanvas
    function onResize() {
      cancelAnimationFrame(rafId)
      cachedRect = wrapper!.getBoundingClientRect()  // update cached rect
      const reinit = initCanvas()
      if (!reinit) return
      ctx = reinit.ctx
      w = reinit.w
      h = reinit.h
      dots = buildGridDots(w, h)
      rafId = requestAnimationFrame(draw)
    }

    // Fix 1: attach mousemove to window instead of the pointer-events:none wrapper
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  )
}

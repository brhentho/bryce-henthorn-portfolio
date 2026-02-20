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

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function initCanvas() {
      const rect = wrapper!.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      canvas!.width  = w * dpr
      canvas!.height = h * dpr
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

    function draw() {
      ctx.clearRect(0, 0, w, h)

      for (const d of dots) {
        const dx = mouseX - d.baseX
        const dy = mouseY - d.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetX = d.baseX
        let targetY = d.baseY
        let targetOpacity = BASE_OPACITY

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = 1 - dist / REPEL_RADIUS
          const angle = Math.atan2(dy, dx)
          targetX = d.baseX - Math.cos(angle) * force * REPEL_MAX_PX
          targetY = d.baseY - Math.sin(angle) * force * REPEL_MAX_PX
          targetOpacity = BASE_OPACITY + force * REPEL_OPACITY_BOOST
        }

        d.x += (targetX - d.x) * SPRING
        d.y += (targetY - d.y) * SPRING
        d.opacity += (targetOpacity - d.opacity) * SPRING

        ctx.beginPath()
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240,240,243,${d.opacity.toFixed(3)})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    function onMouseMove(e: MouseEvent) {
      const r = wrapper!.getBoundingClientRect()
      mouseX = e.clientX - r.left
      mouseY = e.clientY - r.top
    }

    function onMouseLeave() {
      mouseX = -999
      mouseY = -999
    }

    function onResize() {
      const reinit = initCanvas()
      if (!reinit) return
      ctx = reinit.ctx
      w = reinit.w
      h = reinit.h
      dots = buildGridDots(w, h)
    }

    wrapper.addEventListener("mousemove", onMouseMove)
    wrapper.addEventListener("mouseleave", onMouseLeave)
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      wrapper.removeEventListener("mousemove", onMouseMove)
      wrapper.removeEventListener("mouseleave", onMouseLeave)
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

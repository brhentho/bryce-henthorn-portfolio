"use client"

import { useEffect, useRef } from "react"

const TAU = Math.PI * 2

const C: Record<string, string> = {
  intake: "#5B9BF5",
  process: "#5B9BF5",
  synthesize: "#5B9BF5",
  output: "#5B9BF5",
  attention: "#FFB800",
  failed: "#FF3B30",
  complete: "#34C759",
}

function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}

function getDots(id: string, t: number) {
  const spin = t * TAU * 0.35
  switch (id) {
    case "intake": {
      const breathe = Math.sin(t * TAU) * 0.5 + 0.5
      const ease = easeInOutQuart(breathe)
      const spread = 0.12 + 0.38 * (1 - ease)
      return [0, 1, 2].map((i) => {
        const a = i * (TAU / 3) + spin
        return {
          x: Math.cos(a) * spread,
          y: Math.sin(a) * spread,
          size: 0.65 + 0.4 * ease,
        }
      })
    }
    case "process": {
      const breathe = Math.sin(t * TAU) * 0.5 + 0.5
      const ease = easeInOutQuart(breathe)
      const spread = ease * 0.42
      return [0, 1, 2].map((i) => {
        const xTarget = (i - 1) * spread
        const yWobble = Math.sin(spin + i * (TAU / 3)) * 0.04 * ease
        return {
          x: xTarget,
          y: yWobble,
          size: 0.6 + 0.35 * (1 - ease * 0.4),
        }
      })
    }
    case "synthesize": {
      return [0, 1, 2].map((i) => {
        const phase = t * TAU - i * 0.9
        const bob = Math.sin(phase) * 0.28
        const xPos = (i - 1) * 0.38
        const atPeak = Math.max(0, Math.sin(phase))
        return { x: xPos, y: bob, size: 0.65 + 0.25 * atPeak }
      })
    }
    case "output": {
      return [0, 1, 2].map((i) => {
        const phase = (t * 1.3 - i * 0.18) % 1
        const rise = phase < 0.35 ? easeInOutQuart(phase / 0.35) : 0
        const fall =
          phase >= 0.35 && phase < 0.8
            ? 1 - easeInOutQuart((phase - 0.35) / 0.45)
            : 0
        const pulse = Math.max(0, rise + fall)
        return { x: (i - 1) * 0.4, y: 0, size: 0.35 + 0.7 * pulse }
      })
    }
    default:
      return []
  }
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  id: string,
  color: string,
  ctr: number,
  renderPx: number
) {
  const s = renderPx * 0.35
  ctx.fillStyle = color
  if (id === "attention") {
    ctx.beginPath()
    ctx.moveTo(ctr, ctr - s * 0.9)
    ctx.lineTo(ctr + s * 0.85, ctr + s * 0.6)
    ctx.lineTo(ctr - s * 0.85, ctr + s * 0.6)
    ctx.closePath()
    ctx.fill()
  } else if (id === "failed") {
    ctx.beginPath()
    ctx.moveTo(ctr, ctr - s)
    ctx.lineTo(ctr + s * 0.75, ctr)
    ctx.lineTo(ctr, ctr + s)
    ctx.lineTo(ctr - s * 0.75, ctr)
    ctx.closePath()
    ctx.fill()
  } else if (id === "complete") {
    ctx.beginPath()
    ctx.arc(ctr, ctr, s * 0.55, 0, TAU)
    ctx.fill()
  }
}

// ─── BITMAP PATTERNS ───
const _ = 0.08
const P: Record<string, number[][][]> = {
  intake: [
    [[1, _, 1], [_, _, _], [1, _, 1]],
    [[0.5, 0.3, 0.5], [0.3, _, 0.3], [0.5, 0.3, 0.5]],
    [[0.2, 0.6, 0.2], [0.6, 1, 0.6], [0.2, 0.6, 0.2]],
    [[_, _, _], [_, 1, _], [_, _, _]],
    [[0.2, 0.6, 0.2], [0.6, 1, 0.6], [0.2, 0.6, 0.2]],
    [[0.5, 0.3, 0.5], [0.3, _, 0.3], [0.5, 0.3, 0.5]],
  ],
  process: [
    [[_, _, _], [_, 1, _], [_, _, _]],
    [[_, _, _], [0.5, 1, 0.5], [_, _, _]],
    [[_, _, _], [1, 0.5, 1], [_, _, _]],
    [[_, _, _], [1, _, 1], [_, _, _]],
    [[_, _, _], [1, 0.5, 1], [_, _, _]],
    [[_, _, _], [0.5, 1, 0.5], [_, _, _]],
  ],
  synthesize: [
    [[1, _, _], [_, _, 1], [_, 1, _]],
    [[_, 1, _], [1, _, _], [_, _, 1]],
    [[_, _, 1], [_, 1, _], [1, _, _]],
    [[1, _, _], [_, _, 1], [_, 1, _]],
  ],
  output: [
    [[_, _, _], [1, _, _], [_, _, _]],
    [[_, _, _], [0.3, 1, _], [_, _, _]],
    [[_, _, _], [_, 0.3, 1], [_, _, _]],
    [[_, _, _], [_, _, 0.3], [_, _, _]],
  ],
  attention: [
    [[_, 1, _], [1, 1, 1], [_, _, _]],
    [[_, 0.4, _], [0.4, 0.4, 0.4], [_, _, _]],
    [[_, 1, _], [1, 1, 1], [_, _, _]],
    [[_, 0.4, _], [0.4, 0.4, 0.4], [_, _, _]],
  ],
  failed: [
    [[0.5, _, 0.5], [_, 0.5, _], [0.5, _, 0.5]],
    [[0.45, _, 0.45], [_, 0.45, _], [0.45, _, 0.45]],
  ],
  complete: [[[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, 0.5]]],
}

function getPatternOp(id: string, t: number, r: number, c: number): number {
  const p = P[id]
  if (!p) return 0.1
  const n = p.length
  const pos = t * n
  const i0 = Math.floor(pos) % n
  const i1 = (i0 + 1) % n
  const f = pos - Math.floor(pos)
  const s = f * f * (3 - 2 * f)
  return p[i0][r][c] + (p[i1][r][c] - p[i0][r][c]) * s
}

function hexToRgb(h: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)
  return m
    ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
    : [255, 255, 255]
}

interface AnimCanvasProps {
  id: string
  color: string
  period: number
  renderPx: number
  mode: "circles" | "squares"
  /** If true, render only the first frame and stop */
  frozen?: boolean
}

export default function AnimCanvas({
  id,
  color,
  period,
  renderPx,
  mode,
  frozen = false,
}: AnimCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const anim = useRef<number | null>(null)
  const start = useRef<number | null>(null)
  const trailRef = useRef(new Float32Array(9).fill(0))
  const sc =
    typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2
  const isWorking = ["intake", "process", "synthesize", "output"].includes(id)
  const pad =
    mode === "circles"
      ? Math.ceil(renderPx * 0.3)
      : Math.ceil(renderPx * 0.65)
  const cpx = renderPx + pad * 2

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    cv.width = cpx * sc
    cv.height = cpx * sc
    ctx.scale(sc, sc)
    const rgb = hexToRgb(color)
    const ctr = cpx / 2
    let lastTs = 0
    const trail = trailRef.current
    trail.fill(0)

    const draw = (ts: number) => {
      if (!start.current) {
        start.current = ts
        lastTs = ts
      }
      const dt = Math.min(50, ts - lastTs) / 1000
      lastTs = ts
      const t = ((ts - start.current) % period) / period
      ctx.clearRect(0, 0, cpx, cpx)

      if (mode === "circles") {
        if (isWorking) {
          const space = renderPx * 0.38
          const baseR = renderPx * 0.065
          const dots = getDots(id, t)
          for (const dot of dots) {
            const px = ctr + dot.x * space
            const py = ctr + dot.y * space
            const dr = baseR * Math.max(0.05, dot.size)
            if (dr <= 0.1) continue
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(px, py, dr, 0, TAU)
            ctx.fill()
          }
        } else {
          drawShape(ctx, id, color, ctr, renderPx)
        }
      } else {
        const cs = renderPx / 3
        const gs = ctr - renderPx / 2
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const idx = r * 3 + c
            const target = getPatternOp(id, t, r, c)
            const prev = trail[idx]
            trail[idx] =
              target > prev
                ? prev + (target - prev) * Math.min(1, dt * 14)
                : prev + (target - prev) * Math.min(1, dt * 3.5)
            const op = Math.max(0, Math.min(1, trail[idx]))
            const x = gs + c * cs
            const y = gs + r * cs

            if (op > 0.08) {
              const gi = (op - 0.08) / 0.92
              ctx.save()
              ctx.shadowColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${gi * 0.45})`
              ctx.shadowBlur = renderPx * 0.7 * gi
              ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${op * 0.12})`
              ctx.fillRect(x, y, cs, cs)
              ctx.restore()
            }
            if (op > 0.15) {
              const gi = (op - 0.15) / 0.85
              ctx.save()
              ctx.shadowColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${gi * 0.7})`
              ctx.shadowBlur = renderPx * 0.35 * gi
              ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${op * 0.35})`
              ctx.fillRect(x, y, cs, cs)
              ctx.restore()
            }
            if (op > 0.3) {
              const gi = (op - 0.3) / 0.7
              ctx.save()
              ctx.shadowColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${gi * 0.85})`
              ctx.shadowBlur = renderPx * 0.12 * gi
              ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${op * 0.6})`
              ctx.fillRect(x, y, cs, cs)
              ctx.restore()
            }
            ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${op * 0.9})`
            ctx.fillRect(x, y, cs, cs)
            if (op > 0.55) {
              ctx.fillStyle = `rgba(255,255,255,${((op - 0.55) / 0.45) * 0.5})`
              ctx.fillRect(x, y, cs, cs)
            }
          }
        }
      }

      if (!frozen) {
        anim.current = requestAnimationFrame(draw)
      }
    }

    anim.current = requestAnimationFrame(draw)
    return () => {
      if (anim.current) cancelAnimationFrame(anim.current)
    }
  }, [id, color, period, renderPx, mode, cpx, sc, pad, isWorking, frozen])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ width: cpx, height: cpx, display: "block", margin: -pad }}
    />
  )
}

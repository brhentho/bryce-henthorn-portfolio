"use client"

import { useEffect, useRef } from "react"
import {
  PAIRS,
  SPAWN_MIN_MS,
  SPAWN_JITTER_MS,
  SPEED_MIN,
  SPEED_RANGE,
  DROP_INTERVAL_PX,
  MAX_ALPHA,
  MORPH_ZONE_PX,
  GLYPH_MIN_ALPHA,
  FONT_CODE,
  FONT_HUMAN,
  type TextParticle,
  type DroppedGlyph,
} from "./constants"

export function MorphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const particlesRef = useRef<TextParticle[]>([])
  const glyphsRef = useRef<DroppedGlyph[]>([])
  const lastSpawnRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    let planeY = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      planeY = h * 0.5
    }

    resize()
    window.addEventListener("resize", resize)

    const spawn = () => {
      const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)]
      particlesRef.current.push({
        x: 80 + Math.random() * (w - 160),
        y: -20,
        speed: SPEED_MIN + Math.random() * SPEED_RANGE,
        code: pair.code,
        human: pair.human,
        morph: 0,
        alpha: 0,
        drift: (Math.random() - 0.5) * 6,
        lastDropY: -20,
      })
    }

    const dropGlyph = (p: TextParticle) => {
      const text = p.morph < 0.5 ? p.code : p.human
      const isHuman = p.morph >= 0.5
      const charIdx = Math.floor(Math.random() * text.length)
      const char = text[charIdx]
      if (char === " ") return

      const font = isHuman ? FONT_HUMAN : FONT_CODE
      ctx.font = font
      const fullW = ctx.measureText(text).width
      const preW = ctx.measureText(text.slice(0, charIdx)).width
      const charW = ctx.measureText(char).width
      const charX = p.x - fullW / 2 + preW + charW / 2

      glyphsRef.current.push({
        x: charX,
        y: p.y,
        char,
        alpha: p.alpha * 0.9,
        decay: 0.08 + Math.random() * 0.06,
        font,
      })
    }

    const draw = (now: number) => {
      const dt = 1 / 60
      const t = now * 0.001
      ctx.clearRect(0, 0, w, h)

      /* ── Luminous horizon ── */
      const horizonGlow = ctx.createLinearGradient(0, planeY - 60, 0, planeY + 60)
      const hPulse = 0.05 + Math.sin(t * 0.2) * 0.012
      horizonGlow.addColorStop(0, "rgba(80, 140, 200, 0)")
      horizonGlow.addColorStop(0.35, `rgba(100, 155, 210, ${hPulse * 0.4})`)
      horizonGlow.addColorStop(0.5, `rgba(150, 180, 220, ${hPulse})`)
      horizonGlow.addColorStop(0.65, `rgba(100, 155, 210, ${hPulse * 0.4})`)
      horizonGlow.addColorStop(1, "rgba(80, 140, 200, 0)")
      ctx.fillStyle = horizonGlow
      ctx.fillRect(0, planeY - 60, w, 120)

      /* ── Core line ── */
      const coreAlpha = 0.07 + Math.sin(t * 0.4) * 0.02
      const coreGrad = ctx.createLinearGradient(w * 0.08, 0, w * 0.92, 0)
      coreGrad.addColorStop(0, "rgba(140, 175, 220, 0)")
      coreGrad.addColorStop(0.3, `rgba(150, 180, 220, ${coreAlpha})`)
      coreGrad.addColorStop(0.5, `rgba(170, 195, 230, ${coreAlpha * 1.2})`)
      coreGrad.addColorStop(0.7, `rgba(150, 180, 220, ${coreAlpha})`)
      coreGrad.addColorStop(1, "rgba(140, 175, 220, 0)")
      ctx.fillStyle = coreGrad
      ctx.fillRect(0, planeY - 0.5, w, 1)

      /* ── Spawn ── */
      if (now - lastSpawnRef.current > SPAWN_MIN_MS + Math.random() * SPAWN_JITTER_MS) {
        spawn()
        lastSpawnRef.current = now
      }

      /* ── Dropped glyphs ── */
      glyphsRef.current = glyphsRef.current.filter((g) => g.alpha > GLYPH_MIN_ALPHA)
      for (const g of glyphsRef.current) {
        g.alpha -= g.decay * dt
        ctx.save()
        ctx.font = g.font
        ctx.textAlign = "center"
        ctx.fillStyle = `rgba(130, 170, 215, ${Math.max(0, g.alpha)})`
        ctx.fillText(g.char, g.x, g.y)
        ctx.restore()
      }

      /* ── Text particles ── */
      particlesRef.current = particlesRef.current.filter(
        (p) => p.y < h + 30 && p.alpha > -0.1
      )

      for (const p of particlesRef.current) {
        p.y += p.speed * dt
        p.x += p.drift * dt

        // Alpha: fade in from top, fade out below threshold
        const topFade = Math.min(1, (p.y + 20) / 100)
        const bottomFade = Math.max(0, 1 - (p.y - planeY - 80) / (h * 0.35))
        const baseFade = p.y < planeY ? topFade : bottomFade
        p.alpha = baseFade * MAX_ALPHA

        // Morph progress through the zone
        if (p.y < planeY - MORPH_ZONE_PX) {
          p.morph = 0
        } else if (p.y > planeY + MORPH_ZONE_PX) {
          p.morph = 1
        } else {
          const raw = (p.y - (planeY - MORPH_ZONE_PX)) / (MORPH_ZONE_PX * 2)
          p.morph = raw * raw * (3 - 2 * raw) // smoothstep
        }

        // Drop glyphs as matrix trail
        if (p.y - p.lastDropY > DROP_INTERVAL_PX && p.alpha > 0.03) {
          dropGlyph(p)
          p.lastDropY = p.y
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.textAlign = "center"

        if (p.morph < 1) {
          const codeAlpha = p.alpha * (1 - p.morph)
          ctx.font = FONT_CODE
          ctx.fillStyle = `rgba(140, 175, 220, ${codeAlpha})`
          ctx.fillText(p.code, 0, 0)
        }
        if (p.morph > 0) {
          const humanAlpha = p.alpha * p.morph
          ctx.font = FONT_HUMAN
          ctx.fillStyle = `rgba(170, 195, 230, ${humanAlpha})`
          ctx.fillText(p.human, 0, 0)
        }

        ctx.restore()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0 }}
    />
  )
}

"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/components/motion/useReducedMotion"
import { MorphCanvas } from "./MorphCanvas"

/**
 * Full-screen animated hero background.
 * Layers: base bg -> depth gradients -> dot grid -> vignette -> canvas animation -> text overlay
 */
export function HeroAnimation() {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  const transition = "opacity 1s var(--expo), transform 1s var(--expo)"

  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "100vh", background: "var(--bg)" }}
    >
      {/* Subtle depth gradient */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(18, 24, 48, 0.35), transparent)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(130, 160, 210, 0.08) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, var(--bg) 100%)",
        }}
      />

      {/* Canvas animation */}
      {!reduced && <MorphCanvas />}

      {/* Hero text overlay */}
      <div
        className="relative z-10 w-full"
        style={{
          pointerEvents: "none",
          padding: "var(--pad)",
          paddingBottom: "80px",
        }}
      >
        <div style={{ maxWidth: "70%" }}>
          <h1
            className="t-display"
            style={{
              fontSize: "48px",
              lineHeight: "1.3",
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(24px)",
              transition,
              transitionDelay: "0.2s",
            }}
          >
            Product Designer with 10+ years of experience. I specialize in agent orchestration systems, OS-level interaction models, and trustworthy human–AI workflows at enterprise scale. <span style={{ opacity: 0.6, fontWeight: 400 }}>Currently leading AI-native experiences across Windows.</span>
          </h1>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex items-center gap-4"
          style={{
            opacity: show ? 1 : 0,
            transition: "opacity 1s var(--expo)",
            transitionDelay: "0.8s",
          }}
        >
          <div style={{ width: "48px", height: "1px", background: "var(--w15)" }} />
          <span className="t-label">Scroll</span>
        </div>
      </div>
    </section>
  )
}

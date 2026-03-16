"use client"

import { useEffect, useState } from "react"
import { Container } from "@/components/container"
import { HeroIntroOverlay } from "@/components/hero-intro-overlay"
import { HeroGrid } from "@/components/hero-grid"

export function Hero() {
  const [hydrated, setHydrated] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const [showText, setShowText] = useState(false)
  const [skipIntro, setSkipIntro] = useState(false)

  // 1. Hydration + reduced-motion check + repeat-visit skip
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const alreadyPlayed = sessionStorage.getItem("introPlayed")
    setHydrated(true)
    if (prefersReduced || alreadyPlayed) {
      setSkipIntro(true)
      setIntroComplete(true)
      setShowText(true)
    }
  }, [])

  // 2. Text reveal delay after intro completes
  useEffect(() => {
    if (!introComplete || skipIntro) return
    const timer = setTimeout(() => setShowText(true), 300)
    return () => clearTimeout(timer)
  }, [introComplete, skipIntro])

  function handleIntroComplete() {
    setIntroComplete(true)
    sessionStorage.setItem("introPlayed", "1")
  }

  const baseTransition = "opacity 0.7s cubic-bezier(0.25,0.1,0.25,1), transform 0.7s cubic-bezier(0.25,0.1,0.25,1)"

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-screen intro overlay — plays once, self-destructs */}
      {hydrated && !skipIntro && <HeroIntroOverlay onComplete={handleIntroComplete} />}

      {/* Stable interactive dot grid (canvas) */}
      <HeroGrid visible={introComplete} />

      <Container className="relative z-10 py-32 md:py-0">
        <div className="max-w-2xl md:py-8 lg:py-12">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
            <span
              className="block"
              style={{
                opacity: showText ? 1 : 0,
                transform: showText ? "translateY(0)" : "translateY(10px)",
                transition: baseTransition,
              }}
            >
              Designing trust between people and AI agents at OS scale
            </span>
          </h1>

          <div
            style={{
              opacity: showText ? 1 : 0,
              transform: showText ? "translateY(0)" : "translateY(10px)",
              transition: baseTransition,
              transitionDelay: showText ? "0.12s" : "0s",
            }}
          >
            <p className="mt-8 md:mt-10 text-base md:text-lg text-foreground-secondary leading-relaxed font-sans max-w-md">
              Senior Product Designer at Microsoft, leading AI-native experiences across Windows.
            </p>
          </div>

          <div
            style={{
              opacity: showText ? 1 : 0,
              transform: showText ? "translateY(0)" : "translateY(10px)",
              transition: baseTransition,
              transitionDelay: showText ? "0.24s" : "0s",
            }}
          >
            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-sans font-medium px-6 py-3 rounded-[var(--radius-button)] border border-foreground/20 text-foreground hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-h-[44px] hover:scale-[1.03] active:scale-[0.98]"
              >
                View Work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </a>
              <a
                href="mailto:bhenthorn2757@gmail.com"
                className="inline-flex items-center text-sm font-sans font-medium px-6 py-3 rounded-[var(--radius-button)] border border-border text-foreground-secondary hover:border-border-hover hover:text-foreground transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-h-[44px] hover:scale-[1.03] active:scale-[0.98]"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

"use client"

import { Container } from "@/components/container"
import { AnimateIn } from "@/components/animate-in"
import { HeroIntroAnimation } from "@/components/hero-intro-animation"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid bg-grid-animated pointer-events-none" aria-hidden="true" />

      {/* Non-blocking intro animation */}
      <HeroIntroAnimation />

      <Container className="relative z-10 py-32 md:py-0">
        <AnimateIn>
          <h1 className="font-mono text-5xl md:text-7xl lg:text-[6rem] font-medium leading-[1.02] tracking-tight text-[#F2F4F7]">
            Product
            <br />
            Maker.
          </h1>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="mt-8 font-mono text-[12px] md:text-[13px] tracking-[0.08em] text-foreground-secondary">
            {"AI interaction systems \u2022 enterprise scale \u2022 Windows"}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 rounded border border-foreground-secondary text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-h-[44px]"
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </a>
            <a
              href="mailto:bhenthorn2757@gmail.com"
              className="inline-flex items-center font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 rounded border border-border text-foreground-secondary hover:border-border-hover hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-h-[44px]"
            >
              Get in Touch
            </a>
          </div>
        </AnimateIn>
      </Container>
    </section>
  )
}

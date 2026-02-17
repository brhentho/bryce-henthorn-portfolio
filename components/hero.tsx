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
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-foreground-secondary uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-70" aria-hidden="true" />
            Senior UX / Product Designer
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h1 className="font-mono text-3xl md:text-5xl lg:text-[4rem] font-medium leading-[1.08] tracking-tight text-[#F2F4F7] max-w-3xl text-balance">
            Designing calm, trustworthy AI systems at OS scale.
          </h1>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <p className="mt-6 text-base md:text-lg text-foreground-secondary leading-relaxed max-w-2xl font-sans">
            Senior UX/Product Designer focused on interaction architecture, ambient agents, and scalable system design inside Windows.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.3}>
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

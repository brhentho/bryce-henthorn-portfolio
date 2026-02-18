"use client"

import { Container } from "@/components/container"
import { motion, useReducedMotion } from "framer-motion"
import { HeroIntroAnimation } from "@/components/hero-intro-animation"

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  // Text appears at ~1200ms (phase "reveal") with staggered fade-in
  const textDelay = prefersReducedMotion ? 0 : 1.25
  const stagger = prefersReducedMotion ? 0 : 0.12

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid bg-grid-animated pointer-events-none" aria-hidden="true" />

      {/* Dot system: intro animation + live cursor reactivity */}
      <HeroIntroAnimation />

      <Container className="relative z-10 py-32 md:py-0">
        <div className="md:py-8 lg:py-12">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: textDelay, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="font-mono text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[0.98] tracking-[-0.02em] text-[#F2F4F7]">
              Product
              <br />
              <span className="block mt-1">Maker.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: textDelay + stagger, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mt-8 md:mt-10 font-mono text-[12px] md:text-[13px] tracking-[0.08em] text-foreground-secondary leading-relaxed">
              {"AI interaction systems \u2022 enterprise scale \u2022 Windows"}
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: textDelay + stagger * 2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4">
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
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

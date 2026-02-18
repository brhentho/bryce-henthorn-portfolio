"use client"

import { Container } from "@/components/container"
import { motion, useReducedMotion } from "framer-motion"
import { HeroIntroAnimation } from "@/components/hero-intro-animation"

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const textDelay = prefersReducedMotion ? 0 : 1.75
  const stagger = prefersReducedMotion ? 0 : 0.12

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Right-side dot animation */}
      <HeroIntroAnimation />

      <Container className="relative z-10 py-32 md:py-0">
        <div className="max-w-2xl md:py-8 lg:py-12">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: textDelay, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-[-0.02em] text-foreground">
              Product
              <br />
              <span className="block mt-1">Maker.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: textDelay + stagger, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mt-8 md:mt-10 text-base md:text-lg text-foreground-secondary leading-relaxed font-sans max-w-md">
              Designing human-AI systems at enterprise scale in Windows
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: textDelay + stagger * 2, ease: [0.25, 0.1, 0.25, 1] }}
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
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

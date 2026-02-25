"use client"

import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/section-header"
import { AnimateIn } from "@/components/animate-in"

export function PhilosophySection() {
  return (
    <Section>
      <Container>
        <SectionHeader label="About" />
        <AnimateIn>
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans mb-6">
              Senior Product Designer with 8+ years at Microsoft leading AI-native
              experiences across Windows. I specialize in agent orchestration systems,
              OS-level interaction models, and trustworthy human–AI workflows at
              enterprise scale.
            </p>
            <p className="text-base md:text-lg text-foreground-secondary leading-relaxed font-sans">
              I design systems before surfaces — structure and behavior come first,
              complexity unfolds on demand, and transparency, predictability, and user
              control are never features but foundations. A systems thinker with deep
              cross-functional leadership across shell, platform, and M365 ecosystems.
            </p>
          </div>
        </AnimateIn>
      </Container>
    </Section>
  )
}

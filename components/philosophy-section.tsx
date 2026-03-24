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
              I{"'"}ve spent the last 8 years at Microsoft designing AI systems for Windows. Not the flashy kind, but the kind that have to work when agents run at OS-level, when Recall surfaces memories in Teams, when thousands of concurrent workflows need to stay intelligible. Agent orchestration. Human-AI workflows. Things that break if you get the structure wrong.
            </p>
            <p className="text-base md:text-lg text-foreground-secondary leading-relaxed font-sans">
              I design systems first, interfaces second. Get the structure wrong and polish doesn{"'"}t save you. I think complexity should hide until you need it. Transparency, predictability, user control, these aren{"'"}t nice-to-haves. I{"'"}ve learned this by building across Windows shell, platform infrastructure, and M365 where one bad interaction model gets baked into millions of machines.
            </p>
          </div>
        </AnimateIn>
      </Container>
    </Section>
  )
}

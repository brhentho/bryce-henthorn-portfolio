"use client"

import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/section-header"
import { AnimateIn } from "@/components/animate-in"

const principles = [
  {
    title: "Systems before surfaces",
    description:
      "Structure and behavior come first. Visual design follows from clear interaction architecture.",
  },
  {
    title: "Progressive disclosure",
    description:
      "Complexity should unfold on demand. Calm defaults, depth when needed.",
  },
  {
    title: "Trust-first design",
    description:
      "Transparency, predictability, and user control are not features. They are foundations.",
  },
]

export function PhilosophySection() {
  return (
    <Section>
      <Container>
        <SectionHeader label="Philosophy" />
        <AnimateIn>
          <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-2xl mb-14 font-sans">
            I design systems before surfaces. Great interaction feels invisible until
            it{"'"}s missing. Clarity beats novelty. Trust scales better than features.
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {principles.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 0.1}>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}

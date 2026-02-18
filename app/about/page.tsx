"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/section-header"
import { AnimateIn } from "@/components/animate-in"
import { PageTransition } from "@/components/page-transition"

const drawnToItems = [
  "Novel interaction paradigms with no existing mental model",
  "Structure that must emerge from ambiguity",
  "Problems where trust determines adoption",
  "Systems thinking at enterprise and OS scale",
  "Progressive disclosure and calm complexity",
]

export default function AboutPage() {
  return (
    <PageTransition>
      <Nav />
      <main>
        {/* Hero - 2 column: text left, portrait right */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <Container className="relative z-10 py-32 md:py-0">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
              {/* Left: headline */}
              <div className="flex-1 min-w-0">
                <AnimateIn>
                  <p className="text-sm font-sans text-foreground-tertiary mb-8">
                    About
                  </p>
                </AnimateIn>
                <AnimateIn delay={0.1}>
                  <h1 className="font-heading text-2xl md:text-3xl lg:text-[2.5rem] font-bold leading-[1.35] tracking-tight text-foreground max-w-lg">
                    Serial problem solver.
                    <br />
                    Fixated on optimizing systems.
                    <br />
                    Obsessed with structure and flow.
                    <br />
                    Unapologetic technology geek.
                    <br />
                    <span className="text-foreground-secondary">
                      So naturally, I fell in love
                      <br className="hidden md:block" />
                      {" "}with UX design.
                    </span>
                  </h1>
                </AnimateIn>
              </div>

              {/* Right: portrait placeholder */}
              <AnimateIn delay={0.2} className="flex-1 min-w-0 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[360px] aspect-[3/4] rounded-[var(--radius-hero-image)] border border-border bg-surface-raised overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-border-divider mx-auto mb-4" />
                      <span className="text-xs font-sans text-foreground-tertiary">
                        Portrait
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </Container>
        </section>

        {/* Want a bit more? - Two column text */}
        <Section>
          <Container>
            <SectionHeader label="Want a bit more?" />
            <AnimateIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left column: story */}
                <div className="max-w-lg">
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    I{"'"}ve always been drawn to how things work underneath — the architecture,
                    the flow, the hidden logic that makes complex systems feel simple. I think
                    in research loops and systems diagrams. I optimize compulsively.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    That instinct led me to UX design, where I get to untangle ambiguity for a
                    living. I{"'"}m most energized by the problems that don{"'"}t have a playbook yet —
                    the ones where structure has to be invented, not borrowed.
                  </p>
                  <p className="text-sm md:text-base text-foreground-secondary leading-relaxed font-sans">
                    I spend a lot of time thinking about what makes interaction feel trustworthy.
                    How do you make an AI system that people actually rely on? How do you surface
                    complexity without overwhelming? Those are the questions I keep coming back to.
                  </p>
                </div>
                {/* Right column: philosophy */}
                <div className="max-w-lg">
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    I believe the best design is invisible until it{"'"}s missing. Progressive
                    disclosure over information overload. Clear hierarchy over clever decoration.
                    All killer, no filler.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    Recently, my work has focused on large-scale systems inside Windows —
                    AI-powered memory, ambient agents, and OS-level interaction patterns. These
                    are problems where you{"'"}re inventing structure where none existed before.
                  </p>
                  <p className="text-sm md:text-base text-foreground-secondary leading-relaxed font-sans">
                    I care about craft, but I care more about clarity. I{"'"}d rather ship
                    something calm and trustworthy than something flashy and fragile.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </Container>
        </Section>

        {/* What I'm drawn to */}
        <Section className="pt-0">
          <Container>
            <SectionHeader label="What I'm drawn to" />
            <AnimateIn>
              <ul className="flex flex-col gap-3 max-w-2xl">
                {drawnToItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm md:text-base text-foreground-secondary leading-relaxed font-sans"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-accent opacity-60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </Container>
        </Section>

        {/* Drop a line */}
        <Section className="pt-0 pb-8">
          <Container>
            <SectionHeader label="Drop a line" />
            <AnimateIn>
              <div className="max-w-2xl">
                <p className="text-base md:text-lg text-foreground-secondary leading-relaxed mb-8 font-sans">
                  If you{"'"}re working on something complex — AI systems, enterprise tooling,
                  OS-level interaction — and you want it to feel calm, intentional, and
                  trustworthy, I{"'"}d love to hear about it.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:bhenthorn2757@gmail.com"
                    className="inline-flex items-center gap-2 text-sm font-sans font-medium px-6 py-3 rounded-[var(--radius-button)] border border-foreground/20 text-foreground hover:bg-accent hover:text-background hover:border-accent transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent w-fit min-h-[44px] hover:scale-[1.03] active:scale-[0.98]"
                  >
                    bhenthorn2757@gmail.com
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                  <span className="text-xs font-sans text-foreground-tertiary">
                    Seattle, WA
                  </span>
                </div>
              </div>
            </AnimateIn>
          </Container>
        </Section>
      </main>
      <Footer />
    </PageTransition>
  )
}

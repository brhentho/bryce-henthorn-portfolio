"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/section-header"
import { AnimateIn } from "@/components/animate-in"
import { PageTransition } from "@/components/page-transition"

const GRID_SPACING = 40

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
        {/* Hero - single column, no portrait, with static dot grid */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Static dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(240,240,243,0.12) 1.5px, transparent 1.5px)`,
              backgroundSize: `${GRID_SPACING}px ${GRID_SPACING}px`,
              backgroundPosition: `${GRID_SPACING / 2}px ${GRID_SPACING / 2}px`,
            }}
          />

          <Container className="relative z-10 py-32 md:py-0">
            <div className="max-w-2xl">
              <AnimateIn delay={0.1}>
                <h1 className="font-heading text-2xl md:text-3xl lg:text-[2.5rem] font-bold leading-[1.4] tracking-tight text-foreground">
                  Serial problem solver.
                  <br />
                  Fixated on optimizing systems.
                  <br />
                  Obsessed with structure and flow.
                  <br />
                  Unapologetic technology geek.
                  <br />
                  <span className="text-foreground-secondary">
                    So naturally, I fell in love with UX design.
                  </span>
                </h1>
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

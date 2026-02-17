"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/section-header"
import { AnimateIn } from "@/components/animate-in"
import { PageTransition } from "@/components/page-transition"

const thinkItems = [
  "Design is architecture, not decoration.",
  "Great interaction feels invisible.",
  "Complexity should unfold progressively.",
  "Clarity builds trust.",
  "I prioritize systems before surfaces.",
]

const doItems = [
  "Interaction models & information architecture",
  "Scalable design systems",
  "AI & emerging interaction paradigms",
  "Trust and transparency in automation",
]

export default function AboutPage() {
  return (
    <PageTransition>
      <Nav />
      <main>
        {/* 100vh Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid-animated pointer-events-none" aria-hidden="true" />
          <Container className="relative z-10 py-32 md:py-0">
            <AnimateIn>
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase mb-6">
                About
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-mono text-2xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.2] tracking-tight text-foreground max-w-2xl">
                I design interaction systems
                <br className="hidden md:block" />
                {" "}that feel obvious only
                <br className="hidden md:block" />
                {" "}in hindsight.
              </h1>
            </AnimateIn>
          </Container>
        </section>

        {/* Bio */}
        <Section>
          <Container>
            <AnimateIn>
              <div className="max-w-2xl">
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6 font-sans">
                  I{"'"}m a Senior UX/Product Designer focused on large-scale systems — from
                  virtual classroom collaboration to AI-powered memory and ambient agents
                  inside Windows.
                </p>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-2 font-sans">
                  I{"'"}m drawn to problems where:
                </p>
                <ul className="flex flex-col gap-2.5 mb-0">
                  {[
                    "There isn't an existing mental model",
                    "Structure must emerge from ambiguity",
                    "Trust determines adoption",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-foreground-secondary leading-relaxed font-sans"
                    >
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-accent opacity-60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </Container>
        </Section>

        {/* How I Think */}
        <Section className="pt-0">
          <Container>
            <SectionHeader label="How I Think" counter="001" />
            <AnimateIn>
              <ul className="flex flex-col gap-4 max-w-2xl">
                {thinkItems.map((item) => (
                  <li
                    key={item}
                    className="text-base md:text-lg text-foreground leading-relaxed font-sans"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </Container>
        </Section>

        {/* What I Do Best */}
        <Section className="pt-0">
          <Container>
            <SectionHeader label="What I Do Best" counter="002" />
            <AnimateIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-border-hover bg-surface p-5 md:p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-accent/[0.12]" aria-hidden="true" />
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent opacity-60 shrink-0" />
                      <span className="text-sm text-foreground-secondary leading-relaxed font-sans">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </Container>
        </Section>

        {/* Let's Talk */}
        <Section className="pt-0 pb-8">
          <Container>
            <SectionHeader label="Let's Talk" counter="003" />
            <AnimateIn>
              <div className="max-w-2xl">
                <p className="text-base md:text-lg text-foreground-secondary leading-relaxed mb-8 font-sans">
                  If you{"'"}re building something complex and want it to feel calm,
                  intentional, and trustworthy — I{"'"}d love to connect.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:bhenthorn2757@gmail.com"
                    className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 rounded border border-foreground-secondary text-foreground hover:bg-foreground hover:text-background transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent w-fit min-h-[44px]"
                  >
                    bhenthorn2757@gmail.com
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-foreground-tertiary">
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

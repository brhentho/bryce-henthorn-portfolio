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
                  <span className="text-accent">
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
                    I{"'"}m a product designer working on <strong className="text-foreground font-semibold">AI experiences inside Windows</strong> at Microsoft.
                    My job sits at a strange and exciting intersection: operating systems, agents, enterprise
                    workflows, trust, orchestration. All the messy, high-stakes problems that show up when
                    software stops being a tool and starts acting on your behalf.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    The more honest version is that I{"'"}m <strong className="text-foreground font-semibold">wired to solve problems</strong>. I don{"'"}t
                    really know how to turn it off. If something feels inefficient, structurally off, or just
                    vaguely wrong, I will keep pulling on it until I understand it. Sometimes that means building
                    prototypes late at night. Sometimes it means mapping systems no one asked me to map.
                    Sometimes it means going ten layers deeper than necessary just to make sure the foundation is solid.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    I have a habit of <strong className="text-foreground font-semibold">obsessively researching</strong> the {'"'}right{'"'} solution to things
                    most people would settle on in an afternoon. I like constraints. I like tradeoffs. I like
                    figuring out what the real problem is underneath the surface problem.
                  </p>
                  <p className="text-sm md:text-base text-foreground-secondary leading-relaxed font-sans">
                    If you ask my family, they{"'"}ll probably tell you something similar. I{"'"}m always researching
                    and trying to find the most efficient ways to do things, even outside of work.
                  </p>
                </div>
                {/* Right column: philosophy */}
                <div className="max-w-lg">
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    Design, for me, is <strong className="text-foreground font-semibold">structure</strong>. It{"'"}s the quiet architecture that makes
                    complexity feel obvious. I care about progressive disclosure. I care about removing noise.
                    I care about building systems that scale without collapsing under their own weight. Good
                    design should feel inevitable in hindsight.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    In the AI space especially, I think we{"'"}re in a moment where <strong className="text-foreground font-semibold">clarity matters more
                    than novelty</strong>. Agents that interrupt at the wrong time. Automation that feels unpredictable.
                    Interfaces that overpromise and under-explain. Those are structural problems, not styling
                    problems. The work I care about is building the guardrails and interaction patterns that
                    make intelligence feel reliable and human.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    I{"'"}m not trying to design isolated features. I{"'"}m trying to design <strong className="text-foreground font-semibold">how systems behave
                    over time</strong>. How they learn. How they earn trust. How they stay in flow instead of fragmenting it.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    I{"'"}m ambitious about the impact of the work, but I{"'"}m pretty grounded about the craft.
                    I still sweat alignment, hierarchy, edge cases, and empty states. The <strong className="text-foreground font-semibold">details matter</strong> because
                    they{"'"}re where trust is won or lost.
                  </p>
                  <p className="text-sm md:text-base text-foreground-secondary leading-relaxed font-sans">
                    If you{"'"}re building something that sits at the edge of what software can do, especially
                    where AI and real human workflows meet, that{"'"}s where I{"'"}m most energized. I like hard
                    problems. I like unclear terrain. And I like turning chaos into something that feels simple and durable.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </Container>
        </Section>

        {/* Experience timeline */}
        <Section>
          <Container>
            <SectionHeader label="Experience" />
            <AnimateIn>
              <div className="max-w-2xl flex flex-col gap-10">
                {/* Microsoft */}
                <div className="flex gap-6">
                  <div className="shrink-0 w-28">
                    <span className="text-xs font-sans font-medium text-foreground-tertiary">2018 – Present</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground tracking-tight">Microsoft</h3>
                    <ul className="mt-3 flex flex-col gap-3">
                      <li>
                        <p className="text-sm font-sans font-medium text-foreground">Windows Agent Platform</p>
                        <p className="text-xs font-sans text-foreground-tertiary mt-0.5">2025 – Present</p>
                        <p className="text-xs font-sans text-foreground-secondary mt-1">Led agent visibility and orchestration design across Shell, Copilot, and M365 integration surfaces. 3 engineering partner teams.</p>
                      </li>
                      <li>
                        <p className="text-sm font-sans font-medium text-foreground">Copilot Actions</p>
                        <p className="text-xs font-sans text-foreground-tertiary mt-0.5">2025 – Present</p>
                      </li>
                      <li>
                        <p className="text-sm font-sans font-medium text-foreground">Windows Recall</p>
                        <p className="text-xs font-sans text-foreground-tertiary mt-0.5">2023 – 2025</p>
                        <p className="text-xs font-sans text-foreground-secondary mt-1">Designed semantic search experience for Copilot+ PCs. Shipped at Build 2024. Navigated privacy redesign after public launch.</p>
                      </li>
                      <li>
                        <p className="text-sm font-sans font-medium text-foreground">File Explorer Modernization (Windows 11)</p>
                        <p className="text-xs font-sans text-foreground-tertiary mt-0.5">2022 – 2023</p>
                      </li>
                      <li>
                        <p className="text-sm font-sans font-medium text-foreground">Teams for Education</p>
                        <p className="text-xs font-sans text-foreground-tertiary mt-0.5">2020 – 2021</p>
                        <p className="text-xs font-sans text-foreground-secondary mt-1">Led interaction design for virtual classroom experience serving 150M+ users. Reframed team strategy from growth metrics to engagement architecture.</p>
                      </li>
                      <li>
                        <p className="text-sm font-sans font-medium text-foreground">Microsoft Education</p>
                        <p className="text-xs font-sans text-foreground-tertiary mt-0.5">2018 – 2020</p>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Prior */}
                <div className="flex gap-6">
                  <div className="shrink-0 w-28">
                    <span className="text-xs font-sans font-medium text-foreground-tertiary">Prior</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground tracking-tight">Amazon</h3>
                      <p className="text-xs font-sans text-foreground-tertiary mt-0.5">Contract</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground tracking-tight">Nordstrom</h3>
                      <p className="text-xs font-sans text-foreground-tertiary mt-0.5">Contract</p>
                    </div>
                  </div>
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
                  If you{"'"}re working on something complex like AI systems, enterprise tooling, or
                  OS-level interaction and you want it to feel calm, intentional, and
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

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
                    I{"'"}m a product designer at Microsoft working on <strong className="text-foreground font-semibold">AI experiences in Windows</strong>. A lot of my work lives in that in-between space where operating systems, agents, and real-world workflows meet. It{"'"}s where software starts to act on your behalf instead of just responding to you, which makes the problems both messy and really interesting.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    If I{"'"}m being honest, I{"'"}m someone who has a <strong className="text-foreground font-semibold">hard time leaving things alone</strong>. When something feels inefficient or slightly off, I tend to keep digging until I understand why. Sometimes that turns into a quick prototype, sometimes it becomes mapping out a system no one asked for, and sometimes it{"'"}s just me going way deeper than necessary to make sure the foundation actually makes sense. I don{"'"}t really see that as extra work. It{"'"}s just how I think.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    I{"'"}ve always been drawn to <strong className="text-foreground font-semibold">constraints and tradeoffs</strong>. I like figuring out what the real problem is underneath the obvious one, and I{"'"}m okay spending more time there if it means getting to something that holds up. That mindset shows up outside of work too. I{"'"}m usually tinkering with something, trying to make it a little more efficient or a little more thought through than it needs to be.
                  </p>
                </div>
                {/* Right column: philosophy */}
                <div className="max-w-lg">
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    For me, design is really about <strong className="text-foreground font-semibold">structure</strong>. It{"'"}s about taking something complex and making it feel clear without oversimplifying it. I think a lot about how things reveal themselves over time, how to remove unnecessary noise, and how to build systems that can grow without breaking. The best designs don{"'"}t feel flashy. They just make sense when you use them.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    That feels especially important right now in AI. There{"'"}s a lot of excitement, but also a lot of friction. Things interrupt at the wrong time, behave in ways people don{"'"}t expect, or feel like they{"'"}re doing more than they can actually explain. Those aren{"'"}t styling issues. They{"'"}re deeper <strong className="text-foreground font-semibold">interaction and system problems</strong>. The work I{"'"}m interested in is figuring out how to make these systems feel more understandable and more reliable in everyday use.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    It still feels like early days. A lot of this work is about trying things, seeing where they break, and rebuilding them in a better way. That{"'"}s part of what makes it fun. If you{"'"}re working on something where the path isn{"'"}t fully defined yet, especially where AI meets real human behavior, that{"'"}s usually where I feel most at home.
                  </p>
                  <p className="text-sm md:text-base text-foreground-secondary leading-relaxed font-sans">
                    I like working through hard problems and unclear spaces, and turning them into something that feels simple and solid in the end.
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

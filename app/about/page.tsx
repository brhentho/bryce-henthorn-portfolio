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
  "Designing for things that don't have a playbook yet",
  "Getting the fundamentals right so the whole thing holds up",
  "Systems where trust is the actual user need, not a side effect",
  "Problems that live at the intersection of OS, workflows, and human behavior",
  "Making complex things feel calm instead of magical",
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
                  I notice when things are broken.
                  <br />
                  I can't stop thinking about systems.
                  <br />
                  I prefer structure over speed.
                  <br />
                  Cars and software scratch the same itch for me.
                  <br />
                  <span className="text-accent">
                    Design is how I actually build things.
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
                    I work on <strong className="text-foreground font-semibold">AI experiences at Microsoft</strong>, mostly in that messy space where Windows, agents, and how people actually work collide. It{"'"}s where software stops just responding and starts acting on your behalf. That makes everything harder to design but infinitely more interesting to think about.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    I{"'"}m the type of person who notices when something is slightly off and then can{"'"}t let it go. When I see inefficiency or loose logic, I dig. Sometimes that{"'"}s a prototype, sometimes it{"'"}s mapping out a system nobody asked for. I don{"'"}t see it as scope creep. I see it as getting the ground right so nothing collapses later. Same thing with my Elantra N: I spent way too long understanding the suspension tuning because that{"'"}s how I think about most things.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    I care about <strong className="text-foreground font-semibold">constraints and tradeoffs</strong> more than most people probably should. I like finding the real problem hiding underneath the stated one, even if it means spending longer there. That's where solid design starts. It's the same reason I tinker with things in my life: systems, processes, how I spend time with my kids. Get the fundamentals right, and everything else gets easier.
                  </p>
                </div>
                {/* Right column: philosophy */}
                <div className="max-w-lg">
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    For me, design is about <strong className="text-foreground font-semibold">structure and clarity</strong>. Taking something genuinely complex and making it feel obvious, not dumbed down. I think constantly about how information reveals itself to you, what actually matters, and how to build things that can scale without falling apart. Good design shouldn{"'"}t whisper about itself. It just works.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    Right now in AI, most of the problems I see aren{"'"}t visual ones. They{"'"}re deeper. Things interrupt at the wrong moment. Systems behave in ways people don{"'"}t anticipate. Features do more than they can explain. These are <strong className="text-foreground font-semibold">interaction and system failures</strong>. I{"'"}m most interested in the work of making these systems feel understandable and trustworthy in real use.
                  </p>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4 font-sans">
                    This still feels like early ground. Lots of trying, breaking, rebuilding. That{"'"}s where I{"'"}m most engaged: working on something where the rule book doesn{"'"}t exist yet, especially when you{"'"}re sitting at the line between AI behavior and how humans actually operate.
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
                  If you{"'"}re building something complex where the interaction model still matters, the system needs to feel reliable, and you care more about being right than being first, let{"'"}s talk.
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

import { ManualShell } from "./recall/ManualShell"
import {
  SectionLabel,
  TopBar,
  ManualFooter,
  ProjectCard,
  HeroIntro,
  ViewTransitionLink,
} from "@/components/manual"
import { BootSequence } from "@/components/boot-sequence/BootSequence"
import { DotGrid } from "@/components/atmosphere/DotGrid"
import { Glow } from "@/components/atmosphere/Glow"

const CONTENTS = [
  { href: "/agents-in-windows", title: "Agents in Windows", years: "2025–" },
  { href: "/recall", title: "Windows Recall", years: "2023–25" },
  { href: "/teams-for-education", title: "Teams for Education", years: "2020–21" },
]

const PROJECTS = [
  {
    href: "/agents-in-windows",
    eyebrow: "AGENTS IN WINDOWS",
    title: "Making AI agents visible and interruptible in Windows.",
    proof: "DESIGN LEAD · 3 TEAMS",
    imgSrc: "/images/agents/hero-demo.png",
    imgAlt:
      "Windows desktop with a Researcher agent panel showing a checklist of in-progress sub-tasks",
    imagePosition: "center bottom",
    eager: true,
  },
  {
    href: "/recall",
    eyebrow: "WINDOWS RECALL",
    title: "Designing semantic search for everything you’ve seen.",
    proof: "SEARCH DESIGN · RELEVANCE & PRIVACY",
    imgSrc: "/images/recall/hero-demo.png",
    imgAlt:
      "Recall app on a Windows desktop, search results page with multiple match cards",
    imagePosition: "25% bottom",
    eager: false,
  },
  {
    href: "/teams-for-education",
    eyebrow: "TEAMS FOR EDUCATION",
    title: "Modernizing online classes for an authentic virtual experience.",
    proof: "DESIGN LEAD · CLASSROOM RESEARCH",
    imgSrc: "/images/teams/hero-demo.png",
    imgAlt:
      "Microsoft Teams classroom view. Virtual tables of students with avatars and chat moderation panel.",
    imagePosition: "center bottom",
    eager: false,
  },
]

export default function HomePage() {
  return (
    <>
      {/* Once-per-session status trace. The homepage stays visible and
          interactive while the brief decorative sequence runs. */}
      <BootSequence />
      <ManualShell>
        <TopBar />

        <main className="container">
          {/* ── 00 Hero ── */}
          <section
            data-section
            id="overview"
            className="home-hero"
          >
            <div className="home-hero-atmosphere" aria-hidden="true">
              <DotGrid />
              <Glow
                color="var(--accent-schematic)"
                size="72%"
                top="54%"
                left="76%"
                opacity={0.055}
              />
            </div>

            <div className="home-hero-content">
              <div className="relative z-20">
                <HeroIntro
                  eyebrow="PORTFOLIO INDEX / 2026"
                  eyebrowClassName="t-mono-label editorial-hero-index"
                  startDelay={200}
                  wordStep={26}
                  lines={[
                    {
                      text: "I turn complex systems into trustworthy experiences.",
                      className:
                        "t-display-l max-w-[30ch] text-[color:var(--text-primary)]",
                      emphasizeWords: ["trustworthy", "experiences"],
                      emphasisClassName: "hero-intro-emphasis",
                    },
                    {
                      text: "Designing AI agents and enterprise workflows for Windows at Microsoft.",
                      className:
                        "t-h2 hero-intro-secondary text-balance max-w-[34ch]",
                      as: "p",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Title-page foot: scroll cue left, contents right. Neutral
                colour only; the active WORK index stays the single accent. */}
            <div className="home-hero-foot">
              <a href="#work" className="t-mono-label home-hero-cue">
                <span aria-hidden="true">↓</span> Case studies
              </a>
              <nav aria-label="Contents" className="home-hero-contents">
                <p className="t-mono-label">CONTENTS</p>
                <ol>
                  {CONTENTS.map((item, i) => (
                    <li key={item.href}>
                      <ViewTransitionLink href={item.href} className="home-hero-contents-link">
                        <span className="t-mono-label">{String(i + 1).padStart(2, "0")}</span>
                        <span className="t-body-sm">{item.title}</span>
                        <span className="t-mono-label">{item.years}</span>
                      </ViewTransitionLink>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </section>

          {/* ── 01 Selected Work ── */}
          <section
            data-section
            id="work"
            className="home-room home-work-room pb-16 pt-4 lg:pb-24 lg:pt-6"
          >
            <div className="relative z-10">
              <SectionLabel number="01" label="Selected Work" title="Case studies" />
              <div className="mt-6 space-y-10 lg:mt-8 lg:space-y-12">
                {PROJECTS.map((p) => (
                  <ProjectCard key={p.href} {...p} />
                ))}
              </div>
            </div>
          </section>

          {/* ── 02 Thesis ── thesis statement is the section header */}
          <section
            data-section
            data-reveal
            data-reveal-role="statement"
            id="thesis"
            className="home-room home-thesis-room py-16 lg:py-28"
          >
            <div className="relative z-10">
              <h2 className="t-display-l max-w-[34ch] text-[color:var(--text-primary)]">
                Complex systems become trustworthy when people can understand what is
                happening and act on it.
              </h2>
              <p className="t-body mt-10 max-w-[68ch] text-[color:var(--text-secondary)]">
                My work makes system behavior legible: clarifying state, exposing
                meaningful control, and turning technical constraints into product
                decisions teams can carry forward.
              </p>

              <div className="home-principles mt-14 lg:mt-20">
                {[
                  ["STATE", "Show what the system is doing."],
                  ["CONTROL", "Put the next meaningful action in reach."],
                  ["TRUST", "Expose why an outcome appeared."],
                ].map(([label, statement]) => (
                  <div className="home-principle" key={label}>
                    <p className="t-mono-label">{label}</p>
                    <p className="t-body-sm mt-3 text-[color:var(--text-primary)]">
                      {statement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>
        <ManualFooter />
      </ManualShell>
    </>
  )
}

import { ManualShell } from "./recall/ManualShell"
import {
  SectionLabel,
  TopBar,
  ManualFooter,
  ProjectCard,
  HeroIntro,
} from "@/components/manual"
import { BootSequence } from "@/components/boot-sequence/BootSequence"

const PROJECTS = [
  {
    href: "/agents-in-windows",
    eyebrow: "AGENTS IN WINDOWS",
    title: "Making AI agents visible and interruptible in Windows.",
    proof: "DESIGN LEAD · 3 TEAMS",
    imgSrc: "/images/agents/hero-demo.png",
    imgAlt:
      "Windows desktop with a Researcher agent panel showing a checklist of in-progress sub-tasks",
  },
  {
    href: "/recall",
    eyebrow: "WINDOWS RECALL",
    title: "Designing semantic search for everything you’ve seen.",
    proof: "SEARCH DESIGN · BUILD 2024",
    imgSrc: "/images/recall/hero-demo.png",
    imgAlt:
      "Recall app on a Windows desktop, search results page with multiple match cards",
  },
  {
    href: "/teams-for-education",
    eyebrow: "TEAMS FOR EDUCATION",
    title: "Modernizing online classes for an authentic virtual experience.",
    proof: "DESIGN LEAD · 150M+ USERS",
    imgSrc: "/images/teams/hero-demo.png",
    imgAlt:
      "Microsoft Teams classroom view. Virtual tables of students with avatars and chat moderation panel.",
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
            className="pt-16 lg:pt-24 pb-16 lg:pb-24 min-h-[calc(100vh-9rem)] flex flex-col justify-center"
          >
            <HeroIntro
              lines={[
                {
                  text: "I turn complex systems into trustworthy experiences.",
                  className: "t-display-l max-w-[30ch] text-[color:var(--text-primary)]",
                  emphasizeWords: ["trustworthy", "experiences"],
                  emphasisClassName: "hero-intro-emphasis",
                },
                {
                  text: "Designing AI agents and enterprise workflows for Windows at Microsoft.",
                  className:
                    "t-display-l hero-intro-secondary text-balance max-w-[30ch] mt-1 lg:mt-2",
                  as: "p",
                },
              ]}
            />
        </section>

        {/* ── 01 Selected Work ── */}
        <section data-section data-reveal id="work" className="py-12 lg:py-20">
          <SectionLabel number="01" label="Selected Work" title="Case studies" />
          <div className="space-y-10 lg:space-y-16 mt-10">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.href} {...p} />
            ))}
          </div>
        </section>

        {/* ── 02 Thesis ── thesis statement is the section header */}
        <section data-section data-reveal id="thesis" className="py-12 lg:py-20">
          <div className="flex flex-col gap-3">
            <h2 className="t-display-l text-[color:var(--text-primary)] max-w-[34ch]">
              Complex systems become trustworthy when people can understand what is
              happening and act on it.
            </h2>
          </div>
          <p className="t-body text-[color:var(--text-secondary)] mt-10 max-w-[68ch]">
            My work makes system behavior legible: clarifying state, exposing
            meaningful control, and turning technical constraints into product
            decisions teams can carry forward.
          </p>
        </section>

        </main>
        <ManualFooter />
      </ManualShell>
    </>
  )
}

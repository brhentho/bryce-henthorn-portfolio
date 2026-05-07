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
    bgSrc: "/images/cards/agents-bg.png",
    artSrc: "/images/cards/agents-art.png",
    artAlt: "Researcher agent panel surfacing a Trends in Smart Appliances brief with a sub-task checklist",
    years: "2025 –",
  },
  {
    href: "/recall",
    eyebrow: "WINDOWS RECALL",
    title: "Designing semantic search for everything you’ve seen.",
    bgSrc: "/images/cards/recall-bg.png",
    artSrc: "/images/cards/recall-art.png",
    artAlt: "Recall search bar querying ‘Presentation with a red barn’ over a captured presentation slide",
    years: "2023 – 2025",
  },
  {
    href: "/teams-for-education",
    eyebrow: "TEAMS FOR EDUCATION",
    title: "Modernizing online classes for an authentic virtual experience.",
    bgSrc: "/images/cards/teams-bg.png",
    artSrc: "/images/cards/teams-art.png",
    artAlt: "Five circular student avatars arranged in a constellation across a Teams classroom",
    years: "2021 – 2022",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Once-per-session intro — fixed-position overlay; pointer-events
          pass through so the homepage stays interactive during the 7s. */}
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
            eyebrow="§ 00 / BRYCE HENTHORN"
            eyebrowStyle={{ marginBottom: "clamp(3rem, 8vh, 6rem)" }}
            lines={[
              {
                text: "Product Designer with 10+ years of experience currently working on AI experiences at Microsoft.",
                className: "t-display-l max-w-[28ch] lg:max-w-none text-[color:var(--text-primary)]",
              },
              {
                text: "I design at the intersection of operating systems, agents, and enterprise workflows.",
                className: "t-display-l max-w-[28ch] lg:max-w-none mt-3",
                style: { color: "var(--text-secondary)" },
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
              <ProjectCard
                key={p.href}
                href={p.href}
                eyebrow={p.eyebrow}
                title={p.title}
                years={p.years}
                bgSrc={p.bgSrc}
                artSrc={p.artSrc}
                artAlt={p.artAlt}
              />
            ))}
          </div>
        </section>

        {/* ── 02 Thesis ── thesis statement is the section header */}
        <section data-section data-reveal id="thesis" className="py-12 lg:py-20">
          <div className="flex flex-col gap-3">
            <p className="t-mono-label text-[color:var(--text-tertiary)]">§ 02 / THESIS</p>
            <h2 className="t-display-l text-[color:var(--text-primary)] max-w-[34ch]">
              Make the invisible visible. The automatic interruptible. The AI auditable.
            </h2>
            <hr className="rule mt-2" />
          </div>
          <p className="t-body text-[color:var(--text-secondary)] mt-10 max-w-[68ch]">
            When software starts running on your behalf without being asked, the
            design problem isn&rsquo;t really about features anymore. It&rsquo;s about
            the agreement. What the system promises, what it lets you see, and what
            it lets you stop.
          </p>
        </section>

        </main>
        <ManualFooter />
      </ManualShell>
    </>
  )
}

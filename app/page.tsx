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
    index: "01",
    eyebrow: "AGENTS IN WINDOWS",
    title: "Making AI agents visible and interruptible in Windows.",
    dek: "An OS-level home for autonomous work — visible, stoppable, trustworthy.",
    meta: "2025 – · WINDOWS 11 SHELL",
    imgSrc: "/images/agents/hero-demo.png",
    imgAlt:
      "Windows desktop with a Researcher agent panel showing a checklist of in-progress sub-tasks",
  },
  {
    href: "/recall",
    index: "02",
    eyebrow: "WINDOWS RECALL",
    title: "Designing semantic search for everything you’ve seen.",
    dek: "Search that works the way memory does — by meaning, not filename.",
    meta: "2023 – 2025 · COPILOT+ PC",
    imgSrc: "/images/recall/hero-demo.png",
    imgAlt:
      "Recall app on a Windows desktop, search results page with multiple match cards",
  },
  {
    href: "/teams-for-education",
    index: "03",
    eyebrow: "TEAMS FOR EDUCATION",
    title: "Modernizing online classes for an authentic virtual experience.",
    dek: "Virtual tables that gave classrooms back their structure.",
    meta: "2021 – 2022 · MS TEAMS EDU",
    imgSrc: "/images/teams/hero-demo.png",
    imgAlt:
      "Microsoft Teams classroom view. Virtual tables of students with avatars and chat moderation panel.",
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
              <ProjectCard key={p.href} {...p} />
            ))}
          </div>
        </section>

        {/* ── 02 Thesis ── thesis statement is the section header */}
        <section data-section data-reveal id="thesis" className="py-12 lg:py-20">
          <div className="flex flex-col gap-3">
            <h2 className="t-display-l text-[color:var(--text-primary)] max-w-[34ch]">
              Make the invisible visible. The automatic interruptible. The AI auditable.
            </h2>
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

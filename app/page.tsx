import Image from "next/image"
import { ManualShell } from "./recall/ManualShell"
import {
  SectionLabel,
  Margin,
  TopBar,
  ManualFooter,
  ProjectCard,
} from "@/components/manual"

const PROJECTS = [
  {
    href: "/agents-in-windows",
    eyebrow: "AGENTS IN WINDOWS",
    title: "Making AI agents visible and interruptible in Windows.",
    image: "/images/cards/agents-art.png",
    years: "2025 –",
  },
  {
    href: "/recall",
    eyebrow: "WINDOWS RECALL",
    title: "Designing semantic search for everything you’ve seen.",
    image: "/images/cards/recall-art.png",
    years: "2023 – 2025",
  },
  {
    href: "/teams-for-education",
    eyebrow: "TEAMS FOR EDUCATION",
    title: "Modernizing Online Classes for an Authentic Virtual Experience.",
    image: "/images/cards/teams-art.png",
    years: "2020 – 2021",
  },
]

export default function HomePage() {
  return (
    <ManualShell>
      <TopBar />

      <main className="container">
        {/* ── 00 Hero ── */}
        <section
          data-section
          id="overview"
          className="pt-16 lg:pt-24 pb-16 lg:pb-24 min-h-[calc(100vh-9rem)] flex flex-col justify-center"
        >
          <p className="t-mono-label mb-10">§ 00 / BRYCE HENTHORN</p>
          <h1 className="t-display-l max-w-[28ch] lg:max-w-none text-[color:var(--text-primary)]">
            Product Designer with 10+ years of experience currently working on AI experiences at Microsoft.
          </h1>
          <p className="t-display-l max-w-[28ch] lg:max-w-none mt-3 text-[color:var(--text-secondary)]">
            I design at the intersection of operating systems, agents, and enterprise workflows
          </p>
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
                art={
                  <Image
                    src={p.image}
                    alt={`${p.eyebrow} case study`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
                  />
                }
              />
            ))}
          </div>
        </section>

        {/* ── 02 Thesis ── */}
        <section data-section data-reveal id="thesis" className="py-12 lg:py-20">
          <SectionLabel number="02" label="Thesis" title="What I design for" />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                When software runs on your behalf without being asked, interface design
                stops being about features and starts being about agreements — what the
                system promises, what it shows, and what it lets you stop.
              </p>
            </div>
            <Margin anchor="2-pull">
              Make the invisible visible. The automatic interruptible. The AI auditable.
            </Margin>
          </div>
        </section>

      </main>
      <ManualFooter />
    </ManualShell>
  )
}

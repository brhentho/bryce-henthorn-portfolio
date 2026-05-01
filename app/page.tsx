import Image from "next/image"
import Link from "next/link"
import { ManualShell } from "./recall/ManualShell"
import {
  RevisionHeader,
  SectionLabel,
  SpecSheet,
  Figure,
  Margin,
  CursorBlink,
} from "@/components/manual"

const PROJECTS = [
  {
    href: "/agents-in-windows",
    number: "01",
    title: "Agents in Windows",
    tagline: "Solving trust and visibility for AI agents in the operating system",
    image: "/images/projects/Agents project card.png",
    years: "2025 –",
  },
  {
    href: "/recall",
    number: "02",
    title: "Windows Recall",
    tagline: "Designing semantic search for everything you’ve seen",
    image: "/images/projects/Recall project card.png",
    years: "2023 – 2025",
  },
  {
    href: "/teams-for-education",
    number: "03",
    title: "Teams for Education",
    tagline: "Modernizing online classes for an authentic virtual experience",
    image: "/images/projects/Teams for EDU project card.png",
    years: "2020 – 2021",
  },
]

export default function HomePage() {
  return (
    <ManualShell>
      <RevisionHeader rev="2.4" date="April 2026" name="Bryce Henthorn" doc="Portfolio" />

      <main className="container">
        {/* ── Hero ── */}
        <section data-section id="overview" className="pt-12 lg:pt-24 pb-16">
          <p className="t-mono-label mb-6">§ 00 / OVERVIEW</p>
          <h1 className="t-display-xl">Bryce Henthorn<CursorBlink /></h1>
          <p className="t-body lede mt-6 max-w-[60ch] text-[color:var(--text-secondary)]">
            Senior Product Designer working on AI experiences inside Windows at Microsoft.
            I design at the intersection of operating systems, agents, and enterprise
            workflows — the messy, high-stakes problems that show up when software stops
            being a tool and starts acting on your behalf.
          </p>
        </section>

        {/* ── Spec sheet ── */}
        <section data-section data-reveal id="spec" className="py-8">
          <SpecSheet
            rows={[
              { label: "ROLE",    value: "Senior Product Designer, Microsoft" },
              { label: "FOCUS",   value: "AI experiences inside Windows — Agents, Recall, Teams" },
              { label: "BASED",   value: "Seattle, WA" },
              { label: "CONTACT", value: "bhenthorn2757@gmail.com" },
            ]}
          />
        </section>

        {/* ── 01 Selected Work ── */}
        <section data-section data-reveal id="work" className="py-12 lg:py-20">
          <SectionLabel number="01" label="Selected Work" title="Case studies" />
          <div className="space-y-10 lg:space-y-16 mt-10">
            {PROJECTS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="block group focus:outline focus:outline-1 focus:outline-[color:var(--accent-trace)]"
              >
                <article className="border border-[color:var(--rule)] group-hover:border-[color:var(--rule-strong)] transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                    {/* Left: TOC-style metadata */}
                    <div className="p-6 lg:p-10 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)]">
                      <div>
                        <p className="t-mono-label">§ {p.number}</p>
                        <h3 className="t-h1 mt-3 text-[color:var(--text-primary)]">
                          {p.title}
                        </h3>
                        <p className="t-body mt-4 text-[color:var(--text-secondary)]">
                          {p.tagline}
                        </p>
                      </div>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="t-mono-caption text-[color:var(--text-tertiary)]">
                          {p.years}
                        </span>
                        <span className="t-mono-label group-hover:text-[color:var(--accent-trace)] transition-colors inline-flex items-baseline gap-[0.3em]">
                          READ
                          <span
                            aria-hidden="true"
                            className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                          >
                            &rarr;
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Right: case-study thumbnail */}
                    <div className="relative aspect-[16/10] lg:aspect-auto bg-[color:var(--bg)] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={`${p.title} case study`}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </article>
              </Link>
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
              <p className="t-body">
                Across Agents in Windows, Recall, and Teams for Education, the same job
                shows up: make the invisible visible, the automatic interruptible, the AI
                auditable. I design systems before surfaces — structure and behavior come
                first, complexity unfolds on demand, and transparency, predictability, and
                user control are never features but foundations.
              </p>
            </div>
            <Margin anchor="2-pull">
              Make the invisible visible. The automatic interruptible. The AI auditable.
            </Margin>
          </div>
        </section>

        {/* ── 03 Index ── */}
        <section data-section data-reveal id="index" className="py-12 lg:py-20">
          <SectionLabel number="03" label="Index" title="Elsewhere" />
          <div className="mt-10">
            <SpecSheet
              rows={[
                { label: "ABOUT",   value: "/about" },
                { label: "EMAIL",   value: "bhenthorn2757@gmail.com" },
                { label: "RECALL",  value: "/recall — Windows 11" },
                { label: "AGENTS",  value: "/agents-in-windows — Windows 11" },
                { label: "TEAMS",   value: "/teams-for-education — Microsoft Teams" },
              ]}
            />
          </div>
        </section>

        <footer className="border-t border-[color:var(--rule)] py-8 mt-16 flex flex-wrap items-baseline justify-between gap-4">
          <p className="t-mono-caption text-[color:var(--text-tertiary)]">
            BRYCE HENTHORN &middot; SEATTLE, WA &middot; REV. 2.4
          </p>
          <a
            href="mailto:bhenthorn2757@gmail.com"
            className="t-mono-caption text-[color:var(--text-primary)] underline decoration-[color:var(--rule-strong)] underline-offset-[0.25em]"
          >
            bhenthorn2757@gmail.com
          </a>
        </footer>
      </main>
    </ManualShell>
  )
}

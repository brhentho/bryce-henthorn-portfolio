import { ManualShell } from "../recall/ManualShell"
import {
  SectionLabel,
  Figure,
  TopBar,
  ManualFooter,
  HeroIntro,
  CoverPlate,
} from "@/components/manual"

const MANIFESTO = [
  "Serial problem solver.",
  "Fixated on optimizing systems.",
  "Obsessed with structure and flow.",
  "Unapologetic technology geek.",
  "Naturally, a UX designer.",
]

const MICROSOFT_ROLES: {
  year: string
  role: string
  desc?: string
  active?: boolean
}[] = [
  {
    year: "2025 – PRESENT",
    role: "Windows Agent Platform",
    desc: "Led agent visibility and orchestration design across Shell, Copilot, and M365 integration surfaces. 3 engineering partner teams.",
    active: true,
  },
  { year: "2025 – PRESENT", role: "Copilot Actions", active: true },
  {
    year: "2023 – 2025",
    role: "Windows Recall",
    desc: "Designed semantic search experience for Copilot+ PCs. Shipped at Build 2024. Navigated privacy redesign after public launch.",
  },
  { year: "2022 – 2023", role: "File Explorer Modernization (Windows 11)" },
  {
    year: "2020 – 2021",
    role: "Teams for Education",
    desc: "Led interaction design for virtual classroom experience serving 150M+ users. Reframed team strategy from growth metrics to engagement architecture.",
  },
  { year: "2018 – 2020", role: "Microsoft Education" },
]

export default function AboutPage() {
  return (
    <ManualShell>
      <TopBar />

      <main className="container">
        {/* ── 00 Hero — manifesto ── */}
        <section data-section id="overview" className="pt-16 lg:pt-32 pb-16 lg:pb-24">
          <HeroIntro
            eyebrow="§ 00 / ABOUT"
            eyebrowClassName="t-mono-label mb-10"
            linesWrapperClassName="space-y-3 lg:space-y-4"
            lines={MANIFESTO.map((line) => ({
              text: line,
              className: "t-display-l text-[color:var(--text-primary)]",
              as: "p",
            }))}
          />
        </section>

        {/* ── 01 Bio — Annotated Split (body left, portrait right) ── */}
        <section data-section data-reveal id="bio" className="py-12 lg:py-20">
          <SectionLabel number="01" label="Bio" title="Want a bit more?" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                I&apos;m a product designer working on AI experiences inside Windows at
                Microsoft. My job sits at a strange and exciting intersection: operating
                systems, agents, enterprise workflows, trust, orchestration. All the
                messy, high-stakes problems that show up when software stops being a tool
                and starts acting on your behalf.
              </p>
              <p className="t-body">
                The more honest version is that I&apos;m wired to solve problems. I
                don&apos;t really know how to turn it off. If something feels inefficient,
                structurally off, or just vaguely wrong, I will keep pulling on it until I
                understand it. Sometimes that means building prototypes late at night.
                Sometimes it means mapping systems no one asked me to map.
              </p>
              <p className="t-body">
                I have a habit of obsessively researching the &quot;right&quot; solution
                to things most people would settle on in an afternoon. I like constraints.
                I like tradeoffs. I like figuring out what the real problem is underneath
                the surface problem.
              </p>
            </div>
            <Figure
              number="1.1"
              caption="Field site, summer 2024."
              src="/images/bryce-portrait.jpg"
              alt="Bryce Henthorn at altitude on a hike, smiling toward the camera with a green valley and clouds behind"
              width={1200}
              height={1200}
              priority
              className="my-0 lg:my-0 aspect-square"
            />
          </div>
        </section>

        {/* ── Cover Plate (§2.10) — chapter divider into Experience ── */}
        <CoverPlate number="02" total="04" title="Experience" />

        {/* ── 02 Experience — Microsoft DL + PRIOR ── */}
        <section data-section data-reveal id="experience" className="py-12 lg:py-20">
          <SectionLabel
            number="02"
            label="Experience"
            title="Building systems at scale since 2018"
          />

          <h3 className="t-mono-label mt-12 mb-6">MICROSOFT</h3>
          <dl className="border-y border-[color:var(--rule)]">
            {MICROSOFT_ROLES.map((item, i, arr) => (
              <div
                key={`${item.role}-${i}`}
                className={`grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr] items-baseline gap-x-6 py-4 ${
                  i < arr.length - 1 ? "border-b border-[color:var(--rule)]" : ""
                }`}
              >
                <dt
                  className={`t-mono-label ${
                    item.active ? "text-[color:var(--accent-trace)]" : ""
                  }`}
                >
                  {item.year}
                </dt>
                <dd>
                  <p className="t-body text-[color:var(--text-primary)]">{item.role}</p>
                  {item.desc && (
                    <p className="t-body-sm mt-2 text-[color:var(--text-secondary)]">
                      {item.desc}
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="t-mono-label mt-12 mb-6">PRIOR</h3>
          <dl className="border-y border-[color:var(--rule)]">
            {[
              { label: "AMAZON",    value: "Contract" },
              { label: "NORDSTROM", value: "Contract" },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                className={`grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr] items-baseline gap-x-6 py-4 ${
                  i < arr.length - 1 ? "border-b border-[color:var(--rule)]" : ""
                }`}
              >
                <dt className="t-mono-label">{item.label}</dt>
                <dd className="t-body text-[color:var(--text-primary)]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── 03 Philosophy — two-column body ── */}
        <section data-section data-reveal id="philosophy" className="py-12 lg:py-20">
          <SectionLabel
            number="03"
            label="Philosophy"
            title="Good design should feel inevitable in hindsight"
          />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6">
              <p className="t-body">
                Design, for me, is structure. It&apos;s the quiet architecture that makes
                complexity feel obvious. I care about progressive disclosure. I care about
                removing noise. I care about building systems that scale without
                collapsing under their own weight.
              </p>
              <p className="t-body">
                In the AI space especially, I think we&apos;re in a moment where clarity
                matters more than novelty. Agents that interrupt at the wrong time.
                Automation that feels unpredictable. Those are structural problems, not
                styling problems.
              </p>
              <p className="t-body">
                I&apos;m not trying to design isolated features. I&apos;m trying to design
                how systems behave over time. How they learn. How they earn trust. How
                they stay in flow instead of fragmenting it.
              </p>
            </div>
            <div className="space-y-6">
              <p className="t-body">
                I&apos;m ambitious about the impact of the work, but I&apos;m pretty
                grounded about the craft. I still sweat alignment, hierarchy, edge cases,
                and empty states. The details matter because they&apos;re where trust is
                won or lost.
              </p>
              <p className="t-body">
                If you&apos;re building something that sits at the edge of what software
                can do, especially where AI and real human workflows meet, that&apos;s
                where I&apos;m most energized. I like hard problems. I like unclear
                terrain. And I like turning chaos into something that feels simple and
                durable.
              </p>
            </div>
          </div>
        </section>

      </main>
      <ManualFooter />
    </ManualShell>
  )
}

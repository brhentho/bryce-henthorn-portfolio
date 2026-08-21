import { ManualShell } from "../recall/ManualShell"
import {
  SectionLabel,
  Figure,
  TopBar,
  ManualFooter,
  HeroIntro,
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
}[] = [
  {
    year: "2025 – PRESENT",
    role: "Windows Agent Platform",
    desc: "Led agent visibility and orchestration design across Shell, Copilot, and M365 integration surfaces. 3 engineering partner teams.",
  },
  { year: "2025 – PRESENT", role: "Copilot Actions" },
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
            linesWrapperClassName="space-y-3 lg:space-y-4"
            lines={MANIFESTO.map((line, index) => ({
              text: line,
              className: "t-display-l text-[color:var(--text-primary)]",
              as: index === 0 ? "h1" : "p",
            }))}
          />
        </section>

        {/* ── 01 Bio — Annotated Split (body left, portrait right) ── */}
        <section data-section data-reveal id="bio" className="py-12 lg:py-20">
          <SectionLabel number="01" label="Bio" title="Want a bit more?" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div className="[&>p+p]:mt-4! max-w-[68ch]">
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

        {/* ── 02 Experience — editorial career timeline ── */}
        <section
          data-section
          data-reveal
          id="experience"
          className="py-16 lg:py-28"
        >
          <SectionLabel
            number="02"
            label="Experience"
            title="Building systems at scale since 2018"
          />

          <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-20">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[12rem_minmax(0,1fr)]">
              <div>
                <h3 className="t-mono-label text-[color:var(--text-secondary)]">
                  Microsoft
                </h3>
                <p className="t-mono-colophon mt-2">2018 – PRESENT</p>
              </div>

              <dl className="border-t border-[color:var(--rule-strong)]">
                {MICROSOFT_ROLES.map((item, i) => (
                  <div
                    key={`${item.role}-${i}`}
                    className={`grid grid-cols-1 gap-y-3 py-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-8 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-x-10 lg:py-8 ${
                      i > 0 ? "border-t border-[color:var(--rule)]" : ""
                    }`}
                  >
                    <dt className="t-mono-caption pt-1 text-[color:var(--text-tertiary)]">
                      {item.year}
                    </dt>
                    <dd className="min-w-0">
                      <p className="t-h3 text-[color:var(--text-primary)]">
                        {item.role}
                      </p>
                      {item.desc && (
                        <p className="t-body-sm mt-3 max-w-[70ch] text-[color:var(--text-secondary)]">
                          {item.desc}
                        </p>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[12rem_minmax(0,1fr)]">
              <h3 className="t-mono-label text-[color:var(--text-secondary)]">
                Prior
              </h3>

              <dl className="grid grid-cols-1 border-t border-[color:var(--rule-strong)] sm:grid-cols-2">
                {[
                  { label: "Amazon", value: "Contract" },
                  { label: "Nordstrom", value: "Contract" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="py-7 sm:py-8 sm:pr-8 sm:odd:border-r sm:odd:border-[color:var(--rule)] sm:even:pl-8"
                  >
                    <dt className="t-h3 text-[color:var(--text-primary)]">
                      {item.label}
                    </dt>
                    <dd className="t-mono-caption mt-2 text-[color:var(--text-tertiary)]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── 03 Philosophy — two-column body ── */}
        <section data-section data-reveal id="philosophy" className="py-12 lg:py-20">
          <SectionLabel
            number="03"
            label="Philosophy"
            title="Good design should feel inevitable in hindsight"
          />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="[&>p+p]:mt-4!">
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
            <div className="[&>p+p]:mt-4!">
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

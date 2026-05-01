import { ManualShell } from "../recall/ManualShell"
import {
  RevisionHeader,
  SectionLabel,
  SpecSheet,
  Figure,
  Telemetry,
  Margin,
  CursorBlink,
  ManualNav,
  ManualFooter,
} from "@/components/manual"

export default function AboutPage() {
  return (
    <ManualShell>
      <RevisionHeader rev="2.4" date="April 2026" name="Bryce Henthorn" doc="About" />
      <ManualNav />

      <main className="container">
        {/* ── Hero ── */}
        <section data-section id="overview" className="pt-12 lg:pt-24 pb-16">
          <p className="t-mono-label mb-6">§ 00 / OVERVIEW</p>
          <h1 className="t-display-xl">Bryce Henthorn<CursorBlink /></h1>
          <p className="t-body lede mt-6 max-w-[60ch] text-[color:var(--text-secondary)]">
            Senior Product Designer working on AI experiences inside Windows at Microsoft.
          </p>
          <Figure
            number="0.1"
            caption="At altitude on a hike, smiling toward the camera with a green valley and clouds behind"
            src="/images/bryce-portrait.jpg"
            alt="Bryce Henthorn at altitude on a hike, smiling toward the camera with a green valley and clouds behind"
            width={1200}
            height={1200}
            priority
          />
        </section>

        {/* ── Spec sheet ── */}
        <section data-section data-reveal id="spec" className="py-8">
          <SpecSheet
            rows={[
              { label: "ROLE",    value: "Senior Product Designer, Microsoft" },
              { label: "FOCUS",   value: "AI experiences inside Windows" },
              { label: "DOMAIN",  value: "Operating systems, agents, enterprise workflows, trust, orchestration" },
              { label: "CONTACT", value: "bhenthorn2757@gmail.com" },
            ]}
          />
        </section>

        {/* ── 01 Bio ── */}
        <section data-section data-reveal id="bio" className="py-12 lg:py-20">
          <SectionLabel number="01" label="Bio" title="Want a bit more?" />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-display-l">
                Serial problem solver. Fixated on optimizing systems. Obsessed with
                structure and flow. Unapologetic technology geek. So naturally, I fell in
                love with UX design.
              </p>
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
          </div>
        </section>

        {/* ── 02 Philosophy ── */}
        <section data-section data-reveal id="philosophy" className="py-12 lg:py-20">
          <SectionLabel
            number="02"
            label="Philosophy"
            title="Good design should feel inevitable in hindsight"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
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
            <Margin anchor="2-pull">
              &ldquo;Good design should feel inevitable in hindsight.&rdquo;
            </Margin>
          </div>
        </section>

        {/* ── 03 Experience ── */}
        <section data-section data-reveal id="experience" className="py-12 lg:py-20">
          <SectionLabel
            number="03"
            label="Experience"
            title="Building systems at scale since 2018"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Senior Product Designer at Microsoft, leading AI-native experiences across
                Windows Shell, Copilot, and M365 ecosystems.
              </p>
            </div>
          </div>

          <h3 className="t-mono-label mt-16 mb-6">MICROSOFT</h3>
          <dl className="border-y border-[color:var(--rule)]">
            {[
              {
                year: "2025 –",
                role: "Windows Agent Platform",
                desc: "Led agent visibility and orchestration design across Shell, Copilot, and M365 integration surfaces. 3 engineering partner teams.",
                active: true,
              },
              { year: "2025 –",      role: "Copilot Actions", active: true },
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
            ].map((item, i, arr) => (
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
          <SpecSheet
            rows={[
              { label: "AMAZON",    value: "Contract" },
              { label: "NORDSTROM", value: "Contract" },
            ]}
          />
        </section>

        {/* ── 04 Drawn to ── */}
        <section data-section data-reveal id="drawn-to" className="py-12 lg:py-20">
          <SectionLabel number="04" label="Drawn To" title="What I&rsquo;m drawn to" />
          <div className="mt-12 space-y-4">
            <Telemetry
              items={[
                { value: "01", unit: "NOVEL",    label: "Problems with no existing mental model" },
                { value: "02", unit: "EMERGENT", label: "Structure that must emerge from ambiguity" },
                { value: "03", unit: "TRUST",    label: "Problems where trust determines adoption" },
              ]}
            />
            <Telemetry
              items={[
                { value: "04", unit: "SCALE", label: "Systems thinking at enterprise and OS scale" },
                { value: "05", unit: "CALM",  label: "Progressive disclosure and calm complexity" },
              ]}
            />
          </div>
        </section>

      </main>
      <ManualFooter rev="2.4" />
    </ManualShell>
  )
}

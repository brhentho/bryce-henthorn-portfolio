import { ManualShell } from "./ManualShell"
import {
  RevisionHeader,
  SectionLabel,
  SpecSheet,
  Figure,
  Telemetry,
  Margin,
  StateDiagram,
} from "@/components/manual"
import { HeroSchematic } from "./svg/HeroSchematic"
import { Fig1_1 } from "./svg/Fig1_1"
import { Fig2_1 } from "./svg/Fig2_1"
import { Fig2_2 } from "./svg/Fig2_2"
import { Fig3_1 } from "./svg/Fig3_1"
import { Fig3_2 } from "./svg/Fig3_2"

export default function RecallPage() {
  return (
    <ManualShell>
      <RevisionHeader rev="2.3" date="April 2026" name="Bryce Henthorn" doc="Recall" />

      <main className="container">
        {/* ── Hero ── */}
        <section data-section id="hero" className="pt-12 lg:pt-24 pb-16">
          <p className="t-mono-label mb-6">§ 00 / OVERVIEW</p>
          <h1 className="t-display-xl max-w-[18ch]">Making AI memory legible</h1>
          <p className="t-body lede mt-6 max-w-[60ch] text-[color:var(--text-secondary)]">
            [TK 2-sentence subhead]
          </p>
          <Figure
            number="0.1"
            caption="[TK hero caption]"
          >
            <HeroSchematic />
          </Figure>
        </section>

        {/* ── Spec sheet ── */}
        <section data-section id="spec" className="py-8">
          <SpecSheet
            rows={[
              { label: "ROLE",     value: "Senior UX/Product Designer" },
              { label: "PLATFORM", value: "Windows 11 (Copilot+ PCs)" },
              { label: "TIMELINE", value: "[TK confirm timeline]" },
              { label: "TEAM",     value: "[TK]" },
              { label: "MY FOCUS", value: "Semantic search experience: ranking, relevance, trust" },
              { label: "STATUS",   value: "Shipped (Windows 11, 2024)" },
            ]}
          />
        </section>

        {/* ── 01 Problem ── */}
        <section data-section id="problem" className="py-12 lg:py-20">
          <SectionLabel number="01" label="Problem" title="[TK problem title]" />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">[TK problem paragraph 1]</p>
              <p className="t-body">[TK problem paragraph 2]</p>
            </div>
            <Margin anchor="1-1">[TK marginalia: original framing assumption]</Margin>
          </div>
          <Figure number="1.1" caption="[TK fig 1.1 caption]">
            <Fig1_1 />
          </Figure>
        </section>

        {/* ── 02 Methodology ── */}
        <section data-section id="methodology" className="py-12 lg:py-20">
          <SectionLabel number="02" label="Methodology" title="[TK methodology title]" />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">[TK methodology paragraph 1]</p>
              <p className="t-body">[TK methodology paragraph 2]</p>
            </div>
          </div>
          <Figure number="2.1" caption="[TK research synthesis caption]">
            <Fig2_1 />
          </Figure>
          <div className="section-grid">
            <Figure number="2.2" caption="[TK rejected concepts caption]" cf={{ section: "1.4", href: "#problem" }}>
              <Fig2_2 />
            </Figure>
            <Margin anchor="2-2">[TK rejected-direction note]</Margin>
          </div>
        </section>

        {/* ── 03 Solution ── */}
        <section data-section id="solution" className="py-12 lg:py-20">
          <SectionLabel number="03" label="Solution" title="[TK solution title]" />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">[TK solution paragraph 1]</p>
              <p className="t-body">[TK solution paragraph 2]</p>
            </div>
          </div>
          <Figure number="3.1" caption="[TK before/after caption]">
            <Fig3_1 />
          </Figure>
          <Figure number="3.2" caption="[TK confidence indicator caption]">
            <Fig3_2 />
          </Figure>
          <h3 className="t-h3 mt-12 t-mono-label">Recall query lifecycle</h3>
          <StateDiagram
            states={[
              { label: "CAPTURE" },
              { label: "OCR" },
              { label: "INDEX" },
              { label: "QUERY" },
              { label: "RESULT" },
            ]}
            duration={6000}
          />
          <div className="section-grid">
            <div />
            <Margin anchor="3-2">[TK contested decision: &quot;I argued for…&quot;]</Margin>
          </div>
        </section>

        {/* ── 04 Impact ── */}
        <section data-section id="impact" className="py-12 lg:py-20">
          <SectionLabel number="04" label="Impact" title="[TK impact title]" />
          <div className="mt-10 space-y-6 max-w-[68ch]">
            <p className="t-body">[TK impact paragraph]</p>
          </div>
          <div className="mt-12">
            <Telemetry
              items={[
                { value: "[TK]", unit: "DEVICES", label: "Windows 11 24H2" },
                { value: "[TK]", unit: "TEAMS",   label: "Building on the pattern" },
                { value: "2",    unit: "YEARS",   label: "Shipping cycle" },
              ]}
            />
          </div>
        </section>

        {/* ── 05 Reflection ── */}
        <section data-section id="reflection" className="py-12 lg:py-20">
          <SectionLabel number="05" label="Reflection" title="[TK reflection title]" />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">[TK reflection paragraph 1]</p>
              <p className="t-body">[TK reflection paragraph 2]</p>
            </div>
            <Margin anchor="5-1">[TK what I&apos;d change]</Margin>
          </div>
        </section>

        <footer className="border-t border-[color:var(--rule)] py-8 mt-16">
          <p className="t-mono-caption text-[color:var(--text-tertiary)]">
            END OF DOCUMENT · REV. 2.3
          </p>
        </footer>
      </main>
    </ManualShell>
  )
}

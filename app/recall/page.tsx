import { ManualShell } from "./ManualShell"
import {
  RevisionHeader,
  SectionLabel,
  SpecSheet,
  Figure,
  Telemetry,
  Margin,
  StateDiagram,
  CursorBlink,
  ManualNav,
  ManualFooter,
  CoverPlate,
} from "@/components/manual"
import { HeroSchematic } from "./svg/HeroSchematic"
import { Fig1_1 } from "./svg/Fig1_1"
import { Fig2_1 } from "./svg/Fig2_1"
import { Fig2_2 } from "./svg/Fig2_2"
import { Fig3_1 } from "./svg/Fig3_1"
import { Fig3_2 } from "./svg/Fig3_2"

const PIPELINE_STAGES = [
  {
    label: "01 · CAPTURE",
    value:
      "Continuously samples the screen at intervals, saving raw visual snapshots as the source material that enters the processing pipeline.",
  },
  {
    label: "02 · OCR",
    value:
      "Straightens and denoises each image, identifies characters through optical recognition, and reconstructs the output into formatted, flowing text.",
  },
  {
    label: "03 · INDEX",
    value:
      "Runs meaning analysis on the extracted text to identify concepts and intent, then maps those concepts to semantic vectors for downstream understanding.",
  },
  {
    label: "04 · QUERY",
    value:
      "Matches the meaning of a query against the semantic index using similarity scores — finding the right files even when the exact words don't match.",
  },
  {
    label: "05 · RESULT",
    value:
      "Returns ranked moments to the user, with provenance and match-type signals — text matches, visual matches, or both — surfaced on every card.",
  },
]

const TRUST_PRINCIPLES = [
  {
    label: "DATA STORAGE",
    value:
      "Everything stays on-device. Local capture, local indexing, local retrieval. Nothing leaves the machine.",
  },
  {
    label: "USER CONTROL",
    value:
      "Opt-in by default. Users can exclude apps, pause indexing, and delete any memory at any time.",
  },
  {
    label: "TRANSPARENCY",
    value:
      "Every card shows where the result came from and when. System boundaries are visible, never hidden.",
  },
  {
    label: "DELETION",
    value:
      "Delete individual memories or wipe everything. No hidden caches. No silent retention.",
  },
]

export default function RecallPage() {
  return (
    <ManualShell>
      <RevisionHeader rev="2.4" date="April 2026" name="Bryce Henthorn" doc="Recall" />
      <ManualNav />

      <main className="container">
        {/* ── 00 Overview / Hero ── */}
        <section data-section id="overview" className="pt-12 lg:pt-24 pb-16">
          <p className="t-mono-label mb-6">§ 00 / OVERVIEW</p>
          <h1 className="t-display-xl max-w-[18ch]">
            Designing semantic search for everything you&apos;ve seen<CursorBlink />
          </h1>
          <p className="t-body lede mt-6 max-w-[60ch] text-[color:var(--text-secondary)]">
            Recall captures everything appearing on screen and makes it searchable
            through meaning rather than filenames. I led the semantic search experience
            — how users find their memories, how relevance gets communicated, and how
            trust gets earned at every step.
          </p>
          <Figure
            number="0.1"
            caption="System schematic — local capture, on-device indexing, semantic retrieval"
          >
            <HeroSchematic />
          </Figure>
        </section>

        {/* ── Spec sheet ── */}
        <section data-section data-reveal id="spec" className="py-8">
          <SpecSheet
            rows={[
              { label: "ROLE",     value: "Senior UX/Product Designer" },
              { label: "PLATFORM", value: "Windows 11 (Copilot+ PCs)" },
              { label: "TIMELINE", value: "2023 – 2025" },
              { label: "TEAM",     value: "Cross-functional team of design, research, and ML engineering" },
              { label: "MY FOCUS", value: "Semantic search experience — ranking, relevance, and trust" },
              { label: "STATUS",   value: "Shipped at Build 2024; reshaped post-launch around privacy" },
            ]}
          />
        </section>

        {/* ── 01 Context ── */}
        <section data-section data-reveal id="context" className="py-12 lg:py-20">
          <SectionLabel
            number="01"
            label="Context"
            title="Where was that thing I saw last week?"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                The problem was simple and unsolved. You&apos;d seen something on your
                computer: a presentation, a snippet of code, a reference in an email. But
                you couldn&apos;t find it. You&apos;d try different search terms, retrace
                your steps, open files one by one. Minutes wasted. Information you knew
                existed but couldn&apos;t retrieve.
              </p>
              <p className="t-body">
                Recall aimed to capture everything appearing on screen and make it
                searchable through meaning rather than filenames. But solving that
                technically wasn&apos;t the real challenge. We had to build something
                users actually trusted.
              </p>
              <p className="t-body">
                My role focused specifically on the semantic search experience: how users
                search their memories, how results are ranked and displayed, and how
                relevance is communicated in a way that feels understandable and
                trustworthy.
              </p>
            </div>
          </div>
        </section>

        {/* ── Cover Plate (§2.10) — chapter divider into System ── */}
        <CoverPlate number="02" total="09" title="System" />

        {/* ── 02 System ── Stage Rail Plate (§2.5) ── */}
        <section data-section data-reveal id="system" className="py-12 lg:py-20">
          <SectionLabel
            number="02"
            label="System"
            title="On demand intelligence"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body lede text-[color:var(--text-secondary)]">
                A local intelligence layer built for screen capture and on-device
                indexing — processing everything you see into searchable, semantically
                rich memory without ever leaving your machine.
              </p>
            </div>
          </div>

          <p className="t-mono-label mt-12 mb-6 text-[color:var(--text-tertiary)]">
            RECALL QUERY LIFECYCLE
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8 lg:gap-10 items-start border-t border-[color:var(--rule)] pt-8">
            <ol className="space-y-6 lg:pr-8 lg:border-r lg:border-[color:var(--rule)]">
              {PIPELINE_STAGES.map((s) => (
                <li key={s.label} className="space-y-1.5">
                  <p className="t-mono-label text-[color:var(--text-secondary)]">
                    {s.label}
                  </p>
                  <p className="t-mono-caption text-[color:var(--text-tertiary)] leading-relaxed">
                    {s.value}
                  </p>
                </li>
              ))}
            </ol>
            <StateDiagram
              className="my-0"
              states={[
                { label: "CAPTURE" },
                { label: "OCR" },
                { label: "INDEX" },
                { label: "QUERY" },
                { label: "RESULT" },
              ]}
              duration={6000}
            />
          </div>
        </section>

        {/* ── 03 Problem ── Annotated Split Plate (§2.4) ── */}
        <section data-section data-reveal id="problem" className="py-12 lg:py-20">
          <SectionLabel
            number="03"
            label="Problem"
            title="Search wants precision. Memory offers fragments."
          />
          <div className="mt-10 border border-[color:var(--rule)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Body lane */}
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] space-y-6">
              <p className="t-body">
                File search is built on certainty. You give it a filename or keyword. It
                matches exactly. Done.
              </p>
              <p className="t-body">
                But that&apos;s not how memory works. You remember a chart, maybe the
                color was blue, maybe it was from an email or a browser. Nothing precise
                enough for traditional search to grab hold of.
              </p>
              <p className="t-body">
                Recall flipped this. Instead of requiring exact queries, it indexed
                everything the system could see and made it searchable through semantic
                understanding.
              </p>
              <p className="t-body">
                If you&apos;re indexing everything, how do you let people search without
                overwhelming them? The system needed to think like a person, not force
                people to think like the system.
              </p>
              <p className="t-body">
                There was another layer to the ranking problem. The same memory could
                feel obviously correct or completely irrelevant depending on what the
                user was doing right now. A slide deck retrieved while preparing a
                presentation feels like exactly what you needed. The same slide deck
                surfaced while debugging code feels like noise. Relevance wasn&apos;t a
                fixed property of the result. It was shaped by the task. Static ranking
                couldn&apos;t account for that, which meant the interface had to give
                users enough context to make their own relevance judgment in the moment.
              </p>
            </div>
            {/* Figure lane */}
            <div className="p-6 lg:p-10 flex items-start">
              <Figure
                number="3.1"
                caption="Search vs. recall — where exact-match retrieval breaks and where semantic memory takes over"
              >
                <Fig1_1 />
              </Figure>
            </div>
          </div>
        </section>

        {/* ── Interlude (§2.11) — promoted from § 03 Margin ── */}
        <aside
          data-reveal
          id="problem-interlude"
          aria-labelledby="problem-interlude-quote"
          className="my-12 lg:my-20 py-16 lg:py-24 border-y border-[color:var(--rule)]"
        >
          <p className="t-mono-label mb-8 text-[color:var(--text-tertiary)]">
            INTERLUDE
          </p>
          <blockquote className="max-w-[68ch]">
            <p
              id="problem-interlude-quote"
              className="t-display-l text-[color:var(--text-primary)]"
            >
              Relevance wasn&rsquo;t a fixed property of the result. It was shaped
              by the task.
            </p>
            <footer className="t-mono-caption mt-8 text-[color:var(--text-tertiary)]">
              Cf. § 03 / PROBLEM
            </footer>
          </blockquote>
        </aside>

        {/* ── 04 Cards ── Two-up Comparison Plate (§2.6) ── */}
        <section data-section data-reveal id="cards" className="py-12 lg:py-20">
          <SectionLabel
            number="04"
            label="Cards"
            title="Cards as moments, not documents"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                A Recall card needed to hold several pieces of information: a screenshot,
                app name, timestamp, extracted text, and relevance signals.
              </p>
              <p className="t-body">
                We built around the screenshot as the primary anchor. Not a cropped asset
                preview, but the actual desktop as it appeared. That context is what
                lodges in memory.
              </p>
              <p className="t-body">
                App name, timestamp, and extracted text stayed visible but secondary. The
                hierarchy pushed away from &ldquo;found document&rdquo; and toward
                &ldquo;revisited moment.&rdquo;
              </p>
              <p className="t-body">
                The result is something between a timeline and a search interface:
                visual enough to scan like memory works, structured enough to act
                predictably.
              </p>
            </div>
          </div>

          <div className="mt-10 lg:mt-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Figure number="4.1" className="my-0">
                <Fig2_1 />
              </Figure>
              <Figure number="4.2" className="my-0">
                <Fig3_1 />
              </Figure>
            </div>
            <div className="mt-3 pt-3 border-t border-[color:var(--rule)]">
              <p className="t-mono-caption text-[color:var(--text-secondary)]">
                FIG. 4.1 / 4.2 — Card hierarchy and the metadata flip
              </p>
            </div>
          </div>
        </section>

        {/* ── 05 Transparency ── */}
        <section data-section data-reveal id="transparency" className="py-12 lg:py-20">
          <SectionLabel
            number="05"
            label="Transparency"
            title="AI-powered search has a trust problem"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Technically correct results can feel wrong. Search for &ldquo;blue chart
                spreadsheet&rdquo; and the system might return something from an
                unrelated app that simply had a blue element.
              </p>
              <p className="t-body">
                We didn&apos;t try to eliminate every false positive at the model layer.
                Instead, we made results understandable.
              </p>
              <p className="t-body">
                Every card explained how it matched. Text matches were labeled as text
                matches. Visual matches were labeled as visual matches. Separating and
                showing these signals let users judge relevance themselves.
              </p>
              <p className="t-body">Perfection wasn&apos;t the goal. Legibility was.</p>
              <p className="t-body">
                Separating match types solved one problem. But users still hit a deeper
                tension: cast a wide net and the results felt noisy and intrusive. Filter
                too aggressively and the thing they were looking for disappeared. We
                couldn&apos;t pick one mode for everyone. Instead we exposed lightweight
                controls that let users broaden or tighten retrieval scope themselves.
                The system still did the semantic heavy lifting. But the user decided how
                much to see. Optimization moved from the algorithm to the interaction.
              </p>
              <p className="t-body">
                Memory search doesn&apos;t work like file search. People don&apos;t type
                a perfect query and expect one right answer. They start vague —
                &ldquo;that chart from last week&rdquo; — scan what surfaces, recognize
                something familiar, and refine from there. It&apos;s recognition-guided
                exploration, not retrieval. The interface had to support that loop: fast
                re-querying, results that updated fluidly, and enough context on each
                card to trigger recognition without requiring a click. Every round-trip
                through the loop had to feel effortless or users would give up and go dig
                through folders instead.
              </p>
            </div>
            <Margin anchor="5-pull">
              Perfection wasn&rsquo;t the goal. Legibility was.
            </Margin>
          </div>
          <Figure
            number="5.1"
            caption="Match-type signals — text matches and visual matches labeled separately on every card"
            cf={{ section: "03", href: "#problem" }}
          >
            <Fig2_2 />
          </Figure>
          <Figure
            number="5.2"
            caption="Confidence indicators — letting users judge relevance themselves rather than hiding it inside the model"
          >
            <Fig3_2 />
          </Figure>
        </section>

        {/* ── 06 Performance ── Pull-quote Interlude (§2.11) + Strip Break (§2.9) ── */}
        <section data-section data-reveal id="performance" className="py-12 lg:py-20">
          <SectionLabel
            number="06"
            label="Performance"
            title="Fast enough to feel alive"
          />

          {/* Pull-quote — the section's compressed lede */}
          <div className="mt-10 lg:mt-14 py-12 lg:py-20 border-y border-[color:var(--rule)]">
            <blockquote className="max-w-[68ch]">
              <p className="t-display-l text-[color:var(--text-primary)]">
                We made waiting feel like progress.
              </p>
            </blockquote>
          </div>

          {/* One-line caption beneath the quote */}
          <p className="mt-6 t-body-sm max-w-[68ch] text-[color:var(--text-secondary)]">
            Embedding indexing is computationally heavy — we tuned retrigger cadence
            so results refine per keystroke without ever blocking the user.
          </p>

          {/* Strip Break — three labeled metric chips */}
          <div className="mt-10 lg:mt-14 border-y border-[color:var(--rule)]">
            <div className="grid grid-cols-3 divide-x divide-[color:var(--rule)]">
              <div className="px-6 py-7 text-center">
                <p className="t-mono-label text-[color:var(--text-secondary)]">
                  PER KEYSTROKE
                </p>
              </div>
              <div className="px-6 py-7 text-center">
                <p className="t-mono-label text-[color:var(--text-secondary)]">
                  200MS WINDOW
                </p>
              </div>
              <div className="px-6 py-7 text-center">
                <p className="t-mono-label text-[color:var(--text-secondary)]">
                  NO BLOCKING WAIT
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cover Plate (§2.10) — privacy chapter divider ── */}
        <CoverPlate number="07" total="09" title="Trust" />

        {/* ── 07 Trust ── */}
        <section data-section data-reveal id="trust" className="py-12 lg:py-20">
          <SectionLabel
            number="07"
            label="Trust"
            title="Privacy was the whole product"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body lede text-[color:var(--text-secondary)]">
                Recall captures everything. That only works if people trust where the
                data sits, who can see it, and what control they actually have.
              </p>
              <p className="t-body">
                On-device processing wasn&apos;t optional. All capture, all indexing, all
                retrieval happened locally. Nothing left the machine.
              </p>
              <p className="t-body">
                After public scrutiny, things changed. Recall flipped from opt-out to
                opt-in. Users got the ability to exclude apps and pause indexing.
              </p>
              <p className="t-body">
                We made those boundaries tangible. Cards showed where results came from
                and when. Excluded content got explicit explanation instead of silent
                gaps. Trust wasn&apos;t a single setting. It lived in every interaction.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <SpecSheet rows={TRUST_PRINCIPLES} />
          </div>
        </section>

        {/* ── 08 Constraints ── Pull-quote Interlude (§2.11) ── */}
        <section data-section data-reveal id="constraints" className="py-12 lg:py-20">
          <SectionLabel
            number="08"
            label="Constraints"
            title="We killed RAG to keep search fast"
          />

          {/* Single short setup paragraph */}
          <p className="mt-10 t-body max-w-[68ch]">
            Early on we explored RAG synthesis across screenshots, but latency broke
            the core expectation that search should feel instantaneous. We abandoned
            synthesis for speed and legibility — surface relevant moments, let people
            interpret them.
          </p>

          {/* Pull-quote — promoted from § 08 Margin */}
          <div className="mt-10 lg:mt-14 py-12 lg:py-20 border-y border-[color:var(--rule)]">
            <blockquote className="max-w-[68ch]">
              <p className="t-display-l text-[color:var(--text-primary)]">
                The system helps people rediscover what they saw. It doesn&rsquo;t
                rewrite their history for them.
              </p>
              <footer className="t-mono-caption mt-8 text-[color:var(--text-tertiary)]">
                Cf. § 08 / CONSTRAINTS
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ── 09 Impact ── */}
        <section data-section data-reveal id="impact" className="py-12 lg:py-20">
          <SectionLabel
            number="09"
            label="Impact"
            title="From rediscovery to reference pattern"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Separating visual and text matches proved it wasn&apos;t just philosophy.
                In testing, users could explain why each result appeared and quickly
                reject things that didn&apos;t fit. Mysterious AI behavior became
                rational.
              </p>
              <p className="t-body">
                People recovered information they&apos;d written off as lost. A code
                snippet they saw once in documentation. Files from months ago they&apos;d
                forgotten existed.
              </p>
              <p className="t-body">
                The work rippled further. Privacy and trust patterns from Recall became
                reference points across Windows teams.
              </p>
              <p className="t-body">
                The search approach itself became foundational. Principles of relevance
                transparency and match-type separation showed up in Windows Search and
                File Explorer updates.
              </p>
            </div>
            <Margin anchor="9-pull">
              Recall proved that AI in core OS features doesn&rsquo;t require opacity or
              experimental disclaimers. Clear transparency, visible provenance,
              predictable interactions.
            </Margin>
          </div>
          <div className="mt-12">
            <Telemetry
              items={[
                { value: "Copilot+", unit: "DEVICES", label: "Local intelligence required for on-device indexing" },
                { value: "2",        unit: "TEAMS",   label: "Windows Search and File Explorer adopting the patterns" },
                { value: "2",        unit: "YEARS",   label: "Shipping cycle, including privacy redesign" },
              ]}
            />
          </div>
        </section>
      </main>
      <ManualFooter rev="2.4" />
    </ManualShell>
  )
}

import Image from "next/image"
import { ManualShell } from "./ManualShell"
import {
  SectionLabel,
  SpecSheet,
  Figure,
  Telemetry,
  Margin,
  TopBar,
  ManualFooter,
  CoverPlate,
} from "@/components/manual"
import { Fig1_1 } from "./svg/Fig1_1"
import { Fig9_1 } from "./svg/Fig9_1"

// Listed in descending order to match the Figma stack (04 at top → 01 at bottom).
const PIPELINE_STAGES = [
  {
    label: "04 · SEARCH & INDEX SERVICE",
    value:
      "Stores enriched content in a semantic index and retrieves it by matching the meaning of a query against similarity scores — finding the right files even when the exact words don't match.",
  },
  {
    label: "03 · MEANING ANALYSIS",
    value:
      "Interprets raw extracted text by running meaning analysis to identify concepts and intent, then maps those concepts to semantic vectors for downstream understanding.",
  },
  {
    label: "02 · OCR PROCESSING",
    value:
      "Converts raw image input into structured text by straightening and denoising the image, identifying characters through optical recognition, and reconstructing the output into formatted, flowing text.",
  },
  {
    label: "01 · SCREENSHOT CAPTURE",
    value:
      "Continuously monitors and captures the screen at intervals, saving raw visual snapshots as the source material that enters the processing pipeline.",
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
      <TopBar />

      <main className="container">
        {/* ── 00 Overview / Hero ── */}
        <section data-section id="overview" className="pt-12 lg:pt-24 pb-16">
          <p className="t-mono-label mb-10">§ 00 / WINDOWS RECALL</p>
          <h1 className="t-display-xl max-w-[18ch]">
            Designing semantic search for everything you&apos;ve seen
          </h1>
          <Figure
            number="0.1"
            caption="Recall on the Windows desktop — semantic search surfaced as moments, not documents"
            src="/images/recall/hero-demo.png"
            alt="Recall app on a Windows desktop, search results page with multiple match cards"
            width={1024}
            height={405}
            priority
          />
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
          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 max-w-[60ch]">
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
            <div className="flex items-center justify-center">
              <Image
                src="/images/recall/context-memory-grid.png"
                alt="Recall mark on a faint capture grid"
                width={675}
                height={526}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto max-w-[600px]"
              />
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

          <p className="t-mono-label mt-10 lg:mt-14 text-[color:var(--text-tertiary)]">
            RECALL QUERY LIFECYCLE
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-10 lg:gap-16 items-start mt-8 lg:mt-12">
            <ol className="flex flex-col gap-10 lg:gap-14">
              {PIPELINE_STAGES.map((s) => (
                <li key={s.label} className="flex flex-col gap-2">
                  <p className="t-mono-label text-[color:var(--text-secondary)]">
                    {s.label}
                  </p>
                  <p className="t-mono-caption text-[color:var(--text-tertiary)] leading-relaxed">
                    {s.value}
                  </p>
                </li>
              ))}
            </ol>
            <div className="flex items-center justify-center">
              <Image
                src="/images/recall/system-query-lifecycle.png"
                alt="Isometric exploded view of the Recall query lifecycle — four stages stacked from Search & Index Service down to Screenshot Capture"
                width={482}
                height={741}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto max-w-[520px]"
              />
            </div>
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
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_649px] gap-6 lg:gap-10 items-start">
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
            <Figure
              number="4.1"
              caption="Card hierarchy — screenshot anchored, metadata secondary"
              src="/images/recall/cards-card-hierarchy.png"
              alt="Six Recall cards in a 3-by-2 grid — each anchored on a desktop screenshot with timestamp and app metadata secondary"
              width={1653}
              height={869}
              className="my-0"
            />
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
            </div>
            <Margin anchor="5-pull">
              Perfection wasn&rsquo;t the goal. Legibility was.
            </Margin>
          </div>
          <Figure
            number="5.1"
            caption="Card grid — text and visual match signals separated on every card"
            src="/images/recall/transparency-card-grid.png"
            alt="Recall search results for the query 'Catering' — match cards labeled with source app and match-type signals"
            width={1120}
            height={702}
            cf={{ section: "03", href: "#problem" }}
          />
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

        {/* ── 09 Impact ── Annotated Split Plate (§2.4) + Strip Break Telemetry (§2.9) ── */}
        <section data-section data-reveal id="impact" className="py-12 lg:py-20">
          <SectionLabel
            number="09"
            label="Impact"
            title="From rediscovery to reference pattern"
          />
          <div className="mt-10 border border-[color:var(--rule)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] space-y-6">
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
              <Margin anchor="9-pull" className="my-0">
                Recall proved that AI in core OS features doesn&rsquo;t require opacity or
                experimental disclaimers. Clear transparency, visible provenance,
                predictable interactions.
              </Margin>
            </div>
            <div className="p-6 lg:p-10 flex items-start">
              <Figure
                number="9.1"
                caption="Pattern propagation — Recall search principles adopted across Windows Search and File Explorer"
                className="my-0"
              >
                <Fig9_1 />
              </Figure>
            </div>
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
      <ManualFooter />
    </ManualShell>
  )
}

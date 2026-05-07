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
  HeroIntro,
  NextProject,
} from "@/components/manual"

// Listed in descending order to match the Figma stack (04 at top → 01 at bottom).
const PIPELINE_STAGES = [
  {
    label: "04 · SEARCH & INDEX SERVICE",
    value:
      "Stores enriched content in a semantic index and retrieves it by matching the meaning of a query against similarity scores, finding the right files even when the exact words don't match.",
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
          <HeroIntro
            static
            eyebrow="§ 00 / WINDOWS RECALL"
            eyebrowClassName="t-mono-label text-[color:var(--text-tertiary)] mb-10"
            lines={[
              {
                text: "Designing semantic search for everything you’ve seen.",
                className: "t-display-xl max-w-[18ch]",
              },
            ]}
          />
          <Figure
            number="0.1"
            caption="Recall on the Windows desktop. Semantic search surfaced as moments, not documents."
          >
            <div className="relative w-full overflow-hidden aspect-[16/9] sm:aspect-[2/1] lg:aspect-[1120/442]">
              <Image
                src="/images/recall/hero-demo.png"
                alt="Recall app on a Windows desktop, search results page with multiple match cards"
                fill
                priority
                sizes="(min-width: 1280px) 1024px, 100vw"
                className="object-cover object-bottom"
              />
            </div>
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
              { label: "MY FOCUS", value: "Semantic search experience: ranking, relevance, and trust" },
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
            <div className="flex flex-col gap-4 max-w-[60ch]">
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
                src="/images/recall/context-recall-icon.png"
                alt="Recall mark. A glowing blue rotating-arrow glyph centered on a faint capture grid."
                width={880}
                height={821}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto max-w-[560px]"
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

          <p
            className="t-mono-label text-[color:var(--text-tertiary)]"
            style={{ marginTop: "clamp(48px, 5vw, 64px)" }}
          >
            RECALL QUERY LIFECYCLE
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-10 lg:gap-16 items-stretch mt-4 lg:mt-6">
            <ol className="flex flex-col gap-10 lg:gap-0 lg:justify-between lg:py-8">
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
                alt="Isometric exploded view of the Recall query lifecycle. Four stages stacked from Search & Index Service down to Screenshot Capture."
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
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] flex flex-col gap-6">
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
            <div className="p-6 lg:p-10 flex items-center justify-center">
              <Image
                src="/images/recall/problem-opentable.png"
                alt="Gmail showing an OpenTable reservation confirmation, with extracted Recall chips below: reservation, The Front Room, July 16 2023, OpenTable, Menu, Confirmation 25564, Portland ME"
                width={486}
                height={538}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="w-full h-auto max-w-[480px]"
              />
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
          <blockquote className="max-w-[68ch]">
            <p
              id="problem-interlude-quote"
              className="t-display-l text-[color:var(--text-primary)]"
            >
              Relevance wasn&rsquo;t a fixed property of the result. It was shaped
              by the task.
            </p>
          </blockquote>
        </aside>

        {/* ── 04 Cards ── Two-up Comparison Plate (§2.6) ── */}
        <section data-section data-reveal id="cards" className="py-12 lg:py-20">
          <SectionLabel
            number="04"
            label="Cards"
            title="Cards as moments, not documents"
          />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[649px_1fr] gap-6 lg:gap-10 items-start">
            <Image
              src="/images/recall/cards-card-hierarchy.png"
              alt="Six Recall cards in a 3-by-2 grid. Each anchored on a desktop screenshot with timestamp and app metadata secondary."
              width={3056}
              height={1606}
              sizes="(min-width: 1024px) 649px, 100vw"
              className="w-full h-auto"
            />
            <div className="flex flex-col gap-4 max-w-[68ch]">
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
        </section>

        {/* ── 05 Transparency ── */}
        <section data-section data-reveal id="transparency" className="py-12 lg:py-20">
          <SectionLabel
            number="05"
            label="Transparency"
            title="AI-powered search has a trust problem"
          />
          <div className="section-grid mt-10">
            <div className="flex flex-col gap-4 max-w-[68ch]">
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
          <Image
            src="/images/recall/transparency-card-grid.png"
            alt="Recall search results for the query 'Catering'. Match cards labeled with source app and match-type signals."
            width={1641}
            height={881}
            sizes="100vw"
            className="w-full h-auto mt-10 lg:mt-14"
          />
        </section>

        {/* ── 06 Cards (continued) ── Body + full-width Figure ── */}
        <section data-section data-reveal id="clarity" className="py-12 lg:py-20">
          <SectionLabel
            number="06"
            label="Cards"
            title="Merged results killed clarity"
          />
          <div className="mt-10 lg:mt-14 flex flex-col gap-4 max-w-[68ch]">
            <p className="t-body">
              First version blended everything. Text matches and visual matches went
              into one ranked list. Clean, elegant, simple.
            </p>
            <p className="t-body">
              Testing proved it didn&apos;t work. Text matches dominated the ranking.
              Visual matches got buried. Users couldn&apos;t figure out why something
              appeared.
            </p>
            <p className="t-body">
              We split text and visual matches into separate sections. That single
              structural change made the system&apos;s logic transparent. Cognitive load
              dropped. Trust went up.
            </p>
            <p className="t-body">
              The AI was technically correct even in the first version. But opaque
              correctness erodes trust faster than transparent mistakes.
            </p>
          </div>
          <div className="mt-10 lg:mt-14">
            <Image
              src="/images/recall/clarity-results-grid.png"
              alt="Recall search results for ‘Presentation with a red barn’. Visual matches separated into a 4×3 grid of close-match cards with source domains and timestamps."
              width={1024}
              height={550}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* ── 07 Performance ── Pull-quote Interlude (§2.11) + Strip Break (§2.9) ── */}
        <section data-section data-reveal id="performance" className="py-12 lg:py-20">
          {/* Pull-quote — epigraph above the SectionLabel, sets up the section. */}
          <blockquote className="max-w-[68ch] mb-12 lg:mb-16">
            <p className="t-display-l text-[color:var(--text-primary)]">
              We made waiting feel like progress.
            </p>
          </blockquote>

          <SectionLabel
            number="07"
            label="Performance"
            title="Fast enough to feel alive"
          />

          {/* One-line caption beneath the SectionLabel rule */}
          <p className="mt-8 t-body-sm max-w-[68ch] text-[color:var(--text-secondary)]">
            Embedding indexing is computationally heavy, so we tuned retrigger cadence
            to refine results per keystroke without ever blocking the user.
          </p>

          {/* Top-pinned video — fills full section width, bottom crops */}
          <div className="mt-10 lg:mt-14 relative w-full aspect-[16/9] max-h-[520px] overflow-hidden bg-[color:var(--ink)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-top"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recall_fig05-JAHG0aeAytDorw718qnZiWG2n09om9.mp4"
            />
          </div>

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
        <CoverPlate number="08" total="09" title="Trust" />

        {/* ── 08 Trust ── */}
        <section data-section data-reveal id="trust" className="py-12 lg:py-20">
          <SectionLabel
            number="08"
            label="Trust"
            title="Privacy was the whole product"
          />
          {/* Body left, privacy screenshots stacked right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 mt-10 items-start">
            <div className="flex flex-col gap-4 max-w-[68ch]">
              <p className="t-body lede text-[color:var(--text-secondary)]">
                Recall captures everything. That only works if people trust where the
                data sits, who can see it, and what control they actually have.
              </p>
              <p className="t-body">
                On-device processing wasn&apos;t optional. All capture, all indexing, all
                retrieval happened locally. Nothing left the machine.
              </p>
              <p className="t-body">
                When public scrutiny hit, we made the call to flip Recall from opt-out
                to opt-in, ship per-app exclusion, and give users a pause control. I
                owned the IA for the new privacy surface.
              </p>
              <p className="t-body">
                We made those boundaries tangible. Cards showed where results came from
                and when. Excluded content got explicit explanation instead of silent
                gaps. Trust wasn&apos;t a single setting. It lived in every interaction.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <Image
                src="/images/recall/trust-sensitive-content.png"
                alt="Recall card menu showing sensitive content (a credit-card snapshot from Fidelity) with a Delete snapshot action"
                width={1030}
                height={722}
                sizes="(min-width: 1024px) 360px, 100vw"
                className="w-full h-auto"
              />
              <Image
                src="/images/recall/trust-delete-snapshot.png"
                alt="Snapshot removed confirmation modal with an option to update Recall capture settings to block specific apps and websites"
                width={1820}
                height={1464}
                sizes="(min-width: 1024px) 360px, 100vw"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="mt-12">
            <SpecSheet rows={TRUST_PRINCIPLES} />
          </div>
        </section>

        {/* ── 09 Constraints ── Pull-quote Interlude (§2.11) ── */}
        <section data-section data-reveal id="constraints" className="py-12 lg:py-20">
          <SectionLabel
            number="09"
            label="Constraints"
            title="We killed RAG to keep search fast"
          />

          {/* Single short setup paragraph */}
          <p className="mt-10 t-body max-w-[68ch]">
            Early on we explored RAG synthesis across screenshots, but latency broke
            the core expectation that search should feel instantaneous. We abandoned
            synthesis for speed and legibility. Surface relevant moments, let people
            interpret them.
          </p>

          {/* Full-size video — RAG synthesis vs. fast retrieval, no cropping */}
          <div className="mt-10 lg:mt-14 relative w-full border border-[color:var(--rule)] bg-[color:var(--ink)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="block w-full h-auto"
              src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/shilpa_0603_03%201.mp4"
            />
          </div>

          {/* Pull-quote — promoted from § 08 Margin */}
          <div className="mt-10 lg:mt-14 py-12 lg:py-20 border-y border-[color:var(--rule)]">
            <blockquote className="max-w-[68ch]">
              <p className="t-display-l text-[color:var(--text-primary)]">
                The system helps people rediscover what they saw. It doesn&rsquo;t
                rewrite their history for them.
              </p>
            </blockquote>
          </div>
        </section>

        {/* ── 10 Impact ── Annotated Split Plate (§2.4) + Strip Break Telemetry (§2.9) ── */}
        <section data-section data-reveal id="impact" className="py-12 lg:py-20">
          <SectionLabel
            number="10"
            label="Impact"
            title="From rediscovery to reference pattern"
          />
          <div className="mt-10 border border-[color:var(--rule)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] flex flex-col gap-6">
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
              <Margin anchor="10-pull" className="my-0">
                Recall proved that AI in core OS features doesn&rsquo;t require opacity or
                experimental disclaimers. Clear transparency, visible provenance,
                predictable interactions.
              </Margin>
            </div>
            <div className="p-6 lg:p-10 flex items-start">
              <Figure
                number="10.1"
                caption="Recall announcement"
                src="/images/recall/impact-keynote.png"
                alt="Recall introduced on stage at Build. System architecture diagram (Screen Region Detector, Optical Character Recognition, Parser, Text Encoder, Image Encoder) framing the Recall pill."
                width={358}
                height={210}
                className="my-0 w-full"
              />
            </div>
          </div>
          <div className="mt-12">
            <Telemetry
              items={[
                { value: "Copilot+", unit: "DEVICES",         label: "Local intelligence required for on-device indexing" },
                { value: "WS + FE",  unit: "TEAMS ADOPTING",  label: "Windows Search and File Explorer adopting the patterns" },
                { value: "2",        unit: "YEARS",           label: "Shipping cycle, including privacy redesign" },
              ]}
            />
          </div>
        </section>
      </main>
      <NextProject href="/teams-for-education" title="Teams for Education" />
      <ManualFooter />
    </ManualShell>
  )
}

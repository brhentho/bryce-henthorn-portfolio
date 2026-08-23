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
  LoopingMedia,
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

function RecallPipelineAmbient() {
  return (
    <div
      className="recall-pipeline-ambient"
      role="img"
      aria-label="Recall pipeline: screen capture becomes text, meaning, and a searchable semantic index."
    >
      {["CAPTURE", "OCR", "MEANING", "INDEX"].map((stage, index) => (
        <span key={stage}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span>{stage}</span>
        </span>
      ))}
    </div>
  )
}

function RecallTrustAmbient() {
  return (
    <div
      className="recall-trust-ambient"
      role="img"
      aria-label="Recall trust boundary: capture and indexing stay on device under explicit user control."
    >
      <div aria-hidden="true">
        <span>CAPTURE</span>
        <span>INDEX</span>
      </div>
      <div className="recall-trust-boundary" aria-hidden="true">
        <span>ON DEVICE</span>
        <span>USER CONTROL</span>
      </div>
      <div aria-hidden="true">
        <span>PAUSE</span>
        <span>EXCLUDE</span>
        <span>DELETE</span>
      </div>
    </div>
  )
}

export default function RecallPage() {
  return (
    <ManualShell>
      <TopBar />

      <main className="container">
        {/* ── 00 Overview / Hero ── */}
        <section data-section id="overview" className="pt-12 lg:pt-24 pb-16">
          <HeroIntro
            static
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
        <section
          data-section
          data-reveal
          id="context"
          className="recall-room recall-context-room py-16 lg:py-24"
        >
          <SectionLabel
            number="01"
            label="Context"
            title="Where was that thing I saw last week?"
          />
          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-4 max-w-[60ch]">
              <p className="t-body">
                You&apos;d seen a presentation, a snippet of code, or a reference in an
                email, but filenames and exact keywords could not retrieve a half-remembered
                moment. Recall aimed to make everything shown on screen searchable by
                meaning instead.
              </p>
              <p className="t-body">
                I led the semantic search experience: how people form queries, how results
                are ranked and displayed, and how relevance is explained. The technical
                system mattered, but the product only worked if people could understand and
                trust what it returned.
              </p>
            </div>
            <Figure
              number="1.1"
              caption="Recall mark. Continuous capture resolved into a searchable moment."
              className="my-0 lg:my-0"
            >
              <Image
                src="/images/recall/context-recall-icon.png"
                alt="Recall mark. A glowing blue rotating-arrow glyph centered on a faint capture grid."
                width={880}
                height={821}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto max-w-[560px]"
              />
            </Figure>
          </div>
        </section>

        {/* ── Cover Plate (§2.10) — chapter divider into System ── */}
        <CoverPlate
          number="02"
          total="09"
          title="System"
          ambient={<RecallPipelineAmbient />}
          className="recall-system-cover"
        />

        {/* ── 02 System ── Stage Rail Plate (§2.5) ── */}
        <section
          data-section
          data-reveal
          data-reveal-role="stage-rail"
          id="system"
          className="recall-room recall-system-room py-16 lg:py-24"
        >
          <div className="relative z-10">
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
            <div className="mt-4 grid grid-cols-1 items-stretch gap-10 lg:mt-6 lg:grid-cols-[18rem_1fr] lg:gap-16">
              <ol className="recall-system-rail flex flex-col gap-10 lg:justify-between lg:gap-0 lg:py-8">
                {PIPELINE_STAGES.map((s) => (
                  <li key={s.label} className="flex flex-col gap-2">
                    <p className="t-mono-label text-[color:var(--text-secondary)]">
                      {s.label}
                    </p>
                    <p className="t-mono-caption leading-relaxed text-[color:var(--text-tertiary)]">
                      {s.value}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="recall-system-figure flex items-center justify-center">
                <Image
                  src="/images/recall/system-query-lifecycle.png"
                  alt="Isometric exploded view of the Recall query lifecycle. Four stages stacked from Search & Index Service down to Screenshot Capture."
                  width={482}
                  height={741}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full max-w-[520px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 Problem ── Annotated Split Plate (§2.4) ── */}
        <section
          data-section
          data-reveal
          id="problem"
          className="recall-room recall-problem-room py-16 lg:py-24"
        >
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
          className="my-12 lg:my-20 py-16 lg:py-24"
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
        <section
          data-section
          data-reveal
          id="cards"
          className="recall-room recall-cards-room py-16 lg:py-24"
        >
          <SectionLabel
            number="04"
            label="Cards"
            title="Cards as moments, not documents"
          />
          <div className="mt-10 lg:mt-14 flex flex-col gap-4 max-w-[68ch]">
            <p className="t-body">
              We built around the screenshot as the primary anchor. Not a cropped asset
              preview, but the actual desktop as it appeared. That context is what lodges
              in memory.
            </p>
            <p className="t-body">
              App name, timestamp, and extracted text stayed visible but secondary. The
              hierarchy shifted the result from &ldquo;found document&rdquo; to
              &ldquo;revisited moment&rdquo; while keeping the system predictable enough to
              search.
            </p>
          </div>
          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <Figure number="4.1" className="my-0 lg:my-0">
              <Image
                src="/images/recall/cards-card-hierarchy.png"
                alt="Six Recall cards in a 3-by-2 grid. Each is anchored on a desktop screenshot, with timestamp and app metadata secondary."
                width={3056}
                height={1606}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="block w-full h-auto"
              />
            </Figure>
            <Figure number="4.2" className="my-0 lg:my-0">
              <Image
                src="/images/recall/clarity-results-grid.png"
                alt="Recall search results for Presentation with a red barn, with visual matches separated into a grid of close-match cards."
                width={1024}
                height={550}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="block w-full h-auto"
              />
            </Figure>
          </div>
          <div className="mt-4 pt-3 border-t border-[color:var(--rule)]">
            <p className="t-mono-caption text-[color:var(--text-secondary)]">
              CARD HIERARCHY / SEPARATED RESULTS &middot; SCREENSHOT AS MEMORY ANCHOR,
              METADATA AS PROVENANCE.
            </p>
            <p className="mt-2 t-body-sm max-w-[68ch] text-[color:var(--text-secondary)]">
              Testing showed that one merged ranking buried visual matches, so we separated
              text and visual results. Opaque correctness erodes trust faster than
              transparent mistakes.
            </p>
          </div>
        </section>

        {/* ── 05 Transparency ── */}
        <section
          data-section
          data-reveal
          id="transparency"
          className="recall-room recall-transparency-room py-16 lg:py-24"
        >
          <SectionLabel
            number="05"
            label="Transparency"
            title="AI-powered search has a trust problem"
          />
          <div className="section-grid mt-10">
            <div className="flex flex-col gap-4 max-w-[68ch]">
              <p className="t-body">
                Technically correct results can still feel wrong. Rather than hide every
                false positive at the model layer, we made each result explain itself.
              </p>
              <p className="t-body">
                Cards labeled text and visual matches explicitly, then showed source app
                and time. Visible provenance let people judge relevance instead of asking
                them to trust an opaque score.
              </p>
            </div>
            <Margin anchor="5-pull">
              Perfection wasn&rsquo;t the goal. Legibility was.
            </Margin>
          </div>
          <Figure
            number="5.1"
            caption="Result cards expose source and match type so relevance can be judged, not assumed."
          >
            <Image
              src="/images/recall/transparency-card-grid.png"
              alt="Recall search results for the query Catering. Match cards are labeled with source app and match-type signals."
              width={1641}
              height={881}
              sizes="100vw"
              className="w-full h-auto"
            />
          </Figure>
        </section>

        {/* ── 06 Performance ── Pull-quote Interlude (§2.11) + Strip Break (§2.9) ── */}
        <section
          data-section
          data-reveal
          id="performance"
          className="recall-room recall-performance-room py-16 lg:py-24"
        >
          {/* Pull-quote — epigraph above the SectionLabel, sets up the section. */}
          <blockquote className="max-w-[68ch] mb-12 lg:mb-16">
            <p className="t-display-l text-[color:var(--text-primary)]">
              We made waiting feel like progress.
            </p>
          </blockquote>

          <SectionLabel
            number="06"
            label="Performance"
            title="Fast enough to feel alive"
          />

          {/* One-line caption beneath the SectionLabel rule */}
          <p className="mt-8 t-body-sm max-w-[68ch] text-[color:var(--text-secondary)]">
            Embedding indexing is computationally heavy, so we tuned retrigger cadence
            to refine results per keystroke without ever blocking the user.
          </p>

          <Figure
            number="6.1"
            caption="Semantic results refine with each keystroke without blocking input."
          >
            <LoopingMedia
              className="w-full aspect-[16/9] max-h-[520px] overflow-hidden"
              videoClassName="w-full h-full object-cover object-top"
              label="Recall refining semantic search results as the query changes"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recall_fig05-JAHG0aeAytDorw718qnZiWG2n09om9.mp4"
            />
          </Figure>

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
        <CoverPlate
          number="07"
          total="09"
          title="Trust"
          ambient={<RecallTrustAmbient />}
          className="recall-trust-cover"
        />

        {/* ── 07 Trust ── */}
        <section
          data-section
          data-reveal
          id="trust"
          className="recall-room recall-trust-room py-16 lg:py-24"
        >
          <div className="relative z-10">
            <SectionLabel
              number="07"
              label="Trust"
              title="Privacy was the whole product"
            />
            <div className="mt-10 flex max-w-[68ch] flex-col gap-4">
              <p className="t-body">
                Recall only works if people trust where captured data sits and what control
                they retain. Capture, indexing, and retrieval stayed on-device.
              </p>
              <p className="t-body">
                After public scrutiny, we moved from opt-out to opt-in, added per-app
                exclusion and pause controls, and made deletion boundaries explicit. I owned
                the information architecture for that privacy surface.
              </p>
            </div>
            <div className="recall-trust-figure">
              <Figure
                number="7.1"
                caption="Deletion and capture settings form one recovery path: remove the moment, then prevent recurrence."
              >
                <div className="grid grid-cols-1 gap-px bg-[color:var(--rule)] lg:grid-cols-2">
                  <Image
                    src="/images/recall/trust-sensitive-content.png"
                    alt="Recall card menu showing sensitive content (a credit-card snapshot from Fidelity) with a Delete snapshot action"
                    width={1030}
                    height={722}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-full w-full bg-[color:var(--ink)] object-contain"
                  />
                  <Image
                    src="/images/recall/trust-delete-snapshot.png"
                    alt="Snapshot removed confirmation modal with an option to update Recall capture settings to block specific apps and websites"
                    width={1820}
                    height={1464}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-full w-full bg-[color:var(--ink)] object-contain"
                  />
                </div>
              </Figure>
            </div>

            <div className="recall-trust-principles mt-12">
              <SpecSheet rows={TRUST_PRINCIPLES} />
            </div>
          </div>
        </section>

        {/* ── 08 Constraints ── Pull-quote Interlude (§2.11) ── */}
        <section
          data-section
          data-reveal
          id="constraints"
          className="recall-room recall-constraints-room py-16 lg:py-24"
        >
          <SectionLabel
            number="08"
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

          <Figure
            number="8.1"
            caption="Fast retrieval preserved the direct relationship between a query and the moments it surfaced."
          >
            <LoopingMedia
              label="Recall comparing synthesized answers with fast moment retrieval"
              src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/shilpa_0603_03%201.mp4"
            />
          </Figure>

          {/* Pull-quote — promoted from § 08 Margin */}
          <div className="mt-10 py-12 lg:mt-14 lg:py-20">
            <blockquote className="max-w-[68ch]">
              <p className="t-display-l text-[color:var(--text-primary)]">
                The system helps people rediscover what they saw. It doesn&rsquo;t
                rewrite their history for them.
              </p>
            </blockquote>
          </div>
        </section>

        {/* ── 09 Impact ── Annotated Split Plate (§2.4) + Strip Break Telemetry (§2.9) ── */}
        <section
          data-section
          data-reveal
          id="impact"
          className="recall-room recall-impact-room py-16 lg:py-24"
        >
          <SectionLabel
            number="09"
            label="Impact"
            title="From rediscovery to reference pattern"
          />
          <div className="mt-10 max-w-[68ch] [&>p+p]:mt-4!">
            <p className="t-body">
              In testing, people could explain why each result appeared, reject what did
              not fit, and recover information they had written off as lost. Visible
              provenance turned mysterious AI behavior into something rational.
            </p>
            <p className="t-body">
              The work shipped at Build 2024, then its privacy patterns, relevance
              transparency, and match-type separation became reference points for Windows
              Search and File Explorer.
            </p>
            <Margin anchor="9-pull" className="my-0">
              Recall proved that AI in core OS features doesn&rsquo;t require opacity or
              experimental disclaimers. Clear transparency, visible provenance,
              predictable interactions.
            </Margin>
          </div>
          <Figure
            number="9.1"
            caption="Recall announcement"
            src="/images/recall/impact-keynote.png"
            alt="Recall introduced on stage at Build. System architecture diagram (Screen Region Detector, Optical Character Recognition, Parser, Text Encoder, Image Encoder) framing the Recall pill."
            width={358}
            height={210}
          />
          <div className="mt-12">
            <Telemetry
              variant="quiet"
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

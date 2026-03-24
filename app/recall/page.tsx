"use client"

import Image from "next/image"
import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyCallout,
} from "@/components/case-study-layout"
import { Container } from "@/components/container"
import { AnimateIn } from "@/components/animate-in"
import { FigurePanel, DiagramPlaceholder } from "@/components/figure-panel"

const specs = [
  { label: "Role", value: "Senior UX Designer" },
  { label: "Platform", value: "Windows / Copilot+ PCs" },
  { label: "Focus", value: "Semantic search and memory retrieval" },
  { label: "Challenge", value: "Traditional search doesn't match human memory" },
  { label: "Solution", value: "Visual memory cards with progressive disclosure controls" },
  { label: "Impact", value: "Improved comprehension, trust, and task recovery" },
]

const navItems = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "card-design", label: "Card Design" },
  { id: "card-relevance", label: "Why It Appeared" },
  { id: "early-iteration", label: "Early Iteration" },
  { id: "performance", label: "Performance" },
  { id: "trust", label: "Trust" },
  { id: "constraints", label: "Constraints & Tradeoffs" },
  { id: "impact", label: "Impact" },
]

const recallHero = (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ backgroundColor: "#080a10" }}>
    {/* Layer 1: Faint messy desk background */}
    <Image
      src="/images/projects/u9563819146_A_home_office_desk_with_a_computer_monitor_displa_9f40e7fb-6f59-42d7-ae72-2a94bf7af410_2.png"
      alt=""
      fill
      className="object-cover opacity-[0.08]"
      style={{ filter: "grayscale(0.8)" }}
      aria-hidden="true"
    />

    {/* Layer 2: Blue radial glow behind right column */}
    <div
      className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
      style={{ background: "rgba(59,130,246,0.10)" }}
      aria-hidden="true"
    />

    {/* Layer 3: Dim dot grid */}
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(240,240,243,0.06) 1.5px, transparent 1.5px)",
        backgroundSize: "40px 40px",
        backgroundPosition: "20px 20px",
      }}
    />

    {/* Layer 4: Bottom fade */}
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none" aria-hidden="true" />

    {/* Content: 2-column with blue accents */}
    <Container className="relative z-10 pt-20 md:pt-24 pb-16">
      <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] lg:items-center gap-10 lg:gap-12">
        {/* Left: text */}
        <div className="min-w-0">
          <AnimateIn delay={0.05}>
            <p className="text-sm font-sans font-medium text-blue-400 mb-4 tracking-wide">
              Windows Recall
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground text-balance">
              Semantic search for everything you{"'"}ve seen
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="flex flex-wrap gap-2 mt-5">
              {["Trust + privacy", "Systems thinking", "Windows", "Senior Designer", "2024"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-sans font-medium text-foreground-tertiary bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* Right: semantic exploded-view diagram */}
        <AnimateIn delay={0.25} className="min-w-0">
          <Image
            src="/images/projects/recall-fig02.png"
            alt="Semantic layer exploded view showing how Recall extracts meaning from screenshots through visual and text understanding"
            width={1600}
            height={900}
            className="w-full h-auto rounded-xl border border-white/10"
            style={{ boxShadow: "0 0 60px rgba(59,130,246,0.15), 0 4px 30px rgba(0,0,0,0.4)" }}
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        </AnimateIn>
      </div>
    </Container>
  </section>
)

export default function RecallPage() {
  return (
    <CaseStudyLayout
      productName="Windows Recall"
      title="Semantic search for everything you've seen"
      tags={["Trust + privacy", "Systems thinking", "Windows", "Senior Designer", "2024"]}
      heroContent={recallHero}
      specs={specs}
      navItems={navItems}
      nextProject={{ name: "Agents in Windows", href: "/agents-in-windows" }}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>What if your computer could remember everything you{"'"}ve seen?</CaseStudyHeading>
        <CaseStudyParagraph>
          Recall began with the bold idea of solving an age-old problem: Where was that presentation I saw with the blue background?
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Recall was an on-device system that continuously captured what appeared on screen and made them searchable through semantic understanding. From the beginning, we knew the challenge was not only technical but also raises concerns about privacy and control. The design problem was to create a system that felt intelligent without feeling invasive. The feature would only succeed if users understood it, but more importantly, trusted it.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          My role focused specifically on owning the semantic search experience: how users search their memories using only the clues that they remember.
        </CaseStudyParagraph>
        <FigurePanel caption="Building a memory graph from everything you've seen on screen" src="/images/projects/Intro - 127.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>Traditional search expects precision. Human memory does not.</CaseStudyHeading>
        <CaseStudyParagraph>
          Finding something you{"'"}ve already seen on your computer should be easy. In reality, it{"'"}s often frustrating.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Traditional search systems are built around exact matches—file names, locations, keywords. But that{"'"}s not how people remember. When trying to recall something, users think in fragments: a chart they saw last week, a document with a specific layout, a sentence they vaguely remember reading. That mismatch forces users into a trial-and-error process of guessing keywords, opening files, and retracing steps.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Recall introduced a new model: a memory layer that continuously captures what appears on screen and makes it searchable through semantic understanding. Under the hood, screenshots are processed on-device using OCR and text extraction to build an index of both visual and textual content across everything the user has seen.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This created a new design problem. If the system is indexing everything, how do you let users search it in a way that feels natural, not overwhelming? How do you translate a complex pipeline of screenshots, text extraction, and semantic matching into an experience that aligns with how people actually remember?
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The goal was to close that gap. Instead of asking users to think like a system, the system needed to respond to how people think—letting them describe what they remember, even if it{"'"}s incomplete, and guiding them back to the right moment.
        </CaseStudyParagraph>
        <FigurePanel caption="Metadata extracted from Screen Understanding" src="/images/projects/0-2.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="card-design" label="Card Design">
        <CaseStudyHeading>Designing cards to represent moments, not files</CaseStudyHeading>
        <CaseStudyParagraph>
          Each Recall result card contained several signals: a screenshot, associated application, timestamp, extracted text, and ranking data. Structuring that information was relatively straightforward from an information architecture perspective. The more subtle challenge was shaping how the card communicated what Recall actually was.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Recall is not file search. It is memory search.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          To reinforce that mental model, we anchored the design around the visual snapshot. The screenshot became the primary element, grounding the result in something the user had actually seen. Importantly, this wasn{"'"}t just a cropped asset or document preview—it often included the surrounding desktop context. That context helped users orient themselves in time. You might recognize a presentation you were working on in the background, a browser tab you had open, or the layout of your workspace from a specific moment. Those details made the memory feel real, not abstract.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Supporting metadata such as the application, timestamp, and extracted text remained visible but secondary. This hierarchy shifted the experience away from document retrieval and toward revisiting moments in time.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Interaction design required equal care. Selecting a card could lead to two outcomes: opening the Recall memory view for deeper exploration or restoring the original window where the activity occurred. These paths needed to feel predictable and intentional. Any ambiguity about what would happen on click would quickly erode trust.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The final design makes browsing Recall feel closer to scanning a visual timeline than navigating a traditional search results page.
        </CaseStudyParagraph>
        <FigurePanel caption="Separating match results and contextual clues of match type" src="/images/projects/recall-fig04.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>


      <CaseStudySection id="card-relevance" label="Why It Appeared">
        <CaseStudyHeading>Helping users understand why a result appeared</CaseStudyHeading>
        <CaseStudyParagraph>
          AI-powered search introduces a different challenge: results are sometimes technically correct but contextually wrong.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          A query like "blue chart spreadsheet" might return a screenshot from an unrelated application that simply contained a blue element. Visually similar, but semantically irrelevant. This is an inherent limitation of AI retrieval systems.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Rather than attempting to eliminate every false positive at the model layer, we focused on making the results understandable at the interface layer.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Each result card communicates why it matched. Some results are matched through extracted text. Others are matched through visual similarity. By separating and labeling these signals, users can quickly judge relevance themselves.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          A visual match that looks incorrect becomes easy to dismiss when users understand that the system matched on appearance rather than meaning. The interface provides enough context for users to close the gap between the model{"'"}s interpretation and their own intent.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The system does not need to be perfect. It needs to be legible.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Relevance transparency: visual vs. text match signal design" />
      </CaseStudySection>

      <CaseStudySection id="early-iteration" label="Early Iteration">
        <CaseStudyHeading>When everything was merged, clarity suffered</CaseStudyHeading>
        <CaseStudyParagraph>
          Our first result model blended text matches and visual matches into a single ranked list. In theory, this felt elegant. The system would simply determine the best match and display it at the top.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In practice, this created confusion. Text matches were usually more precise and therefore dominated the ranking. Visual matches, which often aligned more closely with what users remembered, were pushed lower. Users struggled to understand why certain results appeared. Without a clear explanation of relevance, even correct results felt questionable.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Through usability testing, it became clear that relevance needed to be legible. Users did not just want accurate results. They wanted to understand why a result was being shown.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We separated text-based matches and visual matches into distinct sections. This structural change made the system{"'"}s behavior easier to interpret. It reduced cognitive load and improved trust almost immediately. Instead of competing within one opaque ranking, each type of result had a clear place.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Even when the AI was technically correct, the experience felt opaque. Users could not tell why something appeared. That lack of explanation eroded confidence. The problem was no longer just ranking. It was legibility.
        </CaseStudyParagraph>
        <FigurePanel caption="Recall search with merged results" src="/images/projects/recall-fig03.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>


      <CaseStudySection id="performance" label="Performance">
        <CaseStudyHeading>Fast enough to feel alive</CaseStudyHeading>
        <CaseStudyParagraph>
          Recall relied on semantic embeddings and local indexing, both of which can be computationally intensive. While many queries returned instantly, there were moments—especially during initial indexing or under system load—where responses took longer.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Search needed to feel responsive, even when it wasn{"'"}t instantaneous. We designed a live-updating experience where results evolve with each keystroke, giving users a sense of momentum and intelligence as they type. Instead of waiting for a full query to resolve, the system continuously refines results in place.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          When latency did surface, the goal was to avoid it feeling like failure. Subtle motion and lightweight progress indicators signaled that the system was actively working, keeping the interface calm and composed rather than stalled or broken.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Balancing performance and experience required tight iteration between design and engineering. We refined how and when queries were sent based on real typing behavior, finding a rhythm that avoided over-triggering expensive searches while still feeling responsive. As models improved, the scope expanded. When constraints appeared, we adapted. The final experience reflects that constant negotiation between ambition and feasibility.
        </CaseStudyParagraph>
        <FigurePanel caption="Live search performance and loading states" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recall_fig05-JAHG0aeAytDorw718qnZiWG2n09om9.mp4" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="trust" label="Trust">
        <CaseStudyHeading>Trust as a design constraint, not a feature</CaseStudyHeading>
        <CaseStudyParagraph>
          Recall captures everything you see on your PC. That capability only works if users trust where that data lives, how it{"'"}s used, and what control they have over it.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          From the start, on-device processing was a non-negotiable constraint. All capture, indexing, and retrieval happen locally—nothing leaves the device. This wasn{"'"}t just a technical decision, it directly shaped the experience. It limited how much computation we could do in real time, influenced how results were ranked, and required the interface to clearly communicate what the system could and could not know.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          After public scrutiny, the privacy model evolved significantly. Recall moved from opt-out to opt-in, and users gained controls to exclude specific apps and pause indexing entirely. These changes introduced new UX requirements. If a user excludes an app, its absence in results cannot feel like a bug. The system needs to explicitly communicate that certain content is outside its scope. If indexing is paused, the UI must reflect that results may be incomplete without creating confusion or alarm.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We addressed this by making system boundaries visible in the interface. Result cards show clear source attribution and timestamps so users understand where each memory came from. When content is unavailable or excluded, the system communicates that state instead of failing silently. When sensitive information is detected, results are blurred and require Windows Hello authentication before access. These behaviors ensure that users can always interpret what they are seeing.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          My role focused on translating platform-level privacy decisions into concrete interaction patterns. The search UI, result cards, and relevance explanations were all designed to answer a simple question: Why am I seeing this, and what is Recall not showing me? Trust was not handled through a single setting or permission screen. It was reinforced through consistent, visible signals in every interaction.
        </CaseStudyParagraph>
        <FigurePanel caption="Recall privacy and trust controls" src="/images/projects/Windows Commercial_16x9_1920_1080.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="constraints" label="Constraints & Tradeoffs">
        <CaseStudyHeading>Balancing intelligence with responsiveness</CaseStudyHeading>
        <CaseStudyParagraph>
          One area where platform constraints shaped the design was around how deeply Recall could reason across memories. Early in the project, we explored using retrieval-augmented generation (RAG) to synthesize results across multiple captured moments. The idea was compelling: instead of returning individual screenshots, Recall could answer higher-level questions by combining context from many memories.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In practice, this approach introduced significant latency. Running retrieval and generation across large sets of memories created delays that conflicted with the performance expectations of system search. Recall needed to feel instantaneous. If users typed a query and waited several seconds for the system to "think," the experience quickly felt heavy and unreliable.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Because of these constraints, we shifted away from generation-first answers and focused on fast, legible retrieval. The interface emphasizes quickly surfacing relevant moments that users can scan and interpret themselves. By prioritizing speed and clarity over deeper synthesis, we ensured that Recall behaved like a native system capability rather than a slow AI feature layered on top.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This decision also reinforced an important design principle for the product: the system should help users rediscover context, not reinterpret their history for them.
        </CaseStudyParagraph>
        <FigurePanel caption="RAG synthesis vs. fast retrieval — latency and tradeoff" videoSrc="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/shilpa_0603_03%201.mp4" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <FigurePanel caption="Recall keynote presentation and system architecture" src="/images/projects/recall-fig06.png" className="mb-8 max-w-2xl" />
        <CaseStudyParagraph>
          Separating visual and text-based matches had a measurable impact on usability. In studies, users were able to clearly explain why a result appeared and quickly determine whether it matched their intent. What initially felt like unpredictable AI behavior became something users could reason about and control. That shift from "mysterious" to "legible" significantly improved confidence when interacting with Recall.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Participants also reported rediscovering information they assumed was lost, from code snippets seen briefly in documentation to documents they had opened weeks earlier and forgotten about. While the underlying technology enabled that capability, the clarity of the interface made it practical. Users could quickly evaluate results and navigate back to the exact moment they needed.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The impact of Recall extended beyond the feature itself. The project helped shape broader privacy and trust design guidelines within Windows, influencing how teams think about provenance, transparency, and user control when working with AI-generated or AI-retrieved content. It also informed engineering processes for handling sensitive data and communicating system behavior clearly within the interface.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          At the platform level, the search logic developed for Recall became a foundation for semantic search across Windows surfaces. The same principles of explaining relevance and separating match types informed updates to Windows Search and File Explorer, helping establish a consistent model for AI-assisted retrieval across the OS.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          Recall ultimately demonstrated that advanced AI capabilities can be integrated into a core platform feature without feeling opaque or experimental. By prioritizing transparency, provenance, and predictable interaction patterns, the work helped define how Windows can introduce AI features that users understand and trust.
        </CaseStudyCallout>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyCallout,
} from "@/components/case-study-layout"
import { FigurePanel, DiagramPlaceholder } from "@/components/figure-panel"
import { projectImages } from "@/lib/images"

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
  { id: "card-provenance", label: "Provenance" },
  { id: "card-relevance", label: "Why It Appeared" },
  { id: "early-iteration", label: "Early Iteration" },
  { id: "relevance", label: "Making Relevance Legible" },
  { id: "performance", label: "Performance" },
  { id: "trust", label: "Trust" },
  { id: "constraints", label: "Constraints & Tradeoffs" },
  { id: "impact", label: "Impact" },
]

export default function RecallPage() {
  return (
    <CaseStudyLayout
      productName="Windows Recall"
      title="Semantic search for everything you've seen"
      tags={["Trust + privacy", "Systems thinking", "Windows", "Senior Designer", "2024"]}
      heroImage={projectImages["recall"].heroImage}
      heroImageAlt={projectImages["recall"].alt}
      specs={specs}
      navItems={navItems}
      nextProject={{ name: "Agents in Windows", href: "/agents-in-windows" }}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>What if your computer could remember everything you{"'"}ve seen?</CaseStudyHeading>
        <CaseStudyParagraph>
          Recall began with a deceptively simple idea. What if your PC could act as a memory layer across everything you have viewed, allowing you to find past moments just by describing them?
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This was not browser history or file indexing. It was an on-device system that continuously captured snapshots of what appeared on screen and made them searchable through semantic understanding. The ambition was large. So were the implications.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          From the beginning, we knew the challenge was not only technical. Capturing what users see is powerful, but it also raises immediate concerns about privacy and control. The design problem was to create a system that felt intelligent without feeling invasive, and useful without feeling unpredictable. The feature would only succeed if users trusted it.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          My role focused specifically on the semantic search experience: how users search their memories, how results are ranked and displayed, and how relevance is communicated in a way that feels understandable and trustworthy.
        </CaseStudyParagraph>
        <FigurePanel caption="Recall sizzle overview" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recall_fig01-FojMNuJbZGndg7ATAFhxOZEypdzfDq.mp4" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>Traditional search expects precision. Human memory does not.</CaseStudyHeading>
        <CaseStudyParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </CaseStudyParagraph>
        <FigurePanel caption="Windows Intelligence Layer to extract memory data" src="/images/projects/recall-fig02.png" className="mt-8 mb-4 max-w-2xl" />
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
          To reinforce that mental model, we anchored the design around the visual snapshot. The screenshot became the primary element of the card, immediately grounding the result in something the user had actually seen before. Supporting metadata such as the application, timestamp, and extracted text remained visible but secondary. This hierarchy helped shift the experience away from document retrieval and toward revisiting moments in time.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Interaction design required equal care. Selecting a card could lead to two different outcomes: opening the Recall memory view for deeper exploration or restoring the original window where the activity occurred. These outcomes needed to feel predictable and intentional. Any ambiguity about what would happen when a user clicked a result would quickly erode trust.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The final design makes browsing Recall feel closer to scanning a visual timeline than navigating a traditional search results page.
        </CaseStudyParagraph>
        <FigurePanel caption="Separating match results and contextual clues of match type" src="/images/projects/recall-fig04.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="card-provenance" label="Provenance">
        <CaseStudyHeading>Showing users where memories came from</CaseStudyHeading>
        <CaseStudyParagraph>
          Trust was a central design requirement. When a system surfaces past activity, users immediately ask a simple question: Where did this come from?
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Each result card therefore communicates clear provenance. Cards display the originating application, the timestamp of when the moment occurred, and a clear path to view the original source when it is available. These signals make it easy for users to quickly validate the authenticity of a memory.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We also designed for situations where the original context no longer exists. Applications may be closed, documents may be deleted, or content may have changed. Instead of failing silently, the interface communicates these cases gracefully so users understand the state of the underlying source.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Cards also indicate when Recall is presenting an approximate or partial reconstruction rather than a perfect restoration of the original state. These cues help set accurate expectations and reinforce that Recall is surfacing memories, not preserving immutable records.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          By making provenance visible, the interface answers the trust question before the user has to ask it.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Provenance signal anatomy — timestamp, app, source availability states" />
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

      <CaseStudySection id="relevance" label="Making Relevance Legible">
        <CaseStudyHeading>AI without explanation feels random</CaseStudyHeading>
        <CaseStudyParagraph>
          Users do not trust magic. They trust clarity.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We separated text and visual matches into distinct groupings so people could immediately understand the type of result they were seeing. We explored subtle cues to communicate why something appeared without exposing embedding scores or internal model complexity.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This work helped define how ranking logic is expressed in the interface. Instead of surfacing raw intelligence, we translated it into something understandable. Transparency turned the system from mysterious to useful.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Separated match result types — text vs. visual screenshot results" />
      </CaseStudySection>

      <CaseStudySection id="performance" label="Performance">
        <CaseStudyHeading>Fast enough to feel alive</CaseStudyHeading>
        <CaseStudyParagraph>
          Recall relied on semantic embeddings and local indexing, which can be computationally intensive. While many queries returned quickly, there were moments, particularly during initial indexing or system load, where responses took longer.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Search needed to feel responsive as users typed. We implemented a live updating experience where results evolved with each keystroke. This created a sense of intelligence and fluidity. However, when latency surfaced, we needed to ensure it did not feel like failure.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We designed loading states that communicated activity clearly without exposing unnecessary technical detail. Subtle motion and progress indicators reassured users that the system was working. The interface needed to remain calm and composed even when the backend required time.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The challenge was balancing transparency with simplicity. Users did not need to understand embeddings or indexing pipelines. They needed confidence that the system would respond reliably.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We operated in a tight designer-engineer loop throughout development. As models improved, scope expanded. When performance constraints appeared, we recalibrated. The UI and model evolved together through trade-offs. The final experience reflects that constant negotiation between ambition and feasibility.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Trust and privacy framing were parallel workstreams. Recall includes opt-in controls, local-only messaging, and indexing transparency. While that design effort is a project in itself, the search interface had to reinforce those trust decisions visually and behaviorally.
        </CaseStudyParagraph>
        <FigurePanel caption="Live search performance and loading states" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recall_fig05-JAHG0aeAytDorw718qnZiWG2n09om9.mp4" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="trust" label="Trust">
        <CaseStudyHeading>Trust as a design constraint, not a feature</CaseStudyHeading>
        <CaseStudyParagraph>
          Recall captures everything you see on your PC. That capability is only as valuable as the trust users place in it. Privacy wasn{"'"}t a parallel workstream — it was the primary architectural constraint that shaped every search interaction I designed.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          On-device processing was a hard constraint from the start. All capture, indexing, and retrieval had to happen locally — nothing left the device. That decision had direct consequences for the search experience. It bounded what was computationally feasible within the performance envelope users expected from a native Windows feature, and it shaped how we communicated the system{"'"}s boundaries to users. The team navigated real tension between capture comprehensiveness and user control: the more Recall captured, the more powerful it became, but also the more exposed users felt. Every indexing and filtering decision had to be weighed against both.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          After public scrutiny of the feature, the privacy model shifted significantly. Recall moved from opt-out to opt-in, and users gained per-app filtering and explicit indexing transparency controls. These changes reshaped the search experience directly. If a user has excluded certain apps from capture, search results need to clearly reflect those boundaries — not silently omit results, but communicate that those apps are outside Recall{"'"}s scope. If indexing is paused, the search UI needs to communicate recency gaps without alarming the user. The interface had to make the system{"'"}s knowledge boundaries legible at every touchpoint.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          My specific contribution was ensuring the search UI reinforced trust decisions made at the platform level. The result card design, the relevance explanations, the source attribution — all of these were shaped by the requirement that users must always understand what Recall knows and why. Trust was not communicated through a single disclosure screen. It was embedded in the texture of every interaction: which results appeared, how they were labeled, what happened when source content was unavailable, and how the system explained itself when results felt unexpected.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="On-device processing architecture — privacy scope and control model" />
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
        <DiagramPlaceholder label="RAG synthesis vs. fast retrieval — latency and tradeoff diagram" />
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

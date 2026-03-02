"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyCallout,
} from "@/components/case-study-layout"
import { FigurePanel } from "@/components/figure-panel"
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
  { id: "early-iteration", label: "Early Iteration" },
  { id: "relevance", label: "Making Relevance Legible" },
  { id: "performance", label: "Performance" },
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
          People rarely remember exact file names or timestamps. They remember fragments and impressions. They remember the spreadsheet with a blue chart or the slide with a bold quote. Their mental model is contextual and visual.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          If Recall required precise input, it would fail. At the same time, if it returned results that felt mysterious or inconsistent, confidence would erode quickly. We needed to design an experience that supported fuzzy queries while clearly explaining what the system was doing.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In early iterations, the underlying AI performed well enough to retrieve relevant results. The interface, however, was not yet helping users understand those results.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Because searching memory is different from searching files, we tested rotating prompts and contextual suggestions based on recent activity. These cues helped teach users that they could describe what they remembered in natural language. This subtle mental model shift was essential to adoption.
        </CaseStudyParagraph>
        <FigurePanel caption="Windows Intelligence Layer to extract memory data" src="/images/projects/recall-fig02.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="card-design" label="Card Design">
        <CaseStudyHeading>Making results feel like moments, not files</CaseStudyHeading>
        <CaseStudyParagraph>
          Each Recall card contained multiple signals: a screenshot, associated application, timestamp, extracted text, and ranking data. Establishing hierarchy was straightforward from an information design perspective. The more nuanced challenge was shaping how the card felt.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We anchored the design in the visual snapshot. The screenshot became the primary element, reinforcing that Recall was helping users revisit a moment they had seen. We wanted to avoid the impression that this was just another file search interface.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Interaction design required equal care. Selecting a card could either take users into the Recall memory view or reopen the original window. These paths needed to be clear and predictable. Any ambiguity would undermine trust quickly.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Close collaboration with research and engineering was essential during this phase. Small adjustments in labeling, hierarchy, and interaction timing significantly improved clarity. This was not about visual polish. It was about reinforcing a stable mental model.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We were careful to make this feel like browsing moments in time rather than launching files. Clicking a card needed to set clear expectations. In some cases it opened the Recall detail view. In others it rehydrated the original window. Designing those affordances carefully prevented confusion and reinforced that this was memory, not file management.
        </CaseStudyParagraph>
        <FigurePanel caption="Separating match results and contextual clues of match type" src="/images/projects/recall-fig04.png" className="mt-8 mb-4 max-w-2xl" />
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

      <CaseStudySection id="impact" label="Impact">
        <FigurePanel caption="Recall keynote presentation and system architecture" src="/images/projects/recall-fig06.png" className="mb-8 max-w-2xl" />
        <CaseStudyParagraph>
          Separating visual and text results improved comprehension significantly in usability studies. Users could articulate why a result appeared and whether it matched their intent. The feature began to feel predictable rather than mysterious.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Participants reported rediscovering information they assumed was lost, from code snippets to documents viewed weeks earlier. While the technology powered that capability, the clarity of the interface made it usable.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Beyond the feature itself, Recall influenced broader design patterns for AI in Windows. It reinforced the importance of explaining relevance, hiding unnecessary complexity, and collaborating closely with engineering throughout the process. The project demonstrated that advanced AI features can feel approachable when transparency and interaction design are treated as first-class concerns.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          Recall was not just a feature. It was a shift in how Windows thinks about memory. The design proved that advanced AI can feel approachable when transparency is treated as a first-class concern.
        </CaseStudyCallout>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

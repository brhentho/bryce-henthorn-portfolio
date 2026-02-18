"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyList,
  CaseStudyCallout,
} from "@/components/case-study-layout"
import { FigurePanel } from "@/components/figure-panel"
import { projectImages } from "@/lib/images"

const specs = [
  { label: "Role", value: "UX Lead" },
  { label: "Platform", value: "Windows / Copilot+ PCs" },
  { label: "Challenge", value: "Traditional search breaks down at human scale" },
  { label: "Constraint", value: "High privacy sensitivity, always-on memory layer" },
  { label: "Solution", value: "Semantic memory cards with visual-first retrieval" },
  { label: "Impact", value: "Established trust-forward patterns for AI-powered memory in Windows" },
]

const navItems = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "iteration", label: "Iteration" },
  { id: "impact", label: "Impact" },
]

export default function RecallPage() {
  return (
    <CaseStudyLayout
      title="Semantic search for everything you've viewed, across apps"
      subtitle="Recall"
      tags={["0 to 1", "AI", "Semantic Search", "UX Lead", "2024"]}
      heroImage={projectImages["recall"].heroImage}
      heroImageAlt={projectImages["recall"].alt}
      specs={specs}
      navItems={navItems}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>What if your computer could remember everything you{"'"}ve seen?</CaseStudyHeading>
        <CaseStudyParagraph>
          That question became Windows Recall, an AI-powered memory system built directly into Copilot+ PCs. The opportunity was compelling. The risks were obvious.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We were designing an always-on memory layer for the operating system. It needed to feel powerful but not invasive. Helpful but not overwhelming. Local and private by design.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Our challenge was not simply building semantic search. It was balancing intelligence with trust.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 01 — Recall: semantic memory at the OS level" variant="layout" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>Traditional search breaks down at human scale</CaseStudyHeading>
        <CaseStudyParagraph>
          People remember fragments, not file names. They remember visuals, context, and moments.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          If Recall required precise input, it would fail immediately. But if it returned unpredictable results, users would lose confidence.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          We needed to bridge fuzzy human memory with structured AI retrieval, while making relevance understandable.
        </CaseStudyCallout>
      </CaseStudySection>

      <CaseStudySection id="process" label="Process">
        <CaseStudyHeading>Designing memory, not a file browser</CaseStudyHeading>
        <CaseStudyParagraph>
          We began by defining the anatomy of a Recall card. Each card contained a screenshot, timestamp, app association, extracted text, and ranking score. Creating hierarchy was straightforward. Creating the feeling of memory was not.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We intentionally grounded the card in the visual snapshot. The screenshot sat prominently, reinforcing that this was a moment you saw, not just a document you opened.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We also clarified interaction paths. Entering the memory view was distinct from reopening the original window. That distinction prevented confusion and reinforced predictability.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Throughout the process, we worked closely with researchers and engineers. Decisions were shaped by real user reactions, not internal preference.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 02 — Card anatomy: visual snapshot, text, metadata" variant="controls" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="iteration" label="Iteration">
        <CaseStudyHeading>Explaining relevance, not just returning results</CaseStudyHeading>
        <CaseStudyParagraph>
          Early versions blended text and visual matches into one ranked list. Users struggled to understand why certain items appeared.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We separated text and visual results into clear sections. That simple structural change dramatically improved comprehension.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Live search updated as users typed, creating a fluid experience. Underneath, semantic embeddings were doing heavy computation. We designed loading states that communicated progress without exposing complexity.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          Users do not need to understand embeddings. They need confidence that the system knows what it is doing.
        </CaseStudyCallout>
        <FigurePanel caption="FIG 03 — Separated text vs visual result types" variant="flow" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <CaseStudyParagraph>
          Users described Recall as surprising and useful. Separating visual and text results improved clarity. Many found information they would not have been able to retrieve through traditional search.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Trust was central. Recall is opt-in and local-only. Transparency about data storage built confidence. Internally, the project influenced how high-sensitivity AI features are introduced in Windows.
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Explain relevance, not just results",
            "Hide complexity, keep the magic",
            "Design with engineering, not after it",
            "Tight collaboration shaped both the interface and the model behavior",
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

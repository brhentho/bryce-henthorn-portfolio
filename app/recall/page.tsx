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

const specs = [
  { label: "Role", value: "Senior UX Designer" },
  { label: "Platform", value: "Windows" },
  { label: "Challenge", value: "Traditional search doesn't match human memory" },
  { label: "Constraint", value: "High privacy sensitivity" },
  { label: "Solution", value: "Semantic memory cards + progressive disclosure controls" },
  { label: "Impact", value: "Established trust-forward patterns for AI-powered memory" },
]

const navItems = [
  { id: "context", label: "Context" },
  { id: "tension", label: "Tension" },
  { id: "goal", label: "Goal" },
  { id: "solution", label: "Solution" },
  { id: "key-decisions", label: "Key Decisions" },
  { id: "impact", label: "Impact" },
  { id: "contribution", label: "Contribution" },
]

export default function RecallPage() {
  return (
    <CaseStudyLayout
      title="Windows Recall"
      subtitle="Designing memory for your PC — without sacrificing trust"
      meta="Senior UX Designer / Windows / Semantic Memory"
      specs={specs}
      navItems={navItems}
    >
      <CaseStudySection id="context" label="Context" counter="001">
        <CaseStudyHeading>The Problem</CaseStudyHeading>
        <CaseStudyParagraph>
          Search assumes users remember file names, keywords, and folder locations.
          Humans remember differently.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We remember: {"\""}that slide with the blue chart{"\""}... {"\""}the document
          after the meeting{"\""}... {"\""}that website from last Tuesday.{"\""}
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Memory is associative and visual. Windows search was powerful — but not human.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="tension" label="Tension" counter="002">
        <CaseStudyParagraph>
          A system that remembers what you{"'"}ve seen is helpful.
          It can also feel invasive.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          If Recall felt opaque or uncontrollable, adoption would collapse.
          The challenge was not just retrieval. It was trust.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="goal" label="Goal" counter="003">
        <CaseStudyHeading>
          Make your PC feel like it remembers with you — not watches you
        </CaseStudyHeading>
        <CaseStudyParagraph>
          That required transparent indexing, clear scope boundaries, lightweight
          privacy controls, and calm structured presentation.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="solution" label="Solution" counter="004">
        <CaseStudyHeading>Semantic Memory Cards</CaseStudyHeading>
        <CaseStudyParagraph>
          We designed a recall interface built around rich cards combining:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Visual snapshot",
            "Extracted text",
            "Contextual metadata (app, date, timeline)",
          ]}
        />
        <CaseStudyParagraph>
          Why cards? Because visual fragments trigger memory faster than filenames.
          We prioritized progressive disclosure — advanced filtering and controls
          were accessible but unobtrusive.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 01 — Card-based results (visual + text)" variant="layout" className="mt-8 mb-4 max-w-2xl" />
        <FigurePanel caption="FIG 02 — Progressive disclosure controls" variant="controls" className="mt-4 mb-4 max-w-2xl" />
        <FigurePanel caption="FIG 03 — Match types: visual vs text" variant="flow" className="mt-4 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="key-decisions" label="Key Decisions" counter="005">
        <CaseStudyList
          items={[
            "Visual + text pairing for richer recall triggers",
            "Progressive disclosure to manage complexity",
            "User-in-the-loop control for all indexing behavior",
            "OS-level coherence with existing Windows patterns",
          ]}
        />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact" counter="006">
        <CaseStudyList
          items={[
            "Improved task recovery in prototype testing",
            "Strong user comprehension around indexing behavior",
            "Influenced trust patterns across AI surfaces in Windows",
            "Helped shape how memory is framed inside the OS",
          ]}
        />
        <CaseStudyCallout>
          Recall wasn{"'"}t just a feature. It was a shift in how Windows thinks about memory.
        </CaseStudyCallout>
      </CaseStudySection>

      <CaseStudySection id="contribution" label="My Contribution" counter="007">
        <CaseStudyList
          items={[
            "Defined interaction model for recall experience",
            "Led UX exploration of trust and privacy controls",
            "Partnered with research to validate comprehension",
            "Established reusable patterns for AI-powered retrieval",
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

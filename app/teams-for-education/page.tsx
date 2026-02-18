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
  { label: "Role", value: "Senior UX Designer" },
  { label: "Platform", value: "Microsoft Teams" },
  { label: "Focus", value: "Virtual classroom collaboration" },
  { label: "Challenge", value: "Engagement collapsed during remote learning" },
  { label: "Solution", value: "Structured 'virtual tables' for small-group dynamics" },
  { label: "Impact", value: "Improved participation signals & restored classroom structure" },
]

const navItems = [
  { id: "context", label: "Context" },
  { id: "insight", label: "Insight" },
  { id: "goal", label: "Goal" },
  { id: "solution", label: "Solution" },
  { id: "key-decisions", label: "Key Decisions" },
  { id: "impact", label: "Impact" },
  { id: "contribution", label: "Contribution" },
]

export default function TeamsForEducationPage() {
  return (
    <CaseStudyLayout
      title="Teams for Education"
      subtitle="Restoring human connection to remote classrooms"
      tags={["0\u21921", "Interaction design", "Enterprise", "Microsoft Teams"]}
      heroImage={projectImages["teams-for-education"].heroImage}
      heroImageAlt={projectImages["teams-for-education"].alt}
      specs={specs}
      navItems={navItems}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>When Classrooms Went Quiet</CaseStudyHeading>
        <CaseStudyParagraph>
          When schools moved online, classrooms didn{"'"}t just relocate. They flattened.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Teachers faced grids of muted tiles. Students disengaged. Participation dropped.
          Physical classrooms rely on spatial structure — tables, proximity, micro-groups.
          Online, that structure disappeared.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Engagement wasn{"'"}t failing because of video quality. It was failing because
          of lost social architecture.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 01 — From flat grids to structured groups" variant="layout" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="insight" label="Insight">
        <CaseStudyHeading>Engagement is structural</CaseStudyHeading>
        <CaseStudyParagraph>
          Students participate more when:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Group boundaries are visible",
            "Social context is clear",
            "Movement between collaboration states feels safe",
          ]}
        />
        <CaseStudyParagraph>
          Without spatial cues, collaboration becomes awkward and risky.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="goal" label="Goal">
        <CaseStudyHeading>The Design Challenge</CaseStudyHeading>
        <CaseStudyParagraph>
          We needed to:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Introduce small-group collaboration inside large meetings",
            "Preserve clarity and institutional tone",
            "Avoid gimmicky classroom metaphors",
            "Scale across devices and accessibility requirements",
          ]}
        />
        <CaseStudyParagraph>
          This was not about adding visual flair. It was about restoring classroom dynamics.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="solution" label="Solution">
        <CaseStudyHeading>Virtual Tables</CaseStudyHeading>
        <CaseStudyParagraph>
          We introduced structured {"\""}virtual tables{"\""} inside Teams meetings.
          Students could:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Join smaller group clusters",
            "See clearly who was at their table",
            "Transition between full-class and small-group modes",
            "Maintain awareness of classroom structure",
          ]}
        />
        <CaseStudyParagraph>
          The interface emphasized clarity, visible membership, and lightweight transitions.
          We deliberately avoided skeuomorphic classroom maps. The design leaned toward
          stability and predictability.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 02 — Table membership visibility" variant="controls" className="mt-8 mb-4 max-w-2xl" />
        <FigurePanel caption="FIG 03 — Whole class to tables transitions" variant="flow" className="mt-4 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="key-decisions" label="Key Decisions">
        <CaseStudyList
          items={[
            "Clarity over novelty",
            "Social visibility reduces friction",
            "Movement must feel safe",
            "Design for scale",
          ]}
        />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <CaseStudyList
          items={[
            "Increased small-group participation in research sessions",
            "Positive educator feedback around classroom control",
            "Strong adoption during peak remote learning",
            "Structural collaboration patterns reused across education scenarios",
          ]}
        />
        <CaseStudyCallout>
          Teachers described it simply: {"\""}It feels like a classroom again.{"\""}
        </CaseStudyCallout>
      </CaseStudySection>

      <CaseStudySection id="contribution" label="My Contribution">
        <CaseStudyList
          items={[
            "Defined interaction model for structured group collaboration",
            "Led UX exploration and prototyping",
            "Partnered closely with engineering and research",
            "Drove alignment around clarity and scalability principles",
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

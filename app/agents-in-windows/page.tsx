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
  { label: "Platform", value: "Windows Shell" },
  { label: "Challenge", value: "Autonomous agents lacked visibility and user trust" },
  { label: "Solution", value: "Shell-level presence + hover summaries + intelligent escalation" },
  { label: "Impact", value: "Defined foundational patterns for ambient AI inside Windows" },
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

export default function AgentsInWindowsPage() {
  return (
    <CaseStudyLayout
      title="Agents in Windows"
      subtitle="Making autonomous AI visible and trustworthy at the OS level"
      tags={["OS shell", "Interaction design", "Systems thinking", "Ambient AI"]}
      heroImage={projectImages["agents-in-windows"].heroImage}
      heroImageAlt={projectImages["agents-in-windows"].alt}
      specs={specs}
      navItems={navItems}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>The Problem</CaseStudyHeading>
        <CaseStudyParagraph>
          AI agents don{"'"}t behave like apps. They run continuously, operate across
          multiple surfaces, execute multi-step workflows, and trigger based on context.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          When agents act silently, users feel loss of control. Without visibility,
          autonomy feels unsafe.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="tension" label="Tension">
        <CaseStudyParagraph>
          Agents must be visible but not noisy, persistent but lightweight,
          interruptible but not fragile.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This wasn{"'"}t about adding UI. It was about defining system behavior.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="goal" label="Goal">
        <CaseStudyHeading>A shell-level language for agents</CaseStudyHeading>
        <CaseStudyParagraph>
          Users should be able to see when an agent is running, understand what it{"'"}s
          doing, intervene when necessary, and resume outcomes later.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Agents needed to feel like collaborators, not background scripts.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="solution" label="Solution">
        <CaseStudyHeading>Taskbar Presence</CaseStudyHeading>
        <CaseStudyParagraph>
          Persistent, lightweight representation of active agents:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Status indicators showing agent state",
            "Hover summaries with current activity",
            "Clear interaction affordances",
          ]}
        />
        <FigurePanel caption="FIG 01 — Taskbar presence + state indicators" variant="layout" className="mt-8 mb-8 max-w-2xl" />

        <CaseStudyHeading>Hover Cards</CaseStudyHeading>
        <CaseStudyParagraph>
          On-demand detail showing:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Current workflow step",
            "Recent activity",
            "Next action",
            "Pause or stop options",
          ]}
        />
        <FigurePanel caption="FIG 02 — Hover summary: progress + controls" variant="controls" className="mt-8 mb-8 max-w-2xl" />

        <CaseStudyHeading>Intelligent Escalation</CaseStudyHeading>
        <CaseStudyParagraph>
          Agents interrupt only when:
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Decisions are required",
            "Tasks fail",
            "Sensitive permissions are involved",
          ]}
        />
        <FigurePanel caption="FIG 03 — Escalation patterns" variant="flow" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="key-decisions" label="Key Decisions">
        <CaseStudyList
          items={[
            "Autonomy requires transparency",
            "Ambient does not mean invisible",
            "Interruptibility builds trust",
            "OS coherence matters",
          ]}
        />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <CaseStudyList
          items={[
            "Improved clarity in user testing around agent state",
            "Influenced internal strategy for ambient AI orchestration",
            "Established patterns for long-running system agents",
          ]}
        />
        <CaseStudyCallout>
          This work shifted the conversation from: {"\""}What can agents do?{"\""}
          to {"\""}How should agents behave inside an operating system?{"\""}
        </CaseStudyCallout>
      </CaseStudySection>

      <CaseStudySection id="contribution" label="My Contribution">
        <CaseStudyList
          items={[
            "Defined system-level interaction patterns",
            "Led exploration across shell surfaces",
            "Partnered with engineering on feasibility",
            "Shaped trust and escalation behaviors",
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

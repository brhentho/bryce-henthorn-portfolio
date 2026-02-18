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
  { label: "Platform", value: "Windows Shell" },
  { label: "Challenge", value: "Users welcomed assistance but disliked surprises" },
  { label: "Solution", value: "Taskbar presence, hover summaries, unified invocation" },
  { label: "Impact", value: "Agents became visible, interruptible, and integrated in the OS" },
]

const navItems = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "taskbar", label: "Taskbar" },
  { id: "invocation", label: "Invocation" },
  { id: "impact", label: "Impact" },
]

export default function AgentsInWindowsPage() {
  return (
    <CaseStudyLayout
      title="Solving trust and visibility for AI agents in the operating system"
      subtitle="Agents in Windows"
      tags={["Enterprise Systems Thinking", "UX Lead", "2025"]}
      heroImage={projectImages["agents-in-windows"].heroImage}
      heroImageAlt={projectImages["agents-in-windows"].alt}
      specs={specs}
      navItems={navItems}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>Windows is evolving into a canvas for AI agents</CaseStudyHeading>
        <CaseStudyParagraph>
          Microsoft leadership, including Satya Nadella, has outlined a future where AI agents take on routine work so people can focus on higher-value thinking. This vision positions Windows as more than a desktop operating system. It becomes the environment where agents are deployed, monitored, secured, and orchestrated.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The opportunity was to make Windows the best place for enterprise workers and developers to run intelligent agents. Not hidden inside apps. Integrated into the OS itself.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 01 — Agents as first-class OS citizens" variant="layout" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>People do not object to help. They object to not knowing what is happening.</CaseStudyHeading>
        <CaseStudyParagraph>
          Early feedback revealed a consistent pattern. Users welcomed assistance. They disliked surprises. They wanted situational awareness.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Agent behavior was scattered across notifications and app windows. Users could not easily tell what was running, what needed attention, or what had completed.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          The narrative spine became clear. Clarity creates trust.
        </CaseStudyCallout>
      </CaseStudySection>

      <CaseStudySection id="process" label="Process">
        <CaseStudyHeading>Making agents first-class citizens</CaseStudyHeading>
        <CaseStudyParagraph>
          Agents behave differently than apps. They can run in the background, interact with system resources, and take time to complete tasks.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We explored multiple models. Should agents live inside apps. Should they be pinned separately. Should they have dedicated panels. We tested and iterated across many variations.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          For the discretion of this project, I cannot share detailed early explorations, as the system continues to evolve. What I can share is the tension. We wanted to move toward a bold vision, but we also needed to evolve patterns gradually. You cannot move the cheese too much inside an operating system.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The solution was to treat agents like first-class citizens. They follow the same structural rules as apps, but extend them with new states and visibility patterns.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="taskbar" label="Agents on the Taskbar">
        <CaseStudyParagraph>
          After initiating an agent task, either from Microsoft 365 Copilot or Ask Copilot on the taskbar, the agent appears as an icon just like a regular app. Status badging communicates whether it is active, idle, complete, or needs attention. Hover cards reveal contextual progress and allow intervention without opening a full window.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We defined a clear state system. Idle meant waiting. Active meant working. Needs attention meant user intervention was required. Complete meant the artifact was ready. Each state used minimal and consistent visual cues. Nothing flashy. Everything legible.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This transformed the taskbar into a dynamic hub. Users could monitor and unblock agents directly from the shell. Completed artifacts were not buried inside conversations. Visibility stayed at the system level.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 02 — Taskbar presence and state indicators" variant="controls" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="invocation" label="Unified Invocation">
        <CaseStudyParagraph>
          Ask Copilot on the taskbar became a universal composer. Users could invoke agents from anywhere using text or voice. Typing the at symbol allowed direct targeting of specific agents.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This created one consistent entry point across the OS.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 03 — Universal agent invocation from taskbar" variant="flow" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <CaseStudyParagraph>
          Agents now feel visible and understandable inside Windows. They are discoverable. Interruptible. Integrated.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Instead of opaque automation, users experience collaborative assistance.
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Visibility unlocks trust. Agents should never feel hidden if they are acting on your behalf.",
            "Control builds confidence. Pause and stop affordances matter.",
            "Integration must be seamless and predictable.",
            "Agents should feel like tools you use, not black boxes you fear.",
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

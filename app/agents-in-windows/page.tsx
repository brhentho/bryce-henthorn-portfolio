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
  { label: "Focus", value: "Agent visibility, trust, and OS integration" },
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
  { id: "iteration", label: "Iteration" },
  { id: "impact", label: "Impact" },
]

export default function AgentsInWindowsPage() {
  return (
    <CaseStudyLayout
      productName="Agents in Windows"
      title="Solving trust and visibility for AI agents in the operating system"
      tags={["OS shell", "Systems thinking", "Ambient AI", "Senior Designer", "2025"]}
      heroImage={projectImages["agents-in-windows"].heroImage}
      heroImageAlt={projectImages["agents-in-windows"].alt}
      specs={specs}
      navItems={navItems}
      nextProject={{ name: "Teams for Education", href: "/teams-for-education" }}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>Windows is evolving into a canvas for AI agents</CaseStudyHeading>
        <CaseStudyParagraph>
          Microsoft leadership, including Satya Nadella, has articulated a clear shift in how AI will transform knowledge work. The future is not about replacing people outright. It is about agents taking on routine or time-consuming tasks so humans can focus on higher-value thinking and collaboration.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          That vision places Windows in a new role. It is no longer just a platform for launching apps. It becomes the environment where AI agents are deployed, monitored, secured, and orchestrated. The opportunity is to make Windows the best place for developers and enterprise workers to run intelligent agents, from personal productivity helpers to broader organizational automation.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This work was not about embedding Copilot into Windows as a feature. It was about establishing Windows as the canvas where agents become first-class citizens of the operating system.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 01 — Agents as first-class OS citizens" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Agents_fig01-Ba0MkmsniFvg89l6rRoCLNrfOR6wA6.mov" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>People do not object to help. They object to not knowing what is happening.</CaseStudyHeading>
        <CaseStudyParagraph>
          As AI agents began to take on more responsibility, their presence across the system became fragmented. Some lived inside app experiences. Some surfaced through Copilot conversations. Others relied on notifications. Users were left to piece together what was happening and where.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Early feedback and testing revealed a consistent pattern. Users welcomed assistance. They did not welcome surprises. They wanted situational awareness. They wanted to know what was running, what was complete, and what required attention.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In other words, people did not fear automation. They feared invisibility.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          This insight became the narrative spine of the work. Clarity creates trust. If agents were going to act on a user{"'"}s behalf, they needed to be visible and understandable at the system level.
        </CaseStudyCallout>
      </CaseStudySection>

      <CaseStudySection id="process" label="Process">
        <CaseStudyHeading>Making agents first-class citizens of the OS</CaseStudyHeading>
        <CaseStudyParagraph>
          Agents behave differently than traditional applications. They can run in the background, interact with files and system resources, and take longer than a typical user action to complete. They are not always tied to a single window.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We explored multiple structural models. Should agents live inside the apps that invoke them. Should they be pinned independently. Should they have a dedicated panel or dashboard. Each option had tradeoffs. Some approaches made agents too heavy. Others made them too hidden.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          For the discretion of this project, I cannot share many of the early explorations in detail, as the system continues to evolve. What I can share is the tension. We were balancing a long-term vision for agent-native operating systems with the reality that Windows is used by hundreds of millions of people. We cannot shift patterns abruptly. We have to evolve them thoughtfully.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The solution was to extend existing OS contracts rather than inventing entirely new ones. Agents would behave like apps in the ways users already understand, while gaining additional visibility and state awareness specific to their behavior.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="taskbar" label="Agents on the Taskbar">
        <CaseStudyParagraph>
          One of the most important shifts was giving agents a persistent presence on the taskbar. After initiating an agent task, whether from Microsoft 365 Copilot or from Ask Copilot on the taskbar, the agent appears as an icon just like a regular application. That familiarity matters.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          From there, status badging communicates what the agent is doing. Hover cards reveal contextual information about progress and provide lightweight controls. Users can monitor activity without opening a full interface or losing their place in their current work.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We defined a clear and consistent state model. Idle indicates the agent is waiting for input. Active signals that work is in progress. Needs attention communicates that user intervention is required. Complete indicates that the final artifact or outcome is ready.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Each state uses minimal visual cues. Nothing decorative. Nothing flashy. The goal was legibility first and decoration second. Users should be able to glance at the taskbar and understand what is happening immediately.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This approach turned the taskbar into more than a launcher. It became a dynamic control surface for agent activity. Users can monitor, intervene, and retrieve completed work directly from the shell rather than hunting through conversations or buried notifications.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 02 — Taskbar presence: state badges, hover cards, and controls" src="/images/projects/agents-fig02.jpg" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="invocation" label="Unified Invocation">
        <CaseStudyHeading>Ask Copilot as a system-wide entry point</CaseStudyHeading>
        <CaseStudyParagraph>
          In parallel, we helped shape a unified invocation model through Ask Copilot on the taskbar. This composer allows users to launch agents through text or voice from anywhere in the OS. By typing the at symbol, users can directly reference specific agents.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This unified entry point reinforces a consistent mental model. Agents are not confined to individual apps. They are accessible from the system layer. Invocation and monitoring both live within predictable, centralized surfaces.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 03 — Universal agent invocation from the taskbar" src="/images/projects/agents-fig03.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="iteration" label="Iteration">
        <CaseStudyHeading>Cross-discipline collaboration shaped every decision</CaseStudyHeading>
        <CaseStudyParagraph>
          This work required tight collaboration across design, engineering, and product. We prototyped invocation flows, mapped agent states to OS visuals, and tested interaction patterns under realistic workloads. We iterated on how agents surfaced in different contexts, how they were grouped, and how much information to reveal at once.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Some early concepts relied only on taskbar badges. Others experimented with persistent side panels or heavier notification patterns. In usability testing, users consistently preferred lightweight, in-context visibility that did not interrupt their primary task.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We also invested significant effort in defining state transitions and badge behavior. How does an agent signal completion. How does it request help without feeling alarming. How does a user unblock an agent without losing context. These details may seem small, but they shape trust over time.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Because the project continues to evolve, not all iterations can be shown publicly. What matters is the underlying principle. Agents must feel integrated into the system in a way that is predictable and familiar.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <FigurePanel caption="FIG 04 — Agents on Windows taskbar, announced at Microsoft Build" src="/images/projects/agents-fig04.png" className="mb-8 max-w-2xl" />
        <CaseStudyHeading>From opaque automation to collaborative assistance</CaseStudyHeading>
        <CaseStudyParagraph>
          Today, agents in Windows feel visible and understandable. They are discoverable at a glance and interruptible when needed. Completed work does not disappear into hidden surfaces. It remains accessible and contextual.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This shift has significant implications for trust. When users can see automation working on their behalf, they are more comfortable delegating tasks. When they can pause or stop an agent easily, they feel in control.
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Visibility unlocks trust. Agents should never feel hidden if they are acting for you.",
            "Control builds confidence. Pause and stop affordances matter.",
            "Integration must be seamless and predictable.",
            "Agents should feel like tools you choose to use, not black boxes you are expected to accept.",
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

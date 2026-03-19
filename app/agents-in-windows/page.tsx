"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyList,
} from "@/components/case-study-layout"
import { FigurePanel, DiagramPlaceholder } from "@/components/figure-panel"
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
  { id: "observability", label: "Observability" },
  { id: "platform-constraints", label: "Platform Constraints" },
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
        <CaseStudyParagraph>
          As a lead designer on this initiative, I worked with partner teams to understand scope of needs for agent lifecycle and worked closely with engineering to translate those insights into scalable interaction patterns for the Windows shell.
        </CaseStudyParagraph>
        <FigurePanel caption="Agents as first-class OS citizens" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Agents_fig01-Ba0MkmsniFvg89l6rRoCLNrfOR6wA6.mov" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>Trust Comes From Visibility, Not Automation</CaseStudyHeading>
        <CaseStudyParagraph>
          As AI agents began to take on more responsibility, their presence across the system became fragmented. Some lived inside app experiences. Some surfaced through Copilot conversations. Others relied on notifications. Users were left to piece together what was happening and where. Our goal was to transform Windows into an observability layer for monitoring your agents while keeping you in flow.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Early feedback and testing revealed a consistent pattern. Users welcomed assistance. They did not welcome surprises. They wanted situational awareness. They wanted to know what was running, what was complete, and what required attention. In other words, people did not fear automation. They feared invisibility.
        </CaseStudyParagraph>
        <FigurePanel caption="Fragmented agent presence: where agents live today across surfaces" src="/images/projects/AgentsProof.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="process" label="Process">
        <CaseStudyHeading>Making agents first-class citizens of the OS</CaseStudyHeading>
        <CaseStudyParagraph>
          We explored several structural models for where agents should live in the system. One option was to keep them inside the apps that invoked them. Another was to allow agents to be pinned independently, similar to apps. We also explored dedicated panels or dashboards designed specifically for agent management. Each approach came with tradeoffs. Some models made agents feel too heavy and overbuilt for early adoption, while others made them too hidden, leaving users unsure where their agents were running or how to return to them.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Early concepts assumed agents would need their own dedicated space. We experimented with designs that placed them in a central agent area tied to the composer, where agents could be created and managed. We explored layouts anchored from both the left and right sides of the system to see how a persistent agent workspace might function. While these approaches gave agents strong visibility, they also introduced an entirely new mental model that risked overwhelming users.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Because agents represent such a fundamental shift in computing, we pushed toward a more progressive approach. Rather than introducing an entirely new system upfront, we looked for ways to build on patterns users already understand. In the end, we anchored agents in the taskbar, allowing them to behave similarly to apps while adding new states and signals that reflect agent activity. This allowed the system to scale gradually as agents become more common, instead of forcing users to learn a new model before the ecosystem fully exists.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The resulting direction extended existing OS contracts rather than inventing entirely new ones. Agents inherit familiar behaviors like presence in the taskbar, while gaining additional visibility and lifecycle awareness tailored to how agent workflows operate.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Design concepts explored: dedicated hub, panel, taskbar anchor" />
      </CaseStudySection>

      <CaseStudySection id="taskbar" label="Agents on the Taskbar">
        <CaseStudyHeading>Turning the Taskbar Into an Agent Control Surface</CaseStudyHeading>
        <CaseStudyParagraph>
          One of the most important shifts was giving agents a persistent presence on the taskbar. After initiating an agent task—whether from Microsoft 365 Copilot or from Ask Copilot in the taskbar—the agent appears as an icon, similar to a traditional application. This approach preserved familiarity and made it intuitive for users to understand that something is actively working on their behalf.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          However, agents behave very differently from apps. Unlike a typical application, an agent moves through multiple states: planning, running, waiting for input, and completing work over time. To support this, we had to define new system states that could communicate when an agent was actively working versus when it needed user intervention. This required studying the full lifecycle of agents being developed across Microsoft and continuously monitoring new agent patterns emerging in the industry so we could design a system that was structured enough for consistency while remaining flexible for new behaviors.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          A key challenge was representing agent progress and reasoning within the limited space of the taskbar. Different agents produce different types of outputs, and many stream progress incrementally as they work. We introduced hovercards that expand from the taskbar icon to surface a lightweight view of the agent{"'"}s status, including progress updates or a &ldquo;hand raise&rdquo; when user input is required. These hover states needed to balance clarity and brevity—giving users enough insight into what the agent is doing while remaining glanceable and unobtrusive. Designing this system required translating complex agent communication into a compact interface that could both show progress and allow users to quickly unblock an agent when needed.
        </CaseStudyParagraph>
        <FigurePanel caption="Taskbar presence and observability of agent activities" src="/images/projects/agents-fig02.jpg" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="observability" label="Observability without authorship">
        <CaseStudyHeading>Designing for an ecosystem you don{"'"}t control</CaseStudyHeading>
        <CaseStudyParagraph>
          Agents on the taskbar look simple — an icon, a badge, a hover card. But the data powering those surfaces comes from agent providers through a streaming API, and the OS does not control what providers send, how often they send it, or whether what they send is accurate. The OS is making a trust promise to the user on behalf of a provider it cannot fully verify. When the badge says &ldquo;active,&rdquo; it is relaying a claim, not confirming a fact.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The design had to account for every way that contract could break: a provider that streams rich step-by-step narration versus one that sends a single &ldquo;running&rdquo; state and goes silent, a provider that stops sending updates entirely with no error and no completion, a provider that reports &ldquo;done&rdquo; when the output is wrong, and error states the OS can surface but cannot resolve. Each of these demanded a different response from the hover card and badge system — progressive status narration when detail is available, recency signals when it is not, timeout thresholds that escalate silence into visible uncertainty, and error messages that always answer whose problem it is and what the user can do right now.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          These failure modes reshaped the surface from a status display into a trust negotiation layer between the user and an ecosystem of providers with varying reliability. The badge system moved from four clean states to a model that accounts for confidence in the state itself — not just &ldquo;what is the agent doing&rdquo; but &ldquo;how certain are we that this information is current.&rdquo; For completed tasks, we designed the transition to encourage verification rather than blind trust, surfacing output inline with a clear review path. For high-stakes actions, the agent cannot reach completion without explicit user approval — a contractual requirement of the API where providers declare risk level and the OS enforces the appropriate confirmation model.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This is the part of agent design that does not appear in demos. The real system has to hold up when the agent is slow, silent, wrong, or broken, and the OS has to communicate all of that without eroding the user{"'"}s willingness to delegate in the first place.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Badge confidence state model — provider communication failure modes" />
      </CaseStudySection>

      <CaseStudySection id="platform-constraints" label="Platform Constraints">
        <CaseStudyHeading>Designing for a platform built to last</CaseStudyHeading>
        <CaseStudyParagraph>
          A major constraint of designing for Windows is the release cadence of the platform itself. Unlike web products that can iterate rapidly, changes to the Windows shell must be stable, backward compatible, and resilient across hundreds of millions of devices. This meant we had to be careful about introducing new system patterns that could quickly become outdated or break as agents evolved.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          At the same time, partner teams across Microsoft were building their own agents and understandably wanted the same level of rich progress tracking and monitoring that exists within their individual apps. Our role at the OS level was different. Rather than reproducing each agent{"'"}s full experience, Windows needed to provide a consistent, glanceable layer that works across all agents. The focus was on communicating key signals such as activity, progress, and when attention is required, without changing the UX depending on which agent was running.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This created an interesting design tension. We had to balance the needs of individual product teams with the responsibility of maintaining a durable system pattern for the platform. The goal was to create a flexible framework that could support many different agents while remaining simple, predictable, and stable enough to last across multiple generations of agent capabilities.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="OS release cadence vs. agent evolution — platform stability tension" />
      </CaseStudySection>

      <CaseStudySection id="invocation" label="Unified Invocation">
        <CaseStudyHeading>Ask Copilot as a system-wide entry point</CaseStudyHeading>
        <CaseStudyParagraph>
          In parallel, we helped shape a unified invocation model through Ask Copilot on the taskbar. This composer merges Windows Search with Copilot, creating a single system-level entry point where users can ask questions, take actions, and launch agents from anywhere in the OS.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          A key part of this work was integrating agents directly into the composer so users could invoke them without needing to open a specific app. We explored several interaction models for how agents might appear in this space, but ultimately aligned with patterns already used by Copilot providers. Using the familiar mention model, users can type the @ symbol to surface available agents and directly call one into the conversation. This approach preserved consistency with the broader Copilot ecosystem while making agent invocation fast and discoverable within Windows.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This unified entry point reinforces a clear mental model. Agents are not confined to individual apps. They can be invoked from the system layer and continue running beyond the moment of interaction. With Ask Copilot serving as the point of invocation and the taskbar serving as the place where agents remain visible and monitored, users gain a predictable system for both starting and managing agent-driven workflows.
        </CaseStudyParagraph>
        <FigurePanel caption="Universal agent invocation from the taskbar" src="/images/projects/agents-fig03.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="iteration" label="Iteration">
        <CaseStudyHeading>Cross-discipline collaboration shaped the details</CaseStudyHeading>
        <CaseStudyParagraph>
          Much of the work happened in the small decisions that turn a concept into a reliable system behavior. To get there, we worked closely across design, engineering, and product to prototype interaction patterns directly in the shell and evaluate them under realistic conditions. This included testing how agents appeared across different system surfaces, how multiple agents behaved simultaneously, and how the UI responded as agents moved between states.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          A large portion of the effort focused on defining the micro-interactions that communicate agent behavior clearly. We worked through questions like how an agent signals completion, how it asks for help without feeling alarming, and how a user can quickly unblock an agent without losing the surrounding context of the task. These interaction details required close coordination between disciplines because they combined system constraints, technical signals from agents, and user expectations. Getting them right was critical for building a system that feels dependable as agents become more common in everyday workflows.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Micro-interaction details: completion signals, help requests, unblocking flows" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <FigurePanel caption="Agents on Windows taskbar, announced at Microsoft Build" src="/images/projects/agents-fig04.png" className="mb-8 max-w-2xl" />
        <CaseStudyHeading>From opaque automation to collaborative assistance</CaseStudyHeading>
        <CaseStudyParagraph>
          With these patterns in place, agents in Windows move from invisible automation to visible collaborators. When an agent is running, users can see it, understand its state, and return to it at any time. Activity does not disappear into hidden logs or isolated app experiences. Instead, it remains present in familiar system surfaces where users can quickly check progress, intervene if needed, or review completed work.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This visibility has direct implications for trust. When users can see automation working on their behalf, delegation becomes more comfortable. When they can pause, intervene, or stop an agent easily, they retain a sense of control over the system. The design goal was not just to make agents powerful, but to make them understandable and interruptible so users feel confident letting them operate.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Introducing agents into Windows also represents an important shift for the platform itself. Rather than AI existing only within individual applications, Windows begins to act as the coordination layer where agents can be invoked, monitored, and managed across the system. This moves Windows beyond being a place where users simply launch tools to complete tasks. Instead, it becomes an environment where intelligent systems actively assist with and execute work on the user{"'"}s behalf.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          At the platform level, this work established foundational patterns that other teams can build on. By defining shared UX contracts for agent presence, progress signaling, and user intervention, we created a consistent framework that prevents fragmentation as more agents enter the ecosystem. These patterns are already influencing updates to the Windows design system and guiding how new agent experiences integrate across Microsoft products.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          More broadly, the work helps prepare Windows for a future where managing agents becomes a common part of everyday computing. Establishing these conventions early ensures that as agent capabilities grow, users can understand what is happening on their system and developers have a clear, scalable way to plug their agents into the OS.
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Visibility unlocks trust. Agents should never feel hidden if they are acting for you.",
            "Control builds confidence. Pause and stop affordances matter.",
            "Integration must be seamless and predictable across the system.",
            "Agents should feel like tools you choose to use, not black boxes you are expected to accept.",
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

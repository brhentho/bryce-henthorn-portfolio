"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyList,
} from "@/components/case-study-layout"
import { FigurePanel, DiagramPlaceholder } from "@/components/figure-panel"
import { AgentCapabilityViz } from "@/components/agent-capability-viz"
import { CaseStudyHero } from "@/components/case-study-hero"


const specs = [
  { label: "Role", value: "Senior UX Designer" },
  { label: "Platform", value: "Windows Shell" },
  { label: "Focus", value: "Agent visibility, trust, and OS integration" },
  { label: "Challenge", value: "Users want to help. They hate surprises." },
  { label: "Solution", value: "Taskbar anchor, observability, system-wide invocation" },
  { label: "Impact", value: "Agents moved from invisible to interruptible" },
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

const agentsHero = (
  <CaseStudyHero
    backgroundImage="/Agents in Windows hero.png"
    backgroundImageOpacity={0.75}
    gridSvg="/grid-bg-windows.svg"
    gridOpacity={0.12}
    productName="Agents in Windows"
    title="Making AI agents visible and interruptible in Windows"
    tags={["OS shell", "Systems thinking", "Ambient AI", "Senior Designer", "2025"]}
  />
)

export default function AgentsInWindowsPage() {
  return (
    <CaseStudyLayout
      productName="Agents in Windows"
      title="Making AI agents visible and interruptible in Windows"
      tags={["OS shell", "Systems thinking", "Ambient AI", "Senior Designer", "2025"]}
      heroContent={agentsHero}
      specs={specs}
      navItems={navItems}
      nextProject={{ name: "Teams for Education", href: "/teams-for-education" }}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>Windows needed a place for agents to live</CaseStudyHeading>
        <CaseStudyParagraph>
          Microsoft is betting on agents as the next layer of computing. Not replacements for humans, but tools that handle routine work so people can focus on judgment and creation. That means Windows can't stay a place where you launch apps and manage files. It has to become the environment where agents actually run.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Right now agents scatter across the system. Some hide inside apps. Some show up in Copilot chats. Others surface as notifications. No one knows where their work actually lives. The OS level is where this fragmentation breaks. Windows needed to be the place where agents became visible, manageable, and trustworthy.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This wasn't about bolting Copilot onto Windows. It was about making agents a first-class construct in the operating system itself. Desktop apps took decades to become a natural part of how Windows feels. Agents deserve the same foundation.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          I led the core design work alongside partner teams across Microsoft, mapping the entire lifecycle of how agents would operate in the OS, then building a system stable enough to ship but flexible enough to evolve.
        </CaseStudyParagraph>
        <figure className="group mt-8 mb-4 max-w-2xl">
          <AgentCapabilityViz />
          <figcaption className="mt-3 text-sm font-sans text-foreground-tertiary">
            Building agents into the OS, not just into apps
          </figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>People don{"'"}t fear automation. They fear not knowing.</CaseStudyHeading>
        <CaseStudyParagraph>
          Agents scattered everywhere. Inside apps, buried in chat history, coming through notifications. Users had no idea where their work actually was or if anything was still running. Fragments. No coherent picture.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Early interviews hit a consistent note. Users liked having help. What they hated was surprises. They wanted to know what was happening, where it was happening, when it'd be done. They didn't distrust automation itself. They distrusted invisibility.
        </CaseStudyParagraph>
        <FigurePanel caption="Today agents scatter across the system: inside apps, in chats, in notifications" src="/images/projects/AgentsProof.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="process" label="Process">
        <CaseStudyHeading>Anchoring to what users already know</CaseStudyHeading>
        <CaseStudyParagraph>
          We tested three directions. Keep agents inside the apps that spawn them. Pin them independently like applications. Or create a dedicated agent workspace. Each had problems. Some felt bloated for something that barely existed yet. Others made agents too cryptic about where they actually were and how to get back to them.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Early sketches showed agents in their own dedicated panel. Central hub. Left side workspace. Right side dock. All of it gave agents visibility, but all of it asked users to learn a completely new model before most agents even existed. And if the model didn{"'"}t work once agents actually landed, we{"'"}d built a mental framework into the OS that couldn{"'"}t be changed easily.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Agents are genuinely new, but they don{"'"}t have to feel alien. We pushed for a progressive approach. Build on something users already use every day rather than forcing them to memorize a new system. We anchored agents to the taskbar. Same place apps live. Same behaviors. But with new states and signals that reflect how agents work. Let agents become common gradually. Don{"'"}t demand a new mental model before anyone{"'"}s actually using them.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The final direction reused existing OS patterns instead of inventing new ones. Agents in the taskbar. Familiar. But with additional signals for progress, completion, and when a human needs to step in.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Three directions: keep inside apps, pin independently, create dedicated workspace" />
      </CaseStudySection>

      <CaseStudySection id="taskbar" label="Agents on the Taskbar">
        <CaseStudyHeading>The taskbar becomes a window into agent work</CaseStudyHeading>
        <CaseStudyParagraph>
          Agents pin to the taskbar just like apps do. Invoke one and it appears as an icon. Familiar. Clear that something{"'"}s working. The metaphor works. But agents don{"'"}t behave like apps. They move through states: planning, executing, waiting, done. We had to create a badge and state system that could show all of that clearly without making the taskbar chaotic.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The real challenge was fitting agent progress into taskbar space. Agents from different providers send different outputs and different cadences. Some stream step-by-step. Some go silent. We built hover cards that expand from the icon to show progress in detail. A lightweight view that tells you what the agent's doing, whether it's stuck waiting for you, when it'll be done. Compact enough to glance at. Detailed enough to actually understand what's happening.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          And sometimes you need to unblock an agent fast, without losing context. The hover card lets you do that. You see the problem, you fix it, you move on. The system stays together.
        </CaseStudyParagraph>
        <FigurePanel caption="Taskbar icon with hover card revealing agent progress, status, and intervention points" src="/images/projects/agents-fig02.jpg" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="observability" label="Observability without authorship">
        <CaseStudyHeading>The OS can{"'"}t control what providers promise</CaseStudyHeading>
        <CaseStudyParagraph>
          The taskbar badge looks simple. Icon. Status. Progress. But the data comes through an API from providers you don{"'"}t employ and can{"'"}t fully monitor. When the badge says {"'"}active,{"'"} the OS is passing along a claim, not verifying a fact. That{"'"}s the core problem. The OS makes a promise to users on behalf of providers it can{"'"}t govern.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Everything breaks somewhere. One provider sends rich step-by-step updates. Another sends one "running" message and then nothing. Someone reports "done" but the work is garbage. Someone stops sending data entirely. No completion signal. No error. Just silence. Each of these needs a different response from the badge and hover card. Progressive detail when you have it. Recency signals when you don't. Timeouts that turn silence into visible uncertainty. Errors that say whose fault it is and what to do about it.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The badge went from four clean states to a confidence model. Not just "what is the agent doing" but "how sure are we the information is fresh." For finished work, we force verification, not blind trust. The output surfaces inline so you can review it immediately. For high-risk actions, the agent can't finish without explicit approval. That's a contract built into the API. Providers declare the risk level. The OS enforces the right confirmation flow.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This never shows up in product demos. But it's where the design lives. The system has to hold when the agent's slow, silent, wrong, or completely broken. And the OS has to be honest about all of that without making people stop trusting delegation.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Badge states: confident, uncertain, error; mapping provider reliability signals" />
      </CaseStudySection>

      <CaseStudySection id="platform-constraints" label="Platform Constraints">
        <CaseStudyHeading>Windows ships once. Agents ship constantly.</CaseStudyHeading>
        <CaseStudyParagraph>
          Windows updates quarterly. You can{"'"}t iterate freely like a web app. Every change goes to hundreds of millions of devices and has to stay working for years. So when you{"'"}re building a pattern that agents will use, you{"'"}re betting big. You can{"'"}t just redesign it next sprint if you guessed wrong.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Meanwhile every product team at Microsoft is building agents and wants the same rich monitoring they get inside their apps. They pushed for detailed progress views, custom visualizations, team-specific features. But the OS can{"'"}t be all of that. It has to be a consistent surface that works identically whether you{"'"}re running a research agent or a calendar agent or something brand new. Activity. Progress. When you{"'"}re needed. That{"'"}s it. The same UX. No variation.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          So we built a tense thing. Flexible enough to support agents we haven{"'"}t even imagined yet. Simple enough to stay stable across years. We had to tell teams {"'"}no{"'"} to custom experiences so we could promise users a predictable system.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Windows release cycle meets agent velocity: building flexibility into stability" />
      </CaseStudySection>

      <CaseStudySection id="invocation" label="Unified Invocation">
        <CaseStudyHeading>Ask Copilot becomes the starting point</CaseStudyHeading>
        <CaseStudyParagraph>
          Ask Copilot is Windows Search plus Copilot. One place to type questions, run actions, launch anything. We built agents directly into it. Type @. Pick an agent. Send it work. Invoke it from the OS, not from inside some app. The agent keeps running after you close the chat.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We explored different ways to show agents in the composer. Checkboxes. Cards. Panels. But we aligned with how Copilot already works. The @ mention pattern. It was already there. Users already knew it. Consistent with everything Copilot providers do. Agent invocation becomes fast and obvious inside Windows.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Now the system has a clear shape. Ask Copilot is where you start agents. The taskbar is where they live while running. Agents aren{"'"}t stuck inside individual apps anymore. They{"'"}re creatures of the OS itself. You invoke them from the system layer. They keep running. You monitor them from a consistent place.
        </CaseStudyParagraph>
        <FigurePanel caption="Ask Copilot: invoke any agent with the @ mention pattern" src="/images/projects/agents-fig03.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="iteration" label="Iteration">
        <CaseStudyHeading>The micro-interactions that make it work</CaseStudyHeading>
        <CaseStudyParagraph>
          The real work was the tiny stuff. How does an agent signal it{"'"}s done? How does it ask for help without startling you? How do you unblock it while keeping context? We prototyped these in the actual shell with engineering and product alongside design. Tested multiple agents running at once. Watched how the UI changed as an agent moved between states.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Each micro-interaction had to balance three things at once: what the system could actually do, what the agent data could tell us, and what people expected to happen. Move one thing wrong and the whole system feels less trustworthy. We couldn{"'"}t shortcut the work. Every detail mattered. And every detail needed design, engineering, and product all talking the same language so we didn{"'"}t ship something that looked good but didn{"'"}t actually work.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Micro-interactions: completion signals, hand-raises for help, fast unblocking flows" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <FigurePanel caption="Agents on the Windows taskbar, announced at Microsoft Build" src="/images/projects/agents-fig04.png" className="mb-8 max-w-2xl" />
        <CaseStudyHeading>From invisible to interruptible</CaseStudyHeading>
        <CaseStudyParagraph>
          Agents aren{"'"}t hidden anymore. You see them running. You know what state they{"'"}re in. You can come back to them whenever you want. No buried logs. No isolated app experiences. The work lives in familiar places. You can check progress. Step in. Review what got done. The OS became visible.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          And visibility builds trust. You watch automation work. You feel safer. You know you can stop it. Pause it. Fix it. Control matters. We didn{"'"}t just make agents powerful. We made them understandable and stoppable so people actually feel comfortable letting them work.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This changes what Windows is. It{"'"}s not just the app launcher anymore. It{"'"}s the place where agents live. Where you invoke them. Where you watch them work. Windows becomes the coordination layer for all the intelligent work happening on your system. AI doesn{"'"}t live trapped in individual applications. It{"'"}s part of the OS itself.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Other teams are already building on these patterns. We created shared contracts for how agents show up, report progress, ask for help. Consistent. Predictable. This prevents a hundred teams from inventing a hundred different ways to surface agent status. The design system is evolving. New products across Microsoft are using the same framework.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          As agents become normal, people need to understand what's happening on their system. Developers need a clear way to wire agents into Windows. These foundations do that. They scale.
        </CaseStudyParagraph>
        <CaseStudyList
          items={[
            "Visibility creates trust. Hidden agents breed distrust.",
            "Pause and stop are not optional. Control is non-negotiable.",
            "Predictability across the system. One model, everywhere.",
            "Agents should feel chosen, not imposed.",
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

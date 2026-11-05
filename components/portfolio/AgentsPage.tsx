import Image from "next/image"
import { CaseLayout } from "./CaseLayout"
import { AgentDemo, AgentKeyframes, CaseSection, Decisions, Pair, Prose, ShinyLink, Split } from "./Blocks"
import { PortfolioMedia } from "./PortfolioMedia"

const chapters = [
  { id: "context", label: "The missing return point" },
  { id: "process", label: "Why the taskbar" },
  { id: "invocation", label: "Dispatch and return" },
  { id: "taskbar", label: "States and control" },
  { id: "constraints", label: "The shared contract" },
  { id: "impact", label: "What the work established" },
] as const

const states = [
  { asset: "Running", label: "Running", meaning: "Work is continuing." },
  { asset: "Needs attention", label: "Needs attention", meaning: "A person needs to respond." },
  { asset: "Completed", label: "Completed", meaning: "The result is ready to inspect." },
  { asset: "Failed", label: "Failed", meaning: "Work could not finish." },
  { asset: "Paused", label: "Paused", meaning: "Work is on hold." },
]

export function AgentsPage() {
  return <CaseLayout
    page="agents"
    title="Making AI agents visible and interruptible in Windows."
    deck="Agent work was scattered across apps, chats and notifications. Windows needed a reliable place to find it—and a clear way to step in."
    call="We anchored agents to the taskbar with one shared set of states."
    status="Ongoing platform work"
    ledger={[
      { label: "Role", value: "Lead designer, agent visibility & orchestration" },
      { label: "Team", value: "3 engineering partner teams" },
      { label: "Platform", value: "Windows 11 shell, taskbar, Ask Copilot" },
      { label: "Years", value: "2025–present" },
    ]}
    hero={{
      src: "/images/agents/hero-taskbar-attention.png", width: 2000, height: 1125,
      alt: "Windows desktop with Copilot and Researcher taskbar previews, showing a needs-attention state",
      caption: "Agent visibility in the Windows shell. Design artifact from ongoing platform work.",
    }}
    chapters={chapters}
  >
    <CaseSection id="context" title="Agent work had no reliable return point." tone="cool">
      <Prose>
        <p>Some agents lived inside apps. Others appeared in Copilot conversations or arrived as notifications. Starting work was only part of the interaction: people also needed to find it later, understand whether it was still running, and know when it needed them.</p>
        <p>Early interviews surfaced a consistent concern about surprises and unclear progress. We treated that as an observability problem—not evidence that everyone distrusts automation. The OS offered a common surface across the different places work began.</p>
      </Prose>
      <Pair>
        <PortfolioMedia id="agents-fragmentation" number="02.1" />
        <PortfolioMedia id="agents-observability" number="02.2" />
      </Pair>
      <p className="pf-caption">Fragmented application visibility / proposed OS-level observability. Two compositions of the same problem, not measured outcome evidence.</p>
    </CaseSection>

    <CaseSection id="process" title="Why the taskbar, not another workspace.">
      <Prose>
        <p>We explored three homes for agents. The decision was not simply where to put an icon; it was how much of a new system someone should have to learn before they could find their work again.</p>
      </Prose>
      <Decisions items={[
        { title: "Inside the originating app", tradeoff: "Keeps the local context, but visibility remains fragmented across the applications that start work.", disposition: "Move shared monitoring to the OS." },
        { title: "An independent taskbar pin", tradeoff: "Provides a familiar return point. Progress still needs a language that works across providers.", disposition: "Build on the existing location and add shared states.", chosen: true },
        { title: "A dedicated agent workspace", tradeoff: "Creates room for rich management, but adds another place to learn before the interaction model is established.", disposition: "Keep the first step progressive rather than create a separate destination." },
      ]} />
      <Prose><p>The taskbar let agents become a Windows construct without pretending they behave exactly like apps. We could preserve the familiar location while defining how ongoing work, requests for help and completion should appear.</p></Prose>
    </CaseSection>

    <CaseSection id="invocation" title="Start it once. Find it while it works.">
      <Prose>
        <p>In the Ask Copilot design, search, questions and actions share an entry point. Type @, select an agent and dispatch work. The conversation can close without becoming the only place to recover the task.</p>
        <p>That gives the system a clear division of responsibility: the composer starts work; the taskbar makes continuing work available to inspect.</p>
      </Prose>
      <ol className="pf-step-strip" aria-label="Agent work phases">
        <li><span className="fn-label">01 / Dispatch</span><p>Select an agent and send work.</p></li>
        <li><span className="fn-label">02 / Monitor</span><p>Recognize its state from the taskbar.</p></li>
        <li><span className="fn-label">03 / Return</span><p>Inspect progress or respond when needed.</p></li>
      </ol>
      <PortfolioMedia id="agents-composer" number="03" />
    </CaseSection>

    <CaseSection id="taskbar" title="Know when to look, and when to act." tone="graphite">
      <Prose>
        <p>A pin establishes the return point. A state signal says whether attention is needed. The expanded hover card reveals the current step without requiring someone to reopen the conversation. These are three views of the chosen direction, not three alternative designs.</p>
      </Prose>
      <AgentKeyframes />
      <Split>
        <Prose>
          <p>Providers report progress differently. Some stream detailed steps; others remain quiet for long stretches. We needed enough common structure to communicate state without promising detail the agent could not supply.</p>
          <p>Dispatch, monitor and return describe the person’s workflow. The five labels below describe the visible condition of agent work. Keeping those two models distinct made the contract easier to reason about.</p>
        </Prose>
        <PortfolioMedia id="agents-taskbar" number="04.1" />
      </Split>
      <figure className="pf-state-figure">
        <ul className="pf-state-lexicon">
          {states.map(state => <li key={state.label}>
            <Image src={`/assets/agents/${state.asset} agent.svg`} alt="" width={40} height={40} />
            <h3>{state.label}</h3><p>{state.meaning}</p>
          </li>)}
        </ul>
        <figcaption className="fn-label">Fig. 04.2 / Five-state visual lexicon. An interaction inventory, not an impact metric.</figcaption>
      </figure>
      <div id="simulation" className="pf-anchor">
        <h3>Try the state contract.</h3>
        <p className="pf-caption">Fictional portfolio simulation. Advance the scenario explicitly, respond to a simulated request, pause or retry. These controls do not operate Windows or a real agent.</p>
        <AgentDemo />
      </div>
    </CaseSection>

    <CaseSection id="constraints" tone="paper" className="pf-constraints-section">
      <PortfolioMedia id="agents-constraints" number="05.1" />
      <h2 data-pf-reveal="reading">A shared contract meant saying no.</h2>
      <Prose>
        <p>Windows needs a stable interaction contract while agent providers change their capabilities and outputs. Partner teams wanted the detailed progress views, custom visualizations and specialized features available inside their own apps. The shared OS surface could not become all of those interfaces at once.</p>
        <p>We kept the taskbar contract focused on visibility, inspection and intervention. Rich provider-specific experiences could exist elsewhere without making each agent behave differently at the system level.</p>
      </Prose>
      <div id="iteration" className="pf-anchor">
        <h3>Test the contract in the shell, not just on a board.</h3>
        <Prose>
          <p>We prototyped in the actual shell with engineering and product partners, tested multiple agents running at once, and watched the UI as they changed state. Each micro-interaction had to reconcile what Windows could do, what provider data could tell us, and what people expected next.</p>
          <p>The hard cases were not only the happy path. One agent could need help while another continued working. Keeping those tasks independently inspectable was part of the iteration, not something a single-agent mockup could establish.</p>
        </Prose>
      </div>
      <PortfolioMedia id="AGENTS-M01" />
    </CaseSection>

    <CaseSection id="impact" title="What the work established.">
      <Split>
        <Prose>
          <p>The work defined a shared way for agents to appear, report progress and request help through Windows surfaces. The invocation recordings, taskbar keyframes and state language document that interaction contract.</p>
          <p>This platform work is ongoing. Shell prototypes and cross-team collaboration are the evidence presented here—not adoption metrics or a claim that every depicted behavior is generally available.</p>
        </Prose>
        <PortfolioMedia id="agents-announcement" number="06" />
      </Split>
      <nav className="pf-next" aria-label="Next case"><ShinyLink href="/recall">Windows Recall</ShinyLink></nav>
    </CaseSection>
  </CaseLayout>
}

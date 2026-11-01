import Image from "next/image"
import { ManualShell } from "../recall/ManualShell"
import {
  CaseBrief,
  CoverPlate,
  Figure,
  HeroIntro,
  ManualFooter,
  MediaSlot,
  NextProject,
  SectionLabel,
  SpecSheet,
  TopBar,
} from "@/components/manual"
import { DelegationSequence } from "./DelegationSequence"
import styles from "./copilot-actions.module.css"

const SOURCES = [
  {
    publisher: "MICROSOFT · 16 OCT 2025",
    title: "Securing AI agents on Windows",
    detail: "Agent workspaces, access controls, and the published product screens shown here.",
    href: "https://blogs.windows.com/windowsexperience/2025/10/16/securing-ai-agents-on-windows/",
  },
  {
    publisher: "MICROSOFT · 16 OCT 2025",
    title: "Making every Windows 11 PC an AI PC",
    detail: "The announcement of local computer use in Copilot Actions.",
    href: "https://blogs.windows.com/windowsexperience/2025/10/16/making-every-windows-11-pc-an-ai-pc/",
  },
  {
    publisher: "THURROTT · 16 OCT 2025",
    title: "Microsoft explains how it will secure AI agents in Windows 11",
    detail: "Independent coverage of the security and privacy approach.",
    href: "https://www.thurrott.com/windows/windows-11/328457/microsoft-explains-how-it-will-secure-ai-agents-in-windows-11",
  },
  {
    publisher: "PCMAG · 16 OCT 2025",
    title: "Microsoft really wants you to talk to your PC (and Copilot)",
    detail: "Reporting on the broader Copilot announcement and computer-use experience.",
    href: "https://www.pcmag.com/news/microsoft-heres-why-you-should-talk-to-your-windows-11-pc",
  },
]

export default function CopilotActionsPage() {
  return (
    <ManualShell>
      <TopBar />
      <main className={`container ${styles.page}`}>
        {/* §2.1 Hero Header — public product imagery, not reconstructed UI. */}
        <section data-section id="overview" className={styles.hero}>
          <HeroIntro
            eyebrow="CASE FILE / COPILOT ACTIONS"
            eyebrowClassName="t-mono-label editorial-hero-index"
            startDelay={120}
            wordStep={42}
            lines={[{ text: "Delegating work. Keeping control.", className: `t-display-xl ${styles.headline}` }]}
          />
          <p className={`t-body ${styles.lead}`}>
            Designing the experience of letting an AI agent work with your apps
            and files—while keeping you in charge of your PC.
          </p>
          <CaseBrief
            problem="An agent that operates apps and files changes what it means to ask for help. People need to know what they are allowing, what is happening now, and how to step in."
            ownership="Computer-use interaction patterns for Copilot on Windows, including the settings and safety features around them."
            decision="Treat stepping in as part of delegation: keep the task, the agent's workspace and the takeover action visible together."
            outcome="Public announcement material shows the opt-in onboarding, contained agent workspace and paused-with-Take-control state described here."
            status="Experimental capability announced October 2025. This case documents the public record; it makes no adoption or availability claims."
            links={[{ href: "#interaction-model", label: "Delegation model" }, { href: "#workspace", label: "Agent workspace" }, { href: "#intervention", label: "Stepping in" }]}
          />
          <Figure
            number="0.1"
            caption="Copilot Actions in the October 2025 announcement. The task, workspace, and handoff remain visible together. Image: Microsoft."
            className={styles.heroFigure}
          >
            <a href="/images/copilot-actions/announcement-app.png" target="_blank" rel="noreferrer" aria-label="Open Microsoft’s Copilot Actions product screen at full size (new tab)">
              <Image
                src="/images/copilot-actions/announcement-app.png"
                alt="Copilot working on travel videos. An app selection blocks progress; the conversation asks for a choice, with Paused status and a Take control button."
                width={1920}
                height={1236}
                priority
                sizes="(min-width: 1280px) 1120px, 100vw"
                className={styles.productImage}
              />
            </a>
          </Figure>
        </section>

        {/* §2.2 Spec Sheet Block */}
        <section data-section data-reveal id="scope" className={styles.scope}>
          <SpecSheet rows={[
            { label: "ROLE", value: "Product & interaction design" },
            { label: "PLATFORM", value: "Copilot on Windows 11" },
            { label: "MY SCOPE", value: "Computer-use patterns, settings & safety features" },
            { label: "PUBLIC MILESTONE", value: "October 2025 · experimental capability announced" },
          ]} />
          <p className={`t-mono-caption ${styles.draftLabel}`}>WORKING DRAFT · Project narrative for review</p>
        </section>

        {/* §2.3 Body Column with Running Margin */}
        <section data-section data-reveal id="challenge" className={styles.section}>
          <SectionLabel title="An answer is something you read. An action changes something." />
          <div className={styles.bodyWithMargin}>
            <div className={styles.prose}>
              <p className="t-body">
                Computer use changes what it means to ask for help. A response
                stays in a conversation; an agent can operate the applications
                and files that conversation is about. That makes access, progress,
                and intervention central to the experience.
              </p>
              <p className="t-body">
                My work spanned the computer-using agent experience for Copilot
                on Windows, including the app interaction patterns and its settings
                and safety features. The design challenge connected all of them:
                how does someone hand over a task without feeling they have handed
                over their computer?
              </p>
            </div>
            <aside className={styles.questions} aria-label="Questions the experience needs to answer">
              <p className="t-mono-label">THE USER’S QUESTIONS</p>
              <ul>
                <li>What am I allowing?</li>
                <li>What is happening now?</li>
                <li>How do I step in?</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* §2.10 Cover Plate — problem to interaction model */}
        <CoverPlate number="02" title="Control follows the work." />

        {/* §2.5 Stage Rail Plate — explicit editorial model, not a product simulator */}
        <section data-section data-reveal id="interaction-model" className={styles.section}>
          <SectionLabel title="Delegation is a sequence of decisions." />
          <p className={`t-body ${styles.intro}`}>
            A useful way to read this experience is through the moments when
            responsibility changes hands. Each moment asks a different question
            of the interface.
          </p>
          <Figure number="2.1" caption="An editorial model of delegation. Select a stage to explore the interaction question; this is not a simulation of the product.">
            <DelegationSequence />
          </Figure>
        </section>

        {/* §2.8 Full-bleed Plate + §2.9 Strip Break */}
        <section data-section data-reveal id="access" className={styles.section}>
          <SectionLabel title="Make the first handoff explicit." />
          <p className={`t-body ${styles.intro}`}>
            Copilot Actions was announced as opt-in. The published onboarding
            connects enabling the feature with access to local folders, explains
            its experimental nature, and directs the user into Windows Settings.
            The design question is what someone needs to understand before they
            make that choice.
          </p>
          <Figure
            number="3.1"
            caption="Published onboarding: enabling the capability, explaining access, and opening Settings. October 2025. Image: Microsoft."
          >
            <a href="/images/copilot-actions/announcement-onboarding.png" target="_blank" rel="noreferrer" aria-label="Open Microsoft’s onboarding screen at full size (new tab)">
              <Image
                src="/images/copilot-actions/announcement-onboarding.png"
                alt="Copilot onboarding explains the Experimental agentic features setting, access to local folders, and experimental risks, with Cancel and Open Settings actions."
                width={1920}
                height={1307}
                sizes="(min-width: 1280px) 1120px, 100vw"
                className={styles.productImage}
              />
            </a>
          </Figure>
          <dl className={styles.accessStrip}>
            <div><dt className="t-mono-label">CAPABILITY</dt><dd className="t-body-sm">What am I turning on?</dd></div>
            <div><dt className="t-mono-label">ACCESS</dt><dd className="t-body-sm">What can it work with?</dd></div>
            <div><dt className="t-mono-label">CHOICE</dt><dd className="t-body-sm">Where do I manage it?</dd></div>
          </dl>
        </section>

        {/* §2.4 Annotated Split Plate */}
        <section data-section data-reveal id="workspace" className={styles.section}>
          <SectionLabel title="Give the agent room to work." />
          <Figure number="4.1" caption="Conceptual relationship from the announced workspace model. Separate work environments, with user oversight. Not an implementation diagram.">
            <div className={styles.splitPlate}>
              <div className={styles.splitCopy}>
                <p className="t-body">
                  The announced agent workspace provides a contained environment
                  where Copilot can work alongside the user. It operates under a
                  separate agent account, with boundaries around access.
                </p>
                <p className="t-body">
                  That separation creates an interaction challenge: the agent’s
                  work still needs to be understandable and reachable. Giving it
                  its own space should not mean losing track of the task.
                </p>
              </div>
              <div className={styles.workspaceDiagram} role="img" aria-label="Your desktop and the contained agent workspace are separate. You can check progress or take control of the agent’s work.">
                <div className={styles.workspaceWindow}>
                  <span className="t-mono-label">YOUR DESKTOP</span>
                  <strong>Your ongoing work</strong>
                  <div className={styles.windowLines} aria-hidden="true"><i /><i /><i /></div>
                </div>
                <div className={styles.workspaceBridge}>
                  <span aria-hidden="true">↓</span>
                  <span className="t-mono-label">CHECK IN · TAKE CONTROL</span>
                </div>
                <div className={styles.workspaceWindow}>
                  <span className="t-mono-label">AGENT WORKSPACE</span>
                  <strong>The delegated task</strong>
                  <span className="t-body-sm">Separate account · contained environment</span>
                </div>
              </div>
            </div>
          </Figure>
        </section>

        {/* §2.11 Pull-quote Interlude — design proposition, no invented research quote */}
        <section data-reveal className={styles.interlude} aria-label="Design proposition">
          <p className="t-display-l">Stepping in is part of delegation.</p>
        </section>

        {/* §2.13 Data Table Block — different user needs, not interchangeable controls */}
        <section data-section data-reveal id="intervention" className={styles.section}>
          <SectionLabel title="Make the next human action clear." />
          <p className={`t-body ${styles.intro}`}>
            In the published travel-video example, progress stops at an app
            choice. The interface brings together the question, a paused state,
            and a takeover action. The broader interaction problem is helping
            someone understand whether to provide information, take over, or
            change the agent’s access.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.controlTable}>
              <caption className="t-mono-caption">Three distinct user needs the interaction model must account for.</caption>
              <thead><tr><th scope="col">USER NEED</th><th scope="col">INTERFACE RESPONSIBILITY</th></tr></thead>
              <tbody>
                <tr><th scope="row">“I can answer that.”</th><td>Explain the missing decision in the context of the task.</td></tr>
                <tr><th scope="row">“Let me do this part.”</th><td>Make the handoff to direct control discoverable.</td></tr>
                <tr><th scope="row">“Change what it can access.”</th><td>Provide a route back to permissions and settings.</td></tr>
              </tbody>
            </table>
          </div>
          <MediaSlot
            number="5.1"
            title="Delegate, check in, take control, hand back"
            seconds={12}
            shots={[
              "Type a task into Copilot; the agent workspace opens beside your desktop",
              "Agent progresses through two steps; status updates in the conversation",
              "Agent pauses at a decision it can't make; the question and Paused state appear together",
              "Select Take control; complete the step yourself",
              "Hand back; the agent resumes and finishes; show the result in context",
            ]}
          />
        </section>

        {/* §2.3 Body Column — scope, not unsubstantiated impact */}
        <section data-section data-reveal id="perspective" className={styles.section}>
          <SectionLabel title="From individual screens to a coherent experience." />
          <div className={`${styles.prose} ${styles.intro}`}>
            <p className="t-body">
              Settings and safety are part of the same product story as the
              task itself. The opportunity is to connect the initial request,
              the access it requires, and the moments when a person needs to
              return to the work.
            </p>
            <p className="t-body">
              This project sits alongside my broader work on Agents in Windows:
              the Copilot experience explores the depth of computer use inside
              an app, while the Windows work addresses how agent activity becomes
              visible across the operating system.
            </p>
          </div>
        </section>

        {/* §2.13 Data Table Block — source trail */}
        <section data-section data-reveal id="sources" className={styles.section}>
          <SectionLabel title="Public record" />
          <p className={`t-body-sm ${styles.intro}`}>
            These sources document the October 2025 announcement, not current
            availability or measured product outcomes. Product imagery is
            reproduced from Microsoft’s announcement.
          </p>
          <ol className={styles.sources}>
            {SOURCES.map((source) => (
              <li key={source.href}>
                <span className="t-mono-label">{source.publisher}</span>
                <div>
                  <a href={source.href} target="_blank" rel="noreferrer" className="t-h3">
                    {source.title} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <p className="t-body-sm">{source.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <details className={styles.reviewNotes}>
            <summary>Draft review notes</summary>
            <div className={styles.prose}>
              <p className="t-body-sm">This first pass uses Bryce’s stated scope and public product material. Before publishing, add:</p>
              <ul className="t-body-sm">
                <li>Exact ownership, dates, and collaborators.</li>
                <li>Two or three design decisions, alternatives, and the evidence behind them.</li>
                <li>Original design artifacts or a walkthrough that can be shared publicly.</li>
                <li>Verified implementation milestones and outcomes.</li>
              </ul>
            </div>
          </details>
        </section>
      </main>
      <NextProject href="/agents-in-windows" title="Agents in Windows" />
      <ManualFooter />
    </ManualShell>
  )
}

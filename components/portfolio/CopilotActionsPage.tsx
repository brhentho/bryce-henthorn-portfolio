import { CoverPlate } from "@/components/manual/CoverPlate"
import { ScrollRevealController } from "@/components/manual/ScrollRevealController"
import { RegistrationMark } from "@/components/manual/RegistrationMark"
import { DelegationSequence } from "@/app/copilot-actions/DelegationSequence"
import { ComposerExplorations } from "@/app/copilot-actions/ComposerExplorations"
import styles from "@/app/copilot-actions/copilot-actions.module.css"
import { CaseLayout } from "./CaseLayout"
import { CaseSection, Pair, Prose, ShinyLink } from "./Blocks"
import { PortfolioMedia } from "./PortfolioMedia"

const chapters = [
  { id: "challenge", label: "The challenge of computer use" },
  { id: "interaction-model", label: "The delegation model" },
  { id: "access", label: "Access and onboarding" },
  { id: "workspace", label: "The agent workspace" },
  { id: "intervention", label: "Stepping in" },
  { id: "perspective", label: "A coherent experience" },
  { id: "sources", label: "Public record" },
] as const

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

export function CopilotActionsPage() {
  return (
    <CaseLayout
      page="copilot-actions"
      title="Delegating work. Keeping control."
      deck="An agent that operates your apps and files has to stay understandable and interruptible."
      call="We kept the task, its workspace and the takeover action in view together."
      status="Working draft · narrative for review"
      ledger={[
        { label: "Role", value: "Product & interaction design" },
        { label: "Scope", value: "Computer-use patterns, settings & safety" },
        { label: "Platform", value: "Copilot on Windows 11" },
        { label: "Milestone", value: "Oct 2025 · experimental, announced" },
      ]}
      hero={{
        src: "/images/copilot-actions/cua-hero.png", width: 1504, height: 1024,
        alt: "Copilot working on a restaurant reservation, with a browser workspace, task progress and a Take control action beside the conversation",
        caption: "Restaurant reservation task: the workspace, progress and Take control action stay in view. Supplied design image.",
        linkToOriginal: true,
      }}
      chapters={chapters}
    >
        {/* §2.3 Body Column with Running Margin */}
        <CaseSection id="challenge" title="An answer is something you read. An action changes something." tone="ink">
          <div className={styles.bodyWithMargin}>
            <Prose>
              <p>
                Computer use changes what it means to ask for help. A response
                stays in a conversation; an agent can operate the applications
                and files that conversation is about. That makes access, progress,
                and intervention central to the experience.
              </p>
              <p>
                The design challenge connects app interaction patterns, settings
                and safety:
                how does someone hand over a task without feeling they have handed
                over their computer?
              </p>
            </Prose>
            <aside className={styles.questions} aria-label="Questions the experience needs to answer" data-pf-reveal="reading">
              <p className="fn-label">The user’s questions</p>
              <ul>
                <li>What am I allowing?</li>
                <li>What is happening now?</li>
                <li>How do I step in?</li>
              </ul>
            </aside>
          </div>
        </CaseSection>

        {/* §2.10 Cover Plate — problem to interaction model */}
        <div className={`manual ${styles.chapterCover}`}>
          <ScrollRevealController />
          <CoverPlate number="02" title="Control follows the work." />
        </div>

        {/* §2.5 Stage Rail Plate — explicit editorial model, not a product simulator */}
        <CaseSection id="interaction-model" title="Delegation is a sequence of decisions.">
          <Prose><p>
            A useful way to read this experience is through the moments when
            responsibility changes hands. Each moment asks a different question
            of the interface.
          </p></Prose>
          <figure className="pf-media" data-pf-reveal="evidence">
            <DelegationSequence />
            <figcaption className="fn-label">Fig. 02 / An editorial model of delegation. Select a stage to explore the interaction question; this is not a simulation of the product.</figcaption>
          </figure>
        </CaseSection>

        {/* §2.8 Full-bleed Plate + §2.9 Strip Break */}
        <CaseSection id="access" title="Make the first handoff explicit.">
          <Prose><p>
            Copilot Actions was announced as opt-in. The published onboarding
            connects enabling the feature with access to local folders, explains
            its experimental nature, and directs the user into Windows Settings.
            The design question is what someone needs to understand before they
            make that choice.
          </p></Prose>
          <PortfolioMedia id="cua-onboarding" number="03" linkToOriginal />
          <dl className={styles.accessStrip} data-pf-reveal="reading">
            <div><dt className="fn-label">Capability</dt><dd>What am I turning on?</dd></div>
            <div><dt className="fn-label">Access</dt><dd>What can it work with?</dd></div>
            <div><dt className="fn-label">Choice</dt><dd>Where do I manage it?</dd></div>
          </dl>
        </CaseSection>

        {/* §2.4 Annotated Split Plate */}
        <CaseSection id="workspace" title="Give the agent room to work.">
          <figure className="pf-media" data-pf-reveal="evidence">
            <div className={styles.splitPlate}>
              <RegistrationMark className={styles.registration} aria-hidden="true" />
              <div className="xr-prose pf-prose">
                <p>
                  The announced agent workspace provides a contained environment
                  where Copilot can work alongside the user. It operates under a
                  separate agent account, with boundaries around access.
                </p>
                <p>
                  That separation creates an interaction challenge: the agent’s
                  work still needs to be understandable and reachable. Giving it
                  its own space should not mean losing track of the task.
                </p>
              </div>
              <div className={styles.workspaceDiagram} role="img" aria-label="Your desktop and the contained agent workspace are separate. You can check progress or take control of the agent’s work.">
                <div className={styles.workspaceWindow}>
                  <span className="fn-label">Your desktop</span>
                  <strong>Your ongoing work</strong>
                  <div className={styles.windowLines} aria-hidden="true"><i /><i /><i /></div>
                </div>
                <div className={styles.workspaceBridge}>
                  <span aria-hidden="true">↓</span>
                  <span className="fn-label">Check in · Take control</span>
                </div>
                <div className={styles.workspaceWindow}>
                  <span className="fn-label">Agent workspace</span>
                  <strong>The delegated task</strong>
                  <span>Separate account · contained environment</span>
                </div>
              </div>
            </div>
            <figcaption className="fn-label">Fig. 04 / Conceptual relationship from the announced workspace model. Separate work environments, with user oversight. Not an implementation diagram.</figcaption>
          </figure>
        </CaseSection>

        {/* §2.11 Pull-quote Interlude — design proposition, no invented research quote */}
        <section className={`fn-case-section ${styles.interlude}`} aria-label="Design proposition">
          <p data-pf-reveal="reading">Stepping in is part of delegation.</p>
        </section>

        {/* §2.6 Two-up Comparison + §2.13 alternative/state matrix */}
        <CaseSection id="intervention" title="Pause to steer. Take control to do.">
          <Prose><p>
            Stepping in does not always mean taking over. Sometimes the person
            wants to do a step directly. Sometimes the agent needs an answer
            before it can continue. We explored how to make those two moments
            distinct without making the task feel like it had ended.
          </p></Prose>
          <Pair>
            <PortfolioMedia id="cua-take-control" number="05a" linkToOriginal />
            <PortfolioMedia id="cua-hand-raise" number="05b" linkToOriginal />
          </Pair>
          <p className="fn-label">Direct control / a request for input. Supplied design stills; recordings will show the transitions.</p>
          <Prose>
            <p>
              In the reservation task, “You’re in control” makes the handoff
              explicit and keeps Resume nearby. In the video task, the agent
              asks which app to use; “Use Capcut” answers that question in the
              composer. One changes who is operating the workspace. The other
              supplies the decision the agent is missing.
            </p>
            <p>
              The composer exposed a related problem: while an action was
              running, it was disabled, leaving no place to redirect the work.
              Our starting hypothesis was that pause and stop should not need
              separate buttons in the running state. Interrupt first, then
              reveal the relevant choices.
            </p>
          </Prose>
          <div data-pf-reveal="reading">
            <table className={styles.controlTable}>
              <caption className="fn-label">Three explorations, not a selected or validated solution.</caption>
              <thead><tr><th scope="col">EXPLORATION</th><th scope="col">WHAT IT ASKS</th></tr></thead>
              <tbody>
                <tr><th scope="row">Keep the familiar layout</th><td>Can one running control reveal the composer, Resume and an explicit end action only when needed?</td></tr>
                <tr><th scope="row">Move controls with the state</th><td>Does placing Resume and stop beside the paused status make the next choice clearer?</td></tr>
                <tr><th scope="row">Keep the composer available</th><td>Can someone steer without pausing first, with continuation and cancellation resolved separately?</td></tr>
              </tbody>
            </table>
          </div>
          <ComposerExplorations />
          <Prose><p>
            The second board adds the redirect message to make the tradeoff
            concrete. It also changes “Action stopped” to “Action paused” in
            the first option. That distinction still needs a decision: these
            explorations use “stopped” for a state that can resume, not only
            for a task that is finished. A recording should establish what
            happens after the person sends an instruction, hands back control,
            or cancels.
          </p></Prose>
          <PortfolioMedia id="CUA-M01" />
        </CaseSection>

        {/* §2.3 Body Column — scope, not unsubstantiated impact */}
        <CaseSection id="perspective" title="From individual screens to a coherent experience.">
          <Prose>
            <p>
              Settings and safety are part of the same product story as the
              task itself. The opportunity is to connect the initial request,
              the access it requires, and the moments when a person needs to
              return to the work.
            </p>
            <p>
              This project sits alongside Agents in Windows:
              the Copilot experience explores the depth of computer use inside
              an app, while the Windows work addresses how agent activity becomes
              visible across the operating system.
            </p>
          </Prose>
          <nav className="pf-next" aria-label="Next case"><ShinyLink href="/agents-in-windows">Agents in Windows</ShinyLink></nav>
        </CaseSection>

        {/* §2.13 Data Table Block — source trail */}
        <CaseSection id="sources" title="Public record">
          <Prose><p>
            These sources document the October 2025 announcement, not current
            availability or measured product outcomes. The onboarding image is
            reproduced from Microsoft’s announcement. The opening, takeover and
            hand-raise images were supplied separately; the composer boards are
            design explorations, not evidence of shipped behavior.
          </p></Prose>
          <ol className={styles.sources}>
            {SOURCES.map((source) => (
              <li key={source.href} data-pf-reveal="reading">
                <span className="fn-label">{source.publisher}</span>
                <div>
                  <a href={source.href} target="_blank" rel="noreferrer">
                    {source.title} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <p>{source.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <details className={styles.reviewNotes}>
            <summary>Draft review notes</summary>
            <div>
              <p>This draft uses Bryce’s stated scope, supplied design images, composer explorations and public product material. Before publishing, add:</p>
              <ul>
                <li>Exact ownership, dates, and collaborators.</li>
                <li>Two or three design decisions, alternatives, and the evidence behind them.</li>
                <li>Original design artifacts or a walkthrough that can be shared publicly.</li>
                <li>Verified implementation milestones and outcomes.</li>
              </ul>
            </div>
          </details>
        </CaseSection>
    </CaseLayout>
  )
}

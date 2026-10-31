"use client"

import Image from "next/image"
import { useReducer } from "react"
import { agentReducer, agentStatuses, initialAgentState, type AgentStatus } from "@/lib/agent-simulation"

const STATES: Record<AgentStatus, { label: string; asset: string; headline: string; detail: string; reason: string }> = {
  running: {
    label: "Running", asset: "Running agent.svg", headline: "Gathering material for your brief",
    detail: "The agent reports its current step. You can check progress or pause the task without reopening the conversation.",
    reason: "Visibility belongs in a familiar place. The taskbar gives ongoing work a return point; the expanded card explains its state.",
  },
  attention: {
    label: "Needs attention", asset: "Needs attention agent.svg", headline: "Your approval is needed",
    detail: "The next source requires access. Work stops here until you choose to continue. This simulated approval grants no real access.",
    reason: "Attention is different from activity. Name the blocker and put the next meaningful action beside it, without losing task context.",
  },
  paused: {
    label: "Paused", asset: "Paused agent.svg", headline: "You paused this task",
    detail: "The current step is preserved. Resume when you are ready; work does not silently continue in the background.",
    reason: "Control must be visible. A pause has a distinct state so a deliberate interruption cannot be mistaken for a stalled agent.",
  },
  completed: {
    label: "Completed", asset: "Completed agent.svg", headline: "Your brief is ready to review",
    detail: "The task has finished. Its final status remains visible so you can return to the result on your own schedule.",
    reason: "Completion closes the loop. A stable result state makes the handoff from automated work back to human judgment explicit.",
  },
  failed: {
    label: "Failed", asset: "Failed agent.svg", headline: "The source could not be reached",
    detail: "This task could not continue. Retry starts the example again; failure is never presented as successful completion.",
    reason: "Failure needs a recovery path. Explain what stopped and offer a clear next action instead of leaving an indefinite progress indicator.",
  },
}

const STEPS = ["Gather sources", "Request approval", "Prepare the brief", "Ready for review"]

export function AgentSimulation() {
  const [state, dispatch] = useReducer(agentReducer, initialAgentState)
  const current = STATES[state.status]
  const runningHeadline = state.step === 2 ? "Preparing your brief" : current.headline

  return (
    <div className="agent-simulation">
      <div className="simulation-intro">
        <p className="t-mono-label">Portfolio simulation · illustrative scenario</p>
        <p className="t-body-sm mt-3">Explore the shared state language using the published agent icons. This local example does not run an agent or connect to your data. Use Next step to advance; nothing progresses automatically.</p>
      </div>
      <fieldset className="simulation-states">
        <legend className="t-mono-label">Inspect a state</legend>
        <div className="simulation-state-buttons">
          {agentStatuses.map((status) => (
            <button key={status} type="button" aria-pressed={state.status === status}
              onClick={() => dispatch({ type: "inspect", status })}>
              <Image src={`/assets/agents/${STATES[status].asset}`} width={32} height={32} alt="" />
              <span className="t-mono-caption">{STATES[status].label}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="simulation-split">
        <div className="simulation-surface">
          <div className="simulation-card">
            <div className="simulation-card-heading">
              <Image src={`/assets/agents/${current.asset}`} width={40} height={40} alt="" />
              <div><p className="t-mono-label">Research agent · example task</p><p className="t-body-sm mt-2">Prepare a project brief</p></div>
            </div>
            <div role="status" aria-live="polite" aria-atomic="true" className="simulation-status">
              <p className="t-mono-label">{current.label} · step {state.step + 1} of 4</p>
              <h3 className="t-h3 mt-3">{state.status === "running" ? runningHeadline : current.headline}</h3>
              <p className="t-body-sm mt-3">{current.detail}</p>
            </div>
            <ol className="simulation-steps" aria-label="Example task progress">
              {STEPS.map((step, index) => (
                <li key={step} aria-current={index === state.step ? "step" : undefined} data-done={index < state.step}>
                  <span className="t-mono-caption" aria-hidden="true">{index < state.step ? "✓" : String(index + 1).padStart(2, "0")}</span>
                  <span className="t-body-sm">{step}{index < state.step && <span className="sr-only"> — complete</span>}</span>
                </li>
              ))}
            </ol>
            <div className="simulation-actions">
              <button type="button" onClick={() => dispatch({ type: "advance" })} disabled={state.status !== "running"}>Next step</button>
              <button type="button" onClick={() => dispatch({ type: "pause" })} disabled={state.status !== "running"}>Pause task</button>
              <button type="button" onClick={() => dispatch({ type: "resume" })} disabled={state.status !== "paused"}>Resume task</button>
              <button type="button" onClick={() => dispatch({ type: "approve" })} disabled={state.status !== "attention"}>Approve & continue</button>
            </div>
          </div>
        </div>
        <aside className="simulation-explanation" aria-label="Why this state matters">
          <p className="t-mono-label">Design intent</p>
          <p className="t-body mt-4">{current.reason}</p>
          <dl className="simulation-contract">
            <div><dt className="t-mono-label">State</dt><dd className="t-body-sm mt-2">What is happening?</dd></div>
            <div><dt className="t-mono-label">Control</dt><dd className="t-body-sm mt-2">What can I do next?</dd></div>
            <div><dt className="t-mono-label">Continuity</dt><dd className="t-body-sm mt-2">Where can I return to the work?</dd></div>
          </dl>
          <div className="simulation-actions">
            <button type="button" onClick={() => dispatch({ type: "fail" })} disabled={state.status !== "running"}>Simulate failure</button>
            <button type="button" onClick={() => dispatch({ type: "retry" })} disabled={state.status !== "failed"}>Retry task</button>
            <button type="button" onClick={() => dispatch({ type: "reset" })}>Reset example</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

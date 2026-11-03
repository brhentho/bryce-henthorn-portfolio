"use client"

import { AGENTS } from "@/lib/explore/content"
import { SIM_STATES, SIM_STEPS, agentStatuses, type useAgentSim } from "@/lib/explore/simulation"

type Sim = ReturnType<typeof useAgentSim>

/** State inspector — the five published icons as toggle buttons. */
export function SimStates({ sim, className = "" }: { sim: Sim; className?: string }) {
  return (
    <fieldset className={`xp-sim-states ${className}`}>
      <legend className="xp-mono">Inspect a state</legend>
      <div className="xp-sim-state-row">
        {agentStatuses.map((status) => (
          <button
            key={status}
            type="button"
            className="xp-sim-state"
            aria-pressed={sim.state.status === status}
            onClick={() => sim.inspect(status)}
          >
            <img src={SIM_STATES[status].asset} width={28} height={28} alt="" />
            <span>{SIM_STATES[status].label}</span>
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/** Status, steps and controls for the illustrative task. Layout is owned by each direction. */
export function SimCard({ sim, className = "", compact = false }: { sim: Sim; className?: string; compact?: boolean }) {
  const { state, current, headline } = sim
  const primary = sim.actions.filter((a) => ["advance", "approve", "pause", "resume"].includes(a.id))
  const secondary = sim.actions.filter((a) => ["fail", "retry"].includes(a.id))

  return (
    <div className={`xp-sim-card ${className}`} data-status={state.status}>
      <div className="xp-sim-head">
        <img src={current.asset} width={36} height={36} alt="" />
        <div>
          <p className="xp-mono">Research agent · example task</p>
          <p className="xp-body-sm">Prepare a project brief</p>
        </div>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true" className="xp-sim-status">
        <p className="xp-mono">
          {current.label} · step {state.step + 1} of 4
        </p>
        <p className="xp-h3">{headline}</p>
        {!compact && <p className="xp-body-sm">{current.detail}</p>}
      </div>
      <ol className="xp-sim-steps" aria-label="Example task progress">
        {SIM_STEPS.map((step, index) => (
          <li
            key={step}
            aria-current={index === state.step ? "step" : undefined}
            data-done={index < state.step ? "true" : undefined}
          >
            <span aria-hidden="true">{index < state.step ? "✓" : String(index + 1).padStart(2, "0")}</span>
            <span>
              {step}
              {index < state.step && <span className="sr-only"> — complete</span>}
            </span>
          </li>
        ))}
      </ol>
      <div className="xp-sim-actions">
        {primary.map((a) => (
          <button key={a.id} type="button" className="xp-btn" onClick={a.run} disabled={!a.enabled}>
            {a.label}
          </button>
        ))}
      </div>
      <div className="xp-sim-actions xp-sim-actions-secondary">
        {secondary.map((a) => (
          <button key={a.id} type="button" className="xp-btn" onClick={a.run} disabled={!a.enabled}>
            {a.label}
          </button>
        ))}
        <button type="button" className="xp-btn" onClick={sim.reset}>
          Reset example
        </button>
      </div>
    </div>
  )
}

export function SimIntent({ sim, className = "" }: { sim: Sim; className?: string }) {
  return (
    <div className={`xp-sim-intent ${className}`}>
      <p className="xp-mono">Design intent · {sim.current.label}</p>
      <p className="xp-body">{sim.current.reason}</p>
    </div>
  )
}

export function SimDisclaimer({ className = "" }: { className?: string }) {
  return <p className={`xp-sim-note ${className}`}>{AGENTS.simulation.disclaimer}</p>
}

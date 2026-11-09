"use client"

import { useReducer } from "react"
import { agentReducer, agentStatuses, initialAgentState, type AgentStatus } from "@/lib/agent-simulation"

/**
 * Copy mirrors components/manual/AgentSimulation.tsx so every direction shares
 * one illustrative scenario. Each direction renders its own surface on top of
 * the same tested reducer.
 */
export const SIM_STATES: Record<
  AgentStatus,
  { label: string; asset: string; headline: string; detail: string; reason: string; tone: string }
> = {
  running: {
    label: "Running",
    asset: "/assets/agents/Running agent.svg",
    headline: "Gathering material for your brief",
    detail:
      "The agent reports its current step. You can check progress or pause the task without reopening the conversation.",
    reason:
      "Visibility belongs in a familiar place. The taskbar gives ongoing work a return point; the expanded card explains its state.",
    tone: "#3B7BE0",
  },
  attention: {
    label: "Needs attention",
    asset: "/assets/agents/Needs attention agent.svg",
    headline: "Your approval is needed",
    detail:
      "The next source requires access. Work stops here until you choose to continue. This simulated approval grants no real access.",
    reason:
      "Attention is different from activity. Name the blocker and put the next meaningful action beside it, without losing task context.",
    tone: "#E0A23B",
  },
  paused: {
    label: "Paused",
    asset: "/assets/agents/Paused agent.svg",
    headline: "You paused this task",
    detail:
      "The current step is preserved. Resume when you are ready; work does not silently continue in the background.",
    reason:
      "Control must be visible. A pause has a distinct state so a deliberate interruption cannot be mistaken for a stalled agent.",
    tone: "#8A8F99",
  },
  completed: {
    label: "Completed",
    asset: "/assets/agents/Completed agent.svg",
    headline: "Your brief is ready to review",
    detail:
      "The task has finished. Its final status remains visible so you can return to the result on your own schedule.",
    reason:
      "Completion closes the loop. A stable result state makes the handoff from automated work back to human judgment explicit.",
    tone: "#3BB27A",
  },
  failed: {
    label: "Failed",
    asset: "/assets/agents/Failed agent.svg",
    headline: "The source could not be reached",
    detail:
      "This task could not continue. Retry starts the example again; failure is never presented as successful completion.",
    reason:
      "Failure needs a recovery path. Explain what stopped and offer a clear next action instead of leaving an indefinite progress indicator.",
    tone: "#D9534A",
  },
}

export const SIM_STEPS = ["Gather sources", "Request approval", "Prepare the brief", "Ready for review"]

export { agentStatuses }
export type { AgentStatus }

export function useAgentSim() {
  const [state, dispatch] = useReducer(agentReducer, initialAgentState)
  const current = SIM_STATES[state.status]
  const headline =
    state.status === "running" && state.step === 2 ? "Preparing your brief" : current.headline

  const actions = [
    { id: "advance", label: "Next step", enabled: state.status === "running", run: () => dispatch({ type: "advance" }) },
    { id: "approve", label: "Approve & continue", enabled: state.status === "attention", run: () => dispatch({ type: "approve" }) },
    { id: "pause", label: "Pause task", enabled: state.status === "running", run: () => dispatch({ type: "pause" }) },
    { id: "resume", label: "Resume task", enabled: state.status === "paused", run: () => dispatch({ type: "resume" }) },
    { id: "fail", label: "Simulate failure", enabled: state.status === "running", run: () => dispatch({ type: "fail" }) },
    { id: "retry", label: "Retry task", enabled: state.status === "failed", run: () => dispatch({ type: "retry" }) },
  ] as const

  return {
    state,
    current,
    headline,
    actions,
    inspect: (status: AgentStatus) => dispatch({ type: "inspect", status }),
    reset: () => dispatch({ type: "reset" }),
  }
}

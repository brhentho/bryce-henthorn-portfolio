export const agentStatuses = ["running", "attention", "paused", "completed", "failed"] as const
export type AgentStatus = (typeof agentStatuses)[number]
export type AgentState = { status: AgentStatus; step: 0 | 1 | 2 | 3 }
export type AgentAction =
  | { type: "advance" | "approve" | "pause" | "resume" | "fail" | "retry" | "reset" }
  | { type: "inspect"; status: AgentStatus }

export const initialAgentState: AgentState = { status: "running", step: 0 }

/** Local, user-stepped illustration. No agent, permission, or network calls. */
export function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case "reset": return { ...initialAgentState }
    case "inspect": return {
      status: action.status,
      step: action.status === "completed" ? 3 : action.status === "attention" ? 1 : 0,
    }
    case "advance":
      if (state.status !== "running") return state
      return state.step === 0 ? { status: "attention", step: 1 } : { status: "completed", step: 3 }
    case "approve": return state.status === "attention" ? { status: "running", step: 2 } : state
    case "pause": return state.status === "running" ? { ...state, status: "paused" } : state
    case "resume": return state.status === "paused" ? { ...state, status: "running" } : state
    case "fail": return state.status === "running" ? { ...state, status: "failed" } : state
    case "retry": return state.status === "failed" ? { ...initialAgentState } : state
  }
}

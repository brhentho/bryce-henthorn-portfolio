import test from "node:test"
import assert from "node:assert/strict"

const simulation = await import("../lib/agent-simulation.ts")

test("the guided scenario stops for permission and continues only after approval", () => {
  assert.ok(simulation, "The simulation state model must exist")
  const { initialAgentState, agentReducer } = simulation
  let state = agentReducer(initialAgentState, { type: "advance" })
  assert.equal(state.status, "attention")
  assert.equal(state.step, 1)
  assert.deepEqual(agentReducer(state, { type: "advance" }), state)
  state = agentReducer(state, { type: "approve" })
  assert.equal(state.status, "running")
  assert.equal(state.step, 2)
  state = agentReducer(state, { type: "advance" })
  assert.equal(state.status, "completed")
  assert.equal(state.step, 3)
})

test("pausing prevents progress and resumes the same stage", () => {
  assert.ok(simulation, "The simulation state model must exist")
  const { initialAgentState, agentReducer } = simulation
  let state = agentReducer(initialAgentState, { type: "advance" })
  state = agentReducer(state, { type: "approve" })
  state = agentReducer(state, { type: "pause" })
  assert.equal(state.status, "paused")
  assert.equal(state.step, 2)
  assert.deepEqual(agentReducer(state, { type: "advance" }), state)
  state = agentReducer(state, { type: "resume" })
  assert.equal(state.status, "running")
  assert.equal(state.step, 2)
})

test("failure cannot complete work and retry starts a fresh scenario", () => {
  assert.ok(simulation, "The simulation state model must exist")
  const { initialAgentState, agentReducer } = simulation
  const failed = agentReducer(initialAgentState, { type: "fail" })
  assert.equal(failed.status, "failed")
  assert.deepEqual(agentReducer(failed, { type: "advance" }), failed)
  assert.deepEqual(agentReducer(failed, { type: "retry" }), initialAgentState)
})

test("every inspected state is coherent and reset clears the selection", () => {
  assert.ok(simulation, "The simulation state model must exist")
  const { initialAgentState, agentReducer, agentStatuses } = simulation
  for (const status of agentStatuses) {
    const state = agentReducer(initialAgentState, { type: "inspect", status })
    assert.equal(state.status, status)
    assert.deepEqual(agentReducer(state, { type: "reset" }), initialAgentState)
    if (status === "completed") assert.equal(state.step, 3)
    if (status === "attention") assert.equal(state.step, 1)
  }
})

test("unavailable actions never bypass a terminal state or an approval boundary", () => {
  assert.ok(simulation, "The simulation state model must exist")
  const { initialAgentState, agentReducer } = simulation
  const complete = agentReducer(initialAgentState, { type: "inspect", status: "completed" })
  for (const type of ["advance", "pause", "resume", "approve", "fail", "retry"]) {
    assert.deepEqual(agentReducer(complete, { type }), complete)
  }
  assert.deepEqual(agentReducer(initialAgentState, { type: "approve" }), initialAgentState)
})

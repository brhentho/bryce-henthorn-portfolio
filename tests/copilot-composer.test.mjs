import assert from "node:assert/strict"
import test from "node:test"
import { nextComposerPhase } from "../lib/copilot-composer.ts"

test("interrupting reveals the alternatives' different continuation states", () => {
  assert.equal(nextComposerPhase("running", "interrupt", 1), "paused")
  assert.equal(nextComposerPhase("running", "interrupt", 2), "paused")
  assert.equal(nextComposerPhase("running", "interrupt", 3), "stopped")
  assert.equal(nextComposerPhase("paused", "interrupt", 3), "stopped")
  assert.equal(nextComposerPhase("stopped", "resume", 3), "running")
})

test("redirection requires a nonempty instruction and an available composer", () => {
  for (const option of [1, 2, 3]) {
    assert.equal(nextComposerPhase("paused", "send", option, "   "), "paused")
    assert.equal(nextComposerPhase("paused", "send", option, "Use Capcut"), "running")
    assert.equal(nextComposerPhase("control", "send", option, "Use Capcut"), "control")
  }
  assert.equal(nextComposerPhase("running", "interrupt", 1), "paused")
  assert.equal(nextComposerPhase("stopped", "send", 3, "Use Capcut"), "stopped")
})

test("takeover can hand back but cancelling ends the local example", () => {
  for (const option of [1, 2, 3]) {
    const taken = nextComposerPhase("paused", "take-control", option)
    assert.equal(taken, "control")
    assert.equal(nextComposerPhase(taken, "resume", option), "running")
    const ended = nextComposerPhase("stopped", "cancel", option)
    assert.equal(ended, "ended")
    for (const event of ["resume", "send", "interrupt", "take-control"]) {
      assert.equal(nextComposerPhase(ended, event, option, "Try again"), "ended")
    }
  }
})

import test from "node:test"
import assert from "node:assert/strict"
import { finalistHref, FINALISTS } from "../lib/explore/finalists.ts"

test("synthesis retains its hero comparison across homepage and case destinations", () => {
  assert.equal(finalistHref("synthesis", false, "orb"), "/explore/synthesis?hero=orb")
  assert.equal(finalistHref("synthesis", true, "orb"), "/explore/synthesis/agents-in-windows?hero=orb")
  assert.equal(finalistHref("synthesis"), "/explore/synthesis?hero=ascii")
})
test("finalists use stable distinct routes without a redundant hero override", () => {
  assert.equal(new Set(FINALISTS.map(item => item.id)).size, 3)
  assert.equal(finalistHref("presence", true, "ascii"), "/explore/presence/agents-in-windows")
  assert.equal(finalistHref("signal", false, "orb"), "/explore/signal")
})

import test from "node:test"
import assert from "node:assert/strict"
import { responseTokens, sharedDigitPrefix } from "../lib/explore/response-tokens.ts"

test("arrival tokens retain whitespace and punctuation around citation markers", () => {
  const citation = { index: 1, title: "Source without a URL" }
  const tokens = responseTokens("A result [1], then more.", [citation])
  assert.equal(tokens.map(token => token.value).join(""), "A result [1], then more.")
  assert.equal(tokens.find(token => token.citation)?.citation, citation)
  assert.equal(tokens.find(token => token.value === ",")?.plain, true)
  assert.equal(tokens.find(token => token.citation)?.citation.url, undefined)
})

test("unknown and unfinished source markers remain literal text", () => {
  const unfinished = responseTokens("Result [", [])
  assert.equal(unfinished.map(token => token.value).join(""), "Result [")
  assert.equal(responseTokens("Result [12]", []).some(token => token.citation), false)
  assert.deepEqual(responseTokens("", []), [])
})

test("an extending word retains its position rather than creating duplicate words", () => {
  const first = responseTokens("The res", [])
  const next = responseTokens("The result arrives", [])
  assert.equal(first[2].value, "res")
  assert.equal(next[2].value, "result")
  assert.equal(next[0].value, first[0].value)
})

test("number pop preserves only shared leading digits across updates and resets", () => {
  assert.equal(sharedDigitPrefix("1,299", "1,305"), 2)
  assert.equal(sharedDigitPrefix("09", "10"), 0)
  assert.equal(sharedDigitPrefix("10", "0"), 0)
  assert.equal(sharedDigitPrefix("05", "05"), 2)
  assert.equal(sharedDigitPrefix("5", "50"), 1)
  assert.equal(sharedDigitPrefix("50", "5"), 1)
})

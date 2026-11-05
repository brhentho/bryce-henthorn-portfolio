import test from "node:test"
import assert from "node:assert/strict"
import { BLACK, CROSSING_CONTRAST, WHITE, bandProgress, contrastRatio, mixAtmosphere, mixOklab, parseHex, relativeLuminance, resolveGround, toHex } from "../lib/explore/environment.ts"

const ink = parseHex("#0b0d12"), paper = parseHex("#efede6")

test("hex colors round-trip and OKLab mixing keeps its end points", () => {
  assert.equal(toHex(parseHex("#0B0D12")), "#0b0d12")
  assert.equal(toHex(mixOklab(ink, paper, 0)), "#0b0d12")
  assert.equal(toHex(mixOklab(ink, paper, 1)), "#efede6")
})

test("an ink to paper crossing brightens monotonically without leaving the sRGB gamut", () => {
  let previous = -1
  for (let i = 0; i <= 40; i++) {
    const color = mixOklab(ink, paper, i / 40)
    assert.ok(color.every(c => c >= 0 && c <= 255))
    const luminance = relativeLuminance(color)
    assert.ok(luminance >= previous)
    previous = luminance
  }
})

test("text on every step of the crossing meets body contrast and never turns gray", () => {
  for (let i = 0; i <= 100; i++) {
    const ground = resolveGround(mixOklab(ink, paper, i / 100), paper, ink)
    assert.ok(ground.contrast >= 4.5, `step ${i} contrast ${ground.contrast}`)
    const fg = toHex(ground.fg)
    assert.ok([toHex(paper), toHex(ink), toHex(WHITE), toHex(BLACK)].includes(fg), `step ${i} produced ${fg}`)
    if (!ground.crossing) assert.ok(ground.contrast >= CROSSING_CONTRAST)
  }
})

test("settled grounds keep palette text and full atmosphere; the midpoint suppresses glow", () => {
  assert.deepEqual(resolveGround(ink, paper, ink), { ground: "dark", crossing: false, fg: paper, contrast: contrastRatio(ink, paper), glowFactor: 1 })
  assert.equal(resolveGround(paper, paper, ink).ground, "light")
  const middle = resolveGround(parseHex("#767676"), paper, ink)
  assert.equal(middle.crossing, true)
  assert.ok(middle.glowFactor < .05)
})

test("atmosphere mixing interpolates glow geometry linearly", () => {
  const a = { base: ink, glow: ink, strength: 0, x: 0, y: 100 }
  const b = { base: paper, glow: paper, strength: 1, x: 100, y: 0 }
  const mid = mixAtmosphere(a, b, .5)
  assert.equal(mid.strength, .5)
  assert.equal(mid.x, 50)
  assert.equal(mid.y, 50)
})

test("attenuated text stays readable on raised 6% surfaces across the whole crossing", () => {
  // Mirrors final.css: color-mix(in srgb) text tokens and --xr-surface; the crossing removes both.
  const mix = (a, b, p) => a.map((c, i) => c * p + b[i] * (1 - p))
  for (let i = 0; i <= 400; i++) {
    const bg = mixOklab(ink, paper, i / 400)
    const { fg, crossing } = resolveGround(bg, paper, ink)
    const surface = crossing ? bg : mix(fg, bg, .06)
    for (const share of crossing ? [1] : [.9, .76, .67]) {
      const ratio = contrastRatio(mix(fg, bg, share), surface)
      assert.ok(ratio >= 4.5, `step ${i} ${share} on surface ${ratio.toFixed(2)}`)
    }
  }
})

test("band progress maps an anchor's viewport position and clamps outside the band", () => {
  assert.equal(bandProgress(1.2, 1, .4), 0)
  assert.equal(bandProgress(1, 1, .4), 0)
  assert.ok(Math.abs(bandProgress(.7, 1, .4) - .5) < 1e-9)
  assert.equal(bandProgress(-3, 1, .4), 1)
})

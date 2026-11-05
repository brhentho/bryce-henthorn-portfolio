import test from "node:test"
import assert from "node:assert/strict"
import { getTransitionState, notifyRouteMounted, transitionPortfolioTo } from "../lib/page-transition.ts"

function browser({ reduced = false, autoFinish = true, timeout = false } = {}) {
  const saved = new Map()
  function install(key, value) {
    saved.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
  }
  const events = new Map(), mediaEvents = new Map(), records = [], statuses = [], warnings = []
  let mounted = "/", clock = 0
  const html = { dataset: {} }
  const target = () => ({
    focused: false, scrolled: false,
    hasAttribute: () => false,
    removeAttribute() {}, addEventListener() {},
    focus() { this.focused = true },
    scrollIntoView() { this.scrolled = true },
  })
  const heading = target(), section = target()
  const panel = {
    animate(keyframes, options) {
      let resolve, reject
      const animation = {
        playState: "running",
        finished: new Promise((yes, no) => { resolve = yes; reject = no }),
        finish() { this.playState = "finished"; resolve() },
        cancel() { this.playState = "idle"; reject(new DOMException("Cancelled", "AbortError")) },
      }
      records.push({ keyframes, options, animation, state: getTransitionState() })
      if (autoFinish) queueMicrotask(() => animation.finish())
      return animation
    },
  }
  const media = {
    matches: reduced,
    addEventListener: (name, fn) => mediaEvents.set(name, fn),
    removeEventListener: name => mediaEvents.delete(name),
  }
  const tokens = {
    "--duration-route": "500ms", "--duration-normal-ui": "300ms", "--stagger-word": "32ms",
    "--ease-in-out-sine": "cubic-bezier(0.37, 0, 0.63, 1)",
    "--ease-in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
  }
  install("document", {
    documentElement: html,
    querySelector(selector) {
      if (selector === ".route-transition") return panel
      if (selector.includes("data-portfolio-route")) return { dataset: { portfolioRoute: mounted } }
      return heading
    },
    querySelectorAll: () => [],
    getElementById: id => id === "constraints" ? section : null,
  })
  install("window", {
    matchMedia: () => media,
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: name => events.delete(name),
    dispatchEvent: event => { statuses.push(event.detail); return true },
    scrollTo: value => records.push({ scroll: value }),
  })
  install("getComputedStyle", () => ({ getPropertyValue: key => tokens[key] ?? "" }))
  install("requestAnimationFrame", fn => queueMicrotask(fn))
  if (timeout) install("performance", { now: () => { clock += 6000; return clock } })
  const originalWarn = console.warn
  console.warn = (...args) => warnings.push(args)
  return {
    html, heading, section, records, statuses, warnings, media, mediaEvents, events,
    mount(route) { mounted = route; notifyRouteMounted(route) },
    restore() {
      console.warn = originalWarn
      for (const [key, descriptor] of saved) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor)
        else delete globalThis[key]
      }
    },
  }
}

test("public wipe covers before committing, reveals afterward and focuses the heading", async () => {
  const env = browser()
  try {
    await transitionPortfolioTo(() => {
      assert.equal(getTransitionState(), "waiting")
      env.mount("/about")
    }, new URL("https://portfolio.test/about"))
    const wipes = env.records.filter(record => record.keyframes)
    assert.deepEqual(wipes.map(record => record.state), ["exiting", "revealing"])
    assert.deepEqual(wipes.map(record => record.options.duration), [500, 500])
    assert.equal(wipes[0].keyframes[0].transform, "translateX(-100%)")
    assert.equal(wipes[1].keyframes[1].transform, "translateX(100%)")
    assert.equal(env.heading.focused, true)
    assert.equal(getTransitionState(), "idle")
    assert.deepEqual(env.html.dataset, {})
    assert.equal(env.events.size + env.mediaEvents.size, 0)
  } finally { env.restore() }
})

test("keyboard and reduced-motion navigation skip the wipe and preserve a destination hash", async () => {
  for (const options of [{ reduced: true, animated: true }, { reduced: false, animated: false }]) {
    const env = browser(options)
    try {
      await transitionPortfolioTo(() => env.mount("/agents-in-windows"),
        new URL("https://portfolio.test/agents-in-windows#constraints"), options.animated)
      assert.equal(env.records.filter(record => record.keyframes).length, 0)
      assert.equal(env.section.scrolled, true)
      assert.equal(env.section.focused, true)
      assert.equal(env.heading.focused, false)
      assert.equal(getTransitionState(), "idle")
    } finally { env.restore() }
  }
})

test("a newer navigation cancels an outstanding wipe without leaving its shield behind", async () => {
  const env = browser({ autoFinish: false })
  try {
    let obsoleteCommitted = false
    const first = transitionPortfolioTo(() => { obsoleteCommitted = true; env.mount("/recall") },
      new URL("https://portfolio.test/recall"))
    assert.equal(getTransitionState(), "exiting")
    const second = transitionPortfolioTo(() => env.mount("/about"), new URL("https://portfolio.test/about"), false)
    await Promise.all([first, second])
    assert.equal(obsoleteCommitted, false)
    assert.equal(env.heading.focused, true)
    assert.equal(getTransitionState(), "idle")
    assert.deepEqual(env.html.dataset, {})
    assert.deepEqual(env.warnings, [])
  } finally { env.restore() }
})

test("uncommitted navigation reports a recovery message and releases the shield", async () => {
  const env = browser({ timeout: true })
  try {
    await transitionPortfolioTo(() => {}, new URL("https://portfolio.test/about"))
    assert.equal(env.heading.focused, false)
    assert.ok(env.statuses.some(message => message.includes("try the link again")))
    assert.equal(env.warnings.length, 1)
    assert.equal(getTransitionState(), "idle")
    assert.deepEqual(env.html.dataset, {})
    assert.equal(env.events.size + env.mediaEvents.size, 0)
  } finally { env.restore() }
})

test("enabling reduced motion finishes a running cover and skips the uncover movement", async () => {
  const env = browser({ autoFinish: false })
  try {
    const navigation = transitionPortfolioTo(() => env.mount("/about"), new URL("https://portfolio.test/about"))
    env.media.matches = true
    env.mediaEvents.get("change")()
    await navigation
    assert.equal(env.records.filter(record => record.keyframes).length, 1)
    assert.equal(env.heading.focused, true)
    assert.equal(getTransitionState(), "idle")
    assert.deepEqual(env.html.dataset, {})
  } finally { env.restore() }
})

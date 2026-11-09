import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import test from "node:test"
import { PORTFOLIO_MEDIA } from "../lib/portfolio/media.ts"

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
const pages = ["Agents", "Recall", "Teams", "About"].map(name => read(`components/portfolio/${name}Page.tsx`))

test("every composed media ID resolves and local ready sources exist", () => {
  for (const source of pages) {
    for (const match of source.matchAll(/<PortfolioMedia\s+id="([^"]+)"/g)) {
      assert.ok(PORTFOLIO_MEDIA[match[1]], `Unregistered media ID ${match[1]}`)
    }
  }
  for (const media of Object.values(PORTFOLIO_MEDIA)) {
    for (const path of [media.src, media.poster].filter(path => path?.startsWith("/"))) {
      assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `Missing asset ${path}`)
    }
  }
})

test("remaining artifact requests have explicit status and review instructions", () => {
  const checklist = read("docs/portfolio-content-review.md")
  for (const id of ["AGENTS-M01", "AGENTS-M02", "RECALL-M01", "TEAMS-M01", "TEAMS-M02"]) {
    const media = PORTFOLIO_MEDIA[id]
    assert.equal(media.kind, "request")
    assert.equal(media.requestId, id)
    assert.ok(["requested", "clearance-needed"].includes(media.reason))
    assert.ok(checklist.includes(`### ${id}`), `Missing artifact brief for ${id}`)
    assert.equal("src" in media, false, "Requests must not masquerade as playable media")
  }
})

test("Recall recovery replaces the request with approved images in flow order", () => {
  const recall = pages[1]
  assert.match(recall, /<Pair>\s*<PortfolioMedia id="recall-delete-snapshot"[^>]+\/>\s*<PortfolioMedia id="recall-capture-settings"[^>]+\/>\s*<\/Pair>/)
  assert.doesNotMatch(recall, /id="RECALL-M02"/)
  assert.equal(PORTFOLIO_MEDIA["RECALL-M02"], undefined)
  assert.match(read("docs/portfolio-content-review.md"), /### RECALL-M02/)
  const dimensions = []
  for (const id of ["recall-delete-snapshot", "recall-capture-settings"]) {
    const media = PORTFOLIO_MEDIA[id]
    assert.equal(media.kind, "image")
    assert.ok(media.alt)
    const png = readFileSync(new URL(`../public${media.src}`, import.meta.url))
    assert.equal(png.toString("ascii", 1, 4), "PNG")
    assert.equal(media.width, png.readUInt32BE(16))
    assert.equal(media.height, png.readUInt32BE(20))
    dimensions.push([media.width, media.height])
  }
  assert.deepEqual(dimensions[0], dimensions[1], "Recovery crops must share dimensions")
})

test("Teams films follow inspected content rather than historic captions", () => {
  assert.match(PORTFOLIO_MEDIA["teams-prepare"].src, /Teams_fig04-/)
  assert.match(PORTFOLIO_MEDIA["teams-classroom"].src, /Teams_fig06-/)
  assert.match(PORTFOLIO_MEDIA["teams-student"].src, /Teams_fig05-/)
  assert.match(PORTFOLIO_MEDIA["teams-student"].caption, /shared notes/)
  const teams = pages[2]
  assert.ok(teams.indexOf('id="teams-prepare"') < teams.indexOf('id="teams-classroom"'))
  assert.ok(teams.indexOf('id="teams-classroom"') < teams.indexOf('id="teams-student"'))
})

test("Agents taskbar explorations stay together with the alternatives discussion", () => {
  const agents = pages[0]
  const process = agents.match(/<CaseSection id="process"[\s\S]*?<\/CaseSection>/)?.[0]
  const taskbar = agents.match(/<CaseSection id="taskbar"[\s\S]*?<\/CaseSection>/)?.[0]
  assert.ok(process)
  assert.ok(taskbar)
  const sources = [...process.matchAll(/src="(\/assets\/Frame [^"]+)"/g)].map(match => match[1])
  assert.deepEqual(sources, [
    "/assets/Frame 2147238301.png",
    "/assets/Frame 2147238302.png",
    "/assets/Frame 2147238303.png",
  ])
  for (const src of sources) {
    assert.equal(agents.split(`src="${src}"`).length - 1, 1)
    const png = readFileSync(new URL(`../public${src}`, import.meta.url))
    assert.ok(png.length > 24)
    const dimensions = process.match(new RegExp(`src="${src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}" width=\\{(\\d+)\\} height=\\{(\\d+)\\}`))
    assert.ok(dimensions)
    assert.equal(Number(dimensions[1]), png.readUInt32BE(16))
    assert.equal(Number(dimensions[2]), png.readUInt32BE(20))
  }
  assert.equal((process.match(/<figcaption/g) ?? []).length, 1)
  assert.doesNotMatch(agents, /AgentKeyframes|three views of the chosen direction/)
  assert.doesNotMatch(taskbar, /\/assets\/Frame /)
  assert.match(taskbar, /id="agents-taskbar"/)
  assert.match(taskbar, /className="pf-state-lexicon"/)
})

test("publication holds do not leak back into main page content", () => {
  const content = pages.join("\n")
  assert.doesNotMatch(content, /problem-opentable|trust-sensitive-content|trust-delete-snapshot|teams-cocreation|impact-tweets/)
  assert.doesNotMatch(content, /200MS|150M\+|Windows updates quarterly/)
  assert.doesNotMatch(content, /href=["']\/(?:copilot-actions|explore)/)
  assert.match(pages[2], /Tested concept/)
})

test("Recall distinguishes inspected answer-preview exploration from chosen result grid", () => {
  assert.match(PORTFOLIO_MEDIA["recall-search"].description, /Text matches and Visual matches/)
  assert.match(PORTFOLIO_MEDIA["recall-retrieval"].title, /Exploratory answer-preview/)
  assert.match(PORTFOLIO_MEDIA["recall-retrieval"].caption, /not a matched comparison/)
})

test("Recall model keeps source planes local and qualifies capture and illustrative scores", () => {
  const model = read("components/portfolio/RecallModel.tsx")
  for (const stage of ["capture", "ocr", "meaning", "index"]) {
    const icon = read(`public/images/recall/model-${stage}-icon.svg`)
    assert.match(icon, /<svg\b/)
  }
  for (const stage of ["capture", "meaning"]) {
    const plane = read(`public/images/recall/model-${stage}.svg`)
    assert.match(plane, /viewBox="0 0 330\.702 224\.763"/)
    assert.doesNotMatch(plane, /(?:href|src)="https?:/)
  }
  assert.match(model, /When capture is enabled and content is eligible/)
  assert.match(model, /Similarity scores are illustrative, not measured results/)
  assert.doesNotMatch(model, /figma\.com\/api\/mcp\/asset|continuously monitors/)
})

test("Recall layer explanations are a reading list, not selectable controls", () => {
  const model = read("components/portfolio/RecallModel.tsx").split("export function RecallProvenance")[0]
  assert.match(model, /<ol[^>]+aria-label="Capture-to-index layers"/)
  assert.match(model, /<li[^>]+tabIndex=\{0\}/)
  assert.doesNotMatch(model, /<input|<button|<label|<fieldset|onClick|onChange|defaultChecked|aria-selected|Select a layer/)
})

test("floating compositions keep their cutout treatment and keynote dimensions match the source", () => {
  for (const id of ["agents-constraints", "recall-card-anatomy"]) {
    assert.equal(PORTFOLIO_MEDIA[id].presentation, "cutout")
  }
  const media = PORTFOLIO_MEDIA["recall-announcement"]
  const png = readFileSync(new URL(`../public${media.src}`, import.meta.url))
  assert.equal(png.toString("ascii", 1, 4), "PNG")
  assert.equal(media.width, png.readUInt32BE(16))
  assert.equal(media.height, png.readUInt32BE(20))
})

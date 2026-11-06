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

test("all six stable artifact requests have explicit status and review instructions", () => {
  const checklist = read("docs/portfolio-content-review.md")
  for (const id of ["AGENTS-M01", "AGENTS-M02", "RECALL-M01", "RECALL-M02", "TEAMS-M01", "TEAMS-M02"]) {
    const media = PORTFOLIO_MEDIA[id]
    assert.equal(media.kind, "request")
    assert.equal(media.requestId, id)
    assert.ok(["requested", "clearance-needed"].includes(media.reason))
    assert.ok(checklist.includes(`### ${id}`), `Missing artifact brief for ${id}`)
    assert.equal("src" in media, false, "Requests must not masquerade as playable media")
  }
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

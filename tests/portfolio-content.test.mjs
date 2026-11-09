import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import test from "node:test"
import { PORTFOLIO_MEDIA } from "../lib/portfolio/media.ts"

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
const pages = ["Agents", "Recall", "Teams", "About"].map(name => read(`components/portfolio/${name}Page.tsx`))

test("every composed media ID resolves and local ready sources exist", () => {
  for (const source of [...pages, read("components/portfolio/CopilotActionsPage.tsx")]) {
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

test("publication holds do not leak back into main page content", () => {
  const content = pages.join("\n")
  assert.doesNotMatch(content, /problem-opentable|trust-sensitive-content|trust-delete-snapshot|teams-cocreation|impact-tweets/)
  assert.doesNotMatch(content, /200MS|150M\+|Windows updates quarterly/)
  assert.doesNotMatch(content, /href=["']\/(?:copilot-actions|explore)/)
  assert.match(pages[2], /Tested concept/)
})

test("Copilot draft uses the shared case shell without lifting its publication hold", () => {
  const route = read("app/copilot-actions/page.tsx")
  const draft = read("components/portfolio/CopilotActionsPage.tsx")
  assert.match(route, /<PortfolioScope><CopilotActionsPage \/><\/PortfolioScope>/)
  assert.match(draft, /<CaseLayout\s+page="copilot-actions"/)
  assert.match(read("components/portfolio/CaseLayout.tsx"), /"copilot-actions": "Copilot Actions"/)
  assert.match(draft, /status="Working draft/)
  assert.match(read("app/copilot-actions/layout.tsx"), /robots: \{ index: false, follow: false \}/)
  assert.doesNotMatch(read("components/portfolio/PortfolioHome.tsx"), /href=["']\/copilot-actions/)
  for (const { 1: id } of draft.matchAll(/\{ id: "([^"]+)", label:/g)) {
    assert.ok(draft.includes(`id="${id}"`), `Missing draft chapter target ${id}`)
  }
})

test("Copilot supplied hero retains its source dimensions and full-size access", () => {
  const draft = read("components/portfolio/CopilotActionsPage.tsx")
  const hero = draft.match(/src: "([^"]+)", width: (\d+), height: (\d+)/)
  assert.ok(hero)
  const png = readFileSync(new URL(`../public${hero[1]}`, import.meta.url))
  assert.equal(png.readUInt32BE(16), Number(hero[2]))
  assert.equal(png.readUInt32BE(20), Number(hero[3]))
  assert.match(draft, /linkToOriginal: true/)
  assert.match(draft, /Supplied design image/)
  assert.match(read("components/portfolio/CaseLayout.tsx"), /href=\{hero.src\} target="_blank"/)
})

test("Copilot body keeps its announcement evidence and pending walkthrough distinct", () => {
  const draft = read("components/portfolio/CopilotActionsPage.tsx")
  const intervention = draft.slice(draft.indexOf('<CaseSection id="intervention"'), draft.indexOf('<CaseSection id="perspective"'))
  assert.match(intervention, /<PortfolioMedia id="cua-intervention" number="05" linkToOriginal/)
  assert.match(intervention, /<PortfolioMedia id="CUA-M01"/)
  assert.doesNotMatch(draft, /<MediaSlot|<SectionLabel|legacyBody|My work spanned/)
  assert.equal((draft.match(/<CaseSection /g) ?? []).length, 7)
  for (const id of ["cua-onboarding", "cua-intervention"]) {
    const media = PORTFOLIO_MEDIA[id]
    assert.equal(media.kind, "image")
    assert.match(media.caption, /October 2025\. Image: Microsoft/)
    const png = readFileSync(new URL(`../public${media.src}`, import.meta.url))
    assert.equal(media.width, png.readUInt32BE(16))
    assert.equal(media.height, png.readUInt32BE(20))
  }
  const request = PORTFOLIO_MEDIA["CUA-M01"]
  assert.equal(request.kind, "request")
  assert.equal(request.requestId, "CUA-M01")
  assert.equal("src" in request, false)
  assert.match(read("docs/copilot-actions-review.md"), /### CUA-M01/)
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

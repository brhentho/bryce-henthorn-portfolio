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

test("Recall provenance uses the trimmed composition at its intrinsic dimensions", () => {
  const media = PORTFOLIO_MEDIA["recall-provenance"]
  assert.equal(media.kind, "image")
  assert.equal(media.src, "/images/recall/provenance-search-results-cropped.png")
  const png = readFileSync(new URL(`../public${media.src}`, import.meta.url))
  assert.equal(png.toString("ascii", 1, 4), "PNG")
  assert.equal(media.width, png.readUInt32BE(16))
  assert.equal(media.height, png.readUInt32BE(20))
})

test("Recall introduces card hierarchy between the system and ranking without duplicating artwork", () => {
  const recall = pages[1]
  const sections = [...recall.matchAll(/<CaseSection id="([^"]+)"[\s\S]*?<\/CaseSection>/g)]
  const systemIndex = sections.findIndex(section => section[1] === "system")
  assert.ok(systemIndex >= 0)
  assert.equal(sections[systemIndex + 1][1], "moments")
  assert.equal(sections[systemIndex + 2][1], "cards")
  const moments = sections[systemIndex + 1][0]
  const ranking = sections[systemIndex + 2][0]
  assert.match(moments, /<PortfolioMedia id="recall-card-anatomy"/)
  assert.equal((recall.match(/id="recall-card-anatomy"/g) ?? []).length, 1)
  assert.doesNotMatch(moments, /id="recall-separated-results"/)
  assert.match(ranking, /id="recall-separated-results"/)
  assert.match(ranking, /id="RECALL-M01"/)
  assert.match(recall.split("export function RecallPage")[0], /id: "moments"/)
})

test("Agents taskbar explorations pair the direction list with one grouped figure, not verdict cards", () => {
  const agents = pages[0]
  const process = agents.match(/<CaseSection id="process"[\s\S]*?<\/CaseSection>/)?.[0]
  const taskbar = agents.match(/<CaseSection id="taskbar"[\s\S]*?<\/CaseSection>/)?.[0]
  assert.ok(process)
  assert.ok(taskbar)
  assert.match(process, /<Split className="pf-agents-exploration-split">/)
  const directions = process.match(/<ol>[\s\S]*?<\/ol>/)?.[0]
  assert.ok(directions)
  assert.equal((directions.match(/<li>/g) ?? []).length, 3)
  assert.ok(process.indexOf("</ol>") < process.indexOf("<figure"))
  assert.doesNotMatch(process, /<Decisions|chosen:|Selected direction/)
  const sources = [...process.matchAll(/src="(\/assets\/Frame [^"]+)"/g)].map(match => match[1])
  assert.deepEqual(sources, [
    "/assets/Frame 2147262306.png",
    "/assets/Frame 2147262307.png",
    "/assets/Frame 2147262308.png",
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

test("Agents constraints image separates the contract rationale from shell testing", () => {
  const agents = pages[0]
  const constraints = agents.match(/<CaseSection id="constraints"[\s\S]*?<\/CaseSection>/)?.[0]
  assert.ok(constraints)
  assert.match(constraints, /<h2[^>]*>[^<]+<\/h2>\s*<Prose>\s*<p>[^<]+<\/p>\s*<p>[^<]+<\/p>\s*<\/Prose>\s*<PortfolioMedia id="agents-constraints" number="05.1" \/>\s*<div id="iteration"/)
  assert.equal(agents.split('id="agents-constraints"').length - 1, 1)
  assert.match(constraints, /<PortfolioMedia id="AGENTS-M01" \/>/)
})

test("Recall gives search latency and the RAG tradeoff distinct chapters and recordings", () => {
  const recall = pages[1]
  const sections = [...recall.matchAll(/<CaseSection id="([^"]+)"[\s\S]*?<\/CaseSection>/g)]
  assert.deepEqual(sections.map(section => section[1]), [
    "context", "system", "moments", "cards", "transparency", "performance", "constraints", "trust", "impact",
  ])
  const chapters = [...recall.split("export function RecallPage")[0].matchAll(/id: "([^"]+)"/g)].map(match => match[1])
  assert.deepEqual(chapters, sections.map(section => section[1]))
  for (const [sectionId, mediaId] of [["performance", "recall-search"], ["constraints", "recall-retrieval"]]) {
    const section = sections.find(item => item[1] === sectionId)[0]
    assert.equal((recall.match(new RegExp(`id="${mediaId}"`, "g")) ?? []).length, 1)
    assert.ok(section.indexOf("</Prose>") < section.indexOf(`<PortfolioMedia id="${mediaId}"`))
    assert.match(section, new RegExp(`<PortfolioMedia id="${mediaId}"`))
    assert.doesNotMatch(section, /<Decisions|<Pair|<Split/)
  }
  const transparency = sections.find(section => section[1] === "transparency")[0]
  assert.match(transparency, /<RecallProvenance/)
  assert.doesNotMatch(transparency, /id="recall-search"/)
})

test("publication holds do not leak back into main page content", () => {
  const content = pages.join("\n")
  assert.doesNotMatch(content, /problem-opentable|trust-sensitive-content|trust-delete-snapshot|teams-cocreation|impact-tweets/)
  assert.doesNotMatch(content, /200MS|Windows updates quarterly/)
  assert.doesNotMatch(content, /href=["']\/(?:copilot-actions|explore)/)
  assert.match(pages[2], /Tested concept/)
})

test("Teams places pandemic scale before research without claiming a project outcome", () => {
  const teams = pages[2]
  const context = teams.slice(teams.indexOf('<CaseSection id="context"'), teams.indexOf('<CaseSection id="research"'))
  assert.match(context, /150M\+/)
  assert.match(context, /Students and educators on Teams during the pandemic/)
  assert.match(context, /<TeamsClassroomCover \/>/)
  assert.doesNotMatch(teams.slice(teams.indexOf('<CaseSection id="impact"')), /150M\+/)
})

test("Teams classroom cover uses local source layers rather than an embedded reference frame", () => {
  const cover = read("components/portfolio/TeamsClassroomIllustrations.tsx")
  const sources = [...cover.matchAll(/from "@\/public\/([^"]+)"/g)]
  assert.ok(sources.length > 0)
  for (const [, path] of sources) {
    assert.ok(readFileSync(new URL(`../public/${path}`, import.meta.url)).length > 0, `Empty classroom source ${path}`)
  }
  assert.ok(existsSync(new URL("../public/images/teams/classroom/initials.svg", import.meta.url)))
  assert.doesNotMatch(cover, /figma\.com|<button|tabIndex|onClick/)
  assert.match(cover, /Classroom concept with thirteen/)
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

test("Teams impact separates Class Home Page reception from the unshipped concept", () => {
  const impact = pages[2].slice(pages[2].indexOf('<CaseSection id="impact"'))
  assert.match(impact, /full virtual-tables experience did not ship as designed/)
  assert.match(impact, /research informed Class Home Page/)
  assert.match(impact, /not the virtual-tables concept/)
  assert.doesNotMatch(impact, /Read reaction summaries|Fig\. 07 \/ Public reactions|pf-teams-reaction-text/)
  for (const name of ["kim", "ellis", "megan", "madeline"]) {
    const id = `teams-reaction-${name}`
    assert.ok(impact.includes(`id="${id}"`))
    const media = PORTFOLIO_MEDIA[id]
    assert.match(media.caption, /@/)
    const png = readFileSync(new URL(`../public${media.src}`, import.meta.url))
    assert.equal(png.toString("ascii", 1, 4), "PNG")
    assert.equal(media.width, png.readUInt32BE(16))
    assert.equal(media.height, png.readUInt32BE(20))
  }
  assert.doesNotMatch(impact, /150M\+|retention (lift|increase)|<iframe|twitter\.com|x\.com/)
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

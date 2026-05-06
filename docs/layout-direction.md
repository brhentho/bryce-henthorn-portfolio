# Layout Direction — Operator-Manual Case Studies

**Branch:** `feature/recall-operator-manual`
**Scope:** Layout and narrative composition only. Visual tokens (typography, color, spacing) and the page-header pattern are locked and out of scope.
**Audience:** A future Claude/agent or designer extending case study pages without rereading the source files.

---

## 1. Narrative composition principles

These are imperative, opinionated rules. Apply them in order; later rules tie-break earlier ones.

1. **Never run two body-only sections back-to-back.** If a section is just `SectionLabel` + a single body column, the next section must change rhythm — a figure, a strip break, a comparison plate, a pull-quote interlude, or a cover plate. The current pages drift into 4–6 identical text-and-figure plates in a row; that is the specific failure mode this document exists to fix.

2. **Match section width to content density, not to a default.** A section with 8 paragraphs and a margin quote earns full container width and a constrained body column. A section with 3 paragraphs and no figure should compress: pull-quote interlude or strip break. Do not pad thin sections to match the height of dense ones.

3. **When the copy contrasts two states, put two figures side-by-side under one shared caption.** If the body says "scattered / unified," "before / after," "search / recall," "fragmentation / observability," that is a Two-up Comparison Plate, not two stacked figures. Stacking paired figures is the strongest signal that a page has lapsed into the stacked-uniform anti-pattern.

4. **Treat the running margin (the `Margin` primitive) as a finite resource — at most one per two sections.** Used everywhere, it stops being marginalia and starts being a second body column. The page should have 2–3 standout pull-quotes per case study, not one per section.

5. **Punctuate, don't illustrate.** Every figure must add information the body cannot carry alone — a diagram of pipeline stages, a side-by-side of card hierarchy, a video of an interaction. Decorative figures break the document chrome. If a figure is only there because the section "needs one," cut it.

6. **Place a Cover Plate between major movements.** Problem → Solution. Solution → Trust. Trust → Impact. A bare paginated card (`§ 0X / 11`, title, optional sub-figure) lets the reader catch their breath and reinforces the document-as-chrome promise. One per page minimum, three maximum.

7. **Push numbered structure into chrome.** The header eyebrow `§ XX / SECTION_LABEL` is locked. Augment it inside sections with internal pagination on cover plates (`03 / 08`), stage rails on pipeline sections, FIG. X.Y on every figure. Numbered structure is the operator-manual idiom; deploy it generously *inside* sections, never at the expense of the locked header.

8. **Let the grid stretch — break the 68-character body column when figure content earns it.** The default `section-grid` + `max-w-[68ch]` body is the right baseline, but at least every third section should leave that lane: an Annotated Split Plate, a marginalia rail, a bleed figure, or a comparison plate. Lock-step body columns make the page feel like a Medium post.

9. **Keep frame chrome on every plate that contains a figure.** Hairline borders and corner registration marks are how the operator-manual aesthetic survives layout variety. A "full-bleed" plate in this document means edge-to-container, not edge-of-viewport. Bleeding past the registration frame breaks the contract.

10. **One pull-quote per page may take the entire viewport.** Recall's "Perfection wasn't the goal. Legibility was." or Teams' "The system worked for lecturing. It failed at learning." can stand alone as a Pull-quote Interlude — quote in display type, no body, hairline rules above and below. This is how text-only sections earn their place without stacking.

---

## 2. Section-type vocabulary

Named primitives an agent can deploy. Each entry: *purpose · proportions · expected content · how it preserves document chrome.*

These build on the existing manual primitives in `components/manual/` (`SectionLabel`, `SpecSheet`, `Figure`, `Telemetry`, `Margin`, `StateDiagram`, `RegistrationMark`, `Crossref`). Where a primitive already exists, the layout type composes it; where it doesn't, the layout type is realized with the existing `Figure` frame plus tailwind grid overrides.

### 2.1 Hero Header — *locked*
Purpose: Open every case study identically. Anchors the document framing.
Proportions: Full container width, top-aligned. Eyebrow → headline (`t-display-xl`, `max-w-[18-22ch]`) → lead (`t-body lede`, `max-w-[60ch]`) → framed `Fig 0.1`.
Content: `§ 00 / OVERVIEW`, headline, lead paragraph, hero schematic.
Document-chrome contract: Already preserved by `RevisionHeader` + the ManualNav above and `Fig 0.1` corner registration marks.

### 2.2 Spec Sheet Block
Purpose: ROLE / PLATFORM / TIMELINE / TEAM / FOCUS / STATUS, immediately under hero. Also reusable mid-page for principle catalogs (Trust principles, pipeline stages).
Proportions: Full container width, internal two-column label / value layout.
Content: 4–7 rows. No prose.
Document-chrome contract: Hairline rules between rows; mono labels, body values.

### 2.3 Body Column with Running Margin
Purpose: The default text-driven plate. Use it at most twice per page in a row before changing rhythm.
Proportions: `section-grid` — main column `max-w-[68ch]`, margin column ~24-30 columns of the right side.
Content: 3–6 paragraphs, optional `Margin` pull-quote pinned to a body anchor.
Document-chrome contract: Use it sparingly enough that the margin quote feels like an accent, not a rail.

### 2.4 Annotated Split Plate
Purpose: Body left, single dimensional figure right (or vice versa, alternated across the page). Inspired by the Palantir multimodal-data-plane and 8VC infrastructure-thesis layouts in the inspiration set.
Proportions: 50/50 at `lg`+, stacked at `md` and below. The figure side gets a hairline-bordered frame with corner marks; body side stays in flowing column.
Content: 2–4 paragraphs of body, one figure (image, SVG, or video). Optional 3-row labeled list ("ANY STORAGE → …") inside the body lane to mirror the Palantir reference.
Document-chrome contract: Both halves sit inside a single hairline plate so the split reads as one section, not two columns of unrelated content.

### 2.5 Stage Rail Plate
Purpose: When the section is fundamentally about a sequence of stages or steps. The Recall pipeline (Capture → OCR → Index → Query → Result) is the canonical case.
Proportions: Narrow left rail (~12-16 columns) with stage list — number, label, current-step indicator. Body and/or live diagram fills the remaining ~30 columns.
Content: 3–7 stages with short value strings; the `StateDiagram` primitive can become the diagram column. Active stage gets accent color.
Document-chrome contract: Stage numbers inside the rail mirror the page's `§` numbering scheme; corner marks frame the diagram column only.

### 2.6 Two-up Comparison Plate
Purpose: Side-by-side figures under a single shared caption. **Required** whenever copy contrasts two states.
Proportions: Two equal `Figure` frames in a `grid-cols-1 lg:grid-cols-2 gap-6` row, single caption row beneath.
Content: Two figures (image, SVG, or video) plus one caption that names the comparison ("Fragmentation / observability" or "Before / after"). Each figure keeps its own FIG. X.Y number.
Document-chrome contract: Each figure keeps its own corner marks; the shared caption gets a single mono-label rule above it tying them together.

### 2.7 Exploded Diagram Plate
Purpose: One large diagram with marginalia call-outs pinned to specific parts of it. The Raspberry-Pi exploded view in the inspiration set; the RSC space-mission rocket is the editorial cousin.
Proportions: Figure at ~2/3 container width, anchored mid- or right-page. Call-outs sit in a 1/3-width margin column with horizontal leader rules from caption to anatomy.
Content: One figure (SVG strongly preferred — leader lines need vector control), 3–5 short labeled call-outs in the marginalia.
Document-chrome contract: The figure frame + corner marks contain the diagram; leader lines extend OUTSIDE the frame to call-outs in the margin column. This is the only place leader lines are allowed to break the frame.

### 2.8 Full-bleed Atmospheric Plate
Purpose: A single figure dominates the section with massive negative space — used once per case study, max twice. Reserved for moments where the diagram or video is the argument.
Proportions: Figure at full container width, taller than usual (16:9 or 21:9), with body collapsed to a single tight paragraph or chip caption above and below.
Content: One image, SVG, or video. One short caption.
Document-chrome contract: The figure frame still has corner marks; the bleed is "full container," not "full viewport."

### 2.9 Strip Break
Purpose: A thin horizontal divider strip between dense plates. Carries logos, metrics, an icon lexicon, or a one-sentence callout.
Proportions: Full container width, ~80–160px tall, hairline rules top and bottom.
Content: 3–6 items in a single row — `Telemetry`, `SpecSheet`-as-row, lexicon icons (e.g., the existing `AGENT_STATES` array), or a one-line quote.
Document-chrome contract: Always rule-bounded; never holds a section heading. Acts as a measure-bar between movements.

### 2.10 Cover Plate
Purpose: Internal chapter divider. Marks transitions between major movements (Problem → Solution → Trust → Impact).
Proportions: Approximately 60vh, centered or top-aligned in a fully framed plate.
Content: Internal pagination ("03 / 09"), short title, optional ambient mark/figure underneath. No body prose.
Document-chrome contract: This is where the most "document-as-chrome" detail lives — pagination, registration marks, mono labels. Refer to the AO "Hyper-Parallel Processing" reference card for proportions.

### 2.11 Pull-quote Interlude
Purpose: Compress an entire short section to its single sentence. Replaces stacked text-only sections.
Proportions: Full container width, hairline rules above and below, quote in display type with attribution mono-label below.
Content: One pull-quote (10–25 words). No body, no figure.
Document-chrome contract: Always rule-bordered above and below; the quote sits at body width, not display width, so the negative space frames it.

### 2.12 Marginalia Spec Rail
Purpose: When body text needs persistent reference data alongside it (mission specs, crew, position metadata). Inspired by RSC's mission-overview.
Proportions: Narrow left rail (~16 columns) with sticky labeled data; body fills the remaining ~32 columns. Optional bleed-figure on the far right that extends past the container edge.
Content: 3–5 labeled data points (TARGET, CREW, LAUNCH YEAR, MISSION CODE), main body, optional schematic that hangs over the right edge.
Document-chrome contract: The rail labels use the same mono-label treatment as `SpecSheet` rows; the body keeps its `max-w-[68ch]`.

### 2.13 Data Table Block
Purpose: When the content is structurally tabular — pipeline stages, principle catalogs, comparison matrices.
Proportions: Full container width, two- or three-column table with mono labels left, body values right.
Content: Already present as `SpecSheet`. This entry exists to name when to use it (e.g., RECALL's PIPELINE_STAGES, TRUST_PRINCIPLES) versus prose.
Document-chrome contract: Hairline rules between rows; never collapse rows into a single paragraph.

---

## 3. Per-page narrative outlines

Source files:
- `app/recall/page.tsx` — Recall (10 sections)
- `app/agents-in-windows/page.tsx` — Agents in Windows (8 sections)
- `app/teams-for-education/page.tsx` — Teams for Education (9 sections)

For each: current state, proposed sequence, visual content audit, and narrative arc.

### 3.1 Recall — `app/recall/page.tsx`

#### Current state
00 Overview, Spec, 01 Context, 02 System, 03 Problem, 04 Cards, 05 Transparency, 06 Performance, 07 Trust, 08 Constraints, 09 Impact.

What feels stacked: 01 Context (text-only), 06 Performance (text-only), 07 Trust opening (text-only), 08 Constraints (text + Margin only) all use `py-12 lg:py-20` + `section-grid` + `max-w-[68ch]`. Between sections 06 → 08 the page reads as four near-identical body columns in a row, broken only once by the Trust principles SpecSheet. Sections 04 and 05 each stack two figures vertically (4.1 / 4.2 and 5.1 / 5.2) — both should be Two-up Comparison Plates.

#### Proposed sequence
| § | Section | Layout type | Notes |
|---|---|---|---|
| 00 | Overview / Hero | **Hero Header** *(locked)* | Keep. `HeroSchematic` is Fig 0.1. |
| — | Spec | **Spec Sheet Block** | Keep as-is. |
| 01 | Context | **Body Column with Running Margin** | Move the Margin rail into 03 (where it is currently); leave 01 as a clean body column with no margin quote. The plate should feel quiet on purpose — it's the lead-in. |
| — | *(transition)* | **Cover Plate** | Insert between 01 and 02 — `§ 02 / 09 — System` — to mark the move from problem-framing into the system. |
| 02 | System | **Stage Rail Plate** | The PIPELINE_STAGES array (Capture → OCR → Index → Query → Result) becomes the left rail; `StateDiagram` becomes the active diagram in the right column. Body lede sits above the rail. The current rendering already has all three pieces; the layout move is to arrange them as rail + diagram instead of stacked rail then diagram. |
| 03 | Problem | **Annotated Split Plate** | Body 4 paragraphs left, Fig 3.1 ("Search vs. recall") right, registration corners on the figure side. Keep the Margin pull-quote ("Relevance wasn't a fixed property of the result"). The dense final paragraph about static-ranking belongs in this plate's body. |
| — | *(after 03)* | **Pull-quote Interlude** | Promote "Relevance wasn't a fixed property of the result. It was shaped by the task." to a full-width interlude — and remove it from the Margin in 03 so it doesn't appear twice. |
| 04 | Cards | **Two-up Comparison Plate** | Place Fig 4.1 (card hierarchy) and Fig 4.2 (before/after) side-by-side under one shared caption ("Card hierarchy and the metadata flip"). Body shrinks to 2 paragraphs above. |
| 05 | Transparency | **Exploded Diagram Plate** + **Body Column with Running Margin** | The body is the longest in the case study; let it run with `Margin` for "Perfection wasn't the goal. Legibility was." But the figures (5.1 match-type signals, 5.2 confidence indicators) should not stack — promote 5.1 to an Exploded Diagram Plate where the call-outs name "TEXT MATCH" and "VISUAL MATCH" as anatomy of one card, then absorb 5.2 into a Two-up Comparison Plate at the close. |
| 06 | Performance | **Pull-quote Interlude** | Compress the entire section to its one strong line: "We made waiting feel like progress." Below it, a thin Strip Break with three labeled metrics (latency, retrigger threshold, search-as-you-type cadence — see open question Q1). Cut the body to one line of caption beneath the quote. |
| — | *(transition)* | **Cover Plate** | `§ 07 / 09 — Trust` — this is the privacy chapter break. |
| 07 | Trust | **Body Column with Running Margin** + **Spec Sheet Block** | Body runs as today; the existing TRUST_PRINCIPLES SpecSheet is correct. No change to layout, but it now reads as the *first* body column since 03 — earned, not stacked. |
| 08 | Constraints | **Pull-quote Interlude** | Compress to "The system helps people rediscover what they saw. It doesn't rewrite their history for them." Remove the four-paragraph body or cut it to a single short paragraph above the quote. |
| 09 | Impact | **Annotated Split Plate** + **Strip Break (Telemetry)** | Body left, an SVG of the "ripple" pattern (privacy patterns adopted by other Windows teams) right. Telemetry stays as the closing strip. |

#### Visual content audit
| Section | Visual | Status |
|---|---|---|
| 00 Hero | `HeroSchematic` (Fig 0.1) | USE EXISTING — `app/recall/svg/HeroSchematic.tsx` |
| 02 System | `StateDiagram` driving the rail's active stage | USE EXISTING — `StateDiagram` from `@/components/manual` |
| 03 Problem | Fig 3.1 search-vs-recall | USE EXISTING — `Fig1_1` |
| 03 → 04 Pull-quote | none — text-only | NO VISUAL (intentional) |
| 04 Cards | Fig 4.1 card hierarchy + Fig 4.2 before/after | USE EXISTING — `Fig2_1`, `Fig3_1` |
| 05 Transparency Exploded | Fig 5.1 match-type signals | USE EXISTING — `Fig2_2`, but **CREATE NEW — SVG TECHNICAL DRAWING**: extend it with leader lines + marginalia call-outs labeling "TEXT MATCH" and "VISUAL MATCH" zones on a representative card. |
| 05 Closing two-up | Fig 5.2 confidence indicators | USE EXISTING — `Fig3_2` |
| 06 Pull-quote | Telemetry strip with 3 latency metrics | **CREATE NEW — SVG TECHNICAL DRAWING**: a thin sparkline showing query latency as keystrokes accumulate. Drawing brief: 3 keyframes of a query string growing, a horizontal latency axis, a small dot per keystroke. Width = full container. Height = 64px. *Also see open question Q1.* |
| 07 Trust SpecSheet | TRUST_PRINCIPLES | USE EXISTING |
| 08 Pull-quote | none | NO VISUAL (intentional) |
| 09 Impact | "ripple" diagram of patterns adopted across Windows teams | **CREATE NEW — SVG TECHNICAL DRAWING**. Brief: center node "Recall search patterns," 2 concentric arcs out to "Windows Search" and "File Explorer" labels (matches the existing copy about Windows Search and File Explorer adopting the patterns). Style matches `HeroSchematic`. |
| 09 Telemetry | 3 metrics | USE EXISTING |

#### Narrative arc
The page reads as four movements: *Why search broke* (00–01), *How the system thinks* (02), *How the interface earns trust* (03–05), *What we cut and why* (06–08), *What stayed* (09). Cover plates between movements 1→2 and 3→4 mark the transitions; pull-quote interludes after 03, 06, and 08 absorb the thinnest text and prevent stacked body columns. The reader leaves having seen one diagram per movement: the schematic, the pipeline rail, the card anatomy, and the ripple.

---

### 3.2 Agents in Windows — `app/agents-in-windows/page.tsx`

#### Current state
00 Overview, Spec, 01 Context, 02 Problem, 03 Process, 04 Taskbar, 05 Constraints, 06 Invocation, 07 Iteration, 08 Impact.

What feels stacked: The hero is missing a figure entirely (`Fig 0.1` is absent from the source). 03 Process renders three taskbar-evolution images vertically with identical captions ("step 1", "step 2", "step 3") — a textbook stacked-figures problem. 04 Taskbar, 05 Constraints, and 06 Invocation each follow body-then-figure, body-then-figure, body-then-video without rhythm changes. 02 Problem is already a Two-up Comparison Plate (good — keep).

#### Proposed sequence
| § | Section | Layout type | Notes |
|---|---|---|---|
| 00 | Overview / Hero | **Hero Header** *(locked)* — but **add Fig 0.1** | The hero needs a schematic. Use the existing `Agents in Windows Fractal.png` as Fig 0.1. *Also see open question Q3.* |
| — | Spec | **Spec Sheet Block** | Keep. |
| 01 | Context | **Annotated Split Plate** | Body left (4 paragraphs), Fig 1.1 (`context-desktop.png`) right. Currently it's body then full-width figure stacked; move the figure into the right half. |
| 02 | Problem | **Two-up Comparison Plate** | Already correct — Fig 2.1 fragmentation + Fig 2.2 observability under shared caption. Keep the Margin quote ("They didn't distrust automation. They distrusted invisibility."). |
| — | *(transition)* | **Cover Plate** | `§ 03 / 08 — Process`. The page pivots from problem to system here. |
| 03 | Process | **Stage Rail Plate** | Currently three Frame images stacked vertically with placeholder captions. Promote them to a 3-frame keyframe sequence inside one plate: thin numbered rail on the left ("01 / 02 / 03 — TASKBAR EVOLUTION"), three frames in a single horizontal sequence on the right with one shared caption beneath. Captions for each frame need to be written — see open question Q4. |
| 04 | Taskbar | **Annotated Split Plate** | Body left, the Taskbar.mp4 in a framed video right. Currently the video is full-width below body; bringing it inline strengthens the connection between "hover cards expand" copy and the demonstrated motion. |
| 05 | Constraints | **Pull-quote Interlude** + **Body Column with Running Margin** | Promote "We had to tell teams 'no' to custom experiences so we could promise users a predictable system." to a full-width pull-quote. The body and Fig 5.1 (`constraints-desktop.png`) sit beneath as a normal Body column — let the long argument breathe. |
| 06 | Invocation | **Full-bleed Atmospheric Plate** | The Composer.mp4 demo is the argument; let it dominate. Body collapses to 2 paragraphs above the video, single caption below. |
| 07 | Iteration | **Strip Break (Lexicon)** + **Body Column with Running Margin** | The 5 agent SVG icons are already a horizontal lexicon row — that's exactly a Strip Break. Promote the strip above the body so the lexicon greets the reader, then 2 short body paragraphs sit below. |
| — | *(transition)* | **Cover Plate** | `§ 08 / 08 — Impact`. The closing chapter card. |
| 08 | Impact | **Annotated Split Plate** + **Strip Break (Telemetry)** | Fig 8.1 stage image right, body left. Telemetry strip closes the page. |

#### Visual content audit
| Section | Visual | Status |
|---|---|---|
| 00 Hero Fig 0.1 | Hero schematic | USE EXISTING — `/public/assets/Agents in Windows Fractal.png` is in the repo; promote it to Fig 0.1 inside a `Figure` frame. |
| 01 Context | `context-desktop.png` | USE EXISTING |
| 02 Problem two-up | `problem-fragmentation.png`, `problem-observability.png` | USE EXISTING |
| 03 Process three-frame | `Frame 2147238301/2/3.png` | USE EXISTING — but layout changes from vertical stack to horizontal keyframe row. |
| 04 Taskbar | Taskbar.mp4 | USE EXISTING |
| 05 Constraints | `constraints-desktop.png` | USE EXISTING |
| 06 Invocation | Composer.mp4 | USE EXISTING |
| 07 Iteration | 5 agent state SVGs | USE EXISTING — `Running/Needs attention/Completed/Failed/Paused agent.svg` |
| 08 Impact | `impact-stage.png` | USE EXISTING |
| 08 Telemetry | 3 metrics | USE EXISTING |

#### Narrative arc
*Why agents are scattered* (00–02), *how we anchored them to something familiar* (03–04), *what we had to refuse* (05–06), *what holds it together* (07–08). The page already has more layout variety than Recall — the changes above are tightening, not rebuilding. Two-up at section 02 stays; the gain is in 03 Process (stop stacking), 06 Invocation (let the demo lead), and the addition of two cover plates that mark the three movements.

---

### 3.3 Teams for Education — `app/teams-for-education/page.tsx`

#### Current state
00 Overview, Spec, 01 Context, 02 Problem, 03 Research, 04 Solution, 05 Orchestration, 06 Group Creation, 07 Student View, 08 Bandwidth, 09 Impact.

What feels stacked: 05, 06, 07 are body-then-video, body-then-video, body-then-video — three near-identical plates in a row. 08 Bandwidth is a 3-paragraph body-only plate that is too thin to stand on its own. The hero has no Fig 0.1. 01 Context is already pattern-breaking (Telemetry first, then body) — keep that move and amplify it.

#### Proposed sequence
| § | Section | Layout type | Notes |
|---|---|---|---|
| 00 | Overview / Hero | **Hero Header** *(locked)* — but **add Fig 0.1** | Needs a hero schematic. *Also see open question Q5.* |
| — | Spec | **Spec Sheet Block** | Keep. |
| 01 | Context | **Strip Break (Telemetry)** + **Body Column** | Already inverts the pattern — keep the move, formalize it as a Strip Break above the body. The telemetry (150M+ users, 30+ per class, 6 hours/day) sets the scale before any prose. |
| 02 | Problem | **Body Column with Running Margin** + **Two-up Comparison Plate (quotes)** | The 4 student-quote blocks stay as a 2x2 grid — that's already a Two-up variant. Move the Margin quote ("The system worked for lecturing. It failed at learning.") into a Pull-quote Interlude below the quotes (see next row). |
| — | *(after 02)* | **Pull-quote Interlude** | "The system worked for lecturing. It failed at learning." stands alone. |
| — | *(transition)* | **Cover Plate** | `§ 03 / 09 — Research`. |
| 03 | Research | **Annotated Split Plate** | Body left, Fig 3.1 (`teams-cocreation.png`) right. |
| 04 | Solution | **Exploded Diagram Plate** | Fig 4.1 (`teams-fig02.png`) becomes the anchor figure, with marginalia call-outs labeling "TABLE CARD," "FIXED SEAT," "PERSISTENT MATERIALS SLOT," "MODERATION HOOK." Body to the left or above. Keep the Margin quote ("Control stayed with the teacher. The conversation stayed with the students.") — this is the page's strongest pull-quote and earns its margin position. *Call-out content: see open question Q6.* |
| 05 | Orchestration | **Full-bleed Atmospheric Plate** | The student-view video is the argument. Body collapses to 2 short paragraphs above. |
| 06 | Group Creation | **Annotated Split Plate** | Body left, the whole-class-to-table video right. This breaks the previous section's full-bleed rhythm by inverting to a split. |
| 07 | Student View | **Pull-quote Interlude** + **Strip Break** | The body is one paragraph and the section fundamentally restates "belonging." Compress to a pull-quote ("They saw familiar group members, recognized their seat, and felt accountable to the people around them.") with the group-creation video below as a small framed inline figure (not full-bleed). |
| 08 | Bandwidth | **Strip Break (callout)** | Currently a 3-paragraph text-only section — too thin to stand on its own. Compress to a Strip Break: a single sentence ("Persistent tables fixed bandwidth structurally — materials attached before class loaded as students sat down") with three labeled stat columns ("OLDER DEVICES / SHARED HOME NETWORKS / TIME LOST TO LOADING"). *Stat content: see open question Q7.* |
| — | *(transition)* | **Cover Plate** | `§ 09 / 09 — Impact`. |
| 09 | Impact | **Body Column with Running Margin** | Body runs as today. Keep the closing Margin quote ("Retention doesn't come from more features. It comes from structure."). |

#### Visual content audit
| Section | Visual | Status |
|---|---|---|
| 00 Hero Fig 0.1 | Hero schematic of "tables in a grid" | **CREATE NEW — SVG TECHNICAL DRAWING**. Brief: top-down operator-manual rendering of a 6-table, 30-seat virtual classroom — square table cards in a 3x2 grid, dots for seats, hairline rules. Style matches Recall's `HeroSchematic`. |
| 01 Context | Telemetry strip | USE EXISTING |
| 02 Problem | 4 student quotes in 2x2 grid | USE EXISTING |
| 02 → 03 Pull-quote | none | NO VISUAL (intentional) |
| 03 Research | `teams-cocreation.png` | USE EXISTING |
| 04 Solution Exploded | `teams-fig02.png` + leader lines + 4 marginalia call-outs | **CREATE NEW — SVG TECHNICAL DRAWING** as overlay on existing image. Or, preferred: new SVG schematic of a single table card with anatomy labeled, mirroring the Recall card-anatomy figure. |
| 05 Orchestration | Teams_fig06 video | USE EXISTING |
| 06 Group Creation | Teams_fig04 video | USE EXISTING |
| 07 Student View | Teams_fig05 video | USE EXISTING |
| 08 Bandwidth | 3 stat columns | **NO VISUAL** — compress to a Strip Break with text stats only. *Open question Q7.* |
| 09 Impact | none today | NO VISUAL (intentional) — page closes on prose + pull-quote. |

#### Narrative arc
*The scale of the problem* (00–02), *how we listened* (03), *the structure we built* (04–07), *the structural fix to a non-structural problem* (08 — bandwidth), *what stayed* (09). The big move is collapsing 07 Student View into a pull-quote and 08 Bandwidth into a strip break, which kills the 05–08 stacked-video sequence and lets 04 Solution carry the visual weight.

---

## 4. Anti-patterns

Things that would break the narrative feel. Do not do these.

1. **Stacked uniform sections.** Every section using `py-12 lg:py-20` + `SectionLabel` + `section-grid` + `max-w-[68ch]` body. This is the single most common failure across the current pages. The vocabulary in §2 exists to give an agent specific alternatives; reach for them whenever a section's content density doesn't justify the default plate.

2. **Stacked figures inside one section.** When a section has two or more figures, never stack them vertically with separate captions. Use a Two-up Comparison Plate (figures side-by-side under one shared caption) or an Exploded Diagram Plate (one anchor figure with marginalia call-outs). Multiple Figure components rendering as `my-10 lg:my-14` siblings is the pattern that produces the "Medium post" feel the brief is trying to avoid.

3. **Decorative figures.** Adding a figure because the section "needs one." If a figure does not carry information the body cannot, cut it. Recall's Fig 5.2 is a borderline case — it survives because it shows confidence indicators that the body describes abstractly; a generic illustration of "search" would not survive.

4. **Margin quotes everywhere.** Using the `Margin` primitive in every long body section. Used everywhere, it stops being marginalia and becomes a second body column. Cap at one Margin quote per two body sections, or promote the quote to a Pull-quote Interlude.

5. **Centered hero / centered everything.** The Pinterest set has several fully centered SaaS heroes ("Where digital finance finds sanctuary online", "The system for modern product development"). Resist them — the locked header pattern is left-aligned with eyebrow / headline / lead, and centering anywhere on the case study breaks the document chrome. Center alignment is reserved exclusively for Cover Plates.

6. **Full-bleed past the registration frame.** Edge-to-viewport images without a hairline-bordered frame and corner marks. Full-bleed in this document means edge-to-container, with the corner registration marks intact. The Wallety reference in the inspiration set is what we are NOT trying to look like.

7. **Captions without numbers.** Every figure must have a `FIG. X.Y` number and a caption that names the relationship to the body. Captions like "Taskbar evolution — step 1 of 3" (current 03 Process) are a placeholder, not a caption — they describe sequence position but not what step 1 actually shows.

8. **Hot-orange accent on more than one element per section.** The locked design uses a single accent. A figure label, a margin pull-quote, and an active stage indicator should never all light up at once. Reserve the accent for one anchor element per visible viewport at a time.

---

## 5. Open questions

Places where the existing copy is too thin to support a non-stacked layout, or where a proposed visual content brief depends on facts the source doesn't carry.

| ID | Page | Section | What's missing |
|---|---|---|---|
| Q1 | Recall | 06 Performance | The proposed Pull-quote Interlude + telemetry strip needs three latency-related stats (e.g., median query latency, retrigger threshold, search-as-you-type cadence). Source copy says "we tuned how aggressively the system sent queries" but gives no numbers. Either the strip stays generic (3 unlabeled keyframes of a query growing) or new numbers need to be sourced from the team. **Recommendation: write three short qualitative metrics — "PER KEYSTROKE / 200MS WINDOW / NO BLOCKING WAIT" — that match the copy without claiming data we don't have.** |
| Q2 | Recall | 03 Problem | The final paragraph (about static ranking and task-shaped relevance) is doing the work of a separate sub-section but lives buried at the end of a 5-paragraph body. Should it become its own plate (Pull-quote Interlude on "Relevance wasn't a fixed property of the result") and the surrounding text shrink? The proposed sequence in §3.1 assumes yes. |
| Q3 | Agents in Windows | 00 Hero | Source has no Fig 0.1 in the hero. The repo contains `Agents in Windows hero.png` and `Agents in Windows Fractal.png` — confirm which to use, or commission a new SVG schematic mirroring `HeroSchematic` from Recall. |
| Q4 | Agents in Windows | 03 Process | Captions read "Taskbar evolution — step 1/2/3" — placeholders. Each frame needs a real caption naming what changes between frames (initial pin, agent state visible, hover-card expanded?). Without this, the proposed Stage Rail Plate has nothing to anchor the rail labels to. |
| Q5 | Teams for Education | 00 Hero | Source has no Fig 0.1. The proposed SVG (top-down virtual-tables grid) doesn't exist yet. Confirm whether to commission this drawing or pull from existing imagery. |
| Q6 | Teams for Education | 04 Solution | The proposed Exploded Diagram Plate needs four marginalia call-outs naming the anatomy of a virtual table card ("TABLE CARD / FIXED SEAT / PERSISTENT MATERIALS SLOT / MODERATION HOOK"). Source copy supports the first three; "moderation hook" is interpolated from the long paragraph about ambient teacher controls. Confirm the four labels and whether `teams-fig02.png` shows enough anatomy to support call-outs, or whether a new SVG of a single table is needed. |
| Q7 | Teams for Education | 08 Bandwidth | The proposed Strip Break needs three labeled stat columns. Source copy is qualitative ("older devices, spotty connections, shared home networks") with no numbers. Either keep the columns qualitative ("OLDER DEVICES / SHARED HOME NETWORKS / TIME LOST TO LOADING") or source real numbers. **Recommendation: qualitative is fine — the strip is breaking rhythm, not telling a data story.** |
| Q8 | All pages | Cover Plates | Cover Plate proposes internal pagination like "§ 03 / 09 — Process" inside a section. This requires deciding whether the page-level `§ XX / 11` indicator in the locked header refers to a *book of 11 chapters across the whole site* (then internal cover plates use `§ X / 11` too) or to a *per-page chapter count* (then cover plates use the local section count, e.g., `§ 03 / 09`). The current header on Recall reads "§ 01 / 11" — this implies the former. **Recommendation: confirm the 11 refers to the whole document (home + about + 3 case studies + sections), then make Cover Plates inherit the same numbering.** |

---

*End of layout direction document.*

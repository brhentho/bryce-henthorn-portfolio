# Portfolio content and media review

The main local portfolio uses the approved Synthesis + ASCII foundation.
This checklist records unresolved publication questions, not blockers to the
local build. No deployment or external publication is implied.

Page bodies live in `components/portfolio/`; source-ready assets and explicit
requests live in `lib/portfolio/media.ts`. “Ready” means a source is available
for composition, **not** that all rights, release status or product claims have
been independently verified. Existing assets are retained, not deleted.

## Publication and factual questions

| ID | Page / section | Confirm | Current treatment |
| --- | --- | --- | --- |
| AGENTS-C01 | Opening, invocation, states | Which build/version is shown? Which behaviors were prototype, preview or released? What can be stated publicly about partners? | Ongoing platform work; recordings labeled design artifacts. No general-availability or adoption claim. |
| AGENTS-C02 | Shared contract | Does quarterly describe this particular program rather than Windows generally? | Removed the quarterly cadence and device-count claims. Preserved stable OS contract versus changing provider output. |
| AGENTS-C03 | Taskbar decision | What permitted observations favored the taskbar over app-bound and dedicated-workspace options? | All three alternatives and tradeoffs retained as a decision summary. Original evaluation board requested in AGENTS-M02. |
| RECALL-C01 | Retrieval | Is there a measured/configured basis for the earlier 200ms statement? Which device, workload and build? | Removed the number and nonblocking absolutes. Qualitative query-cadence rationale only. |
| RECALL-C02 | Privacy | Which versions and responsibilities does the earlier opt-out → opt-in account describe? What exact capture eligibility, local-processing and deletion/retention boundaries apply? | No migration chronology or universal security guarantee. Distinguish design intent, snapshot deletion and future capture settings. |
| RECALL-C03 | Imagery | Are reservation and financial examples synthetic, redacted and cleared? Audit other product screenshots for names, account data and confidential content too. | Do not render reservation/financial/recovery stills. RECALL-M02 asks for benign version-labeled recovery evidence. Existing assets remain in the repository and may still be publicly addressable. |
| RECALL-C04 | Ranking / evaluation | What research supports merged-ranking problems, result inspectability and responsiveness? Provide permitted method, sample context and observations. | Source’s qualitative ranking finding is prominent, but no measured improvement. Card anatomy and separated grid are not labeled before/after. |
| TEAMS-C01 | Research | Are student names, grade labels, quotations and co-design imagery cleared for a public portfolio? | No identifying research quotes, names or co-design images rendered. Existing themes summarized as prose; TEAMS-M02 visible. |
| TEAMS-C02 | Findings / scale | What supports participation, speed, retention and the former platform/classroom statistics? | Removed 150M+, 30+ and six-hours claims. Bound outcome to qualitative concept testing; no comparative speed or retention result. |
| TEAMS-C03 | Teacher control / lineage | Which moderation controls were implemented, tested or only intended? Which later releases can be demonstrably traced to this work? | Start/join/stop grounded in recording frames. Mute/redirect/flag described as design discussion. No verified release-lineage claim. |
| ABOUT-C01 | Career | Confirm all role labels and dates, optional earlier Amazon/Nordstrom contract dates, and public wording of the Copilot Actions experience entry. | All source entries retained. Both 2025–present entries marked concurrent. No invented earlier dates, availability or resume. Copilot Actions entry has no case link. |

## Prioritized artifact requests

Visible placeholders are compact and remain visible in production-mode local
builds. They have no fake play control, duration, metric or finished caption.
The same stable request ID is used on the page and in the registry.

### AGENTS-M01 — Two agents, one shared contract

- **Priority / location:** P1, `/agents-in-windows#constraints`, beside the
  existing multi-agent desktop composition.
- **Kind / status:** Shell recording; requested.
- **Purpose:** Show the multi-agent interaction the still cannot establish.
- **Shot list:** Start two agents; inspect both taskbar states; have one request
  input while the other continues; respond through the actually supported
  surface; return to each independently.
- **Required context:** Build, prototype/preview/release status, provider names
  permitted for publication, actual input boundary, and cleared task content.
- **Fallback:** Existing constraints figure plus a compact request. The still
  is not labeled test evidence.

### AGENTS-M02 — Evidence behind the taskbar decision

- **Priority / location:** P2, checklist-only for
  `/agents-in-windows#process`; registered but not rendered.
- **Kind / status:** Original alternatives board and permitted evaluation notes;
  requested.
- **Frame list:** App-bound direction, independent pin, dedicated workspace;
  comparable task context; observations that actually informed selection.
- **Required context:** Evaluation method/date, participant context if
  permissible, source status and clearance.
- **Fallback:** Readable three-alternative decision summary before keyframes.

### RECALL-M01 — The same query, two ranking treatments

- **Priority / location:** P1, `/recall#cards`.
- **Kind / status:** Matched Figma exports; requested.
- **Frame list:** Same benign query and content in a merged ranking and
  separated text/visual result groups; identify the visual result whose
  visibility changed. Optional recording: enter query, inspect match type,
  source/time, open the relevant snapshot, return.
- **Required context:** Matching build/design revision, permitted research
  observation and synthetic or cleared result content.
- **Fallback:** Existing card anatomy and separated-result grid, explicitly
  different artifacts rather than fabricated before/after evidence.

### RECALL-M02 — Remove a moment; change future capture

- **Priority / location:** P1, `/recall#trust`.
- **Kind / status:** Version-bound privacy recovery recording or still pair;
  clearance needed.
- **Shot list:** Benign synthetic snapshot; actual deletion action and scope;
  confirmation; navigate to actual capture settings; change a supported
  setting; show what the setting now means. If prevention is demonstrated,
  do not imply deletion and exclusion have identical scope.
- **Required context:** Product version, implemented controls and exact
  retention boundary; confirm synthetic contents and export clearance.
- **Fallback:** Text comparison of recovery versus prevention and compact
  placeholder. Neither sensitive source still is rendered.

### TEAMS-M01 — Intervene without breaking the discussion

- **Priority / location:** P1, `/teams-for-education#teacher-control`.
- **Kind / status:** Teacher-side prototype artifact; requested.
- **Purpose:** Establish specific moderation beyond the **already observed**
  start, join and stop group controls.
- **Shot list:** Inspect an active table; exercise an actually supported
  moderation action; show what the student sees and how discussion continues;
  return to the global view. Omit unimplemented mute/redirect/flag interactions
  rather than fabricate them.
- **Required context:** Mark implemented, tested and intended behaviors
  separately. Identify prototype date and clear all participants/content.
- **Fallback:** Existing during-class orchestration recording plus compact
  request; no claim that teacher perspective is wholly missing.

### TEAMS-M02 — Classroom observation to concept

- **Priority / location:** P2, visible in
  `/teams-for-education#research` because identifying source artifacts are held.
- **Kind / status:** Anonymized research-to-decision board; clearance needed.
- **Frame list:** A permitted classroom observation, the persistent-group
  decision it informed, and an actual prototype-test observation. Identify
  method and limits without reconstructing participant quotations.
- **Required context:** Research permission, anonymization review, consent for
  any imagery, and clear distinction between a theme and a measured finding.
- **Fallback:** Summaries of the existing teacher/student themes in prose,
  never invented anonymized quotes.

## Existing media: source and evidence boundaries

### Teams correction based on inspected frames

The previous page captions **and the initial narrative-critic map were
incorrect**. The build coordinator inspected extracted frames at approximately
2s and 9s. Actual recorded behavior, not filenames or old captions, determines
the mapping:

| Registry ID / page position | Actual source | Observed content | Existing poster |
| --- | --- | --- | --- |
| `teams-prepare` / before class | `Teams_fig04-SzV8nkwmimnnyjPOiYSn8Z9J0VAp5z.mov` | Manage class team → Groups → Create class groups; manual/automatic assignment dialog | `/images/teams/class-poster.jpg` |
| `teams-classroom` / during class | `Teams_fig06-2YDd5QkvxbZD2b8O44R0Nag6g14UhH.mov` | Groups panel with Start all groups; tables In room, Join and Stop controls | `/images/teams/student-poster.jpg` |
| `teams-student` / at the table | `Teams_fig05-P8cWRCiwt0bUCrucyij7Dh4KVxwhDT.mov` | Small-group call → Group notes with prior class notes/documents | `/images/teams/groups-poster.jpg` |

All three existing sources are on
`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/`; exact URLs are in
the registry. The coordinator identified H.264, 1920×1080 in all three MOVs.
Codec inspection and sampled frames do not establish all-browser playback,
clearance, every intermediate interaction or actual participant re-entry.
The continuity caption says **reopening shared notes**, not a demonstrated
re-entry flow. Poster filenames retain historical names; they remain paired
with their original source recordings.

### Agents and Recall

- `agents-composer`: existing `Composer.mp4` on the sayyacgp8fag7fqj public
  blob host; existing composer poster. Design recording, not shipment proof.
- `agents-taskbar`: existing local `/media/agents-taskbar-detail.mp4` and
  taskbar poster. Cropped detail of expanded progress.
- `recall-search`: existing `Recall_fig05-JAHG0aeAytDorw718qnZiWG2n09om9.mp4`
  on the hebbkx1anhila5yf host, search poster. Main search recording under
  result inspection, without an unsupported timing claim. Coordinator-inspected
  frames show search refinement and the separated Text matches / Visual matches
  full grid at approximately 12s.
- `recall-retrieval`: existing `shilpa_0603_03%201.mp4` on the sayyacgp8fag7fqj
  host, retrieval poster. Secondary, explicitly expandable **answer-preview
  exploration**, not the selected retrieval-only direction. An inspected frame
  at approximately 17s shows a distinct answer-preview card above text and visual
  matches. Different queries/layouts mean this is not a matched before/after or
  controlled RAG comparison. The image alone does not establish its backend
  implementation or latency. The registry key retains its historical identity;
  its title, description and caption reflect the observed contents.
- Existing hero images, agent fragmentation/observability, constraints,
  announcement, Recall architecture, result cards/provenance and announcement,
  classroom schematic, state icons/keyframes, and About portrait are reused.
  The Recall logo-only plate is omitted from the main argument.

No tenant search, Figma-library sweep or bulk asset download is part of this
implementation. Future cleared exports can replace registry requests by ID.

## Editorial preservation map

| Page | Source material | New location / disposition |
| --- | --- | --- |
| Agents | Context + Problem | `#context`: fragmented/observable pair, early-interview concern and OS opportunity, without universal psychological claims. |
| Agents | Three candidate homes | `#process`: all alternatives and tradeoffs precede the selected state keyframes. |
| Agents | Invocation | `#invocation`: dispatch → monitor → return, composer recording. |
| Agents | Taskbar + state inventory + simulation | `#taskbar`, nested `#simulation`: compact selected keyframes, actual detail recording, all five states, explicitly fictional user-driven demo. |
| Agents | Constraints + Iteration | `#constraints`, nested `#iteration`: provider requests, stable contract, actual-shell prototypes and multiple-agent testing retained. |
| Agents | Impact | `#impact`: ongoing work and announcement distinguished from availability/outcomes. Repeated individual ownership removed; role stays in ledger. |
| Recall | Context + Problem | `#context`: memory fragments and task-dependent relevance. Reservation example withheld, not replaced with invented screenshot. |
| Recall | System | `#system`: actual four stages in forward reading order. Original reverse-stacked illustration labeled as such. |
| Recall | Cards + buried ranking observation | `#cards`: merged-ranking finding promoted, screenshot-led hierarchy and separated results accurately labeled. |
| Recall | Transparency + primary film | `#transparency`: source, time, match type, false positives and query/result recording. |
| Recall | Performance + Constraints | `#constraints`, nested `#performance`: qualitative cadence and original retrieval/synthesis decision preserved; optional answer-preview exploration recording, relabeled from inspected frames. Unsupported 200ms removed. |
| Recall | Trust | `#trust`: recovery/prevention pair and four principles bounded by version/design scope; sensitive stills withheld. |
| Recall | Impact | `#impact`: bounded testing observations, Build 2024 and related design discussions. Removed “proved” and ripple/adoption inference. |
| Teams | Context + Problem + research | `#context` and `#research`: retention reframing, method before themes, teacher logistics and peer conversation. Identifying research held. |
| Teams | Solution | `#solution`: all three alternatives, native Teams rationale, fixed seats, materials and cross-session persistence; conceptual schematic retained. |
| Teams | Three recordings | `#group-creation`, `#orchestration`, `#student-view`: reordered using actual inspected content, superseding the original planned mapping. |
| Teams | Moderation rationale | `#teacher-control`: demonstrated start/join/stop versus intended interventions separated. |
| Teams | Impact | `#impact`: tested concept, not full release; qualitative direction, not retention or comparative speed. Unrelated Class Home Page tweets omitted. |
| About | Identity + concrete examples | Portrait opening and `#bio`: shell prototyping and classroom reframing, linked to public cases. |
| About | Career | `#experience`: all six Microsoft entries, dates and Amazon/Nordstrom contracts retained; concurrency explicit. |
| About | Philosophy | `#philosophy`: two paragraphs preserve progressive disclosure, systems over time, edge/empty states and technical ambition. Shared contact footer; no availability/resume invention. |

The public cases use one contribution ledger and team voice in their bodies.
`/copilot-actions` stays unlinked and noindex; its About experience entry is not
publication of the draft case. Archive content and assets require their own
publication review; withholding an image here does not remove it from disk.

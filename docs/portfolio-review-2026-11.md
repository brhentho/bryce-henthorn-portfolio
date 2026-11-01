# Portfolio review — November 2026

Companion to `docs/portfolio-implementation.md` (Codex, Oct 2026) and
`docs/copilot-actions-review.md`. Records what the consolidation changed, and
what still needs Bryce's input before the site competes at Staff/Principal
level.

## 1. What was consolidated

| Source | Kept | Changed |
| --- | --- | --- |
| `main` | Editorial system, inverse route transition, motion cadence | Restored as the motion source of truth |
| `feat/portfolio-judgment` (Codex) | CaseBrief, DecisionTable, AgentSimulation, poster frames, two-lane ProjectCard, About rework, reducer tests | Reverted its 200–300ms motion; fixed the glyph clipping it exposed |
| `feat/copilot-actions-case-study` | `/copilot-actions` route, DelegationSequence, sources | Kept `noindex`, removed from home; added CaseBrief; dropped branch-only `vercel.json` |

**Clipping root cause.** The settled hero clip was
`inset(-0.18em 0 -0.24em 0)`. Inter Tight descenders at display leading
exceed 0.24em, and −0.055em tracking pushes each word's last glyph past its
box, so both were shaved 1–5px. Clip windows are now tokens
(`--hero-clip-hidden/-shown`), display leading floors at 0.92, and
`scripts/audit-text-clipping.js` reports every clipped or colliding display
line (clean on all six routes at 1440/1024/390).

## 2. Token changes made

| Token / rule | Before | After | Why |
| --- | --- | --- | --- |
| `t-display-xl` leading / tracking | 0.86 / −0.065em | 0.92 / −0.06em | Line collisions on 3-line heads |
| `t-display-l` | 0.9 / −0.055em | 0.94 / −0.05em | Same |
| `t-h1`, `t-h2`, `t-h3` | 0.95, 1, 1.35 | 1, 1.05, 1.3 | Multi-line card titles touched |
| `t-mono-label` size / tracking | 10px / 0.14em | 11px / 0.12em | 10px mono is below comfortable legibility on ink |
| `t-mono-caption` colour | `--text-tertiary` | `--text-secondary` | Captions carry content (figure explanations) |
| Mono numerals | proportional | `tabular-nums slashed-zero` | FIG numbers, 00/01 index, dates align |
| Body | — | `text-wrap: pretty` | No orphans |
| Home hero secondary line | `t-display-l` | `t-h2` secondary | Two display-size statements competed |
| Hero emphasis | box-shadow line | real underline, skip-ink | Rule cut through descenders |

## 3. Further token proposals (not applied)

- **Replace ad-hoc room padding** (`py-16 lg:py-24`, `lg:py-28`, `pt-4`) with
  `--space-room` / `--space-section`. Rhythm currently varies by page.
- **One focus ring.** Global ring is 2px `--accent-trace`; LoopingMedia and
  NextProject restate it, and simulation buttons rely on borders. Consolidate
  in `@layer base`, and consider `--paper` for focus so orange stays the single
  state accent per viewport.
- **`--text-tertiary` (48%)** fails WCAG AA under ~18px. Restrict to ≥18px or
  raise to 54%.
- **Easing pairs.** Entrances use `--ease-out-expo` and exits
  `--ease-in-expo`; hovers mix `--ease-out-quad` and expo. Pick quad for
  colour/border and expo for movement — document it in `CLAUDE.md`.
- **Reformat Codex's one-line `.simulation-*` rules** into a scoped block.

## 4. Storytelling and usability recommendations (ranked)

Research basis: Staff+ exemplars (Yibo Dai — Netflix; Daniel Destefanis —
Anthropic; Janum Trivedi and Karolis Kosas — OpenAI; Tracy Nguyen and Mary
Gansallo — Microsoft; Simon Pan's archived Uber case), the Staff+ Portfolio
Directory, and NN/g's case-study structure. Trend claims about motion and
typography were weakly sourced; treat those as directional.

1. **Show AI behavior in motion where it's still a still.** Top AI-design
   portfolios lead with short annotated loops. Recall and Agents already have
   loops; Copilot Actions has none and is the most "agentic" case. Shot lists
   below; slots render in dev only.
2. **One-line identity under the hero.** "Product Designer, Windows AI ·
   Microsoft — agents, semantic search, computer use." Reviewers anchor
   in five seconds.
3. **Career ledger on About.** A dated mono ledger (year · team · surface)
   fits the manual aesthetic and is the most common Staff+ pattern.
4. **Shorten Agents.** About 1,600 words and 16,000px at 1440px wide. Merge §05 Constraints
   and §07 Iteration; keep the simulation as the centrepiece.
5. **Name what was cut, in every case.** Recall's "We killed RAG to keep
   search fast" is the strongest tradeoff on the site. Agents and Teams need
   one equivalent (team voice is fine; the decision is what reads as senior).
6. **Chapter rail for long cases.** A sticky mono index (≥1280px) of section
   titles; neutral colour, no accent. Needs a §2 vocabulary discussion first
   (it's chrome, not a layout primitive).
7. **Teams needs one concrete shipped outcome.** It's the oldest case and
   the least specific; either add a shipped surface or shorten it to an
   "earlier work" chapter.
8. **Copilot Actions before publishing.** Original artifacts, two decisions
   with alternatives, and confirmed scope. Until then it stays a draft.
9. **Compress `public/`.** ~89 MB, several 2–5 MB PNGs. Convert to AVIF/WebP
   via `next/image`, and rename `image 2065417615.png`-style files.
10. **Experiments routes** (`/experiments/*`) are public. Gate or remove.

## 5. Copy proposals for sign-off (team voice preserved)

| Page | Current | Proposed | Note |
| --- | --- | --- | --- |
| About hero, last manifesto line | "Naturally, a UX designer." | "Designing systems people can trust." | Ends on the thesis rather than a hedge |
| Recall §08 | "…I owned the information architecture for that privacy surface." | "…My part was the information architecture for that privacy surface." | Codex added first-person ownership; softer, still accurate. Or move it to the spec sheet. |
| Home hero secondary | "Designing AI agents and enterprise workflows for Windows at Microsoft." | Keep | Now set as a lede, not a second headline |
| Agents CaseBrief "MY OWNERSHIP" | "I led agent visibility and orchestration design…" | Keep | The brief is the one place first person belongs |

## 6. Shot lists (1600×1000, H.264 MP4 + poster JPG, no audio, ≤1.5 MB, seamless loop)

**Copilot Actions — FIG 5.1, 12s.** Type a task → agent workspace opens →
two steps progress → pause at a decision with question and Paused state →
Take control → hand back → agent finishes, result shown in context.

**Recall — FIG 5.2, 9s.** Type a remembered fragment → text and visual
groups resolve → hover a visual match, match-type and source/time come
forward → open the snapshot at the exact moment → back to results.

**Agents — FIG 5.2, 10s.** Two agents start from different apps → both on the
taskbar with the same state lexicon → one needs input while the other keeps
working → answer from the taskbar.

Replace each `<MediaSlot>` with `<LoopingMedia src poster label>` inside the
existing `Figure` once the file lands in `public/media/`.

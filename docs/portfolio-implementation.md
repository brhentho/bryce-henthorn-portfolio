# Portfolio implementation — October 2026

Approved scope: preserve typography and palette; improve homepage visibility,
case-study arguments, evidence framing, product media, and purposeful motion.

## Decisions

- Work on `feat/portfolio-judgment`, keeping production untouched.
- The user's explicit request to implement the complete multi-page plan supersedes
  the older one-section-per-turn review workflow in CLAUDE.md.
- Compose summaries and comparisons from the existing spec-sheet, table, split,
  figure, and stage-rail vocabulary. Do not change the 13 layout primitives.
- Use existing public assets and claims only. New simulation content is fictional
  and explicitly labeled; it neither runs agents nor represents research evidence.
- Publication dates and adoption claims without supporting artifacts are qualified
  rather than expanded. Requested personal reflections must be supplied by Bryce.
- Validate visual/copy edits in the browser; add automated regression tests for
  simulation transitions, where pause, recovery, and reset have meaningful behavior.

## Progress

- Repository cloned; existing instructions, components, assets, and commands read.
- Implemented homepage composition, separate image lanes, case briefs, decision tables,
  explanatory captions, poster frames, error fallback, About portrait and work examples.
- Added the local Agents state simulation and short route/hero motion.
- Reducer checks: 5 tests failed before implementation; final run passed 5/5.
- Final production build, TypeScript, and diff whitespace checks passed.
- Browser: guided approval, keyboard resume, completion, failure/retry, reset,
  390px mobile layouts, mobile menu/Escape/focus return, no page-level horizontal
  overflow on Home, Agents, Recall, Teams, and About. Desktop project begins within
  the opening 1440×900 viewport (top approximately 693px).
- Final independent review found constrained fallback clipping and two unqualified
  outcome statements. All three fixed. Fallback reproduced with Recall's exact
  aspect/max-height/overflow props: message extended past the hidden frame before
  the fix; after it, the explanation and recording link remain visible on mobile.
- Temporary browser-test route removed after verification.
- Reduced-motion behavior reviewed in CSS and code; actual preference emulation
  is not available through the current browser. Simulation has no automatic
  progression or motion-dependent transitions.
- Existing tooling limits: lint cannot run (ESLint absent); Storybook 8 cannot
  start against Next.js 16 (`next/config` removed). Stories are supplied and
  type-checked; no unrelated tooling upgrade was made.
- Human hiring-manager formative review has not been conducted.

## Evidence follow-up (not published as facts)

| Page | Missing evidence | Recommended addition |
| --- | --- | --- |
| Agents / process | Original alternatives and evaluation notes | Cleared comparison artifacts and observations behind taskbar selection |
| Agents / impact | Specific partner adoption examples | One artifact showing how a partner used the shared contract |
| Recall / impact | Release chronology and research records | Confirm availability milestones separately from Build 2024 announcement; add an anonymized relevance finding |
| Teams / impact | Traceability from concept to shipped patterns | Identify the specific shipped surfaces and distinguish them from virtual-table research |
| All / reflection | Deferred by Bryce on October 28, 2026; placeholder for now | Revisit later: what I would change today, what experience changed my view, and what I would do differently |

## Retrospective — draft placeholder

Author decision: revisit later. Keep this placeholder out of the visible portfolio.

- What I would change today: [To add later]
- What experience changed my view: [To add later]
- What I would do differently: [To add later]

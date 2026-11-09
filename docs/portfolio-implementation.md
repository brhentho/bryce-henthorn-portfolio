# Portfolio implementation — October 2026

> Historical implementation record. The current main-route build promotes
> Synthesis + ASCII and uses the page-specific outline in `docs/layout-direction.md`.
> Current story questions and media requests are in `docs/portfolio-content-review.md`.
> Production-source edits are now authorized locally; deployment is still separate.

## Current local portfolio promotion

- Main Home uses the selected Synthesis + ASCII experience, public navigation and
  qualified project copy. Agents, Recall, Teams and About have distinct
  narrative compositions using the shared public portfolio layer.
- Existing environment math and visual foundations were promoted with compatibility
  wrappers, preserving the exploration archive. Static Synthesis tokens live in
  the root token block; public layout/content styles are scoped.
- The critic's source-caption assumptions were checked against actual video
  frames. Teams fig04 is preparation, fig06 is live orchestration, and fig05 is
  shared materials. Recall's second clip is an answer-preview exploration, not a
  matched performance comparison. All seven existing recordings advanced playback
  in Chromium.
- Missing artifacts have compact, stable-ID slots that remain visible in both dev
  and production-mode local builds. The detailed replacement briefs, editorial
  holds and source map are in `portfolio-content-review.md`.
- Typecheck, 23 tests and the production build pass. The five main pages passed
  40 viewport/reduced-motion combinations with no visible text clipping,
  horizontal overflow, missing visible images or wrong/dead main-site links.
- Public artifact navigation, destination-heading focus, Back, no-JS content,
  recording failure fallback, visible build-mode placeholders and the unpublished
  Copilot Actions robots metadata were exercised.
- Technical review found low contrast behind the homepage's type. A public-only
  soft scrim now protects text while retaining the selected ASCII geometry and
  animation. Sampled composited contrast passed at desktop and narrow widths.
  The accepted Inter typography and archived grid treatments are intentional;
  generic style-lint warnings are not reasons to replace the chosen design.
- One stale development image-optimizer request was cleared by restarting the
  owned dev server. No source image or global optimization policy was bypassed.

This is a **local review build**, not a deployed or publication-approved portfolio.
Clearance/version/outcome questions, physical-browser/device checks and the
continuous-artwork accessibility publication assessment remain explicit follow-up
items. No fabricated research, metrics or completed-media claims fill those gaps.

## Public interaction polish

- The public header is a name-only home link. Work/About/Contact share a gooey
  highlight that moves independently of text and click targets. Primary and quiet
  actions share the cursor-responsive edge, mono labels, focus and press treatment.
- Public navigation stays sticky at every scroll depth. An opaque environment
  backing protects link contrast; the scrolled surface tint and divider fade over
  the fast UI duration. Keyboard and reduced-motion scrolling settle directly.
  Measured header height keeps anchors, focused controls and chapter rails clear
  when navigation wraps. Archived headers retain their original behavior.
- The public footer is a quiet name/location and plain email row. It retains the
  Contact destination without a promotional heading or back-to-work button.
- Public homepage summaries show date, title, subheader and case-study action,
  without numbered dates or proof labels. The redundant hero action is omitted;
  Work navigation and the skip link remain. The Approach heading aligns with its
  body inset on desktop and stacks on narrow screens. Archives are unchanged.
- Homepage case-study actions use content-matched blue (Agents) and purple
  (Recall and Teams) accents for their shine, hover wash and keyboard focus.
- Case progress rails share the site navigation's gooey highlight for active,
  hovered and focused links, including wrapped mobile rows. Keyboard and
  reduced-motion changes settle directly; section links retain native anchors.
- `PortfolioLink` selects the public editorial wipe in the existing transition
  coordinator. The opaque panel covers the route commit and continues offscreen
  before the headline resolves. Public links do not also start an artifact morph.
  Keyboard/reduced-motion navigation is direct; local anchors remain local and
  cross-page hashes receive the correct scroll position and focus. Interrupted
  and uncommitted navigation releases the shield, with an explicit recovery message.
- Homepage project images link to their cases and have a bounded pointer response
  nested separately from the approved scroll transforms. Synthetic window bars and
  homepage image captions are removed; archived figures keep both. Approach stays
  at the bottom and its heading, introduction and principles arrive in groups.
- `PortfolioReveals` progressively enhances reading/evidence groups without hiding
  server-rendered content. Text keeps its contrast during movement. Focus, deep
  links and reduced-motion changes settle content; videos remain user controlled.
- Recall uses a four-plane SVG capture/index model: local Figma capture
  and meaning artwork/icons, native OCR/index geometry in the same isometric
  projection, an icon-led explanation grid, and static left-side layer callouts.
  Hovering a plane or explanation instantly highlights both, clearing together
  on departure, without selecting. Hover also spreads the stack around its center:
  each gap grows by 16 SVG units over the normal UI duration (300ms, Quad Out).
  Exit reverses continuously. Labels, leaders and layout stay fixed.
  Focusable list items provide the same emphasis for keyboard readers without
  motion. Reduced motion also stays stationary, and touch stays static with all
  explanations visible. There are no radio or click actions.
  A one-time arrival settles on hover or focus.
  Scores are illustrative, and capture remains conditional on eligibility/settings.
  The enlarged, annotated provenance result shows source/time/context, not invented
  Text/Visual headings. The existing recording supplies the separated-match evidence.
- About now uses neutral ink/graphite instead of the two previous warm overrides.
  Working examples, concurrent experience and philosophy retain their actual copy.
- Shared exploration components use public opt-ins; no archive redesign or new
  package is required. Accepted Inter typography and historical grid styles remain
  intentional, not new style-lint defects.

The public wipe has regression coverage for ordering, focus/hash placement,
keyboard/reduced-motion bypass, supersession, timeout recovery and live motion
preference changes. Browser interaction and responsive checks supplement those
coordinator tests; they are not replaced by a build.

Validation for this pass: typecheck, 28 tests and the Webpack production build
pass. The five public pages passed 40 viewport/motion combinations; finalist
routes passed 30 desktop/tablet/mobile checks, and A-F/archive routes passed 57.
Clipping findings were limited to intentionally clipped screen-reader-only text.
Production-mode checks covered route focus and Back, hash targeting, placeholders,
recording failure and the unpublished draft. Independent technical review passed
after fixing wrapped navigation at 200% text; Recall annotation contrast measured
8.12:1 for body text and 13.59:1 for headings. Other engines and physical devices
remain unverified.

## Reading-flow refinement

- Agents adds a light-paper environment anchor at `#constraints`, transitioning
  the existing full-page backdrop rather than painting a section rectangle.
  The light treatment continues through impact and the footer.
- Public case progress is numbers-only, preserving each existing section link,
  active state, accessible chapter name and 44px target. Global navigation and
  archived chapter labels are unchanged.
- `PortfolioVideo` uses native media lazy loading where supported plus the
  `video-playback` controller: start at 60% visibility, pause below 20%, loop muted,
  preserve the playhead, and respect deliberate pause/unmute. Hidden tabs and
  closed disclosures stop playback; reduced motion and reported save-data leave
  manual Play available. No-JS retains native manual controls.
- Seven recordings have dimensions verified from their decoded metadata, reserving
  frame space before loading. Autoplay denial retains the player with recovery
  guidance; actual media errors retain the existing poster/original-source fallback.
- The supplied 2000x1125 Agents screenshot is used only for the public Agents hero,
  with accurate alternative text and its original aspect ratio. The selected
  browser context was Teams, but the supplied image depicts Agents; this placement
  is an explicit best-judgment assumption pending the author's review. A subsequent
  Teams-specific upload replaces the public Teams hero at its original 2000x1075
  dimensions; the supplied Recall text-match image replaces its public hero at
  2000x1165. Public homepage project images use these same supplied images,
  dimensions and descriptions. Archived hero sources remain unchanged.

Validation: 38 tests, typecheck and production build pass; all seven clips
advanced and looped in viewport playback checks. Native pause/play, offscreen
resume, hidden tabs, disclosure closure, reduced motion, save-data, autoplay
denial and genuine media failure were exercised. The public 40-case layout
matrix has no visible clipping or overflow. Technical review exposed midtone
control/focus contrast issues: public crossing fills now use the resolved ground,
focus uses its primary foreground, and the contrast-changing noise overlay is
temporarily suppressed. A 25-case recheck measured minimum 4.618554588980766:1.
Settled/archive texture remains unchanged; other engines/devices are unverified.

## Evidence and explanation refinement

- Teams uses the author's supplied research selectively: one approximate 70%
  school-platform preference figure, anonymous student-session themes, and
  concrete meeting-workflow findings tied to the design. Full slide layouts,
  identifying quotations and redundant methodological caveats are not reproduced.
  `TEAMS-M02` is now an optional checklist-only concept-testing follow-up.
- Agents' context comparison uses floating conceptual SVGs: distinct origins
  remain in place while Windows adds a shared return point. The public workflow
  simulator is removed; actual recordings, keyframes and the five-state legend
  carry the explanation. The legacy `#simulation` anchor points to that legend.
- Public taskbar keyframes lose the matte, border, corner overlay and excess
  padding, and use each image's measured dimensions. The selector's default
  archive presentation is unchanged.
- Recall's exploded model loses its outer frame/background and vertical arrow,
  retaining the four planes, stage identifiers and selection behavior. The
  separate provenance figure keeps its own presentation.

Typecheck, 38 tests and the production build pass. The 40-case public layout
matrix has no visible clipping, overflow or missing images. Targeted browser
checks cover natural keyframe geometry/keyboard selection, Recall stage controls,
200% text, remaining recording playback and archived demo/frame preservation.
A bounded technical review passed; computed Teams evidence contrast was at least
8.24:1. This was not a new all-engine or complete transition-pixel audit.

## Media finish and abstract visibility map

- Public media uses a shared 12–16px responsive radius, contact/ambient shadows,
  and explicit rectangular versus cutout treatment. Captions, notices and
  annotations are not included in the visual surface's shadow or clipping.
- Homepage shadows surround the composited, scroll-clipped picture; public mask
  corners use the shared radius. Existing travel, hover response and timings
  remain intact. Archive masks and media styles are unchanged.
- Agents' constraints composition, taskbar PNGs and Recall's card collage stay
  transparent, with light silhouette-aware depth. Vector schematics and status
  icons remain crisp. Native video focus remains visible; fullscreen is unrounded.
- The revised Agents map replaces repeated wireframe boxes with distinct
  geometric identities, larger labels and a prominent shared visibility layer.
  At enlarged text, connected origin/state pairs share a continuous visibility
  rail rather than shrinking labels or dropping the associations.
- Recall's announcement image now fills the reading column. The old 28rem cap
  is removed, source dimensions corrected to 1434 x 807, and responsive image
  sizing reflects its new placement. Existing copy and caption remain.
- Shadow effects are suppressed during midtone crossings to avoid changing the
  backdrop used for contrast-safe captions and controls.
- Public hero and section heading tracking is loosened by 0.02em: h1 uses
  -0.035em, standard h2 -0.025em, and About's section h2 -0.015em. Body text,
  navigation, diagram h3 labels and archive typography keep their prior values.

Typecheck, 39 tests and the production build pass. Browser checks cover media
roles, intrinsic proportions, full-column Recall sizing, clip/hover continuity,
video pause/seek/fullscreen/focus, failure recovery and archive isolation. All
40 public viewport/motion combinations pass after the tracking change. Technical
review verified continuous diagram connections and unbroken labels at 200% text
after three targeted corrections. Physical devices and other engines are not
claimed as verified.

## Historical October implementation

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

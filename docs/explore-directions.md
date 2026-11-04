# Six portfolio directions: November 2026 exploration

Approved scope:
- Build two rounds of three working, distinct directions, each with a homepage and a representative
  Agents in Windows case study.
- Keep facts and product evidence consistent. Round two also allows clearly labeled,
  replaceable original or license-cleared illustrative media and distinct visual identities.
- Leave production routes untouched.
- Commit locally only: no deploy, push or PR.

## Routes

| Route | What it is |
| --- | --- |
| `/explore` | Comparison index: one line per direction, links to home and case |
| `/explore/direction-a` · `/agents-in-windows` | **A: layered editorial** |
| `/explore/direction-b` · `/agents-in-windows` | **B: project destinations** |
| `/explore/direction-c` · `/agents-in-windows` | **C: spatial story** |
| `/explore/direction-d` · `/agents-in-windows` | **D: Cinema** |
| `/explore/direction-e` · `/agents-in-windows` | **E: Working model** |
| `/explore/direction-f` · `/agents-in-windows` | **F: Design atlas** |

The `/explore` layout sets `noindex` and nothing on the published site links to it. A
thin `ExploreBar` switches between A–F and between home and case, preserving the
page mode. Run `pnpm dev --port 3471` and open `http://localhost:3471/explore`.
The first-round checkpoint is local commit `d322e86`, on
`brhentho-microsoft-explore-three-directions`. No direction has been promoted.

## Round one: A / B / C

- **A: layered editorial.** This is the closest to the current operator-manual
  system.
  - Planes overlap: figures carry ghost offsets, and the observability figure slides
    over fragmentation.
  - A sticky chapter index sits in the margin.
  - The decision is a stack of three option sheets; the chosen one is raised in paper.
  - Motion is quiet and helps the reading; the content is never gated behind it.
- **B: project destinations.** The homepage is three destinations seen through one
  porthole.
  - A dial jumps to each project, the circular clip opens per project, and the tone
    changes underneath.
  - The case study keeps the porthole as its hero and adds a floating chapter dock.
  - It works best as a work index. It has the most "product" feel of the three.
- **C: spatial story.** CSS 3D throughout, without three.js.
  - On the homepage, the scattered project windows converge into one row, then a
    cylinder of cards turns with scroll.
  - In the case study, the hero plate tilts flat. In the converge scene, fragmented
    agent tiles fly into the taskbar.
  - It also has decision tabs and a taskbar simulation with a scroll gauge.
  - It is the most memorable, and also the most expensive to maintain and the most
    likely to feel like a demo.

All three share content (`lib/explore/content.ts`), the simulation reducer
(`lib/agent-simulation`, which is already tested), the `ContinuityLink` view-transition
morph from home to case, and these hooks:
- `useSectionProgress` (see Checks)
- `useActiveSection` / `goToSection`
- an SSR-safe `useReducedMotion` and `useMediaQuery`

## Recommendation from round one

**Use A as the base, and borrow from B for the homepage work index.**
- **A's case study argues best.** The layers carry meaning: before and after, and
  options against the choice. It also maps onto the 13 primitives in
  `docs/layout-direction.md` with no new vocabulary.
- **B's porthole and dial are the strongest homepage work section.** They give
  three-project navigation in one viewport, with direct links.
- **Use C as a source of single moments, not a system.** The converge scene (agent
  tiles landing in the taskbar) is the clearest visual explanation of the Agents
  problem in any direction. It could replace A's Problem overlap. The orbit and
  scattered hero cost more than they explain.

## Mix-and-match map

| Slot | A | B | C | Suggested |
| --- | --- | --- | --- | --- |
| Home hero | Statement over layered cover | Statement + porthole | Scatter → converge | A |
| Home work index | Offset plates list | Porthole + dial | 3D orbit | **B** |
| Home thesis/principles | Two-column sheets | Thesis band | Tilted planes | A |
| Case hero | Plate with ghost | Porthole | Tilted plate | A (or B if B's home is used, for the morph) |
| Case navigation | Sticky margin index | Floating dock | Sticky step rail | A |
| Problem | Slide-over planes | Split frames | **Converge scene** | C |
| Decision | Raised option sheets | Option cards | Arrow-key tabs | A |
| Taskbar/simulation | Inline sim | Sim in porthole frame | Sim + gauge | A or C |
| Home→case transition | Plate morph | Porthole morph | Plate morph | Follows whichever case hero is chosen |

Every part reads from the same content module, so they can be swapped with little
effort. The main coupling is the `view-transition-name` pair between the home and
the case hero.

## Completeness

- **Complete.** For each direction:
  - the homepage and the Agents case study
  - keyboard navigation and direct links (`#context`, `#problem-observable`,
    `#agents`, and so on)
  - a reduced-motion layout and a mobile layout
  - Back/refresh restoring position
- **Simulated.** The agent simulation is an illustrative scenario. It runs the same
  reducer as the production `AgentSimulation` and is labeled as such.
- **Missing.**
  - Recall and Teams case studies in each direction (only their homepage entries
    exist).
  - About page variants.
  - Production-grade video posters for every frame.

## First-round checks

- `pnpm tsc --noEmit`: clean.
- `pnpm test`: 5/5.
- `pnpm build`: passes; all 7 explore routes are prerendered static.
- **Automated sweep (puppeteer, outside the repo).** It ran 56 combinations:
  - 7 routes
  - 4 viewports: 1440×900, 1024×768, 390×844 (mobile with touch), 1440×700
  - reduced motion off and on

  On each page it scrolled the full height, measuring horizontal overflow, looking
  for targets smaller than 24px, running `scripts/audit-text-clipping.js` and
  collecting console and page errors.
  - **Final run:** zero overflow and zero errors on every combination.
  - **Clipping audit:** reports only intentionally clipped `sr-only` text.
  - **Small targets:** one remains, the inline "Published home" link inside a
    sentence on `/explore` (WCAG 2.5.8 inline exception).
- **Fixed as a result of the sweep:**
  - **Hydration mismatch under reduced motion on every direction.** framer's
    `useReducedMotion` reads the client value on the first render. Replaced it with
    a `useSyncExternalStore` hook.
  - **A case: horizontal scroll (70px).** The observability plate entered from 10%
    to the right; it now slides out from behind the back plate.
  - **B home, reduced motion at 1024: overflow (74px).** The static porthole kept its
    viewport sizing inside a half-width column.
  - **Footer links under 24px.** Their minimum height is now 44px.
- **Bug found in framer-motion 12.** With `useScroll({ target })`, opacity, clipPath
  and filter are attached to a ScrollTimeline created before the ref exists. They
  therefore tracked document scroll instead of the section; for example, C's hero
  copy stayed visible during converge.
  - All 12 targeted scroll hooks now go through `useSectionProgress`, which opts out
    of acceleration.
  - Verified that values match section progress.
- **Browser play-through at 1440.**
  - A and B: home and case.
  - C, home: scatter, converge and horizon; the orbit turn and its nav, with
    `aria-current` and `inert` checked.
  - C, case: hero plate, the converge scene, arrow-key decision tabs, and the
    simulation (state changes, card expand with `aria-expanded`, gauge tone).
  - Direct link plus refresh to `#problem-observable` lands pinned.
- **View transitions.** A real link click on each home starts `startViewTransition`
  and captures mid-morph frames, and the case loads. Back restores the home scroll
  position (A y=1907, B y=1170, C y=2366).
- **Screenshots** reviewed at 390 (all homes and the C case), with reduced motion at
  1024 (B) and 1440 (C).
- **craft-judge review (against personal CRAFT rules).** A home, the A case and the
  index passed. B home, C home and the C case received FIX verdicts, now addressed:
  - **Deep links overshot on layouts swapped after hydration** (C flat, B stacked).
    The server renders the spatial layout and the client then swaps to the static
    one, so the browser's initial hash scroll is stale. `useHashAfterLayout`
    re-applies `scrollIntoView` once when the client layout differs from the server's.
    C's static figures now carry the same ids as the spatial ones.
  - **B home.** Rail markers now sit within the sticky scroll distance. The
    destination swap's `aria-live` region was replaced by a polite `sr-only`
    announcement ("Destination i of N: name"). The exit is faster than the enter.
    At 390, the hero porthole sits above the H1.
  - **B case.** The hero lede crossed the bright porthole at roughly 3:1. A radial ink
    scrim and a text-shadow now make it legible (screenshot verified).
  - **Sticky lengths shortened.** C hero 230→170svh, converge 260→180svh, orbit
    N×90+40 → N×70+30 svh.
  - **C colour literals.** All 14 are declared once as `--xc-*` on `.xc`. They are
    scoped deliberately so that production `globals.css` stays untouched.
  - **A case.** The second nav landmark is relabelled "Contents".
  - **Not fixed (minor).** B and C TSX still hard-code some framer durations rather
    than reading the motion tokens.
- **Deep-link probe.** 111 anchor targets across all routes at 1440 and 390, with
  reduced motion off and on, all land at the target. The re-run sweep shows 56 runs
  and 0 issues; tsc, test and build were re-run after the final CSS edit.
- **Not run:**
  - real touch devices or Safari/Firefox (Chrome only, with mobile emulation)
  - screen-reader passes
  - Lighthouse/performance traces
  - human review

## First-round review questions

1. **Which base?** The recommendation is A with B's work index, but it is a taste
   call. Is C's spatial ambition worth its maintenance cost and its "demo" risk?
2. **The C homepage on mobile and with reduced motion** falls back to a flat title
   page, which has a large empty upper half by design. Is that acceptable, or should
   the scattered windows appear as a static composition?
3. **B's porthole imagery** uses each project's cover crop. A dedicated, art-directed
   image per porthole would lift it considerably.
4. **Accent discipline.** The global orange focus ring can appear alongside C's
   gauge accent under keyboard focus. Accept it, or use a paper-coloured focus ring
   inside `/explore`?
5. **Scroll cost of C's orbit.** Even shortened, the orbit is a long sticky
   passage, with direct project buttons as the escape. Is the turn worth it?
6. **A home at 390** leaves a gap of about 170px between the hero and the first
   project. Tighten it, or keep it as a breath?
7. **Promotion path.** Should the chosen direction be extended to Recall and Teams
   before it replaces any production route?

## Round two: D / E / F

**D: Cinema** uses Instrument Serif, warm paper, an original sculptural poster,
and staggered project spreads. The case alternates broad image plates with compact
argument, changes to ink at the problem boundary, and lets the visitor select
three real taskbar keyframes. Its existing taskbar film is visitor-controlled.

**E: Working model** uses charcoal/chalk, precise sans type, and a project viewport
that changes the artifact, contribution and destination together. Agents is the
default; nothing cycles automatically. The case places the working state
simulation before its rationale. Decision tabs preserve the distinction between
the inspected alternative and the chosen taskbar foundation. Mobile uses focused
desktop-detail crops, not a miniature full-width screenshot or invented mobile UI.

**F: Design atlas** uses light technical sheets and a linked evidence map.
Its five destinations are actual case sections; the connectors describe reading
relationships, not product architecture. All three candidate-home rationales
remain visible when a branch is focused. On mobile the map becomes a link list,
with the same normal-flow article beneath it.

Each direction owns its narrative ordering. Shared helpers are limited to figures,
case content, controls and the existing simulation reducer. D/E/F styles and their
material tokens are scoped to the explorations; production tokens, manual
primitives and A/B/C direction-specific files are unchanged.

### Reference adaptations

All nine sites were inspected live with hero, body and detail captures. Resend's
SDK tabs and Midday's feature selector were also exercised. This was inspiration
research, not a full audit of those sites.

| Reference | What was adapted |
| --- | --- |
| [Trionn](https://trionn.com/) | D's large material image and decisive editorial scene change; no particle effects or scrambled type. |
| [Supercommon](https://supercommon.systems/) | E's isolated operating surface and restrained surrounding explanation. |
| [Resend](https://resend.com/) | E's controls replace the real example within its frame; D contrasts material imagery with type. |
| [Specify Launch Week](https://specifyapp.com/launchweek) | F's connected modules become an index of evidence. |
| [Harness open source](https://www.harness.io/open-source) | F links the decision to its interface artifact; D changes background at a narrative boundary. |
| [Midday](https://midday.ai/) | E's prominent product viewport and explicit project selection. |
| [Daybox](https://usedaybox.com/) | E keeps the problem and next meaningful control adjacent to the demonstration. |
| [CP agency](https://cp-agency.eu/en) | D's asymmetric type and differently proportioned project compositions. |
| [Linear](https://linear.app/homepage) | E's focused product evidence and F's precise figure-to-decision relationships. |

No imagery, video, logos or code were copied from these reference sites.

### Media ownership and replacement

- `lib/explore/media.ts` is the replacement manifest. `EXPLORATION_MEDIA` holds
  image/video sources, poster, dimensions, alternative text, object position,
  illustrative status and attribution. Both media kinds render without changing
  layout code; keep truthful captions and attribution when replacing a source.
- `public/explore/cinema-study.svg` is an original vector composition created for
  this exploration: three paper-like surfaces representing state, control and
  continuity. It is visibly labeled as illustrative, not shipped Windows UI.
  The implemented poster is portrait (1200×1400), rather than the proposed wide
  composition, to support D's title-page arrangement. No new film was necessary.
- `PROJECT_MOBILE_MEDIA` maps E's square mobile crops. The three
  `public/explore/*-mobile.webp` files are derived from existing portfolio
  `public/images/{agents,recall,teams}/hero-demo.png` assets. Crop rectangles
  `(left, top, width, height)` are Agents `(1200,280,600,600)`,
  Recall `(155,92,350,350)`, Teams `(360,92,350,350)`. Preserve the square ratio
  or update the scoped mobile frame rule. Captions identify these as desktop details.
- Other product figures and the taskbar film reuse existing portfolio assets.
  No new product claims or simulated screenshots have been added.
- Instrument Serif is loaded using `next/font/google`; its copyright and SIL OFL
  1.1 are included in `public/explore/InstrumentSerif-OFL.txt`.
  [Authoritative license](https://github.com/google/fonts/blob/main/ofl/instrumentserif/OFL.txt).
- Videos have native controls, no autoplay/loop, `preload="none"`, and a poster.
  Starting a video pauses other videos. Unavailable images/videos expose an error
  message while retaining the frame and caption.

### Motion and interaction choices

The title entrance is a tokenized 500ms opacity/12px translation with Expo Out;
reduced motion removes it. There are no new pinned sequences, camera journeys or
scroll-scrubbed films. Local selection is immediate, except the short CSS option
background treatment; anchors navigate immediately rather than inheriting
production's smooth scrolling. D/E/F use normal links, not A/B/C's hero morph.

The shared simulation retains pause/resume, approval, completion/reset,
failure/retry and five inspected states. It is explicitly illustrative. Collapsing
its card preserves the taskbar position; the hidden card is inert and excluded
from the accessibility tree without removing its layout space.

### Second-round verification

- Type-check, the five simulation tests and production build pass. All thirteen
  explore routes are statically prerendered.
- The comparison sweep covered 104 combinations: thirteen routes, 1440×900,
  1024×768, 390×844 and 1440×700, reduced motion on/off. There were no missing
  images, horizontal overflow or browser errors. D/E/F returned `[]` from the
  text-clipping audit; index/A/B/C findings are intentional `sr-only` content.
- The production check covered all six main routes and two existing experiment
  routes at 1440/1024/390. Production and boot-sequence clipping audits returned
  `[]`. The unchanged editorial-motion experiment still reports five clipped
  elements per size; it was not modified as part of this exploration.
- Functional coverage includes all simulation actions and states, keyboard
  frame/decision/project tabs, direct anchors and refresh, the F map and branch
  focus, A–F case-mode switching, Back, visible DOM-text contrast, and failed-media
  fallbacks. Contrast checks exclude text inside images and disabled controls.
- Independent craft review returned three concrete fixes: collapse displaced the
  taskbar, E's mobile screenshot was too small, and E metadata shifted the image
  during project selection. The implementation now preserves the card footprint,
  uses focused mobile crops, and overlays metadata rows to reserve their maximum
  intrinsic height with unbroken years. These are scoped fixes, not A/B/C changes.
- Enlarged-text inspection at 200% exposed grid min-content overflow on narrow
  screens. Scoped `overflow-wrap: anywhere` lets long words contribute a breakable
  minimum width; no clipping or overflow-hiding workaround is used.
- The final rerun passed all 57 functional scenarios, including stable collapse
  geometry at both sizes and motion preferences, square mobile crops with no
  image-position shift, and 200% text reflow on all six new pages at 1440/390.
  The twelve desktop/mobile layout reruns returned no clipping or browser errors.
- Chrome desktop and mobile emulation were used. Real-device touch, Safari/Firefox,
  screen readers and performance/Lighthouse measurements remain untested.

### Round-two recommendation and remaining judgment

**E is the strongest new base hypothesis**, because the visitor can inspect
interaction-design evidence early. D tests visual memorability and F tests whether
the decision map makes systems thinking easier to follow. This does not replace
the first-round recommendation or select a production winner.

The remaining choices are editorial: D's final artwork and art/product balance,
whether E feels sufficiently authored rather than like product marketing, and
whether F's map earns its space. Recall/Teams and About variants remain outside
scope; their links go to the existing published pages. Compare all six before
choosing a base and extending it.

# Three portfolio directions: November 2026 exploration

Approved scope:
- Build three working, distinct directions, each with a homepage and a representative
  Agents in Windows case study.
- Use the same real content and assets throughout.
- Leave production routes untouched.
- Commit locally only: no deploy, push or PR.

## Routes

| Route | What it is |
| --- | --- |
| `/explore` | Comparison index: one line per direction, links to home and case |
| `/explore/direction-a` · `/agents-in-windows` | **A: layered editorial** |
| `/explore/direction-b` · `/agents-in-windows` | **B: project destinations** |
| `/explore/direction-c` · `/agents-in-windows` | **C: spatial story** |

The `/explore` layout sets `noindex` and nothing on the published site links to it. A
thin `ExploreBar` switches between A, B and C and between home and case.

## The three directions

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

## Recommendation

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

## Checks actually run

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

## Gaps needing Bryce's judgment

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

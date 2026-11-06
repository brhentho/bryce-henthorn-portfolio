# CLAUDE.md — repo working agreement

## What this repo is

A Next.js 16 + React 19 + Tailwind 4 portfolio for Bryce Henthorn (Product Designer, Windows AI at Microsoft — the site deliberately uses this role-neutral title everywhere). The selected direction is **Synthesis + ASCII**, promoted from the explorations at `f88faeb`. It retains the editorial typography, mono labels, figure chrome and readable case-study rail, with a living ASCII homepage and story-specific product motion. Home, Agents, Recall, Teams and About belong to one visual family, but do not share an identical page outline or background-change sequence.

`/copilot-actions` is a review draft: `noindex`, not linked from the home page, and kept out of publication until original visuals and confirmed ownership exist (see `docs/copilot-actions-review.md`). Case-study copy keeps the team voice ("we"); individual scope is stated once in the hero ledger. The approved Synthesis implementation and `docs/portfolio-content-review.md` are the current visual/editorial references. The `.dc.html` files and previous exploration plans are historical, not an instruction to undo the selected direction. The exploration archive remains available for comparison.

Public composition lives in `components/portfolio/` with shared styles in `app/portfolio-foundation.css`, `app/portfolio-primitives.css`, `app/portfolio.css` and page-specific `app/portfolio-pages.css`. Compatibility wrappers preserve archived imports. Main-route links never lead to review concepts. Planned-media slots have stable request IDs and remain visible in development and production-mode local review builds; they are not shipped product evidence or permission to deploy.

## Required reading before touching case study pages

Before editing any of these files:
- `app/recall/page.tsx`
- `app/agents-in-windows/page.tsx`
- `app/teams-for-education/page.tsx`
- `components/manual/*.tsx`

…read **`docs/layout-direction.md`** first. It defines:
- §1 Composition principles (10 imperative rules)
- §2 Section-type vocabulary (13 named layout primitives)
- §3 Per-page narrative outlines (current state → proposed sequence, with visual content audits)
- §4 Anti-patterns to avoid
- §5 Open questions where copy is too thin to support a non-stacked layout

The layout-direction document is the spec. Do not modify §2 (the primitive vocabulary) without raising it in chat first — extending the vocabulary affects all three case studies.

## Canonical editorial visual system

The August 2026 token lock was intentionally superseded by the editorial
visual-system revision. Preserve these roles across all production routes:

- **Material:** selected Synthesis uses the `--fn-*` foundation (`#0B0D12` ink,
  `#EFEDE6` paper), coordinated environment/foreground outputs and story-specific
  tones. The legacy manual material tokens listed below remain intact for archived
  routes and the unpublished draft. Do not recolor those routes during promotion.
- **Typography:** Inter Tight 500 for display, Inter 400 for body, and
  JetBrains Mono for navigation, labels, captions, and system status.
- **Display geometry:** oversized responsive type, tight negative tracking,
  and `0.92–0.95` line height (tokenized; see Leading below).
- **Hero motion:** stable words resolve left-to-right with clipping. Never
  scramble glyphs or simulate a typewriter.
- **Route motion:** public pointer navigation uses a full-screen editorial ink
  wipe, with visible hero words resolving backward on exit and the destination's
  existing left-to-right reveal after uncovering. One coordinator owns scroll,
  hash targeting and focus; do not layer native artifact morphs over the wipe.
  Keyboard/reduced-motion navigation is direct; local anchors stay local.
  Archived routes retain their existing transition behavior.
- **Chapter motion:** the mechanical aperture is reserved for `CoverPlate`.
  Do not apply it to ordinary `Figure` components.
- **Texture and chrome:** retain subtle paper texture, alpha rules,
  registration marks, numbered figures, and the 13 layout primitives.

### Where tokens live

**Every design token is defined exactly once, in `:root` in `app/globals.css`.**
`.manual` in `app/recall/recall.css` used to shadow a near-identical second set;
that duplication is gone. `.manual` now carries layout declarations only and
inherits its tokens like everything else. Never reintroduce a token definition
there, and never introduce a local colour literal — if a value is worth using
twice it is worth a token.

The canonical names:

The selected foundation's static `--fn-black`, `--fn-white`, accent and rhythm
tokens also live in this root block. Environment variables on a page are derived
runtime state; archived exploration palette parameters remain compatibility data.

- **Material** — `--ink` `#0B0B0C`, `--paper` `#E8E5DC`
- **Rules** — `--rule-hairline` / `--rule` / `--rule-strong` (paper at 12 / 22 / 48%)
- **Text** — `--text-primary` `--text-secondary` `--text-tertiary` `--text-faint`
  `--text-body`
- **Accents** — `--accent-trace` `#FF4D00` is the state indicator and the only
  accent that may move; `--accent-schematic` `--accent-signal` `--accent-alert`
  `--accent-warning` are for schematics and diagrams
- **Aliases** — `--bg` `--fg` `--ring`, and `--font-display` / `--font-body` /
  `--font-mono`
- **Motion** — `--ease-out-expo` (entrances), `--ease-in-expo` (exits),
  `--ease-in-out-sine` (mechanical apertures), `--ease-out-quad` (short UI state);
  `--duration-fast-ui` 180ms, `--duration-normal-ui` 300ms, `--duration-enter`
  500ms, `--duration-slow-ui` 700ms, `--duration-ambient` 3000ms;
  `--duration-route` / `--duration-hero` 500ms, `--stagger-word` 32ms,
  `--stagger-eyebrow` 220ms. Timings are deliberately ceremonial; don't shorten
  them without asking.
- **Hero clip** — `--hero-clip-hidden` / `--hero-clip-shown`. Shared by the CSS
  reveal and the route-exit animation in `lib/page-transition.ts`. The shown
  window must stay at ≥0.5em vertical / 0.25em horizontal overhang or glyphs
  get shaved.
- **Leading** — `--leading-display-xl` 0.92, `--leading-display` 0.94,
  `--leading-heading-1/2/3`, `--leading-body` 1.6, `--leading-mono`. Display
  leading never drops below 0.92.
- **Rhythm** — `--space-room`, `--space-section`, `--space-block`

The token block must stay reachable from OUTSIDE `.manual`: `PageTransitionOverlay`
is a sibling of `{children}` in `app/layout.tsx`, and `::selection`, `body` and the
global focus ring are outside it too. That is why the tokens sit at `:root`.

`@theme inline` is deliberately down to three entries. `--color-border` and
`--color-ring` are load-bearing — `* { @apply border-border outline-ring/50 }` in
`@layer base` is a compile-time dependency on them, so removing either breaks the
build. Note that `--color-border` is the 12% `--rule-hairline` tier, not `--rule`.

The approved ASCII idle/pointer treatment, layered project entrances, product tilt-to-flat
reveals and shiny case links are intentional. Vary body motion according to the case's
argument, not a component checklist. Do not add cursor replacement, unsolicited
marquees or competing decorative scenes. Never reintroduce opaque section bands
as a substitute for the selected continuous page environment.

### Retired in the August 2026 revision

These were previously locked-in and are now gone. Do not reintroduce them:

- **`§ NN / LABEL` section eyebrows.** `SectionLabel` renders the title alone; `number` and `label` survive as optional props purely to document document order at the call site.
- **The rule under section headings.** `SectionLabel` no longer emits `<hr className="rule" />`.
- **The `§ NN / TT` header counter.** `TopBar` is now the "index rail": crosshair + identifier on the left, with `00 WORK` and `01 ABOUT` as the two global sections on the right. Case studies remain children of Work. The active entry's number is the strip's only `--accent-trace` element. The `[data-section]` IntersectionObserver that fed the counter went with it.
- **The `NOW READING` chip.** `components/manual/NowReading.tsx` is deleted — it derived its label from the eyebrows. Retired alongside the earlier `RevisionHeader` + `ManualNav` + fixed `ProgressIndicator` triple.
- **`CoverPlate`'s `§ NN / TT` pagination line.** The plate carries its title alone; `total` is now an unused optional prop.
- **`SpecSheet` borders.** No frame, no per-row rules — rows separate on spacing alone. (The About page's Experience `<dl>` is a *data table*, §2.13, and deliberately keeps its per-row `border-b`.)
- **The `lede` class.** It was never defined in CSS and is no longer referenced.

Strip rules that frame a *pull-quote or a heading*. Keep rules that are *figure chrome* — the Recall latency strip, the Recall constraints closer, the Agents state lexicon, and the Teams field-interview grid all keep their framing because the designs show it.

## Standing behavioral rules

When restructuring or editing case study sections:

1. **Map every section to a §2 primitive.** If a section doesn't fit any primitive, the primitive vocabulary is incomplete — raise it in chat rather than inventing a one-off layout.

2. **Verify every layout claim against actual copy in the source file.** Do not propose "two-up comparison" if the body doesn't actually contrast two states. Do not propose "stage rail" if there isn't a real sequence in the copy.

3. **Flag weak content; don't paper over it.** If a section is too thin (3 short paragraphs, no figure, no contrast) to support a non-stacked layout, stop and report it in the §5 *Open Questions* format — page, section, what's missing, recommended fix. Do not pad thin sections to match the height of dense ones.

4. **Suggest new diagrams where the proposed primitive needs one.** When a §3 outline calls for a figure that doesn't exist (e.g., Recall §06 latency strip, Teams §00 hero schematic), write a one-paragraph SVG drawing brief covering: subject, anchor elements, leader/registration treatment, dimensions, and which existing primitive it should visually rhyme with (`HeroSchematic`, `Fig1_1`, etc.). Do not silently invent diagrams without surfacing the brief.

5. **Never deploy more than one accent-orange element per visible viewport.** This includes figure labels, margin pull-quotes, active stage indicators, and CTA-style chips.

6. **Cap the `Margin` primitive at one occurrence per two body sections.** Used everywhere it stops being marginalia.

7. **One section's worth of changes per turn, then stop.** When restructuring, edit one section, show the diff, and wait for review before moving to the next. Do not batch-edit a whole page. *Exception:* when implementing a design handoff that spans multiple pages, batch by phase (shared components → homepage → per-page) and stop for review between phases — confirm that framing with the user first.

8. **Keep figure chrome purposeful.** Framed evidence plates use hairlines, registration marks and figure numbering. Explicit floating-artifact exceptions in `docs/layout-direction.md` remain unboxed. "Full-bleed" means edge-to-container, not edge-to-viewport. Public homepage images omit captions and synthetic device bars; archived project plates retain their original chrome.

## Slash commands

- `/restructure [page] [section]` — restructure a single case study section against `docs/layout-direction.md`. See `.claude/commands/restructure.md` for the workflow.

## Stack notes

- Next.js 16 App Router, React 19, Tailwind 4 (`@tailwindcss/postcss`), TypeScript 5.7
- **Tailwind 4 writes movement to `translate` / `scale` / `rotate`, not to `transform`.** An
  arbitrary transition list that names `transform` will silently fail to ease a `-translate-y-*`
  or `scale-*` hover state — the state still applies, it just snaps. Name the real property
  (`transition-[border-color,translate,box-shadow]`) or use `transition-transform`, which Tailwind
  expands to `transform, translate, scale, rotate` for you.
- Tokens live in the global CSS as CSS variables; class utilities (`t-display-xl`, etc.) are defined alongside Tailwind in the same stylesheet
- shadcn/ui under `components/ui/` — case study pages do not consume these directly; they use the `components/manual/` primitives instead
- Storybook is configured for the manual primitives (`components/manual/Figure.stories.tsx`, etc.) — keep stories current when changing primitives
- Type-check via `pnpm tsc --noEmit`; tests via `pnpm test`; dev server via `pnpm dev`. `pnpm lint` has no ESLint config yet. pnpm is the only package manager (no `package-lock.json`).
- After any type or motion change, run `scripts/audit-text-clipping.js` in the browser on every route at 1440/1024/390px; it must return `[]`.

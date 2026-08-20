# CLAUDE.md — repo working agreement

## What this repo is

A Next.js 16 + React 19 + Tailwind 4 portfolio for Bryce Henthorn (Senior Product Designer at Microsoft). Visual aesthetic is an **operator manual / technical document** treatment — near-black background with subtle noise, off-white text, single hot-orange accent, mono labels for chrome. The home page and three case studies (Recall, Agents in Windows, Teams for Education) read as chapters of one paginated document, not as separate microsites.

This working copy is not a git repository. The current visual source of truth is the set of `.dc.html` design references (Home, Recall, Agents, Teams, About, plus a header/footer options sheet) produced in the August 2026 revision — ignore any deployed or older version of the site you might encounter. Where those files and this document disagree, the design files win and this document should be corrected.

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

## Locked design — out of scope for redesign

Do not propose changes to:
- Typography tokens (`t-display-xl`, `t-display-l`, `t-h1`, `t-body`, `t-body-sm`, `t-mono-label`, `t-mono-caption`, `t-mono-marginalia`, `t-mono-colophon`)
- Color tokens (`--ink`/`--bg`, `--text-primary/secondary/tertiary/body/faint`, `--rule`, `--rule-strong`, `--accent-*`)
- Spacing scale or container widths
- The page-header pattern: **headline → body**. Sections open directly on their `t-h1` heading with no eyebrow above it and no rule beneath it.
- The `Figure` frame chrome (corner `RegistrationMark`, `FIG. X.Y` label, hairline border)

All token definitions live in `app/recall/recall.css` under the `.manual` scope — **not** in `app/globals.css`, which carries an older, unrelated token set used only by dead components. If a layout move would require a new token, stop and ask — don't introduce one silently.

### Retired in the August 2026 revision

These were previously locked-in and are now gone. Do not reintroduce them:

- **`§ NN / LABEL` section eyebrows.** `SectionLabel` renders the title alone; `number` and `label` survive as optional props purely to document document order at the call site.
- **The rule under section headings.** `SectionLabel` no longer emits `<hr className="rule" />`.
- **The `§ NN / TT` header counter.** `TopBar` is now the "index rail": crosshair + identifier on the left, a numbered index of the five pages on the right (`00 WORK` … `04 ABOUT`). The active entry's number is the strip's only `--accent-trace` element. The `[data-section]` IntersectionObserver that fed the counter went with it.
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

8. **Keep figure chrome on every plate that contains a figure.** Hairline borders, corner registration marks, `FIG. X.Y` numbering. "Full-bleed" in this codebase means edge-to-container, never edge-to-viewport without the frame.

## Slash commands

- `/restructure [page] [section]` — restructure a single case study section against `docs/layout-direction.md`. See `.claude/commands/restructure.md` for the workflow.

## Stack notes

- Next.js 16 App Router, React 19, Tailwind 4 (`@tailwindcss/postcss`), TypeScript 5.7
- Tokens live in the global CSS as CSS variables; class utilities (`t-display-xl`, etc.) are defined alongside Tailwind in the same stylesheet
- shadcn/ui under `components/ui/` — case study pages do not consume these directly; they use the `components/manual/` primitives instead
- Storybook is configured for the manual primitives (`components/manual/Figure.stories.tsx`, etc.) — keep stories current when changing primitives
- Type-check via `pnpm tsc --noEmit`; lint via `pnpm lint`; dev server via `pnpm dev`

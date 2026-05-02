---
description: Restructure a single case study section against docs/layout-direction.md. Flags weak copy and proposes new diagrams instead of inventing them silently.
argument-hint: <page> [section-id]
---

# /restructure

Restructure a single case study section to match the §2 primitive specified in `docs/layout-direction.md` §3. **One section per invocation, never more.**

## Arguments

- `<page>` — required. One of: `recall`, `agents-in-windows`, `teams-for-education`
- `[section-id]` — optional. The section's `id` attribute on its `<section>` (e.g., `problem`, `cards`, `transparency`). If omitted, ask the user which section before proceeding.

## Workflow

Execute these steps in order. Do not skip ahead.

### Step 1 — Load context

1. Read `docs/layout-direction.md` in full. Pay particular attention to §1 (principles), §2 (primitive vocabulary), and the matching subsection of §3 for the `<page>` argument.
2. Read `app/<page>/page.tsx` in full.
3. Read any `components/manual/` primitives referenced by the section being touched. If the section uses a custom SVG (e.g., `app/recall/svg/Fig2_1.tsx`), read that too.

### Step 2 — Diagnose the section

In a single short message, report:
- The section's current layout (e.g., "SectionLabel + body column max-w-[68ch] + two stacked Figures").
- Which §2 primitive it currently maps to (or "no primitive — currently default body plate").
- Which §2 primitive `docs/layout-direction.md` §3 says it *should* map to.
- The delta — what specifically needs to change.

Do not edit anything yet.

### Step 3 — Verify copy can support the proposed primitive

Walk through the proposed primitive's content contract from §2. For each requirement, point to the specific lines in the source that satisfy it (e.g., "Two-up Comparison Plate needs two figures contrasting two states — source has `Fig2_1` (card hierarchy) and `Fig3_1` (before/after); both already named in copy at lines L–M.")

If any contract requirement is **not** met by existing copy:
- **Stop.**
- Report it in the §5 Open Questions format: `Page · Section · What's missing · Recommended fix`.
- Ask the user how to proceed: (a) write new copy, (b) downgrade to a different primitive, (c) skip this section.

Do not paper over weak copy. Do not pad thin sections.

### Step 4 — Surface diagram briefs (if any)

If the proposed primitive needs a figure that doesn't exist in `app/<page>/svg/` or `public/images/<page>/`:

Write a one-paragraph drawing brief in this format and stop for confirmation before writing any SVG:

> **Brief — `<proposed filename>`**
> Subject: [what the diagram shows]
> Anchor elements: [what must be visible — labels, nodes, leader lines, axes]
> Visual rhyme: [which existing primitive it should match — `HeroSchematic`, `Fig1_1`, `StateDiagram`]
> Dimensions: [viewBox, aspect ratio]
> Caption: [proposed `FIG. X.Y` caption naming the relationship to the body]

Do not invent diagrams silently. Do not generate SVG markup before the brief is approved.

### Step 5 — Make the edit

Once Steps 3 and 4 are clear:
1. Edit `app/<page>/page.tsx` for the single section.
2. If new manual primitives or layout helpers are needed, add them in `components/manual/` with a matching `.stories.tsx` file.
3. Run `pnpm tsc --noEmit` and report the result.
4. Show the diff for the section and stop.

Do **not**:
- Edit any other section in the same turn.
- Modify `docs/layout-direction.md` (it is a spec, not a changelog — propose vocabulary changes in chat instead).
- Modify typography, color, spacing tokens, or the page-header pattern.
- Introduce motion or animation behavior.
- Add a second accent-orange element to the section.

### Step 6 — Hand back to the user

End with a short summary:
- What primitive the section now maps to.
- Any briefs awaiting approval (Step 4 outputs).
- Any open questions raised (Step 3 stops).
- The next section the user should consider per `docs/layout-direction.md` §3.

## Notes

- The branch `feature/recall-operator-manual` is the only source of truth. Do not reference deployed versions.
- One section per invocation. If the user wants the whole page restructured, run `/restructure <page>` repeatedly, one section at a time.
- Never edit `docs/layout-direction.md` §2 (primitive vocabulary). If a primitive is missing, raise it in chat for the user to decide whether it gets added to the spec.

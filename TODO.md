# Recall — Operator Manual TODO

Every `[TK]` placeholder in `app/recall/page.tsx`, organised by section. Fill these in — don't restructure unless the layout itself needs to change. Line refs are approximate (line numbers will drift as you write).

Branch: `feature/recall-operator-manual`

## § 00 / Overview · Hero

- [ ] **page.tsx ~24** — `<h1>` is set to `Making AI memory legible` (placeholder). Confirm or replace.
- [ ] **page.tsx ~26** — 2-sentence hero subhead/lede.
- [ ] **page.tsx ~32** — Hero figure caption (`<Figure number="0.1" caption="…">`).
- [ ] **Replace** the `<HeroSchematic />` placeholder with a real image once Midjourney render is ready: swap to `<Figure src="/images/recall/hero-schematic.png" alt="…" />`.

## Spec sheet

- [ ] **page.tsx ~46** — `TIMELINE` value.
- [ ] **page.tsx ~47** — `TEAM` value.
- [ ] (Other rows pre-filled from the existing `/recall` page; confirm `ROLE`, `PLATFORM`, `MY FOCUS`, `STATUS`.)

## § 01 / Problem

- [ ] **page.tsx ~54** — Section title (`<SectionLabel title="…">`).
- [ ] **page.tsx ~57** — Problem paragraph 1.
- [ ] **page.tsx ~58** — Problem paragraph 2.
- [ ] **page.tsx ~60** — Marginalia: original framing assumption.
- [ ] **page.tsx ~63** — Fig 1.1 caption.

## § 02 / Methodology

- [ ] **page.tsx ~70** — Section title.
- [ ] **page.tsx ~73** — Methodology paragraph 1.
- [ ] **page.tsx ~74** — Methodology paragraph 2.
- [ ] **page.tsx ~78** — Fig 2.1 (research synthesis) caption.
- [ ] **page.tsx ~82** — Fig 2.2 (rejected concepts) caption.
- [ ] **page.tsx ~84** — Marginalia: rejected-direction note.

## § 03 / Solution

- [ ] **page.tsx ~91** — Section title.
- [ ] **page.tsx ~94** — Solution paragraph 1.
- [ ] **page.tsx ~95** — Solution paragraph 2.
- [ ] **page.tsx ~99** — Fig 3.1 (before/after) caption.
- [ ] **page.tsx ~102** — Fig 3.2 (confidence indicators) caption.
- [ ] **page.tsx ~117** — Marginalia: contested decision (`I argued for…`).

## § 04 / Impact

- [ ] **page.tsx ~123** — Section title.
- [ ] **page.tsx ~125** — Impact paragraph.
- [ ] **page.tsx ~129** — Telemetry: `DEVICES` value (Windows 11 24H2).
- [ ] **page.tsx ~130** — Telemetry: `TEAMS` value.

## § 05 / Reflection

- [ ] **page.tsx ~140** — Section title.
- [ ] **page.tsx ~143** — Reflection paragraph 1.
- [ ] **page.tsx ~144** — Reflection paragraph 2.
- [ ] **page.tsx ~146** — Marginalia: what I'd change.

## Visuals (replace placeholder SVGs with real assets when ready)

- [ ] `app/recall/svg/HeroSchematic.tsx` → swap to image via `<Figure src="/images/recall/hero-schematic.png" />`.
- [ ] `app/recall/svg/Fig1_1.tsx` → search vs. recall final illustration.
- [ ] `app/recall/svg/Fig2_1.tsx` → research synthesis.
- [ ] `app/recall/svg/Fig2_2.tsx` → rejected concepts grid.
- [ ] `app/recall/svg/Fig3_1.tsx` → before/after.
- [ ] `app/recall/svg/Fig3_2.tsx` → confidence indicator system.

## Verification (run before merging)

- [ ] `pnpm dev` — visit `/recall`, toggle DARK / PAPER, check resize at 1024px, check `prefers-reduced-motion`.
- [ ] `pnpm storybook` — toolbar Mode toggle works in every story.
- [ ] `pnpm build` — no TypeScript errors.
- [ ] `git diff main -- app components package.json` — only planned paths changed.

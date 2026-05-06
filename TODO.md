# Operator Manual TODO

Branch: `feature/operator-manual-restructure`

Text content for `/recall` is now in place. The case study runs in 9 numbered sections (Overview, Context, System, Problem, Cards, Transparency, Performance, Trust, Constraints, Impact), with prose lifted and adapted from `main`. All 6 SVG figure placeholders remain in place pending real assets.

## Teams hero schematic (deferred)

- [ ] `app/teams-for-education/svg/HeroSchematic.tsx` — design and ship the Figma-spec 6-table 3×2 classroom grid: top-down operator-manual rendering, hairline borders per table, persistent seat dots, optional teacher-pod marker. Style-match Recall's `HeroSchematic` (registration mark + stage labels). Punted from the case-study rebuild batch — current placeholder remains in `<Figure number="0.1" />`.

## Visuals (replace placeholder SVGs with real assets when ready)

- [ ] `app/recall/svg/HeroSchematic.tsx` → swap to image via `<Figure src="/images/recall/hero-schematic.png" />` (Figure 0.1).
- [ ] `app/recall/svg/Fig1_1.tsx` → search vs. recall final illustration (Figure 3.1, § 03 Problem).
- [ ] `app/recall/svg/Fig2_1.tsx` → card hierarchy illustration (Figure 4.1, § 04 Cards).
- [ ] `app/recall/svg/Fig3_1.tsx` → before/after card layout (Figure 4.2, § 04 Cards).
- [ ] `app/recall/svg/Fig2_2.tsx` → match-type signals (Figure 5.1, § 05 Transparency).
- [ ] `app/recall/svg/Fig3_2.tsx` → confidence indicator system (Figure 5.2, § 05 Transparency).

## Content review

- [ ] Hero h1 (`Designing semantic search for everything you've seen`) and 2-sentence lede — confirm or revise.
- [ ] Spec sheet — confirm `TIMELINE = 2023 – 2025` and `TEAM = Cross-functional team of design, research, and ML engineering`.
- [ ] § 09 Impact Telemetry values (`Copilot+ DEVICES`, `2 TEAMS`, `2 YEARS`) — confirm or replace with sharper numbers.

## Verification (before pushing)

- [ ] `pnpm dev` — visit `/recall`, check the right-rail counter advances `01 / 11` … `11 / 11`, check NowReading chip updates per section, check resize at 1024px, check `prefers-reduced-motion`.
- [ ] `pnpm storybook` — Mode toggle works in stories.
- [ ] `pnpm build` — no TypeScript errors. ✅ (verified)
- [ ] `git diff main -- app components` — only planned paths changed.

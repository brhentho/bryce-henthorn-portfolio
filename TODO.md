# Portfolio TODO

Source of truth for open work: `docs/portfolio-review-2026-11.md`.

## Needs Bryce
- [ ] Record the three loops in the review doc §6; swap each `MediaSlot` for `LoopingMedia`.
- [ ] Sign off copy proposals (review doc §5).
- [ ] Copilot Actions: confirm scope, add two decisions with alternatives and original artifacts, then remove `noindex` and add it to the home page.
- [ ] Teams: one concrete shipped outcome, or shorten to an earlier-work chapter.

## Engineering
- [ ] Compress `public/` images (~89 MB) and rename unnamed files.
- [ ] Gate or remove `/experiments/*`.
- [ ] Add an ESLint config so `pnpm lint` runs.
- [ ] Storybook 8 cannot start on Next 16; upgrade or remove.

## Before every push
- [ ] `pnpm tsc --noEmit`, `pnpm test`, `pnpm build`.
- [ ] Run `scripts/audit-text-clipping.js` on all routes at 1440/1024/390; expect `[]`.
- [ ] Check `prefers-reduced-motion` and keyboard focus on Home and one case study.

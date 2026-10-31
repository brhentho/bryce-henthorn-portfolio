# Operator Manual

Shared presentation system for Home, About, Recall, Agents in Windows, and Teams
for Education. Read `../../CLAUDE.md` and `../../docs/layout-direction.md` before
changing it. The existing 13 layout primitives remain the composition vocabulary.

## Visual system

Tokens are defined once in `app/globals.css` at `:root`; scoped layout and type
utilities are in `app/recall/recall.css`. Preserve Inter Tight display, Inter body,
JetBrains Mono chrome, ink/paper materials, and the orange state accent. Do not
copy token values into component styles. Figure labels and borders remain neutral
so the active global navigation keeps the viewport's orange accent.

## Portfolio compositions

- `ProjectCard`: separate text and unobscured image lanes, stacked on mobile.
- `CaseBrief`: opening spec-sheet summary with problem, ownership, decision,
  evidence, status, and same-page reading links.
- `DecisionTable`: existing data-table primitive applied to alternatives and
  tradeoffs. Its horizontally scrollable region is keyboard focusable.
- `AgentSimulation`: local, user-stepped portfolio example using published agent
  icons. State transitions live in `lib/agent-simulation.ts`; no data access or
  agent execution occurs. Native buttons, disabled unavailable actions, and a
  polite status region support keyboard and assistive-technology use.
- `LoopingMedia`: muted inline recordings with visible play/pause, optional poster
  and description, visibility-aware playback, and an error fallback preserving
  the still and explanatory text. Reduced motion disables automatic playback.

Wrap product media and simulations in `Figure` to retain registration marks,
numbering, and decision-oriented captions. Introductory content needs room below
the figure-number overlay; the simulation reserves this padding explicitly.

## Motion

Word resolution and chapter apertures retain their existing language. Route exits
use a separate 200ms token and 150ms word exits with at most 50ms stagger. Hero
resolution uses 300ms plus a short word stagger. Chapter timing is independent.
Reduced motion navigates immediately, reveals text statically, disables smooth
scroll, and leaves video playback under user control. The simulation never
auto-advances and has no animation-dependent state changes.

## Verification

- `pnpm test`: simulation approval, pause/resume, failure/retry, reset, terminal states.
- `pnpm exec tsc --noEmit`: TypeScript checks.
- `pnpm build`: production compilation and static routes.
- Stories accompany each new composition, including a deliberately unavailable
  media example. The existing Storybook 8 Next.js integration currently fails on
  Next.js 16's removed `next/config`; upgrading that integration is separate work.
- The pre-existing `pnpm lint` script requires ESLint, which is not installed.

Browser checks must cover desktop/mobile composition, navigation, keyboard
activation, readable media failure, and all simulation states. Actual research
artifacts and first-person retrospectives still require author-supplied evidence;
see `docs/portfolio-implementation.md`.

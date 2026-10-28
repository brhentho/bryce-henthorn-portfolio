# Copilot Actions — review draft

Branch: `feat/copilot-actions-case-study`

Route: `/copilot-actions`

This is a review draft saved on its own GitHub branch. Keep it unmerged until publication is approved. No PR or production deployment is part of this handoff. `vercel.json` disables automatic deployment for `feat/copilot-actions-case-study`; the live homepage remains unchanged.

## Scope

- New case study using the existing manual components, typography, tokens, and reveal behavior.
- Homepage features Copilot Actions, Agents in Windows, and Recall. Teams remains available through an Earlier work link; its page and assets are retained.
- New page is classified as Work in the header.
- Interactive stage rail supports click, keyboard arrows, Home, End, and reduced motion.
- Product screenshots open at full size in a new tab.
- Native disclosure at the end holds editorial review questions.
- Draft metadata is `noindex, nofollow`; remove this after narrative approval, before publication.

## Evidence boundaries

The user stated that they worked across the computer-using agent project, its Windows app patterns, settings, and safety features. This supports the broad role description. It does not establish sole ownership, leadership level, dates, collaborators, tested alternatives, user research, or measured outcomes; those are deliberately not asserted.

The milestone is the October 16, 2025 announcement of an experimental capability. It is not described as general availability, proof of adoption, or proof of current behavior. The stage rail and workspace diagram are editorial explanations, not original design artifacts or a reproduction of production behavior. The Review stage is a design question, not a claim about a shipped review screen.

## Layout mapping

| Section | Existing primitive |
| --- | --- |
| Hero | 2.1 Hero Header |
| Role and scope | 2.2 Spec Sheet Block |
| Challenge | 2.3 Body Column with Running Margin |
| Control follows the work | 2.10 Cover Plate |
| Delegation sequence | 2.5 Stage Rail Plate |
| Access and onboarding | 2.8 Full-bleed Plate + 2.9 Strip Break |
| Agent workspace | 2.4 Annotated Split Plate |
| Stepping in | 2.11 Pull-quote Interlude |
| Human action | 2.13 Data Table Block |
| Perspective | 2.3 Body Column |
| Public record | 2.13 Data Table Block |

No shared layout primitives were changed. The new diagram composes HTML/CSS inside the shared Figure frame. Drawing brief: two stacked workspace outlines, one for ongoing user work and one dashed outline for the contained agent workspace, connected by a labeled check-in/takeover relationship. It uses existing tokens, registration marks and figure numbering, with a responsive half-width slot in a split plate. It explains conceptual separation rather than security implementation details.

## Open questions before publication

| Page | Section | What's missing | Recommended fix |
| --- | --- | --- | --- |
| Copilot Actions | Role | Exact ownership, dates, collaborators | Confirm led/co-designed/supported responsibilities and add team context. |
| Copilot Actions | Design process | Alternatives and evidence behind key decisions | Add two or three specific decisions with artifacts; do not fabricate a research chapter. |
| Copilot Actions | Visuals | Original design screens or a shareable walkthrough | Replace or supplement the attributed announcement images with approved original material. |
| Copilot Actions | Outcomes | Verified rollout, adoption, or research results | Add only verifiable milestones or results; the current closer is perspective, not impact. |

## Public sources and asset provenance

- Microsoft, [Securing AI agents on Windows](https://blogs.windows.com/windowsexperience/2025/10/16/securing-ai-agents-on-windows/), October 16, 2025. The authoritative source for the announced boundaries and controls.
- Microsoft, [Making every Windows 11 PC an AI PC](https://blogs.windows.com/windowsexperience/2025/10/16/making-every-windows-11-pc-an-ai-pc/), October 16, 2025. Announcement context and local-file computer use.
- Thurrott, [Microsoft explains how it will secure AI agents in Windows 11](https://www.thurrott.com/windows/windows-11/328457/microsoft-explains-how-it-will-secure-ai-agents-in-windows-11), October 16, 2025. Secondary coverage, not evidence of individual contribution.
- PCMag, [Microsoft really wants you to talk to your PC (and Copilot)](https://www.pcmag.com/news/microsoft-heres-why-you-should-talk-to-your-windows-11-pc), October 16, 2025. Retrieved through its Yahoo syndication in the research conversation; the page links to the original supplied URL.

The two unmodified PNGs are attributed to Microsoft in figure captions:

- `public/images/copilot-actions/announcement-app.png`: https://blogs.windows.com/wp-content/uploads/sites/2/2025/10/Copilot-Actions-app1920.png
- `public/images/copilot-actions/announcement-onboarding.png`: https://blogs.windows.com/wp-content/uploads/sites/2/2025/10/Under-embargo-until-10.16-Copilot-Actions-visual1920.png

## Local checks

Use pnpm for this repository: `pnpm install --frozen-lockfile`, `pnpm tsc --noEmit`, `pnpm build`.

The repository's npm lockfile is already out of sync with package.json and npm also reports the existing Storybook 8 / Next 16 peer mismatch. No dependency or lockfile changes are part of this draft.

For local validation, 104 Microsoft mirror tarball URLs in a temporary copy of the pnpm lockfile were normalized to registry.npmjs.org. Versions and integrity hashes were preserved, and all 750 entries passed the installer's supply-chain verification. The tracked lockfile was restored afterward. Optional dependency build scripts were not run.

TypeScript and the production Next.js build passed. This environment required `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1` for Next to retrieve the existing Google Fonts over TLS. No TLS verification was disabled, and no font or application configuration was changed.

The local preview service passes Vite-shaped arguments. A temporary, uncommitted adapter translated `--host` to `--hostname`, omitted `--strictPort`, and served the completed Next production build. This adapter is not part of the portfolio change.

Browser verification passed for the homepage-to-case-study route, desktop rendering, click and arrow/Home keyboard selection of the stage rail, and the review-notes disclosure. A 390px iframe viewport verified mobile wrapping (375px content viewport with scrollbar), no horizontal overflow, stage selection, and the mobile navigation drawer. Only browser-extension metadata errors appeared in the inspected console entries, not application exceptions. A desktop screenshot is saved at `docs/copilot-actions-preview.jpg`.

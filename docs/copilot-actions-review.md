# Copilot Actions — review draft

Route: `/copilot-actions`

This is an unpublished review draft. Keep it unmerged until publication is
approved. No PR or production deployment is part of this migration, and the
homepage remains unchanged.

## Synthesis migration review

The page uses the main portfolio's shared Synthesis shell, hero, reading rail,
navigation, footer, sections, prose, media and evidence entrances. The seven
existing body anchors and keyboard-operable delegation interaction remain intact.
Only the chapter divider retains the manual `CoverPlate`, its scoped stylesheet
and reveal controller to preserve the established aperture. There is no legacy
body wrapper, duplicate page background or new motion language. The route remains
`noindex, nofollow` and is not linked from the homepage. This visual migration
does not authorize publication.

The opening image, `public/images/copilot-actions/cua-hero.png`, is the supplied
`CUA.png` design image, displayed in full at its original aspect ratio. It shows a
restaurant-reservation task with a browser workspace, progress and Take control
action. It is not attributed to the October 2025 announcement and does not
establish availability, authorship of every depicted element, or measured outcomes.
The former travel-video announcement hero now accompanies the intervention copy.
It preserves the original transparent silhouette; onboarding uses the shared
rounded media surface. Both retain full-size image links and Microsoft attribution.

## Scope

- Shared Synthesis composition with varied body primitives and a continuous ink environment.
- No incoming homepage or public-case links to the draft.
- Page is classified as Work in the header.
- Interactive stage rail supports click, keyboard arrows, Home, End, and reduced motion.
- Product screenshots open at full size in a new tab.
- Native disclosure at the end holds editorial review questions.
- Draft metadata is `noindex, nofollow`; any change requires separate publication approval.
- Planned walkthrough stays compact and visible in local development and production previews as `CUA-M01`, never as a playable recording.

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

The primitive vocabulary is unchanged. The retained conceptual diagram composes
HTML/CSS in a hairline evidence plate. Original drawing brief: two stacked
workspace outlines, one for ongoing user work and one dashed outline for the
contained agent workspace, connected by a labeled check-in/takeover relationship.
It uses existing tokens, registration marks and figure numbering, with a responsive
half-width slot in a split plate. It explains conceptual separation rather than
security implementation details.

### CUA-M01 — Delegate, check in, take control, hand back

- **Location / status:** `/copilot-actions#intervention`; requested, not recorded.
- **Purpose:** Show the transitions a still cannot establish without implying
  that a proposed recording is evidence of shipped behavior.
- **Shot list:** Enter a cleared task; inspect progress; encounter a request for
  input; select Take control; complete the user step; return to the agent if
  supported; show the result in context.
- **Required context:** Build or prototype version, confirmed handoff behavior,
  source clearance and synthetic or permitted task content.
- **Fallback:** Attributed announcement image, the three-needs table and the
  compact planned-media request. No fabricated duration or play button.

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

## Local validation

Use pnpm: `pnpm tsc --noEmit`, `pnpm test`, `pnpm build`. This environment
requires `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1` for the existing
Google Fonts fetch; do not disable TLS verification.

Check 1440/1024/390px layouts, full-size image links, chapter navigation, delegation
clicks and arrow/Home/End keys, the review disclosure, reduced motion, 200% text
and no-JavaScript readability. Confirm the production-mode local preview retains
both `noindex, nofollow` and `CUA-M01`. The text-clipping audit must distinguish
intentional `.sr-only` accessible heading text from visible clipping; do not
silently change its thresholds or claim an empty raw report.

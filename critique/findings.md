# Portfolio critique findings

Generated: 2026-05-06
Captures: 43
Animation frames: 17

## Summary

P0 issues: 1
P1 issues: 9
P2 issues: 11

Capture caveats:
- Hero/boot animation frames are spaced ~1–2s apart (Playwright MCP cannot pause mid-animation). Frames 003–005 of `boot-animation-frame-*` show the settled state; only frames 001–002 capture mid-typewriter. Reasoning about animation craft below combines these frames with the source-level timings in `app/globals.css` and `components/manual/HeroIntro.tsx`.
- A console error fires on `/teams-for-education`: `<svg> attribute height: Expected length, "auto"`. Surfaced as a P2 in Dimension 6.
- The `/recall` `?cache=bypass*` reload was used to capture the hero animation freshly each time — no other network failures observed.

The five pages are not summarized here; see findings by dimension below.

## Dimension 1: Narrative and positioning

What I evaluated: Whether the prose reads as Principal-level positioning and whether the case studies show decision authority, systems thinking, organizational influence, and tradeoffs honestly.

Findings:

[P0] Self-titling "Senior" everywhere undercuts the Principal positioning goal
- Page: site-wide
- Evidence: `home-footer-1440.png`, `about-footer-1440.png`, browser tab title in `home-abovefold-1440.png` ("Bryce Henthorn | Senior UX/Product Designer"), `recall-fullpage-1440.png` spec sheet (ROLE = Senior UX/Product Designer)
- Issue: Bryce is targeting Staff/Principal at Anthropic/OpenAI/Google/Meta and has explicitly listed "Reads as Principal-level positioning, not Senior" as the #1 optimization goal. The portfolio currently labels him "Senior" four separate times (HTML `<title>`, OG title, footer AUTHOR line, Recall spec sheet ROLE). A hiring manager skim-reads three of these in the first 30 seconds.
- Root cause: stale copy in four files — title metadata, footer component, recall spec sheet
- Fix: in `app/layout.tsx` change `metadata.title` and `metadata.openGraph.title` from `"Bryce Henthorn | Senior UX/Product Designer"` to `"Bryce Henthorn | Principal Product Designer"`, change the OG description's `"Senior UX/Product Designer"` to `"Principal Product Designer"`, in `components/manual/ManualFooter.tsx` change the line `Senior Product Designer, Microsoft` to `Principal Product Designer, Microsoft`, and in `app/recall/page.tsx` change SpecSheet `ROLE` value from `"Senior UX/Product Designer"` to `"Principal Product Designer"`.

[P1] About hero ends on the weakest line in the portfolio
- Page: /about
- Evidence: `about-abovefold-1440.png`
- Issue: The manifesto closes with "Naturally, a UX designer." — the climactic line of the about hero actively re-titles him as a UX designer (not even Senior, not Principal) and uses "Naturally" as a hedge. After four punchy systems-thinking lines, the closer drops the register two levels.
- Root cause: content
- Fix: in `app/about/page.tsx` change the `MANIFESTO` array's last entry from `"Naturally, a UX designer."` to `"Designing systems, not features."` (or similar Principal-register line). Single string edit.

[P1] About §01 heading and body voice reads as Senior portfolio, not Principal
- Page: /about
- Evidence: `about-portrait-default.png`
- Issue: The §01 Bio title is "Want a bit more?" — a casual interstitial phrase, not a section heading at this level. The body that follows ("I'm wired to solve problems. I don't really know how to turn it off. […] I have a habit of obsessively researching the 'right' solution to things most people would settle on in an afternoon.") is humble-brag/blog voice. A Principal candidate is showing thought, not personality quirks.
- Root cause: content
- Fix: in `app/about/page.tsx` change the §01 SectionLabel `title` from `"Want a bit more?"` to `"How I work"`. The body paragraphs need a second pass but the immediate single-line edit is the title.

[P1] Recall §08 narrates the privacy reset in passive voice
- Page: /recall
- Evidence: `recall-fullpage-1440.png` (§08 Trust)
- Issue: "After public scrutiny, things changed. Recall flipped from opt-out to opt-in. Users got the ability to exclude apps and pause indexing." The Recall privacy moment was the most public design crisis on Bryce's résumé — and the portfolio describes it without an actor. "things changed" / "Recall flipped" / "Users got" are all passive constructions. A hiring committee reading this concludes Bryce was *near* the decision, not driving it. This is the single highest-leverage narrative issue.
- Root cause: content
- Fix: in `app/recall/page.tsx` §08, change the second paragraph from `"After public scrutiny, things changed. Recall flipped from opt-out to opt-in. Users got the ability to exclude apps and pause indexing."` to a sentence that names the call. e.g., `"When public scrutiny hit, we made the call to flip Recall from opt-out to opt-in, ship per-app exclusion, and give users a pause control. I owned the IA for the new privacy surface."` Single paragraph edit.

[P1] The home thesis is the strongest line in the portfolio and it's hidden in the right margin
- Page: /
- Evidence: `home-abovefold-1440.png`, `home-fullpage-1440.png`
- Issue: "Make the invisible visible. The automatic interruptible. The AI auditable." is rendered as the §02 Thesis Margin pull (`Margin` component in the right column, `t-mono-marginalia`, ~12px). This is Bryce's thesis — three crisp imperatives that map 1:1 to the case studies (Recall = visible/auditable, Agents = interruptible). It's set smaller than the body copy that surrounds it. A hiring manager who scans the home page sees the long body paragraph and a faded marginalia line; they don't see the thesis at all.
- Root cause: information hierarchy
- Fix: in `app/page.tsx` §02 Thesis section, swap the body paragraph and the Margin contents. Promote `"Make the invisible visible. The automatic interruptible. The AI auditable."` to the body slot, rendered as `t-display-l` (or `t-h2`), and demote the current "When software starts running on your behalf…" paragraph to the right margin or below. Single section edit.

[P1] The home hero treats Bryce's thesis as decorative caption text
- Page: /
- Evidence: `home-abovefold-1440.png`
- Issue: The hero stacks two `t-display-l` lines, but the second — "I design at the intersection of operating systems, agents, and enterprise workflows" — is set to `var(--text-tertiary)` (#6E6C68, ~45% white). This is the line that says what he *does*. It's set in the same color as captions and decorative chrome.
- Root cause: token misuse on the second hero line
- Fix: in `app/page.tsx` HeroIntro `lines[1].style`, change `color: "var(--text-tertiary)"` to `color: "var(--text-secondary)"` so the line sits at ~60% white instead of 45%. One value change.

The three weakest sentences in the portfolio (verbatim) and proposed rewrites:

1. "Naturally, a UX designer." (`/about`, §00 manifesto closing line) → `"Designing systems, not features."` *Reason: existing line undercuts title and uses 'Naturally' as a hedge.*
2. "Want a bit more?" (`/about`, §01 Bio title) → `"How I work"` *Reason: an interstitial blog phrase doesn't carry the weight of a Principal section heading.*
3. "After public scrutiny, things changed." (`/recall`, §08 Trust, paragraph 3) → `"When public scrutiny hit, I led the redesign that flipped Recall from opt-out to opt-in."` *Reason: the original obscures actor and authority on the most-watched moment in his résumé.*

Decision-authority audit, per case study:
- Recall: spec sheet says "ROLE = Senior UX/Product Designer" and "MY FOCUS = Semantic search experience: ranking, relevance, and trust". Body copy mostly uses "we" and only once names Bryce's specific call ("My role focused specifically on the semantic search experience…"). The §08 passive voice issue above. **Authority is implied, rarely shown.**
- Agents in Windows: spec sheet says "ROLE = Lead designer, agent visibility & orchestration" and uses first-person agency more directly ("We had to tell teams 'no'…"). **Authority is the strongest of the three.**
- Teams for Education: spec sheet says "ROLE = Lead interaction designer, virtual classroom" but the body returns to "we" / "our team" almost throughout. The strongest authority claim is in §01 Context: "we discovered that the real lever for retention wasn't feature additions" — but this is a "we" decision again. **Authority is muddied.**

## Dimension 2: Brand consistency

What I evaluated: Whether the documented operator-manual tokens (warm cream `#F5F1E8` text on `#0F0F10` ink, `--accent-trace` orange `#B8551E`, mono labels for chrome) hold across all pages and components, and where the visual language departs from the brief.

Findings:

[P1] Project-card backgrounds break the operator-manual visual language
- Page: /
- Evidence: `home-casestudy-card-default.png`, `home-fullpage-375.png`, `home-fullpage-1440.png`
- Issue: All three project cards on the home page use cosmic-gradient art (purple/teal nebula on Agents, blue/orange/red gradient on Recall, magenta/cyan glow on Teams) as their full-bleed backgrounds (`bgSrc`). The brief specifies "Dieter Rams / Otl Aicher / Edward Tufte lineage" and `CLAUDE.md` says "near-black background with subtle noise, off-white text, single hot-orange accent". Cosmic gradients are not in that lineage — they read as "AI startup hero card" templates. Every other surface in the site (case study heroes, figures, telemetry, spec sheets, footer) is hairline-on-ink. The home page is the only place the operator-manual aesthetic breaks.
- Root cause: assets (`/images/cards/agents-bg.png`, `/recall-bg.png`, `/teams-bg.png`)
- Fix: replace the three `bgSrc` values in `app/page.tsx`'s `PROJECTS` array with subtle hairline schematic backgrounds (or remove `bgSrc` and let the card sit on `var(--ink)` with hairline border + corner registration mark, the same chrome the case-study figures use). Smallest single-edit version: in `components/manual/ProjectCard.tsx` add `mix-blend-mode: luminosity` and `opacity: 0.18` to the bg `<Image>` to desaturate the cosmic art into something that reads as ink. The right answer is new assets but a single CSS edit gets 80% of the way there.

[P1] Headline copy is duplicated across home and case-study pages with subtle inconsistencies
- Pages: /, /recall, /teams-for-education
- Evidence: `home-abovefold-1440.png` vs `recall-abovefold-1440.png`; `home-fullpage-1440.png` vs `teams-for-education-abovefold-1440.png`
- Issue: Home Recall card title is `"Designing semantic search for everything you've seen."` (with terminal period). Recall page hero h1 is `"Designing semantic search for everything you've seen"` (no period). Home Teams card title is `"Modernizing Online Classes for an Authentic Virtual Experience."` (Title Case). Teams page hero is `"Modernizing online classes for an authentic virtual experience."` (sentence case). Two inconsistencies in the same three lines of cross-page copy.
- Root cause: page-level copy not synced
- Fix: in `app/page.tsx` PROJECTS array, change `"Modernizing Online Classes for an Authentic Virtual Experience."` to `"Modernizing online classes for an authentic virtual experience."`, and add a terminal period to the recall hero line in `app/recall/page.tsx` HeroIntro `lines[0].text`. Two strings.

[P2] Curly vs straight quotes mixed
- Pages: /recall, /agents-in-windows
- Evidence: `recall-fullpage-1440.png` (multiple sections), `agents-in-windows-fullpage-1440.png`
- Issue: Body copy uses `&apos;` (straight ASCII apostrophe rendered as `'`) for contractions throughout (`couldn&apos;t`, `wasn&apos;t`), but pull-quotes use `&rsquo;` curly (`Relevance wasn&rsquo;t a fixed property…`, `It doesn&rsquo;t rewrite…`). Within `app/teams-for-education/page.tsx` student-quote blocks the body uses straight `'`s but the wrapping `&ldquo;…&rdquo;` is curly. A reader doesn't notice consciously but the eye registers the inconsistency.
- Root cause: content (mixed entity usage)
- Fix: in `app/recall/page.tsx`, `app/agents-in-windows/page.tsx`, `app/about/page.tsx`, and `app/teams-for-education/page.tsx` replace `&apos;` with `&rsquo;` everywhere it appears in body prose. Single find-and-replace per file.

[P2] Footer author title sits outside the operator-manual mono-label rhythm
- Page: site-wide
- Evidence: `home-footer-1440.png`, `about-footer-1440.png`
- Issue: The AUTHOR / INDEX / CONTACT eyebrows are `t-mono-label` (uppercase mono, `--text-tertiary`). Underneath, "Bryce Henthorn" is `t-body` and "Senior Product Designer, Microsoft" is `t-body-sm` — both Open Sans. Every other section eyebrow in the manual is followed by a display-family heading or a mono caption. The footer is the only place a mono eyebrow leads into a body-family run-on. It reads as legacy.
- Root cause: component (`components/manual/ManualFooter.tsx`)
- Fix: in `components/manual/ManualFooter.tsx`, change the AUTHOR block's role line from `t-body-sm` to `t-mono-caption` so the author column rhythm matches the rest of the manual.

## Dimension 3: Layout, spacing, typography

What I evaluated: Grid, vertical rhythm, line lengths, type-scale legibility on each page.

Findings:

[P1] Home hero leaves >40% of the above-fold viewport empty before the headline appears
- Page: /
- Evidence: `home-abovefold-1440.png`
- Issue: The hero section has `min-h-[calc(100vh-9rem)]` and `flex flex-col justify-center`, but inside it the `HeroIntro` eyebrow uses `eyebrowStyle={{ marginBottom: "clamp(3rem, 8vh, 6rem)" }}`. At 1440×900 that's a ~64px gap above the eyebrow plus ~96px below it before the headline starts. The headline ("Product Designer with 10+ years…") sits two-thirds of the way down the screen. A hiring manager landing on the page reads the eyebrow then has to track 100+ pixels of dark space before reaching the value prop.
- Root cause: page-level (`app/page.tsx`)
- Fix: in `app/page.tsx` HeroIntro on the home page, remove the `eyebrowStyle` override or reduce to `marginBottom: "clamp(1.5rem, 4vh, 3rem)"`. Single style change.

[P2] About §00 manifesto sets each line as `t-display-xl` (4.5rem) — five stacked display-xl lines
- Page: /about
- Evidence: `about-abovefold-1440.png`, `about-fullpage-1440.png`
- Issue: Each manifesto line is the largest type token in the system. Five of them stacked produces a wall of display type that has the same texture as a single very long sentence — none of the lines lands. The top three ("Serial problem solver. Fixated on optimizing systems. Obsessed with structure and flow.") are the strongest; the bottom two dilute. Five at the same weight = none at the loudest weight.
- Root cause: page-level
- Fix: in `app/about/page.tsx` `MANIFESTO` mapping, set `className: "t-display-l"` (3rem) instead of `"t-display-xl"` (4.5rem). One string.

[P2] Recall §07 Performance section opens with three short paragraphs above the SectionLabel
- Page: /recall
- Evidence: `recall-fullpage-1440.png`
- Issue: §07 opens with a `t-display-l` pull-quote ("We made waiting feel like progress."), then a `SectionLabel` ("§ 07 / Performance / Fast enough to feel alive"), then a second one-line caption ("Embedding indexing is computationally heavy…"). Three different display weights stacked in 200px. The SectionLabel rule hairline draws under the second heading but the pull-quote sits above without rhythm. Below 1440 the three lines smush together.
- Root cause: page-level (`app/recall/page.tsx` §07)
- Fix: in `app/recall/page.tsx` §07, move the `SectionLabel` above the pull-quote, so the order is § 07 label → headline → pull-quote → caption → video. One block reorder.

[P2] Agents §07 Iteration places a state-strip lexicon above the body paragraph instead of below
- Page: /agents-in-windows
- Evidence: `agents-in-windows-fullpage-1440.png`
- Issue: The 5-state visual lexicon (RUNNING, NEEDS ATTENTION, COMPLETED, FAILED, PAUSED) appears immediately under the SectionLabel, before the body paragraph that explains why micro-interactions matter. The reader sees the lexicon without any framing, then has to scroll back up after reading the body to connect the dots.
- Root cause: page-level
- Fix: in `app/agents-in-windows/page.tsx` §07, swap the order of the strip-break lexicon `<div>` and the body paragraph `<div>`. The SectionLabel → body → strip-break sequence is the rest of the page's vocabulary; §07 inverts it for no reason.

[P2] Telemetry value sizing collapses on small screens
- Pages: /recall (§10), /agents-in-windows (§08), /teams-for-education (§01)
- Evidence: `recall-fullpage-375.png`, `agents-in-windows-fullpage-375.png`, `teams-for-education-fullpage-375.png`
- Issue: `Telemetry` value uses `clamp(2.25rem, 4vw, 3.5rem)`. At 375 viewport width, 4vw is 15px, so the clamp lands at the 2.25rem (36px) floor. That's adequate for "5" or "2" but on Recall the value is "Copilot+" — a 9-character string at 36px stacked above a 12px label. The values stack vertically in mobile (`grid-cols-1`) but the type ratio between value and unit/label flattens because the value's `lineHeight: 1` makes "Copilot+" feel like a heading, not a number.
- Root cause: component (`components/manual/Telemetry.tsx`)
- Fix: in `components/manual/Telemetry.tsx` change `fontSize: "clamp(2.25rem, 4vw, 3.5rem)"` to `clamp(1.875rem, 5vw, 3.5rem)` so longer string values shrink with the viewport. Single value change.

## Dimension 4: Image and text alignment

What I evaluated: Whether each image carries evidence weight, whether captions add information, whether prose claims match what's shown.

Findings:

[P1] About portrait caption duplicates the alt text and adds no information
- Page: /about
- Evidence: `about-portrait-default.png`, `about-portrait-hover.png`
- Issue: The portrait `Figure` caption is "At altitude on a hike, smiling toward the camera with a green valley and clouds behind". The alt text is essentially identical: "Bryce Henthorn at altitude on a hike, smiling toward the camera with a green valley and clouds behind". A figure caption in an operator-manual idiom is supposed to do work — date, location, tool, decision context. This one describes the photo back to the viewer. In a manual, captions of pictorial figures are typically `FIG 1.1 / Author at field site, 2024 (self-portrait)` — terse, locational.
- Root cause: content (`app/about/page.tsx`)
- Fix: in `app/about/page.tsx` change the bio Figure `caption` from the current sentence to a terse field-note style: `"Field site, summer 2024."` Single string edit.

[P1] Recall §01 Context image is a stylized icon, not the problem the prose describes
- Page: /recall
- Evidence: `recall-fullpage-1440.png` (§01 Context)
- Issue: The §01 prose describes the user's frustration ("you'd seen something on your computer: a presentation, a snippet of code, a reference in an email. But you couldn't find it"). The accompanying image is a glowing blue Recall app *icon* on a faint capture grid — i.e., the brand mark, not the problem. The problem deserves an image of the problem (a desktop with three open windows the user can't search across, or a search box returning zero results for a partial memory). The icon is decoration.
- Root cause: asset (`/images/recall/context-recall-icon.png`)
- Fix: replace `app/recall/page.tsx` §01 `<Image src="/images/recall/context-recall-icon.png">` with the existing `/images/recall/problem-opentable.png` asset (which is currently used in §03 Problem to show extracted Recall chips), and reuse a different schematic in §03. If asset-swapping is out of scope, the smaller single edit is to drop the icon entirely and let the §01 body run full-width — better an absent image than a decorative one.

[P2] Recall §02 System pipeline list and the exploded illustration aren't aligned 1:1
- Page: /recall
- Evidence: `recall-fullpage-1440.png` (§02 System)
- Issue: The list is ordered descending (`04 SEARCH & INDEX SERVICE` → `01 SCREENSHOT CAPTURE`) to "match the Figma stack". The illustration is a vertical isometric stack also ordered top-down. But the list items each describe a distinct stage with distinct verbs (Stores, Interprets, Converts, Captures), while the illustration is a single rendered asset — the reader cannot tell which sub-element of the illustration corresponds to which list item. There's no leader line, no number callout, no anchor.
- Root cause: asset
- Fix: ideal answer is a labeled diagram. Single-edit answer: in `app/recall/page.tsx` §02, add `style={{ contentVisibility: 'auto' }}` no — the actual single edit is to add a small mono number marker (`<span className="t-mono-label">04</span>`) before each list item's existing label so the list itself becomes the call-out reference even when the illustration doesn't. Each list item already has the number; just visually align it with the corresponding stack tier in the illustration via flex spacing. ~20 minute fix; left for the next pass.

[P2] Teams page hero schematic is rendered (SVG) but the home Teams card art is a different illustration
- Page: / and /teams-for-education
- Evidence: `home-fullpage-1440.png` (Teams card), `teams-for-education-abovefold-1440.png`
- Issue: Home Teams card art shows a Microsoft Teams classroom screenshot with realistic student avatars (`/images/cards/teams-art.png`). The Teams page hero figure 0.1 shows the operator-manual SVG schematic — a top-down classroom diagram. The two assets are visually unrelated. A user going home → Teams expects continuity; instead they see a screenshot then a wireframe of the same concept rendered in completely different vocabularies.
- Root cause: asset (the Teams card was the one Bryce flagged as deferred in `TODO.md`)
- Fix: this is exactly the gap surfaced in `TODO.md` line 8 ("Teams hero schematic (deferred)" — current placeholder remains). Fix is to swap the home Teams card art to a desaturated version of the SVG schematic so the operator-manual idiom carries through.

## Dimension 5: Animation craft

What I evaluated: Hero typewriter, scroll-driven section reveals, view-transition page-to-page motion.

Findings:

[P1] The hero typewriter is the loudest motion on the site and serves no information
- Pages: /, /about, /recall, /agents-in-windows, /teams-for-education
- Evidence: `boot-animation-frame-001.png` through `005.png`, `hero-intro-frame-001.png`/`002.png`; source: `components/manual/HeroIntro.tsx` (charStep=26ms, eyebrowGap=220ms, wordStep=32ms; total ~3s for the home hero)
- Issue: Every page boots with a char-by-char typewriter eyebrow, a blinking caret, and a word-by-word fade-up-blur on the body lines. ~3 seconds of motion before a reader can read the page. The motion is the same on every page, so it announces itself rather than reinforcing each chapter's content. Held against the "operator-manual / telemetry-as-art / Dieter Rams" brief, this is the one place the page calls attention to itself rather than the content. A real operator manual doesn't type itself out when you open it.
- Root cause: component (`components/manual/HeroIntro.tsx`)
- Fix: keep the typewriter only on the home eyebrow; on all four other pages set `charStep` to 0 and `wordStep` to 0 (or render a static `<p>` for the eyebrow and a plain `<h1>` for the headline). Smaller single edit: in `components/manual/HeroIntro.tsx` add a `disableMotion` prop that short-circuits the per-char/per-word spans, and pass `disableMotion` from the four non-home callsites. The home keeps the boot, the case studies don't restart it.

[P2] The hairline `hr.rule` draws in left→right under every SectionLabel; the effect is invisible at 800ms
- Pages: /recall, /agents-in-windows, /teams-for-education
- Evidence: `scroll-reveal-frame-002.png` through `005.png`; source: `app/recall/recall.css` lines 142–150 (`transform 800ms cubic-bezier(0.2, 0.65, 0.3, 1) 200ms`)
- Issue: A 1px hairline drawing in over 800ms is below the threshold of perception for most readers — it's a faint shimmer that completes before the eye fixes on the heading. As decoration it's fine, but it's load on every section label across three case studies (29 hairlines).
- Root cause: stylesheet
- Fix: in `app/recall/recall.css` reduce the rule transition duration from 800ms to 400ms (and remove the 200ms delay) so the rule actually reads as a draw rather than as a fade.

[P2] The View Transition fade-out + fade-in stacks two animations totaling 540ms before content settles
- Pages: any → any
- Evidence: `nav-transition-001-home.png` through `005-recall-arrived.png`; source: `app/recall/recall.css` lines 226–242 (220ms out + 100ms delay + 320ms in)
- Issue: A reader clicks a project card and waits 540ms before they can read anything on the new page. For a portfolio that's mostly text, this is long. The fade-out + fade-in shape makes the transition feel like a presentation rather than a deep-link.
- Root cause: stylesheet
- Fix: in `app/recall/recall.css` shorten `manual-page-fade-out` to 120ms and `manual-page-fade-in` to 180ms with no delay between (total 300ms). Two duration changes.

[P2] Scroll-reveal `[data-reveal]` sections fade-up 32px (later 8px) over 600ms; cumulative load is heavy
- Pages: all case-study pages
- Evidence: `scroll-reveal-frame-001.png` through `005.png`
- Issue: Recall has 11 `[data-reveal]` sections. Agents has 9. Each fades up 8px over 600ms when the IntersectionObserver fires (`-30% 0px -60%`). On a fast scroll the cumulative effect is a sequence of stutter-pops as sections enter mid-fade; on a slow scroll it's invisible. The motion's job is unclear — it's not staging information, it's just announcing presence.
- Root cause: component + stylesheet (`components/manual/ScrollRevealController.tsx` + `app/recall/recall.css`)
- Fix: in `app/recall/recall.css` replace the `[data-reveal]` initial `transform: translateY(8px)` with `transform: none` and keep just the opacity fade — ship the lift-on-reveal as opt-in via a separate `[data-reveal="lift"]` selector for sections that genuinely benefit. The single edit is to remove `transform: translateY(8px)` from line 135.

## Dimension 6: Polish details

What I evaluated: alignment, micro-typography, focus states, hover affordances, mobile, browser tab.

Findings:

[P1] Project-card hover and focus states are nearly invisible
- Page: /
- Evidence: `home-casestudy-card-default.png`, `home-casestudy-card-hover.png`, `home-casestudy-card-focus.png`
- Issue: Default → hover changes are: border `--rule` (rgba 4% white) → `--rule-strong` (rgba 15%), bg image scale 1.0 → 1.01 (1%, sub-pixel), READ link color → `--accent-trace` orange, arrow translate 3px. Comparing the three captures side-by-side I cannot tell hover from default at 100% zoom. The only consistently legible change is the orange tint on "READ →". For the primary CTA on the home page (clicking into a case study) the hover affordance does not register.
- Issue continued: focus state on the same card is `focus:outline focus:outline-1 focus:outline-[color:var(--accent-trace)]` — a 1px outline at the card's full size. In the focus capture I cannot see the outline at all; the orange and the dark backdrop have low contrast on a thin stroke.
- Root cause: component (`components/manual/ProjectCard.tsx`)
- Fix: in `components/manual/ProjectCard.tsx` change the outer link `focus:outline-1` to `focus:outline-2` and change `focus:outline focus:outline-1` to `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-trace)]`. Add a hover state to the outer `<article>` that brightens the border explicitly: `group-hover:border-[color:var(--text-tertiary)]` (already at `--rule-strong` — strengthen one step). Two class edits.

[P1] TopBar nav active underline color reads white, not the documented accent
- Page: /, /about, /recall, /agents-in-windows, /teams-for-education
- Evidence: `home-nav-link-focus.png`, `recall-nav-link-focus.png`, `agents-in-windows-nav-link-focus.png`
- Issue: The active nav item is rendered with `decoration-[color:var(--accent-trace)] decoration-[1.5px]`. In the home capture, the active "WORK" item shows a ~1.5px white-cream underline, not orange. The accent color is `#B8551E`. On the dark background at small font size and 1.5px stroke, the orange reads as warm white. The "single accent per visible viewport" rule from `CLAUDE.md` is not paying off because the accent isn't legible.
- Root cause: token + stylesheet
- Fix: in `components/manual/TopBar.tsx`, change `decoration-[1.5px]` to `decoration-[2.5px]` and `underline-offset-[0.25em]` to `underline-offset-[0.35em]` so the orange reads as orange. Two class value edits.

[P2] Teams HeroSchematic emits an SVG `height="auto"` warning that surfaces in the console
- Page: /teams-for-education
- Evidence: console error captured in three navigations to /teams-for-education ("`<svg> attribute height: Expected length, "auto"`")
- Issue: `<svg width="100%" height="auto">` is invalid SVG. The browser ignores `height="auto"` and falls back to default sizing. It works visually because the parent `<Figure>` constrains aspect ratio, but a hiring manager's DevTools console shows an error every time they open the page.
- Root cause: component (`app/teams-for-education/svg/HeroSchematic.tsx` line 16)
- Fix: in `app/teams-for-education/svg/HeroSchematic.tsx` line 16 remove `height="auto"` entirely — `width="100%"` plus the `viewBox` is sufficient. Single attribute deletion.

[P2] Browser tab title is generic-AI-startup, not the brand
- Page: site-wide
- Evidence: `home-abovefold-1440.png` (browser title bar shown in viewport screenshot)
- Issue: `<title>Bryce Henthorn | Senior UX/Product Designer</title>` plus the favicon path uses generic "Light/Dark" naming. The tab is the first artifact a recruiter sees if they have many tabs open. Also captures the "Senior" issue from D1.
- Root cause: metadata
- Fix: covered by the D1 P0 fix (replace "Senior UX/Product Designer" with "Principal Product Designer" in `app/layout.tsx` metadata).

[P2] Mobile project cards lose the foreground art entirely
- Page: / (mobile)
- Evidence: `home-fullpage-375.png`
- Issue: At <1024 width, the right column of `ProjectCard` is hidden (`hidden lg:flex`). Only the cosmic gradient background remains, with the eyebrow + title + READ link stacked over it. The cards on mobile read as bands of gradient with no product context. A recruiter scrolling on a phone gets zero visual signal about what each project actually is.
- Root cause: component (`components/manual/ProjectCard.tsx`)
- Fix: in `components/manual/ProjectCard.tsx` remove the `hidden lg:flex` from the right `<div>` and add `lg:basis-[40%] basis-full` instead, with a smaller mobile aspect ratio. Stacks art under text on mobile rather than hiding it. ~10 minute edit, but if scope-limited: simply change `hidden lg:flex` to `flex` and let the existing layout reflow (ProjectCard already has `flex-col lg:flex-row`).

[P2] About §02 experience list uses `&middot;` separators in one heading and not in the rest
- Page: /about
- Evidence: `about-fullpage-1440.png`
- Issue: "FIELD INTERVIEWS · STUDENT VOICES" (Teams §02) uses `&middot;` (·). About §02 MICROSOFT eyebrow does not. Mixed punctuation across mono labels reads as noise across the manual.
- Root cause: page-level (consistent rule for label separators not applied)
- Fix: low-leverage; covered if a global pass on mono labels happens. No single-line fix worth flagging beyond consistency awareness.

[P2] Home hero second body line lacks a terminal period; first line has one
- Page: /
- Evidence: `home-abovefold-1440.png`
- Issue: Hero line 1: "Product Designer with 10+ years of experience currently working on AI experiences at Microsoft." (period). Hero line 2: "I design at the intersection of operating systems, agents, and enterprise workflows" (no period). At display-l size the missing punctuation reads as truncation.
- Root cause: page-level
- Fix: in `app/page.tsx` HeroIntro `lines[1].text`, append a period.

[P2] Recall §10 Telemetry "2 TEAMS" undersells the organizational influence claim
- Page: /recall
- Evidence: `recall-fullpage-1440.png` (§10 Impact strip)
- Issue: The number is sized as a hero stat (`clamp(2.25rem, 4vw, 3.5rem)`). The claim "2 TEAMS" — meaning Windows Search and File Explorer adopted the patterns — is the strongest org-influence argument in the case study. But two as a numeral in display-xl reads as small. Either the type size needs to drop (so the label "TEAMS" carries more weight) or the count needs to grow (e.g., "Windows Search + File Explorer" written out). The first is one-off styling; the second is content.
- Root cause: content + token
- Fix: in `app/recall/page.tsx` §10 Telemetry `items[1]`, change `value: "2"` to `value: "WS + FE"` and `unit: "TEAMS"` to `unit: "TEAMS ADOPTING"`. Two string edits, no token change.

[P2] CoverPlate dividers in Recall and Agents don't match the Recall spec sheet's "TIMELINE = 2023 – 2025" en-dash usage
- Pages: /recall, /agents-in-windows
- Evidence: `recall-fullpage-1440.png`, `agents-in-windows-fullpage-1440.png`
- Issue: The case-study spec sheets use both en-dash (Recall: `2023 – 2025`) and non-dash forms (`2025 – Present` in Agents) — and the home cards use `2023 – 2025` consistently. This rounds to OK across pages, but the `MICROSOFT_ROLES` array on /about uses `2025 –` (en-dash + space + nothing) for active roles, which renders as a dangling dash. A reader scans this as truncation rather than "ongoing".
- Root cause: content (`app/about/page.tsx` MICROSOFT_ROLES)
- Fix: in `app/about/page.tsx` MICROSOFT_ROLES, change all `year: "2025 –"` entries to `year: "2025 – PRESENT"` (uppercase to match the t-mono-label rendering) so the active roles read as "ongoing" rather than "—". Two string edits.

## Dimension 7: Cross-page system health

What I evaluated: Whether navigation, footer, hero pattern, section vocabulary, and visual chrome behave identically across all five pages.

Findings:

[P1] Home page is structurally a different document type than the case studies and the about page
- Pages: / vs /about vs /recall, /agents-in-windows, /teams-for-education
- Evidence: `home-fullpage-1440.png`, `about-fullpage-1440.png`, `recall-fullpage-1440.png`, `agents-in-windows-fullpage-1440.png`, `teams-for-education-fullpage-1440.png`
- Issue: The home page has 3 sections (Hero, Selected Work, Thesis) with no `Figure`, no `Telemetry`, no `SpecSheet`. The about page has 4 sections (Hero, Bio, Experience, Philosophy) — uses `Figure` once, `SpecSheet` once. The three case studies each have 9–11 sections with the full primitive vocabulary. The home page in particular doesn't read as a chapter of the same document — its only operator-manual signal is the TopBar and footer. The cosmic project cards (D2 finding) compound this: the home looks like a hub-and-spoke landing while the case studies look like operator manuals. They don't match.
- Root cause: page-level (`app/page.tsx`) + asset
- Fix: this is the largest single move in the document and it's two coordinated edits: (1) replace cosmic card backgrounds with hairline-on-ink (D2 fix), (2) wrap the home `<TopBar>` with the same `Figure` chrome rhythm — adding a `<SpecSheet>` row at the very top of the page (`AUTHOR / ROLE / FOCUS / STATUS`) and replacing the §02 Thesis Margin with a centered display block. Each is a single edit; together they move the home into the same document.

[P1] Cover plates are inconsistent in chapter numbering across case studies
- Pages: /recall, /agents-in-windows, /teams-for-education
- Evidence: `recall-fullpage-1440.png`, `agents-in-windows-fullpage-1440.png`, `teams-for-education-fullpage-1440.png`
- Issue: Recall uses `<CoverPlate number="02" total="09" title="System" />` and `<CoverPlate number="08" total="10" title="Trust" />` (two cover plates, totals 09 and 10 — they disagree). Agents uses `total="08"` for both its cover plates. Teams uses `total="09"` for both. The total-section count visible in the cover plate disagrees with the actual `[data-section]` count in the Recall page (which the TopBar's `§ NN / TT` counter uses). On Recall, the TopBar counts ~12 sections while the cover plates assert 9 and 10.
- Root cause: page-level (hardcoded `total` prop on `<CoverPlate>` in each case-study page)
- Fix: in `app/recall/page.tsx` change the second `<CoverPlate>` `total` from `"10"` to `"09"` so both Recall covers agree, and in `app/teams-for-education/page.tsx` confirm `total="09"` is consistent across both cover plates (currently is). For correctness: the cover plate `total` should be derived from the actual count of `[data-section]` entries — but as a single-edit fix, just ensure the two plates within each page agree.

[P2] About page has no `CoverPlate` chapter dividers, breaking the chapter-of-a-document feel
- Page: /about
- Evidence: `about-fullpage-1440.png`
- Issue: The case studies use `<CoverPlate>` between their major chapter transitions (Process → Taskbar → Constraints → Impact). About has no cover plates between Bio → Experience → Philosophy. As a result the about page reads as one continuous scroll while the case studies read as paginated chapters. The eye learns to expect a cover plate as the chapter punctuation; about's absence of any feels like a different document.
- Root cause: page-level
- Fix: in `app/about/page.tsx` insert a `<CoverPlate number="02" total="04" title="Experience" />` before the §02 Experience section. Single component insert.

[P2] Footer "INDEX" labels disagree with TopBar nav labels
- Page: site-wide
- Evidence: `home-footer-1440.png` and `home-abovefold-1440.png` viewed together
- Issue: The TopBar nav labels are uppercase short ("WORK / RECALL / AGENTS / TEAMS / ABOUT"). The footer INDEX uses Title Case full ("Work / Windows Recall / Agents in Windows / Teams for Education / About"). The relationship between the two is "TopBar = abbreviation, footer = full name" but a reader scanning both sees two different vocabulary registers in the same chrome. A real operator manual repeats its index labels verbatim.
- Root cause: components (`components/manual/TopBar.tsx` and `components/manual/ManualFooter.tsx`)
- Fix: one of the two needs to win. Lower-effort: in `components/manual/ManualFooter.tsx` `INDEX_ITEMS` change all entries to uppercase short ("WORK", "RECALL", "AGENTS", "TEAMS", "ABOUT") and apply `t-mono-label` to the `<a>` so the footer index reads as the same vocabulary. Five label string edits + one classname change.

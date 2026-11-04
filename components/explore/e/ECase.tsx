import { AGENTS } from "@/lib/explore/content"
import { ExperienceHeader, CaseContents, Constraints, Invocation } from "../ExperienceParts"
import { StudioFooter, Ledger, Paragraphs, ProblemPair, DecisionOptions, FrameSelector, CaseImpact, PublishedLinks } from "../round-two/CaseParts"
import { StudyFigure, TaskbarFilm } from "../round-two/Media"
import { WorkingDemo } from "../round-two/Demo"
import { XrTitle } from "../round-two/Motion"
import { HeroArtifact } from "../ExperienceParts"

export function ECase() {
  return <>
    <a className="xp-skip" href="#context">Skip to the case study</a>
    <ExperienceHeader direction="direction-e" />
    <main id="main" className="xr-shell">
      <header className="x3-case-hero xe-case-opening">
        <p className="xr-label">01 / Agents in Windows / A system made legible</p>
        <XrTitle text={AGENTS.title} />
        <div className="xe-case-lead"><p className="xr-intro">{AGENTS.lede}</p><p className="xr-intro">{AGENTS.call}</p></div>
        <Ledger /><HeroArtifact direction="direction-e" />
      </header>
      <CaseContents className="xe-contents" />
      <section id="context" className="xr-section xe-essay">
        <div className="xe-reading"><p className="xr-label">Context</p><h2>{AGENTS.context.title}</h2><Paragraphs items={AGENTS.context.body} /></div>
        <div className="xe-evidence"><StudyFigure {...AGENTS.context.figure} number="01.1" /></div>
      </section>
      <section id="problem" className="xr-section">
        <div className="xe-case-lead"><h2>{AGENTS.problem.thesis}</h2><Paragraphs items={AGENTS.problem.body} /></div>
        <ProblemPair />
      </section>
      <section id="decision" className="xr-section xe-decision">
        <div className="xe-case-lead"><h2>{AGENTS.decision.title}</h2><Paragraphs items={AGENTS.decision.body} /></div>
        <DecisionOptions />
      </section>
      <section id="taskbar" className="xr-section xe-essay">
        <div className="xe-reading"><p className="xr-label">Progressive disclosure</p><h2>{AGENTS.taskbar.title}</h2><Paragraphs items={AGENTS.taskbar.body} /></div>
        <div className="xe-evidence"><FrameSelector /><TaskbarFilm /></div>
      </section>
      <section id="states" className="xr-section">
        <p className="xr-label">The shared state language</p><h2>{AGENTS.simulation.title}</h2><WorkingDemo />
      </section>
      <Constraints /><Invocation /><CaseImpact /><PublishedLinks />
    </main>
    <StudioFooter direction="direction-e" />
  </>
}

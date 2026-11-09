import { AGENTS } from "@/lib/explore/content"
import { ExperienceHeader, HeroArtifact, CaseContents, Constraints, Invocation, Reveal } from "../ExperienceParts"
import { StudioFooter, Ledger, Paragraphs, ProblemPair, DecisionOptions, FrameSelector, CaseImpact, PublishedLinks } from "../round-two/CaseParts"
import { StudyFigure, TaskbarFilm } from "../round-two/Media"
import { WorkingDemo } from "../round-two/Demo"
import { XrTitle } from "../round-two/Motion"

export function DCase() {
  return <>
    <a className="xp-skip" href="#context">Skip to the case study</a>
    <ExperienceHeader direction="direction-d" />
    <main id="main">
      <header className="xr-shell x3-case-hero xd-case-opening">
        <p className="xr-label">Agents in Windows / A familiar place for something new</p>
        <XrTitle text={AGENTS.title} />
        <p className="xr-intro">{AGENTS.lede}</p>
        <Ledger /><HeroArtifact direction="direction-d" />
      </header>
      <div className="xr-shell">
        <CaseContents />
        <section id="context" className="xr-section xr-split">
          <div><p className="xr-label">The starting point</p><h2>{AGENTS.context.title}</h2><Paragraphs items={AGENTS.context.body} /></div>
          <Reveal><StudyFigure {...AGENTS.context.figure} number="01.1" /></Reveal>
        </section>
        <section id="problem" className="xr-section xd-case-problem">
          <p className="xr-label">The problem was invisibility</p><h2>{AGENTS.problem.thesis}</h2>
          <ProblemPair /><Paragraphs items={AGENTS.problem.body} />
        </section>
        <section id="decision" className="xr-section xd-case-decision">
          <p className="xr-label">A familiar foundation</p><h2>{AGENTS.decision.title}</h2>
          <Paragraphs items={AGENTS.decision.body} /><DecisionOptions />
        </section>
        <section id="taskbar" className="xr-section">
          <p className="xr-label">From a pin to a conversation</p><h2>{AGENTS.taskbar.title}</h2>
          <FrameSelector /><Paragraphs items={AGENTS.taskbar.body} /><TaskbarFilm />
        </section>
        <section id="states" className="xr-section">
          <p className="xr-label">Try the interaction</p><h2>{AGENTS.simulation.title}</h2><WorkingDemo />
        </section>
        <Constraints /><Invocation /><CaseImpact /><PublishedLinks />
      </div>
    </main>
    <StudioFooter direction="direction-d" />
  </>
}

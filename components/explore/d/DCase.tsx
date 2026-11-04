import { AGENTS } from "@/lib/explore/content"
import { StudioHeader, StudioFooter, Ledger, Paragraphs, ProblemPair, DecisionOptions, FrameSelector, CaseImpact, PublishedLinks } from "../round-two/CaseParts"
import { StudyFigure, TaskbarFilm } from "../round-two/Media"
import { WorkingDemo } from "../round-two/Demo"

export function DCase() {
  return (
    <>
      <a className="xp-skip" href="#context">Skip to case study</a>
      <StudioHeader direction="direction-d" label="Case study / Agents in Windows" />
      <main id="main">
        <header className="xd-case-hero xr-shell">
          <p className="xr-label">{AGENTS.eyebrow}</p><h1 className="xr-title-arrive">{AGENTS.title}</h1>
          <div className="xd-case-deck"><p>{AGENTS.lede}</p><p>{AGENTS.call}</p></div>
          <Ledger />
        </header>
        <div className="xr-shell xd-opening-plate"><StudyFigure {...AGENTS.hero} caption="A familiar desktop. A new kind of work." number="01" priority /></div>
        <div className="xr-shell">
          <section className="xr-section xr-split" id="context">
            <div><p className="xr-label">The context</p><h2>{AGENTS.context.title}</h2><Paragraphs items={AGENTS.context.body} /></div>
            <StudyFigure {...AGENTS.context.figure} number="01.1" />
          </section>
        </div>
        <section className="xd-night xr-inverted" id="problem">
          <div className="xr-shell xr-section">
            <p className="xr-label">The real problem</p><h2 className="xd-problem-title">{AGENTS.problem.thesis}</h2>
            <Paragraphs items={AGENTS.problem.body} /><ProblemPair />
          </div>
        </section>
        <div className="xr-shell">
          <section id="decision" className="xr-section xd-decision">
            <p className="xr-label">Three paths. One familiar place.</p><h2>{AGENTS.decision.title}</h2>
            <Paragraphs items={AGENTS.decision.body} /><DecisionOptions />
          </section>
          <section id="taskbar" className="xr-section xd-taskbar">
            <div className="xd-section-heading"><p className="xr-label">The interaction, frame by frame</p><h2>{AGENTS.taskbar.title}</h2></div>
            <FrameSelector /><Paragraphs items={AGENTS.taskbar.body} /><TaskbarFilm />
          </section>
          <section id="states" className="xr-section">
            <p className="xr-label">From a frame to a feeling of control</p><h2>{AGENTS.simulation.title}</h2><WorkingDemo />
          </section>
          <CaseImpact /><PublishedLinks />
        </div>
      </main>
      <StudioFooter direction="direction-d" />
    </>
  )
}

import { AGENTS } from "@/lib/explore/content"
import { StudioHeader, StudioFooter, Ledger, Paragraphs, ProblemPair, DecisionOptions, FrameSelector, CaseImpact, PublishedLinks } from "../round-two/CaseParts"
import { StudyFigure, TaskbarFilm } from "../round-two/Media"
import { WorkingDemo } from "../round-two/Demo"

export function ECase() {
  return (
    <>
      <a className="xp-skip" href="#states">Skip to the operating example</a>
      <StudioHeader direction="direction-e" label="Case study / Agents in Windows" />
      <main id="main" className="xr-shell">
        <header className="xe-case-hero">
          <p className="xr-label">Agents in Windows / interaction design</p>
          <h1 className="xr-title-arrive">{AGENTS.title}</h1>
          <div className="xe-hero-bottom"><p className="xr-intro">{AGENTS.call}</p><a className="xr-link" href="#states">Try the model <span aria-hidden="true">↓</span></a></div>
          <Ledger />
        </header>
        <nav className="xe-chapter-links" aria-label="Case study sections">
          <a href="#states">Operate</a><a href="#context">Context</a><a href="#problem">Problem</a><a href="#decision">Decision</a><a href="#taskbar">Details</a><a href="#impact">Impact</a>
        </nav>
        <section id="states" className="xr-section xe-operate">
          <p className="xr-label">An interface you can question</p><h2>See the state.<br />Take control.</h2>
          <p className="xr-intro">{AGENTS.simulation.disclaimer}</p><WorkingDemo />
        </section>
        <section id="context" className="xr-section xr-split">
          <div><p className="xr-label">Why this needed to exist</p><h2>{AGENTS.context.title}</h2><Paragraphs items={AGENTS.context.body} /></div>
          <StudyFigure {...AGENTS.context.figure} number="01" />
        </section>
        <section id="problem" className="xr-section xe-problem">
          <p className="xr-label">Visibility, not more automation</p><h2>{AGENTS.problem.thesis}</h2>
          <Paragraphs items={AGENTS.problem.body} /><ProblemPair />
        </section>
        <section id="decision" className="xr-section">
          <div className="xe-decision-head"><h2>{AGENTS.decision.title}</h2><Paragraphs items={AGENTS.decision.body} /></div>
          <DecisionOptions interactive />
        </section>
        <section id="taskbar" className="xr-section">
          <p className="xr-label">The interface, up close</p><h2>{AGENTS.taskbar.title}</h2>
          <FrameSelector /><div className="xe-detail-prose"><Paragraphs items={AGENTS.taskbar.body} /></div><TaskbarFilm />
        </section>
        <CaseImpact /><PublishedLinks />
      </main>
      <StudioFooter direction="direction-e" />
    </>
  )
}

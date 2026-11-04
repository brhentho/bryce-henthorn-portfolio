import { AGENTS } from "@/lib/explore/content"
import { ExperienceHeader, CaseContents, Constraints, Invocation, HeroArtifact } from "../ExperienceParts"
import { StudioFooter, Ledger, Paragraphs, ProblemPair, DecisionOptions, CaseImpact, PublishedLinks } from "../round-two/CaseParts"
import { StudyFigure, TaskbarFilm } from "../round-two/Media"
import { WorkingDemo } from "../round-two/Demo"
import { XrTitle } from "../round-two/Motion"
import { LayeredMenu } from "../effects/LayeredMenu"
import { ArtifactZoom } from "../effects/ArtifactZoom"
import { ResponseReplay } from "../effects/ResponseReplay"

export function FCase() {
  return <>
    <a className="xp-skip" href="#context">Skip to the case study</a>
    <ExperienceHeader direction="direction-f"><LayeredMenu /></ExperienceHeader>
    <main id="main" className="xr-shell">
      <header className="x3-case-hero xf-case-opening">
        <p className="xr-label">01 / Agents in Windows / Interaction studies</p>
        <XrTitle text={AGENTS.title} />
        <HeroArtifact direction="direction-f" />
        <div className="xf-case-lead"><p className="xr-intro">{AGENTS.call}</p><Ledger /></div>
      </header>
      <CaseContents evidenceFirst />
      <section id="context" className="xr-section xr-split">
        <StudyFigure {...AGENTS.context.figure} number="01.1" />
        <div><p className="xr-label">Why it needed to exist</p><h2>{AGENTS.context.title}</h2><Paragraphs items={AGENTS.context.body} /></div>
      </section>
      <section id="problem" className="xr-section">
        <p className="xr-label">The experience before / after</p><h2>{AGENTS.problem.thesis}</h2>
        <ProblemPair /><Paragraphs items={AGENTS.problem.body} />
      </section>
      <section id="taskbar" className="xr-section xf-evolution">
        <p className="xr-label">Inspect the details</p><h2>{AGENTS.taskbar.title}</h2><Paragraphs items={AGENTS.taskbar.body} />
        <div className="xf-evolution-frames">{AGENTS.keyframes.map((frame, index) =>
          <ArtifactZoom key={frame.label} {...frame} {...AGENTS.keyframeSize} caption={frame.detail} number={`03.${index + 1}`} />)}</div>
        <TaskbarFilm />
      </section>
      <section id="decision" className="xr-section">
        <div className="xf-decision-heading"><h2>{AGENTS.decision.title}</h2><Paragraphs items={AGENTS.decision.body} /></div>
        <DecisionOptions />
      </section>
      <section id="states" className="xr-section">
        <p className="xr-label">Interaction, not just appearance</p><h2>{AGENTS.simulation.title}</h2><WorkingDemo /><ResponseReplay />
      </section>
      <Constraints /><Invocation /><CaseImpact /><PublishedLinks />
    </main>
    <StudioFooter direction="direction-f" />
  </>
}

import Link from "next/link"
import { PERSON, PROJECTS, caseHref } from "@/lib/explore/content"
import { StudioHeader, StudioFooter } from "../round-two/CaseParts"
import { StudyFigure } from "../round-two/Media"

export function FHome() {
  return (
    <>
      <a className="xp-skip" href="#work">Skip to the project index</a>
      <StudioHeader direction="direction-f" label="Design atlas / selected work" />
      <main id="main" className="xr-shell">
        <header className="xf-home-hero">
          <div className="xf-title-block"><p className="xr-label">Bryce Henthorn / {PERSON.role}</p>
            <h1 className="xr-title-arrive">{PERSON.statement}</h1>
            <p className="xr-intro">{PERSON.secondary}</p>
          </div>
          <div className="xf-principle-sheet" aria-label="Design principles">
            <p className="xr-label">A common thread</p>
            {PERSON.principles.map((principle, index) => <div className="xf-principle" key={principle.label}>
              <span className="xf-principle-symbol" data-symbol={index} aria-hidden="true"><i /><i /><i /></span>
              <h2>{principle.label}</h2><p>{principle.statement}</p>
            </div>)}
            <p className="xf-sheet-caption">Three principles. Different product contexts.</p>
          </div>
        </header>
        <nav id="work" className="xf-index" aria-label="Project index">
          <p className="xr-label">Project index</p>
          {PROJECTS.map((project, index) => <a key={project.slug} href={`#project-${project.slug}`}>
            <span className="xr-label">0{index + 1}</span><span>{project.name}</span><span className="xf-index-year">{project.years}</span><span aria-hidden="true">↓</span>
          </a>)}
        </nav>
        {PROJECTS.map((project, index) => (
          <section className="xf-project xr-section" id={`project-${project.slug}`} key={project.slug}>
            <aside><p className="xr-label">0{index + 1} / {project.name}</p><p>{project.proof}</p><p>{project.years}</p></aside>
            <div className="xf-project-body"><h2>{project.title}</h2>
              <StudyFigure src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
                caption={`${project.name} / product artifact`} number={`0${index + 1}`} />
              <Link className="xr-link" href={index ? project.productionHref : caseHref("direction-f")}>{index ? "Open published case" : "Explore the decisions"} <span aria-hidden="true">↗</span></Link>
            </div>
          </section>
        ))}
        <section className="xf-closing xr-section"><p className="xr-label">The connecting idea</p><h2>{PERSON.thesis}</h2><p className="xr-intro">{PERSON.thesisBody}</p></section>
      </main>
      <StudioFooter direction="direction-f" />
    </>
  )
}

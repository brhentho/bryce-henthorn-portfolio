import Link from "next/link"
import { PERSON, PROJECTS, caseHref } from "@/lib/explore/content"
import { StudioHeader, StudioFooter } from "../round-two/CaseParts"
import { PlaceholderArt, StudyFigure } from "../round-two/Media"

export function DHome() {
  return (
    <>
      <a className="xp-skip" href="#work">Skip to selected work</a>
      <StudioHeader direction="direction-d" label={PERSON.role} />
      <main id="main">
        <section className="xd-home-hero xr-shell">
          <div className="xd-home-title">
            <p className="xr-label">{PERSON.location} / Microsoft</p>
            <h1 className="xr-title-arrive">I turn complex systems into <em>trustworthy</em> experiences.</h1>
            <p className="xr-intro">{PERSON.secondary}</p>
            <a className="xr-link" href="#work">Selected work <span aria-hidden="true">↓</span></a>
          </div>
          <PlaceholderArt className="xd-sculpture" />
          <p className="xd-hero-foot xr-label">State. Control. Trust.</p>
        </section>
        <section id="work" className="xd-work xr-shell">
          <div className="xd-work-head"><p className="xr-label">Selected work / 2020—present</p><h2>In the details,<br /><em>the difference.</em></h2></div>
          {PROJECTS.map((project, index) => (
            <article className={`xd-project xd-project-${index}`} key={project.slug}>
              <Link className="xd-project-art" href={index === 0 ? caseHref("direction-d") : project.productionHref}
                aria-label={`Read ${project.name}${index ? ", published case study" : ""}`}>
                <StudyFigure src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
                  caption={`${project.name} / ${project.years}`} number={`0${index + 1}`} />
              </Link>
              <div className="xd-project-copy"><p className="xr-label">{project.proof}</p><h3>{project.title}</h3>
                <Link className="xr-link" href={index === 0 ? caseHref("direction-d") : project.productionHref}>
                  {index ? "Published case study" : "Read the case study"} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
        <section className="xd-manifesto xr-shell xr-section">
          <p className="xr-label">An approach, across the work</p><h2>{PERSON.thesis}</h2><p className="xr-intro">{PERSON.thesisBody}</p>
        </section>
      </main>
      <StudioFooter direction="direction-d" />
    </>
  )
}

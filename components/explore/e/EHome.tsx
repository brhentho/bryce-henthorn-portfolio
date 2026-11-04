"use client"

import Link from "next/link"
import { useId, useState } from "react"
import { PERSON, PROJECTS, caseHref } from "@/lib/explore/content"
import { PROJECT_MOBILE_MEDIA } from "@/lib/explore/media"
import { StudioHeader, StudioFooter, moveTab } from "../round-two/CaseParts"
import { StudyFigure } from "../round-two/Media"

export function EHome() {
  const [selected, setSelected] = useState(0)
  const uid = useId()
  const project = PROJECTS[selected]
  const mobile = PROJECT_MOBILE_MEDIA[project.slug]
  return (
    <>
      <a className="xp-skip" href="#work">Skip to selected work</a>
      <StudioHeader direction="direction-e" label="Product Designer, Windows AI" />
      <main id="main" className="xr-shell">
        <header className="xe-home-hero">
          <p className="xr-label"><span className="xe-status-mark" aria-hidden="true" /> {PERSON.location} / Microsoft</p>
          <h1 className="xr-title-arrive">{PERSON.statement}</h1>
          <div className="xe-hero-bottom"><p className="xr-intro">{PERSON.secondary}</p>
            <Link className="xr-link" href={caseHref("direction-e")}>Inspect the work <span aria-hidden="true">↗</span></Link>
          </div>
        </header>
        <section id="work" className="xe-project-viewer" aria-label="Selected work">
          <div className="xe-project-tabs" role="tablist" aria-label="Select a project">
            {PROJECTS.map((item, index) => <button type="button" role="tab" key={item.slug} id={`${uid}-tab-${index}`}
              aria-controls={`${uid}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)} onKeyDown={event => moveTab(event, index, 3, setSelected)}>
              <span className="xr-label">0{index + 1}</span>{item.name}
            </button>)}
          </div>
          <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${selected}`} tabIndex={0}>
            <div className="xe-project-status">{PROJECTS.map((item, index) => (
              <div className="xe-project-meta" key={item.slug} aria-hidden={selected !== index}>
                <p className="xr-label">{item.proof}</p><p>{item.years}</p>
              </div>
            ))}</div>
            <StudyFigure src={project.image} mobileSrc={mobile.src} alt={mobile.alt} width={project.imageWidth} height={project.imageHeight}
              caption={`${project.title} Desktop interface; detail crop on mobile.`} number={`0${selected + 1}`} priority />
            <div className="xe-project-bottom"><h2>{project.name}</h2>
              <Link className="xr-link" href={selected === 0 ? caseHref("direction-e") : project.productionHref}>
                {selected === 0 ? "Read the design decisions" : "Read published case study"} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="xr-section xe-principles">
          <div className="xe-principles-title"><p className="xr-label">The work behind the interface</p><h2>{PERSON.thesis}</h2></div>
          <div className="xe-principle-grid">{PERSON.principles.map((principle, index) => (
            <article key={principle.label}><span className="xr-label">0{index + 1}</span><h3>{principle.label}</h3><p>{principle.statement}</p></article>
          ))}</div>
        </section>
        <section className="xe-work-list" aria-label="All case studies">
          {PROJECTS.map((item, index) => <Link key={item.slug} href={index ? item.productionHref : caseHref("direction-e")}>
            <span className="xr-label">0{index + 1}</span><span>{item.name}<small>{item.proof}</small></span>
            <span className="xr-label">{index ? "Published" : "Case study"} ↗</span>
          </Link>)}
        </section>
      </main>
      <StudioFooter direction="direction-e" />
    </>
  )
}

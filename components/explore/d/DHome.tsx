"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { PERSON, PROJECTS, type Project } from "@/lib/explore/content"
import { Artwork } from "../effects/Artwork"
import { ExperienceHeader, ProjectLink, Reveal } from "../ExperienceParts"
import { StudioFooter } from "../round-two/CaseParts"
import { XrTitle } from "../round-two/Motion"
import { useReducedMotion } from "../useReducedMotion"
import { useSectionProgress } from "../useSectionProgress"

export function DHome() {
  return <>
    <a className="xp-skip" href="#work">Skip to selected work</a>
    <ExperienceHeader direction="direction-d" />
    <main id="main">
      <header className="x3-hero xd-opening">
        <Artwork kind="orb" />
        <div className="x3-hero-copy">
          <p className="xr-label">{PERSON.location} / Microsoft / Selected work</p>
          <XrTitle text={PERSON.statement} className="x3-title" />
          <p className="xr-intro">{PERSON.secondary}</p>
          <a className="xd-shiny" href="#work">Explore the work <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <section id="work" className="xd-chapters" aria-label="Selected work">
        {PROJECTS.map((project, index) => <Chapter key={project.slug} project={project} index={index} />)}
      </section>
      <section className="xr-shell xr-section xd-approach" aria-labelledby="xd-thesis">
        <p className="xr-label">A way of working</p>
        <Reveal><h2 id="xd-thesis">{PERSON.thesis}</h2></Reveal>
        <p className="xr-intro">{PERSON.thesisBody}</p>
        <ol>{PERSON.principles.map((item, index) => <li key={item.label}>
          <span className="xr-label">0{index + 1} / {item.label}</span><p>{item.statement}</p>
        </li>)}</ol>
      </section>
    </main>
    <StudioFooter direction="direction-d" />
  </>
}

function Chapter({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const progress = useSectionProgress(ref, ["start end", "start .15"])
  const y = useTransform(progress, [0, 1], [70, 0])
  const scale = useTransform(progress, [0, 1], [.94, 1])
  return <article ref={ref} id={`project-${project.slug}`} className="xd-chapter xr-shell" aria-labelledby={`xd-${project.slug}`}>
    <div className="xd-chapter-heading">
      <p className="xr-label">0{index + 1} / {project.years}</p>
      <h2 id={`xd-${project.slug}`}>{project.name}</h2>
      <span className="xr-label">{project.proof}</span>
    </div>
    <motion.figure className="xd-chapter-figure" style={reduce ? undefined : { y, scale }}>
      <div className="x3-project-image">
        <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
          sizes="90vw" style={index === 0 ? { viewTransitionName: "direction-d-artifact" } : undefined} />
      </div>
      <figcaption className="xr-label">Fig. 0{index + 1} / {project.name} / Product artifact</figcaption>
    </motion.figure>
    <div className="xd-chapter-foot"><p>{project.title}</p><ProjectLink direction="direction-d" index={index} /></div>
  </article>
}

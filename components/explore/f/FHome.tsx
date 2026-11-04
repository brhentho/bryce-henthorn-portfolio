"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { PERSON, PROJECTS } from "@/lib/explore/content"
import { Artwork } from "../effects/Artwork"
import { LayeredMenu } from "../effects/LayeredMenu"
import { ExperienceHeader, ProjectLink, Reveal } from "../ExperienceParts"
import { StudioFooter } from "../round-two/CaseParts"
import { XrTitle, useMotionSeconds } from "../round-two/Motion"
import { useReducedMotion } from "../useReducedMotion"

export function FHome() {
  const [selected, setSelected] = useState<number | null>(null)
  const [instant, setInstant] = useState(false)
  const reduce = useReducedMotion()
  const duration = useMotionSeconds("--duration-normal-ui")
  return <>
    <a className="xp-skip" href="#work">Skip to selected work</a>
    <ExperienceHeader direction="direction-f"><LayeredMenu /></ExperienceHeader>
    <main id="main">
      <header className="x3-hero xf-opening">
        <Artwork kind="ferro" />
        <div className="x3-hero-copy">
          <p className="xr-label">Product design / Windows AI / {PERSON.location}</p>
          <XrTitle className="x3-title" text={PERSON.statement} />
          <p className="xr-intro">{PERSON.secondary}</p>
          <a className="xr-link" href="#work">Enter the gallery <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <section id="work" className="xr-shell xr-section xf-gallery" aria-labelledby="xf-work-title">
        <div className="xf-gallery-heading"><Reveal><h2 id="xf-work-title" className="xf-masked-heading">Selected work.</h2></Reveal><p className="xr-label">Three projects / One practice</p></div>
        <div className="xf-wall">
          {PROJECTS.map((project, index) => {
            const expanded = selected === index
            return <motion.article key={project.slug} layout={!reduce} className="xf-tile" data-expanded={expanded} data-instant={instant || undefined} data-project={index}
              transition={{ duration: reduce || instant ? 0 : duration, ease: [.16, 1, .3, 1] }} aria-labelledby={`xf-project-${index}`}>
              <motion.div layout={reduce || instant ? false : "position"} transition={{ duration: reduce || instant ? 0 : duration, ease: [.16, 1, .3, 1] }} className="xf-tile-top"><p className="xr-label">0{index + 1} / {project.years}</p><p className="xr-label">{project.proof}</p></motion.div>
              <div className="x3-project-image"><Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
                sizes="(max-width: 850px) 90vw, 65vw" style={index === 0 ? { viewTransitionName: "direction-f-artifact" } : undefined} /></div>
              <motion.div layout={reduce || instant ? false : "position"} transition={{ duration: reduce || instant ? 0 : duration, ease: [.16, 1, .3, 1] }} className="xf-tile-name"><h3 id={`xf-project-${index}`}>{project.name}</h3>
                <button type="button" aria-expanded={expanded} aria-controls={`xf-detail-${index}`}
                  onClick={event => { setInstant(event.detail === 0); setSelected(expanded ? null : index) }}>{expanded ? "Close details −" : "Inspect +"}</button>
              </motion.div>
              <div className="xf-tile-detail" id={`xf-detail-${index}`} hidden={!expanded}><p>{project.title}</p><p className="xr-label">Fig. 0{index + 1} / {project.name} / Product artifact</p></div>
              <ProjectLink direction="direction-f" index={index} />
            </motion.article>
          })}
        </div>
      </section>
      <section className="xr-shell xr-section xf-approach" aria-labelledby="xf-thesis">
        <p className="xr-label">The connecting thread</p><h2 id="xf-thesis">{PERSON.thesis}</h2><p className="xr-intro">{PERSON.thesisBody}</p>
        <ol>{PERSON.principles.map((item, index) => <li key={item.label}><span className="xr-label">0{index + 1}</span><h3>{item.label}</h3><p>{item.statement}</p></li>)}</ol>
      </section>
    </main>
    <StudioFooter direction="direction-f" />
  </>
}

"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { motion, useTransform } from "framer-motion"
import { PERSON, PROJECTS, caseHref } from "@/lib/explore/content"
import { Artwork } from "../effects/Artwork"
import { NumberPop } from "../effects/NumberPop"
import { ProximityText } from "../effects/ProximityText"
import { ExperienceHeader } from "../ExperienceParts"
import { ContinuityLink } from "../ContinuityLink"
import { StudioFooter } from "../round-two/CaseParts"
import { XrTitle } from "../round-two/Motion"
import { useSectionProgress } from "../useSectionProgress"
import { useReducedMotion } from "../useReducedMotion"

export function EHome() {
  const [selected, setSelected] = useState(0)
  const [keyboard, setKeyboard] = useState(false)
  return <>
    <a className="xp-skip" href="#work">Skip to project index</a>
    <ExperienceHeader direction="direction-e" />
    <main id="main">
      <header className="x3-hero xe-opening">
        <Artwork kind="ascii" />
        <div className="x3-hero-copy">
          <p className="xr-label">{PERSON.location} / Product design / Windows AI</p>
          <XrTitle className="x3-title" text={PERSON.statement} />
          <div className="xe-opening-bottom"><p className="xr-intro">{PERSON.secondary}</p><a className="xr-link" href="#work">Selected work <span aria-hidden="true">↓</span></a></div>
        </div>
      </header>
      <section id="work" className="xe-index xr-shell xr-section" aria-labelledby="xe-index-title">
        <div className="xe-index-head"><h2 id="xe-index-title" className="xr-label">Selected work</h2><p className="xr-label"><NumberPop value={`0${selected + 1}`} /> / 03</p></div>
        <div className="xe-index-layout">
          <nav aria-label="Projects" className="xe-project-names">
            {PROJECTS.map((project, index) => <ContinuityLink key={project.slug} pointerOnly
              href={index === 0 ? caseHref("direction-e") : project.productionHref}
              className="xe-index-link" data-active={index === selected}
              onPointerEnter={event => { if (event.pointerType !== "touch") { setKeyboard(false); setSelected(index) } }}
              onFocus={() => { setKeyboard(true); setSelected(index) }}>
              <span className="xr-label">0{index + 1} / {project.years}</span>
              <span className="xe-index-name"><ProximityText text={project.name} /></span>
              <span className="xe-index-arrow" aria-hidden="true">↗</span>
              <span className="xe-index-proof">{project.proof}</span>
              <Image className="xe-mobile-shot" src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} sizes="90vw" />
            </ContinuityLink>)}
          </nav>
          <div className="xe-preview" data-instant={keyboard || undefined}>
            {PROJECTS.map((project, index) => <figure key={project.slug} aria-hidden={selected !== index} data-active={selected === index}>
              <div className="x3-project-image"><Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
                sizes="(max-width: 850px) 90vw, 48vw" style={index === 0 && selected === 0 ? { viewTransitionName: "direction-e-artifact" } : undefined} /></div>
              <figcaption><span className="xr-label">Fig. 0{index + 1} / {project.name}</span><p>{project.title}</p></figcaption>
            </figure>)}
          </div>
        </div>
      </section>
      <section className="xe-principles xr-shell" aria-label="A way of working">
        <div className="xe-principle-intro"><p className="xr-label">One thread through the work</p><h2>{PERSON.thesis}</h2><p className="xr-intro">{PERSON.thesisBody}</p></div>
        <div>{PERSON.principles.map((item, index) => <Principle key={item.label} index={index} {...item} />)}</div>
      </section>
    </main>
    <StudioFooter direction="direction-e" />
  </>
}

function Principle({ index, label, statement }: { index: number; label: string; statement: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const progress = useSectionProgress(ref, ["start .9", "end .25"])
  const opacity = useTransform(progress, [0, .35, .75, 1], [.45, 1, 1, .6])
  const scale = useTransform(progress, [0, .35, 1], [.94, 1, 1])
  return <motion.div ref={ref} className="xe-principle" style={reduce ? undefined : { opacity, scale }}>
    <p className="xr-label">0{index + 1}</p><h3>{label}</h3><p>{statement}</p>
  </motion.div>
}

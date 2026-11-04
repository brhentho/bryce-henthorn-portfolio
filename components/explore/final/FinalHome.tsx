"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { PERSON, PROJECTS } from "@/lib/explore/content"
import type { Finalist, HeroKind } from "@/lib/explore/finalists"
import { Artwork } from "../effects/Artwork"
import { RevealWords } from "../RevealWords"
import { useSectionProgress } from "../useSectionProgress"
import { useReducedMotion } from "../useReducedMotion"
import { Approach, CaseLink, FinalFooter, FinalHeader, MaterialSection, useFinalHero } from "./Shared"

export function FinalHome({ concept }: { concept: Finalist }) {
  const hero = useFinalHero(concept)
  return <div className={`fn-concept fn-${concept}`}>
    <a className="xp-skip" href="#work">Skip to selected work</a>
    <FinalHeader concept={concept} hero={hero} />
    <main id="main">
      <section className={`fn-home-hero fn-hero-${hero}`} aria-labelledby="fn-home-title">
        <Artwork key={hero} kind={hero} presentation="finalist" />
        <div className="fn-hero-scrim" aria-hidden="true" />
        <div className="fn-home-copy">
          <p className="fn-label">{PERSON.location} / Microsoft / Product design</p>
          <RevealWords as="h1" id="fn-home-title" className="fn-home-title" text={PERSON.statement} />
          <p className="fn-intro">{PERSON.secondary}</p>
          <a className="fn-work-cue" href="#work">Selected work <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <div id="work" className="fn-work" aria-label="Selected work">
        {PROJECTS.map((project, index) => <Project key={project.slug} concept={concept} hero={hero} index={index} />)}
      </div>
      <Approach />
    </main>
    <FinalFooter />
  </div>
}

function Project({ concept, hero, index }: { concept: Finalist; hero: HeroKind; index: number }) {
  const project = PROJECTS[index]
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const progress = useSectionProgress(ref, ["start .95", "start .2"])
  const scale = useTransform(progress, [0, 1], [concept === "presence" ? .78 : .95, 1])
  const y = useTransform(progress, [0, 1], [concept === "presence" ? 70 : 28, 0])
  const rotateX = useTransform(progress, [0, 1], [concept === "presence" ? 10 : 0, 0])
  return <MaterialSection material={(["cool", "plum", "warm"] as const)[index]} id={`work-${project.slug}`} className={`fn-project fn-project-${index}`}>
    <div ref={ref} className="fn-project-grid">
      <div className="fn-project-copy">
        <p className="fn-label">0{index + 1} / {project.years}</p><h2>{project.name}</h2>
        <p className="fn-project-thesis">{project.title}</p>{concept !== "signal" && <p className="fn-label">{project.proof}</p>}
        <CaseLink concept={concept} hero={hero} index={index} />
      </div>
      <motion.figure className="fn-project-plate" style={reduce ? undefined : { scale, y, rotateX }}>
        <div className="fn-device">
          <div className="fn-device-bar" aria-hidden="true"><i /><i /><i /><span>{project.name}</span></div>
          <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
            sizes={concept === "presence" ? "92vw" : "(max-width: 850px) 92vw, 60vw"}
            style={index === 0 ? { viewTransitionName: `${concept}-product` } : undefined} />
        </div>
        <figcaption className="fn-label">Fig. 0{index + 1} / {project.name} / Product artifact</figcaption>
      </motion.figure>
      {concept === "signal" && <div className="fn-project-annotation"><span className="fn-label">Contribution</span><p>{project.proof}</p></div>}
    </div>
  </MaterialSection>
}

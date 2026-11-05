"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useTransform, type MotionValue } from "framer-motion"
import { PERSON, PROJECTS, type Project as ProjectData } from "@/lib/explore/content"
import type { Finalist, HeroKind } from "@/lib/explore/finalists"
import { Artwork } from "../effects/Artwork"
import { RevealWords } from "../RevealWords"
import { useSectionProgress } from "../useSectionProgress"
import { useReducedMotion } from "../useReducedMotion"
import { useMediaQuery } from "../useMediaQuery"
import { Environment } from "./Environment"
import { Approach, CaseLink, Chapter, FinalFooter, FinalHeader, useFinalHero } from "./Shared"
import { PortfolioHeader, PortfolioFooter } from "@/components/portfolio/Navigation"
import { PortfolioAction } from "@/components/portfolio/PortfolioAction"
import { ProjectImageLink } from "@/components/portfolio/ProjectImageLink"

const TONES = ["cool", "plum", "warm"] as const

type HomeProject = ProjectData & { artifactStatus?: string }

export function FinalHome({ concept, publicMode = false, projects = PROJECTS }: { concept: Finalist; publicMode?: boolean; projects?: readonly HomeProject[] }) {
  const hero = useFinalHero(concept)
  return <Environment className={`fn-concept fn-${concept}`}>
    <a className="xp-skip" href="#work">Skip to selected work</a>
    {publicMode ? <PortfolioHeader /> : <FinalHeader concept={concept} hero={hero} />}
    <main id="main">
      <section className={`fn-home-hero fn-hero-${hero}`} aria-labelledby="fn-home-title">
        <Artwork key={hero} kind={hero} presentation="finalist" />
        <div className="fn-hero-scrim" aria-hidden="true" />
        <div className="fn-home-copy">
          <p className="fn-label">{PERSON.location} / Microsoft / Product design</p>
          <RevealWords as="h1" id="fn-home-title" className="fn-home-title" text={PERSON.statement} />
          <p className="fn-intro">{PERSON.secondary}</p>
          {publicMode ? <PortfolioAction variant="quiet" className="fn-work-cue" href="#work">Selected work</PortfolioAction>
            : <a className="fn-work-cue" href="#work">Selected work <span aria-hidden="true">↓</span></a>}
        </div>
      </section>
      <div id="work" className="fn-work" aria-label="Selected work">
        {projects.map((project, index) => <Project key={project.slug} concept={concept} hero={hero} index={index} project={project} publicMode={publicMode} />)}
      </div>
      <Approach title={publicMode ? "How I make complexity usable" : undefined} publicMode={publicMode} />
    </main>
    {publicMode ? <PortfolioFooter /> : <FinalFooter />}
  </Environment>
}

type Offset = Parameters<typeof useSectionProgress>[1]
type Entrance = {
  /** Image entrance, measured on the untransformed `[data-project-entry]` wrapper. */
  enter: Offset
  /** After the entrance: layered drift until the wrapper leaves. */
  after: Offset
  /** Copy staging, measured on the untransformed copy column. */
  copy: Offset
  scale: number; y: number; x: number; tilt: number; inner: number
  mask: "aperture" | "wipe" | "none"
  drift: number; copyDrift: number
}

// Starting choreography from the approved plan; narrow screens keep a visible entrance with less travel.
const ENTRANCES: Record<Finalist, Record<"wide" | "narrow", Entrance>> = {
  synthesis: {
    wide: { enter: ["start 1", "start .25"], after: ["start .25", "end start"], copy: ["start .95", "start .4"], scale: .8, y: 96, x: 0, tilt: 0, inner: 1.18, mask: "aperture", drift: -64, copyDrift: -24 },
    narrow: { enter: ["start 1", "start .3"], after: ["start .3", "end start"], copy: ["start 1", "start .5"], scale: .88, y: 56, x: 0, tilt: 0, inner: 1.12, mask: "aperture", drift: -28, copyDrift: -10 },
  },
  presence: {
    wide: { enter: ["start 1", "start .12"], after: ["start .12", "end start"], copy: ["start .92", "start .3"], scale: .7, y: 120, x: 0, tilt: 14, inner: 1.08, mask: "none", drift: -40, copyDrift: 0 },
    narrow: { enter: ["start 1", "start .2"], after: ["start .2", "end start"], copy: ["start .95", "start .4"], scale: .82, y: 72, x: 0, tilt: 6, inner: 1.06, mask: "none", drift: -18, copyDrift: 0 },
  },
  signal: {
    wide: { enter: ["start .98", "start .45"], after: ["start .45", "end start"], copy: ["start 1", "start .62"], scale: 1, y: 0, x: -56, tilt: 0, inner: 1.04, mask: "wipe", drift: -36, copyDrift: -12 },
    narrow: { enter: ["start .98", "start .5"], after: ["start .5", "end start"], copy: ["start 1", "start .65"], scale: 1, y: 0, x: -20, tilt: 0, inner: 1.03, mask: "wipe", drift: -14, copyDrift: -6 },
  },
}

// Explicit rest values: framer keeps the last animated value if a style key is merely removed.
const REST = { x: 0, y: 0, scale: 1, scaleX: 1, rotateX: 0, opacity: 1 }
const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const stage = (progress: number, from: number, to: number) => clamp01((progress - from) / (to - from))

function Project({ concept, hero, index, project, publicMode }: { concept: Finalist; hero: HeroKind; index: number; project: HomeProject; publicMode: boolean }) {
  const entry = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const narrow = useMediaQuery("(max-width: 700px)")
  const e = ENTRANCES[concept][narrow ? "narrow" : "wide"]

  const enter = useSectionProgress(entry, e.enter)
  const after = useSectionProgress(entry, e.after)
  const text = useSectionProgress(copy, e.copy)

  const scale = useTransform(enter, [0, 1], [e.scale, 1])
  const x = useTransform(enter, [0, 1], [e.x, 0])
  const y = useTransform([enter, after] as MotionValue<number>[], ([p, a]: number[]) => (1 - p) * e.y + a * e.drift)
  const rotateX = useTransform(enter, [0, 1], [e.tilt, 0])
  const inner = useTransform(enter, [0, 1], [e.inner, 1])
  const clipPath = useTransform(enter, p => {
    if (publicMode && p >= 1) return "none"
    const r = 1 - p
    if (e.mask === "aperture") return `inset(${(r * 9).toFixed(2)}% ${(r * 11).toFixed(2)}% ${(r * 9).toFixed(2)}% ${(r * 11).toFixed(2)}% round 8px)`
    if (e.mask === "wipe") return `inset(0% ${(r * 100).toFixed(2)}% 0% 0%)`
    return "none"
  })
  const rule = useTransform(enter, [0, .7], [0, 1])
  const caption = useTransform(enter, [.3, 1], [.35, 1])

  const labelY = useTransform(text, p => `${(1 - stage(p, 0, .5)) * 110}%`)
  const titleY = useTransform(text, p => `${(1 - stage(p, .08, .68)) * .55}em`)
  const titleOpacity = useTransform(text, p => .15 + .85 * stage(p, .08, .5))
  const thesisY = useTransform(text, p => (1 - stage(p, .3, 1)) * 40)
  const thesisOpacity = useTransform(text, p => .25 + .75 * stage(p, .3, 1))
  const headingY = useTransform(after, a => a * e.copyDrift)
  const note = useTransform(enter, p => (1 - stage(p, .4, 1)) * 16)
  const noteOpacity = useTransform(enter, p => .4 + .6 * stage(p, .4, 1))

  const motionOn = !reduce
  const image = <motion.div className="fn-device-image" style={motionOn ? { scale: inner } : REST}>
    <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
      sizes={concept === "presence" ? "92vw" : "(max-width: 850px) 92vw, 60vw"}
      style={!publicMode && index === 0 ? { viewTransitionName: `${concept}-product` } : undefined} />
  </motion.div>
  const destination = ["/agents-in-windows", "/recall", "/teams-for-education"][index]
  return <Chapter tone={TONES[index]} band={[1, .35]} id={`work-${project.slug}`} className={`fn-project fn-project-${index}`}>
    <div className="fn-project-grid">
      <div ref={copy} className="fn-project-copy" data-project-copy={project.slug}>
        <motion.div className="fn-project-heading" style={motionOn && e.copyDrift ? { y: headingY } : REST}>
          <div className="fn-line-mask"><motion.p className="fn-label" style={motionOn ? { y: labelY } : REST}>0{index + 1} / {project.years}</motion.p></div>
          <div className="fn-line-mask"><motion.h2 style={motionOn ? { y: titleY, opacity: titleOpacity } : REST}>{project.name}</motion.h2></div>
          <motion.p className="fn-project-thesis" style={motionOn ? { y: thesisY, opacity: thesisOpacity } : REST}>{project.title}</motion.p>
          {concept !== "signal" && <motion.p className="fn-label fn-project-proof" style={motionOn ? { y: thesisY, opacity: thesisOpacity } : REST}>{project.proof}</motion.p>}
        </motion.div>
        <CaseLink concept={concept} hero={hero} index={index} publicMode={publicMode} />
      </div>
      <div ref={entry} className="fn-project-entry" data-project-entry={project.slug}>
        <motion.figure className="fn-project-plate" data-project-art={project.slug} style={motionOn ? { scale, x, y, rotateX } : REST}>
          <motion.div className="fn-device" style={motionOn && e.mask !== "none" ? { clipPath } : { clipPath: "none" }}>
            {!publicMode && <div className="fn-device-bar" aria-hidden="true"><i /><i /><i /><span>{project.name}</span></div>}
            <div className="fn-device-view">
              {publicMode ? <ProjectImageLink href={destination} label={`Read ${project.name} case study`}>{image}</ProjectImageLink> : image}
            </div>
          </motion.div>
          {concept === "signal" && <motion.span className="fn-registration-rule" aria-hidden="true" style={motionOn ? { scaleX: rule } : REST} />}
          {!publicMode && <motion.figcaption className="fn-label" style={motionOn && concept === "signal" ? { opacity: caption } : REST}>Fig. 0{index + 1} / {project.name} / {project.artifactStatus ?? "Product artifact"}</motion.figcaption>}
        </motion.figure>
      </div>
      {concept === "signal" && <motion.div className="fn-project-annotation" style={motionOn ? { y: note, opacity: noteOpacity } : REST}><span className="fn-label">Contribution</span><p>{project.proof}</p></motion.div>}
    </div>
  </Chapter>
}

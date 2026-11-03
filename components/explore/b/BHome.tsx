"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValueEvent,
  useTransform,
} from "framer-motion"
import { useReducedMotion } from "../useReducedMotion"
import { useHashAfterLayout } from "../useHashAfterLayout"
import { useSectionProgress } from "../useSectionProgress"
import { ContinuityLink } from "@/components/explore/ContinuityLink"
import { ExploreFooter } from "@/components/explore/ExploreFooter"
import { RevealWords } from "@/components/explore/RevealWords"
import { PERSON, PROJECTS, caseHref, type Project } from "@/lib/explore/content"

const N = PROJECTS.length

export function BHome() {
  const reduce = useReducedMotion()
  useHashAfterLayout(reduce ? "static" : "spatial", "spatial")

  return (
    <div className="xb">
      <a className="xp-skip" href="#destinations">Skip to work</a>
      <main id="main">
        <BHero />
        {reduce ? <StackedDestinations /> : <Destinations />}
        <section className="xb-thesis" aria-labelledby="xb-thesis-title">
          <p className="xp-mono">Approach</p>
          <h2 id="xb-thesis-title" className="xp-h1">{PERSON.thesis}</h2>
          <p className="xp-lede xp-measure">{PERSON.thesisBody}</p>
          <ol className="xb-coords">
            {PERSON.principles.map((p, i) => (
              <li key={p.label}>
                <span className="xb-coord-ring" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <p className="xp-mono">{p.label}</p>
                <p className="xp-h3">{p.statement}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="xb-close" aria-labelledby="xb-close-title">
          <h2 id="xb-close-title" className="xp-h2">{PERSON.secondary}</h2>
          <a className="xp-btn" href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </section>
      </main>
      <ExploreFooter />
    </div>
  )
}

function BHero() {
  return (
    <section className="xb-hero" aria-labelledby="xb-hero-title">
      <div className="xb-hero-port" aria-hidden="true">
        <Image src="/images/heroes/HomeHeroRender.jpg" alt="" fill priority sizes="60vmin" className="xp-cover" />
      </div>
      <div className="xb-hero-copy">
        <p className="xp-mono">{PERSON.name} · {PERSON.role}</p>
        <RevealWords as="h1" id="xb-hero-title" className="xp-display xb-hero-title" text={PERSON.statement} delay={100} />
      </div>
      <nav className="xb-hero-routes" aria-label="Destinations">
        {PROJECTS.map((p, i) => (
          <a key={p.slug} href={`#${p.slug}`} className="xb-route">
            <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span>
            <span>{p.name}</span>
          </a>
        ))}
      </nav>
    </section>
  )
}

/** Sticky stage: one ~100vh segment per project, a porthole that opens toward each destination. */
function Destinations() {
  const stageRef = useRef<HTMLElement>(null)
  const scrollYProgress = useSectionProgress(stageRef, ["start start", "end end"])
  const [index, setIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N)))
    setIndex((prev) => (prev === next ? prev : next))
  })

  // Within each segment the porthole opens toward its peak and closes before the next destination.
  const clip = useTransform(scrollYProgress, (v) => {
    const local = Math.min(1, Math.max(0, v * N - Math.min(N - 1, Math.floor(v * N))))
    const r = 30 + 20 * Math.sin(Math.PI * Math.min(1, local * 1.15))
    return `circle(${r.toFixed(2)}% at 50% 50%)`
  })
  const imageScale = useTransform(clip, (c) => 1.24 - (parseFloat(c.slice(7)) - 30) / 100)
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const project = PROJECTS[index]

  return (
    <section id="destinations" ref={stageRef} className="xb-stage" aria-label="Selected work" style={{ height: `${N * 100 + 20}svh` }}>
      {PROJECTS.map((p, i) => (
        <span
          key={p.slug}
          id={p.slug}
          className="xb-marker"
          style={{ top: `calc((100% - 100svh) * ${((i + 0.35) / N).toFixed(3)})` }}
          aria-hidden="true"
        />
      ))}
      <div className="xb-viewport">
        <div className="xb-tones" aria-hidden="true">
          {PROJECTS.map((p, i) => (
            <div
              key={p.slug}
              className="xb-tone"
              data-active={i === index ? "true" : undefined}
              style={{ background: `radial-gradient(70% 70% at 62% 50%, ${p.tone.lift} 0%, ${p.tone.base} 70%)` }}
            />
          ))}
        </div>

        <div className="xb-port-wrap">
          <span className="xb-port-ring" aria-hidden="true" />
          <motion.div
            className="xb-port"
            style={{ clipPath: clip, viewTransitionName: index === 0 ? "xb-porthole" : undefined }}
          >
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.slug}
                className="xb-port-image"
                data-active={i === index ? "true" : undefined}
                style={{ scale: imageScale }}
                aria-hidden="true"
              >
                <Image src={p.atmosphere} alt="" fill sizes="80vmin" className="xp-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p className="sr-only" aria-live="polite">{`Destination ${index + 1} of ${N}: ${project.name}`}</p>
        <div className="xb-dest">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.18, ease: [0.7, 0, 0.84, 0] } }}
            >
              <DestinationCopy project={project} index={index} />
            </motion.div>
          </AnimatePresence>
        </div>

        <Dial index={index} progress={progress} />
      </div>
    </section>
  )
}

function DestinationCopy({ project: p, index }: { project: Project; index: number }) {
  const isAgents = p.slug === "agents"
  return (
    <div className="xb-dest-inner">
      <p className="xp-mono">Destination {String(index + 1).padStart(2, "0")} · {p.years}</p>
      <h3 className="xp-h1">{p.name}</h3>
      <p className="xp-lede">{p.title}</p>
      <p className="xp-caption">{p.proof}</p>
      <figure className="xb-dest-shot">
        <Image src={p.image} alt={p.imageAlt} width={p.imageWidth} height={p.imageHeight} sizes="(min-width: 900px) 34vw, 86vw" />
      </figure>
      {isAgents ? (
        <ContinuityLink className="xp-btn xb-enter" href={caseHref("direction-b")}>
          Enter the case study <span aria-hidden="true">→</span>
        </ContinuityLink>
      ) : (
        <Link className="xp-btn" href={p.productionHref}>
          Published case study <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  )
}

function Dial({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const fill = useTransform(progress, [0, 1], ["0%", "100%"])
  return (
    <nav className="xb-dial" aria-label="Destinations">
      <span className="xb-dial-track" aria-hidden="true">
        <motion.span className="xb-dial-fill" style={{ ["--fill" as string]: fill }} />
      </span>
      <ol>
        {PROJECTS.map((p, i) => (
          <li key={p.slug}>
            <a href={`#${p.slug}`} aria-current={i === index ? "location" : undefined}>
              <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="xb-dial-name">{p.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Reduced motion: each destination is a static, stacked section with the porthole fully open. */
function StackedDestinations() {
  return (
    <section id="destinations" aria-label="Selected work" className="xb-stacked">
      {PROJECTS.map((p, i) => (
        <article
          key={p.slug}
          id={p.slug}
          className="xb-stacked-item"
          style={{ background: `radial-gradient(70% 70% at 70% 40%, ${p.tone.lift} 0%, ${p.tone.base} 70%)` }}
        >
          <div className="xb-port-wrap xb-port-static">
            <span className="xb-port-ring" aria-hidden="true" />
            <div className="xb-port" style={{ clipPath: "circle(50% at 50% 50%)" }}>
              <div className="xb-port-image" data-active="true">
                <Image src={p.atmosphere} alt="" fill sizes="60vmin" className="xp-cover" />
              </div>
            </div>
          </div>
          <div className="xb-dest">
            <DestinationCopy project={p} index={i} />
          </div>
        </article>
      ))}
    </section>
  )
}

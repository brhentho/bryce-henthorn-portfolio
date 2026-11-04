"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import {
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
import { useMediaQuery } from "@/components/explore/useMediaQuery"
import { PERSON, PROJECTS, caseHref, type Project } from "@/lib/explore/content"
import { useEnhanced } from "../Treatment"
import { Artwork } from "../effects/Artwork"

const N = PROJECTS.length
const ease = [0.16, 1, 0.3, 1] as const

/** Where each project window floats before it converges (vw / vh / px of depth / degrees). */
const SCATTER = [
  { x: -22, y: -24, z: -140, ry: 22, rx: 6 },
  { x: 18, y: -27, z: -340, ry: -26, rx: -4 },
  { x: 30, y: 4, z: -60, ry: -16, rx: 8 },
]

export function CHome() {
  const reduce = useReducedMotion()
  const wide = useMediaQuery("(min-width: 900px)", true)
  useHashAfterLayout(!reduce && wide ? "spatial" : "static", "spatial")
  const spatial = !reduce && wide

  return (
    <div className="xc">
      <a className="xp-skip" href="#work">Skip to work</a>
      <main id="main">
        {spatial ? <ConvergeHero /> : <FlatHero />}
        {spatial ? <Orbit /> : <CardStack animate={!reduce} />}
        <section className="xc-thesis" aria-labelledby="xc-thesis-title">
          <div className="xc-thesis-copy">
            <p className="xp-mono">Approach</p>
            <h2 id="xc-thesis-title" className="xp-h1">{PERSON.thesis}</h2>
            <p className="xp-lede xp-measure">{PERSON.thesisBody}</p>
          </div>
          <ol className="xc-planes" aria-label="Principles">
            {PERSON.principles.map((p, i) => (
              <li key={p.label} className="xc-plane" style={{ ["--i" as string]: i }}>
                <p className="xp-mono">{String(i + 1).padStart(2, "0")} · {p.label}</p>
                <p className="xp-h3">{p.statement}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="xc-close" aria-labelledby="xc-close-title">
          <h2 id="xc-close-title" className="xp-h2">{PERSON.secondary}</h2>
          <a className="xp-btn" href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </section>
      </main>
      <ExploreFooter />
    </div>
  )
}

function HeroCopy() {
  return (
    <div className="xc-hero-copy">
      <p className="xp-mono">{PERSON.name} · {PERSON.role}</p>
      <RevealWords as="h1" id="xc-hero-title" className="xp-display xc-hero-title" text={PERSON.statement} delay={100} />
      <p className="xp-lede">{PERSON.secondary}</p>
    </div>
  )
}

/** Scattered project windows in depth converge into one row as the reader scrolls. */
function ConvergeHero() {
  const enhanced = useEnhanced()
  const ref = useRef<HTMLElement>(null)
  const scrollYProgress = useSectionProgress(ref, ["start start", "end end"])
  const horizon = useTransform(scrollYProgress, [0, 1], ["18%", "-6%"])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.45], ["0px", "-40px"])
  const rowOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1])

  return (
    <section ref={ref} className="xc-hero" aria-labelledby="xc-hero-title">
      <div className="xc-hero-sticky">
        {enhanced ? <Artwork kind="moss" className="xc-ambient" /> : <motion.div className="xc-horizon" style={{ y: horizon }} aria-hidden="true" />}
        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="xc-hero-copy-wrap">
          <HeroCopy />
        </motion.div>
        <div className="xc-scene" aria-hidden="true">
          {PROJECTS.map((p, i) => (
            <ConvergeWindow key={p.slug} project={p} index={i} progress={scrollYProgress} />
          ))}
        </div>
        <motion.p className="xp-mono xc-hero-row-label" style={{ opacity: rowOpacity }} aria-hidden="true">
          Three projects · one way of working
        </motion.p>
      </div>
    </section>
  )
}

function ConvergeWindow({ project, index, progress }: { project: Project; index: number; progress: MotionValue<number> }) {
  const s = SCATTER[index]
  const t = useTransform(progress, [0.08, 0.8], [0, 1], { clamp: true })
  const e = useTransform(t, (v) => 1 - Math.pow(1 - v, 3))
  const rowX = (index - 1) * 31
  const x = useTransform(e, (v) => `${s.x + (rowX - s.x) * v}vw`)
  const y = useTransform(e, (v) => `${s.y + (0 - s.y) * v}vh`)
  const z = useTransform(e, (v) => s.z * (1 - v))
  const rotateY = useTransform(e, (v) => s.ry * (1 - v))
  const rotateX = useTransform(e, (v) => s.rx * (1 - v))
  return (
    <motion.div className="xc-window" style={{ x, y, z, rotateY, rotateX }}>
      <span className="xc-window-bar"><span /><span /><span /></span>
      <div className="xc-window-media">
        <Image src={project.image} alt="" width={project.imageWidth} height={project.imageHeight} sizes="30vw" priority={index === 0} />
      </div>
      <span className="xp-mono xc-window-label">{project.name}</span>
    </motion.div>
  )
}

function FlatHero() {
  const enhanced = useEnhanced()
  return (
    <section className="xc-hero xc-hero-flat" aria-labelledby="xc-hero-title">
      {enhanced ? <Artwork kind="moss" className="xc-ambient" /> : <div className="xc-horizon" aria-hidden="true" />}
      <HeroCopy />
    </section>
  )
}

/** A cylinder of project cards, turned by scroll; buttons jump straight to each project. */
function Orbit() {
  const ref = useRef<HTMLElement>(null)
  const scrollYProgress = useSectionProgress(ref, ["start start", "end end"])
  const [index, setIndex] = useState(0)

  // Hold on each card for most of its segment, then turn to the next.
  const turn = useTransform(scrollYProgress, (v) => {
    const pos = Math.min(N - 1, Math.max(0, v * N - 0.5))
    const base = Math.floor(pos)
    const frac = pos - base
    const eased = frac < 0.35 ? 0 : frac > 0.85 ? 1 : (frac - 0.35) / 0.5
    const smooth = eased * eased * (3 - 2 * eased)
    return -(base + smooth) * (360 / N)
  })
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.round(v * N - 0.5)))
    setIndex((prev) => (prev === next ? prev : next))
  })

  return (
    <section id="work" ref={ref} className="xc-orbit" aria-label="Selected work" style={{ height: `${N * 70 + 30}svh` }}>
      {PROJECTS.map((p, i) => (
        <span key={p.slug} id={p.slug} className="xc-marker" style={{ top: `calc((100% - 100svh) * ${((i + 0.6) / N).toFixed(3)})` }} aria-hidden="true" />
      ))}
      <div className="xc-orbit-sticky">
        <div className="xc-tones" aria-hidden="true">
          {PROJECTS.map((p, i) => (
            <div
              key={p.slug}
              className="xc-tone"
              data-active={i === index ? "true" : undefined}
              style={{ background: `radial-gradient(60% 55% at 50% 58%, ${p.tone.lift} 0%, ${p.tone.base} 72%)` }}
            />
          ))}
        </div>
        <div className="xc-orbit-head">
          <p className="xp-mono">Selected work</p>
          <nav aria-label="Projects" className="xc-orbit-nav">
            {PROJECTS.map((p, i) => (
              <a key={p.slug} href={`#${p.slug}`} aria-current={i === index ? "location" : undefined}>
                <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span> {p.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="xc-cylinder-view">
          <div className="xc-cylinder-push">
          <motion.div className="xc-cylinder" style={{ rotateY: turn }}>
            {PROJECTS.map((p, i) => (
              <article
                key={p.slug}
                className="xc-face"
                style={{ transform: `rotateY(${i * (360 / N)}deg) translateZ(var(--orbit-r))` }}
                data-active={i === index ? "true" : undefined}
                aria-hidden={i !== index}
                inert={i !== index}
              >
                <ProjectCard project={p} index={i} />
              </article>
            ))}
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const isAgents = p.slug === "agents"
  return (
    <div className="xc-card">
      <figure className="xc-card-media" style={{ viewTransitionName: isAgents ? "xc-plate" : undefined }}>
        <Image src={p.image} alt={p.imageAlt} width={p.imageWidth} height={p.imageHeight} sizes="(min-width: 900px) 46vw, 90vw" />
      </figure>
      <div className="xc-card-copy">
        <p className="xp-mono">{String(index + 1).padStart(2, "0")} · {p.years} · {p.proof}</p>
        <h3 className="xp-h2">{p.name}</h3>
        <p className="xp-body">{p.title}</p>
        {isAgents ? (
          <ContinuityLink className="xp-btn" href={caseHref("direction-c")}>
            Step into the case study <span aria-hidden="true">→</span>
          </ContinuityLink>
        ) : (
          <Link className="xp-btn" href={p.productionHref}>
            Published case study <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </div>
  )
}

/** Narrow screens and reduced motion: a plain list; cards settle from a slight tilt when allowed. */
function CardStack({ animate }: { animate: boolean }) {
  return (
    <section id="work" className="xc-stack" aria-label="Selected work">
      <p className="xp-mono">Selected work</p>
      {PROJECTS.map((p, i) => (
        <motion.article
          key={p.slug}
          id={p.slug}
          className="xc-stack-item"
          style={{ background: `radial-gradient(90% 80% at 50% 0%, ${p.tone.lift} 0%, ${p.tone.base} 80%)` }}
          initial={animate ? { opacity: 0, rotateX: 10, y: 28 } : false}
          whileInView={animate ? { opacity: 1, rotateX: 0, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease }}
        >
          <ProjectCard project={p} index={i} />
        </motion.article>
      ))}
    </section>
  )
}

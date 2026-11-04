"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { useReducedMotion } from "../useReducedMotion"
import { useSectionProgress } from "../useSectionProgress"
import { ContinuityLink } from "@/components/explore/ContinuityLink"
import { ExploreFooter } from "@/components/explore/ExploreFooter"
import { RevealWords } from "@/components/explore/RevealWords"
import { useActiveSection } from "@/components/explore/useActiveSection"
import { PERSON, PROJECTS, caseHref, type Project } from "@/lib/explore/content"
import { useEnhanced } from "../Treatment"
import { TyndallLight } from "../effects/Artwork"

const SECTIONS = ["xa-top", "work-agents", "work-recall", "work-teams", "xa-close"] as const

export function AHome() {
  const enhanced = useEnhanced()
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const scrollYProgress = useSectionProgress(heroRef, ["start start", "end start"])
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14])
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const annoY = useTransform(scrollYProgress, [0, 1], [0, -220])
  const veil = useTransform(scrollYProgress, [0, 1], [0.35, 0.85])

  const active = useActiveSection(SECTIONS, 0.55)
  const tone = active.startsWith("work-") ? active.slice(5) : "base"

  return (
    <div className="xa" data-tone={tone}>
      <div className="xa-backdrop" aria-hidden="true">
        <div className="xa-tone" data-for="base" />
        {PROJECTS.map((p) => (
          <div
            key={p.slug}
            className="xa-tone"
            data-for={p.slug}
            style={{
              background: `radial-gradient(90% 70% at 72% 38%, ${p.tone.lift} 0%, ${p.tone.base} 62%), ${p.tone.base}`,
            }}
          />
        ))}
      </div>

      <a className="xp-skip" href="#work">Skip to work</a>

      <main id="main">
        <section id="xa-top" ref={heroRef} className="xa-hero" aria-labelledby="xa-hero-title">
          <motion.div className="xa-hero-plate" style={reduce ? undefined : { y: plateY, scale: plateScale }}>
            <Image src="/images/heroes/HomeHeroRender.jpg" alt="" fill priority sizes="100vw" className="xp-cover" />
            {enhanced && <TyndallLight />}
          </motion.div>
          <motion.div className="xa-hero-veil" style={reduce ? undefined : { opacity: veil }} aria-hidden="true" />

          <div className="xa-hero-inner">
            <motion.div className="xa-hero-anno" style={reduce ? undefined : { y: annoY }}>
              <p className="xp-mono">{PERSON.name}</p>
              <p className="xp-mono">{PERSON.role}</p>
            </motion.div>
            <motion.div style={reduce ? undefined : { y: typeY }}>
              <RevealWords as="h1" id="xa-hero-title" className="xp-display xa-hero-title" text={PERSON.statement} delay={120} />
              <p className="xp-lede xa-hero-secondary">{PERSON.secondary}</p>
            </motion.div>
          </div>
          <a className="xa-hero-cue xp-mono" href="#work">
            Selected work <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="xa-thesis" aria-labelledby="xa-thesis-title">
          <div className="xa-thesis-copy">
            <p className="xp-mono">Approach</p>
            <h2 id="xa-thesis-title" className="xp-h1">{PERSON.thesis}</h2>
            <p className="xp-lede xp-measure">{PERSON.thesisBody}</p>
          </div>
          <ol className="xa-principles">
            {PERSON.principles.map((p, i) => (
              <Principle key={p.label} index={i} label={p.label} statement={p.statement} />
            ))}
          </ol>
        </section>

        <section id="work" className="xa-work" aria-labelledby="xa-work-title">
          <header className="xa-work-head">
            <h2 id="xa-work-title" className="xp-h2">Selected work</h2>
            <nav aria-label="Projects">
              <ol className="xa-work-index">
                {PROJECTS.map((p, i) => (
                  <li key={p.slug}>
                    <a href={`#work-${p.slug}`} aria-current={active === `work-${p.slug}` ? "location" : undefined}>
                      <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span>
                      <span>{p.name}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </header>
          {PROJECTS.map((p, i) => (
            <ProjectLayer key={p.slug} project={p} index={i} />
          ))}
        </section>

        <section id="xa-close" className="xa-close" aria-labelledby="xa-close-title">
          <p className="xp-mono">Contact</p>
          <h2 id="xa-close-title" className="xp-h1">{PERSON.secondary}</h2>
          <a className="xp-btn" href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </section>
      </main>
      <ExploreFooter />
    </div>
  )
}

function Principle({ index, label, statement }: { index: number; label: string; statement: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLLIElement>(null)
  const scrollYProgress = useSectionProgress(ref, ["start end", "end start"])
  const depth = 30 + index * 45
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth])
  return (
    <motion.li ref={ref} className="xa-principle" style={reduce ? undefined : { y }}>
      <span className="xp-mono">{String(index + 1).padStart(2, "0")} · {label}</span>
      <p className="xp-h3">{statement}</p>
    </motion.li>
  )
}

function ProjectLayer({ project: p, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const scrollYProgress = useSectionProgress(ref, ["start end", "end start"])
  const enter = useSectionProgress(ref, ["start end", "start 0.3"])
  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"])
  const plateY = useTransform(scrollYProgress, [0, 1], [110, -110])
  const annoY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const clip = useTransform(enter, [0, 1], [
    "inset(38% 0% 0% 0% round 999px 999px 0px 0px)",
    "inset(0% 0% 0% 0% round 999px 999px 0px 0px)",
  ])
  const isAgents = p.slug === "agents"
  const number = String(index + 1).padStart(2, "0")

  return (
    <article
      id={`work-${p.slug}`}
      ref={ref}
      className="xa-project"
      data-flip={index % 2 === 1 ? "true" : undefined}
      aria-labelledby={`xa-${p.slug}-name`}
    >
      <motion.div className="xa-arch" style={reduce ? undefined : { clipPath: clip }}>
        <motion.div className="xa-arch-image" style={reduce ? undefined : { y: imageY }}>
          <Image src={p.atmosphere} alt="" fill sizes="(min-width: 900px) 42vw, 100vw" className="xp-cover" />
        </motion.div>
      </motion.div>

      <motion.figure className="xa-plate" style={reduce ? undefined : { y: plateY }}>
        <Image
          src={p.image}
          alt={p.imageAlt}
          width={p.imageWidth}
          height={p.imageHeight}
          sizes="(min-width: 900px) 46vw, 92vw"
          style={isAgents ? { viewTransitionName: "xa-agents-hero" } : undefined}
        />
      </motion.figure>

      <motion.div className="xa-project-copy" style={reduce ? undefined : { y: annoY }}>
        <p className="xp-mono">{number} · {p.years}</p>
        <h3 id={`xa-${p.slug}-name`} className="xp-h2">{p.name}</h3>
        <p className="xp-lede">{p.title}</p>
        <p className="xp-caption">{p.proof}</p>
        {isAgents ? (
          <ContinuityLink className="xp-btn xa-cta" href={caseHref("direction-a")}>
            Read the case study <span aria-hidden="true">→</span>
          </ContinuityLink>
        ) : (
          <Link className="xp-btn" href={p.productionHref}>
            Published case study <span aria-hidden="true">↗</span>
          </Link>
        )}
      </motion.div>
    </article>
  )
}

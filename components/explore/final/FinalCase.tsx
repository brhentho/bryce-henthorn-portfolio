"use client"

import Image from "next/image"
import { useRef, type ReactNode } from "react"
import { motion, useTransform, type MotionStyle } from "framer-motion"
import { AGENTS } from "@/lib/explore/content"
import type { Finalist } from "@/lib/explore/finalists"
import { RevealWords } from "../RevealWords"
import { useSectionProgress } from "../useSectionProgress"
import { useReducedMotion } from "../useReducedMotion"
import { useMediaQuery } from "../useMediaQuery"
import { useActiveSection } from "../useActiveSection"
import { Ledger, Paragraphs, FrameSelector, PublishedLinks } from "../round-two/CaseParts"
import { StudyFigure, TaskbarFilm } from "../round-two/Media"
import { WorkingDemo } from "../round-two/Demo"
import { Constraints, Invocation } from "../ExperienceParts"
import { Environment } from "./Environment"
import { Chapter, FinalHeader, FinalFooter, useFinalHero } from "./Shared"

const CHAPTERS = [
  ["context", "Context"], ["problem", "Problem"], ["decision", "Decision"], ["taskbar", "Taskbar"],
  ["states", "States"], ["constraints", "Constraints"], ["invocation", "Invocation"], ["impact", "Impact"],
] as const
const IDS = CHAPTERS.map(([id]) => id)
type ChapterId = typeof IDS[number]

/**
 * Page tones per chapter, resolved from `--env-<tone>` in final.css. Each case turns light exactly
 * once (`light`), over a ~40svh band, and stays light through the footer.
 */
const CASE_TONES: Record<Finalist, { light: ChapterId; tones: Record<ChapterId, string> }> = {
  synthesis: { light: "constraints", tones: { context: "dusk", problem: "cool", decision: "plum", taskbar: "dusk", states: "graphite", constraints: "paper", invocation: "paper-cool", impact: "paper-warm" } },
  presence: { light: "impact", tones: { context: "dusk", problem: "cool", decision: "plum", taskbar: "warm", states: "graphite", constraints: "dusk", invocation: "cool", impact: "paper" } },
  signal: { light: "context", tones: { context: "paper", problem: "paper-cool", decision: "paper-warm", taskbar: "paper", states: "paper-cool", constraints: "paper-warm", invocation: "paper", impact: "paper-warm" } },
}

export function FinalCase({ concept }: { concept: Finalist }) {
  const hero = useFinalHero(concept)
  const active = useActiveSection(IDS, .3)
  const ref = useRef<HTMLElement>(null)
  const progress = useSectionProgress(ref, ["start start", "end .25"])
  const reduce = useReducedMotion()
  const tilt = useTransform(progress, [0, .65], [28, 0])
  const y = useTransform(progress, [0, .65], [0, -60])
  const scale = useTransform(progress, [0, .65], [concept === "presence" ? .82 : .92, 1])
  const section = (id: ChapterId, children: ReactNode, compact = false) => <CaseSection concept={concept} id={id} compact={compact}>{children}</CaseSection>
  return <Environment className={`fn-concept fn-${concept} fn-case`}>
    <a className="xp-skip" href="#context">Skip to the case study</a>
    <FinalHeader concept={concept} hero={hero} />
    <main id="main">
      <header ref={ref} className="fn-case-hero">
        <p className="fn-label">Agents in Windows / Interaction design</p>
        <RevealWords as="h1" className="fn-case-title" text={AGENTS.title} />
        <p className="fn-intro">{AGENTS.lede}</p>
        <div className="fn-case-product-view">
          <motion.figure className="fn-case-product" style={reduce ? undefined : { rotateX: tilt, y, scale }}>
            <div className="fn-device">
              <Image src={AGENTS.hero.src} alt={AGENTS.hero.alt} width={AGENTS.hero.width} height={AGENTS.hero.height} sizes="94vw" priority style={{ viewTransitionName: `${concept}-product` }} />
            </div>
            <figcaption className="fn-label">Fig. 01 / Agents in Windows / Product prototype</figcaption>
          </motion.figure>
        </div>
        <div className="fn-case-intro"><p>{AGENTS.call}</p><Ledger /></div>
      </header>
      <div className="fn-reading-grid">
        <aside className="fn-rail"><nav aria-label="Case contents"><p className="fn-label">Agents in Windows</p>
          {CHAPTERS.map(([id, label], index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}><span>0{index + 1}</span>{label}</a>)}
        </nav></aside>
        <div className="fn-reading-body">
          {section("context", <div className="fn-evidence-split">
            <div><p className="fn-label">The starting point</p><h2>{AGENTS.context.title}</h2><Paragraphs items={AGENTS.context.body} /></div>
            <Evidence concept={concept} depth="plate"><StudyFigure {...AGENTS.context.figure} number="01.1" /></Evidence>
          </div>)}
          {section("problem", <>
            <div className="fn-section-head"><p className="fn-label">What people needed</p><h2>{AGENTS.problem.thesis}</h2></div>
            <div className="xr-pair fn-problem-pair">
              <Evidence concept={concept} depth="far"><StudyFigure {...AGENTS.problem.fragmented} caption={AGENTS.problem.fragmented.caption} number="02.1" /></Evidence>
              <Evidence concept={concept} depth="near"><StudyFigure {...AGENTS.problem.visible} caption={AGENTS.problem.visible.caption} number="02.2" /></Evidence>
            </div>
            <Paragraphs items={AGENTS.problem.body} />
          </>)}
          {section("decision", <>
            <div className="fn-decision-head"><h2>{AGENTS.decision.title}</h2><Paragraphs items={AGENTS.decision.body} /></div>
            <Evidence concept={concept} depth="far"><DecisionOptions /></Evidence>
          </>)}
          {section("taskbar", <>
            <div className="fn-section-head"><p className="fn-label">A familiar return point</p><h2>{AGENTS.taskbar.title}</h2></div>
            {concept === "signal" ? <div className="fn-evidence-split"><Paragraphs items={AGENTS.taskbar.body} /><FrameSelector /></div> : <><FrameSelector /><Paragraphs items={AGENTS.taskbar.body} /></>}
            <Evidence concept={concept} depth="film"><TaskbarFilm /></Evidence>
          </>)}
          {section("states", <>
            <div className="fn-section-head"><p className="fn-label">Understand, then act</p><h2>{AGENTS.simulation.title}</h2></div><WorkingDemo />
          </>)}
          {section("constraints", <Constraints />, true)}
          {section("invocation", <Invocation />, true)}
          {section("impact", <><Impact concept={concept} /><PublishedLinks /></>, true)}
        </div>
      </div>
    </main>
    <FinalFooter />
  </Environment>
}

function CaseSection({ concept, id, children, compact }: { concept: Finalist; id: ChapterId; children: ReactNode; compact: boolean }) {
  const { light, tones } = CASE_TONES[concept]
  // Compact chapters wrap components that already own their <section id>; the wrapper is only a tone anchor.
  return <Chapter as={compact ? "div" : "section"} id={compact ? undefined : id} tone={tones[id]} band={id === light ? [.85, .45] : [1, .4]}
    className={`fn-case-section${compact ? " fn-nested-section" : ""}`}>{children}</Chapter>
}

function DecisionOptions() {
  return <div className="xr-options fn-options">
    <div className="xr-option-grid">{AGENTS.decision.options.map(option =>
      <article key={option.code} className="fn-option" data-chosen={option.chosen || undefined}>
        <p className="xr-label">{option.code} / {option.chosen ? "Chosen foundation" : "Alternative"}</p>
        <h3>{option.option}</h3><p>{option.tradeoff}</p><p className="xr-disposition">{option.disposition}</p>
      </article>
    )}</div>
  </div>
}

function Impact({ concept }: { concept: Finalist }) {
  return <section id="impact" className="xr-section xr-impact fn-impact">
    <div><p className="xr-label">What changed</p><h2>{AGENTS.impact.title}</h2><Paragraphs items={AGENTS.impact.body} /></div>
    <Evidence concept={concept} depth="plate"><StudyFigure {...AGENTS.impact.figure} caption={AGENTS.impact.figure.caption} number="06" /></Evidence>
    <blockquote>{AGENTS.impact.quote}</blockquote>
  </section>
}

type Depth = "plate" | "far" | "near" | "film"
// Offset → settled evidence arrival. `reg` is the registration frame's travel; it rests at 8px.
const DEPTHS: Record<Depth, { y: number; x: number; tilt: number; scale: number; reg: number }> = {
  plate: { y: 72, x: 24, tilt: 8, scale: .95, reg: 32 },
  far: { y: 40, x: 0, tilt: 0, scale: .98, reg: 20 },
  near: { y: 150, x: 0, tilt: 6, scale: .94, reg: 36 },
  film: { y: 64, x: 0, tilt: 12, scale: .9, reg: 0 },
}
const SETTLED = { x: 0, y: 0, rotateX: 0, scale: 1, "--fn-reg": "8px" } as MotionStyle
const CONCEPT_SCALE: Record<Finalist, number> = { synthesis: 1, presence: 1.35, signal: .85 }

/** A figure entering the argument. Progress is measured on the untransformed `[data-evidence]` wrapper. */
function Evidence({ concept, depth, children }: { concept: Finalist; depth: Depth; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const narrow = useMediaQuery("(max-width: 700px)")
  const d = DEPTHS[depth]
  const k = CONCEPT_SCALE[concept] * (narrow ? .5 : 1)
  const progress = useSectionProgress(ref, ["start 1", "start .45"])
  const y = useTransform(progress, [0, 1], [d.y * k, 0])
  const x = useTransform(progress, [0, 1], [-(concept === "signal" ? d.x * 2 * (narrow ? .5 : 1) : d.x * k), 0])
  const rotateX = useTransform(progress, [0, 1], [narrow ? 0 : d.tilt * Math.min(k, 1.2), 0])
  const scale = useTransform(progress, [0, 1], [1 - (1 - d.scale) * k, 1])
  const reg = useTransform(progress, p => `${(8 + (d.reg - 8) * (1 - p)).toFixed(1)}px`)
  const style: MotionStyle = { y, x, rotateX, scale, ...(d.reg ? { "--fn-reg": reg } : {}) }
  return <div ref={ref} className="fn-evidence" data-evidence={depth} data-registered={d.reg ? "" : undefined}>
    <motion.div className="fn-evidence-plate" style={reduce ? SETTLED : style}>{children}</motion.div>
  </div>
}

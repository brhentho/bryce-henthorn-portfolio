"use client"

import Image from "next/image"
import { useRef, type ReactNode } from "react"
import { motion, useTransform } from "framer-motion"
import { AGENTS } from "@/lib/explore/content"
import type { Finalist } from "@/lib/explore/finalists"
import { RevealWords } from "../RevealWords"
import { useSectionProgress } from "../useSectionProgress"
import { useReducedMotion } from "../useReducedMotion"
import { useActiveSection } from "../useActiveSection"
import { Ledger, Paragraphs, ProblemPair, DecisionOptions, FrameSelector, CaseImpact, PublishedLinks } from "../round-two/CaseParts"
import { StudyFigure, TaskbarFilm } from "../round-two/Media"
import { WorkingDemo } from "../round-two/Demo"
import { Constraints, Invocation } from "../ExperienceParts"
import { FinalHeader, FinalFooter, MaterialSection, useFinalHero } from "./Shared"

const CHAPTERS = [
  ["context", "Context"], ["problem", "Problem"], ["decision", "Decision"], ["taskbar", "Taskbar"],
  ["states", "States"], ["constraints", "Constraints"], ["invocation", "Invocation"], ["impact", "Impact"],
] as const
const IDS = CHAPTERS.map(([id]) => id)

export function FinalCase({ concept }: { concept: Finalist }) {
  const hero = useFinalHero(concept)
  const active = useActiveSection(IDS, .3)
  const ref = useRef<HTMLElement>(null)
  const progress = useSectionProgress(ref, ["start start", "end .25"])
  const reduce = useReducedMotion()
  const tilt = useTransform(progress, [0, .65], [28, 0])
  const y = useTransform(progress, [0, .65], [0, -60])
  const scale = useTransform(progress, [0, .65], [concept === "presence" ? .82 : .92, 1])
  return <div className={`fn-concept fn-${concept} fn-case`}>
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
          <CaseSection material="cool" id="context">
            <div className="fn-evidence-split"><div><p className="fn-label">The starting point</p><h2>{AGENTS.context.title}</h2><Paragraphs items={AGENTS.context.body} /></div>
              <StudyFigure {...AGENTS.context.figure} number="01.1" /></div>
          </CaseSection>
          <CaseSection material="cool" id="problem">
            <p className="fn-label">What people needed</p><h2>{AGENTS.problem.thesis}</h2>
            <ProblemPair /><Paragraphs items={AGENTS.problem.body} />
          </CaseSection>
          <CaseSection material="paper" id="decision">
            <div className="fn-decision-head"><h2>{AGENTS.decision.title}</h2><Paragraphs items={AGENTS.decision.body} /></div>
            <DecisionOptions />
          </CaseSection>
          <CaseSection material="ink" id="taskbar">
            <p className="fn-label">A familiar return point</p><h2>{AGENTS.taskbar.title}</h2>
            {concept === "signal" ? <div className="fn-evidence-split"><Paragraphs items={AGENTS.taskbar.body} /><FrameSelector /></div> : <><FrameSelector /><Paragraphs items={AGENTS.taskbar.body} /></>}
            <TaskbarFilm />
          </CaseSection>
          <CaseSection material="ink" id="states">
            <p className="fn-label">Understand, then act</p><h2>{AGENTS.simulation.title}</h2><WorkingDemo />
          </CaseSection>
          <CaseSection material={concept === "presence" ? "cool" : "paper"} compact><Constraints /></CaseSection>
          <CaseSection material="ink" compact><Invocation /></CaseSection>
          <CaseSection material="paper" compact><CaseImpact /><PublishedLinks /></CaseSection>
        </div>
      </div>
    </main>
    <FinalFooter />
  </div>
}

function CaseSection({ material, id, children, compact = false }: {
  material: "ink" | "cool" | "paper"; id?: string; children: ReactNode; compact?: boolean
}) {
  return <MaterialSection material={material} id={id} className={`fn-case-section${compact ? " fn-nested-section" : ""}`}>{children}</MaterialSection>
}

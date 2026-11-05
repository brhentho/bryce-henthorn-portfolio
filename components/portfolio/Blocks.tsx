"use client"

import { useRef, type ReactNode } from "react"
import { motion, useTransform } from "framer-motion"
import { useSectionProgress } from "../explore/useSectionProgress"
import { useReducedMotion } from "../explore/useReducedMotion"
import type { DecisionItem } from "./types"
export { WorkingDemo as AgentDemo } from "../explore/round-two/Demo"
export { FrameSelector as AgentKeyframes } from "../explore/round-two/CaseParts"
export { ShinyLink } from "../explore/final/ShinyLink"

export function CaseSection({ id, title, eyebrow, tone, children, className="" }: {
  id:string; title?:string; eyebrow?:string; tone?:string; children:ReactNode; className?:string
}) {
  return <section id={id} className={`fn-case-section fn-chapter pf-section ${className}`} data-env={tone} data-env-start={tone?1:undefined} data-env-end={tone?.startsWith("paper") ? .45 : tone ? .4 : undefined}>
    {eyebrow && <p className="fn-label">{eyebrow}</p>}{title && <h2>{title}</h2>}{children}
  </section>
}
export function Prose({ children, className="" }: { children:ReactNode; className?:string }) {
  return <div className={`xr-prose pf-prose ${className}`}>{children}</div>
}
export function Split({ children, className="" }: { children:ReactNode; className?:string }) {
  return <div className={`pf-split ${className}`}>{children}</div>
}
export function Pair({ children }: { children:ReactNode }) { return <div className="pf-pair">{children}</div> }
export function Decisions({ items }: { items:readonly DecisionItem[] }) {
  return <div className="pf-decisions">{items.map(item=><article key={item.title} data-chosen={item.chosen||undefined}>
    <p className="fn-label">{item.chosen?"Selected direction":"Alternative"}</p><h3>{item.title}</h3><p>{item.tradeoff}</p><p>{item.disposition}</p>
  </article>)}</div>
}
export function EvidenceReveal({ children }: { children:ReactNode }) {
  const ref=useRef<HTMLDivElement>(null), reduce=useReducedMotion()
  const progress=useSectionProgress(ref,["start .98","start .4"])
  const y=useTransform(progress,[0,1],[40,0])
  const scale=useTransform(progress,[0,1],[.96,1])
  return <div ref={ref} className="pf-evidence"><motion.div className="pf-motion" style={reduce?{y:0,scale:1}:{y,scale}}>{children}</motion.div></div>
}

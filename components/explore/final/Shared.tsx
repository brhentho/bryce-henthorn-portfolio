"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useTransform } from "framer-motion"
import { PERSON } from "@/lib/explore/content"
import { finalistHref, type Finalist, type HeroKind } from "@/lib/explore/finalists"
import { useSectionProgress } from "../useSectionProgress"
import { useReducedMotion } from "../useReducedMotion"
import { ShinyLink } from "./ShinyLink"
import { useHeroChoice } from "../Treatment"

export function useFinalHero(concept: Finalist): HeroKind {
  const hero = useHeroChoice()
  return concept === "presence" || (concept === "synthesis" && hero === "orb") ? "orb" : "ascii"
}

export function FinalHeader({ concept, hero }: { concept: Finalist; hero: HeroKind }) {
  return <header className="fn-nav">
    <Link className="fn-brand" href={finalistHref(concept, false, hero)}>{PERSON.name}<span>{PERSON.role}</span></Link>
    <nav aria-label="Portfolio"><Link href={`${finalistHref(concept, false, hero)}#work`}>Work</Link><Link href="/about">About</Link><a href="#contact">Contact</a></nav>
  </header>
}

export function FinalFooter() {
  return <footer className="fn-contact fn-surface" data-material="ink" id="contact">
    <p className="fn-label">A conversation starts here</p>
    <a className="fn-contact-title" href={`mailto:${PERSON.email}`}>Let’s talk. <span aria-hidden="true">↗</span></a>
    <div className="fn-footer-line"><span>{PERSON.name} / {PERSON.location}</span><Link href="/explore">Compare concepts</Link></div>
  </footer>
}

export function MaterialSection({ children, material, id, className = "" }: {
  children: ReactNode; material: "ink" | "cool" | "plum" | "warm" | "paper"; id?: string; className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const progress = useSectionProgress(ref, ["start end", "start .35"])
  const opacity = useTransform(progress, [0, 1], [0, 1])
  const [colors, setColors] = useState<string[] | null>(null)
  useEffect(() => {
    if (!ref.current) return
    const styles = getComputedStyle(ref.current)
    setColors([styles.getPropertyValue("--fn-black").trim(), styles.getPropertyValue("--surface-bg").trim()])
  }, [material])
  const background = useTransform(progress, [0, 1], colors ?? ["transparent", "transparent"])
  return <motion.section ref={ref} id={id} className={`fn-surface ${className}`} data-material={material}
    style={colors && !reduce ? { backgroundColor: background } : undefined}>
    <motion.div className="fn-surface-wash" style={{ opacity: reduce ? 1 : opacity }} aria-hidden="true" />
    <div className="fn-surface-content">{children}</div>
  </motion.section>
}

export function Approach() {
  return <MaterialSection material="paper" id="approach" className="fn-approach">
    <div className="fn-approach-heading"><p className="fn-label">The approach</p><h2>{PERSON.thesis}</h2></div>
    <p className="fn-intro">{PERSON.thesisBody}</p>
    <ol>{PERSON.principles.map((p, index) => <li key={p.label}><span className="fn-label">0{index + 1}</span><h3>{p.label}</h3><p>{p.statement}</p></li>)}</ol>
  </MaterialSection>
}

export function CaseLink({ concept, hero, index }: { concept: Finalist; hero: HeroKind; index: number }) {
  const destinations = [finalistHref(concept, true, hero), "/recall", "/teams-for-education"]
  return <ShinyLink href={destinations[index]}>{index === 0 ? "Read the case study" : "Read published case"}</ShinyLink>
}

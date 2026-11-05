"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { PERSON } from "@/lib/explore/content"
import { finalistHref, type Finalist, type HeroKind } from "@/lib/explore/finalists"
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
  return <footer className="fn-contact fn-chapter" id="contact">
    <p className="fn-label">A conversation starts here</p>
    <a className="fn-contact-title" href={`mailto:${PERSON.email}`}>Let’s talk. <span aria-hidden="true">↗</span></a>
    <div className="fn-footer-line"><span>{PERSON.name} / {PERSON.location}</span><Link href="/explore">Compare concepts</Link></div>
  </footer>
}

/** Viewport fractions at which a chapter's tone starts and finishes taking over the page environment. */
export type ToneBand = readonly [start: number, end: number]

/** A transparent chapter. It never paints a surface; `tone` is an anchor for the page Environment. */
export function Chapter({ children, tone, band = [1, .4], id, className = "", as: Tag = "section" }: {
  children: ReactNode; tone?: string; band?: ToneBand; id?: string; className?: string; as?: "section" | "div"
}) {
  return <Tag id={id} className={`fn-chapter ${className}`} data-env={tone} data-env-start={tone ? band[0] : undefined} data-env-end={tone ? band[1] : undefined}>
    {children}
  </Tag>
}

export function Approach({ title = PERSON.thesis }: { title?: string } = {}) {
  return <Chapter tone="graphite" band={[.95, .35]} id="approach" className="fn-approach">
    <div className="fn-approach-heading"><p className="fn-label">The approach</p><h2>{title}</h2></div>
    <p className="fn-intro">{PERSON.thesisBody}</p>
    <ol>{PERSON.principles.map((p, index) => <li key={p.label}><span className="fn-label">0{index + 1}</span><h3>{p.label}</h3><p>{p.statement}</p></li>)}</ol>
  </Chapter>
}
export function CaseLink({ concept, hero, index, publicMode = false }: { concept: Finalist; hero: HeroKind; index: number; publicMode?: boolean }) {
  const destinations = [publicMode ? "/agents-in-windows" : finalistHref(concept, true, hero), "/recall", "/teams-for-education"]
  return <ShinyLink href={destinations[index]}>{publicMode || index === 0 ? "Read the case study" : "Read published case"}</ShinyLink>
}

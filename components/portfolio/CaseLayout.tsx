"use client"

import Image from "next/image"
import { useMemo, useRef, type ReactNode } from "react"
import { motion, useTransform } from "framer-motion"
import { useReducedMotion } from "../explore/useReducedMotion"
import { useSectionProgress } from "../explore/useSectionProgress"
import { useActiveSection } from "../explore/useActiveSection"
import { RevealWords } from "../explore/RevealWords"
import { PortfolioShell } from "./PortfolioShell"
import { GooeyNavigation } from "./GooeyNavigation"
import type { ChapterLink, LedgerItem, PortfolioPage } from "./types"

type HeroImage = { src: string; alt: string; width: number; height: number; caption: string; linkToOriginal?: boolean }
const CASE_LABELS = {
  agents: "Agents in Windows",
  recall: "Windows Recall",
  teams: "Teams for Education",
  "copilot-actions": "Copilot Actions",
} satisfies Record<Exclude<PortfolioPage, "about">, string>

export function CaseLayout({ page, title, deck, call, ledger, hero, chapters, children, status }: {
  page: Exclude<PortfolioPage,"about">; title: string; deck: string; call: string;
  ledger: readonly LedgerItem[]; hero: HeroImage; chapters: readonly ChapterLink[]; children: ReactNode; status: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const progress = useSectionProgress(ref, ["start start","end .25"])
  const tilt = useTransform(progress,[0,.65],[28,0])
  const y = useTransform(progress,[0,.65],[0,-60])
  const scale = useTransform(progress,[0,.65],[.92,1])
  const ids = useMemo(() => chapters.map(chapter => chapter.id), [chapters])
  const active = useActiveSection(ids,.3)
  const image = <div className="fn-device"><Image src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} sizes="94vw" priority /></div>
  return <PortfolioShell page={page}>
    <main id="main">
      <header ref={ref} id="overview" className="fn-case-hero">
        <p className="fn-label">{CASE_LABELS[page]} / {status}</p>
        <RevealWords as="h1" className="fn-case-title" text={title} />
        <p className="fn-intro">{deck}</p>
        <div className="fn-case-product-view"><motion.figure className="fn-case-product pf-motion" style={reduce ? {rotateX:0,y:0,scale:1} : {rotateX:tilt,y,scale}}>
          {hero.linkToOriginal
            ? <a className="pf-hero-image-link" href={hero.src} target="_blank" rel="noreferrer" aria-label={`Open ${CASE_LABELS[page]} image at full size (new tab)`}>{image}</a>
            : image}
        </motion.figure></div>
        <div className="fn-case-intro"><p>{call}</p><dl className="xr-ledger">{ledger.map(item=><div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></div>
      </header>
      <div className="fn-reading-grid">
        <aside className="fn-rail pf-number-rail"><GooeyNavigation label="Case progress" current={active}>{chapters.map((chapter,index)=>{
          const number = String(index + 1).padStart(2, "0")
          return <a key={chapter.id} href={`#${chapter.id}`} data-nav-item={chapter.id}
            aria-label={`${number} of ${String(chapters.length).padStart(2, "0")}: ${chapter.label}`}
            aria-current={active===chapter.id?"location":undefined}><span>{number}</span></a>
        })}</GooeyNavigation></aside>
        <div className="fn-reading-body">{children}</div>
      </div>
    </main>
  </PortfolioShell>
}

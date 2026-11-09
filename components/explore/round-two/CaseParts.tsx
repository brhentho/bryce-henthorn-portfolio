"use client"

import Link from "next/link"
import { useId, useState, type KeyboardEvent } from "react"
import { AGENTS, PERSON, PROJECTS, homeHref, type DirectionId } from "@/lib/explore/content"
import { StudyFigure } from "./Media"

export function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number, select: (index: number) => void) {
  const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
  const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : delta === undefined ? null : (index + delta + count) % count
  if (next === null) return
  event.preventDefault()
  select(next)
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
}

export function StudioHeader({ direction, label }: { direction: DirectionId; label: string }) {
  return (
    <header className="xr-nav">
      <Link href={homeHref(direction)} className="xr-wordmark">{PERSON.name}<span>{label}</span></Link>
      <nav aria-label="Portfolio"><Link href={`${homeHref(direction)}#work`}>Selected work</Link><a href="#contact">Contact</a></nav>
    </header>
  )
}

export function StudioFooter({ direction }: { direction: DirectionId }) {
  return (
    <footer className="xr-footer" id="contact">
      <p className="xr-label">A conversation starts here</p>
      <a className="xr-contact" href={`mailto:${PERSON.email}`}>Let&apos;s talk <span aria-hidden="true">↗</span></a>
      <div className="xr-footer-bottom"><p>{PERSON.name}<br />{PERSON.role}</p>
        <Link href={homeHref(direction)}>Back to selected work ↑</Link><Link href="/explore">Compare directions</Link></div>
    </footer>
  )
}

export function Ledger() {
  return <dl className="xr-ledger">{AGENTS.ledger.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
}

export function Paragraphs({ items }: { items: readonly string[] }) {
  return <div className="xr-prose">{items.map(text => <p key={text}>{text}</p>)}</div>
}

export function ProblemPair() {
  return (
    <div className="xr-pair">
      <StudyFigure {...AGENTS.problem.fragmented} caption={AGENTS.problem.fragmented.caption} number="02.1" />
      <StudyFigure {...AGENTS.problem.visible} caption={AGENTS.problem.visible.caption} number="02.2" />
    </div>
  )
}

export function DecisionOptions({ interactive = false }: { interactive?: boolean }) {
  const [selected, setSelected] = useState(1)
  const uid = useId()
  return (
    <div className="xr-options" data-interactive={interactive}>
      <div className="xr-option-grid" role={interactive ? "tablist" : undefined} aria-label={interactive ? "Compare the three candidate homes" : undefined}>
        {AGENTS.decision.options.map((option, index) => interactive ? (
          <button key={option.code} type="button" role="tab" id={`${uid}-tab-${index}`} aria-controls={`${uid}-panel`}
            tabIndex={index === selected ? 0 : -1} aria-selected={index === selected}
            onClick={() => setSelected(index)} onKeyDown={event => moveTab(event, index, 3, setSelected)}>
            <span className="xr-label">{option.code} / {option.chosen ? "Chosen foundation" : "Alternative"}</span>
            <span className="xr-option-title">{option.option}</span>
          </button>
        ) : (
          <article key={option.code}>
            <p className="xr-label">{option.code} / {option.chosen ? "Chosen foundation" : "Alternative"}</p>
            <h3>{option.option}</h3><p>{option.tradeoff}</p><p className="xr-disposition">{option.disposition}</p>
          </article>
        ))}
      </div>
      {interactive && <div className="xr-option-panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${selected}`} tabIndex={0}>
        <p>{AGENTS.decision.options[selected].tradeoff}</p><p>{AGENTS.decision.options[selected].disposition}</p>
      </div>}
    </div>
  )
}

const FLOATING_KEYFRAME_SIZES = [
  { width: 651, height: 155 },
  { width: 640, height: 159 },
  { width: 640, height: 157 },
]

export function FrameSelector({ floating = false }: { floating?: boolean } = {}) {
  const [selected, setSelected] = useState(0)
  const uid = useId()
  const frame = AGENTS.keyframes[selected]
  const size = floating ? FLOATING_KEYFRAME_SIZES[selected] : AGENTS.keyframeSize
  return (
    <div className={`xr-frame-selector${floating ? " pf-floating-keyframes" : ""}`}>
      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${selected}`} tabIndex={0}>
        <StudyFigure {...frame} {...size} caption={frame.detail} number={`03.${selected + 1}`} />
      </div>
      <div className="xr-frame-tabs" role="tablist" aria-label="Taskbar keyframes">
        {AGENTS.keyframes.map((item, index) => (
          <button key={item.label} type="button" role="tab" id={`${uid}-tab-${index}`} aria-controls={`${uid}-panel`}
            aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)} onKeyDown={event => moveTab(event, index, 3, setSelected)}>
            <span className="xr-label">0{index + 1}</span><span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function CaseImpact() {
  return (
    <section id="impact" className="xr-section xr-impact">
      <div><p className="xr-label">What changed</p><h2>{AGENTS.impact.title}</h2><Paragraphs items={AGENTS.impact.body} /></div>
      <StudyFigure {...AGENTS.impact.figure} caption={AGENTS.impact.figure.caption} number="06" />
      <blockquote>{AGENTS.impact.quote}</blockquote>
    </section>
  )
}

export function PublishedLinks() {
  return <nav className="xr-published" aria-label="Other published case studies">{PROJECTS.slice(1).map(project =>
    <Link key={project.slug} href={project.productionHref}>{project.name}<span>Published case ↗</span></Link>
  )}</nav>
}

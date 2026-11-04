"use client"

import { useState } from "react"
import { AGENTS } from "@/lib/explore/content"
import { StudioHeader, StudioFooter, Ledger, Paragraphs, ProblemPair, FrameSelector, CaseImpact, PublishedLinks } from "../round-two/CaseParts"
import { StudyFigure, TaskbarFilm } from "../round-two/Media"
import { WorkingDemo } from "../round-two/Demo"

const ENTRIES = [
  { id: "problem", title: "The visibility gap", detail: "Fragmented / observable", code: "01" },
  { id: "decision", title: "Three possible homes", detail: "Alternatives / tradeoffs", code: "02" },
  { id: "taskbar", title: "One return point", detail: "Pin / progress / detail", code: "03" },
  { id: "states", title: "A shared language", detail: "Five states / meaningful control", code: "04" },
  { id: "impact", title: "What carried forward", detail: "Interaction model / partner teams", code: "05" },
] as const

function EvidenceMap() {
  return (
    <nav className="xf-evidence-map" aria-label="Case evidence map">
      <div className="xf-map-header"><p className="xr-label">Reading map</p><p>Choose an entry point, or read on.</p></div>
      <div className="xf-map-grid">
        <svg className="xf-map-lines" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M160 100H840M500 100V300M160 300H840" />
          <circle cx="500" cy="100" r="5" /><circle cx="500" cy="300" r="5" />
        </svg>
        {ENTRIES.map(entry => <a key={entry.id} href={`#${entry.id}`} className={`xf-map-node xf-node-${entry.code}`}>
          <span className="xr-label">{entry.code} / evidence</span><span className="xf-node-title">{entry.title}</span><span>{entry.detail}</span><span className="xf-node-arrow" aria-hidden="true">↗</span>
        </a>)}
      </div>
      <p className="xf-map-caption">Editorial connections between the artifacts below, not a product architecture diagram.</p>
    </nav>
  )
}

function DecisionBranches() {
  const [selected, setSelected] = useState(1)
  return (
    <div className="xf-branches">
      <div className="xf-branch-controls" aria-label="Focus a candidate home">
        <p className="xr-label">Focus a candidate</p>
        {AGENTS.decision.options.map((option, index) => <button type="button" key={option.code}
          aria-pressed={selected === index} aria-controls={`candidate-${option.code}`} onClick={() => setSelected(index)}>
          {option.code} / {option.option}
        </button>)}
      </div>
      <div className="xf-branch-grid">{AGENTS.decision.options.map((option, index) => (
        <article id={`candidate-${option.code}`} key={option.code} data-focused={selected === index}>
          <p className="xr-label">{option.chosen ? "Chosen foundation" : "Alternative"}</p>
          <h3>{option.option}</h3><p>{option.tradeoff}</p><p>{option.disposition}</p>
          {option.chosen && <a className="xr-link" href="#taskbar">Inspect the taskbar <span aria-hidden="true">↓</span></a>}
        </article>
      ))}</div>
    </div>
  )
}

export function FCase() {
  return (
    <>
      <a className="xp-skip" href="#context">Skip to case study</a>
      <StudioHeader direction="direction-f" label="Design atlas / Agents in Windows" />
      <main id="main" className="xr-shell">
        <header className="xf-case-hero"><p className="xr-label">Agents in Windows / design record</p>
          <h1 className="xr-title-arrive">{AGENTS.title}</h1><p className="xr-intro">{AGENTS.lede}</p><Ledger /></header>
        <EvidenceMap />
        <section id="context" className="xr-section xf-context">
          <div><p className="xr-label">Context</p><h2>{AGENTS.context.title}</h2><Paragraphs items={AGENTS.context.body} /></div>
          <StudyFigure {...AGENTS.context.figure} number="01" />
        </section>
        <section id="problem" className="xr-section">
          <div className="xf-section-heading"><p className="xr-label">01 / problem evidence</p><h2>{AGENTS.problem.thesis}</h2></div>
          <ProblemPair /><Paragraphs items={AGENTS.problem.body} />
        </section>
        <section id="decision" className="xr-section">
          <div className="xf-section-heading"><p className="xr-label">02 / alternatives</p><h2>{AGENTS.decision.title}</h2></div>
          <Paragraphs items={AGENTS.decision.body} /><DecisionBranches />
        </section>
        <section id="taskbar" className="xr-section">
          <div className="xf-section-heading"><p className="xr-label">03 / interaction evidence</p><h2>{AGENTS.taskbar.title}</h2></div>
          <FrameSelector /><Paragraphs items={AGENTS.taskbar.body} /><TaskbarFilm />
        </section>
        <section id="states" className="xr-section">
          <div className="xf-section-heading"><p className="xr-label">04 / state language</p><h2>{AGENTS.simulation.title}</h2></div>
          <WorkingDemo />
        </section>
        <CaseImpact /><PublishedLinks />
      </main>
      <StudioFooter direction="direction-f" />
    </>
  )
}

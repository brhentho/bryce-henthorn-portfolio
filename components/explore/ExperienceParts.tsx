"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, type ReactNode } from "react"
import { AGENTS, PERSON, PROJECTS, caseHref, homeHref, type DirectionId } from "@/lib/explore/content"
import { ContinuityLink } from "./ContinuityLink"
import { useActiveSection } from "./useActiveSection"
import { useReducedMotion } from "./useReducedMotion"
import { NumberPop } from "./effects/NumberPop"
import { Paragraphs } from "./round-two/CaseParts"
import { StudyFigure } from "./round-two/Media"

export function ExperienceHeader({ direction, children }: { direction: DirectionId; children?: ReactNode }) {
  return <header className="x3-nav">
    <Link href={homeHref(direction)} className="x3-name">{PERSON.name}<span>{PERSON.role}</span></Link>
    {children ?? <nav aria-label="Portfolio"><Link href={`${homeHref(direction)}#work`}>Work</Link><a href="#contact">Contact</a></nav>}
  </header>
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const node = ref.current
    if (!node || reduce) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.entered = ""; observer.disconnect() }
    }, { threshold: .12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce])
  return <div ref={ref} className={`x3-reveal ${className}`}>{children}</div>
}

export function ProjectLink({ index, direction, className = "xr-link" }: { index: number; direction: DirectionId; className?: string }) {
  const project = PROJECTS[index]
  return index === 0
    ? <ContinuityLink pointerOnly className={className} href={caseHref(direction)}>Read the case <span aria-hidden="true">↗</span></ContinuityLink>
    : <Link className={className} href={project.productionHref}>Read published case <span aria-hidden="true">↗</span></Link>
}

export function HeroArtifact({ direction }: { direction: DirectionId }) {
  return <figure className="x3-hero-artifact">
    <Image {...{ src: AGENTS.hero.src, alt: AGENTS.hero.alt, width: AGENTS.hero.width, height: AGENTS.hero.height }}
      priority sizes="90vw" style={{ viewTransitionName: `${direction}-artifact` }} />
    <figcaption className="xr-label">Fig. 01 / Agents in Windows / product prototype</figcaption>
  </figure>
}

const CHAPTERS = [
  ["context", "Context"], ["problem", "Problem"], ["decision", "Decision"],
  ["taskbar", "Taskbar"], ["states", "States"], ["constraints", "Constraints"],
  ["invocation", "Invocation"], ["impact", "Impact"],
] as const
const CHAPTER_IDS = CHAPTERS.map(([id]) => id)
const EVIDENCE_CHAPTERS = [CHAPTERS[0], CHAPTERS[1], CHAPTERS[3], CHAPTERS[2], ...CHAPTERS.slice(4)]
const EVIDENCE_IDS = EVIDENCE_CHAPTERS.map(([id]) => id)

export function CaseContents({ className = "", evidenceFirst = false }: { className?: string; evidenceFirst?: boolean }) {
  const chapters = evidenceFirst ? EVIDENCE_CHAPTERS : CHAPTERS
  const ids = evidenceFirst ? EVIDENCE_IDS : CHAPTER_IDS
  const active = useActiveSection(ids, .4)
  const selected = Math.max(0, ids.findIndex(id => id === active))
  return <nav className={`x3-contents ${className}`} aria-label="Case contents">
    <span className="xr-label"><NumberPop value={String(selected + 1).padStart(2, "0")} /> / 08</span>
    {chapters.map(([id, title]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{title}</a>)}
  </nav>
}

export function Constraints() {
  return <section id="constraints" className="xr-section x3-constraints">
    <div><p className="xr-label">The platform constraint</p><h2>Windows ships once.<br />Agents ship constantly.</h2>
      <Paragraphs items={[
        "Windows updates quarterly. You can't iterate freely like a web app. Every change goes to hundreds of millions of devices and has to stay working for years. So when you're building a pattern that agents will use, you're betting big. You can't just redesign it next sprint if you guessed wrong.",
        "Meanwhile every product team at Microsoft is building agents and wants the same rich monitoring they get inside their apps. They pushed for detailed progress views, custom visualizations, team-specific features. But the OS can't be all of that. It has to be a consistent surface that works identically whether you're running a research agent or a calendar agent or something brand new.",
        "So we built a tense thing. Flexible enough to support agents we haven't even imagined yet. Simple enough to stay stable across years.",
      ]} /></div>
    <StudyFigure src="/images/agents/constraints-desktop.png" alt="Windows desktop showing multiple agent interactions across the system" width={1648} height={930} caption="Multiple agents, one consistent Windows surface." number="05" />
  </section>
}

export function Invocation() {
  return <section id="invocation" className="xr-section x3-invocation">
    <p className="xr-label">A clear starting point</p><h2>Ask Copilot becomes the starting point</h2>
    <Paragraphs items={[
      "Ask Copilot is Windows Search plus Copilot. One place to type questions, run actions, launch anything. We built agents directly into it. Type @, pick an agent, send it work. Invoke it from the OS, not from inside some app; the agent keeps running after you close the chat.",
      "Now the system has a clear shape. Ask Copilot is where you start agents; the taskbar is where they live while running. Agents aren't stuck inside individual apps anymore. They're creatures of the OS itself.",
    ]} />
    <figure className="x3-invocation-film">
      <video controls playsInline preload="none" poster="/images/agents/composer-poster.jpg"
        aria-label="Ask Copilot composer invoking an agent with the at sign"
        src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/Composer.mp4" />
      <figcaption className="xr-label">Fig. 06 / Type @, choose an agent, dispatch work. The taskbar is its return point.</figcaption>
    </figure>
  </section>
}

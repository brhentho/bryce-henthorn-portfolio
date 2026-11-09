"use client"

import Image from "next/image"
import Link, { useEnhanced } from "../Treatment"
import { TyndallLight } from "../effects/Artwork"
import { useRef, type CSSProperties, type MouseEvent } from "react"
import { motion, useTransform } from "framer-motion"
import { useReducedMotion } from "../useReducedMotion"
import { useSectionProgress } from "../useSectionProgress"
import { LoopingMedia } from "@/components/manual/LoopingMedia"
import { ExploreFooter } from "@/components/explore/ExploreFooter"
import { RevealWords } from "@/components/explore/RevealWords"
import { SimCard, SimDisclaimer, SimIntent, SimStates } from "@/components/explore/SimParts"
import { useActiveSection } from "@/components/explore/useActiveSection"
import { useMediaQuery } from "@/components/explore/useMediaQuery"
import { AGENTS, PROJECTS, homeHref } from "@/lib/explore/content"
import { useAgentSim } from "@/lib/explore/simulation"

const CHAPTERS = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "decision", label: "Decision" },
  { id: "taskbar", label: "Taskbar" },
  { id: "states", label: "Simulation" },
  { id: "impact", label: "Impact" },
] as const
const CHAPTER_IDS = CHAPTERS.map((c) => c.id)
const SHEET_IDS = AGENTS.keyframes.map((_, i) => `keyframe-${i + 1}`)
const agents = PROJECTS[0]

export function ACase() {
  const enhanced = useEnhanced()
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const scrollYProgress = useSectionProgress(heroRef, ["start start", "end start"])
  const atmosY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const active = useActiveSection(CHAPTER_IDS, 0.35)

  return (
    <div className="xa xa-case" data-tone="agents">
      <div className="xa-backdrop" aria-hidden="true">
        <div
          className="xa-tone"
          data-for="agents"
          style={{ background: `radial-gradient(80% 60% at 80% 10%, ${agents.tone.lift} 0%, ${agents.tone.base} 60%), ${agents.tone.base}` }}
        />
      </div>
      <a className="xp-skip" href="#context">Skip to the case study</a>

      <header ref={heroRef} className="xa-case-hero">
        <motion.div className="xa-case-atmos" style={reduce ? undefined : { y: atmosY }} aria-hidden="true">
          <Image src={agents.atmosphere} alt="" fill priority sizes="100vw" className="xp-cover" />
          {enhanced && <TyndallLight />}
        </motion.div>
        <motion.div style={reduce ? undefined : { y: titleY }} className="xa-chapter-head">
          <p className="xp-mono">{AGENTS.eyebrow}</p>
          <RevealWords as="h1" className="xp-display xa-case-title" text={AGENTS.title} delay={80} />
        </motion.div>
        <div className="xa-case-hero-grid">
          <figure className="xa-case-hero-plate">
            <Image
              src={AGENTS.hero.src}
              alt={AGENTS.hero.alt}
              width={AGENTS.hero.width}
              height={AGENTS.hero.height}
              priority
              sizes="(min-width: 1000px) 58vw, 100vw"
              style={{ viewTransitionName: "xa-agents-hero" }}
            />
          </figure>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <p className="xp-lede">{AGENTS.lede}</p>
            <p className="xp-lede" style={{ color: "var(--text-primary)" }}>{AGENTS.call}</p>
            <dl className="xa-ledger">
              {AGENTS.ledger.map((row) => (
                <div key={row.label}>
                  <dt className="xp-mono">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <div className="xa-case-body">
        <nav className="xa-index" aria-label="Chapters">
          <div className="xa-index-inner">
            <p className="xp-mono">Agents in Windows</p>
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} aria-current={active === c.id ? "location" : undefined}>
                    <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span>{c.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <main id="main">
          <nav className="xa-contents" aria-label="Contents">
            <p className="xp-mono">Contents</p>
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>
                    <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span>
                    {c.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Context />
          <Problem />
          <Decision />
          <Taskbar />
          <Simulation />
          <Impact />

          <nav className="xa-next" aria-label="More work">
            <p className="xp-mono">Continue</p>
            <div className="xa-next-links">
              <Link className="xp-btn" href={homeHref("direction-a")}>
                <span aria-hidden="true">←</span> Direction A home
              </Link>
              {PROJECTS.slice(1).map((p) => (
                <Link key={p.slug} className="xp-btn" href={p.productionHref}>
                  {p.name} · published <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </nav>
        </main>
      </div>
      <ExploreFooter />
    </div>
  )
}

function Fig({
  src,
  alt,
  width,
  height,
  caption,
  label,
  plane,
  style,
}: {
  src: string
  alt: string
  width: number
  height: number
  caption: string
  label?: string
  plane?: "back" | "front"
  style?: CSSProperties
}) {
  return (
    <figure className="xa-fig" data-plane={plane} style={style}>
      {label && <span className="xp-mono xa-fig-label">{label}</span>}
      <div style={{ position: "relative" }}>
        <span className="xa-fig-ghost" aria-hidden="true" />
        <div className="xa-fig-frame">
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
      </div>
      <figcaption className="xp-caption">{caption}</figcaption>
    </figure>
  )
}

function Context() {
  const c = AGENTS.context
  return (
    <section id="context" className="xa-chapter" aria-labelledby="context-title">
      <div className="xa-chapter-head">
        <p className="xp-mono">01 · Context</p>
        <h2 id="context-title" className="xp-h1">{c.title}</h2>
      </div>
      <div className="xa-two">
        <div>
          {c.body.map((p) => (
            <p key={p.slice(0, 16)} className="xp-body">{p}</p>
          ))}
        </div>
        <Fig {...c.figure} />
      </div>
    </section>
  )
}

function Problem() {
  const p = AGENTS.problem
  const reduce = useReducedMotion()
  const wide = useMediaQuery("(min-width: 900px)")
  const ref = useRef<HTMLDivElement>(null)
  const scrollYProgress = useSectionProgress(ref, ["start 0.95", "center 0.5"])
  const y = useTransform(scrollYProgress, [0, 1], ["38%", "0%"])
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "0%"])
  const backOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55])
  const animate = wide && !reduce

  return (
    <section id="problem" className="xa-chapter" aria-labelledby="problem-title">
      <div className="xa-chapter-head">
        <p className="xp-mono">02 · Problem</p>
        <h2 id="problem-title" className="xp-h1 xa-thesis-quote">{p.thesis}</h2>
      </div>
      <div className="xa-two">
        {p.body.map((b) => (
          <p key={b.slice(0, 16)} className="xp-body">{b}</p>
        ))}
      </div>
      <div ref={ref} className="xa-overlap">
        <motion.div style={animate ? { opacity: backOpacity } : undefined}>
          <Fig {...p.fragmented} label={`Before · ${p.fragmented.label}`} plane="back" />
        </motion.div>
        <motion.div style={animate ? { x, y } : undefined}>
          <Fig {...p.visible} label={`After · ${p.visible.label}`} plane="front" />
        </motion.div>
      </div>
    </section>
  )
}

function Decision() {
  const d = AGENTS.decision
  const listRef = useRef<HTMLOListElement>(null)
  const activeSheet = useActiveSection(SHEET_IDS, 0.45)

  function goSheet(event: MouseEvent<HTMLAnchorElement>, index: number) {
    const list = listRef.current
    if (!list) return
    event.preventDefault()
    const items = Array.from(list.children) as HTMLElement[]
    const styles = getComputedStyle(list)
    const gap = parseFloat(styles.rowGap) || 0
    let offset = 0
    for (let j = 0; j < index; j++) offset += items[j].offsetHeight + gap
    const stickTop = parseFloat(getComputedStyle(items[index]).top)
    const top = list.getBoundingClientRect().top + window.scrollY + offset - (Number.isFinite(stickTop) ? stickTop : 16)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" })
    history.replaceState(null, "", `#${SHEET_IDS[index]}`)
    items[index].focus({ preventScroll: true })
  }

  return (
    <section id="decision" className="xa-chapter" aria-labelledby="decision-title">
      <div className="xa-chapter-head">
        <p className="xp-mono">03 · Decision</p>
        <h2 id="decision-title" className="xp-h1">{d.title}</h2>
      </div>
      <div className="xa-two">
        {d.body.map((b) => (
          <p key={b.slice(0, 16)} className="xp-body">{b}</p>
        ))}
      </div>
      <ol className="xa-options" aria-label="Directions tested">
        {d.options.map((o) => (
          <li key={o.code} className={`xa-option ${o.chosen ? "xp-invert" : ""}`} data-chosen={o.chosen ? "true" : undefined}>
            <p className="xp-mono">{o.code}{o.chosen ? " · chosen" : ""}</p>
            <p className="xp-h3">{o.option}</p>
            <dl>
              <div>
                <dt className="xp-mono">Tradeoff</dt>
                <dd className="xp-body-sm">{o.tradeoff}</dd>
              </div>
              <div>
                <dt className="xp-mono">Disposition</dt>
                <dd className="xp-body-sm">{o.disposition}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>

      <div className="xa-chapter-head" style={{ marginTop: "2rem" }}>
        <h3 className="xp-h2">How the pin evolved</h3>
        <nav aria-label="Keyframes" className="xa-sheets-nav">
          {AGENTS.keyframes.map((k, i) => (
            <a
              key={k.label}
              href={`#${SHEET_IDS[i]}`}
              className="xp-btn"
              aria-current={activeSheet === SHEET_IDS[i] ? "step" : undefined}
              onClick={(e) => goSheet(e, i)}
            >
              {String(i + 1).padStart(2, "0")} {k.label}
            </a>
          ))}
        </nav>
      </div>
      <ol ref={listRef} className="xa-sheets">
        {AGENTS.keyframes.map((k, i) => (
          <li key={k.label} id={SHEET_IDS[i]} className="xa-sheet" style={{ "--i": i } as CSSProperties} tabIndex={-1}>
            <div className="xa-sheet-meta">
              <p className="xp-mono">Keyframe {String(i + 1).padStart(2, "0")} / 03</p>
              <p className="xp-h3">{k.label}</p>
            </div>
            <Image src={k.src} alt={k.alt} width={AGENTS.keyframeSize.width} height={AGENTS.keyframeSize.height} sizes="(min-width: 1100px) 70vw, 100vw" />
            <p className="xp-body-sm">{k.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Taskbar() {
  const t = AGENTS.taskbar
  return (
    <section id="taskbar" className="xa-chapter" aria-labelledby="taskbar-title">
      <div className="xa-chapter-head">
        <p className="xp-mono">04 · Taskbar</p>
        <h2 id="taskbar-title" className="xp-h1">{t.title}</h2>
      </div>
      <div className="xa-two">
        {t.body.map((b) => (
          <p key={b.slice(0, 16)} className="xp-body">{b}</p>
        ))}
      </div>
      <figure className="xa-fig">
        <div style={{ position: "relative" }}>
          <span className="xa-fig-ghost" aria-hidden="true" />
          <div className="xa-fig-frame">
            <LoopingMedia src={t.video} poster={t.poster} label={t.videoLabel} description={t.videoCaption} />
          </div>
        </div>
        <figcaption className="xp-caption">{t.videoCaption}</figcaption>
      </figure>
      <ul className="xa-lexicon" aria-label="Agent states">
        {AGENTS.states.map((s) => (
          <li key={s.key}>
            <img src={s.src} width={32} height={32} alt="" />
            <span className="xp-mono">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Simulation() {
  const sim = useAgentSim()
  return (
    <section id="states" className="xa-chapter" aria-labelledby="states-title">
      <div className="xa-chapter-head">
        <p className="xp-mono">05 · Simulation</p>
        <h2 id="states-title" className="xp-h1">{AGENTS.simulation.title}</h2>
      </div>
      <div className="xa-sim xp-invert">
        <SimStates sim={sim} />
        <div className="xa-sim-split">
          <SimCard sim={sim} />
          <div style={{ display: "grid", gap: "2rem", alignContent: "start" }}>
            <SimIntent sim={sim} />
            <dl className="xa-ledger" style={{ gridTemplateColumns: "1fr" }}>
              <div><dt className="xp-mono">State</dt><dd>What is happening?</dd></div>
              <div><dt className="xp-mono">Control</dt><dd>What can I do next?</dd></div>
              <div><dt className="xp-mono">Continuity</dt><dd>Where can I return to the work?</dd></div>
            </dl>
          </div>
        </div>
        <SimDisclaimer />
      </div>
    </section>
  )
}

function Impact() {
  const im = AGENTS.impact
  return (
    <section id="impact" className="xa-chapter" aria-labelledby="impact-title">
      <div className="xa-chapter-head">
        <p className="xp-mono">06 · Impact</p>
        <h2 id="impact-title" className="xp-h2">{im.title}</h2>
      </div>
      <blockquote className="xa-quote xp-h1">“{im.quote.replace(/^“|”$/g, "")}”</blockquote>
      <div className="xa-two">
        <div>
          {im.body.map((b) => (
            <p key={b.slice(0, 16)} className="xp-body">{b}</p>
          ))}
        </div>
        <Fig {...im.figure} />
      </div>
      <dl className="xa-facts">
        {im.facts.map((f) => (
          <div key={f.label}>
            <dt>
              {f.value}
              <span>{f.unit}</span>
            </dt>
            <dd className="xp-body-sm">{f.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

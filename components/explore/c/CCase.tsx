"use client"

import Image from "next/image"
import Link, { useEnhanced } from "../Treatment"
import { Artwork } from "../effects/Artwork"
import { ResponseReplay } from "../effects/ResponseReplay"
import { useRef, useState, type KeyboardEvent } from "react"
import {
  type MotionValue,
  motion,
  useMotionValueEvent,
  useTransform,
} from "framer-motion"
import { useReducedMotion } from "../useReducedMotion"
import { useHashAfterLayout } from "../useHashAfterLayout"
import { useSectionProgress } from "../useSectionProgress"
import { LoopingMedia } from "@/components/manual/LoopingMedia"
import { ExploreFooter } from "@/components/explore/ExploreFooter"
import { RevealWords } from "@/components/explore/RevealWords"
import { SimCard, SimDisclaimer, SimIntent, SimStates } from "@/components/explore/SimParts"
import { goToSection, useActiveSection } from "@/components/explore/useActiveSection"
import { useMediaQuery } from "@/components/explore/useMediaQuery"
import { AGENTS, PROJECTS, homeHref } from "@/lib/explore/content"
import { useAgentSim } from "@/lib/explore/simulation"

const agents = PROJECTS[0]
const CHAPTERS = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "decision", label: "Decision" },
  { id: "taskbar", label: "Taskbar" },
  { id: "states", label: "Simulation" },
  { id: "impact", label: "Impact" },
] as const
const CHAPTER_IDS = ["top", ...CHAPTERS.map((c) => c.id)]
const ease = [0.16, 1, 0.3, 1] as const

function useSpatial() {
  const reduce = useReducedMotion()
  const wide = useMediaQuery("(min-width: 900px)", true)
  useHashAfterLayout(!reduce && wide ? "spatial" : "static", "spatial")
  return { reduce: !!reduce, spatial: !reduce && wide }
}

export function CCase() {
  const active = useActiveSection(CHAPTER_IDS, 0.45)
  const activeIndex = CHAPTERS.findIndex((c) => c.id === active)

  return (
    <div className="xc xc-case">
      <a className="xp-skip" href="#context">Skip to the case study</a>
      <Hero />
      <main id="main">
        <Intro />
        <Context />
        <Problem />
        <Decision />
        <Taskbar />
        <Simulation />
        <Impact />
        <nav className="xc-next" aria-label="More work">
          <Link className="xp-btn" href={homeHref("direction-c")}>
            <span aria-hidden="true">←</span> Back to the work
          </Link>
          {PROJECTS.slice(1).map((p) => (
            <Link key={p.slug} className="xp-btn" href={p.productionHref}>
              {p.name} · published <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </main>
      <ExploreFooter />

      <nav className="xc-gauge" aria-label="Chapters" data-dormant={activeIndex < 0 ? "" : undefined}>
        <span className="xc-gauge-track" aria-hidden="true">
          <span className="xc-gauge-fill" style={{ transform: `scaleY(${(activeIndex + 1) / CHAPTERS.length})` }} />
        </span>
        <ol>
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={active === c.id ? "location" : undefined}>
                <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="xc-gauge-label">{c.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

/** The hero image arrives as a tilted plane and settles flat as the reader moves in. */
function Hero() {
  const enhanced = useEnhanced()
  const { reduce } = useSpatial()
  const ref = useRef<HTMLElement>(null)
  const scrollYProgress = useSectionProgress(ref, ["start start", "end start"])
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [28, 0])
  const y = useTransform(scrollYProgress, [0, 0.6], ["0px", "-60px"])

  return (
    <header id="top" ref={ref} className="xc-case-hero">
      {enhanced ? <Artwork kind="moss" className="xc-ambient" /> : <div className="xc-horizon" aria-hidden="true" />}
      <div className="xc-case-hero-copy">
        <p className="xp-mono">{AGENTS.eyebrow}</p>
        <RevealWords as="h1" className="xp-display xc-case-title" text={AGENTS.title} delay={100} />
        <p className="xp-lede xp-measure">{AGENTS.lede}</p>
      </div>
      <div className="xc-plate-view">
        <motion.figure
          className="xc-plate"
          style={{ rotateX: reduce ? 0 : rotateX, y: reduce ? 0 : y, viewTransitionName: "xc-plate" }}
        >
          <Image src={AGENTS.hero.src} alt={AGENTS.hero.alt} width={AGENTS.hero.width} height={AGENTS.hero.height} priority sizes="(min-width: 1300px) 1200px, 94vw" />
        </motion.figure>
      </div>
    </header>
  )
}

function Intro() {
  return (
    <section className="xc-intro" aria-label="Overview">
      <p className="xp-h2">{AGENTS.call}</p>
      <dl className="xc-ledger">
        {AGENTS.ledger.map((row) => (
          <div key={row.label}>
            <dt className="xp-mono">{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <nav className="xc-toc" aria-label="In this case study">
        {CHAPTERS.map((c, i) => (
          <a key={c.id} href={`#${c.id}`}>
            <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span> {c.label}
          </a>
        ))}
      </nav>
    </section>
  )
}

function ChapterHead({ n, id, title }: { n: number; id: string; title: string }) {
  return (
    <div className="xc-chapter-head">
      <p className="xp-mono">{String(n).padStart(2, "0")} · {CHAPTERS[n - 1].label}</p>
      <h2 id={`${id}-title`} className="xp-h1">{title}</h2>
    </div>
  )
}

function Context() {
  const c = AGENTS.context
  return (
    <section id="context" className="xc-chapter" aria-labelledby="context-title">
      <ChapterHead n={1} id="context" title={c.title} />
      <div className="xc-cols">
        <div>{c.body.map((p) => <p key={p.slice(0, 16)} className="xp-body">{p}</p>)}</div>
        <figure className="xc-frame xc-frame-tilt">
          <Image src={c.figure.src} alt={c.figure.alt} width={c.figure.width} height={c.figure.height} sizes="(min-width: 900px) 45vw, 100vw" />
          <figcaption className="xp-caption">{c.figure.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ── Problem: scattered planes converge into one Windows plane ── */

const PLANES = ["Agent 1", "Agent 2", "Agent 3", "Agent 4"]
const STEPS = [
  { id: "problem-fragmented", key: "fragmented" as const },
  { id: "problem-observable", key: "visible" as const },
]

function Problem() {
  const p = AGENTS.problem
  const { spatial } = useSpatial()
  return (
    <section id="problem" className="xc-chapter" aria-labelledby="problem-title">
      <ChapterHead n={2} id="problem" title={p.thesis} />
      <div className="xc-cols">
        {p.body.map((b) => <p key={b.slice(0, 16)} className="xp-body">{b}</p>)}
      </div>
      {spatial && <ConvergeScene />}
      <div className="xc-diagrams">
        <p className="xp-mono">Original diagrams</p>
        <div className="xc-cols">
          {STEPS.map(({ id, key }) => (
            <figure key={key} id={spatial ? undefined : id} className="xc-frame">
              <Image src={p[key].src} alt={p[key].alt} width={p[key].width} height={p[key].height} sizes="(min-width: 900px) 45vw, 100vw" />
              <figcaption className="xp-caption"><span className="xp-mono">{p[key].label}</span> · {p[key].caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function ConvergeScene() {
  const p = AGENTS.problem
  const ref = useRef<HTMLDivElement>(null)
  const scrollYProgress = useSectionProgress(ref, ["start start", "end end"])
  const t = useTransform(scrollYProgress, [0.15, 0.75], [0, 1], { clamp: true })
  const e = useTransform(t, (v) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2))
  const [step, setStep] = useState(0)
  useMotionValueEvent(t, "change", (v) => {
    const next = v >= 0.5 ? 1 : 0
    setStep((prev) => (prev === next ? prev : next))
  })

  const rotateX = useTransform(e, [0, 1], [56, 14])
  const rotateZ = useTransform(e, [0, 1], [-32, 0])
  const winZ = useTransform(e, [0, 1], [-140, 0])
  const winOpacity = useTransform(e, [0, 1], [0.35, 1])
  const barOpacity = useTransform(e, [0.55, 1], [0, 1])

  return (
    <div ref={ref} className="xc-converge" role="group" aria-label="From fragmented to observable">
      {STEPS.map((s, i) => (
        <span key={s.id} id={s.id} className="xc-marker" style={{ top: `calc((100% - 100svh) * ${i === 0 ? 0.05 : 0.85})` }} aria-hidden="true" />
      ))}
      <div className="xc-converge-sticky">
        <div className="xc-converge-rail">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="xc-step"
              aria-pressed={step === i}
              onClick={() => goToSection(s.id, 0)}
            >
              <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="xp-h3">{p[s.key].label}</span>
            </button>
          ))}
          <p className="xp-body-sm xc-converge-caption" aria-live="polite">{p[STEPS[step].key].caption}</p>
        </div>
        <div className="xc-converge-view" aria-hidden="true">
          <motion.div className="xc-floor" style={{ rotateX, rotateZ }}>
            <motion.div className="xc-os" style={{ z: winZ, opacity: winOpacity }}>
              <span className="xp-mono xc-os-label">Windows</span>
              <motion.span className="xc-os-bar" style={{ opacity: barOpacity }} />
            </motion.div>
            {PLANES.map((label, i) => (
              <AgentPlane key={label} label={label} index={i} progress={e} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function AgentPlane({ label, index, progress }: { label: string; index: number; progress: MotionValue<number> }) {
  // Fragmented: spread as separate windows hovering above the floor.
  // Observable: shrunk into tiles that sit on the Windows taskbar.
  const fromX = (index - 1.5) * 112
  const toX = (index - 1.5) * 26
  const x = useTransform(progress, (v) => `${fromX + (toX - fromX) * v}%`)
  const y = useTransform(progress, (v) => `${(index % 2 ? -16 : 12) * (1 - v) + 130 * v}%`)
  const z = useTransform(progress, (v) => 90 + index * 26 - (90 + index * 26 - 6) * v)
  const scale = useTransform(progress, [0, 1], [1, 0.16])
  const labelOpacity = useTransform(progress, [0, 0.4], [1, 0])
  return (
    <motion.div className="xc-agent-plane" style={{ x, y, z, scale }}>
      <span className="xc-agent-dot" />
      <motion.span className="xp-mono" style={{ opacity: labelOpacity }}>{label}</motion.span>
    </motion.div>
  )
}

/* ── Decision: three homes as planes; the selected one comes forward ── */

function Decision() {
  const d = AGENTS.decision
  const [selected, setSelected] = useState(1)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const { reduce } = useSpatial()
  const o = d.options[selected]

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = i
    if (e.key in map) next = (i + map[e.key] + d.options.length) % d.options.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = d.options.length - 1
    else return
    e.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="decision" className="xc-chapter" aria-labelledby="decision-title">
      <ChapterHead n={3} id="decision" title={d.title} />
      <div className="xc-cols">
        {d.body.map((b) => <p key={b.slice(0, 16)} className="xp-body">{b}</p>)}
      </div>
      <p className="xp-mono" id="xc-homes-label">Three homes we tested · select one</p>
      <div className="xc-homes" role="tablist" aria-labelledby="xc-homes-label">
        {d.options.map((opt, i) => {
          const offset = i - selected
          return (
            <motion.button
              key={opt.code}
              ref={(el) => { tabs.current[i] = el }}
              type="button"
              role="tab"
              id={`xc-tab-${opt.code}`}
              aria-selected={selected === i}
              aria-controls="xc-home-panel"
              tabIndex={selected === i ? 0 : -1}
              className="xc-home"
              onClick={() => setSelected(i)}
              onKeyDown={(e) => onKey(e, i)}
              initial={false}
              animate={reduce ? undefined : { rotateY: offset * -16, z: offset === 0 ? 60 : -40, opacity: offset === 0 ? 1 : 0.62 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="xp-mono">{opt.code}{opt.chosen ? " · chosen" : ""}</span>
              <span className="xp-h3">{opt.option}</span>
            </motion.button>
          )
        })}
      </div>
      <div id="xc-home-panel" role="tabpanel" aria-labelledby={`xc-tab-${o.code}`} className="xc-home-panel">
        <dl>
          <div><dt className="xp-mono">Tradeoff</dt><dd className="xp-body">{o.tradeoff}</dd></div>
          <div><dt className="xp-mono">Disposition</dt><dd className="xp-body">{o.disposition}</dd></div>
        </dl>
      </div>
    </section>
  )
}

/* ── Taskbar: keyframes fan out from a stack, then the real motion ── */

function Taskbar() {
  const t = AGENTS.taskbar
  const { reduce } = useSpatial()
  return (
    <section id="taskbar" className="xc-chapter" aria-labelledby="taskbar-title">
      <ChapterHead n={4} id="taskbar" title={t.title} />
      <div className="xc-cols">
        {t.body.map((b) => <p key={b.slice(0, 16)} className="xp-body">{b}</p>)}
      </div>
      <ol className="xc-keyframes" aria-label="Taskbar evolution keyframes">
        {AGENTS.keyframes.map((kf, i) => (
          <motion.li
            key={kf.label}
            className="xc-keyframe"
            initial={reduce ? false : { opacity: 0, y: -(i * 70), rotateX: 32, z: -i * 60 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0, z: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease, delay: i * 0.12 }}
          >
            <figure className="xc-frame">
              <Image src={kf.src} alt={kf.alt} width={AGENTS.keyframeSize.width} height={AGENTS.keyframeSize.height} sizes="(min-width: 900px) 651px, 100vw" />
            </figure>
            <div>
              <p className="xp-mono">Keyframe {String(i + 1).padStart(2, "0")} · {kf.label}</p>
              <p className="xp-body-sm">{kf.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>
      <figure className="xc-frame">
        <LoopingMedia src={t.video} poster={t.poster} label={t.videoLabel} description={t.videoCaption} />
        <figcaption className="xp-caption">{t.videoCaption}</figcaption>
      </figure>
    </section>
  )
}

/* ── Simulation: a dimensional taskbar; the agent icon raises the card ── */

const TRAY = ["Start", "Search", "Files", "Browser", "Mail"]

function Simulation() {
  const enhanced = useEnhanced()
  const sim = useAgentSim()
  const [open, setOpen] = useState(true)
  const { reduce } = useSpatial()

  return (
    <section id="states" className="xc-chapter" aria-labelledby="states-title">
      <ChapterHead n={5} id="states" title={AGENTS.simulation.title} />
      <SimStates sim={sim} />
      <div className="xc-desk" style={{ ["--glow" as string]: sim.current.tone }}>
        <div className="xc-desk-glow" aria-hidden="true" />
        <div className="xc-desk-stage">
          <motion.div
            id="xc-agent-card"
            className="xc-raised"
            initial={false}
            animate={open ? { opacity: 1, y: 0, z: 40, rotateX: 0 } : { opacity: 0, y: 24, z: 0, rotateX: 12 }}
            transition={{ duration: reduce ? 0 : 0.45, ease }}
            style={{ pointerEvents: open ? "auto" : "none" }}
            aria-hidden={!open}
            inert={!open}
          >
            <SimCard sim={sim} numberMotion={enhanced} />
          </motion.div>
          <div className="xc-taskbar">
            {TRAY.map((label) => (
              <span key={label} className="xc-tray-icon" aria-hidden="true" title={label} />
            ))}
            <button
              type="button"
              className="xc-agent-icon"
              aria-expanded={open}
              aria-controls="xc-agent-card"
              onClick={() => setOpen((v) => !v)}
            >
              <img src={sim.current.asset} width={28} height={28} alt="" />
              <span className="sr-only">Research agent, {sim.current.label}. {open ? "Hide" : "Show"} progress card</span>
              <span className="xc-agent-pip" aria-hidden="true" />
            </button>
          </div>
        </div>
        <SimIntent sim={sim} className="xc-desk-intent" />
      </div>
      <p className="xp-caption">Select the agent icon in the taskbar to raise or lower its progress card. The other taskbar shapes are placeholders.</p>
      <SimDisclaimer />
      {enhanced && <ResponseReplay />}
    </section>
  )
}

function Impact() {
  const im = AGENTS.impact
  return (
    <section id="impact" className="xc-chapter" aria-labelledby="impact-title">
      <ChapterHead n={6} id="impact" title={im.title} />
      <blockquote className="xp-h1 xc-quote">“{im.quote}”</blockquote>
      <div className="xc-cols">
        <div>{im.body.map((b) => <p key={b.slice(0, 16)} className="xp-body">{b}</p>)}</div>
        <figure className="xc-frame xc-frame-tilt">
          <Image src={im.figure.src} alt={im.figure.alt} width={im.figure.width} height={im.figure.height} sizes="(min-width: 900px) 45vw, 100vw" />
          <figcaption className="xp-caption">{im.figure.caption}</figcaption>
        </figure>
      </div>
      <dl className="xc-facts">
        {im.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.value}</dt>
            <dd><span className="xp-mono">{f.unit}</span><br />{f.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

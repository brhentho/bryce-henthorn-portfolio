"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState, type KeyboardEvent } from "react"
import { AnimatePresence, motion, useTransform } from "framer-motion"
import { useReducedMotion } from "../useReducedMotion"
import { useSectionProgress } from "../useSectionProgress"
import { LoopingMedia } from "@/components/manual/LoopingMedia"
import { ExploreFooter } from "@/components/explore/ExploreFooter"
import { RevealWords } from "@/components/explore/RevealWords"
import { SimCard, SimDisclaimer, SimIntent, SimStates } from "@/components/explore/SimParts"
import { useActiveSection } from "@/components/explore/useActiveSection"
import { AGENTS, PROJECTS, homeHref } from "@/lib/explore/content"
import { useAgentSim } from "@/lib/explore/simulation"

const agents = PROJECTS[0]
const SCENES = [
  { id: "context", label: "Context", tone: "#0E1A33" },
  { id: "problem", label: "Problem", tone: "#1B1226" },
  { id: "decision", label: "Decision", tone: "#0F1F3A" },
  { id: "taskbar", label: "Taskbar", tone: "#0A1A2A" },
  { id: "states", label: "Simulation", tone: "#11192C" },
  { id: "impact", label: "Impact", tone: "#17140F" },
] as const
const SCENE_IDS = ["top", ...SCENES.map((s) => s.id)]
const ease = [0.16, 1, 0.3, 1] as const

export function BCase() {
  const active = useActiveSection(SCENE_IDS, 0.5)

  return (
    <div className="xb xb-case">
      <div className="xb-scene-tones" aria-hidden="true">
        {[{ id: "top", tone: agents.tone.lift }, ...SCENES].map((s) => (
          <div
            key={s.id}
            className="xb-scene-tone"
            data-active={active === s.id ? "true" : undefined}
            style={{ background: `radial-gradient(80% 70% at 50% 40%, ${s.tone} 0%, ${agents.tone.base} 72%)` }}
          />
        ))}
      </div>
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
        <nav className="xb-next" aria-label="More work">
          <Link className="xp-btn" href={homeHref("direction-b")}>
            <span aria-hidden="true">←</span> All destinations
          </Link>
          {PROJECTS.slice(1).map((p) => (
            <Link key={p.slug} className="xp-btn" href={p.productionHref}>
              {p.name} · published <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </main>
      <ExploreFooter />

      <nav className="xb-dock" aria-label="Chapters">
        {SCENES.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}>
            <span className="xp-mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="xb-dock-label">{s.label}</span>
            <span className="sr-only xb-dock-sr">{s.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const scrollYProgress = useSectionProgress(ref, ["start start", "end end"])
  const clip = useTransform(scrollYProgress, [0, 0.85], ["circle(24% at 50% 50%)", "circle(72% at 50% 50%)"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1])

  return (
    <header id="top" ref={ref} className="xb-case-hero" style={reduce ? { height: "100svh" } : undefined}>
      <div className="xb-case-hero-sticky">
        <motion.div
          className="xb-case-port"
          style={{ clipPath: reduce ? "circle(72% at 50% 50%)" : clip, viewTransitionName: "xb-porthole" }}
        >
          <motion.div style={{ position: "absolute", inset: 0, scale: reduce ? 1 : scale }}>
            <Image src={agents.atmosphere} alt="" fill priority sizes="100vw" className="xp-cover" />
          </motion.div>
        </motion.div>
        <div className="xb-case-hero-copy">
          <p className="xp-mono" style={{ color: "var(--text-primary)" }}>{AGENTS.eyebrow}</p>
          <RevealWords as="h1" className="xp-display xb-case-title" text={AGENTS.title} delay={100} />
          <p className="xp-lede">{AGENTS.lede}</p>
        </div>
      </div>
    </header>
  )
}

function Intro() {
  return (
    <section className="xb-case-intro" aria-label="Overview">
      <p className="xp-h2" style={{ maxWidth: "28ch" }}>{AGENTS.call}</p>
      <figure className="xb-case-intro-shot">
        <Image src={AGENTS.hero.src} alt={AGENTS.hero.alt} width={AGENTS.hero.width} height={AGENTS.hero.height} sizes="(min-width: 1300px) 1200px, 100vw" />
      </figure>
      <dl className="xb-ledger">
        {AGENTS.ledger.map((row) => (
          <div key={row.label}>
            <dt className="xp-mono">{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function SceneHead({ n, id, title, big = false }: { n: number; id: string; title: string; big?: boolean }) {
  return (
    <div className="xb-scene-head">
      <p className="xp-mono">{String(n).padStart(2, "0")} · {SCENES[n - 1].label}</p>
      <h2 id={`${id}-title`} className={big ? "xp-h1" : "xp-h2"}>{title}</h2>
    </div>
  )
}

function Context() {
  const c = AGENTS.context
  return (
    <section id="context" className="xb-scene" aria-labelledby="context-title">
      <SceneHead n={1} id="context" title={c.title} big />
      <div className="xb-cols">
        <div>
          {c.body.map((p) => <p key={p.slice(0, 16)} className="xp-body">{p}</p>)}
        </div>
        <figure className="xb-frame">
          <Image src={c.figure.src} alt={c.figure.alt} width={c.figure.width} height={c.figure.height} sizes="(min-width: 900px) 45vw, 100vw" />
          <figcaption className="xp-caption">{c.figure.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Problem() {
  const p = AGENTS.problem
  const [view, setView] = useState<"fragmented" | "visible">("fragmented")
  const fig = p[view]
  return (
    <section id="problem" className="xb-scene" aria-labelledby="problem-title">
      <SceneHead n={2} id="problem" title={p.thesis} big />
      <div className="xb-cols">
        <div>
          {p.body.map((b) => <p key={b.slice(0, 16)} className="xp-body">{b}</p>)}
        </div>
        <div style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
          <div className="xb-seg" role="group" aria-label="Compare the system">
            {(["fragmented", "visible"] as const).map((k) => (
              <button key={k} type="button" aria-pressed={view === k} onClick={() => setView(k)}>
                {p[k].label}
              </button>
            ))}
          </div>
          <figure className="xb-frame">
            <div className="xb-swap">
              {(["fragmented", "visible"] as const).map((k) => (
                <motion.div
                  key={k}
                  initial={false}
                  animate={{ opacity: view === k ? 1 : 0, scale: view === k ? 1 : 0.97 }}
                  transition={{ duration: 0.4, ease }}
                  aria-hidden={view !== k}
                >
                  <Image src={p[k].src} alt={p[k].alt} width={p[k].width} height={p[k].height} sizes="(min-width: 900px) 45vw, 100vw" />
                </motion.div>
              ))}
            </div>
            <figcaption className="xp-caption" aria-live="polite">{fig.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function Decision() {
  const d = AGENTS.decision
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
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
    <section id="decision" className="xb-scene" aria-labelledby="decision-title">
      <SceneHead n={3} id="decision" title={d.title} big />
      <div className="xb-cols">
        {d.body.map((b) => <p key={b.slice(0, 16)} className="xp-body">{b}</p>)}
      </div>
      <div className="xb-choice">
        <p className="xp-mono" id="xb-choice-label">Where should agents live? Try each home.</p>
        <div className="xb-choice-tabs" role="tablist" aria-labelledby="xb-choice-label">
          {d.options.map((opt, i) => (
            <button
              key={opt.code}
              ref={(el) => { tabs.current[i] = el }}
              type="button"
              role="tab"
              id={`xb-tab-${opt.code}`}
              aria-selected={selected === i}
              aria-controls="xb-choice-panel"
              tabIndex={selected === i ? 0 : -1}
              className="xb-choice-tab"
              onClick={() => setSelected(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="xp-mono">{opt.code}</span>
              <span className="xp-h3">{opt.option}</span>
            </button>
          ))}
        </div>
        <div id="xb-choice-panel" role="tabpanel" aria-labelledby={`xb-tab-${o.code}`} className="xb-choice-panel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={o.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease }}
              style={{ display: "grid", gap: "1.25rem" }}
            >
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                <p className="xp-h2">{o.option}</p>
                {o.chosen && <span className="xb-badge">Chosen</span>}
              </div>
              <dl>
                <div><dt className="xp-mono">Tradeoff</dt><dd className="xp-body">{o.tradeoff}</dd></div>
                <div><dt className="xp-mono">Disposition</dt><dd className="xp-body">{o.disposition}</dd></div>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Taskbar() {
  const t = AGENTS.taskbar
  const [step, setStep] = useState(0)
  const k = AGENTS.keyframes[step]
  const last = AGENTS.keyframes.length - 1

  return (
    <section id="taskbar" className="xb-scene" aria-labelledby="taskbar-title">
      <SceneHead n={4} id="taskbar" title={t.title} big />
      <div className="xb-cols">
        {t.body.map((b) => <p key={b.slice(0, 16)} className="xp-body">{b}</p>)}
      </div>
      <div className="xb-stepper">
        <div className="xb-stepper-bar">
          <div className="xb-stepper-dots" role="group" aria-label="Keyframes">
            {AGENTS.keyframes.map((kf, i) => (
              <button key={kf.label} type="button" className="xp-btn" aria-pressed={i === step} onClick={() => setStep(i)}>
                {String(i + 1).padStart(2, "0")}
                <span className="sr-only"> {kf.label}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="button" className="xp-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              <span aria-hidden="true">←</span> Previous
            </button>
            <button type="button" className="xp-btn" onClick={() => setStep((s) => Math.min(last, s + 1))} disabled={step === last}>
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <figure className="xb-frame">
          <div className="xb-swap">
            {AGENTS.keyframes.map((kf, i) => (
              <motion.div
                key={kf.label}
                initial={false}
                animate={{ opacity: i === step ? 1 : 0 }}
                transition={{ duration: 0.3, ease }}
                aria-hidden={i !== step}
              >
                <Image src={kf.src} alt={kf.alt} width={AGENTS.keyframeSize.width} height={AGENTS.keyframeSize.height} sizes="(min-width: 1300px) 1200px, 100vw" />
              </motion.div>
            ))}
          </div>
          <figcaption aria-live="polite">
            <span className="xp-mono">Keyframe {String(step + 1).padStart(2, "0")} / 03 · {k.label}</span>
            <span className="xp-body-sm" style={{ display: "block", marginTop: "0.375rem" }}>{k.detail}</span>
          </figcaption>
        </figure>
      </div>
      <figure className="xb-frame">
        <LoopingMedia src={t.video} poster={t.poster} label={t.videoLabel} description={t.videoCaption} />
        <figcaption className="xp-caption">{t.videoCaption}</figcaption>
      </figure>
    </section>
  )
}

function Simulation() {
  const sim = useAgentSim()
  return (
    <section id="states" className="xb-scene" aria-labelledby="states-title">
      <SceneHead n={5} id="states" title={AGENTS.simulation.title} big />
      <div className="xb-sim" style={{ boxShadow: `0 0 120px -40px ${sim.current.tone}` }}>
        <SimStates sim={sim} />
        <div className="xb-sim-split">
          <SimCard sim={sim} />
          <SimIntent sim={sim} />
        </div>
        <SimDisclaimer />
      </div>
    </section>
  )
}

function Impact() {
  const im = AGENTS.impact
  return (
    <section id="impact" className="xb-scene" aria-labelledby="impact-title">
      <SceneHead n={6} id="impact" title={im.title} />
      <blockquote className="xp-h1" style={{ margin: 0, maxWidth: "24ch" }}>“{im.quote}”</blockquote>
      <div className="xb-cols">
        <div>
          {im.body.map((b) => <p key={b.slice(0, 16)} className="xp-body">{b}</p>)}
        </div>
        <figure className="xb-frame">
          <Image src={im.figure.src} alt={im.figure.alt} width={im.figure.width} height={im.figure.height} sizes="(min-width: 900px) 45vw, 100vw" />
          <figcaption className="xp-caption">{im.figure.caption}</figcaption>
        </figure>
      </div>
      <dl className="xb-facts">
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

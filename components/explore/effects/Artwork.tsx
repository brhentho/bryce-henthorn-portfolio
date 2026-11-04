"use client"

import { Component, lazy, Suspense, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from "react"
import { useReducedMotion } from "../useReducedMotion"

const Orb = lazy(() => import("./vendor/Orb/Orb"))
const ASCII = lazy(() => import("./vendor/GradientASCII/GradientASCII"))
const Ferro = lazy(() => import("./vendor/Ferrofluid/Ferrofluid"))
const Crystal = lazy(() => import("./vendor/CrystalizedBall/CrystalizedBall"))
const Moss = lazy(() => import("./vendor/MossGrid/MossGrid"))

type Kind = "orb" | "ascii" | "ferro" | "crystal" | "moss"
type Palette = { ink: string; white: string; ice: string; copper: string; blue: string; teal: string; mono: string }

class ArtworkBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Exploration artwork could not initialize.", error, info.componentStack)
    this.props.onError()
  }
  render() { return this.state.failed ? null : this.props.children }
}

export function Artwork({ kind, className = "" }: { kind: Kind; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [palette, setPalette] = useState<Palette | null>(null)
  const active = visible && !paused && !reduce && !failed && palette !== null

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const css = getComputedStyle(root)
    const color = (name: string) => css.getPropertyValue(`--effect-${name}`).trim()
    setPalette({ ink: color("ink"), white: color("white"), ice: color("ice"), copper: color("copper"), blue: color("blue"), teal: color("teal"), mono: css.getPropertyValue("--font-mono").trim() })
    let onscreen = false
    const sync = () => setVisible(onscreen && document.visibilityState === "visible")
    const observer = new IntersectionObserver(([entry]) => { onscreen = entry.isIntersecting; sync() })
    observer.observe(root)
    document.addEventListener("visibilitychange", sync)
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync) }
  }, [])

  useEffect(() => {
    const root = ref.current
    if (!root || !active) { setReady(false); return }
    let initialized = false
    const markReady = () => { initialized = true; setReady(true) }
    const onContextLost = (event: Event) => {
      event.preventDefault()
      console.warn("Exploration artwork lost its graphics context; displaying the still composition.")
      setFailed(true)
    }
    root.addEventListener("xp-art-ready", markReady)
    root.addEventListener("webglcontextlost", onContextLost, true)
    if (root.querySelector("[data-art-ready]")) markReady()
    const timer = window.setTimeout(() => {
      if (!initialized && kind !== "moss") {
        console.warn(`Exploration ${kind} artwork did not initialize; displaying the still composition.`)
        setFailed(true)
      }
    }, 12000)
    return () => {
      clearTimeout(timer)
      root.removeEventListener("xp-art-ready", markReady)
      root.removeEventListener("webglcontextlost", onContextLost, true)
    }
  }, [active, kind])

  return (
    <div ref={ref} className={`xp-art ${className}`} data-kind={kind} data-active={active && ready}>
      <div className="xp-art-still" data-poster aria-hidden="true" style={{ backgroundImage: `url(/explore/artwork/${kind}.webp)` }} />
      {active && <div className="xp-art-layer" aria-hidden="true">
        <ArtworkBoundary onError={() => setFailed(true)}>
          <Suspense fallback={null}><Scene kind={kind} palette={palette} /></Suspense>
        </ArtworkBoundary>
      </div>}
      {!reduce && !failed && <button className="xp-art-control" type="button" aria-pressed={paused}
        onClick={() => setPaused(value => !value)}>{paused ? "Resume animation" : "Pause animation"}</button>}
      {failed && <span className="xp-art-note" role="status">Still composition · graphics unavailable</span>}
    </div>
  )
}

function Scene({ kind, palette: p }: { kind: Kind; palette: Palette }) {
  if (kind === "orb") return <Orb colors={[p.ice, p.white, p.blue]} backgroundColor={p.ink} size={.86} speed={.35} glow={.75} bleed={.6} trail={.35} intro={false} followCursor={false} rotateOnHover={false} hoverIntensity={.3} dpr={1.25} />
  if (kind === "ascii") return <ASCII colors={[p.ink, p.copper, p.white, p.ice]} shape="horizon" cellSize={14} density={.7} speed={.35} glow={.12} intro={false} fontFamily={p.mono} dpr={1.25} />
  if (kind === "ferro") return <Ferro colors={[p.white, p.ice, p.teal]} speed={.25} scale={1.2} brightness={2.6} spikeHeight={.85} sharpness={2} tilt={50} mouseStrength={.3} clickPulse={false} intro={false} dpr={1} />
  if (kind === "crystal") return <Crystal color={p.ice} size={.72} speed={.3} fill={.35} particleCount={4000} crackle={.25} intro={false} interactive={false} />
  return <Moss mossColor={p.ink} mossHighlight={p.blue} dotColor={p.ice} speed={.35} ambient={.12} dotGlow={.65} interactive={false} depthOfField={0} grain={0} />
}

export function TyndallLight() {
  return <div className="xp-light xp-ambient-enter" aria-hidden="true"><i /><i /><i /></div>
}

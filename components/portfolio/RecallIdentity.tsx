"use client"

import { useEffect, useId, useRef, useState } from "react"

const asset = "/images/recall/identity"
const glows = [
  { file: "glow-violet.svg", cx: 389, cy: 345, width: 666, height: 666, rotation: 0 },
  { file: "glow-diagonal.svg", cx: 387.005, cy: 331, width: 816, height: 746, rotation: 45 },
  { file: "glow-blue.svg", cx: 518.283, cy: 473.289, width: 646.381, height: 540.186, rotation: -28.46 },
  { file: "glow-focus.svg", cx: 392.759, cy: 345.653, width: 86.3823, height: 96.3333, rotation: 47.41 },
] as const
const logo = { x: 382, y: 310.002, width: 110.001, height: 119.996 }

// rest: the supplied static artwork. armed: hidden until a scrolled arrival. playing: one-shot reveal.
type Phase = "rest" | "armed" | "playing"

function useIdentityReveal() {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>("rest")
  useEffect(() => {
    const figure = ref.current
    if (!figure || typeof IntersectionObserver === "undefined") return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    let current: Phase = "rest"
    const set = (next: Phase) => { current = next; setPhase(next) }
    // Deep links, restored scroll and anything already on screen stay settled: no hide-then-reveal flash.
    const rect = figure.getBoundingClientRect()
    if (reduce.matches || rect.top < window.innerHeight) return
    const settle = () => {
      if (current === "rest") return
      cleanup()
      set("rest")
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || current !== "armed") return
      observer.disconnect()
      window.removeEventListener("scroll", passed)
      // A jump (hash, restoration) lands with the figure already deep in view; show it settled.
      if (reduce.matches || document.hidden || entry.boundingClientRect.top < window.innerHeight * .15) settle()
      else set("playing")
    }, { threshold: .2 })
    // A fast scroll can carry the figure past the viewport without an intersection; never leave it armed above.
    const passed = () => { if (current === "armed" && figure.getBoundingClientRect().bottom <= 0) settle() }
    const ended = (event: AnimationEvent) => { if (event.animationName === "pf-recall-identity-glint") settle() }
    const hidden = () => { if (document.hidden && current === "playing") settle() }
    const hashed = () => {
      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target && (target.contains(figure) || figure.contains(target))) settle()
    }
    function cleanup() {
      observer.disconnect()
      window.removeEventListener("scroll", passed)
      window.removeEventListener("hashchange", hashed)
      reduce.removeEventListener("change", settle)
      document.removeEventListener("visibilitychange", hidden)
      figure?.removeEventListener("animationend", ended)
    }
    set("armed")
    observer.observe(figure)
    window.addEventListener("scroll", passed, { passive: true })
    window.addEventListener("hashchange", hashed)
    reduce.addEventListener("change", settle)
    document.addEventListener("visibilitychange", hidden)
    figure.addEventListener("animationend", ended)
    return cleanup
  }, [])
  return { ref, phase }
}

export function RecallIdentity() {
  const id = useId()
  const { ref, phase } = useIdentityReveal()
  const revealing = phase !== "rest"
  const light = revealing ? `url(#${id}-light)` : undefined
  return <div className="pf-evidence">
    <figure className="pf-recall-identity" ref={ref} data-reveal={revealing ? phase : undefined}>
      <svg className="pf-recall-identity__scene" viewBox="0 0 874 740" role="img" aria-labelledby={`${id}-title`}>
        <title id={`${id}-title`}>Recall logo floating over a softly illuminated blue-violet grid</title>
        <defs>
          <mask id={`${id}-grid`} maskUnits="userSpaceOnUse" x="0" y="90" width="874.174" height="553.773" style={{ maskType: "alpha" }}>
            <image href={`${asset}/grid-mask.svg`} x="0" y="90" width="874.174" height="553.773" />
          </mask>
          <mask id={`${id}-logo`} maskUnits="userSpaceOnUse" x="377" y="310" width="120" height="120" style={{ maskType: "alpha" }}>
            <image href={`${asset}/logo-mask.svg`} x="377" y="310" width="120" height="120" />
          </mask>
          {revealing && <>
            <radialGradient id={`${id}-bloom`}>
              <stop offset=".7" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            {/* Opens beyond every viewBox corner, so the final frame is identical to the unmasked artwork. */}
            <mask id={`${id}-light`} maskUnits="userSpaceOnUse" x="0" y="0" width="874" height="740" style={{ maskType: "alpha" }}>
              <circle className="pf-recall-identity__bloom" cx="437" cy="370" r="840" fill={`url(#${id}-bloom)`} />
            </mask>
            <linearGradient id={`${id}-glint`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" className="pf-recall-identity__glint-stop" stopOpacity="0" />
              <stop offset=".5" className="pf-recall-identity__glint-stop" />
              <stop offset="1" className="pf-recall-identity__glint-stop" stopOpacity="0" />
            </linearGradient>
            <mask id={`${id}-silhouette`} maskUnits="userSpaceOnUse" {...logo} style={{ maskType: "alpha" }}>
              <image href={`${asset}/logo.svg`} {...logo} />
            </mask>
          </>}
        </defs>
        <g className="pf-recall-identity__light" mask={light}>
          <g transform="translate(436.63 366.885) rotate(-90)">
            <image href={`${asset}/glow-base.svg`} x={-593.286 / 2} y={-580.051 / 2} width="593.286" height="580.051" />
          </g>
        </g>
        <g mask={`url(#${id}-grid)`}>
          <g transform="translate(112.002 98.697)">
            {Array.from({ length: 63 }, (_, index) => {
              const row = Math.floor(index / 9), column = index % 9
              const highlighted = index === 6 || index === 22 || index === 24 || index === 39
              return <rect key={index} x={column * 71.937225} y={row * 71.937225}
                width="72.847824" height="72.847824" className="pf-recall-identity__cell"
                data-highlighted={highlighted || undefined} strokeDasharray={index === 39 ? "3 3" : undefined} />
            })}
          </g>
        </g>
        <g className="pf-recall-identity__light" mask={light}>
          {glows.map(glow => <g key={glow.file} transform={`translate(${glow.cx} ${glow.cy}) rotate(${glow.rotation})`}>
            <image href={`${asset}/${glow.file}`} x={-glow.width / 2} y={-glow.height / 2} width={glow.width} height={glow.height} />
          </g>)}
        </g>
        <g className="pf-recall-identity__logo">
          <image href={`${asset}/logo.svg`} {...logo} mask={`url(#${id}-logo)`} />
        </g>
        {revealing && <g className="pf-recall-identity__glint" mask={`url(#${id}-silhouette)`} aria-hidden="true">
          <g transform="rotate(20 437 370)">
            <rect className="pf-recall-identity__glint-band" x="302" y="250" width="56" height="240" fill={`url(#${id}-glint)`} />
          </g>
        </g>}
      </svg>
    </figure>
  </div>
}

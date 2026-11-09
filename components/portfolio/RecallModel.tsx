"use client"

import Image from "next/image"
import { useEffect, useId, useRef, type ReactNode } from "react"
import { PORTFOLIO_MEDIA } from "@/lib/portfolio/media"
import { EvidenceReveal } from "./Blocks"

const stages = [
  { title: "Screenshot capture", icon: "capture", detail: "When capture is enabled and content is eligible, snapshots preserve the screen as the source material." },
  { title: "OCR processing", icon: "ocr", detail: "Image processing and optical character recognition turn text in the snapshot into structured, readable content." },
  { title: "Meaning analysis", icon: "meaning", detail: "Extracted content is interpreted as concepts and represented as semantic vectors for matching." },
  { title: "Search and index service", icon: "index", detail: "A semantic index makes captured moments retrievable by meaning, not just an exact match to the words in a query." },
]

// Figma's planes share this affine projection; the supplied SVGs are unprojected.
const planeProjection = "matrix(.8660254 .5 -.8660254 .5 210 0)"

function ProcessingPlane({ index }: { index: 1 | 3 }) {
  return <>
    <rect className="pf-recall-plane-surface" width="330.702" height="224.763" rx="8.59" />
    {index === 1 ? <>
      <rect className="pf-recall-extraction" x="173.225" y="17.179" width="135.287" height="189.688" rx="12" />
      {[93.055, 65.138, 76.591, 47.243, 65.138].map((width, row) =>
        <rect className="pf-recall-text-bar" key={row} x="17.179" y={27.201 + row * 22.906} width={width} height="15.032" rx="4" opacity={[.65, .35, .45, .25, .55][row]} />)}
      {[108.086, 101.644, 108.086, 101.644, 88.76, 108.086, 61.559].map((width, row) =>
        <rect className="pf-recall-text-bar" key={row} x="181.814" y={27.201 + row * 22.906} width={width} height="15.032" rx="4" opacity=".5" />)}
    </> : <>
      {[168.93, 130.276, 103.076, 150.319].map((width, row) => <g key={row}>
        <rect className="pf-recall-index-row" x="17.179" y={27.201 + row * 34.359} width="288.469" height="25.769" rx="4" />
        <rect className="pf-recall-text-bar" x="22.906" y={32.927 + row * 34.359} width={width} height="14.316" rx="4" opacity={[.65, .45, .35, .25][row]} />
        <text className="pf-recall-score" x="272.721" y={[35.074, 68.717, 103.076, 136.719][row]} dominantBaseline="hanging">{["0.94", "0.81", "0.76", "0.61"][row]}</text>
      </g>)}
    </>}
  </>
}

function useRecallArrival() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const animations: Animation[] = []
    let settled = false
    const settle = () => {
      settled = true
      animations.forEach(animation => animation.cancel())
    }
    const tokens = getComputedStyle(root)
    const milliseconds = (name: string) => {
      const value = tokens.getPropertyValue(name).trim()
      return parseFloat(value) * (value.endsWith("ms") ? 1 : 1000)
    }
    // Nothing is hidden before hydration; restored scroll and deep links stay settled.
    const initiallyVisible = root.getBoundingClientRect().top < window.innerHeight
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (settled || reduce.matches || initiallyVisible) return
      root.querySelectorAll<SVGElement | HTMLElement>("[data-recall-arrival]").forEach((element, index) => {
        animations.push(element.animate(
          [{ transform: `translateY(${tokens.getPropertyValue("--pf-recall-arrival-distance").trim()})`, opacity: .6 }, { transform: "translateY(0)", opacity: 1 }],
          {
            duration: milliseconds("--duration-enter"),
            delay: Math.min(index, 3) * milliseconds("--stagger-word"),
            easing: tokens.getPropertyValue("--ease-out-expo").trim(),
            fill: "backwards",
          },
        ))
      })
    }, { threshold: .12 })
    observer.observe(root)
    root.addEventListener("focusin", settle)
    root.addEventListener("pointerover", settle)
    reduce.addEventListener("change", settle)
    return () => {
      observer.disconnect()
      settle()
      root.removeEventListener("focusin", settle)
      root.removeEventListener("pointerover", settle)
      reduce.removeEventListener("change", settle)
    }
  }, [])
  return ref
}

export function RecallModel({ children }: { children: ReactNode }) {
  const name = useId()
  const ref = useRecallArrival()
  return <div className="pf-recall-model" ref={ref}>
    <div className="pf-recall-model-copy">
      {children}
      <ol className="pf-recall-stages pf-recall-stage-grid" aria-label="Capture-to-index layers">
        {stages.map((stage, index) => <li className="pf-recall-stage" data-layer={index} tabIndex={0} key={stage.title}>
          <span className="pf-recall-stage-copy">
            <span className="pf-recall-stage-heading">
              <Image src={`/images/recall/model-${stage.icon}-icon.svg`} width={32} height={32} alt="" />
              <span className="fn-label">0{index + 1}</span>
            </span>
            <span className="pf-recall-stage-title">{stage.title}</span>
            <span className="pf-recall-stage-detail pf-caption">{stage.detail}</span>
          </span>
        </li>)}
      </ol>
    </div>
    <figure className="pf-media pf-recall-model-figure" data-media-id="recall-model">
      <div className="pf-media-frame">
        <svg viewBox="-120 0 640 960" role="img" aria-labelledby={`${name}-title ${name}-description`}>
          <title id={`${name}-title`}>Capture to index, read bottom to top</title>
          <desc id={`${name}-description`}>Four conceptual planes: screenshot capture, OCR text extraction, semantic relationships, and a search index. Each numbered plane corresponds to a layer description. Similarity scores are illustrative, not measured results.</desc>
          {stages.map((stage, index) => <g key={stage.title} transform={`translate(0 ${32 + (3 - index) * 208})`}>
            <g data-recall-arrival="">
              <g className="pf-recall-plane" data-plane={index} data-layer={index}>
                <g transform={planeProjection}>
                  {index === 0 || index === 2
                    ? <image href={`/images/recall/model-${index === 0 ? "capture" : "meaning"}.svg`} width="330.702" height="224.763" />
                    : <ProcessingPlane index={index === 1 ? 1 : 3} />}
                  <rect className="pf-recall-plane-outline" width="330.702" height="224.763" rx="8.59" />
                </g>
              </g>
            </g>
            <rect className="pf-recall-layer-marker" x="-106" y="96" width="40" height="32" rx="4" />
            <text x="-86" y="118" textAnchor="middle" className="pf-recall-plane-number">0{index + 1}</text>
            <path className="pf-recall-axis" d="M-58 112H8" />
          </g>)}
        </svg>
      </div>
    </figure>
  </div>
}

export function RecallProvenance() {
  const media = PORTFOLIO_MEDIA["recall-provenance"]
  if (media.kind !== "image") throw new Error("Recall provenance requires an image")
  return <div className="pf-recall-provenance">
    <figure className="pf-media" data-media-id="recall-provenance">
      <div className="pf-media-frame pf-media-cutout">
        <EvidenceReveal>
          <div className="pf-recall-result">
            <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(min-width: 1600px) calc(100vw - 24rem), (min-width: 1101px) calc(100vw - 20rem), 92vw" />
          </div>
        </EvidenceReveal>
      </div>
      <dl className="pf-recall-annotations" data-pf-reveal="reading">
        <div><dt>Source</dt><dd className="pf-caption">The app and title show where it came from.</dd></div>
        <div><dt>Time</dt><dd className="pf-caption">See when it was captured.</dd></div>
        <div><dt>Context</dt><dd className="pf-caption">Recognize the moment from the full screenshot.</dd></div>
      </dl>
    </figure>
    <details className="pf-recall-full-grid">
      <summary>Inspect the full result grid</summary>
      <Image src="/images/recall/transparency-card-grid.png" alt="Full Recall results grid for Presentation with a red barn, with application filters, timestamps and source badges." width={1641} height={881} sizes="(max-width: 850px) 92vw, 75vw" />
    </details>
  </div>
}

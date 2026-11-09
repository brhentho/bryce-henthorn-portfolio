"use client"

import Image from "next/image"
import { useEffect, useId, useRef } from "react"
import { EvidenceReveal } from "./Blocks"

const stages = [
  { title: "Screenshot capture", detail: "When capture is enabled and content is eligible, screen snapshots provide the visual source material." },
  { title: "OCR processing", detail: "Image processing and optical character recognition extract text from the snapshot." },
  { title: "Meaning analysis", detail: "Extracted content is interpreted and represented as semantic vectors for matching." },
  { title: "Search and index service", detail: "An index makes captured content retrievable by similarity to a query, rather than exact words alone." },
]

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
          [{ transform: "translateY(16px)", opacity: .6 }, { transform: "translateY(0)", opacity: 1 }],
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
    root.addEventListener("pointerdown", settle)
    reduce.addEventListener("change", settle)
    return () => {
      observer.disconnect()
      settle()
      root.removeEventListener("focusin", settle)
      root.removeEventListener("pointerdown", settle)
      reduce.removeEventListener("change", settle)
    }
  }, [])
  return ref
}

export function RecallModel() {
  const name = useId()
  const ref = useRecallArrival()
  return <div className="pf-recall-model" ref={ref}>
    <fieldset className="pf-recall-stages">
      <legend className="fn-label">Select a layer to inspect</legend>
      {stages.map((stage, index) => <label className="pf-recall-stage" key={stage.title}>
        <input type="radio" name={name} value={index} defaultChecked={index === 0} aria-label={`${index + 1}. ${stage.title}`} aria-describedby={`${name}-${index}`} />
        <span className="pf-recall-stage-copy">
          <span className="pf-recall-stage-title"><span className="fn-label">0{index + 1}</span>{stage.title}</span>
          <span className="pf-recall-stage-detail pf-caption" id={`${name}-${index}`}>{stage.detail}</span>
        </span>
      </label>)}
    </fieldset>
    <figure className="pf-media pf-recall-model-figure" data-media-id="recall-model">
      <div className="pf-media-frame pf-recall-registered">
        <svg viewBox="0 0 720 540" role="img" aria-labelledby={`${name}-title ${name}-description`}>
          <title id={`${name}-title`}>Capture to index, read bottom to top</title>
          <desc id={`${name}-description`}>Four conceptual planes: screenshot capture, OCR text extraction, semantic relationships, and indexed results. The controls emphasize a plane, not a running process.</desc>
          {stages.map((stage, index) => <g key={stage.title} transform={`translate(0 ${300 - index * 85})`}>
            <g data-recall-arrival="">
              <g className="pf-recall-plane" data-plane={index}>
                <path className="pf-recall-plane-surface" d="M105 100 355 10 615 120 365 210Z" />
                <path className="pf-recall-plane-outline" d="M105 100 355 10 615 120 365 210Z" />
                <g className="pf-recall-plane-drawing">
                  {index === 0 && <>
                    <path d="m180 114 168-60 183 77-168 60Z" />
                    <path d="m193 119 168 71m-123-55 39-14 48 20-39 14Z" />
                    <path d="m317 156 82 35m-65-45 82 35" />
                  </>}
                  {index === 1 && <>
                    <path d="m185 119 97-35m-68 48 97-35m-68 48 97-35" />
                    <path d="m307 157 128-46m-99 59 128-46m-99 59 128-46" />
                  </>}
                  {index === 2 && <>
                    <path d="m251 132 112 27 94-28m-94 28 24 30" />
                    <ellipse cx="251" cy="132" rx="26" ry="12" />
                    <ellipse cx="363" cy="159" rx="32" ry="14" />
                    <ellipse cx="457" cy="131" rx="26" ry="12" />
                    <ellipse cx="387" cy="189" rx="21" ry="9" />
                  </>}
                  {index === 3 && <>
                    <path d="m235 82 113-40 183 77-113 40Z" />
                    <path d="m258 84 89-31m-59 44 89-31m-59 44 89-31m-59 44 89-31m-59 44 89-31" />
                  </>}
                </g>
                <text x="645" y="126" className="pf-recall-plane-number">0{index + 1}</text>
                <path className="pf-recall-axis" d="M619 120h16" />
              </g>
            </g>
          </g>)}
        </svg>
      </div>
      <figcaption className="fn-label">Fig. 02 / Capture and indexing model, read bottom to top. The numbered explanation follows capture to index; this is not a query-time trace.</figcaption>
    </figure>
  </div>
}

export function RecallProvenance() {
  const id = useId()
  return <div className="pf-recall-provenance">
    <figure className="pf-media" data-media-id="recall-provenance">
      <div className="pf-recall-provenance-plate pf-media-frame pf-recall-registered">
        <EvidenceReveal>
        <div className="pf-recall-result">
          {/* Source pixels: the first complete result card, including time and source badge. */}
          <svg viewBox="98 195 340 251" role="img" aria-labelledby={`${id}-title`}>
            <title id={`${id}-title`}>Enlarged Recall result: a PowerPoint presentation titled Designed to Amplify, captured 1hr ago, with the surrounding slide and desktop visible.</title>
            <image href="/images/recall/transparency-card-grid.png" width="1641" height="881" />
          </svg>
        </div>
        </EvidenceReveal>
        <dl className="pf-recall-annotations" data-pf-reveal="reading">
          <div><dt>Source application</dt><dd className="pf-caption">The PowerPoint badge and “Designed to Amplify” title identify the source at the bottom of the card.</dd></div>
          <div><dt>Timestamp</dt><dd className="pf-caption">“1hr ago” places the captured moment in time, directly beneath the result title.</dd></div>
          <div><dt>Surrounding context</dt><dd className="pf-caption">The slide, thumbnail rail and desktop remain visible—not just an isolated image of the red barn.</dd></div>
        </dl>
      </div>
      <figcaption className="fn-label">Fig. 04.1 / Enlarged result from the existing Recall design. Source, time and screenshot context help a reader judge the match; this crop does not show separate text and visual headings.</figcaption>
    </figure>
    <details className="pf-recall-full-grid">
      <summary>Inspect the full result grid</summary>
      <Image src="/images/recall/transparency-card-grid.png" alt="Full Recall results grid for Presentation with a red barn, with application filters, timestamps and source badges." width={1641} height={881} sizes="(max-width: 850px) 92vw, 75vw" />
    </details>
  </div>
}

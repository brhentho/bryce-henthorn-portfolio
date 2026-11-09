"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { NumberPop } from "./NumberPop"
import { useReducedMotion } from "../useReducedMotion"
import { responseTokens, type ResponseCitation } from "@/lib/explore/response-tokens"

const CITATIONS: ResponseCitation[] = [{ index: 1, title: "Illustrative project notes" }]
const CHUNKS = [
  "The brief brings ",
  "the project context ",
  "and open decisions together. ",
  "The proposed next step ",
  "is ready for your review [1].",
] as const

// Arrival-based rendering adapted from SmoothUI AI Response (MIT).
export function AIResponse({ text, streaming, citations = [] }: {
  text: string; streaming: boolean; citations?: ResponseCitation[]
}) {
  const painted = useRef(0)
  const tokens = responseTokens(text, citations)
  const firstNew = painted.current
  useEffect(() => { painted.current = tokens.length }, [tokens.length])
  return <p className="xp-ai-response">
    {tokens.map((token, index) => {
      if (token.plain) return <Fragment key={index}>{token.value}</Fragment>
      const citation = token.citation
      const props = { className: `xp-ai-word${index >= firstNew ? " xp-ai-new" : ""}` }
      if (citation) return citation.url
        ? <a {...props} key={index} href={citation.url} title={citation.title} className={`${props.className} xp-ai-citation`}>{citation.index}</a>
        : <span {...props} key={index} title={citation.title} className={`${props.className} xp-ai-citation`}>{citation.index}</span>
      return <span {...props} key={index}>{token.value}</span>
    })}
    {streaming && <span className="xp-ai-caret" aria-hidden="true" />}
  </p>
}

export function ResponseReplay() {
  const reduce = useReducedMotion()
  const [count, setCount] = useState<number>(CHUNKS.length)
  const [playing, setPlaying] = useState(false)
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (!playing) return
    if (count === CHUNKS.length || reduce) {
      setCount(CHUNKS.length)
      setPlaying(false)
      return
    }
    // Recorded chunk cadence belongs to the replay, never to the text renderer.
    const timer = window.setTimeout(() => setCount(value => value + 1), [180, 420, 260, 550, 210][count])
    return () => clearTimeout(timer)
  }, [count, playing, reduce])
  return <section className="xp-response-replay" aria-label="Illustrative response replay">
    <div className="xp-response-heading"><p className="xp-mono">Example output / recorded replay</p><span className="xp-mono"><NumberPop value={String(count)} /> / 5 chunks</span></div>
    <AIResponse key={run} text={CHUNKS.slice(0, count).join("")} streaming={playing} citations={CITATIONS} />
    <div className="xp-response-controls">
      <button className="xp-btn" type="button" onClick={() => { setRun(value => value + 1); setCount(0); setPlaying(true) }}>Replay response</button>
      {playing && <button className="xp-btn" type="button" onClick={() => setPlaying(false)}>Pause replay</button>}
      {count < CHUNKS.length && <button className="xp-btn" type="button" onClick={() => { setCount(CHUNKS.length); setPlaying(false) }}>Show full response</button>}
    </div>
    <p className="xp-sim-note">Illustrative output, not a live model response or a shipped feature. [1] is a sample source label without a public link.</p>
    <p className="sr-only" aria-live="polite">{playing ? "Response replay started." : count === CHUNKS.length ? "Response replay complete." : "Response replay paused."}</p>
  </section>
}

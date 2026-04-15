'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { NavEditorial } from '@/components/editorial/NavEditorial'
import { Section } from '@/components/editorial/Section'
import { Grid12 } from '@/components/editorial/Grid12'
import { GlassCard } from '@/components/editorial/GlassCard'
import { Glow } from '@/components/atmosphere/Glow'
import { DotGrid } from '@/components/atmosphere/DotGrid'
import { EdgeLine } from '@/components/atmosphere/EdgeLine'
import { Vignette } from '@/components/atmosphere/Vignette'
import { Placeholder } from '@/components/placeholder/Placeholder'
import { SectionNav } from '@/components/editorial/SectionNav'

/* ═══════════════════════════════════════════════════════════════
   WINDOWS RECALL
   Accent: --a: #A882FF (purple)
   ═══════════════════════════════════════════════════════════════ */

export default function RecallPage() {
  return (
    <div style={{ '--a': '#A882FF' } as React.CSSProperties}>
      <NavEditorial />
      <SectionNav sections={[
        { id: 'hero', label: 'Hero' },
        { id: 'context', label: 'Context' },
        { id: 'system-diagram', label: 'System' },
        { id: 'problem', label: 'Problem' },
        { id: 'card-design', label: 'Card Design' },
        { id: 'card-relevance', label: 'Why It Appeared' },
        { id: 'early-iteration', label: 'Iteration' },
        { id: 'performance', label: 'Performance' },
        { id: 'trust', label: 'Trust' },
        { id: 'constraints', label: 'Constraints' },
        { id: 'impact', label: 'Impact' },
      ]} />
      <main>
        <RecallHero />
        <RecallContext />
        <RecallSystemDiagram />
        <RecallProblem />
        <RecallCardDesign />
        <RecallWhyAppeared />
        <RecallIteration />
        <RecallPerformance />
        <RecallTrust />
        <RecallConstraints />
        <RecallImpact />
      </main>
      <RecallFooter />
    </div>
  )
}

function fade(show: boolean, delay: string, tr: string): React.CSSProperties {
  return { opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)', transition: tr, transitionDelay: delay }
}

/* ── 1. Hero ── */
function RecallHero() {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t) }, [])
  const tr = 'opacity 1s var(--expo), transform 1s var(--expo)'

  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      <Image src="/images/heroes/Recallhero.jpg" alt="" fill priority className="object-cover" style={{ opacity: show ? 1 : 0, transition: 'opacity 1.2s var(--expo)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,6,10,0.8) 0%, rgba(6,6,10,0.15) 35%, rgba(6,6,10,0.85) 100%)' }} />
      <Glow color="#A882FF" size="50%" top="40%" left="35%" opacity={0.05} />
      <Vignette />

      <div className="absolute top-24 left-0 z-10" style={{ padding: '0 var(--pad)' }}>
        <div className="flex flex-wrap gap-2" style={{ opacity: show ? 1 : 0, transition: 'opacity 0.8s var(--expo)', transitionDelay: '0.3s' }}>
          {['Trust + privacy', 'Systems thinking', 'Windows', 'Senior Designer', '2024'].map((tag) => (
            <span key={tag} className="t-mono px-3 py-1 rounded-full" style={{ border: '1px solid var(--w06)', color: 'var(--w20)' }}>{tag}</span>
          ))}
        </div>
        <div className="mt-3 t-label" style={{ opacity: show ? 1 : 0, transition: 'opacity 0.8s var(--expo)', transitionDelay: '0.4s', color: 'var(--w25)' }}>
          Senior UX Designer &middot; Windows / Copilot+ PCs
        </div>
      </div>

      <div className="relative z-10 w-full" style={{ padding: 'var(--pad)', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '700px' }}>
          <span className="t-label block mb-3" style={{ color: '#A882FF', opacity: 0.6, ...fade(show, '0.2s', tr) }}>Windows Recall</span>
          <h1 className="t-display" style={fade(show, '0.3s', tr)}>Designing Semantic Search for Everything You&apos;ve Seen.</h1>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-10 text-right" style={{ padding: 'var(--pad)', paddingBottom: '80px', opacity: show ? 1 : 0, transition: 'opacity 0.8s var(--expo)', transitionDelay: '0.5s' }}>
        <span className="t-mono block" style={{ color: 'var(--w12)' }}>Semantic search and</span>
        <span className="t-mono block" style={{ color: 'var(--w12)' }}>memory retrieval</span>
      </div>
    </section>
  )
}

/* ── 2. Context — Orbital grid illustration ── */
function RecallContext() {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0) // 0=hidden, 1=text in, 2=grid in, 3=icon in

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setStep(3); return }

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStep(1)                          // text fades in
        setTimeout(() => setStep(2), 500)   // grid fades in after text
        setTimeout(() => setStep(3), 900)   // icon grows in after grid starts
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const tr = 'opacity 0.8s var(--expo), transform 0.8s var(--expo)'

  return (
    <section ref={ref} id="context" className="relative py-24 md:py-32">
      <Glow color="#A882FF" size="40%" top="50%" left="70%" opacity={0.06} />

      <Grid12 className="items-center">
        <div
          style={{
            gridColumn: '1 / 7',
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'translateY(0)' : 'translateY(24px)',
            transition: tr,
          }}
        >
          <h2 className="t-heading mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.01em' }}>Where was that thing I saw last week?</h2>
          <p className="t-body mb-4">The problem was simple and unsolved. You&apos;d seen something on your computer: a presentation, a snippet of code, a reference in an email. But you couldn&apos;t find it. You&apos;d try different search terms, retrace your steps, open files one by one. Minutes wasted. Information you knew existed but couldn&apos;t retrieve.</p>
          <p className="t-body mb-4">Recall aimed to capture everything appearing on screen and make it searchable through meaning rather than filenames. But solving that technically wasn&apos;t the real challenge. We had to build something users actually trusted.</p>
          <p className="t-body">My role focused specifically on the semantic search experience: how users search their memories, how results are ranked and displayed, and how relevance is communicated in a way that feels understandable and trustworthy.</p>
        </div>

        {/* Orbital grid illustration */}
        <div style={{ gridColumn: '7 / 13', position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RecallOrbitalGrid gridVisible={step >= 2} iconVisible={step >= 3} />
        </div>
      </Grid12>
    </section>
  )
}

/* ── 2b. System Diagram — Textured background ── */
function SystemIcon({ type }: { type: 'capture' | 'ocr' | 'meaning' | 'search' }) {
  const icons = {
    capture: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 11V5a1 1 0 011-1h6M21 4h6a1 1 0 011 1v6M28 21v6a1 1 0 01-1 1h-6M11 28H5a1 1 0 01-1-1v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ocr: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 4H9a2 2 0 00-2 2v20a2 2 0 002 2h14a2 2 0 002-2V10l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 4v6h6M12 16h8M12 20h8M12 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    meaning: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 16c0-3.3 2.7-6 6-6M16 10V4M12 6l4-2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 16c0 3.3-2.7 6-6 6M16 22v6M20 26l-4 2-4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    search: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8h10M7 13h6M7 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="4" y="4" width="18" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="23" cy="21" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M26 24l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  }
  return <div style={{ color: '#60CDFF', marginBottom: '12px' }}>{icons[type]}</div>
}

function RecallSystemDiagram() {
  const features = [
    {
      icon: 'capture' as const,
      title: 'Screenshot Capture',
      desc: 'Continuously monitors and captures the screen at intervals, saving raw visual snapshots as the source material that enters the processing pipeline.',
    },
    {
      icon: 'ocr' as const,
      title: 'OCR processing',
      desc: 'Converts raw image input into structured text by straightening and denoising the image, identifying characters through optical recognition, and reconstructing the output into formatted, flowing text.',
    },
    {
      icon: 'meaning' as const,
      title: 'Meaning analysis',
      desc: 'Interprets raw extracted text by running meaning analysis to identify concepts and intent, then maps those concepts to semantic vectors for downstream understanding.',
    },
    {
      icon: 'search' as const,
      title: 'Search & Index Service',
      desc: 'Stores enriched content in a semantic index and retrieves it by matching the meaning of a query against similarity scores — finding the right files even when the exact words don\u2019t match.',
    },
  ]

  return (
    <Section id="system-diagram" padding="py-24 md:py-32">
      {/* Halftone dot texture background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-15% -10%',
            opacity: 0.2,
            maskImage: 'radial-gradient(ellipse 80% 70% at 65% 55%, black 10%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 65% 55%, black 10%, transparent 70%)',
          }}
        >
          <Image
            src="/images/recall-texture.png"
            alt=""
            fill
            style={{ objectFit: 'cover', pointerEvents: 'none' }}
          />
        </div>
      </div>

      <Grid12>
        <div style={{ gridColumn: '1 / 7' }}>
          <h2 className="t-heading mb-12" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.01em' }}>
            On demand intelligence
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px 40px' }}>
            {features.map((f) => (
              <div key={f.title}>
                <SystemIcon type={f.icon} />
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', fontWeight: 400, color: '#fff', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.01em' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: '7 / 13', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Image
            src="/images/recall-system-diagram.png"
            alt="Isometric system architecture diagram showing the Recall data pipeline layers"
            width={482}
            height={742}
            style={{ width: '100%', maxWidth: '482px', height: 'auto' }}
          />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── Orbital grid illustration for Context section ── */
function RecallOrbitalGrid({ gridVisible, iconVisible }: { gridVisible: boolean; iconVisible: boolean }) {
  const COLS = 9
  const ROWS = 7
  const CELL = 73
  const gridW = COLS * CELL
  const gridH = ROWS * CELL

  /* Which cells get a subtle fill */
  const filledCells = new Set(['0-6', '2-4', '2-6', '4-3'])

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 520, aspectRatio: '874 / 740' }}>
      {/* Radial mask container for the grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: gridVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 15%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 15%, transparent 65%)',
        }}
      >
        <svg width={gridW} height={gridH} viewBox={`0 0 ${gridW} ${gridH}`} style={{ width: '100%', height: '100%' }}>
          {Array.from({ length: ROWS }, (_, r) =>
            Array.from({ length: COLS }, (_, c) => {
              const key = `${r}-${c}`
              const filled = filledCells.has(key)
              return (
                <rect
                  key={key}
                  x={c * CELL}
                  y={r * CELL}
                  width={CELL}
                  height={CELL}
                  fill={filled ? 'rgba(255,255,255,0.08)' : 'none'}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={1}
                />
              )
            })
          )}
        </svg>
      </div>

      {/* Orbital rings */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: gridVisible ? 1 : 0, transition: 'opacity 0.8s ease-out' }}>
        {/* Large outer orbit */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80%',
          height: '50%',
          transform: 'translate(-50%, -50%) rotate(-28deg)',
          border: '1px solid rgba(168, 130, 255, 0.18)',
          borderRadius: '50%',
        }} />
        {/* Medium orbit */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '55%',
          height: '42%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          border: '1px solid rgba(168, 130, 255, 0.14)',
          borderRadius: '50%',
        }} />
        {/* Inner tight orbit */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '35%',
          height: '30%',
          transform: 'translate(-50%, -50%) rotate(-90deg)',
          border: '1px solid rgba(168, 130, 255, 0.20)',
          borderRadius: '50%',
        }} />
        {/* Small accent orbit */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '20%',
          height: '15%',
          transform: 'translate(-50%, -50%) rotate(47deg)',
          border: '1px solid rgba(168, 130, 255, 0.12)',
          borderRadius: '50%',
        }} />
        {/* Accent glow behind center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '40%',
          height: '40%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(168, 130, 255, 0.20) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      {/* Recall app icon centered */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: iconVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.4)',
        opacity: iconVisible ? 1 : 0,
        transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        width: 80,
        height: 80,
        filter: 'drop-shadow(0 0 40px rgba(168, 130, 255, 0.3)) drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/projects/Recall_Icon.svg"
          alt="Windows Recall icon"
          width={80}
          height={80}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

/* ── 3. Problem — Provocation + file vs memory search ── */
function RecallProblem() {
  return (
    <Section id="problem" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#A882FF" size="45%" top="20%" left="60%" opacity={0.03} />

      <Grid12>
        <div style={{ gridColumn: '2 / 12', textAlign: 'center', marginBottom: '64px' }}>
          <span className="t-label block mb-4" style={{ color: '#A882FF', opacity: 0.5 }}>Problem</span>
          <p className="t-subhead" style={{ color: 'var(--w75)', maxWidth: '600px', margin: '0 auto' }}>
            Search wants precision. Memory offers fragments.
          </p>
        </div>
      </Grid12>

      <Grid12>
        <div style={{ gridColumn: '1 / 7' }}>
          <p className="t-body mb-4">File search is built on certainty. You give it a filename or keyword. It matches exactly. Done.</p>
          <p className="t-body">But that&apos;s not how memory works. You remember a chart, maybe the color was blue, maybe it was from an email or a browser. Nothing precise enough for traditional search to grab hold of.</p>
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <p className="t-body mb-4">Recall flipped this. Instead of requiring exact queries, it indexed everything the system could see and made it searchable through semantic understanding.</p>
          <p className="t-body">If you&apos;re indexing everything, how do you let people search without overwhelming them? The system needed to think like a person, not force people to think like the system.</p>
        </div>
      </Grid12>

      <Grid12 className="mt-10">
        <div style={{ gridColumn: '1 / 13' }}>
          <p className="t-body">There was another layer to the ranking problem. The same memory could feel obviously correct or completely irrelevant depending on what the user was doing right now. A slide deck retrieved while preparing a presentation feels like exactly what you needed. The same slide deck surfaced while debugging code feels like noise. Relevance wasn&apos;t a fixed property of the result. It was shaped by the task. Static ranking couldn&apos;t account for that, which meant the interface had to give users enough context to make their own relevance judgment in the moment.</p>
        </div>
      </Grid12>

      <Grid12 className="mt-12">
        <div style={{ gridColumn: '1 / 13' }}>
          <Image
            src="/images/Recall search box.png"
            alt="Recall search interface"
            width={1400}
            height={800}
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
        </div>
      </Grid12>

    </Section>
  )
}

/* ── 4. Card Design — Pin + scroll ── */
function RecallCardDesign() {
  return (
    <Section id="card-design" padding="py-24 md:py-32">
      <Glow color="#A882FF" size="50%" top="50%" left="70%" opacity={0.04} />

      <Grid12>
        <div style={{ gridColumn: '1 / 6', position: 'sticky', top: '120px', alignSelf: 'start' }}>
          <span className="t-label block mb-4" style={{ color: '#A882FF', opacity: 0.5 }}>Card Design</span>
          <h2 className="t-heading mb-6">Cards as moments, not documents</h2>
          <p className="t-body mb-4">A Recall card needed to hold several pieces of information: a screenshot, app name, timestamp, extracted text, and relevance signals.</p>
          <p className="t-body mb-4">We built around the screenshot as the primary anchor. Not a cropped asset preview, but the actual desktop as it appeared. That context is what lodges in memory.</p>
          <p className="t-body mb-4">App name, timestamp, and extracted text stayed visible but secondary. The hierarchy pushed away from &quot;found document&quot; and toward &quot;revisited moment.&quot;</p>
          <p className="t-body">The result is something between a timeline and a search interface: visual enough to scan like memory works, structured enough to act predictably.</p>
        </div>

        <div style={{ gridColumn: '6 / 13' }}>
          <Image
            src="/images/projects/image 2065417573.png"
            alt="Recall card design showing screenshot-based memory cards"
            width={1400}
            height={900}
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 5. Why It Appeared — FLIPPED asymmetric ── */
function RecallWhyAppeared() {
  return (
    <Section id="card-relevance" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#A882FF" size="45%" top="40%" left="30%" opacity={0.03} />
      <DotGrid mask />

      <Grid12>
        {/* Diagram LEFT */}
        <div style={{ gridColumn: '1 / 7' }}>
          <Placeholder type="diag" label="Match transparency: highlighted terms, source context, confidence breakdown" minHeight="400px" />
        </div>

        {/* Text RIGHT */}
        <div style={{ gridColumn: '7 / 13' }}>
          <span className="t-label block mb-4" style={{ color: '#A882FF', opacity: 0.5 }}>Why It Appeared</span>
          <h2 className="t-heading mb-6">AI-powered search has a trust problem</h2>
          <p className="t-body mb-4">Technically correct results can feel wrong. Search for &quot;blue chart spreadsheet&quot; and the system might return something from an unrelated app that simply had a blue element.</p>
          <p className="t-body mb-4">We didn&apos;t try to eliminate every false positive at the model layer. Instead, we made results understandable.</p>
          <p className="t-body mb-4">Every card explained how it matched. Text matches were labeled as text matches. Visual matches were labeled as visual matches. Separating and showing these signals let users judge relevance themselves.</p>
          <p className="t-body">Perfection wasn&apos;t the goal. Legibility was.</p>
          <p className="t-body mt-4">Separating match types solved one problem. But users still hit a deeper tension: cast a wide net and the results felt noisy and intrusive. Filter too aggressively and the thing they were looking for disappeared. We couldn&apos;t pick one mode for everyone. Instead we exposed lightweight controls that let users broaden or tighten retrieval scope themselves. The system still did the semantic heavy lifting. But the user decided how much to see. Optimization moved from the algorithm to the interaction.</p>
          <p className="t-body mt-4">Memory search doesn&apos;t work like file search. People don&apos;t type a perfect query and expect one right answer. They start vague — &quot;that chart from last week&quot; — scan what surfaces, recognize something familiar, and refine from there. It&apos;s recognition-guided exploration, not retrieval. The interface had to support that loop: fast re-querying, results that updated fluidly, and enough context on each card to trigger recognition without requiring a click. Every round-trip through the loop had to feel effortless or users would give up and go dig through folders instead.</p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 6. Iteration — Before/after ── */
function RecallIteration() {
  return (
    <Section id="early-iteration" padding="py-24 md:py-32">
      <Glow color="#A882FF" size="50%" top="50%" left="50%" opacity={0.03} />

      <Grid12>
        <div style={{ gridColumn: '1 / 13', marginBottom: '32px' }}>
          <span className="t-label block mb-4" style={{ color: '#A882FF', opacity: 0.5 }}>Early Iteration</span>
          <h2 className="t-heading mb-6">Merged results killed clarity</h2>
        </div>
      </Grid12>

      <Grid12>
        <div style={{ gridColumn: '1 / 7' }}>
          <p className="t-body mb-4">First version blended everything. Text matches and visual matches went into one ranked list. Clean, elegant, simple.</p>
          <p className="t-body">Testing proved it didn&apos;t work. Text matches dominated the ranking. Visual matches got buried. Users couldn&apos;t figure out why something appeared.</p>
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <p className="t-body mb-4">We split text and visual matches into separate sections. That single structural change made the system&apos;s logic transparent. Cognitive load dropped. Trust went up.</p>
          <p className="t-body">The AI was technically correct even in the first version. But opaque correctness erodes trust faster than transparent mistakes.</p>
        </div>
      </Grid12>

      <Grid12 className="mt-12">
        <div style={{ gridColumn: '1 / 7' }}>
          <Placeholder type="ui" label="Before: merged view — text and visual in one ranked list" minHeight="300px" />
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <Placeholder type="ui" label="After: separated view — distinct text and visual sections" minHeight="300px" />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 7. Performance — Light theme with video ── */
function RecallPerformance() {
  return (
    <section id="performance" style={{ background: '#f0f0f0', color: '#1a1a1a' }}>
      <div style={{ padding: '96px var(--pad) 80px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <Grid12>
          <div style={{ gridColumn: '2 / 12', marginBottom: '48px' }}>
            <span className="t-label block mb-4" style={{ color: '#7B5FBF', opacity: 0.7 }}>Performance</span>
            <h2 className="t-heading mb-6" style={{ color: '#1a1a1a' }}>Fast enough to feel alive</h2>
            <p className="t-body mb-4" style={{ color: '#444' }}>Embedding indexing and local retrieval are computationally heavy. Most queries came back fast. Some didn&apos;t. Users had to wait.</p>
            <p className="t-body mb-4" style={{ color: '#444' }}>We made waiting feel like progress. Results evolved live as users typed, each keystroke refining the results in real time. No waiting for a full query. Constant forward motion.</p>
            <p className="t-body" style={{ color: '#444' }}>Design and engineering iterated constantly. We tuned how aggressively the system sent queries based on actual typing patterns, found a balance that avoided expensive retriggering without sacrificing responsiveness.</p>
          </div>
        </Grid12>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', borderRadius: '12px', overflow: 'hidden' }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recall_fig05-JAHG0aeAytDorw718qnZiWG2n09om9.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}

/* ── 8. Trust — Light theme privacy grid ── */
function RecallTrust() {
  return (
    <section id="trust" style={{ background: '#f0f0f0', color: '#1a1a1a' }}>
      <div style={{ padding: '96px var(--pad) 80px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <Grid12>
          <div style={{ gridColumn: '1 / 13', marginBottom: '32px' }}>
            <span className="t-label block mb-4" style={{ color: '#7B5FBF', opacity: 0.7 }}>Trust</span>
            <h2 className="t-heading mb-6" style={{ color: '#1a1a1a' }}>Privacy was the whole product</h2>
            <p className="t-body mb-4" style={{ maxWidth: '700px', color: '#444' }}>Recall captures everything. That only works if people trust where the data sits, who can see it, and what control they actually have.</p>
            <p className="t-body" style={{ maxWidth: '700px', color: '#444' }}>On-device processing wasn&apos;t optional. All capture, all indexing, all retrieval happened locally. Nothing left the machine.</p>
          </div>
        </Grid12>

        {/* 2×2 privacy cards */}
        <Grid12>
          {[
            { title: 'Data storage', desc: 'Everything stays on-device. No cloud processing, no external servers. Local indexing, local retrieval.' },
            { title: 'User control', desc: 'Opt-in by default. Exclude apps, pause indexing, delete any memory. Full user agency.' },
            { title: 'Transparency', desc: 'Every card shows provenance. Match types labeled. System boundaries visible, never hidden.' },
            { title: 'Deletion', desc: 'Delete individual memories or wipe everything. No hidden caches. What you delete is gone.' },
          ].map((card, i) => (
            <div key={i} style={{ gridColumn: i < 2 ? `${1 + i * 6} / ${7 + i * 6}` : `${1 + (i - 2) * 6} / ${7 + (i - 2) * 6}`, marginTop: i >= 2 ? '24px' : undefined }}>
              <div className="p-6" style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 className="t-subhead mb-2" style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', color: '#1a1a1a' }}>{card.title}</h3>
                <p className="t-body" style={{ color: '#444' }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </Grid12>

        <Grid12 className="mt-10">
          <div style={{ gridColumn: '1 / 8' }}>
            <p className="t-body mb-4" style={{ color: '#444' }}>After public scrutiny, things changed. Recall flipped from opt-out to opt-in. Users got the ability to exclude apps and pause indexing.</p>
            <p className="t-body" style={{ color: '#444' }}>We made those boundaries tangible. Cards showed where results came from and when. Excluded content got explicit explanation instead of silent gaps. Trust wasn&apos;t a single setting. It lived in every interaction.</p>
          </div>
        </Grid12>
      </div>
    </section>
  )
}

/* ── 9. Constraints — Light theme with video ── */
function RecallConstraints() {
  return (
    <section id="constraints" style={{ background: '#f0f0f0', color: '#1a1a1a' }}>
      <div style={{ padding: '96px var(--pad) 96px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="text-center mb-12">
          <p className="t-display" style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 300, color: '#333' }}>
            RAG killed for speed
          </p>
          <p className="t-label mt-4" style={{ color: '#666' }}>Synthesis abandoned to keep search instantaneous</p>
        </div>

        <Grid12>
          <div style={{ gridColumn: '2 / 10' }}>
            <span className="t-label block mb-4" style={{ color: '#7B5FBF', opacity: 0.7 }}>Constraints &amp; Tradeoffs</span>
            <h2 className="t-heading mb-6" style={{ color: '#1a1a1a' }}>We killed RAG to keep search fast</h2>
            <p className="t-body mb-4" style={{ color: '#444' }}>Early on, we explored synthesis across memories. Retrieval-augmented generation could answer higher-level questions by stitching together context from many screenshots.</p>
            <p className="t-body mb-4" style={{ color: '#444' }}>Latency killed it. Retrieving and generating across large memory sets created delays that broke the core expectation: search should feel instantaneous.</p>
            <p className="t-body mb-4" style={{ color: '#444' }}>We abandoned synthesis and focused on speed and legibility instead. Surface relevant moments. Let people interpret them.</p>
            <p className="t-body" style={{ color: '#444' }}>And honestly, it was the right call design-wise. The system helps people rediscover what they saw. It doesn&apos;t rewrite their history for them.</p>
          </div>
        </Grid12>

        <div style={{ maxWidth: 'var(--max-w)', margin: '48px auto 0', borderRadius: '12px', overflow: 'hidden' }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/shilpa_0603_03%201.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}

/* ── 10. Impact — Closing + glass callout ── */
function RecallImpact() {
  return (
    <Section id="impact" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#A882FF" size="50%" top="40%" left="50%" opacity={0.04} />

      <Grid12>
        <div style={{ gridColumn: '2 / 8' }}>
          <span className="t-label block mb-4" style={{ color: '#A882FF', opacity: 0.5 }}>Impact</span>
          <p className="t-body mb-4">Separating visual and text matches proved it wasn&apos;t just philosophy. In testing, users could explain why each result appeared and quickly reject things that didn&apos;t fit. Mysterious AI behavior became rational.</p>
          <p className="t-body mb-4">People recovered information they&apos;d written off as lost. A code snippet they saw once in documentation. Files from months ago they&apos;d forgotten existed.</p>
          <p className="t-body mb-4">The work rippled further. Privacy and trust patterns from Recall became reference points across Windows teams.</p>
          <p className="t-body">The search approach itself became foundational. Principles of relevance transparency and match-type separation showed up in Windows Search and File Explorer updates.</p>
        </div>
      </Grid12>

      <Grid12 className="mt-12">
        <div style={{ gridColumn: '1 / 13' }}>
          <Image
            src="/image 2065417615.png"
            alt="Recall impact — search transparency and match-type separation in practice"
            width={1400}
            height={800}
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
        </div>
      </Grid12>

      <Grid12 className="mt-12">
        <div style={{ gridColumn: '3 / 11' }}>
          <GlassCard className="p-8 md:p-10">
            <Glow color="#A882FF" size="80%" top="50%" left="50%" opacity={0.06} />
            <p className="t-body relative z-10" style={{ color: 'var(--w60)', fontSize: '15px', lineHeight: 1.75 }}>
              Recall proved that AI in core OS features doesn&apos;t require opacity or experimental disclaimers. Clear transparency, visible provenance, predictable interactions. That combination is what lets people trust and use powerful capabilities without fear.
            </p>
          </GlassCard>
        </div>
      </Grid12>

      <Grid12 className="mt-16">
        <div style={{ gridColumn: '1 / 13', textAlign: 'center' }}>
          <span className="t-label block mb-3">Next project</span>
          <Link href="/teams-for-education" className="t-heading" style={{ color: 'var(--w60)', transition: 'color 300ms' }}>
            Teams for Education &rarr;
          </Link>
        </div>
      </Grid12>
    </Section>
  )
}

function RecallFooter() {
  return (
    <footer className="relative" style={{ padding: '48px var(--pad)', borderTop: '1px solid var(--w04)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Link href="/" className="text-sm" style={{ color: 'var(--w25)' }}>Bryce Henthorn</Link>
        <a href="mailto:bhenthorn2757@gmail.com" className="text-xs" style={{ color: 'var(--w25)' }}>bhenthorn2757@gmail.com</a>
      </div>
    </footer>
  )
}

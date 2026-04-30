'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NavEditorial } from '@/components/editorial/NavEditorial'
import { Section } from '@/components/editorial/Section'
import { Grid12 } from '@/components/editorial/Grid12'
import { GlassCard } from '@/components/editorial/GlassCard'
import { Glow } from '@/components/atmosphere/Glow'
import { DotGrid } from '@/components/atmosphere/DotGrid'
import { EdgeLine } from '@/components/atmosphere/EdgeLine'
import { AnimateIn } from '@/components/animate-in'

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   Accent: --a: #5EC8B4 (teal)
   ═══════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  return (
    <div style={{ '--a': '#5EC8B4' } as React.CSSProperties}>
      <NavEditorial />
      <main>
        <AboutHero />
        <AboutPortrait />
        <AboutPhilosophy />
        <AboutTimeline />
        <AboutDrawnTo />
      </main>
      <AboutFooter />
    </div>
  )
}

/* ── 1. Hero — Quote IS the visual ── */
function AboutHero() {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t) }, [])

  const lines = [
    { text: 'Serial problem solver.', accent: false },
    { text: 'Fixated on optimizing systems.', accent: false },
    { text: 'Obsessed with structure and flow.', accent: false },
    { text: 'Unapologetic technology geek.', accent: false },
    { text: 'So naturally, I fell in love with UX design.', accent: true },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />
      <DotGrid mask />
      <Glow color="#5EC8B4" size="50%" top="50%" left="50%" opacity={0.04} />

      <div className="relative z-10 w-full" style={{ padding: 'var(--pad)' }}>
        <div style={{ maxWidth: 'var(--max-w)' }}>
          {lines.map((line, i) => (
            <h1
              key={i}
              className="t-display block"
              style={{
                color: line.accent ? '#5EC8B4' : 'var(--w88)',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 1s var(--expo), transform 1s var(--expo)',
                transitionDelay: `${0.1 + i * 0.08}s`,
                marginBottom: i < lines.length - 1 ? '4px' : '0',
                fontSize: 'clamp(18px, 3.4vw, 50px)',
                whiteSpace: 'nowrap',
              }}
            >
              {line.text}
            </h1>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-20 flex items-center gap-4"
          style={{
            opacity: show ? 1 : 0,
            transition: 'opacity 1s var(--expo)',
            transitionDelay: '0.8s',
          }}
        >
          <div style={{ width: '48px', height: '1px', background: 'var(--w15)' }} />
          <span className="t-label">Scroll</span>
        </div>
      </div>
    </section>
  )
}

/* ── 2. Portrait + Intro — Asymmetric ── */
function AboutPortrait() {
  return (
    <Section padding="py-24 md:py-32">
      <Glow color="#5EC8B4" size="40%" top="30%" left="20%" opacity={0.03} />

      <Grid12>
        {/* Portrait left: cols 1-5 */}
        <div style={{ gridColumn: '1 / 6' }}>
          <AnimateIn delay={0.05}>
            <div className="relative">
              <Glow color="#5EC8B4" size="120%" top="50%" left="50%" opacity={0.07} />
              <figure className="portrait-figure">
                <Image
                  src="/images/bryce-portrait.jpg"
                  alt="Bryce Henthorn at altitude on a hike, smiling toward the camera with a green valley and clouds behind"
                  width={1200}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={false}
                />
              </figure>
            </div>
          </AnimateIn>
        </div>

        {/* Bio text right: cols 6-12 */}
        <div style={{ gridColumn: '6 / 13' }}>
          <span className="t-label block mb-4" style={{ color: '#5EC8B4', opacity: 0.5 }}>Want a bit more?</span>
          <p className="t-body-lg mb-4">
            I&apos;m a product designer working on <span style={{ color: 'var(--w75)' }}>AI experiences inside Windows at Microsoft</span>. My job sits at a strange and exciting intersection: operating systems, agents, enterprise workflows, trust, orchestration. All the messy, high-stakes problems that show up when software stops being a tool and starts acting on your behalf.
          </p>
          <p className="t-body mb-4" style={{ color: 'var(--w35)' }}>
            The more honest version is that I&apos;m wired to solve problems. I don&apos;t really know how to turn it off. If something feels inefficient, structurally off, or just vaguely wrong, I will keep pulling on it until I understand it. Sometimes that means building prototypes late at night. Sometimes it means mapping systems no one asked me to map.
          </p>
          <p className="t-body" style={{ color: 'var(--w30)' }}>
            I have a habit of obsessively researching the &quot;right&quot; solution to things most people would settle on in an afternoon. I like constraints. I like tradeoffs. I like figuring out what the real problem is underneath the surface problem.
          </p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 3. Design Philosophy — Centered quote + two-column ── */
function AboutPhilosophy() {
  return (
    <Section padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#5EC8B4" size="45%" top="40%" left="55%" opacity={0.03} />

      {/* Centered pull quote */}
      <Grid12>
        <div style={{ gridColumn: '2 / 12', textAlign: 'center', marginBottom: '64px' }}>
          <p className="t-subhead" style={{ color: 'var(--w75)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
            &ldquo;Good design should feel inevitable in hindsight.&rdquo;
          </p>
        </div>
      </Grid12>

      {/* Two columns */}
      <Grid12>
        <div style={{ gridColumn: '1 / 7' }}>
          <p className="t-body mb-4">
            Design, for me, is <span style={{ color: 'var(--w75)' }}>structure</span>. It&apos;s the quiet architecture that makes complexity feel obvious. I care about progressive disclosure. I care about removing noise. I care about building systems that scale without collapsing under their own weight.
          </p>
          <p className="t-body">
            In the AI space especially, I think we&apos;re in a moment where clarity matters more than novelty. Agents that interrupt at the wrong time. Automation that feels unpredictable. Those are <span style={{ color: 'var(--w75)' }}>structural problems, not styling problems</span>.
          </p>
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <p className="t-body mb-4">
            I&apos;m not trying to design isolated features. I&apos;m trying to design how systems behave over time. How they learn. How they earn trust. How they stay in flow instead of fragmenting it.
          </p>
          <p className="t-body mb-4">
            I&apos;m ambitious about the impact of the work, but I&apos;m pretty grounded about the craft. I still sweat alignment, hierarchy, edge cases, and empty states. The details matter because they&apos;re where trust is won or lost.
          </p>
          <p className="t-body">
            If you&apos;re building something that sits at the edge of what software can do, especially where AI and real human workflows meet, that&apos;s where I&apos;m most energized. I like hard problems. I like unclear terrain. And I like turning chaos into something that feels simple and durable.
          </p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 4. Experience Timeline — Asymmetric with teal line ── */
function AboutTimeline() {
  return (
    <Section padding="py-24 md:py-32">
      <Glow color="#5EC8B4" size="40%" top="50%" left="30%" opacity={0.03} />
      <DotGrid mask />

      <Grid12>
        {/* Summary left: cols 1-5 */}
        <div style={{ gridColumn: '1 / 6' }}>
          <span className="t-label block mb-4" style={{ color: '#5EC8B4', opacity: 0.5 }}>Experience</span>
          <h2 className="t-heading mb-4">Building systems at scale since 2018</h2>
          <p className="t-body">Senior Product Designer at Microsoft, leading AI-native experiences across Windows Shell, Copilot, and M365 ecosystems.</p>
        </div>

        {/* Timeline right: cols 6-12 */}
        <div style={{ gridColumn: '6 / 13', position: 'relative', paddingLeft: '32px' }}>
          {/* Teal vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: '1px',
              background: 'linear-gradient(180deg, #5EC8B4 0%, rgba(94, 200, 180, 0.1) 100%)',
            }}
          />

          {/* Microsoft roles */}
          <div className="mb-10">
            <h3 className="text-sm font-medium mb-6" style={{ color: 'var(--w75)' }}>Microsoft</h3>
            <div className="flex flex-col gap-6">
              {[
                { role: 'Windows Agent Platform', year: '2025 – Present', desc: 'Led agent visibility and orchestration design across Shell, Copilot, and M365 integration surfaces. 3 engineering partner teams.', active: true },
                { role: 'Copilot Actions', year: '2025 – Present', active: true },
                { role: 'Windows Recall', year: '2023 – 2025', desc: 'Designed semantic search experience for Copilot+ PCs. Shipped at Build 2024. Navigated privacy redesign after public launch.' },
                { role: 'File Explorer Modernization (Windows 11)', year: '2022 – 2023' },
                { role: 'Teams for Education', year: '2020 – 2021', desc: 'Led interaction design for virtual classroom experience serving 150M+ users. Reframed team strategy from growth metrics to engagement architecture.' },
                { role: 'Microsoft Education', year: '2018 – 2020' },
              ].map((item, i) => (
                <div key={i} className="relative" style={{ paddingLeft: '20px' }}>
                  {/* Dot */}
                  <div
                    className="absolute"
                    style={{
                      left: '-37px',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: item.active ? '#5EC8B4' : 'var(--w15)',
                      boxShadow: item.active ? '0 0 12px rgba(94, 200, 180, 0.4)' : undefined,
                      animation: item.active ? 'pulseGlow 3s ease-in-out infinite' : undefined,
                    }}
                  />
                  <p className="text-sm" style={{ color: 'var(--w60)' }}>{item.role}</p>
                  <p className="t-mono mt-1" style={{ color: 'var(--w15)' }}>{item.year}</p>
                  {item.desc && <p className="t-body mt-1" style={{ fontSize: '13px' }}>{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div style={{ height: '1px', background: 'var(--w06)', margin: '0 0 24px 20px' }} />

          {/* Prior */}
          <div style={{ paddingLeft: '20px' }}>
            <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--w75)' }}>Prior</h3>
            <div className="flex flex-col gap-4">
              {[
                { company: 'Amazon', note: 'Contract' },
                { company: 'Nordstrom', note: 'Contract' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div
                    className="absolute"
                    style={{ left: '-57px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--w08)' }}
                  />
                  <p className="text-sm" style={{ color: 'var(--w45)' }}>{item.company}</p>
                  <p className="t-mono mt-0.5" style={{ color: 'var(--w12)' }}>{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 5. What I'm Drawn To — Staggered card grid ── */
function AboutDrawnTo() {
  return (
    <Section padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#5EC8B4" size="50%" top="50%" left="50%" opacity={0.03} />

      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <span className="t-label block mb-8" style={{ color: '#5EC8B4', opacity: 0.5 }}>What I&apos;m drawn to</span>

        {/* 3+2 staggered grid */}
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { title: 'Novel interaction paradigms', desc: 'Problems with no existing mental model', shape: '△' },
            { title: 'Emergent structure', desc: 'Structure that must emerge from ambiguity', shape: '○' },
            { title: 'Trust-dependent adoption', desc: 'Problems where trust determines adoption', shape: '□' },
          ].map((card, i) => (
            <GlassCard key={i} hover className="p-6 group">
              <span className="block text-2xl mb-4" style={{ color: '#5EC8B4', opacity: 0.3 }}>{card.shape}</span>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--w60)' }}>{card.title}</h3>
              <p className="t-body" style={{ fontSize: '13px' }}>{card.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: '1fr 1fr', maxWidth: '66%' }}>
          {[
            { title: 'Systems at scale', desc: 'Systems thinking at enterprise and OS scale', shape: '◇' },
            { title: 'Calm complexity', desc: 'Progressive disclosure and calm complexity', shape: '⬡' },
          ].map((card, i) => (
            <GlassCard key={i} hover className="p-6 group">
              <span className="block text-2xl mb-4" style={{ color: '#5EC8B4', opacity: 0.3 }}>{card.shape}</span>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--w60)' }}>{card.title}</h3>
              <p className="t-body" style={{ fontSize: '13px' }}>{card.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  )
}


function AboutFooter() {
  return (
    <footer className="relative" style={{ padding: '48px var(--pad)', borderTop: '1px solid var(--w04)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Link href="/" className="text-sm" style={{ color: 'var(--w25)' }}>Bryce Henthorn</Link>
        <a href="mailto:bhenthorn2757@gmail.com" className="text-xs" style={{ color: 'var(--w25)' }}>bhenthorn2757@gmail.com</a>
      </div>
    </footer>
  )
}

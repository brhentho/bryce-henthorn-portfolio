'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { NavEditorial } from '@/components/editorial/NavEditorial'
import { Section } from '@/components/editorial/Section'
import { Grid12 } from '@/components/editorial/Grid12'
import { GlassCard } from '@/components/editorial/GlassCard'
import { Glow } from '@/components/atmosphere/Glow'
import { DotGrid } from '@/components/atmosphere/DotGrid'
import { PerspectiveGrid } from '@/components/atmosphere/PerspectiveGrid'
import { EdgeLine } from '@/components/atmosphere/EdgeLine'
import { Placeholder } from '@/components/placeholder/Placeholder'

/* ═══════════════════════════════════════════════════════════════
   HOMEPAGE
   Multi-color ambient — no single --a
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <NavEditorial />
      <main>
        <HomeHero />
        <FeaturedCard />
        <CardPair />
        <PhilosophyStrip />
        <ContactCTA />
      </main>
      <HomeFooter />
    </>
  )
}

/* ── 1. Hero ── */
function HomeHero() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  const t = 'opacity 1s var(--expo), transform 1s var(--expo)'

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background hero image */}
      <Image
        src="/images/heroes/HomeHeroRender.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        style={{
          opacity: show ? 1 : 0,
          transition: 'opacity 1.2s var(--expo)',
        }}
      />

      {/* Gradient overlay: top 40% dark, middle 15%, bottom 85% */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,6,10,0.85) 0%, rgba(6,6,10,0.15) 40%, rgba(6,6,10,0.85) 100%)',
        }}
      />

      {/* Atmosphere */}
      <Glow color="#5EA6F5" size="50%" top="30%" left="20%" opacity={0.04} />
      <Glow color="#A882FF" size="40%" top="50%" left="70%" opacity={0.03} />
      <Glow color="#6C63FF" size="45%" top="70%" left="45%" opacity={0.03} />
      <PerspectiveGrid />

      {/* Corner brackets */}
      <CornerBrackets show={show} />

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 w-full" style={{ padding: 'var(--pad)', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '720px' }}>
          <h1
            className="t-display"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(24px)',
              transition: t,
              transitionDelay: '0.2s',
            }}
          >
            Designing trust between people and AI agents at OS scale
          </h1>

          <p
            className="t-body mt-6"
            style={{
              maxWidth: '480px',
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(24px)',
              transition: t,
              transitionDelay: '0.4s',
            }}
          >
            Senior Product Designer at Microsoft, leading AI-native experiences across Windows.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex items-center gap-4"
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

function CornerBrackets({ show }: { show: boolean }) {
  const style = (
    top?: string,
    right?: string,
    bottom?: string,
    left?: string,
    borderSides: string[] = []
  ): React.CSSProperties => ({
    position: 'absolute',
    width: '24px',
    height: '24px',
    top,
    right,
    bottom,
    left,
    borderColor: 'var(--w08)',
    borderWidth: 0,
    ...Object.fromEntries(borderSides.map((s) => [`border${s}Width`, '1px'])),
    opacity: show ? 1 : 0,
    transition: 'opacity 0.6s var(--expo)',
    transitionDelay: '0.6s',
    zIndex: 10,
    pointerEvents: 'none' as const,
  })

  return (
    <>
      <div style={style('20px', undefined, undefined, '20px', ['Top', 'Left'])} />
      <div style={style('20px', '20px', undefined, undefined, ['Top', 'Right'])} />
      <div style={style(undefined, undefined, '20px', '20px', ['Bottom', 'Left'])} />
      <div style={style(undefined, '20px', '20px', undefined, ['Bottom', 'Right'])} />
    </>
  )
}

/* ── 2. Featured Card (Agents) ── */
function FeaturedCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <Section id="projects" padding="py-16 md:py-24">
      <Glow color="#5EA6F5" size="60%" top="50%" left="50%" opacity={0.03} />

      {/* Section label row */}
      <div
        className="flex items-center gap-3 mb-8"
        style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '0 auto 32px' }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--w15)',
          }}
        />
        <span className="t-label">Selected work</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--w06)' }} />
      </div>

      {/* Full-width Agents card */}
      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <Link href="/agents-in-windows" className="block">
          <GlassCard
            hover
            className="group"
          >
            <div
              className="relative overflow-hidden"
              style={{ minHeight: '480px' }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Hero image */}
              <Image
                src="/images/heroes/AgentsInWindowsHero.jpg"
                alt="Agents in Windows case study"
                fill
                className="object-cover"
                style={{
                  opacity: 0.6,
                  transition: 'transform 600ms var(--expo), opacity 600ms var(--expo)',
                  transform: hovered ? 'scale(1.02)' : 'scale(1)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 30%, rgba(6,6,10,0.9) 100%)',
                }}
              />

              {/* Floating taskbar placeholder */}
              <div
                className="absolute"
                style={{
                  top: '10%',
                  right: '8%',
                  animation: 'float0 7s ease-in-out infinite',
                }}
              >
                <Placeholder type="ui" label="Taskbar UI" minHeight="80px" className="w-[200px]" />
              </div>

              {/* Card info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="t-label" style={{ color: '#5EA6F5', opacity: 0.6 }}>
                  Agents in Windows
                </span>
                <h3 className="t-heading mt-2" style={{ maxWidth: '600px' }}>
                  Solving Trust and Visibility for AI Agents in the Operating System.
                </h3>

                {/* Hover arrow */}
                <div
                  className="flex items-center gap-2 mt-4"
                  style={{
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'all 400ms var(--expo)',
                  }}
                >
                  <span className="t-label" style={{ color: 'var(--w45)' }}>
                    View case study
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: 'var(--w45)' }}
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </div>
          </GlassCard>
        </Link>
      </div>
    </Section>
  )
}

/* ── 3. Card Pair (Recall + Teams) ── */
function CardPair() {
  return (
    <Section padding="pb-16 md:pb-24 pt-0">
      <Glow color="#A882FF" size="50%" top="30%" left="25%" opacity={0.03} />
      <Glow color="#6C63FF" size="50%" top="60%" left="75%" opacity={0.03} />

      <div
        className="card-pair"
        style={{
          padding: '0 var(--pad)',
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--grid-gap)',
        }}
      >
        <ProjectCardSmall
          href="/recall"
          image="/images/heroes/Recallhero.jpg"
          label="Windows Recall"
          heading="Designing Semantic Search for Everything You've Seen."
          accentColor="#A882FF"
        />
        <ProjectCardSmall
          href="/teams-for-education"
          image="/images/heroes/TeamsProjectHero.jpg"
          label="Teams for Education"
          heading="Modernizing Online Classes for an Authentic Virtual Experience."
          accentColor="#6C63FF"
        />
      </div>
    </Section>
  )
}

function ProjectCardSmall({
  href,
  image,
  label,
  heading,
  accentColor,
}: {
  href: string
  image: string
  label: string
  heading: string
  accentColor: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={href} className="block">
      <GlassCard hover className="group">
        <div
          className="relative overflow-hidden"
          style={{ minHeight: '340px' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={image}
            alt={`${label} case study`}
            fill
            className="object-cover"
            style={{
              opacity: 0.5,
              transition: 'transform 600ms var(--expo)',
              transform: hovered ? 'scale(1.02)' : 'scale(1)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 20%, rgba(6,6,10,0.9) 100%)',
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="t-label" style={{ color: accentColor, opacity: 0.6 }}>
              {label}
            </span>
            <h3 className="t-subhead mt-2">{heading}</h3>

            <div
              className="flex items-center gap-2 mt-3"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'all 400ms var(--expo)',
              }}
            >
              <span className="t-label" style={{ color: 'var(--w45)' }}>
                View case study
              </span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--w45)' }}>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}

/* ── 4. Philosophy Strip ── */
function PhilosophyStrip() {
  return (
    <Section padding="py-20 md:py-32">
      <EdgeLine position="top" />
      <EdgeLine position="bottom" />
      <Glow color="#5EA6F5" size="40%" top="50%" left="50%" opacity={0.02} />

      <Grid12>
        {/* Quote left: cols 2–7 */}
        <div style={{ gridColumn: '2 / 7' }}>
          <p className="t-subhead" style={{ color: 'var(--w75)' }}>
            Senior Product Designer with 10+ years of experience. I specialize in agent orchestration systems, OS-level interaction models, and trustworthy human–AI workflows at enterprise scale.
          </p>
        </div>

        {/* Supporting text right: cols 8–12 */}
        <div style={{ gridColumn: '8 / 12' }}>
          <p className="t-body">
            I design systems before surfaces. Structure and behavior come first, complexity unfolds on demand, and transparency, predictability, and user control are never features but foundations. A systems thinker with deep cross-functional leadership across shell, platform, and M365 ecosystems.
          </p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 5. Contact CTA ── */
function ContactCTA() {
  return (
    <Section padding="py-16 md:py-24">
      <Glow color="#5EC8B4" size="40%" top="50%" left="50%" opacity={0.04} pulse />

      <Grid12>
        <div style={{ gridColumn: '3 / 11' }}>
          <GlassCard className="p-10 md:p-16 text-center">
            <span className="t-label block mb-4">Get in touch</span>
            <h2 className="t-heading mb-4">Let&apos;s build something together</h2>
            <p className="t-body mb-8 mx-auto" style={{ maxWidth: '480px' }}>
              I&apos;m always interested in discussing design systems, AI interaction patterns, and new opportunities.
            </p>
            <a
              href="mailto:bhenthorn2757@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm tracking-wide"
              style={{
                border: '1px solid var(--w08)',
                color: 'var(--w60)',
                transition: 'all 400ms var(--expo)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#5EC8B4'
                e.currentTarget.style.color = '#5EC8B4'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(94, 200, 180, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--w08)'
                e.currentTarget.style.color = 'var(--w60)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              bhenthorn2757@gmail.com
            </a>
          </GlassCard>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── Footer ── */
function HomeFooter() {
  return (
    <footer
      className="relative"
      style={{
        padding: '48px var(--pad)',
        borderTop: '1px solid var(--w04)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span className="block text-sm" style={{ color: 'var(--w25)', fontWeight: 500 }}>
            Bryce Henthorn
          </span>
          <span className="block text-xs mt-1" style={{ color: 'var(--w15)' }}>
            Seattle, WA
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:bhenthorn2757@gmail.com"
            className="text-xs"
            style={{ color: 'var(--w25)', transition: 'color 300ms' }}
          >
            bhenthorn2757@gmail.com
          </a>
          <Link
            href="/about"
            className="text-xs"
            style={{ color: 'var(--w25)', transition: 'color 300ms' }}
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}

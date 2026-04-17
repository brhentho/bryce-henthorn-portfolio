'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { NavEditorial } from '@/components/editorial/NavEditorial'
import { Section } from '@/components/editorial/Section'
import { Grid12 } from '@/components/editorial/Grid12'
import { GlassCard } from '@/components/editorial/GlassCard'
import { Glow } from '@/components/atmosphere/Glow'
import { EdgeLine } from '@/components/atmosphere/EdgeLine'
import { HeroAnimation } from '@/components/motion/hero-morph/HeroAnimation'

/* ═══════════════════════════════════════════════════════════════
   HOMEPAGE
   Multi-color ambient — no single --a
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <NavEditorial />
      <main>
        <HeroAnimation />
        <FeaturedCard />
        <CardPair />
        <PhilosophyStrip />
      </main>
      <HomeFooter />
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
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Image container */}
              <div className="relative overflow-hidden aspect-[16/9] md:aspect-auto md:h-[400px]">
                <Image
                  src="/images/projects/Agents project card.png"
                  alt="Agents in Windows case study"
                  fill
                  className="object-cover object-[85%_center] md:object-center"
                  style={{
                    transition: 'transform 600ms var(--expo)',
                    transform: hovered ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>

              {/* Card info */}
              <div className="p-6 md:p-12">
                <span className="t-label" style={{ color: '#5EA6F5', opacity: 0.6 }}>
                  Agents in Windows
                </span>
                <h3
                  className="mt-2"
                  style={{
                    fontSize: 'clamp(18px, 4.5vw, 44px)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    maxWidth: '600px',
                  }}
                >
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
          gap: 'var(--grid-gap)',
        }}
      >
        <ProjectCardSmall
          href="/recall"
          image="/images/projects/Recall project card.png"
          label="Windows Recall"
          heading="Designing Semantic Search for Everything You've Seen."
          accentColor="#A882FF"
        />
        <ProjectCardSmall
          href="/teams-for-education"
          image="/images/projects/Teams for EDU project card.png"
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
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image container */}
          <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:h-[240px]">
            <Image
              src={image}
              alt={`${label} case study`}
              fill
              className="object-cover object-center"
              style={{
                transition: 'transform 600ms var(--expo)',
                transform: hovered ? 'scale(1.02)' : 'scale(1)',
              }}
            />
          </div>

          {/* Card info */}
          <div className="p-5 md:p-8">
            <span className="t-label" style={{ color: accentColor, opacity: 0.6 }}>
              {label}
            </span>
            <h3
              className="mt-2"
              style={{
                fontSize: 'clamp(15px, 3.8vw, 32px)',
                lineHeight: 1.22,
                letterSpacing: '-0.005em',
              }}
            >
              {heading}
            </h3>

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
        {/* Thesis left: cols 2–7 */}
        <div style={{ gridColumn: '2 / 7' }}>
          <span className="t-label block mb-6" style={{ color: 'var(--w45)' }}>Thesis</span>
          <p className="t-subhead" style={{ color: 'var(--w88)' }}>
            When software runs on your behalf without being asked, interface design stops being about features and starts being about agreements — what the system promises, what it shows, and what it lets you stop.
          </p>
        </div>

        {/* Through-line right: cols 8–12 */}
        <div style={{ gridColumn: '8 / 12' }} className="mt-10 md:mt-0">
          <span className="t-label block mb-6" style={{ color: 'var(--w45)' }}>Through-line</span>
          <p className="t-body" style={{ color: 'var(--w75)' }}>
            Across Agents in Windows, Recall, and Teams for Education, the same job shows up: make the invisible visible, the automatic interruptible, the AI auditable. I design systems before surfaces — structure and behavior come first, complexity unfolds on demand, and transparency, predictability, and user control are never features but foundations.
          </p>
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

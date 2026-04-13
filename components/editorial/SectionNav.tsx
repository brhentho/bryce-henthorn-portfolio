'use client'

import { useEffect, useState, useCallback } from 'react'

interface SectionNavProps {
  sections: { id: string; label: string }[]
}

export function SectionNav({ sections }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  const handleClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView()
  }, [])

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    if (els.length === 0) return

    const ratios = new Map<string, number>()

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        }
        let best = ''
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        if (best) setActive(best)
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
        rootMargin: '-10% 0px -10% 0px',
      },
    )

    for (const el of els) obs.observe(el)
    return () => obs.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Page sections"
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 110,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
      className="section-nav"
    >
      {sections.map((s) => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            title={s.label}
            aria-label={`Scroll to ${s.label}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => handleClick(s.id)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: `1.5px solid ${isActive ? 'var(--a)' : 'var(--w12)'}`,
              background: isActive ? 'var(--a)' : 'transparent',
              boxShadow: isActive ? '0 0 8px color-mix(in srgb, var(--a) 30%, transparent)' : 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 300ms var(--expo)',
            }}
          />
        )
      })}
    </nav>
  )
}

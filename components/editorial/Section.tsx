'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  noReveal?: boolean
  padding?: string
}

export function Section({
  children,
  className,
  id,
  noReveal = false,
  padding = 'py-24 md:py-32',
}: SectionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (noReveal) return
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('vis')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('vis')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [noReveal])

  return (
    <section
      ref={ref}
      id={id}
      className={cn(noReveal ? 'relative' : 'sec', padding, className)}
    >
      {children}
    </section>
  )
}

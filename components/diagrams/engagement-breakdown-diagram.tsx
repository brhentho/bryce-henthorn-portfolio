"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

const virtualIssues = [
  { icon: "camera-off", label: "Cameras off", desc: "No visual presence" },
  { icon: "mute", label: "Everyone muted", desc: "Speaking feels risky" },
  { icon: "grid", label: "Flat video grid", desc: "No spatial structure" },
  { icon: "shuffle", label: "Interchangeable", desc: "No consistent seating" },
]

const physicalBenefits = [
  { icon: "eye", label: "Eye contact", desc: "Natural connection" },
  { icon: "seat", label: "Consistent seats", desc: "Spatial memory" },
  { icon: "group", label: "Table neighbors", desc: "Peer accountability" },
  { icon: "scan", label: "Room scanning", desc: "Teacher awareness" },
]

function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    "camera-off": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M16.5 12V9.75m0 0V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m3.099 2.414a48.5 48.5 0 00-3.099-2.414M3 3l18 18M6 6.75l.75-.75M9 9l-.75.75M21 21l-3-3m0 0l-4.5-4.5M14.25 14.25L9.75 9.75" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <line x1="3" y1="3" x2="21" y2="21" />
      </svg>
    ),
    "mute": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="3" y1="3" x2="21" y2="21" />
      </svg>
    ),
    "grid": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    "shuffle": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
      </svg>
    ),
    "eye": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    "seat": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M4 18v-6a8 8 0 0116 0v6" />
        <path d="M4 18h16" />
        <path d="M6 18v4M18 18v4" />
      </svg>
    ),
    "group": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="7" r="2" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M17 14a3 3 0 013 3v4" />
      </svg>
    ),
    "scan": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  }
  return <>{icons[name]}</>
}

export function EngagementBreakdownDiagram({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeVirtual, setActiveVirtual] = useState(-1)
  const [activePhysical, setActivePhysical] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const virtualTimers = virtualIssues.map((_, i) => 
      setTimeout(() => setActiveVirtual(i), 200 + i * 150)
    )

    const physicalTimers = physicalBenefits.map((_, i) => 
      setTimeout(() => setActivePhysical(i), 200 + virtualIssues.length * 150 + 300 + i * 150)
    )

    return () => {
      virtualTimers.forEach(clearTimeout)
      physicalTimers.forEach(clearTimeout)
    }
  }, [isVisible])

  return (
    <figure ref={ref} className={cn("mt-8 mb-4 max-w-2xl", className)}>
      <div className="relative rounded-[var(--radius-card)] border border-border bg-surface-raised overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Virtual Classroom Issues */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-red-400">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <span className="text-sm font-sans font-medium text-foreground-secondary">Virtual Classroom</span>
            </div>
            <div className="space-y-3">
              {virtualIssues.map((item, i) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 transition-all duration-500",
                    activeVirtual >= i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                >
                  <div className="w-6 h-6 flex-shrink-0 text-red-400/70">
                    <Icon name={item.icon} className="w-full h-full" />
                  </div>
                  <div>
                    <div className="text-sm font-sans text-foreground-secondary">{item.label}</div>
                    <div className="text-xs font-sans text-foreground-tertiary">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Classroom Benefits */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-accent">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <path d="M9 22V12h6v10" />
                </svg>
              </div>
              <span className="text-sm font-sans font-medium text-foreground-secondary">Physical Classroom</span>
            </div>
            <div className="space-y-3">
              {physicalBenefits.map((item, i) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10 transition-all duration-500",
                    activePhysical >= i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  )}
                >
                  <div className="w-6 h-6 flex-shrink-0 text-accent/70">
                    <Icon name={item.icon} className="w-full h-full" />
                  </div>
                  <div>
                    <div className="text-sm font-sans text-foreground-secondary">{item.label}</div>
                    <div className="text-xs font-sans text-foreground-tertiary">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gap indicator */}
        <div className={cn(
          "mt-6 pt-6 border-t border-border text-center transition-all duration-700 delay-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <span className="text-xs font-sans text-foreground-tertiary uppercase tracking-wider">
            The gap: How do we restore these dynamics virtually?
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-sm font-sans text-foreground-tertiary">
        Breakdown of virtual classroom engagement — spatial and social gaps
      </figcaption>
    </figure>
  )
}

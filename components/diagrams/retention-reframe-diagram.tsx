"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

const featureItems = [
  "More breakout rooms",
  "Better screen sharing", 
  "Emoji reactions",
  "Whiteboard tools",
  "Polls & quizzes",
]

const classroomDynamicsItems = [
  { label: "Spatial awareness", desc: "Who sits where" },
  { label: "Social presence", desc: "Feeling seen by peers" },
  { label: "Teacher visibility", desc: "Scanning the room" },
  { label: "Group identity", desc: "Belonging to a table" },
  { label: "Natural transitions", desc: "Moving between modes" },
]

export function RetentionReframeDiagram({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(-1)
  const [activeDynamic, setActiveDynamic] = useState(-1)
  const [showArrow, setShowArrow] = useState(false)
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

    // Animate feature items appearing with strikethrough
    const featureTimers = featureItems.map((_, i) => 
      setTimeout(() => setActiveFeature(i), 300 + i * 200)
    )

    // Show arrow after features
    const arrowTimer = setTimeout(() => setShowArrow(true), 300 + featureItems.length * 200 + 400)

    // Animate dynamics items
    const dynamicTimers = classroomDynamicsItems.map((_, i) => 
      setTimeout(() => setActiveDynamic(i), 300 + featureItems.length * 200 + 800 + i * 200)
    )

    return () => {
      featureTimers.forEach(clearTimeout)
      dynamicTimers.forEach(clearTimeout)
      clearTimeout(arrowTimer)
    }
  }, [isVisible])

  return (
    <figure ref={ref} className={cn("mt-8 mb-4 max-w-2xl", className)}>
      <div className="relative rounded-[var(--radius-card)] border border-border bg-surface-raised overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 md:gap-4 items-start">
          {/* Left: Feature Additions (crossed out) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="text-xs font-sans text-foreground-tertiary uppercase tracking-wider">Initial Approach</span>
            </div>
            <h4 className="text-sm font-sans font-medium text-foreground-secondary mb-3">Add more features</h4>
            <ul className="space-y-2">
              {featureItems.map((item, i) => (
                <li
                  key={item}
                  className={cn(
                    "text-sm font-sans text-foreground-tertiary transition-all duration-500",
                    activeFeature >= i ? "opacity-100" : "opacity-0 translate-y-2",
                    activeFeature >= featureItems.length - 1 && "line-through decoration-red-500/50"
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Center: Arrow */}
          <div className="hidden md:flex items-center justify-center self-center">
            <svg 
              width="48" 
              height="24" 
              viewBox="0 0 48 24" 
              className={cn(
                "text-accent transition-all duration-700",
                showArrow ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}
            >
              <path 
                d="M0 12h40M32 4l10 8-10 8" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Mobile arrow */}
          <div className={cn(
            "flex md:hidden items-center justify-center py-2 transition-all duration-700",
            showArrow ? "opacity-100" : "opacity-0"
          )}>
            <svg width="24" height="32" viewBox="0 0 24 32" className="text-accent">
              <path 
                d="M12 0v24M4 16l8 10 8-10" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Right: Classroom Dynamics */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-sans text-foreground-tertiary uppercase tracking-wider">Reframe</span>
            </div>
            <h4 className="text-sm font-sans font-medium text-foreground mb-3">Restore classroom dynamics</h4>
            <ul className="space-y-2">
              {classroomDynamicsItems.map((item, i) => (
                <li
                  key={item.label}
                  className={cn(
                    "transition-all duration-500",
                    activeDynamic >= i ? "opacity-100" : "opacity-0 translate-y-2"
                  )}
                >
                  <span className="text-sm font-sans text-foreground">{item.label}</span>
                  <span className="text-xs font-sans text-foreground-tertiary ml-2">— {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm font-sans text-foreground-tertiary">
        Retention strategy reframe: from feature additions to classroom dynamics
      </figcaption>
    </figure>
  )
}

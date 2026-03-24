"use client"

import { useRef, useEffect, useState } from "react"

/* ------------------------------------------------------------------ */
/*  useInView                                                          */
/* ------------------------------------------------------------------ */
function useInView(rootMargin = "-60px") {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setInView(true); return }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])
  return { ref, inView }
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const SKILLS = [
  "Critical thinking",
  "Creativity",
  "Collab",
  "Comm",
  "Mindful",
  "Curiosity",
  "Courage",
  "Resilience",
  "Ethics",
  "Leadership",
  "Metacog",
  "Growth Mindset",
]

interface ActivityRow {
  name: string
  hits: boolean[]
  highlight: boolean
}

const ACTIVITIES: ActivityRow[] = [
  { name: "Group work",   highlight: true,  hits: [true, true, true, true, true, true, true, false, true, true, false, true] },
  { name: "Presentation", highlight: false, hits: [false, true, false, true, true, false, false, true, false, true, true, true] },
  { name: "Discussions",  highlight: true,  hits: [true, true, true, true, true, true, true, false, true, false, true, true] },
  { name: "Goal setting", highlight: false, hits: [true, true, true, true, true, true, false, false, true, false, true, true] },
  { name: "Reflection",   highlight: false, hits: [true, false, false, false, true, false, true, true, false, true, false, true] },
  { name: "Sharing",      highlight: false, hits: [false, false, true, true, true, false, true, false, true, true, false, true] },
  { name: "Plagiarism",   highlight: false, hits: [false, false, false, false, false, false, false, false, true, false, false, false] },
  { name: "Peer Review",  highlight: false, hits: [false, false, false, false, true, false, false, false, true, false, true, true] },
  { name: "Redo work",    highlight: false, hits: [false, false, false, false, false, false, false, true, false, false, false, false] },
]

/* ------------------------------------------------------------------ */
/*  Dot component — animated                                           */
/* ------------------------------------------------------------------ */
function Dot({ active, animate, delay }: { active: boolean; animate: boolean; delay: number }) {
  if (!active) return <td className="px-1 py-0" />

  return (
    <td className="px-1 py-0 text-center">
      <div
        className="inline-block w-[7px] h-[7px] rounded-full"
        style={{
          backgroundColor: "#2DE2D2",
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1)" : "scale(0)",
          transition: `opacity 0.3s ease ${delay}ms, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }}
      />
    </td>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function ResearchSynthesisTable() {
  const { ref, inView } = useInView("-40px")

  return (
    <div ref={ref} className="max-w-2xl mt-8 mb-4">
      {/* Title */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-sm font-heading font-semibold text-foreground mb-5 leading-snug">
          Group projects and discussions are high value activities for skill development
        </p>
      </div>

      {/* Table card */}
      <div
        className="rounded-[var(--radius-card)] overflow-hidden overflow-x-auto"
        style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <table className="w-full text-[10px] font-sans" style={{ minWidth: 560 }}>
          {/* Header */}
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th className="text-left pl-5 pr-3 py-3.5 font-semibold" style={{ color: "rgba(240,240,243,0.35)", width: 100 }}>
                Activity
              </th>
              {SKILLS.map((skill, i) => (
                <th
                  key={skill}
                  className="px-1.5 py-3.5 text-center font-medium"
                  style={{
                    color: "rgba(240,240,243,0.3)",
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.4s ease ${100 + i * 40}ms`,
                    maxWidth: 52,
                  }}
                >
                  <span className="block leading-tight">{skill}</span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {ACTIVITIES.map((row, rowIdx) => {
              const hitCount = row.hits.filter(Boolean).length
              const rowDelay = 200 + rowIdx * 80

              return (
                <tr
                  key={row.name}
                  style={{
                    backgroundColor: row.highlight ? "rgba(45,226,210,0.04)" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-8px)",
                    transition: `opacity 0.5s ease ${rowDelay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${rowDelay}ms, background-color 0.3s ease`,
                  }}
                >
                  <td className="pl-5 pr-3 py-3 font-medium" style={{ color: row.highlight ? "#2DE2D2" : "rgba(240,240,243,0.55)" }}>
                    <div className="flex items-center gap-1.5">
                      {row.name}
                      {row.highlight && (
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "#2DE2D2", opacity: 0.6 }}
                        />
                      )}
                    </div>
                  </td>
                  {row.hits.map((hit, colIdx) => (
                    <Dot
                      key={colIdx}
                      active={hit}
                      animate={inView}
                      delay={rowDelay + 100 + colIdx * 30}
                    />
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div
        className="flex items-center gap-5 mt-4"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.5s ease 1200ms",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-[7px] h-[7px] rounded-full" style={{ backgroundColor: "#2DE2D2" }} />
          <span className="text-[10px] font-sans" style={{ color: "rgba(240,240,243,0.3)" }}>
            Develops skill
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#2DE2D2", opacity: 0.6 }} />
          <span className="text-[10px] font-sans" style={{ color: "rgba(240,240,243,0.3)" }}>
            High-value activity
          </span>
        </div>
      </div>
    </div>
  )
}

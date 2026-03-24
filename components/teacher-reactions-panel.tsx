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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])
  return { ref, inView }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({
  animate,
  delay,
  children,
  className,
}: {
  animate: boolean
  delay: number
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={className}
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
interface Testimonial {
  name: string
  role: string
  quote: string
  color: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Kim L.",
    role: "Educator",
    quote:
      "So many amazing updates to Microsoft Teams. I love the Class Home Page!",
    color: "#6366F1",
  },
  {
    name: "Andrew S.",
    role: "Teacher",
    quote:
      "Lots of great updates to Microsoft Teams, but the Home Page addition for all classes. Fantastic.",
    color: "#14B8A6",
  },
  {
    name: "Megan T.",
    role: "Teacher",
    quote: "I loooooove the new Class Home Page!!!",
    color: "#EC4899",
  },
  {
    name: "Matthew S.",
    role: "Educator",
    quote:
      "Cannot get over how amazing that Class Home Page looks. So excited for these Microsoft Teams updates to be released!",
    color: "#F59E0B",
  },
  {
    name: "Bree H.",
    role: "MIE Expert",
    quote:
      "NEW Class Home Pages are here! This changes everything for how teachers organize their classes.",
    color: "#8B5CF6",
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function TeacherReactionsPanel() {
  const { ref, inView } = useInView("-40px")

  return (
    <div ref={ref} className="max-w-2xl mb-10">
      {/* Masonry-style 2-col grid with generous gap */}
      <div className="columns-1 sm:columns-2 gap-5 space-y-5">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} animate={inView} delay={120 + i * 140}>
            {/* Card — break-inside-avoid keeps cards from splitting across columns */}
            <div
              className="break-inside-avoid rounded-2xl relative overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ backgroundColor: t.color, opacity: 0.5 }}
              />

              {/* Card content — generous padding */}
              <div className="p-6 pl-7">
                {/* Quote */}
                <p
                  className="text-sm font-sans leading-relaxed mb-5"
                  style={{ color: "rgba(240,240,243,0.75)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="flex items-center justify-center rounded-full text-[10px] font-sans font-bold shrink-0"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: `${t.color}20`,
                      color: t.color,
                    }}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="text-xs font-sans font-medium text-foreground leading-none">
                      {t.name}
                    </p>
                    <p
                      className="text-[10px] font-sans mt-1"
                      style={{ color: "rgba(240,240,243,0.35)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

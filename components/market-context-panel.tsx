"use client"

import { useRef, useEffect, useState } from "react"

/* ------------------------------------------------------------------ */
/*  useCountUp – animates a number from 0 → target with ease-out      */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!started) return
    let raf: number
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, started])

  return value
}

/* ------------------------------------------------------------------ */
/*  useInView – fires once when element enters the viewport            */
/* ------------------------------------------------------------------ */
function useInView(rootMargin = "-60px") {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setInView(true); return }

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
/*  Animated sparkline – draws a growing area chart                    */
/* ------------------------------------------------------------------ */
function Sparkline({ data, animate, delay, color }: { data: number[]; animate: boolean; delay: number; color: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!animate) return
    const timeout = setTimeout(() => {
      let raf: number
      const start = performance.now()
      function tick(now: number) {
        const p = Math.min((now - start) / 1400, 1)
        setProgress(1 - Math.pow(1 - p, 3))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }, delay)
    return () => clearTimeout(timeout)
  }, [animate, delay])

  const w = 200, h = 48, pad = 2
  const max = Math.max(...data)
  const visibleCount = Math.max(1, Math.round(data.length * progress))
  const slice = data.slice(0, visibleCount)

  const points = slice.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = h - pad - (v / max) * (h - pad * 2)
    return `${x},${y}`
  })

  const linePath = `M${points.join(" L")}`
  const lastX = points[points.length - 1]?.split(",")[0] ?? String(pad)
  const areaPath = `${linePath} L${lastX},${h} L${pad},${h} Z`
  const gradId = `sparkGrad-${color.replace("#", "")}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {slice.length > 1 && (
        <>
          <path d={areaPath} fill={`url(#${gradId})`} />
          <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Stagger reveal wrapper                                             */
/* ------------------------------------------------------------------ */
function Reveal({ animate, delay, children, className }: { animate: boolean; delay: number; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Stat card – each stat gets an identical card                       */
/* ------------------------------------------------------------------ */
function StatCard({
  value,
  suffix,
  label,
  sparkData,
  sparkColor,
  animate,
  revealDelay,
  sparkDelay,
}: {
  value: number
  suffix: string
  label: string
  sparkData: number[]
  sparkColor: string
  animate: boolean
  revealDelay: number
  sparkDelay: number
}) {
  return (
    <Reveal animate={animate} delay={revealDelay}>
      <div
        className="rounded-2xl p-5 md:p-6 flex flex-col justify-between h-full"
        style={{
          backgroundColor: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Number + label */}
        <div>
          <p className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-none">
            {value >= 100 && suffix === "B"
              ? `${(value / 100).toFixed(2)}${suffix}`
              : `${value}${suffix}`}
          </p>
          <p className="text-[11px] font-sans mt-2" style={{ color: "rgba(240,240,243,0.45)" }}>
            {label}
          </p>
        </div>

        {/* Sparkline */}
        <div className="mt-4 h-[48px]">
          <Sparkline data={sparkData} animate={animate} delay={sparkDelay} color={sparkColor} />
        </div>
      </div>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/*  Sparkline datasets                                                 */
/* ------------------------------------------------------------------ */
const STUDENTS_DATA = [80, 85, 88, 92, 96, 100, 105, 110, 116, 122, 128, 135, 142, 152, 165]
const EDU_USERS_DATA = [4, 6, 8, 10, 14, 18, 20, 28, 50, 72, 88, 96, 100, 108, 110]
const COVID_GROWTH_DATA = [0, 1, 2, 3, 4, 5, 8, 18, 42, 65, 78, 86, 92, 96, 99]

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */
export function MarketContextPanel() {
  const { ref, inView } = useInView("-40px")

  const studentsCount = useCountUp(165, 1800, inView)
  const teamsCount = useCountUp(110, 1800, inView)
  const covidCount = useCountUp(99, 1600, inView)

  return (
    <div ref={ref} className="max-w-2xl mt-8 mb-4">
      {/* Header */}
      <Reveal animate={inView} delay={0}>
        <p
          className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: "rgba(240,240,243,0.28)" }}
        >
          Teams for Education{" "}
          <span style={{ color: "rgba(240,240,243,0.12)" }}>·</span>{" "}
          Market Context
        </p>
      </Reveal>

      {/* 3-column grid of equal stat cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          value={studentsCount}
          suffix="B"
          label="students worldwide"
          sparkData={STUDENTS_DATA}
          sparkColor="#2DE2D2"
          animate={inView}
          revealDelay={100}
          sparkDelay={500}
        />
        <StatCard
          value={teamsCount}
          suffix="M"
          label="Teams EDU users"
          sparkData={EDU_USERS_DATA}
          sparkColor="#2DE2D2"
          animate={inView}
          revealDelay={220}
          sparkDelay={620}
        />
        <StatCard
          value={covidCount}
          suffix="M"
          label="users added since COVID"
          sparkData={COVID_GROWTH_DATA}
          sparkColor="#2DE2D2"
          animate={inView}
          revealDelay={340}
          sparkDelay={740}
        />
      </div>
    </div>
  )
}

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
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ animate, delay, children, className }: { animate: boolean; delay: number; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sticky note                                                        */
/* ------------------------------------------------------------------ */
function StickyNote({ text, color, animate, delay }: { text: string; color: string; animate: boolean; delay: number }) {
  return (
    <div
      style={{
        backgroundColor: color,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0) rotate(0deg)" : "translateY(16px) rotate(-2deg)",
        transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
      className="rounded-lg px-3.5 py-3 text-[11px] leading-snug font-sans font-medium text-gray-900 shadow-sm"
    >
      {text}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Participant dot                                                    */
/* ------------------------------------------------------------------ */
function ParticipantDot({ initials, color, animate, delay }: { initials: string; color: string; animate: boolean; delay: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full text-[9px] font-sans font-bold shrink-0"
      style={{
        width: 28,
        height: 28,
        backgroundColor: color,
        color: "#fff",
        opacity: animate ? 1 : 0,
        transform: animate ? "scale(1)" : "scale(0.5)",
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {initials}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function CoCreationPanel() {
  const { ref, inView } = useInView("-40px")

  const stickyColors = {
    yellow: "#FDE68A",
    amber: "#FCD34D",
    orange: "#FDBA74",
    pink: "#F9A8D4",
    green: "#86EFAC",
  }

  const stickies = [
    { text: "Camera controls for teacher", color: stickyColors.yellow, priority: "high" },
    { text: "Hand raise visibility", color: stickyColors.yellow, priority: "high" },
    { text: "Reactions & emoji feedback", color: stickyColors.amber, priority: "high" },
    { text: "Digital projector / screen share", color: stickyColors.amber, priority: "medium" },
    { text: "Conversation cue for shy students", color: stickyColors.orange, priority: "medium" },
    { text: "Progress indicators per student", color: stickyColors.orange, priority: "medium" },
    { text: "Sound signal for attention", color: stickyColors.pink, priority: "low" },
    { text: "Send praise to students", color: stickyColors.green, priority: "low" },
  ]

  const participants = [
    { initials: "BH", color: "#6366F1" },
    { initials: "LV", color: "#EC4899" },
    { initials: "KM", color: "#14B8A6" },
    { initials: "JR", color: "#F59E0B" },
    { initials: "AT", color: "#8B5CF6" },
  ]

  return (
    <div ref={ref} className="max-w-2xl mt-8 mb-4">
      <div
        className="rounded-[var(--radius-card)] overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Top bar — simulates session header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <Reveal animate={inView} delay={0}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EF4444" }} />
              <p className="text-[11px] font-sans font-semibold" style={{ color: "rgba(240,240,243,0.5)" }}>
                Co-design session with Educators #3
              </p>
            </div>
          </Reveal>
          <Reveal animate={inView} delay={100}>
            <div className="flex items-center gap-2">
              {participants.map((p, i) => (
                <ParticipantDot
                  key={p.initials}
                  initials={p.initials}
                  color={p.color}
                  animate={inView}
                  delay={200 + i * 80}
                />
              ))}
              <span className="text-[10px] font-sans ml-1" style={{ color: "rgba(240,240,243,0.3)" }}>
                +8
              </span>
            </div>
          </Reveal>
        </div>

        {/* Content area */}
        <div className="p-6 md:p-8">
          {/* Task prompt */}
          <Reveal animate={inView} delay={150}>
            <div className="flex items-start gap-4 mb-7">
              <div
                className="shrink-0 flex items-center justify-center rounded-lg text-[10px] font-sans font-bold"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: "rgba(239,68,68,0.12)",
                  color: "#EF4444",
                }}
              >
                T3
              </div>
              <div>
                <p className="text-xs font-sans font-semibold text-foreground leading-snug">
                  Your online class is about to start.
                </p>
                <p className="text-[11px] font-sans mt-0.5" style={{ color: "rgba(240,240,243,0.45)" }}>
                  What tools do you need to have a successful class where everyone is able to engage effectively and inclusively?
                </p>
              </div>
            </div>
          </Reveal>

          {/* Priority axis */}
          <Reveal animate={inView} delay={300}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-sans font-medium uppercase tracking-widest" style={{ color: "rgba(45,226,210,0.6)" }}>
                Most important
              </span>
              <div className="flex-1 mx-3 h-px" style={{ background: "linear-gradient(to right, rgba(45,226,210,0.2), transparent)" }} />
              <span className="text-[9px] font-sans font-medium uppercase tracking-widest" style={{ color: "rgba(240,240,243,0.2)" }}>
                Least important
              </span>
            </div>
          </Reveal>

          {/* Sticky notes grid */}
          <div className="grid grid-cols-4 gap-3">
            {stickies.map((s, i) => (
              <StickyNote
                key={s.text}
                text={s.text}
                color={s.color}
                animate={inView}
                delay={400 + i * 90}
              />
            ))}
          </div>

          {/* Timer / session meta */}
          <Reveal animate={inView} delay={1200}>
            <div className="flex items-center gap-4 mt-7 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="rgba(240,240,243,0.25)" strokeWidth="1" /><path d="M6 3v3l2 1.5" stroke="rgba(240,240,243,0.25)" strokeWidth="1" strokeLinecap="round" /></svg>
                <span className="text-[10px] font-sans" style={{ color: "rgba(240,240,243,0.25)" }}>15 minutes</span>
              </div>
              <span className="text-[10px] font-sans" style={{ color: "rgba(240,240,243,0.2)" }}>
                Card sorting · Priority mapping
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

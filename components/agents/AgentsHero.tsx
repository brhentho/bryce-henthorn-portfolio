"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { OrbitalAgent } from "@/components/agents/OrbitalAgent"
import { ChatBubble } from "@/components/agents/ChatBubble"
import { useReducedMotion } from "@/components/motion/useReducedMotion"

const AGENTS = [
  {
    name: "Copilot",
    icon: "/assets/agents/copilot-1.svg",
    glow: "rgba(70,209,216,0.3)",
    size: 44,
    orbit: { rx: 420, ry: 280, speed: 32, phase: 0 },
    tasks: ["Reviewing PR #412", "Summarizing thread", "Drafting reply"],
  },
  {
    name: "GitHub",
    icon: "/assets/agents/github.svg",
    glow: "rgba(255,255,255,0.35)",
    size: 91,
    orbit: { rx: 520, ry: 180, speed: 38, phase: 0.3 },
    tasks: ["Running CI pipeline", "Checking merge conflicts", "Deploying preview"],
  },
  {
    name: "Copilot for Sales",
    icon: "/assets/agents/copilot-sales-3.svg",
    glow: "rgba(70,209,216,0.3)",
    size: 43,
    orbit: { rx: 380, ry: 320, speed: 26, phase: 0.55 },
    tasks: ["Updating CRM record", "Generating proposal", "Scheduling follow-up"],
  },
  {
    name: "Planet",
    icon: "/assets/agents/planet-1.svg",
    glow: "rgba(182,94,220,0.4)",
    size: 64,
    orbit: { rx: 460, ry: 240, speed: 35, phase: 0.15 },
    tasks: ["Analyzing dependencies", "Scanning packages", "Flagging vulnerabilities"],
  },
  {
    name: "Data Line",
    icon: "/assets/agents/dataline-1.svg",
    glow: "rgba(166,81,221,0.5)",
    size: 59,
    orbit: { rx: 500, ry: 300, speed: 40, phase: 0.7 },
    tasks: ["Processing telemetry", "Building dashboard", "Correlating signals"],
  },
  {
    name: "Agents",
    icon: "/assets/agents/agents-icon.svg",
    glow: "rgba(23,205,206,0.4)",
    size: 44,
    orbit: { rx: 350, ry: 200, speed: 28, phase: 0.4 },
    tasks: ["Orchestrating workflow", "Delegating subtasks", "Monitoring agents"],
  },
  {
    name: "Finance",
    icon: "/assets/agents/finance-icon.svg",
    glow: "rgba(131,231,148,0.28)",
    size: 121,
    orbit: { rx: 440, ry: 260, speed: 30, phase: 0.85 },
    tasks: ["Reconciling accounts", "Forecasting Q3", "Generating report"],
  },
] as const

export function AgentsHero() {
  const reduced = useReducedMotion()
  const [bubble, setBubble] = useState<{
    agentIndex: number
    position: { x: number; y: number }
  } | null>(null)
  const lastBubbleAgent = useRef(-1)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismissBubble = useCallback(() => setBubble(null), [])

  // Spawn chat bubbles every 8-12s
  useEffect(() => {
    if (reduced) return

    const spawn = () => {
      let idx: number
      do {
        idx = Math.floor(Math.random() * AGENTS.length)
      } while (idx === lastBubbleAgent.current && AGENTS.length > 1)

      lastBubbleAgent.current = idx
      const agent = AGENTS[idx]
      const TAU = Math.PI * 2
      const angle = agent.orbit.phase * TAU
      setBubble({
        agentIndex: idx,
        position: {
          x: Math.cos(angle) * agent.orbit.rx * 0.5,
          y: Math.sin(angle) * agent.orbit.ry * 0.3 - agent.size,
        },
      })
    }

    // Initial delay
    const initialDelay = setTimeout(() => {
      spawn()
      intervalRef.current = setInterval(spawn, 8000 + Math.random() * 4000)
    }, 4000)

    return () => {
      clearTimeout(initialDelay)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [reduced])

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 58% 43%, rgba(28,28,33,1) 0%, rgba(11,11,13,1) 100%)",
        }}
      />

      {/* Orbital field — hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <div className="relative w-full h-full">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {AGENTS.map((agent) => (
              <OrbitalAgent
                key={agent.name}
                {...agent}
                frozen={reduced}
              />
            ))}
          </div>
        </div>

        {/* Chat bubble */}
        {!reduced && bubble && (
          <ChatBubble
            position={bubble.position}
            onDismiss={dismissBubble}
          />
        )}
      </div>

      {/* Hero text - centered, always visible */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p
          className="text-[17px] font-sans font-medium uppercase tracking-[1.7px] mb-5"
          style={{ color: "#59CAEA" }}
        >
          Agents in Windows
        </p>
        <h1
          className="font-heading text-[32px] md:text-[49px] font-medium leading-[1.15] text-white"
          style={{ letterSpacing: "-0.5px" }}
        >
          Making AI agents visible and interruptible in Windows
        </h1>
      </div>

      {/* Reduced motion: show a few static task pills on mobile too */}
      {reduced && (
        <div className="flex flex-wrap justify-center gap-3 mt-8 relative z-10 px-6">
          {AGENTS.slice(0, 3).map((agent) => (
            <div
              key={agent.name}
              className="px-3 py-1.5 rounded-full text-[11px] text-white/70"
              style={{
                fontFamily: "monospace",
                backdropFilter: "blur(5.5px)",
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {agent.tasks[0]}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

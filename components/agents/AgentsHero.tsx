"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AgentsDriftOverlay } from "@/components/agents/AgentsDriftOverlay"

export function AgentsHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <div
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#0B0B0D",
        borderRadius: "14px",
      }}
    >
      {/* ── Fractal glass background image ── */}
      <Image
        src="/assets/Agents in Windows Fractal.png"
        alt=""
        fill
        priority
        className="object-cover pointer-events-none select-none"
      />

      {/* ── Drifting task pills ── */}
      <AgentsDriftOverlay />

      {/* ── Centered hero text ── */}
      <div
        className="relative z-10 text-center px-6 max-w-3xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth)",
        }}
      >
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

      {/* ── Bottom fade ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}

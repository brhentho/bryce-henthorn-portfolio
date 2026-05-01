"use client"

import Image from "next/image"
import { PulseGrid } from "@/components/recall/PulseGrid"
import { MemoryPill } from "@/components/recall/MemoryPill"
import { AnimateIn } from "@/components/animate-in"

const RECALL_PILLS = [
  { icon: "calendar", label: "July 16, 2024", x: "12%", y: "17%" },
  { icon: "calendar", label: "July 22, 2024", x: "24%", y: "25%" },
  { icon: "calendar", label: "July 16, 2023", x: "9%", y: "52%" },
  { icon: "gmail", label: "The Front Room reservations", x: "16%", y: "41%" },
  { icon: "tag", label: "Menu", x: "33%", y: "37%" },
  { icon: "tag", label: "Flight tracking", x: "29%", y: "49%" },
  { icon: "gmail", label: "Flight details: AA 4533", x: "41%", y: "23%" },
  { icon: "gmail", label: "OpenTable", x: "26%", y: "81%" },
  { icon: "tag", label: "Acadia national park", x: "65%", y: "16%" },
  { icon: "tag", label: "Lobstering Tour", x: "64%", y: "30%" },
  { icon: "tag", label: "Historic Portland Walking tour", x: "72%", y: "45%" },
  { icon: "tag", label: "Seaside Hotel", x: "80%", y: "28%" },
  { icon: "location", label: "Granite Beach Park", x: "78%", y: "58%" },
  { icon: "location", label: "Peral Cafe", x: "86%", y: "68%" },
  { icon: "gmail", label: "Fw: Reservation Reminder", x: "71%", y: "70%" },
  { icon: "tag", label: "Confirmation 25564", x: "16%", y: "66%" },
  { icon: "avatar", label: "Janice", x: "57%", y: "86%" },
  { icon: "tag", label: "Travel tips", x: "78%", y: "84%" },
]

export function RecallHero() {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(49.77% 45.01% at 57.6% 43.06%, #1C1C21 0%, #0B0B0D 100%)",
        borderRadius: "14px",
      }}
    >
      {/* Pulse grid background */}
      <PulseGrid />

      {/* Memory pills scattered across viewport */}
      <div className="absolute inset-0 hidden md:block">
        {RECALL_PILLS.map((pill, i) => (
          <MemoryPill key={pill.label} {...pill} index={i} />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <AnimateIn delay={0.05} className="mb-6">
          <Image
            src="/images/projects/Recall icon.png"
            alt="Windows Recall"
            width={64}
            height={64}
            className="w-16 h-16 object-contain mx-auto"
            priority
          />
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <p className="text-sm font-sans font-medium text-accent tracking-[0.15em] uppercase mb-3">
            Windows Recall
          </p>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground text-balance max-w-2xl">
            Designing Semantic Search for Everything You{"'"}ve Seen.
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["Trust + privacy", "Systems thinking", "Windows", "Senior Designer", "2024"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-sans font-medium text-foreground-tertiary bg-surface-raised px-3 py-1.5 rounded-lg border border-border"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </AnimateIn>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none"
        aria-hidden="true"
      />

    </section>
  )
}

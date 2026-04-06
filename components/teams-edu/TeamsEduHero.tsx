"use client"

import { AvatarGrid } from "@/components/teams-edu/AvatarGrid"

export function TeamsEduHero() {
  return (
    <div
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 58% 43%, rgba(28,28,33,1) 0%, rgba(11,11,13,1) 100%)",
        borderRadius: "14px",
      }}
    >
      {/* Hero text */}
      <div className="relative z-10 text-center px-6 max-w-2xl mb-10">
        <p className="text-sm font-sans font-medium text-accent tracking-[0.15em] uppercase mb-3">
          Teams for Education
        </p>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground text-balance">
          Modernizing Online Classes For An Authentic Virtual Experience
        </h1>
      </div>

      {/* Avatar grid with reactions */}
      <div className="relative z-10 w-full max-w-3xl px-6">
        <AvatarGrid />
      </div>
    </div>
  )
}

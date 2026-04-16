"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useReducedMotion } from "@/components/motion/useReducedMotion"

/* ─── Avatar rows from Figma ─── */
const ROW_1 = [
  { src: "/assets/avatars/avatar-1.png", alt: "" },
  { src: "/assets/avatars/avatar-437.png", alt: "" },
  { src: "/assets/avatars/avatar-105.png", alt: "" },
  { src: "/assets/avatars/avatar-2.png", alt: "" },
  { src: "/assets/avatars/avatar-4.png", alt: "" },
  { src: "/assets/avatars/avatar-110.png", alt: "" },
  { src: "/assets/avatars/ellipse-3764.svg", alt: "", initials: "JH" },
]

const ROW_2 = [
  { src: "/assets/avatars/avatar-image.png", alt: "" },
  { src: "/assets/avatars/student-female-01.png", alt: "" },
  { src: "/assets/avatars/avatar-5.png", alt: "" },
  { src: "/assets/avatars/student-male-04.png", alt: "" },
  { src: "/assets/avatars/ellipse-3560.png", alt: "" },
  { src: "/assets/avatars/avatar-3.png", alt: "" },
]

/* ─── Floating emoji reactions ─── */
const EMOJIS: {
  src: string
  size: number
  left: string
  top: string
  delay: string
}[] = [
  { src: "/assets/emoji/grinning.png", size: 92, left: "8%", top: "19%", delay: "0s" },
  { src: "/assets/emoji/grinning.png", size: 48, left: "82%", top: "53%", delay: "0.6s" },
  { src: "/assets/emoji/heart.png", size: 42, left: "55%", top: "4%", delay: "0.3s" },
  { src: "/assets/emoji/heart.png", size: 60, left: "9%", top: "72%", delay: "0.9s" },
  { src: "/assets/emoji/clapping.png", size: 106, left: "79%", top: "10%", delay: "0.2s" },
  { src: "/assets/emoji/clapping.png", size: 52, left: "21%", top: "44%", delay: "0.7s" },
  { src: "/assets/emoji/raised-hand.png", size: 52, left: "72%", top: "85%", delay: "0.5s" },
]

export function TeamsHero() {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 58% 43%, #1C1C21 0%, #0B0B0D 100%)",
        borderRadius: "14px",
      }}
    >
      {/* ── Background image ── */}
      <Image
        src="/images/heroes/TeamsProjectHero.jpg"
        alt=""
        fill
        priority
        className="object-cover pointer-events-none select-none"
        style={{
          opacity: mounted ? 0.15 : 0,
          transition: "opacity 1.2s var(--expo)",
        }}
      />

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,13,0.85) 0%, rgba(11,11,13,0.4) 40%, rgba(11,11,13,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Floating emojis ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {EMOJIS.map((emoji, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: emoji.left,
              top: emoji.top,
              width: emoji.size,
              height: emoji.size,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
              transition: reduced
                ? "opacity 0.4s ease"
                : `opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth)`,
              transitionDelay: reduced ? "0s" : emoji.delay,
              animation: reduced
                ? "none"
                : `teamsEmojiFloat ${6 + i * 0.7}s ease-in-out ${emoji.delay} infinite alternate`,
            }}
          >
            <Image
              src={emoji.src}
              alt=""
              width={emoji.size}
              height={emoji.size}
              className="pointer-events-none select-none"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}
            />
          </div>
        ))}
      </div>

      {/* ── Centered content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[800px]">
        {/* Avatar grid */}
        <div
          className="mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: reduced
              ? "opacity 0.4s ease"
              : "opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth)",
            transitionDelay: "0.1s",
          }}
        >
          {/* Row 1 */}
          <div className="flex justify-center gap-[33px] mb-[28px]">
            {ROW_1.map((avatar, i) => (
              <div
                key={i}
                className="relative rounded-full overflow-hidden shrink-0"
                style={{
                  width: 50,
                  height: 50,
                  boxShadow: "0 3.6px 4.4px rgba(94,94,94,0.15)",
                }}
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  fill
                  className="object-cover"
                />
                {avatar.initials && (
                  <div
                    className="absolute inset-0 flex items-center justify-center font-medium text-xs tracking-wider"
                    style={{ color: "#346c6d" }}
                  >
                    {avatar.initials}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Row 2 — offset to center between row 1 */}
          <div className="flex justify-center gap-[33px]">
            {ROW_2.map((avatar, i) => (
              <div
                key={i}
                className="relative rounded-full overflow-hidden shrink-0"
                style={{
                  width: 50,
                  height: 50,
                  boxShadow: "0 3.6px 4.4px rgba(94,94,94,0.15)",
                }}
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Label */}
        <p
          className="text-[17px] font-sans font-medium uppercase tracking-[1.8px] mb-5"
          style={{
            color: "#59CAEA",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: reduced
              ? "opacity 0.4s ease"
              : "opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth)",
            transitionDelay: "0.25s",
          }}
        >
          Teams for Education
        </p>

        {/* Heading */}
        <h1
          className="font-heading text-[32px] md:text-[49px] font-medium leading-[1.15] text-white"
          style={{
            letterSpacing: "-0.5px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: reduced
              ? "opacity 0.4s ease"
              : "opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth)",
            transitionDelay: "0.35s",
          }}
        >
          Modernizing Online classes for an authentic virtual experience
        </h1>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}

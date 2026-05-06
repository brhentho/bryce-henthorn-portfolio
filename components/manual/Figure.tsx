"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { RegistrationMark } from "./RegistrationMark"
import { Crossref } from "./Crossref"

type Props = {
  number: string
  caption?: string
  cf?: { section: string; href: string; label?: string }
  src?: string
  alt?: string
  width?: number
  height?: number
  priority?: boolean
  children?: ReactNode
  className?: string
  frameless?: boolean
}

export function Figure({
  number,
  caption,
  cf,
  src,
  alt,
  width = 1600,
  height = 900,
  priority,
  children,
  className,
  frameless,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    frameRef.current.style.setProperty("--cx", `${e.clientX - rect.left}px`)
    frameRef.current.style.setProperty("--cy", `${e.clientY - rect.top}px`)
    if (!active) setActive(true)
  }
  const handleLeave = () => setActive(false)

  const altText = alt ?? caption ?? `Figure ${number}`
  return (
    <figure className={cn("my-10 lg:my-14", className)}>
      <div
        ref={frameRef}
        className={cn(
          "manual-figure-frame relative",
          !frameless && "border border-[color:var(--rule)]",
        )}
        data-cursor-active={active ? "true" : "false"}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <RegistrationMark
          className="absolute -top-[6px] -left-[6px]"
          aria-hidden="true"
        />
        <div className="absolute top-2 left-3 z-10">
          <span className="t-mono-label bg-[color:var(--bg)] px-1">FIG. {number}</span>
        </div>
        <svg
          aria-hidden="true"
          className="manual-figure-crosshair"
          width={14}
          height={14}
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="7" cy="7" r="2" strokeWidth="0.75" />
          <line x1="7" y1="0" x2="7" y2="14" strokeWidth="0.75" />
          <line x1="0" y1="7" x2="14" y2="7" strokeWidth="0.75" />
        </svg>
        <div className="relative w-full bg-[color:var(--bg)]">
          {src ? (
            <Image
              src={src}
              alt={altText}
              width={width}
              height={height}
              priority={priority}
              sizes="(min-width: 1280px) 1024px, 100vw"
              className="block w-full h-auto"
            />
          ) : (
            children
          )}
        </div>
      </div>
      {(caption || cf) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          {caption ? (
            <span className="t-mono-caption text-[color:var(--text-secondary)]">{caption}</span>
          ) : (
            <span />
          )}
          {cf ? (
            <span className="t-mono-caption text-[color:var(--text-tertiary)]">
              See also <Crossref section={cf.section} href={cf.href} label={cf.label} />
            </span>
          ) : null}
        </figcaption>
      )}
    </figure>
  )
}

import type { ReactNode } from "react"
import Image from "next/image"
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
}: Props) {
  const altText = alt ?? caption ?? `Figure ${number}`
  return (
    <figure className={cn("my-10 lg:my-14", className)}>
      <div className="relative border border-[color:var(--rule)]">
        <RegistrationMark
          className="absolute -top-[6px] -left-[6px]"
          aria-hidden="true"
        />
        <div className="absolute top-2 left-3 z-10">
          <span className="t-mono-label bg-[color:var(--bg)] px-1">FIG. {number}</span>
        </div>
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

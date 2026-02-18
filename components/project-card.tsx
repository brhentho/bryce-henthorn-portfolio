"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  summary: string
  href?: string
  tags?: string[]
  cardImage?: string
  imageAlt?: string
  tag?: string
  disabled?: boolean
  onDisabledClick?: () => void
  className?: string
}

export function ProjectCard({
  title,
  summary,
  href,
  tags,
  cardImage,
  imageAlt,
  tag,
  disabled,
  onDisabledClick,
  className,
}: ProjectCardProps) {
  const cardInner = (
    <div className="rounded-lg border border-border bg-surface overflow-hidden transition-colors duration-200 group-hover:border-border-hover">
      {/* Image area */}
      <div className="relative aspect-[16/10] bg-surface-raised overflow-hidden">
        {cardImage ? (
          <Image
            src={cardImage}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        ) : (
          <div className="absolute inset-0 bg-grid opacity-30" />
        )}
        {/* Coming soon badge overlay */}
        {tag && (
          <div className="absolute top-3 right-3">
            <span className="font-mono text-[10px] tracking-[0.15em] text-accent bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded border border-accent/20 uppercase">
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        {/* One-line summary */}
        <p className="text-[13px] text-foreground-secondary leading-relaxed font-sans mb-2">
          {summary}
        </p>

        {/* Title */}
        <h3 className="font-mono text-base md:text-lg font-medium text-foreground tracking-tight mb-3">
          {title}
        </h3>

        {/* Tags row */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-[0.1em] text-foreground-tertiary bg-surface-raised px-2 py-1 rounded border border-border uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* CTA indicator */}
        {!disabled && (
          <div className="flex items-center gap-1.5 text-foreground-tertiary group-hover:text-accent transition-colors duration-200 pt-1">
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase">
              Read case study
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )

  const wrapperClasses = cn(
    "group block transition-colors duration-200",
    !disabled && "cursor-pointer",
    disabled && "cursor-default",
    className
  )

  if (disabled) {
    return (
      <button
        type="button"
        onClick={onDisabledClick}
        className={cn(wrapperClasses, "text-left w-full")}
      >
        {cardInner}
      </button>
    )
  }

  return (
    <Link href={href || "/"} className={wrapperClasses}>
      {cardInner}
    </Link>
  )
}

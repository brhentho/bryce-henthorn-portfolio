"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  /** Small product/project name (e.g. "Teams for Education") */
  productName: string
  /** Large heading (the case-study tagline) */
  heading: string
  href?: string
  cardImage?: string
  imageAlt?: string
  tag?: string
  year?: string
  disabled?: boolean
  onDisabledClick?: () => void
  className?: string
}

export function ProjectCard({
  productName,
  heading,
  href,
  cardImage,
  imageAlt,
  tag,
  year,
  disabled,
  onDisabledClick,
  className,
}: ProjectCardProps) {
  const cardInner = (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface overflow-hidden transition-all duration-500 ease-out group-hover:border-border-hover group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      {/* Image area -- transparent bg, padded so image floats */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {cardImage ? (
          <div className="absolute inset-0 p-5 md:p-6 flex items-center justify-center">
            <div className="relative w-full h-full overflow-hidden rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.06]">
              <Image
                src={cardImage}
                alt={imageAlt || productName}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0" />
        )}
        {/* Coming soon badge overlay */}
        {tag && (
          <div className="absolute top-3 right-3">
            <span className="text-[11px] font-sans font-medium text-accent bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-accent/20">
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        {/* Small product name */}
        <p className="text-xs font-sans font-medium text-foreground-tertiary uppercase tracking-wider mb-2">
          {productName}{year && <span> · {year}</span>}
        </p>

        {/* Large heading */}
        <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground tracking-tight leading-snug mb-5">
          {heading}
        </h3>

        {/* CTA indicator */}
        {!disabled && (
          <div className="flex items-center gap-1.5 text-foreground-tertiary group-hover:text-accent transition-colors duration-300">
            <span className="text-sm font-sans font-medium">
              Read case study
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-300 group-hover:translate-x-1"
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
    <Link
      href={href || "/"}
      className={wrapperClasses}
    >
      {cardInner}
    </Link>
  )
}

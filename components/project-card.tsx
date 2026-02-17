"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { SchematicPanel } from "@/components/schematic-panel"

interface ProjectCardProps {
  title: string
  description: string
  href?: string
  meta?: string
  tag?: string
  disabled?: boolean
  onDisabledClick?: () => void
  schematicVariant?: "grid" | "flow" | "blocks" | "hierarchy"
  className?: string
}

export function ProjectCard({
  title,
  description,
  href,
  meta,
  tag,
  disabled,
  onDisabledClick,
  schematicVariant = "grid",
  className,
}: ProjectCardProps) {
  const cardInner = (
    <>
      {/* Floating schematic panel above card */}
      <SchematicPanel variant={schematicVariant} className="h-[88px] md:h-[100px] -mb-px" />

      {/* Card body */}
      <div className="rounded-b-lg border border-border bg-surface p-6 md:p-7">
        {/* Metadata line */}
        {meta && (
          <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-tertiary uppercase">
            {meta}
          </span>
        )}
        <div className="flex items-start justify-between gap-3 mt-2">
          <h3 className="font-mono text-base md:text-lg font-medium text-foreground tracking-tight">
            {title}
          </h3>
          {tag && (
            <span className="shrink-0 font-mono text-[10px] tracking-[0.15em] text-accent bg-accent-dim px-2 py-1 rounded uppercase">
              {tag}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-foreground-secondary leading-relaxed font-sans">
          {description}
        </p>
        {/* Bottom arrow indicator */}
        {!disabled && (
          <div className="mt-6 flex items-center gap-1.5 text-foreground-tertiary group-hover:text-accent transition-colors duration-200">
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
    </>
  )

  const wrapperClasses = cn(
    "group block transition-colors duration-200",
    !disabled && "cursor-pointer",
    !disabled && "[&:hover_.rounded-t-lg]:border-border-hover [&:hover_.rounded-b-lg]:border-border-hover",
    disabled && "opacity-70 cursor-default",
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

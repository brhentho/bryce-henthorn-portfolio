"use client"

import { cn } from "@/lib/utils"

type Mode = "dark" | "paper"

type Props = {
  mode: Mode
  onChange: (next: Mode) => void
  className?: string
}

export function ModeToggle({ mode, onChange, className }: Props) {
  const next: Mode = mode === "dark" ? "paper" : "dark"
  return (
    <button
      type="button"
      aria-pressed={mode === "paper"}
      aria-label={`Switch to ${next} mode`}
      onClick={() => onChange(next)}
      className={cn(
        "t-mono-label",
        "fixed top-5 right-6 z-40",
        "inline-flex items-center gap-2",
        "px-2 py-1",
        "border border-[color:var(--rule)]",
        "bg-[color:var(--bg)] text-[color:var(--text-secondary)]",
        "hover:text-[color:var(--text-primary)] hover:border-[color:var(--rule-strong)] transition-colors",
        "lg:top-5 lg:right-32",
        className,
      )}
    >
      <span
        className={cn(
          mode === "dark" ? "underline underline-offset-[0.25em] decoration-[color:var(--text-primary)] text-[color:var(--text-primary)]" : "",
        )}
      >
        DARK
      </span>
      <span aria-hidden="true" className="text-[color:var(--text-tertiary)]">/</span>
      <span
        className={cn(
          mode === "paper" ? "underline underline-offset-[0.25em] decoration-[color:var(--text-primary)] text-[color:var(--text-primary)]" : "",
        )}
      >
        PAPER
      </span>
    </button>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // next-themes guidance: avoid hydration mismatch by only rendering theme-aware
  // markup after mount. SSR + first paint use the default (dark) styling.
  useEffect(() => setMounted(true), [])

  const mode: "dark" | "paper" = mounted && resolvedTheme === "paper" ? "paper" : "dark"
  const next: "dark" | "paper" = mode === "dark" ? "paper" : "dark"

  return (
    <button
      type="button"
      aria-pressed={mode === "paper"}
      aria-label={`Switch to ${next} mode`}
      onClick={() => setTheme(next)}
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
          mode === "dark"
            ? "underline underline-offset-[0.25em] decoration-[color:var(--accent-trace)] decoration-[1.5px] text-[color:var(--text-primary)]"
            : "",
        )}
      >
        DARK
      </span>
      <span aria-hidden="true" className="text-[color:var(--text-tertiary)]">/</span>
      <span
        className={cn(
          mode === "paper"
            ? "underline underline-offset-[0.25em] decoration-[color:var(--accent-trace)] decoration-[1.5px] text-[color:var(--text-primary)]"
            : "",
        )}
      >
        PAPER
      </span>
    </button>
  )
}

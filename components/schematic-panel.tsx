import { cn } from "@/lib/utils"

interface SchematicPanelProps {
  variant?: "grid" | "flow" | "blocks" | "hierarchy"
  className?: string
}

export function SchematicPanel({ variant = "grid", className }: SchematicPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-t-lg border border-b-0 border-border bg-surface overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Base grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Schematic content varies by variant */}
      <div className="relative h-full p-4">
        {variant === "grid" && <SchematicGrid />}
        {variant === "flow" && <SchematicFlow />}
        {variant === "blocks" && <SchematicBlocks />}
        {variant === "hierarchy" && <SchematicHierarchy />}
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-foreground/[0.08]" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-foreground/[0.08]" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-foreground/[0.08]" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-foreground/[0.08]" />
    </div>
  )
}

function SchematicGrid() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" className="opacity-30">
      {/* 2x3 grid of rectangles */}
      <rect x="8" y="8" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="72" y="8" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="136" y="8" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="8" y="44" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="72" y="44" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="136" y="44" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      {/* Small inner elements */}
      <line x1="16" y1="18" x2="48" y2="18" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      <line x1="80" y1="18" x2="112" y2="18" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      <line x1="144" y1="18" x2="176" y2="18" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      {/* Connecting lines */}
      <line x1="36" y1="36" x2="36" y2="44" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.2" />
      <line x1="100" y1="36" x2="100" y2="44" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.2" />
    </svg>
  )
}

function SchematicFlow() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" className="opacity-30">
      {/* Flow nodes */}
      <rect x="8" y="28" width="40" height="24" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="48" y1="40" x2="72" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <circle cx="60" cy="40" r="2" fill="currentColor" className="text-accent" opacity="0.5" />
      <rect x="72" y="28" width="56" height="24" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="128" y1="40" x2="152" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <circle cx="140" cy="40" r="2" fill="currentColor" className="text-accent" opacity="0.5" />
      <rect x="152" y="28" width="40" height="24" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      {/* Labels inside */}
      <line x1="16" y1="38" x2="38" y2="38" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      <line x1="80" y1="38" x2="118" y2="38" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      <line x1="160" y1="38" x2="182" y2="38" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      {/* Top annotation line */}
      <line x1="8" y1="14" x2="192" y2="14" stroke="currentColor" strokeWidth="0.3" className="text-foreground" strokeDasharray="2 3" />
    </svg>
  )
}

function SchematicBlocks() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" className="opacity-30">
      {/* Large block */}
      <rect x="8" y="8" width="120" height="64" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      {/* Inner structure */}
      <rect x="16" y="16" width="104" height="12" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <rect x="16" y="34" width="48" height="30" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <rect x="72" y="34" width="48" height="30" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      {/* Side panel */}
      <rect x="140" y="8" width="52" height="64" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="148" y1="22" x2="184" y2="22" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      <line x1="148" y1="32" x2="176" y2="32" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      <line x1="148" y1="42" x2="180" y2="42" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      {/* Accent dot */}
      <circle cx="148" cy="16" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
    </svg>
  )
}

function SchematicHierarchy() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" className="opacity-30">
      {/* Top node */}
      <rect x="72" y="4" width="56" height="18" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="80" y1="12" x2="118" y2="12" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      {/* Connecting lines down */}
      <line x1="100" y1="22" x2="100" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <line x1="40" y1="30" x2="160" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <line x1="40" y1="30" x2="40" y2="36" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <line x1="100" y1="30" x2="100" y2="36" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <line x1="160" y1="30" x2="160" y2="36" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      {/* Second row */}
      <rect x="12" y="36" width="56" height="18" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="72" y="36" width="56" height="18" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="132" y="36" width="56" height="18" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      {/* Bottom items */}
      <line x1="40" y1="54" x2="40" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <rect x="20" y="60" width="40" height="14" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <line x1="100" y1="54" x2="100" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <rect x="80" y="60" width="40" height="14" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      {/* Accent indicators */}
      <circle cx="16" cy="44" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="76" cy="44" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="136" cy="44" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
    </svg>
  )
}

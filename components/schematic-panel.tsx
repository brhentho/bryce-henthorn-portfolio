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
      <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-foreground/[0.1]" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-foreground/[0.1]" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-foreground/[0.1]" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-foreground/[0.1]" />
    </div>
  )
}

function SchematicGrid() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" className="opacity-40">
      {/* 2x3 grid of rectangles */}
      <rect x="8" y="8" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="72" y="8" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="136" y="8" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="8" y="44" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="72" y="44" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <rect x="136" y="44" width="56" height="28" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      {/* Inner text lines */}
      <line x1="16" y1="18" x2="48" y2="18" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.5" />
      <line x1="16" y1="24" x2="36" y2="24" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <line x1="80" y1="18" x2="112" y2="18" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.5" />
      <line x1="80" y1="24" x2="98" y2="24" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <line x1="144" y1="18" x2="176" y2="18" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.5" />
      <line x1="144" y1="24" x2="164" y2="24" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      {/* Connecting lines between rows */}
      <line x1="36" y1="36" x2="36" y2="44" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="100" y1="36" x2="100" y2="44" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="164" y1="36" x2="164" y2="44" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      {/* Inner dividers in bottom row */}
      <line x1="8" y1="56" x2="64" y2="56" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <line x1="72" y1="56" x2="128" y2="56" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <line x1="136" y1="56" x2="192" y2="56" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      {/* Small indicator dots */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="76" cy="12" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="140" cy="12" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      {/* Tick marks on left */}
      <line x1="2" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="2" y1="36" x2="5" y2="36" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="2" y1="44" x2="5" y2="44" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="2" y1="72" x2="5" y2="72" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
    </svg>
  )
}

function SchematicFlow() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" className="opacity-40">
      {/* Flow nodes */}
      <rect x="8" y="24" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      {/* Inner content */}
      <line x1="14" y1="34" x2="38" y2="34" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      <line x1="14" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="14" y1="46" x2="34" y2="46" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      {/* Arrow 1 */}
      <line x1="48" y1="40" x2="72" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <circle cx="60" cy="40" r="2" fill="currentColor" className="text-accent" opacity="0.5" />
      <polygon points="70,38 74,40 70,42" fill="currentColor" className="text-foreground" opacity="0.3" />
      {/* Middle node */}
      <rect x="72" y="24" width="56" height="32" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="78" y1="34" x2="118" y2="34" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      <line x1="78" y1="40" x2="104" y2="40" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="78" y1="46" x2="112" y2="46" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      {/* Horizontal divider in middle node */}
      <line x1="72" y1="38" x2="128" y2="38" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.12" />
      {/* Arrow 2 */}
      <line x1="128" y1="40" x2="152" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <circle cx="140" cy="40" r="2" fill="currentColor" className="text-accent" opacity="0.5" />
      <polygon points="150,38 154,40 150,42" fill="currentColor" className="text-foreground" opacity="0.3" />
      {/* End node */}
      <rect x="152" y="24" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="158" y1="34" x2="182" y2="34" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      <line x1="158" y1="40" x2="174" y2="40" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      {/* Top annotation line with ticks */}
      <line x1="8" y1="12" x2="192" y2="12" stroke="currentColor" strokeWidth="0.3" className="text-foreground" strokeDasharray="2 3" opacity="0.2" />
      <line x1="28" y1="10" x2="28" y2="14" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.2" />
      <line x1="100" y1="10" x2="100" y2="14" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.2" />
      <line x1="172" y1="10" x2="172" y2="14" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.2" />
      {/* Bottom annotation */}
      <line x1="8" y1="68" x2="192" y2="68" stroke="currentColor" strokeWidth="0.3" className="text-foreground" strokeDasharray="2 3" opacity="0.15" />
      {/* Small node labels */}
      <circle cx="12" cy="28" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="76" cy="28" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="156" cy="28" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
    </svg>
  )
}

function SchematicBlocks() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" className="opacity-40">
      {/* Large block */}
      <rect x="8" y="8" width="120" height="64" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      {/* Header bar */}
      <rect x="14" y="14" width="108" height="14" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <line x1="18" y1="21" x2="60" y2="21" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      {/* Divider */}
      <line x1="8" y1="32" x2="128" y2="32" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      {/* Content cells */}
      <rect x="14" y="36" width="50" height="28" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <line x1="20" y1="44" x2="48" y2="44" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="20" y1="50" x2="40" y2="50" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <rect x="70" y="36" width="50" height="28" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <line x1="76" y1="44" x2="104" y2="44" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="76" y1="50" x2="96" y2="50" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      {/* Side panel */}
      <rect x="140" y="8" width="52" height="64" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="146" y1="22" x2="184" y2="22" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      <line x1="140" y1="28" x2="192" y2="28" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.12" />
      <line x1="146" y1="36" x2="176" y2="36" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <line x1="146" y1="44" x2="180" y2="44" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <line x1="146" y1="52" x2="170" y2="52" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <line x1="146" y1="60" x2="178" y2="60" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      {/* Accent dots */}
      <circle cx="144" cy="16" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      {/* Small tick marks on right edge */}
      <line x1="195" y1="22" x2="198" y2="22" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.15" />
      <line x1="195" y1="36" x2="198" y2="36" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.15" />
      <line x1="195" y1="52" x2="198" y2="52" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.15" />
    </svg>
  )
}

function SchematicHierarchy() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" className="opacity-40">
      {/* Top node */}
      <rect x="72" y="4" width="56" height="18" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="78" y1="12" x2="118" y2="12" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      <circle cx="76" cy="8" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      {/* Connecting lines down */}
      <line x1="100" y1="22" x2="100" y2="28" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <line x1="40" y1="28" x2="160" y2="28" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <line x1="40" y1="28" x2="40" y2="34" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <line x1="100" y1="28" x2="100" y2="34" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <line x1="160" y1="28" x2="160" y2="34" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      {/* Second row */}
      <rect x="12" y="34" width="56" height="18" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="18" y1="42" x2="54" y2="42" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <rect x="72" y="34" width="56" height="18" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="78" y1="42" x2="114" y2="42" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      <rect x="132" y="34" width="56" height="18" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" />
      <line x1="138" y1="42" x2="174" y2="42" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.25" />
      {/* Bottom items */}
      <line x1="40" y1="52" x2="40" y2="58" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <rect x="18" y="58" width="44" height="16" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <line x1="24" y1="66" x2="48" y2="66" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="100" y1="52" x2="100" y2="58" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <rect x="78" y="58" width="44" height="16" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <line x1="84" y1="66" x2="108" y2="66" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      <line x1="160" y1="52" x2="160" y2="58" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <rect x="138" y="58" width="44" height="16" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.5" />
      <line x1="144" y1="66" x2="168" y2="66" stroke="currentColor" strokeWidth="0.4" className="text-foreground" opacity="0.2" />
      {/* Accent indicators */}
      <circle cx="16" cy="38" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="76" cy="38" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      <circle cx="136" cy="38" r="1.5" fill="currentColor" className="text-accent" opacity="0.5" />
      {/* Vertical scale line on right */}
      <line x1="196" y1="4" x2="196" y2="74" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.12" />
      <line x1="194" y1="4" x2="198" y2="4" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.12" />
      <line x1="194" y1="28" x2="198" y2="28" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.12" />
      <line x1="194" y1="58" x2="198" y2="58" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.12" />
    </svg>
  )
}

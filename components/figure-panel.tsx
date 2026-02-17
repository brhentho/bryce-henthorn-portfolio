import { cn } from "@/lib/utils"

interface FigurePanelProps {
  caption: string
  variant?: "layout" | "controls" | "flow"
  className?: string
  aspectRatio?: string
}

export function FigurePanel({ caption, variant = "layout", className, aspectRatio = "16/9" }: FigurePanelProps) {
  return (
    <figure className={cn("group", className)}>
      <div
        className="relative rounded-lg border border-border bg-surface overflow-hidden"
        style={{ aspectRatio }}
      >
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-foreground/[0.08]" aria-hidden="true" />
        <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-foreground/[0.08]" aria-hidden="true" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-foreground/[0.08]" aria-hidden="true" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-foreground/[0.08]" aria-hidden="true" />

        {/* Teal indicator + label */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
          <span className="font-mono text-[10px] tracking-[0.15em] text-foreground-tertiary uppercase">
            {caption}
          </span>
        </div>

        {/* Grid pattern fill */}
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

        {/* Schematic diagram content */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          {variant === "layout" && <FigureSchematicLayout />}
          {variant === "controls" && <FigureSchematicControls />}
          {variant === "flow" && <FigureSchematicFlow />}
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.1em] text-foreground-tertiary font-sans text-sm">
        {caption}
      </figcaption>
    </figure>
  )
}

function FigureSchematicLayout() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 160" fill="none" className="opacity-20 max-w-[320px]">
      {/* Main container */}
      <rect x="20" y="10" width="280" height="140" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      {/* Header bar */}
      <rect x="28" y="18" width="264" height="20" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" opacity="0.6" />
      <line x1="36" y1="28" x2="100" y2="28" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.4" />
      {/* Content blocks */}
      <rect x="28" y="46" width="126" height="48" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" opacity="0.6" />
      <rect x="162" y="46" width="130" height="48" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" opacity="0.6" />
      {/* Bottom row */}
      <rect x="28" y="102" width="80" height="36" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" opacity="0.6" />
      <rect x="116" y="102" width="80" height="36" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" opacity="0.6" />
      <rect x="204" y="102" width="88" height="36" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground" opacity="0.6" />
      {/* Inner lines */}
      <line x1="36" y1="56" x2="80" y2="56" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="36" y1="64" x2="64" y2="64" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="170" y1="56" x2="220" y2="56" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      {/* Accent indicator */}
      <circle cx="32" cy="50" r="2" fill="currentColor" className="text-accent" opacity="0.5" />
    </svg>
  )
}

function FigureSchematicControls() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 160" fill="none" className="opacity-20 max-w-[320px]">
      {/* Panel */}
      <rect x="40" y="20" width="240" height="120" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      {/* Toggle rows */}
      <line x1="56" y1="44" x2="120" y2="44" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.4" />
      <rect x="230" y="38" width="32" height="12" rx="6" stroke="currentColor" strokeWidth="0.75" className="text-accent" opacity="0.5" />
      <circle cx="252" cy="44" r="4" fill="currentColor" className="text-accent" opacity="0.4" />
      {/* Second toggle */}
      <line x1="56" y1="68" x2="140" y2="68" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.4" />
      <rect x="230" y="62" width="32" height="12" rx="6" stroke="currentColor" strokeWidth="0.75" className="text-foreground" opacity="0.3" />
      {/* Third toggle */}
      <line x1="56" y1="92" x2="110" y2="92" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.4" />
      <rect x="230" y="86" width="32" height="12" rx="6" stroke="currentColor" strokeWidth="0.75" className="text-accent" opacity="0.5" />
      <circle cx="252" cy="92" r="4" fill="currentColor" className="text-accent" opacity="0.4" />
      {/* Dividers */}
      <line x1="56" y1="56" x2="264" y2="56" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      <line x1="56" y1="80" x2="264" y2="80" stroke="currentColor" strokeWidth="0.3" className="text-foreground" opacity="0.15" />
      {/* Section label */}
      <line x1="56" y1="112" x2="104" y2="112" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.3" />
      <line x1="56" y1="120" x2="160" y2="120" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.2" />
    </svg>
  )
}

function FigureSchematicFlow() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 160" fill="none" className="opacity-20 max-w-[320px]">
      {/* Flow nodes */}
      <rect x="20" y="60" width="64" height="40" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <line x1="30" y1="76" x2="60" y2="76" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      <line x1="30" y1="84" x2="50" y2="84" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.2" />
      {/* Arrow 1 */}
      <line x1="84" y1="80" x2="120" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <circle cx="102" cy="80" r="2.5" fill="currentColor" className="text-accent" opacity="0.5" />
      {/* Middle node */}
      <rect x="120" y="60" width="80" height="40" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <line x1="130" y1="76" x2="180" y2="76" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      <line x1="130" y1="84" x2="164" y2="84" stroke="currentColor" strokeWidth="0.5" className="text-foreground" opacity="0.2" />
      {/* Arrow 2 */}
      <line x1="200" y1="80" x2="236" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      <circle cx="218" cy="80" r="2.5" fill="currentColor" className="text-accent" opacity="0.5" />
      {/* End node */}
      <rect x="236" y="60" width="64" height="40" rx="3" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      <line x1="246" y1="76" x2="280" y2="76" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.3" />
      {/* Top annotation */}
      <line x1="20" y1="30" x2="300" y2="30" stroke="currentColor" strokeWidth="0.3" className="text-foreground" strokeDasharray="3 4" />
      <line x1="52" y1="26" x2="52" y2="34" stroke="currentColor" strokeWidth="0.3" className="text-foreground" />
      <line x1="160" y1="26" x2="160" y2="34" stroke="currentColor" strokeWidth="0.3" className="text-foreground" />
      <line x1="268" y1="26" x2="268" y2="34" stroke="currentColor" strokeWidth="0.3" className="text-foreground" />
      {/* Bottom annotation */}
      <line x1="20" y1="130" x2="300" y2="130" stroke="currentColor" strokeWidth="0.3" className="text-foreground" strokeDasharray="3 4" />
    </svg>
  )
}

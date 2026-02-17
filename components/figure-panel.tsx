import { cn } from "@/lib/utils"

interface FigurePanelProps {
  caption: string
  className?: string
  aspectRatio?: string
}

export function FigurePanel({ caption, className, aspectRatio = "16/9" }: FigurePanelProps) {
  return (
    <figure className={cn("group", className)}>
      <div
        className="relative rounded-lg border border-border bg-surface overflow-hidden"
        style={{ aspectRatio }}
      >
        {/* Teal indicator corner */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-60" />
          <span className="font-mono text-[10px] tracking-[0.15em] text-foreground-tertiary uppercase">
            {caption}
          </span>
        </div>
        {/* Grid pattern fill */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        {/* Center placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-foreground-tertiary">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.1em] text-foreground-tertiary">
        {caption}
      </figcaption>
    </figure>
  )
}

import { cn } from "@/lib/utils"

interface FigurePanelProps {
  caption: string
  variant?: "layout" | "controls" | "flow" | "video"
  className?: string
  aspectRatio?: string
}

export function FigurePanel({ caption, variant, className, aspectRatio = "16/9" }: FigurePanelProps) {
  const isVideo = variant === "video"

  return (
    <figure className={cn("group", className)}>
      <div
        className="relative rounded-[var(--radius-card)] border border-border bg-surface-raised overflow-hidden"
        style={{ aspectRatio }}
      >
        {/* Placeholder content area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 opacity-30">
            {isVideo ? (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
              </svg>
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 15l6-6 4 4 8-8" />
              </svg>
            )}
            <span className="text-xs font-sans text-foreground">
              {isVideo ? "Video placeholder" : "Image placeholder"}
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm font-sans text-foreground-tertiary">
        {caption}
      </figcaption>
    </figure>
  )
}

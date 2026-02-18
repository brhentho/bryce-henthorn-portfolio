import Image from "next/image"
import { cn } from "@/lib/utils"

interface FigurePanelProps {
  caption: string
  variant?: "layout" | "controls" | "flow" | "video"
  /** Image source path for static figures */
  src?: string
  /** Video source URL for video figures */
  videoSrc?: string
  className?: string
  aspectRatio?: string
}

export function FigurePanel({ caption, variant, src, videoSrc, className, aspectRatio = "16/9" }: FigurePanelProps) {
  const isVideo = variant === "video" || !!videoSrc

  return (
    <figure className={cn("group", className)}>
      <div
        className="relative rounded-[var(--radius-card)] border border-border bg-surface-raised overflow-hidden"
        style={{ aspectRatio: (src || videoSrc) ? undefined : aspectRatio }}
      >
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-auto block"
          >
            <source src={videoSrc} type={videoSrc.endsWith(".mp4") ? "video/mp4" : "video/quicktime"} />
            {/* mp4 fallback for browsers that don't support quicktime */}
            {videoSrc.endsWith(".mov") && (
              <source src={videoSrc} type="video/mp4" />
            )}
            <div className="flex items-center justify-center p-8 text-foreground-tertiary text-sm font-sans">
              Video not supported in this browser
            </div>
          </video>
        ) : src ? (
          <Image
            src={src}
            alt={caption}
            width={1200}
            height={675}
            className="w-full h-auto block"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ aspectRatio }}>
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
        )}
      </div>
      <figcaption className="mt-3 text-sm font-sans text-foreground-tertiary">
        {caption}
      </figcaption>
    </figure>
  )
}

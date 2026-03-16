"use client"

import { useRef, useEffect, useState } from "react"
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

function LazyVideo({ videoSrc }: { videoSrc: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Pause video when it scrolls out of view to free memory
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: "50px" }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <div ref={containerRef} style={{ aspectRatio: isVisible ? undefined : "16/9" }}>
      {isVisible ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-auto block"
        >
          <source src={videoSrc} type={videoSrc.endsWith(".mp4") ? "video/mp4" : "video/quicktime"} />
          {videoSrc.endsWith(".mov") && (
            <source src={videoSrc} type="video/mp4" />
          )}
        </video>
      ) : (
        <div className="flex items-center justify-center h-full">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground opacity-20">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
          </svg>
        </div>
      )}
    </div>
  )
}

interface DiagramPlaceholderProps {
  label: string
  aspectRatio?: string
  className?: string
}

export function DiagramPlaceholder({ label, aspectRatio = "16/9", className }: DiagramPlaceholderProps) {
  return (
    <figure className={cn("group mt-8 mb-4 max-w-2xl", className)}>
      <div
        className="relative rounded-[var(--radius-card)] border border-dashed border-border bg-surface-raised overflow-hidden flex items-center justify-center"
        style={{ aspectRatio }}
      >
        <div className="flex flex-col items-center gap-3 px-8 text-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground opacity-25">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
          <span className="text-xs font-sans text-foreground-tertiary opacity-50 max-w-xs leading-relaxed">
            Diagram coming
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-sm font-sans text-foreground-tertiary">
        {label}
      </figcaption>
    </figure>
  )
}

export function FigurePanel({ caption, variant, src, videoSrc, className, aspectRatio = "16/9" }: FigurePanelProps) {
  const isVideo = variant === "video" || !!videoSrc

  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "relative overflow-hidden",
          !(src || videoSrc) && "rounded-[var(--radius-card)] border border-border bg-surface-raised"
        )}
        style={{ aspectRatio: (src || videoSrc) ? undefined : aspectRatio }}
      >
        {videoSrc ? (
          <LazyVideo videoSrc={videoSrc} />
        ) : src ? (
          <Image
            src={src}
            alt={caption}
            width={1600}
            height={900}
            className="w-full h-auto block object-contain"
            sizes="(max-width: 768px) 100vw, 900px"
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

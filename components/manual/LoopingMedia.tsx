"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

type PlaybackPreference = "auto" | "paused" | "playing"

type Props = {
  src: string
  label: string
  className?: string
  videoClassName?: string
  videoStyle?: CSSProperties
  poster?: string
}

export function LoopingMedia({
  src,
  label,
  className,
  videoClassName,
  videoStyle,
  poster,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const [inView, setInView] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [preference, setPreference] = useState<PlaybackPreference>("auto")
  const [documentVisible, setDocumentVisible] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const syncVisibility = () => {
      setDocumentVisible(document.visibilityState === "visible")
    }
    syncVisibility()
    document.addEventListener("visibilitychange", syncVisibility)
    return () => document.removeEventListener("visibilitychange", syncVisibility)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const wantsPlayback =
      inView &&
      documentVisible &&
      (preference === "playing" ||
        (preference === "auto" && reduceMotion === false))

    if (!wantsPlayback) {
      video.pause()
      return
    }

    void video.play().catch(() => {
      setPreference("paused")
      setIsPlaying(false)
    })
  }, [documentVisible, inView, preference, reduceMotion])

  const togglePlayback = () => {
    setPreference(isPlaying ? "paused" : "playing")
  }

  return (
    <div className={cn("relative", className)}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        className={cn("block w-full h-auto", videoClassName)}
        style={videoStyle}
        src={src}
        onLoadedMetadata={(event) => {
          if (event.currentTarget.currentTime === 0) {
            event.currentTarget.currentTime = 0.001
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        aria-label={`${isPlaying ? "Pause" : "Play"} ${label}`}
        onClick={togglePlayback}
        className="t-mono-label absolute bottom-3 right-3 z-20 inline-flex min-h-11 min-w-11 items-center justify-center border border-[color:var(--rule-strong)] bg-[color:var(--ink)] px-3 text-[color:var(--text-primary)] transition-[border-color,color] duration-[var(--duration-fast-ui)] ease-[var(--ease-out-quad)] hover:border-[color:var(--accent-trace)] hover:text-[color:var(--accent-trace)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-trace)]"
      >
        {isPlaying ? "PAUSE" : "PLAY"}
      </button>
    </div>
  )
}

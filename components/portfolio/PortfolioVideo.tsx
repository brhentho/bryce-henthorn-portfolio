"use client"

import { useEffect, useRef, useState } from "react"
import { createVideoPlayback, VIDEO_START_RATIO, VIDEO_STOP_RATIO } from "@/lib/portfolio/video-playback"
import type { MediaItem } from "./types"

type VideoMedia = Extract<MediaItem, { kind: "video" }>
const lazyMedia = { loading: "lazy" } as const

export function PortfolioVideo({ id, media, onError }: { id: string; media: VideoMedia; onError: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [notice, setNotice] = useState("")
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    const connection = "connection" in navigator && navigator.connection instanceof EventTarget ? navigator.connection : null
    const saveData = () => Boolean(connection && "saveData" in connection && connection.saveData === true)
    const playback = createVideoPlayback(video, {
      reducedMotion: reduced.matches, saveData: saveData(), pageVisible: !document.hidden,
      onBlocked(error) {
        console.warn(`Automatic playback unavailable: ${id}`, error)
        setNotice("Automatic playback is unavailable. Use Play to watch this recording.")
      },
      onManualPlay() { setNotice("") },
    })
    const visibility = new IntersectionObserver(([entry]) => {
      playback.setVisibility(entry.isIntersecting ? entry.intersectionRatio : 0)
    }, { threshold: [0, VIDEO_STOP_RATIO, VIDEO_START_RATIO, 1] })
    const prepare = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || saveData() || reduced.matches) return
      video.preload = "metadata"
      prepare.unobserve(video)
    }, { rootMargin: "400px 0px" })
    visibility.observe(video)
    prepare.observe(video)
    const pageVisibility = () => playback.setPageVisible(!document.hidden)
    const preferences = () => playback.setPreferences({ reducedMotion: reduced.matches, saveData: saveData() })
    document.addEventListener("visibilitychange", pageVisibility)
    reduced.addEventListener("change", preferences)
    connection?.addEventListener("change", preferences)
    return () => {
      visibility.disconnect()
      prepare.disconnect()
      document.removeEventListener("visibilitychange", pageVisibility)
      reduced.removeEventListener("change", preferences)
      connection?.removeEventListener("change", preferences)
      playback.dispose()
    }
  }, [id, media.src])
  return <>
    <video ref={ref} {...lazyMedia} src={media.src} poster={media.poster}
      width={media.width} height={media.height} controls muted loop playsInline
      preload="none" aria-label={media.title} onError={onError} />
    {notice && <p className="pf-playback-notice" role="status">{notice}</p>}
  </>
}

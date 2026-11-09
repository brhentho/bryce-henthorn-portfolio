type Preferences = { reducedMotion: boolean; saveData: boolean }
type PlaybackOptions = Preferences & {
  pageVisible: boolean
  onBlocked: (error: unknown) => void
  onManualPlay: () => void
}

export const VIDEO_START_RATIO = .6
export const VIDEO_STOP_RATIO = .2

/** Owns automatic requests, never the reader's deliberate pause or audible playback. */
export function createVideoPlayback(video: HTMLVideoElement, options: PlaybackOptions) {
  let preferences: Preferences = options
  let pageVisible = options.pageVisible
  let ratio = 0
  let eligible = false
  let manuallyPaused = false
  let blocked = false
  let automatic = false
  let expectedPauses = 0
  let generation = 0
  let pending: number | null = null
  let disposed = false

  const offscreen = () => ratio < VIDEO_STOP_RATIO || !pageVisible
  const preferencesPreventAuto = () => preferences.reducedMotion || preferences.saveData

  function pause() {
    generation += 1
    pending = null
    if (!video.paused) {
      expectedPauses += 1
      video.pause()
    }
  }

  function sync() {
    if (disposed) return
    if (offscreen() || (automatic && preferencesPreventAuto())) {
      pause()
      return
    }
    if (!eligible || preferencesPreventAuto() || manuallyPaused || blocked || !video.muted || !video.paused || pending !== null) return
    const attempt = ++generation
    pending = attempt
    automatic = true
    void video.play().then(() => {
      if (disposed) return
      if (pending === attempt) pending = null
      if (offscreen() || manuallyPaused || (automatic && preferencesPreventAuto())) pause()
    }, error => {
      if (disposed || attempt !== generation) return
      pending = null
      automatic = false
      blocked = true
      options.onBlocked(error)
    })
  }

  function onPlay() {
    if (pending === null) {
      generation += 1
      pending = null
      automatic = false
      manuallyPaused = false
      blocked = false
      options.onManualPlay()
    }
    sync()
  }
  function onPause() {
    if (expectedPauses > 0) { expectedPauses -= 1; return }
    if (offscreen()) return
    manuallyPaused = true
    automatic = false
    generation += 1
    pending = null
  }
  function onVolumeChange() {
    if (!video.muted) automatic = false
    sync()
  }
  video.addEventListener("play", onPlay)
  video.addEventListener("pause", onPause)
  video.addEventListener("volumechange", onVolumeChange)

  return {
    setVisibility(nextRatio: number) {
      ratio = nextRatio
      if (ratio >= VIDEO_START_RATIO) eligible = true
      else if (ratio < VIDEO_STOP_RATIO) eligible = false
      sync()
    },
    setPageVisible(visible: boolean) { pageVisible = visible; sync() },
    setPreferences(next: Preferences) { preferences = next; sync() },
    dispose() {
      disposed = true
      pause()
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("volumechange", onVolumeChange)
    },
  }
}

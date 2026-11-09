import test from "node:test"
import assert from "node:assert/strict"
import { createVideoPlayback } from "../lib/portfolio/video-playback.ts"
import { PORTFOLIO_MEDIA } from "../lib/portfolio/media.ts"

const flush = () => new Promise(resolve => setImmediate(resolve))

class Video extends EventTarget {
  paused = true
  muted = true
  currentTime = 3
  playCount = 0
  failure = null
  deferred = null
  play() {
    this.playCount++
    if (this.failure) return Promise.reject(this.failure)
    this.paused = false
    this.dispatchEvent(new Event("play"))
    return this.deferred ?? Promise.resolve()
  }
  pause() {
    if (this.paused) return
    this.paused = true
    this.dispatchEvent(new Event("pause"))
  }
}

function setup(preferences = {}) {
  const video = new Video(), blocked = []
  const player = createVideoPlayback(video, {
    reducedMotion: false, saveData: false, pageVisible: true, ...preferences,
    onBlocked: error => blocked.push(error), onManualPlay() {},
  })
  return { video, player, blocked }
}

test("viewport playback has start/stop hysteresis and retains the playhead", async () => {
  const { video, player } = setup()
  player.setVisibility(.5)
  assert.equal(video.paused, true)
  player.setVisibility(.6)
  await flush()
  assert.equal(video.paused, false)
  player.setVisibility(.4)
  assert.equal(video.paused, false)
  assert.equal(video.playCount, 1)
  player.setVisibility(.19)
  assert.equal(video.paused, true)
  player.setVisibility(.5)
  assert.equal(video.paused, true)
  player.setVisibility(.7)
  await flush()
  assert.equal(video.paused, false)
  assert.equal(video.currentTime, 3)
  player.dispose()
})

test("a deliberate pause survives exit/re-entry until the reader presses Play", async () => {
  const { video, player } = setup()
  player.setVisibility(1)
  await flush()
  video.pause()
  player.setVisibility(0)
  player.setVisibility(1)
  assert.equal(video.paused, true)
  assert.equal(video.playCount, 1)
  await video.play()
  player.setVisibility(0)
  player.setVisibility(1)
  await flush()
  assert.equal(video.paused, false)
  player.dispose()
})

test("explicit unmute is preserved but audible playback does not resume automatically", async () => {
  const { video, player } = setup()
  player.setVisibility(1)
  await flush()
  video.muted = false
  video.dispatchEvent(new Event("volumechange"))
  assert.equal(video.paused, false)
  player.setVisibility(0)
  player.setVisibility(1)
  assert.equal(video.paused, true)
  assert.equal(video.muted, false)
  await video.play()
  assert.equal(video.paused, false)
  player.dispose()
})

test("reduced motion and save-data disable automation, not deliberate playback", async () => {
  for (const preferences of [{ reducedMotion: true, saveData: false }, { reducedMotion: false, saveData: true }]) {
    const { video, player } = setup(preferences)
    player.setVisibility(1)
    assert.equal(video.playCount, 0)
    await video.play()
    player.setVisibility(.8)
    player.setPreferences(preferences)
    assert.equal(video.paused, false)
    player.setVisibility(0)
    assert.equal(video.paused, true)
    player.setVisibility(1)
    assert.equal(video.paused, true)
    player.dispose()
  }
})

test("changing motion preference stops an automatic clip; manual play remains available", async () => {
  const { video, player } = setup()
  player.setVisibility(1)
  await flush()
  player.setPreferences({ reducedMotion: true, saveData: false })
  assert.equal(video.paused, true)
  await video.play()
  assert.equal(video.paused, false)
  player.dispose()
})

test("hidden tabs pause playback and resume only eligible, non-manually-paused clips", async () => {
  const { video, player } = setup()
  player.setVisibility(1)
  await flush()
  player.setPageVisible(false)
  assert.equal(video.paused, true)
  player.setPageVisible(true)
  await flush()
  assert.equal(video.paused, false)
  video.pause()
  player.setPageVisible(false)
  player.setPageVisible(true)
  assert.equal(video.paused, true)
  player.dispose()
})

test("blocked autoplay is reported once, not retried on each intersection", async () => {
  const { video, player, blocked } = setup()
  video.failure = new DOMException("User gesture required", "NotAllowedError")
  player.setVisibility(1)
  await flush()
  player.setVisibility(.7)
  player.setVisibility(0)
  player.setVisibility(1)
  assert.equal(video.playCount, 1)
  assert.equal(blocked.length, 1)
  video.failure = null
  await video.play()
  player.setVisibility(0)
  player.setVisibility(1)
  await flush()
  assert.equal(video.paused, false)
  player.dispose()
})

test("scroll cancellation does not report a playback failure", async () => {
  const { video, player, blocked } = setup()
  let reject
  video.deferred = new Promise((_, no) => { reject = no })
  player.setVisibility(1)
  player.setVisibility(0)
  reject(new DOMException("Interrupted by pause", "AbortError"))
  await flush()
  assert.deepEqual(blocked, [])
  assert.equal(video.paused, true)
  player.dispose()
})

test("late playback completion is paused offscreen and disposal prevents resuming", async () => {
  const { video, player, blocked } = setup()
  let resolve
  video.deferred = new Promise(yes => { resolve = yes })
  player.setVisibility(1)
  player.setVisibility(0)
  video.paused = false
  resolve()
  await flush()
  assert.equal(video.paused, true)
  player.dispose()
  player.setVisibility(1)
  assert.equal(video.paused, true)
  assert.deepEqual(blocked, [])
})

test("every recording reserves its measured frame geometry", () => {
  const videos = Object.values(PORTFOLIO_MEDIA).filter(media => media.kind === "video")
  assert.equal(videos.length, 7)
  for (const video of videos) {
    assert.ok(Number.isInteger(video.width) && video.width > 0)
    assert.ok(Number.isInteger(video.height) && video.height > 0)
  }
  assert.deepEqual([PORTFOLIO_MEDIA["agents-taskbar"].width, PORTFOLIO_MEDIA["agents-taskbar"].height], [760, 428])
})

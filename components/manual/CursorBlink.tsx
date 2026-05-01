/**
 * Mono pipe cursor that blinks at the end of a hero h1 for ~6 seconds, then
 * fades out. Pure decoration — aria-hidden. CSS in recall.css drives the
 * blink + fadeout sequence.
 */
export function CursorBlink() {
  return (
    <span className="manual-cursor-blink" aria-hidden="true">
      |
    </span>
  )
}

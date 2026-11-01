type Props = {
  /** Figure number the finished loop will take, e.g. "0.2". */
  number: string
  title: string
  /** Ordered beats of the recording. */
  shots: string[]
  /** Target length in seconds. */
  seconds: number
  aspect?: string
}

/**
 * Reserved slot for a recording that hasn't been captured yet. Renders the
 * shot list inside figure chrome during development and review; renders
 * nothing in production so an unfinished placeholder never ships.
 * Spec for every loop: H.264 MP4 + poster JPG, 1600×1000, no audio,
 * seamless loop, ≤ 1.5 MB. Swap for <LoopingMedia> once the file exists.
 */
export function MediaSlot({ number, title, shots, seconds, aspect = "16 / 10" }: Props) {
  if (process.env.NODE_ENV === "production") return null
  return (
    <aside className="media-slot" style={{ aspectRatio: aspect }} aria-label={`Placeholder for figure ${number}: ${title}`}>
      <p className="t-mono-label">FIG. {number} · RECORDING NEEDED · {seconds}s LOOP</p>
      <p className="t-h3 mt-3">{title}</p>
      <ol className="media-slot-shots">
        {shots.map((shot, i) => (
          <li key={shot} className="t-mono-caption">
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span> {shot}
          </li>
        ))}
      </ol>
    </aside>
  )
}

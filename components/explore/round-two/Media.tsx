"use client"

import Image from "next/image"
import { useState } from "react"
import { EXPLORATION_MEDIA, type ExplorationMedia } from "@/lib/explore/media"

type FigureProps = {
  src: string
  alt: string
  width: number
  height: number
  caption: string
  number: string
  className?: string
  priority?: boolean
  position?: string
  mobileSrc?: string
}

export function StudyFigure(props: FigureProps) {
  return <FigureImage key={props.src} {...props} />
}

function FigureImage({ src, alt, width, height, caption, number, className = "", priority = false, position, mobileSrc }: FigureProps) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className={`xr-figure ${className}`}>
      <div className="xr-image-frame" style={{ aspectRatio: `${width} / ${height}` }}>
        {failed ? <p className="xr-media-error" role="alert">Image unavailable. {alt}</p> : (
          <picture>
            {mobileSrc && <source media="(max-width: 700px)" srcSet={mobileSrc} />}
            <Image src={src} alt={alt} width={width} height={height} priority={priority}
              sizes="(max-width: 700px) 100vw, 85vw" style={position ? { objectPosition: position } : undefined}
              onError={() => setFailed(true)} />
          </picture>
        )}
      </div>
      <figcaption><span>Fig. {number}</span><span>{caption}</span></figcaption>
    </figure>
  )
}

export function PlaceholderArt({ className = "" }: { className?: string }) {
  const art: ExplorationMedia = EXPLORATION_MEDIA.cinema
  return <AssetMedia media={art} number="00" caption={art.illustrative ? `Illustrative placeholder / ${art.credit}` : art.credit} className={className} priority />
}

export function TaskbarFilm() {
  const media: ExplorationMedia = EXPLORATION_MEDIA.taskbar
  return <AssetMedia media={media} number="04" caption={media.kind === "video" ? "Original taskbar demonstration. Play to inspect the expanding hover card." : "Taskbar interaction detail."} />
}

function AssetMedia({ media, ...props }: { media: ExplorationMedia } & Pick<FigureProps, "number" | "caption" | "className" | "priority">) {
  return media.kind === "video" ? <VideoFigure key={media.src} media={media} {...props} /> : <StudyFigure {...media} {...props} />
}

function VideoFigure({ media, number, caption, className = "" }: {
  media: ExplorationMedia
  number: string
  caption: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className={`xr-figure xr-film ${className}`}>
      <div className="xr-image-frame" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
        {failed ? (
          <p className="xr-media-error" role="alert">Video unavailable. {media.alt}</p>
        ) : (
          <video controls playsInline preload="none" poster={media.poster} aria-label={media.alt}
            onError={() => setFailed(true)}
            onPlay={(event) => {
              document.querySelectorAll("video").forEach((video) => {
                if (video !== event.currentTarget) video.pause()
              })
            }}>
            <source src={media.src} onError={() => setFailed(true)} />
            Your browser does not support this video.
          </video>
        )}
      </div>
      <figcaption><span>Fig. {number}</span><span>{caption}</span></figcaption>
    </figure>
  )
}

"use client"

import Image from "next/image"
import { useRef } from "react"

export function ArtifactZoom({ src, alt, width, height, caption, number }: {
  src: string; alt: string; width: number; height: number; caption: string; number: string
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  return <figure className="xf-zoom">
    <button type="button" aria-label={`Enlarge: ${caption}`} onClick={() => dialog.current?.showModal()}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 850px) 90vw, 65vw" /><span aria-hidden="true">↗</span>
    </button>
    <figcaption className="xr-label">Fig. {number} / {caption}</figcaption>
    <dialog ref={dialog} className="xf-lightbox" aria-label={caption}>
      <button type="button" onClick={() => dialog.current?.close()}>Close image ×</button>
      <Image src={src} alt={alt} width={width} height={height} sizes="95vw" />
      <p>{caption}</p>
    </dialog>
  </figure>
}

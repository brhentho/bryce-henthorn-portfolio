"use client"

import Image from "next/image"
import { useState } from "react"
import { PORTFOLIO_MEDIA } from "@/lib/portfolio/media"
import type { MediaItem } from "./types"
import { PortfolioVideo } from "./PortfolioVideo"

export function PortfolioMedia({ id, number, className="" }: { id:string; number?:string; className?:string }) {
  const media: MediaItem | undefined = PORTFOLIO_MEDIA[id]
  if (!media) throw new Error(`Unknown portfolio media: ${id}`)
  return <MediaContent key={id} id={id} media={media} number={number} className={className} />
}

function MediaContent({id,media,number,className}:{id:string;media:MediaItem;number?:string;className:string}) {
  const [failed,setFailed]=useState(false)
  if(media.kind==="request")return <aside className={`pf-media-request ${className}`} data-media-request={media.requestId} aria-label={`Planned media: ${media.title}`}>
    <p className="fn-label">{number ? `Fig. ${number} / ` : ""}{media.requestId} / Planned media</p><h3>{media.title}</h3><p>{media.description}</p>
    <span className="fn-label">Awaiting cleared artifact</span>
  </aside>
  return <figure className={`pf-media ${className}`} data-media-id={id} data-pf-reveal="evidence">
    <div className="pf-media-frame">
      {media.kind==="image"
        ? <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 850px) 92vw, 65vw" onError={()=>setFailed(true)} />
        : failed ? <Image src={media.poster} alt={`Still frame: ${media.title}`} width={media.width} height={media.height} sizes="90vw" />
        : <PortfolioVideo id={id} media={media} onError={()=>{console.warn(`Portfolio recording unavailable: ${id}`);setFailed(true)}} />}
      {failed && <p className="pf-media-error" role="status">{media.kind==="video"?"Recording":"Image"} unavailable. <a href={media.src}>Open original source ↗</a></p>}
    </div>
    <figcaption className="fn-label">{number?`Fig. ${number} / `:""}{media.caption}</figcaption>
  </figure>
}

import Image from "next/image"
import { ViewTransitionLink } from "./ViewTransitionLink"

type Props = {
  id: string
  index: string
  href: string
  eyebrow: string
  title: string
  proof: string
  imgSrc: string
  imgAlt: string
  imagePosition?: string
  eager?: boolean
}

/** Independent text and image lanes keep both the argument and the UI legible. */
export function ProjectCard({ id, index, href, eyebrow, title, proof, imgSrc, imgAlt, imagePosition = "center bottom", eager = false }: Props) {
  return (
    <article id={id} className="showcase-chapter">
      <div className="showcase-frame">
        <div className="showcase-heading t-mono-label"><span>{index} / 03</span><span>Selected work</span></div>
        <div className="showcase-grid">
          <div className="project-card-content">
            <h3 className="t-h1 text-balance">{eyebrow}</h3>
            <p className="t-body showcase-description">{title}</p>
            <p className="t-mono-colophon pcard-proof">{proof}</p>
            <ViewTransitionLink href={href} instant className="t-mono-caption showcase-link">Read case study <span aria-hidden="true">↗</span></ViewTransitionLink>
          </div>
          <div className="showcase-media">
            <Image src={imgSrc} alt={imgAlt} fill
              sizes="(min-width: 1280px) 680px, (min-width: 768px) 60vw, 100vw"
              className="showcase-image object-contain"
              style={{ objectPosition: imagePosition }} loading={eager ? "eager" : "lazy"} />
          </div>
        </div>
      </div>
    </article>
  )
}

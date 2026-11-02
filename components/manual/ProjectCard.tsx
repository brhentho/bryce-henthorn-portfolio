import Image from "next/image"
import { ViewTransitionLink } from "./ViewTransitionLink"

type Props = {
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
export function ProjectCard({ href, eyebrow, title, proof, imgSrc, imgAlt, imagePosition = "center bottom", eager = false }: Props) {
  return (
    <ViewTransitionLink href={href} data-project-card className="block group">
      <article className="project-card border border-[color:var(--rule)] transition-[border-color] duration-[var(--duration-fast-ui)] group-hover:border-[color:var(--rule-strong)] group-focus-visible:border-[color:var(--rule-strong)]">
        <div className="project-card-content">
          <p className="t-mono-label pcard-label">{eyebrow}</p>
          <h3 className="t-h1 pcard-title text-balance">{title}</h3>
          <p className="t-mono-colophon pcard-proof">{proof}</p>
          <span className="t-mono-caption project-card-read">Read case study <span aria-hidden="true">↗</span></span>
        </div>
        <div className="project-card-media">
          <Image src={imgSrc} alt={imgAlt} fill
            sizes="(min-width: 1280px) 680px, (min-width: 768px) 60vw, 100vw"
            className="project-card-image object-contain"
            style={{ objectPosition: imagePosition }} loading={eager ? "eager" : "lazy"} />
        </div>
      </article>
    </ViewTransitionLink>
  )
}

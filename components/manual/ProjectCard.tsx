import Image from "next/image"
import { ViewTransitionLink } from "./ViewTransitionLink"

type Props = {
  href: string
  eyebrow: string
  title: string
  years: string
  bgSrc: string
  artSrc: string
  artAlt: string
}

/**
 * Homepage project card. Composes a per-card gradient background image with
 * a foreground art image (UI mockup, screenshot, avatar set) and renders the
 * project metadata (eyebrow, title, year, READ →) on the left half. The
 * card has no internal divider — bg flows edge-to-edge under both panes.
 */
export function ProjectCard({
  href,
  eyebrow,
  title,
  years,
  bgSrc,
  artSrc,
  artAlt,
}: Props) {
  return (
    <ViewTransitionLink
      href={href}
      className="block group focus:outline focus:outline-1 focus:outline-[color:var(--accent-trace)]"
    >
      <article className="relative border border-[color:var(--rule)] group-hover:border-[color:var(--rule-strong)] transition-colors lg:aspect-[1120/496] overflow-hidden bg-[color:var(--ink)]">
        {/* Layer 1: gradient background */}
        <Image
          src={bgSrc}
          alt=""
          fill
          aria-hidden="true"
          sizes="(min-width: 1024px) 1120px, 100vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.01]"
          priority={false}
        />

        {/* Layer 2: foreground art (UI mockup, screenshot, avatars), right-aligned */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-6 lg:pr-12">
          <div className="relative h-[85%] aspect-[423/374] hidden sm:block">
            <Image
              src={artSrc}
              alt={artAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 60vw"
              className="object-contain object-right"
            />
          </div>
        </div>

        {/* Layer 3: text content (left half, no divider) */}
        <div className="relative h-full min-h-[320px] lg:min-h-0 p-6 lg:p-10 flex flex-col justify-between gap-8 lg:w-1/2">
          <div>
            <p className="t-mono-label">{eyebrow}</p>
            <h3 className="t-h1 mt-4 text-[color:var(--text-primary)]">
              {title}
            </h3>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="t-mono-caption text-[color:var(--text-tertiary)]">
              {years}
            </span>
            <span className="t-mono-label group-hover:text-[color:var(--accent-trace)] transition-colors inline-flex items-baseline gap-[0.3em]">
              READ
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </article>
    </ViewTransitionLink>
  )
}

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
 * Homepage project card. Lays the cosmic background image full-bleed under
 * a two-column grid: text (eyebrow / title / year + READ) on the left, the
 * project's foreground art (UI mockup, screenshot, avatar set) on the right.
 * Matches the Figma 1120×496 frame: 60/40 split, year & READ left-aligned
 * with a generous gap, art top-aligned in the right column.
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
        {/* Layer 1 — full-bleed background */}
        <Image
          src={bgSrc}
          alt=""
          fill
          aria-hidden="true"
          sizes="(min-width: 1024px) 1120px, 100vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.01]"
          priority={false}
        />

        {/* Layer 2 — two-column content. Padding mirrors Figma: ~48px h, ~74px v on desktop. */}
        <div className="relative h-full flex flex-col lg:flex-row p-6 sm:p-8 lg:px-12 lg:py-14 xl:py-[74px] gap-6 lg:gap-8">
          {/* LEFT — text column (60%) */}
          <div className="flex flex-col justify-between min-w-0 flex-1 lg:basis-[60%] lg:max-w-[60%]">
            <div className="flex-1 flex flex-col justify-center min-h-[220px] lg:min-h-0">
              <p className="t-mono-label">{eyebrow}</p>
              <h3
                className="t-h1 text-[color:var(--text-primary)]"
                style={{ marginTop: "48px" }}
              >
                {title}
              </h3>
            </div>
            <div className="flex items-baseline gap-x-[clamp(48px,12vw,180px)] mt-8 lg:mt-12">
              <span className="t-mono-caption text-[color:var(--text-tertiary)]">
                {years}
              </span>
              <span className="t-mono-label read-button transition-colors inline-flex items-baseline gap-[0.3em]">
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

          {/* RIGHT — foreground art (40%). Hidden on mobile per existing pattern. */}
          <div className="hidden lg:flex lg:basis-[40%] items-center justify-center">
            <div className="relative w-full h-full max-h-full">
              <Image
                src={artSrc}
                alt={artAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </article>
    </ViewTransitionLink>
  )
}

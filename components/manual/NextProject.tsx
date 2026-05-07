import { ViewTransitionLink } from "./ViewTransitionLink"

type Props = {
  href: string
  eyebrow: string
  title: string
}

/**
 * Closing nav block at the foot of every case study. Pattern:
 *
 *   ────────────────────────
 *   NEXT PROJECT
 *
 *   [Case study eyebrow]
 *   Big display title                                            READ →
 *   ────────────────────────
 *
 * Sits inside the manual `container`, just before `<ManualFooter />`.
 * Uses the same hover/focus rhythm as `<ProjectCard>` so the hand-off
 * back to the main work index reads as part of the same document.
 */
export function NextProject({ href, eyebrow, title }: Props) {
  return (
    <section
      data-section
      data-reveal
      aria-label="Next project"
      className="border-t border-[color:var(--rule)] mt-16 lg:mt-24"
    >
      <ViewTransitionLink
        href={href}
        className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent-trace)]"
      >
        <article className="container py-12 lg:py-20 flex flex-col gap-6 border-b border-[color:var(--rule)]">
          <p className="t-mono-label text-[color:var(--text-tertiary)]">
            NEXT PROJECT
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-3 max-w-[28ch]">
              <p className="t-mono-label group-hover:text-[color:var(--accent-trace)] transition-colors">
                {eyebrow}
              </p>
              <h2 className="t-display-l text-[color:var(--text-primary)] text-balance">
                {title}
              </h2>
            </div>

            <span className="t-mono-label read-button transition-colors inline-flex items-baseline gap-[0.4em] whitespace-nowrap">
              READ
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[4px]"
              >
                →
              </span>
            </span>
          </div>
        </article>
      </ViewTransitionLink>
    </section>
  )
}

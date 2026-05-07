import { ViewTransitionLink } from "./ViewTransitionLink"

type Props = {
  href: string
  /** Short project title (e.g. "Agents in Windows"), not the long display headline. */
  title: string
}

/**
 * Compact closing nav block at the foot of every case study. Pattern:
 *
 *   ────────────────────────────────────────
 *   NEXT PROJECT
 *   Agents in Windows                  READ →
 *   ────────────────────────────────────────
 *
 * Sits inside the manual `container`, just before `<ManualFooter />`. The
 * top hairline is the section divider; the footer below adds its own.
 */
export function NextProject({ href, title }: Props) {
  return (
    <section
      data-section
      data-reveal
      aria-label="Next project"
      className="border-t border-[color:var(--rule)]"
    >
      <ViewTransitionLink
        href={href}
        className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent-trace)]"
      >
        <div className="container py-6 lg:py-8">
          <p className="t-mono-label text-[color:var(--text-tertiary)] mb-2">
            NEXT PROJECT
          </p>
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="t-h2 text-[color:var(--text-primary)]">{title}</h2>
            <span className="t-mono-label read-button transition-colors inline-flex items-baseline gap-[0.4em] whitespace-nowrap shrink-0">
              READ
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-[4px]"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </ViewTransitionLink>
    </section>
  )
}

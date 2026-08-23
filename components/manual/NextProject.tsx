import { ViewTransitionLink } from "./ViewTransitionLink"

type Props = {
  href: string
  /** Short project title (e.g. "Agents in Windows"), not the long display headline. */
  title: string
}

/**
 * Typographic handoff at the foot of every case study. Whitespace separates
 * it from the story; the global footer supplies the closing document rule.
 */
export function NextProject({ href, title }: Props) {
  return (
    <section
      data-section
      data-reveal
      data-reveal-role="handoff"
      aria-label="Next project"
    >
      <ViewTransitionLink
        href={href}
        className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent-trace)]"
      >
        <div className="container py-16 lg:py-24">
          <p className="t-mono-label mb-4 text-[color:var(--text-secondary)]">
            NEXT PROJECT
          </p>
          <h2 className="t-h1 flex max-w-full items-baseline gap-[0.45em] text-[color:var(--text-primary)] underline decoration-transparent decoration-[1px] underline-offset-[0.22em] transition-[text-decoration-color] duration-[var(--duration-fast-ui)] ease-[var(--ease-out-quad)] group-hover:decoration-[color:var(--rule-strong)] group-focus-visible:decoration-[color:var(--rule-strong)]">
            <span className="min-w-0 [overflow-wrap:anywhere]">{title}</span>
            <span
              aria-hidden="true"
              className="inline-block shrink-0 text-[color:var(--text-secondary)] motion-safe:transition-transform motion-safe:duration-[var(--duration-fast-ui)] motion-safe:ease-[var(--ease-out-expo)] motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
            >
              →
            </span>
          </h2>
        </div>
      </ViewTransitionLink>
    </section>
  )
}

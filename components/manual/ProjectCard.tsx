import type { ReactNode } from "react"
import { ViewTransitionLink } from "./ViewTransitionLink"
import { cn } from "@/lib/utils"

type Props = {
  href: string
  eyebrow: string
  title: string
  years: string
  art?: ReactNode
  artClassName?: string
}

/**
 * Single homepage project card. Two-pane layout (text left, art right) with
 * shared hairline border that darkens on hover, and a "READ +" affordance
 * that nudges on hover. The right pane is a styling slot — pass `art` as
 * the inner ReactNode and `artClassName` for per-card background treatment
 * (e.g. a gradient).
 */
export function ProjectCard({ href, eyebrow, title, years, art, artClassName }: Props) {
  return (
    <ViewTransitionLink
      href={href}
      className="block group focus:outline focus:outline-1 focus:outline-[color:var(--accent-trace)]"
    >
      <article className="border border-[color:var(--rule)] group-hover:border-[color:var(--rule-strong)] transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
          <div className="p-6 lg:p-10 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)]">
            <div>
              <p className="t-mono-label">{eyebrow}</p>
              <h3 className="t-h2 mt-4 text-[color:var(--text-primary)]">
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
                  +
                </span>
              </span>
            </div>
          </div>

          <div
            className={cn(
              "relative aspect-[16/10] lg:aspect-auto overflow-hidden",
              artClassName ?? "bg-[color:var(--bg)]",
            )}
          >
            {art}
          </div>
        </div>
      </article>
    </ViewTransitionLink>
  )
}

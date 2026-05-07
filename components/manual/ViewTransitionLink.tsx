"use client"

import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"
import { transitionTo } from "@/lib/page-transition"

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode
  }

/**
 * Drop-in replacement for next/link that runs every same-origin
 * navigation through the sequential ink-overlay transition (see
 * `lib/page-transition.ts` and `<PageTransitionOverlay>`):
 *
 *   1. ink fades in (~280ms)
 *   2. route push + scrollTo(0,0) happen behind the solid ink
 *   3. ink fades out (~280ms) revealing the new page already at top
 *   4. the new page's own animations (HeroIntro, scroll-reveal) fire
 *
 * Falls through to vanilla next/link for modified clicks
 * (cmd/ctrl/shift, middle/right button) or when an upstream onClick
 * calls preventDefault.
 */
export function ViewTransitionLink({ onClick, href, children, ...rest }: Props) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    if (typeof window === "undefined") return

    e.preventDefault()
    const target = typeof href === "string" ? href : href.toString()

    void transitionTo(() => {
      // `scroll: false` keeps Next from re-scrolling after the route
      // commits — the overlay coordinator handles scrollTo(0,0)
      // explicitly during the holding phase.
      router.push(target, { scroll: false })
    })
  }

  return (
    <Link href={href} {...rest} onClick={handleClick}>
      {children}
    </Link>
  )
}

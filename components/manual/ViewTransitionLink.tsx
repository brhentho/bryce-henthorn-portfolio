"use client"

import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode
  }

/**
 * Drop-in replacement for next/link that wraps client-side navigation in
 * `document.startViewTransition` so the @view-transition CSS in globals.css
 * (or recall.css) actually fires for App Router pushState navigations.
 *
 * Scroll handling: we set scrollTop=0 *before* startViewTransition so the
 * OLD snapshot is captured at the top of the page (no scroll motion is
 * visible because everything happens in one synchronous task before the
 * browser paints). We also pass `{ scroll: false }` to router.push so
 * Next's default scroll-to-top doesn't fire *after* the wipe and produce
 * a visible jump.
 *
 * Falls through to vanilla next/link behavior for browsers without the API,
 * for modified clicks (cmd/ctrl/shift, middle/right button), or when the
 * onClick handler calls preventDefault.
 */
export function ViewTransitionLink({ onClick, href, children, ...rest }: Props) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    if (typeof document === "undefined") return
    const startVT = (document as Document & {
      startViewTransition?: (cb: () => void) => unknown
    }).startViewTransition
    if (typeof startVT !== "function") return

    e.preventDefault()
    const target = typeof href === "string" ? href : href.toString()

    // Reset scroll synchronously before any paint. The OLD VT snapshot
    // is captured at scrollTop=0 — the user never sees the scroll jump
    // because the browser hasn't repainted yet between this line and
    // startViewTransition (both run in the same task).
    const scrollNode = document.scrollingElement || document.documentElement
    scrollNode.scrollTop = 0

    startVT.call(document, () => {
      // `scroll: false` keeps Next from re-scrolling after the route
      // commits, which would otherwise produce a visible post-wipe jump.
      router.push(target, { scroll: false })
    })
  }

  return (
    <Link href={href} {...rest} onClick={handleClick}>
      {children}
    </Link>
  )
}

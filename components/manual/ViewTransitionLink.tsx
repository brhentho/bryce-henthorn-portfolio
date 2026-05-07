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
 * Before the transition starts we smooth-scroll the *current* page back to
 * the top — this stops the post-transition "scroll-to-top jump" the
 * browser does on the new page from being visible. The user sees one
 * coherent motion: scroll up, then the printer-feed wipe to the new page.
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
    const startY = window.scrollY
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const startTransition = () => {
      startVT.call(document, () => {
        router.push(target)
      })
    }

    // If we're already near the top, or motion is reduced, just transition.
    if (startY < 80 || reduced) {
      startTransition()
      return
    }

    // Smooth-scroll to top, then trigger the transition. Duration scales
    // with distance (capped at 360ms) so a long page doesn't feel slow.
    const duration = Math.min(360, 180 + startY * 0.04)
    const startTime = performance.now()
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      window.scrollTo(0, startY * (1 - easeOutCubic(t)))
      if (t < 1) requestAnimationFrame(tick)
      else startTransition()
    }
    requestAnimationFrame(tick)
  }

  return (
    <Link href={href} {...rest} onClick={handleClick}>
      {children}
    </Link>
  )
}

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
 * The browser captures the OLD viewport snapshot before the callback runs
 * (so the wipe still starts from wherever the user was scrolled). Inside
 * the callback we route AND set scroll-top to 0 — that way both the live
 * DOM and the captured NEW snapshot are at the top of the new page, and
 * no post-transition "scroll-to-top jump" is visible to the user.
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

    startVT.call(document, () => {
      router.push(target)
      // Scroll-top here — happens after the OLD snapshot is captured but
      // before the NEW snapshot, so the user never sees a post-wipe jump.
      window.scrollTo(0, 0)
    })
  }

  return (
    <Link href={href} {...rest} onClick={handleClick}>
      {children}
    </Link>
  )
}

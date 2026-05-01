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
    startVT.call(document, () => {
      router.push(typeof href === "string" ? href : href.toString())
    })
  }

  return (
    <Link href={href} {...rest} onClick={handleClick}>
      {children}
    </Link>
  )
}

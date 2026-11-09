"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { forwardRef, type ComponentProps, type MouseEvent } from "react"
import { transitionPortfolioTo } from "@/lib/page-transition"

export const PortfolioLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(
  function PortfolioLink({ href, onClick, ...props }, ref) {
    const router = useRouter()
    function activate(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event)
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const anchor = event.currentTarget
      if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return
      const destination = new URL(anchor.href)
      if (destination.origin !== location.origin || destination.pathname === location.pathname) return
      event.preventDefault()
      void transitionPortfolioTo(
        () => router.push(`${destination.pathname}${destination.search}${destination.hash}`, { scroll: false }),
        destination,
        event.detail !== 0,
      )
    }
    return <Link {...props} href={href} ref={ref} onClick={activate} />
  },
)

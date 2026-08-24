"use client"

import { useLayoutEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { notifyRouteMounted } from "@/lib/page-transition"

type Props = {
  children: ReactNode
}

/**
 * Signals when pathname-keyed route content has committed. The key forces a
 * fresh DOM boundary for each route without changing the page's own layout.
 */
export function RouteTransitionBoundary({ children }: Props) {
  const pathname = usePathname()

  useLayoutEffect(() => {
    notifyRouteMounted(pathname)
  }, [pathname])

  return (
    <div key={pathname} className="route-content" data-route-pathname={pathname}>
      {children}
    </div>
  )
}

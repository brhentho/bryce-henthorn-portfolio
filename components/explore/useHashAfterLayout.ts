"use client"

import { useEffect, useRef } from "react"

/**
 * The server renders the spatial layout; the client may then swap to a static one
 * (reduced motion, narrow screens). The browser's initial hash scroll targeted the
 * server layout, so re-apply the hash once when the client layout first differs.
 */
export function useHashAfterLayout(layoutKey: string, serverKey: string) {
  const done = useRef(false)
  useEffect(() => {
    if (done.current || layoutKey === serverKey) return
    done.current = true
    const hash = decodeURIComponent(window.location.hash.slice(1))
    if (!hash) return
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = document.getElementById(hash)
        if (!el) return
        const html = document.documentElement
        const prev = html.style.scrollBehavior
        html.style.scrollBehavior = "auto"
        el.scrollIntoView({ block: "start" })
        html.style.scrollBehavior = prev
      }),
    )
    return () => cancelAnimationFrame(raf)
  }, [layoutKey, serverKey])
}

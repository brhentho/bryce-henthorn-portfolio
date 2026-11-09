"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useLayoutEffect, type ComponentProps, type MouseEvent } from "react"
import { useEnhanced, treatmentHref } from "./Treatment"

let pendingResolve: (() => void) | null = null

function settlePending() {
  pendingResolve?.()
  pendingResolve = null
}

/** Mount once per explore route; resolves the in-flight view transition after the new route commits. */
export function ContinuityListener() {
  const pathname = usePathname()
  useLayoutEffect(() => {
    settlePending()
  }, [pathname])
  return null
}

type DocWithVT = Document & {
  startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> }
}

/**
 * Same-document view transition around a client navigation. Elements carrying a
 * matching `view-transition-name` on both routes morph between them. Falls back
 * to plain navigation when unsupported, modified-clicked, or under reduced motion.
 */
export function ContinuityLink({ href, onClick, pointerOnly = false, ...rest }: ComponentProps<typeof Link> & {
  href: string
  /** Skip the morph for keyboard activation (click with `detail === 0`) so navigation is immediate. */
  pointerOnly?: boolean
}) {
  const router = useRouter()
  const resolvedHref = treatmentHref(href, useEnhanced())

  function handle(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    if (pointerOnly && event.detail === 0) return
    const doc = document as DocWithVT
    if (!doc.startViewTransition) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    event.preventDefault()
    const html = document.documentElement
    if (pointerOnly) html.dataset.xrHandoff = ""
    const transition = doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          pendingResolve = resolve
          window.setTimeout(settlePending, 1200)
          router.push(resolvedHref)
        }),
    )
    if (pointerOnly) {
      void transition.finished.then(
        () => { delete html.dataset.xrHandoff },
        error => {
          delete html.dataset.xrHandoff
          if (!(error instanceof DOMException && error.name === "AbortError")) console.warn("Artwork route transition ended early.", error)
        },
      )
    }
  }

  return <Link href={resolvedHref} onClick={handle} {...rest} />
}

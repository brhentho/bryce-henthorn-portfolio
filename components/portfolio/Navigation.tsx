"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLayoutEffect, useRef } from "react"
import { PERSON } from "@/lib/explore/content"
import { ContinuityListener } from "../explore/ContinuityLink"

let lastPortfolioPath: string | null = null

export function PortfolioHeader({ route = "/" }: { route?: string }) {
  const pathname = usePathname()
  const header = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    // An outgoing header can observe the new pathname before its replacement commits.
    if (pathname !== route) return
    if (lastPortfolioPath && lastPortfolioPath !== route) {
      const heading = header.current?.closest(".fn-environment")?.querySelector<HTMLElement>("main h1")
      if (heading) {
        const hadTabIndex = heading.hasAttribute("tabindex")
        if (!hadTabIndex) heading.tabIndex = -1
        heading.focus({ preventScroll: true })
        if (!hadTabIndex) heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true })
      }
    }
    lastPortfolioPath = route
  }, [pathname, route])
  return <>
    <ContinuityListener />
    <header ref={header} className="fn-nav">
      <Link className="fn-brand" href="/">{PERSON.name}<span>{PERSON.role}</span></Link>
      <nav aria-label="Portfolio"><Link href="/#work">Work</Link><Link href="/about">About</Link><a href="#contact">Contact</a></nav>
    </header>
  </>
}

export function PortfolioFooter() {
  return <footer className="fn-contact fn-chapter" id="contact">
    <p className="fn-label">A conversation starts here</p>
    <a className="fn-contact-title" href={`mailto:${PERSON.email}`}>Let’s talk. <span aria-hidden="true">↗</span></a>
    <div className="fn-footer-line"><span>{PERSON.name} / {PERSON.location}</span><Link href="/#work">Back to the work</Link></div>
  </footer>
}

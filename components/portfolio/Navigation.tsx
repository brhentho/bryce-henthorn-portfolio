"use client"

import { usePathname } from "next/navigation"
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import { PERSON } from "@/lib/explore/content"
import { ContinuityListener } from "../explore/ContinuityLink"
import { PortfolioLink } from "./PortfolioLink"
import { PortfolioAction } from "./PortfolioAction"

export function PortfolioHeader({ route = "/" }: { route?: string }) {
  const pathname = usePathname()
  const nav = useRef<HTMLElement>(null)
  const filterId = `nav-goo-${useId().replace(/:/g, "")}`
  const [contact, setContact] = useState(false)
  const [notice, setNotice] = useState("")
  const current = contact ? "contact" : pathname === "/about" ? "about" : "work"
  const [hover, setHover] = useState<string | null>(null)
  const [focus, setFocus] = useState<string | null>(null)
  const selected = focus ?? hover ?? current
  useLayoutEffect(() => {
    const element = nav.current
    if (!element) return
    const measure = () => {
      const link = element.querySelector<HTMLElement>(`[data-nav-item="${selected}"]`)
      if (!link) return
      const box = link.getBoundingClientRect(), parent = element.getBoundingClientRect()
      element.style.setProperty("--nav-x", `${box.left - parent.left}px`)
      element.style.setProperty("--nav-y", `${box.top - parent.top + 2}px`)
      element.style.setProperty("--nav-width", `${box.width / 60}`)
      element.style.setProperty("--nav-height", `${box.height - 4}px`)
      element.dataset.ready = "true"
    }
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    for (const child of element.querySelectorAll("a")) resize.observe(child)
    return () => resize.disconnect()
  }, [selected])
  useEffect(() => {
    const footer = document.getElementById("contact")
    const observer = new IntersectionObserver(([entry]) => setContact(entry.isIntersecting), { threshold: .2 })
    if (footer) observer.observe(footer)
    const status = (event: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === "string") setNotice(event.detail)
    }
    window.addEventListener("portfolio-navigation-status", status)
    return () => { observer.disconnect(); window.removeEventListener("portfolio-navigation-status", status) }
  }, [])
  return <>
    <ContinuityListener />
    <header className="fn-nav" data-portfolio-route={route}>
      <PortfolioLink className="fn-brand" href="/">{PERSON.name}</PortfolioLink>
      <nav ref={nav} className="pf-navigation" aria-label="Portfolio" data-keyboard={focus ? "" : undefined}
        onPointerLeave={() => setHover(null)} onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocus(null)
        }}>
        <svg width="0" height="0" aria-hidden="true" className="pf-nav-filter"><defs><filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
        </filter></defs></svg>
        <span className="pf-nav-fluid" aria-hidden="true" style={{ filter: `url(#${filterId})` }}>
          <span className="pf-nav-blob pf-nav-tail" /><span className="pf-nav-blob" />
        </span>
        {([{ id: "work", href: "/#work", label: "Work" }, { id: "about", href: "/about", label: "About" },
          { id: "contact", href: "#contact", label: "Contact" }] as const).map(item =>
          <PortfolioLink key={item.id} href={item.href} data-nav-item={item.id}
            aria-current={current === item.id ? item.id === "contact" ? "location" : "page" : undefined}
            onPointerEnter={event => { if (event.pointerType !== "touch") { setFocus(null); setHover(item.id) } }}
            onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setFocus(item.id) }}>
            {item.label}
          </PortfolioLink>)}
      </nav>
      {notice && <p className="pf-route-status" role="status">{notice}</p>}
    </header>
  </>
}

export function PortfolioFooter() {
  return <footer className="fn-contact fn-chapter" id="contact">
    <p className="fn-label">A conversation starts here</p>
    <a className="fn-contact-title" href={`mailto:${PERSON.email}`}>Let’s talk. <span aria-hidden="true">↗</span></a>
    <div className="fn-footer-line"><span>{PERSON.name} / {PERSON.location}</span><PortfolioAction variant="quiet" href="/#work">Back to the work</PortfolioAction></div>
  </footer>
}

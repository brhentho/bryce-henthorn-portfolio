"use client"

import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { PERSON } from "@/lib/explore/content"
import { ContinuityListener } from "../explore/ContinuityLink"
import { PortfolioLink } from "./PortfolioLink"
import { GooeyNavigation } from "./GooeyNavigation"

export function PortfolioHeader({ route = "/" }: { route?: string }) {
  const pathname = usePathname()
  const header = useRef<HTMLElement>(null)
  const [contact, setContact] = useState(false)
  const [notice, setNotice] = useState("")
  const current = contact ? "contact" : pathname === "/about" ? "about" : "work"
  useLayoutEffect(() => {
    const element = header.current
    const environment = element?.closest<HTMLElement>(".fn-environment")
    if (!element || !environment) return
    const measure = () => environment.style.setProperty("--pf-header-height", `${element.getBoundingClientRect().height}px`)
    const scroll = () => element.toggleAttribute("data-scrolled", window.scrollY > 0)
    const pointer = () => element.setAttribute("data-pointer-scroll", "")
    const keyboard = () => element.removeAttribute("data-pointer-scroll")
    const restore = () => { keyboard(); measure(); scroll() }
    restore()
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    window.addEventListener("scroll", scroll, { passive: true })
    window.addEventListener("pageshow", restore)
    window.addEventListener("pointerdown", pointer, { passive: true })
    window.addEventListener("wheel", pointer, { passive: true })
    window.addEventListener("keydown", keyboard)
    return () => {
      resize.disconnect()
      environment.style.removeProperty("--pf-header-height")
      window.removeEventListener("scroll", scroll)
      window.removeEventListener("pageshow", restore)
      window.removeEventListener("pointerdown", pointer)
      window.removeEventListener("wheel", pointer)
      window.removeEventListener("keydown", keyboard)
    }
  }, [])
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
    <header ref={header} className="fn-nav pf-header" data-portfolio-route={route}>
      <PortfolioLink className="fn-brand" href="/">{PERSON.name}</PortfolioLink>
      <GooeyNavigation className="pf-navigation" label="Portfolio" current={current}>
        {([{ id: "work", href: "/#work", label: "Work" }, { id: "about", href: "/about", label: "About" },
          { id: "contact", href: "#contact", label: "Contact" }] as const).map(item =>
          <PortfolioLink key={item.id} href={item.href} data-nav-item={item.id}
            aria-current={current === item.id ? item.id === "contact" ? "location" : "page" : undefined}>
            {item.label}
          </PortfolioLink>)}
      </GooeyNavigation>
      {notice && <p className="pf-route-status" role="status">{notice}</p>}
    </header>
  </>
}

export function PortfolioFooter() {
  return <footer className="pf-footer" id="contact">
    <div className="fn-footer-line">
      <span>{PERSON.name} / {PERSON.location}</span>
      <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
    </div>
  </footer>
}

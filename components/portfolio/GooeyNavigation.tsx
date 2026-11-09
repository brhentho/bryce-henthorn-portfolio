"use client"

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react"

export function GooeyNavigation({ current, label, className = "", children }: {
  current: string; label: string; className?: string; children: ReactNode
}) {
  const nav = useRef<HTMLElement>(null)
  const filterId = `nav-goo-${useId().replace(/:/g, "")}`
  const [hover, setHover] = useState<string | null>(null)
  const [focus, setFocus] = useState<string | null>(null)
  const [keyboard, setKeyboard] = useState(false)
  const selected = focus ?? hover ?? current

  useLayoutEffect(() => {
    const element = nav.current
    if (!element) return
    const measure = () => {
      const link = [...element.querySelectorAll<HTMLElement>("[data-nav-item]")].find(link => link.dataset.navItem === selected)
      if (!link) { delete element.dataset.ready; return }
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

  useLayoutEffect(() => {
    const key = () => setKeyboard(true)
    const pointer = () => setKeyboard(false)
    window.addEventListener("keydown", key)
    window.addEventListener("pointerdown", pointer, { passive: true })
    window.addEventListener("wheel", pointer, { passive: true })
    return () => {
      window.removeEventListener("keydown", key)
      window.removeEventListener("pointerdown", pointer)
      window.removeEventListener("wheel", pointer)
    }
  }, [])

  return <nav ref={nav} className={`pf-gooey-nav ${className}`} aria-label={label} data-keyboard={keyboard || focus ? "" : undefined}
    onPointerOver={event => {
      const link = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-nav-item]") : null
      if (event.pointerType !== "touch" && link) { setKeyboard(false); setFocus(null); setHover(link.dataset.navItem ?? null) }
    }}
    onPointerLeave={() => setHover(null)}
    onFocus={event => {
      const link = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-nav-item]") : null
      if (link?.matches(":focus-visible")) setFocus(link.dataset.navItem ?? null)
    }}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocus(null)
    }}>
    <svg width="0" height="0" aria-hidden="true" className="pf-nav-filter"><defs><filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
      <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
    </filter></defs></svg>
    <span className="pf-nav-fluid" aria-hidden="true" style={{ filter: `url(#${filterId})` }}>
      <span className="pf-nav-blob pf-nav-tail" /><span className="pf-nav-blob" />
    </span>
    {children}
  </nav>
}

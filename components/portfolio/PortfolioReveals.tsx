"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function PortfolioReveals() {
  const marker = useRef<HTMLSpanElement>(null)
  const pathname = usePathname()
  useEffect(() => {
    const scope = marker.current?.closest(".portfolio")
    if (!scope) return
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    const root = getComputedStyle(document.documentElement)
    const duration = parseFloat(root.getPropertyValue("--duration-enter"))
    const stagger = parseFloat(root.getPropertyValue("--stagger-word"))
    const animations = new Map<HTMLElement, Animation>()
    const extra = ".pf-working-examples > article, .pf-experience > div, .pf-about-section > h2, .pf-about-section > div:first-child, .pf-about-philosophy > p, .pf-prior-work, .pf-state-lexicon > li, .pf-step-strip > li, .pf-recovery-pair > article, .pf-principles > div, .pf-pull-line, .pf-outcome-note, .pf-state-figure"
    const candidates = new Set(scope.querySelectorAll<HTMLElement>(`[data-pf-reveal], ${extra}`))
    const elements = Array.from(candidates).filter(element => {
      for (let parent = element.parentElement; parent && parent !== scope; parent = parent.parentElement) {
        if (candidates.has(parent)) return false
      }
      return true
    })
    function settle(element: HTMLElement) {
      animations.get(element)?.cancel()
      animations.delete(element)
      element.dataset.pfSettled = "true"
      delete element.dataset.pfPending
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue
        const element = entry.target
        observer.unobserve(element)
        if (!element.hasAttribute("data-pf-pending")) continue
        const rect = element.getBoundingClientRect()
        if (reduced.matches || rect.top < innerHeight * .15 || element.contains(document.activeElement)) {
          settle(element)
          continue
        }
        delete element.dataset.pfPending
        const evidence = element.dataset.pfReveal === "evidence"
        const distance = root.getPropertyValue(evidence ? "--pf-evidence-distance" : "--pf-reveal-distance").trim()
        const siblings = Array.from(element.parentElement?.children ?? [])
        const index = Math.max(0, siblings.filter(sibling => sibling instanceof HTMLElement && elements.includes(sibling)).indexOf(element)) % 4
        const animation = element.animate([
          { transform: `translateY(${distance}) scale(${evidence ? .97 : 1})` },
          { transform: "translateY(0) scale(1)" },
        ], { duration, delay: index * stagger, easing: root.getPropertyValue("--ease-out-expo").trim(), fill: "backwards" })
        animations.set(element, animation)
        void animation.finished.then(() => settle(element), error => {
          if (!(error instanceof DOMException && error.name === "AbortError")) console.warn("Content reveal interrupted.", error)
        })
      }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0 })
    for (const element of elements) {
      if (!reduced.matches && element.getBoundingClientRect().top >= innerHeight * .94) {
        element.dataset.pfPending = "true"
        observer.observe(element)
      }
    }
    const settleAll = () => {
      if (!reduced.matches) return
      observer.disconnect()
      elements.forEach(settle)
    }
    const settleTarget = (event: Event) => {
      if (!(event.target instanceof Node)) return
      for (const element of elements) if (element.contains(event.target)) settle(element)
    }
    const settleHash = () => {
      if (!location.hash) return
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target) for (const element of elements) if (target.contains(element) || element.contains(target)) settle(element)
    }
    settleHash()
    scope.addEventListener("focusin", settleTarget)
    scope.addEventListener("pointerdown", settleTarget)
    window.addEventListener("hashchange", settleHash)
    reduced.addEventListener("change", settleAll)
    return () => {
      observer.disconnect()
      elements.forEach(settle)
      scope.removeEventListener("focusin", settleTarget)
      scope.removeEventListener("pointerdown", settleTarget)
      window.removeEventListener("hashchange", settleHash)
      reduced.removeEventListener("change", settleAll)
    }
  }, [pathname])
  return <span hidden ref={marker} />
}

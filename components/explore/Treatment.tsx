"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { createContext, useContext, useEffect, type ComponentProps, type ReactNode } from "react"

const TreatmentContext = createContext(false)
const HeroContext = createContext<"orb" | "ascii">("ascii")

export function TreatmentProvider({ children }: { children: ReactNode }) {
  const search = useSearchParams()
  const pathname = usePathname()
  const enhanced = /^\/explore\/direction-[def](\/|$)/.test(pathname) || search.get("treatment") === "enhanced"
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".xp")
    if (!root) return
    const keyboard = () => { root.dataset.keyboard = "" }
    const pointer = () => { delete root.dataset.keyboard }
    root.addEventListener("keydown", keyboard)
    root.addEventListener("pointerdown", pointer)
    root.addEventListener("pointermove", pointer)
    return () => {
      root.removeEventListener("keydown", keyboard)
      root.removeEventListener("pointerdown", pointer)
      root.removeEventListener("pointermove", pointer)
      delete root.dataset.keyboard
    }
  }, [])
  return <TreatmentContext.Provider value={enhanced}><HeroContext.Provider value={search.get("hero") === "orb" ? "orb" : "ascii"}>{children}</HeroContext.Provider></TreatmentContext.Provider>
}

export function useHeroChoice() { return useContext(HeroContext) }

export function useEnhanced() {
  return useContext(TreatmentContext)
}

export function treatmentHref(href: string, enhanced: boolean) {
  if (!/^\/explore\/direction-[abc](\/|[?#]|$)/.test(href)) return href
  const url = new URL(href, "https://explore.local")
  if (enhanced) url.searchParams.set("treatment", "enhanced")
  else url.searchParams.delete("treatment")
  return `${url.pathname}${url.search}${url.hash}`
}

export default function TreatmentLink({ href, ...props }: ComponentProps<typeof Link>) {
  const enhanced = useEnhanced()
  return <Link href={typeof href === "string" ? treatmentHref(href, enhanced) : href} {...props} />
}

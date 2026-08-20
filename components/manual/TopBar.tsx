"use client"

import { useEffect, useId, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { ViewTransitionLink } from "./ViewTransitionLink"
import { RegistrationMark } from "./RegistrationMark"
import { cn } from "@/lib/utils"

const NAV_ITEMS: { href: string; index: string; label: string }[] = [
  { href: "/",                    index: "00", label: "WORK" },
  { href: "/agents-in-windows",   index: "01", label: "AGENTS" },
  { href: "/recall",              index: "02", label: "RECALL" },
  { href: "/teams-for-education", index: "03", label: "TEAMS" },
  { href: "/about",               index: "04", label: "ABOUT" },
]

function isCurrent(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(href + "/")
}

/**
 * Site header — the "index rail" (design 1B). Crosshair + identifier on the
 * left, a numbered index of the five pages on the right. The active entry's
 * number is the only --accent-trace element in the strip.
 *
 * The former § NN / TT section counter (and its [data-section] observer) was
 * retired in the 2026 revision along with the in-page § eyebrows.
 */
export function TopBar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const menuId = useId()

  // Close the drawer on route change so the new page is unobstructed.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll + close on Escape while drawer is open. Restore focus
  // to the trigger so keyboard users land back where they were.
  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 bg-[#06060A]/80 backdrop-blur-md border-b border-[color:var(--rule)]">
      <div className="container py-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <ViewTransitionLink
          href="/"
          aria-label="Bryce Henthorn, home"
          className="t-mono-label inline-flex items-center gap-2.5 whitespace-nowrap text-[color:var(--text-primary)] transition-colors duration-200 hover:text-[color:var(--text-secondary)]"
        >
          <RegistrationMark className="text-[color:var(--accent-trace)]" />
          BRYCE HENTHORN
        </ViewTransitionLink>

        {/* Desktop / tablet index rail — visible at md and up. */}
        <nav
          aria-label="Site"
          className="hidden md:flex flex-wrap items-baseline gap-x-7 gap-y-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isCurrent(pathname, item.href)
            return (
              <ViewTransitionLink
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "t-mono-label transition-colors duration-200",
                  isActive
                    ? "text-[color:var(--text-primary)]"
                    : "text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={
                    isActive
                      ? "text-[color:var(--accent-trace)]"
                      : "text-[color:var(--rule-strong)]"
                  }
                >
                  {item.index}
                </span>
                &nbsp;{item.label}
              </ViewTransitionLink>
            )
          })}
        </nav>

        {/* Mobile menu trigger — three thin rules in JetBrains Mono.
            Hidden at md and up. */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden t-mono-label text-[color:var(--text-primary)] px-2 py-1 -mr-2 cursor-pointer transition-colors duration-200 hover:text-[color:var(--accent-trace)]"
        >
          <span aria-hidden="true" className="manual-mobile-menu-icon">
            <span />
            <span />
            <span />
          </span>
          <span className="sr-only">{menuOpen ? "Close menu" : "Menu"}</span>
        </button>
      </div>

      {/* Mobile drawer — full-viewport panel below the sticky bar.
          Same JetBrains Mono small-caps treatment as desktop nav so it reads
          as part of the same system, not a generic mobile menu. */}
      <div
        id={menuId}
        data-state={menuOpen ? "open" : "closed"}
        aria-hidden={!menuOpen}
        className={cn(
          "manual-mobile-drawer md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <nav
          aria-label="Site (mobile)"
          className="container pt-10 pb-12 flex flex-col gap-1"
          // Keep tab order off the drawer when closed.
          inert={!menuOpen}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isCurrent(pathname, item.href)
            return (
              <ViewTransitionLink
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "t-mono-label py-3 border-b border-[color:var(--rule)] transition-colors duration-200",
                  isActive
                    ? "text-[color:var(--text-primary)]"
                    : "text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={
                    isActive
                      ? "text-[color:var(--accent-trace)]"
                      : "text-[color:var(--rule-strong)]"
                  }
                >
                  {item.index}
                </span>
                &nbsp;{item.label}
              </ViewTransitionLink>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

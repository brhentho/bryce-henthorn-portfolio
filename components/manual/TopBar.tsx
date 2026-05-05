"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ViewTransitionLink } from "./ViewTransitionLink"
import { cn } from "@/lib/utils"

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/",                      label: "WORK" },
  { href: "/recall",                label: "RECALL" },
  { href: "/agents-in-windows",     label: "AGENTS" },
  { href: "/teams-for-education",   label: "TEAMS" },
  { href: "/about",                 label: "ABOUT" },
]

/**
 * Combined site header: identifier (left) · nav (center) · inline § NN / TT (right).
 * Replaces the former RevisionHeader + ManualNav + fixed ProgressIndicator.
 * Section counter tracks `[data-section]` elements via IntersectionObserver, same
 * logic as the retired ProgressIndicator. Active nav underline is the strip's
 * only --accent-trace element.
 */
export function TopBar() {
  const pathname = usePathname()
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    )
    setTotal(sections.length)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          )
        if (visible[0]) {
          const idx = sections.indexOf(visible[0].target as HTMLElement)
          if (idx >= 0) setCurrent(idx + 1)
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [pathname])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <header className="border-b border-[color:var(--rule)]">
      <div className="container py-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <ViewTransitionLink
          href="/"
          aria-label="Bryce Henthorn — home"
          className="t-mono-label text-[color:var(--text-primary)] whitespace-nowrap transition-colors duration-200 hover:text-[color:var(--text-secondary)]"
        >
          BRYCE HENTHORN
        </ViewTransitionLink>

        <nav
          aria-label="Site"
          className="flex flex-wrap items-baseline gap-x-1 gap-y-1"
        >
          {NAV_ITEMS.map((item, i) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <span key={item.href} className="inline-flex items-baseline">
                <ViewTransitionLink
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "t-mono-label px-2 py-1 transition-colors duration-200",
                    isActive
                      ? "text-[color:var(--text-primary)] underline underline-offset-[0.25em] decoration-[color:var(--accent-trace)] decoration-[1.5px]"
                      : "text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)]",
                  )}
                >
                  {item.label}
                </ViewTransitionLink>
                {i < NAV_ITEMS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="t-mono-caption text-[color:var(--text-tertiary)] px-1"
                  >
                    /
                  </span>
                )}
              </span>
            )
          })}
        </nav>

        <span
          aria-hidden="true"
          className="hidden lg:inline-block t-mono-caption text-[color:var(--text-tertiary)] whitespace-nowrap select-none"
        >
          {total > 0 ? (
            <>
              §{" "}
              <span
                key={current}
                className="manual-counter-digit text-[color:var(--text-primary)]"
              >
                {pad(current)}
              </span>{" "}
              / {pad(total)}
            </>
          ) : (
            <span className="opacity-0">§ 00 / 00</span>
          )}
        </span>
      </div>
    </header>
  )
}

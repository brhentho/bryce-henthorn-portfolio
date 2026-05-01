"use client"

import { usePathname } from "next/navigation"
import { ViewTransitionLink } from "./ViewTransitionLink"
import { cn } from "@/lib/utils"

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/",                      label: "HOME" },
  { href: "/recall",                label: "RECALL" },
  { href: "/agents-in-windows",     label: "AGENTS" },
  { href: "/teams-for-education",   label: "TEAMS" },
  { href: "/about",                 label: "ABOUT" },
]

/**
 * Site-wide nav strip rendered immediately under RevisionHeader. Mono small
 * caps; the active page is underlined in --accent-trace (state-indicator rule).
 * Uses ViewTransitionLink so navigation animates via the @view-transition CSS
 * in recall.css.
 */
export function ManualNav() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Site"
      className="border-b border-[color:var(--rule)]"
    >
      <div className="container py-2 flex flex-wrap items-baseline gap-x-1 gap-y-1">
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
      </div>
    </nav>
  )
}

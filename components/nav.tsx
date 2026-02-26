"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/container"

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { label: "Work", href: "/#projects" },
    { label: "About", href: "/about" },
{ label: "Contact", href: "mailto:bhenthorn2757@gmail.com" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-200",
        scrolled
          ? "backdrop-blur-md bg-background/80 border-b border-border"
          : "bg-background"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <Container className="flex items-center justify-between h-14 md:h-16">
        {/* Left: Logo */}
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Bryce Henthorn
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive =
              link.href === "/about"
                ? pathname === "/about"
                : link.href === "/#projects"
                  ? pathname === "/"
                  : false

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative text-sm font-sans font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent py-1",
                  isActive
                    ? "text-foreground"
                    : "text-foreground-tertiary hover:text-foreground",
                  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
                )}
                {...((link.href.startsWith("mailto:") || link.external) && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {link.label}
              </Link>
            )
          })}

        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 -mr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={cn(
              "block w-5 h-px bg-foreground transition-all duration-200",
              mobileOpen && "translate-y-[3px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-foreground mt-1.5 transition-all duration-200",
              mobileOpen && "-translate-y-[3px] -rotate-45"
            )}
          />
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <Container className="py-6 flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-sans font-medium text-foreground-secondary hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent py-1"
                {...((link.href.startsWith("mailto:") || link.external) && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {link.label}
              </Link>
            ))}
            <span className="text-xs font-sans text-foreground-tertiary mt-2">
              Seattle, WA
            </span>
          </Container>
        </div>
      )}
    </nav>
  )
}

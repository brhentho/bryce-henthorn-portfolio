import Link from "next/link"
import { Container } from "@/components/container"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-heading font-semibold text-foreground-tertiary">
              Bryce Henthorn
            </span>
            <span className="text-xs font-sans text-foreground-tertiary">
              Seattle, WA
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="mailto:bhenthorn2757@gmail.com"
              className="text-sm font-sans text-foreground-tertiary hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              bhenthorn2757@gmail.com
            </Link>
            <Link
              href="/about"
              className="text-sm font-sans text-foreground-tertiary hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              About
            </Link>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-sans text-foreground-tertiary hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Resume
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

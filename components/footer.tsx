import Link from "next/link"
import { Container } from "@/components/container"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] tracking-[0.15em] text-foreground-tertiary uppercase">
              Bryce Henthorn
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-foreground-tertiary">
              Seattle, WA
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="mailto:bhenthorn2757@gmail.com"
              className="font-mono text-[11px] tracking-[0.1em] text-foreground-tertiary hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              bhenthorn2757@gmail.com
            </Link>
            <Link
              href="/about"
              className="font-mono text-[11px] tracking-[0.1em] text-foreground-tertiary hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              About
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

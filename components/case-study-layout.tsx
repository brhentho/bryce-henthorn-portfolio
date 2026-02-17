"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { SectionHeader } from "@/components/section-header"
import { OverviewSpecPanel } from "@/components/overview-spec-panel"
import { CaseStudyNav } from "@/components/case-study-nav"
import { AnimateIn } from "@/components/animate-in"
import { PageTransition } from "@/components/page-transition"

interface SpecItem {
  label: string
  value: string
}

interface NavItem {
  id: string
  label: string
}

interface CaseStudyLayoutProps {
  title: string
  subtitle: string
  specs: SpecItem[]
  navItems: NavItem[]
  children: React.ReactNode
}

export function CaseStudyLayout({
  title,
  subtitle,
  specs,
  navItems,
  children,
}: CaseStudyLayoutProps) {
  return (
    <PageTransition>
      <Nav />
      <main className="pt-14 md:pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid-animated pointer-events-none" aria-hidden="true" />
          <Container className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-16">
            <AnimateIn>
              <a
                href="/"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] text-foreground-tertiary hover:text-foreground transition-colors duration-200 uppercase mb-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 8H3M7 4L3 8l4 4" />
                </svg>
                Back to Work
              </a>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight text-foreground max-w-2xl text-balance">
                {title}
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="mt-4 text-base md:text-lg text-foreground-secondary leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </AnimateIn>
          </Container>
        </section>

        {/* Overview */}
        <Container>
          <AnimateIn delay={0.2}>
            <OverviewSpecPanel specs={specs} className="mb-16 md:mb-20" />
          </AnimateIn>
        </Container>

        {/* Content with sticky nav */}
        <Container>
          <div className="flex gap-16">
            <CaseStudyNav items={navItems} />
            <div className="flex-1 min-w-0 pb-16 md:pb-24">
              {children}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </PageTransition>
  )
}

/* Reusable sub-components for case study body */
export function CaseStudySection({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <AnimateIn>
      <section id={id} className="mb-16 md:mb-20 scroll-mt-24">
        <SectionHeader label={label} />
        {children}
      </section>
    </AnimateIn>
  )
}

export function CaseStudyParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm md:text-base text-foreground-secondary leading-relaxed mb-4 max-w-2xl">
      {children}
    </p>
  )
}

export function CaseStudyHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg md:text-xl font-medium text-foreground mb-4 mt-8 first:mt-0">
      {children}
    </h2>
  )
}

export function CaseStudyList({ items }: { items: string[] }) {
  return (
    <ul className="mb-6 flex flex-col gap-2.5 max-w-2xl">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-foreground-secondary leading-relaxed">
          <span className="mt-2 w-1 h-1 rounded-full bg-accent opacity-60 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function CaseStudyCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 md:p-6 mb-6 max-w-2xl">
      <div className="flex gap-3">
        <div className="mt-0.5 w-1 h-1 rounded-full bg-accent shrink-0" />
        <p className="text-sm text-foreground leading-relaxed italic">
          {children}
        </p>
      </div>
    </div>
  )
}

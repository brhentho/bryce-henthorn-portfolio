"use client"

import Image from "next/image"
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
  subtitle?: string
  tags?: string[]
  heroImage?: string
  heroImageAlt?: string
  specs: SpecItem[]
  navItems: NavItem[]
  children: React.ReactNode
}

export function CaseStudyLayout({
  title,
  subtitle,
  tags,
  heroImage,
  heroImageAlt,
  specs,
  navItems,
  children,
}: CaseStudyLayoutProps) {
  return (
    <PageTransition>
      <Nav />
      <main>
        {/* 100vh Hero - 2 column: text left, image right */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-grid-animated pointer-events-none" aria-hidden="true" />
          <Container className="relative z-10 py-32 md:py-0">
            <AnimateIn>
              <a
                href="/"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] text-foreground-tertiary hover:text-accent transition-colors duration-200 uppercase mb-10 md:mb-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 8H3M7 4L3 8l4 4" />
                </svg>
                Back to Work
              </a>
            </AnimateIn>

            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              {/* Left: Title + tags + optional intro */}
              <div className="flex-1 min-w-0">
                <AnimateIn delay={0.1}>
                  <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-foreground max-w-xl text-balance">
                    {title}
                  </h1>
                </AnimateIn>

                {/* Tags row */}
                {tags && tags.length > 0 && (
                  <AnimateIn delay={0.15}>
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] tracking-[0.1em] text-foreground-tertiary bg-surface-raised px-2.5 py-1 rounded border border-border uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </AnimateIn>
                )}

                {subtitle && (
                  <AnimateIn delay={0.2}>
                    <p className="mt-6 text-base md:text-lg text-foreground-secondary leading-relaxed max-w-lg font-sans">
                      {subtitle}
                    </p>
                  </AnimateIn>
                )}
              </div>

              {/* Right: Hero image */}
              {heroImage && (
                <AnimateIn delay={0.2} className="flex-1 min-w-0">
                  <div className="relative aspect-[16/10] rounded-lg border border-border overflow-hidden bg-surface-raised">
                    <Image
                      src={heroImage}
                      alt={heroImageAlt || title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </AnimateIn>
              )}
            </div>
          </Container>
        </section>

        {/* Overview spec panel */}
        <Container>
          <AnimateIn delay={0.1}>
            <div className="mb-16 md:mb-20 max-w-3xl">
              <OverviewSpecPanel specs={specs} />
            </div>
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
  counter,
  children,
}: {
  id: string
  label: string
  counter?: string
  children: React.ReactNode
}) {
  return (
    <AnimateIn>
      <section id={id} className="mb-16 md:mb-20 scroll-mt-24">
        <SectionHeader label={label} counter={counter} />
        {children}
      </section>
    </AnimateIn>
  )
}

export function CaseStudyParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm md:text-base text-foreground-secondary leading-relaxed mb-4 max-w-2xl font-sans">
      {children}
    </p>
  )
}

export function CaseStudyHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-lg md:text-xl font-medium text-foreground mb-4 mt-8 first:mt-0 tracking-tight">
      {children}
    </h2>
  )
}

export function CaseStudyList({ items }: { items: string[] }) {
  return (
    <ul className="mb-6 flex flex-col gap-2.5 max-w-2xl">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-foreground-secondary leading-relaxed font-sans">
          <span className="mt-2 w-1 h-1 rounded-full bg-accent opacity-60 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function CaseStudyCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 md:p-6 mb-6 max-w-2xl relative overflow-hidden">
      {/* Left teal accent rule */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent opacity-40" aria-hidden="true" />
      <div className="absolute top-3 left-4 w-3 h-3 border-l border-t border-accent/20" aria-hidden="true" />
      <div className="pl-4">
        <p className="text-base md:text-lg text-foreground leading-relaxed italic font-sans">
          {children}
        </p>
      </div>
    </div>
  )
}

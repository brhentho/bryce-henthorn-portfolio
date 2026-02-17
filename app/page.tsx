"use client"

import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"

export default function HomePage() {
  return (
    <PageTransition>
      <Nav />
      <main>
        <Hero />
        <ProjectsSection />
        <PhilosophySection />
      </main>
      <Footer />
    </PageTransition>
  )
}

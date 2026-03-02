"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/section-header"
import { ProjectCard } from "@/components/project-card"
import { ComingSoonModal } from "@/components/coming-soon-modal"
import { AnimateIn } from "@/components/animate-in"
import { projectImages } from "@/lib/images"

export function ProjectsSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Section id="projects" className="pt-0 md:pt-0 pb-24 md:pb-32">
      <Container>
        <SectionHeader label="Selected Work" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimateIn className="h-full">
            <ProjectCard
              productName="Teams for Education"
              heading="Modernizing Online Classes for an Authentic Virtual Experience."
              href="/teams-for-education"
              cardImage={projectImages["teams-for-education"].cardImage}
              imageAlt={projectImages["teams-for-education"].alt}
              imageBg="rgba(88,101,242,0.06)"
            />
          </AnimateIn>
          <AnimateIn delay={0.1} className="h-full">
            <ProjectCard
              productName="Windows Recall"
              heading="Designing Semantic Search for Everything You've Seen."
              href="/recall"
              cardImage={projectImages["recall"].cardImage}
              imageAlt={projectImages["recall"].alt}
              imageBg="rgba(56,152,236,0.06)"
            />
          </AnimateIn>
          <AnimateIn delay={0.2} className="h-full">
            <ProjectCard
              productName="Agents in Windows"
              heading="Solving Trust and Visibility for AI Agents in the Operating System."
              href="/agents-in-windows"
              cardImage={projectImages["agents-in-windows"].cardImage}
              imageAlt={projectImages["agents-in-windows"].alt}
              imageBg="rgba(45,226,210,0.05)"
            />
          </AnimateIn>
          <AnimateIn delay={0.3} className="h-full">
            <ProjectCard
              productName="Copilot Actions"
              heading="Making AI Actions Feel Safe, Legible, and Interruptible."
              tag="Coming soon"
              disabled
              onDisabledClick={() => setModalOpen(true)}
              cardImage={projectImages["copilot-actions"].cardImage}
              imageAlt={projectImages["copilot-actions"].alt}
              imageBg="rgba(138,104,232,0.06)"
            />
          </AnimateIn>
        </div>
      </Container>
      <ComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Section>
  )
}

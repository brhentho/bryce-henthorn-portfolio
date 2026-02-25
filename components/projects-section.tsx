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
          <AnimateIn>
            <ProjectCard
              productName="Teams for Education"
              heading="Modernizing Online Classes for an Authentic Virtual Experience."
              href="/teams-for-education"
              year="2020"
              cardImage={projectImages["teams-for-education"].cardImage}
              imageAlt={projectImages["teams-for-education"].alt}
            />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <ProjectCard
              productName="Windows Recall"
              heading="Designing Semantic Search for Everything You've Seen."
              href="/recall"
              year="2024"
              cardImage={projectImages["recall"].cardImage}
              imageAlt={projectImages["recall"].alt}
            />
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <ProjectCard
              productName="Agents in Windows"
              heading="Solving Trust and Visibility for AI Agents in the Operating System."
              href="/agents-in-windows"
              year="2024"
              cardImage={projectImages["agents-in-windows"].cardImage}
              imageAlt={projectImages["agents-in-windows"].alt}
            />
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <ProjectCard
              productName="Copilot Actions"
              heading="Making AI Actions Feel Safe, Legible, and Interruptible."
              tag="Coming soon"
              disabled
              onDisabledClick={() => setModalOpen(true)}
              cardImage={projectImages["copilot-actions"].cardImage}
              imageAlt={projectImages["copilot-actions"].alt}
            />
          </AnimateIn>
        </div>
      </Container>
      <ComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Section>
  )
}

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
    <Section id="projects" className="pb-24 md:pb-32">
      <Container>
        <SectionHeader label="Selected Work" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <AnimateIn>
            <ProjectCard
              title="Teams for Education"
              summary="Restored small-group collaboration to remote classrooms by introducing structured virtual tables inside Teams."
              href="/teams-for-education"
              tags={["0\u21921", "Interaction design", "Enterprise"]}
              cardImage={projectImages["teams-for-education"].cardImage}
              imageAlt={projectImages["teams-for-education"].alt}
            />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <ProjectCard
              title="Windows Recall"
              summary="Reimagined search as memory using semantic retrieval and trust-forward interaction patterns."
              href="/recall"
              tags={["Trust + privacy", "Systems thinking", "Windows"]}
              cardImage={projectImages["recall"].cardImage}
              imageAlt={projectImages["recall"].alt}
            />
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <ProjectCard
              title="Agents in Windows"
              summary="Defined OS-level visibility and control patterns for long-running AI agents in the Windows shell."
              href="/agents-in-windows"
              tags={["OS shell", "Interaction design", "Systems thinking"]}
              cardImage={projectImages["agents-in-windows"].cardImage}
              imageAlt={projectImages["agents-in-windows"].alt}
            />
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <ProjectCard
              title="Copilot Actions"
              summary="Designed taskbar entry points and interruption patterns for actions that run across apps."
              tag="Coming soon"
              disabled
              onDisabledClick={() => setModalOpen(true)}
              tags={["0\u21921", "Enterprise", "Windows"]}
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

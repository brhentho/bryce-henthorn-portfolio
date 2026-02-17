"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/section-header"
import { ProjectCard } from "@/components/project-card"
import { ComingSoonModal } from "@/components/coming-soon-modal"
import { AnimateIn } from "@/components/animate-in"

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
              description="Restored small-group collaboration to remote classrooms by introducing structured 'virtual tables' inside Teams."
              href="/teams-for-education"
              meta="Senior UX Designer / Microsoft Teams / 2021"
              schematicVariant="grid"
            />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <ProjectCard
              title="Windows Recall"
              description="Reimagined search as memory using semantic retrieval and trust-forward interaction patterns."
              href="/recall"
              meta="Senior UX Designer / Windows / 2024"
              schematicVariant="blocks"
            />
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <ProjectCard
              title="Agents in Windows"
              description="Defined OS-level visibility and control patterns for long-running AI agents in the Windows shell."
              href="/agents-in-windows"
              meta="Senior UX Designer / Windows Shell / 2024"
              schematicVariant="hierarchy"
            />
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <ProjectCard
              title="Copilot Actions"
              description="Designed taskbar entry points and interruption patterns for actions that run across apps."
              tag="Coming soon"
              disabled
              onDisabledClick={() => setModalOpen(true)}
              meta="Senior UX Designer / Windows / 2025"
              schematicVariant="flow"
            />
          </AnimateIn>
        </div>
      </Container>
      <ComingSoonModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Section>
  )
}

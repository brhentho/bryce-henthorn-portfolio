"use client"

import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/section-header"
import { ProjectCard } from "@/components/project-card"
import { AnimateIn } from "@/components/animate-in"
import { projectImages } from "@/lib/images"

// --- Placeholder visuals ---

function TeamsPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(88,101,242,0.07)" }}>
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(88,101,242,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Classroom seating grid */}
      <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative opacity-60">
        {/* Four table groups, each with 4 seats */}
        {[
          { tx: 52, ty: 52 },
          { tx: 172, ty: 52 },
          { tx: 52, ty: 132 },
          { tx: 172, ty: 132 },
        ].map(({ tx, ty }, gi) => (
          <g key={gi}>
            {/* Table surface */}
            <rect x={tx - 24} y={ty - 14} width={68} height={38} rx="6" fill="rgba(88,101,242,0.10)" stroke="rgba(88,101,242,0.35)" strokeWidth="1" />
            {/* Seats around the table */}
            {[
              { cx: tx - 10, cy: ty - 26 },
              { cx: tx + 22, cy: ty - 26 },
              { cx: tx - 10, cy: ty + 36 },
              { cx: tx + 22, cy: ty + 36 },
            ].map(({ cx, cy }, si) => (
              <circle key={si} cx={cx} cy={cy} r="9" fill="rgba(88,101,242,0.12)" stroke="rgba(88,101,242,0.5)" strokeWidth="1" />
            ))}
          </g>
        ))}
        {/* Teacher position */}
        <rect x="276" y="76" width="28" height="48" rx="6" fill="rgba(88,101,242,0.18)" stroke="rgba(88,101,242,0.55)" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="290" cy="64" r="10" fill="rgba(88,101,242,0.18)" stroke="rgba(88,101,242,0.55)" strokeWidth="1" />
      </svg>
    </div>
  )
}

function RecallPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(56,152,236,0.07)" }}>
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(56,152,236,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Timeline + thumbnail cards */}
      <svg width="340" height="180" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative opacity-65">
        {/* Horizontal timeline rail */}
        <line x1="20" y1="90" x2="320" y2="90" stroke="rgba(56,152,236,0.35)" strokeWidth="1.5" />
        {/* Thumbnail cards along the timeline */}
        {[36, 96, 156, 216, 276].map((x, i) => {
          const active = i === 2
          return (
            <g key={i}>
              <rect
                x={x - 22}
                y={active ? 50 : 56}
                width={44}
                height={active ? 52 : 42}
                rx="5"
                fill={active ? "rgba(56,152,236,0.18)" : "rgba(56,152,236,0.08)"}
                stroke={active ? "rgba(56,152,236,0.7)" : "rgba(56,152,236,0.28)"}
                strokeWidth={active ? "1.5" : "1"}
              />
              {/* Simulated content lines */}
              <rect x={x - 14} y={active ? 62 : 66} width={28} height={3} rx="1.5" fill="rgba(56,152,236,0.3)" />
              <rect x={x - 14} y={active ? 70 : 73} width={20} height={3} rx="1.5" fill="rgba(56,152,236,0.2)" />
              {/* Timeline dot */}
              <circle cx={x} cy={90} r={active ? 5 : 3.5} fill={active ? "rgba(56,152,236,0.9)" : "rgba(56,152,236,0.4)"} />
            </g>
          )
        })}
        {/* Search query bar */}
        <rect x="80" y="128" width="180" height="26" rx="6" fill="rgba(56,152,236,0.08)" stroke="rgba(56,152,236,0.3)" strokeWidth="1" />
        <circle cx="100" cy="141" r="6" stroke="rgba(56,152,236,0.5)" strokeWidth="1.2" />
        <line x1="104" y1="145" x2="108" y2="149" stroke="rgba(56,152,236,0.5)" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="114" y="138" width="80" height="6" rx="3" fill="rgba(56,152,236,0.2)" />
      </svg>
    </div>
  )
}

function AgentsPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(45,226,210,0.05)" }}>
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(45,226,210,0.14) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Agent orchestration node graph */}
      <svg width="320" height="190" viewBox="0 0 320 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative opacity-65">
        {/* Edges */}
        <line x1="160" y1="50" x2="80" y2="120" stroke="rgba(45,226,210,0.25)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="160" y1="50" x2="160" y2="120" stroke="rgba(45,226,210,0.35)" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="160" y1="50" x2="240" y2="120" stroke="rgba(45,226,210,0.25)" strokeWidth="1" strokeDasharray="4 3" />
        {/* Sub-edges */}
        <line x1="80" y1="120" x2="56" y2="168" stroke="rgba(45,226,210,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="80" y1="120" x2="104" y2="168" stroke="rgba(45,226,210,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="240" y1="120" x2="220" y2="168" stroke="rgba(45,226,210,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="240" y1="120" x2="260" y2="168" stroke="rgba(45,226,210,0.2)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Root orchestrator node */}
        <rect x="130" y="26" width="60" height="26" rx="6" fill="rgba(45,226,210,0.14)" stroke="rgba(45,226,210,0.7)" strokeWidth="1.5" />
        <rect x="140" y="35" width="30" height="5" rx="2.5" fill="rgba(45,226,210,0.45)" />
        <rect x="144" y="43" width="20" height="4" rx="2" fill="rgba(45,226,210,0.25)" />

        {/* Mid-level agent nodes */}
        {[80, 160, 240].map((x, i) => (
          <g key={i}>
            <rect x={x - 28} y={108} width="56" height="24" rx="5" fill="rgba(45,226,210,0.10)" stroke={i === 1 ? "rgba(45,226,210,0.6)" : "rgba(45,226,210,0.35)"} strokeWidth="1" />
            <rect x={x - 18} y={116} width={i === 1 ? 28 : 22} height="4" rx="2" fill="rgba(45,226,210,0.3)" />
          </g>
        ))}

        {/* Leaf tool nodes */}
        {[56, 104, 220, 260].map((x) => (
          <g key={x}>
            <circle cx={x} cy={168} r="11" fill="rgba(45,226,210,0.08)" stroke="rgba(45,226,210,0.3)" strokeWidth="1" />
            <circle cx={x} cy={168} r="4" fill="rgba(45,226,210,0.35)" />
          </g>
        ))}
        <circle cx={160} cy={168} r="11" fill="rgba(45,226,210,0.08)" stroke="rgba(45,226,210,0.3)" strokeWidth="1" />
        <circle cx={160} cy={168} r="4" fill="rgba(45,226,210,0.35)" />
      </svg>
    </div>
  )
}

// ---

export function ProjectsSection() {
  return (
    <Section id="projects" className="pt-0 md:pt-0 pb-24 md:pb-32">
      <Container>
        <SectionHeader label="Selected Work" />
        <div className="flex flex-col gap-6 md:gap-8">
          <AnimateIn>
            <ProjectCard
              productName="Teams for Education"
              heading="Modernizing Online Classes for an Authentic Virtual Experience."
              href="/teams-for-education"
              cardImage={projectImages["teams-for-education"].cardImage}
              imageAlt={projectImages["teams-for-education"].alt}
            />
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <ProjectCard
              productName="Windows Recall"
              heading="Designing Semantic Search for Everything You've Seen."
              href="/recall"
              cardImage={projectImages["recall"].cardImage}
              imageAlt={projectImages["recall"].alt}
            />
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <ProjectCard
              productName="Agents in Windows"
              heading="Solving Trust and Visibility for AI Agents in the Operating System."
              href="/agents-in-windows"
              cardImage={projectImages["agents-in-windows"].cardImage}
              imageAlt={projectImages["agents-in-windows"].alt}
            />
          </AnimateIn>
        </div>
      </Container>
    </Section>
  )
}

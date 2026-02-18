"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyList,
  CaseStudyCallout,
} from "@/components/case-study-layout"
import { FigurePanel } from "@/components/figure-panel"
import { projectImages } from "@/lib/images"

const specs = [
  { label: "Role", value: "Senior UX Designer" },
  { label: "Platform", value: "Microsoft Teams" },
  { label: "Focus", value: "Virtual classroom collaboration" },
  { label: "Challenge", value: "Engagement collapsed when classrooms went virtual" },
  { label: "Solution", value: "Persistent virtual tables with spatial consistency" },
  { label: "Impact", value: "Improved participation, faster group transitions, educator trust" },
]

const navItems = [
  { id: "context", label: "Context" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "solution", label: "Solution" },
  { id: "iteration", label: "Iteration" },
  { id: "group-creation", label: "Group Creation" },
  { id: "student-view", label: "Student View" },
  { id: "impact", label: "Impact" },
]

export default function TeamsForEducationPage() {
  return (
    <CaseStudyLayout
      productName="Teams for Education"
      title="Modernizing online class for an authentic virtual experience"
      tags={["UX Strategy", "Microsoft Teams Enterprise", "Senior Designer", "2020"]}
      heroImage={projectImages["teams-for-education"].heroImage}
      heroImageAlt={projectImages["teams-for-education"].alt}
      specs={specs}
      navItems={navItems}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>COVID brought millions of new students to online classrooms</CaseStudyHeading>
        <CaseStudyParagraph>
          At the height of the pandemic, Microsoft Teams became a lifeline for education, used by more than 150 million students and educators worldwide. Adoption surged almost overnight. Our team was asked to figure out how to retain this massive growth. The real question was not how to add more features. It was how to make virtual class feel human again.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Through research sessions with students and teachers, we identified moments where engagement naturally happened and moments where it collapsed. Small group discussions consistently drove participation. Students felt safer speaking in groups of four than in front of thirty.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We also saw that teachers relied heavily on visual attendance. In a real classroom, an empty seat is obvious. Online, it required scanning names in a list.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This insight shaped everything. The product needed to recreate spatial consistency and lower the emotional barrier to participation.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 01 — Research synthesis: mapping the emotional gap" variant="layout" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>Engagement collapsed when classrooms went virtual</CaseStudyHeading>
        <CaseStudyParagraph>
          Educators were juggling attendance, chat moderation, breakout rooms, and lesson delivery all at once. Students quietly disengaged. Participation felt risky in a room of muted avatars. Teachers struggled to track who was present and who was drifting away.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The online classroom lacked spatial structure. In a physical classroom, students sit in the same seats every day. Teachers scan the room and know who belongs where. Online, that anchor disappeared. Everyone felt interchangeable.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          {'"'}I don{"'"}t really like it when the teacher says {"'"}okay you guys can discuss on video{"'"} because everyone either starts talking or no one talks, so then there{"'"}s just awkward silence.{'"'} - Karen, grade 12
        </CaseStudyCallout>
      </CaseStudySection>

      <CaseStudySection id="research" label="Research">
        <CaseStudyHeading>Designing from real classroom behavior</CaseStudyHeading>
        <CaseStudyParagraph>
          Before designing anything, we ran extensive research with students, parents, and teachers to understand their daily experience inside Teams. I led several of these sessions to map the full day-in-the-life of both educators and students. We observed where engagement broke down, when energy dropped, and what felt emotionally uncomfortable in a virtual classroom. These sessions were not about usability tweaks. They were about understanding how it felt to spend six hours a day in small boxes on a screen.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Once we stepped back and looked at the data, a heartbreaking theme emerged. Students did not just miss content. They missed their friends. They missed social cues. They missed feeling seen. That emotional gap was the real problem.
        </CaseStudyParagraph>
      </CaseStudySection>

      <CaseStudySection id="solution" label="Solution">
        <CaseStudyHeading>Reintroducing structure without turning Teams into a cartoon classroom</CaseStudyHeading>
        <CaseStudyParagraph>
          We explored how literal the idea of tables should be. One direction visualized full classroom maps with avatars sitting at drawn tables. It was playful but risked feeling gimmicky inside a professional enterprise tool. The opposite direction was purely functional, essentially renaming breakout channels.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We landed somewhere in between. We designed persistent table cards arranged in a grid. Students sat in fixed positions within these tables, with their avatars resting in consistent seats. If a student was absent, their seat remained empty. Teachers could take attendance visually in seconds. Students could see exactly who they were sitting next to.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This approach restored spatial awareness without sacrificing clarity. It was structured enough to feel real, but restrained enough to feel native inside Teams.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 02 — From flat grids to persistent table cards" variant="controls" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="iteration" label="Iteration">
        <CaseStudyHeading>Designing meetings for engagement, not just broadcasting</CaseStudyHeading>
        <CaseStudyParagraph>
          We redesigned class meetings around predictable transitions between whole-class instruction and small group collaboration. Students could move between tables and the main session fluidly. Teachers could create and assign groups quickly before class began.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The key constraint was speed. Group creation had to be fast enough to happen minutes before a class started. Any friction here would break trust immediately.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 03 — Whole class to table transitions" variant="flow" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="group-creation" label="Group Creation">
        <CaseStudyParagraph>
          Teachers could pre-create tables, assign students manually or automatically, and see group composition at a glance. The system made participation feel intentional instead of random. Students always knew where they belonged.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 04 — Group creation and assignment flow" variant="layout" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="student-view" label="Student View">
        <CaseStudyParagraph>
          From the student perspective, the experience reinforced belonging. They saw familiar group members, recognized their seat, and felt accountable to the people around them. That subtle shift made participation feel manageable again.
        </CaseStudyParagraph>
        <FigurePanel caption="FIG 05 — Student view of their virtual table" variant="video" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <FigurePanel caption="End-to-end video: group creation and class orchestration" variant="video" className="mb-8 max-w-2xl" />
        <CaseStudyParagraph>
          User interest and delight were strong in research sessions. Teachers reported faster response times when moving between group discussions. Participation became more equitable because students felt safer contributing in smaller groups.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The design patterns later informed enterprise meeting experiences and contributed to the launch of the Class Homepage. Teachers shared positive feedback publicly, describing how the experience felt closer to a real classroom.
        </CaseStudyParagraph>
        <CaseStudyCallout>
          Engagement does not come from adding more controls. It comes from removing friction. When you design with empathy first, inclusivity scales naturally. The UI fades into the background where it belongs.
        </CaseStudyCallout>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

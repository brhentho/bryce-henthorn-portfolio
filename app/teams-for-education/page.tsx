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
  { id: "iteration", label: "Classroom Orchestration" },
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
      nextProject={{ name: "Windows Recall", href: "/recall" }}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>COVID brought millions of new students to online classrooms</CaseStudyHeading>
        <CaseStudyParagraph>
          At the height of the pandemic, Microsoft Teams became a lifeline for education — used by over 150 million students and educators worldwide. Growth was massive, but it was fragile. Our team was tasked with figuring out how to retain it. Educators were overwhelmed, students were quietly disengaging, and the initial surge was already showing signs of erosion.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The initial ask was about growth metrics — how to keep the numbers up. But through a rigorous design process loop of research, synthesis, and prototyping, we discovered that the real lever for retention wasn{"'"}t feature additions. It was solving the fundamental user problems that were causing disengagement.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          That reframing changed everything. Instead of optimizing for adoption metrics, we focused on what was actually breaking down in the virtual classroom experience. The retention strategy became inseparable from the user experience strategy. My role centered on leading that design process and shaping the interaction patterns that emerged from it.
        </CaseStudyParagraph>
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
          We knew smaller group discussion was necessary, but the path was not obvious. Early concepts ranged from simple breakout lists to more literal digital classroom layouts. Recreating physical space inside a business tool initially felt risky. Over multiple iterations, though, the clarity of spatial grouping kept resurfacing as the most elegant option. The idea of consistent seating, visible neighbors, and stable group identity solved multiple engagement problems at once.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We explored how literal the idea of tables should be. One direction visualized full classroom maps with avatars sitting at drawn tables. It was playful but risked feeling gimmicky inside a professional enterprise tool. The opposite direction was purely functional, essentially renaming breakout channels.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We landed somewhere in between. We designed persistent table cards arranged in a grid. Students sat in fixed positions within these tables, with their avatars resting in consistent seats. If a student was absent, their seat remained empty. Teachers could take attendance visually in seconds. Students could see exactly who they were sitting next to.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This approach restored spatial awareness without sacrificing clarity. It was structured enough to feel real, but restrained enough to feel native inside Teams.
        </CaseStudyParagraph>
        <FigurePanel caption="The spatial classroom view with virtual tables" src="/images/projects/teams-fig02.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="iteration" label="Classroom Orchestration">
        <CaseStudyHeading>Giving teachers the room back</CaseStudyHeading>
        <CaseStudyParagraph>
          Virtual tables were only part of the solution. The real breakthrough was enabling teachers to manage the room naturally.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Teachers could start table discussions and monitor the classroom from a global view. From there, they could move fluidly between groups, almost like walking around a physical classroom. They could peek into discussions, support struggling tables, and maintain awareness of overall participation without losing context.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This orchestration layer restored something subtle but powerful: situational awareness. Instead of fragmented breakout rooms, teachers had a cohesive classroom again.
        </CaseStudyParagraph>
        <FigurePanel caption="Whole class to table transition" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig06-2YDd5QkvxbZD2b8O44R0Nag6g14UhH.mov" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="group-creation" label="Group Creation">
        <CaseStudyParagraph>
          Previously, breakout rooms had to be created dynamically during the meeting. That meant instructional time was lost while groups were assigned and logistics were sorted out.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          With virtual tables, teachers could set groups before class. They could assign students to consistent seats and attach materials or instructions to each table in advance. When class began, students entered their assigned groups immediately.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This made attendance easier, transitions smoother, and the start of class far more focused. Preparation moved outside the meeting, which allowed learning to begin without friction.
        </CaseStudyParagraph>
        <FigurePanel caption="The group creation and assignment flow" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig04-SzV8nkwmimnnyjPOiYSn8Z9J0VAp5z.mov" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="student-view" label="Student View">
        <CaseStudyParagraph>
          From the student perspective, the experience reinforced belonging. They saw familiar group members, recognized their seat, and felt accountable to the people around them. That subtle shift made participation feel manageable again.
        </CaseStudyParagraph>
        <FigurePanel caption="Student view of virtual tables" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig05-P8cWRCiwt0bUCrucyij7Dh4KVxwhDT.mov" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <FigurePanel caption="End-to-end group creation to classroom orchestration" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig04-SzV8nkwmimnnyjPOiYSn8Z9J0VAp5z.mov" className="mb-8 max-w-2xl" />
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

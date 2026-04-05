"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyCallout,
} from "@/components/case-study-layout"
import { FigurePanel, DiagramPlaceholder } from "@/components/figure-panel"
import { MarketContextPanel } from "@/components/market-context-panel"
import { CoCreationPanel } from "@/components/cocreation-panel"
import { ResearchSynthesisTable } from "@/components/research-synthesis-table"
import { TeacherReactionsPanel } from "@/components/teacher-reactions-panel"
import { CaseStudyHero } from "@/components/case-study-hero"

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
  { id: "bandwidth", label: "Bandwidth Constraints" },
  { id: "constraints", label: "Constraints & Tradeoffs" },
  { id: "impact", label: "Impact" },
]

const teamsHero = (
  <CaseStudyHero
    heroImage="/images/projects/Teams hero kids.png"
    heroImageAlt="Students in virtual Teams classrooms with persistent table groups"
    productName="Teams for Education"
    title="Modernizing Online Classes For An Authentic Virtual Experience"
    tags={["UX Strategy", "Microsoft Teams Enterprise", "Senior Designer", "2020"]}
  />
)

export default function TeamsForEducationPage() {
  return (
    <CaseStudyLayout
      productName="Teams for Education"
      title="Restoring classroom structure when school went virtual"
      tags={["UX Strategy", "Microsoft Teams Enterprise", "Senior Designer", "2020"]}
      heroContent={teamsHero}
      specs={specs}
      navItems={navItems}
      nextProject={{ name: "Windows Recall", href: "/recall" }}
    >
      <CaseStudySection id="context" label="Context">
        <CaseStudyHeading>COVID brought millions of new students to online classrooms</CaseStudyHeading>
        <CaseStudyParagraph>
          At the height of the pandemic, Microsoft Teams became a lifeline for education, used by over 150 million students and educators worldwide. Growth was massive, but it was fragile. Our team was tasked with figuring out how to retain it. Educators were overwhelmed, students were quietly disengaging, and the initial surge was already showing signs of erosion.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The initial ask was about growth metrics, specifically how to keep the numbers up. But through a rigorous design process loop of research, synthesis, and prototyping, we discovered that the real lever for retention wasn{"'"}t feature additions. It was solving the fundamental user problems that were causing disengagement.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          That reframing changed everything. Instead of optimizing for adoption metrics, we focused on what was actually breaking down in the virtual classroom experience. The retention strategy became inseparable from the user experience strategy. My role centered on leading that design process and shaping the interaction patterns that emerged from it.
        </CaseStudyParagraph>
        <MarketContextPanel />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>Engagement collapsed when classrooms went virtual</CaseStudyHeading>
        <CaseStudyParagraph>
          Teachers became operators, not educators. They managed attendance, read chat, spun up breakout rooms, debugged audio problems, and lectured all at once. Reading the room meant staring at a grid of boxes and guessing who was actually there.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Students retreated. Raising your hand meant speaking to thirty people at once, into dead silence, with no response. There were no whispered questions to a neighbor. No one to nudge you back into focus. No place to hide and then gradually emerge. So most just turned off their cameras.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In person, schools have architecture. Small groups, seating arrangements, a teacher moving through the room. Learning happens in conversation. Online, it collapsed into broadcast. One person talking. Everyone else invisible.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Teachers couldn{"'"}t see who was falling behind. Students couldn{"'"}t feel like part of a group. The system worked for lecturing. It failed at learning.
        </CaseStudyParagraph>
        <CoCreationPanel />
      </CaseStudySection>

      <CaseStudySection id="research" label="Research">
        <CaseStudyHeading>Designing from real classroom behavior</CaseStudyHeading>
        <CaseStudyParagraph>
          Before designing anything, we ran extensive research with students, parents, and teachers to understand their daily experience inside Teams. I led several of these sessions to map the full day-in-the-life of both educators and students. We observed where engagement broke down, when energy dropped, and what felt emotionally uncomfortable in a virtual classroom. These sessions were not about usability tweaks. They were about understanding how it felt to spend six hours a day in small boxes on a screen.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Once we stepped back and looked at the data, a heartbreaking theme emerged. Students did not just miss content. They missed their friends. They missed social cues. They missed feeling seen. That emotional gap was the real problem.
        </CaseStudyParagraph>
        <ResearchSynthesisTable />
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
        <FigurePanel caption="The spatial classroom view with virtual tables" src="/images/projects/teams-chat.png" className="mt-8 mb-4 max-w-2xl" />
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

      <CaseStudySection id="bandwidth" label="Bandwidth Constraints">
        <CaseStudyHeading>Not all home internet is equal</CaseStudyHeading>
        <CaseStudyParagraph>
          Many students were using shared home networks. Older devices. Spotty connections. When teachers handed out materials mid-lesson, students with slow internet got left behind while files loaded.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Persistent tables fixed this structurally. Teachers attached materials to each table before class. Students could open files as soon as they sat down, not when the teacher shared them. A student on a slow connection could start downloading while the lesson progressed.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Small change. Huge impact. Teaching time didn't pause for tech problems.
        </CaseStudyParagraph>
        <FigurePanel caption="Pre-class material distribution flow" src="/images/projects/teams-preclass-distribution.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="constraints" label="Constraints & Tradeoffs">
        <CaseStudyHeading>The platform fought what we were building</CaseStudyHeading>
        <CaseStudyParagraph>
          In a real classroom, a teacher gives an assignment and moves around the room. They hear conversations. They see confusion. They step in when needed. It{"'"}s fluid, responsive, whole-class awareness.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Old Teams breakout rooms broke that. Once students were in separate rooms, the classroom fragmented. Teachers had to enter each room to see what was happening. No global awareness. No ability to move between groups without losing context. Teaching became reactive: jump to a room after someone raised a hand, hope nobody else{"'"}s group imploded while you were gone.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The platform's architecture for breakout rooms didn't support what we needed. It was designed for synchronous meetings, not persistent classroom structure. We had to fight the infrastructure to make the persistent tables work. Pulled in platform teams. Challenged the model. Pushed back on constraints that made teachers' jobs harder.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The design solution was straightforward: give teachers a whole-class view that showed all groups at once. They could see activity across the room, drop into a group to guide, and return to the full view without fragmentation. It restored the role of facilitator.
        </CaseStudyParagraph>
        <FigurePanel caption="Platform constraint map: breakout room infrastructure vs. classroom persistence needs" src="/images/projects/teams-platform-constraints.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <TeacherReactionsPanel />
        <CaseStudyParagraph>
          Testing showed what mattered. Teachers moved between groups faster. They spotted struggling students quicker. And most important: students spoke up more often when they weren{"'"}t performing for thirty people.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The full virtual tables concept didn{"'"}t ship exactly as designed. But the patterns lived on. Persistent class context. Structured groups. Clearer visibility into participation. Those ideas became the Class Homepage, a space where teachers and students managed the real work of school: assignments, deadlines, grades. It shifted how Teams thought about classrooms. Not meetings. Ongoing environments.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The work stretched beyond education too. How small groups get visibility in enterprise meetings. How structured participation scales when you have more than thirty people in a call. The classroom became a model for all of Teams' collaboration work.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Retention turned out to be simple. It doesn{"'"}t come from more features. It comes from the same thing physical classrooms are built on: structure. Social connection. Being seen.
        </CaseStudyParagraph>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

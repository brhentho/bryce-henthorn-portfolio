"use client"

import {
  CaseStudyLayout,
  CaseStudySection,
  CaseStudyParagraph,
  CaseStudyHeading,
  CaseStudyCallout,
} from "@/components/case-study-layout"
import { FigurePanel, DiagramPlaceholder } from "@/components/figure-panel"
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
  { id: "bandwidth", label: "Bandwidth Constraints" },
  { id: "constraints", label: "Constraints & Tradeoffs" },
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
          At the height of the pandemic, Microsoft Teams became critical infrastructure for education. More than 150 million students and educators were suddenly relying on it to run classrooms, collaborate, and stay connected. The growth was massive. The initial goal of this work focused on retention metrics.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The assumption was that adding more features to Teams would keep educators and students engaged. Early discussions centered around expanding capabilities and optimizing engagement metrics. But through research with teachers and students, a different pattern began to emerge. Disengagement was not being driven by missing tools. It was being driven by the breakdown of the classroom experience itself. Students struggled to feel present in large video calls, teachers had difficulty gauging participation, and the subtle social cues that normally shape a classroom, eye contact, spatial awareness, peer interaction, had largely disappeared.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This insight forced a strategic shift. If the core problem was the loss of classroom dynamics, simply adding more functionality would not meaningfully improve retention. The opportunity was to rethink how a virtual classroom could restore the sense of presence, visibility, and interaction that both teachers and students rely on. The retention strategy became inseparable from the user experience strategy, and the work shifted toward rebuilding the structure of the classroom experience inside Teams.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          As a Senior UX Designer in the Microsoft Education organization, my role was to advocate for the education audience within the broader Teams ecosystem. I led UX research sessions with educators and students, facilitated cross-functional ideation and concept development workshops, and translated the insights into design solutions from early wireframes through high-fidelity prototypes. The goal was to demonstrate how Teams could move beyond basic video conferencing and better support the social dynamics that make classrooms effective learning environments.
        </CaseStudyParagraph>
        <FigurePanel caption="Retention strategy reframe: from feature additions to classroom dynamics" src="/images/projects/teams-retention-strategy.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>The classroom broke when it went virtual</CaseStudyHeading>
        <CaseStudyParagraph>
          When classrooms moved online, engagement didn{"'"}t slowly decline. It collapsed.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Teachers were suddenly expected to run an entire classroom through a single interface. They were taking attendance, watching chat, managing breakout rooms, troubleshooting tech issues, and trying to teach all at once. The role shifted from educator to operator. Instead of reading the room, they were scanning tiles and hoping nothing was being missed.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          For students, the experience was even more isolating. Speaking up meant addressing the entire class, often into silence, with no feedback from peers. There were no side conversations, no quick check-ins, no small group moments to build confidence. Participation felt risky. It was easier to stay muted, turn the camera off, and disappear into the background.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The structure that makes classrooms work had vanished. In a physical space, students sit in familiar groups, teachers move around the room, and learning happens through a mix of instruction and peer interaction. Teachers act as facilitators, not just lecturers. Online, that structure collapsed into a single stream. One teacher, one stage, many silent observers.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Without spatial cues or group dynamics, teachers lost visibility into who was engaged and who was falling behind. Students lost the sense of belonging and safety that comes from smaller group interaction. The classroom became efficient for broadcasting, but ineffective for learning.
        </CaseStudyParagraph>
        <FigurePanel caption="Co-design session with educators" src="/images/projects/teams-cocreation.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="research" label="Research">
        <CaseStudyHeading>Designing from real classroom behavior</CaseStudyHeading>
        <CaseStudyParagraph>
          Before designing anything, we ran extensive research with students, parents, and teachers to understand their daily experience inside Teams. I led several of these sessions to map the full day-in-the-life of both educators and students. We observed where engagement broke down, when energy dropped, and what felt emotionally uncomfortable in a virtual classroom. These sessions were not about usability tweaks. They were about understanding how it felt to spend six hours a day in small boxes on a screen.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Once we stepped back and looked at the data, a heartbreaking theme emerged. Students did not just miss content. They missed their friends. They missed social cues. They missed feeling seen. That emotional gap was the real problem.
        </CaseStudyParagraph>
        <FigurePanel caption="Research synthesis: emotional themes across teachers and students" src="/images/projects/teams-research-synthesis.png" className="mt-8 mb-4 max-w-2xl" />
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
        <CaseStudyHeading>Designing for real-world bandwidth constraints</CaseStudyHeading>
        <CaseStudyParagraph>
          Another constraint that quickly surfaced in research was the reliability of students{"'"} home internet connections. During the pandemic, many students were attending class from shared home networks with limited bandwidth, older devices, or unstable connections. Activities that assumed fast downloads or constant streaming often broke down in practice, creating friction at exactly the moments teachers were trying to keep students engaged.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Virtual tables introduced a structural advantage here. Because groups were persistent rather than created ad-hoc during a call, educators could prepare group materials ahead of time. Teachers could distribute documents, links, or assignments to specific tables before the session began, allowing students to open those resources on their devices as class started rather than downloading them mid-lesson.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This seemingly small workflow change had an outsized impact on the flow of instruction. Instead of pausing the class while students waited for files to load or asking teachers to troubleshoot connectivity issues in real time, materials were already available within each group{"'"}s space. Students with slower connections could open resources earlier and stay synchronized with the rest of the class.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Designing for education meant designing for the realities of students{"'"} environments, not ideal network conditions. By supporting pre-class preparation and lightweight access to materials, the system helped reduce bandwidth friction and kept valuable instructional time focused on learning rather than technical setup.
        </CaseStudyParagraph>
        <FigurePanel caption="Pre-class material distribution flow" src="/images/projects/teams-preclass-distribution.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="constraints" label="Constraints & Tradeoffs">
        <CaseStudyHeading>Teachers lost the ability to facilitate</CaseStudyHeading>
        <CaseStudyParagraph>
          In a physical classroom, group work is fluid. A teacher gives an assignment, students break into small groups, and the teacher moves around the room—listening, guiding, and stepping in when needed. They can quickly see which groups are engaged, who is speaking, and where help is needed.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          That dynamic disappeared online.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In Teams, group work relied on breakout rooms. To start them, teachers had to manually create groups, assign students, and send everyone into separate spaces. Once students were in those rooms, the classroom effectively fragmented. Teachers could no longer see what was happening across the class. To check on a group, they had to enter each room one at a time, losing visibility into everything else. There was no way to {"\""}scan the room,{"\""} no way to quickly sense who needed help.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This created a reactive experience. Instead of facilitating learning, teachers were constantly playing catch-up—jumping between rooms, responding to issues after they surfaced, and hoping students would ask for help. Many didn{"'"}t.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We reframed the problem around restoring the teacher{"'"}s role as a facilitator. Teachers needed a way to maintain awareness of the entire class while still supporting small group work. They needed to see who was participating, which groups were active, and where intervention was needed—without losing context.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We designed a teacher layer that brought that visibility back. Teachers could see activity across all groups at a glance—who was talking, reacting, or disengaged—while also being able to quickly drop into any group or start a conversation without disrupting the flow. Instead of managing rooms, they were able to guide the classroom again.
        </CaseStudyParagraph>
        <FigurePanel caption="Platform constraint map: breakout room infrastructure vs. classroom persistence needs" src="/images/projects/teams-platform-constraints.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <CaseStudyHeading>Impact</CaseStudyHeading>
        <FigurePanel caption="Teachers' reactions to the Class Homepage" src="/images/projects/teams-teacher-reactions.png" className="mb-8 max-w-2xl" />
        <CaseStudyParagraph>
          Through rigorous user testing, we found that the solution was not adding more features, but simplifying and extending the core experience.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In usability studies and educator sessions, teachers consistently reported faster response times when moving between small group discussions compared to traditional breakout room workflows. Because groups were visible within a shared spatial layout, teachers could scan activity across the class and move between conversations without navigating multiple layers of controls. Students also showed more equitable participation, with quieter students contributing more often when discussions felt localized and less performative than speaking in front of the entire class.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          While the full virtual tables concept did not ship as originally designed, the work directly influenced shipped product experiences. The core patterns—persistent class context, structured group organization, and clearer visibility into class activity—helped shape the Class Homepage, giving teachers and students a dedicated space to manage assignments, files, deadlines, and grades. This marked a shift from treating classrooms as meetings to supporting them as ongoing learning environments.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The ideas also extended beyond education. Concepts around group visibility and structured participation informed thinking around breakout experiences in enterprise meetings, showing how classroom-driven interaction models could scale into broader collaboration scenarios.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The original question was how to retain millions of students and educators. The answer turned out to be simpler: engagement doesn{"'"}t come from more tools. It comes from restoring the structure and social dynamics that make learning work in the first place.
        </CaseStudyParagraph>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

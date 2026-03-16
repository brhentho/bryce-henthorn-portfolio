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
          At the height of the pandemic, Microsoft Teams became critical infrastructure for education. More than 150 million students and educators were suddenly relying on it to run classrooms, collaborate, and stay connected. The growth was massive, but it was also fragile. Leadership began asking a straightforward question: how do we retain this momentum once the initial surge stabilizes?
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The initial brief focused on retention metrics. The assumption was that adding more features to Teams would keep educators and students engaged. Early discussions centered around expanding capabilities and optimizing engagement metrics. But through research with teachers and students, a different pattern began to emerge. Disengagement was not being driven by missing tools. It was being driven by the breakdown of the classroom experience itself. Students struggled to feel present in large video calls, teachers had difficulty gauging participation, and the subtle social cues that normally shape a classroom—eye contact, spatial awareness, peer interaction—had largely disappeared.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          This insight forced a strategic shift. If the core problem was the loss of classroom dynamics, simply adding more functionality would not meaningfully improve retention. The opportunity was to rethink how a virtual classroom could restore the sense of presence, visibility, and interaction that both teachers and students rely on. The retention strategy became inseparable from the user experience strategy, and the work shifted toward rebuilding the structure of the classroom experience inside Teams.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          I was a Senior UX Designer in the Microsoft Education organization, working closely with the core Teams design group to develop this proposal for leadership. My role was to advocate for the education audience within the broader Teams ecosystem. I led UX research sessions with educators and students, facilitated cross-functional ideation and concept development workshops, and translated the insights into design solutions from early wireframes through high-fidelity prototypes. The goal was to demonstrate how Teams could move beyond basic video conferencing and better support the social dynamics that make classrooms effective learning environments.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Retention strategy reframe: from feature additions to classroom dynamics" />
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
        <DiagramPlaceholder label="Breakdown of virtual classroom engagement — spatial and social gaps" />
      </CaseStudySection>

      <CaseStudySection id="research" label="Research">
        <CaseStudyHeading>Designing from real classroom behavior</CaseStudyHeading>
        <CaseStudyParagraph>
          Before designing anything, we ran extensive research with students, parents, and teachers to understand their daily experience inside Teams. I led several of these sessions to map the full day-in-the-life of both educators and students. We observed where engagement broke down, when energy dropped, and what felt emotionally uncomfortable in a virtual classroom. These sessions were not about usability tweaks. They were about understanding how it felt to spend six hours a day in small boxes on a screen.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Once we stepped back and looked at the data, a heartbreaking theme emerged. Students did not just miss content. They missed their friends. They missed social cues. They missed feeling seen. That emotional gap was the real problem.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Research synthesis: emotional themes across teachers and students" />
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
        <DiagramPlaceholder label="Pre-class material distribution flow — bandwidth constraint solution" />
      </CaseStudySection>

      <CaseStudySection id="constraints" label="Constraints & Tradeoffs">
        <CaseStudyHeading>Designing within a platform that wasn{"'"}t built for classrooms</CaseStudyHeading>
        <CaseStudyParagraph>
          Teams was an enterprise meetings tool adapted for education — and that adaptation was never seamless. The platform{"'"}s interaction patterns assumed adults who self-regulate in professional settings. Classrooms are different. Students need structure imposed by the teacher, not negotiated among peers. They need persistent identity — the same seat, the same group, the same neighbors — not ad hoc assignments. And they need social awareness that makes participation feel safe, not a grid of muted avatars where speaking up feels like a risk.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The deepest technical constraint was the breakout room infrastructure. Breakout rooms were session-based and temporary: created during a meeting, dissolved after. Virtual tables needed the opposite — persistent groups that existed before class started, carried consistent seating across sessions, and allowed teachers to prepare materials and assignments per table in advance. We had to design a persistent, spatially stable classroom experience on top of infrastructure that assumed every grouping was disposable. That tension shaped every interaction decision, from how groups were created and saved to how transitions between whole-class and table modes actually worked under the hood.
        </CaseStudyParagraph>
        <DiagramPlaceholder label="Platform constraint map: breakout room infrastructure vs. classroom persistence needs" />
      </CaseStudySection>

      <CaseStudySection id="impact" label="Impact">
        <CaseStudyHeading>Impact</CaseStudyHeading>
        <FigurePanel caption="Teachers' reactions to the Class Homepage" src="/images/projects/teams-teacher-reactions.png" className="mb-8 max-w-2xl" />
        <CaseStudyParagraph>
          The original brief focused on retention. Leadership wanted to understand how Teams could maintain engagement across the rapidly growing education audience. While the virtual tables concept was primarily explored through research and prototyping rather than a full production launch, the work was evaluated against the same core metrics: participation, instructional flow, and teacher workload.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          In usability studies and educator testing sessions, teachers consistently reported faster response times when moving between small group discussions compared to traditional breakout room workflows. Because groups were visible within a shared spatial layout, teachers could quickly scan activity and move between conversations without navigating multiple modal controls. Students also demonstrated more equitable participation patterns in smaller group settings, with quieter students contributing more frequently when discussion felt localized and less performative than a full-class call.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Although the tables experience itself did not ship as originally envisioned, the design work directly informed subsequent Teams for Education features. Many of the underlying patterns—persistent class context, spatial grouping concepts, and clearer activity visibility—helped shape the Class Homepage, a dedicated hub where teachers and students can view assignments, files, deadlines, and grades in one place. This work helped shift Teams toward supporting education workflows more holistically rather than treating classrooms as generic meetings.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The project also influenced adjacent product surfaces. Concepts around group visibility and classroom structure informed later thinking about breakout experiences in enterprise meetings, demonstrating how education-driven design insights could scale into broader collaboration scenarios.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The original question was how to retain millions of students and educators on the platform. This work reframed the answer: retention in education is not driven by feature count, but by how well the product supports the rhythms and social dynamics of a real classroom.
        </CaseStudyParagraph>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}

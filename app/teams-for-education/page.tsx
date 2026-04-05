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
        <CaseStudyHeading>School pivoted to Teams overnight</CaseStudyHeading>
        <CaseStudyParagraph>
          In 2020, Microsoft Teams became how millions of students and teachers showed up to school. Over 150 million students and educators were suddenly relying on it to run classrooms, collaborate, and stay connected. The initial mandate was simple: keep people engaged. Don{"'"}t let them leave.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We assumed more features would fix retention. We could expand capabilities, optimize engagement metrics, ship faster. Then we started talking to teachers. The issue wasn{"'"}t missing tools. It was that classrooms had no structure anymore. Students couldn{"'"}t feel present in a sea of tiles. Teachers couldn{"'"}t tell who was actually paying attention. All the subtle architecture that makes classrooms work (where you sit, who you sit next to, eye contact, spatial awareness) evaporated online.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          That forced a harder question: if the problem was structural, not tactical, could we fix it by adding features? No. We had to rebuild what school actually feels like inside a video conference tool.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          I advocated within Microsoft Education to pivot the strategy. Instead of expanding Teams, we'd redesign it around the real shape of teaching. I led research sessions with teachers and students, ran ideation workshops across engineering and product, and pushed prototypes all the way to high-fidelity. The goal wasn't to make Teams fancier. It was to make it feel like a classroom again.
        </CaseStudyParagraph>
        <MarketContextPanel />
      </CaseStudySection>

      <CaseStudySection id="problem" label="Problem">
        <CaseStudyHeading>Engagement didn't decline. It vanished.</CaseStudyHeading>
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
        <CaseStudyHeading>Research revealed what was actually broken</CaseStudyHeading>
        <CaseStudyParagraph>
          I ran sessions with students and teachers, watching their actual days unfold in Teams. Where did energy drop? When did someone check out? These weren{"'"}t usability questions. They were about what it felt like to spend six hours a day in boxes on a screen.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          The data was clear: students didn't miss the content. They missed their classmates. They missed being seen. That gap was the real wound.
        </CaseStudyParagraph>
        <ResearchSynthesisTable />
      </CaseStudySection>

      <CaseStudySection id="solution" label="Solution">
        <CaseStudyHeading>Small groups first</CaseStudyHeading>
        <CaseStudyParagraph>
          We knew the answer: teachers needed to break the all-hands classroom into smaller groups. But how do you do that without making Teams feel like a kids{"'"} learning app? Early sketches ranged from functional (just rename the breakout rooms) to absurd (cartoonish desk illustrations with tiny avatars). We needed structure without gimmick.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Through iteration, one pattern kept winning: visible seating. Give each student a fixed seat at a visible table. That simple move solved three problems at once. Teachers could see the whole classroom layout in one glance. Students knew exactly who their group was. Absence was visible, not hidden.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We designed persistent table cards in a grid. Students got assigned seats. Their avatars appeared in fixed spots. If Sarah was absent, her chair stayed empty. Teachers could take attendance in two seconds. Students knew their role in the group. No redoing assignments. No scrambling. No getting lost in the crowd.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Restrained. Professional. Real.
        </CaseStudyParagraph>
        <FigurePanel caption="The spatial classroom view with virtual tables" src="/images/projects/teams-chat.png" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="iteration" label="Classroom Orchestration">
        <CaseStudyHeading>Teachers needed to move around the room</CaseStudyHeading>
        <CaseStudyParagraph>
          Tables were just a start. The real problem was that teachers couldn't see the room anymore.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          We built a view where teachers could see all groups at once, then flow between them. Check on one table. Jump to another. Spot who was struggling. Keep the whole classroom in mind. Like actually walking around the room, except you could be in three groups at once.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          Situational awareness. The thing that made real teaching work, now possible online.
        </CaseStudyParagraph>
        <FigurePanel caption="Whole class to table transition" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig06-2YDd5QkvxbZD2b8O44R0Nag6g14UhH.mov" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="group-creation" label="Group Creation">
        <CaseStudyParagraph>
          In old Teams, teachers made breakout rooms during class. Time burned. Students waited. The lesson lost momentum.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          With persistent tables, teachers prepped groups before class started. Assigned seats. Attached materials. Class began and students were already in their groups.
        </CaseStudyParagraph>
        <CaseStudyParagraph>
          No friction. No wasted minutes. Just teaching.
        </CaseStudyParagraph>
        <FigurePanel caption="The group creation and assignment flow" videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig04-SzV8nkwmimnnyjPOiYSn8Z9J0VAp5z.mov" className="mt-8 mb-4 max-w-2xl" />
      </CaseStudySection>

      <CaseStudySection id="student-view" label="Student View">
        <CaseStudyParagraph>
          Students saw the same people every class. They had a fixed seat. Accountability shifted from the whole class to three people at their table. Speaking up became less terrifying when you're not performing for the crowd.
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
        <CaseStudyHeading>What we proved</CaseStudyHeading>
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

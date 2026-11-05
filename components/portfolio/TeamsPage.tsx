import { HeroSchematic } from "@/app/teams-for-education/svg/HeroSchematic"
import { CaseLayout } from "./CaseLayout"
import { CaseSection, Decisions, Prose, ShinyLink, Split } from "./Blocks"
import { PortfolioMedia } from "./PortfolioMedia"

const chapters = [
  { id: "context", label: "Reframing the brief" },
  { id: "research", label: "Classroom behavior" },
  { id: "solution", label: "Why persistent tables" },
  { id: "group-creation", label: "Before class" },
  { id: "orchestration", label: "During class" },
  { id: "student-view", label: "At the table" },
  { id: "teacher-control", label: "Teacher control" },
  { id: "impact", label: "What testing suggested" },
] as const

export function TeamsPage() {
  return <CaseLayout
    page="teams"
    title="A classroom needs more than a video grid."
    deck="Broadcast-style classes made participation and belonging difficult. We explored a more persistent structure for small-group learning."
    call="We reframed the retention brief around stable groups, peer conversation and teacher awareness—not more features."
    status="Tested concept · not a full release"
    ledger={[
      { label: "Role", value: "Lead interaction designer, virtual classroom" },
      { label: "Team", value: "Design, research & engineering" },
      { label: "Years", value: "2020–2021" },
      { label: "Status", value: "Tested concept; not shipped as a complete experience" },
    ]}
    hero={{
      src: "/images/teams/hero-classroom-groups.png", width: 2000, height: 1075,
      alt: "Teams classroom concept showing group rooms and the teacher's Groups management panel",
      caption: "Virtual classroom concept. Product-design artifact, not a claim of released functionality.",
    }}
    chapters={chapters}
  >
    <CaseSection id="context" title="The retention brief became a participation problem.">
      <Prose>
        <p>During the pandemic, Teams became an important classroom connection. Our brief began with retaining that growth. Research, synthesis and prototyping shifted the question: what was missing from the experience people were being asked to return to?</p>
        <p>Teachers were coordinating attendance, chat, breakout rooms and technical problems while trying to teach. Students described the discomfort of speaking to a whole-class audience and the absence of casual peer conversation. A video grid could carry a lecture, but it did not supply the structure of a classroom.</p>
      </Prose>
      <p className="pf-pull-line">A smaller audience.<br />A familiar group.<br />A place to return to.</p>
    </CaseSection>

    <CaseSection id="research" title="What students and teachers were missing." tone="paper-warm">
      <Split>
        <Prose>
          <p>We ran research sessions with students, parents and teachers, mapping the day-to-day experience inside Teams. We looked at when participation broke down, what made speaking uncomfortable, and how educators kept track of a class.</p>
          <p>The themes were practical and social. Students missed group discussions and familiar peers. Speaking in a smaller group could feel less daunting than addressing the whole class. Teachers needed to see the classroom without continually rebuilding its logistics.</p>
          <p>These are summaries of the existing research themes, not reconstructed quotations. They led us toward stable group identity and more continuity between sessions.</p>
        </Prose>
        <PortfolioMedia id="TEAMS-M02" />
      </Split>
    </CaseSection>

    <CaseSection id="solution" title="Structure without a literal classroom.">
      <Prose><p>We considered three ways to restore a sense of place. The goal was not to recreate a room on screen. It was to make groups recognizable and durable while staying native to Teams.</p></Prose>
      <Decisions items={[
        { title: "Literal classroom maps", tradeoff: "Avatars at drawn tables communicated place, but the room simulation felt gimmicky inside Teams.", disposition: "Keep the useful spatial cues, not the literal scenery." },
        { title: "Renamed breakout channels", tradeoff: "Functionally simple, but too abstract to preserve a visible sense of the group.", disposition: "Give the group a recognizable structure." },
        { title: "Persistent virtual tables", tradeoff: "Stable seats and group identity could carry context between sessions, while fitting the existing product.", disposition: "Selected for prototyping and testing—not shipped as a complete concept.", chosen: true },
      ]} />
      <figure className="pf-media pf-classroom-diagram">
        <div className="pf-media-frame"><HeroSchematic /></div>
        <figcaption className="fn-label">Fig. 02 / Conceptual classroom schematic: persistent tables, recognizable seats and a teacher’s global view. Illustrative topology, not research sample size.</figcaption>
      </figure>
      <Prose><p>Fixed positions made neighbors recognizable. Table-level discussion, shared materials and instructions were intended to persist between sessions. The next class could begin with a group’s context, instead of another round of assignments and redistribution.</p></Prose>
    </CaseSection>

    <CaseSection id="group-creation" title="Before class: prepare a place to return to." eyebrow="Teacher preparation">
      <Split>
        <Prose>
          <p>Creating breakout rooms during a meeting made group logistics part of instructional time. The concept moved that work earlier: teachers could prepare groups, assign students to seats, and attach materials or instructions before class.</p>
          <p>Persistent tables were intended to reduce the need to establish the same groups and resources at each session. Preparation became part of a continuing classroom structure rather than a one-meeting setup step.</p>
        </Prose>
        <PortfolioMedia id="teams-prepare" number="03" />
      </Split>
    </CaseSection>

    <CaseSection id="orchestration" title="During class: move together without losing the room." eyebrow="Whole class → groups">
      <Prose>
        <p>The classroom view provided a common starting point. Moving into assigned groups should change the scale of conversation without making the class feel like a collection of disconnected meetings.</p>
        <p>From the groups panel, the teacher can start discussions and see tables in progress, with Join and Stop controls available. The recording shows that orchestration layer—not the full set of moderation behaviors we considered.</p>
      </Prose>
      <PortfolioMedia id="teams-classroom" number="04" />
    </CaseSection>

    <CaseSection id="student-view" title="At the table: pick up where the group left off." eyebrow="Shared continuity">
      <Split className="pf-student-split">
        <PortfolioMedia id="teams-student" number="05" />
        <Prose>
          <p>Discussion does not stop when someone steps away. We designed entry and re-entry around enough context to orient: familiar group members, recent activity, shared materials and who was talking.</p>
          <p>A stable seat was a cue to belonging, not the entire experience. The recording shows a small-group call opening shared notes and documents from a prior class. It demonstrates access to earlier work, rather than a complete student re-entry sequence.</p>
        </Prose>
      </Split>
    </CaseSection>

    <CaseSection id="teacher-control" title="Teacher control without breaking peer conversation.">
      <Prose>
        <p>Small groups needed room for organic discussion; teachers still needed situational awareness and a way to intervene. The design intent was to make observation and supported moderation available from a global view without unnecessarily pulling students out of context.</p>
        <p>Starting, joining and stopping groups are visible in the orchestration recording. More specific interventions—such as muting, redirecting or flagging—were part of the design discussion. They remain distinct from those demonstrated controls and need their own supporting artifact.</p>
      </Prose>
      <PortfolioMedia id="TEAMS-M01" />
    </CaseSection>

    <CaseSection id="impact" title="What testing suggested. What did not ship.">
      <div className="pf-outcome-note">
        <p className="fn-label">Tested concept / not a complete shipped experience</p>
        <Prose>
          <p>Concept testing suggested that stable groups and a smaller audience were a useful direction for participation, while the global classroom view addressed teacher awareness. These are qualitative findings from the concept work, not measured improvements in retention, speed or engagement.</p>
          <p>The full virtual-tables experience did not ship as designed. Persistent class context, structured groups and clearer participation remained useful design questions, but this case does not claim a verified lineage to later releases.</p>
          <p>The lasting shift in the brief was from adding features to designing the conditions for conversation. Structure and social connection became part of the retention hypothesis—not a proven retention outcome.</p>
        </Prose>
      </div>
      <nav className="pf-next" aria-label="Next case"><ShinyLink href="/agents-in-windows">Agents in Windows</ShinyLink></nav>
    </CaseSection>
  </CaseLayout>
}

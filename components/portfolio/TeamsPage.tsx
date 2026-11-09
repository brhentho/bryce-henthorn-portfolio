import { HeroSchematic } from "@/app/teams-for-education/svg/HeroSchematic"
import { CaseLayout } from "./CaseLayout"
import { CaseSection, Decisions, Prose, ShinyLink, Split } from "./Blocks"
import { PortfolioMedia } from "./PortfolioMedia"
import { TeamsClassroomCover } from "./TeamsClassroomIllustrations"

const chapters = [
  { id: "context", label: "Reframing the brief" },
  { id: "research", label: "Classroom behavior" },
  { id: "solution", label: "Why persistent tables" },
  { id: "group-creation", label: "Before class" },
  { id: "orchestration", label: "During class" },
  { id: "student-view", label: "At the table" },
  { id: "teacher-control", label: "Teacher control" },
  { id: "impact", label: "What we learned" },
] as const

export function TeamsPage() {
  return <CaseLayout
    page="teams"
    title="A classroom needs more than a video grid."
    deck="Broadcast-style classes made participation and belonging difficult. We explored a more persistent structure for small-group learning."
    call="We reframed the retention brief around stable groups, peer conversation and teacher awareness—not more features."
    status="Tested concept"
    ledger={[
      { label: "Role", value: "Lead interaction designer, virtual classroom" },
      { label: "Team", value: "Design, research & engineering" },
      { label: "Years", value: "2020–2021" },
      { label: "Status", value: "Prototype and concept testing" },
    ]}
    hero={{
      src: "/images/teams/hero-classroom-groups.png", width: 2000, height: 1075,
      alt: "Teams classroom concept showing group rooms and the teacher's Groups management panel",
      caption: "Virtual classroom concept with persistent groups and a teacher’s overview.",
    }}
    chapters={chapters}
  >
    <CaseSection id="context" title="The retention brief became a participation problem.">
      <div className="pf-teams-scale">
        <p className="pf-teams-scale-number">150M+</p>
        <p>Students and educators on Teams during the pandemic</p>
      </div>
      <Prose>
        <p>During the pandemic, Teams became an important classroom connection. Our brief began with retaining that growth. Research, synthesis and prototyping shifted the question: what was missing from the experience people were being asked to return to?</p>
        <p>Teachers were coordinating attendance, chat, breakout rooms and technical problems while trying to teach. Students described the discomfort of speaking to a whole-class audience and the absence of casual peer conversation. A video grid could carry a lecture, but it did not supply the structure of a classroom.</p>
      </Prose>
      <TeamsClassroomCover />
    </CaseSection>

    <CaseSection id="research" title="Small groups made participation easier." tone="paper-warm">
      <Prose>
        <p>Teachers identified group projects and discussions as valuable ways to build critical thinking, creativity, collaboration and communication. Student sessions made the social need equally clear: people missed learning with their peers, not just watching a lesson.</p>
      </Prose>
      <figure className="pf-teams-evidence" data-pf-reveal="reading">
        <div className="pf-teams-evidence-grid">
          <div className="pf-teams-evidence-stat">
            <p className="pf-teams-evidence-number">~70%</p>
            <p>of teachers preferred their existing school platform for group work.</p>
            <p className="fn-label">K–12 teacher survey / February 2020</p>
          </div>
          <div>
            <p className="fn-label">Student sessions</p>
            <h3>A smaller audience.</h3>
            <p>Speaking up felt easier in a small group. There was less overlap, less awkward silence, and more room to take a turn.</p>
          </div>
          <div>
            <p className="fn-label">Student sessions</p>
            <h3>A sense of belonging.</h3>
            <p>Students missed group activities, talking with friends, and feeling part of a class—not simply being present on a call.</p>
          </div>
        </div>
      </figure>
      <Prose><p>We needed to keep collaboration inside the class’s existing workflow while making the group itself recognizable. That pointed toward a place people could return to, rather than a new set of meeting controls.</p></Prose>
    </CaseSection>

    <CaseSection id="solution" title="Structure without a literal classroom.">
      <Prose><p>We considered three ways to restore a sense of place. The goal was not to recreate a room on screen. It was to make groups recognizable and durable while staying native to Teams.</p></Prose>
      <Decisions items={[
        { title: "Literal classroom maps", tradeoff: "Avatars at drawn tables communicated place, but the room simulation felt gimmicky inside Teams.", disposition: "Keep the useful spatial cues, not the literal scenery." },
        { title: "Renamed breakout channels", tradeoff: "Functionally simple, but too abstract to preserve a visible sense of the group.", disposition: "Give the group a recognizable structure." },
        { title: "Persistent virtual tables", tradeoff: "Stable seats and group identity could carry context between sessions, while fitting the existing product.", disposition: "Selected for prototyping and testing.", chosen: true },
      ]} />
      <figure className="pf-media pf-classroom-diagram">
        <div className="pf-media-frame"><HeroSchematic /></div>
      </figure>
      <Prose><p>Fixed positions made neighbors recognizable. Table-level discussion, shared materials and instructions were intended to persist between sessions. The next class could begin with a group’s context, instead of another round of assignments and redistribution.</p></Prose>
    </CaseSection>

    <CaseSection id="group-creation" title="Before class: prepare a place to return to." eyebrow="Teacher preparation">
      <Split>
        <Prose>
          <p>The teacher survey described group work at the scale of projects, classes and longer periods—not only the call currently open. We designed the table as a continuing home for the group and its work.</p>
          <p>Teachers could prepare groups, assign students to seats, and attach materials or instructions before class. Preparation became part of a continuing classroom structure rather than a one-meeting setup step.</p>
        </Prose>
        <PortfolioMedia id="teams-prepare" number="03" />
      </Split>
    </CaseSection>

    <CaseSection id="orchestration" title="During class: move together without losing the room." eyebrow="Whole class → groups">
      <Prose>
        <p>The classroom view provided a common starting point. Moving into assigned groups should change the scale of conversation without making the class feel like a collection of disconnected meetings.</p>
        <p>From the groups panel, the teacher can start discussions and see tables in progress, with Join and Stop controls available.</p>
      </Prose>
      <PortfolioMedia id="teams-classroom" number="04" />
    </CaseSection>

    <CaseSection id="student-view" title="At the table: pick up where the group left off." eyebrow="Shared continuity">
      <Split className="pf-student-split">
        <PortfolioMedia id="teams-student" number="05" />
        <Prose>
          <p>The experience reviews surfaced another kind of fragmentation: plenty of ways to take notes, but no clear place to return to them. We gave shared notes and materials a home at the table, alongside the people using them.</p>
          <p>The recording shows a group opening notes and documents from a prior class. A stable group could carry its work forward, rather than starting each session from scratch.</p>
        </Prose>
      </Split>
    </CaseSection>

    <CaseSection id="teacher-control" title="Teacher control without breaking peer conversation.">
      <Prose>
        <p>Small groups needed room for organic discussion; teachers still needed awareness of the class. Reviews of the meeting experience showed how easily that awareness could be lost across panels and controls.</p>
      </Prose>
      <dl className="pf-teams-findings" data-pf-reveal="reading">
        <div><dt>Chat and participants competed for space.</dt><dd>Teachers had to switch between the two. The classroom concept needed a persistent overview instead of another hidden meeting pane.</dd></div>
        <div><dt>Presenting could hide the students.</dt><dd>The review called out lost visibility while screen-sharing. We treated teacher awareness as a first-class part of the classroom view.</dd></div>
        <div><dt>Controls lived in different places.</dt><dd>The groups panel brought status, Join and Stop together, making the teacher’s next action easier to locate.</dd></div>
      </dl>
      <p className="fn-label">Source / Meeting-experience reviews, 2019–2021</p>
      <Prose><p>Starting, joining and stopping groups are visible in the recording. More specific interventions, such as muting or redirecting, remained part of the design exploration.</p></Prose>
    </CaseSection>

    <CaseSection id="impact" title="What carried forward.">
      <Split className="pf-teams-impact">
        <Prose>
          <p>Concept testing suggested that stable groups and a smaller audience helped students speak up. Teachers could move between groups and notice students who needed support, without losing their view of the class.</p>
          <p>The full virtual-tables experience did not ship as designed. But the research informed Class Home Page: a persistent starting point for class resources, assignments and schedules.</p>
          <p>The lasting shift was from adding meeting features to creating the conditions for learning: shared context, social connection and a place to return to.</p>
        </Prose>
        <PortfolioMedia id="teams-class-home" number="06" sizes="(max-width: 850px) 92vw, 45vw" />
      </Split>
      <div className="pf-teams-reception">
        <h3>A clearer home for the class.</h3>
        <p className="pf-caption">Educators welcomed Class Home Page. These public reactions are to that experience, not the virtual-tables concept.</p>
        <div className="pf-teams-reaction-grid">
          <PortfolioMedia id="teams-reaction-kim" sizes="(max-width: 850px) 88vw, 45vw" />
          <PortfolioMedia id="teams-reaction-ellis" sizes="(max-width: 850px) 88vw, 45vw" />
          <PortfolioMedia id="teams-reaction-megan" sizes="(max-width: 850px) 88vw, 45vw" />
          <PortfolioMedia id="teams-reaction-madeline" sizes="(max-width: 850px) 88vw, 45vw" />
        </div>
      </div>
      <nav className="pf-next" aria-label="Next case"><ShinyLink href="/agents-in-windows">Agents in Windows</ShinyLink></nav>
    </CaseSection>
  </CaseLayout>
}

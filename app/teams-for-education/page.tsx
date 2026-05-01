import Image from "next/image"
import { ManualShell } from "../recall/ManualShell"
import {
  RevisionHeader,
  SectionLabel,
  SpecSheet,
  Figure,
  Telemetry,
  Margin,
} from "@/components/manual"

const STUDENT_QUOTES = [
  {
    quote:
      "I'm not that good in math so when we go back to in-person learning I'm looking forward to group discussions",
    name: "Phillip, grade 12",
  },
  {
    quote:
      "When I'm at home I don't feel like I'm in class. I'm looking forward to having the feeling that I'm in school and I'm in class and having that dynamic with teachers to talk to them after class or just have a physical connection rather than through a screen.",
    name: "Liana, grade 12",
  },
  {
    quote:
      "Most of my teachers randomly put us in breakout rooms and sometimes it's a really quiet room. But for me it's less awkward to break that silence than try to break a silence of over 30 kids in a class because I would rather talk to a group of 5 kids than 30 people. When you're in smaller breakout rooms it's easier. It's just a bigger audience thing for me.",
    name: "Karen, grade 12",
  },
  {
    quote:
      "I'm looking forward to going back to in person learning for the group activities, I liked working with my peers. For virtual group classes, it just felt good to see my friends and we can actually talk and stuff like that.",
    name: "Khalia, grade 12",
  },
]

export default function TeamsForEducationPage() {
  return (
    <ManualShell>
      <RevisionHeader rev="2.4" date="April 2026" name="Bryce Henthorn" doc="Teams for Education" />

      <main className="container">
        {/* ── Hero ── */}
        <section data-section id="overview" className="pt-12 lg:pt-24 pb-16">
          <p className="t-mono-label mb-6">§ 00 / OVERVIEW</p>
          <h1 className="t-display-xl max-w-[20ch]">Teams for Education</h1>
          <p className="t-body lede mt-6 max-w-[60ch] text-[color:var(--text-secondary)]">
            COVID brought millions of new students to online classrooms. Teams scaled.
            Engagement collapsed. We rebuilt the virtual classroom around structure
            instead of features.
          </p>
        </section>

        {/* ── Spec sheet ── */}
        <section data-section data-reveal id="spec" className="py-8">
          <SpecSheet
            rows={[
              { label: "ROLE",     value: "Lead interaction designer, virtual classroom" },
              { label: "PLATFORM", value: "Microsoft Teams for Education" },
              { label: "TIMELINE", value: "2020 – 2021" },
              { label: "TEAM",     value: "Cross-functional team of design, research, and engineering" },
              { label: "MY FOCUS", value: "Classroom orchestration, virtual tables, teacher controls" },
              { label: "STATUS",   value: "Patterns shipped; concept influenced future Teams direction" },
            ]}
          />
        </section>

        {/* ── 01 Context ── */}
        <section data-section data-reveal id="context" className="py-12 lg:py-20">
          <SectionLabel
            number="01"
            label="Context"
            title="COVID brought millions of new students to online classrooms"
          />
          <div className="mt-12">
            <Telemetry
              items={[
                { value: "150M+", unit: "USERS",     label: "Students and educators on Teams during the pandemic" },
                { value: "30+",   unit: "PER CLASS", label: "Grid scale where structure breaks down" },
                { value: "6",     unit: "HOURS/DAY", label: "Time students spent inside the grid" },
              ]}
            />
          </div>
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                At the height of the pandemic, Microsoft Teams became a lifeline for
                education, used by over 150 million students and educators worldwide.
                Growth was massive, but it was fragile. Our team was tasked with figuring
                out how to retain it.
              </p>
              <p className="t-body">
                The initial ask was about growth metrics, specifically how to keep the
                numbers up. But through a rigorous design process loop of research,
                synthesis, and prototyping, we discovered that the real lever for
                retention wasn&apos;t feature additions.
              </p>
              <p className="t-body">
                That reframing changed everything. Instead of optimizing for adoption
                metrics, we focused on what was actually breaking down in the virtual
                classroom experience.
              </p>
              <p className="t-body">
                The retention strategy became inseparable from the user experience
                strategy. My role centered on leading that design process and shaping the
                interaction patterns that emerged from it.
              </p>
            </div>
          </div>
        </section>

        {/* ── 02 Problem ── */}
        <section data-section data-reveal id="problem" className="py-12 lg:py-20">
          <SectionLabel
            number="02"
            label="Problem"
            title="Engagement collapsed when classrooms went virtual"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Teachers became operators, not educators. They managed attendance, read
                chat, spun up breakout rooms, debugged audio problems, and lectured all at
                once. Reading the room meant staring at a grid of boxes and guessing who
                was actually there.
              </p>
              <p className="t-body">
                Students retreated. Raising your hand meant speaking to thirty people at
                once, into dead silence, with no response. There were no whispered
                questions to a neighbor. No one to nudge you back into focus. So most just
                turned off their cameras.
              </p>
              <p className="t-body">
                In person, schools have architecture. Small groups, seating arrangements,
                a teacher moving through the room. Learning happens in conversation.
                Online, it collapsed into broadcast.
              </p>
              <p className="t-body">
                Teachers couldn&apos;t see who was falling behind. Students couldn&apos;t
                feel like part of a group. The system worked for lecturing. It failed at
                learning.
              </p>
            </div>
            <Margin anchor="2-pull">
              The system worked for lecturing. It failed at learning.
            </Margin>
          </div>

          <h3 className="t-mono-label mt-16 mb-6">FIELD INTERVIEWS &middot; STUDENT VOICES</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 border-t border-[color:var(--rule)] pt-6">
            {STUDENT_QUOTES.map((q) => (
              <blockquote
                key={q.name}
                className="border-l-2 border-[color:var(--rule-strong)] pl-4 py-2"
              >
                <p className="t-body text-[color:var(--text-primary)]">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer className="t-mono-label mt-3 text-[color:var(--text-tertiary)]">
                  &mdash; {q.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* ── 03 Research ── */}
        <section data-section data-reveal id="research" className="py-12 lg:py-20">
          <SectionLabel
            number="03"
            label="Research"
            title="Designing from real classroom behavior"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Before designing anything, we ran extensive research with students,
                parents, and teachers to understand their daily experience inside Teams.
                I led several of these sessions to map the full day-in-the-life of both
                educators and students.
              </p>
              <p className="t-body">
                We observed where engagement broke down, when energy dropped, and what
                felt emotionally uncomfortable in a virtual classroom. These sessions were
                not about usability tweaks. They were about understanding how it felt to
                spend six hours a day in small boxes on a screen.
              </p>
            </div>
          </div>
          <Figure
            number="3.1"
            caption="Co-design session with educators — mapping the tools needed for a successful virtual class"
            src="/images/projects/teams-cocreation.png"
            alt="Co-design session with educators"
            width={1600}
            height={900}
          />
        </section>

        {/* ── 04 Solution ── */}
        <section data-section data-reveal id="solution" className="py-12 lg:py-20">
          <SectionLabel
            number="04"
            label="Solution"
            title="Reintroducing structure without turning Teams into a cartoon classroom"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                We explored three directions. The first was too literal — full classroom
                maps with avatars at drawn tables. It was playful but felt gimmicky inside
                an enterprise tool. The second was too abstract — purely functional
                renamed breakout channels that lost the spatial awareness that made the
                concept work.
              </p>
              <p className="t-body">
                The third struck the right balance: virtual tables. Persistent table cards
                in a grid with fixed seats, visible neighbors, and stable group identity.
              </p>
              <p className="t-body">
                We designed persistent table cards arranged in a grid. Students sat in
                fixed positions within these tables, with their avatars resting in
                consistent seats. This approach restored spatial awareness without
                sacrificing clarity. It was structured enough to feel real, but restrained
                enough to feel native inside Teams.
              </p>
              <p className="t-body">
                There was a harder tension underneath the table design. Teachers needed
                moderation controls — the ability to mute, redirect, or flag — but
                heavy-handed moderation kills exactly the kind of organic peer discussion
                that makes small groups work. We designed moderation to be ambient rather
                than disruptive. Teachers could observe and intervene from the global view
                without pulling students out of context or signaling to the whole group
                that someone was being corrected. Control stayed with the teacher. The
                conversation stayed with the students.
              </p>
            </div>
            <Margin anchor="4-pull">
              Control stayed with the teacher. The conversation stayed with the students.
            </Margin>
          </div>
          <Figure
            number="4.1"
            caption="Virtual tables concept — Teams classroom with students grouped at named tables"
            src="/images/projects/teams-fig02.png"
            alt="Virtual tables concept in Teams"
            width={1600}
            height={900}
          />
        </section>

        {/* ── 05 Orchestration ── */}
        <section data-section data-reveal id="orchestration" className="py-12 lg:py-20">
          <SectionLabel
            number="05"
            label="Orchestration"
            title="Giving teachers the room back"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Virtual tables were only part of the solution. The real breakthrough was
                enabling teachers to manage the room naturally.
              </p>
              <p className="t-body">
                Teachers could start table discussions and monitor the classroom from a
                global view. From there, they could move fluidly between groups, almost
                like walking around a physical classroom.
              </p>
              <p className="t-body">
                This orchestration layer restored something subtle but powerful:
                situational awareness. Instead of fragmented breakout rooms, teachers had
                a cohesive classroom again.
              </p>
              <p className="t-body">
                Discussions don&apos;t pause when someone steps away. A student drops off
                for a minute, reconnects late, or gets moved between tables. They land in
                a conversation that&apos;s already moving. The system needed to handle
                that without making the returning student feel lost or forcing the group
                to restart. We designed re-entry to surface enough context — recent
                discussion activity, shared materials, who&apos;s currently talking — so a
                student could orient and join without interrupting the flow already
                happening.
              </p>
            </div>
          </div>
          <Figure number="5.1" caption="Student view of their virtual table">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="block w-full h-auto"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig06-2YDd5QkvxbZD2b8O44R0Nag6g14UhH.mov"
            />
          </Figure>
        </section>

        {/* ── 06 Group Creation ── */}
        <section data-section data-reveal id="group-creation" className="py-12 lg:py-20">
          <SectionLabel
            number="06"
            label="Group Creation"
            title="Preparation moves outside the meeting"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Previously, breakout rooms had to be created dynamically during the
                meeting. That meant instructional time was lost while groups were assigned
                and logistics were sorted out.
              </p>
              <p className="t-body">
                With virtual tables, teachers could set groups before class. They could
                assign students to consistent seats and attach materials or instructions
                to each table in advance. When class began, students entered their
                assigned groups immediately.
              </p>
              <p className="t-body">
                This made attendance easier, transitions smoother, and the start of class
                far more focused. Preparation moved outside the meeting, which allowed
                learning to begin without friction.
              </p>
              <p className="t-body">
                Persistence went beyond seating assignments. Discussion threads, shared
                materials, and group context carried forward between class sessions so the
                next meeting didn&apos;t start cold. Students returned to a table that
                remembered where they left off. Teachers didn&apos;t have to re-establish
                groups or redistribute resources every session. That continuity turned
                virtual tables from a single-meeting feature into a classroom structure
                that accumulated meaning over time.
              </p>
            </div>
          </div>
          <Figure number="6.1" caption="Whole class to table transitions">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="block w-full h-auto"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig04-SzV8nkwmimnnyjPOiYSn8Z9J0VAp5z.mov"
            />
          </Figure>
        </section>

        {/* ── 07 Student View ── */}
        <section data-section data-reveal id="student-view" className="py-12 lg:py-20">
          <SectionLabel
            number="07"
            label="Student View"
            title="Reinforcing belonging"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                From the student perspective, the experience reinforced belonging. They
                saw familiar group members, recognized their seat, and felt accountable to
                the people around them. That subtle shift made participation feel
                manageable again.
              </p>
            </div>
          </div>
          <Figure number="7.1" caption="Group creation and assignment flow">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="block w-full h-auto"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig05-P8cWRCiwt0bUCrucyij7Dh4KVxwhDT.mov"
            />
          </Figure>
        </section>

        {/* ── 08 Bandwidth ── */}
        <section data-section data-reveal id="bandwidth" className="py-12 lg:py-20">
          <SectionLabel
            number="08"
            label="Bandwidth"
            title="Not all home internet is equal"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Many students were using shared home networks. Older devices. Spotty
                connections. When teachers handed out materials mid-lesson, students with
                slow internet got left behind while files loaded.
              </p>
              <p className="t-body">
                Persistent tables fixed this structurally. Teachers attached materials to
                each table before class. Students could open files as soon as they sat
                down, not when the teacher shared them.
              </p>
              <p className="t-body">
                Small change. Huge impact. Teaching time didn&apos;t pause for tech
                problems.
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 Impact ── */}
        <section data-section data-reveal id="impact" className="py-12 lg:py-20">
          <SectionLabel
            number="09"
            label="Impact"
            title="What we learned"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Testing showed what mattered. Teachers moved between groups faster. They
                spotted struggling students quicker. And most important: students spoke up
                more often when they weren&apos;t performing for thirty people.
              </p>
              <p className="t-body">
                The full virtual tables concept didn&apos;t ship exactly as designed. But
                the patterns lived on. Persistent class context. Structured groups.
                Clearer visibility into participation.
              </p>
              <p className="t-body">
                The work stretched beyond education too. How small groups get visibility
                in enterprise meetings. How structured participation scales when you have
                more than thirty people in a call.
              </p>
              <p className="t-body">
                Retention turned out to be simple. It doesn&apos;t come from more
                features. It comes from the same thing physical classrooms are built on:
                structure. Social connection. Being seen.
              </p>
            </div>
            <Margin anchor="9-pull">
              Retention doesn&rsquo;t come from more features. It comes from structure.
            </Margin>
          </div>
        </section>

        <footer className="border-t border-[color:var(--rule)] py-8 mt-16 flex flex-wrap items-baseline justify-between gap-4">
          <p className="t-mono-caption text-[color:var(--text-tertiary)]">
            END OF DOCUMENT &middot; REV. 2.4
          </p>
          <p className="t-mono-caption">
            <span className="text-[color:var(--text-tertiary)]">NEXT &rarr; </span>
            <a
              href="/about"
              className="text-[color:var(--text-primary)] underline decoration-[color:var(--rule-strong)] underline-offset-[0.25em]"
            >
              About
            </a>
          </p>
        </footer>
      </main>
    </ManualShell>
  )
}

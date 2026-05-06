import Image from "next/image"
import { ManualShell } from "../recall/ManualShell"
import {
  SectionLabel,
  SpecSheet,
  Figure,
  Telemetry,
  Margin,
  TopBar,
  ManualFooter,
  CoverPlate,
  HeroIntro,
} from "@/components/manual"
import { HeroSchematic } from "./svg/HeroSchematic"

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
      <TopBar />

      <main className="container">
        {/* ── Hero ── */}
        <section data-section id="overview" className="pt-12 lg:pt-24 pb-16">
          <HeroIntro
            eyebrow="§ 00 / TEAMS FOR EDUCATION"
            eyebrowClassName="t-mono-label mb-10"
            lines={[
              {
                text: "Modernizing online classes for an authentic virtual experience.",
                className: "t-display-xl max-w-[24ch]",
              },
            ]}
          />
          <Figure
            number="0.1"
            caption="Microsoft Teams classroom view — students grouped at virtual tables with the moderation panel surfacing on the right"
            src="/images/teams/hero-demo.png"
            alt="Microsoft Teams classroom view — virtual tables of students with avatars and chat moderation panel"
            width={1024}
            height={405}
            priority
          />
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

        {/* ── Interlude (§2.11) — promoted from § 02 Margin ── */}
        <aside
          data-reveal
          id="problem-interlude"
          aria-labelledby="problem-interlude-quote"
          className="my-12 lg:my-20 py-16 lg:py-24 border-y border-[color:var(--rule)]"
        >
          <p className="t-mono-label mb-8 text-[color:var(--text-tertiary)]">
            INTERLUDE
          </p>
          <blockquote className="max-w-[68ch]">
            <p
              id="problem-interlude-quote"
              className="t-display-l text-[color:var(--text-primary)]"
            >
              The system worked for lecturing. It failed at learning.
            </p>
            <footer className="t-mono-caption mt-8 text-[color:var(--text-tertiary)]">
              Cf. § 02 / PROBLEM
            </footer>
          </blockquote>
        </aside>

        {/* ── Cover Plate (§2.10) — chapter divider into Research ── */}
        <CoverPlate number="03" total="09" title="Research" />

        {/* ── 03 Research ── Annotated Split Plate (§2.4) ── */}
        <section data-section data-reveal id="research" className="py-12 lg:py-20">
          <SectionLabel
            number="03"
            label="Research"
            title="Designing from real classroom behavior"
          />
          <div className="mt-10 border border-[color:var(--rule)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] space-y-6">
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
            <div className="p-6 lg:p-10 flex items-start">
              <Figure
                number="3.1"
                caption="Co-design session with educators — mapping the tools needed for a successful virtual class"
                src="/images/projects/teams-cocreation.png"
                alt="Co-design session with educators"
                width={1600}
                height={900}
                className="my-0"
              />
            </div>
          </div>
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
            caption="Top-down virtual classroom in a 3×2 grid, six tables with persistent seats"
          >
            <HeroSchematic />
          </Figure>
        </section>

        {/* ── 05 Orchestration ── Full-bleed Atmospheric Plate (§2.8) ── */}
        <section data-section data-reveal id="orchestration" className="py-12 lg:py-20">
          <SectionLabel
            number="05"
            label="Orchestration"
            title="Giving teachers the room back"
          />

          {/* Tight 2-paragraph body above */}
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Virtual tables were only part of the solution. Teachers could start table
                discussions and monitor the classroom from a global view, moving fluidly
                between groups almost like walking around a physical classroom. The
                orchestration layer restored situational awareness — a cohesive classroom
                again instead of fragmented breakout rooms.
              </p>
              <p className="t-body">
                Discussions don&apos;t pause when someone steps away. We designed
                re-entry to surface enough context — recent activity, shared materials,
                who&apos;s talking — so a student could orient and join without
                interrupting the flow already happening.
              </p>
            </div>
          </div>

          {/* Full-bleed video — the demo carries the argument */}
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

        {/* ── 06 Group Creation ── Annotated Split Plate (§2.4) ── */}
        <section data-section data-reveal id="group-creation" className="py-12 lg:py-20">
          <SectionLabel
            number="06"
            label="Group Creation"
            title="Preparation moves outside the meeting"
          />
          <div className="mt-10 border border-[color:var(--rule)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] space-y-6">
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
            <div className="p-6 lg:p-10 flex items-start">
              <Figure
                number="6.1"
                caption="Whole class to table transitions"
                className="my-0"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="block w-full h-auto"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig04-SzV8nkwmimnnyjPOiYSn8Z9J0VAp5z.mov"
                />
              </Figure>
            </div>
          </div>
        </section>

        {/* ── 07 Student View ── Pull-quote Interlude (§2.11) + small inline figure ── */}
        <section data-section data-reveal id="student-view" className="py-12 lg:py-20">
          <SectionLabel
            number="07"
            label="Student View"
            title="Reinforcing belonging"
          />

          {/* Pull-quote — compresses the section's single-paragraph body */}
          <div className="mt-10 lg:mt-14 py-12 lg:py-20 border-y border-[color:var(--rule)]">
            <blockquote className="max-w-[68ch]">
              <p className="t-display-l text-[color:var(--text-primary)]">
                Familiar group members. A recognized seat. Accountability to the people
                around them.
              </p>
              <footer className="t-mono-caption mt-8 text-[color:var(--text-tertiary)]">
                Cf. § 07 / STUDENT VIEW
              </footer>
            </blockquote>
          </div>

          {/* Small inline framed figure beneath — not full-bleed */}
          <div className="mt-10 lg:mt-14 max-w-[80ch]">
            <Figure
              number="7.1"
              caption="Group creation and assignment flow"
              className="my-0"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="block w-full h-auto"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teams_fig05-P8cWRCiwt0bUCrucyij7Dh4KVxwhDT.mov"
              />
            </Figure>
          </div>
        </section>

        {/* ── Cover Plate (§2.10) — closing chapter divider into Impact ── */}
        <CoverPlate number="09" total="09" title="Impact" />

        {/* ── 09 Impact ── (§08 deliberately skipped to mirror Figma) ── */}
        <section data-section data-reveal id="impact" className="py-12 lg:py-20">
          <SectionLabel
            number="09"
            label="Impact"
            title="What we learned"
          />
          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="flex flex-col gap-6 max-w-[68ch]">
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
              <aside className="t-mono-marginalia border-l border-[color:var(--rule)] pl-4 mt-2 max-w-prose">
                Retention doesn&rsquo;t come from more features. It comes from structure.
              </aside>
            </div>
            <div className="flex items-start lg:pl-4">
              <Image
                src="/images/teams/impact-tweets.png"
                alt="Four educator tweets reacting to the new Class Home Page in Microsoft Teams — Kim Landtroop, Ellis J, Megan Townes, Madeline Cooney"
                width={530}
                height={612}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

      </main>
      <ManualFooter />
    </ManualShell>
  )
}

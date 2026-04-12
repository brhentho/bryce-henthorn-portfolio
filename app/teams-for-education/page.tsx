'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NavEditorial } from '@/components/editorial/NavEditorial'
import { Section } from '@/components/editorial/Section'
import { Grid12 } from '@/components/editorial/Grid12'
import { GlassCard } from '@/components/editorial/GlassCard'
import { Glow } from '@/components/atmosphere/Glow'
import { DotGrid } from '@/components/atmosphere/DotGrid'
import { EdgeLine } from '@/components/atmosphere/EdgeLine'
import { Vignette } from '@/components/atmosphere/Vignette'
import { Placeholder } from '@/components/placeholder/Placeholder'

/* ═══════════════════════════════════════════════════════════════
   TEAMS FOR EDUCATION
   Accent: --a: #6C63FF (indigo) + --a2: #FF8B6A (coral)
   Deliberately varied layouts
   ═══════════════════════════════════════════════════════════════ */

export default function TeamsForEducationPage() {
  return (
    <div style={{ '--a': '#6C63FF', '--a2': '#FF8B6A' } as React.CSSProperties}>
      <NavEditorial />
      <main>
        <TeamsHero />
        <TeamsContext />
        <TeamsProblem />
        <TeamsResearch />
        <TeamsSolution />
        <TeamsOrchestration />
        <TeamsGroupCreation />
        <TeamsStudentView />
        <TeamsBandwidth />
        <TeamsConstraints />
        <TeamsImpact />
      </main>
      <TeamsFooter />
    </div>
  )
}

function fade(show: boolean, delay: string, tr: string): React.CSSProperties {
  return { opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)', transition: tr, transitionDelay: delay }
}

/* ── 1. Hero — CENTERED (breaks pattern) ── */
function TeamsHero() {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), 100); return () => clearTimeout(t) }, [])
  const tr = 'opacity 1s var(--expo), transform 1s var(--expo)'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image src="/images/heroes/TeamsProjectHero.jpg" alt="" fill priority className="object-cover" style={{ opacity: show ? 1 : 0, transition: 'opacity 1.2s var(--expo)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,6,10,0.85) 0%, rgba(6,6,10,0.3) 40%, rgba(6,6,10,0.85) 100%)' }} />
      <Glow color="#6C63FF" size="45%" top="35%" left="35%" opacity={0.05} />
      <Glow color="#FF8B6A" size="40%" top="55%" left="65%" opacity={0.04} />
      <Vignette />

      <div className="relative z-10 text-center" style={{ padding: 'var(--pad)', maxWidth: '800px' }}>
        <div className="flex flex-wrap justify-center gap-2 mb-6" style={{ opacity: show ? 1 : 0, transition: 'opacity 0.8s var(--expo)', transitionDelay: '0.2s' }}>
          {['UX Strategy', 'Microsoft Teams', 'Senior Designer', '2020'].map((tag) => (
            <span key={tag} className="t-mono px-3 py-1 rounded-full" style={{ border: '1px solid var(--w06)', color: 'var(--w20)' }}>{tag}</span>
          ))}
        </div>
        <span className="t-label block mb-3" style={{ color: '#6C63FF', opacity: 0.6, ...fade(show, '0.2s', tr) }}>Teams for Education</span>
        <h1 className="t-display" style={fade(show, '0.3s', tr)}>Modernizing Online Classes For An Authentic Virtual Experience</h1>
      </div>
    </section>
  )
}

/* ── 2. Context — Big stat opener + two-column ── */
function TeamsContext() {
  return (
    <Section id="context" padding="py-24 md:py-32">
      <Glow color="#6C63FF" size="40%" top="20%" left="50%" opacity={0.03} />

      {/* Big stat */}
      <div className="text-center mb-16">
        <span className="t-display" style={{ fontSize: 'clamp(64px, 10vw, 140px)', fontWeight: 300, color: 'var(--w88)' }}>
          150M<span style={{ color: '#6C63FF', opacity: 0.5 }}>+</span>
        </span>
        <p className="t-label mt-3">Students and educators on Teams during the pandemic</p>
      </div>

      <Grid12>
        <div style={{ gridColumn: '1 / 13', marginBottom: '32px' }}>
          <span className="t-label block mb-4" style={{ color: '#6C63FF', opacity: 0.5 }}>Context</span>
          <h2 className="t-heading">COVID brought millions of new students to online classrooms</h2>
        </div>
      </Grid12>

      <Grid12>
        <div style={{ gridColumn: '1 / 7' }}>
          <p className="t-body mb-4">At the height of the pandemic, Microsoft Teams became a lifeline for education, used by over 150 million students and educators worldwide. Growth was massive, but it was fragile. Our team was tasked with figuring out how to retain it.</p>
          <p className="t-body">The initial ask was about growth metrics, specifically how to keep the numbers up. But through a rigorous design process loop of research, synthesis, and prototyping, we discovered that the real lever for retention wasn&apos;t feature additions.</p>
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <p className="t-body mb-4">That reframing changed everything. Instead of optimizing for adoption metrics, we focused on what was actually breaking down in the virtual classroom experience.</p>
          <p className="t-body">The retention strategy became inseparable from the user experience strategy. My role centered on leading that design process and shaping the interaction patterns that emerged from it.</p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 3. Problem — Narrative + atmospheric images ── */
function TeamsProblem() {
  return (
    <Section id="problem" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#FF8B6A" size="45%" top="40%" left="60%" opacity={0.03} />
      <DotGrid mask />

      <Grid12>
        <div style={{ gridColumn: '2 / 10', marginBottom: '48px' }}>
          <span className="t-label block mb-4" style={{ color: '#FF8B6A', opacity: 0.5 }}>Problem</span>
          <h2 className="t-heading mb-6">Engagement collapsed when classrooms went virtual</h2>
          <p className="t-body mb-4">Teachers became operators, not educators. They managed attendance, read chat, spun up breakout rooms, debugged audio problems, and lectured all at once. Reading the room meant staring at a grid of boxes and guessing who was actually there.</p>
          <p className="t-body mb-4">Students retreated. Raising your hand meant speaking to thirty people at once, into dead silence, with no response. There were no whispered questions to a neighbor. No one to nudge you back into focus. So most just turned off their cameras.</p>
          <p className="t-body mb-4">In person, schools have architecture. Small groups, seating arrangements, a teacher moving through the room. Learning happens in conversation. Online, it collapsed into broadcast.</p>
          <p className="t-body">Teachers couldn&apos;t see who was falling behind. Students couldn&apos;t feel like part of a group. The system worked for lecturing. It failed at learning.</p>
        </div>
      </Grid12>

      <Grid12>
        <div style={{ gridColumn: '1 / 7' }}>
          <Placeholder type="img" label="Physical classroom — students at tables, teacher moving through the room" minHeight="280px" />
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <Placeholder type="img" label="Virtual classroom — grid of boxes, no spatial awareness" minHeight="280px" />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 4. Research — Centered quote + timeline ── */
function TeamsResearch() {
  return (
    <Section id="research" padding="py-24 md:py-32">
      <Glow color="#6C63FF" size="50%" top="30%" left="40%" opacity={0.04} />

      {/* Centered large quote */}
      <Grid12>
        <div style={{ gridColumn: '3 / 11', textAlign: 'center', marginBottom: '64px' }}>
          <span className="t-label block mb-6" style={{ color: '#6C63FF', opacity: 0.5 }}>Research</span>
          <p className="t-subhead" style={{ color: 'var(--w75)', fontStyle: 'italic' }}>
            &ldquo;They missed belonging.&rdquo;
          </p>
          <p className="t-body mt-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Students did not just miss content. They missed their friends. They missed social cues. They missed feeling seen.
          </p>
        </div>
      </Grid12>

      <Grid12>
        <div style={{ gridColumn: '1 / 13', marginBottom: '32px' }}>
          <h2 className="t-heading mb-6">Designing from real classroom behavior</h2>
          <p className="t-body mb-4" style={{ maxWidth: '700px' }}>Before designing anything, we ran extensive research with students, parents, and teachers to understand their daily experience inside Teams. I led several of these sessions to map the full day-in-the-life of both educators and students.</p>
          <p className="t-body" style={{ maxWidth: '700px' }}>We observed where engagement broke down, when energy dropped, and what felt emotionally uncomfortable in a virtual classroom. These sessions were not about usability tweaks. They were about understanding how it felt to spend six hours a day in small boxes on a screen.</p>
        </div>
      </Grid12>

      {/* Research timeline */}
      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <Placeholder type="diag" label="Research timeline: interviews → synthesis → insights → design principles" minHeight="200px" />
      </div>
    </Section>
  )
}

/* ── 5. Solution — Three directions + wide UI ── */
function TeamsSolution() {
  return (
    <Section id="solution" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#6C63FF" size="50%" top="50%" left="50%" opacity={0.03} />

      <Grid12>
        <div style={{ gridColumn: '1 / 13', marginBottom: '48px' }}>
          <span className="t-label block mb-4" style={{ color: '#6C63FF', opacity: 0.5 }}>Solution</span>
          <h2 className="t-heading">Reintroducing structure without turning Teams into a cartoon classroom</h2>
        </div>
      </Grid12>

      {/* Three approach cards */}
      <Grid12>
        {[
          { title: 'Too literal', desc: 'Full classroom maps with avatars at drawn tables. Playful but gimmicky inside an enterprise tool.', accent: '#FF8B6A' },
          { title: 'Too abstract', desc: 'Purely functional: renamed breakout channels. Lost the spatial awareness that made the concept work.', accent: '#6C63FF' },
          { title: 'Virtual tables', desc: 'Persistent table cards in a grid. Fixed seats, visible neighbors, stable group identity. The winner.', accent: '#6C63FF' },
        ].map((d, i) => (
          <div key={i} style={{ gridColumn: `${1 + i * 4} / ${5 + i * 4}` }}>
            <GlassCard hover className="p-6 h-full" accentBorder={i === 2 ? 'rgba(108, 99, 255, 0.15)' : undefined}>
              <span className="t-label block mb-3" style={{ color: d.accent, opacity: 0.4 }}>{d.title}</span>
              <p className="t-body">{d.desc}</p>
            </GlassCard>
          </div>
        ))}
      </Grid12>

      <Grid12 className="mt-10">
        <div style={{ gridColumn: '1 / 8' }}>
          <p className="t-body mb-4">We landed somewhere in between. We designed persistent table cards arranged in a grid. Students sat in fixed positions within these tables, with their avatars resting in consistent seats.</p>
          <p className="t-body">This approach restored spatial awareness without sacrificing clarity. It was structured enough to feel real, but restrained enough to feel native inside Teams.</p>
          <p className="t-body mt-4">There was a harder tension underneath the table design. Teachers needed moderation controls — the ability to mute, redirect, or flag — but heavy-handed moderation kills exactly the kind of organic peer discussion that makes small groups work. We designed moderation to be ambient rather than disruptive. Teachers could observe and intervene from the global view without pulling students out of context or signaling to the whole group that someone was being corrected. Control stayed with the teacher. The conversation stayed with the students.</p>
        </div>
      </Grid12>

      {/* Full-width UI */}
      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '48px auto 0' }}>
        <Placeholder type="ui" label="Virtual tables concept — top-down classroom view with grouped student tables" minHeight="360px" />
      </div>
    </Section>
  )
}

/* ── 6. Orchestration — Pin + scroll ── */
function TeamsOrchestration() {
  return (
    <Section id="iteration" padding="py-24 md:py-32">
      <Glow color="#6C63FF" size="50%" top="50%" left="30%" opacity={0.04} />
      <DotGrid mask />

      <Grid12>
        <div style={{ gridColumn: '1 / 6', position: 'sticky', top: '120px', alignSelf: 'start' }}>
          <span className="t-label block mb-4" style={{ color: '#6C63FF', opacity: 0.5 }}>Classroom Orchestration</span>
          <h2 className="t-heading mb-6">Giving teachers the room back</h2>
          <p className="t-body mb-4">Virtual tables were only part of the solution. The real breakthrough was enabling teachers to manage the room naturally.</p>
          <p className="t-body mb-4">Teachers could start table discussions and monitor the classroom from a global view. From there, they could move fluidly between groups, almost like walking around a physical classroom.</p>
          <p className="t-body">This orchestration layer restored something subtle but powerful: situational awareness. Instead of fragmented breakout rooms, teachers had a cohesive classroom again.</p>
          <p className="t-body mt-4">Discussions don&apos;t pause when someone steps away. A student drops off for a minute, reconnects late, or gets moved between tables. They land in a conversation that&apos;s already moving. The system needed to handle that without making the returning student feel lost or forcing the group to restart. We designed re-entry to surface enough context — recent discussion activity, shared materials, who&apos;s currently talking — so a student could orient and join without interrupting the flow already happening.</p>
        </div>

        <div style={{ gridColumn: '6 / 13', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Placeholder type="ui" label="Teacher's global view — all tables at once, status indicators per group" minHeight="340px" />
          <Placeholder type="ui" label="Table-level view — video tiles, shared workspace, chat" minHeight="300px" />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 7. Group Creation — FLIPPED (visual left, text right) ── */
function TeamsGroupCreation() {
  return (
    <Section id="group-creation" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#FF8B6A" size="45%" top="40%" left="25%" opacity={0.03} />

      <Grid12>
        {/* Visual LEFT */}
        <div style={{ gridColumn: '1 / 7' }}>
          <Placeholder type="ui" label="Group creation — drag-and-drop interface for assigning students to tables" minHeight="400px" />
        </div>

        {/* Text RIGHT */}
        <div style={{ gridColumn: '7 / 13' }}>
          <span className="t-label block mb-4" style={{ color: '#FF8B6A', opacity: 0.5 }}>Group Creation</span>
          <p className="t-body mb-4">Previously, breakout rooms had to be created dynamically during the meeting. That meant instructional time was lost while groups were assigned and logistics were sorted out.</p>
          <p className="t-body mb-4">With virtual tables, teachers could set groups before class. They could assign students to consistent seats and attach materials or instructions to each table in advance. When class began, students entered their assigned groups immediately.</p>
          <p className="t-body">This made attendance easier, transitions smoother, and the start of class far more focused. Preparation moved outside the meeting, which allowed learning to begin without friction.</p>
          <p className="t-body mt-4">Persistence went beyond seating assignments. Discussion threads, shared materials, and group context carried forward between class sessions so the next meeting didn&apos;t start cold. Students returned to a table that remembered where they left off. Teachers didn&apos;t have to re-establish groups or redistribute resources every session. That continuity turned virtual tables from a single-meeting feature into a classroom structure that accumulated meaning over time.</p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 8. Student View — Centered + wide mockup ── */
function TeamsStudentView() {
  return (
    <Section id="student-view" padding="py-24 md:py-32">
      <Glow color="#6C63FF" size="50%" top="50%" left="50%" opacity={0.03} />

      <Grid12>
        <div style={{ gridColumn: '3 / 11', textAlign: 'center', marginBottom: '48px' }}>
          <span className="t-label block mb-4" style={{ color: '#6C63FF', opacity: 0.5 }}>Student View</span>
          <p className="t-body" style={{ maxWidth: '500px', margin: '0 auto' }}>
            From the student perspective, the experience reinforced belonging. They saw familiar group members, recognized their seat, and felt accountable to the people around them. That subtle shift made participation feel manageable again.
          </p>
        </div>
      </Grid12>

      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <Placeholder type="ui" label="Student device mockup — the student's perspective of their table" minHeight="360px" />
      </div>
    </Section>
  )
}

/* ── 9. Bandwidth — TEXT ONLY, compact ── */
function TeamsBandwidth() {
  return (
    <Section id="bandwidth" padding="py-16 md:py-24">
      <EdgeLine position="top" />

      <Grid12>
        <div style={{ gridColumn: '2 / 10' }}>
          <span className="t-label block mb-4" style={{ color: '#FF8B6A', opacity: 0.5 }}>Bandwidth Constraints</span>
          <h2 className="t-heading mb-6">Not all home internet is equal</h2>
          <p className="t-body mb-4">Many students were using shared home networks. Older devices. Spotty connections. When teachers handed out materials mid-lesson, students with slow internet got left behind while files loaded.</p>
          <p className="t-body mb-4">Persistent tables fixed this structurally. Teachers attached materials to each table before class. Students could open files as soon as they sat down, not when the teacher shared them.</p>
          <p className="t-body">Small change. Huge impact. Teaching time didn&apos;t pause for tech problems.</p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 10. Constraints — Narrative-driven, NO stat band ── */
function TeamsConstraints() {
  return (
    <Section id="constraints" padding="py-24 md:py-32">
      <Glow color="#6C63FF" size="40%" top="40%" left="50%" opacity={0.03} />
      <DotGrid mask />

      <Grid12>
        <div style={{ gridColumn: '2 / 10' }}>
          <span className="t-label block mb-4" style={{ color: '#6C63FF', opacity: 0.5 }}>Constraints &amp; Tradeoffs</span>
          <h2 className="t-heading mb-6">The platform fought what we were building</h2>
          <p className="t-body mb-4">In a real classroom, a teacher gives an assignment and moves around the room. They hear conversations. They see confusion. They step in when needed. It&apos;s fluid, responsive, whole-class awareness.</p>
          <p className="t-body mb-4">Old Teams breakout rooms broke that. Once students were in separate rooms, the classroom fragmented. Teachers had to enter each room to see what was happening. No global awareness.</p>
          <p className="t-body mb-4">The platform&apos;s architecture for breakout rooms didn&apos;t support what we needed. It was designed for synchronous meetings, not persistent classroom structure. We had to fight the infrastructure to make the persistent tables work.</p>
          <p className="t-body">The design solution was straightforward: give teachers a whole-class view that showed all groups at once. They could see activity across the room, drop into a group to guide, and return to the full view without fragmentation.</p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 11. Impact — Dual-tone gradient + qualitative stats ── */
function TeamsImpact() {
  return (
    <Section id="impact" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#6C63FF" size="45%" top="30%" left="35%" opacity={0.04} />
      <Glow color="#FF8B6A" size="40%" top="60%" left="65%" opacity={0.03} />

      <Grid12>
        <div style={{ gridColumn: '2 / 8', marginBottom: '48px' }}>
          <span className="t-label block mb-4" style={{ color: '#6C63FF', opacity: 0.5 }}>Impact</span>
          <p className="t-body mb-4">Testing showed what mattered. Teachers moved between groups faster. They spotted struggling students quicker. And most important: students spoke up more often when they weren&apos;t performing for thirty people.</p>
          <p className="t-body mb-4">The full virtual tables concept didn&apos;t ship exactly as designed. But the patterns lived on. Persistent class context. Structured groups. Clearer visibility into participation.</p>
          <p className="t-body mb-4">The work stretched beyond education too. How small groups get visibility in enterprise meetings. How structured participation scales when you have more than thirty people in a call.</p>
          <p className="t-body">Retention turned out to be simple. It doesn&apos;t come from more features. It comes from the same thing physical classrooms are built on: structure. Social connection. Being seen.</p>
        </div>
      </Grid12>

      {/* Dual-tone glass card with qualitative stats */}
      <Grid12>
        <div style={{ gridColumn: '3 / 11' }}>
          <GlassCard className="p-8 md:p-10">
            <Glow color="#6C63FF" size="60%" top="30%" left="30%" opacity={0.06} />
            <Glow color="#FF8B6A" size="50%" top="70%" left="70%" opacity={0.05} />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { stat: 'Faster', label: 'group transitions' },
                { stat: 'Quicker', label: 'identification of struggling students' },
                { stat: 'More', label: 'student participation in small groups' },
              ].map((item, i) => (
                <div key={i}>
                  <span className="t-heading block" style={{ color: i % 2 === 0 ? '#6C63FF' : '#FF8B6A', opacity: 0.7 }}>{item.stat}</span>
                  <span className="t-body block mt-2">{item.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Grid12>

      <Grid12 className="mt-16">
        <div style={{ gridColumn: '1 / 13', textAlign: 'center' }}>
          <span className="t-label block mb-3">Next project</span>
          <Link href="/about" className="t-heading" style={{ color: 'var(--w60)', transition: 'color 300ms' }}>
            About &rarr;
          </Link>
        </div>
      </Grid12>
    </Section>
  )
}

function TeamsFooter() {
  return (
    <footer className="relative" style={{ padding: '48px var(--pad)', borderTop: '1px solid var(--w04)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Link href="/" className="text-sm" style={{ color: 'var(--w25)' }}>Bryce Henthorn</Link>
        <a href="mailto:bhenthorn2757@gmail.com" className="text-xs" style={{ color: 'var(--w25)' }}>bhenthorn2757@gmail.com</a>
      </div>
    </footer>
  )
}

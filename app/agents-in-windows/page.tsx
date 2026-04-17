'use client'

import Image from 'next/image'
import Link from 'next/link'
import { NavEditorial } from '@/components/editorial/NavEditorial'
import { AgentsHero as AgentsHeroComponent } from '@/components/agents/AgentsHero'
import { Section } from '@/components/editorial/Section'
import { Grid12 } from '@/components/editorial/Grid12'
import { Glow } from '@/components/atmosphere/Glow'
import { SectionNav } from '@/components/editorial/SectionNav'

/* ═══════════════════════════════════════════════════════════════
   AGENTS IN WINDOWS
   Accent: --a: #5EA6F5 (blue)
   ═══════════════════════════════════════════════════════════════ */

export default function AgentsInWindowsPage() {
  return (
    <div style={{ '--a': '#5EA6F5' } as React.CSSProperties}>
      <NavEditorial />
      <SectionNav sections={[
        { id: 'hero', label: 'Hero' },
        { id: 'context', label: 'Context' },
        { id: 'problem', label: 'Problem' },
        { id: 'process', label: 'Process' },
        { id: 'taskbar', label: 'Taskbar' },
        { id: 'constraints', label: 'Constraints' },
        { id: 'invocation', label: 'Invocation' },
        { id: 'iteration', label: 'Iteration' },
        { id: 'impact', label: 'Impact' },
      ]} />
      <main>
        <section id="hero">
          <AgentsHeroComponent />
        </section>
        <AgentsContext />
        <AgentsProblem />
        <AgentsProcess />
        <AgentsTaskbar />
        <AgentsConstraints />
        <AgentsInvocation />
        <AgentsIteration />
        <AgentsImpact />
      </main>
      <AgentsFooter />
    </div>
  )
}

/* ── 2. Context ── */
function AgentsContext() {
  return (
    <Section id="context" padding="py-24 md:py-40">
      <Glow color="#59CAEA" size="60%" top="-30%" left="-5%" opacity={0.06} />
      <Glow color="#59CAEA" size="40%" top="-20%" left="-10%" opacity={0.04} />

      <Grid12>
        {/* Text left: cols 1-7 */}
        <div style={{ gridColumn: '1 / 7' }}>
          <span className="t-label block mb-4" style={{ color: '#59CAEA' }}>Context</span>
          <h2 className="t-heading mb-10" style={{ lineHeight: 1.2 }}>Windows needed a place for agents to live</h2>
          <div className="flex flex-col gap-4" style={{ maxWidth: '794px' }}>
            <p className="t-body">
              Microsoft is betting on agents as the next layer of computing. Not replacements for humans, but tools that handle routine work so people can focus on judgment and creation. That means Windows can&apos;t stay a place where you launch apps and manage files. It has to become the environment where agents actually run.
            </p>
            <p className="t-body">
              Right now agents scatter across the system. Some hide inside apps. Some show up in Copilot chats. Others surface as notifications. No one knows where their work actually lives. The OS level is where this fragmentation breaks. Windows needed to be the place where agents became visible, manageable, and trustworthy.
            </p>
            <p className="t-body">
              This wasn&apos;t about bolting Copilot onto Windows. It was about making agents a first-class construct in the operating system itself. Desktop apps took decades to become a natural part of how Windows feels. Agents deserve the same foundation.
            </p>
            <p className="t-body">
              I led the core design work alongside partner teams across Microsoft, mapping the entire lifecycle of how agents would operate in the OS, then building a system stable enough to ship but flexible enough to evolve.
            </p>
          </div>
        </div>

        {/* Right: context desktop image */}
        <div style={{ gridColumn: '8 / 13', alignSelf: 'end' }}>
          <Image
            src="/images/agents/context-desktop.png"
            alt="Windows desktop with agent taskbar concept"
            width={646}
            height={399}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 3. Problem — Provocation + Before/After cards ── */
function AgentsProblem() {
  return (
    <Section id="problem" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="45%" top="20%" left="60%" opacity={0.03} />

      {/* Centered provocation */}
      <Grid12 className="mb-16">
        <div style={{ gridColumn: '2 / 12', textAlign: 'center' }}>
          <p className="t-subhead" style={{ color: 'var(--w88)', maxWidth: '884px', marginLeft: 'auto', marginRight: 'auto', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.2 }}>
            People don&apos;t fear automation. They fear not knowing
          </p>
        </div>
      </Grid12>

      {/* Two-column text */}
      <Grid12 className="mb-16">
        <div style={{ gridColumn: '1 / 7' }}>
          <p className="t-body">
            Agents scattered everywhere. Inside apps, buried in chat history, coming through notifications. Users had no idea where their work actually was or if anything was still running. Fragments. No coherent picture.
          </p>
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <p className="t-body">
            Early interviews hit a consistent note. Users liked having help. What they hated was surprises. They wanted to know what was happening, where it was happening, when it&apos;d be done. They didn&apos;t distrust automation itself. They distrusted invisibility.
          </p>
        </div>
      </Grid12>

      {/* Before / After image cards */}
      <Grid12 className="mt-16">
        {[
          {
            src: '/images/agents/problem-fragmentation.png',
            alt: 'Fragmented agent experience across multiple windows',
            title: 'Fragmentation across apps',
            desc: 'Windows has no insight into what is running within each window.',
          },
          {
            src: '/images/agents/problem-observability.png',
            alt: 'Windows with unified agent observability',
            title: 'Windows extends for agent observability',
            desc: 'Windows provides consistent patterns for agents leverage for monitoring and management. No more agents lost behind conversation windows.',
          },
        ].map((card, i) => (
          <div key={i} style={{ gridColumn: i === 0 ? '1 / 7' : '7 / 13' }}>
            <div
              style={{
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
                overflow: 'hidden',
                background: 'radial-gradient(ellipse at 60% 10%, rgba(11,13,20,1) 0%, rgba(8,9,14,1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ padding: '12px 12px 0', flex: '1 1 auto' }}>
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={732}
                  height={367}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div style={{ padding: '16px 24px 24px', flexShrink: 0 }}>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  background: 'linear-gradient(to right, white, #cdf2ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '4px',
                }}>
                  {card.title}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--w60)', lineHeight: 1.4 }}>
                  {card.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Grid12>
    </Section>
  )
}

/* ── 4. Process — Text left + taskbar screenshots right ── */
function AgentsProcess() {
  return (
    <Section id="process" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="55%" top="40%" left="50%" opacity={0.03} />

      <Grid12>
        {/* Text left: cols 1-6 */}
        <div style={{ gridColumn: '1 / 6' }}>
          <h2 className="t-heading mb-10" style={{ lineHeight: 1.2 }}>Anchoring to what users already know</h2>
          <div className="flex flex-col gap-4" style={{ maxWidth: '554px' }}>
            <p className="t-body">
              We tested three directions. Keep agents inside the apps that spawn them. Pin them independently like applications. Or create a dedicated agent workspace. Each had problems. Some felt bloated for something that barely existed yet. Others made agents too cryptic about where they actually were and how to get back to them.
            </p>
            <p className="t-body">
              Agents are genuinely new, but they don&apos;t have to feel alien. We pushed for a progressive approach. Build on something users already use every day rather than forcing them to memorize a new system. We anchored agents to the taskbar. Same place apps live. Same behaviors. But with new states and signals that reflect how agents work.
            </p>
          </div>
        </div>

        {/* Right: stacked taskbar screenshots cols 7-12 */}
        <div style={{ gridColumn: '7 / 13', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            '/assets/Frame 2147238301.png',
            '/assets/Frame 2147238302.png',
            '/assets/Frame 2147238303.png',
          ].map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Taskbar evolution step ${i + 1}`}
              width={651}
              height={157}
              className="w-full h-auto rounded-xl"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            />
          ))}
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 5. Taskbar — Text left + video right ── */
function AgentsTaskbar() {
  return (
    <Section id="taskbar" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="50%" top="50%" left="70%" opacity={0.04} />

      <Grid12>
        {/* Text left: cols 1-6 */}
        <div style={{ gridColumn: '1 / 6', alignSelf: 'center' }}>
          <h2 className="t-heading mb-6" style={{ lineHeight: 1.2 }}>The taskbar becomes a window into agent work</h2>
          <div className="flex flex-col gap-4" style={{ maxWidth: '552px' }}>
            <p className="t-body">
              Agents pin to the taskbar just like apps do. Invoke one and it appears as an icon. Familiar. Clear that something&apos;s working. The metaphor works. But agents don&apos;t behave like apps. They move through states: planning, executing, waiting, done.
            </p>
            <p className="t-body">
              The real challenge was fitting agent progress into taskbar space. Agents from different providers send different outputs and different cadences. Some stream step-by-step. Some go silent. We built hover cards that expand from the icon to show progress in detail.
            </p>
            <p className="t-body">
              And sometimes you need to unblock an agent fast, without losing context. The hover card lets you do that. You see the problem, you fix it, you move on. The system stays together.
            </p>
          </div>
        </div>

        {/* Right: video cols 7-12 */}
        <div style={{ gridColumn: '7 / 13' }}>
          <div style={{
            aspectRatio: '16 / 9',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transform: 'scale(1.55)',
                transformOrigin: '62% 100%',
              }}
              src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/Taskbar.mp4"
            />
          </div>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 6. Constraints — Full-width heading + text + image ── */
function AgentsConstraints() {
  return (
    <Section id="constraints" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="40%" top="30%" left="50%" opacity={0.03} />

      <Grid12>
        <div style={{ gridColumn: '1 / 13' }}>
          <h2 className="t-heading mb-6" style={{ lineHeight: 1.2 }}>
            Windows ships once. Agents ship constantly.
          </h2>
        </div>
      </Grid12>

      <Grid12 className="mt-4">
        <div style={{ gridColumn: '1 / 13' }}>
          <div className="flex flex-col gap-4" style={{ maxWidth: '1568px' }}>
            <p className="t-body">
              Windows updates quarterly. You can&apos;t iterate freely like a web app. Every change goes to hundreds of millions of devices and has to stay working for years. So when you&apos;re building a pattern that agents will use, you&apos;re betting big. You can&apos;t just redesign it next sprint if you guessed wrong.
            </p>
            <p className="t-body">
              Meanwhile every product team at Microsoft is building agents and wants the same rich monitoring they get inside their apps. They pushed for detailed progress views, custom visualizations, team-specific features. But the OS can&apos;t be all of that. It has to be a consistent surface that works identically whether you&apos;re running a research agent or a calendar agent or something brand new.
            </p>
            <p className="t-body">
              So we built a tense thing. Flexible enough to support agents we haven&apos;t even imagined yet. Simple enough to stay stable across years. We had to tell teams &apos;no&apos; to custom experiences so we could promise users a predictable system.
            </p>
          </div>
        </div>
      </Grid12>

      {/* Full-width image */}
      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '48px auto 0' }}>
        <Image
          src="/images/agents/constraints-desktop.png"
          alt="Windows desktop showing multiple agent interactions across the system"
          width={1648}
          height={930}
          className="w-full h-auto rounded-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        />
      </div>
    </Section>
  )
}

/* ── 7. Invocation — Text left + laptop mockup right ── */
function AgentsInvocation() {
  return (
    <Section id="invocation" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="50%" top="50%" left="25%" opacity={0.04} />

      <Grid12>
        {/* Text left: cols 1-6 */}
        <div style={{ gridColumn: '1 / 6', alignSelf: 'center' }}>
          <h2 className="t-heading mb-6" style={{ lineHeight: 1.2 }}>Ask Copilot becomes the starting point</h2>
          <div className="flex flex-col gap-4" style={{ maxWidth: '628px' }}>
            <p className="t-body">
              Ask Copilot is Windows Search plus Copilot. One place to type questions, run actions, launch anything. We built agents directly into it. Type @. Pick an agent. Send it work. Invoke it from the OS, not from inside some app. The agent keeps running after you close the chat.
            </p>
            <p className="t-body">
              We explored different ways to show agents in the composer. Checkboxes. Cards. Panels. But we aligned with how Copilot already works. The @ mention pattern. It was already there. Users already knew it.
            </p>
            <p className="t-body">
              Now the system has a clear shape. Ask Copilot is where you start agents. The taskbar is where they live while running. Agents aren&apos;t stuck inside individual apps anymore. They&apos;re creatures of the OS itself.
            </p>
          </div>
        </div>

        {/* Right: video cols 7-13 */}
        <div style={{ gridColumn: '6 / 13' }}>
          <div style={{
            aspectRatio: '16 / 9',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transform: 'scale(1.55)',
                transformOrigin: '50% 100%',
              }}
              src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/Composer.mp4"
            />
          </div>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 8. Iteration — Heading + text + agent state icons ── */
function AgentsIteration() {
  return (
    <Section id="iteration" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="45%" top="50%" left="50%" opacity={0.03} />

      {/* Dark textured background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 70% -20%, rgba(94,166,245,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Grid12>
        {/* Heading left: cols 1-6 */}
        <div style={{ gridColumn: '1 / 7' }}>
          <h2 className="t-heading" style={{ lineHeight: 1.2 }}>The micro-interactions that make it work</h2>
        </div>

        {/* Text right: cols 7-12 */}
        <div style={{ gridColumn: '7 / 13', alignSelf: 'center' }}>
          <div className="flex flex-col gap-4">
            <p className="t-body">
              The real work was the tiny stuff. We prototyped these in the actual shell with engineering and product alongside design. Tested multiple agents running at once. Watched how the UI changed as an agent moved between states.
            </p>
            <p className="t-body">
              Each micro-interaction had to balance three things at once: what the system could actually do, what the agent data could tell us, and what people expected to happen. Move one thing wrong and the whole system feels less trustworthy.
            </p>
          </div>
        </div>
      </Grid12>

      {/* Agent state icons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(48px, 8vw, 120px)',
        padding: '0 var(--pad)',
        maxWidth: 'var(--max-w)',
        margin: '80px auto 0',
      }}>
        {[
          '/assets/agents/Running agent.svg',
          '/assets/agents/Needs attention agent.svg',
          '/assets/agents/Completed agent.svg',
          '/assets/agents/Failed agent.svg',
          '/assets/agents/Paused agent.svg',
        ].map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={['Running', 'Needs attention', 'Completed', 'Failed', 'Paused'][i] + ' agent state'}
            width={110}
            height={110}
            className="object-contain"
          />
        ))}
      </div>
    </Section>
  )
}

/* ── 9. Impact — Image + heading + text ── */
function AgentsImpact() {
  return (
    <Section id="impact" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="50%" top="40%" left="50%" opacity={0.04} />

      {/* Full-width impact image */}
      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '0 auto 64px' }}>
        <Image
          src="/images/agents/impact-stage.png"
          alt="Agents in Windows presented on stage — visible, interruptible agent interactions"
          width={1661}
          height={935}
          className="w-full h-auto rounded-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        />
      </div>

      <Grid12>
        <div style={{ gridColumn: '1 / 13' }}>
          <h2 className="t-heading mb-6" style={{ lineHeight: 1.2 }}>
            From invisible to interruptible
          </h2>
        </div>
      </Grid12>

      <Grid12 className="mt-4">
        <div style={{ gridColumn: '1 / 13' }}>
          <div className="flex flex-col gap-4" style={{ maxWidth: '1211px' }}>
            <p className="t-body">
              Agents aren&apos;t hidden anymore. You see them running. You know what state they&apos;re in. You can come back to them whenever you want. No buried logs. No isolated app experiences. The work lives in familiar places.
            </p>
            <p className="t-body">
              And visibility builds trust. You watch automation work. You feel safer. You know you can stop it. Pause it. Fix it. Control matters. We didn&apos;t just make agents powerful. We made them understandable and stoppable so people actually feel comfortable letting them work.
            </p>
            <p className="t-body">
              This changes what Windows is. It&apos;s not just the app launcher anymore. It&apos;s the place where agents live. Where you invoke them. Where you watch them work. Windows becomes the coordination layer for all the intelligent work happening on your system.
            </p>
            <p className="t-body">
              Other teams are already building on these patterns. We created shared contracts for how agents show up, report progress, ask for help. Consistent. Predictable. This prevents a hundred teams from inventing a hundred different ways to surface agent status.
            </p>
            <p className="t-body">
              As agents become normal, people need to understand what&apos;s happening on their system. Developers need a clear way to wire agents into Windows. These foundations do that. They scale.
            </p>
          </div>
        </div>
      </Grid12>

      {/* Next project link */}
      <Grid12 className="mt-16">
        <div style={{ gridColumn: '1 / 13', textAlign: 'center' }}>
          <span className="t-label block mb-3">Next project</span>
          <Link href="/recall" className="t-heading" style={{ color: 'var(--w60)', transition: 'color 300ms' }}>
            Windows Recall &rarr;
          </Link>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── Footer ── */
function AgentsFooter() {
  return (
    <footer className="relative" style={{ padding: '48px var(--pad)', borderTop: '1px solid var(--w04)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Link href="/" className="text-sm" style={{ color: 'var(--w25)' }}>Bryce Henthorn</Link>
        <a href="mailto:bhenthorn2757@gmail.com" className="text-xs" style={{ color: 'var(--w25)' }}>bhenthorn2757@gmail.com</a>
      </div>
    </footer>
  )
}

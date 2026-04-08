'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { NavEditorial } from '@/components/editorial/NavEditorial'
import { Section } from '@/components/editorial/Section'
import { Grid12 } from '@/components/editorial/Grid12'
import { GlassCard } from '@/components/editorial/GlassCard'
import { Glow } from '@/components/atmosphere/Glow'
import { DotGrid } from '@/components/atmosphere/DotGrid'
import { PerspectiveGrid } from '@/components/atmosphere/PerspectiveGrid'
import { EdgeLine } from '@/components/atmosphere/EdgeLine'
import { Vignette } from '@/components/atmosphere/Vignette'
import { Placeholder } from '@/components/placeholder/Placeholder'

/* ═══════════════════════════════════════════════════════════════
   AGENTS IN WINDOWS
   Accent: --a: #5EA6F5 (blue)
   ═══════════════════════════════════════════════════════════════ */

export default function AgentsInWindowsPage() {
  return (
    <div style={{ '--a': '#5EA6F5' } as React.CSSProperties}>
      <NavEditorial />
      <main>
        <AgentsHero />
        <AgentsContext />
        <AgentsProblem />
        <AgentsProcess />
        <AgentsTaskbar />
        <AgentsObservability />
        <AgentsConstraints />
        <AgentsInvocation />
        <AgentsIteration />
        <AgentsImpact />
      </main>
      <AgentsFooter />
    </div>
  )
}

/* ── 1. Hero ── */
function AgentsHero() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  const tr = 'opacity 1s var(--expo), transform 1s var(--expo)'

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <Image
        src="/images/heroes/AgentsInWindowsHero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ opacity: show ? 1 : 0, transition: 'opacity 1.2s var(--expo)' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,6,10,0.8) 0%, rgba(6,6,10,0.15) 35%, rgba(6,6,10,0.85) 100%)' }} />
      <PerspectiveGrid />
      <Glow color="#5EA6F5" size="50%" top="40%" left="30%" opacity={0.05} />
      <Vignette />

      {/* Top-left tags */}
      <div className="absolute top-24 left-0 z-10" style={{ padding: '0 var(--pad)' }}>
        <div
          className="flex flex-wrap gap-2"
          style={{ opacity: show ? 1 : 0, transition: 'opacity 0.8s var(--expo)', transitionDelay: '0.3s' }}
        >
          {['OS shell', 'Systems thinking', 'Ambient AI', 'Senior Designer', '2025'].map((tag) => (
            <span key={tag} className="t-mono px-3 py-1 rounded-full" style={{ border: '1px solid var(--w06)', color: 'var(--w20)' }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 t-label" style={{ opacity: show ? 1 : 0, transition: 'opacity 0.8s var(--expo)', transitionDelay: '0.4s', color: 'var(--w25)' }}>
          Senior UX Designer &middot; Windows Shell
        </div>
      </div>

      {/* Bottom-left title */}
      <div className="relative z-10 w-full" style={{ padding: 'var(--pad)', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '700px' }}>
          <span className="t-label block mb-3" style={{ color: '#5EA6F5', opacity: 0.6, ...fade(show, '0.2s', tr) }}>
            Agents in Windows
          </span>
          <h1 className="t-display" style={fade(show, '0.3s', tr)}>
            Making AI agents visible and interruptible in Windows
          </h1>
        </div>
      </div>

      {/* Bottom-right annotation */}
      <div
        className="absolute bottom-0 right-0 z-10 text-right"
        style={{ padding: 'var(--pad)', paddingBottom: '80px', opacity: show ? 1 : 0, transition: 'opacity 0.8s var(--expo)', transitionDelay: '0.5s' }}
      >
        <span className="t-mono block" style={{ color: 'var(--w12)' }}>Agent visibility, trust,</span>
        <span className="t-mono block" style={{ color: 'var(--w12)' }}>and OS integration</span>
      </div>
    </section>
  )
}

/* ── 2. Context — Asymmetric split ── */
function AgentsContext() {
  return (
    <Section id="context" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="50%" top="30%" left="20%" opacity={0.04} />
      <DotGrid mask />

      <Grid12>
        {/* Text left: cols 1-6 */}
        <div style={{ gridColumn: '1 / 7' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Context</span>
          <h2 className="t-heading mb-6">Windows needed a place for agents to live</h2>
          <div className="flex flex-col gap-5">
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

        {/* Right: 3 floating capability cards cols 7-12 */}
        <div style={{ gridColumn: '7 / 13', position: 'relative', minHeight: '400px' }}>
          <div className="absolute" style={{ top: '0%', right: '5%', animation: 'float0 7s ease-in-out infinite' }}>
            <GlassCard className="p-5" style={{ maxWidth: '220px' }}>
              <span className="t-label block mb-2" style={{ color: '#5EA6F5', opacity: 0.5 }}>Capability</span>
              <p className="t-body">Agents pin to the taskbar like apps — visible and interruptible</p>
            </GlassCard>
          </div>
          <div className="absolute" style={{ top: '35%', left: '0%', animation: 'float1 8s ease-in-out infinite' }}>
            <GlassCard className="p-5" style={{ maxWidth: '200px' }}>
              <span className="t-label block mb-2" style={{ color: '#5EA6F5', opacity: 0.5 }}>Capability</span>
              <p className="t-body">Real-time progress and status through hover cards</p>
            </GlassCard>
          </div>
          <div className="absolute" style={{ top: '68%', right: '10%', animation: 'float2 9s ease-in-out infinite' }}>
            <GlassCard className="p-5" style={{ maxWidth: '210px' }}>
              <span className="t-label block mb-2" style={{ color: '#5EA6F5', opacity: 0.5 }}>Capability</span>
              <p className="t-body">System-wide invocation through Ask Copilot</p>
            </GlassCard>
          </div>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 3. Problem — Provocation + 50/50 ── */
function AgentsProblem() {
  return (
    <Section id="problem" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#5EA6F5" size="45%" top="20%" left="60%" opacity={0.03} />

      {/* Centered provocation */}
      <Grid12>
        <div style={{ gridColumn: '2 / 12', textAlign: 'center', marginBottom: '64px' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Problem</span>
          <p className="t-subhead" style={{ color: 'var(--w75)', maxWidth: '700px', margin: '0 auto' }}>
            People don&apos;t fear automation. They fear not knowing.
          </p>
        </div>
      </Grid12>

      {/* Two-column text */}
      <Grid12>
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

      {/* Before / After diagrams */}
      <Grid12 className="mt-12">
        <div style={{ gridColumn: '1 / 7' }}>
          <Placeholder type="diag" label="Before: Chaotic — agents scattered across apps, chats, notifications" minHeight="280px" />
        </div>
        <div style={{ gridColumn: '7 / 13' }}>
          <Placeholder type="diag" label="After: Orchestrated — agents visible and managed from the taskbar" minHeight="280px" />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 4. Process — 3-column cards + wide diagram ── */
function AgentsProcess() {
  return (
    <Section id="process" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="55%" top="40%" left="50%" opacity={0.03} />
      <DotGrid mask />

      <Grid12>
        <div style={{ gridColumn: '1 / 13', marginBottom: '48px' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Process</span>
          <h2 className="t-heading">Anchoring to what users already know</h2>
        </div>
      </Grid12>

      {/* Three direction cards */}
      <Grid12>
        {[
          { title: 'Keep inside apps', desc: 'Agents live where they\'re spawned. Familiar but fragmented — users lose track across multiple apps.' },
          { title: 'Pin independently', desc: 'Agents pin to the taskbar like apps. Same mental model, new states. Progressive and growable.' },
          { title: 'Dedicated workspace', desc: 'Central hub for all agents. Powerful but requires learning a new model before agents even exist.' },
        ].map((d, i) => (
          <div key={i} style={{ gridColumn: `${1 + i * 4} / ${5 + i * 4}` }}>
            <GlassCard hover className="p-6 h-full">
              <span className="t-label block mb-3" style={{ color: '#5EA6F5', opacity: 0.4 }}>Direction {i + 1}</span>
              <h3 className="t-subhead mb-3" style={{ fontSize: 'clamp(16px, 1.8vw, 22px)' }}>{d.title}</h3>
              <p className="t-body">{d.desc}</p>
            </GlassCard>
          </div>
        ))}
      </Grid12>

      {/* Supporting text */}
      <Grid12 className="mt-10">
        <div style={{ gridColumn: '1 / 8' }}>
          <p className="t-body">
            We tested three directions. Keep agents inside the apps that spawn them. Pin them independently like applications. Or create a dedicated agent workspace. Each had problems. Some felt bloated for something that barely existed yet. Others made agents too cryptic about where they actually were and how to get back to them.
          </p>
          <p className="t-body mt-4">
            Agents are genuinely new, but they don&apos;t have to feel alien. We pushed for a progressive approach. Build on something users already use every day rather than forcing them to memorize a new system. We anchored agents to the taskbar. Same place apps live. Same behaviors. But with new states and signals that reflect how agents work.
          </p>
        </div>
      </Grid12>

      {/* Full-width exploration diagram */}
      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '48px auto 0' }}>
        <Placeholder type="diag" label="Exploration space: three design directions branching from a single starting point" minHeight="300px" />
      </div>
    </Section>
  )
}

/* ── 5. Taskbar — Pin + scroll ── */
function AgentsTaskbar() {
  return (
    <Section id="taskbar" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#5EA6F5" size="50%" top="50%" left="70%" opacity={0.04} />

      <Grid12>
        {/* Sticky text left: cols 1-5 */}
        <div style={{ gridColumn: '1 / 6', position: 'sticky', top: '120px', alignSelf: 'start' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Agents on the Taskbar</span>
          <h2 className="t-heading mb-6">The taskbar becomes a window into agent work</h2>
          <p className="t-body">
            Agents pin to the taskbar just like apps do. Invoke one and it appears as an icon. Familiar. Clear that something&apos;s working. The metaphor works. But agents don&apos;t behave like apps. They move through states: planning, executing, waiting, done.
          </p>
          <p className="t-body mt-4">
            The real challenge was fitting agent progress into taskbar space. Agents from different providers send different outputs and different cadences. Some stream step-by-step. Some go silent. We built hover cards that expand from the icon to show progress in detail.
          </p>
          <p className="t-body mt-4">
            And sometimes you need to unblock an agent fast, without losing context. The hover card lets you do that. You see the problem, you fix it, you move on. The system stays together.
          </p>
        </div>

        {/* Scrolling UI mocks right: cols 6-12 */}
        <div style={{ gridColumn: '6 / 13', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Placeholder type="ui" label="Taskbar — collapsed state with agent badge dots" minHeight="300px" />
          <Placeholder type="ui" label="Taskbar — expanded hover card showing agent progress" minHeight="340px" />
          <Placeholder type="diag" label="Badge states: idle, active, warning, completed" minHeight="240px" />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 6. Observability — Wide diagram + 2×2 ── */
function AgentsObservability() {
  return (
    <Section id="observability" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="60%" top="30%" left="40%" opacity={0.03} />
      <DotGrid mask />

      <Grid12>
        <div style={{ gridColumn: '1 / 13', marginBottom: '32px' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Observability</span>
          <h2 className="t-heading mb-6">The OS can&apos;t control what providers promise</h2>
          <p className="t-body" style={{ maxWidth: '700px' }}>
            The taskbar badge looks simple. Icon. Status. Progress. But the data comes through an API from providers you don&apos;t employ and can&apos;t fully monitor. When the badge says &apos;active,&apos; the OS is passing along a claim, not verifying a fact.
          </p>
        </div>
      </Grid12>

      {/* Full-width observability model */}
      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '0 auto 48px' }}>
        <Placeholder type="diag" label="Observability model: Agent Action → State Change → Notification → User Response" minHeight="280px" />
      </div>

      {/* 2×2 provider cards */}
      <Grid12>
        {[
          { title: 'Rich updates', desc: 'Provider sends step-by-step progress. Badge shows detailed state with confidence.' },
          { title: 'Sparse signals', desc: 'One "running" message then silence. Badge shows recency and timeouts.' },
          { title: 'False completion', desc: 'Reports "done" but work is garbage. Verification flow before marking complete.' },
          { title: 'Total silence', desc: 'No signal at all. Timeouts turn silence into visible uncertainty.' },
        ].map((card, i) => (
          <div key={i} style={{ gridColumn: i < 2 ? `${1 + i * 6} / ${7 + i * 6}` : `${1 + (i - 2) * 6} / ${7 + (i - 2) * 6}`, marginTop: i >= 2 ? 'var(--grid-gap)' : undefined }}>
            <GlassCard hover className="p-6" accentBorder="rgba(94, 166, 245, 0.12)">
              <h3 className="t-subhead mb-2" style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}>{card.title}</h3>
              <p className="t-body">{card.desc}</p>
            </GlassCard>
          </div>
        ))}
      </Grid12>

      <Grid12 className="mt-10">
        <div style={{ gridColumn: '1 / 8' }}>
          <p className="t-body">
            The badge went from four clean states to a confidence model. Not just &quot;what is the agent doing&quot; but &quot;how sure are we the information is fresh.&quot; For finished work, we force verification, not blind trust. The output surfaces inline so you can review it immediately.
          </p>
          <p className="t-body mt-4">
            This never shows up in product demos. But it&apos;s where the design lives. The system has to hold when the agent&apos;s slow, silent, wrong, or completely broken. And the OS has to be honest about all of that without making people stop trusting delegation.
          </p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 7. Constraints — Full-bleed stat band + timeline ── */
function AgentsConstraints() {
  return (
    <Section id="platform-constraints" padding="py-24 md:py-40">
      <EdgeLine position="top" />
      <Glow color="#5EA6F5" size="40%" top="30%" left="50%" opacity={0.03} />

      {/* Large stat centered */}
      <div className="text-center mb-16">
        <CountUpStat target="400" suffix="ms" />
        <p className="t-label mt-4">Response budget per agent state update</p>
      </div>

      <Grid12>
        <div style={{ gridColumn: '2 / 12' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Platform Constraints</span>
          <h2 className="t-heading mb-6">Windows ships once. Agents ship constantly.</h2>
          <p className="t-body mb-4">
            Windows updates quarterly. You can&apos;t iterate freely like a web app. Every change goes to hundreds of millions of devices and has to stay working for years. So when you&apos;re building a pattern that agents will use, you&apos;re betting big. You can&apos;t just redesign it next sprint if you guessed wrong.
          </p>
          <p className="t-body mb-4">
            Meanwhile every product team at Microsoft is building agents and wants the same rich monitoring they get inside their apps. They pushed for detailed progress views, custom visualizations, team-specific features. But the OS can&apos;t be all of that. It has to be a consistent surface that works identically whether you&apos;re running a research agent or a calendar agent or something brand new.
          </p>
          <p className="t-body">
            So we built a tense thing. Flexible enough to support agents we haven&apos;t even imagined yet. Simple enough to stay stable across years. We had to tell teams &apos;no&apos; to custom experiences so we could promise users a predictable system.
          </p>
        </div>
      </Grid12>

      {/* Timeline diagram */}
      <div style={{ padding: '0 var(--pad)', maxWidth: 'var(--max-w)', margin: '48px auto 0' }}>
        <Placeholder type="diag" label="Constraint evolution timeline: perf budget, API limits, privacy review dates" minHeight="200px" />
      </div>
    </Section>
  )
}

function CountUpStat({ target, suffix }: { target: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  const [count, setCount] = useState(0)
  const num = parseInt(target)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * num))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, num])

  return (
    <span ref={ref} className="t-display" style={{ fontSize: 'clamp(48px, 8vw, 120px)', fontWeight: 300, color: 'var(--w88)' }}>
      {count}<span style={{ color: '#5EA6F5', opacity: 0.6 }}>{suffix}</span>
    </span>
  )
}

/* ── 8. Unified Invocation — Asymmetric ── */
function AgentsInvocation() {
  return (
    <Section id="invocation" padding="py-24 md:py-32">
      <Glow color="#5EA6F5" size="50%" top="50%" left="25%" opacity={0.04} />

      <Grid12>
        {/* Text left: cols 1-5 */}
        <div style={{ gridColumn: '1 / 6' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Unified Invocation</span>
          <h2 className="t-heading mb-6">Ask Copilot becomes the starting point</h2>
          <p className="t-body mb-4">
            Ask Copilot is Windows Search plus Copilot. One place to type questions, run actions, launch anything. We built agents directly into it. Type @. Pick an agent. Send it work. Invoke it from the OS, not from inside some app. The agent keeps running after you close the chat.
          </p>
          <p className="t-body mb-4">
            We explored different ways to show agents in the composer. Checkboxes. Cards. Panels. But we aligned with how Copilot already works. The @ mention pattern. It was already there. Users already knew it.
          </p>
          <p className="t-body">
            Now the system has a clear shape. Ask Copilot is where you start agents. The taskbar is where they live while running. Agents aren&apos;t stuck inside individual apps anymore. They&apos;re creatures of the OS itself.
          </p>
        </div>

        {/* Right: UI mock + flow diagram cols 6-12 */}
        <div style={{ gridColumn: '6 / 13', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Placeholder type="ui" label="Invocation surface — unified entry point for agents" minHeight="300px" />
          <Placeholder type="diag" label="Flow: User Intent → Route → Agent Selection → Execution → Feedback" minHeight="200px" />
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 9. Iteration — 3-column micro-interaction cards ── */
function AgentsIteration() {
  return (
    <Section id="iteration" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#5EA6F5" size="45%" top="50%" left="50%" opacity={0.03} />

      <Grid12>
        <div style={{ gridColumn: '1 / 13', marginBottom: '48px' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Iteration</span>
          <h2 className="t-heading">The micro-interactions that make it work</h2>
        </div>
      </Grid12>

      <Grid12>
        {[
          { title: 'Completion signals', desc: 'How does an agent signal it\'s done? Subtle badge shift, not a disruptive notification.', icon: 'pulse' },
          { title: 'Hand-raises', desc: 'How does it ask for help without startling you? Amber badge state with inline resolution.', icon: 'progress' },
          { title: 'Fast unblocking', desc: 'How do you unblock it while keeping context? Hover card shows problem, you fix it, move on.', icon: 'toggle' },
        ].map((card, i) => (
          <div key={i} style={{ gridColumn: `${1 + i * 4} / ${5 + i * 4}` }}>
            <GlassCard hover className="p-6 h-full">
              {/* Micro-animation indicator */}
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="rounded-full"
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#5EA6F5',
                    animation: card.icon === 'pulse' ? 'pulseGlow 3s ease-in-out infinite' : undefined,
                    boxShadow: '0 0 12px rgba(94,166,245,0.4)',
                  }}
                />
                <span className="t-label" style={{ color: '#5EA6F5', opacity: 0.5 }}>{card.title}</span>
              </div>
              <p className="t-body">{card.desc}</p>
            </GlassCard>
          </div>
        ))}
      </Grid12>

      <Grid12 className="mt-10">
        <div style={{ gridColumn: '1 / 8' }}>
          <p className="t-body">
            The real work was the tiny stuff. We prototyped these in the actual shell with engineering and product alongside design. Tested multiple agents running at once. Watched how the UI changed as an agent moved between states.
          </p>
          <p className="t-body mt-4">
            Each micro-interaction had to balance three things at once: what the system could actually do, what the agent data could tell us, and what people expected to happen. Move one thing wrong and the whole system feels less trustworthy.
          </p>
        </div>
      </Grid12>
    </Section>
  )
}

/* ── 10. Impact — Closing statement + glass callout ── */
function AgentsImpact() {
  return (
    <Section id="impact" padding="py-24 md:py-32">
      <EdgeLine position="top" />
      <Glow color="#5EA6F5" size="50%" top="40%" left="50%" opacity={0.04} />

      <Grid12>
        <div style={{ gridColumn: '2 / 8' }}>
          <span className="t-label block mb-4" style={{ color: '#5EA6F5', opacity: 0.5 }}>Impact</span>
          <h2 className="t-heading mb-6">From invisible to interruptible</h2>
          <p className="t-body mb-4">
            Agents aren&apos;t hidden anymore. You see them running. You know what state they&apos;re in. You can come back to them whenever you want. No buried logs. No isolated app experiences. The work lives in familiar places.
          </p>
          <p className="t-body mb-4">
            And visibility builds trust. You watch automation work. You feel safer. You know you can stop it. Pause it. Fix it. Control matters. We didn&apos;t just make agents powerful. We made them understandable and stoppable so people actually feel comfortable letting them work.
          </p>
          <p className="t-body mb-4">
            This changes what Windows is. It&apos;s not just the app launcher anymore. It&apos;s the place where agents live. Where you invoke them. Where you watch them work. Windows becomes the coordination layer for all the intelligent work happening on your system.
          </p>
          <p className="t-body mb-4">
            Other teams are already building on these patterns. We created shared contracts for how agents show up, report progress, ask for help. Consistent. Predictable. This prevents a hundred teams from inventing a hundred different ways to surface agent status.
          </p>
          <p className="t-body">
            As agents become normal, people need to understand what&apos;s happening on their system. Developers need a clear way to wire agents into Windows. These foundations do that. They scale.
          </p>
        </div>
      </Grid12>

      {/* Glass callout card */}
      <Grid12 className="mt-12">
        <div style={{ gridColumn: '3 / 11' }}>
          <GlassCard className="p-8 md:p-10">
            <Glow color="#5EA6F5" size="80%" top="50%" left="50%" opacity={0.06} />
            <div className="relative z-10">
              <ul className="flex flex-col gap-4">
                {[
                  'Visibility creates trust. Hidden agents breed distrust.',
                  'Pause and stop are not optional. Control is non-negotiable.',
                  'Predictability across the system. One model, everywhere.',
                  'Agents should feel chosen, not imposed.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 shrink-0" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5EA6F5', opacity: 0.5 }} />
                    <span className="t-body" style={{ color: 'var(--w60)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
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

/* ── Helper ── */
function fade(show: boolean, delay: string, transition: string): React.CSSProperties {
  return {
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(24px)',
    transition,
    transitionDelay: delay,
  }
}

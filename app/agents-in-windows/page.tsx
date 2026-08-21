import Image from "next/image"
import { ManualShell } from "../recall/ManualShell"
import {
  SectionLabel,
  SpecSheet,
  Figure,
  Telemetry,
  TopBar,
  ManualFooter,
  CoverPlate,
  HeroIntro,
  NextProject,
  LoopingMedia,
} from "@/components/manual"
import { DotGrid } from "@/components/atmosphere/DotGrid"
import { Glow } from "@/components/atmosphere/Glow"

const AGENT_STATES = [
  { src: "/assets/agents/Running agent.svg",          label: "RUNNING" },
  { src: "/assets/agents/Needs attention agent.svg",  label: "NEEDS ATTENTION" },
  { src: "/assets/agents/Completed agent.svg",        label: "COMPLETED" },
  { src: "/assets/agents/Failed agent.svg",           label: "FAILED" },
  { src: "/assets/agents/Paused agent.svg",           label: "PAUSED" },
]

const TASKBAR_KEYFRAMES = [
  {
    label: "EMPTY PIN",
    src: "/assets/Frame 2147238301.png",
    alt: "Taskbar evolution keyframe 1 — agent pinned to the taskbar with no active work",
  },
  {
    label: "ACTIVE STATE",
    src: "/assets/Frame 2147238302.png",
    alt: "Taskbar evolution keyframe 2 — pinned agent showing an in-progress state indicator",
  },
  {
    label: "HOVER-CARD EXPANDED",
    src: "/assets/Frame 2147238303.png",
    alt: "Taskbar evolution keyframe 3 — hover card expanded from the taskbar icon showing step detail",
  },
]

const AGENT_HOME_OPTIONS = [
  { code: "01", label: "APP-BOUND" },
  { code: "02", label: "INDEPENDENT PIN" },
  { code: "03", label: "DEDICATED SPACE" },
]

const INVOCATION_ROUTE = [
  { code: "@", label: "SELECT AGENT" },
  { code: "SEND", label: "DISPATCH WORK" },
  { code: "TASKBAR", label: "MONITOR STATE" },
]

function AgentHomeDecision() {
  return (
    <div
      className="agents-home-decision"
      role="img"
      aria-label="Three candidate homes for agents were evaluated before anchoring the system to the familiar Windows taskbar."
    >
      <div className="agents-home-options" aria-hidden="true">
        {AGENT_HOME_OPTIONS.map((option) => (
          <span className="agents-home-option" key={option.code}>
            <span>{option.code}</span>
            <span>{option.label}</span>
          </span>
        ))}
      </div>
      <div className="agents-home-convergence" aria-hidden="true">
        <span>TEST</span>
        <span />
        <span>ANCHOR</span>
      </div>
      <div className="agents-home-anchor" aria-hidden="true">
        <span>WINDOWS TASKBAR</span>
        <span>FAMILIAR PLACE · NEW STATES</span>
      </div>
    </div>
  )
}

function ConstraintBalance() {
  return (
    <aside
      className="agents-constraint-balance"
      aria-label="Design constraint: a stable Windows contract must support a rapidly changing agent ecosystem."
    >
      <div>
        <span>WINDOWS</span>
        <strong>STABLE CONTRACT</strong>
        <span>QUARTERLY RELEASE</span>
      </div>
      <div className="agents-constraint-axis" aria-hidden="true">
        <span />
        <span>SHARED SURFACE</span>
        <span />
      </div>
      <div>
        <span>AGENTS</span>
        <strong>VARIABLE OUTPUT</strong>
        <span>CONTINUOUS CHANGE</span>
      </div>
    </aside>
  )
}

function InvocationRoute() {
  return (
    <ol className="agents-invocation-route" aria-label="Agent invocation route">
      {INVOCATION_ROUTE.map((step) => (
        <li key={step.code}>
          <span>{step.code}</span>
          <span>{step.label}</span>
        </li>
      ))}
    </ol>
  )
}

function ImpactContract() {
  return (
    <div
      className="agents-impact-contract"
      role="img"
      aria-label="Different agents pass through one shared Windows contract to become visible, interruptible, and predictable."
    >
      <div className="agents-impact-sources" aria-hidden="true">
        <span>AGENT A</span>
        <span>AGENT B</span>
        <span>AGENT N</span>
      </div>
      <div className="agents-impact-core" aria-hidden="true">
        <span>SHARED OS CONTRACT</span>
      </div>
      <div className="agents-impact-outcomes" aria-hidden="true">
        <span>VISIBLE</span>
        <span>INTERRUPTIBLE</span>
        <span>PREDICTABLE</span>
      </div>
    </div>
  )
}

export default function AgentsInWindowsPage() {
  return (
    <ManualShell>
      <TopBar />

      <main className="container">
        {/* ── Hero ── */}
        <section
          data-section
          id="overview"
          className="agents-hero pb-16 pt-12 lg:pt-24"
        >
          <div className="agents-hero-atmosphere" aria-hidden="true">
            <DotGrid />
            <Glow
              color="var(--accent-signal)"
              size="68%"
              top="44%"
              left="82%"
              opacity={0.04}
            />
          </div>

          <div className="agents-hero-content">
            <HeroIntro
              static
              lines={[
                {
                  text: "Making AI agents visible and interruptible in Windows.",
                  className: "t-display-xl max-w-[20ch]",
                },
              ]}
            />

            <Figure
              number="0.1"
              caption="Researcher agent surfacing inside the Windows shell. Desktop scene with grid, telemetry overlay, and taskbar entry."
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1] lg:aspect-[1120/442]">
                <Image
                  src="/images/agents/hero-demo.png"
                  alt="Windows desktop with a Researcher agent panel showing a checklist of in-progress sub-tasks"
                  fill
                  priority
                  sizes="(min-width: 1280px) 1024px, 100vw"
                  className="object-cover object-bottom"
                />
              </div>
            </Figure>
          </div>
        </section>

        {/* ── Spec sheet ── */}
        <section data-section data-reveal id="spec" className="py-8">
          <SpecSheet
            rows={[
              { label: "ROLE",     value: "Lead designer, agent visibility & orchestration" },
              { label: "PLATFORM", value: "Windows 11: Shell, Taskbar, Ask Copilot" },
              { label: "TIMELINE", value: "2025 – Present" },
              { label: "TEAM",     value: "3 engineering partner teams across Microsoft" },
              { label: "MY FOCUS", value: "OS-level agent surface, taskbar states, invocation system" },
              { label: "STATUS",   value: "Shipping" },
            ]}
          />
        </section>

        {/* ── 01 Context ── Annotated Split Plate (§2.4) ── */}
        <section
          data-section
          data-reveal
          id="context"
          className="agents-room agents-context-room py-16 lg:py-24"
        >
          <div className="relative z-10">
            <SectionLabel
              number="01"
              label="Context"
              title="Windows needed a place for agents to live"
            />
            <div className="mt-10 grid grid-cols-1 items-start gap-y-10 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-20">
              <div className="[&>p+p]:mt-4!">
                <p className="t-body">
                  Microsoft is betting on agents as the next layer of computing. Not
                  replacements for humans, but tools that handle routine work so people
                  can focus on judgment and creation. That means Windows can&apos;t stay a
                  place where you launch apps and manage files. It has to become the
                  environment where agents actually run.
                </p>
                <p className="t-body">
                  Right now agents scatter across the system. Some hide inside apps. Some
                  show up in Copilot chats. Others surface as notifications. No one knows
                  where their work actually lives. The OS level is where this fragmentation
                  breaks. Windows needed to be the place where agents became visible,
                  manageable, and trustworthy.
                </p>
                <p className="t-body">
                  This wasn&apos;t about bolting Copilot onto Windows. It was about making
                  agents a first-class construct in the operating system itself. Desktop
                  apps took decades to become a natural part of how Windows feels. Agents
                  deserve the same foundation.
                </p>
                <p className="t-body">
                  I led the core design work alongside partner teams across Microsoft,
                  mapping the entire lifecycle of how agents would operate in the OS, then
                  building a system stable enough to ship but flexible enough to evolve.
                </p>
              </div>
              <div className="agents-context-figure flex items-start">
                <Figure
                  number="1.1"
                  caption="Windows desktop with agent taskbar concept"
                  src="/images/agents/context-desktop.png"
                  alt="Windows desktop with agent taskbar concept"
                  width={1646}
                  height={1015}
                  className="my-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 Problem ── */}
        <section
          data-section
          data-reveal
          id="problem"
          className="agents-room agents-problem-room py-16 lg:py-28"
        >
          <div className="agents-problem-atmosphere" aria-hidden="true">
            <Glow
              color="var(--accent-warning)"
              size="64%"
              top="20%"
              left="50%"
              opacity={0.025}
            />
          </div>

          <div className="relative z-10">
            {/* Centered thesis headline — the one full-width statement on the
                page. Body splits into two columns beneath it. */}
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="t-display-l max-w-[24ch] text-balance text-[color:var(--text-primary)]">
                People don&rsquo;t fear automation. They fear not knowing.
              </h2>
            </div>
            <div className="agents-problem-copy mt-14 grid grid-cols-1 items-start gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-12">
              <p className="t-body">
                Agents scattered everywhere. Inside apps, buried in chat history, coming
                through notifications. Users had no idea where their work actually was or
                if anything was still running. Fragments. No coherent picture.
              </p>
              <p className="t-body">
                Early interviews hit a consistent note. Users liked having help. What they
                hated was surprises. They wanted to know what was happening, where it was
                happening, when it&apos;d be done. They didn&apos;t distrust automation
                itself. They distrusted invisibility.
              </p>
            </div>
            <div className="agents-problem-evidence mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Figure
                number="2.1"
                caption="Fragmentation across apps. Windows has no insight into what is running within each window."
                src="/images/agents/problem-fragmentation.png"
                alt="Fragmented agent experience across multiple windows"
                width={1464}
                height={734}
              />
              <Figure
                number="2.2"
                caption="Windows extends for agent observability. Consistent patterns for monitoring and management."
                src="/images/agents/problem-observability.png"
                alt="Windows with unified agent observability"
                width={1464}
                height={734}
              />
            </div>
          </div>
        </section>

        {/* ── Cover Plate (§2.10) — chapter divider into Process ── */}
        <CoverPlate
          number="03"
          total="08"
          title="Process"
          ambient={<AgentHomeDecision />}
          className="agents-process-cover"
        />

        {/* ── 03 Process ── Stage Rail Plate (§2.5) ── */}
        <section
          data-section
          data-reveal
          id="process"
          className="agents-room agents-process-room py-16 lg:py-24"
        >
          <div className="agents-process-atmosphere" aria-hidden="true">
            <DotGrid />
            <Glow
              color="var(--accent-signal)"
              size="58%"
              top="44%"
              left="82%"
              opacity={0.022}
            />
          </div>

          <div className="relative z-10">
            <SectionLabel
              number="03"
              label="Process"
              title="Anchoring to what users already know"
            />
            <div className="mt-10 grid grid-cols-1 items-start gap-x-20 gap-y-10 lg:mt-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              <div>
                <div className="[&>p+p]:mt-4!">
                  <p className="t-body">
                    We tested three directions. Keep agents inside the apps that spawn them.
                    Pin them independently like applications. Or create a dedicated agent
                    workspace. Each had problems. Some felt bloated for something that barely
                    existed yet. Others made agents too cryptic about where they actually were
                    and how to get back to them.
                  </p>
                  <p className="t-body">
                    Agents are genuinely new, but they don&apos;t have to feel alien. We
                    pushed for a progressive approach. Build on something users already use
                    every day rather than forcing them to memorize a new system. We anchored
                    agents to the taskbar. Same place apps live. Same behaviors. But with new
                    states and signals that reflect how agents work.
                  </p>
                </div>
              </div>

              <ol
                className="agents-process-sequence flex flex-col gap-8"
                aria-label="Taskbar agent design progression"
              >
                {TASKBAR_KEYFRAMES.map((kf, i) => (
                  <li key={kf.label}>
                    <figure className="m-0">
                      <figcaption className="mb-3 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <span className="t-mono-label text-[color:var(--text-secondary)]">
                          FIG. 3.{i + 1}
                        </span>
                        <span className="t-mono-label">{kf.label}</span>
                      </figcaption>
                      <Image
                        src={kf.src}
                        alt={kf.alt}
                        width={1302}
                        height={314}
                        sizes="(min-width: 1024px) 720px, 100vw"
                        className="block h-auto w-full"
                      />
                    </figure>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── 04 Taskbar ── Body column + full-width media ── */}
        <section
          data-section
          data-reveal
          id="taskbar"
          className="agents-room agents-taskbar-room py-16 lg:py-24"
        >
          <div className="relative z-10">
            <SectionLabel
              number="04"
              label="Taskbar"
              title="The taskbar becomes a window into agent work"
            />
            <div className="mt-10 max-w-[68ch] [&>p+p]:mt-4! lg:mt-14">
              <p className="t-body">
                Agents pin to the taskbar just like apps do. Invoke one and it appears as
                an icon. Familiar. Clear that something&apos;s working. The metaphor
                works. But agents don&apos;t behave like apps. They move through states:
                planning, executing, waiting, done.
              </p>
              <p className="t-body">
                The real challenge was fitting agent progress into taskbar space. Agents
                from different providers send different outputs and different cadences.
                Some stream step-by-step. Some go silent. We built hover cards that expand
                from the icon to show progress in detail.
              </p>
              <p className="t-body">
                And sometimes you need to unblock an agent fast, without losing context.
                The hover card lets you do that. You see the problem, you fix it, you move
                on. The system stays together.
              </p>
            </div>
            <Figure
              number="4.1"
              caption="Taskbar agent. Hover-card expansion in motion."
            >
              <LoopingMedia
                label="Taskbar agent hover card expanding to show progress"
                src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/Taskbar.mp4"
              />
            </Figure>
          </div>
        </section>

        {/* ── Pull-quote Interlude (§2.11) — transition from Taskbar into Constraints ── */}
        <section
          data-reveal
          aria-label="Constraints pull-quote"
          className="my-12 lg:my-20 py-16 lg:py-24"
        >
          <blockquote className="max-w-[68ch]">
            <p className="t-display-l text-[color:var(--text-primary)]">
              We had to tell teams &lsquo;no&rsquo; to custom experiences so we could
              promise users a predictable system.
            </p>
          </blockquote>
        </section>

        {/* ── 05 Constraints ── Body Column (§2.3) ── */}
        <section
          data-section
          data-reveal
          id="constraints"
          className="agents-room agents-constraints-room py-16 lg:py-24"
        >
          <div className="relative z-10">
            <SectionLabel
              number="05"
              label="Constraints"
              title="Windows ships once. Agents ship constantly."
            />

            <div className="section-grid mt-10 lg:mt-14">
              <div className="[&>p+p]:mt-4! max-w-[68ch]">
                <p className="t-body">
                  Windows updates quarterly. You can&apos;t iterate freely like a web app.
                  Every change goes to hundreds of millions of devices and has to stay
                  working for years. So when you&apos;re building a pattern that agents will
                  use, you&apos;re betting big. You can&apos;t just redesign it next sprint
                  if you guessed wrong.
                </p>
                <p className="t-body">
                  Meanwhile every product team at Microsoft is building agents and wants the
                  same rich monitoring they get inside their apps. They pushed for detailed
                  progress views, custom visualizations, team-specific features. But the OS
                  can&apos;t be all of that. It has to be a consistent surface that works
                  identically whether you&apos;re running a research agent or a calendar
                  agent or something brand new.
                </p>
                <p className="t-body">
                  So we built a tense thing. Flexible enough to support agents we
                  haven&apos;t even imagined yet. Simple enough to stay stable across years.
                </p>
              </div>
              <ConstraintBalance />
            </div>
            <div className="agents-constraints-figure">
              <Figure
                number="5.1"
                frameless
                caption="Windows desktop showing multiple agent interactions across the system"
                src="/images/agents/constraints-desktop.png"
                alt="Windows desktop showing multiple agent interactions across the system"
                width={1648}
                height={930}
              />
            </div>
          </div>
        </section>

        {/* ── 06 Invocation ── Full-bleed Atmospheric Plate (§2.8) ── */}
        <section
          data-section
          data-reveal
          id="invocation"
          className="agents-room agents-invocation-room py-16 lg:py-24"
        >
          <div className="agents-invocation-atmosphere" aria-hidden="true">
            <DotGrid />
          </div>

          <div className="relative z-10">
            <SectionLabel
              number="06"
              label="Invocation"
              title="Ask Copilot becomes the starting point"
            />

            {/* Tight 2-paragraph body above */}
            <div className="mt-10 max-w-[68ch] [&>p+p]:mt-4!">
              <div className="[&>p+p]:mt-4! max-w-[68ch]">
                <p className="t-body">
                  Ask Copilot is Windows Search plus Copilot. One place to type questions,
                  run actions, launch anything. We built agents directly into it. Type @,
                  pick an agent, send it work. Invoke it from the OS, not from inside some
                  app; the agent keeps running after you close the chat.
                </p>
                <p className="t-body">
                  Now the system has a clear shape. Ask Copilot is where you start agents;
                  the taskbar is where they live while running. Agents aren&apos;t stuck
                  inside individual apps anymore. They&apos;re creatures of the OS itself.
                </p>
              </div>
              <InvocationRoute />
            </div>

            {/* Full-bleed video — the demo is the argument */}
            <div className="agents-invocation-figure">
              <Figure number="6.1" caption="Ask Copilot composer. Invoking an agent with @">
                <LoopingMedia
                  label="Ask Copilot composer invoking an agent with the at sign"
                  src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/Composer.mp4"
                />
              </Figure>
            </div>
          </div>
        </section>

        {/* ── 07 Iteration ── Body Column (§2.3) + Strip Break Lexicon (§2.9) ── */}
        <section
          data-section
          data-reveal
          id="iteration"
          className="agents-room agents-iteration-room py-16 lg:py-24"
        >
          <div className="relative z-10">
            <SectionLabel
              number="07"
              label="Iteration"
              title="The micro-interactions that make it work"
            />

            {/* Body — frames the strip break that follows */}
            <div className="section-grid mt-10 lg:mt-14">
              <div className="[&>p+p]:mt-4! max-w-[68ch]">
                <p className="t-body">
                  The real work was the tiny stuff. We prototyped these in the actual shell
                  with engineering and product alongside design. Tested multiple agents
                  running at once. Watched how the UI changed as an agent moved between
                  states.
                </p>
                <p className="t-body">
                  Each micro-interaction had to balance three things at once: what the
                  system could actually do, what the agent data could tell us, and what
                  people expected to happen. Move one thing wrong and the whole system feels
                  less trustworthy.
                </p>
              </div>
            </div>

            {/* Strip Break — lexicon below the body */}
            <div className="agents-state-lexicon mt-10 lg:mt-14">
              <div className="agents-state-grid">
                {AGENT_STATES.map((s, index) => (
                  <div className="agents-state-cell" key={s.label}>
                    <span className="agents-state-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Image
                      src={s.src}
                      alt={`${s.label} agent state`}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                    <span className="t-mono-label text-center text-[color:var(--text-secondary)]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="t-mono-caption border-t border-[color:var(--rule)] px-4 py-3 text-[color:var(--text-tertiary)]">
                FIG. 7.1. Visual lexicon: five agent states across the taskbar surface.
              </p>
            </div>
          </div>
        </section>

        {/* ── Cover Plate (§2.10) — closing chapter divider into Impact ── */}
        <CoverPlate
          number="08"
          total="08"
          title="Impact"
          ambient={<ImpactContract />}
          className="agents-impact-cover"
        />

        {/* ── 08 Impact ── Body column + full-bleed figure + Telemetry ── */}
        <section
          data-section
          data-reveal
          id="impact"
          className="agents-room agents-impact-room py-16 lg:py-24"
        >
          <div className="agents-impact-atmosphere" aria-hidden="true">
            <Glow
              color="var(--accent-signal)"
              size="66%"
              top="62%"
              left="74%"
              opacity={0.025}
            />
          </div>

          <div className="relative z-10">
            <SectionLabel
              number="08"
              label="Impact"
              title="From invisible to interruptible"
            />
            <div className="mt-10 max-w-[68ch] [&>p+p]:mt-4!">
                <p className="t-body">
                  Agents aren&apos;t hidden anymore. You see them running. You know what
                  state they&apos;re in. You can come back to them whenever you want. No
                  buried logs. No isolated app experiences. The work lives in familiar
                  places.
                </p>
                <p className="t-body">
                  And visibility builds trust. You watch automation work. You feel safer.
                  You know you can stop it. Pause it. Fix it. Control matters. We
                  didn&apos;t just make agents powerful. We made them understandable and
                  stoppable so people actually feel comfortable letting them work.
                </p>
                <p className="t-body">
                  This changes what Windows is. It&apos;s not just the app launcher anymore.
                  It&apos;s the place where agents live. Where you invoke them. Where you
                  watch them work. Windows becomes the coordination layer for all the
                  intelligent work happening on your system.
                </p>
                <p className="t-body">
                  Other teams are already building on these patterns. We created shared
                  contracts for how agents show up, report progress, ask for help.
                  Consistent. Predictable. This prevents a hundred teams from inventing a
                  hundred different ways to surface agent status.
                </p>
                <p className="t-body">
                  As agents become normal, people need to understand what&apos;s happening
                  on their system. Developers need a clear way to wire agents into Windows.
                  These foundations do that. They scale.
                </p>
            </div>
            <Figure
              number="8.1"
              caption="Agents in Windows on stage. Visible, interruptible interactions."
              src="/images/agents/impact-stage.png"
              alt="Agents in Windows presented on stage"
              width={1661}
              height={935}
            />
            <div className="mt-12">
              <Telemetry
                variant="quiet"
                items={[
                  { value: "5", unit: "STATES",   label: "Running, attention, completed, failed, paused" },
                  { value: "3", unit: "TEAMS",    label: "Engineering partner teams" },
                  { value: "Q", unit: "CADENCE",  label: "Quarterly OS shipping cycle" },
                ]}
              />
            </div>
          </div>
        </section>

      </main>
      <NextProject href="/recall" title="Windows Recall" />
      <ManualFooter />
    </ManualShell>
  )
}

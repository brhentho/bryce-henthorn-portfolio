import Image from "next/image"
import { ManualShell } from "../recall/ManualShell"
import {
  SectionLabel,
  SpecSheet,
  Figure,
  Telemetry,
  Margin,
  CursorBlink,
  TopBar,
  ManualFooter,
  CoverPlate,
} from "@/components/manual"

const AGENT_STATES = [
  { src: "/assets/agents/Running agent.svg",          label: "RUNNING" },
  { src: "/assets/agents/Needs attention agent.svg",  label: "NEEDS ATTENTION" },
  { src: "/assets/agents/Completed agent.svg",        label: "COMPLETED" },
  { src: "/assets/agents/Failed agent.svg",           label: "FAILED" },
  { src: "/assets/agents/Paused agent.svg",           label: "PAUSED" },
]

export default function AgentsInWindowsPage() {
  return (
    <ManualShell>
      <TopBar />

      <main className="container">
        {/* ── Hero ── */}
        <section data-section id="overview" className="pt-12 lg:pt-24 pb-16">
          <p className="t-mono-label mb-6">§ 00 / OVERVIEW</p>
          <h1 className="t-display-xl max-w-[20ch]">Agents in Windows<CursorBlink /></h1>
          <p className="t-body lede mt-6 max-w-[60ch] text-[color:var(--text-secondary)]">
            Windows had to become the place where agents actually live — visible,
            manageable, trustworthy. The OS as the coordination layer for every
            intelligent thing happening on your system.
          </p>
          <Figure
            number="0.1"
            caption="Hero schematic — agents distributed across the Windows shell"
            src="/assets/Agents in Windows Fractal.png"
            alt="Fractal pattern of agents distributed across the Windows shell"
            width={1600}
            height={900}
            priority
          />
        </section>

        {/* ── Spec sheet ── */}
        <section data-section data-reveal id="spec" className="py-8">
          <SpecSheet
            rows={[
              { label: "ROLE",     value: "Lead designer, agent visibility & orchestration" },
              { label: "PLATFORM", value: "Windows 11 — Shell, Taskbar, Ask Copilot" },
              { label: "TIMELINE", value: "2025 – Present" },
              { label: "TEAM",     value: "3 engineering partner teams across Microsoft" },
              { label: "MY FOCUS", value: "OS-level agent surface, taskbar states, invocation system" },
              { label: "STATUS",   value: "Shipping" },
            ]}
          />
        </section>

        {/* ── 01 Context ── Annotated Split Plate (§2.4) ── */}
        <section data-section data-reveal id="context" className="py-12 lg:py-20">
          <SectionLabel
            number="01"
            label="Context"
            title="Windows needed a place for agents to live"
          />
          <div className="mt-10 border border-[color:var(--rule)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] space-y-6">
              <p className="t-body">
                Microsoft is betting on agents as the next layer of computing. Not
                replacements for humans, but tools that handle routine work so people can
                focus on judgment and creation. That means Windows can&apos;t stay a place
                where you launch apps and manage files. It has to become the environment
                where agents actually run.
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
            <div className="p-6 lg:p-10 flex items-start">
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
        </section>

        {/* ── 02 Problem ── */}
        <section data-section data-reveal id="problem" className="py-12 lg:py-20">
          <SectionLabel
            number="02"
            label="Problem"
            title="People don&rsquo;t fear automation. They fear not knowing."
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
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
            <Margin anchor="2-pull">
              &ldquo;They didn&rsquo;t distrust automation. They distrusted invisibility.&rdquo;
            </Margin>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <Figure
              number="2.1"
              caption="Fragmentation across apps — Windows has no insight into what is running within each window."
              src="/images/agents/problem-fragmentation.png"
              alt="Fragmented agent experience across multiple windows"
              width={1464}
              height={734}
            />
            <Figure
              number="2.2"
              caption="Windows extends for agent observability — consistent patterns for monitoring and management."
              src="/images/agents/problem-observability.png"
              alt="Windows with unified agent observability"
              width={1464}
              height={734}
            />
          </div>
        </section>

        {/* ── Cover Plate (§2.10) — chapter divider into Process ── */}
        <CoverPlate number="03" total="08" title="Process" />

        {/* ── 03 Process ── Stage Rail Plate (§2.5) ── */}
        <section data-section data-reveal id="process" className="py-12 lg:py-20">
          <SectionLabel
            number="03"
            label="Process"
            title="Anchoring to what users already know"
          />
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
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

          <p className="t-mono-label mt-12 mb-6 text-[color:var(--text-tertiary)]">
            TASKBAR EVOLUTION — KEYFRAMES
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[12rem_1fr] gap-8 lg:gap-10 items-start border-t border-[color:var(--rule)] pt-8">
            <ol className="space-y-6 lg:pr-8 lg:border-r lg:border-[color:var(--rule)]">
              {["Empty pin", "Active state", "Hover-card expanded"].map((label, i) => (
                <li key={label} className="space-y-1.5">
                  <p className="t-mono-label text-[color:var(--text-secondary)]">
                    {String(i + 1).padStart(2, "0")} · KEYFRAME
                  </p>
                  <p className="t-mono-caption text-[color:var(--text-tertiary)] leading-relaxed">
                    {label}
                  </p>
                </li>
              ))}
            </ol>
            <div className="space-y-4">
              {[
                "/assets/Frame 2147238301.png",
                "/assets/Frame 2147238302.png",
                "/assets/Frame 2147238303.png",
              ].map((src, i) => (
                <Figure
                  key={src}
                  number={`3.${i + 1}`}
                  src={src}
                  alt={`Taskbar evolution keyframe ${i + 1}`}
                  width={1302}
                  height={314}
                  className="my-0"
                />
              ))}
              <p className="t-mono-caption text-[color:var(--text-secondary)] mt-3 pt-3 border-t border-[color:var(--rule)]">
                FIG. 3.1 / 3.2 / 3.3 — Taskbar pin → state visible → hover-card
                expansion.
              </p>
            </div>
          </div>
        </section>

        {/* ── 04 Taskbar ── Annotated Split Plate (§2.4) ── */}
        <section data-section data-reveal id="taskbar" className="py-12 lg:py-20">
          <SectionLabel
            number="04"
            label="Taskbar"
            title="The taskbar becomes a window into agent work"
          />
          <div className="mt-10 border border-[color:var(--rule)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] space-y-6">
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
            <div className="p-6 lg:p-10 flex items-start">
              <Figure
                number="4.1"
                caption="Taskbar agent — hover-card expansion in motion"
                className="my-0"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="block w-full h-auto"
                  src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/Taskbar.mp4"
                />
              </Figure>
            </div>
          </div>
        </section>

        {/* ── 05 Constraints ── Pull-quote Interlude (§2.11) + Body Column (§2.3) ── */}
        <section data-section data-reveal id="constraints" className="py-12 lg:py-20">
          <SectionLabel
            number="05"
            label="Constraints"
            title="Windows ships once. Agents ship constantly."
          />

          {/* Pull-quote — promoted from § 05 Margin */}
          <div className="mt-10 lg:mt-14 py-12 lg:py-20 border-y border-[color:var(--rule)]">
            <blockquote className="max-w-[68ch]">
              <p className="t-display-l text-[color:var(--text-primary)]">
                We had to tell teams &lsquo;no&rsquo; to custom experiences so we could
                promise users a predictable system.
              </p>
              <footer className="t-mono-caption mt-8 text-[color:var(--text-tertiary)]">
                Cf. § 05 / CONSTRAINTS
              </footer>
            </blockquote>
          </div>

          {/* Body — let the long argument breathe */}
          <div className="section-grid mt-10 lg:mt-14">
            <div className="space-y-6 max-w-[68ch]">
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
          </div>
          <Figure
            number="5.1"
            caption="Windows desktop showing multiple agent interactions across the system"
            src="/images/agents/constraints-desktop.png"
            alt="Windows desktop showing multiple agent interactions across the system"
            width={1648}
            height={930}
          />
        </section>

        {/* ── 06 Invocation ── Full-bleed Atmospheric Plate (§2.8) ── */}
        <section data-section data-reveal id="invocation" className="py-12 lg:py-20">
          <SectionLabel
            number="06"
            label="Invocation"
            title="Ask Copilot becomes the starting point"
          />

          {/* Tight 2-paragraph body above */}
          <div className="section-grid mt-10">
            <div className="space-y-6 max-w-[68ch]">
              <p className="t-body">
                Ask Copilot is Windows Search plus Copilot — one place to type questions,
                run actions, launch anything. We built agents directly into it. Type @,
                pick an agent, send it work. Invoke it from the OS, not from inside some
                app; the agent keeps running after you close the chat.
              </p>
              <p className="t-body">
                Now the system has a clear shape. Ask Copilot is where you start agents;
                the taskbar is where they live while running. Agents aren&apos;t stuck
                inside individual apps anymore — they&apos;re creatures of the OS itself.
              </p>
            </div>
          </div>

          {/* Full-bleed video — the demo is the argument */}
          <Figure number="6.1" caption="Ask Copilot composer — invoking an agent with @">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="block w-full h-auto"
              src="https://sayyacgp8fag7fqj.public.blob.vercel-storage.com/Composer.mp4"
            />
          </Figure>
        </section>

        {/* ── 07 Iteration ── Strip Break Lexicon (§2.9) + Body Column (§2.3) ── */}
        <section data-section data-reveal id="iteration" className="py-12 lg:py-20">
          <SectionLabel
            number="07"
            label="Iteration"
            title="The micro-interactions that make it work"
          />

          {/* Strip Break — lexicon greets the reader */}
          <div className="mt-10 lg:mt-14 border-y border-[color:var(--rule)]">
            <div className="grid grid-cols-5 divide-x divide-[color:var(--rule)]">
              {AGENT_STATES.map((s) => (
                <div
                  key={s.label}
                  className="px-3 py-6 flex flex-col items-center gap-3"
                >
                  <Image
                    src={s.src}
                    alt={`${s.label} agent state`}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                  <span className="t-mono-label text-[color:var(--text-secondary)] text-center">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="t-mono-caption text-[color:var(--text-tertiary)] px-4 py-3 border-t border-[color:var(--rule)]">
              FIG. 7.1 — Visual lexicon: five agent states across the taskbar surface.
            </p>
          </div>

          {/* Body below */}
          <div className="section-grid mt-10 lg:mt-14">
            <div className="space-y-6 max-w-[68ch]">
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
        </section>

        {/* ── Cover Plate (§2.10) — closing chapter divider into Impact ── */}
        <CoverPlate number="08" total="08" title="Impact" />

        {/* ── 08 Impact ── Annotated Split Plate (§2.4) + Strip Break Telemetry (§2.9) ── */}
        <section data-section data-reveal id="impact" className="py-12 lg:py-20">
          <SectionLabel
            number="08"
            label="Impact"
            title="From invisible to interruptible"
          />
          <div className="mt-10 border border-[color:var(--rule)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[color:var(--rule)] space-y-6">
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
            <div className="p-6 lg:p-10 flex items-start">
              <Figure
                number="8.1"
                caption="Agents in Windows on stage — visible, interruptible interactions"
                src="/images/agents/impact-stage.png"
                alt="Agents in Windows presented on stage"
                width={1661}
                height={935}
                className="my-0"
              />
            </div>
          </div>
          <div className="mt-12">
            <Telemetry
              items={[
                { value: "5", unit: "STATES",   label: "Running, attention, completed, failed, paused" },
                { value: "3", unit: "TEAMS",    label: "Engineering partner teams" },
                { value: "Q", unit: "CADENCE",  label: "Quarterly OS shipping cycle" },
              ]}
            />
          </div>
        </section>

      </main>
      <ManualFooter rev="2.4" />
    </ManualShell>
  )
}
